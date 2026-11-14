import { MinecraftAvatar, cam, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Vec3 } from "../../engine";
import {
  Baby, Board, CUP, DAY, DESERT, DustRing, FINISH, Field, Glint, Hero, LANE, LINE_X, OAK, Place, Player, Puffs, RIVER, ROBE, SHOE, START_X, Streaks, SubscribeSign,
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
 * ACT 7, 8 and 9. The start line, the four stretches, and the feet of the runner in first place.
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
      note: "The course, from the air: the track, and two rivers across it with a bridge over each.",
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

    // ------------------------------------------------------------------ 8. the race
    {
      cue: "8.fifteen",
      ...cam.truck({ on: at(RIVER, -13, 0.9, LANE), dist: 8.5, yaw: -24, pitch: 16, fov: 50, by: [V * 1.77, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "The rivers: the lens flies beside the pack as it pours over the first bridge. He is near the back, and the card says so.",
      stage: (t, { p }) => <Stretch o={RIVER} x={-13 + V * 1.77 * p} t={t} ahead={14} card="15th" gap={0.95} />,
    },
    {
      cue: "8.eleven",
      ...cam.truck({ on: at(DESERT, -6, 0.8, LANE), dist: 9, yaw: 58, pitch: 26, fov: 48, by: [V * 1.3, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "The desert, from in front and above, sand flying: the string of runners with him in the middle of it.",
      stage: (t, { p }) => (
        <>
          <Stretch o={DESERT} x={-6 + V * 1.3 * p} t={t} ahead={10} card="11th" yaw={1.0} gap={1.25} />
          <Sweat position={at(DESERT, -6 + V * 1.3 * p + 2.5, 1.3, LANE + 0.9)} t={t} />
        </>
      ),
    },
    {
      cue: "8.eleven",
      cut: wordAt("8.eleven", "Then") - 0.15,
      ...cam.truck({ on: at(DESERT, 9, 0.9, LANE), dist: 5.2, yaw: -30, pitch: 8, fov: 48, by: [V * 0.9, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "Lower and from the other side, the cactus going by: two more are behind him now.",
      stage: (t, { p }) => <Stretch o={DESERT} x={9 + V * 0.9 * p} t={t} ahead={8} card="9th" cardAt={0.2} yaw={-0.5} gap={1.4} face="grin" />,
    },
    {
      cue: "8.six",
      ...cam.truck({ on: at(OAK, -10, 0.9, LANE), dist: 5.6, yaw: 16, pitch: 4, fov: 50, by: [V * 1.5, 0, 0] }),
      ease: "linear",
      zone: "oak",
      look: DAY,
      note: "The dark oak forest: trunks whipping across the front of the lens, bars of light, and him sixth.",
      stage: (t, { p }) => <Stretch o={OAK} x={-10 + V * 1.5 * p} t={t} ahead={5} card="6th" baby={false} yaw={0.3} gap={1.6} face="grin" />,
    },
    {
      cue: "8.six",
      cut: wordAt("8.six", "past") - 0.4,
      ...cam.truck({ on: at(OAK, 3.2, 0.75, LANE + 0.3), dist: 3.2, yaw: 68, pitch: 6, fov: 44, by: [4 * 1.4, 0, 0] }),
      ease: "linear",
      zone: "oak",
      look: DAY,
      note: "The baby, running for once, from in front: and the yellow shirt comes up behind it and goes by on the outside.",
      stage: (t, { p }) => {
        const b = 3.2 + 4 * 1.4 * p;
        const me = b - 2.6 + 4.4 * p;
        return (
          <>
            <Baby position={at(OAK, b, 0, LANE + 0.6)} rotationY={E} walk={b * 2} turn={me > b - 0.6 ? -0.9 : 0} lean={0.3} />
            <Hero position={at(OAK, me, 0, LANE - 0.45)} rotationY={E} animation="run" animDistance={me * 1.4 + 40} face="grin" headYaw={me > b - 0.8 ? 0.7 : 0} shoes={SHOE} shoeGlow={0.6} />
            <Streaks position={at(OAK, me - 0.6, 0.6, LANE - 0.45)} yaw={E} t={t} n={6} spread={0.5} speed={10} />
          </>
        );
      },
    },
    {
      cue: "8.six",
      cut: wordAt("8.six", "waved") - 0.35,
      ...cam.truck({ on: at(OAK, 12, 1.15, LANE), dist: 2.3, yaw: 74, pitch: 2, fov: 40, by: [V * 0.9, 0, 0] }),
      ease: "linear",
      zone: "oak",
      look: DAY,
      note: "Him, close, running at us: he does not look back, he just puts one hand up and waves it. The baby is a small green dot behind.",
      stage: (t, { p }) => {
        const x = 12 + V * 0.9 * p;
        return (
          <>
            <Hero position={at(OAK, x, 0, LANE)} rotationY={E} animation="run" arms="wave" animDistance={x + 40} face="laugh" gaze={0} shoes={SHOE} />
            <Baby position={at(OAK, x - 3.2 - t * 2.4, 0, LANE + 0.5)} rotationY={E} walk={x * 2} />
          </>
        );
      },
    },
    {
      cue: "8.two",
      ...cam.truck({ on: at(FINISH, -40, 0.95, LANE), dist: 4.6, yaw: 40, pitch: 8, fov: 46, by: [V * 0.9, 0, 0] }),
      ease: "linear",
      zone: "finish",
      look: DAY,
      note: "Open ground, nobody round him any more: the card says second, and he cannot believe it.",
      stage: (t, { p }) => {
        const x = -40 + V * 0.9 * p;
        return (
          <>
            <Field x={FINISH[0] + x - 3} z={FINISH[2] + LANE} ahead={0} d={x} gap={1.5} />
            <Hero position={at(FINISH, x, hop(t, 0.25, 0.3, 0.35), LANE)} rotationY={E} animation="run" animDistance={x + 80} face="wow" shoes={SHOE} shoeGlow={0.6} />
            <Place text="2nd" position={at(FINISH, x + 0.2, 2.2, LANE)} rotationY={0.6} scale={0.7 * pop(t, 0.08)} />
          </>
        );
      },
    },
    {
      cue: "8.two",
      cut: wordAt("8.two", "last") - 0.5,
      ...cam.truck({ on: at(FINISH, -16, 1.3, LANE), dist: 3.2, yaw: -90, pitch: 8, fov: 50, by: [V * 1.1, 0, 0] }),
      ease: "linear",
      zone: "finish",
      look: DAY,
      note: "From behind his shoulders, running with him: the houses of the last village, the gate, and the gold under it.",
      stage: (t, { p }) => {
        const x = -16 + V * 1.1 * p;
        return (
          <>
            <Hero position={at(FINISH, x, 0, LANE - 0.5)} rotationY={E} animation="run" animDistance={x + 80} face="brave" shoes={SHOE} shoeGlow={0.6} />
            <Rival position={at(FINISH, x + 7, 0, LANE + 0.5)} rotationY={E} animation="run" animDistance={x + 60} />
          </>
        );
      },
    },
    {
      cue: "8.two",
      cut: wordAt("8.two", "trophy") - 0.55,
      ...cam.push({ on: [CUP[0], 1.55, CUP[2]], dist: 3.4, to: 2.5, yaw: -62, pitch: -4, fov: 40 }),
      zone: "finish",
      look: DAY,
      note: "The cup, the same size as in the first second of the film: this time it is close enough to touch.",
      stage: (t) => (
        <>
          <Glint position={[CUP[0] - 0.25, 1.75, CUP[2] + 0.1]} t={t - 0.1} size={1.5} />
          <Glint position={[CUP[0] - 0.2, 1.5, CUP[2] - 0.15]} t={t - 0.5} size={1.1} />
        </>
      ),
    },
    {
      cue: "8.one",
      ...cam.truck({ on: at(FINISH, -7, 1.0, LANE), dist: 4.2, yaw: -64, pitch: 16, fov: 48, by: [V * 1.73, 0, 0] }),
      ease: "linear",
      zone: "finish",
      look: DAY,
      note: "Over his shoulder and down the track: one back in front of him. Black shirt, white hair. He is closing on it.",
      stage: (t, { p }) => {
        const x = -7 + V * 1.73 * p;
        return (
          <>
            <Hero position={at(FINISH, x, 0, LANE - 0.4)} rotationY={E} animation="run" animDistance={x + 80} face="brave" shoes={SHOE} shoeGlow={0.6} />
            <Rival position={at(FINISH, x + 4.2 - t * 1.2, 0, LANE + 0.4)} rotationY={E} animation="run" animDistance={x + 60} />
            <Puffs position={at(FINISH, x + 3.6, 0.05, LANE + 0.4)} color="#b79d63" count={3} rise={0.25} spread={0.2} size={0.06} speed={2} opacity={0.5} />
          </>
        );
      },
    },
    {
      cue: "8.look",
      ...cam.truck({ on: faceOf(at(FINISH, 1.4, 0, LANE - 0.4)), dist: 1.5, yaw: 80, pitch: -4, fov: 36, by: [V * 1.33, 0, 0] }),
      ease: "linear",
      zone: "finish",
      look: DAY,
      note: "His face, from in front and a little below: the eyes go down.",
      stage: (t, { p }) => {
        const x = 1.4 + V * 1.33 * p;
        return <Hero position={at(FINISH, x, 0, LANE - 0.4)} rotationY={E} animation="run" animDistance={x + 80} face={t > 0.7 ? "wow" : "brave"} headPitch={0.5 * ease(ramp(t, 0.3, 0.7))} headYaw={-0.3} gaze={0} shoes={SHOE} />;
      },
    },
    {
      cue: "8.same",
      ...cam.truck({ on: at(FINISH, -4.6, 0.36, LANE + 0.4), dist: 2.6, yaw: 30, pitch: 7, fov: 44, by: [V * 2.17, 0, 0] }),
      ease: "linear",
      zone: "finish",
      look: DAY,
      note: "The ground, at running speed: a pair of feet in red shoes with a green light on the side. They are not his.",
      stage: (t, { p }) => {
        const x = -4.6 + V * 2.17 * p;
        const k = ease(ramp(t, wordAt("8.same", "same") - 0.2, wordAt("8.same", "same") + 0.2));
        return (
          <>
            <Rival position={at(FINISH, x, 0, LANE + 0.4)} rotationY={E} animation="run" animDistance={x + 60} shoeGlow={0.5 + k * 0.5} />
            <Hero position={at(FINISH, x - 2.1, 0, LANE - 0.5)} rotationY={E} animation="run" animDistance={x + 80} face="wow" shoes={SHOE} shoeGlow={0.5 + k * 0.5} />
                        <Glint position={at(FINISH, x + 0.1, 0.15, LANE + 0.6)} t={t - wordAt("8.same", "same")} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "9.sub",
      ...cam.truck({ on: at(FINISH, 1.6, 1.15, LANE + 0.4), dist: 3.4, yaw: 60, pitch: 0, fov: 42, by: [3 * 1.8, 0, 0] }),
      ease: "linear",
      zone: "finish",
      look: DAY,
      note: "The runner in front turns his head and looks back at him, and smiles. The red sign comes up over the two of them.",
      stage: (t, { p }) => {
        const x = 1.6 + 3 * 1.8 * p;
        return (
          <>
            <Rival position={at(FINISH, x, 0, LANE + 0.4)} rotationY={E} animation="run" animDistance={x + 60} face="grin" headYaw={0.9 * ease(ramp(t, 0.1, 0.5))} animSpeed={0.5} />
            <Hero position={at(FINISH, x - 1.5, 0, LANE - 0.3)} rotationY={E} animation="run" animDistance={x + 80} face="fear" shoes={SHOE} shoeGlow={1} />
            <SubscribeSign position={at(FINISH, x + 0.2, 1.85, LANE + 0.7)} rotationY={1.0} scale={0.6 * pop(t, 0.25)} tilt={jolt(t, 0.3, 0.1)} />
          </>
        );
      },
    },
  ],
});
void LINE_X;
