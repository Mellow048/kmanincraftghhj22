import { Glow, cam, storyScene } from "../../engine";
import { BRIDGE, BRIDGE_Y, PATH_Y, PORCH_Y, VILLAGE } from "./marks";
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
  SoundRings,
  TinyDad,
  TornBabyCoat,
  Wisps,
  jolt,
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
      note: "Active realization: Hero drops to a crouch beside the smoking twin white iron-fist craters as glowing memory ripples pulse outward!",
      stage: (t) => {
        const kneel = tw(t, 0.05, 0.55);
        return (
          <>
            <Hero
              position={[-0.22, BRIDGE_Y, 0.18]}
              rotationY={SOUTH - 0.55}
              pose={posed("crouch", t, {
                bodyY: -0.16 * kneel,
                armR: [-1.15 * kneel - 0.2, -0.25, 0],
                head: [0.35 * kneel, -0.22, 0],
              })}
              plantFeet
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
        on: [1.35, 0.95, -10.95],
        onTo: [1.35, 0.48, -11.55],
        dist: 5.25,
        distTo: 3.85,
        yaw: -48,
        yawTo: -14,
        pitch: 19,
        pitchTo: 12,
        fov: 44,
      }),
      impacts: [sceneImpact("5.stare", "5.craters", "craters", 0.052, 0.32)],
      note: "Dynamic flashback match-cut on flat lane (`PATH_Y`, clear of `z = -12.0` porch!): ghostly Golem slams the ground in front of the stairs and vanishes into smoke!",
      stage: (t) => {
        const hitAt = w("5.craters", "craters");
        const slam = tw(t, 0, Math.max(0.28, hitAt + 0.12));
        const fadeOut = tw(t, w("5.craters", "cacti") - 0.15, w("5.craters", "here") + 0.15);
        return (
          <>
            <PottedCactus position={VILLAGE.cactus} bitten={fadeOut * 0.9} />
            {fadeOut < 0.85 ? (
              <RogueGolem
                position={[1.45, PATH_Y, -10.55]}
                rotationY={NORTH}
                scale={1 - fadeOut * 0.35}
                armR={-1.65 + slam * 1.45}
                armL={-1.65 + slam * 1.45}
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
      note: "2-beat clue montage on the bridge: torn blue baby coat flutters past high above the bar as all four tiny dads slam the bridge crossbar shut!",
      stage: (t) => {
        const barAt = w("5.list", "barred");
        const coatFly = tw(t, 0, Math.max(0.35, barAt));
        const slamBar = tw(t, Math.max(0.2, barAt - 0.18), barAt + 0.22);
        const b = (ph: number) => slimeBounce(t, 2.8, 0.22, ph);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={(1 - slamBar) * 0.85} pinOut={(1 - slamBar) * 0.45} />
            <TornBabyCoat
              position={[-0.75 + coatFly * 1.45, BRIDGE_Y + 1.28 + Math.sin(coatFly * Math.PI) * 0.32, -3.45]}
              rotation={[-0.45 + coatFly * 0.5, 0.35, coatFly * 0.4]}
              scale={0.95}
            />
            <TinyDad which={1} position={[-1.08, BRIDGE_Y, -4.65]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} mood="angry" />
            <TinyDad which={2} position={[-0.36, BRIDGE_Y, -4.72]} rotationY={SOUTH} hop={b(0.25).hop} squash={b(0.25).squash} mood="scared" />
            <TinyDad which={3} position={[0.36, BRIDGE_Y, -4.72]} rotationY={SOUTH} hop={b(0.5).hop} squash={b(0.5).squash} mood="scared" />
            <TinyDad which={4} position={[1.08, BRIDGE_Y, -4.65]} rotationY={SOUTH} hop={b(0.75).hop} squash={b(0.75).squash} mood="angry" />
            <Glow position={[0, BRIDGE_Y + 1.95, 1.85]} size={1.2} color="#ff2e2e" opacity={0.26} />
          </>
        );
      },
    },
    {
      cue: "5.never",
      zone: "village",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.35, 0.92, -10.35],
        onTo: [0.4, 0.88, -10.05],
        dist: 5.45,
        distTo: 4.25,
        yaw: -64,
        yawTo: -34,
        pitch: 17,
        pitchTo: 9,
        fov: 45,
      }),
      shake: 0.02,
      impacts: [sceneImpact("5.stare", "5.never", "never", 0.068, 0.38)],
      note: "ZERO-PHASING HEROIC INTERCEPT: ReedBasket safe on porch (`z=-13.15`); OriginalBigDad leaps off porch to `z=-10.82` colliding fist-to-chest with charging Golem (`z=-9.05`), knocking Golem back!",
      stage: (t) => {
        const blockAt = Math.max(0.34, w("5.never", "fell"));
        const charge = tw(t, 0, blockAt);
        const recoil = tw(t, blockAt, blockAt + 0.45);
        const leap = slimeHopTo([-0.35, PORCH_Y, -12.35], [0.35, PATH_Y, -10.82], charge, 1, 0.82);
        const hit = pop(t, blockAt, 0.32);
        const postBounce = t > blockAt + 0.25 ? slimeBounce(t - blockAt, 2.4, 0.18, 0) : { hop: 0, squash: 0 };
        const gz = -7.65 - charge * 1.42 + recoil * 0.48;
        return (
          <>
            <ReedBasket position={[-0.15, PORCH_Y, -13.55]} rotationY={SOUTH} reach={0.95} />
            <OriginalBigDad
              position={[leap.position[0], leap.position[1] + leap.hop + postBounce.hop, leap.position[2]]}
              rotationY={SOUTH}
              squash={leap.squash + hit * 0.36 + postBounce.squash}
              mood="angry"
            />
            <RogueGolem
              position={[0.45 + jolt(t, blockAt, 0.16), PATH_Y, gz]}
              rotationY={NORTH}
              walk={charge * 2.4 + recoil * 0.8}
              armR={-2.15 * charge + hit * 1.35 - recoil * 0.45}
              armL={-2.15 * charge + hit * 1.35 - recoil * 0.45}
              bow={0.28 * charge - 0.38 * recoil}
            />
            {t >= blockAt ? (
              <>
                <Glow position={[0.4, 0.95, -9.95]} size={1.6} color="#8eff62" opacity={0.28 * (1 - tw(t, blockAt, blockAt + 0.55))} />
                <SoundRings position={[0.4, 0.88, -9.95]} t={t - blockAt} color="#9dff70" reach={1.85} />
                <Bits position={[0.4, 0.88, -9.95]} t={t - blockAt} color="#9dff70" count={16} power={1.45} />
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
        on: [0.35, 0.78, -10.55],
        dist: 5.35,
        distTo: 4.15,
        yaw: -66,
        yawTo: -28,
        pitch: 20,
        pitchTo: 11,
        fov: 45,
      }),
      shake: 0.022,
      impacts: [
        sceneImpact("5.stare", "5.twice", "Twice", 0.072, 0.36),
        sceneImpact("5.stare", "5.twice", "fist", 0.078, 0.42),
      ],
      note: "CONTINUOUS 2-HIT COMBO FIGHT (`PATH_Y`, clear of porch): Golem right-hook splits 1->2 medium dads who bounce-charge back, then Golem double-hammer splits 2->4 hopping tiny dads!",
      stage: (t) => {
        const s1 = 0.2;
        const s2 = Math.max(0.68, w("5.twice", "fist"));
        const wind1 = tw(t, 0, s1);
        const k1 = tw(t, s1, s1 + 0.38);
        const wind2 = tw(t, s1 + 0.16, s2);
        const k2 = tw(t, s2, s2 + 0.42);
        const gz = -8.75 - wind1 * 0.35 - wind2 * 0.32 + pop(t, s2, 0.3) * 0.25;
        const armR = t < s1 ? -2.35 * wind1 : t < s2 ? -0.15 - wind2 * 2.15 : 0.12 - tw(t, s2 + 0.2, s2 + 0.7) * 0.85;
        const armL = t < s1 ? -0.65 : t < s2 ? -0.65 - wind2 * 1.7 : 0.12 - tw(t, s2 + 0.2, s2 + 0.7) * 0.85;
        const m1 = slimeHopTo([-0.12, PATH_Y, -10.72], [-0.42, PATH_Y, -10.58], k1, 2, 0.45);
        const m2 = slimeHopTo([0.82, PATH_Y, -10.72], [1.12, PATH_Y, -10.58], k1, 2, 0.45);
        const b = (ph: number) => slimeBounce(t, 3.2, 0.22, ph);
        return (
          <>
            <ReedBasket position={[-0.15, PORCH_Y, -13.55]} rotationY={SOUTH} reach={1.0} />
            <RogueGolem
              position={[0.42, PATH_Y, gz]}
              rotationY={NORTH}
              walk={(wind1 + wind2) * 1.6}
              armR={armR}
              armL={armL}
              bow={t < s1 ? 0.24 * wind1 : t < s2 ? -0.12 * wind2 : 0.32 * (1 - k2)}
            />
            {t < s1 ? (
              <OriginalBigDad
                position={[0.35, PATH_Y + Math.sin(wind1 * Math.PI) * 0.18, -10.72]}
                rotationY={SOUTH}
                squash={0.24 * wind1}
                mood="angry"
              />
            ) : t < s2 ? (
              <>
                <BigSlimeDad
                  which={1}
                  position={[m1.position[0], PATH_Y + m1.hop, m1.position[2]]}
                  rotationY={SOUTH}
                  squash={m1.squash + pop(t, s1, 0.24) * 0.32}
                  mood="angry"
                />
                <BigSlimeDad
                  which={2}
                  position={[m2.position[0], PATH_Y + m2.hop, m2.position[2]]}
                  rotationY={SOUTH}
                  squash={m2.squash + pop(t, s1, 0.24) * 0.32}
                  mood="angry"
                />
                <SoundRings position={[0.35, 0.65, -10.45]} t={t - s1} color="#8eff62" reach={1.7} />
                <Bits position={[0.35, 0.72, -10.65]} t={t - s1} color="#7dff57" count={18} power={1.5} />
              </>
            ) : (
              <>
                <TinyDad
                  which={1}
                  position={[-0.64 - k2 * 0.14, PATH_Y + Math.sin(k2 * Math.PI) * 0.45 + (k2 >= 1 ? b(0).hop : 0), -10.65 - k2 * 0.52]}
                  rotationY={SOUTH}
                  squash={k2 >= 1 ? b(0).squash : -0.18}
                  mood="angry"
                />
                <TinyDad
                  which={2}
                  position={[-0.18 + k2 * 0.12, PATH_Y + Math.sin(k2 * Math.PI) * 0.54 + (k2 >= 1 ? b(0.25).hop : 0), -10.65 - k2 * 0.42]}
                  rotationY={SOUTH}
                  squash={k2 >= 1 ? b(0.25).squash : -0.18}
                  mood="angry"
                />
                <TinyDad
                  which={3}
                  position={[0.88 - k2 * 0.12, PATH_Y + Math.sin(k2 * Math.PI) * 0.54 + (k2 >= 1 ? b(0.5).hop : 0), -10.65 - k2 * 0.42]}
                  rotationY={SOUTH}
                  squash={k2 >= 1 ? b(0.5).squash : -0.18}
                  mood="angry"
                />
                <TinyDad
                  which={4}
                  position={[1.34 + k2 * 0.14, PATH_Y + Math.sin(k2 * Math.PI) * 0.45 + (k2 >= 1 ? b(0.75).hop : 0), -10.65 - k2 * 0.52]}
                  rotationY={SOUTH}
                  squash={k2 >= 1 ? b(0.75).squash : -0.18}
                  mood="angry"
                />
                <SoundRings position={[0.35, 0.52, -10.45]} t={t - s2} color="#9dff70" reach={1.9} />
                <Bits position={[0.35, 0.58, -10.65]} t={t - s2} color="#7dff57" count={20} power={1.6} />
                <Puffs position={[0.35, 0.22, -10.55]} count={10} color="#eef2f7" />
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
        on: [0, BRIDGE_Y + 0.62, -0.95],
        dist: 4.35,
        distTo: 3.35,
        yaw: -146,
        yawTo: -168,
        pitch: 16,
        pitchTo: 8,
        fov: 43,
      }),
      shake: 0.02,
      impacts: [sceneImpact("5.stare", "5.zero", "zero", 0.056, 0.34)],
      note: "High-stakes bridge standoff: Golem stomps closer slamming one warning fist onto the planks, bouncing all 4 tiny dads as they hop into a tight shield line!",
      stage: (t, { p }) => {
        const stompAt = w("5.zero", "zero");
        const stomp = tw(t, Math.max(0, stompAt - 0.22), stompAt + 0.12);
        const huddle = tw(t, 0.02, 0.82);
        // Clean >=0.44m spacing (`> 0.38m` TinyDad width) so the 4 dads never overlap each other!
        const h1 = slimeHopTo([-1.18, BRIDGE_Y, -1.65], [-0.66, BRIDGE_Y, -1.35], huddle, 2, 0.28);
        const h2 = slimeHopTo([-0.42, BRIDGE_Y, -1.85], [-0.22, BRIDGE_Y, -1.28], huddle, 2, 0.3);
        const h3 = slimeHopTo([0.42, BRIDGE_Y, -1.85], [0.22, BRIDGE_Y, -1.28], huddle, 2, 0.3);
        const h4 = slimeHopTo([1.18, BRIDGE_Y, -1.65], [0.66, BRIDGE_Y, -1.35], huddle, 2, 0.28);
        const gz = 1.95 - p * 1.05;
        return (
          <>
            <RogueGolem
              position={[0.12, BRIDGE_Y, gz]}
              rotationY={NORTH}
              walk={p * 2.6}
              armR={-1.85 + stomp * 1.55}
              armL={-0.65 - p * 0.85}
              bow={0.24 * stomp}
            />
            {t >= stompAt ? (
              <>
                <SoundRings position={[0.12, BRIDGE_Y + 0.08, gz - 0.55]} t={t - stompAt} color="#ff6b6b" reach={1.65} />
                <Puffs position={[0.12, BRIDGE_Y + 0.18, gz - 0.55]} count={7} color="#dce3ec" />
              </>
            ) : null}
            <TinyDad which={1} position={h1.position} rotationY={SOUTH} hop={h1.hop} squash={h1.squash} mood="scared" />
            <TinyDad which={2} position={h2.position} rotationY={SOUTH} hop={h2.hop} squash={h2.squash} mood="scared" />
            <TinyDad which={3} position={h3.position} rotationY={SOUTH} hop={h3.hop} squash={h3.squash} mood="angry" />
            <TinyDad which={4} position={h4.position} rotationY={SOUTH} hop={h4.hop} squash={h4.squash} mood="angry" />
            <Wisps position={[0, BRIDGE_Y + 0.38, -1.32]} t={t} count={8} color="#9eff72" />
          </>
        );
      },
    },
    {
      cue: "5.front",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.88, -0.85],
        onTo: [0.05, BRIDGE_Y + 1.08, -0.55],
        dist: 4.55,
        distTo: 3.55,
        yaw: -144,
        yawTo: -168,
        pitch: 11,
        pitchTo: 2,
        fov: 43,
      }),
      shake: 0.02,
      impacts: [sceneImpact("5.stare", "5.front", "stacked", 0.052, 0.32)],
      note: "Active OTS battle stack: #2, #3, #4 leap-assemble into a hopping DadStack dodging side-to-side while Golem stalks closer winding up a huge overhead blow!",
      stage: (t, { p }) => {
        const build = tw(t, 0.02, w("5.front", "stacked") + 0.12);
        const stackBounce = build >= 0.95 ? slimeBounce(t, 2.8, 0.22, 0.15) : { hop: 0, squash: 0 };
        const windUp = tw(t, 0.25, 1.85);
        return (
          <>
            <pointLight position={[0.18, BRIDGE_Y + 2.1, 1.65 - p * 0.78]} color="#ff2e2e" intensity={2.4} distance={5} decay={2} />
            <Hero
              position={[-0.76, BRIDGE_Y, -2.25 + p * 0.45]}
              rotationY={0.32}
              animation="reach"
              plantFeet
              face="wow"
              lookAt={[0.08, BRIDGE_Y + 0.85, -1.12]}
            />
            <DadStack
              position={[0.08 + Math.sin(t * 5.5) * 0.18 * build, BRIDGE_Y + stackBounce.hop, -1.12]}
              rotationY={SOUTH}
              assemble={build}
              sway={Math.sin(t * 7.5) * 0.36}
              squash={0.1 + stackBounce.squash}
              mood="angry"
            />
            <RogueGolem
              position={[0.18, BRIDGE_Y, 1.68 - p * 0.82]}
              rotationY={NORTH}
              walk={p * 2.35}
              armR={-0.65 - windUp * 1.65}
              armL={-0.65 - windUp * 1.65}
              bow={0.18 - windUp * 0.32}
            />
            {build > 0.2 && build < 0.95 ? <Puffs position={[0.08, BRIDGE_Y + 0.55, -1.12]} count={6} color="#c5ff9e" /> : null}
          </>
        );
      },
    },
  ],
});
