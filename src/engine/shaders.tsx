import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type { ShaderSettings, SkySettings } from "./types";

/**
 * The sky, as a shader.
 *
 * A flat `<color background>` is the single biggest reason our outdoor shots
 * read as "a game engine" instead of "a morning". This dome paints a real
 * vertical gradient, a haze band at the horizon, and a sun with a halo bright
 * enough for the bloom pass to catch — which is most of what "shaders" means
 * to a viewer's eye.
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
uniform vec3 uSunDir;
uniform float uSunSize;
uniform float uSunPower;
uniform float uHaze;

void main() {
  vec3 d = normalize(vDir);
  float h = d.y;

  vec3 col = mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.62));
  col = mix(col, uBottom, pow(clamp(-h, 0.0, 1.0), 0.42));

  // The sun: a tight disc with a wide halo, so bloom has something to bloom.
  float sd = max(dot(d, normalize(uSunDir)), 0.0);
  col += uSunColor * pow(sd, uSunSize) * uSunPower;
  col += uSunColor * smoothstep(0.99930, 0.99975, sd) * 3.0;

  // Haze thickens towards the horizon, as it does in the reference film.
  float band = pow(1.0 - clamp(abs(h), 0.0, 1.0), 8.0);
  col = mix(col, uHorizon, uHaze * band * 0.55);

  gl_FragColor = vec4(col, 1.0);
}
`;

export const Sky: React.FC<{ sky: SkySettings; sunDir: THREE.Vector3 }> = ({ sky, sunDir }) => {
  const camera = useThree((s) => s.camera);
  const group = useRef<THREE.Group>(null);
  // The dome travels with the camera, so the sun never slides as the shot moves.
  useFrame(() => {
    if (group.current) group.current.position.copy(camera.position);
  });

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
        uSunDir: { value: sunDir.clone().normalize() },
        uSunSize: { value: sky.sunSize ?? 220 },
        uSunPower: { value: sky.sunPower ?? 0.9 },
        uHaze: { value: sky.haze ?? 0.55 },
      },
    });
  }, [sky, sunDir]);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <group ref={group}>
      <mesh scale={120} renderOrder={-1000} frustumCulled={false}>
        <sphereGeometry args={[1, 48, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
};

/**
 * The grade pass. Sits after bloom and does the small things a camera does:
 * a touch of lens fringing at the edges, a gentle S-curve, cool shadows against
 * warm highlights, a vignette, and a whisper of grain. Kept subtle on purpose —
 * a heavy grade on block art looks like a filter, not like sunlight.
 */
const GRADE_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    uVignette: { value: 0.35 },
    uSat: { value: 1.08 },
    uContrast: { value: 1.06 },
    uWarm: { value: 0.6 },
    uGrain: { value: 0.012 },
    uAberr: { value: 0.35 },
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
uniform float uVignette;
uniform float uSat;
uniform float uContrast;
uniform float uWarm;
uniform float uGrain;
uniform float uAberr;
uniform float uTime;
varying vec2 vUv;

vec3 saturateColor(vec3 c, float s) {
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  return mix(vec3(l), c, s);
}

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

  c = saturateColor(c, uSat);
  c = (c - 0.5) * uContrast + 0.5;

  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c += uWarm * vec3(0.040, 0.010, -0.028) * smoothstep(0.30, 1.00, lum);
  c += uWarm * vec3(-0.018, 0.004, 0.032) * (1.0 - smoothstep(0.0, 0.55, lum));

  float v = smoothstep(0.98, 0.22, r2 * 2.1);
  c *= mix(1.0, v, uVignette);

  float n = fract(sin(dot(uv * vec2(1.0, 1.7) + uTime * 0.37, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uGrain;

  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`,
};

export const DEFAULT_SHADERS: Required<ShaderSettings> = {
  enabled: true,
  // Tuned against a still render: 0.8 / 0.55 melted white sleeves and skin.
  // Bloom is now only for things that are actually light — the sun, torches,
  // lanterns, glow cards — not for pale materials in a bright room.
  bloom: 0.34,
  threshold: 0.94,
  radius: 0.55,
  vignette: 0.22,
  saturation: 1.10,
  contrast: 1.03,
  warmth: 0.45,
  grain: 0.008,
  aberration: 0.16,
};

const resolve = (s?: ShaderSettings | boolean): Required<ShaderSettings> | null => {
  if (!s) return null;
  if (s === true) return DEFAULT_SHADERS;
  if (s.enabled === false) return null;
  return { ...DEFAULT_SHADERS, ...s };
};

/**
 * Real post-processing: bloom, grade, vignette, grain.
 *
 * R3F stops rendering the scene itself as soon as a `useFrame` callback with a
 * positive priority exists, so this component owns the frame from then on.
 */
export const PostFX: React.FC<{ settings?: ShaderSettings | boolean }> = ({ settings }) => {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const cfg = resolve(settings);

  const rig = useMemo(() => {
    if (!cfg) return null;
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
    const grade = new ShaderPass(GRADE_SHADER);
    composer.addPass(render);
    composer.addPass(bloom);
    composer.addPass(grade);
    grade.renderToScreen = true;
    return { composer, bloom, grade };
  }, [gl, scene, camera, cfg, size.width, size.height]);

  useEffect(() => {
    if (!rig) return;
    if (rig.grade.material.uniforms) {
      rig.grade.material.uniforms.uVignette!.value = cfg!.vignette;
      rig.grade.material.uniforms.uSat!.value = cfg!.saturation;
      rig.grade.material.uniforms.uContrast!.value = cfg!.contrast;
      rig.grade.material.uniforms.uWarm!.value = cfg!.warmth;
      rig.grade.material.uniforms.uGrain!.value = cfg!.grain;
      rig.grade.material.uniforms.uAberr!.value = cfg!.aberration;
    }
  }, [rig, cfg]);

  useEffect(() => {
    if (!rig) return;
    rig.composer.setSize(size.width, size.height);
  }, [rig, size.width, size.height]);

  const t = useRef(0);
  useFrame((_, delta) => {
    if (!rig) return;
    t.current += delta;
    rig.grade.material.uniforms.uTime!.value = t.current;
    rig.composer.render(delta);
  }, 1);

  return null;
};
