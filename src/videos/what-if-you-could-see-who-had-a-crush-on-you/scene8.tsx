import type React from "react";
import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Classmate, Cook, HEART, Heart, Held, Hero, Jo, LUNCH, Leo, Mia, NORTH, SOUTH, TALL, Tray, WEST, apart, ease, faceOf, joHeart, jolt, ramp, timing, wordAt } from "./kit";

const SPOT_W = wordAt("8.line", "spot");
const BEHIND = wordAt("8.line", "behind");
const GREW = wordAt("8.ceiling", "grew");
const CEILING = wordAt("8.ceiling", "ceiling");
const FOR_ME = wordAt("8.mine", "me");
const JO_W = wordAt("8.seat", "jo");
const SEAT = wordAt("8.seat", "seat");
const APART = wordAt("8.apart", "apart");

/** The line along the counter, front to back: Mia, him, and the tall kid in green who came in behind him. */
const MIA_AT = LUNCH.line(1);
const ME_AT = LUNCH.line(2);
const LEO_AT = LUNCH.line(3);
const RUN_FROM = LUNCH.at(1.9, 0, -2.5);
const LEO_FROM = LUNCH.at(3.3, 0, -2.45);
/** How big her heart is by the end of 8.line, and when it has reached the ceiling (3.5 m). */
const MID = 0.5;
const FULL = 3.5 - TALL.kid - 0.34 - 0.04;

/** The table he sits at: Mia on his right hand, the tall kid across from her. No place left on the bench. */
const HIS_SEAT = LUNCH.seat(0, "n", 0);
const MIAS_SEAT = LUNCH.seat(0, "n", -0.9);
const KIDS_SEAT = LUNCH.seat(0, "n", 0.9);
const LEOS_SEAT = LUNCH.seat(0, "s", -0.9);
/** Jo comes from the line with her tray, stops behind him, and goes. */
const JO_FROM = LUNCH.at(0.3, 0, -2.7);
const JO_STOPS = LUNCH.at(-2.2, 0, -2.66);
const JO_GOES = LUNCH.at(-0.9, 0, -2.5);
/** Where she eats: the far corner of the room, alone. */
const JOS_SEAT = LUNCH.seat(3, "n", 0);

/** A tray in somebody's two hands. */
const Carried: React.FC<{ by: Vec3; facing: number }> = ({ by, facing }) => (
  <Held by={by} facing={facing} out={0.36} up={0.8}>
    <Tray position={[0, 0, 0]} />
  </Held>
);

/** His table at lunch, as it is once they have sat down: seen close in 8.seat and from across the room in 8.apart. */
const HisTable: React.FC<{ t: number; yaw: number; me?: boolean }> = ({ t, yaw, me = true }) => (
  <>
    {me ? <Hero position={HIS_SEAT} rotationY={SOUTH} animation="sit" arms="talk" face="laugh" headYaw={-0.75} headRoll={Math.sin(t * 7) * 0.05} gaze={0} /> : null}
    <Mia position={MIAS_SEAT} rotationY={SOUTH} animation="sit" face="grin" headYaw={0.15} />
    <Classmate who={8} position={KIDS_SEAT} rotationY={SOUTH} animation="sit" arms="hold" face="smile" headPitch={0.25} />
    <Leo position={LEOS_SEAT} rotationY={NORTH} animation="sit" arms="talk" face="grin" />
    {[HIS_SEAT, MIAS_SEAT, KIDS_SEAT].map((at, i) => (
      <Tray key={i} position={[at[0], 0.68, at[2] + 0.42]} />
    ))}
    <Tray position={[LEOS_SEAT[0], 0.68, LEOS_SEAT[2] - 0.42]} rotationY={Math.PI} />
    {/* Mia's heart: the tall kid is right across the table from her */}
    <Heart over={MIAS_SEAT} tall={TALL.seated} size={HEART.big} yaw={yaw} />
  </>
);

