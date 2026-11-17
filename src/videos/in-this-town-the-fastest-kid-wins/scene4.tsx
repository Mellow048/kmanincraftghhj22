import { MinecraftAvatar, cam, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Vec3 } from "../../engine";
import {
  BENCH, BENCH_TOP, BIRCH, Baby, Bits, Board, CUP, DAY, DESERT, DustRing, FIELDS, FINISH, Field, GATE_X, Glint, Hero, LANE, LINE_X, OAK, Place, Player, Puffs, RIVER, ROBE, SHOE, START_X, Streaks, SubscribeSign,
  Sweat, Villager, at, babyFace, ease, faceOf, hop, jolt, pop, ramp, timing, wordAt,
} from "./kit";

const E = Math.PI / 2;
/** How fast the race is run, metres a second. The lens trucks at the same speed. */
const V = 6;

/** The runner in first place: black and white, nobody else is. */
const Rival: React.FC<Partial<MinecraftAvatarProps>> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#c98f6a" hair="#ececec" colors={{ torso: "#22222c", arms: "#22222c", legs: "#101014" }} scale={0.86} blink shoes={SHOE} shoeGlow={0.8} {...p} />
);

/** The start: three rows behind the line, seven across. He is in the middle of the front row, the baby beside him. */
const ROW = [0.1, 0.72, 1.36, 2.0, 2.64, 3.28, 3.9];
const Lineup: React.FC<{ t: number; go?: number; me?: boolean; set?: boolean }> = ({ t, go = 99, me = true, set = false }) => {
  const d = Math.max(0, t - go);
  return (
    <>
      {Array.from({ length: 21 }, (_, i) => {
        const row = Math.floor(i / 7);
        const z = ROW[i % 7] + (row % 2) * 0.2;
        const x = START_X - 0.75 - row * 0.95 + d * (5.4 + ((i * 7) % 5) * 0.45);
        if (i === 3) return me ? <Hero key={i} position={[START_X - 0.75 + d * 5.2, 0, z]} rotationY={E} animation={d > 0 ? "run" : set ? "crouch" : "idle"} animDistance={d > 0 ? d * 5.2 : undefined} face="brave" shoes={SHOE} shoeGlow={0.4} /> : null;
        if (i === 4) return <Baby key={i} position={[x, 0, z]} rotationY={E} walk={d * 9} />;
        if (i % 3 === 2) return <Villager key={i} position={[x, 0, z]} rotationY={E} walk={d * 6} robe={[ROBE.brown, ROBE.white, ROBE.smith, ROBE.farmer, ROBE.red, ROBE.blue][i % 6]} lean={d > 0 ? 0.3 : 0} phase={i} />;
        if (i === 6) return <Rival key={i} position={[x, 0, z]} rotationY={E} animation={d > 0 ? "run" : set ? "crouch" : "idle"} animDistance={d > 0 ? d * 6 : undefined} face="calm" shoes={undefined} />;
        return <Player key={i} who={i} position={[x, 0, z]} rotationY={E} animation={d > 0 ? "run" : set ? "crouch" : "idle"} animDistance={d > 0 ? d * 6 : undefined} face="brave" phase={i * 0.7} />;
      })}
    </>
  );
};
const MUM: Vec3 = [START_X + 1.3, 0, -0.9];
const DAD: Vec3 = [START_X + 2.3, 0, -0.9];
const Parents: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Player who={5} position={MUM} rotationY={-0.5} animation="wave" face="smile" />
    <Player who={8} position={[DAD[0], hop(t % 0.7, 0, 0.1, 0.35), DAD[2]]} rotationY={-0.5} animation="cheer" face="laugh" />
    <group position={[DAD[0] - 0.3, 2.75, DAD[2]]} rotation={[0, -0.3, Math.sin(t * 5) * 0.06]}>
      <Board post={false} position={[0, 0.46, 0]} text="PLEASE" scale={0.9} />
      <Board post={false} position={[0, 0, 0]} text="NOT LAST" scale={0.9} />
    </group>
  </>
);

