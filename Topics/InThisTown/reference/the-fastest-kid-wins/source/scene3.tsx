import { Block, Vox, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Board, Chicken, DustRing, FOREST, FPOND, Glint, Hero, NIGHT, Puffs, SHOE, STUMP, ShoePair, Streaks, at, ease, faceOf, hop, pop, ramp, timing, wordAt,
} from "./kit";

const E = Math.PI / 2;
const lamp = (p: Vec3, k = 7) => <pointLight position={p} color="#cfd8ff" intensity={k} distance={7} decay={2} />;
/** Where he stands still while the world hangs. */
const HANG: Vec3 = at(FOREST, 6, 0, 1.4);
const SEAT: Vec3 = [STUMP[0], 0, STUMP[2] + 0.42];
/** The shoe he holds up to look at, and the bush he goes through. */
const HELD: Vec3 = [STUMP[0] + 0.03, 0.74, STUMP[2] + 0.92];
const BUSH: Vec3 = at(FOREST, 9, 0, 1.2);

/** A bird, wings open. `flap` -1…1. */
const Bird: React.FC<{ position: Vec3; flap?: number; rotationY?: number }> = ({ position, flap = 0, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0, 0]} size={[0.16, 0.14, 0.36]} color="#3a4a6a" />
    <Block position={[0, 0.05, 0.22]} size={[0.13, 0.13, 0.13]} color="#46587c" />
    <Block position={[0, 0.03, 0.31]} size={[0.05, 0.04, 0.07]} color="#e8a21c" />
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.08, 0.04, 0]} rotation={[0, 0, s * flap * 0.7]}>
        <Block position={[s * 0.24, 0, 0]} size={[0.48, 0.03, 0.26]} color="#56698f" />
      </group>
    ))}
    <Block position={[0, 0, -0.24]} size={[0.12, 0.03, 0.16]} color="#2f3d58" />
  </group>
);
/** Leaves hanging in the air, hardly moving. */
const Hung: React.FC<{ t: number; around: Vec3; n?: number }> = ({ t, around, n = 16 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const a = i * 2.4;
      const r = 0.9 + ((i * 37) % 23) * 0.13;
      return (
        <group key={i} position={[around[0] + Math.cos(a) * r, 0.5 + ((i * 53) % 29) * 0.09 - t * 0.012, around[2] + Math.sin(a) * r * 0.6]} rotation={[a, a * 2 + t * 0.05, a * 0.7]}>
          <Block size={[0.16, 0.012, 0.11]} color={["#b8642a", "#c98a2e", "#5f9a3a", "#8a5a22"][i % 4]} castShadow={false} />
        </group>
      );
    })}
  </>
);
/** A strip of light left behind by somebody too fast to see: from `a` to `b` along x. */
const Trail: React.FC<{ a: number; b: number; y?: number; z: number; k?: number; color?: string }> = ({ a, b, y = 0.6, z, k = 1, color = "#fff0a0" }) => (
  <Block position={[(a + b) / 2, y, z]} size={[Math.max(0.01, Math.abs(b - a)), 0.2 * k, 0.08]} color={color} emissive={color} emissiveIntensity={2.4} castShadow={false} />
);

