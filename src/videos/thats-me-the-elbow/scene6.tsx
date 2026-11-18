import { cam, storyScene } from "../../engine";
import { timing, w, go, Shutter } from "./kit";
import { Kid, pose } from "./cast";
import { Family, OUT, Timer, Swap } from "./action";
import { BIG, DoorPhotos, LiftPrint, PIC } from "./paper";
const exit = w("6.fridge", "took"),
  pin = w("6.all", "all"),
  reveal = w("6.all", "instead") + 0.14;
const a = w("6.reps", "hus"),
  b = w("6.reps", "hus", 1),
  c = w("6.reps", "hus", 2),
  flash = c + 0.19;
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The birthday",
  shots: [
    {
      cue: "6.party",
      ...cam.push({ on: [0.07, 1.18, -0.24], dist: 7.88, to: 6.72, yaw: -4, pitch: 5, fov: 45 }),
      zone: "yard",
      note: "Back to the bunting in late afternoon. Everybody gathers, but for once they leave the middle of the birthday table clear.",
      look: "overworld-sunset",
      stage: (t) => <Family t={t} cake={0} partying />,
    },
    {
      cue: "6.cake",
      ...cam.orbit({ on: [0.29, 1.19, 0.02], dist: 3.88, yaw: 14, yawTo: 1, pitch: 10, fov: 40, distTo: 3.647 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Uncle lowers the cake into that clear centre. Frosting and three candles occupy the kid’s old target.",
      stage: (t) => <Family t={t} cake={go(t, 0.11, w("6.cake", "it"))} />,
    },
    {
      cue: "6.light",
      ...cam.orbit({ on: [OUT[0], 1.06, OUT[2]], dist: 1.79, yaw: -147, yawTo: -122, pitch: 11, fov: 37, distTo: 1.683 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "From the family side of the dial the little red lamp is already pulsing. The old route through the cake is gone.",
      stage: (t) => <Timer where={OUT} t={t} blink />,
    },
    {
      cue: "6.behind",
      ...cam.truck({ on: [1.14, 1.38, -0.66], by: [-0.53, 0, -0.13], dist: 4.07, yaw: 20, pitch: 6, fov: 41 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Follow the blue sleeve behind the line. The tall uncle briefly occludes him, exactly what the coated chairs taught him about.",
      stage: (t) => {
        const q = go(t, 0.03, 1.2);
        return (
          <Family
            t={t}
            kid={
              <Kid
                position={[1.63 - 1.02 * q, 0.015, -1.63 + 0.58 * q]}
                rotationY={-1.12}
                animation="run"
                arms="guard"
                animDistance={1.19 * q}
                plantFeet
                face="brave"
                time={t}
              />
            }
          />
        );
      },
    },
    {
      cue: "6.lean",
      ...cam.orbit({ on: [0.4, 1.52, -0.48], dist: 3.8, yaw: 9, yawTo: -3, pitch: 1, fov: 39, distTo: 3.572 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Uncle leans one way to make space. A blue shoulder tries the other side of the hat before the face follows.",
      stage: (t) => {
        const q = go(t, 1.2, 1.87);
        return (
          <Family
            t={t}
            lean={go(t, 0.1, 0.82)}
            kid={
              <Kid
                position={[0.58 - 0.26 * q, 0.012, -1.03]}
                pose={pose({ bodyRoll: 0.19 * q, legL: [-0.19, 0, 0], kneeL: [0.33, 0, 0] })}
                headRoll={0.17 * q}
                face="brave"
                time={t}
              />
            }
          />
        );
      },
    },
    {
      cue: "6.reps",
      ...cam.push({ on: [0.28, 1.41, -0.39], dist: 4.57, to: 4.22, yaw: 1, pitch: 1, fov: 42 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Three live adjustments, not a chant over a reaction: duck behind the brim, sidestep into the notch, then straighten and smile.",
      stage: (t) => {
        const duck = go(t, a - 0.08, a + 0.09) * (1 - go(t, b + 0.01, c + 0.02)),
          slide = go(t, b - 0.055, b + 0.2),
          rise = go(t, c - 0.14, c + 0.04);
        return (
          <Family
            t={t}
            lean={1 - rise}
            kid={
              <Kid
                position={[0.33 - 0.28 * slide, 0.012, -1.03 + 0.66 * slide]}
                pose={pose({
                  bodyY: -0.15 * duck,
                  bodyRoll: 0.13 * (1 - rise),
                  legR: [-0.59 * duck, 0, 0],
                  legL: [-0.52 * duck, 0, 0],
                  kneeR: [1.01 * duck, 0, 0],
                  kneeL: [0.96 * duck, 0, 0],
                })}
                headRoll={-0.13 * rise}
                face={rise > 0.55 ? "grin" : "brave"}
                time={t}
              />
            }
          />
        );
      },
    },
    {
      cue: "6.reps",
      cut: flash,
      ...cam.push({ on: PIC, dist: 3.64, to: 3.36, yaw: 0, pitch: 0, fov: 42 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Click. For the first time there are FIVE readable faces, in the same line around the same cake.",
      stage: (t) => (
        <>
          <LiftPrint t={t} label="GRAN'S BIRTHDAY" name="family" />
          <Shutter t={t} />
        </>
      ),
    },
    {
      cue: "6.fridge",
      ...cam.orbit({ on: [-0.26, 1.35, -0.8], dist: 3.76, yaw: -11, yawTo: 5, pitch: 4, fov: 42, distTo: 3.534 }),
      zone: "kitchen",
      note: "Gran grips the corner; the big old elbow comes down off the green door, exposing a blank patch between the other five prints.",
      stage: (t) => <Swap name="elbow" away={go(t, exit, 1.49)} t={t} />,
    },
    {
      cue: "6.all",
      ...cam.push({ on: [-0.25, 1.36, -0.82], dist: 3.53, to: 3.09, yaw: -3, pitch: 2, fov: 41 }),
      zone: "kitchen",
      note: "Follow her hand back up to the same spot with the whole family instead. No lesson spoken to camera.",
      stage: (t) => <Swap name="family" away={1 - go(t, -0.08, pin + 0.2)} t={t} />,
    },
    {
      cue: "6.all",
      cut: reveal,
      ...cam.push({ on: BIG, dist: 2.22, to: 2.06, yaw: 0, pitch: 0, fov: 40 }),
      zone: "kitchen",
      note: "The magnet, cake, hat, glasses, blue kid and two friends are there together. Hold long enough to count faces.",
      stage: () => <DoorPhotos main="family" />,
    },
  ],
});
