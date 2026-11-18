"""Film-only offscreen master. Draw the exact authored instanced meshes exported by export.mjs.
Real perspective, shadow map, practical light, film grade, and the engine's pixel caption/beat data.
No browser, photo plates, estimated speech, or interpolated stills. See README.md for the rebuild.
"""

import argparse, base64, ctypes as C, json, os, subprocess, time
from pathlib import Path

os.environ.setdefault("PYOPENGL_PLATFORM", "egl")
import numpy as np
from OpenGL import EGL as E, GL as G
from OpenGL.GL import shaders

ap = argparse.ArgumentParser()
ap.add_argument("bake", type=Path)
ap.add_argument("output", type=Path)
ap.add_argument("--width", type=int, default=1080)
ap.add_argument("--stills", action="store_true")
ap.add_argument("--angle", action="store_true")
args = ap.parse_args()
db = json.loads((args.bake / "frames.json").read_text())
W = args.width
H = round(W * db["height"] / db["width"])
if W <= 0 or (not args.stills and (W % 2 or H % 2)):
    ap.error("The master needs positive, even dimensions for 4:2:0 video.")
if not args.stills and [f["n"] for f in db["frames"]] != list(range(db["total"])):
    ap.error(
        "Cannot mux a partial bake as a full film. Export all frames, or pass --stills."
    )
Z = 768
if args.angle:
    get_display = E.eglGetProcAddress(b"eglGetPlatformDisplayEXT")
    if not get_display:
        ap.error("--angle requires an ANGLE EGL implementation (see README.md).")
    platform_display = C.CFUNCTYPE(
        C.c_void_p, C.c_uint, C.c_void_p, C.POINTER(C.c_int)
    )(get_display)
    # EGL_PLATFORM_ANGLE_ANGLE, with EGL_PLATFORM_ANGLE_TYPE_ANGLE = VULKAN_ANGLE.
    ptr = platform_display(0x3202, None, (C.c_int * 3)(0x3203, 0x3450, E.EGL_NONE))
    disp = C.cast(ptr, E.EGLDisplay)
else:
    disp = E.eglGetDisplay(E.EGL_DEFAULT_DISPLAY)
