import { cam, storyScene } from "../../engine";
import { BRIDGE, BRIDGE_Y } from "./marks";
import {
  BigSlimeDad,
  Bits,
  DadStack,
  Hero,
  NORTH,
  OriginalBigDad,
  Puffs,
  ReedBasket,
  RogueGolem,
  SOUTH,
  SlimeballProp,
  TinyDad,
  WEST,
  pop,
  posed,
  sceneImpact,
  slimeBounce,
  timing,
  tw,
  w,
} from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Every Clue Clicks Into Place",
  shots: [
    {
      cue: "5.stare",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [0.95, BRIDGE_Y + 1.18, -0.65],
        on: [0.25, BRIDGE_Y + 0.95, 1.55],
        onTo: [BRIDGE.craterStone[0], BRIDGE_Y + 0.25, BRIDGE.craterStone[2]],
        fov: 40,
        fovTo: 35,
      }),
      handheld: 0.012,
      note: "Revelation `cam.pan`: from Hero's stunned eyes right across onto the fresh twin white iron-fist craters in the bridge stone!",
      stage: (t) => (
        <Hero
          position={[0.32, BRIDGE_Y, 1.68]}
          rotationY={WEST + 0.35}
          animation="idle"
          face="wow"
          lookAt={[BRIDGE.craterStone[0], BRIDGE_Y + 0.15, BRIDGE.craterStone[2]]}
          headPitch={0.18 * tw(t, 0.1, 0.7)}
        />
      ),
    },
    {
      cue: "5.craters",
      zone: "village",
      look: "overworld-night",
      ...cam.top({
        on: [1.35, 0.14, -11.65],
        height: 3.05,
        to: 2.15,
        spin: [-10, 8],
        fov: 40,
      }),
      note: "Clue callback #1 (`cam.top` overhead spin): Hero steps to the porch edge pointing down at the EXACT same twin white fist craters!",
      stage: (t) => {
        const reach = tw(t, 0.05, 0.65);
        return (
          <Hero
            position={[0.52 + reach * 0.18, 0.12, -12.35]}
            rotationY={0.62}
            pose={posed("point", t, { head: [0.42, 0.15, 0] })}
            face="wow"
          />
        );
      },
    },
    {
      cue: "5.list",
      zone: "room",
      look: "overworld-night",
      ...cam.orbit({
        on: [-0.55, 1.18, -2.15],
        dist: 3.55,
        distTo: 2.75,
        yaw: -18,
        yawTo: 12,
        pitch: 10,
        pitchTo: 5,
        fov: 38,
      }),
      note: "Clue callback #2: sweeping across the torn blue baby coat with its dried green slime fleck beside our cottage door.",
      stage: (t) => (
        <Hero
          position={[0.52, 0, -1.45]}
          rotationY={-0.68}
          pose={posed("idle", t, { armL: [-0.85, 0.18, 0] })}
          face="wow"
          lookAt={[-0.28, 1.32, -2.36]}
        />
      ),
    },
    {
      cue: "5.never",
      zone: "village",
      look: "overworld-night",
      ...cam.push({
        on: [0.85, 0.92, -11.55],
        onTo: [0.95, 1.15, -11.35],
        dist: 5.2,
        to: 4.15,
        yaw: -26,
        pitch: 8,
        fov: 44,
        fovTo: 40,
      }),
      impacts: [sceneImpact("5.stare", "5.never", "never", 0.05, 0.32)],
      note: "Flashback outside the cottage porch: towering two-block OriginalBigDad hops directly between Baby Hero's basket and the RogueGolem!",
      stage: (t, { p }) => {
        const b = slimeBounce(t, 1.9, 0.24, 0.1);
        return (
          <>
            <ReedBasket position={[0.25, 0.12, -12.55]} rotationY={SOUTH} reach={0.9} />
            <OriginalBigDad
              position={[0.95, b.hop, -11.45]}
              rotationY={SOUTH}
              squash={b.squash + 0.12}
              mood="angry"
            />
            <RogueGolem
              position={[1.35, 0, -9.25 - p * 0.55]}
              rotationY={NORTH}
              walk={p * 1.2}
              armR={-1.25}
              armL={-1.25}
              bow={0.18}
            />
          </>
        );
      },
    },
    {
      cue: "5.twice",
      zone: "village",
      look: "overworld-night",
      ...cam.orbit({
        on: [1.15, 0.78, -11.35],
        dist: 5.1,
        distTo: 3.95,
        yaw: 34,
        yawTo: 8,
        pitch: 18,
        pitchTo: 10,
        fov: 43,
      }),
      impacts: [
        sceneImpact("5.stare", "5.twice", "Twice", 0.068, 0.36),
        sceneImpact("5.stare", "5.twice", "fist", 0.072, 0.38),
      ],
      note: "Double-split flashback payoff: Dad takes the Golem's iron fist TWICE—splitting from 1 big → 2 medium → 4 tiny dads to save Baby Hero!",
      stage: (t) => {
        const s1 = 0.22;
        const s2 = Math.max(0.68, w("5.twice", "fist"));
        const k1 = tw(t, s1, s1 + 0.32);
        const k2 = tw(t, s2, s2 + 0.38);
        const arm = t < s1 ? -1.45 : t < s2 ? -0.35 - tw(t, s1 + 0.15, s2) * 1.15 : -0.25;
        return (
          <>
            <ReedBasket position={[0.25, 0.12, -12.55]} rotationY={SOUTH} reach={0.95} />
            <RogueGolem position={[1.35, 0, -9.95]} rotationY={NORTH} armR={arm} armL={arm} bow={0.22} />
            {t < s1 ? (
              <OriginalBigDad position={[1.15, 0, -11.45]} rotationY={SOUTH} squash={0.28} mood="angry" />
            ) : t < s2 ? (
              <>
                <BigSlimeDad which={1} position={[1.15 - k1 * 0.55, Math.sin(k1 * Math.PI) * 0.42, -11.45]} rotationY={SOUTH} squash={pop(t, s1, 0.25) * 0.36} mood="angry" />
                <BigSlimeDad which={2} position={[1.15 + k1 * 0.55, Math.sin(k1 * Math.PI) * 0.42, -11.45]} rotationY={SOUTH} squash={pop(t, s1, 0.25) * 0.36} mood="angry" />
                <Bits position={[1.15, 0.65, -11.45]} t={t - s1} color="#7dff57" count={14} power={1.3} />
              </>
            ) : (
              <>
                <TinyDad which={1} position={[0.45, Math.sin(k2 * Math.PI) * 0.36, -11.65]} rotationY={SOUTH} mood="angry" />
                <TinyDad which={2} position={[0.92, Math.sin(k2 * Math.PI) * 0.42, -11.55]} rotationY={SOUTH} mood="angry" />
                <TinyDad which={3} position={[1.38, Math.sin(k2 * Math.PI) * 0.42, -11.55]} rotationY={SOUTH} mood="angry" />
                <TinyDad which={4} position={[1.85, Math.sin(k2 * Math.PI) * 0.36, -11.65]} rotationY={SOUTH} mood="angry" />
                <Bits position={[1.15, 0.52, -11.5]} t={t - s2} color="#7dff57" count={16} power={1.4} />
                <Puffs position={[1.45, 0.15, -11.55]} count={8} color="#eef2f7" />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "5.zero",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [0, BRIDGE_Y + 0.34, -1.45],
        dist: 3.25,
        to: 2.38,
        yaw: -22,
        pitch: 15,
        fov: 38,
        fovTo: 35,
      }),
      handheld: 0.014,
      note: "Present-night stakes push: all four tiny dads tremble on the bridge planks with zero splits left.",
      stage: (t) => {
        const tremble = Math.sin(t * 22) * 0.015;
        return (
          <>
            <TinyDad which={1} position={[-0.62 + tremble, BRIDGE_Y, -1.45]} rotationY={SOUTH} squash={0.18} mood="scared" />
            <TinyDad which={2} position={[-0.2 - tremble, BRIDGE_Y, -1.38]} rotationY={SOUTH} squash={0.18} mood="scared" />
            <TinyDad which={3} position={[0.22 + tremble, BRIDGE_Y, -1.38]} rotationY={SOUTH} squash={0.18} mood="angry" />
            <TinyDad which={4} position={[0.64 - tremble, BRIDGE_Y, -1.45]} rotationY={SOUTH} squash={0.18} mood="scared" />
            <SlimeballProp position={[0, BRIDGE_Y + 0.02, -1.05]} scale={0.75} squash={0.2} />
          </>
        );
      },
    },
    {
      cue: "5.front",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.72, -1.35],
        onTo: [0, BRIDGE_Y + 0.98, -1.35],
        dist: 4.85,
        distTo: 3.85,
        yaw: 28,
        yawTo: 6,
        pitch: 8,
        pitchTo: -4,
        fov: 43,
      }),
      shake: 0.014,
      note: "Heroic LOW WORM'S-EYE stack: even with zero splits left, all four tiny dads hop onto each other's heads in front of Hero's shoes!",
      stage: (t) => {
        const build = tw(t, 0.02, w("5.front", "stacked") + 0.2);
        return (
          <>
            <Hero
              position={[-0.58, BRIDGE_Y, -2.25]}
              rotationY={0.18}
              animation="reach"
              face="wow"
              lookAt={[0, BRIDGE_Y + 0.85, -1.35]}
            />
            <DadStack
              position={[0.08, BRIDGE_Y, -1.35]}
              rotationY={SOUTH}
              assemble={build}
              sway={Math.sin(t * 6.5) * 0.34}
              squash={0.1}
              mood="angry"
            />
            <RogueGolem position={[0.15, BRIDGE_Y, 0.95]} rotationY={NORTH} armR={-0.95} armL={-0.95} bow={0.16} />
          </>
        );
      },
    },
  ],
});
