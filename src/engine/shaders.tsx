import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { ShaderSettings, SkySettings } from "./types";

/** The name the sky dome answers to, so the shaft pass can find the sun without a global. */
const SKY_NAME = "shader-sky";

/**
 * The sky, as a shader.
 *
 * A flat `<color background>` is the single biggest reason our outdoor shots read as "a game engine"
 * instead of "a morning". This dome paints a real vertical gradient, cloud, a haze band at the
 * horizon, and a sun with a halo bright enough for the bloom pass and the shaft pass to catch.
 *
 * The clouds are the part that matters most. Measured against the reference film, our sky had a
 * `sky texture` of 1.0-3.3 where theirs has 7.2: theirs has something in it, ours was a wash. They
 * are value noise on the view direction projected onto a flat layer, which is how every Minecraft
 * shader pack fakes volume without a raymarcher — cheap, and it survives a software renderer.
 */
const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SKY_FRAG = /* glsl */ `
varying vec3 vDir;
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uBottom;
uniform vec3 uSunColor;
uniform vec3 uCloudShade;
uniform vec3 uSunDir;
uniform float uSunSize;
uniform float uSunPower;
uniform float uHaze;
uniform float uClouds;
uniform float uCloudScale;
uniform float uCloudCover;
uniform float uCloudHeight;
uniform float uDither;
uniform float uTime;

float hash31(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i + vec3(0.0, 0.0, 0.0)), hash31(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash31(i + vec3(0.0, 1.0, 0.0)), hash31(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0.0, 0.0, 1.0)), hash31(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash31(i + vec3(0.0, 1.0, 1.0)), hash31(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}

void main() {
  vec3 d = normalize(vDir);
  vec3 s = normalize(uSunDir);
  float h = d.y;
  float sd = max(dot(d, s), 0.0);

  vec3 col = mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.40));
  col = mix(col, uBottom, pow(clamp(-h, 0.0, 1.0), 0.42));

  // Cloud: a flat layer overhead, thick where it is thick, thinning towards the horizon the way
  // a layer does when you look along it instead of up through it.
  if (uClouds > 0.001 && h > 0.0) {
    vec3 cp = d / max(h, 0.22) * uCloudHeight;
    cp.x += uTime * 0.35;
    cp.z += uTime * 0.12;
    float cl = fbm(cp * uCloudScale);
    cl = smoothstep(uCloudCover, uCloudCover + 0.30, cl);
    cl *= smoothstep(0.06, 0.40, h);
    // Lit from the sun side, and a bright rim where the sun is straight through it.
    float lit = 0.35 + 0.65 * pow(sd, 3.0);
    float rim = pow(cl, 0.6) * pow(sd, 24.0);
    vec3 cloudCol = mix(uCloudShade, uSunColor, lit) + uSunColor * rim * 0.55;
    col = mix(col, cloudCol, clamp(cl * uClouds, 0.0, 1.0));
  }

  // The sun: a broad glow, a tight disc, and a halo for bloom to catch.
  col += uSunColor * pow(sd, uSunSize) * uSunPower;
  col += uSunColor * pow(sd, 7.0) * 0.30 * uSunPower;
  col += uSunColor * smoothstep(0.99930, 0.99975, sd) * 3.0;

  // Haze thickens towards the horizon, as it does in the reference film.
  float band = pow(1.0 - clamp(abs(h), 0.0, 1.0), 8.0);
  col = mix(col, uHorizon, uHaze * band * 0.55);

  // A gradient this wide bands on an 8-bit frame. Half a level of noise hides it, and it costs
  // nothing next to what banding costs a sky.
  float n = hash31(vec3(gl_FragCoord.xy, uTime));
  col += (n - 0.5) * uDither;

  gl_FragColor = vec4(col, 1.0);
}
`;

