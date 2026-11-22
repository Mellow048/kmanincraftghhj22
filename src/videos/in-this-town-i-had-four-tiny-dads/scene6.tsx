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
        on: [0, BRIDGE_Y + 0.75, -1.75],
        onTo: [0, BRIDGE_Y + 0.82, -3.45],
        dist: 4.55,
        to: 3.6,
        yaw: 26,
        pitch: 10,
        fov: 43,
        fovTo: 39,
      }),
      shake: 0.018,
      note: "Breathless sprint follow: Hero scoops all four tiny dads against his chest (`carryDadsPose`) and bolts back toward the post!",
      stage: (_t, { p }) => {
        const dist = p * 1.95;
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
            <RogueGolem position={[0, BRIDGE_Y, 0.45 - p * 0.75]} rotationY={NORTH} walk={p * 1.4} armR={-0.85} armL={-0.85} />
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
        from: [-4.4, BRIDGE_Y + 2.25, -2.4],
        on: [0, BRIDGE_Y + 0.95, -0.5],
        onTo: [0, WATER_Y + 0.32, -0.2],
        fov: 46,
        fovTo: 42,
      }),
      impacts: [sceneImpact("6.scoop", "6.drop", "fell", 0.072, 0.42)],
      note: "Wide disaster `cam.pan`: camera whips down from the collapsing bridge planks tracking the heavy Iron Golem plunging into the dark river!",
      stage: (t) => {
        const fallAt = w("6.drop", "fell");
        const fall = tw(t, Math.max(0, fallAt - 0.18), fallAt + 0.68);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.85} pinOut={1} />
            <Hero position={[-0.45, BRIDGE_Y, -4.55]} rotationY={SOUTH} animation="leanOver" face="wow" />
            <RogueGolem
              position={[0, BRIDGE_Y - fall * 2.35, -0.25]}
              rotationY={NORTH + fall * 0.55}
              armR={-1.55}
              armL={-1.55}
              bow={-0.42 * fall}
            />
            {fall > 0.52 ? (
              <Bits position={[0, WATER_Y + 0.2, -0.25]} t={t - fallAt} color="#8fe4ff" count={20} power={1.65} />
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
        on: [0.15, BRIDGE_Y + 0.65, -4.15],
        onTo: [0.85, BRIDGE_Y - 0.15, -3.55],
        dist: 4.45,
        to: 3.55,
        yaw: 30,
        pitch: 14,
        fov: 43,
        fovTo: 40,
      }),
      impacts: [sceneImpact("6.scoop", "6.rope", "snapping", 0.055, 0.32)],
      ease: "outCubic",
      note: "Cliffhanger yank: a snapping vine rope catches Hero's ankle and pulls him and all four dads off the broken bridge ledge!",
      stage: (t) => {
        const yankAt = w("6.rope", "pulled");
        const k = tw(t, Math.max(0, yankAt - 0.2), yankAt + 0.48);
        return (
          <>
            <VineRope top={[1.25, BRIDGE_Y + 0.55, -3.65]} length={1.65} sway={0.45 + k * 0.65} />
            <Hero
              position={[0.05 + k * 0.95, BRIDGE_Y - k * 0.75, -4.25 + k * 0.65]}
              rotationY={0.55 + k * 0.45}
              animation="fall"
              face="fear"
            />
            <TinyDad which={1} position={[-0.22 + k * 0.85, BRIDGE_Y + 0.62 - k * 0.68, -4.05 + k * 0.6]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={2} position={[0.32 + k * 0.85, BRIDGE_Y + 0.58 - k * 0.68, -4.05 + k * 0.6]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={3} position={[0.12 + k * 1.05, BRIDGE_Y + 0.42 - k * 0.82, -3.95 + k * 0.72]} rotationY={SOUTH} mood="scared" />
            <TinyDad which={4} position={[-0.08 + k * 0.9, BRIDGE_Y + 0.78 - k * 0.65, -4.15 + k * 0.6]} rotationY={SOUTH} mood="scared" />
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
        from: [-2.45, 1.35, -11.4],
        on: [0.85, 0.55, -8.45],
        onTo: [0.55, 3.85, -8.85],
        fov: 45,
        fovTo: 40,
      }),
      impacts: [sceneImpact("6.scoop", "6.boing", "bounced", 0.062, 0.36)],
      note: "TRIUMPHANT BOING WHIP-UP (`cam.pan`): Hero and all four dads squish the Slime Block flat and rocket skyward above the trees!",
      stage: (t) => {
        const boingAt = w("6.boing", "bounced") - 0.08;
        const drop = tw(t, 0, Math.max(0.16, boingAt));
        const up = tw(t, Math.max(0.16, boingAt), Math.max(0.75, boingAt + 0.68));
        const y = t < boingAt ? 1.85 - drop * 0.95 : 0.9 + up * 3.65 + Math.sin(up * Math.PI) * 0.95;
        return (
          <>
            <SlimeBlockProp position={[0.85, 0.12, -8.45]} scale={1.02} glow={1} squash={pop(t, boingAt, 0.32) * 0.56} />
            <Hero
              position={[0.85 - up * 0.25, y, -8.45 - up * 0.35]}
              rotationY={2.85}
              pose={t < boingAt ? posed("fall", t, {}) : skyJoyPose(t)}
              face={t < boingAt ? "wow" : "grin"}
            />
            <TinyDad which={1} position={[0.35, y - 0.15, -8.35]} rotationY={2.8} squash={t >= boingAt ? -0.18 : 0.1} />
            <TinyDad which={2} position={[1.35, y - 0.1, -8.35]} rotationY={-2.8} squash={t >= boingAt ? -0.18 : 0.1} />
            <TinyDad which={3} position={[0.52, y + 0.45, -8.65]} rotationY={2.9} squash={t >= boingAt ? -0.18 : 0.1} />
            <TinyDad which={4} position={[1.18, y + 0.48, -8.65]} rotationY={-2.9} squash={t >= boingAt ? -0.18 : 0.1} />
            {t >= boingAt ? <Puffs position={[0.85, 0.95, -8.45]} count={12} color="#c5ff9e" /> : null}
          </>
        );
      },
    },
  ],
});
