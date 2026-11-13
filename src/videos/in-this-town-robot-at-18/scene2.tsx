import { cam, storyScene } from "../../engine";
import type { FaceName, Vec3 } from "../../engine";
import {
  Ada, Bag, Ball, Bits, Brick, Bubble, Crate, DAY, Dad, FloatHand, HeadAt, Hero, Massager, Mate, NORTH, Nora, PLACE, Pip, STEP, Sam, Shield, SmartBot, ZONE,
  c, ease, front, hop, jolt, l, lerp, pop, ramp, seat, timing, wordAt,
} from "./kit";

const SIT = -0.15;
const at = (col: number, row: number): Vec3 => {
  const s = seat(col, row);
  return [s[0], SIT, s[2]];
};
const ME = at(1, 0);
/** The head on his desk, looking at the class with him. */
const ON_DESK: Vec3 = [ME[0] - 0.36, 1.02, ME[2] - 0.6];

/** Everybody in the class but the teller. `laugh` has them all laughing; `look` turns their heads to him. */
const Class: React.FC<{ face?: FaceName; laugh?: boolean; t: number; slap?: number }> = ({ face = "neutral", laugh = false, t, slap = -9 }) => {
  const a = laugh ? "laugh" : "sit";
  const f: FaceName = laugh ? "laugh" : face;
  const turn = (col: number) => (col < 1 ? -0.5 : col > 1 ? 0.5 : 0);
  const down = ease(ramp(t, slap - 0.12, slap)) * (1 - ease(ramp(t, slap + 0.1, slap + 0.4)));
  const sam = at(3, 1);
  return (
    <>
      <Ada position={at(0, 0)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} headYaw={turn(0)} />
      <Nora position={at(2, 0)} rotationY={NORTH} animation="sit" face={laugh ? "uneasy" : face} headYaw={turn(2)} />
      <Mate n={0} position={at(3, 0)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} headYaw={turn(3)} />
      <Pip position={at(0, 1)} rotationY={NORTH} animation="sit" face={laugh ? "smile" : face} />
      <Mate n={1} position={at(1, 1)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} />
      <Mate n={2} position={at(2, 1)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} />
      <Sam position={sam} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} />
      <FloatHand position={[sam[0] + 0.1, 1.5 - 0.68 * down, sam[2] - 0.5]} rotation={[-Math.PI / 2, 0, 0]} />
      <Bits position={[sam[0] + 0.1, 0.8, sam[2] - 0.5]} t={t - slap} color="#fff2c0" count={8} power={1.6} />
      <Mate n={3} position={at(0, 2)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} />
      <Mate n={4} position={at(1, 2)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} />
      <Mate n={5} position={at(2, 2)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={f} />
      <Brick position={at(3, 2)} rotationY={NORTH} animation="sit" arms={laugh ? a : undefined} face={laugh ? "laugh" : "smug"} />
    </>
  );
};