export const Sky: React.FC<{ sky: SkySettings; sunDir: THREE.Vector3 }> = ({ sky, sunDir }) => {
  const camera = useThree((s) => s.camera);
  const group = useRef<THREE.Group>(null);
  const dir = useMemo(() => sunDir.clone().normalize(), [sunDir]);
  // Clouds drift on the film's own clock, never on the wall clock: a frame must render the same
  // every time it is rendered, and Actions renders frames in whatever order it likes.
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uTop: { value: new THREE.Color(sky.top) },
        uHorizon: { value: new THREE.Color(sky.horizon) },
        uBottom: { value: new THREE.Color(sky.bottom ?? sky.horizon) },
        uSunColor: { value: new THREE.Color(sky.sun ?? "#fff4d8") },
        uCloudShade: { value: new THREE.Color(sky.cloudShade ?? "#ffffff") },
        uSunDir: { value: dir.clone() },
        uSunSize: { value: sky.sunSize ?? 220 },
        uSunPower: { value: sky.sunPower ?? 0.9 },
        uHaze: { value: sky.haze ?? 0.55 },
        uClouds: { value: sky.clouds ?? 0 },
        uCloudScale: { value: sky.cloudScale ?? 1.0 },
        uCloudCover: { value: sky.cloudCover ?? 0.48 },
        uCloudHeight: { value: sky.cloudHeight ?? 8 },
        uDither: { value: sky.dither ?? 0.004 },
        uTime: { value: 0 },
      },
    });
  }, [sky, dir]);

  // The camera runs first. Update both position and cloud time before this frame's draw.
  useFrame(() => {
    if (group.current) group.current.position.copy(camera.position);
    material.uniforms.uTime!.value = frame / fps;
  });

  useEffect(() => () => material.dispose(), [material]);

  return (
    <group ref={group}>
      <mesh
        name={SKY_NAME}
        scale={120}
        renderOrder={-1000}
        frustumCulled={false}
        userData={{ sunDir: dir.toArray(), sunColor: sky.sun ?? "#fff4d8" }}
      >
        <sphereGeometry args={[1, 48, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
};

/**
 * Volumetric shafts: the classic radial scatter, done on the frame we already have.
 *
 * It samples towards the sun and keeps only what is bright, so light appears to stream from the
 * sun across whatever sits in front of it. It has no depth test, so a roof cannot block a shaft --
 * which is why the default strength is a whisper rather than a shout.
 */
const SHAFT_SAMPLES = 24;

const SHAFT_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    uSunUv: { value: new THREE.Vector2(0.5, 0.9) },
    uSunVisible: { value: 0 },
    uShafts: { value: 0 },
    uDensity: { value: 0.9 },
    uDecay: { value: 0.96 },
  },
  vertexShader: /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  fragmentShader: /* glsl */ `
uniform sampler2D tDiffuse;
uniform vec2 uSunUv;
uniform float uSunVisible;
uniform float uShafts;
uniform float uDensity;
uniform float uDecay;
varying vec2 vUv;

float lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  vec3 base = texture2D(tDiffuse, vUv).rgb;
  float amount = uShafts * uSunVisible;
  if (amount <= 0.001) {
    gl_FragColor = vec4(base, 1.0);
    return;
  }

  vec2 delta = (vUv - uSunUv) * (uDensity / float(${SHAFT_SAMPLES}));
  vec2 uv = vUv;
  float illum = 1.0;
  vec3 acc = vec3(0.0);
  for (int i = 0; i < ${SHAFT_SAMPLES}; i++) {
    uv -= delta;
    vec3 s = texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb;
    acc += s * smoothstep(0.60, 0.95, lum(s)) * illum;
    illum *= uDecay;
  }
  acc /= float(${SHAFT_SAMPLES});

  gl_FragColor = vec4(base + acc * amount, 1.0);
}
`,
};

/**
 * The grade pass. Sits after bloom and does what a camera and a print do: it spreads a little
 * light through the glass, rolls the highlights off instead of clipping them, lifts the black
 * point the way film does, warms the light and cools the dark, darkens the corners, and lays
 * grain over the whole thing.
 *
 * Every constant here was tuned with `scripts/shader-sim.py`, which pushes a real frame through
 * this same maths and scores it against the reference film. The numbers are not taste; they are
 * the distance between our picture and the one the owner pointed at.
 */
