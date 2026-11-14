import { cam, storyScene } from "../../engine";
import { Hero, IronGolem, PLACE, ROBE, SOUTH, Villager, ease, ramp, timing } from "./kit";

const PORCH = PLACE.porch;
const FOOT = PLACE.porchFoot;

/**
 * BEATS 4 and 5 — the itch, and the one person who should know and will not say.
 *
 * He wants to be needed; the golem is a wall between him and everything. Then he asks the oldest
 * woman in town the only question he has, and she answers it with a rule that has no reason in it,
 * and walks away. The walking-away shot is a truck, so the last thing in the beat is her back.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The itch, and the rule",
  shots: [
    {
      cue: "4.protect",
      ...cam.push({ on: [-1.2, 1.3, 2.4], dist: 4.4, to: 3.7, yaw: 16, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'But the golem protected all of us': the boy walking in the golem's shadow, the golem's arm across the top of the frame. He is the small thing under the big thing, and he is looking up at it, not at where he is going.",
      stage: (t) => (
        <>
          <IronGolem position={[0.2, 0, 1.4]} rotationY={SOUTH + 0.3} />
          <Hero position={[-1.9, 0, 3.4]} rotationY={SOUTH - 0.2} animation="walk" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "4.need",
      ...cam.push({ on: [-1.9, 1.18, 3.4], dist: 1.5, to: 1.2, yaw: 6, pitch: -14, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'I wanted it to need me': from slightly below his chin, so the golem's shoulder is out of frame and he is looking at something taller than the lens. One thought on one face.",
      stage: () => (
        <>
          <Hero position={[-1.9, 0, 3.4]} rotationY={SOUTH} animation="idle" face="brave" gaze={0} />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.push({ on: [PORCH[0], 1.45, PORCH[2] + 0.3], dist: 3.9, to: 3.2, yaw: 4, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'So I asked the oldest woman in town why': she is half a block above him on the porch, so the two of them stack up the frame and he has to look up to ask. One of them is very still.",
      stage: () => (
        <>
          <Villager position={PORCH} rotationY={SOUTH} robe={ROBE.white} hat="straw" phase={0.4} hmm={0.3} />
          <Hero position={[FOOT[0] + 0.2, 0, FOOT[2] + 0.1]} rotationY={SOUTH - 0.15} animation="idle" face="uneasy" gaze={0} />
        </>
      ),
    },
    {
      cue: "5.say",
      ...cam.push({ on: [PORCH[0] - 0.05, 1.72, PORCH[2]], dist: 1.75, to: 1.42, yaw: 18, pitch: -3, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "The rule, said to his face: her face fills the frame, one eye and a hat brim, and she does not blink in the whole shot.",
      stage: () => (
        <>
          <Villager position={PORCH} rotationY={SOUTH + 0.1} robe={ROBE.white} hat="straw" nod={0.06} phase={0.4} />
        </>
      ),
    },
    {
      cue: "5.again",
      ...cam.push({ on: [FOOT[0] + 0.2, 1.2, FOOT[2] + 0.1], dist: 2.4, to: 1.9, yaw: -34, pitch: -10, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'I asked her again': over her shoulder, from behind, looking up at the porch — we see the back of her robe and his face asking. A different side of the same conversation, which is what a cut has to be.",
      stage: () => (
        <>
          <Villager position={[FOOT[0] + 0.3, 0, FOOT[2] - 1.1]} rotationY={SOUTH + 3.15} robe={ROBE.white} hat="straw" phase={0.4} />
          <Hero position={[FOOT[0] + 0.2, 0, FOOT[2] + 0.1]} rotationY={SOUTH} animation="idle" face="uneasy" gaze={0} />
          <Villager position={PORCH} rotationY={SOUTH} robe={ROBE.white} phase={0.4} />
        </>
      ),
    },
    {
      cue: "5.walk",
      ...cam.truck({ on: [PORCH[0] - 1.4, 1.2, PORCH[2] + 0.6], dist: 3.2, yaw: -62, pitch: 3, by: [1.5, 0, -1.4], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'She walked away': the lens goes with her back, and his small shape is left standing at the foot of the porch, getting smaller without the camera having to leave him behind.",
      stage: (t, { p }) => (
        <>
          <Villager position={[PORCH[0] - 1.4 + 1.5 * p, 0.5, PORCH[2] - 1.4 * p]} rotationY={SOUTH + 3.0} robe={ROBE.white} hat="straw" walk={p * 2.0} phase={0.4} />
          <Hero position={[FOOT[0] + 0.2, 0, FOOT[2] + 0.1]} rotationY={SOUTH} animation="idle" face="frown" gaze={0} />
        </>
      ),
    },
  ],
});

void ease;
void ramp;
