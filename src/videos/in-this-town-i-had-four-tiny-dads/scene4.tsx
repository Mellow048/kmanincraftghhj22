import { Vox, cam, storyScene } from "../../engine";
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
  TinyDad,
  TornBabyCoat,
  WEST,
  Wheelbarrow,
  jolt,
  pop,
  posed,
  sceneImpact,
  shovePose,
  slimeBounce,
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
        on: [0, BRIDGE_Y + 0.68, -4.15],
        dist: 4.45,
        distTo: 3.45,
        yaw: -32,
        yawTo: -10,
        pitch: 15,
        pitchTo: 9,
        fov: 42,
      }),
      impacts: [sceneImpact("4.sunset", "4.sunset", "unbarred", 0.04, 0.28)],
      note: "Defiant sunset arc: Hero shoves up the heavy wooden crossbar on the river bridge all by himself.",
      stage: (t) => {
        const liftAt = w("4.sunset", "unbarred");
        const lift = tw(t, 0.05, liftAt + 0.35);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={lift * 0.78} pinOut={lift * 0.28} />
            <Hero
              position={[0.58, BRIDGE_Y, -4.55]}
              rotationY={-0.38}
              pose={shovePose(t, liftAt)}
              face="brave"
            />
          </>
        );
      },
    },
    {
      cue: "4.ruins",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.truck({
        on: [0, BRIDGE_Y + 0.65, 2.2],
        dist: 4.8,
        yaw: 28,
        pitch: 12,
        by: [0, -0.35, 3.1],
        fov: 44,
      }),
      ease: "linear",
      handheld: 0.015,
      note: "Suspenseful Steadicam `cam.truck`: Hero walks off the south end of the bridge into the mossy stone ruins.",
      stage: (_t, { p }) => {
        const dist = p * 3.1;
        const z = 2.2 + dist;
        const y = z < 4.2 ? BRIDGE_Y : Math.max(0.12, BRIDGE_Y - ((z - 4.2) / 3.0) * 1.03);
        return (
          <Hero
            position={[0, y, z]}
            rotationY={SOUTH}
            animation="creep"
            animDistance={dist}
            plantFeet
            face="uneasy"
          />
        );
      },
    },
    {
      cue: "4.vine",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0.35, 1.25, 8.8],
        onTo: [0.25, 1.85, 8.6],
        dist: 5.2,
        distTo: 4.25,
        yaw: 154,
        yawTo: 172,
        pitch: 14,
        pitchTo: 4,
        fov: 43,
      }),
      impacts: [sceneImpact("4.sunset", "4.vine", "stood", 0.052, 0.34)],
      note: "Uncanny rising orbit on the south bank: vine-covered stone blocks shudder and stand up into a giant figure!",
      stage: (t) => {
        const rise = tw(t, w("4.vine", "vines") - 0.15, w("4.vine", "up") + 0.25);
        return (
          <>
            <Hero
              position={[-0.95, 0.12, 6.95]}
              rotationY={0.32}
              animation="stagger"
              animDistance={rise * 0.4}
              face="fear"
              lookAt={[0.35, 1.2 + rise * 0.9, 8.9]}
            />
            <RogueGolem
              position={[0.35, -0.55 + rise * 0.67, 8.95]}
              rotationY={NORTH}
              bow={0.55 * (1 - rise)}
              armR={-0.35 - rise * 0.45}
              armL={-0.35 - rise * 0.45}
            />
            {rise > 0.15 ? <Puffs position={[0.35, 0.45, 8.8]} count={8} color="#8ba37e" /> : null}
          </>
        );
      },
    },
    {
      cue: "4.golem",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [0.2, 1.45, 8.4],
        onTo: [0.2, 2.05, 8.1],
        dist: 5.8,
        to: 4.55,
        yaw: -158,
        pitch: -8,
        fov: 46,
        fovTo: 41,
      }),
      shake: 0.016,
      impacts: [sceneImpact("4.sunset", "4.golem", "golem", 0.06, 0.38)],
      note: "Signature LOW WORM'S-EYE tilt-up (`pitch: -8`): towering vine-draped Iron Golem looms taller than a house!",
      stage: (t, { p }) => {
        const sw = Math.sin(t * 4) * 0.35;
        return (
          <>
            <Hero
              position={[-0.95, 0.12, 6.55]}
              rotationY={0.28}
              animation="cower"
              face="fear"
            />
            <RogueGolem
              position={[0.25, 0.12, 8.55 - p * 0.65]}
              rotationY={NORTH}
              walk={p * 0.95}
              armR={-0.55 + sw}
              armL={-0.55 - sw}
              bow={0.14}
            />
          </>
        );
      },
    },
    {
      cue: "4.past",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-3.2, BRIDGE_Y + 0.85, 2.6],
        on: [0.35, BRIDGE_Y + 1.25, 3.8],
        onTo: [0.25, BRIDGE_Y + 1.25, 0.95],
        fov: 44,
        fovTo: 41,
      }),
      shake: 0.014,
      note: "Tense `cam.pan`: the heavy Iron Golem stomps straight past frozen Hero on the bridge without even glancing at him.",
      stage: (_t, { p }) => {
        const z = 3.9 - p * 3.1;
        return (
          <>
            <Hero
              position={[-1.12, BRIDGE_Y, 2.45]}
              rotationY={EAST - 0.25}
              pose={posed("cower", p, { head: [0, (0.5 - p) * 0.7, 0] })}
              face="fear"
            />
            <RogueGolem
              position={[0.38, BRIDGE_Y, z]}
              rotationY={NORTH}
              walk={p * 2.6}
              armR={Math.sin(p * 10) * 0.4}
              armL={-Math.sin(p * 10) * 0.4}
            />
          </>
        );
      },
    },
    {
      cue: "4.barrow",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [0, BRIDGE_Y + 0.55, -3.5],
        onTo: [0, BRIDGE_Y + 0.52, -2.1],
        dist: 4.5,
        to: 3.45,
        yaw: 26,
        pitch: 14,
        fov: 42,
        fovTo: 39,
      }),
      handheld: 0.015,
      note: "Oh no—all four tiny dads roll their covered wheelbarrow onto the north end of the bridge bringing Hero's baby coat!",
      stage: (t, { p }) => {
        const step = bridgePushRoute(p * 0.55);
        const z = step.position[2];
        const b = (ph: number) => slimeBounce(t, 2.4, 0.14, ph);
        return (
          <>
            <Wheelbarrow position={[0, BRIDGE_Y, z + 0.55]} rotationY={SOUTH} wheelSpin={p * 6} />
            <Vox kind="wool" tint="#e8e2d0" position={[0, BRIDGE_Y + 0.46, z + 0.62]} size={[0.66, 0.22, 0.74]} />
            <TornBabyCoat position={[0.12, BRIDGE_Y + 0.6, z + 0.68]} rotation={[-1.25, 0.2, 0]} scale={0.78} />
            <TinyDad which={1} position={[-0.36, BRIDGE_Y, z - 0.18]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[0.36, BRIDGE_Y, z - 0.18]} rotationY={SOUTH} hop={b(0.25).hop} squash={b(0.25).squash} />
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
        on: [0.15, BRIDGE_Y + 1.35, 0.85],
        dist: 4.5,
        distTo: 3.55,
        yaw: -36,
        yawTo: -8,
        pitch: 8,
        pitchTo: -3,
        fov: 42,
      }),
      impacts: [sceneImpact("4.sunset", "4.hunt", "hunts", 0.05, 0.3)],
      note: "Whip-lock close-up: the Iron Golem's head snaps straight onto the four tiny slimes and raises both iron arms!",
      stage: (t) => {
        const snap = tw(t, 0.04, w("4.hunt", "hunts") + 0.12);
        return (
          <>
            <RogueGolem
              position={[0.2, BRIDGE_Y, 0.95 - snap * 0.45]}
              rotationY={NORTH}
              headYaw={(1 - snap) * 0.65}
              headPitch={0.18 * snap}
              armR={-1.45 * snap}
              armL={-1.45 * snap}
              bow={0.16 * snap}
            />
            <TinyDad which={1} position={[-0.32, BRIDGE_Y, -1.65]} rotationY={SOUTH} squash={0.22 * snap} mood="scared" />
            <TinyDad which={3} position={[0.32, BRIDGE_Y, -1.65]} rotationY={SOUTH} squash={0.22 * snap} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "4.slam",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [-0.65, BRIDGE_Y + 0.85, 0.8],
        onTo: [-0.95, BRIDGE_Y + 0.45, 0.8],
        dist: 4.95,
        to: 3.65,
        yaw: 32,
        pitch: 16,
        fov: 44,
        fovTo: 39,
      }),
      shake: 0.022,
      impacts: [sceneImpact("4.sunset", "4.slam", "slammed", 0.078, 0.42)],
      ease: "outCubic",
      note: "Seismic rail smash: Golem slams both iron fists into the west bridge rail, gouging twin white craters as the tiny dads dodge!",
      stage: (t) => {
        const hitAt = w("4.slam", "slammed");
        const wind = tw(t, Math.max(0, hitAt - 0.3), hitAt);
        const smash = tw(t, hitAt, hitAt + 0.16);
        const scatter = tw(t, hitAt - 0.08, hitAt + 0.4);
        const arm = -1.65 * wind + smash * 1.35;
        return (
          <>
            <RogueGolem
              position={[-0.25 + jolt(t, hitAt, 0.12), BRIDGE_Y, 1.15]}
              rotationY={WEST + 0.45}
              armR={arm}
              armL={arm}
              bow={0.32 * smash}
            />
            <TinyDad which={1} position={[-0.85 + scatter * 0.95, BRIDGE_Y + Math.sin(scatter * Math.PI) * 0.42, 0.35 - scatter * 0.6]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={2} position={[-0.75 + scatter * 1.15, BRIDGE_Y + Math.sin(scatter * Math.PI) * 0.48, 0.95 + scatter * 0.4]} rotationY={NORTH} mood="scared" />
            {t >= hitAt ? (
              <>
                <Bits position={BRIDGE.craterStone} t={t - hitAt} color="#eef2f7" count={18} power={1.5} />
                <Puffs position={[BRIDGE.craterStone[0], BRIDGE_Y + 0.35, BRIDGE.craterStone[2]]} count={10} color="#dce3ec" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
