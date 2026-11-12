import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { ASIDE, BedBox, CHILD, HOLE, Hero, Hole, NightLight, ROBE, SOUTH, Villager, ramp, room, timing, wordAt } from "./kit";

/** The friend stands on the far side of the hole, his back to the wall, facing us. */
const FRIEND: Vec3 = room(-1.2, 0, -2.04);
const ME: Vec3 = room(-0.2, 0, 0.1);
const STAYED = wordAt("9.sleeves", "stayed");

const Set = () => (
  <>
    <BedBox position={ASIDE} />
    <Hole position={HOLE} size={0.95} rim="#8a6a40" />
    <NightLight />
  </>
);

/** THE FRIEND. He has no hands to wave with. He tries anyway. This is what the last line pays back. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The friend",
  shots: [
    {
      cue: "9.friend",
      // Room coordinates plus the room's origin, z = 80: behind his right shoulder, looking down at the hole.
      from: [-0.12, 1.8, 82.05],
      to: [-0.16, 1.7, 81.7],
      target: [-1.15, 0.75, 78.3],
      fov: 40,
      ease: "inOutSine",
      zone: "room",
      look: "overworld-night",
      note: "'My best friend was waiting by the hole': past the teller's head and shoulder. The open hole in the floor, and behind it the small green villager, lit by the torch, looking up at him.",
      stage: () => (
        <>
          <Set />
          <Villager position={FRIEND} rotationY={SOUTH} scale={CHILD} kid robe={ROBE.friend} lookAt={[ME[0], 1.2, ME[2]]} phase={1.1} />
          <Hero position={ME} rotationY={-2.95} animation="idle" face="uneasy" lookAt={[FRIEND[0], 1.0, FRIEND[2]]} />
        </>
      ),
    },
    {
      cue: "9.wave",
      ...cam.push({ on: [FRIEND[0], 0.9, FRIEND[2]], dist: 2.0, to: 1.72, yaw: 12, pitch: 2, fov: 36 }),
      zone: "room",
      look: "overworld-night",
      note: "'He tried to wave goodbye': the friend, close. The folded arms heave and shake as he tries to get one out.",
      stage: (t) => (
        <>
          <Set />
          <Villager position={FRIEND} rotationY={SOUTH} scale={CHILD} kid robe={ROBE.friend} strain={ramp(t, 0.15, 0.45)} lookAt={[ME[0], 1.2, ME[2]]} phase={1.1} />
        </>
      ),
    },
    {
      cue: "9.sleeves",
      ...cam.pan({ from: room(-1.05, 0.86, -0.55), on: room(-1.2, 0.76, -2.0), onTo: room(-1.2, 1.02, -2.0), fov: 22, fovTo: 32 }),
      zone: "room",
      look: "overworld-night",
      note: "'His arms stayed in his sleeves': on the sleeves, filling the frame, as they give up and go still. Then up and back to the one face he has, which cannot say it either.",
      stage: (t) => (
        <>
          <Set />
          <Villager
            position={FRIEND}
            rotationY={SOUTH}
            scale={CHILD}
            kid
            robe={ROBE.friend}
            strain={1 - ramp(t, STAYED - 0.1, STAYED + 0.25)}
            nod={0.3 * ramp(t, STAYED + 0.2, STAYED + 0.7)}
            phase={1.1}
          />
        </>
      ),
    },
  ],
});
