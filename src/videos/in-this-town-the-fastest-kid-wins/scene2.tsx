import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BedBox, Bits, DustRing, FOREST, Glint, Hero, NIGHT, Puffs, SHOE, STUMP, ShoePair, Sweat, WTREE, Witch, at, ease, faceOf, hop, jolt, pop, ramp, room, timing,
  witchFace, wordAt,
} from "./kit";

const E = Math.PI / 2;
/** Where he lies down, where he stands to talk, where she stands, where she hides. */
const LAY: Vec3 = at(FOREST, 0.6, 0, 0.9);
const ME: Vec3 = at(FOREST, -0.55, 0, -0.2);
const HER: Vec3 = at(FOREST, -1.7, 0, -0.2);
const HID: Vec3 = [WTREE[0] + 0.05, 0, WTREE[2] - 0.75];
const PEEK: Vec3 = [WTREE[0] + 0.8, 0, WTREE[2] - 0.35];
const SEAT: Vec3 = [STUMP[0], 0.1, STUMP[2] + 0.12];
const lamp = (p: Vec3, k = 6) => <pointLight position={p} color="#cfd8ff" intensity={k} distance={7} decay={2} />;

/**
 * ACT 3 and 4. The night in the forest, the witch behind the tree, and a pair of shoes she is far too glad to lose.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The witch",
  shots: [
    {
      cue: "3.night",
      ...cam.top({ on: room(-1.95, 0.5, 0.9), height: 3.9, to: 3.2, spin: [8, -4], fov: 62 }),
      zone: "room",
      look: NIGHT,
      note: "Straight down on the bed: eyes wide open in the dark. The first night shot, and the only one from the ceiling.",
      stage: (t) => (
        <>
          <BedBox position={room(-1.95, 0, 0.9)} />
          <Hero position={room(-1.95, 0.42, 1.15)} animation="lie" face="uneasy" headYaw={Math.sin(t * 3) * 0.5} gaze={0} blink={false} />
          {lamp(room(-0.6, 2.6, 1.2), 5)}
        </>
      ),
    },
    {
      cue: "3.forest",
      ...cam.truck({ on: at(FOREST, -9, 1.0, 0.9), dist: 7.5, yaw: -14, pitch: 5, fov: 50, by: [8, 0, 0] }),
      zone: "forest",
      look: NIGHT,
      note: "The forest, wide, the moon over it, and the lens running alongside him through the trunks: environment first, him small in it.",
      stage: (t) => {
        const x = -12 + t * 3.1;
        return (
          <>
            <Hero position={at(FOREST, x, 0, 0.9)} rotationY={E} animation="run" animDistance={x * 2 + 40} face="brave" />
            <Sweat position={at(FOREST, x, 1.2, 0.9)} t={t} />
            <Puffs position={at(FOREST, x - 0.5, 0.05, 0.9)} color="#6f8f5a" count={3} rise={0.2} spread={0.2} size={0.05} speed={2} opacity={0.5} />
          </>
        );
      },
    },
    {
      cue: "3.tired",
      ...cam.orbit({ on: [LAY[0], 0.5, LAY[2]], dist: 3.6, yaw: 20, yawTo: -6, pitch: 22, pitchTo: 50, fov: 48 }),
      zone: "forest",
      look: NIGHT,
      note: "His legs give up in the frame: stagger, down, and the lens rises over him as he lies flat in the leaves.",
      stage: (t) => {
        const gave = wordAt("3.tired", "gave");
        const x = LAY[0] - 2.2 + Math.min(t, gave) * (2.2 / gave);
        return (
          <>
            <Hero position={[x, 0, LAY[2]]} rotationY={E} animation={t > gave ? "collapse" : "stagger"} time={t > gave ? t - gave : undefined} animDistance={x * 2 + 50} face="ouch" />
            <DustRing position={[x + 0.8, 0.05, LAY[2]]} t={t - gave - 0.8} size={1.1} color="#8a6a3a" />
            <Bits position={[x + 0.8, 0.1, LAY[2]]} t={t - gave - 0.8} color="#b8642a" count={10} power={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.witch",
      ...cam.pan({ from: [LAY[0] + 2.4, 0.35, LAY[2] + 1.3], on: [LAY[0] + 1.2, 0.3, LAY[2]], onTo: [WTREE[0] + 0.5, 1.5, WTREE[2]], fov: 50 }),
      zone: "forest",
      look: NIGHT,
      note: "From the ground beside his head: the lens leaves him and finds a pointed hat coming out from behind a trunk, and one hand waving.",
      stage: (t) => {
        const her = wordAt("3.witch", "her") - 0.3;
        const k = ease(ramp(t, her, her + 0.5));
        const w = ease(ramp(t, wordAt("3.witch", "waving") - 0.5, wordAt("3.witch", "waving")));
        const p: Vec3 = [HID[0] + (PEEK[0] - HID[0]) * k, 0, HID[2] + (PEEK[2] - HID[2]) * k];
        return (
          <>
            <Hero position={[LAY[0] + 0.8, 0, LAY[2]]} rotationY={E} animation="collapse" time={1.2} face="ouch" />
            <Witch position={p} rotationY={0.5} tilt={-0.2 * k} wave={w} t={t} />
            {lamp([PEEK[0] + 1, 2.2, PEEK[2] + 2.5], 9)}
          </>
        );
      },
    },
    {
      cue: "3.win",
      ...cam.push({ on: witchFace(HER), dist: 1.9, to: 1.45, yaw: 62, pitch: -16, fov: 42 }),
      zone: "forest",
      look: NIGHT,
      note: "Her, from under the brim of the hat, the moon behind: she leans down into the lens with the question.",
      stage: (t) => (
        <>
          <Witch position={HER} rotationY={E} lean={0.28 * ease(ramp(t, 0.1, 0.7))} nod={jolt(t, wordAt("3.win", "win"), 0.25)} />
          {lamp([HER[0] + 1.6, 1.2, HER[2] + 1], 8)}
        </>
      ),
    },
    {
      cue: "3.yes",
      ...cam.push({ on: faceOf(ME), dist: 2.0, to: 1.45, yaw: -68, pitch: 2, fov: 36 }),
      zone: "forest",
      look: NIGHT,
      note: "His face while he thinks about it. He looks down, and away from her.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={-E} animation="idle" face="uneasy" headPitch={0.3 * ease(ramp(t, 0.3, 1))} headYaw={0.35 * ease(ramp(t, 0.8, 1.5))} gaze={0} />
          {lamp([ME[0] - 1.4, 1.3, ME[2] + 1.2], 7)}
        </>
      ),
    },
    {
      cue: "3.yes",
      cut: wordAt("3.yes", "that") - 0.15,
      ...cam.push({ on: room(-1.1, 1.75, -2.2), dist: 2.4, to: 1.5, yaw: -18, pitch: -6, fov: 44 }),
      zone: "room",
      look: NIGHT,
      note: "What he is thinking of, for one second: the shelf, in the dark, with nothing on it.",
      stage: () => <>{lamp(room(-0.6, 2.4, -0.6), 4)}</>,
    },
    {
      cue: "3.yes",
      cut: wordAt("3.yes", "Yes") - 0.2,
      ...cam.orbit({ on: [(ME[0] + HER[0]) / 2, 1.15, ME[2]], dist: 3.3, yaw: 12, yawTo: -4, pitch: 3, fov: 42 }),
      zone: "forest",
      look: NIGHT,
      note: "The two of them in profile, the tall hat and the small boy: he looks up at her and nods.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={-E} animation="idle" face="brave" headPitch={-0.25 + jolt(t, 0.25, 0.3)} />
          <Witch position={HER} rotationY={E} lean={0.15} />
          {lamp([ME[0] - 0.5, 1.6, ME[2] + 2.4], 9)}
        </>
      ),
    },

    // ------------------------------------------------------------------ 4. the shoes
    {
      cue: "4.shoes",
      ...cam.push({ on: [HER[0] + 0.62, 1.0, HER[2]], dist: 1.9, to: 1.25, yaw: 30, pitch: 8, fov: 40 }),
      zone: "forest",
      look: NIGHT,
      note: "The shoes come out on her hand and light the frame red: the thing the film is about, as big as it gets.",
      stage: (t) => {
        const g = ease(ramp(t, 0.1, 0.55));
        return (
          <>
            <Witch position={HER} rotationY={E} give={g}>
              <ShoePair scale={1.35 * pop(t, 0.2)} rotation={[0, E, 0]} glow={0.9} />
            </Witch>
            <Glint position={[HER[0] + 0.75, 1.05, HER[2] + 0.2]} t={t - 0.5} size={1.2} />
            <pointLight position={[HER[0] + 0.8, 1.3, HER[2] + 0.5]} color="#ff5a4a" intensity={5 * g} distance={4} decay={2} />
          </>
        );
      },
    },
    {
      cue: "4.money",
      ...cam.push({ on: [ME[0], 0.95, ME[2]], dist: 2.3, to: 2.0, yaw: -52, pitch: 4, fov: 40 }),
      zone: "forest",
      look: NIGHT,
      note: "Him, waist up: both hands out, empty. The red of the shoes is on his face.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={-E} animation="shrug" face="uneasy" gaze={0} />
          <pointLight position={[ME[0] - 0.8, 1.1, ME[2] + 0.6]} color="#ff7a6a" intensity={3} distance={4} decay={2} />
          {lamp([ME[0] - 1.2, 1.4, ME[2] + 1.6], 7)}
          {t > 0.3 ? <Bits position={[ME[0], 0.7, ME[2] + 0.2]} t={t - 0.3} color="#8a8a8a" count={3} power={0.6} /> : null}
        </>
      ),
    },
    {
      cue: "4.free",
      ...cam.orbit({ on: [(ME[0] + HER[0]) / 2, 1.05, ME[2]], dist: 3.4, yaw: -10, yawTo: 10, pitch: 4, fov: 42 }),
      zone: "forest",
      look: NIGHT,
      note: "Both of them, side on. She pushes the shoes into his chest and he has to take them. She looks over her shoulder while she does it.",
      stage: (t) => {
        const rid = wordAt("4.free", "rid");
        const took = t > rid;
        return (
          <>
            <Witch position={[HER[0] + 0.12 * ease(ramp(t, 0.2, 0.6)), 0, HER[2]]} rotationY={E} give={1} turn={took ? -1.1 : 0} lean={0.2}>
              {took ? null : <ShoePair scale={1.3} rotation={[0, E, 0]} glow={0.9} />}
            </Witch>
            <Hero position={ME} rotationY={-E} animation={took ? "hold" : "idle"} face={took ? "wow" : "uneasy"} headPitch={took ? 0.3 : 0} />
            {took ? <ShoePair position={[ME[0] - 0.36, 0.72, ME[2]]} rotation={[0, -E, 0]} scale={1.3} glow={0.9} /> : null}
            <Glint position={[ME[0] - 0.36, 0.85, ME[2] + 0.2]} t={t - rid} size={1} />
            {lamp([ME[0] - 0.5, 1.6, ME[2] + 2.4], 9)}
          </>
        );
      },
    },
    {
      cue: "4.hmm",
      ...cam.push({ on: witchFace(HER), dist: 2.3, to: 2.0, yaw: 120, pitch: -8, fov: 40 }),
      zone: "forest",
      look: NIGHT,
      note: "The warning he missed: past his shoulder, the witch already backing away, looking left and right. He only looks at the shoes.",
      stage: (t) => {
        const back = ease(ramp(t, 0.2, 1.6));
        return (
          <>
            <Witch position={[HER[0] - back * 0.7, 0, HER[2]]} rotationY={E} turn={Math.sin(t * 6) * 0.9} walk={-back * 0.5} />
            <Hero position={ME} rotationY={-E} animation="hold" face="grin" headPitch={0.4} />
            <ShoePair position={[ME[0] - 0.36, 0.72, ME[2]]} rotation={[0, -E, 0]} scale={1.3} glow={0.9} />
            {lamp([HER[0] + 0.6, 1.5, HER[2] + 2], 8)}
          </>
        );
      },
    },
    {
      cue: "4.stump",
      ...cam.push({ on: [STUMP[0], 0.45, STUMP[2] + 0.4], dist: 2.6, to: 1.7, yaw: 28, pitch: 6, fov: 44 }),
      zone: "forest",
      look: NIGHT,
      note: "Low, at the stump, pushing in on his feet: he sits, and on 'put' the red shoes are on them.",
      stage: (t) => {
        const on = wordAt("4.stump", "put");
        return (
          <>
            <Hero position={SEAT} rotationY={0.3} animation="sit" face={t > on ? "grin" : "calm"} headPitch={0.45} shoes={t > on ? SHOE : undefined} shoeGlow={0.6} />
            {t > on ? null : <ShoePair position={[STUMP[0] + 0.75, 0, STUMP[2] + 0.5]} rotation={[0, 0.5, 0]} scale={1.2} glow={0.8} />}
            <Glint position={[STUMP[0] + 0.25, 0.25, STUMP[2] + 0.85]} t={t - on} size={1.3} />
            <DustRing position={[STUMP[0] + 0.2, 0.05, STUMP[2] + 0.8]} t={t - on} size={0.6} color="#ff8a7a" />
            {lamp([STUMP[0] + 1, 1.2, STUMP[2] + 2], 9)}
          </>
        );
      },
    },
    {
      cue: "4.gone",
      ...cam.pan({ from: [STUMP[0] + 1.6, 1.3, STUMP[2] + 2.3], on: [STUMP[0], 0.9, STUMP[2]], onTo: [HER[0], 1.1, HER[2]], fov: 48 }),
      zone: "forest",
      look: NIGHT,
      note: "The lens swings from him to where she stood. Nothing: a little purple smoke, and her hat still coming down.",
      stage: (t, { dur }) => {
        const fall = ramp(t, 0.2, dur);
        return (
          <>
            <Hero position={SEAT} rotationY={-0.9} animation="sit" face="wow" shoes={SHOE} shoeGlow={0.6} />
            <Puffs position={[HER[0], 0.4, HER[2]]} color="#9a6fd0" count={7} rise={1.6} spread={0.6} size={0.12} speed={1.1} opacity={0.6} />
            <group position={[HER[0], 2.0 - fall * fall * 1.9, HER[2]]} rotation={[0, t * 3, 0.3]}>
              <mesh>
                <boxGeometry args={[0.8, 0.05, 0.8]} />
                <meshStandardMaterial color="#16121c" />
              </mesh>
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[0.4, 0.36, 0.4]} />
                <meshStandardMaterial color="#1c1626" />
              </mesh>
            </group>
            {lamp([HER[0] + 1, 1.6, HER[2] + 2.2], 9)}
          </>
        );
      },
    },
    {
      cue: "4.love",
      ...cam.orbit({ on: [STUMP[0] + 0.1, 0.5, STUMP[2] + 1.3], dist: 2.2, distTo: 2.6, yaw: -30, yawTo: 24, pitch: -4, pitchTo: 8, fov: 46 }),
      zone: "forest",
      look: NIGHT,
      note: "Round his feet and up: he is standing, turning one foot and then the other, and he jumps for joy on 'loved'.",
      stage: (t) => {
        const loved = wordAt("4.love", "loved");
        const p: Vec3 = [STUMP[0] + 0.1, hop(t, loved, 0.45, 0.45) + hop(t, loved + 0.5, 0.3, 0.4), STUMP[2] + 1.3];
        return (
          <>
            <Hero position={p} rotationY={Math.sin(t * 2.4) * 0.5} animation={t > loved ? "cheer" : "idle"} face="laugh" headPitch={t > loved ? 0 : 0.45} shoes={SHOE} shoeGlow={0.8} />
            <Glint position={[p[0], 0.2, p[2] + 0.3]} t={t - 0.3} size={1.1} />
            <DustRing position={[p[0], 0.05, p[2]]} t={t - loved - 0.45} size={0.8} color="#ff8a7a" />
            {lamp([p[0] + 0.6, 1.3, p[2] + 2], 9)}
          </>
        );
      },
    },
  ],
});
