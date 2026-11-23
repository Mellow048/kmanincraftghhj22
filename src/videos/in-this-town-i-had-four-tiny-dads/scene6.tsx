import { Block, Glow, Tree, Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, DOCK_Y, RIVERBED_Y, WATER_Y } from "./marks";
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
  SnappingBridgeRope,
  SoundRings,
  TinyDad,
  WEST,
  Wheelbarrow,
  blendPose,
  carryDadsPose,
  pop,
  sceneImpact,
  shovePose,
  skyJoyPose,
  slimeBlockTopY,
  slimeBounce,
  timing,
  tripOverLedgePose,
  tw,
  w,
  windmillFallPose,
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
        on: [0, BRIDGE_Y + 0.85, -1.35],
        onTo: [0.15, BRIDGE_Y + 0.88, -3.35],
        dist: 4.55,
        to: 3.6,
        yaw: 154,
        pitch: 13,
        fov: 44,
        fovTo: 40,
      }),
      shake: 0.022,
      note: "Full-sprint pursuit toward the north bridgehead while the 3-Wheel Covered Slime Cart waits down on the waterside dock!",
      stage: (t, { p }) => {
        const dist = p * 2.15;
        const z = -1.35 - dist;
        const bob = Math.abs(Math.sin(dist * 6.5)) * 0.055;
        const swing = Math.sin(t * 13);
        const gz = 0.55 - p * 2.15;
        return (
          <>
            {/* Continuity plant: the dads' 3-Wheel Covered Cart parked down on the waterside dock! */}
            <Wheelbarrow position={[3.28, DOCK_Y, -3.45]} rotationY={0.28} covered withSlimeBlock />
            <Hero
              position={[0, BRIDGE_Y, z]}
              rotationY={NORTH}
              pose={carryDadsPose(dist * 1.3)}
              plantFeet
              face="brave"
            />
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
        on: [1.15, BRIDGE_Y + 0.78, -4.15],
        dist: 4.35,
        distTo: 3.25,
        yaw: 146,
        yawTo: 168,
        pitch: 16,
        pitchTo: 9,
        fov: 43,
      }),
      shake: 0.02,
      impacts: [sceneImpact("6.scoop", "6.pin", "knocked", 0.068, 0.34)],
      note: "Hero slams the wooden structural pin out of the east bridge post (`z = -4.58`, zero bar/post collision) as the Golem thunders onto the center span!",
      stage: (t, { p }) => {
        const hitAt = w("6.pin", "knocked");
        const stepIn = tw(t, 0, Math.max(0.18, hitAt));
        const fly = tw(t, Math.max(0.12, hitAt - 0.04), hitAt + 0.42);
        return (
          <>
            <Wheelbarrow position={[3.28, DOCK_Y, -3.45]} rotationY={0.28} covered withSlimeBlock />
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={1.42} pinOut={fly * 1.95} />
            <Hero
              position={[1.18 + stepIn * 0.18, BRIDGE_Y, -4.58]}
              rotationY={EAST - 0.35}
              pose={shovePose(t, hitAt)}
              plantFeet
              face="brave"
            />
            <RogueGolem
              position={[0.12, BRIDGE_Y, 0.35 - p * 1.25]}
              rotationY={NORTH}
              walk={p * 2.9}
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
        from: [-2.35, BRIDGE_Y + 2.15, -3.65],
        on: [0.35, BRIDGE_Y + 0.85, -0.35],
        onTo: [0.45, WATER_Y + 0.55, 0.25],
        fov: 46,
        fovTo: 42,
      }),
      shake: 0.025,
      impacts: [
        sceneImpact("6.scoop", "6.drop", "fell", 0.082, 0.44),
        sceneImpact("6.scoop", "6.drop", "swim", 0.058, 0.34),
      ],
      note: "TRUE BRIDGE COLLAPSE: the entire 6.5m center bridge span hinges down and crashes into the river out from under the flailing Iron Golem!",
      stage: (t) => {
        const fallAt = w("6.drop", "fell");
        const dropSpan = tw(t, 0.02, Math.max(0.48, fallAt + 0.36));
        const plunge = tw(t, 0.06, Math.max(0.62, fallAt + 0.65));
        // Collapsing bridge span hinges at south pier `[0, BRIDGE_Y - 0.16, 4.35]` with negative X rotation so north end (`z = -2.1`) drops underwater!
        const spanTilt = -dropSpan * 0.56;
        const spanSink = dropSpan * 0.45;
        // Golem stands at `z = 0.25` and plummets faster/above the dropping span into the open water (`y >= -0.40`, safely above `-0.50` stone floor!)
        const gy = Math.max(-0.38, BRIDGE_Y + 0.12 * Math.sin(plunge * Math.PI) - plunge * plunge * 1.62);
        const b = (ph: number) => slimeBounce(t, 3.0, 0.2, ph);
        return (
          <>
            <Wheelbarrow position={[3.28, DOCK_Y, -3.45]} rotationY={0.28} covered withSlimeBlock />
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={1.42} pinOut={1.95} />

            {/* Actual Collapsing Center Bridge Span (placed well below Golem's dropping feet so zero OBB collision!) */}
            <group position={[0, BRIDGE_Y - 0.18 - spanSink - plunge * 0.35, 4.35]} rotation={[spanTilt, 0, 0]}>
              <Vox kind="darkPlanks" tint="#7c5d3b" position={[0, 0, -3.15]} size={[4.3, 0.28, 6.3]} />
              <Vox kind="planks" position={[-2.05, 0.58, -3.15]} size={[0.14, 0.1, 6.1]} />
            </group>

            {/* Flying splintered breakaway planks off the sides (`|x| >= 1.45` away from Golem!) */}
            {[-1.55, 1.55].map((sx, i) => (
              <Vox
                key={i}
                kind="darkPlanks"
                tint="#7c5d3b"
                position={[
                  sx * (1 + dropSpan * 0.25),
                  BRIDGE_Y - 0.1 - dropSpan * dropSpan * 1.45,
                  -1.65 + i * 0.35,
                ]}
                rotation={[-dropSpan * 1.35, sx * dropSpan * 0.4, sx * dropSpan * 0.65]}
                size={[0.68, 0.12, 0.42]}
              />
            ))}

            {/* Hero & 4 tiny dads safe on the standing north bridgehead ledge (`z = -2.75`) */}
            <Hero position={[0.48, BRIDGE_Y, -2.75]} rotationY={0.18} animation="leanOver" plantFeet face="wow" />
            <TinyDad which={1} position={[-0.22, BRIDGE_Y, -2.85]} rotationY={0.22} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[-0.74, BRIDGE_Y, -2.95]} rotationY={0.25} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[1.12, BRIDGE_Y, -2.88]} rotationY={-0.18} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[0.12, BRIDGE_Y, -3.38]} rotationY={0.15} hop={b(0.75).hop} squash={b(0.75).squash} />

            {/* Flailing Rogue Golem plummeting straight into the river! */}
            <RogueGolem
              position={[0.25, gy, 0.35]}
              rotationY={NORTH + plunge * 0.35}
              walk={t * 5.8}
              armR={-2.05 + Math.sin(t * 17) * 0.72}
              armL={-2.05 - Math.sin(t * 17) * 0.72}
              bow={-0.18 + plunge * 0.36}
            />
            {plunge > 0.35 ? (
              <>
                <SoundRings position={[0.25, WATER_Y + 0.08, 0.35]} t={plunge * 1.15} color="#9beeff" reach={2.5} />
                <Bits position={[0.25, WATER_Y + 0.24, 0.35]} t={Math.max(0.02, t - 0.18)} color="#9beeff" count={30} power={1.95} />
                <Puffs position={[0.25, WATER_Y + 0.36, 0.35]} count={16} color="#dff8ff" />
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
      note: "Comedy riverbed crash (`y = RIVERBED_Y`): Golem slams onto the silt floor and tracks three bright orange Fish swimming cleanly in front of its nose!",
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
        on: [1.95, 1.05, -3.25],
        onTo: [2.85, 0.78, -3.42],
        dist: 5.35,
        distTo: 4.35,
        yaw: -136,
        yawTo: -158,
        pitch: 24,
        pitchTo: 15,
        fov: 46,
      }),
      shake: 0.022,
      impacts: [
        sceneImpact("6.scoop", "6.rope", "snapping", 0.064, 0.32),
        sceneImpact("6.scoop", "6.rope", "pulled", 0.056, 0.3),
      ],
      note: "BELIEVABLE ANKLE-SNAG TRIP + VISIBLE CART BELOW: snapping bridge rope whips Hero's ankle, tripping him head-over-heels off the north-east ledge directly toward the 3-Wheel Covered Cart on the waterside dock!",
      stage: (t) => {
        const snapAt = w("6.rope", "snapping");
        const yankAt = Math.max(0.28, w("6.rope", "pulled"));
        const snap = tw(t, 0.02, Math.max(0.24, snapAt + 0.16));
        const trip = tw(t, Math.max(0.14, snapAt), yankAt + 0.22);
        const over = tw(t, Math.max(0.24, yankAt - 0.06), yankAt + 0.56);
        const drop = tw(t, yankAt + 0.38, yankAt + 0.88);
        // Vault cleanly over `x = 2.20` (`hy >= BRIDGE_Y + 0.08` until `hx > 2.55`) directly above `[3.28, DOCK_Y, -3.45]`!
        const hx = 1.38 + over * 1.52 + drop * 0.32;
        const hy = BRIDGE_Y + Math.sin(over * Math.PI) * 0.56 - drop * drop * 0.48;
        const hz = -3.12 - over * 0.28;
        return (
          <>
            {/* The 3-Wheel Covered Slime Cart visibly waiting right below the ledge on the waterside dock! */}
            <Wheelbarrow position={[3.28, DOCK_Y, -3.45]} rotationY={0.28} covered withSlimeBlock />

            {/* Whipping bridge-rigging rope anchored outside actor box (`z = -3.72`) so zero OBB overlap while visibly lashing behind Hero's heel! */}
            <SnappingBridgeRope
              anchor={[1.98, BRIDGE_Y + 0.22, -3.86]}
              ankleTarget={[Math.min(2.15, hx - 0.24), BRIDGE_Y + 0.14, -3.52]}
              snap={snap}
            />
            {snap > 0.18 && snap < 0.85 ? (
              <>
                <Bits position={[1.72, BRIDGE_Y + 0.22, -3.38]} t={Math.max(0.02, t - 0.08)} color="#ffd97d" count={14} power={1.2} />
                <Puffs position={[1.55, BRIDGE_Y + 0.14, -3.28]} count={6} color="#f5e6c4" />
              </>
            ) : null}

            {/* Hero actively trips (`legR` yanked back, arms windmilling wide) and tumbles over the east ledge! */}
            <Hero
              position={[hx, hy, hz]}
              rotationY={EAST - 0.18 + over * 0.45}
              pose={tripOverLedgePose(t, trip, over)}
              plantFeet={trip < 0.18}
              face={trip > 0.1 ? "fear" : "wow"}
            />

            {/* All 4 tiny dads fly loose in clean non-overlapping trajectories — with #3 already slipping lower toward the cart! */}
            <TinyDad which={1} position={[hx - 0.54, hy + 0.48, hz + 0.28]} rotationY={over * 2.4} squash={-0.16 * over} mood="scared" />
            <TinyDad which={2} position={[hx - 0.48, hy + 0.56, hz - 0.42]} rotationY={-over * 2.2} squash={-0.16 * over} mood="scared" />
            <TinyDad
              which={3}
              position={[hx + 0.46, Math.max(DOCK_Y + 0.96, hy + 0.22 - drop * 0.42), hz - 0.04]}
              rotationY={over * 3.8}
              squash={-0.2 * over}
              mood="scared"
            />
            <TinyDad which={4} position={[hx + 0.48, hy + 0.62, hz + 0.36]} rotationY={-over * 2.6} squash={-0.16 * over} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [3.22, 1.35, -3.45],
        onTo: [3.28, 0.76, -3.45],
        dist: 4.45,
        distTo: 3.35,
        yaw: 144,
        yawTo: 168,
        pitch: 24,
        pitchTo: 13,
        fov: 44,
      }),
      impacts: [sceneImpact("6.scoop", "6.three", "wheelbarrow", 0.052, 0.3)],
      note: "CONTINUOUS WATERSIDE DOCK IMPACT: Dad #3 tumbles ahead of windmilling Hero, bounces squish-first off the top of the 3-Wheel Covered Cart, tipping the cart and popping the sheet loose!",
      stage: (t) => {
        const hitAt = w("6.three", "wheelbarrow");
        const fallIn = tw(t, 0, Math.max(0.32, hitAt));
        const rebound = tw(t, Math.max(0.28, hitAt - 0.04), hitAt + 0.48);
        // Dad #3 arcs down onto `y = DOCK_Y + 0.94` (cleanly on top of the wool cover at `DOCK_Y + 0.85` -> 0 OBB penetration!) then bounces off to `x = 2.42`!
        const d3x = 3.22 - rebound * 0.82;
        const d3y =
          rebound <= 0.01
            ? 2.25 - fallIn * 1.14
            : (DOCK_Y + 1.02) * (1 - rebound) + DOCK_Y * rebound + Math.sin(rebound * Math.PI) * 0.42;
        const d3z = -3.38 + rebound * 0.22;
        return (
          <>
            <Wheelbarrow
              position={[3.28 + rebound * 0.38, DOCK_Y, -3.45]}
              rotationY={0.28 + rebound * 0.25}
              rollZ={-rebound * 0.28}
              wheelSpin={rebound * 3.8}
              covered
              sheetFly={rebound * 0.38}
              withSlimeBlock
            />
            <Glow position={[3.28, DOCK_Y + 0.55, -3.45]} size={0.8 + rebound * 0.9} color="#8eff62" opacity={0.28 * rebound} />

            <TinyDad
              which={3}
              position={[d3x, d3y, d3z]}
              rotationY={fallIn * 3.2 + rebound * 2.4}
              squash={pop(t, hitAt, 0.26) * 0.44 - (1 - fallIn) * 0.18}
              mood={rebound > 0.6 ? "happy" : "scared"}
            />

            {/* Windmilling Hero & Dads #1, #2, #4 actively tumbling down right above the cart! */}
            <Hero
              position={[3.15, 3.05 - (fallIn * 0.65 + rebound * 0.48), -3.42]}
              rotationY={2.75}
              pose={windmillFallPose(t)}
              face="wow"
            />
            <TinyDad which={1} position={[2.52, 3.18 - (fallIn * 0.62 + rebound * 0.45), -3.18]} rotationY={t * 3.5} squash={-0.16} mood="scared" />
            <TinyDad which={2} position={[3.78, 3.24 - (fallIn * 0.62 + rebound * 0.45), -3.22]} rotationY={-t * 3.5} squash={-0.16} mood="scared" />
            <TinyDad which={4} position={[3.18, 3.58 - (fallIn * 0.62 + rebound * 0.45), -3.88]} rotationY={t * 3.0} squash={-0.16} mood="scared" />

            {rebound > 0.05 ? (
              <>
                <Puffs position={[3.28, DOCK_Y + 0.92, -3.45]} count={8} color="#f5ebd4" />
                <Bits position={[3.28, DOCK_Y + 0.88, -3.45]} t={Math.max(0.02, t - hitAt + 0.05)} color="#9dff70" count={12} power={1.1} />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({
        on: [3.22, DOCK_Y + 0.82, -3.45],
        onTo: [3.22, DOCK_Y + 1.12, -3.45],
        dist: 4.65,
        distTo: 3.75,
        yaw: -144,
        yawTo: -168,
        pitch: 19,
        pitchTo: 10,
        fov: 44,
      }),
      impacts: [sceneImpact("6.scoop", "6.block", "flew", 0.048, 0.3)],
      note: "SAME WATERSIDE DOCK REVEAL: the tipped 3-Wheel Cart rolls aside as the sheet whips off the glowing green Slime Block right beneath windmilling Hero!",
      stage: (t) => {
        const fly = tw(t, 0.02, w("6.block", "flew") + 0.32);
        const dropHero = tw(t, 0.04, 1.18);
        const b3 = slimeBounce(t, 3.1, 0.22, 0.1);
        const sq = pop(t, 0.16, 0.28) * 0.26;
        const scale = 0.9 + fly * 0.12;
        const topY = slimeBlockTopY(DOCK_Y, scale, sq);
        const heroY = Math.max(topY + 0.12, 2.55 - dropHero * 1.28);
        return (
          <>
            {/* Tipped 3-Wheel Cart rolled safely clear (`x = 4.28`) */}
            <Wheelbarrow
              position={[4.18 + fly * 0.18, DOCK_Y, -3.62]}
              rotationY={0.62}
              rollZ={-0.42}
              wheelSpin={4.2 + fly * 2.2}
            />
            <SlimeBlockProp position={[3.22, DOCK_Y, -3.45]} scale={scale} glow={0.55 + fly * 0.45} squash={sq} />
            <Glow position={[3.22, DOCK_Y + 0.58, -3.45]} size={1.25 + fly * 1.35} color="#8eff62" opacity={0.2 + fly * 0.24} />

            {/* White canvas sheet billowing high & clear (`y >= 1.45, x -> 1.35`) */}
            <Vox
              kind="wool"
              tint="#ebe4d2"
              position={[2.95 - fly * 1.85, 1.48 + fly * 1.15, -3.25 + fly * 0.75]}
              rotation={[fly * 1.7, fly * 1.9, fly * 1.3]}
              size={[0.84, 0.07, 0.92]}
            />

            <TinyDad which={3} position={[2.32, DOCK_Y, -3.28]} rotationY={2.4} hop={b3.hop} squash={b3.squash} mood="happy" />
            <Hero
              position={[3.22, heroY, -3.45]}
              rotationY={2.8}
              pose={windmillFallPose(t)}
              face="wow"
            />
            <TinyDad which={1} position={[2.62, heroY + 0.24, -3.22]} rotationY={2.7} squash={-0.16} mood="scared" />
            <TinyDad which={2} position={[3.82, heroY + 0.28, -3.22]} rotationY={-2.7} squash={-0.16} mood="scared" />
            <TinyDad which={4} position={[3.22, heroY + 0.58, -3.95]} rotationY={2.9} squash={-0.16} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.boing",
      zone: "bridge",
      look: "overworld-night",
      ...cam.pan({
        from: [-0.85, 1.95, -7.85],
        on: [3.22, DOCK_Y + 1.05, -3.45],
        onTo: [1.85, 4.35, -5.25],
        fov: 46,
        fovTo: 43,
      }),
      impacts: [sceneImpact("6.scoop", "6.boing", "bounced", 0.072, 0.38)],
      note: "SKY-HIGH RIVERSIDE DOCK CATAPULT: Hero & all 4 dads squash the glowing Slime Block on the dock and rocket in a high arc back above the bridge & swamp trees!",
      stage: (t) => {
        const boingAt = Math.max(0.18, w("6.boing", "bounced") - 0.08);
        const sq = pop(t, boingAt, 0.34) * 0.56;
        const blockTop = slimeBlockTopY(DOCK_Y, 1.02, sq);
        const drop = tw(t, 0, boingAt);
        const up = tw(t, boingAt, Math.max(0.92, boingAt + 0.85));
        const joyBlend = tw(t, Math.max(0, boingAt - 0.06), boingAt + 0.18);
        const hx = 3.22 - up * 1.35;
        const hz = -3.45 - up * 1.75;
        const hy = t < boingAt ? blockTop + (1 - drop) * 0.58 : blockTop + up * 3.15 + Math.sin(up * Math.PI) * 0.78;
        return (
          <>
            {/* Wide-set swamp trees on the north bank framing the skyward bounce with zero leaf clipping! */}
            <Tree position={[0.45, 0, -8.85]} height={2.95} leaf="#3b7830" />
            <Tree position={[5.65, 0, -7.25]} height={3.15} leaf="#448537" />
            <SlimeBlockProp position={[3.22, DOCK_Y, -3.45]} scale={1.02} glow={1} squash={sq} />
            <Hero
              position={[hx, hy, hz]}
              rotationY={2.85 + up * 0.35}
              pose={blendPose(windmillFallPose(t), skyJoyPose(t), joyBlend)}
              face={joyBlend > 0.4 ? "grin" : "wow"}
            />
            <TinyDad which={1} position={[hx - 0.68, hy + 0.06, hz + 0.14]} rotationY={2.8} squash={t >= boingAt ? -0.2 : 0.14} />
            <TinyDad which={2} position={[hx + 0.68, hy + 0.08, hz + 0.14]} rotationY={-2.8} squash={t >= boingAt ? -0.2 : 0.14} />
            <TinyDad which={3} position={[hx - 0.55, hy + 0.56, hz - 0.52]} rotationY={2.9} squash={t >= boingAt ? -0.2 : 0.14} />
            <TinyDad which={4} position={[hx + 0.55, hy + 0.58, hz - 0.52]} rotationY={-2.9} squash={t >= boingAt ? -0.2 : 0.14} />
            {t >= boingAt ? (
              <>
                <SoundRings position={[3.22, blockTop, -3.45]} t={t - boingAt} color="#9dff70" reach={2.25} />
                <Bits position={[3.22, blockTop, -3.45]} t={t - boingAt} color="#9dff70" count={18} power={1.4} />
                <Puffs position={[3.22, blockTop, -3.45]} count={12} color="#c5ff9e" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
