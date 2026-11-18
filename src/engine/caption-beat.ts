import type { CaptionWord } from './types';

const POP = 0.22;

/** Reserve width for the whole accent. Capping the result each frame would
 * pin a long word at the maximum width, erasing its pop. */
export function captionPixel(width: number, textureWidth: number, size: number, onBeat: boolean) {
  return Math.min(width / 86 * size, width * .88 / (textureWidth * (onBeat ? 1 + POP : 1)));
}

/** At normal speech speed this is round(onset * fps). If two short words land on
 * one frame, give the second its own frame; recover on the next natural gap. */
export function beatFrames(words: readonly CaptionWord[], fps: number): number[] {
  let last = -1;
  return words.map(word => (last = Math.max(last + 1, Math.round(word.s * fps))));
}

/** Sample the *recording's* clock, never a CSS transition or the previous rendered frame.
 * Round onsets to the nearest output frame unless two words compete for it.
 * A short release bridges consecutive words, but never writes over a dramatic silence.
 */
export function captionBeat(words: readonly CaptionWord[], starts: number[], frame: number, fps: number) {
  let lo = 0, hi = words.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (starts[mid] <= frame) lo = mid + 1;
    else hi = mid;
  }
  const word = words[lo - 1];
  if (!word || frame >= Math.max(starts[lo - 1] + 1, Math.ceil((word.e + 0.09) * fps))) return null;
  const age = (frame - starts[lo - 1]) / fps;
  const attack = Math.max(0, 1 - age / 0.13) ** 2;
  return { word, scale: 1 + POP * attack, lift: 0.008 * attack };
}
