import type { FaceName } from "../../engine";
import edit from "./edit.json";
import meter from "./voice-meter.json";

// One expression per line. A vowel is not a new reaction: eyes, brows and gaze
// are held while Finn speaks. The scene still owns every reaction between lines.
const acting: Record<string, { face: FaceName; gaze: -1 | 0 | 1 }> = {
  goal: { face: "smile", gaze: -1 },
  boast: { face: "smug", gaze: 0 },
  decline: { face: "frown", gaze: 0 },
  ask: { face: "smile", gaze: 0 },
  almost: { face: "uneasy", gaze: -1 },
};

const dialogue = edit.voice.flatMap(line => {
  const expression = acting[line.id];
  if (!expression) return [];
  const length = line.regions.reduce((s, [a, b]) => s + (b - a) / line.tempo, 0)
    + line.gap * (line.regions.length - 1);
  return [{ ...expression, start: line.at - 2, end: Math.ceil(line.at + length * edit.fps) + 2 }];
});

const weights = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
const center = (weights.length - 1) / 2;
const total = weights.reduce((sum, weight) => sum + weight, 0);

/** A centred eleven-frame envelope moves only the jaw, not the head pose.
 * No threshold swaps and no extra mouth action on the scrub breaths. */
export function finnDialogue(frame: number) {
  const line = dialogue.find(({ start, end }) => start <= frame && frame < end);
  if (!line) return null;
  const envelope = weights.reduce((sum, weight, i) => {
    const f = frame + i - center;
    return sum + weight * (f >= line.start && f < line.end ? meter.finn[f] ?? 0 : 0);
  }, 0) / total;
  const mouth = Math.min(1, Math.max(0, (envelope - 0.065) / 0.8));
  return { face: line.face, gaze: line.gaze, mouth };
}
