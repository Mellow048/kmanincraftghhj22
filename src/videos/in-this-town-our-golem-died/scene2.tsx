import { cam, storyScene } from "../../engine";
import { Hero, IronGolem, PLACE, ROBE, SOUTH, Villager, ease, ramp, timing, wordAt } from "./kit";

const WELL = PLACE.well;
const KEEP = wordAt("2.keep", "one");

/**
 * BEAT 2 — three things nobody knew, and the one rule.
 *
 * The golem does not sleep and does not break; the well is full of flowers and nobody will say why;
 * and the only thing the town will say about it is a rule with no reason. Every shot here is a
 * different size and a different height, so no two neighbours look alike (OWNER.md, Rule B).
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nobody knew",
  shots: [
    {
      cue: "2.sleep",
      ...cam.push({ on: [19.2, 2.1, 2.0], dist: 7.2, to: 6.3, yaw: -96, pitch: 3, fov: 44 }),
      zone: "gate",
      look: "lantern-night",
      note: "'Nobody had ever seen it sleep': the golem standing in the gate at three in the morning, the town behind it dark, one lantern burning. It does not move for the whole shot except its head.",
      stage: (t) => (
        <>
          <IronGolem position={[19.6, 0, 2.0]} rotationY={SOUTH + 3.1} headYaw={Math.sin(t * 0.6) * 0.22} />
        </>
      ),
    },
    {
      cue: "2.break",
      ...cam.push({ on: [18.8, 1.6, 2.0], dist: 6.0, to: 5.0, yaw: -76, pitch: -14, fov: 44 }),
      zone: "gate",
      look: "lantern-night",
      note: "'Nobody had ever seen it break': from the ground at its feet, looking up its body. Iron, rivets, no crack, no rust, nothing missing. The angle is the point — a thing up there cannot be hurt.",
      stage: () => <IronGolem position={[18.6, 0, 2.0]} rotationY={SOUTH + 2.6} />,
    },
    {
      cue: "2.well",
      ...cam.top({ on: [WELL[0], 0.9, WELL[2]], height: 8.2, to: 6.8, spin: [-6, 4], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Why the well was full of flowers': straight down. The stone ring, the lid hanging off it, and fourteen flowers standing round the rim in a ring, as if somebody had put one there for every year.",
      stage: () => <></>,
    },
    {
      cue: "2.rule",
      ...cam.pan({
        from: [-0.4, 1.42, 5.6],
        on: [WELL[0] + 0.9, 0.95, WELL[2] + 0.4],
        onTo: [-3.0, 1.72, 4.6],
        fov: 38,
        fovTo: 36,
      }),
      zone: "village",
      look: "overworld-day",
      note: "'The oldest rule in town was about those flowers': the look travels from the flowers up to the oldest woman standing beside them. She is old enough to have put most of them there.",
      stage: () => (
        <>
          <Villager position={[-3.0, 0, 4.6]} rotationY={SOUTH + 1.2} robe={ROBE.white} hat="straw" phase={0.4} hmm={0.4} />
          <Hero position={[-1.4, 0, 6.4]} rotationY={SOUTH + 0.4} animation="idle" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "2.keep",
      ...cam.push({ on: [WELL[0] + 0.55, 1.0, WELL[2] + 0.95], dist: 2.6, to: 2.1, yaw: 12, pitch: 20, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Never keep one': as close as the film ever gets to a flower, and it is not a pretty flower — it is a thing somebody left. On the word, the woman's hand comes into the top of the frame and does not touch it.",
      stage: (t) => (
        <>
          <mesh position={[WELL[0] + 0.62, 1.16 - ease(ramp(t, KEEP, KEEP + 0.7)) * 0.06, WELL[2] + 0.95]} castShadow>
            <boxGeometry args={[0.1, 0.18, 0.06]} />
            <meshStandardMaterial color="#c98a6a" roughness={1} />
          </mesh>
        </>
      ),
    },
  ],
});
