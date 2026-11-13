import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Card, GYM, HEART, Heart, Held, HeroInTie, Mia, NORTH, SOUTH, boing, ease, ramp, timing, wordAt } from "./kit";
import { Dancers, INK, QUESTION } from "./scene10";

const HELD = wordAt("11.card", "held");
const CARD_W = wordAt("11.card", "card");
const DANCE = wordAt("11.ask", "dance");

/** Where they stand under the lights: she faces the door, he faces her, and there is room behind his shoulder. */
export const MIA_AT = GYM.lights;
export const ME_AT: Vec3 = GYM.at(0, 0, 0.95);
export const LEO_AT: Vec3 = GYM.at(-0.55, 0, 1.75);
const WALK_FROM: Vec3 = GYM.at(0, 0, 7.6);
const WALK_TO: Vec3 = GYM.at(0, 0, 3.6);

/**
 * THE ASK. Three short shots and no way back: the walk, the card, her face. The heart over her is small in all
 * three, and it does not move. Everything that happens to it happens in the next scene.
 */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The ask",
  shots: [
    {
      cue: "11.walk",
      look: "overworld-night",
      ...cam.truck({ on: GYM.at(0, 1.05, 7.0), dist: 3.4, yaw: 176, pitch: 4, fov: 44, by: [0, 0, -2.8] }),
      shake: 0.012,
      zone: "gym",
      note: "He comes straight at the lens down the middle of the gym, between the dancers, and the lens backs away in front of him: the card held in both hands like a shield, his dad's tie swinging at his knees, the open door and the night behind him.",
      stage: (t) => {
        const walk = stride(WALK_FROM, WALK_TO, ramp(t, -0.1, 1.3));
        return (
          <>
            <Dancers t={t} aisle keep={(_, z) => z > 2.6} />
            <HeroInTie t={t} swing={1} {...walk} animation="walk" arms="hold" face="brave" gaze={0} />
            <Held by={walk.position} facing={walk.rotationY} out={0.3} up={0.93 + Math.abs(Math.sin(t * 9)) * 0.02}>
              <Card text={QUESTION} scale={0.9} ink={INK} />
            </Held>
          </>
        );
      },
    },
    {
      cue: "11.card",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.25, 0.45), dist: 3.3, to: 3.0, yaw: 125, pitch: 5, fov: 42 }),
      handheld: 0.012,
      impacts: [{ at: HELD + 0.1, amp: 0.035, dur: 0.25 }],
      zone: "gym",
      note: "The two of them in the white beam, from her side: he stops a step short of her, shuts his eyes, and on 'held out' the card snaps up at arm's length between them. The heart over her is small. The tie is still swinging.",
      stage: (t) => {
        const arrive = stride(GYM.at(0, 0, 1.75), ME_AT, ease(ramp(t, -0.25, 0.2)));
        const out = boing(t, HELD - 0.02, 0.45);
        return (
          <>
            <Dancers t={t} aisle keep={(_, z) => z > 2.4} />
            <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" face="smile" headPitch={0.12 * Math.min(1, out)} gaze={0} />
            <Heart over={MIA_AT} size={HEART.small} yaw={125} />
            <HeroInTie t={t} swing={0.5 * (1 - ramp(t, 0.2, 0.8))} position={arrive.position} rotationY={NORTH} animDistance={arrive.animDistance} animation={t < 0.2 ? "walk" : "idle"} arms={out > 0.2 ? "reach" : "hold"} face={t > CARD_W ? "brave" : "fear"} gaze={0} />
            <Held by={arrive.position} facing={NORTH} out={0.26 + 0.3 * out} up={0.95 + 0.2 * out}>
              <Card text={QUESTION} scale={1.05} ink={INK} />
            </Held>
          </>
        );
      },
    },
    {
      cue: "11.ask",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0.02, 1.3, 0), dist: 2.5, to: 2.25, yaw: 24, pitch: 2, fov: 40 }),
      handheld: 0.012,
      zone: "gym",
      note: "Past his shoulder, her face: she reads the card, and on 'dance' she looks up from it at him. She is smiling. The heart over her has not changed by a hair: this is the last second in which he does not know.",
      stage: (t) => {
        const up = ease(ramp(t, DANCE - 0.05, DANCE + 0.2));
        return (
          <>
            <Dancers t={t} keep={(_, z) => z < -1} />
            <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" face={up > 0.5 ? "grin" : "smile"} headPitch={0.3 * (1 - up)} gaze={0} />
            <Heart over={MIA_AT} size={HEART.small} yaw={24} />
            <HeroInTie t={t} position={ME_AT} rotationY={NORTH} animation="idle" arms="reach" face="brave" gaze={0} />
            <Held by={ME_AT} facing={NORTH} out={0.56} up={1.15}>
              <Card text={QUESTION} scale={1.05} ink={INK} />
            </Held>
          </>
        );
      },
    },
  ],
});
