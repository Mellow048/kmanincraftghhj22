import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Beam, Bits, Bubble, Bush, CutTree, DUSK, Fill, Hero, Jets, OldMan, ZONE,
  ease, f, front, jolt, lerp, pop, ramp, timing, toward, wordAt,
} from "./kit";

export const ME: Vec3 = f(-0.8, 0, 0.4);
export const TREE: Vec3 = f(-3.0, 0, -2.6);
export const OLD: Vec3 = f(2.2, 0, -1.4);
export const BUSH: Vec3 = f(-2.7, 0, 1.5);
const CYAN = "#4fe3ff";

/** Where his flying takes him: up, and not in a straight line. */
const fly = (t: number, k: number): Vec3 => [ME[0] + 0.5 * Math.sin(t * 3.1) * k, 4.2 * k + 0.25 * Math.sin(t * 5.3) * k, ME[2] + 0.3 * Math.sin(t * 2.3) * k];

/** THE FOREST: a beam, a tree, flying, and an old man. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The forest",
  shots: [
    {
      cue: "10.forest",
      ...cam.push({ on: f(-0.6, 1.5, 0.4), dist: 8.0, to: 6.6, yaw: 0, pitch: 4, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "A clearing in the pines, evening. He walks into it in the suit, looks left, looks right. Nobody. Then he trips on nothing.",
      stage: (t, { p }) => {
        const fall = wordAt("10.forest", "fall");
        const trip = jolt(t, fall, 0.5);
        const z = ME[2] - 2.2 + 2.2 * Math.min(1, p * 1.4);
        return (
          <>
            <Hero position={[ME[0], 0, z]} animation={trip > 0.05 ? "stagger" : p < 0.7 ? "walk" : "lookAround"} animDistance={2.2 * p} suit={1} headPitch={0.5 * trip} />
            <Bits position={[ME[0], 0.1, z]} t={t - fall} color="#6a8a4a" count={6} power={1.2} />
            <Bush position={BUSH} /><CutTree position={TREE} />
          </>
        );
      },
    },
    {
      cue: "10.beam",
      ...cam.push({ on: f(-1.75, 1.5, -1.0), dist: 8.4, to: 7.8, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "He holds one hand out at a tree. A beam of blue-white light comes out of his palm and goes straight through the trunk. The top of the tree slides off and falls over.",
      impacts: [{ at: 1.5, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const b = wordAt("10.beam", "beam");
        const cut = wordAt("10.beam", "cut");
        const yaw = toward(ME, TREE);
        const hand = front(ME, yaw, 0.7, 1.25);
        const on = t > b && t < cut + 0.35;
        return (
          <>
            <Hero position={ME} rotationY={yaw} animation={t > b - 0.5 ? "point" : "idle"} suit={1} eyes={on ? 2 : 1} />
            {on ? <Beam from={hand} to={[TREE[0] - 2.5, 1.35, TREE[2] - 3.4]} width={0.16 + 0.04 * Math.sin(t * 50)} /> : null}
            {on ? <pointLight position={hand} color={CYAN} intensity={30} distance={8} decay={2} /> : null}
            <Bush position={BUSH} /><CutTree position={TREE} cut={ease(ramp(t, cut, cut + 0.9))} dir={-1} />
            <Bits position={[TREE[0], 1.3, TREE[2] + 0.3]} t={t - b - 0.05} color="#ffb060" count={14} power={2.4} />
          </>
        );
      },
    },
    {
      cue: "10.sorry",
      ...cam.push({ on: [ME[0], 1.5, ME[2]], dist: 2.5, to: 2.3, yaw: -10, pitch: 0, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Visor up, wincing at the stump. Sorry, tree.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={-0.4} animation="shrug" suit={1} visor={1} face="uneasy" />
          <Bush position={BUSH} /><CutTree position={TREE} cut={1} dir={-1} />
          <Fill on={[ME[0], 1.5, ME[2]]} yaw={-10} power={5} />
        </>
      ),
    },
    {
      cue: "10.feet",
      ...cam.push({ on: [ME[0], 1.0, ME[2]], onTo: [ME[0], 3.6, ME[2]], dist: 5.6, to: 6.6, yaw: 0, pitch: -6, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "His boots light up blue. He looks down at them. Then two jets of fire come out of the soles and he goes straight up off the grass, arms out for balance.",
      stage: (t) => {
        const lit = wordAt("10.feet", "lit");
        const fl = wordAt("10.feet", "flying");
        const k = ease(ramp(t, fl - 0.5, fl + 0.6));
        const at = fly(t, k);
        return (
          <>
            <Hero position={at} animation={k > 0.05 ? "fall" : "idle"} suit={1} headPitch={k > 0.05 ? 0 : 0.5} />
            <Jets position={at} power={ramp(t, lit - 0.1, lit + 0.2) * (0.4 + 0.6 * k)} t={t} />
            <Bits position={[ME[0], 0.1, ME[2]]} t={t - fl + 0.5} color="#b8d8ff" count={16} power={2.6} />
            <Bush position={BUSH} /><CutTree position={TREE} cut={1} dir={-1} />
          </>
        );
      },
    },
    {
      cue: "10.badly",
      ...cam.push({ on: [ME[0], 4.9, ME[2]], dist: 5.6, to: 5.0, yaw: 10, pitch: -4, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Up among the tops of the pines: he goes round and round and sideways with his arms going. Then, on 'flying', he gets it level, and both fists go up.",
      stage: (t) => {
        const ok = wordAt("10.badly", "flying");
        const bad = 1 - ease(ramp(t, ok - 0.4, ok));
        const at: Vec3 = [ME[0] + 0.9 * Math.sin(t * 5) * bad, 4.2 + 0.5 * Math.sin(t * 8) * bad, ME[2] + 0.4 * Math.cos(t * 5) * bad];
        return (
          <>
            <Hero position={at} rotationY={t * 7 * bad} animation={bad > 0.2 ? "panic" : "cheer"} suit={1} />
            <Jets position={at} rotationY={t * 7 * bad} power={1} t={t} />
          </>
        );
      },
    },
    {
      cue: "11.saw",
      ...cam.top({ on: OLD, height: 7, to: 5.5, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Straight down from where he is flying: the clearing, the cut tree, and one small grey figure standing alone between the trunks.",
      stage: () => (
        <>
          <OldMan position={OLD} animation="ache" />
          <Bush position={BUSH} /><CutTree position={TREE} cut={1} dir={-1} />
        </>
      ),
    },
    {
      cue: "11.old",
      ...cam.push({ on: [OLD[0], 1.15, OLD[2]], dist: 3.8, to: 3.0, yaw: 8, pitch: 3, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "An old man: white hair, white beard, a long brown coat. He is bent over, and on 'shaking' we see his knees going.",
      stage: (t) => {
        const sh = wordAt("11.old", "shaking");
        const k = t > sh - 0.4 ? 0.022 : 0.008;
        return (
          <>
            <OldMan position={[OLD[0] + Math.sin(t * 42) * k, 0, OLD[2]]} animation="ache" headPitch={0.3} />
            <Fill on={[OLD[0], 1.4, OLD[2]]} yaw={8} power={5} />
          </>
        );
      },
    },
    {
      cue: "11.lost",
      ...cam.push({ on: [ME[0], 5.75, ME[2]], dist: 2.8, to: 2.4, yaw: -14, pitch: -6, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Him in the air, visor up, looking down, worried for the old man. A thought over him: LOST?",
      stage: (t) => {
        const at: Vec3 = [ME[0], 4.2 + 0.08 * Math.sin(t * 4), ME[2]];
        return (
          <>
            <Hero position={at} rotationY={0.3} animation="idle" suit={1} visor={1} face="worried" headPitch={0.45} />
            <Jets position={at} power={0.8} t={t} />
            <Fill on={[at[0], 5.7, at[2]]} yaw={-14} power={5} />
            <group scale={pop(t, wordAt("11.lost", "lost") - 0.1)}>
              <Bubble text="LOST?" position={[at[0], 6.5, at[2]]} scale={0.36} dark />
            </group>
          </>
        );
      },
    },
    {
      cue: "11.landed",
      ...cam.push({ on: f(0.7, 1.2, -0.5), dist: 7.0, to: 6.0, yaw: 0, pitch: 5, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "He comes down on the grass in a puff of dust, the jets go out, and he walks over to the old man with one hand held out.",
      impacts: [{ at: 0.45, amp: 0.05, dur: 0.25 }],
      stage: (t) => {
        const land = 0.45;
        const k = ramp(t, 0, land);
        const w = ease(ramp(t, land + 0.2, 1.8));
        const yaw = toward(ME, OLD);
        const at: Vec3 = [lerp(ME[0], OLD[0] - 0.25, w * 0.62), 3 * (1 - k) * (1 - k), lerp(ME[2], OLD[2], w * 0.62)];
        return (
          <>
            <Hero position={at} rotationY={yaw} animation={k < 1 ? "fall" : w < 1 ? "walk" : "reach"} animDistance={2.1 * w} suit={1} visor={1} face="smile" />
            <Jets position={at} rotationY={yaw} power={1 - k} t={t} />
            <Bits position={[ME[0], 0.1, ME[2]]} t={t - land} color="#8aa070" count={14} power={2.4} />
            <OldMan position={[OLD[0] + Math.sin(t * 42) * 0.015, 0, OLD[2]]} rotationY={toward(OLD, ME)} animation="ache" headPitch={0.3} />
            <Bush position={BUSH} /><CutTree position={TREE} cut={1} dir={-1} />
          </>
        );
      },
    },
  ],
});