E.eglInitialize(disp, None, None)
E.eglBindAPI(E.EGL_OPENGL_ES_API)
attrs = (C.c_int * 15)(
    E.EGL_SURFACE_TYPE,
    E.EGL_PBUFFER_BIT,
    E.EGL_RENDERABLE_TYPE,
    0x40,
    E.EGL_RED_SIZE,
    8,
    E.EGL_GREEN_SIZE,
    8,
    E.EGL_BLUE_SIZE,
    8,
    E.EGL_ALPHA_SIZE,
    8,
    E.EGL_DEPTH_SIZE,
    24,
    E.EGL_NONE,
)
cfg = (E.EGLConfig * 1)()
cnt = C.c_int()
E.eglChooseConfig(disp, attrs, cfg, 1, C.byref(cnt))
assert cnt.value, "Missing GLES3 pbuffer config"
surf = E.eglCreatePbufferSurface(
    disp, cfg[0], (C.c_int * 5)(E.EGL_WIDTH, W, E.EGL_HEIGHT, H, E.EGL_NONE)
)
ctx = E.eglCreateContext(
    disp,
    cfg[0],
    E.EGL_NO_CONTEXT,
    (C.c_int * 3)(E.EGL_CONTEXT_CLIENT_VERSION, 3, E.EGL_NONE),
)
E.eglMakeCurrent(disp, surf, surf, ctx)
print("Renderer:", G.glGetString(G.GL_RENDERER).decode(), f"{W}x{H}", flush=True)
vs = """#version 300 es
precision highp float;
layout(location=0) in vec3 pos;layout(location=1) in vec3 normal;layout(location=2) in vec2 uv;
layout(location=3) in mat4 M;layout(location=7) in vec4 colour;
uniform mat4 VP;uniform mat4 LS;uniform float room;out vec4 c;out vec3 shadowPos;out vec3 wpos;out float key;out float sky;out vec2 texpos;out vec2 suv;
void main(){vec4 w=M*vec4(pos,1);vec3 n=normalize(mat3(M)*normal);wpos=w.xyz;c=colour;key=max(0.,dot(n,normalize(vec3(-.40,.77,.51))));sky=.5+.5*n.y;
vec3 axis=abs(normal);vec3 dim=vec3(length(M[0].xyz),length(M[1].xyz),length(M[2].xyz));texpos=uv*vec2(axis.x>.5?dim.z:dim.x,axis.y>.5?dim.z:dim.y)*13.;suv=uv;
shadowPos=(LS*w).xyz*.5+.5;gl_Position=VP*w;}
"""
fs = """#version 300 es
precision highp float;in vec4 c;in vec3 shadowPos;in vec3 wpos;in float key;in float sky;in vec2 texpos;in vec2 suv;
uniform highp sampler2DShadow shad;uniform sampler2D grain;uniform vec2 res;uniform float trailer;out vec4 frag;
void main(){vec3 q=shadowPos;float bias=.0015+.0018*(1.-key);float sh=1.;if(q.z<1.&&all(greaterThan(q.xy,vec2(.002)))&&all(lessThan(q.xy,vec2(.998)))){sh=texture(shad,vec3(q.xy,q.z-bias));}
float grainV=texture(grain,texpos/64.).r;float edge=min(min(suv.x,1.-suv.x),min(suv.y,1.-suv.y));float bevel=.026*(1.-smoothstep(.0,.028,edge));
vec3 fill=mix(vec3(.66,.72,.83),vec3(.79,.82,.84),sky);vec3 lit=fill+vec3(.50,.42,.31)*key*(.27+.73*sh);float front=clamp((wpos.z+4.5)/5.,0.,1.);lit*=mix(.81,1.,front);
vec3 rgb=c.rgb*lit*(.967+.055*grainV+bevel)+vec3(.008,.010,.019);rgb=mix(rgb,c.rgb*1.13+.045,c.a*.70);
float spot=1./(1.+.16*dot(wpos-vec3(-1.8,2.8,-1.5),wpos-vec3(-1.8,2.8,-1.5)));rgb+=c.rgb*vec3(.072,.038,.012)*spot;
float haze=clamp((-wpos.z-1.)*.024,0.,.135);rgb=mix(rgb,vec3(.36,.39,.49),haze);
// When the trailers start, the audience picks up the cool flicker from the screen instead of house lights.
rgb*=mix(vec3(1.),vec3(.80,.89,1.02),trailer);rgb+=trailer*(.4+.6*key)*vec3(.008,.019,.038);
vec2 uv=gl_FragCoord.xy/res;rgb*=.985+.035*(1.-dot((uv-.5)*1.3,(uv-.5)*1.3));frag=vec4(rgb,1.);}
"""
sv = """#version 300 es
layout(location=0) in vec3 pos;layout(location=3) in mat4 M;uniform mat4 LS;void main(){gl_Position=LS*M*vec4(pos,1.);}
"""
sf = """#version 300 es
precision mediump float;void main(){}
"""
cv = """#version 300 es
uniform vec4 rect;out vec2 v;void main(){vec2 a=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));v=a;gl_Position=vec4(rect.xy+(2.*a-1.)*rect.zw,0.,1.);}
"""
cf = """#version 300 es
precision mediump float;uniform sampler2D tex;in vec2 v;out vec4 f;void main(){if(any(greaterThanEqual(v,vec2(1.))))discard;f=texture(tex,v);if(f.a<.5)discard;}
"""


