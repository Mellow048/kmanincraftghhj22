import { Block, Glow, Tree, Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, RIVERBED_Y, WATER_Y } from "./marks";
import {
  Bits,
  BridgePinPost,
  EAST,
  Fish,
  Hero,
  NORTH,
  Puffs,
  RogueGolem,
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
  slimeBlockTopY,
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
        on: [0, BRIDGE_Y + 0.85, -1.55],
        onTo: [0, BRIDGE_Y + 0.88, -3.55],
        dist: 4.45,
        to: 3.5,
        yaw: 156,
        pitch: 13,
        fov: 44,
        fovTo: 40,
      }),
      shake: 0.022,
      note: "Full-sprint pursuit with ZERO head-phasing: Hero cradles all 4 bouncing dads cleanly IN FRONT of his chest (`z - 0.42`) while Golem charges swinging fists right behind!",
      stage: (t, { p }) => {
        const dist = p * 2.2;
        const z = -1.45 - dist;
        const bob = Math.abs(Math.sin(dist * 6.5)) * 0.055;
        const swing = Math.sin(t * 13);
        const gz = 0.45 - p * 2.15;
        return (
          <>
            <Hero
              position={[0, BRIDGE_Y, z]}
              rotationY={NORTH}
              pose={carryDadsPose(dist * 1.3)}
              plantFeet
              face="brave"
            />
            {/* Held cleanly forward at `z - 0.42` (`0.26m` in front of chest) and below chin (`y <= +0.84`) so Hero's face is 100% clear! */}
            <TinyDad which={1} position={[-0.18, BRIDGE_Y + 0.54 + bob, z - 0.42]} rotationY={NORTH} scale={0.68} mood="scared" />
            <TinyDad which={2} position={[0.18, BRIDGE_Y + 0.54 + bob, z - 0.42]} rotationY={NORTH} scale={0.68} mood="scared" />
            <TinyDad which={3} position={[-0.17, BRIDGE_Y + 0.81 + bob, z - 0.44]} rotationY={NORTH} scale={0.68} mood="scared" />
            <TinyDad which={4} position={[0.17, BRIDGE_Y + 0.81 + bob, z - 0.44]} rotationY={NORTH} scale={0.68} mood="scared" />
            <RogueGolem
              position={[0.2, BRIDGE_Y, gz]}
              rotationY={NORTH}
              walk={p * 3.8}
              armR={-1.15 + swing * 0.75}
              armL={-1.15 - swing * 0.75}
              bow={0.24}
            />
            <Puffs position={[0.2, BRIDGE_Y + 0.14, gz - 0.35]} count={7} color="#dce3ec" />
          </>
        );
      },
    },
    {
      cue: "6.pin",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [1.15, BRIDGE_Y + 0.78, -4.05],
        dist: 4.25,
        distTo: 3.15,
        yaw: 146,
        yawTo: 168,
        pitch: 16,
        pitchTo: 9,
        fov: 43,
      }),
      shake: 0.02,
      impacts: [sceneImpact("6.scoop", "6.pin", "knocked", 0.068, 0.34)],
      note: "Exact physical pin strike: Hero lunges right up to the east post (`x = +1.95`) slamming the golden locking pin free while Golem charges into frame behind him!",
      stage: (t, { p }) => {
        const hitAt = w("6.pin", "knocked");
        const runIn = tw(t, 0, Math.max(0.18, hitAt));
        const fly = tw(t, Math.max(0.12, hitAt - 0.04), hitAt + 0.42);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={1.25} pinOut={fly * 1.85} />
            <Hero
              position={[1.18 + runIn * 0.28, BRIDGE_Y, -4.02]}
              rotationY={EAST - 0.12}
              pose={shovePose(t, hitAt)}
              plantFeet
              face="brave"
            />
            <RogueGolem
              position={[0.12, BRIDGE_Y, -1.45 - p * 1.15]}
              rotationY={NORTH}
              walk={p * 2.8}
              armR={-1.35 + Math.sin(t * 11) * 0.55}
              armL={-1.35 - Math.sin(t * 11) * 0.55}
              bow={0.22}
            />
            {t >= hitAt ? (
              <>
                <Bits position={[1.95, BRIDGE_Y + 0.92, -3.98]} t={t - hitAt} color="#d8a96c" count={16} power={1.35} />
                <Puffs position={[1.95, BRIDGE_Y + 0.92, -3.98]} count={8} color="#fff1d0" />
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
        from: [-1.45, BRIDGE_Y + 2.25, -3.35],
        on: [1.35, BRIDGE_Y + 1.05, 0.15],
        onTo: [2.95, WATER_Y + 0.55, 0.25],
        fov: 46,
        fovTo: 42,
      }),
      shake: 0.024,
      impacts: [
        sceneImpact("6.scoop", "6.drop", "fell", 0.078, 0.44),
        sceneImpact("6.scoop", "6.drop", "swim", 0.058, 0.34),
      ],
      note: "100% PHASING-FREE BRIDGE PLUNGE: Golem vaults cleanly OVER `x = 2.20` (`gy >= BRIDGE_Y` until `gx > 2.78`) before plummeting with outer planks into an explosive river geyser!",
      stage: (t) => {
        const fallAt = w("6.drop", "fell");
        const overEdge = tw(t, 0.02, Math.max(0.36, fallAt + 0.18));
        const plunge = tw(t, Math.max(0.32, fallAt + 0.14), fallAt + 0.85);
        // `gx` clears `2.78` (`2.78 - 0.52 = 2.26 > 2.20` deck edge) BEFORE `plunge` lowers `gy` below `BRIDGE_Y`!
        const gx = 1.38 + overEdge * 1.42 + plunge * 0.55;
        const gy = BRIDGE_Y + Math.sin(overEdge * Math.PI) * 0.36 - plunge * plunge * 2.65;
        const b = (ph: number) => slimeBounce(t, 3.0, 0.22, ph);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={1.25} pinOut={1.85} />
            {/* Outer breakaway planks (`x >= 2.32`, completely outside the solid `x <= 2.20` deck!) */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Vox
                key={i}
                kind="darkPlanks"
                tint="#7c5d3b"
                position={[
                  2.36 + (i % 2) * 0.38 + plunge * (0.65 + i * 0.16),
                  BRIDGE_Y - 0.08 - plunge * plunge * (1.75 + i * 0.18),
                  -1.15 + i * 0.48,
                ]}
                rotation={[plunge * (1.5 + i * 0.3), overEdge * 0.7, -overEdge * 0.45 - plunge * 1.6]}
                size={[0.62, 0.14, 0.4]}
              />
            ))}
            <Hero position={[0.45, BRIDGE_Y, -2.55]} rotationY={1.05} animation="leanOver" plantFeet face="wow" />
            <TinyDad which={1} position={[-0.25, BRIDGE_Y, -2.75]} rotationY={1.1} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[0.22, BRIDGE_Y, -3.15]} rotationY={1.1} hop={b(0.3).hop} squash={b(0.3).squash} />
            <RogueGolem
              position={[gx, gy, 0.2]}
              rotationY={1.18 + overEdge * 0.55}
              walk={t * 5.2}
              armR={-1.75 + Math.sin(t * 16) * 0.65}
              armL={-1.75 - Math.sin(t * 16) * 0.65}
              bow={0.28 * overEdge + 0.35 * plunge}
            />
            {plunge > 0.32 ? (
              <>
                <SoundRings position={[3.15, WATER_Y + 0.08, 0.2]} t={plunge * 1.1} color="#9beeff" reach={2.3} />
                <Bits position={[3.15, WATER_Y + 0.22, 0.2]} t={Math.max(0.02, t - fallAt - 0.18)} color="#9beeff" count={28} power={1.9} />
                <Puffs position={[3.15, WATER_Y + 0.35, 0.2]} count={14} color="#dff8ff" />
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
        onTo: [0.12, 1.15, 0.22],
        dist: 4.65,
        distTo: 3.45,
        yaw: -36,
        yawTo: 18,
        pitch: 16,
        pitchTo: 5,
        fov: 42,
      }),
      impacts: [sceneImpact("6.scoop", "6.sink", "sank", 0.058, 0.36)],
      note: "Comedy riverbed crash (`y = RIVERBED_Y`, zero floor/fish overlap): Golem slams onto the silt floor and tracks three bright orange Fish swimming cleanly in front of its nose!",
      stage: (t) => {
        const land = tw(t, 0, 0.48);
        const swim = tw(t, 0.22, 1.0);
        const fishX = 1.35 - swim * 1.45;
        return (
          <>
            <RogueGolem
              position={[-0.25, RIVERBED_Y + (1 - land) * 2.55, 0]}
              rotationY={0.35}
              headPitch={0.22 * swim}
              headYaw={0.48 - swim * 0.92}
              armR={-0.18 + (1 - land) * -1.15}
              armL={0.18 + (1 - land) * -1.15}
            />
            {/* Fish swim at `z >= 0.72` (`0.36m` clear in front of Golem's chest) */}
            <Fish
              position={[fishX, 1.56 + Math.sin(t * 5.5) * 0.08, 0.74]}
              rotation={[0, WEST + 0.18 + Math.sin(t * 10) * 0.18, 0]}
              scale={1.65}
            />
            <Fish
              position={[fishX + 0.46, 1.36 + Math.cos(t * 5.5) * 0.08, 0.92]}
              rotation={[0, WEST + 0.18 + Math.cos(t * 10) * 0.18, 0]}
              scale={1.3}
            />
            <Fish
              position={[fishX + 0.38, 1.8 + Math.sin(t * 6.5) * 0.08, 0.68]}
              rotation={[0, WEST + 0.18 + Math.sin(t * 9) * 0.18, 0]}
              scale={1.2}
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <Block
                key={i}
                position={[-0.25 + (i - 2) * 0.18, 1.55 + (((t * 1.15 + i * 0.28) % 1) * 1.75), 0.52]}
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
        on: [1.25, BRIDGE_Y + 0.65, -0.25],
        onTo: [2.65, BRIDGE_Y - 0.05, -0.05],
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
      note: "100% PHASING-FREE CLIFFHANGER YANK: Hero & all 4 dads arc UP and OVER `x = 2.20` (`hy >= BRIDGE_Y` until `hx > 2.55`) before plunging off the open east ledge!",
      stage: (t) => {
        const yankAt = w("6.rope", "pulled");
        const snap = tw(t, 0.02, Math.max(0.22, yankAt));
        const over = tw(t, 0.08, Math.max(0.45, yankAt + 0.18));
        const drop = tw(t, Math.max(0.42, yankAt + 0.14), yankAt + 0.62);
        // `hx` reaches `2.58` (`> 2.20 + 0.30`) BEFORE `drop` lowers `hy` below `BRIDGE_Y`!
        const hx = 1.18 + over * 1.42 + drop * 0.55;
        const hy = BRIDGE_Y + Math.sin(over * Math.PI) * 0.52 - drop * drop * 1.35;
        return (
          <>
            <VineRope top={[2.12, BRIDGE_Y + 0.85, 0.25]} length={1.65} sway={0.35 + snap * 0.95} />
            {snap > 0.2 && snap < 0.88 ? (
              <Bits position={[1.65, BRIDGE_Y + 0.42, -0.05]} t={t - 0.06} color="#ffe082" count={12} power={1.15} />
            ) : null}
            <Hero
              position={[hx, hy, -0.35 + over * 0.28]}
              rotationY={1.25 + over * 0.75}
              animation="fall"
              face="fear"
            />
            <TinyDad which={1} position={[hx - 0.54, hy + 0.48, -0.08]} rotationY={over * 2} mood="scared" />
            <TinyDad which={2} position={[hx + 0.54, hy + 0.46, -0.58]} rotationY={-over * 2} mood="scared" />
            <TinyDad which={3} position={[hx + 0.52, hy + 0.18, 0.22]} rotationY={over * 2.5} mood="scared" />
            <TinyDad which={4} position={[hx - 0.52, hy + 0.62, -0.68]} rotationY={-over * 1.8} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.85, 1.45, -8.1],
        onTo: [0.85, 0.75, -8.45],
        dist: 4.55,
        distTo: 3.45,
        yaw: 142,
        yawTo: 168,
        pitch: 24,
        pitchTo: 12,
        fov: 43,
      }),
      impacts: [sceneImpact("6.scoop", "6.three", "wheelbarrow", 0.045, 0.28)],
      note: "Zero-phasing freefall (`y = 0.15` bank path): clumsy #3 pinwheels down onto the top of the covered wheelbarrow (`y >= 0.98`), knocking the sheet loose!",
      stage: (t) => {
        const slip = tw(t, 0.02, w("6.three", "wheelbarrow") + 0.15);
        return (
          <>
            <Wheelbarrow
              position={[0.85, 0.15, -8.45]}
              rotationY={2.8 + slip * 0.22}
              tilt={0.22 * slip}
              covered
              sheetFly={slip * 0.22}
              withSlimeBlock
            />
            <TinyDad
              which={3}
              position={[0.85, 2.35 - slip * 1.32, -7.88 - slip * 0.52]}
              rotationY={slip * 4.2}
              squash={slip > 0.82 ? 0.38 : -0.2}
              mood="scared"
            />
            <Hero
              position={[0.48, 3.15 - slip * 1.05, -7.72 - slip * 0.35]}
              rotationY={2.75}
              pose={posed("fall", t, { head: [0.38, 0, 0] })}
              face="wow"
            />
            <TinyDad which={1} position={[-0.08, 3.22 - slip * 0.98, -7.95]} rotationY={2.6} squash={-0.16} mood="scared" />
            <TinyDad which={2} position={[1.22, 3.28 - slip * 0.98, -7.95]} rotationY={-2.6} squash={-0.16} mood="scared" />
            {slip > 0.78 ? <Puffs position={[0.85, 0.98, -8.45]} count={7} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [0.85, 0.92, -8.45],
        onTo: [0.85, 1.22, -8.45],
        dist: 4.85,
        distTo: 3.85,
        yaw: -142,
        yawTo: -168,
        pitch: 18,
        pitchTo: 10,
        fov: 44,
      }),
      impacts: [sceneImpact("6.scoop", "6.block", "flew", 0.048, 0.3)],
      note: "Zero-phasing reveal: wheelbarrow tipped clear (`x = 2.15`), sheet billows away above `y = 1.25`, #3 hops at `x = -0.42`, and Hero plummets down to `y = 1.28` right above the Slime Block!",
      stage: (t) => {
        const fly = tw(t, 0.02, w("6.block", "flew") + 0.32);
        const dropHero = tw(t, 0.05, 1.15);
        const b3 = slimeBounce(t, 3.0, 0.22, 0.1);
        const sq = pop(t, 0.18, 0.28) * 0.28;
        const scale = 0.88 + fly * 0.12;
        const topY = slimeBlockTopY(0.15, scale, sq);
        return (
          <>
            <Wheelbarrow position={[2.12 + fly * 0.28, 0.15, -8.68]} rotationY={2.2} tilt={0.52} />
            <SlimeBlockProp
              position={[0.85, 0.15, -8.45]}
              scale={scale}
              glow={0.5 + fly * 0.5}
              squash={sq}
            />
            <Glow position={[0.85, 0.68, -8.45]} size={1.2 + fly * 1.35} color="#8eff62" opacity={0.18 + fly * 0.22} />
            <Vox
              kind="wool"
              tint="#e8e2d0"
              position={[0.85 - fly * 2.15, 1.28 + fly * 1.05, -8.45 + fly * 0.65]}
              rotation={[fly * 1.6, fly * 1.9, fly * 1.2]}
              size={[0.82, 0.08, 0.88]}
            />
            <TinyDad which={3} position={[-0.42, 0.15, -8.35]} rotationY={2.5} hop={b3.hop} squash={b3.squash} mood="happy" />
            <Hero
              position={[0.85, Math.max(topY + 0.06, 2.72 - dropHero * 1.42), -8.45]}
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
        on: [0.85, 1.15, -8.45],
        onTo: [0.68, 3.95, -8.65],
        fov: 46,
        fovTo: 43,
      }),
      impacts: [sceneImpact("6.scoop", "6.boing", "bounced", 0.068, 0.38)],
      note: "100% PHASING-FREE BOING ABOVE THE TREES: `slimeBlockTopY` keeps Hero & all 4 dads flush ON TOP of the squishing Slime Block before rocketing between wide-set swamp trees!",
      stage: (t) => {
        const boingAt = w("6.boing", "bounced") - 0.08;
        const sq = pop(t, boingAt, 0.34) * 0.56;
        const blockTop = slimeBlockTopY(0.15, 1.02, sq);
        const drop = tw(t, 0, Math.max(0.16, boingAt));
        const up = tw(t, Math.max(0.16, boingAt), Math.max(0.88, boingAt + 0.82));
        const heroY = t < boingAt ? blockTop + (1 - drop) * 0.72 : blockTop + up * 2.85 + Math.sin(up * Math.PI) * 0.65;
        return (
          <>
            {/* Wide-set swamp trees (`x = -2.45` and `x = +3.85`) so canopies frame the shot with zero leaf clipping! */}
            <Tree position={[-2.45, 0, -7.25]} height={2.85} leaf="#3b7830" />
            <Tree position={[3.85, 0, -7.45]} height={3.05} leaf="#448537" />
            <SlimeBlockProp position={[0.85, 0.15, -8.45]} scale={1.02} glow={1} squash={sq} />
            <Hero
              position={[0.85 - up * 0.16, heroY, -8.45 - up * 0.2]}
              rotationY={2.85 + up * 0.35}
              pose={t < boingAt ? posed("fall", t, {}) : skyJoyPose(t)}
              face={t < boingAt ? "wow" : "grin"}
            />
            <TinyDad which={1} position={[0.14, heroY + 0.06, -8.32]} rotationY={2.8} squash={t >= boingAt ? -0.2 : 0.12} />
            <TinyDad which={2} position={[1.56, heroY + 0.08, -8.32]} rotationY={-2.8} squash={t >= boingAt ? -0.2 : 0.12} />
            <TinyDad which={3} position={[0.24, heroY + 0.58, -8.98]} rotationY={2.9} squash={t >= boingAt ? -0.2 : 0.12} />
            <TinyDad which={4} position={[1.42, heroY + 0.6, -8.98]} rotationY={-2.9} squash={t >= boingAt ? -0.2 : 0.12} />
            {t >= boingAt ? (
              <>
                <SoundRings position={[0.85, blockTop, -8.45]} t={t - boingAt} color="#9dff70" reach={2.2} />
                <Bits position={[0.85, blockTop, -8.45]} t={t - boingAt} color="#9dff70" count={16} power={1.35} />
                <Puffs position={[0.85, blockTop, -8.45]} count={12} color="#c5ff9e" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
