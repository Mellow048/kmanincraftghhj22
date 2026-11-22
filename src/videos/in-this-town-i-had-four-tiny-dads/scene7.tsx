import { Vox, cam, storyScene } from "../../engine";
import { PATH_Y } from "./marks";
import {
  CHILD,
  EAST,
  GROUND_SIT,
  Hero,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SlimeBlockProp,
  SubscribeSign,
  TinyDad,
  Villager,
  WEST,
  Wheelbarrow,
  groundSitPose,
  openArmsPose,
  pop,
  timing,
  tw,
  w,
} from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Zero-Damage Hug & Subscribe",
  shots: [
    {
      cue: "7.hug",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [0, 0.65, -10.5], dist: 4.5, to: 3.55, yaw: -18, pitch: 14, fov: 42 }),
      note: "Payoff of 'cannot hurt a fly': Hero sits on the grass opening his arms wide as all four tiny dads hop in for a real hug!",
      stage: (t, { p }) => (
        <>
          <Hero
            position={[0, GROUND_SIT, -10.65]}
            rotationY={SOUTH}
            pose={openArmsPose(t)}
            face="grin"
          />
          <TinyDad which={1} position={[-0.95 + p * 0.45, PATH_Y, -10.15 - p * 0.2]} rotationY={-0.35} hop={Math.abs(Math.sin(t * 6.5)) * 0.18} mood="happy" />
          <TinyDad which={2} position={[-0.38 + p * 0.15, PATH_Y, -9.95 - p * 0.25]} rotationY={-0.12} hop={Math.abs(Math.sin(t * 6.5 + 1)) * 0.18} mood="happy" />
          <TinyDad which={3} position={[0.38 - p * 0.15, PATH_Y, -9.95 - p * 0.25]} rotationY={0.12} hop={Math.abs(Math.sin(t * 6.5 + 2)) * 0.18} mood="happy" />
          <TinyDad which={4} position={[0.95 - p * 0.45, PATH_Y, -10.15 - p * 0.2]} rotationY={0.35} hop={Math.abs(Math.sin(t * 6.5 + 3)) * 0.18} mood="happy" />
        </>
      ),
    },
    {
      cue: "7.hold",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [0, 0.72, -10.55], dist: 3.65, to: 2.78, yaw: 16, pitch: 10, fov: 40 }),
      note: "Heart-melting four-way zero-damage hug: all four tiny dads snuggle onto Hero's lap and shoulders at once!",
      stage: (t) => (
        <>
          <Hero
            position={[0, GROUND_SIT, -10.65]}
            rotationY={SOUTH}
            pose={groundSitPose(t, { armR: [-0.95, -0.35, -0.15], armL: [-0.95, 0.35, 0.15] })}
            face="grin"
          />
          <TinyDad which={1} position={[-0.36, 0.18, -10.35]} rotationY={0.25} squash={0.18 + Math.sin(t * 4) * 0.05} mood="happy" />
          <TinyDad which={2} position={[0.36, 0.18, -10.35]} rotationY={-0.25} squash={0.18 + Math.cos(t * 4) * 0.05} mood="happy" />
          <TinyDad which={3} position={[0, 0.36, -10.28]} rotationY={SOUTH} squash={0.2 + Math.sin(t * 4.5) * 0.05} mood="happy" />
          <TinyDad which={4} position={[-0.38, 0.68, -10.58]} rotationY={0.2} scale={0.82} squash={0.16} mood="happy" />
          <PixelHeart position={[-0.32, 1.32 + Math.sin(t * 3) * 0.08, -10.45]} scale={0.85} />
          <PixelHeart position={[0.35, 1.38 + Math.cos(t * 3) * 0.08, -10.45]} scale={0.75} />
        </>
      ),
    },
    {
      cue: "7.roof",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [5.6, 3.25, 5.5], dist: 7.8, to: 6.3, yaw: -24, pitch: -4, fov: 47 }),
      note: "Next Friday triumph: Hero bounces off their glowing Slime Block clear past the school roof onto the Bell Tower!",
      stage: (t) => {
        const launchAt = w("7.roof", "bounced");
        const flight = tw(t, launchAt - 0.15, w("7.roof", "tower") + 0.35);
        const arc = Math.sin(flight * Math.PI) * 2.2;
        const heroX = 4.4 + flight * 2.8;
        const heroZ = 3.5 + flight * 4.3;
        const heroY = PATH_Y + 0.95 + flight * 5.31 + arc;
        const sq = pop(t, launchAt, 0.28);
        return (
          <>
            <SlimeBlockProp position={[4.4, PATH_Y, 3.5]} scale={0.92} squash={sq * 0.5} glow={0.85} />
            <Hero
              position={[heroX, heroY, heroZ]}
              rotationY={flight > 0.85 ? SOUTH - 0.35 : 0.45}
              animation={flight > 0.85 ? "cheer" : "jump"}
              face="grin"
            />
            <TinyDad which={1} position={[3.65, PATH_Y, 3.2]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5)) * 0.18} />
            <TinyDad which={2} position={[5.15, PATH_Y, 3.2]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 1)) * 0.18} />
            <TinyDad which={3} position={[3.75, PATH_Y, 3.85]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 2)) * 0.18} />
            <TinyDad which={4} position={[5.05, PATH_Y, 3.85]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 3)) * 0.18} />
            <Villager position={[3.2, PATH_Y, 4.9]} rotationY={0.45} scale={CHILD} robe={ROBE.farmer} nod={-0.32 * flight} />
            <Villager position={[5.45, PATH_Y, 5.0]} rotationY={-0.25} scale={CHILD} robe={ROBE.white} nod={-0.32 * flight} />
            {t >= launchAt ? <Puffs position={[4.4, 1.0, 3.5]} count={9} color="#b4ff90" /> : null}
          </>
        );
      },
    },
    {
      cue: "7.gate",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0.25, 0.9, 2.2], dist: 5.2, to: 4.15, yaw: -28, pitch: 12, fov: 44 }),
      note: "No more hiding at the corner: Hero rides proudly in the wheelbarrow right up to the school gate pushed by all four dads!",
      stage: (t, { p }) => {
        const z = 1.45 + p * 1.35;
        return (
          <>
            <Wheelbarrow position={[0, PATH_Y, z]} rotationY={SOUTH} tilt={0.04} wheelSpin={p * 6.5} />
            <Hero
              position={[0, PATH_Y + 0.34 + GROUND_SIT, z + 0.16]}
              rotationY={SOUTH}
              pose={groundSitPose(t, { armR: [-2.35, 0, -0.25], armL: [-0.85, 0, 0.2] })}
              face="grin"
            />
            <TinyDad which={1} position={[-0.45, PATH_Y, z - 0.82]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5)) * 0.16} />
            <TinyDad which={2} position={[-0.15, PATH_Y, z - 0.88]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 1)) * 0.16} />
            <TinyDad which={3} position={[0.15, PATH_Y, z - 0.88]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 2)) * 0.16} />
            <TinyDad which={4} position={[0.45, PATH_Y, z - 0.82]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 3)) * 0.16} />
            <Villager position={[1.45, PATH_Y, 3.1]} rotationY={WEST + 0.35} scale={CHILD} robe={ROBE.farmer} nod={Math.sin(t * 5) * 0.14} />
            <Villager position={[-1.25, PATH_Y, 2.85]} rotationY={EAST - 0.35} scale={CHILD} robe={ROBE.white} nod={Math.cos(t * 5) * 0.14} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [0, 1.08, -10.8], dist: 4.5, to: 3.6, yaw: 8, pitch: 6, fov: 42 }),
      note: "Golden-hour CTA: Hero waves on the left, Subscribe button gleams above captions, and Dad #3 slips out of the stack on cue!",
      stage: (t) => {
        const popIn = pop(t, w("8.sub", "subscribe"), 0.35);
        const slipAt = w("8.sub", "slips");
        const slip = tw(t, slipAt - 0.08, slipAt + 0.35);
        return (
          <>
            <Hero
              position={[-0.82, PATH_Y, -10.8]}
              rotationY={0.18}
              animation="wave"
              face="grin"
              headYaw={0.08 + Math.sin(t * 3) * 0.08}
            />
            {/* Raised Subscribe button on a wooden post well above the y=0.72 caption band */}
            <Vox kind="log" position={[0, 0.46, -10.65]} size={[0.16, 0.92, 0.16]} />
            <SubscribeSign position={[0, 0.88, -10.65]} rotationY={SOUTH} scale={1 + popIn * 0.15} />
            {/* Four-dad stack on the right—until #3 slips out on 'slips again'! */}
            <TinyDad which={1} position={[0.82, PATH_Y, -10.8]} rotationY={-0.18} squash={0.1} />
            <TinyDad which={2} position={[0.82, PATH_Y + 0.37, -10.8]} rotationY={-0.18} squash={0.1} />
            <TinyDad
              which={3}
              position={[0.82 + slip * 0.52, PATH_Y + 0.74 * (1 - slip), -10.76 + slip * 0.18]}
              rotationY={-0.18 + slip * 0.8}
              squash={slip * 0.32}
              mood={slip > 0.2 ? "scared" : "happy"}
            />
            <TinyDad
              which={4}
              position={[0.82, PATH_Y + 1.11 - slip * 0.37, -10.8]}
              rotationY={-0.18}
              squash={0.1 + pop(t, slipAt + 0.2, 0.25) * 0.25}
              mood="happy"
            />
          </>
        );
      },
    },
  ],
});
