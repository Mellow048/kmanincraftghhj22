import { Block, Glow, Vox, cam, storyScene } from "../../engine";
import { BRIDGE, BRIDGE_Y, bridgePushRoute } from "./marks";
import {
  Bits,
  BridgePinPost,
  EAST,
  FistCraters,
  Hero,
  NORTH,
  Puffs,
  RogueGolem,
  SOUTH,
  SoundRings,
  TinyDad,
  TornBabyCoat,
  WEST,
  Wheelbarrow,
  blendPose,
  bridgeSurfaceY,
  gaitPose,
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
        on: [0.55, BRIDGE_Y + 0.72, -4.35],
        onTo: [0.15, BRIDGE_Y + 0.72, -2.85],
        dist: 4.65,
        distTo: 3.65,
        yaw: -36,
        yawTo: 18,
        pitch: 16,
        pitchTo: 9,
        fov: 44,
      }),
      impacts: [sceneImpact("4.sunset", "4.sunset", "unbarred", 0.045, 0.3)],
      note: "Smooth natural-paced bridge opening: Hero knocks the east pin free so the crossbar swings clear, then blends smoothly into a calm distance-matched walk onto the bridge!",
      stage: (t) => {
        const liftAt = w("4.sunset", "unbarred");
        const stepIn = tw(t, 0, Math.max(0.22, liftAt - 0.06));
        const openBar = tw(t, Math.max(0.16, liftAt - 0.04), liftAt + 0.36);
        const cross = tw(t, liftAt + 0.24, 1.88);
        const walkBlend = tw(t, liftAt + 0.18, liftAt + 0.54);
        const pinX = 1.24 + stepIn * 0.12;
        const pinZ = -4.74 + stepIn * 0.14;
        const hx = pinX * (1 - cross) + 0.12 * cross;
        const hz = pinZ + cross * 2.05;
        const hy = bridgeSurfaceY(hz, 0.18);
        const walkDist = stepIn * 0.18 + Math.hypot(hx - pinX, hz - pinZ);
        const rotStart = EAST - 0.38;
        const rotEnd = 0; // SOUTH
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={openBar * 1.42} pinOut={openBar * 1.45} />
            <Hero
              position={[hx, hy, hz]}
              rotationY={rotStart + (rotEnd - rotStart) * walkBlend}
              pose={blendPose(shovePose(t, liftAt), gaitPose("walk", walkDist), walkBlend)}
              plantFeet
              face="brave"
            />
            {openBar > 0.08 && openBar < 0.78 ? (
              <Puffs position={[1.85, BRIDGE_Y + 0.92, -4.02]} count={7} color="#ffe7ba" />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "4.ruins",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0, 0.85, 4.35],
        onTo: [0.12, 0.55, 6.85],
        dist: 4.85,
        distTo: 3.75,
        yaw: 48,
        yawTo: -22,
        pitch: 16,
        pitchTo: 8,
        fov: 44,
      }),
      handheld: 0.016,
      note: "Sweeping parallax orbit down the exact south cobble ramp surface (`bridgeSurfaceY`) as Hero creeps into the stone ruins!",
      stage: (t, { p }) => {
        const dist = p * 3.2;
        const z = 3.8 + dist;
        const y = bridgeSurfaceY(z);
        return (
          <>
            {/* Wide flanking ruin stones (`|x| >= 1.85`) so Hero & camera never clip them */}
            <Vox kind="cobble" tint="#5b6656" position={[-1.88, bridgeSurfaceY(5.85) + 0.52, 5.85]} size={[0.62, 1.04, 0.62]} />
            <Vox kind="leaves" tint="#3b7d31" position={[-1.68, bridgeSurfaceY(5.65) + 0.78, 5.65]} size={[0.28, 0.5, 0.2]} />
            <Vox kind="cobble" tint="#556050" position={[1.88, bridgeSurfaceY(6.75) + 0.46, 6.75]} size={[0.66, 0.92, 0.66]} />
            {[0, 1, 2, 3].map((i) => (
              <Block
                key={i}
                position={[
                  (i % 2 ? 0.95 : -0.95) + Math.sin(t * 4 + i) * 0.22,
                  0.55 + p * (0.85 + i * 0.22),
                  5.55 + i * 0.45,
                ]}
                size={[0.07, 0.07, 0.07]}
                color="#d8ff72"
              />
            ))}
            <Hero
              position={[Math.sin(p * Math.PI) * 0.18, y, z]}
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
        on: [0.22, 1.18, 9.15],
        onTo: [0.18, 1.78, 8.75],
        dist: 5.15,
        distTo: 4.1,
        yaw: 148,
        yawTo: 174,
        pitch: 15,
        pitchTo: 4,
        fov: 44,
      }),
      shake: 0.018,
      impacts: [sceneImpact("4.sunset", "4.vine", "stood", 0.065, 0.38)],
      note: "Explosive awakening on the flat ruins path (`y = 0.15`, zero ground/ramp phasing): crouched Golem rips upright shattering lateral mossy stones!",
      stage: (t) => {
        const burstAt = w("4.vine", "stood") - 0.12;
        const rise = tw(t, 0.04, w("4.vine", "up") + 0.18);
        const burst = tw(t, Math.max(0.06, burstAt), burstAt + 0.55);
        const hz = 7.95 - burst * 0.42;
        const gz = 9.65 - rise * 0.65;
        return (
          <>
            {/* Lateral mossy ruin blocks (`|x| >= 0.92`) blasting wide so they never intersect Golem or Hero! */}
            {[
              [-0.95, 0.65, -1],
              [1.02, 0.72, 1],
              [-0.88, 1.35, -1],
              [0.92, 1.42, 1],
            ].map(([ox, oy, dir], i) => (
              <Vox
                key={i}
                kind={i % 2 ? "cobble" : "leaves"}
                tint={i % 2 ? "#5e6859" : "#3b7d31"}
                position={[
                  0.18 + ox * (1 + burst * 1.45),
                  0.15 + oy + Math.sin(burst * Math.PI) * 0.55 - burst * 0.35,
                  8.95 - burst * 0.55,
                ]}
                rotation={[burst * 2.2 * dir, burst * 1.5, burst * 1.9 * dir]}
                size={[0.38, 0.38, 0.38]}
              />
            ))}
            <pointLight position={[0.18, 2.15, gz - 0.35]} color="#ff2a2a" intensity={rise * 2.5} distance={5} decay={2} />
            <Glow position={[0.18, 2.05, gz - 0.25]} size={0.42 + rise * 0.32} color="#ff3b2f" opacity={0.16 * rise} />
            <Hero
              position={[0.82 + burst * 0.28, bridgeSurfaceY(hz), hz]}
              rotationY={-0.32}
              animation="stagger"
              animDistance={rise * 0.95}
              plantFeet
              face="fear"
              lookAt={[0.18, 1.35 + rise * 0.75, gz]}
            />
            <RogueGolem
              position={[0.18, bridgeSurfaceY(gz), gz]}
              rotationY={NORTH}
              walk={rise * 1.35}
              bow={0.68 * (1 - rise)}
              armR={-0.25 - rise * 1.25}
              armL={-0.25 - rise * 1.25}
            />
            {burst > 0.05 ? (
              <>
                <Bits position={[0.18, 1.25, 8.95]} t={t - Math.max(0.04, burstAt)} color="#9ab089" count={18} power={1.45} />
                <Puffs position={[0.18, 0.42, 8.95]} count={10} color="#dce3d5" />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "4.golem",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0.15, 1.65, 8.05],
        onTo: [0.15, 2.05, 6.45],
        dist: 4.75,
        distTo: 3.85,
        yaw: -152,
        yawTo: -172,
        pitch: 6,
        pitchTo: 2,
        fov: 45,
      }),
      fovTo: 41,
      shake: 0.02,
      impacts: [
        sceneImpact("4.sunset", "4.golem", "golem", 0.065, 0.38),
        sceneImpact("4.sunset", "4.golem", "taller", 0.055, 0.32),
      ],
      note: "Thunderous ramp-climbing advance (`bridgeSurfaceY` keeps every foot planted on top of the cobble slope!): Golem stomps up throwing both arms wide!",
      stage: (t, { p }) => {
        const adv = p * 2.25;
        const gz = 8.65 - adv;
        const hz = 6.75 - p * 1.85;
        const roarAt = w("4.golem", "taller");
        const roar = tw(t, Math.max(0, roarAt - 0.15), roarAt + 0.35);
        return (
          <>
            <pointLight position={[0.15, bridgeSurfaceY(gz) + 2.15, gz - 0.35]} color="#ff2e2e" intensity={2.6} distance={6} decay={2} />
            <Hero
              position={[0.88 + p * 0.22, bridgeSurfaceY(hz), hz]}
              rotationY={-0.38}
              animation="stagger"
              animDistance={p * 1.85}
              plantFeet
              face="fear"
              lookAt={[0.15, bridgeSurfaceY(gz) + 2.0, gz]}
            />
            <RogueGolem
              position={[0.15, bridgeSurfaceY(gz), gz]}
              rotationY={NORTH}
              walk={adv * 2.1}
              armR={-0.45 - roar * 1.35}
              armL={-0.45 - roar * 1.35}
              bow={0.18 - roar * 0.28}
            />
            <Puffs position={[0.15, bridgeSurfaceY(gz) + 0.12, gz - 0.35]} count={9} color="#b8c4bc" />
            {t >= roarAt ? (
              <SoundRings position={[0.15, bridgeSurfaceY(gz) + 2.1, gz - 0.25]} t={t - roarAt} color="#ff5252" reach={2.2} />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "4.past",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.pan({
        from: [-2.95, BRIDGE_Y + 0.78, 2.25],
        on: [0.35, BRIDGE_Y + 1.28, 3.85],
        onTo: [0.25, BRIDGE_Y + 1.22, 0.45],
        fov: 45,
        fovTo: 40,
      }),
      shake: 0.016,
      impacts: [sceneImpact("4.sunset", "4.past", "walked", 0.048, 0.3)],
      note: "Heavy footstep `cam.pan`: Golem thunders past trembling Hero at arm's reach, shaking pebbles off the planks without looking down.",
      stage: (t, { p }) => {
        const z = 4.05 - p * 3.75;
        const stepBounce = Math.abs(Math.sin(p * Math.PI * 3)) * 0.05;
        return (
          <>
            <Hero
              position={[-1.18, BRIDGE_Y + stepBounce * 0.4, 2.35]}
              rotationY={EAST - 0.2}
              pose={posed("cower", t, { head: [0.1, (0.5 - p) * 0.95, 0] })}
              face="fear"
            />
            <RogueGolem
              position={[0.38, BRIDGE_Y, z]}
              rotationY={NORTH}
              walk={p * 3.6}
              armR={Math.sin(p * 12) * 0.65}
              armL={-Math.sin(p * 12) * 0.65}
              headYaw={Math.sin(p * 6) * 0.12}
            />
            <Puffs position={[0.38, BRIDGE_Y + 0.14, z - 0.25]} count={6} color="#cfd8e3" />
          </>
        );
      },
    },
    {
      cue: "4.barrow",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0, BRIDGE_Y + 0.58, -3.35],
        onTo: [-0.15, BRIDGE_Y + 0.55, -1.55],
        dist: 4.45,
        distTo: 3.45,
        yaw: 38,
        yawTo: -18,
        pitch: 16,
        pitchTo: 9,
        fov: 43,
      }),
      handheld: 0.016,
      note: "Clean non-overlapping 4-dad hustle behind the wheelbarrow handles while Hero waves frantically ahead warning them to stop!",
      stage: (t, { p }) => {
        const step = bridgePushRoute(p * 0.72);
        const wz = step.position[2] + 0.65;
        const b = (ph: number) => slimeBounce(t, 3.1, 0.2, ph);
        return (
          <>
            <Wheelbarrow
              position={[0, BRIDGE_Y, wz]}
              rotationY={SOUTH}
              wheelSpin={p * 10.5}
              tilt={Math.sin(t * 12) * 0.03}
              covered
              withSlimeBlock
            />
            <TornBabyCoat
              position={[0.08, BRIDGE_Y + 0.86 + Math.abs(Math.sin(t * 9)) * 0.04, wz + 0.08]}
              rotation={[-0.12, 0.2, 0]}
              scale={0.82}
            />
            {/* All 4 tiny dads spaced cleanly BEHIND the wheelbarrow handles (`wz - 0.98` and `wz - 1.48`) */}
            <TinyDad which={1} position={[-0.36, BRIDGE_Y, wz - 0.98]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[0.36, BRIDGE_Y, wz - 0.98]} rotationY={SOUTH} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[-0.32, BRIDGE_Y, wz - 1.48]} rotationY={SOUTH} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[0.32, BRIDGE_Y, wz - 1.48]} rotationY={SOUTH} hop={b(0.75).hop} squash={b(0.75).squash} />
            <Hero
              position={[-1.12, BRIDGE_Y, 0.55]}
              rotationY={NORTH + 0.25}
              animation="wave"
              face="fear"
              lookAt={[0, BRIDGE_Y + 0.4, wz]}
            />
          </>
        );
      },
    },
    {
      cue: "4.hunt",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0.05, BRIDGE_Y + 1.05, 0.35],
        onTo: [0.0, BRIDGE_Y + 0.88, -1.05],
        dist: 4.85,
        distTo: 3.75,
        yaw: -146,
        yawTo: -172,
        pitch: 12,
        pitchTo: 5,
        fov: 45,
      }),
      shake: 0.022,
      impacts: [sceneImpact("4.sunset", "4.hunt", "hunts", 0.065, 0.36)],
      note: "HIGH-KINETIC GOLEM VS SLIMES PURSUIT: Golem whip-turns with a shockwave roar and sprint-charges swinging alternating fists while all 4 tiny dads leap-scatter wide!",
      stage: (t) => {
        const snapAt = w("4.hunt", "hunts");
        const snap = tw(t, 0.02, Math.max(0.24, snapAt));
        const charge = tw(t, Math.max(0.14, snapAt - 0.08), 1.65);
        const gz = 2.05 - charge * 2.45;
        // All 4 tiny dads actively leap-scatter outward in crisp arcs as Golem charges!
        const s1 = slimeHopTo([-0.34, BRIDGE_Y, -1.45], [-1.28, BRIDGE_Y, -2.25], charge, 3, 0.42, 0);
        const s2 = slimeHopTo([0.34, BRIDGE_Y, -1.45], [1.28, BRIDGE_Y, -2.15], charge, 3, 0.42, 25);
        const s3 = slimeHopTo([-0.28, BRIDGE_Y, -1.95], [-0.72, BRIDGE_Y, -2.85], charge, 3, 0.46, 50);
        const s4 = slimeHopTo([0.28, BRIDGE_Y, -1.95], [0.72, BRIDGE_Y, -2.85], charge, 3, 0.46, 75);
        const swing = Math.sin(charge * Math.PI * 4);
        return (
          <>
            <pointLight position={[0.12, BRIDGE_Y + 2.05, gz - 0.3]} color="#ff2424" intensity={1.2 + snap * 2.0} distance={6} decay={2} />
            <RogueGolem
              position={[0.12, BRIDGE_Y, gz]}
              rotationY={NORTH + (1 - snap) * 0.85}
              walk={charge * 3.8}
              headYaw={(1 - snap) * 0.65}
              headPitch={0.22 * snap}
              armR={-0.55 - snap * 0.95 + swing * 0.65 * charge}
              armL={-0.55 - snap * 0.95 - swing * 0.65 * charge}
              bow={0.26 * charge}
            />
            {t >= snapAt - 0.05 ? (
              <SoundRings position={[0.12, BRIDGE_Y + 1.98, gz - 0.35]} t={t - (snapAt - 0.05)} color="#ff4444" reach={2.0} />
            ) : null}
            <Puffs position={[0.12, BRIDGE_Y + 0.14, gz + 0.25]} count={8} color="#cfd8e3" />
            <TinyDad which={1} position={s1.position} rotationY={NORTH - 0.4} hop={s1.hop} squash={s1.squash} mood="scared" />
            <TinyDad which={2} position={s2.position} rotationY={NORTH + 0.4} hop={s2.hop} squash={s2.squash} mood="scared" />
            <TinyDad which={3} position={s3.position} rotationY={SOUTH} hop={s3.hop} squash={s3.squash} mood="scared" />
            <TinyDad which={4} position={s4.position} rotationY={SOUTH} hop={s4.hop} squash={s4.squash} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "4.slam",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [-0.35, BRIDGE_Y + 1.05, 0.75],
        onTo: [-0.55, BRIDGE_Y + 0.58, 0.45],
        dist: 4.95,
        distTo: 3.75,
        yaw: 142,
        yawTo: 164,
        pitch: 19,
        pitchTo: 12,
        fov: 45,
      }),
      fovTo: 40,
      shake: 0.025,
      impacts: [sceneImpact("4.sunset", "4.slam", "slammed", 0.082, 0.44)],
      ease: "outCubic",
      note: "EXPLOSIVE AERIAL RAIL SMASH: Golem leaps forward raising both fists overhead and slams the deck while all 4 tiny dads vault-dodge in high arcs over the shockwave!",
      stage: (t) => {
        const hitAt = w("4.slam", "slammed");
        const wind = tw(t, 0, Math.max(0.22, hitAt));
        const smash = tw(t, hitAt, hitAt + 0.16);
        const recover = tw(t, hitAt + 0.35, hitAt + 0.95);
        const dive = tw(t, Math.max(0, hitAt - 0.18), hitAt + 0.52);
        // All 4 tiny dads vault clear in clean non-overlapping trajectories (`>= 0.55m` from Golem & each other)
        const d1 = slimeHopTo([-0.95, BRIDGE_Y, 0.25], [-0.45, BRIDGE_Y, -0.95], dive, 1, 0.62);
        const d2 = slimeHopTo([-0.42, BRIDGE_Y, 0.15], [0.25, BRIDGE_Y, -0.85], dive, 1, 0.68);
        const d3 = slimeHopTo([0.15, BRIDGE_Y, 0.35], [1.05, BRIDGE_Y, -0.35], dive, 1, 0.58);
        const d4 = slimeHopTo([0.55, BRIDGE_Y, 0.65], [1.38, BRIDGE_Y, 0.15], dive, 1, 0.54);
        const golemHop = Math.sin(wind * Math.PI) * 0.34 * (1 - smash);
        const arm = -2.35 * wind + smash * 2.05 - recover * 0.65;
        return (
          <>
            <RogueGolem
              position={[-0.18 + jolt(t, hitAt, 0.14), BRIDGE_Y + golemHop, 1.85 - wind * 0.42]}
              rotationY={NORTH + 0.52}
              walk={wind * 1.4}
              armR={arm}
              armL={arm}
              bow={0.42 * smash - 0.16 * wind - 0.12 * recover}
            />
            <TinyDad which={1} position={d1.position} rotationY={SOUTH} hop={d1.hop} squash={d1.squash} mood="scared" />
            <TinyDad which={2} position={d2.position} rotationY={SOUTH} hop={d2.hop} squash={d2.squash} mood="scared" />
            <TinyDad which={3} position={d3.position} rotationY={WEST} hop={d3.hop} squash={d3.squash} mood="scared" />
            <TinyDad which={4} position={d4.position} rotationY={WEST} hop={d4.hop} squash={d4.squash} mood="angry" />
            {t >= hitAt ? (
              <>
                <FistCraters position={BRIDGE.craterStone} />
                <SoundRings position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.1, BRIDGE.craterStone[2]]} t={t - hitAt} color="#ffffff" reach={2.1} />
                <Bits position={BRIDGE.craterStone} t={t - hitAt} color="#eef2f7" count={24} power={1.7} />
                <Puffs position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.32, BRIDGE.craterStone[2]]} count={12} color="#dce3ec" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
