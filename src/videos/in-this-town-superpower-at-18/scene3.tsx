import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Brother, DAY, Hero, PLACE, Pig, SOUTH, Sheep, WEST, EAST, ZONE, ease, kidFace, ramp, stride, timing, wordAt } from "./kit";

const ME: Vec3 = [-0.45, 0, 3];
const HIM: Vec3 = [0.45, 0, 3];
const PEN = PLACE.pen;
const P = PLACE.pond;
const KICK = wordAt("3.pigs", "kicked");
const POND = wordAt("3.sheep", "pond");
const LAUGHED = wordAt("3.sheep", "laughed");

/** THE TWINS. One in red, one in black, and what the one in black does to animals. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "I wore red. He wore black",
  shots: [
    {
      cue: "3.twins",
      ...cam.push({ on: [0, 0.85, 3], dist: 4.6, to: 3.9, yaw: 0, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Two eight-year-olds side by side, facing us. The same height, the same hair, the same face. One red shirt, one black.",
      stage: () => (
        <>
          <Hero kid position={ME} rotationY={SOUTH} animation="idle" face="smile" />
          <Brother kid position={HIM} rotationY={SOUTH} animation="idle" face="neutral" />
        </>
      ),
    },
    {
      cue: "3.shirts",
      ...cam.pan({ from: [0, 1.1, 6.4], on: kidFace(ME), onTo: kidFace(HIM), fov: 30 }),
      zone: ZONE.day,
      look: DAY,
      note: "Close, sliding from one face to the other: the boy in red is smiling. The boy in black is smirking.",
      stage: () => (
        <>
          <Hero kid position={ME} rotationY={SOUTH} animation="idle" face="smile" />
          <Brother kid position={HIM} rotationY={SOUTH} animation="idle" face="smug" />
        </>
      ),
    },
    {
      cue: "3.pigs",
      ...cam.push({ on: [PEN[0] + 0.5, 0.55, PEN[2]], dist: 3.8, to: 3.2, yaw: 10, pitch: 12, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The pig pen. The boy in black runs at a pig, and on 'kicked' it goes skidding across the mud.",
      stage: (t) => {
        const k = ease(ramp(t, KICK, KICK + 0.35));
        return (
          <>
            <Brother kid {...stride([PEN[0] - 1.6, 0, PEN[2] + 0.2], [PEN[0] - 0.1, 0, PEN[2] + 0.1], ramp(t, 0, KICK))} animation={t < KICK ? "run" : "laugh"} face="grin" />
            <Pig position={[PEN[0] + 0.6 + 1.3 * k, Math.sin(k * Math.PI) * 0.35, PEN[2] + 0.1]} rotationY={EAST} t={t} shake={k >= 1 ? 1 : 0} />
            <Pig position={[PEN[0] + 1.6, 0, PEN[2] - 1.3]} rotationY={-0.6} t={t} shake={1} />
            <Bits position={[PEN[0] + 0.5, 0.3, PEN[2] + 0.1]} t={t - KICK} color="#5a4030" count={10} seed={4} />
          </>
        );
      },
    },
    {
      cue: "3.sheep",
      ...cam.push({ on: [P[0] + 1.9, 0.6, P[2]], dist: 4.2, to: 3.5, yaw: 28, pitch: 12, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The pond. He shoves a sheep off the edge; on 'pond' it goes in with a splash, and on 'laughed' he throws his head back.",
      stage: (t) => {
        const k = ease(ramp(t, POND - 0.35, POND));
        return (
          <>
            <Sheep position={[P[0] + 2.9 - 1.6 * k, -0.42 * k, P[2]]} rotationY={WEST} tilt={-0.35 * k} />
            <Brother kid position={[P[0] + 3.7 - 0.5 * k, 0, P[2]]} rotationY={WEST} animation={t < LAUGHED ? "idle" : "laugh"} arms={t < POND ? "press" : undefined} time={t - POND + 0.4} face={t < LAUGHED ? "smug" : "laugh"} />
            <Bits position={[P[0] + 1.4, 0.15, P[2]]} t={t - POND} color="#dff0ff" count={16} seed={6} power={1.1} />
          </>
        );
      },
    },
    {
      cue: "3.me",
      ...cam.push({ on: [P[0] + 2.2, 0.6, P[2] + 0.3], dist: 3.8, to: 3.2, yaw: -22, pitch: 10, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The boy in red on his knees at the edge, hauling the soaked sheep out. Behind him his brother is still laughing, now at him.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0.1, 0.75));
        return (
          <>
            <Sheep position={[P[0] + 1.3 + 1.2 * k, -0.42 * (1 - k), P[2] + 0.3]} rotationY={EAST} tilt={-0.3 * (1 - k)} />
            <Hero kid position={[P[0] + 3.0 + 0.5 * k, 0, P[2] + 0.3]} rotationY={WEST} animation="crouch" arms="hug" face="brave" />
            <Brother kid position={[P[0] + 3.6, 0, P[2] - 1.4]} rotationY={-0.7} animation="laugh" face="laugh" />
          </>
        );
      },
    },
  ],
});
