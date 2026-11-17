import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { clamp01 } from "./math";
import { wordTexture } from "./pixelfont";
import type { CaptionSettings, CaptionWord } from "./types";

/**
 * Words on screen in short phrases, cut to the voice.
 *
 * A whole line of narration flashing one word at a time is unreadable at 260 words a minute: each word lives about a
 * quarter of a second. Phrases of two to four words are the shape the reference video uses - bold, uppercase, white
 * with a black outline - and the eye can take one in at a glance while it is still on screen.
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

/** A run of words that shares the screen: `from`..`to` into `words`. */
export type CaptionChunk = { from: number; to: number; s: number; e: number };

/**
 * Cut `words` into chunks of at most `size`, breaking early after a full stop or a comma so a phrase ends where the
 * sentence breathes. A long chunk is also broken when it would stay up for more than 2.4 s.
 */
export function chunkWords(words: CaptionWord[], size = 3): CaptionChunk[] {
  const out: CaptionChunk[] = [];
  let from = 0;
  while (from < words.length) {
    let to = from;
    while (to + 1 < words.length) {
      const endsSentence = /[.,!?;:]$/.test(words[to].w);
      const tooLong = words[to + 1].s - words[from].s > 2.4;
      if (to + 1 - from >= size || endsSentence || tooLong) break;
      to++;
    }
    out.push({ from, to, s: words[from].s, e: words[to].e });
    from = to + 1;
  }
  return out;
}

/** The chunk being spoken at `t`, or null in a pause. */
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

export const Captions: React.FC<CaptionSettings> = ({ words, chunk = 3, y = 0.72, size = 1, letterCase = "upper" }) => {
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

  const chunks = useMemo(() => (chunk <= 1 ? null : chunkWords(words, chunk)), [words, chunk]);
  const phrase = useMemo(() => {
    if (!chunks) return null;
    for (const c of chunks) if (t >= c.s - 0.02 && t < c.e + 0.35) return c;
    return null;
  }, [chunks, t]);

  const word = phrase ? null : activeWord(words, t);
  let text = "";
  if (phrase) text = words.slice(phrase.from, phrase.to + 1).map((w) => captionText(w.w, letterCase)).filter(Boolean).join(" ");
  else if (word) text = captionText(word.w, letterCase);

  let rect: [number, number, number, number] | null = null;
  let tex: THREE.DataTexture | null = null;
  if (text.length > 0) {
    tex = wordTexture(text);
    const texW = (tex.image as { width: number }).width;
    const texH = (tex.image as { height: number }).height;
    // One font pixel is 1/86 of the frame width; long phrases shrink to fit 88%.
    let px = (width / 86) * size;
    px = Math.min(px, (width * 0.88) / texW);
    // A two-frame pop on the cut to each new phrase. It is what makes the eye follow.
    const born = phrase ? phrase.s : word!.s;
    const pop = 1 + 0.2 * Math.pow(1 - clamp01((t - born) / 0.1), 2);
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
