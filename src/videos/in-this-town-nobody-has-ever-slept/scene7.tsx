import { cam, storyScene } from "../../engine";
import {
  Bubble,
  EAST,
  Hero,
  Hole,
  NORTH,
  OldWick,
  PLACE,
  RuinedDoor,
  SOUTH,
  WEST,
  ease,
  faceOf,
  pop,
  ramp,
  timing,
  villagerFace,
  wordAt,
} from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The Door",
  shots: [
    {
      cue: "7.frame",
      ...cam.push({ on: [0, 1.8, -5.0], dist: 5.5, to: 3.1, yaw: -16, pitch: 8, fov: 44 }),
      zone: "under",
      look: "lava-shore",
      note: "Hero stops stunned as dusty cavern light reveals towering ancient blackstone-gold gate beside bed-shaped trench.",
      stage: (t) => {
        const HOLE = wordAt("7.frame", "hole");
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <Hole position={[PLACE.bedSocket[0], 0.02, PLACE.bedSocket[2]]} size={2.2} rim="#2a1f2d" />
            <Hero
              position={[-0.9 + ease(ramp(t, 0, 1.4)) * 0.4, 0, -2.0]}
              rotationY={NORTH + 0.3}
              animation={t < HOLE ? "walk" : "point"}
              animDistance={t * 0.8}
              face="wow"
              headYaw={-0.3 * ramp(t, HOLE, HOLE + 0.6)}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "7.list",
      ...cam.orbit({ on: faceOf([-0.4, 0, -2.2]), dist: 2.7, yaw: 28, yawTo: -26, pitch: 6, fov: 36 }),
      zone: "under",
      look: "lava-shore",
      note: "Tight orbit round counting Hero ticking off all four clues on trembling fingers under flickering gold portal arch.",
      stage: (t) => {
        const DOOR = wordAt("7.list", "door");
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <Hero
              position={[-0.4, 0, -2.2]}
              rotationY={Math.sin(t * 2.1) * 0.35}
              animation={t < DOOR ? "talk" : "point"}
              face="surprised"
              time={t}
            />
            <Bubble text="THE DOOR!" position={[0.45, 1.75, -2.3]} dark rotationY={0.2} scale={pop(t, DOOR)} />
          </>
        );
      },
    },
    {
      cue: "7.wick",
      ...cam.push({ on: villagerFace([2.2, 0.38, -4.1]), dist: 3.1, to: 1.75, yaw: 18, pitch: 6, fov: 36 }),
      zone: "under",
      look: "lava-shore",
      note: "Camera pushes onto frail purple-robed Old Wick seated flat on blackstone rubble breaking town taboo.",
      stage: (t) => {
        const SITS = wordAt("7.wick", "sits");
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <OldWick position={[2.2, -0.5, -4.1]} sit rotationY={WEST + 0.35} nod={0.15 * Math.sin(t * 2.5)} hmm={t > SITS ? 0.35 : 0.1} />
            <Hero position={[0.2 + ease(ramp(t, 0, 1.2)) * 0.5, 0, -3.1]} rotationY={EAST - 0.3} animation="idle" face="wow" time={t} />
            <Bubble text="HE SITS" position={[2.2, 1.65, -4.1]} dark rotationY={-0.3} scale={pop(t, SITS)} />
          </>
        );
      },
    },
  ],
});
