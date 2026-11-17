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

/** The table he sits at: Mia on his right hand, a kid on his left. No place left on the bench. */
const HIS_SEAT = LUNCH.seat(0, "n", 0);
const MIAS_SEAT = LUNCH.seat(0, "n", -0.9);
const KIDS_SEAT = LUNCH.seat(0, "n", 0.9);
/** Jo comes from the line with her tray, stops behind the bench, and goes. */
// A step and a half back from the bench: any nearer, and the lens (which looks down over the table) loses her
// face behind the heads of the ones who are sitting.
const JO_IN = LUNCH.at(-0.9, 0, -3.3);
const JO_STOPS = LUNCH.at(-2.36, 0, -3.3);
const JO_OUT = LUNCH.at(-0.5, 0, -3.2);
/** Where she eats: the far corner of the room, alone. */
const JOS_SEAT = LUNCH.seat(3, "n", 0);

/** A tray in somebody's two hands. */
const Carried: React.FC<{ by: Vec3; facing: number }> = ({ by, facing }) => (
  <Held by={by} facing={facing} out={0.36} up={0.8}>
    <Tray position={[0, 0, 0]} />
  </Held>
);

/**
 * His table at lunch, once they have sat down: seen close in 8.seat and from across the room in 8.apart.
 * The tall kid in green is not at it, and so the heart over Mia is small again, with the teller sitting right
 * next to her. He does not notice that either.
 */
