import { Glow, cam, storyScene } from "../../engine";
import { BRIDGE, BRIDGE_Y, PORCH_Y, VILLAGE } from "./marks";
import {
  BigSlimeDad,
  Bits,
  BridgePinPost,
  DadStack,
  Hero,
  NORTH,
  OriginalBigDad,
  PottedCactus,
  Puffs,
  ReedBasket,
  RogueGolem,
  SOUTH,
  SlimeballProp,
  SoundRings,
  TinyDad,
  TornBabyCoat,
  WEST,
  Wisps,
  pop,
  posed,
  sceneImpact,
  slimeBounce,
  slimeHopTo,
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
      ...cam.orbit({
        on: [-0.55, BRIDGE_Y + 0.45, 0.95],
        onTo: [BRIDGE.craterStone[0], BRIDGE_Y + 0.22, BRIDGE.craterStone[2]],
        dist: 3.65,
        distTo: 2.45,
        yaw: 142,
        yawTo: 168,
        pitch: 22,
        pitchTo: 14,
        fov: 41,
      }),
      handheld: 0.014,
      note: "Active realization: Hero drops to a crouch touching the smoking twin white iron-fist craters as glowing memory ripples pulse outward!",
      stage: (t) => {
        const kneel = tw(t, 0.05, 0.55);
        return (
          <>
            <Hero
              position={[-0.25, BRIDGE_Y, 0.25]}
              rotationY={SOUTH - 0.55}
              pose={posed("crouch", t, {
                bodyY: -0.18 * kneel,
                armR: [-1.15 * kneel - 0.2, -0.25, 0],
                head: [0.35 * kneel, -0.22, 0],
              })}
              face="wow"
            />
            <SoundRings
              position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.08, BRIDGE.craterStone[2]]}
              t={t * 0.85}
              color="#bfe6ff"
              reach={1.25}
            />
            <Wisps position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.32, BRIDGE.craterStone[2]]} t={t} count={8} color="#d9f2ff" />
          </>
        );
      },
    },
    {
      cue: "5.craters",
      zone: "village",
      look: "overworld-night",
      ...cam.orbit({
        on: [1.35, 0.95, -11.15],
        onTo: [1.35, 0.45, -11.65],
        dist: 5.25,
        distTo: 3.85,
        yaw: -48,
        yawTo: -14,
        pitch: 19,
        pitchTo: 12,
        fov: 44,
      }),
      impacts: [sceneImpact("5.stare", "5.craters", "craters", 0.052, 0.32)],
      note: "Dynamic flashback match-cut: ghostly Golem fists slam into our porch stairs creating the twin white craters as the tiny cactus tips over!",
      stage: (t) => {
        const hitAt = w("5.craters", "craters");
        const slam = tw(t, 0, Math.max(0.28, hitAt + 0.12));
        const fadeOut = tw(t, w("5.craters", "cacti") - 0.15, w("5.craters", "here") + 0.15);
        return (
          <>
            <PottedCactus position={VILLAGE.cactus} bitten={fadeOut * 0.9} />
            {fadeOut < 0.85 ? (
              <RogueGolem
                position={[1.45, 0, -10.35 + fadeOut * 0.85]}
                rotationY={NORTH}
                scale={1 - fadeOut * 0.35}
                armR={-1.55 + slam * 1.35}
                armL={-1.55 + slam * 1.35}
                bow={0.32 * slam}
              />
            ) : null}
            <Bits position={[1.45, 0.12, -11.55]} t={Math.max(0, t - 0.15)} color="#eef2f7" count={16} power={1.35} />
            <Puffs position={[1.45, 0.22, -11.55]} count={8} color="#dce3ec" />
          </>
        );
      },
    },
    {
      cue: "5.list",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.65, -4.15],
        dist: 4.45,
        distTo: 3.35,
        yaw: 38,
        yawTo: -16,
        pitch: 16,
        pitchTo: 8,
        fov: 42,
      }),
      impacts: [sceneImpact("5.stare", "5.list", "barred", 0.045, 0.28)],
      note: "2-beat clue montage on the bridge: the torn blue baby coat flutters past as all four tiny dads slam the heavy bridge crossbar shut against red eyes in the dark!",
      stage: (t) => {
        const barAt = w("5.list", "barred");
        const coatFly = tw(t, 0, Math.max(0.35, barAt));
        const slamBar = tw(t, Math.max(0.2, barAt - 0.18), barAt + 0.22);
        const b = (ph: number) => slimeBounce(t, 2.6, 0.2, ph);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={(1 - slamBar) * 0.82} pinOut={(1 - slamBar) * 0.45} />
            <TornBabyCoat
              position={[-0.65 + coatFly * 1.25, BRIDGE_Y + 0.92 + Math.sin(coatFly * Math.PI) * 0.35, -3.55]}
              rotation={[-0.45 + coatFly * 0.5, 0.35, coatFly * 0.4]}
              scale={0.95}
            />
            <TinyDad which={1} position={[-1.05, BRIDGE_Y, -4.55]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} mood="angry" />
            <TinyDad which={2} position={[-0.35, BRIDGE_Y, -4.65]} rotationY={SOUTH} hop={b(0.25).hop} squash={b(0.25).squash} mood="scared" />
            <TinyDad which={3} position={[0.35, BRIDGE_Y, -4.65]} rotationY={SOUTH} hop={b(0.5).hop} squash={b(0.5).squash} mood="scared" />
            <TinyDad which={4} position={[1.05, BRIDGE_Y, -4.55]} rotationY={SOUTH} hop={b(0.75).hop} squash={b(0.75).squash} mood="angry" />
            <Glow position={[0, BRIDGE_Y + 1.95, 1.85]} size={1.4} color="#ff2e2e" opacity={0.32} />
          </>
        );
      },
    },
    {
      cue: "5.never",
      zone: "village",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.85, 0.88, -11.55],
        dist: 5.15,
        distTo: 3.95,
        yaw: -56,
        yawTo: -24,
        pitch: 16,
        pitchTo: 7,
        fov: 44,
      }),
      shake: 0.018,
      impacts: [sceneImpact("5.stare", "5.never", "never", 0.062, 0.36)],
      note: "Heroic parabolic intercept: OriginalBigDad LEAPS across the porch to body-block the charging Iron Golem right in front of Baby Hero's basket!",
      stage: (t, { p }) => {
        const blockAt = Math.max(0.32, w("5.never", "fell"));
        const leap = slimeHopTo([-0.65, PORCH_Y, -12.35], [0.95, 0, -11.45], tw(t, 0, blockAt), 1, 0.72);
        const hit = pop(t, blockAt, 0.3);
        return (
          <>
            <ReedBasket position={[0.15, PORCH_Y, -12.55]} rotationY={SOUTH} reach={0.95} />
            <OriginalBigDad
              position={[leap.position[0], leap.position[1] + leap.hop, leap.position[2]]}
              rotationY={SOUTH - 0.2}
              squash={leap.squash + hit * 0.38}
              mood="angry"
            />
            <RogueGolem
              position={[1.42, 0, -9.35 - p * 0.65]}
              rotationY={NORTH - 0.2}
              walk={p * 1.4}
              armR={-1.45 + hit * 1.15}
              armL={-1.45 + hit * 1.15}
              bow={0.22}
            />
            {t >= blockAt ? (
              <>
                <Glow position={[1.15, 0.95, -10.85]} size={1.8} color="#8eff62" opacity={0.32 * (1 - tw(t, blockAt, blockAt + 0.5))} />
                <SoundRings position={[1.15, 0.85, -10.85]} t={t - blockAt} color="#9dff70" reach={1.6} />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "5.twice",
      zone: "village",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.95, 0.78, -11.45],
        dist: 5.15,
        distTo: 3.95,
        yaw: -68,
        yawTo: -36,
        pitch: 20,
        pitchTo: 11,
        fov: 44,
      }),
      shake: 0.02,
      impacts: [
        sceneImpact("5.stare", "5.twice", "Twice", 0.07, 0.36),
        sceneImpact("5.stare", "5.twice", "fist", 0.075, 0.4),
      ],
      note: "Unmistakable double split: 1 big dad bursts into 2 medium dads, then Golem's second blow blasts them into 4 tiny dads shielding Baby Hero!",
      stage: (t) => {
        const s1 = 0.16;
        const s2 = Math.max(0.58, w("5.twice", "fist"));
        const k1 = tw(t, s1, s1 + 0.34);
        const k2 = tw(t, s2, s2 + 0.42);
        const arm = t < s1 ? -1.55 : t < s2 ? -0.25 - tw(t, s1 + 0.12, s2) * 1.35 : -0.15;
        return (
          <>
            <ReedBasket position={[0.15, PORCH_Y, -12.45]} rotationY={SOUTH} reach={1.0} />
            <RogueGolem position={[1.48, 0, -9.85]} rotationY={NORTH - 0.25} armR={arm} armL={arm} bow={0.26} />
            {t < s1 ? (
              <OriginalBigDad position={[0.95, 0, -11.45]} rotationY={SOUTH} squash={0.32} mood="angry" />
            ) : t < s2 ? (
              <>
                <BigSlimeDad which={1} position={[0.95 - k1 * 0.58, Math.sin(k1 * Math.PI) * 0.55, -11.45]} rotationY={SOUTH} squash={pop(t, s1, 0.26) * 0.38} mood="angry" />
                <BigSlimeDad which={2} position={[0.95 + k1 * 0.58, Math.sin(k1 * Math.PI) * 0.55, -11.45]} rotationY={SOUTH} squash={pop(t, s1, 0.26) * 0.38} mood="angry" />
                <Bits position={[0.95, 0.72, -11.45]} t={t - s1} color="#7dff57" count={16} power={1.45} />
              </>
            ) : (
              <>
                <TinyDad which={1} position={[0.25, Math.sin(k2 * Math.PI) * 0.48, -11.75]} rotationY={SOUTH} mood="angry" />
                <TinyDad which={2} position={[0.72, Math.sin(k2 * Math.PI) * 0.56, -11.6]} rotationY={SOUTH} mood="angry" />
                <TinyDad which={3} position={[1.18, Math.sin(k2 * Math.PI) * 0.56, -11.6]} rotationY={SOUTH} mood="angry" />
                <TinyDad which={4} position={[1.65, Math.sin(k2 * Math.PI) * 0.48, -11.75]} rotationY={SOUTH} mood="angry" />
                <Bits position={[0.95, 0.58, -11.5]} t={t - s2} color="#7dff57" count={18} power={1.55} />
                <Puffs position={[1.42, 0.18, -11.55]} count={10} color="#eef2f7" />
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
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.55, -1.15],
        dist: 4.15,
        distTo: 3.15,
        yaw: -148,
        yawTo: -168,
        pitch: 16,
        pitchTo: 8,
        fov: 42,
      }),
      shake: 0.018,
      impacts: [sceneImpact("5.stare", "5.zero", "zero", 0.052, 0.32)],
      note: "Maximum-stakes confrontation: Golem stomps right up raising both fists as all four tiny dads hop into a tight huddle with glowing slimeball wisps!",
      stage: (t, { p }) => {
        const huddle = tw(t, 0.04, 0.65);
        const h1 = slimeHopTo([-0.95, BRIDGE_Y, -1.55], [-0.48, BRIDGE_Y, -1.35], huddle, 2, 0.22);
        const h2 = slimeHopTo([-0.35, BRIDGE_Y, -1.75], [-0.16, BRIDGE_Y, -1.28], huddle, 2, 0.22);
        const h3 = slimeHopTo([0.35, BRIDGE_Y, -1.75], [0.16, BRIDGE_Y, -1.28], huddle, 2, 0.22);
        const h4 = slimeHopTo([0.95, BRIDGE_Y, -1.55], [0.48, BRIDGE_Y, -1.35], huddle, 2, 0.22);
        return (
          <>
            <RogueGolem
              position={[0.15, BRIDGE_Y, 1.45 - p * 0.85]}
              rotationY={NORTH}
              walk={p * 1.65}
              armR={-0.65 - p * 0.85}
              armL={-0.65 - p * 0.85}
              bow={0.18}
            />
            <TinyDad which={1} position={h1.position} rotationY={SOUTH} hop={h1.hop} squash={h1.squash} mood="scared" />
            <TinyDad which={2} position={h2.position} rotationY={SOUTH} hop={h2.hop} squash={h2.squash} mood="scared" />
            <TinyDad which={3} position={h3.position} rotationY={SOUTH} hop={h3.hop} squash={h3.squash} mood="angry" />
            <TinyDad which={4} position={h4.position} rotationY={SOUTH} hop={h4.hop} squash={h4.squash} mood="scared" />
            <SlimeballProp position={[0, BRIDGE_Y + 0.62 + Math.sin(t * 7) * 0.08, -1.3]} scale={0.78} squash={Math.sin(t * 8) * 0.2} />
            <Wisps position={[0, BRIDGE_Y + 0.55, -1.3]} t={t} count={10} color="#9eff72" />
          </>
        );
      },
    },
    {
      cue: "5.front",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.85, -0.85],
        onTo: [0.05, BRIDGE_Y + 1.08, -0.65],
        dist: 4.5,
        distTo: 3.55,
        yaw: -144,
        yawTo: -168,
        pitch: 11,
        pitchTo: 1,
        fov: 43,
      }),
      shake: 0.018,
      impacts: [sceneImpact("5.stare", "5.front", "stacked", 0.048, 0.3)],
      note: "Heroic OTS worm's-eye stack: #2, #3, #4 rapid-fire leap-stack onto #1's head with dust puffs right between Hero and the roaring Golem!",
      stage: (t) => {
        const build = tw(t, 0.02, w("5.front", "stacked") + 0.15);
        return (
          <>
            <pointLight position={[0.18, BRIDGE_Y + 2.1, 0.85]} color="#ff2e2e" intensity={2.6} distance={5} decay={2} />
            <Hero
              position={[-0.78, BRIDGE_Y, -2.05]}
              rotationY={0.28}
              animation="reach"
              face="wow"
              lookAt={[0.08, BRIDGE_Y + 0.85, -1.15]}
            />
            <DadStack
              position={[0.08, BRIDGE_Y, -1.15]}
              rotationY={SOUTH}
              assemble={build}
              sway={Math.sin(t * 7.2) * 0.36}
              squash={0.12}
              mood="angry"
            />
            <RogueGolem position={[0.18, BRIDGE_Y, 1.08]} rotationY={NORTH} armR={-1.25} armL={-1.25} bow={0.2} />
            {build > 0.25 && build < 0.95 ? <Puffs position={[0.08, BRIDGE_Y + 0.55, -1.15]} count={6} color="#c5ff9e" /> : null}
          </>
        );
      },
    },
  ],
});
