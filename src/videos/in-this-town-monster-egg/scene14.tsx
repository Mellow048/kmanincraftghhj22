import { Block, cam, lerp, storyScene, stride } from "../../engine";
import { Golem, MonsterEgg, Phoenix, Puffs } from "../../../Topics/InThisTown/creatures";
import {
  Adult,
  Backpack,
  Bread,
  CARRIED,
  EAST,
  Hero,
  HeroEgg,
  Kid,
  NORTH,
  PLACE,
  Sister,
  ahead,
  carried,
  ease,
  faceOf,
  ramp,
  timing,
} from "./kit";
import { OvenDragon } from "./scene3";

const EDGE = PLACE.edge;
const HELD = carried(EDGE, EAST, "hug");

/** THE EDGE. Ten shots: the way there, one last look back at everything he might lose, and the drop. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The edge",
  shots: [
    {
      cue: "14.climb",
      ...cam.push({ on: [27.6, 4.9, 6.5], dist: 7.3, to: 5.6, yaw: -58, pitch: -30, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "'I climbed over the wall': from the ground, looking straight up the stone at a small kid on a rope near the top.",
      stage: (t, { p }) => {
        const at: [number, number, number] = [27.22, lerp(3.2, 5.25, ease(p)), 6.5];
        return (
          <>
            <Block position={[27.42, 3.4, 6.5]} size={[0.07, 6.8, 0.07]} color="#b5935a" />
            <Block position={[27.95, 6.82, 6.5]} size={[1.1, 0.1, 0.14]} color="#4b4b52" />
            <Hero position={at} rotationY={EAST} animation="walk" animDistance={at[1] * 1.7} arms="lift" face="brave" />
            <Backpack position={ahead(at, EAST, -0.22, 0.62)} rotationY={EAST} />
            <MonsterEgg position={ahead(at, EAST, -0.22, 0.8)} rotationY={EAST + Math.PI} scale={0.4} cracked />
          </>
        );
      },
    },
    {
      cue: "14.edge",
      ...cam.truck({ on: [38.9, 0.95, 1], dist: 3.3, yaw: -90, pitch: 12, by: [1.9, 0, 0] }),
      zone: "lake",
      look: "lava-shore",
      note: "'Walked to the edge of the lava': behind him as he goes, small against a whole horizon of fire. Act three's colour takes over.",
      stage: (t, { p }) => (
        <HeroEgg {...stride([38.7, 0, 1], [40.9, 0, 1], p)} animation="walk" carry="hug" pack face="uneasy" />
      ),
    },
    {
      cue: "14.heat",
      ...cam.pan({ from: [43.0, 0.5, 1.75], on: [41.4, 0.1, 1], onTo: [41.4, 1.1, 1] }),
      zone: "lake",
      look: "lava-shore",
      note: "'The soles of my shoes began to smoke': start on the shoes and the smoke, tilt up the kid to a face lit from below.",
      stage: () => (
        <>
          <HeroEgg position={EDGE} rotationY={EAST} carry="hug" pack face="fear" />
          <Puffs position={[41.5, 0.02, 0.9]} color="#e4e4e4" count={6} rise={0.8} spread={0.1} size={0.1} speed={0.9} opacity={0.8} seed={41} />
          <Puffs position={[41.5, 0.02, 1.1]} color="#e4e4e4" count={6} rise={0.8} spread={0.1} size={0.1} speed={0.9} opacity={0.8} seed={42} />
        </>
      ),
    },
    {
      cue: "14.look",
      ...cam.push({ on: [41.4, 1.12, 1], dist: 2.4, to: 1.8, yaw: -90, pitch: 0 }),
      zone: "lake",
      look: "lava-shore",
      note: "'One last look at home': he turns round, towards us and the town, with the fire behind him. The next three shots are what he sees.",
      stage: (t) => (
        <HeroEgg position={EDGE} rotationY={lerp(EAST, EAST + Math.PI, ease(ramp(t, 0.1, 1.0)))} carry="hug" pack face="frown" />
      ),
    },
    {
      cue: "14.ovens",
      ...cam.push({ on: [3.25, 1.0, -1.0], dist: 7.6, to: 6.7, yaw: -30, pitch: 10, fov: 30 }),
      zone: "town",
      look: "overworld-day",
      note: "Home, from far away through a long lens: the bakery dragon, exactly as in the tour. Same picture, and now it is a goodbye.",
      stage: () => (
        <>
          <OvenDragon />
          <Adult who={0} position={[3.95, 0, -1.2]} rotationY={-0.5} animation="reach" face="smile">
            <Bread position={[0, -0.06, 0.02]} rotationY={Math.PI / 2} scale={0.8} />
          </Adult>
        </>
      ),
    },
    {
      cue: "14.kids",
      ...cam.push({ on: [-20, 1.7, -1.7], dist: 6.3, to: 5.4, yaw: 0, pitch: 32 }),
      zone: "town",
      look: "overworld-day",
      note: "The golem again, from over its shoulder, carrying its sleeping kid up to the school door. He has watched this every morning of his life.",
      stage: (t, { p }) => (
        <>
          <Golem position={[-20, 0, lerp(1.1, -0.3, p)]} rotationY={NORTH} walk={p * 1.4} carry={1}>
            <Kid who={0} position={[0, -0.18, 0.05]} rotationY={Math.PI / 2} animation="sleep" face="sleepy" />
          </Golem>
          <Kid who={3} {...stride([-18.4, 0, 0.2], [-19.3, 0, -1.9], p)} animation="walk" face="sleepy" />
        </>
      ),
    },
    {
      cue: "14.phoenix",
      ...cam.push({ on: [-11.3, 1.6, -1.95], dist: 4.3, to: 3.6, yaw: 26, pitch: 2 }),
      zone: "town",
      look: "overworld-day",
      note: "'My sister's phoenix was delivering the mail': it comes down on the mailbox with a letter, and his sister waves to it.",
      stage: (t, { p }) => (
        <>
          <Phoenix position={[-11.6, lerp(2.5, 1.53, ease(p)), -2.3]} rotationY={0.5} scale={0.6} fly={p < 0.8} letter rank="10,000" />
          <Sister position={[-10.75, 0, -1.3]} rotationY={-0.6} animation="wave" face="smile" />
        </>
      ),
    },
    {
      cue: "14.nobody",
      ...cam.orbit({ on: [HELD[0], HELD[1] + 0.25, HELD[2]], dist: 1.4, yaw: 62, yawTo: 116, pitch: 10, fov: 38 }),
      zone: "lake",
      look: "lava-shore",
      note: "'Not one of them knew what I was holding': back to the egg in his arms, and the crack has started to glow on its own.",
      stage: (t) => (
        <HeroEgg position={EDGE} rotationY={EAST} carry="hug" pack face="uneasy" headPitch={0.25} egg={{ glow: 0.35 + Math.sin(t * 6) * 0.15 }} />
      ),
    },
    {
      cue: "14.breath",
      ...cam.push({ on: faceOf(EDGE), dist: 1.75, to: 1.3, yaw: 80, pitch: -4, fov: 36 }),
      zone: "lake",
      look: "lava-shore",
      note: "'Took a deep breath': eyes shut, the egg held tight, his whole body rising with the breath. The last quiet shot.",
      stage: (t) => (
        <HeroEgg position={[EDGE[0], ease(ramp(t, 0.5, 1.5)) * 0.035, EDGE[2]]} rotationY={EAST} carry="hug" pack face="calm" egg={{ glow: 0.4 }} />
      ),
    },
    {
      cue: "14.drop",
      ...cam.push({ on: [41.95, 0.55, 1], dist: 3.2, to: 2.8, yaw: 40, pitch: -2, fov: 42 }),
      zone: "lake",
      look: "lava-shore",
      note: "'And let it go': eighteen frames. His hands open and the egg falls out of them towards the lava.",
      stage: (t) => (
        <>
          <Hero position={EDGE} rotationY={EAST} animation="hold" face="calm" />
          <Backpack position={ahead(EDGE, EAST, -0.2, 0.6)} rotationY={EAST} />
          <MonsterEgg
            position={[lerp(41.78, 42.5, t / 0.6), Math.max(-0.3, 0.62 - 4.9 * t * t), 1]}
            rotationY={0.9}
            scale={CARRIED}
            cracked
            glow={0.4}
            tilt={t * 2.2}
          />
        </>
      ),
    },
  ],
});