const HisTable: React.FC<{ t: number; yaw: number }> = ({ t, yaw }) => (
  <>
    <Hero position={HIS_SEAT} rotationY={SOUTH} animation="sit" arms="talk" face="laugh" headYaw={-0.75} headRoll={Math.sin(t * 7) * 0.05} gaze={0} />
    <Mia position={MIAS_SEAT} rotationY={SOUTH} animation="sit" face="smile" headYaw={0.15} />
    <Classmate who={4} position={KIDS_SEAT} rotationY={SOUTH} animation="sit" arms="hold" face="smile" headPitch={0.25} />
    {[HIS_SEAT, MIAS_SEAT, KIDS_SEAT].map((at, i) => (
      <Tray key={i} position={[at[0], 0.68, at[2] + 0.42]} />
    ))}
    <Heart over={MIAS_SEAT} tall={TALL.seated} size={HEART.small} yaw={yaw} />
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
      ...cam.push({ on: LUNCH.at(-1.75, 1.35, -3.15), dist: 3.9, to: 3.5, yaw: -38, pitch: 5, fov: 46 }),
      handheld: 0.012,
      impacts: [{ at: SPOT_W, amp: 0.05, dur: 0.3 }],
      zone: "lunch",
      note: "The lunch line, from the tables: Mia with her tray and a small heart, and him running in from the right to brake into the place behind her, a nose ahead of the tall kid in green, who stops right behind him. She looks round at them, and her heart starts to grow.",
      stage: (t) => {
        // He runs, faster and faster, and brakes: past his place by a hand, and back.
        const k = ramp(t, 0.05, SPOT_W - 0.08) ** 1.4;
        const run = stride(RUN_FROM, [ME_AT[0] - 0.16, 0, ME_AT[2]], k);
        const settle = t - (SPOT_W - 0.08);
        const me: Vec3 = settle > 0 ? [ME_AT[0] - 0.16 * Math.exp(-settle * 6) * Math.cos(settle * 13), 0, ME_AT[2]] : run.position;
        const leo = stride(LEO_FROM, LEO_AT, ease(ramp(t, 0.6, BEHIND + 0.3)));
        const arrived = ramp(t, BEHIND, BEHIND + 0.3);
        const round = ease(ramp(t, SPOT_W - 0.3, SPOT_W + 0.15));
        const size = HEART.small + (MID - HEART.small) * ease(ramp(t, SPOT_W + 0.1, BEHIND + 0.5));
        return (
          <>
            <Cook position={LUNCH.at(0.2, 0, -5.2)} rotationY={SOUTH} animation="idle" arms="reach" />
            <Mia position={MIA_AT} rotationY={WEST + 0.8 * round} animation="idle" arms="hold" face={arrived > 0.5 ? "grin" : "smile"} headYaw={0.85 * round} gaze={0} />
            <Carried by={MIA_AT} facing={WEST + 0.8 * round} />
            <Heart over={MIA_AT} size={size} yaw={-38} />
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
      ...cam.push({ on: LUNCH.at(-1.85, 1.72, -3.15), dist: 4.8, to: 5.1, yaw: -38, pitch: -9, fov: 56 }),
      handheld: 0.012,
      impacts: [{ at: CEILING, amp: 0.08, dur: 0.45 }],
      zone: "lunch",
      note: "From low down, the ceiling in the top of the frame: the three of them in the line and her heart going up and up over their heads until it bumps the ceiling on 'ceiling' and the dust comes down. He stares up at it. She is looking past him, at the one behind him.",
      stage: (t) => {
        const k = ease(ramp(t, GREW - 0.25, CEILING)) ** 1.4;
        const size = (MID + (FULL - MID) * k) * (1 - 0.04 * Math.abs(jolt(t, CEILING, 1)));
        // The tall kid shuffles up as the line moves: that is all it takes.
        const leo: Vec3 = [LEO_AT[0] - 0.24 * k, 0, LEO_AT[2]];
        return (
          <>
            <Cook position={LUNCH.at(0.2, 0, -5.2)} rotationY={SOUTH} animation="idle" arms="reach" />
            <Mia position={MIA_AT} rotationY={WEST + 0.8} animation="idle" arms="hold" face="grin" headYaw={0.85} headPitch={-0.12} gaze={0} />
            <Carried by={MIA_AT} facing={WEST + 0.8} />
            <Heart over={MIA_AT} size={size} yaw={-38} />
            <pointLight position={[MIA_AT[0] - 0.5, 1.5, MIA_AT[2] + 0.9]} color="#ff9cc0" intensity={1 + 4 * k} distance={6} decay={2} />
            <Hero position={ME_AT} rotationY={WEST} animation="idle" arms="hold" face={k > 0.6 ? "grin" : "wow"} headPitch={-0.2 - 0.4 * k} gaze={0} />
            <Carried by={ME_AT} facing={WEST} />
            <Leo position={leo} rotationY={WEST} animation="idle" arms="hold" face="grin" lookAt={faceOf(MIA_AT)} gaze={0} />
            <Carried by={leo} facing={WEST} />
            {[-0.55, 0, 0.5].map((dx, i) => (
              <Bits key={i} position={[MIA_AT[0] + dx, 3.44, MIA_AT[2] + 0.1]} t={t - CEILING - i * 0.03} color="#f1ecdc" count={9} seed={5 + i} power={0.5} />
            ))}
          </>
        );
      },
    },
    {
      cue: "8.mine",
      ...cam.push({ on: [ME_AT[0] + 0.12, 1.18, ME_AT[2]], dist: 2.0, to: 1.8, yaw: -80, pitch: 26, fov: 40 }),
      handheld: 0.012,
      zone: "lunch",
      note: "Seen from where the heart is: his face turned up to it, pink in its light, sure. On 'me' he bounces on his toes. And right behind him, over his head, the face of the tall kid in green, looking the same way and smiling the same smile. The dance ends on this picture.",
      stage: (t) => {
        const yes = t - FOR_ME;
        const hop = yes > 0 ? 0.09 * Math.abs(Math.sin(yes * 10)) * Math.exp(-yes * 2.5) : 0;
        const me: Vec3 = [ME_AT[0], hop, ME_AT[2]];
        const leo: Vec3 = [LEO_AT[0] - 0.24, 0, LEO_AT[2]];
        return (
          <>
            <Hero position={me} rotationY={WEST} animation="idle" arms="hold" face={yes > 0 ? "laugh" : "grin"} headPitch={-0.5} headRoll={yes > 0 ? Math.sin(yes * 10) * 0.08 * Math.exp(-yes * 2) : 0} gaze={0} />
            <Carried by={me} facing={WEST} />
            <Leo position={leo} rotationY={WEST} animation="idle" arms="hold" face="grin" headPitch={-0.2} gaze={0} />
            <Carried by={leo} facing={WEST} />
            {/* Neither the heart nor the girl under it is drawn: the lens is inside the one and over the head of the other. Its light is on their faces. */}
            <pointLight position={[MIA_AT[0] + 0.15, 2.3, MIA_AT[2] + 0.3]} color="#ff9cc0" intensity={6} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "8.seat",
      ...cam.push({ on: LUNCH.at(-2.7, 1.45, -2.2), dist: 4.0, to: 3.75, yaw: 6, pitch: 15, fov: 46 }),
      handheld: 0.012,
      zone: "lunch",
      note: "His table, full: he is turned to Mia and laughing, a kid on his other side. Jo comes along behind the bench with her tray and the biggest heart in the room, and stops. There is no place. He does not look round. On 'seat' she turns and goes.",
      stage: (t) => {
        const come = ease(ramp(t, -0.15, JO_W - 0.12));
        const go = ease(ramp(t, SEAT + 0.02, SEAT + 0.9));
        const walk = go > 0 ? stride(JO_STOPS, JO_OUT, go) : stride(JO_IN, JO_STOPS, come);
        const still = come >= 1 && go <= 0;
        return (
          <>
            <HisTable t={t} yaw={6} />
            {still ? (
              <Jo position={JO_STOPS} rotationY={SOUTH + 0.1} animation="idle" arms="hold" face="uneasy" headPitch={0.32} headYaw={Math.sin((t - JO_W) * 7) * 0.35} gaze={0} />
            ) : (
              <Jo {...walk} animation="walk" arms="hold" face={go > 0 ? "frown" : "smile"} gaze={0} />
            )}
            <Carried by={walk.position} facing={still ? SOUTH + 0.1 : walk.rotationY} />
            {/* Her heart, by how far she is from him: the rule, behind his back. */}
            <Heart over={walk.position} size={joHeart(apart(walk.position, HIS_SEAT))} yaw={6} />
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