/**
 * ACT 5 and 6. The shoes are far too good: the world hangs still, he is at the speed of light, and that is cheating.
 * Then the three buttons.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The speed of light",
  shots: [
    {
      cue: "5.run",
      ...cam.push({ on: at(FOREST, 3, 0.25, 1.4), dist: 2.3, to: 1.8, yaw: 40, pitch: 8, fov: 46 }),
      zone: "forest",
      look: NIGHT,
      note: "Feet only, on the ground: the red shoes light up and push off.",
      stage: (t) => (
        <>
          <Hero position={at(FOREST, 3 + Math.max(0, t - 0.45) * 9, 0, 1.4)} rotationY={E} animation={t > 0.45 ? "run" : "crouch"} animDistance={t > 0.45 ? t * 4 : undefined} face="brave" shoes={SHOE} shoeGlow={0.4} />
          {lamp(at(FOREST, 4, 1.2, 3), 6)}
          <DustRing position={at(FOREST, 3, 0.05, 1.4)} t={t - 0.45} size={1.2} color="#6f8f5a" />
          <Streaks position={at(FOREST, 3, 0.3, 1.4)} yaw={E} t={t - 0.45} n={8} spread={0.4} speed={14} />
        </>
      ),
    },
    {
      cue: "5.slow",
      ...cam.orbit({ on: [HANG[0], 1.0, HANG[2]], dist: 5.4, yaw: -24, yawTo: -14, pitch: 6, fov: 48 }),
      zone: "forest",
      look: NIGHT,
      note: "Wide, and suddenly nothing moves: he is in the middle of a stride, leaves hang all round him, the dust he kicked up stays where it is.",
      stage: (t) => (
        <>
          <Hero position={[HANG[0] - 0.4 + t * 0.12, 0, HANG[2]]} rotationY={E} animation="run" animDistance={5.3 + t * 0.12} face="wow" shoes={SHOE} shoeGlow={1} blink={false} />
          <Hung t={t} around={HANG} n={22} />
          <Bird position={[HANG[0] + 1.6, 2.6, HANG[2] - 0.6]} flap={0.5} rotationY={-E} />
          {lamp([HANG[0], 2, HANG[2] + 3], 10)}
        </>
      ),
    },
    {
      cue: "5.leaf",
      ...cam.push({ on: [HANG[0] + 0.22, faceOf(HANG)[1], HANG[2]], dist: 1.25, to: 1.0, yaw: 38, pitch: 0, fov: 36 }),
      zone: "forest",
      look: NIGHT,
      note: "As close as the film gets: one leaf, not falling, a hand from his nose. He leans in and looks at it.",
      stage: (t) => (
        <>
          <Hero position={HANG} rotationY={E} animation="idle" face="wow" headPitch={0.08} gaze={0} shoes={SHOE} blink={false} />
          <group position={[HANG[0] + 0.42, faceOf(HANG)[1] - 0.02 - t * 0.006, HANG[2] + 0.02]} rotation={[0.4, 0.7 + t * 0.05, 0.5]}>
            <Block size={[0.13, 0.012, 0.09]} color="#c98a2e" castShadow={false} />
            <Block position={[0, 0.008, 0]} size={[0.12, 0.004, 0.012]} color="#8a5a22" castShadow={false} />
          </group>
          {lamp([HANG[0] + 1.2, 1.4, HANG[2] + 1], 6)}
        </>
      ),
    },
    {
      cue: "5.bird",
      ...cam.push({ on: [HANG[0] + 0.5, 2.5, HANG[2] - 0.3], dist: 2.6, to: 2.0, yaw: 150, pitch: -38, fov: 50 }),
      zone: "forest",
      look: NIGHT,
      note: "From the ground, straight up past his chin: a bird stuck in the sky with its wings open, against the stars.",
      stage: (t) => (
        <>
          <Hero position={HANG} rotationY={E} animation="idle" face="wow" headPitch={-0.6} shoes={SHOE} blink={false} />
          <Bird position={[HANG[0] + 0.9, 3.1, HANG[2] - 0.4]} flap={0.55 + t * 0.01} rotationY={-E + 0.4} />
          <Hung t={t} around={[HANG[0], 2, HANG[2]]} n={8} />
          {lamp([HANG[0] + 0.5, 2.4, HANG[2] + 1.5], 8)}
        </>
      ),
    },
    {
      cue: "5.real",
      ...cam.orbit({ on: at(FOREST, 4, 1.2, 1), dist: 9.5, distTo: 8, yaw: 8, yawTo: -8, pitch: 10, fov: 52 }),
      zone: "forest",
      look: NIGHT,
      note: "The same thing from outside: the forest at its real speed, leaves falling, a bird flapping, and through it a streak of light going back and forth too fast to be a boy.",
      stage: (t) => {
        const fast = wordAt("5.real", "fast") - 0.2;
        const k = Math.max(0, t - fast);
        const ph = k * 5.5;
        const x = 4 + Math.sin(ph) * 9;
        const dir = Math.cos(ph) > 0 ? 1 : -1;
        const z = 1.2 + Math.sin(ph * 0.5) * 1.6;
        return (
          <>
            {t < fast ? (
              <Hero position={at(FOREST, 4, 0, 1.2)} rotationY={0} animation="idle" face="wow" shoes={SHOE} shoeGlow={1} />
            ) : (
              <>
                <Hero position={at(FOREST, x, 0, z)} rotationY={dir * E} animation="run" animDistance={k * 60} face="laugh" shoes={SHOE} shoeGlow={2} />
                <Trail a={FOREST[0] + x} b={FOREST[0] + x - dir * 6.5} z={FOREST[2] + z} y={0.7} />
                <Trail a={FOREST[0] + x} b={FOREST[0] + x - dir * 9} z={FOREST[2] + z} y={0.12} k={0.3} color="#ff5a4a" />
                <pointLight position={at(FOREST, x, 1, z + 0.6)} color="#fff0a0" intensity={30} distance={9} decay={2} />
                <Streaks position={at(FOREST, x, 0.8, z)} yaw={dir * E} t={k % 0.5} n={10} spread={0.9} speed={16} />
              </>
            )}
            {[0, 1, 2, 3, 4].map((i) => (
              <Bits key={i} position={at(FOREST, -3 + i * 3.5, 0.2, 1 + (i % 2))} t={(k + i * 0.13) % 0.6} color={["#b8642a", "#c98a2e", "#5f9a3a"][i % 3]} count={8} power={2.2} />
            ))}
            <Bird position={at(FOREST, 7 - t * 1.6, 4.2 + Math.sin(t * 3) * 0.2, -0.5)} flap={Math.sin(t * 14)} rotationY={-E} />
          </>
        );
      },
    },
    {
      cue: "5.pond",
      ...cam.truck({ on: [FPOND[0] - 2.5, 0.4, FPOND[2]], dist: 6.5, yaw: -18, pitch: 30, fov: 48, by: [5, 0, 0] }),
      zone: "forest",
      look: NIGHT,
      note: "From above, the lens going with him: straight over the water, on top of it, with a wall of spray behind.",
      stage: (t, { dur }) => {
        const x = FPOND[0] - 7 + (t / dur) * 14;
        return (
          <>
            <Hero position={[x, 0.07, FPOND[2]]} rotationY={E} animation="run" animDistance={t * 40} face="laugh" shoes={SHOE} shoeGlow={2} />
            <Trail a={x} b={x - 4.5} z={FPOND[2]} y={0.6} />
            {[0, 1, 2, 3].map((i) => (
              <Bits key={i} position={[x - 0.6 - i * 0.8, 0.1, FPOND[2]]} t={(t + i * 0.11) % 0.45} color="#9fd0ff" count={9} power={2.6} seed={i + 1} />
            ))}
            <pointLight position={[x, 1, FPOND[2] + 1]} color="#fff0a0" intensity={24} distance={8} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.cheat",
      ...cam.push({ on: faceOf(HANG), dist: 2.4, to: 1.45, yaw: 76, pitch: 2, fov: 38 }),
      zone: "forest",
      look: NIGHT,
      note: "He skids to a stop in front of the lens, laughing, and the laugh goes. He looks down at his feet.",
      stage: (t) => {
        const stop = wordAt("5.cheat", "stopped");
        const cheat = wordAt("5.cheat", "cheating") - 0.2;
        const x = HANG[0] - 5 * (1 - ease(ramp(t, 0, stop)));
        return (
          <>
            <Hero position={[x, 0, HANG[2]]} rotationY={E} animation={t < stop ? "run" : "idle"} animDistance={t < stop ? x * 3 : undefined} face={t > cheat ? "uneasy" : "laugh"} headPitch={t > cheat + 0.8 ? 0.45 : 0} gaze={0} shoes={SHOE} shoeGlow={1} />
            <DustRing position={[HANG[0] + 0.3, 0.05, HANG[2]]} t={t - stop + 0.1} size={1.4} color="#8a6a3a" />
            <Puffs position={[HANG[0] - 0.4, 0.1, HANG[2]]} color="#8a7a66" count={4} rise={0.5} spread={0.4} size={0.08} speed={1.2} opacity={0.5} />
            {lamp([HANG[0] + 1.6, 1.4, HANG[2] + 1], 7)}
          </>
        );
      },
    },

    // ------------------------------------------------------------------ 6. the buttons
    {
      cue: "6.off",
      ...cam.orbit({ on: [STUMP[0], 0.75, STUMP[2] + 0.4], dist: 3.3, yaw: -26, yawTo: -8, pitch: 10, fov: 44 }),
      zone: "forest",
      look: NIGHT,
      note: "Back on the stump, in his socks, one shoe on the ground and one held up in both hands: he turns it over.",
      stage: (t) => (
        <>
          <Hero position={SEAT} rotationY={0.1} animation="sit" arms="hold" face="frown" headPitch={0.35} />
          <group position={[SEAT[0], -0.02, SEAT[2]]} />
          <ShoePair one position={HELD} rotation={[0.2, -E + ease(ramp(t, 0.4, 1.6)) * Math.PI, 0]} scale={1.1} glow={0.8} />
          <ShoePair one position={[STUMP[0] - 0.7, 0, STUMP[2] + 0.7]} rotation={[0, 2.4, 0]} scale={1.2} glow={0.5} on={-1} />
          {lamp([STUMP[0] + 0.6, 1.5, STUMP[2] + 2.2], 9)}
        </>
      ),
    },
    {
      cue: "6.off",
      cut: wordAt("6.off", "side") - 0.3,
      ...cam.push({ on: [HELD[0], HELD[1] + 0.13, HELD[2]], dist: 1.0, to: 0.62, yaw: 4, pitch: 4, fov: 36 }),
      zone: "forest",
      look: NIGHT,
      note: "The side of the shoe, filling the frame: three buttons in a row, and the first one is green.",
      stage: (t) => (
        <>
          <ShoePair one position={HELD} rotation={[0, -E, 0]} scale={1.4} glow={0.7} />
          <Glint position={[HELD[0] - 0.1, HELD[1] + 0.14, HELD[2] + 0.13]} t={t - 0.5} size={0.5} />
          {lamp([HELD[0] + 0.4, HELD[1] + 0.5, HELD[2] + 1], 3)}
        </>
      ),
    },
    {
      cue: "6.one",
      ...cam.orbit({ on: [HELD[0] + 0.04, HELD[1] + 0.2, HELD[2]], dist: 0.95, yaw: -14, yawTo: 10, pitch: 2, fov: 40 }),
      zone: "forest",
      look: NIGHT,
      note: "Closer still, and round it: the lit button, and its label comes up over it, small, like the print on a kettle.",
      stage: (t) => {
        const said = wordAt("6.one", "light") - 0.25;
        return (
          <>
            <ShoePair one position={HELD} rotation={[0, -E, 0]} scale={1.4} glow={0.7} />
            <Board post={false} position={[HELD[0] - 0.02, HELD[1] + 0.36, HELD[2] + 0.13]} text="LIGHT SPEED" scale={0.16 * pop(t, said)} color="#15151a" ink="#4dff6a" />
            <Block position={[HELD[0] - 0.1, HELD[1] + 0.25, HELD[2] + 0.13]} size={[0.006, 0.12 * ramp(t, said, said + 0.2), 0.006]} color="#4dff6a" emissive="#4dff6a" emissiveIntensity={1.5} castShadow={false} />
            {lamp([HELD[0] + 0.4, HELD[1] + 0.5, HELD[2] + 1], 3)}
          </>
        );
      },
    },
    {
      cue: "6.two",
      ...cam.push({ on: [HELD[0], HELD[1] + 0.13, HELD[2]], dist: 0.8, to: 0.66, yaw: 16, pitch: 10, fov: 38 }),
      zone: "forest",
      look: NIGHT,
      note: "A finger comes in and presses the second button: the green jumps along one.",
      stage: (t) => {
        const press = wordAt("6.two", "pressed");
        const k = ease(ramp(t, press - 0.35, press)) * (1 - ease(ramp(t, press + 0.15, press + 0.45)));
        return (
          <>
            <ShoePair one position={HELD} rotation={[0, -E, 0]} scale={1.4} glow={0.7} on={t > press ? 1 : 0} />
            <Block position={[HELD[0], HELD[1] + 0.14, HELD[2] + 0.6 - k * 0.4]} size={[0.07, 0.07, 0.34]} color="#dba47c" />
            <Glint position={[HELD[0], HELD[1] + 0.14, HELD[2] + 0.14]} t={t - press} size={0.5} />
            {lamp([HELD[0] + 0.4, HELD[1] + 0.5, HELD[2] + 1], 3)}
          </>
        );
      },
    },
    {
      cue: "6.two",
      cut: wordAt("6.two", "ran") - 0.3,
      ...cam.push({ on: [BUSH[0] - 1.5, 0.9, BUSH[2]], dist: 6.2, to: 5.4, yaw: -6, pitch: 6, fov: 48 }),
      zone: "forest",
      look: NIGHT,
      note: "Wide again: he goes off like a thrown stone, straight at a bush, and out of the other side of it in a cloud of leaves.",
      stage: (t) => {
        const go = 0.3;
        const bush = wordAt("6.two", "bush") - (wordAt("6.two", "ran") - 0.3);
        const x = t < go ? -6.5 : t < go + 0.5 ? -6.5 + ((t - go) / 0.5) * 6 : t < bush - 0.35 ? -0.5 : -0.5 + (t - bush + 0.35) * 22;
        const hit = bush - 0.35 + 0.02;
        const through = t > hit;
        return (
          <>
            <Vox kind="leaves" position={[BUSH[0], 0.8, BUSH[2]]} size={[1.8, 1.6, 1.4]} />
            {through ? <Block position={[BUSH[0], 0.75, BUSH[2] + 0.71]} size={[0.62, 1.3, 0.02]} color="#0a140a" castShadow={false} /> : null}
            <Hero position={[BUSH[0] + x, 0, BUSH[2]]} rotationY={E} animation={t < go ? "crouch" : t > go + 0.5 && !through ? "panic" : "run"} animDistance={x * 2 + 30} face={t > go + 0.5 ? "fear" : "brave"} shoes={SHOE} shoeGlow={1.4} />
            {t > go && t < go + 0.5 ? <Trail a={BUSH[0] + x} b={BUSH[0] - 6.5} z={BUSH[2]} y={0.6} k={0.6} /> : null}
            <Bits position={[BUSH[0], 0.9, BUSH[2]]} t={t - hit} color="#3f7f2d" count={22} power={3.4} />
            <Bits position={[BUSH[0] + 0.4, 0.6, BUSH[2]]} t={t - hit - 0.05} color="#5f9a3a" count={14} power={2.6} seed={4} />
            <Chicken position={[BUSH[0] + 1.6, hop(t, hit, 0.7, 0.5), BUSH[2] + 1.1]} rotationY={1} phase={2} />
            {lamp([BUSH[0] - 1, 2, BUSH[2] + 3], 10)}
          </>
        );
      },
    },
    {
      cue: "6.three",
      ...cam.push({ on: [HELD[0], HELD[1] + 0.13, HELD[2]], dist: 0.72, to: 0.6, yaw: -12, pitch: 6, fov: 38 }),
      zone: "forest",
      look: NIGHT,
      note: "The shoe again, with a leaf stuck to it: the finger presses the third button.",
      stage: (t) => {
        const press = wordAt("6.three", "pressed");
        const k = ease(ramp(t, press - 0.35, press)) * (1 - ease(ramp(t, press + 0.15, press + 0.45)));
        return (
          <>
            <ShoePair one position={HELD} rotation={[0, -E, 0]} scale={1.4} glow={0.7} on={t > press ? 2 : 1} />
            <group position={[HELD[0] - 0.14, HELD[1] + 0.22, HELD[2] + 0.13]} rotation={[1.3, 0, 0.5]}>
              <Block size={[0.1, 0.01, 0.07]} color="#5f9a3a" castShadow={false} />
            </group>
            <Block position={[HELD[0] + 0.1, HELD[1] + 0.14, HELD[2] + 0.6 - k * 0.4]} size={[0.07, 0.07, 0.34]} color="#dba47c" />
            <Glint position={[HELD[0] + 0.1, HELD[1] + 0.14, HELD[2] + 0.14]} t={t - press} size={0.5} />
            {lamp([HELD[0] + 0.4, HELD[1] + 0.5, HELD[2] + 1], 3)}
          </>
        );
      },
    },
    {
      cue: "6.right",
      ...cam.truck({ on: at(FOREST, -8, 1.0, 1.2), dist: 4.6, yaw: 22, pitch: 5, fov: 46, by: [10.7, 0, 0] }),
      zone: "forest",
      look: NIGHT,
      note: "The lens runs beside him, a little ahead: a real run, quick and easy, trunks going past. A leaf falls at its own speed.",
      stage: (t, { p }) => {
        const x = -8.3 + p * 10.7;
        return (
          <>
            <Hero position={at(FOREST, x, 0, 1.2)} rotationY={E} animation="run" animDistance={t * 6} face="grin" shoes={SHOE} shoeGlow={0.5} />
            <Puffs position={at(FOREST, x - 0.5, 0.05, 1.2)} color="#6f8f5a" count={3} rise={0.2} spread={0.2} size={0.05} speed={2} opacity={0.5} />
            <pointLight position={at(FOREST, x + 1.2, 1.3, 2.6)} color="#cfd8ff" intensity={8} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.right",
      cut: wordAt("6.right", "Nobody") - 0.15,
      ...cam.push({ on: faceOf(at(FOREST, 4, 0, 1.2)), dist: 1.8, to: 1.35, yaw: 20, pitch: 2, fov: 36 }),
      zone: "forest",
      look: NIGHT,
      note: "He stops and looks straight at us: the grin of somebody with a secret. He puts one foot behind the other.",
      stage: (t) => (
        <>
          <Hero position={at(FOREST, 4, 0, 1.2)} rotationY={0.3} animation="idle" face="grin" gaze={0} headYaw={Math.sin(t * 5) * 0.25 * (1 - ramp(t, 0.2, 0.9))} shoes={SHOE} shoeGlow={0.4} />
          {lamp(at(FOREST, 5, 1.4, 2.6), 7)}
        </>
      ),
    },
  ],
});