def program(v, f):
    a = shaders.compileShader(v, G.GL_VERTEX_SHADER)
    b = shaders.compileShader(f, G.GL_FRAGMENT_SHADER)
    p = G.glCreateProgram()
    G.glAttachShader(p, a)
    G.glAttachShader(p, b)
    G.glLinkProgram(p)
    assert G.glGetProgramiv(p, G.GL_LINK_STATUS), G.glGetProgramInfoLog(p)
    return p


p = program(vs, fs)
sp = program(sv, sf)
cp = program(cv, cf)


def un(p, k):
    return G.glGetUniformLocation(p, k)


def texparams(f=G.GL_NEAREST, wrap=G.GL_CLAMP_TO_EDGE):
    for k in [G.GL_TEXTURE_MIN_FILTER, G.GL_TEXTURE_MAG_FILTER]:
        G.glTexParameteri(G.GL_TEXTURE_2D, k, f)
    for k in [G.GL_TEXTURE_WRAP_S, G.GL_TEXTURE_WRAP_T]:
        G.glTexParameteri(G.GL_TEXTURE_2D, k, wrap)


def rgba(w, h, data):
    n = G.glGenTextures(1)
    G.glBindTexture(G.GL_TEXTURE_2D, n)
    texparams()
    G.glTexImage2D(
        G.GL_TEXTURE_2D, 0, G.GL_RGBA8, w, h, 0, G.GL_RGBA, G.GL_UNSIGNED_BYTE, data
    )
    return n


G.glPixelStorei(G.GL_PACK_ALIGNMENT, 1)
G.glPixelStorei(G.GL_UNPACK_ALIGNMENT, 1)
caps = {k: rgba(v[0], v[1], base64.b64decode(v[2])) for k, v in db["caps"].items()}
noise = np.random.default_rng(47).integers(0, 256, (64, 64, 4), dtype=np.uint8)
nt = rgba(64, 64, noise)
texparams(wrap=G.GL_REPEAT)
sh = G.glGenTextures(1)
G.glBindTexture(G.GL_TEXTURE_2D, sh)
texparams(G.GL_LINEAR)
G.glTexImage2D(
    G.GL_TEXTURE_2D,
    0,
    G.GL_DEPTH_COMPONENT16,
    Z,
    Z,
    0,
    G.GL_DEPTH_COMPONENT,
    G.GL_UNSIGNED_SHORT,
    None,
)
G.glTexParameteri(
    G.GL_TEXTURE_2D, G.GL_TEXTURE_COMPARE_MODE, G.GL_COMPARE_REF_TO_TEXTURE
)
G.glTexParameteri(G.GL_TEXTURE_2D, G.GL_TEXTURE_COMPARE_FUNC, G.GL_LEQUAL)
fb = G.glGenFramebuffers(1)
G.glBindFramebuffer(G.GL_FRAMEBUFFER, fb)
G.glFramebufferTexture2D(
    G.GL_FRAMEBUFFER, G.GL_DEPTH_ATTACHMENT, G.GL_TEXTURE_2D, sh, 0
)
G.glDrawBuffers(1, [G.GL_NONE])
G.glReadBuffer(G.GL_NONE)
assert G.glCheckFramebufferStatus(G.GL_FRAMEBUFFER) == G.GL_FRAMEBUFFER_COMPLETE
# All six box faces have CCW winding; inverse view and near-plane clipping are done by GLES.
verts = []
for normal, u, v in [
    ([0, 0, 1], [1, 0, 0], [0, 1, 0]),
    ([0, 0, -1], [-1, 0, 0], [0, 1, 0]),
    ([1, 0, 0], [0, 0, -1], [0, 1, 0]),
    ([-1, 0, 0], [0, 0, 1], [0, 1, 0]),
    ([0, 1, 0], [1, 0, 0], [0, 0, -1]),
    ([0, -1, 0], [1, 0, 0], [0, 0, 1]),
]:
    for x, y in [(0, 0), (1, 0), (1, 1), (0, 0), (1, 1), (0, 1)]:
        verts.append(
            [
                *(
                    np.array(normal) * 0.5
                    + (x - 0.5) * np.array(u)
                    + (y - 0.5) * np.array(v)
                ),
                *normal,
                x,
                y,
            ]
        )
