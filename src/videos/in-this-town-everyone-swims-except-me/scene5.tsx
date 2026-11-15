import { Glow, cam, storyScene } from "../../engine";
import { EAST, HM, Hero, NORTH, Puffs, Ring, SOUTH, Stranger, Towel, WD, WEST, Wisps, posed, sine, timing, tw, w } from "./kit";

/**
 * 05 THE WOODS — a voice from the trees, a ring, and nobody to ask.
 *
 * The path runs north into the wood. The stranger stands on it at z = 4, side on, twice as tall as he is;
 * the lens never gets round to the front of the face.
 */
const HIM = WD(-0.95, 0, 4);
const ME = WD(1.0, 0, 4);
/** The ring on the stranger's open hand. */
const PALM = WD(-0.58, 1.02, 4.0);
const CALL = w("5.call", "called");
const HOLD = w("5.stranger", "holding");
const SLEEP = w("5.lamp", "went");

const ringLight = (at: [number, number, number], power = 2.2) => <pointLight position={at} color="#ffd98a" intensity={power} distance={3.4} decay={2} />;

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The woods",
  shots: [
    {
      cue: "5.home",
      ...cam.truck({ on: [-5.5, 0.95, 2.2], dist: 5.6, yaw: 32, pitch: 8, fov: 40, by: [1.9, 0, 0] }),
      zone: "village",
      look: "overworld-night",
      note: "The street at night, lamps lit, windows lit: he comes along it alone with a towel round his neck, head down, feet dragging, the last one home from the pool.",
      stage: (t, { p }) => {
        const x = -6.2 + 1.9 * sine(p);
        return (
          <>
            <Hero position={[x, 0, 2.2]} rotationY={EAST} animation="walk" animDistance={x + 7} face="frown" headPitch={0.4} />
            <Towel position={[x, 1.02, 2.2]} color="#f6f2e6" size={[0.3, 0.06, 0.52]} />
          </>
        );
      },
    },
    {
      cue: "5.call",
      ...cam.push({ on: WD(0, 1.3, 9), dist: 7.4, to: 5.8, yaw: 8, pitch: 4, fov: 44 }),
      zone: "woods",
      look: "overworld-night",
      note: "Where the street meets the wood. He is walking past. On 'called' a pale light opens between the trunks down the path, and he stops with one foot in the air and turns his head to it.",
      stage: (t) => {
        const heard = tw(t, CALL - 0.1, CALL + 0.2);
        const x = -1.2 + Math.min(t, CALL) * 1.3;
        return (
          <>
          <pointLight position={WD(0.6, 3.2, 7)} color="#9db8ff" intensity={4} distance={11} decay={1.5} />
            <Hero position={WD(x, 0, 13)} rotationY={EAST + heard * 1.3} animation={t < CALL ? "walk" : "idle"} animDistance={x + 2} face={heard > 0.5 ? "surprised" : "frown"} headYaw={heard * 0.4} />
            <Glow position={WD(0, 1.6, -1)} size={2 + heard * 3 + Math.sin(t * 9) * 0.5 * heard} color="#bcd6ff" opacity={0.15 + heard * 0.45} />
            <Wisps position={WD(0, 1.2, 4)} t={t} count={8} reach={6} color="#cfe0ff" size={0.12} opacity={0.5 * heard} dir={[0, 0.05, 1]} />
          </>
        );
      },
    },
    {
      cue: "5.woods",
      ...cam.truck({ on: WD(0, 0.95, 10.2), dist: 4.4, yaw: 172, pitch: 2, fov: 42, by: [0, 0, -1.5] }),
      zone: "woods",
      look: "overworld-night",
      note: "In front of him, backing away down the path: he comes in under the trees with his eyes going left and right and the last street lamp getting small behind him.",
      stage: (t, { p }) => {
        const z = 10.6 - 1.5 * sine(p);
        return <Hero position={WD(0.2, 0, z)} rotationY={NORTH} animation="creep" animDistance={10.6 - z + 1} face="uneasy" headYaw={Math.sin(t * 4.5) * 0.5} />;
      },
    },
    {
      cue: "5.stranger",
      ...cam.push({ on: WD(0, 1.2, 4), dist: 7.4, to: 6.6, yaw: 0, pitch: 3, fov: 42 }),
      zone: "woods",
      look: "overworld-night",
      note: "Side on, both of them: something very tall and very dark on the left of the path, him small on the right with his head tipped back. An arm comes out from the dark, level, slowly.",
      stage: (t) => {
        const out = tw(t, 0.15, HOLD);
        return (
          <>
            <Stranger position={HIM} rotationY={EAST} ring nod={0.2} />
          <pointLight position={WD(-0.5, 2.3, 6.3)} color="#b4c8ff" intensity={9} distance={7.5} decay={1.5} />
          <pointLight position={WD(-2.4, 2.6, 3.0)} color="#b4c8ff" intensity={5} distance={6} decay={1.5} />
            <Hero position={ME} rotationY={WEST} animation="scared" face="fear" headPitch={-0.35} />
            {ringLight([PALM[0] + 0.2, PALM[1] + 0.2, PALM[2] + 0.3], 1.5 * out)}
            <Glow position={PALM} size={0.5 + out * 0.5} color="#ffd98a" opacity={0.5 * out} />
          </>
        );
      },
    },
    {
      cue: "5.stranger",
      cut: Math.max(0.5, HOLD - 0.05),
      ...cam.orbit({ on: PALM, dist: 1.35, distTo: 0.95, yaw: 50, yawTo: 25, pitch: 26, fov: 38 }),
      zone: "woods",
      look: "overworld-night",
      note: "The open hand, and on it a gold band with three small buttons along one side: red, yellow, green. It is the brightest thing in the wood. His face, behind it, is lit by it.",
      stage: (t) => (
        <>
          <Stranger position={HIM} rotationY={EAST} ring nod={0.2} />
          <pointLight position={WD(-0.5, 2.3, 6.3)} color="#b4c8ff" intensity={9} distance={7.5} decay={1.5} />
          <pointLight position={WD(-2.4, 2.6, 3.0)} color="#b4c8ff" intensity={5} distance={6} decay={1.5} />
          <Hero position={ME} rotationY={WEST} animation="idle" face="surprised" headPitch={-0.3} />
          {ringLight([PALM[0] + 0.3, PALM[1] + 0.25, PALM[2] + 0.2], 2.4)}
          <Glow position={PALM} size={0.9} color="#ffd98a" opacity={0.45} />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.push({ on: WD(0.05, 1.05, 4.0), dist: 5.9, to: 5.3, yaw: 20, pitch: 2, fov: 40 }),
      zone: "woods",
      look: "overworld-night",
      note: "Past a dark shoulder and a dark arm: his face in the ring's gold light, talking fast, pointing at it, then at himself, then at it.",
      stage: (t) => (
        <>
          <Stranger position={HIM} rotationY={EAST} ring nod={0.2} />
          <pointLight position={WD(-0.5, 2.3, 6.3)} color="#b4c8ff" intensity={9} distance={7.5} decay={1.5} />
          <pointLight position={WD(-2.4, 2.6, 3.0)} color="#b4c8ff" intensity={5} distance={6} decay={1.5} />
          <Hero position={ME} rotationY={WEST} animation="talk" arms="point" face="uneasy" headPitch={-0.3 + Math.sin(t * 6) * 0.08} />
          {ringLight([PALM[0] + 0.4, PALM[1] + 0.1, PALM[2]], 2.6)}
          <pointLight position={WD(0.8, 2.6, 6.6)} color="#9db8ff" intensity={5} distance={9} decay={1.6} />
        </>
      ),
    },
    {
      cue: "5.silent",
      ...cam.push({ on: WD(0.0, 1.35, 4), dist: 3.9, to: 3.3, yaw: -118, pitch: -2, fov: 40 }),
      zone: "woods",
      look: "overworld-night",
      note: "Up at the head from below, against the pale light: no mouth that moves, nothing in the eyes. It does not even turn to look at him.",
      stage: (t) => (
        <>
          <Stranger position={HIM} rotationY={EAST} ring nod={0.2} />
          <pointLight position={WD(-0.5, 2.3, 6.3)} color="#b4c8ff" intensity={9} distance={7.5} decay={1.5} />
          <pointLight position={WD(-2.4, 2.6, 3.0)} color="#b4c8ff" intensity={5} distance={6} decay={1.5} />
          <Hero position={ME} rotationY={WEST} animation="idle" face="uneasy" headPitch={-0.35} />
          {ringLight([PALM[0] + 0.4, PALM[1] + 0.1, PALM[2]], 3)}
          <pointLight position={WD(-1.4, 2.8, 1.6)} color="#9db8ff" intensity={4} distance={8} decay={1.6} />
          <Wisps position={WD(-0.95, 0.4, 4)} t={t} count={6} reach={1.6} color="#cfe0ff" size={0.1} opacity={0.35} dir={[0, 1, 0]} />
        </>
      ),
    },
    {
      cue: "5.left",
      ...cam.push({ on: WD(0.2, 1.2, 2.4), dist: 6.4, to: 5.8, yaw: 14, pitch: 6, fov: 42 }),
      zone: "woods",
      look: "overworld-night",
      note: "And it is walking away up the path, already half gone between the trunks, and he is standing there with both hands out and a ring in them.",
      stage: (t) => (
        <>
          <Stranger position={WD(-0.6, 0, 3.2 - t * 5.5)} rotationY={NORTH} walk={t * 5.5} />
          <Hero position={ME} rotationY={SOUTH + 0.2} headPitch={0.4} pose={posed("idle", t, { armR: [-1.15, 0, -0.28], armL: [-1.15, 0, 0.28] })} face="surprised" />
          <Ring position={WD(1.08, 0.93, 4.42)} scale={3} glow={1.5} lit={1} />
          {ringLight(WD(1.1, 1.2, 4.7), 2.4)}
          <pointLight position={WD(0.6, 3, 7)} color="#9db8ff" intensity={5} distance={10} decay={1.6} />
        </>
      ),
    },
    {
      cue: "5.cold",
      ...cam.push({ on: WD(1.0, 0.98, 4.3), dist: 1.8, to: 1.2, yaw: 10, pitch: 22, fov: 38 }),
      zone: "woods",
      look: "overworld-night",
      note: "In his two hands, close: the band shivers on his palms as if something small inside it is running, and his breath comes out white over it.",
      stage: (t) => {
        const hum = Math.sin(t * 46) * 0.004;
        return (
          <>
            <Hero position={ME} rotationY={SOUTH} pose={posed("idle", t, { armR: [-1.15, 0, -0.28], armL: [-1.15, 0, 0.28] })} face="uneasy" headPitch={0.5} />
            <Ring position={WD(1.0 + hum, 0.93 + Math.abs(hum), 4.45)} rotation={[0, 0.5 + hum * 6, 0]} scale={3} glow={1.3 + Math.sin(t * 12) * 0.5} lit={1} />
            {ringLight(WD(1.0, 1.15, 4.7), 2.2 + Math.sin(t * 12) * 0.6)}
            <Glow position={WD(1.0, 0.95, 4.45)} size={0.55 + Math.sin(t * 12) * 0.08} color="#bfe6ff" opacity={0.35} />
            <Puffs position={WD(1.0, 1.12, 4.3)} color="#eaf6ff" count={4} rise={0.25 + t * 0.12} spread={0.3} size={0.09} />
          </>
        );
      },
    },
    {
      cue: "5.lamp",
      ...cam.push({ on: HM(-1.45, 0.62, -0.1), dist: 1.7, to: 1.3, yaw: 24, pitch: 24, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "His bedside table: a red sleeve comes in and sets the band down in the lantern's light, carefully, the way you put down something that might go off.",
      stage: (t) => (
        <>
          <Hero position={HM(-0.72, 0, -0.1)} rotationY={WEST} pose={posed("idle", t, { bodyPitch: 0.3, armR: [-1.2 - tw(t, 0, 0.4) * 0.15, 0, 0] })} face="uneasy" headPitch={0.3} />
          <Ring position={HM(-1.4, 0.59 + (1 - tw(t, 0.1, 0.45)) * 0.18, -0.12)} scale={3} glow={1.2} lit={1} />
          {ringLight(HM(-1.3, 0.9, 0.2), 1.6)}
        </>
      ),
    },
    {
      cue: "5.lamp",
      cut: Math.max(0.5, SLEEP - 0.1),
      ...cam.push({ on: HM(-1.4, 0.68, -0.3), dist: 1.15, to: 0.9, yaw: -90, pitch: 7, fov: 44 }),
      zone: "home",
      look: "overworld-night",
      note: "Across the ring to the bed: he is asleep on his back with his mouth open. Nobody sees the green button come on by itself.",
      stage: (t) => (
        <>
          <Hero position={HM(1.3, 0.34, -0.3)} rotationY={0} animation="sleep" face="sleepy" />
          <Ring position={HM(-1.4, 0.59, -0.12)} scale={3} glow={1.2 + tw(t, 0.25, 0.5) * 0.8} lit={t > 0.3 ? 3 : 1} />
          {ringLight(HM(-1.3, 0.9, 0.2), 1.6 + tw(t, 0.25, 0.5))}
          <Glow position={HM(-1.4, 0.62, -0.12)} size={0.4 + tw(t, 0.25, 0.5) * 0.3} color="#9ff0c0" opacity={0.4 * tw(t, 0.25, 0.5)} />
        </>
      ),
    },
  ],
});