/** Where he celebrates, just past the line; and the two seats on the log (x from BENCH), with the height and depth that put thighs ON it. */
const CELE_X = GATE_X + 2.6;
const MEX = -0.6;
const RVX = 0.6;
const SIT_Y = BENCH_TOP - 0.4;
const SIT_Z = 0.1;

/** One stretch of the race: him at `x`, the field round him, and his place on a card over his head. */
const Stretch: React.FC<{ o: Vec3; x: number; t: number; ahead: number; card?: string; cardAt?: number; baby?: boolean; gap?: number; face?: string; yaw?: number }> = ({
  o, x, t, ahead, card, cardAt = 0.1, baby = true, gap = 1.1, face = "brave", yaw = 0,
}) => (
  <>
    <Field x={o[0] + x} z={o[2] + LANE} ahead={ahead} d={x} baby={baby} gap={gap} />
    <Hero position={at(o, x, 0, LANE)} rotationY={E} animation="run" animDistance={x + 80} face={face as never} shoes={SHOE} shoeGlow={0.5} />
    <Puffs position={at(o, x - 0.5, 0.05, LANE)} color="#c9b98a" count={3} rise={0.25} spread={0.2} size={0.06} speed={2} opacity={0.5} />
    {card ? <Place text={card} position={at(o, x + 0.2, 2.15, LANE)} rotationY={yaw} scale={0.62 * pop(t, cardAt)} /> : null}
  </>
);

