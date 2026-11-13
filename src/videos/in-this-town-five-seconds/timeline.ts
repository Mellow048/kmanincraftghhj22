import data from "./timing.json";
import type { Timing } from "../../engine";
export const timing = data as Timing;
export const cue = (id: string) => {
  const c = timing.cues.find(c => c.id === id);
  if (!c) throw new Error(`Five Seconds: missing cue ${id}`);
  return c;
};
export const at = (id: string, word?: string, nth = 0) => {
  const c = cue(id);
  if (!word) return c.start;
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z']/g, "");
  const words = timing.words.filter(w => w.s >= c.start - .05 && w.s < c.end && clean(w.w) === clean(word));
  if (!words[nth]) throw new Error(`Five Seconds: missing ${id}/${word}/${nth}`);
  return words[nth].s;
};
const frame = (seconds: number) => Math.round(seconds * 30);
const stop = (id: string, start: number) => ({ id, start: frame(start), end: frame(start) + 150 });
/** [start,end) is exactly 150 frames. These are the ONLY complete stops, including the opening demonstration. */
export const STOPS = [
  stop("teaser", 0),
  stop("glass", at("4.five", "smashed") - .13 - 5),
  stop("touch", cue("5.touch").start + .1),
  stop("chalk", at("5.bonk", "hit") - .07 - 5),
  stop("locker", at("8.bang", "returned") + .17 - 5),
  stop("elder", at("11.hit", "returned") + .08 - 5),
  stop("counter", at("17.resume", "Time") - 5),
] as const;
export const STOP = Object.fromEntries(STOPS.map(s => [s.id, { ...s, a:s.start/30, b:s.end/30 }])) as Record<string, {id:string;start:number;end:number;a:number;b:number}>;
export const activeStop = (t:number) => STOPS.find(s => Math.round(t*30) >= s.start && Math.round(t*30) < s.end);
/** All non-hero clocks lose precisely the same 150 frames, including idle motion, eyes, dust and flames. */
export const worldFrame = (frame:number) => {
  const f = Math.round(frame); let lost = 0;
  for (const s of STOPS) {
    if (f < s.start) break;
    if (f < s.end) return s.start-lost;
    lost += s.end-s.start;
  }
  return f-lost;
};
export const worldTime = (t:number) => worldFrame(t*30)/30;
export const paused = (t:number, id:string) => {
  const s=STOP[id]; return t<s.a?t:t<s.b?s.a:t-5;
};
export const BLACK_AT = (Math.ceil(timing.words[timing.words.length-1].e*30)+15)/30;
