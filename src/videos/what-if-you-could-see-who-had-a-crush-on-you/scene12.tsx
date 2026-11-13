import type React from "react";
import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Cup, GYM, HEART, Heart, Held, HeroInTie, Leo, Mia, NORTH, SOUTH, apart, boing, ease, faceOf, ramp, timing, toward, wordAt } from "./kit";
import { Dancers } from "./scene10";
import { LEO_AT, ME_AT, MIA_AT } from "./scene11";

const SHOOK = wordAt("12.shook", "shook");
const GREW = wordAt("12.grew", "grew");
const SEEN = wordAt("12.grew", "seen");
const SURE = wordAt("12.sure", "sure");

/** As big as a heart gets in this film: bigger than the one that reached the lunch room ceiling (1.68). */
export const HUGE = 2.2;
/** Where the tall kid in green comes from, with the drinks. */
const LEO_FROM: Vec3 = GYM.at(-2.0, 0, 4.4);

/** A paper cup in each hand. `offer` (0–1) holds one of them out. */
export const Cups: React.FC<{ by: Vec3; facing: number; offer?: number }> = ({ by, facing, offer = 0 }) => (
  <>
    <Held by={by} facing={facing} out={0.34} up={0.98} side={-0.17}>
      <Cup position={[0, 0, 0]} />
    </Held>
    <Held by={by} facing={facing} out={0.34 + 0.34 * offer} up={0.98 + 0.26 * offer} side={0.17}>
      <Cup position={[0, 0, 0]} />
    </Held>
  </>
);

/**
 * THE ANSWER HE WANTED. Her heart shakes, and grows past anything he has seen, and he has never been so sure.
 * All three pictures show why, to anybody who is not him: somebody has come in at the door, and is walking up
 * behind him with two cups. The heart stops growing when that somebody stops walking.
 */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "The answer he wanted",
  shots: [
    {
      cue: "12.shook",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.3, 0), dist: 2.45, to: 2.25, yaw: -50, pitch: 0, fov: 36 }),
      impacts: [{ at: SHOOK, amp: 0.06, dur: 0.4 }],
      zone: "gym",
      note: "Her face and the heart over it, closer, from the side the door is on: small, still, and on 'shook' it rattles like a thing that has been knocked. Under it her head comes up from the card and round, and her eyes go past him and past the lens, to somebody who has just come in.",
      stage: (t) => {
        const x = t - SHOOK;
        const rattle = x > 0 ? Math.exp(-x * 6) * Math.sin(x * 52) : 0;
        const seen = ramp(t, SHOOK - 0.14, SHOOK + 0.04);
        return (
          <>
            <Dancers t={t} keep={(_, z) => z < -1} />
            {seen > 0.5 ? (
              <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" face="wow" lookAt={faceOf(LEO_FROM)} gaze={0} />
            ) : (
              <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" face="smile" headPitch={0.25} gaze={0} />
            )}
            <Heart over={[MIA_AT[0] + 0.05 * rattle, MIA_AT[1] + 0.025 * Math.abs(rattle), MIA_AT[2]]} size={HEART.small * (1 + 0.3 * Math.abs(rattle))} yaw={-50} />
          </>
        );
      },
    },
    {
      cue: "12.grew",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.8, 0.75), dist: 7.4, to: 6.9, yaw: 216, pitch: -5, fov: 50 }),
      handheld: 0.012,
      impacts: [{ at: GREW, amp: 0.04, dur: 0.3 }],
      zone: "gym",
      note: "The lunch line again, at a dance: she in front, he in the middle staring up, and her heart swelling over them, past the size of the one in the lunch room and on up to the flags, while the tall kid in green walks in from the right with a cup in each hand and stops at his shoulder. It stops growing when he stops walking.",
      stage: (t) => {
        const leo = stride(LEO_FROM, LEO_AT, ease(ramp(t, 0.05, SEEN)));
        const d0 = apart(LEO_FROM, MIA_AT);
        const near = Math.max(0, (d0 - apart(leo.position, MIA_AT)) / (d0 - apart(LEO_AT, MIA_AT)));
        const size = HEART.small + (HUGE - HEART.small) * near ** 1.5 * (0.94 + 0.06 * boing(t, SEEN - 0.1, 0.6));
        return (
          <>
            <Dancers t={t} aisle keep={(x, z) => !(x < -0.9 && z < 0.5)} />
            <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" face="grin" lookAt={faceOf(leo.position)} gaze={0} />
            <Heart over={MIA_AT} size={size} yaw={216} />
            <pointLight position={GYM.at(0.2, 2.0, 1.2)} color="#ff9cc0" intensity={2 + 14 * near} distance={8} decay={2} />
            <HeroInTie t={t} position={ME_AT} rotationY={NORTH} animation="idle" arms="hold" face={near > 0.5 ? "grin" : "wow"} headPitch={-0.15 - 0.45 * near} gaze={0} />
            {t < SEEN ? <Leo {...leo} animation="walk" arms="hold" face="grin" gaze={0} /> : <Leo position={LEO_AT} rotationY={toward(LEO_AT, MIA_AT)} animation="idle" arms="hold" face="grin" gaze={0} />}
            <Cups by={leo.position} facing={t < SEEN ? leo.rotationY : toward(LEO_AT, MIA_AT)} />
          </>
        );
      },
    },
    {
      cue: "12.sure",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.1, 1.18, 0.95), dist: 1.9, to: 1.65, yaw: 172, pitch: 26, fov: 40 }),
      handheld: 0.012,
      zone: "gym",
      note: "The picture from the lunch line, at the dance: seen from where the heart is, his face turned up to it, pink, never so sure. Right behind him, over his head, the tall kid in green holds a cup out past his shoulder to her. He does not look round.",
      stage: (t) => {
        const sure = t - SURE;
        const offer = ease(ramp(t, 0.15, 0.75));
        const facing = toward(LEO_AT, MIA_AT);
        return (
          <>
            <Dancers t={t} aisle keep={(_, z) => z > 4.8} />
            <HeroInTie t={t} position={ME_AT} rotationY={NORTH} animation="idle" face={sure > 0 ? "laugh" : "grin"} headPitch={-0.5} headRoll={sure > 0 ? Math.sin(sure * 9) * 0.07 * Math.exp(-sure * 2) : 0} gaze={0} />
            <Leo position={LEO_AT} rotationY={facing} animation="idle" arms={offer > 0.3 ? "reach" : "hold"} face="grin" headPitch={-0.2} gaze={0} />
            <Cups by={LEO_AT} facing={facing} offer={offer} />
            {/* Neither the heart nor the girl under it is drawn: the lens is inside the one and over the head of the other. Its light is on their faces. */}
            <pointLight position={GYM.at(0.1, 2.4, 0.45)} color="#ff9cc0" intensity={6} distance={7} decay={2} />
          </>
        );
      },
    },
  ],
});