verts = np.array(verts, np.float32)
vbo = G.glGenBuffers(1)
G.glBindBuffer(G.GL_ARRAY_BUFFER, vbo)
G.glBufferData(G.GL_ARRAY_BUFFER, verts.nbytes, verts, G.GL_STATIC_DRAW)


def vao(data):
    a = G.glGenVertexArrays(1)
    G.glBindVertexArray(a)
    G.glBindBuffer(G.GL_ARRAY_BUFFER, vbo)
    for i, k, j in [(0, 3, 0), (1, 3, 12), (2, 2, 24)]:
        G.glEnableVertexAttribArray(i)
        G.glVertexAttribPointer(i, k, G.GL_FLOAT, False, 32, C.c_void_p(j))
    inst = G.glGenBuffers(1)
    G.glBindBuffer(G.GL_ARRAY_BUFFER, inst)
    G.glBufferData(G.GL_ARRAY_BUFFER, len(data), data, G.GL_DYNAMIC_DRAW)
    for i in range(5):
        G.glEnableVertexAttribArray(i + 3)
        G.glVertexAttribPointer(i + 3, 4, G.GL_FLOAT, False, 80, C.c_void_p(i * 16))
        G.glVertexAttribDivisor(i + 3, 1)
    return a, inst


stat = {k: vao((args.bake / (k + ".bin")).read_bytes())[0] for k in db["rooms"]}
da, ib = vao(bytes(80))
empty = G.glGenVertexArrays(1)
G.glDepthFunc(G.GL_LEQUAL)
G.glEnable(G.GL_CULL_FACE)
G.glCullFace(G.GL_BACK)


# Orthographic shadow lens from upper front left, focused on the row and throwing marks.
def unit(v):
    return v / np.linalg.norm(v)


center = np.array([0, 1, -1.8])
eye = center + np.array([-4.0, 7.7, 5.1])
back = unit(eye - center)
right = unit(np.cross([0, 1.0, 0], back))
up = np.cross(back, right)
view = np.eye(4)
view[:3, :3] = [right, up, back]
view[:3, 3] = -view[:3, :3] @ eye
ortho = np.diag([1 / 4.8, 1 / 4.8, -2 / 20, 1.0])
ortho[2, 3] = -1.0
ls = np.asarray((ortho @ view).T, np.float32).flatten()
for k in (p, sp):
    G.glUseProgram(k)
    G.glUniformMatrix4fv(un(k, "LS"), 1, False, ls)
G.glUseProgram(p)
G.glUniform2f(un(p, "res"), W, H)
G.glUniform1i(un(p, "grain"), 1)
G.glUniform1i(un(p, "shad"), 0)
G.glUseProgram(cp)
G.glUniform1i(un(cp, "tex"), 2)
locvp = un(p, "VP")
loctrailer = un(p, "trailer")
locrect = un(cp, "rect")
br = {
    "kitchen": (0.38, 0.52, 0.56),
    "cinema": (0.18, 0.19, 0.28),
    "street": (0.17, 0.20, 0.34),
}
fid = (args.bake / "acting.bin").open("rb")
args.output.parent.mkdir(parents=True, exist_ok=True)
if args.stills:
    args.output.mkdir(parents=True, exist_ok=True)
    from PIL import Image