/** THE FRIENDS' ROBOTS, the head, and the class. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Just a head",
  shots: [
    {
      cue: "3.friends",
      ...cam.push({ on: [0.2, 1.1, 2.4], dist: 8.2, to: 7.2, yaw: 0, pitch: 8, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "Three of his friends in a row in the square: one in purple, one in orange, one in teal. A crate comes down in front of each, one, two, three, and each of them jumps.",
      impacts: [{ at: 0.5, amp: 0.04, dur: 0.25 }, { at: 1.1, amp: 0.04, dur: 0.25 }, { at: 1.7, amp: 0.04, dur: 0.25 }],
      stage: (t) => {
        const xs = [-1.5, 0.2, 1.9];
        const land = [0.5, 1.1, 1.7];
        const who = [Ada, Sam, Nora];
        return (
          <>
            {xs.map((x, i) => {
              const W = who[i];
              const fall = ramp(t, land[i] - 0.4, land[i]);
              return (
                <group key={i}>
                  <W position={[x, hop(t, land[i] + 0.05, 0.3), 1.6]} face={t > land[i] ? "wow" : "smile"} animation={t > land[i] + 0.3 ? "cheer" : "idle"} headPitch={0.2} />
                  <Crate position={[x, 9 * (1 - fall * fall), 2.8]} s={0.8} />
                  <Bits position={[x, 0.2, 3.0]} t={t - land[i]} color="#c9b48a" count={10} power={2} />
                </group>
              );
            })}
          </>
        );
      },
    },
    {
      cue: "3.smart",
      ...cam.push({ on: c(-0.1, 1.55, -2.8), dist: 3.5, to: 3.1, yaw: 0, pitch: 6, fov: 44 }),
      zone: ZONE.classS,
      look: DAY,
      note: "The front of the classroom. The friend in purple stands with her arms out, doing nothing, while a floating screen with eyes writes her homework. On 'corrected' the screen turns to the board and says WRONG.",
      stage: (t) => {
        const hw = wordAt("3.smart", "homework");
        const cor = wordAt("3.smart", "corrected");
        const k = ease(ramp(t, cor - 0.15, cor + 0.2));
        return (
          <>
            <Ada position={c(-0.65, 0, -2.7)} animation="shrug" face="smug" />
            <SmartBot position={c(lerp(0.25, 0.5, k), 1.7 + 0.1 * jolt(t, hw, 0.3) + 0.2 * k, lerp(-2.7, -3.2, k))} rotationY={-0.2 + Math.PI * 0.0} t={t} text={t > cor ? "WRONG" : t > hw ? "A+" : "..."} />
            <group scale={pop(t, cor + 0.1)}>
              <Bubble text="WRONG!" position={c(0.2, 2.75, -3.0)} scale={0.45} tail={1} />
            </group>
          </>
        );
      },
    },
    {
      cue: "3.hand",
      ...cam.truck({ on: [-1.2, 1.15, 3], dist: 6.8, yaw: 0, pitch: 5, fov: 44, by: [1.6, 0, 0] }),
      zone: ZONE.town,
      look: DAY,
      note: "The friend in orange walks up the street with his hands in his pockets. A big white glove floats along behind him, carrying his school bag by the strap.",
      stage: (t, { p }) => {
        const x = -2.0 + 2.4 * p;
        return (
          <>
            <Sam position={[x, 0, 3]} rotationY={Math.PI / 2} animation="walk" animDistance={2.4 * p} face="smug" headYaw={-0.5} />
            <FloatHand position={[x - 0.9, 1.45 + 0.06 * Math.sin(t * 4), 3]} rotation={[0, 0, Math.PI]} grip={1}>
              <Bag position={[0, 0.55, 0]} />
            </FloatHand>
          </>
        );
      },
    },
    {
      cue: "3.nora",
      ...cam.push({ on: [0, 1.2, 2.6], dist: 5.4, to: 4.6, yaw: -24, pitch: 5, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "Nora, in teal, with her arms folded. A little white drone hangs in front of her and throws a square of blue light. Three dodgeballs come at her, one after the other, and bounce off it. She does not blink.",
      stage: (t) => {
        const on = wordAt("3.nora", "shield");
        const d = wordAt("3.nora", "dodgeballs");
        const hits = [wordAt("3.nora", "nothing"), d - 0.1, d + 0.3];
        const N: Vec3 = [0.4, 0, 2.6];
        let hit = 0;
        for (const h of hits) hit = Math.max(hit, jolt(t, h, 0.3));
        return (
          <>
            <Nora position={N} rotationY={-Math.PI / 2} face="smug" animation="idle" />
            <Shield position={[-0.5, 1.2, 2.6]} rotationY={-Math.PI / 2} on={ease(ramp(t, on - 0.15, on + 0.15))} hit={hit} />
            {hits.map((h, i) => {
              const k = (t - h) / 0.35;
              if (k < -1 || k > 2) return null;
              const x = k < 0 ? -0.9 + k * 4.5 : -0.9 - k * 2.2;
              const y = 1.0 + i * 0.3 + (k < 0 ? 0 : k * 1.6 - k * k * 0.9);
              return <Ball key={i} position={[x, y, 2.45 + i * 0.15]} color={i === 1 ? "#f0d24a" : "#d5322b"} />;
            })}
          </>
        );
      },
    },
    {
      cue: "4.turn",
      ...cam.push({ on: [STEP[0] + 0.3, 0.8, STEP[2]], dist: 5.6, to: 4.4, yaw: 0, pitch: 9, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "His own doorstep. He stands with his arms up to the sky. On 'crate' a crate the size of a shoe box drops at his feet. He looks down at it.",
      stage: (t) => {
        const cr = wordAt("4.turn", "crate");
        const fall = ramp(t, cr - 0.4, cr);
        return (
          <>
            <Hero position={[STEP[0] + 0.8, 0, STEP[2]]} animation={t > cr ? "idle" : "cheer"} face={t > cr ? "blank" : "grin"} headPitch={t > cr ? 0.5 : -0.3} headYaw={t > cr ? -0.4 : 0} />
            <Crate position={[STEP[0] - 0.1, 9 * (1 - fall * fall), STEP[2] + 0.3]} s={0.62} />
            <Bits position={[STEP[0] - 0.1, 0.1, STEP[2] + 0.5]} t={t - cr} color="#c9b48a" count={6} power={1.2} />
          </>
        );
      },
    },
    {
      cue: "4.open",
      ...cam.push({ on: [STEP[0] - 0.1, 0.4, STEP[2] + 0.3], dist: 2.6, to: 2.0, yaw: 0, pitch: 32, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "Down into the little crate. The lid goes up. On 'head' we see what is in it: one grey robot head, eyes dark, looking up at us.",
      stage: (t) => {
        const open = ease(ramp(t, 0.1, 0.6));
        return (
          <>
            <Crate position={[STEP[0] - 0.1, 0, STEP[2] + 0.3]} s={0.62} lid={open} />
            <HeadAt position={[STEP[0] - 0.1, 0.36, STEP[2] + 0.3]} rotation={[-0.5, 0, 0]} />
          </>
        );
      },
    },
    {
      cue: "4.just",
      ...cam.push({ on: [STEP[0] + 0.8, 1.2, STEP[2] + 0.3], dist: 3.6, to: 3.0, yaw: 0, pitch: 8, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "He holds the head up in front of him in both hands and turns it round: no body under it, nothing on the sides, nothing written on the bottom. His face goes flat.",
      stage: (t) => {
        const H: Vec3 = [STEP[0] + 0.8, 0, STEP[2]];
        const body = wordAt("4.just", "body");
        const arms = wordAt("4.just", "arms");
        const ins = wordAt("4.just", "instructions");
        const spin = Math.PI * 2 * ease(ramp(t, body - 0.1, arms + 0.3));
        const tip = 1.2 * ease(ramp(t, ins - 0.15, ins + 0.15));
        return (
          <>
            <Hero position={H} animation="hold" face={t > ins ? "blank" : "frown"} headPitch={0.25} />
            <HeadAt position={front(H, 0, 0.5, 0.8)} rotation={[-tip, spin, 0]} />
          </>
        );
      },
    },
    {
      cue: "4.shook",
      ...cam.push({ on: [STEP[0] + 0.8, 1.5, STEP[2]], dist: 4.2, to: 3.8, yaw: 10, pitch: 2, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "He holds the empty crate upside down over his own head and shakes it. On 'nothing' one piece of fluff drifts out and lands on his nose.",
      stage: (t) => {
        const H: Vec3 = [STEP[0] + 0.8, 0, STEP[2]];
        const n = wordAt("4.shook", "nothing");
        const sh = t < n ? Math.sin(t * 34) * 0.09 : 0;
        const fl = ramp(t, n - 0.1, n + 0.5);
        return (
          <>
            <Hero position={H} animation="reachUp" face={t > n ? "blank" : "worried"} headPitch={-0.5} />
            <group position={[H[0] + sh, 2.75 + Math.abs(sh) * 0.6, H[2] + 0.25]} rotation={[Math.PI, 0, sh]}>
              <Crate position={[0, 0, 0]} s={0.62} lid={1} />
            </group>
            <HeadAt position={[H[0] - 0.9, 0.27, H[2] + 0.5]} rotation={[0, 0.4, 0]} />
            {fl > 0 ? <Ball position={[H[0], 2.3 - 0.55 * fl, H[2] + 0.34]} color="#cfc8b8" /> : null}
          </>
        );
      },
    },
    {
      cue: "4.tuesday",
      ...cam.push({ on: l(0.2, 1.05, -1.0), dist: 5.2, to: 4.4, yaw: 0, pitch: 6, fov: 44 }),
      zone: ZONE.living,
      look: DAY,
      note: "The sitting room. Dad, feet on his massager, shrugs: maybe Tuesday. The teller stands beside the sofa holding the head and stares at it. On 'not' a calendar page with a big X goes by.",
      stage: (t) => {
        const not = wordAt("4.tuesday", "not");
        const H = l(-0.5, 0, -0.5);
        return (
          <>
            <Dad position={l(0.65, 0, -1.55)} animation={t < not - 0.4 ? "shrug" : "sit"} face="bearded" headYaw={-0.5} />
            <Massager position={l(0.65, 0, -0.85)} buzz={1} t={t} />
            <Hero position={H} rotationY={0.3} animation="hold" face={t > not ? "sad" : "uneasy"} headPitch={0.3} />
            <HeadAt position={front(H, 0.3, 0.5, 0.8)} rotation={[0, 0.3, 0]} />
            <group scale={pop(t, wordAt("4.tuesday", "tuesday") - 0.1) * (t > not ? 0 : 1)}>
              <Bubble text="TUESDAY?" position={l(0.6, 2.25, -1.4)} scale={0.4} />
            </group>
            <group scale={pop(t, not - 0.05)}>
              <Bubble text="X" position={l(-0.5, 2.3, -0.5)} scale={0.7} />
            </group>
          </>
        );
      },
    },
    {
      cue: "5.school",
      ...cam.push({ on: [ME[0], 1.15, ME[2]], dist: 3.6, to: 3.0, yaw: 192, pitch: 14, fov: 44 }),
      zone: ZONE.classN,
      look: DAY,
      note: "The classroom, from the front. He sits at his desk with the head set in front of him like a lunch box, and smiles at everybody. Everybody else has a robot. On 'mistake' the smile slips.",
      stage: (t) => {
        const m = wordAt("5.school", "mistake");
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="sit" face={t > m ? "uneasy" : "smile"} />
            <HeadAt position={ON_DESK} rotation={[0, Math.PI, 0]} />
            <Class t={t} face="neutral" />
            <Shield position={c(1.05, 1.9, -1.3)} rotationY={Math.PI} on={0} />
          </>
        );
      },
    },
    {
      cue: "5.talk",
      ...cam.push({ on: c(0, 1.25, -0.9), dist: 5.2, to: 4.6, yaw: 180, pitch: 12, fov: 46 }),
      zone: ZONE.classN,
      look: DAY,
      note: "Wider. Two classmates lean in from either side with a question each, in speech bubbles: TALK? WALK? He answers the second one by holding the head up. It is a head.",
      stage: (t) => {
        const talk = wordAt("5.talk", "talk");
        const walk = wordAt("5.talk", "walk");
        const head = wordAt("5.talk", "head");
        const up = 0.45 * ease(ramp(t, head - 0.4, head - 0.1));
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="sit" arms={up > 0.05 ? "hold" : undefined} face={t > walk + 0.4 ? "blank" : "smile"} />
            <HeadAt position={[ON_DESK[0], ON_DESK[1] + up, ON_DESK[2]]} rotation={[0, Math.PI, 0]} />
            <Class t={t} face="grin" />
            <group scale={pop(t, talk - 0.15) * (t > walk + 0.6 ? 0 : 1)}>
              <Bubble text="TALK?" position={c(-1.9, 2.25, -1.2)} rotationY={Math.PI} scale={0.5} tail={1} />
            </group>
            <group scale={pop(t, walk - 0.15) * (t > head + 0.5 ? 0 : 1)}>
              <Bubble text="WALK?" position={c(1.5, 2.25, -1.2)} rotationY={Math.PI} scale={0.5} />
            </group>
          </>
        );
      },
    },
    {
      cue: "5.off",
      ...cam.push({ on: c(-0.1, 1.2, -1.1), dist: 3.6, to: 3.1, yaw: 196, pitch: 10, fov: 44 }),
      zone: ZONE.classN,
      look: DAY,
      note: "The classmate behind him, very helpful, leaning over his shoulder and pointing at the head: off, and on again. The teller looks at the camera.",
      stage: (t) => {
        const off = wordAt("5.off", "off");
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="sit" face="blank" />
            <HeadAt position={ON_DESK} rotation={[0, Math.PI, 0]} eyes={0} />
            <Mate n={1} position={[ME[0] + 0.55, 0, ME[2] + 0.75]} rotationY={NORTH + 0.25} animation="point" face="grin" />
            <Ada position={at(0, 0)} rotationY={NORTH} animation="sit" face="smile" headYaw={-0.5} />
            <Nora position={at(2, 0)} rotationY={NORTH} animation="sit" face="uneasy" headYaw={0.5} />
            <group scale={pop(t, off - 0.2)}>
              <Bubble text="OFF AND ON?" position={c(0.5, 2.35, -0.6)} rotationY={Math.PI} scale={0.4} />
            </group>
          </>
        );
      },
    },
    {
      cue: "5.laugh",
      ...cam.push({ on: c(0, 1.2, -0.2), dist: 6.4, to: 5.6, yaw: 180, pitch: 14, fov: 46 }),
      zone: ZONE.classN,
      look: DAY,
      note: "The whole room, laughing, every head thrown back. At the back the floating glove comes down flat on its owner's desk: slap. In the middle of it, he keeps smiling.",
      impacts: [{ at: 2.3, amp: 0.05, dur: 0.25 }],
      stage: (t) => {
        const slap = wordAt("5.laugh", "slapped");
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="sit" face="smile" headPitch={0.15} />
            <HeadAt position={ON_DESK} rotation={[0, Math.PI, 0]} />
            <Class t={t} laugh slap={slap} />
            {[[-1.6, 2.5], [1.4, 2.7], [0.2, 3.0]].map(([x, y], i) => (
              <group key={i} scale={pop(t, 0.2 + i * 0.35)}>
                <Bubble text="HA HA" position={c(x, y, 0.4 + i * 0.6)} rotationY={Math.PI} scale={0.42} tilt={i % 2 ? 0.15 : -0.15} />
              </group>
            ))}
          </>
        );
      },
    },
    {
      cue: "5.home",
      ...cam.truck({ on: [6.2, 1.3, 2.6], dist: 3.4, yaw: 0, pitch: 3, fov: 42, by: [1.5, 0, 0] }),
      zone: ZONE.town,
      look: DAY,
      note: "He walks home along the street with the head under his arm, smiling the same smile. On 'not' it is gone.",
      stage: (t, { p }) => {
        const not = wordAt("5.home", "not");
        const x = 5.6 + 1.9 * p;
        const H: Vec3 = [x, 0, 2.6];
        return (
          <>
            <Hero position={H} rotationY={Math.PI / 2 - 0.5} animation="walk" arms="hold" animDistance={1.9 * p} face={t > not ? "sad" : "smile"} headPitch={t > not ? 0.4 : 0} />
            <HeadAt position={front(H, Math.PI / 2 - 0.5, 0.48, 1.0)} rotation={[0, Math.PI / 2 - 0.5, 0]} />
          </>
        );
      },
    },
  ],
});
