import { FogCard, Glow, Vox, cam, lerp, storyScene } from "../../engine";
import { Dragon, Fire, MonsterEgg, Puffs } from "../../../Topics/InThisTown/creatures";
import { CARRIED, EAST, Hero, HeroEgg, carried, dragonMouth, ease, ramp, timing } from "./kit";

const STANDS: [number, number, number] = [-3.4, 0, 4.3];
const HELD = carried(STANDS, 0);
/** Open grass south of the street: room for four dragons in a ring. */
const RING: [number, number, number] = [3, 0, 6.5];
const DRAGONS: Array<[number, string, string]> = [
  [45, "#c9412b", "#f1c57c"],
  [135, "#3f7fd8", "#cfe0ff"],
  [225, "#4f9a3a", "#d8e6a0"],
  [315, "#d8a21e", "#fff0b0"],
];
const LOOKS_EAST: [number, number, number] = [8, 0, 1.2];

/** THE PRICE. It worked, so now he knows what it will take. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The price",
  shots: [
    {
      cue: "11.catch",
      ...cam.push({ on: [HELD[0], HELD[1] + 0.3, HELD[2]], dist: 2.0, to: 1.55, yaw: 6, pitch: 20 }),
      zone: "town",
      look: "overworld-day",
      note: "'One sneeze was not enough': the glow in the crack dies in his hands while we watch, and his face goes with it.",
      stage: (t) => (
        <HeroEgg position={STANDS} rotationY={0} face="frown" headPitch={0.3} egg={{ glow: lerp(1, 0.1, ease(ramp(t, 0.3, 2.0))) }} />
      ),
    },
    {
      cue: "11.more",
      ...cam.top({ on: [RING[0], 0.4, RING[2]], height: 9.6, to: 7.6, spin: [-20, 22], fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "'More fire than every dragon in town': straight down on four dragons breathing at one small egg, turning like a wheel. It still does not hatch.",
      stage: (t) => (
        <>
          <Vox kind="stone" position={[RING[0], 0.25, RING[2]]} size={[0.6, 0.5, 0.6]} />
          <MonsterEgg position={[RING[0], 0.5, RING[2]]} scale={CARRIED} cracked glow={0.25 + Math.sin(t * 9) * 0.1} />
          {DRAGONS.map(([deg, color, belly], i) => {
            const a = (deg * Math.PI) / 180;
            const at: [number, number, number] = [RING[0] + Math.sin(a) * 2.3, 0, RING[2] + Math.cos(a) * 2.3];
            const facing = a + Math.PI;
            return (
              <group key={i}>
                <Dragon position={at} rotationY={facing} scale={0.6} color={color} belly={belly} mouth={1} phase={i} />
                <Fire from={dragonMouth(at, facing, 0.6)} to={[RING[0], 0.75, RING[2]]} width={0.14} count={14} seed={i + 2} />
              </group>
            );
          })}
          <Hero position={[RING[0], 0, RING[2] + 3.5]} rotationY={Math.PI} animation="shrug" face="frown" />
        </>
      ),
    },
    {
      cue: "11.place",
      ...cam.orbit({ on: [8, 1.15, 1.2], dist: 2.3, yaw: 62, yawTo: -92, pitch: 2, pitchTo: -8, distTo: 2.9, fov: 42 }),
      zone: "town+lake",
      look: "overworld-day",
      note: "'Only one place': start on his face, swing right round behind him, and find what he is looking at: smoke and a red sky over the town wall.",
      stage: () => (
        <>
          <HeroEgg position={LOOKS_EAST} rotationY={EAST} carry="hug" face="brave" />
          {/* What the lake looks like from inside the town: a red sky and smoke, close behind the wall. */}
          <FogCard position={[33, 14, 1]} rotationY={-Math.PI / 2} width={70} height={30} color="#f0400e" opacity={0.8} />
          <Glow position={[31, 7.5, 1]} size={12} color="#ffb347" opacity={0.35} />
          <Puffs position={[31.5, 5, -4]} color="#3a2622" count={9} rise={11} spread={1.6} size={1.6} speed={0.22} opacity={0.75} seed={71} />
          <Puffs position={[32, 5, 5]} color="#3a2622" count={9} rise={12} spread={1.8} size={1.8} speed={0.18} opacity={0.75} seed={72} />
          <Puffs position={[31, 6, 1]} color="#ffb347" count={10} rise={7} spread={3} size={0.24} speed={0.5} opacity={0.95} seed={73} />
        </>
      ),
    },
    {
      cue: "11.lake",
      ...cam.push({ on: [56, 0, 1], dist: 30, to: 24, yaw: -82, pitch: 16, fov: 50 }),
      zone: "lake",
      look: "lava-shore",
      note: "'The lava lake': the first sight of the other side. A new colour for a new act: black rock and orange fire, no green anywhere.",
      stage: () => (
        <>
          <Puffs position={[49, -0.3, 3]} color="#ffb347" count={6} rise={2.2} spread={0.5} size={0.3} speed={0.7} opacity={0.9} seed={31} />
          <Puffs position={[54, -0.3, -4]} color="#ffd27a" count={6} rise={2.6} spread={0.6} size={0.34} speed={0.6} opacity={0.9} seed={32} />
        </>
      ),
    },
    {
      cue: "11.never",
      ...cam.push({ on: [27.6, 2.3, 1], dist: 6.8, to: 4.9, yaw: -90, pitch: -6 }),
      zone: "town",
      look: "overworld-day",
      note: "'No kid had ever been allowed': the gate and its sign, with him small at the bottom of the frame looking up at it.",
      stage: () => <HeroEgg position={[24.5, 0, 1]} rotationY={EAST} carry="hug" face="uneasy" />,
    },
  ],
});