else:
    import imageio_ffmpeg

    audio = Path("public/audio/still-rushing-the-third-one/mix.mp3")
    proc = subprocess.Popen(
        [
            imageio_ffmpeg.get_ffmpeg_exe(),
            "-v",
            "error",
            "-y",
            "-f",
            "rawvideo",
            "-pixel_format",
            "rgba",
            "-video_size",
            f"{W}x{H}",
            "-framerate",
            str(db["fps"]),
            "-i",
            "pipe:0",
            "-i",
            str(audio),
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-vf",
            "vflip,scale=out_color_matrix=bt709:in_range=full:out_range=tv,format=yuv420p",
            "-colorspace",
            "bt709",
            "-color_primaries",
            "bt709",
            "-color_trc",
            "bt709",
            "-filter_threads",
            "1",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "18",
            "-threads",
            "2",
            "-metadata",
            "title=Still Rushing the Third One",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-ar",
            "48000",
            "-t",
            f"{db['total'] / db['fps']:.7f}",
            "-movflags",
            "+faststart",
            str(args.output),
        ],
        stdin=subprocess.PIPE,
    )
start = time.monotonic()
try:
    for j, f in enumerate(db["frames"]):
        zone = f["room"]
        fid.seek(f["byte"])
        data = fid.read(f["count"] * 80)
        G.glBindBuffer(G.GL_ARRAY_BUFFER, ib)
        G.glBufferData(G.GL_ARRAY_BUFFER, len(data), data, G.GL_DYNAMIC_DRAW)

        def draw():
            for a, n in ((stat[zone], db["rooms"][zone]), (da, f["count"])):
                G.glBindVertexArray(a)
                G.glDrawArraysInstanced(G.GL_TRIANGLES, 0, 36, n)

        G.glEnable(G.GL_DEPTH_TEST)
        G.glBindFramebuffer(G.GL_FRAMEBUFFER, fb)
        G.glViewport(0, 0, Z, Z)
        G.glClear(G.GL_DEPTH_BUFFER_BIT)
        G.glUseProgram(sp)
        draw()
        G.glBindFramebuffer(G.GL_FRAMEBUFFER, 0)
        G.glViewport(0, 0, W, H)
        G.glClearColor(*br[zone], 1.0)
        G.glClear(G.GL_COLOR_BUFFER_BIT | G.GL_DEPTH_BUFFER_BIT)
        G.glUseProgram(p)
        G.glActiveTexture(G.GL_TEXTURE0)
        G.glBindTexture(G.GL_TEXTURE_2D, sh)
        G.glActiveTexture(G.GL_TEXTURE1)
        G.glBindTexture(G.GL_TEXTURE_2D, nt)
        G.glUniform1f(
            loctrailer,
            (0.80 + 0.14 * np.sin(f["n"] * 0.137))
            if f["cue"] in ("7.trailers", "7.rows", "7.training", "7.echo")
            else 0.0,
        )
        G.glUniformMatrix4fv(locvp, 1, False, np.array(f["vp"], np.float32))
        draw()
        if f["cap"]:
            txt, *rect = f["cap"]
            G.glDisable(G.GL_DEPTH_TEST)
            G.glUseProgram(cp)
            G.glActiveTexture(G.GL_TEXTURE2)
            G.glBindTexture(G.GL_TEXTURE_2D, caps[txt])
            G.glUniform4f(locrect, *rect)
            G.glBindVertexArray(empty)
            G.glDrawArrays(G.GL_TRIANGLES, 0, 3)
        pixels = G.glReadPixels(0, 0, W, H, G.GL_RGBA, G.GL_UNSIGNED_BYTE)
        if args.stills:
            Image.frombytes("RGBA", (W, H), pixels).transpose(
                Image.Transpose.FLIP_TOP_BOTTOM
            ).convert("RGB").save(args.output / f"{f['n']:04d}.jpg", quality=92)
        else:
            proc.stdin.write(pixels)
        if (j + 1) % 150 == 0:
            print(
                f"{j + 1}/{len(db['frames'])} frames ({(j + 1) / (time.monotonic() - start):.1f} fps), {f['cue']}",
                flush=True,
            )
finally:
    if not args.stills:
        proc.stdin.close()
        rc = proc.wait()
        assert rc == 0, f"ffmpeg exited {rc}"
print(
    "Finished",
    len(db["frames"]),
    "frames in",
    round(time.monotonic() - start, 1),
    "seconds",
    flush=True,
)
