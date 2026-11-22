import { Block, Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, RIVERBED_Y, WATER_Y } from "./marks";
import {
  Bits,
  BridgePinPost,
  Fish,
  Hero,
  NORTH,
  Puffs,
  RogueGolem,
  SOUTH,
  SlimeBlockProp,
  TinyDad,
  VineRope,
  WEST,
  Wheelbarrow,
  carryDadsPose,
  pop,
  posed,
  sceneImpact,
  shovePose,
  skyJoyPose,
  timing,
  tw,
  w,
} from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Dropping The Bridge & The Secret Slime Block",
  shots: [
    {
      cue: "6.scoop",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [0, BRIDGE_Y + 0.85, -1.75],
        onTo: [0, BRIDGE_Y + 0.88, -3.35],
        dist: 4.35,
        to: 3.55,
        yaw: 158,
        pitch: 12,
        fov: 43,
        fovTo: 40,
      }),
      shake: 0.018,
      note: "Front pursuit track: camera retreats ahead of Hero as he sprints TOWARD the lens cradling all four dads while the Golem chases behind!",
      stage: (_t, { p }) => {
        const dist = p * 1.85;
        const z = -1.65 - dist;
        return (
          <>
            <Hero
              position={[0, BRIDGE_Y, z]}
              rotationY={NORTH}
              pose={carryDadsPose(dist)}
              plantFeet
              face="brave"
            />
            <TinyDad which={1} position={[-0.22, BRIDGE_Y + 0.76, z - 0.24]} rotationY={NORTH} scale={0.76} mood="scared" />
            <TinyDad which={2} position={[0.22, BRIDGE_Y + 0.76, z - 0.24]} rotationY={NORTH} scale={0.76} mood="scared" />
            <TinyDad which={3} position={[-0.14, BRIDGE_Y + 1.02, z - 0.22]} rotationY={NORTH} scale={0.76} mood="scared" />
            <TinyDad which={4} position={[0.16, BRIDGE_Y + 1.02, z - 0.22]} rotationY={NORTH} scale={0.76} mood="scared" />
            <RogueGolem position={[0.25, BRIDGE_Y, 0.55 - p * 0.85]} rotationY={NORTH} walk={p * 1.4} armR={-0.85} armL={-0.85} />
          </>
        );
      },
    },
    {
      cue: "6.pin",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.35, BRIDGE_Y + 0.65, -4.15],
        dist: 3.9,
        distTo: 3.0,
        yaw: -34,
        yawTo: -12,
        pitch: 15,
        fov: 39,
      }),
      impacts: [sceneImpact("6.scoop", "6.pin", "knocked", 0.055, 0.32)],
      note: "Urgent two-handed knock (`shovePose`): Hero slams the wooden pin clean out of the bridge support post!",
      stage: (t) => {
        const hitAt = w("6.pin", "knocked");
        const pull = tw(t, Math.max(0, hitAt - 0.12), hitAt + 0.32);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.78} pinOut={pull} />
            <Hero
              position={[0.78, BRIDGE_Y, -4.45]}
              rotationY={-1.05}
              pose={shovePose(t, hitAt)}
              face="brave"
            />
            {t >= hitAt ? <Puffs position={[1.05, BRIDGE_Y + 0.55, -4.2]} count={7} color="#fff1d0" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.drop",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-1.45, BRIDGE_Y + 2.15, -3.45],
        on: [0.65, BRIDGE_Y + 1.15, 0.15],
        onTo: [2.75, WATER_Y + 0.45, 0.25],
        fov: 46,
        fovTo: 42,
      }),
      impacts: [sceneImpact("6.scoop", "6.drop", "fell", 0.072, 0.42)],
      note: "Unobstructed disaster `cam.pan`: Golem pitches off the open east bridge edge into the dark river with a huge cyan splash!",
      stage: (t) => {
        const fallAt = w("6.drop", "fell");
        const fall = tw(t, Math.max(0, fallAt - 0.18), fallAt + 0.68);
        const gx = 0.55 + fall * 2.25;
        const gy = BRIDGE_Y + Math.sin(fall * Math.PI * 0.5) * 0.15 - fall * fall * 2.55;
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.85} pinOut={1} />
            <Hero position={[0.85, BRIDGE_Y, -2.55]} rotationY={0.85} animation="leanOver" face="wow" />
            <RogueGolem
              position={[gx, gy, 0.2]}
              rotationY={1.15 + fall * 0.65}
              armR={-1.55}
              armL={-1.55}
              bow={0.48 * fall}
            />
            {fall > 0.52 ? (
              <Bits position={[2.8, WATER_Y + 0.22, 0.2]} t={t - fallAt} color="#8fe4ff" count={22} power={1.65} />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "6.sink",
      zone: "riverbed",
      look: "overworld-night",
      ...cam.orbit({
        on: [0, 1.35, 0],
        onTo: [0.15, 1.05, 0.2],
        dist: 4.8,
        distTo: 3.75,
        yaw: -28,
        yawTo: 10,
        pitch: 14,
        pitchTo: 5,
        fov: 42,
      }),
      impacts: [sceneImpact("6.scoop", "6.sink", "sank", 0.05, 0.35)],
      note: "Underwater `riverbed` gag: the heavy Iron Golem thuds straight onto the bottom and stares nose-to-nose at a curious orange Fish!",
      stage: (t) => {
        const land = tw(t, 0, 0.38);
        const swim = tw(t, 0.2, 0.95);
        return (
          <>
            <RogueGolem
              position={[-0.28, RIVERBED_Y + (1 - land) * 1.45, 0]}
              rotationY={0.48}
              headPitch={0.22 * swim}
              headYaw={0.25 * swim}
              armR={-0.15}
              armL={0.15}
            />
            <Fish
              position={[0.85 - swim * 0.42, 1.52 + Math.sin(t * 4.5) * 0.08, 0.42]}
              rotation={[0, WEST + 0.35 + Math.sin(t * 8) * 0.16, 0]}
            />
            <Block position={[-0.1, 1.85 + ((t * 0.9) % 1.4), 0.25]} size={[0.09, 0.09, 0.09]} color="#c4f4ff" />
            <Block position={[0.2, 1.55 + ((t * 1.1 + 0.4) % 1.5), -0.15]} size={[0.07, 0.07, 0.07]} color="#d8f8ff" />
            {land > 0.7 ? <Puffs position={[-0.28, 0.18, 0]} count={8} color="#8ecbe0" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.rope",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [1.15, BRIDGE_Y + 0.72, -0.35],
        onTo: [2.15, BRIDGE_Y - 0.05, -0.15],
        dist: 4.35,
        to: 3.45,
        yaw: -142,
        pitch: 15,
        fov: 43,
        fovTo: 40,
      }),
      impacts: [sceneImpact("6.scoop", "6.rope", "snapping", 0.055, 0.32)],
      ease: "outCubic",
      note: "Unobstructed east-gap cliffhanger: a snapping vine rope yanks Hero and all four dads right off the open broken bridge ledge!",
      stage: (t) => {
        const yankAt = w("6.rope", "pulled");
        const k = tw(t, Math.max(0, yankAt - 0.2), yankAt + 0.48);
        return (
          <>
            <VineRope top={[2.05, BRIDGE_Y + 0.65, 0.25]} length={1.65} sway={0.45 + k * 0.65} />
            <Hero
              position={[1.05 + k * 1.15, BRIDGE_Y + Math.sin(k * Math.PI) * 0.22 - k * 0.55, -0.45 + k * 0.35]}
              rotationY={1.25 + k * 0.45}
              animation="fall"
              face="fear"
            />
            <TinyDad which={1} position={[0.78 + k * 1.05, BRIDGE_Y + 0.62 - k * 0.48, -0.25 + k * 0.3]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={2} position={[1.32 + k * 1.05, BRIDGE_Y + 0.58 - k * 0.48, -0.65 + k * 0.3]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={3} position={[1.15 + k * 1.25, BRIDGE_Y + 0.42 - k * 0.62, -0.15 + k * 0.35]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={4} position={[0.92 + k * 1.1, BRIDGE_Y + 0.78 - k * 0.45, -0.55 + k * 0.3]} rotationY={SOUTH} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.85, 0.85, -7.8],
        onTo: [0.85, 0.48, -8.35],
        dist: 3.95,
        distTo: 3.05,
        yaw: 148,
        yawTo: 168,
        pitch: 24,
        pitchTo: 14,
        fov: 41,
      }),
      note: "Clumsy payoff: blue-tied Dad #3 slips out ahead of falling Hero, tumbling straight into their covered wheelbarrow on the bank!",
      stage: (t) => {
        const slip = tw(t, 0.04, w("6.three", "wheelbarrow") + 0.18);
        return (
          <>
            <Wheelbarrow position={[0.85, 0.12, -8.45]} rotationY={2.8} tilt={0.1 * slip} />
            <Vox kind="wool" tint="#e8e2d0" position={[0.85, 0.56, -8.45]} size={[0.68, 0.22, 0.76]} />
            <TinyDad
              which={3}
              position={[0.85, 1.55 - slip * 0.92, -7.85 - slip * 0.55]}
              rotationY={slip * 2.2}
              squash={slip > 0.85 ? 0.36 : -0.18}
              mood="scared"
            />
            <Hero
              position={[0.65, 2.25 - slip * 0.65, -7.65]}
              rotationY={2.75}
              pose={posed("fall", t, { head: [0.35, 0, 0] })}
              face="wow"
            />
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({
        on: [0.85, 0.58, -8.45],
        dist: 3.65,
        to: 2.75,
        yaw: -154,
        pitch: 16,
        fov: 40,
        fovTo: 36,
      }),
      impacts: [sceneImpact("6.scoop", "6.block", "flew", 0.042, 0.28)],
      note: "Reveal push: the cloth sheet flies off the wheelbarrow, unveiling one glowing nine-slimeball Slime Block right underneath them!",
      stage: (t) => {
        const fly = tw(t, 0.02, w("6.block", "flew") + 0.28);
        return (
          <>
            <SlimeBlockProp position={[0.85, 0.12, -8.45]} scale={0.98} glow={0.95} squash={pop(t, 0.15, 0.25) * 0.22} />
            <Vox
              kind="wool"
              tint="#e8e2d0"
              position={[0.85 - fly * 1.45, 0.78 + fly * 0.65, -8.45 + fly * 0.55]}
              rotation={[fly * 0.8, fly * 1.1, fly * 0.6]}
              size={[0.72, 0.08, 0.78]}
            />
            <TinyDad which={3} position={[0.12, 0.12, -8.35]} rotationY={2.5} squash={0.16} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "6.boing",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-3.45, 1.85, -12.35],
        on: [0.85, 0.85, -8.45],
        onTo: [0.68, 3.65, -8.65],
        fov: 46,
        fovTo: 43,
      }),
      impacts: [sceneImpact("6.scoop", "6.boing", "bounced", 0.062, 0.36)],
      note: "TRIUMPHANT BOING WHIP-UP (`cam.pan`): Hero and all four dads squish the Slime Block flat and rocket skyward dead-centre in frame!",
      stage: (t) => {
        const boingAt = w("6.boing", "bounced") - 0.08;
        const drop = tw(t, 0, Math.max(0.16, boingAt));
        const up = tw(t, Math.max(0.16, boingAt), Math.max(0.88, boingAt + 0.82));
        const y = t < boingAt ? 1.75 - drop * 0.85 : 0.9 + up * 2.55 + Math.sin(up * Math.PI) * 0.55;
        return (
          <>
            <SlimeBlockProp position={[0.85, 0.12, -8.45]} scale={1.02} glow={1} squash={pop(t, boingAt, 0.32) * 0.56} />
            <Hero
              position={[0.85 - up * 0.18, y, -8.45 - up * 0.22]}
              rotationY={2.85}
              pose={t < boingAt ? posed("fall", t, {}) : skyJoyPose(t)}
              face={t < boingAt ? "wow" : "grin"}
            />
            <TinyDad which={1} position={[0.35, y - 0.12, -8.35]} rotationY={2.8} squash={t >= boingAt ? -0.18 : 0.1} />
            <TinyDad which={2} position={[1.35, y - 0.08, -8.35]} rotationY={-2.8} squash={t >= boingAt ? -0.18 : 0.1} />
            <TinyDad which={3} position={[0.52, y + 0.42, -8.65]} rotationY={2.9} squash={t >= boingAt ? -0.18 : 0.1} />
            <TinyDad which={4} position={[1.18, y + 0.45, -8.65]} rotationY={-2.9} squash={t >= boingAt ? -0.18 : 0.1} />
            {t >= boingAt ? <Puffs position={[0.85, 0.95, -8.45]} count={12} color="#c5ff9e" /> : null}
          </>
        );
      },
    },
  ],
});
