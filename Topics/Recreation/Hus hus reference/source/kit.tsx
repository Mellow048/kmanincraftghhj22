import type { Timing, Vec3 } from "../../engine";
import { wordClock } from "../../../Topics/Recreation";
import json from "./timing.json";
export const timing = json as Timing;
export const w = wordClock(timing);
export const clamp = (v: number) => Math.min(1, Math.max(0, v));
export const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const smooth = (v: number) => {
  const q = clamp(v);
  return q * q * (3 - 2 * q);
};
export const go = (t: number, a: number, b: number) => smooth(prog(t, a, b));
export const mix = (a: number, b: number, q: number) => a + (b - a) * q;
export const vMix = (a: Vec3, b: Vec3, q: number): Vec3 => [mix(a[0], b[0], q), mix(a[1], b[1], q), mix(a[2], b[2], q)];
/** Screen-space light from a camera shutter. Leave the subtitles in front and never repeat the flash rapidly. */
export function Shutter({ t }: { t: number }) {
  const level = 0.88 * (1 - prog(t, 0, 0.105));
  if (level <= 0 || t < 0) return null;
  return (
    <mesh frustumCulled={false} renderOrder={9900}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        depthTest={false}
        uniforms={{ alpha: { value: level } }}
        vertexShader={"void main(){gl_Position=vec4(position.xy,0.,1.);}"}
        fragmentShader={"uniform float alpha;void main(){gl_FragColor=vec4(1.,.98,.88,alpha);}"}
      />
    </mesh>
  );
}
