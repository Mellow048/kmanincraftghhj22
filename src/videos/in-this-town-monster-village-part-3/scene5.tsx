import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, Black, Bubble, CAGE_X, DAY, EAST, GUARD, Glint, Hero, IronGolem, MO_CAGE, MY_CAGE, Mo, NORTH, ROBE, Raider, Villager, WEST, Z3, c, ease, faceOf, hop, jolt,
  manFace, pop, ramp, timing, toward, wordAt,
} from "./kit";

/** A villager who guards a door: a sword stuck in his belt, because his hands do not come out of his sleeves. */
const VGuard: React.FC<{ position: Vec3; rotationY?: number; n?: number; lookAt?: Vec3; walk?: number }> = ({ position, rotationY = 0, n = 0, lookAt, walk }) => (
  <>
    <Villager position={position} rotationY={rotationY} robe={[ROBE.brown, ROBE.smith, ROBE.farmer, ROBE.white][n % 4]} lookAt={lookAt} walk={walk} phase={n} />
    <AimSword position={[position[0] + Math.cos(rotationY) * 0.42, 1.0, position[2] - Math.sin(rotationY) * 0.42]} yaw={rotationY} pitch={-1.45} scale={0.9} />
  </>
);
/** Everybody who lives in the castle village, where they stand all day. */
const Garrison: React.FC<{ t: number; look?: Vec3; guard?: boolean }> = ({ t, look, guard = true }) => (
  <>
    <VGuard position={c(-8.3, 0, -2.6)} n={0} lookAt={look} />
    <VGuard position={c(8.3, 0, -3.0)} n={1} lookAt={look} />
    <VGuard position={c(-8.7, 0, 3)} rotationY={EAST} n={2} lookAt={look} />
    <VGuard position={c(9.2, 0, 3)} rotationY={WEST} n={3} lookAt={look} />
    <VGuard position={c(-1.6, 0, -10.6)} n={1} />
    <VGuard position={c(1.6, 0, -10.6)} n={2} />
    <IronGolem position={c(-6 + 12 * (0.5 + 0.5 * Math.sin(t * 0.35)), 0, -8.2)} rotationY={Math.cos(t * 0.35) > 0 ? EAST : WEST} walk={t * 1.5} scale={1.25} />
    {[-17.5, 17.5].map((x, i) => (
      <Raider key={x} who={i + 1} position={c(x + (i ? -1.2 : 1.2), 10.1, -13.2)} rotationY={i ? -0.7 : 0.7} animation="idle" headPitch={0.5} />
    ))}
    {[-17.5, 17.5].map((x, i) => (
      <Raider key={`s${x}`} who={i + 3} position={c(x + (i ? -1.2 : 1.2), 9.1, 8.2)} rotationY={i ? -0.9 : 0.9} animation="idle" headPitch={0.5} torch={i === 0} />
    ))}
    <Raider who={5} position={c(0, 11.6, -12.4)} rotationY={0} animation="idle" headPitch={0.5} />
    {guard ? <Raider who={0} position={GUARD} rotationY={EAST} animation="idle" /> : null}
  </>
);
const MoInCage: React.FC<{ up?: number; look?: Vec3 }> = ({ up = 0, look }) => (
  <Mo position={[MO_CAGE[0] + 0.15, 0.08, MO_CAGE[2] - 0.2]} rotationY={-0.5} animation="sit" scarf={0} face={up > 0.5 ? "surprised" : "sad"} headPitch={0.6 * (1 - up)} lookAt={up > 0.5 ? look : undefined} />
);
const ME: Vec3 = [MY_CAGE[0], 0.08, MY_CAGE[2] + 0.55];
const MEFACE = faceOf(ME);