/**
 * THE SECOND TRY. This time it works, and that is the trap: her heart goes up to the ceiling with him standing
 * right behind her. So is the tall kid in green, right behind HIM. The price is paid in the same scene: there is no
 * seat for Jo, and when she sits down on the far side of the room her heart is small. Nobody says so.
 */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The second try",
  shots: [
    {
      cue: "8.line",
      ...cam.push({ on: LUNCH.at(-1.75, 1.34, -3.15), dist: 3.5, to: 3.1, yaw: -68, pitch: 6, fov: 46 }),
      handheld: 0.012,
      impacts: [{ at: SPOT_W, amp: 0.05, dur: 0.3 }],
      zone: "lunch",
      note: "The lunch line, from its front: Mia with her tray, and him running the length of the room to brake into the place behind her, a nose ahead of the tall kid in green, who stops right behind him. She looks round at them, and her heart starts to grow.",
      stage: (t) => {
        // He runs, faster and faster, and brakes: past his place by a hand, and back.
        const k = ramp(t, 0.3, SPOT_W - 0.08) ** 1.5;
        const run = stride(RUN_FROM, [ME_AT[0] - 0.16, 0, ME_AT[2]], k);
        const settle = t - (SPOT_W - 0.08);
        const me: Vec3 = settle > 0 ? [ME_AT[0] - 0.16 * Math.exp(-settle * 6) * Math.cos(settle * 13), 0, ME_AT[2]] : run.position;
        const leo = stride(LEO_FROM, LEO_AT, ease(ramp(t, 0.75, BEHIND + 0.3)));
        const arrived = ramp(t, BEHIND, BEHIND + 0.3);
        const round = ease(ramp(t, SPOT_W - 0.3, SPOT_W + 0.15));
        const size = HEART.small + (MID - HEART.small) * ease(ramp(t, SPOT_W + 0.1, BEHIND + 0.5));
        return (
          <>
            <Cook position={LUNCH.at(0.2, 0, -5.2)} rotationY={SOUTH} animation="idle" arms="reach" />
            <Mia position={MIA_AT} rotationY={WEST + 0.8 * round} animation="idle" arms="hold" face={arrived > 0.5 ? "grin" : "smile"} headYaw={0.85 * round} gaze={0} />
            <Carried by={MIA_AT} facing={WEST + 0.8 * round} />
            <Heart over={MIA_AT} size={size} yaw={-68} />
            {settle > 0 ? <Hero position={me} rotationY={WEST} animation="idle" arms="hold" face="grin" gaze={0} /> : <Hero {...run} animation="run" arms="hold" face="wow" gaze={0} />}
            <Carried by={me} facing={settle > 0 ? WEST : run.rotationY} />
            {arrived >= 1 ? <Leo position={LEO_AT} rotationY={WEST} animation="idle" arms="hold" face="smile" gaze={0} /> : <Leo {...leo} animation="walk" arms="hold" face="smile" gaze={0} />}
            <Carried by={leo.position} facing={arrived >= 1 ? WEST : leo.rotationY} />
          </>
        );
      },
    },
    {
      cue: "8.ceiling",
      ...cam.push({ on: LUNCH.at(-1.95, 1.72, -3.15), dist: 3.5, to: 3.85, yaw: -62, pitch: 0, fov: 58 }),
      handheld: 0.012,
      impacts: [{ at: CEILING, amp: 0.07, dur: 0.4 }],
      zone: "lunch",
      note: "The three of them in the line, and her heart going up and up over their heads until it bumps the ceiling on 'ceiling' and the dust comes down. He stares up at it. She is looking past him, at the one behind him.",
      stage: (t) => {
        const k = ease(ramp(t, GREW - 0.25, CEILING)) ** 1.4;
        const size = (MID + (FULL - MID) * k) * (1 - 0.03 * Math.abs(jolt(t, CEILING, 1)));
        // The tall kid shuffles up as the line moves: that is all it takes.
        const leo: Vec3 = [LEO_AT[0] - 0.24 * k, 0, LEO_AT[2]];
        return (
          <>
            <Cook position={LUNCH.at(0.2, 0, -5.2)} rotationY={SOUTH} animation="idle" arms="reach" />
            <Mia position={MIA_AT} rotationY={WEST + 0.8} animation="idle" arms="hold" face="grin" headYaw={0.85} headPitch={-0.12} gaze={0} />
            <Carried by={MIA_AT} facing={WEST + 0.8} />
            <Heart over={MIA_AT} size={size} yaw={-62} />
            <pointLight position={[MIA_AT[0], 2.3, MIA_AT[2] + 0.9]} color="#ff9cc0" intensity={2 + 10 * k} distance={7} decay={2} />
            <Hero position={ME_AT} rotationY={WEST} animation="idle" arms="hold" face={k > 0.6 ? "grin" : "wow"} headPitch={-0.2 - 0.4 * k} gaze={0} />
            <Carried by={ME_AT} facing={WEST} />
            <Leo position={leo} rotationY={WEST} animation="idle" arms="hold" face="grin" lookAt={faceOf(MIA_AT)} gaze={0} />
            <Carried by={leo} facing={WEST} />
            <Bits position={[MIA_AT[0], 3.44, MIA_AT[2]]} t={t - CEILING} color="#f1ecdc" count={12} seed={5} power={0.45} />
          </>
        );
      },
    },
    {
      cue: "8.mine",
      ...cam.push({ on: LUNCH.at(-1.2, 1.22, -3.15), dist: 2.1, to: 1.8, yaw: -64, pitch: 2, fov: 38 }),
      handheld: 0.012,
      zone: "lunch",
      note: "His face, pink in the light of it, looking up: it had to be for me. On 'me' both fists go up. And over his shoulder, where he never looks, the face of the tall kid in green, smiling the way she is smiling. The dance ends on this same picture.",
      stage: (t) => {
        const yes = ramp(t, FOR_ME - 0.05, FOR_ME + 0.05);
        const hop = yes > 0 ? 0.1 * Math.abs(Math.sin((t - FOR_ME) * 9)) * Math.exp(-(t - FOR_ME) * 2) : 0;
        return (
          <>
            <Hero position={[ME_AT[0], hop, ME_AT[2]]} rotationY={WEST} animation="idle" arms={yes > 0.5 ? "cheer" : "hold"} face="grin" headPitch={-0.38 + 0.3 * yes} headYaw={0.35 * yes} gaze={0} />
            <Leo position={[LEO_AT[0] - 0.24, 0, LEO_AT[2]]} rotationY={WEST} animation="idle" arms="hold" face="grin" headYaw={0.12} gaze={0} />
            <Mia position={MIA_AT} rotationY={WEST + 0.8} animation="idle" arms="hold" face="grin" headYaw={0.85} />
            <Heart over={MIA_AT} size={FULL} yaw={-64} />
            <pointLight position={[MIA_AT[0] + 0.4, 2.1, MIA_AT[2] + 0.8]} color="#ff9cc0" intensity={12} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "8.seat",
      ...cam.push({ on: LUNCH.at(-2.3, 1.3, -2.2), dist: 3.6, to: 3.3, yaw: 8, pitch: 4, fov: 46 }),
      handheld: 0.012,
      zone: "lunch",
      note: "His table, full: he is turned to Mia and laughing. Jo comes up behind him with her tray, her heart swelling as she comes, and stops. There is no place on the bench. He does not look round. On 'seat' she goes, and it shrinks behind her.",
      stage: (t) => {
        const come = ease(ramp(t, -0.1, JO_W));
        const go = ease(ramp(t, SEAT + 0.05, SEAT + 0.75));
        const walk = go > 0 ? stride(JO_STOPS, JO_GOES, go) : stride(JO_FROM, JO_STOPS, come);
        const still = come >= 1 && go <= 0;
        // Her heart, by how far she is from him: the rule, behind his back.
        const size = joHeart(apart(walk.position, HIS_SEAT));
        return (
          <>
            <HisTable t={t} yaw={8} />
            {still ? (
              <Jo position={JO_STOPS} rotationY={SOUTH + 0.2} animation="idle" arms="hold" face="uneasy" headPitch={0.3} headYaw={Math.sin((t - JO_W) * 6) * 0.3} gaze={0} />
            ) : (
              <Jo {...walk} animation="walk" arms="hold" face={go > 0 ? "frown" : "smile"} gaze={0} />
            )}
            <Carried by={walk.position} facing={still ? SOUTH + 0.2 : walk.rotationY} />
            <Heart over={walk.position} size={size} yaw={8} />
          </>
        );
      },
    },
    {
      cue: "8.apart",
      ...cam.push({ on: LUNCH.at(1.6, 1.2, 1.1), dist: 4.2, to: 3.8, yaw: 36, pitch: 5, fov: 50 }),
      handheld: 0.012,
      zone: "lunch",
      note: "The whole room between them: Jo in front, alone at her table, and his table small and loud in the far corner. She looks back at it once and then at her tray. The heart over her is small. It was the biggest in the school an hour ago.",
      stage: (t) => {
        const back = ease(ramp(t, 0.1, 0.5)) - ease(ramp(t, APART - 0.75, APART - 0.3));
        return (
          <>
            <HisTable t={t} yaw={36} />
            <Jo position={JOS_SEAT} rotationY={SOUTH} animation="sit" arms="hold" face={back > 0.5 ? "uneasy" : "frown"} headYaw={-1.05 * back} headPitch={0.3 * (1 - back)} gaze={0} />
            <Tray position={[JOS_SEAT[0], 0.68, JOS_SEAT[2] + 0.42]} />
            <Heart over={JOS_SEAT} tall={TALL.seated} size={joHeart(apart(JOS_SEAT, HIS_SEAT))} yaw={36} />
            {/* the room is full: just not near her */}
            <Classmate who={3} position={LUNCH.seat(1, "n", -0.6)} rotationY={SOUTH} animation="sit" arms="talk" face="grin" />
            <Classmate who={7} position={LUNCH.seat(1, "n", 0.6)} rotationY={SOUTH} animation="sit" face="laugh" />
            <Classmate who={11} position={LUNCH.seat(1, "s", 0)} rotationY={NORTH} animation="sit" arms="talk" face="smile" />
            <Cook position={LUNCH.at(0.2, 0, -5.2)} rotationY={SOUTH} animation="idle" />
          </>
        );
      },
    },
  ],
});
