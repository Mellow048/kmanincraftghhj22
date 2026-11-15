import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BedBox, Dad, EAST, FaceLight, Hero, Pumpkin, Stick, WEST, WallWindow, ease, faceOf, ramp, room, timing, wordAt } from "./kit";

/** He stands in the middle of his room and says it to his dad. The window is in the wall at his back. */
const ME: Vec3 = room(-0.55, 0, -0.35);
const DAD: Vec3 = room(1.45, 0, -0.25);
const WINDOW: Vec3 = room(-2.58, 1.72, -0.1);
const REAL = wordAt("6.want", "real");
const HEARD = wordAt("6.heard", "heard");

const Set = () => (
  <>
    <BedBox position={room(-2.0, 0, -1.3)} />
    <WallWindow position={WINDOW} />
  </>
);

/** WHAT HE SAID. The line nobody says again, and who was at the window when he said it. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "A real golem",
  shots: [
    {
      cue: "6.want",
      ...cam.push({ on: faceOf(ME), dist: 2.3, to: 1.8, yaw: 45, pitch: 3, fov: 36 }),
      zone: "room",
      look: "overworld-night",
      note: "'I told my dad I wanted a real golem': his face, in the blue of the night, saying it. He means it, and he looks at the floor as soon as it is out.",
      stage: (t) => (
        <>
          <Set />
          <Hero position={ME} rotationY={EAST} animation="talk" face={t < REAL + 0.5 ? "angry" : "frown"} headPitch={0.3 * ease(ramp(t, REAL + 0.45, REAL + 0.75))} gaze={0} />
        </>
      ),
    },
    {
      cue: "6.dad",
      ...cam.push({ on: [DAD[0], 1.5, DAD[2]], dist: 2.7, to: 2.25, yaw: -68, pitch: -7, fov: 38 }),
      zone: "room",
      look: "overworld-night",
      note: "'Snow is all we had': his dad, from the boy's height. He opens his hands. There is nothing in them.",
      stage: (t) => (
        <>
          <Set />
          <Dad position={DAD} rotationY={WEST} animation="shrug" blendTo="idle" blend={0.5} animSpeed={0.5} headPitch={0.28} headRoll={0.08 * Math.sin(t * 2)} />
          <FaceLight position={[DAD[0] - 1.3, 1.25, DAD[2] + 0.5]} power={4} reach={3} />
        </>
      ),
    },
    {
      cue: "6.heard",
      ...cam.pan({ from: room(1.15, 1.34, 0.1), on: faceOf(ME), onTo: [WINDOW[0], WINDOW[1], WINDOW[2] + 0.1], fov: 36, fovTo: 31 }),
      zone: "room",
      look: "overworld-night",
      note: "'Puddle was standing right behind me. He heard every word': from the boy's face to the window at his back. A pumpkin is looking in through it, one stick on the sill. It lowers its head and slides out of the glass.",
      stage: (t) => {
        const go = ease(ramp(t, HEARD + 0.3, HEARD + 0.85));
        return (
          <>
            <Set />
            <Hero position={ME} rotationY={EAST + 1.5 * ease(ramp(t, HEARD - 0.4, HEARD - 0.02))} animation="idle" face={t < HEARD ? "frown" : "wow"} headYaw={0.9 * ease(ramp(t, HEARD - 0.45, HEARD - 0.1))} gaze={0} />
            <group position={[WINDOW[0] + 0.2, WINDOW[1] - 0.12 * ease(ramp(t, HEARD, HEARD + 0.3)), WINDOW[2] + 0.75 * go]} rotation={[0, EAST + 0.3 * (1 - go), 0]}>
              <group rotation={[0.42 * ease(ramp(t, HEARD - 0.1, HEARD + 0.3)), 0, 0]}>
                <Pumpkin position={[0, 0, 0]} scale={0.84} />
              </group>
            </group>
            <Stick position={[WINDOW[0] + 0.26, WINDOW[1] - 0.5 - 0.2 * go, WINDOW[2] - 0.45 + 0.75 * go]} rotation={[0, EAST + 0.2, 0.5 - 0.6 * go]} />
            <pointLight position={[WINDOW[0] + 1.0, WINDOW[1] + 0.1, WINDOW[2]]} color="#ffd2a0" intensity={4.5} distance={2.8} decay={2} />
          </>
        );
      },
    },
  ],
});
