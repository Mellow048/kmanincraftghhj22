import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Friend, Hero, LID_TOP, PLACE, STOP, TO_HIM, ease, ramp, timing, wordAt } from "./kit";

const FRIEND = wordAt("9.friend", "friend");
const CLIMBED = wordAt("9.off", "climbed");
const TURNED = wordAt("9.back", "turned");

/** Where she sits: on the lid, at the edge of the gap, facing the way he comes. */
const SEAT: Vec3 = [0, LID_TOP - 0.394, 2.42];
const GUARD = PLACE.guard;

/** THE FRIEND. The one person who could stop him is sitting on the lid. She does not stop him, and she does not watch. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The friend",
  shots: [
    {
      cue: "9.friend",
      ...cam.push({ on: [0.1, 4.4, 6], dist: 9.4, to: 8.6, yaw: 186, pitch: -16, fov: 56 }),
      zone: "village",
      note: "'My best friend was sitting on the lid': what he sees as he walks up. She is on the slab, at the edge of the gap, legs out, hat down. And over her, over his roof, the thing she is sitting there to keep out.",
      stage: (t) => (
        <>
          <Friend position={SEAT} rotationY={Math.PI} sit nod={0.36 - 0.3 * ease(ramp(t, FRIEND, FRIEND + 0.4))} />
          <Hero {...stride([0.85, 0, -2.7], STOP, ease(ramp(t, 0, FRIEND)))} animation={t < FRIEND ? "walk" : "idle"} face="uneasy" gaze={0} />
        </>
      ),
    },
    {
      cue: "9.off",
      ...cam.pan({ from: [-2.4, 1.15, -1.9], on: [-0.3, 1.3, 2.3], onTo: [GUARD[0] + 0.05, 1.0, GUARD[2]], fov: 44 }),
      zone: "village",
      note: "'She climbed off without a word': she slides off the lid and lands beside the well. Then her brim comes up, just enough, and for one second she looks at him. Nobody in this town does that.",
      stage: (t) => {
        const k = ease(ramp(t, CLIMBED, CLIMBED + 0.42));
        const hop = Math.sin(k * Math.PI) * 0.22;
        return (
          <Friend
            position={[SEAT[0] + (GUARD[0] - SEAT[0]) * k, SEAT[1] * (1 - k) + hop, SEAT[2] + (GUARD[2] - SEAT[2]) * k]}
            rotationY={Math.PI + (TO_HIM - Math.PI) * k}
            sit={k < 0.45}
            nod={0.3 - 0.42 * ease(ramp(t, 0.7, 1.05))}
            tilt={0.12 * ease(ramp(t, 0.8, 1.2))}
          />
        );
      },
    },
    {
      cue: "9.back",
      ...cam.push({ on: [GUARD[0], 1.0, GUARD[2]], dist: 2.5, to: 2.2, yaw: 176, pitch: -4, fov: 40 }),
      zone: "village",
      note: "'And turned her back': she turns right round and stands with her back to the well and her hat down. She will not help him. She will not stop him. She will not see.",
      stage: (t) => {
        const k = ease(ramp(t, TURNED - 0.05, TURNED + 0.4));
        return <Friend position={GUARD} rotationY={TO_HIM + Math.PI * k} nod={-0.12 + 0.52 * k} walk={k * 0.5} />;
      },
    },
  ],
});
