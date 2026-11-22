import { Block, Glow, Tree, Vox, cam, storyScene } from "../../engine";
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
  SoundRings,
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
  slimeBounce,
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
        on: [0, BRIDGE_Y + 0.85, -1.65],
        onTo: [0, BRIDGE_Y + 0.88, -3.55],
        dist: 4.35,
        to: 3.45,
        yaw: 156,
        pitch: 12,
        fov: 43,
        fovTo: 40,
      }),
      shake: 0.02,
      note: "High-speed pursuit track: Hero sprints full-tilt toward the camera cradling all four bouncing dads while the Golem charges right behind!",
      stage: (t, { p }) => {
        const dist = p * 2.15;
        const z = -1.55 - dist;
        const bob = Math.abs(Math.sin(dist * 6)) * 0.06;
        return (
          <>
            <Hero
              position={[0, BRIDGE_Y, z]}
              rotationY={NORTH}
              pose={carryDadsPose(dist * 1.25)}
              plantFeet
              face="brave"
            />
            <TinyDad which={1} position={[-0.22, BRIDGE_Y + 0.76 + bob, z - 0.24]} rotationY={NORTH} scale={0.76} mood="scared" />
            <TinyDad which={2} position={[0.22, BRIDGE_Y + 0.76 + bob, z - 0.24]} rotationY={NORTH} scale={0.76} mood="scared" />
            <TinyDad which={3} position={[-0.14, BRIDGE_Y + 1.02 + bob, z - 0.22]} rotationY={NORTH} scale={0.76} mood="scared" />
            <TinyDad which={4} position={[0.16, BRIDGE_Y + 1.02 + bob, z - 0.22]} rotationY={NORTH} scale={0.76} mood="scared" />
            <RogueGolem
              position={[0.22, BRIDGE_Y, 0.75 - p * 1.45]}
              rotationY={NORTH}
              walk={p * 2.4}
              armR={-0.95 + Math.sin(t * 9) * 0.35}
              armL={-0.95 - Math.sin(t * 9) * 0.35}
            />
          </>
        );
      },
    },
    {
      cue: "6.pin",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.22, BRIDGE_Y + 0.62, -4.2],
        dist: 4.15,
        distTo: 3.1,
        yaw: 148,
        yawTo: 172,
        pitch: 16,
        pitchTo: 9,
        fov: 42,
      }),
      shake: 0.018,
      impacts: [sceneImpact("6.scoop", "6.pin", "knocked", 0.065, 0.34)],
      note: "Post & Hero BOTH centered in frame: Hero lunges in and two-hand-slams the wooden pin clean out—sending pin & splinters flying!",
      stage: (t) => {
        const hitAt = w("6.pin", "knocked");
        const runIn = tw(t, 0, Math.max(0.18, hitAt));
        const fly = tw(t, Math.max(0.12, hitAt - 0.05), hitAt + 0.42);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.85} pinOut={fly * 1.4} />
            {/* Flying wooden pin spinning across frame on impact! */}
            {fly > 0.05 ? (
              <Vox
                kind="planks"
                position={[-0.35 - fly * 1.65, BRIDGE_Y + 0.62 + Math.sin(fly * Math.PI) * 0.55, -4.2 - fly * 0.4]}
                rotation={[fly * 3.2, fly * 2.1, fly * 4.0]}
                size={[0.42, 0.14, 0.14]}
              />
            ) : null}
            <Hero
              position={[0.92 - runIn * 0.32, BRIDGE_Y, -4.35]}
              rotationY={WEST + 0.25}
              pose={shovePose(t, hitAt)}
              face="brave"
            />
            {t >= hitAt ? (
              <>
                <Bits position={[0.1, BRIDGE_Y + 0.58, -4.2]} t={t - hitAt} color="#d8a96c" count={14} power={1.3} />
                <Puffs position={[0.1, BRIDGE_Y + 0.58, -4.2]} count={8} color="#fff1d0" />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "6.drop",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-1.65, BRIDGE_Y + 2.35, -3.55],
        on: [0.65, BRIDGE_Y + 1.05, 0.15],
        onTo: [2.65, WATER_Y + 0.45, 0.25],
        fov: 46,
        fovTo: 42,
      }),
      shake: 0.022,
      impacts: [
        sceneImpact("6.scoop", "6.drop", "fell", 0.078, 0.44),
        sceneImpact("6.scoop", "6.drop", "swim", 0.055, 0.34),
      ],
      note: "True bridge-collapse spectacle: six shattering bridge planks AND the flailing Iron Golem plunge off the east edge into a massive river geyser!",
      stage: (t) => {
        const fallAt = w("6.drop", "fell");
        const fall = tw(t, Math.max(0, fallAt - 0.18), fallAt + 0.72);
        const gx = 0.55 + fall * 2.25;
        const gy = BRIDGE_Y + Math.sin(fall * Math.PI * 0.5) * 0.18 - fall * fall * 2.65;
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.85} pinOut={1} />
            {/* Tumbling wooden bridge planks collapsing into the river WITH the Golem! */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Vox
                key={i}
                kind="darkPlanks"
                tint="#7c5d3b"
                position={[
                  0.65 + (i % 2) * 0.65 + fall * (1.55 + i * 0.22),
                  BRIDGE_Y - fall * fall * (1.85 + i * 0.2),
                  -1.25 + i * 0.55,
                ]}
                rotation={[fall * (1.4 + i * 0.3), fall * 0.9, -fall * (1.8 + i * 0.25)]}
                size={[1.35, 0.16, 0.42]}
              />
            ))}
            <Hero position={[0.55, BRIDGE_Y, -2.85]} rotationY={0.85} animation="leanOver" face="wow" />
            <RogueGolem
              position={[gx, gy, 0.2]}
              rotationY={1.15 + fall * 0.75}
              armR={-1.65 + Math.sin(t * 14) * 0.45}
              armL={-1.65 - Math.sin(t * 14) * 0.45}
              bow={0.52 * fall}
            />
            {fall > 0.48 ? (
              <>
                <Bits position={[2.75, WATER_Y + 0.25, 0.2]} t={t - fallAt} color="#9beeff" count={26} power={1.85} />
                <Puffs position={[2.75, WATER_Y + 0.35, 0.2]} count={12} color="#dff8ff" />
              </>
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
        on: [0, 1.55, 0],
        onTo: [0.15, 1.12, 0.18],
        dist: 4.65,
        distTo: 3.45,
        yaw: -36,
        yawTo: 18,
        pitch: 16,
        pitchTo: 4,
        fov: 42,
      }),
      impacts: [sceneImpact("6.scoop", "6.sink", "sank", 0.058, 0.36)],
      note: "Comedy riverbed crash: Golem plummets from above into a silt cloud, then turns its head tracking three bright swimming Fish nose-to-nose!",
      stage: (t) => {
        const land = tw(t, 0, 0.48);
        const swim = tw(t, 0.25, 1.0);
        const fishX = 1.35 - swim * 1.65;
        return (
          <>
            <RogueGolem
              position={[-0.25, RIVERBED_Y + (1 - land) * 2.65, 0]}
              rotationY={0.38}
              headPitch={0.22 * swim}
              headYaw={0.45 - swim * 0.95}
              armR={-0.15 + (1 - land) * -1.1}
              armL={0.15 + (1 - land) * -1.1}
            />
            {/* School of 3 big bright orange Fish swimming right across Golem's face! */}
            <Fish
              position={[fishX, 1.56 + Math.sin(t * 5.5) * 0.08, 0.55]}
              rotation={[0, WEST + 0.2 + Math.sin(t * 10) * 0.18, 0]}
              scale={1.75}
            />
            <Fish
              position={[fishX + 0.42, 1.38 + Math.cos(t * 5.5) * 0.08, 0.72]}
              rotation={[0, WEST + 0.2 + Math.cos(t * 10) * 0.18, 0]}
              scale={1.35}
            />
            <Fish
              position={[fishX + 0.35, 1.78 + Math.sin(t * 6.5) * 0.08, 0.38]}
              rotation={[0, WEST + 0.2 + Math.sin(t * 9) * 0.18, 0]}
              scale={1.25}
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <Block
                key={i}
                position={[-0.25 + (i - 2) * 0.18, 1.35 + (((t * 1.15 + i * 0.28) % 1) * 1.85), 0.35]}
                size={[0.085, 0.085, 0.085]}
                color="#c8f6ff"
              />
            ))}
            {land > 0.65 ? (
              <>
                <Puffs position={[-0.25, 0.22, 0]} count={12} color="#8ecbe0" />
                <Bits position={[-0.25, 0.18, 0]} t={Math.max(0, t - 0.32)} color="#9be8ff" count={14} power={1.1} />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "6.rope",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.95, BRIDGE_Y + 0.65, -0.35],
        onTo: [2.25, BRIDGE_Y - 0.15, -0.15],
        dist: 5.15,
        distTo: 4.15,
        yaw: -136,
        yawTo: -158,
        pitch: 18,
        pitchTo: 10,
        fov: 45,
      }),
      shake: 0.02,
      impacts: [sceneImpact("6.scoop", "6.rope", "snapping", 0.06, 0.34)],
      note: "Full-body cliffhanger yank: snapping vine rope whips taut with sparks and launches Hero + all four flailing dads off the open bridge ledge!",
      stage: (t) => {
        const yankAt = w("6.rope", "pulled");
        const snap = tw(t, 0.02, Math.max(0.22, yankAt));
        const k = tw(t, Math.max(0.12, yankAt - 0.18), yankAt + 0.52);
        return (
          <>
            <VineRope top={[1.95, BRIDGE_Y + 0.75, 0.25]} length={1.75} sway={0.35 + snap * 0.85} />
            {snap > 0.2 && snap < 0.85 ? (
              <Bits position={[1.45, BRIDGE_Y + 0.35, -0.15]} t={t - 0.08} color="#ffe082" count={12} power={1.15} />
            ) : null}
            <Hero
              position={[0.75 + k * 1.55, BRIDGE_Y + Math.sin(k * Math.PI) * 0.45 - k * 0.72, -0.45 + k * 0.35]}
              rotationY={1.25 + k * 0.75}
              animation="fall"
              face="fear"
            />
            <TinyDad which={1} position={[0.42 + k * 1.45, BRIDGE_Y + 0.55 + Math.sin(k * Math.PI) * 0.5 - k * 0.62, -0.25 + k * 0.3]} rotationY={k * 2} mood="scared" />
            <TinyDad which={2} position={[1.08 + k * 1.45, BRIDGE_Y + 0.52 + Math.sin(k * Math.PI) * 0.55 - k * 0.62, -0.65 + k * 0.3]} rotationY={-k * 2} mood="scared" />
            <TinyDad which={3} position={[0.92 + k * 1.72, BRIDGE_Y + 0.38 + Math.sin(k * Math.PI) * 0.4 - k * 0.78, -0.15 + k * 0.35]} rotationY={k * 2.5} mood="scared" />
            <TinyDad which={4} position={[0.68 + k * 1.5, BRIDGE_Y + 0.72 + Math.sin(k * Math.PI) * 0.6 - k * 0.58, -0.55 + k * 0.3]} rotationY={-k * 1.8} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.85, 1.35, -8.1],
        onTo: [0.85, 0.55, -8.45],
        dist: 4.45,
        distTo: 3.35,
        yaw: 142,
        yawTo: 168,
        pitch: 24,
        pitchTo: 12,
        fov: 43,
      }),
      impacts: [sceneImpact("6.scoop", "6.three", "wheelbarrow", 0.045, 0.28)],
      note: "Dynamic freefall chase: Hero & Dads #1,#2,#4 plummet through the air while clumsy #3 pinwheels ahead and bonks right into the wheelbarrow!",
      stage: (t) => {
        const slip = tw(t, 0.02, w("6.three", "wheelbarrow") + 0.15);
        return (
          <>
            <Wheelbarrow position={[0.85, 0.12, -8.45]} rotationY={2.8 + slip * 0.25} tilt={0.28 * slip} />
            <Vox
              kind="wool"
              tint="#e8e2d0"
              position={[0.85 - slip * 0.22, 0.56 + slip * 0.18, -8.45]}
              rotation={[0, 0, slip * 0.35]}
              size={[0.68, 0.22, 0.76]}
            />
            <TinyDad
              which={3}
              position={[0.85, 2.15 - slip * 1.52, -7.85 - slip * 0.58]}
              rotationY={slip * 4.2}
              squash={slip > 0.82 ? 0.42 : -0.22}
              mood="scared"
            />
            <Hero
              position={[0.55, 2.95 - slip * 1.05, -7.75 - slip * 0.35]}
              rotationY={2.75}
              pose={posed("fall", t, { head: [0.38, 0, 0] })}
              face="wow"
            />
            <TinyDad which={1} position={[0.05, 3.05 - slip * 0.98, -7.95]} rotationY={2.6} squash={-0.16} mood="scared" />
            <TinyDad which={2} position={[1.15, 3.12 - slip * 0.98, -7.95]} rotationY={-2.6} squash={-0.16} mood="scared" />
            {slip > 0.8 ? <Puffs position={[0.85, 0.62, -8.45]} count={7} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.85, 0.85, -8.45],
        onTo: [0.85, 1.15, -8.45],
        dist: 4.85,
        distTo: 3.85,
        yaw: -142,
        yawTo: -168,
        pitch: 18,
        pitchTo: 10,
        fov: 44,
      }),
      impacts: [sceneImpact("6.scoop", "6.block", "flew", 0.048, 0.3)],
      note: "Full-action reveal: wheelbarrow tips aside, the white sheet billows away, the Slime Block pops into place glowing bright emerald as Hero plummets in from above!",
      stage: (t) => {
        const fly = tw(t, 0.02, w("6.block", "flew") + 0.32);
        const dropHero = tw(t, 0.05, 1.15);
        const b3 = slimeBounce(t, 3.0, 0.22, 0.1);
        return (
          <>
            <Wheelbarrow position={[1.78 + fly * 0.35, 0.12, -8.65]} rotationY={2.2} tilt={0.55} />
            <SlimeBlockProp
              position={[0.85, 0.12 + Math.sin(fly * Math.PI) * 0.18, -8.45]}
              scale={0.85 + fly * 0.17}
              glow={0.5 + fly * 0.5}
              squash={pop(t, 0.18, 0.28) * 0.32}
            />
            <Glow position={[0.85, 0.65, -8.45]} size={1.2 + fly * 1.4} color="#8eff62" opacity={0.18 + fly * 0.24} />
            <Vox
              kind="wool"
              tint="#e8e2d0"
              position={[0.85 - fly * 2.15, 0.78 + fly * 1.15, -8.45 + fly * 0.65]}
              rotation={[fly * 1.6, fly * 1.9, fly * 1.2]}
              size={[0.82, 0.08, 0.88]}
            />
            <TinyDad which={3} position={[-0.08, 0.12, -8.35]} rotationY={2.5} hop={b3.hop} squash={b3.squash} mood="happy" />
            <Hero
              position={[0.85, 2.65 - dropHero * 1.45, -8.45]}
              rotationY={2.8}
              animation="fall"
              face="wow"
            />
          </>
        );
      },
    },
    {
      cue: "6.boing",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-3.65, 1.85, -12.55],
        on: [0.85, 0.85, -8.45],
        onTo: [0.68, 3.85, -8.65],
        fov: 46,
        fovTo: 43,
      }),
      impacts: [sceneImpact("6.scoop", "6.boing", "bounced", 0.068, 0.38)],
      note: "TRIUMPHANT BOING ABOVE THE TREES: Slime Block squishes 55% flat with shockwave rings, rocketing Hero & all four dads above flanking swamp trees!",
      stage: (t) => {
        const boingAt = w("6.boing", "bounced") - 0.08;
        const drop = tw(t, 0, Math.max(0.16, boingAt));
        const up = tw(t, Math.max(0.16, boingAt), Math.max(0.88, boingAt + 0.82));
        const y = t < boingAt ? 1.85 - drop * 0.95 : 0.9 + up * 2.75 + Math.sin(up * Math.PI) * 0.65;
        return (
          <>
            {/* Actual swamp trees flanking the bank so we visually see Hero bounce ABOVE the treetops! */}
            <Tree position={[-1.65, 0, -7.25]} height={2.85} leaf="#3b7830" />
            <Tree position={[3.15, 0, -7.45]} height={3.05} leaf="#448537" />
            <SlimeBlockProp position={[0.85, 0.12, -8.45]} scale={1.04} glow={1} squash={pop(t, boingAt, 0.34) * 0.58} />
            <Hero
              position={[0.85 - up * 0.18, y, -8.45 - up * 0.22]}
              rotationY={2.85 + up * 0.35}
              pose={t < boingAt ? posed("fall", t, {}) : skyJoyPose(t)}
              face={t < boingAt ? "wow" : "grin"}
            />
            <TinyDad which={1} position={[0.32, y - 0.12, -8.35]} rotationY={2.8} squash={t >= boingAt ? -0.2 : 0.12} />
            <TinyDad which={2} position={[1.38, y - 0.08, -8.35]} rotationY={-2.8} squash={t >= boingAt ? -0.2 : 0.12} />
            <TinyDad which={3} position={[0.52, y + 0.45, -8.65]} rotationY={2.9} squash={t >= boingAt ? -0.2 : 0.12} />
            <TinyDad which={4} position={[1.18, y + 0.48, -8.65]} rotationY={-2.9} squash={t >= boingAt ? -0.2 : 0.12} />
            {t >= boingAt ? (
              <>
                <SoundRings position={[0.85, 0.95, -8.45]} t={t - boingAt} color="#9dff70" reach={2.2} />
                <Bits position={[0.85, 0.95, -8.45]} t={t - boingAt} color="#9dff70" count={16} power={1.35} />
                <Puffs position={[0.85, 0.95, -8.45]} count={12} color="#c5ff9e" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