/**
 * ACT 7, 8 and 9. The start line, stage one of four (the road, the wheat, the birch wood, the rivers), second place,
 * a log to sit on, and the feet of the runner who came first.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The race",
  shots: [
    {
      cue: "7.week",
      ...cam.truck({ on: [START_X - 0.75, 0.45, 0.9], dist: 3.6, yaw: 84, pitch: 22, fov: 46, by: [0, 0, 1.1] }),
      zone: "village",
      look: DAY,
      note: "The start line from the ground: a row of feet, boots and robes, and the lens slides along them to one pair of red shoes.",
      stage: (t) => <Lineup t={t} />,
    },
    {
      cue: "7.long",
      ...cam.push({ on: [START_X + 4, 1, LANE], dist: 9, to: 15, yaw: -90, pitch: 24, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "Up and back from behind the line: all twenty-one of them, the crowd, and the street running out of town ahead.",
      stage: (t) => (
        <>
          <Lineup t={t} />
          <Parents t={t} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Villager key={i} position={[START_X + 1 + i * 1.5, 0, 5.2]} rotationY={Math.PI} robe={[ROBE.red, ROBE.blue, ROBE.white, ROBE.farmer, ROBE.brown][i]} nod={Math.sin(t * 6 + i) * 0.2} phase={i} />
          ))}
        </>
      ),
    },
    {
      cue: "7.long",
      cut: wordAt("7.long", "over") - 0.25,
      ...cam.top({ on: at(RIVER, 1, 0, LANE), height: 17, to: 13, spin: [-70, -95], fov: 54 }),
      zone: "river",
      look: DAY,
      note: "The end of the first part, from the air: the line, the rest camp on the bank, and two rivers across the track with a bridge over each.",
      stage: () => null,
    },
    {
      cue: "7.far",
      ...cam.orbit({ on: at(DESERT, 4, 1.5, LANE), dist: 15, yaw: -60, yawTo: -40, pitch: 12, fov: 54 }),
      zone: "desert",
      look: DAY,
      note: "The desert: sand, cactus and red rock as far as the lens goes, and the pale line of the track through it.",
      stage: () => null,
    },
    {
      cue: "7.far",
      cut: wordAt("7.far", "through") - 0.2,
      ...cam.push({ on: at(OAK, 6, 1.6, LANE), dist: 9, to: 5, yaw: -90, pitch: -6, fov: 56 }),
      zone: "oak",
      look: DAY,
      note: "The dark oak forest, from the track, going in: big trunks close on both sides and light in bars.",
      stage: () => null,
    },
    {
      cue: "7.far",
      cut: wordAt("7.far", "into") - 0.2,
      ...cam.push({ on: [CUP[0], 1.5, CUP[2]], dist: 12, to: 6.5, yaw: -90, pitch: 3, fov: 44 }),
      zone: "finish",
      look: DAY,
      note: "The last village, down the track: the black and white gate, and behind it the cup on its stone.",
      stage: (t) => <Glint position={[CUP[0] - 0.3, 1.7, CUP[2]]} t={t - 0.4} size={1.6} />,
    },
    {
      cue: "7.rest",
      ...cam.orbit({ on: at(RIVER, GATE_X + 5, 1.1, -1.5), dist: 10.5, distTo: 8.5, yaw: 34, yawTo: 8, pitch: 15, pitchTo: 10, fov: 50 }),
      zone: "river",
      look: DAY,
      note: "The rest camp at the rivers, empty, waiting: the line, tents, a log to sit on, cups of water on a table, and one villager with nothing to do yet.",
      stage: (t) => (
        <>
          <Villager position={at(RIVER, GATE_X + 1.6, 0, -4.1)} rotationY={0.2} robe={ROBE.white} nod={Math.sin(t * 2) * 0.1} hat="straw" />
          <Glint position={at(RIVER, GATE_X + 1.6, 1.0, -3.2)} t={t - 0.5} size={0.9} />
        </>
      ),
    },
    {
      cue: "7.twenty",
      ...cam.truck({ on: [START_X - 0.9, 1.05, 0.2], dist: 3.0, yaw: 62, pitch: 6, fov: 46, by: [0, 0, 2.5] }),
      zone: "village",
      look: DAY,
      note: "Along the front row at chest height, faces going past: a player, a villager, a player, him.",
      stage: (t) => <Lineup t={t} />,
    },
    {
      cue: "7.twenty",
      cut: wordAt("7.twenty", "that") - 0.2,
      ...cam.push({ on: babyFace([START_X - 0.75, 0, ROW[4]]), dist: 1.5, to: 1.1, yaw: 100, pitch: -6, fov: 38 }),
      zone: "village",
      look: DAY,
      note: "And that baby: close, from below, bouncing on the spot. It turns its head and looks at him.",
      stage: (t) => (
        <>
          <Baby position={[START_X - 0.75, Math.abs(Math.sin(t * 9)) * 0.06, ROW[4]]} rotationY={E} turn={0.9 * ease(ramp(t, 0.3, 0.6))} />
          <Hero position={[START_X - 0.75, 0, ROW[3]]} rotationY={E} animation="idle" face="uneasy" headYaw={-0.6} shoes={SHOE} />
        </>
      ),
    },
    {
      cue: "7.sign",
      ...cam.push({ on: [(MUM[0] + DAD[0]) / 2 - 0.1, 1.95, MUM[2]], dist: 5.6, to: 4.9, yaw: -20, pitch: -4, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Mum waving, dad jumping, and the sign over his head, which says what the family really hopes for: PLEASE NOT LAST.",
      stage: (t) => <Parents t={t} />,
    },
    {
      cue: "7.count",
      ...cam.push({ on: [START_X - 0.75, 1.3, LANE], dist: 5.6, to: 4.8, yaw: 90, pitch: 4, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "Head on, down the street: everybody down and ready, the numbers over them one by one, and on GO the whole row comes at the lens.",
      stage: (t) => {
        const w = [wordAt("7.count", "Three"), wordAt("7.count", "Two"), wordAt("7.count", "One"), wordAt("7.count", "Go")];
        const i = t >= w[3] ? 3 : t >= w[2] ? 2 : t >= w[1] ? 1 : 0;
        return (
          <>
            <Lineup t={t} go={w[3]} set />
            <Place text={["3", "2", "1", "GO!"][i]} position={[START_X + 0.2, 2.45, LANE]} rotationY={E} scale={1.7 * pop(t, w[i])} />
            <DustRing position={[START_X - 0.75, 0.05, LANE]} t={t - w[3]} size={3} color="#b79d63" />
            <Streaks position={[START_X, 0.8, LANE]} yaw={E} t={t - w[3]} n={12} spread={2} speed={14} />
          </>
        );
      },
    },

    // ------------------------------------------------------------------ 8. stage one
    {
      cue: "8.fifteen",
      ...cam.truck({ on: [24, 0.9, LANE], dist: 8.5, yaw: -24, pitch: 16, fov: 50, by: [V * 2.0, 0, 0] }),
      ease: "linear",
      zone: "village",
      look: DAY,
      note: "The road out of the village, flags over it, fences and vegetable plots going by: the lens flies beside the pack. He is near the back, and the card says so.",
      stage: (t, { p }) => <Stretch o={[0, 0, 0]} x={24 + V * 2.0 * p} t={t} ahead={14} card="15th" gap={0.95} />,
    },
    {
      cue: "8.eleven",
      ...cam.truck({ on: at(FIELDS, -6, 0.8, LANE), dist: 9, yaw: 58, pitch: 26, fov: 48, by: [V * 1.3, 0, 0] }),
      ease: "linear",
      zone: "fields",
      look: DAY,
      note: "The wheat fields, from in front and above: gold on both sides, a windmill behind, the string of runners with him in the middle of it.",
      stage: (t, { p }) => (
        <>
          <Stretch o={FIELDS} x={-6 + V * 1.3 * p} t={t} ahead={10} card="11th" yaw={1.0} gap={1.25} />
          <Sweat position={at(FIELDS, -6 + V * 1.3 * p + 2.5, 1.3, LANE + 0.9)} t={t} />
        </>
      ),
    },
    {
      cue: "8.eleven",
      cut: wordAt("8.eleven", "Then") - 0.15,
      ...cam.truck({ on: at(FIELDS, 9, 0.9, LANE), dist: 5.2, yaw: -30, pitch: 8, fov: 48, by: [V * 0.9, 0, 0] }),
      ease: "linear",
      zone: "fields",
      look: DAY,
      note: "Lower and from the other side, the fence and a scarecrow going by: two more are behind him now.",
      stage: (t, { p }) => <Stretch o={FIELDS} x={9 + V * 0.9 * p} t={t} ahead={8} card="9th" cardAt={0.2} yaw={-0.5} gap={1.4} face="grin" />,
    },
    {
      cue: "8.six",
      ...cam.truck({ on: at(BIRCH, -10, 0.9, LANE), dist: 5.6, yaw: 16, pitch: 4, fov: 50, by: [V * 1.5, 0, 0] }),
      ease: "linear",
      zone: "birch",
      look: DAY,
      note: "The birch wood: white trunks whipping across the front of the lens, bars of light, and him sixth.",
      stage: (t, { p }) => <Stretch o={BIRCH} x={-10 + V * 1.5 * p} t={t} ahead={5} card="6th" baby={false} yaw={0.3} gap={1.6} face="grin" />,
    },
    {
      cue: "8.six",
      cut: wordAt("8.six", "past") - 0.4,
      ...cam.truck({ on: at(BIRCH, 3.2, 0.75, LANE + 0.3), dist: 3.2, yaw: 68, pitch: 6, fov: 44, by: [4 * 1.4, 0, 0] }),
      ease: "linear",
      zone: "birch",
      look: DAY,
      note: "The baby, running for once, from in front: and the yellow shirt comes up behind it and goes by on the outside.",
      stage: (t, { p }) => {
        const b = 3.2 + 4 * 1.4 * p;
        const me = b - 2.6 + 4.4 * p;
        return (
          <>
            <Baby position={at(BIRCH, b, 0, LANE + 0.6)} rotationY={E} walk={b * 2} turn={me > b - 0.6 ? -0.9 : 0} lean={0.3} />
            <Hero position={at(BIRCH, me, 0, LANE - 0.45)} rotationY={E} animation="run" animDistance={me * 1.4 + 40} face="grin" headYaw={me > b - 0.8 ? 0.7 : 0} shoes={SHOE} shoeGlow={0.6} />
            <Streaks position={at(BIRCH, me - 0.6, 0.6, LANE - 0.45)} yaw={E} t={t} n={6} spread={0.5} speed={10} />
          </>
        );
      },
    },
    {
      cue: "8.six",
      cut: wordAt("8.six", "waved") - 0.35,
      ...cam.truck({ on: at(BIRCH, 12, 1.15, LANE), dist: 2.3, yaw: 74, pitch: 2, fov: 40, by: [V * 0.9, 0, 0] }),
      ease: "linear",
      zone: "birch",
      look: DAY,
      note: "Him, close, running at us: he does not look back, he just puts one hand up and waves it. The baby is a small green dot behind.",
      stage: (t, { p }) => {
        const x = 12 + V * 0.9 * p;
        return (
          <>
            <Hero position={at(BIRCH, x, 0, LANE)} rotationY={E} animation="run" arms="wave" animDistance={x + 40} face="laugh" gaze={0} shoes={SHOE} />
            <Baby position={at(BIRCH, x - 3.2 - t * 2.4, 0, LANE + 0.5)} rotationY={E} walk={x * 2} />
          </>
        );
      },
    },
    {
      cue: "8.two",
      ...cam.truck({ on: at(RIVER, -56, 0.95, LANE), dist: 4.6, yaw: 40, pitch: 8, fov: 46, by: [V * 0.9, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "Open ground, nobody round him any more: the card says second, and he cannot believe it.",
      stage: (t, { p }) => {
        const x = -56 + V * 0.9 * p;
        return (
          <>
            <Field x={RIVER[0] + x - 3} z={RIVER[2] + LANE} ahead={0} d={x} gap={1.5} />
            <Hero position={at(RIVER, x, hop(t, 0.25, 0.3, 0.35), LANE)} rotationY={E} animation="run" animDistance={x + 80} face="wow" shoes={SHOE} shoeGlow={0.6} />
            <Place text="2nd" position={at(RIVER, x + 0.2, 2.2, LANE)} rotationY={0.6} scale={0.7 * pop(t, 0.08)} />
          </>
        );
      },
    },
    {
      cue: "8.two",
      cut: wordAt("8.two", "rivers") - 0.5,
      ...cam.truck({ on: at(RIVER, -46, 1.3, LANE), dist: 3.2, yaw: -90, pitch: 8, fov: 50, by: [V * 1.0, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "From behind his shoulders, running with him: down the track, the tents of the rest camp, the black and white line, and behind it the blue of the first river and its bridge.",
      stage: (t, { p }) => {
        const x = -46 + V * 1.0 * p;
        return (
          <>
            <Hero position={at(RIVER, x, 0, LANE - 0.5)} rotationY={E} animation="run" animDistance={x + 80} face="brave" shoes={SHOE} shoeGlow={0.6} />
            <Rival position={at(RIVER, x + 7, 0, LANE + 0.5)} rotationY={E} animation="run" animDistance={x + 60} />
          </>
        );
      },
    },
    {
      cue: "8.two",
      cut: wordAt("8.two", "flag") - 0.6,
      ...cam.push({ on: at(RIVER, GATE_X, 3.3, LANE), dist: 9, to: 6.5, yaw: -84, pitch: -10, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "The line, from down the track, looking up at it: the black and white flag across the top, the little flags behind, the board that says STAGE 1.",
      stage: (t) => (
        <>
          <Glint position={at(RIVER, GATE_X - 0.2, 3.7, LANE - 1)} t={t - 0.1} size={1.6} />
          <Glint position={at(RIVER, GATE_X - 0.2, 3.6, LANE + 1.2)} t={t - 0.45} size={1.2} />
        </>
      ),
    },
    {
      cue: "8.one",
      ...cam.truck({ on: at(RIVER, -39, 1.0, LANE), dist: 4.2, yaw: -64, pitch: 16, fov: 48, by: [V * 2.6, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "Over his shoulder and down the track: one back in front of him. Black shirt, white hair. He pushes. The back does not get any nearer: it gets further.",
      stage: (t, { p }) => {
        const x = -39 + V * 2.6 * p;
        const cannot = wordAt("8.one", "could");
        const gap = 3.6 + 1.5 * ease(ramp(t, cannot - 0.2, cannot + 1.0));
        return (
          <>
            <Hero position={at(RIVER, x, 0, LANE - 0.4)} rotationY={E} animation="run" animDistance={x + 80} face={t > cannot ? "ouch" : "brave"} shoes={SHOE} shoeGlow={0.6} />
            <Rival position={at(RIVER, x + gap, 0, LANE + 0.4)} rotationY={E} animation="run" animDistance={x + 60} />
            <Puffs position={at(RIVER, x + gap - 0.6, 0.05, LANE + 0.4)} color="#b79d63" count={3} rise={0.25} spread={0.2} size={0.06} speed={2} opacity={0.5} />
            <Sweat position={at(RIVER, x, 1.3, LANE - 0.4)} t={t} much={0.6} />
          </>
        );
      },
    },
    {
      cue: "8.line",
      ...cam.push({ on: at(RIVER, GATE_X + 0.8, 1.25, LANE), dist: 6.4, to: 5.6, yaw: 22, pitch: 7, fov: 52 }),
      zone: "river",
      look: DAY,
      note: "The line, side on, the lens standing still for once: black shirt through it, 1st over his head. A second and a half later, yellow shirt, and 2nd.",
      stage: (t) => {
        const first = wordAt("8.line", "first");
        const second = wordAt("8.line", "second");
        // Flat out up to the line, then slowing to a stop a few metres past it.
        const run = (at0: number, v: number, stop: number): number => (t < at0 ? (t - at0) * v : stop * (1 - Math.exp(-(t - at0) * v / stop)));
        const r = GATE_X + run(first, 6.5, 2.0);
        const m = GATE_X + run(second, 6.2, 1.2);
        return (
          <>
            <Rival position={at(RIVER, r, 0, LANE + 0.5)} rotationY={E} animation={t < first + 0.5 ? "run" : "walk"} animDistance={r + 60} face="calm" />
            <Hero position={at(RIVER, m, 0, LANE - 0.4)} rotationY={E} animation={t < second + 0.45 ? "run" : "walk"} animDistance={m + 80} face={t > second ? "wow" : "brave"} shoes={SHOE} shoeGlow={0.6} />
            <Place text="1st" position={at(RIVER, r + 0.1, 2.35, LANE + 0.5)} rotationY={0.3} scale={0.6 * pop(t, first)} />
            <Place text="2nd" position={at(RIVER, m + 0.1, 2.15, LANE - 0.4)} rotationY={0.3} scale={0.6 * pop(t, second)} />
            <Bits position={at(RIVER, GATE_X, 2.6, LANE)} t={t - first} color="#f4f4f4" count={12} power={2.2} />
            <Bits position={at(RIVER, GATE_X, 2.6, LANE)} t={t - second} color="#f2c230" count={16} power={2.6} seed={3} />
            <DustRing position={at(RIVER, GATE_X + 0.3, 0.05, LANE - 0.4)} t={t - second} size={1.2} color="#b79d63" />
          </>
        );
      },
    },
    {
      cue: "8.cele",
      ...cam.push({ on: at(RIVER, CELE_X, 1.05, LANE - 0.4), dist: 3.9, to: 3.2, yaw: 6, pitch: 3, fov: 48 }),
      zone: "river",
      look: DAY,
      note: "HE CELEBRATES. Square on, the line and the flags behind him: both fists up, 2nd as big as the frame over his head, a jump on 'jumped', and on 'danced' he goes round and round on the spot.",
      stage: (t) => {
        const jumped = wordAt("8.cele", "jumped");
        const danced = wordAt("8.cele", "danced");
        const y = hop(t, 0.1, 0.3, 0.3) + hop(t, jumped - 0.05, 0.45, 0.6) + (t > danced ? 0.12 * Math.abs(Math.sin((t - danced) * 9)) : 0);
        const spin = t > danced ? (t - danced) * 7 : 0;
        return (
          <>
            <Hero position={at(RIVER, CELE_X, y, LANE - 0.4)} rotationY={spin} animation="cheer" face="laugh" shoes={SHOE} shoeGlow={0.7} />
            <Place text="2nd!" position={at(RIVER, CELE_X, 2.35, LANE - 0.4)} scale={0.8 * pop(t, 0.05)} />
            {[0, 1, 2].map((i) => (
              <Bits key={i} position={at(RIVER, CELE_X - 0.8 + i * 0.8, 2.0, LANE - 0.6)} t={t - [0.1, jumped, danced][i]} color={["#f2c230", "#e0433a", "#6fa8f0"][i]} count={14} power={2.4} seed={i + 5} />
            ))}
            <DustRing position={at(RIVER, CELE_X, 0.05, LANE - 0.4)} t={t - jumped - 0.5} size={1} color="#b79d63" />
            <Rival position={at(RIVER, GATE_X + 3.3, 0, -2.2)} rotationY={2.4} animation="idle" face="calm" />
          </>
        );
      },
    },
    {
      cue: "8.okay",
      ...cam.push({ on: faceOf(at(RIVER, CELE_X, 0, LANE - 0.4)), dist: 2.0, to: 1.6, yaw: -14, pitch: -3, fov: 40 }),
      zone: "river",
      look: DAY,
      note: "His face, close, getting his breath: a small shrug on 'not first'. Then the grin comes back, bigger, and he nods. It was okay.",
      stage: (t) => {
        const okay = wordAt("8.okay", "okay");
        return (
          <Hero position={at(RIVER, CELE_X, 0, LANE - 0.4)} rotationY={-0.15} animation={t < okay - 0.25 ? "shrug" : "idle"} face={t < okay - 0.25 ? "calm" : "grin"} headPitch={0.25 * Math.sin(ramp(t, okay - 0.1, okay + 0.5) * Math.PI * 2)} gaze={0} shoes={SHOE} />
        );
      },
    },
    {
      cue: "8.sit",
      ...cam.push({ on: [BENCH[0] - 0.2, 0.85, BENCH[2]], dist: 5.6, to: 4.6, yaw: 14, pitch: 9, fov: 48 }),
      zone: "river",
      look: DAY,
      note: "The log in the rest camp, from the front, the river running past behind it. He walks over, sits on it properly (on top, feet hanging), swings his legs, and looks back up the track for the others. Nobody yet.",
      stage: (t) => {
        const sat = wordAt("8.sit", "sat");
        const k = ease(ramp(t, 0, sat));
        const waited = wordAt("8.sit", "waited");
        const x = BENCH[0] + MEX - 2.6 * (1 - k);
        return (
          <>
            {t < sat ? (
              <Hero position={[x, 0, BENCH[2] + 0.75]} rotationY={E} animation="walk" animDistance={2.6 * k} face="grin" shoes={SHOE} shoeGlow={0.5} />
            ) : (
              <Hero position={[BENCH[0] + MEX, SIT_Y, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face="smile" headYaw={-0.9 * ease(ramp(t, waited - 0.3, waited + 0.1))} shoes={SHOE} shoeGlow={0.5} />
            )}
            <DustRing position={[BENCH[0] + MEX, BENCH_TOP + 0.02, BENCH[2]]} t={t - sat} size={0.5} color="#c9a36a" />
            <Rival position={at(RIVER, GATE_X + 2.6, 0, -2.6)} rotationY={0.4} animation="idle" face="calm" />
          </>
        );
      },
    },
    {
      cue: "8.look",
      ...cam.push({ on: [BENCH[0] + (MEX + RVX) / 2, 0.95, BENCH[2]], dist: 3.6, to: 3.1, yaw: -10, pitch: 5, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "Closer, still from the front. The winner comes in from the side and sits down on the same log, an arm's length away, without a word. The boy's head turns to him, and then goes down: to his feet.",
      stage: (t) => {
        const sat = wordAt("8.look", "sat");
        const feet = wordAt("8.look", "feet");
        const k = ease(ramp(t, 0, sat));
        const down = ease(ramp(t, feet - 0.45, feet));
        return (
          <>
            <Hero position={[BENCH[0] + MEX, SIT_Y, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face={down > 0.5 ? "calm" : "smile"} headYaw={0.75 * ease(ramp(t, sat - 0.2, sat + 0.2))} headPitch={0.5 * down} gaze={0} shoes={SHOE} shoeGlow={0.5} />
            {t < sat ? (
              <Rival position={[BENCH[0] + RVX + 2.2 * (1 - k), 0, BENCH[2] + 0.75]} rotationY={-E} animation="walk" animDistance={2.2 * k} face="calm" />
            ) : (
              <Rival position={[BENCH[0] + RVX, SIT_Y - 0.04, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face="calm" />
            )}
          </>
        );
      },
    },
    {
      cue: "8.same",
      ...cam.push({ on: [BENCH[0] + (MEX + RVX) / 2, 0.38, BENCH[2] + 0.4], dist: 4.4, to: 3.8, yaw: 3, pitch: 5, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "Four feet hanging off a log, from the front, close: two red shoes with a green light on the side, and two more red shoes with a green light on the side. Hold it, with nothing said, for a full second.",
      stage: (t) => {
        const same = wordAt("8.same", "same");
        const k = ease(ramp(t, same - 0.2, same + 0.2));
        return (
          <>
            <Hero position={[BENCH[0] + MEX, SIT_Y, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face="wow" headPitch={0.5} shoes={SHOE} shoeGlow={0.5 + 0.5 * k} />
            <Rival position={[BENCH[0] + RVX, SIT_Y - 0.04, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face="calm" shoeGlow={0.5 + 0.5 * k} />
            <Glint position={[BENCH[0] + RVX + 0.1, 0.2, BENCH[2] + 0.5]} t={t - same} size={0.8} />
            <Glint position={[BENCH[0] + MEX - 0.1, 0.2, BENCH[2] + 0.5]} t={t - same - 0.25} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "9.sub",
      ...cam.push({ on: [BENCH[0] + (MEX + RVX) / 2, 1.0, BENCH[2]], dist: 3.3, to: 3.0, yaw: -6, pitch: 3, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "The two of them on the log. The winner turns his head, looks at the boy, and smiles. The boy looks straight at us. The red sign comes up over them.",
      stage: (t) => (
        <>
          <Hero position={[BENCH[0] + MEX, SIT_Y, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face="fear" gaze={0} shoes={SHOE} shoeGlow={1} />
          <Rival position={[BENCH[0] + RVX, SIT_Y - 0.04, BENCH[2] + SIT_Z]} rotationY={0} animation="sit" face="grin" headYaw={-0.9 * ease(ramp(t, 0.1, 0.5))} shoeGlow={1} />
          <SubscribeSign position={[BENCH[0] + (MEX + RVX) / 2, 2.0, BENCH[2] + 0.2]} scale={0.6 * pop(t, 0.25)} tilt={jolt(t, 0.3, 0.1)} />
        </>
      ),
    },
  ],
});
void DESERT;
void OAK;
void FINISH;
void Board;
void LINE_X;
