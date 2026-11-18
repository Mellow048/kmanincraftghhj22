import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { clamp01 } from "./math";
import { wordTexture } from "./pixelfont";
import type { CaptionSettings, CaptionWord } from "./types";

/**
 * One word on screen at a time, cut to the voice.
 *
 * It is a quad drawn in screen space INSIDE the 3D canvas (same WebGL context,
 * no HTML layer), so it survives every renderer the film does. The letters come
 * from a bit table (pixelfont.ts), so no font has to be installed anywhere.
 *
 * Films do not mount this. Pass `captions` to defineFilm.
 */

const VERT = /* glsl */ `
  uniform vec4 rect; // centre x, centre y, half width, half height — all in clip space
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(rect.xy + position.xy * rect.zw, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D map;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(map, vUv);
    if (c.a < 0.5) discard;
    gl_FragColor = vec4(c.rgb, 1.0);
  }
`;

/** What a word looks like on screen: no punctuation, one case. */
export function captionText(word: string, letterCase: "upper" | "lower" = "upper"): string {
  const clean = word.replace(/[^A-Za-z0-9'\-]/g, "").replace(/^['-]+|['-]+$/g, "");
  return letterCase === "upper" ? clean.toUpperCase() : clean.toLowerCase();
}

/** The word being spoken at `t`, or null in a pause. */
export function activeWord(words: CaptionWord[], t: number): CaptionWord | null {
  let lo = 0;
  let hi = words.length - 1;
  let hit = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (words[mid].s <= t) {
      hit = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  if (hit < 0) return null;
  const word = words[hit];
  const next = words[hit + 1];
  // Hold the word until the next one starts, but not across a real pause.
  const holdUntil = next ? Math.min(next.s, word.e + 0.45) : word.e + 0.45;
  return t < holdUntil ? word : null;
}

export const Captions: React.FC<CaptionSettings> = ({ words, y = 0.72, size = 1, letterCase = "upper" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { map: { value: null }, rect: { value: new THREE.Vector4(0, 0, 0, 0) } },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        fog: false,
        toneMapped: false,
      }),
    [],
  );

  const word = activeWord(words, t);
  const text = word ? captionText(word.w, letterCase) : "";

  let rect: [number, number, number, number] | null = null;
  let tex: THREE.DataTexture | null = null;
  if (word && text.length > 0) {
    tex = wordTexture(text);
    const texW = (tex.image as { width: number }).width;
    const texH = (tex.image as { height: number }).height;
    // One font pixel is 1/86 of the frame width; long words shrink to fit 88%.
    let px = (width / 86) * size;
    px = Math.min(px, (width * 0.88) / texW);
    // A two-frame pop on the cut to each word. It is what makes the eye follow.
    const pop = 1 + 0.2 * Math.pow(1 - clamp01((t - word.s) / 0.1), 2);
    const halfW = ((texW * px) / width) * pop;
    const halfH = ((texH * px) / height) * pop;
    rect = [0, 1 - 2 * y, halfW, halfH];
  }

  useFrame(() => {
    if (rect && tex) {
      material.uniforms.map.value = tex;
      (material.uniforms.rect.value as THREE.Vector4).set(rect[0], rect[1], rect[2], rect[3]);
    }
  });

  return (
    <mesh frustumCulled={false} renderOrder={9999} visible={rect !== null} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};