const GRADE_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    uTexel: { value: new THREE.Vector2(1 / 1080, 1 / 1920) },
    uSat: { value: 1.45 },
    uContrast: { value: 1.05 },
    uShoulder: { value: 0.11 },
    uLift: { value: 0.05 },
    uWarm: { value: 0.95 },
    uCool: { value: 0.5 },
    uVignette: { value: 0.12 },
    uDiffusion: { value: 0.14 },
    uDiffRadius: { value: 6.0 },
    uDiffThreshold: { value: 0.86 },
    uVeil: { value: 0.025 },
    uGrain: { value: 0.011 },
    uAberr: { value: 0.16 },
    uTime: { value: 0 },
  },
  vertexShader: /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  fragmentShader: /* glsl */ `
uniform sampler2D tDiffuse;
uniform vec2 uTexel;
uniform float uSat;
uniform float uContrast;
uniform float uShoulder;
uniform float uLift;
uniform float uWarm;
uniform float uCool;
uniform float uVignette;
uniform float uDiffusion;
uniform float uDiffRadius;
uniform float uDiffThreshold;
uniform float uVeil;
uniform float uGrain;
uniform float uAberr;
uniform float uTime;
varying vec2 vUv;

float lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  float r2 = dot(d, d);

  // Lens fringing: zero in the centre, a pixel or two at the corners.
  float ab = uAberr * r2 * 0.006;
  vec3 c;
  c.r = texture2D(tDiffuse, uv + d * ab).r;
  c.g = texture2D(tDiffuse, uv).g;
  c.b = texture2D(tDiffuse, uv - d * ab).b;

  float l0 = lum(c);

  // How soft is this pixel's neighbourhood? A gradient is soft; the edge of a white caption is
  // not. Diffusion must not take light from a caption, so it is masked by this.
  vec3 ring = texture2D(tDiffuse, uv + vec2( 2.0, 0.0) * uTexel).rgb
            + texture2D(tDiffuse, uv + vec2(-2.0, 0.0) * uTexel).rgb
            + texture2D(tDiffuse, uv + vec2( 0.0, 2.0) * uTexel).rgb
            + texture2D(tDiffuse, uv + vec2( 0.0,-2.0) * uTexel).rgb;
  float edge = abs(l0 - lum(ring * 0.25));
  float soft = 1.0 - clamp((edge - 0.05) / 0.20, 0.0, 1.0);

  // Pro-mist: light spread through glass. Two rings of taps, one ring weighted towards what is
  // bright (the mist) and one plain (veiling glare, which lifts the shadows).
  vec2 step1 = uTexel * uDiffRadius;
  vec2 step2 = uTexel * uDiffRadius * 2.1;
  vec3 allSum = vec3(0.0);
  vec3 hotSum = vec3(0.0);
  float hotW = 0.0;
  for (int i = 0; i < 6; i++) {
    float a = float(i) * 1.0472; // six taps around the circle
    vec2 o1 = vec2(cos(a), sin(a));
    vec2 o2 = vec2(cos(a + 0.5236), sin(a + 0.5236));
    vec3 s1 = texture2D(tDiffuse, uv + o1 * step1).rgb;
    vec3 s2 = texture2D(tDiffuse, uv + o2 * step2).rgb;
    allSum += s1 + s2;
    float w1 = clamp((lum(s1) - uDiffThreshold) / (1.0 - uDiffThreshold), 0.0, 1.0) * soft;
    float w2 = clamp((lum(s2) - uDiffThreshold) / (1.0 - uDiffThreshold), 0.0, 1.0) * soft;
    hotSum += s1 * w1 + s2 * w2;
    hotW += w1 + w2;
  }
  c += (allSum / 12.0) * uVeil;
  c += (hotSum / 12.0) * uDiffusion;

  c = clamp(c, 0.0, 1.0);

  // Saturation, then the filmic curve: contrast about the middle, and a shoulder so bright
  // things roll off the way film does instead of turning into paper.
  float l1 = lum(c);
  c = l1 + (c - l1) * uSat;
  c = (c - 0.5) * uContrast + 0.5;
  c = c - uShoulder * pow(max(c, vec3(0.0)), vec3(3.0));
  c = clamp(c, 0.0, 1.0);

  // Lift: film does not reach black, it reaches a dark warm grey. This is most of the difference
  // between a picture that was rendered and one that was photographed.
  float l2 = lum(c);
  vec3 tint = vec3(1.10, 1.00, 0.94);
  c += uLift * tint * (1.0 - pow(clamp(l2 / 0.32, 0.0, 1.0), 1.3));

  // Split tone: warm from the midtones up, cool only in the deepest part of the range. Warming
  // the highlights alone cools a dark film overall, which is the opposite of what it needs.
  float l3 = lum(c);
  float hi = pow(clamp((l3 - 0.18) / 0.55, 0.0, 1.0), 1.15);
  float lo = 1.0 - pow(clamp(l3 / 0.18, 0.0, 1.0), 1.4);
  c += uWarm * vec3(0.105, 0.024, -0.070) * hi;
  c += uWarm * uCool * vec3(-0.020, -0.002, 0.030) * lo;

  // Vignette.
  float v = 1.0 - uVignette * pow(clamp((r2 * 2.6 - 0.06) / 0.9, 0.0, 1.0), 1.35);
  c *= v;

  // Grain: strongest in the middle of the range, as film grain is, and it doubles as the dither
  // that keeps a wide sky from banding.
  float n = fract(sin(dot(uv * vec2(1.0, 1.7) + uTime * 0.37, vec2(12.9898, 78.233))) * 43758.5453);
  float weight = clamp(1.0 - abs(lum(c) - 0.45) / 0.6, 0.15, 1.0);
  c += (n - 0.5) * uGrain * weight;

  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`,
};

