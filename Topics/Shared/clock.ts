import { useFilmTime } from "../../src/engine";
import type { Timing } from "../../src/engine";

/**
 * THE FILM'S CLOCK — when a line starts and when a word is said, in seconds of the WHOLE FILM.
 *
 * `wordClock` (staging) answers "how far into its shot is this word?", which is what a shot's
 * `stage` needs. This answers "how long ago was this word said?", which is what anything needs
 * that stays on screen across more than one line: a thing in the world, an exhibit the camera
 * flies away from and comes back to.
 *
 *   export const clock = filmClock(timing);
 *
 *   const Loaf = () => {
 *     const t = clock.useSince("2.price", "emerald");   // negative until the word; then seconds since it
 *     return <PriceTag text="1" scale={pop(t, 0)} … />;
 *   };
 *
 * It throws if the cue or the word is not there, so a script change breaks the build instead of
 * leaving an action on the wrong word. Call `useSince` only OUTSIDE a scene's `stage` (in the
 * world, or in a component the world mounts): inside a scene the engine's clock restarts.
 */
export function filmClock(timing: Timing) {
  const cueOf = (id: string) => {
    const cue = timing.cues.find((c) => c.id === id);
    if (!cue) throw new Error(`filmClock: no cue "${id}" in timing.json`);
    return cue;
  };
  /** Film seconds at which line `cueId` starts; or, with `word`, at which that word of it is said. */
  const at = (cueId: string, word?: string, nth = 0): number => {
    const cue = cueOf(cueId);
    if (word === undefined) return cue.start;
    let seen = 0;
    for (const w of timing.words) {
      if (w.s < cue.start - 0.05 || w.s >= cue.end) continue;
      if (w.w.toLowerCase().replace(/[^a-z']/g, "") === word.toLowerCase()) {
        if (seen === nth) return w.s;
        seen++;
      }
    }
    throw new Error(`filmClock: cue "${cueId}" has no word "${word}" (#${nth}). Its words: ${cue.text}`);
  };
  /** Film seconds at which line `cueId` ends. */
  const end = (cueId: string): number => cueOf(cueId).end;
  /** Seconds since that line began (or that word was said). Negative before it. A hook: see the note above. */
  const useSince = (cueId: string, word?: string, nth = 0): number => useFilmTime() - at(cueId, word, nth);
  return { at, end, useSince };
}
