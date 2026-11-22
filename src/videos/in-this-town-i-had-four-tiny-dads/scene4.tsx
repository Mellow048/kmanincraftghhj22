import { Block, Glow, Vox, cam, storyScene } from "../../engine";
import { BRIDGE, BRIDGE_Y, bridgePushRoute } from "./marks";
import {
  Bits,
  BridgePinPost,
  EAST,
  Hero,
  NORTH,
  Puffs,
  RogueGolem,
  SOUTH,
  SoundRings,
  TinyDad,
  TornBabyCoat,
  Wheelbarrow,
  jolt,
  posed,
  sceneImpact,
  shovePose,
  slimeBounce,
  slimeHopTo,
  timing,
  tw,
  w,
} from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Across The Barred Bridge",
  shots: [
    {
      cue: "4.sunset",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.65, -4.4],
        onTo: [0, BRIDGE_Y + 0.72, -3.2],
        dist: 4.55,
        distTo: 3.55,
        yaw: -42,
        yawTo: 18,
        pitch: 16,
        pitchTo: 8,
        fov: 43,
      }),
      impacts: [sceneImpact("4.sunset", "4.sunset", "unbarred", 0.045, 0.3)],
      note: "3-beat action: Hero jogs up, rips the heavy crossbar off the post tossing it spinning aside, and strides onto the forbidden bridge!",
      stage: (t) => {
        const liftAt = w("4.sunset", "unbarred");
        const runIn = tw(t, 0, Math.max(0.22, liftAt - 0.12));
        const toss = tw(t, Math.max(0.18, liftAt - 0.1), liftAt + 0.38);
        const cross = tw(t, liftAt + 0.25, 1.45);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={toss * 0.95} pinOut={toss * 0.65} />
            {toss > 0.15 ? (
              <Vox
                kind="darkPlanks"
                position={[-0.95 - toss * 1.15, BRIDGE_Y + 0.85 + Math.sin(toss * Math.PI) * 0.55 - toss * 0.55, -4.15]}
                rotation={[toss * 1.8, toss * 1.2, toss * 2.4]}
                size={[1.45, 0.14, 0.16]}
              />
            ) : null}
            <Hero
              position={[0.45 * (1 - cross), BRIDGE_Y, -5.25 + runIn * 0.68 + cross * 2.05]}
              rotationY={cross > 0.05 ? SOUTH : -0.35}
              pose={cross > 0.08 ? posed("run", t * 2.4, {}) : shovePose(t, liftAt)}
              face="brave"
            />
            {toss > 0.1 && toss < 0.75 ? <Puffs position={[0, BRIDGE_Y + 0.72, -4.2]} count={7} color="#ffe7ba" /> : null}
          </>
        );
      },
    },
    {
      cue: "4.ruins",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0, 0.78, 4.4],
        onTo: [0.15, 0.68, 6.85],
        dist: 4.85,
        distTo: 3.75,
        yaw: 52,
        yawTo: -22,
        pitch: 15,
        pitchTo: 7,
        fov: 44,
      }),
      handheld: 0.016,
      note: "Sweeping parallax orbit past mossy ruin pillars as Hero creeps off the bridge into the ancient stone ruins, flushing glowing fireflies!",
      stage: (t, { p }) => {
        const dist = p * 3.25;
        const z = 3.85 + dist;
        const y = z < 4.2 ? BRIDGE_Y : Math.max(0.12, BRIDGE_Y - ((z - 4.2) / 2.8) * 1.03);
        return (
          <>
            {/* Foreground/midground ruin stones for rich lateral parallax */}
            <Vox kind="cobble" tint="#5b6656" position={[-1.65, 0.62, 5.85]} size={[0.68, 1.24, 0.68]} />
            <Vox kind="leaves" tint="#3b7d31" position={[-1.45, 0.95, 5.55]} size={[0.32, 0.55, 0.22]} />
            <Vox kind="cobble" tint="#556050" position={[1.72, 0.48, 6.65]} size={[0.74, 0.96, 0.74]} />
            {/* Glowing swamp fireflies flushing upward as Hero passes */}
            {[0, 1, 2, 3].map((i) => (
              <Block
                key={i}
                position={[
                  (i % 2 ? 0.85 : -0.85) + Math.sin(t * 4 + i) * 0.25,
                  0.45 + p * (0.9 + i * 0.25),
                  5.6 + i * 0.45,
                ]}
                size={[0.07, 0.07, 0.07]}
                color="#d8ff72"
              />
            ))}
            <Hero
              position={[Math.sin(p * Math.PI) * 0.22, y, z]}
              rotationY={SOUTH + Math.sin(t * 3.8) * 0.18}
              animation="creep"
              animDistance={dist * 1.25}
              plantFeet
              face="uneasy"
              headYaw={Math.sin(t * 4.2) * 0.36}
            />
          </>
        );
      },
    },
    {
      cue: "4.vine",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0.25, 1.15, 8.75],
        onTo: [0.2, 1.85, 8.55],
        dist: 5.15,
        distTo: 4.05,
        yaw: 146,
        yawTo: 174,
        pitch: 16,
        pitchTo: 3,
        fov: 44,
      }),
      shake: 0.018,
      impacts: [sceneImpact("4.sunset", "4.vine", "stood", 0.065, 0.38)],
      note: "Explosive awakening: a mossy stone ruin wall shatters outward as red eyes blaze to life and the Iron Golem rips free!",
      stage: (t) => {
        const burstAt = w("4.vine", "stood") - 0.12;
        const rise = tw(t, 0.06, w("4.vine", "up") + 0.2);
        const burst = tw(t, Math.max(0.08, burstAt), burstAt + 0.55);
        return (
          <>
            {/* Shattering mossy stone ruin blocks flying outward as Golem stands! */}
            {[
              [-0.65, 0.85, -1],
              [0.75, 0.95, 1],
              [-0.45, 1.55, -1],
              [0.55, 1.62, 1],
            ].map(([ox, oy, dir], i) => (
              <Vox
                key={i}
                kind={i % 2 ? "cobble" : "leaves"}
                tint={i % 2 ? "#5e6859" : "#3b7d31"}
                position={[
                  0.25 + ox * (1 + burst * 1.85),
                  oy + Math.sin(burst * Math.PI) * 0.65 - burst * 0.55,
                  8.65 - burst * 0.85,
                ]}
                rotation={[burst * 2.2 * dir, burst * 1.5, burst * 1.9 * dir]}
                size={[0.42, 0.42, 0.42]}
              />
            ))}
            <pointLight position={[0.25, 2.15, 8.2]} color="#ff2a2a" intensity={rise * 2.6} distance={5} decay={2} />
            <Glow position={[0.25, 2.05, 8.45]} size={0.45 + rise * 0.35} color="#ff3b2f" opacity={0.18 * rise} />
            <Hero
              position={[0.92 + burst * 0.35, 0.12, 6.95 - burst * 0.48]}
              rotationY={-0.35}
              animation="stagger"
              animDistance={rise * 0.95}
              face="fear"
              lookAt={[0.25, 1.2 + rise * 0.95, 8.8]}
            />
            <RogueGolem
              position={[0.25, -0.45 + rise * 0.57, 8.85]}
              rotationY={NORTH}
              bow={0.62 * (1 - rise)}
              armR={-0.25 - rise * 1.15}
              armL={-0.25 - rise * 1.15}
            />
            {burst > 0.05 ? (
              <>
                <Bits position={[0.25, 1.25, 8.55]} t={t - Math.max(0.05, burstAt)} color="#9ab089" count={18} power={1.45} />
                <Puffs position={[0.25, 0.45, 8.65]} count={10} color="#dce3d5" />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "4.golem",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.15, 1.55, 8.05],
        onTo: [0.15, 1.75, 6.75],
        dist: 4.65,
        distTo: 3.75,
        yaw: -152,
        yawTo: -172,
        pitch: 5,
        pitchTo: 1,
        fov: 45,
      }),
      fovTo: 41,
      shake: 0.02,
      impacts: [
        sceneImpact("4.sunset", "4.golem", "golem", 0.065, 0.38),
        sceneImpact("4.sunset", "4.golem", "taller", 0.055, 0.32),
      ],
      note: "Thunderous LOW-ANGLE advance: Golem takes two massive ground-shaking strides throwing its arms wide with a shockwave roar while Hero scrambles back!",
      stage: (t, { p }) => {
        const adv = p * 2.15;
        const roarAt = w("4.golem", "taller");
        const roar = tw(t, Math.max(0, roarAt - 0.15), roarAt + 0.35);
        return (
          <>
            <pointLight position={[0.15, 2.3, 8.1 - adv]} color="#ff2e2e" intensity={2.8} distance={6} decay={2} />
            <Hero
              position={[0.98 + p * 0.25, 0.12 + p * 0.28, 6.65 - p * 1.35]}
              rotationY={-0.38}
              animation="stagger"
              animDistance={p * 1.8}
              face="fear"
              lookAt={[0.15, 2.1, 8.5 - adv]}
            />
            <RogueGolem
              position={[0.15, 0.12, 8.65 - adv]}
              rotationY={NORTH}
              walk={adv * 1.85}
              armR={-0.45 - roar * 1.25}
              armL={-0.45 - roar * 1.25}
              bow={0.18 - roar * 0.26}
            />
            <Puffs position={[0.15, 0.22, 8.15 - adv]} count={9} color="#b8c4bc" />
            {t >= roarAt ? (
              <SoundRings position={[0.15, 2.25, 8.2 - adv]} t={t - roarAt} color="#ff5252" reach={2.2} />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "4.past",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-2.95, BRIDGE_Y + 0.78, 2.25],
        on: [0.35, BRIDGE_Y + 1.28, 3.85],
        onTo: [0.25, BRIDGE_Y + 1.22, 0.55],
        fov: 45,
        fovTo: 40,
      }),
      shake: 0.016,
      impacts: [sceneImpact("4.sunset", "4.past", "walked", 0.048, 0.3)],
      note: "Heavy footstep `cam.pan`: Golem thunders past trembling Hero at arm's reach, kicking up dust puffs on every step without looking down.",
      stage: (t, { p }) => {
        const z = 4.05 - p * 3.65;
        const stepBounce = Math.abs(Math.sin(p * Math.PI * 3)) * 0.06;
        return (
          <>
            <Hero
              position={[-1.08, BRIDGE_Y + stepBounce * 0.5, 2.35]}
              rotationY={EAST - 0.2}
              pose={posed("cower", t, { head: [0.1, (0.5 - p) * 0.95, 0] })}
              face="fear"
            />
            <RogueGolem
              position={[0.38, BRIDGE_Y, z]}
              rotationY={NORTH}
              walk={p * 3.4}
              armR={Math.sin(p * 12) * 0.55}
              armL={-Math.sin(p * 12) * 0.55}
            />
            <Puffs position={[0.38, BRIDGE_Y + 0.14, z - 0.25]} count={6} color="#cfd8e3" />
          </>
        );
      },
    },
    {
      cue: "4.barrow",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.52, -3.55],
        onTo: [0, BRIDGE_Y + 0.48, -1.75],
        dist: 4.35,
        distTo: 3.25,
        yaw: 38,
        yawTo: -16,
        pitch: 16,
        pitchTo: 9,
        fov: 42,
      }),
      handheld: 0.016,
      note: "Brisk 4-dad hustle: all four tiny dads hop rapidly pushing the covered wheelbarrow & waving Hero's baby coat onto the bridge!",
      stage: (t, { p }) => {
        const step = bridgePushRoute(p * 0.78);
        const z = step.position[2];
        const b = (ph: number) => slimeBounce(t, 2.9, 0.18, ph);
        return (
          <>
            <Wheelbarrow position={[0, BRIDGE_Y, z + 0.58]} rotationY={SOUTH} wheelSpin={p * 9.5} tilt={Math.sin(t * 12) * 0.03} />
            <Vox kind="wool" tint="#e8e2d0" position={[0, BRIDGE_Y + 0.46, z + 0.62]} size={[0.66, 0.22, 0.74]} />
            <TornBabyCoat position={[0.12, BRIDGE_Y + 0.62 + Math.abs(Math.sin(t * 9)) * 0.05, z + 0.68]} rotation={[-1.15, 0.2, 0]} scale={0.82} />
            <TinyDad which={1} position={[-0.38, BRIDGE_Y, z - 0.18]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[0.38, BRIDGE_Y, z - 0.18]} rotationY={SOUTH} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[-0.28, BRIDGE_Y, z - 0.62]} rotationY={SOUTH} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[0.28, BRIDGE_Y, z - 0.62]} rotationY={SOUTH} hop={b(0.75).hop} squash={b(0.75).squash} />
          </>
        );
      },
    },
    {
      cue: "4.hunt",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.05, BRIDGE_Y + 1.15, 0.45],
        onTo: [0.05, BRIDGE_Y + 1.05, -0.85],
        dist: 4.55,
        distTo: 3.55,
        yaw: -152,
        yawTo: -176,
        pitch: 7,
        pitchTo: 1,
        fov: 44,
      }),
      shake: 0.02,
      impacts: [sceneImpact("4.sunset", "4.hunt", "hunts", 0.06, 0.34)],
      note: "FRONT-FACING PREDATOR LOCK: Golem's glowing red eyes flare crimson, it roars (`SoundRings`), and CHARGES straight toward the hopping tiny dads!",
      stage: (t) => {
        const snapAt = w("4.hunt", "hunts");
        const snap = tw(t, 0.02, snapAt);
        const charge = tw(t, Math.max(0.15, snapAt - 0.1), 1.45);
        const gz = 1.45 - charge * 2.15;
        return (
          <>
            <pointLight position={[0.15, BRIDGE_Y + 2.05, gz - 0.3]} color="#ff2424" intensity={1.2 + snap * 2.2} distance={6} decay={2} />
            <RogueGolem
              position={[0.15, BRIDGE_Y, gz]}
              rotationY={NORTH}
              walk={charge * 2.8}
              headYaw={(1 - snap) * 0.75}
              headPitch={0.2 * snap}
              armR={-0.35 - snap * 1.25}
              armL={-0.35 - snap * 1.25}
              bow={0.22 * charge}
            />
            {t >= snapAt - 0.05 ? (
              <SoundRings position={[0.15, BRIDGE_Y + 2.0, gz - 0.35]} t={t - (snapAt - 0.05)} color="#ff4444" reach={1.9} />
            ) : null}
            <TinyDad
              which={1}
              position={[-0.48 - charge * 0.25, BRIDGE_Y + Math.abs(Math.sin(t * 10)) * 0.18, -1.95]}
              rotationY={SOUTH}
              squash={0.22 * snap}
              mood="scared"
            />
            <TinyDad
              which={3}
              position={[0.48 + charge * 0.25, BRIDGE_Y + Math.abs(Math.cos(t * 10)) * 0.18, -1.95]}
              rotationY={SOUTH}
              squash={0.22 * snap}
              mood="scared"
            />
          </>
        );
      },
    },
    {
      cue: "4.slam",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [-0.55, BRIDGE_Y + 1.05, 0.85],
        onTo: [-0.85, BRIDGE_Y + 0.45, 0.8],
        dist: 4.85,
        to: 3.6,
        yaw: 146,
        pitch: 18,
        fov: 44,
        fovTo: 39,
      }),
      shake: 0.024,
      impacts: [sceneImpact("4.sunset", "4.slam", "slammed", 0.082, 0.44)],
      ease: "outCubic",
      note: "Explosive rail smash: all four tiny dads dive-hop clear as Golem slams both fists into the bridge stone, blasting white craters & shockwaves!",
      stage: (t) => {
        const hitAt = w("4.slam", "slammed");
        const wind = tw(t, Math.max(0, hitAt - 0.32), hitAt);
        const smash = tw(t, hitAt, hitAt + 0.15);
        const dive = tw(t, Math.max(0, hitAt - 0.14), hitAt + 0.45);
        const h1 = slimeHopTo([-0.85, BRIDGE_Y, 0.55], [0.25, BRIDGE_Y, -0.55], dive, 1, 0.52);
        const h2 = slimeHopTo([-0.55, BRIDGE_Y, 0.35], [0.65, BRIDGE_Y, -0.35], dive, 1, 0.58);
        const arm = -1.72 * wind + smash * 1.42;
        return (
          <>
            <RogueGolem
              position={[-0.15 + jolt(t, hitAt, 0.15), BRIDGE_Y, 1.35]}
              rotationY={NORTH + 0.55}
              armR={arm}
              armL={arm}
              bow={0.36 * smash - 0.12 * wind}
            />
            <TinyDad which={1} position={h1.position} rotationY={NORTH} hop={h1.hop} squash={h1.squash} mood="scared" />
            <TinyDad which={2} position={h2.position} rotationY={NORTH} hop={h2.hop} squash={h2.squash} mood="scared" />
            {t >= hitAt ? (
              <>
                <SoundRings position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.12, BRIDGE.craterStone[2]]} t={t - hitAt} color="#ffffff" reach={1.8} />
                <Bits position={BRIDGE.craterStone} t={t - hitAt} color="#eef2f7" count={22} power={1.65} />
                <Puffs position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.35, BRIDGE.craterStone[2]]} count={12} color="#dce3ec" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