/** THE CAGE: a village with a castle round it, and Mo. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Behind bars",
  shots: [
    {
      cue: "8.blink",
      ...cam.pan({ from: [MY_CAGE[0], 0.75, MY_CAGE[2] + 0.3], on: c(-5, 2.6, -6), onTo: c(-3.6, 2.2, -8), fov: 62 }),
      zone: Z3.castle,
      look: DAY,
      note: "WHAT HE SEES. Two black lids fill the frame, part, shut, and part again: daylight, far too bright, with iron bars across it and a stone tower behind them. He is lying on his back on a floor.",
      stage: (t) => {
        const opened = wordAt("8.blink", "opened");
        const day = wordAt("8.blink", "day");
        const open = Math.min(1, 0.45 * ease(ramp(t, opened - 0.25, opened)) - 0.45 * ease(ramp(t, opened + 0.1, opened + 0.22)) + ease(ramp(t, opened + 0.3, day)));
        const at: Vec3 = [MY_CAGE[0], 0.75, MY_CAGE[2] + 0.3];
        return (
          <>
            <Garrison t={t} />
            <group position={[at[0] + 0.02, at[1] + 0.085, at[2] - 0.28]} rotation={[0.3, 0, 0]}>
              <Black position={[0, 0.5 + 0.34 * open, 0]} size={[3, 1, 0.01]} />
              <Black position={[0, -0.5 - 0.34 * open, 0]} size={[3, 1, 0.01]} />
            </group>
          </>
        );
      },
    },
    {
      cue: "8.bars",
      ...cam.push({ on: [MEFACE[0], MEFACE[1] - 0.05, MEFACE[2]], dist: 1.7, to: 2.3, yaw: 8, pitch: 0, fov: 38 }),
      zone: Z3.castle,
      look: DAY,
      note: "His face, with iron bars between it and us, both hands coming up to hold them.",
      stage: (t) => (
        <>
          <Garrison t={t} guard={false} />
          <Hero position={[ME[0], ME[1], ME[2] + 0.25 * ease(ramp(t, 0, 0.5))]} rotationY={0} animation="idle" arms="hold" face="fear" headYaw={0.5 * Math.sin(t * 3.4)} />
          <MoInCage />
        </>
      ),
    },
    {
      cue: "8.bars",
      cut: wordAt("8.bars", "cage") - 0.25,
      ...cam.push({ on: [MY_CAGE[0] + 1.5, 1.6, MY_CAGE[2]], dist: 5, to: 12.5, yaw: 14, pitch: 10, fov: 48 }),
      zone: Z3.castle,
      look: DAY,
      note: "The lens flies backwards out of his face: a cage, in a row of cages, on the green of a village, with villagers walking past who do not look.",
      stage: (t) => (
        <>
          <Garrison t={t} />
          <Hero position={[ME[0], ME[1], ME[2] + 0.25]} rotationY={0} animation="idle" arms="hold" face="fear" headYaw={0.7 * Math.sin(t * 3.4)} />
          <MoInCage />
          <VGuard position={c(-9 + 2.2 * t, 0, 2.6)} rotationY={EAST} n={3} walk={2.2 * t} />
        </>
      ),
    },
    {
      cue: "8.village",
      ...cam.orbit({ on: c(0, 2, -4), dist: 24, distTo: 40, yaw: 26, yawTo: -8, pitch: 20, pitchTo: 48, fov: 50 }),
      zone: Z3.castle,
      look: DAY,
      note: "Up and back and round, a long way: the whole place. Four houses, five cages, and a grey castle wall with a tower on every corner going right round all of it.",
      stage: (t) => (
        <>
          <Garrison t={t} />
          <Hero position={[ME[0], ME[1], ME[2] + 0.25]} rotationY={0} animation="idle" arms="hold" face="fear" />
          <MoInCage />
        </>
      ),
    },
    {
      cue: "8.guards",
      ...cam.truck({ on: c(-8.4, 1.0, -2.6), dist: 2.6, yaw: -40, pitch: -8, fov: 52, by: [1.8, 0.2, 0.3] }),
      zone: Z3.castle,
      look: DAY,
      note: "At belt height, sliding past a house door: a villager guard with his arms folded in his sleeves and a sword hung on him, nose in the air. Behind him, an iron golem doing its round.",
      stage: (t) => {
        const swords = wordAt("8.guards", "swords");
        return (
          <>
            <Garrison t={t + 4} look={c(-5, 1.5, 3)} />
            <Glint position={c(-7.9, 1.2, -2.5)} t={t - swords} size={1.2} />
          </>
        );
      },
    },
    {
      cue: "8.towers",
      ...cam.pan({ from: c(-14.2, 0.5, 10.6), on: c(-17, 3, 8.6), onTo: c(-16.6, 9.8, 8.2), fov: 58 }),
      zone: Z3.castle,
      look: DAY,
      note: "From the foot of a tower, the lens tips up the stone, all the way up: and at the top, against the sky, two players leaning over the teeth of it, looking straight down at us.",
      stage: (t) => (
        <>
          <Garrison t={t} />
          <Raider who={2} position={c(-16.4, 9.1, 9.4)} rotationY={0.9} animation="idle" headPitch={0.9} face="angry" />
        </>
      ),
    },
    {
      cue: "9.cages",
      ...cam.truck({ on: [MY_CAGE[0] + 2.5, 1.25, MY_CAGE[2]], dist: 3.4, yaw: -14, pitch: 2, fov: 46, by: [CAGE_X[3] - CAGE_X[1], 0, 0] }),
      zone: Z3.castle,
      look: DAY,
      note: "The lens goes along the row, bars sliding past it: a cage with nothing in it, a cage with nothing in it, a cage with nothing in it.",
      stage: (t) => (
        <>
          <Garrison t={t} guard={false} />
          <Hero position={[ME[0] + 0.4, ME[1], ME[2] - 0.3]} rotationY={EAST} animation="idle" arms="hold" face="uneasy" />
          {[1, 2, 3].map((i, n) => {
            const at = wordAt("9.cages", "empty", n);
            return <Bubble key={i} text="EMPTY" position={c(CAGE_X[i], 2.9, 1.2)} scale={0.3 * pop(t, at - 0.05) * (t < at + 0.55 ? 1 : 0)} tail={0} dark />;
          })}
          <MoInCage />
        </>
      ),
    },
    {
      cue: "9.mo",
      ...cam.push({ on: [MO_CAGE[0] + 0.15, 1.0, MO_CAGE[2]], dist: 3.6, to: 2.5, yaw: -10, pitch: 4, fov: 40 }),
      zone: Z3.castle,
      look: DAY,
      note: "And the last one: a man sitting on the floor of it with his head down, in a straw hat, with a red scarf. The hat comes up.",
      stage: (t) => {
        const mo = wordAt("9.mo", "mo");
        return (
          <>
            <Garrison t={t} guard={false} />
            <MoInCage up={ease(ramp(t, mo - 0.1, mo + 0.2))} look={MEFACE} />
            <Glint position={manFace([MO_CAGE[0] + 0.15, -0.5, MO_CAGE[2]])} t={t - mo} size={1.6} />
          </>
        );
      },
    },
    {
      cue: "9.mo",
      cut: wordAt("9.mo", "found") - 0.3,
      ...cam.push({ on: faceOf([ME[0] + 0.5, ME[1], ME[2] - 0.3]), dist: 1.6, to: 1.3, yaw: 80, pitch: -2, fov: 38 }),
      zone: Z3.castle,
      look: DAY,
      note: "The boy's face jammed between two bars, sideways on, with the biggest grin in three films.",
      stage: (t) => <Hero position={[ME[0] + 0.5, ME[1] + hop(t, 0.05, 0.15, 0.25), ME[2] - 0.3]} rotationY={EAST} animation="idle" arms="hold" face="grin" />,
    },
    {
      cue: "9.reach",
      ...cam.pan({ from: c(-6.9, 1.25, 2.3), on: c(-3, 1.1, 1.5), onTo: c(5, 1.1, 1.3), fov: 46 }),
      zone: Z3.castle,
      look: DAY,
      note: "Straight down on the row of five roofs: out of the first one comes a short yellow arm, as far as it will go. Out of the last one, a green one. There are three whole cages between the two hands.",
      stage: (t) => {
        const far = wordAt("9.reach", "far");
        return (
          <>
            <Hero position={[MY_CAGE[0] + 0.2, 0.08, MY_CAGE[2] + 0.8]} rotationY={0.7} animation="idle" arms="reach" face="brave" />
            <Mo position={[MO_CAGE[0] - 0.2, 0.08, MO_CAGE[2] + 0.8]} rotationY={-0.7} animation="idle" arms="reach" scarf={0} />
            <Black position={c(0, 1.1, 1.6)} size={[7.6 * ease(ramp(t, far - 0.3, far)), 0.05, 0.05]} color="#c23a2e" />
            <Bubble text="TOO FAR" position={c(-1.5, 2.3, 1.7)} rotationY={-1.3} scale={0.5 * pop(t, far)} tail={0} />
          </>
        );
      },
    },
    {
      cue: "9.dumb",
      ...cam.push({ on: [MY_CAGE[0] + 0.6, 1.0, MY_CAGE[2] + 1.3], dist: 1.9, to: 1.8, yaw: 35, pitch: 4, fov: 38 }),
      zone: Z3.castle,
      look: DAY,
      note: "His hand out through the bars, grabbing at air. It stops. It hangs.",
      stage: (t) => <Hero position={[MY_CAGE[0] + 0.2, 0.08 - 0.06 * ease(ramp(t, 0.2, 0.5)), MY_CAGE[2] + 0.8]} rotationY={0.7} animation="idle" arms={t < 0.3 ? "reach" : "idle"} face="frown" />,
    },
    {
      cue: "9.saw",
      ...cam.pan({ from: [MY_CAGE[0] - 0.2, 1.3, MY_CAGE[2] - 0.3], on: [GUARD[0] - 0.4, 1.4, GUARD[2]], onTo: [GUARD[0], 1.5, GUARD[2]], fov: 50, fovTo: 42 }),
      zone: Z3.castle,
      look: DAY,
      note: "From inside the cage, over the boy's shoulder, through the bars: a big player on guard outside, side on. His head comes round.",
      stage: (t) => {
        const seen = wordAt("9.saw", "seen");
        const k = ease(ramp(t, seen - 0.25, seen + 0.1));
        return (
          <>
            <Garrison t={t} guard={false} />
            <Hero position={[MY_CAGE[0] - 0.4, 0.08, MY_CAGE[2] + 0.65]} rotationY={toward(ME, GUARD)} animation="idle" arms={k > 0.5 ? "idle" : "reach"} face="fear" />
            <Raider who={0} position={GUARD} rotationY={EAST} animation="idle" headYaw={2.0 * k} face="angry" />
          </>
        );
      },
    },
    {
      cue: "9.laugh",
      ...cam.push({ on: manFace([GUARD[0], 0.12, GUARD[2]]), dist: 1.9, to: 1.5, yaw: -150, pitch: -24, fov: 42 }),
      zone: Z3.castle,
      look: DAY,
      note: "The guard from below, the way a kid in a cage sees him: he looks down his nose, and his shoulders start to go.",
      stage: (t) => {
        const laughed = wordAt("9.laugh", "laughed");
        const on = t > laughed - 0.15;
        return (
          <>
            <Garrison t={t} guard={false} />
            <Raider who={0} position={[GUARD[0], on ? 0.05 * Math.abs(Math.sin(t * 16)) : 0, GUARD[2]]} rotationY={toward(GUARD, ME)} animation={on ? "talk" : "idle"} face={on ? "laugh" : "smug"} headPitch={on ? -0.3 + 0.15 * Math.sin(t * 16) : 0.35} />
            <Bubble text="HA HA" position={[GUARD[0] + 0.5, 2.7, GUARD[2] - 0.2]} rotationY={-2.6} tilt={jolt(t, laughed, 0.4)} scale={0.3 * pop(t, laughed - 0.1)} tail={0} dark />
          </>
        );
      },
    },
    {
      cue: "9.over",
      ...cam.push({ on: [MY_CAGE[0], 0.6, MY_CAGE[2] + 0.3], dist: 4.2, to: 8.5, yaw: 6, pitch: 36, fov: 44 }),
      zone: Z3.castle,
      look: DAY,
      note: "From above, going up and away: he slides down the bars and sits on the floor of the cage with his head on his knees. He gets smaller. The castle wall comes into the top of the frame, and it is very big.",
      stage: (t) => {
        const k = ease(ramp(t, 0.2, 0.8));
        return (
          <>
            <Garrison t={t} />
            <Hero position={[ME[0], ME[1], ME[2] - 0.2]} rotationY={0} animation={k > 0.5 ? "sit" : "idle"} face="frown" headPitch={0.75 * k} />
            <MoInCage />
          </>
        );
      },
    },
  ],
});
void NORTH;