export const DEFAULT_SHADERS: Required<ShaderSettings> = {
  enabled: true,
  // Tuned against a still render: 0.8 / 0.55 melted white sleeves and skin.
  // Bloom is now only for things that are actually light — the sun, torches,
  // lanterns, glow cards — not for pale materials in a bright room.
  bloom: 0.55,
  // Threshold is in linear light, where a white caption is exactly 1.0 and the
  // sun disc is far above it. Set above 1 so words stay crisp and only light blooms.
  threshold: 1.25,
  radius: 0.6,
  vignette: 0.12,
  saturation: 1.45,
  contrast: 1.05,
  warmth: 0.95,
  grain: 0.011,
  aberration: 0.16,
  // The rest were tuned with scripts/shader-sim.py against the reference film.
  diffusion: 0.14,
  veil: 0.025,
  lift: 0.05,
  shoulder: 0.11,
  coolShadow: 0.5,
  shafts: 0.3,
};

const resolve = (s?: ShaderSettings | boolean): Required<ShaderSettings> | null => {
  if (!s) return null;
  if (s === true) return DEFAULT_SHADERS;
  if (s.enabled === false) return null;
  return { ...DEFAULT_SHADERS, ...s };
};

/** Where the sun is on screen this frame, and whether it is worth drawing shafts for. */
const useSunOnScreen = () => {
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const found = useRef<THREE.Object3D | null>(null);
  return (): { uv: THREE.Vector2; visible: number } => {
    if (found.current?.parent?.parent !== scene) found.current = scene.getObjectByName(SKY_NAME) ?? null;
    const sky = found.current;
    if (!sky) return { uv: new THREE.Vector2(0.5, 1.0), visible: 0 };
    const sd = sky.userData?.sunDir as number[] | undefined;
    if (!sd) return { uv: new THREE.Vector2(0.5, 1.0), visible: 0 };
    const dir = new THREE.Vector3(sd[0], sd[1], sd[2]).normalize();
    const forward = camera.getWorldDirection(new THREE.Vector3());
    const facing = forward.dot(dir);
    const p = new THREE.Vector3().copy(camera.position).addScaledVector(dir, 60).project(camera);
    const uv = new THREE.Vector2(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
    // Behind the camera: nothing. Near the frame: full. Far outside it: nothing, because a shaft
    // you cannot see the source of is only streak.
    const onScreen = 1 - THREE.MathUtils.smoothstep(uv.distanceTo(new THREE.Vector2(0.5, 0.5)), 0.35, 1.1);
    const visible = Math.max(0, Math.min(1, facing * 1.6)) * onScreen * (p.z > 1 ? 0 : 1);
    return { uv, visible };
  };
};

/**
 * Real post-processing: bloom, shafts, grade, vignette, grain.
 *
 * R3F stops rendering the scene itself as soon as a `useFrame` callback with a
 * positive priority exists, so this component owns the frame from then on.
 */
export const PostFX: React.FC<{ settings?: ShaderSettings | boolean }> = ({ settings }) => {
  // Do not subscribe at positive priority when disabled: it takes over R3F's draw
  // even if the callback returns without drawing anything. Film config is stable.
  const cfg = useMemo(() => resolve(settings), [settings]);
  return cfg ? <ComposedFrame cfg={cfg} /> : null;
};

const ComposedFrame: React.FC<{ cfg: Required<ShaderSettings> }> = ({ cfg }) => {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const sunOnScreen = useSunOnScreen();

  const active = useRef<{ composer: EffectComposer; shafts: ShaderPass; grade: ShaderPass } | null>(null);
  useLayoutEffect(() => {
    const composer = new EffectComposer(gl);
    composer.setPixelRatio(1);
    composer.setSize(size.width, size.height);
    if (composer.renderTarget1) composer.renderTarget1.samples = 4;
    if (composer.renderTarget2) composer.renderTarget2.samples = 4;

    const render = new RenderPass(scene, camera);
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      cfg.bloom,
      cfg.radius,
      cfg.threshold,
    );
    const shafts = new ShaderPass(SHAFT_SHADER);
    const grade = new ShaderPass(GRADE_SHADER);
    // A composer renders into a render target, and three only applies tone
    // mapping when it draws to the canvas — so without an OutputPass the film
    // comes out linear and dark. Bloom first (in linear light), then ACES plus
    // sRGB, then everything a camera does to light that has already landed.
    const output = new OutputPass();
    composer.addPass(render);
    composer.addPass(bloom);
    composer.addPass(output);
    composer.addPass(shafts);
    composer.addPass(grade);
    grade.renderToScreen = true;
    // ShaderPass clones the uniforms of a plain shader object, so the two passes cannot share one.
    const u = grade.material.uniforms;
    u.uVignette!.value = cfg.vignette;
    u.uSat!.value = cfg.saturation;
    u.uContrast!.value = cfg.contrast;
    u.uShoulder!.value = cfg.shoulder;
    u.uLift!.value = cfg.lift;
    u.uWarm!.value = cfg.warmth;
    u.uCool!.value = cfg.coolShadow;
    u.uDiffusion!.value = cfg.diffusion;
    u.uVeil!.value = cfg.veil;
    u.uGrain!.value = cfg.grain;
    u.uAberr!.value = cfg.aberration;
    u.uTexel!.value = new THREE.Vector2(1 / size.width, 1 / size.height);

    shafts.material.uniforms.uShafts!.value = cfg.shafts;
    active.current = { composer, shafts, grade };
    return () => {
      active.current = null;
      for (const pass of composer.passes) pass.dispose();
      composer.dispose();
    };
  }, [gl, scene, camera, cfg, size.width, size.height]);

  const filmFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  useFrame((_, delta) => {
    const rig = active.current;
    if (!rig) { gl.render(scene, camera); return; }
    const g = rig.grade.material.uniforms;
    if (g) g.uTime!.value = filmFrame / fps;
    const s = rig.shafts.material.uniforms;
    if (s) {
      const sun = sunOnScreen();
      s.uSunUv!.value = sun.uv;
      s.uSunVisible!.value = sun.visible;
    }
    rig.composer.render(delta);
  }, 1);

  return null;
};
