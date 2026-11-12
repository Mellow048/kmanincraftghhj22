import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { DAY, Hero, Mom, NIGHT, NORTH, PLACE, Snow, Table, EAST, ZONE, ease, faceOf, kidFace, ramp, room, timing } from "./kit";

const G = PLACE.gate;
const WAIT: Vec3 = [G[0], 0, G[2] + 0.9];
const TABLE = room(0.7, 0, 0.5);

/** HE WAITS. Then he stops. His mother does not. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Ten winters",
  shots: [
    {
      cue: "5.wait",
      ...cam.push({ on: kidFace(WAIT), dist: 2.7, to: 2.2, yaw: 168, pitch: 0, fov: 38 }),
      zone: ZONE.day,
      look: NIGHT,
      note: "Night. From up the road, looking back: the boy in red standing under the gate, staring past us up the empty road.",
      stage: () => <Hero kid position={WAIT} rotationY={NORTH} animation="idle" face="worried" gaze={0} />,
    },
    {
      cue: "5.next",
      ...cam.push({ on: kidFace(WAIT), dist: 3.8, to: 3.3, yaw: 172, pitch: 8, fov: 40 }),
      zone: ZONE.day,
      look: NIGHT,
      note: "The next night, from the road: the same gate, the same moon, and now he is sitting down to wait.",
      stage: () => <Hero kid position={WAIT} rotationY={NORTH} animation="sit" />,
    },
    {
      cue: "5.winter",
      ...cam.push({ on: kidFace(WAIT), dist: 3.0, to: 2.6, yaw: 160, pitch: 4, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The same picture, white: snow on the ground, snow falling, a small boy in red at the gate.",
      stage: (t) => (
        <>
          <Snow position={[G[0], 0, G[2]]} t={t} />
          <Hero kid position={WAIT} rotationY={NORTH} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "5.ten",
      ...cam.push({ on: [WAIT[0], 1.3, WAIT[2]], dist: 3.2, to: 2.9, yaw: 160, pitch: 4, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The same picture again, and he is grown: a young man in a red shirt, standing in the snow where the boy stood.",
      stage: (t) => (
        <>
          <Snow position={[G[0], 0, G[2]]} t={t + 3} />
          <Hero position={WAIT} rotationY={NORTH} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "5.forgot",
      ...cam.push({ on: faceOf(WAIT), dist: 2.4, to: 1.9, yaw: 150, pitch: 0, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "Summer. He looks up the road once more, then turns his back on it and walks out of the frame.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0.3, 0.8));
        return <Hero position={[WAIT[0], 0, WAIT[2] + 0.8 * k]} rotationY={NORTH + Math.PI * k} animation={k > 0 && k < 1 ? "walk" : "idle"} face="calm" />;
      },
    },
    {
      cue: "5.plates",
      ...cam.top({ on: [TABLE[0], 0.8, TABLE[2]], height: 3.3, to: 2.6, spin: [-8, 6], fov: 46 }),
      zone: ZONE.room,
      look: DAY,
      note: "Straight down on the table at home. His mother beside it. Four plates: three with bread on, and one clean and empty, for someone who is not there.",
      stage: () => (
        <>
          <Table position={TABLE} />
          <Mom position={[TABLE[0] - 1.35, 0, TABLE[2]]} rotationY={EAST} nod={0.3} />
        </>
      ),
    },
  ],
});
