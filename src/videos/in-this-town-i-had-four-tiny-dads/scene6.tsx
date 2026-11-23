import { Block, Glow, Tree, Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, DOCK_Y, RIVERBED_Y, WATER_Y } from "./marks";
import {
  Bits,
  BridgePinPost,
  EAST,
  FallStreaks,
  Fish,
  Hero,
  NORTH,
  Puffs,
  RogueGolem,
  SOUTH,
  SnappingBridgeRope,
  SoundRings,
  TinyDad,
  WEST,
  Wheelbarrow,
  blendPose,
  carryDadsPose,
  cartSlimeTopY,
  pop,
  sceneImpact,
  shovePose,
  skyJoyPose,
  slimeBounce,
  slimeHopTo,
  timing,
  tripOverLedgePose,
  tw,
  w,
  windmillFallPose,
} from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Dropping The Bridge & The Heroic Sunset Cart Catch",
  shots: [
    {
      cue: "6.scoop",
      zone: "bridge",
      look: "overworld-sunset",
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
      note: "Full-sprint sunset pursuit toward the north bridgehead while the covered cart sits parked far back up the lower boardwalk (`z = -7.45`)!",
      stage: (t, { p }) => {
        const dist = p * 2.15;
        const z = -1.35 - dist;
        const bob = Math.abs(Math.sin(dist * 6.5)) * 0.055;
        const swing = Math.sin(t * 13);
        const gz = 0.55 - p * 2.15;
        return (
          <>
            {/* Parked WAY back up the lower boardwalk (`z = -7.45`) — NOT magically sitting at the `-3.45` drop spot! */}
            <Wheelbarrow
              position={[3.55, DOCK_Y, -7.45]}
              rotationY={SOUTH}
              covered
              withSlimeBlock
              slimeScale={0.88}
            />
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
            <Puffs position={[0.2, BRIDGE_Y + 0.14, gz - 0.35]} count={7} color="#ffe3ba" />
          </>
        );
      },
    },
    {
      cue: "6.pin",
      zone: "bridge",
      look: "overworld-sunset",
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
      note: "Hero slams the wooden structural pin out of the east bridge post as Dad #1 (straw hat) hops urgently down the north approach toward their cart!",
      stage: (t, { p }) => {
        const hitAt = w("6.pin", "knocked");
        const stepIn = tw(t, 0, Math.max(0.18, hitAt));
        const fly = tw(t, Math.max(0.12, hitAt - 0.04), hitAt + 0.42);
        const d1Run = slimeHopTo([0.42, BRIDGE_Y, -4.85], [1.15, 0.85, -5.65], p, 3, 0.28);
        return (
          <>
            <Wheelbarrow
              position={[3.55, DOCK_Y, -7.45]}
              rotationY={SOUTH}
              covered
              withSlimeBlock
              slimeScale={0.88}
            />
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={1.42} pinOut={fly * 1.95} />
            <Hero
              position={[1.18 + stepIn * 0.18, BRIDGE_Y, -4.58]}
              rotationY={EAST - 0.35}
              pose={shovePose(t, hitAt)}
              plantFeet
              face="brave"
            />
            {/* Dad #1 already hopping down toward the riverside boardwalk cart! */}
            <TinyDad which={1} position={d1Run.position} rotationY={NORTH + 0.4} hop={d1Run.hop} squash={d1Run.squash} mood="angry" />
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
      look: "overworld-sunset",
      ...cam.pan({
        from: [-2.55, BRIDGE_Y + 2.25, -3.85],
        on: [0.35, BRIDGE_Y + 0.65, -0.35],
        onTo: [0.45, WATER_Y + 0.95, 0.25],
        fov: 46,
        fovTo: 42,
      }),
      shake: 0.028,
      impacts: [
        sceneImpact("6.scoop", "6.drop", "fell", 0.085, 0.45),
        sceneImpact("6.scoop", "6.drop", "swim", 0.062, 0.35),
      ],
      note: "MASSIVE 4-METER SUNSET GORGE COLLAPSE: the 6.3m center bridge span drops away, plunging the flailing Iron Golem 4 meters down into the deep river canyon while Dad #1 reaches the cart handles far up the boardwalk!",
      stage: (t) => {
        const fallAt = w("6.drop", "fell");
        const dropSpan = tw(t, 0.02, Math.max(0.48, fallAt + 0.36));
        const plunge = tw(t, 0.06, Math.max(0.68, fallAt + 0.72));
        const spanTilt = -dropSpan * 0.68;
        const spanSink = dropSpan * 1.65;
        const gy = Math.max(WATER_Y + 0.15, BRIDGE_Y + 0.14 * Math.sin(plunge * Math.PI) - plunge * plunge * 4.05);
        const b = (ph: number) => slimeBounce(t, 3.0, 0.2, ph);
        return (
          <>
            {/* Far back up the lower boardwalk (`z = -7.45`), Dad #1 arrives behind the cart handles! */}
            <Wheelbarrow
              position={[3.55, DOCK_Y, -7.45]}
              rotationY={SOUTH}
              covered
              withSlimeBlock
              slimeScale={0.88}
            />
            <TinyDad which={1} position={[3.55, DOCK_Y, -8.52]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} mood="angry" />

            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={1.42} pinOut={1.95} />

            {/* Collapsing 6.3m Center Bridge Span plunging into the 4m gorge */}
            <group position={[0, BRIDGE_Y - 0.24 - spanSink - plunge * 0.85, 4.35]} rotation={[spanTilt, 0, 0]}>
              <Vox kind="darkPlanks" tint="#7c5d3b" position={[0, 0, -3.15]} size={[4.3, 0.28, 6.3]} />
              <Vox kind="planks" position={[-2.05, 0.58, -3.15]} size={[0.14, 0.1, 6.1]} />
            </group>

            {/* Splintered planks tumbling into the gorge */}
            {[-1.55, 1.55].map((sx, i) => (
              <Vox
                key={i}
                kind="darkPlanks"
                tint="#7c5d3b"
                position={[
                  sx * (1 + dropSpan * 0.25),
                  BRIDGE_Y - 0.1 - dropSpan * dropSpan * 3.15,
                  -1.65 + i * 0.35,
                ]}
                rotation={[-dropSpan * 1.65, sx * dropSpan * 0.4, sx * dropSpan * 0.75]}
                size={[0.68, 0.12, 0.42]}
              />
            ))}

            {/* Taut groaning bridge rigging cable already visibly trailing behind Hero's boots! */}
            <SnappingBridgeRope
              anchor={[1.98, BRIDGE_Y + 0.18, -3.86]}
              ankleTarget={[1.25, BRIDGE_Y + 0.1, -3.48]}
              snap={0.05}
            />

            {/* Hero & Dads #2, #3, #4 peering over the broken north bridgehead (`z = -2.75`) */}
            <Hero position={[0.52, BRIDGE_Y, -2.75]} rotationY={0.18} animation="leanOver" plantFeet face="wow" />
            <TinyDad which={2} position={[-0.58, BRIDGE_Y, -2.92]} rotationY={0.25} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[1.22, BRIDGE_Y, -2.88]} rotationY={-0.18} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[0.08, BRIDGE_Y, -3.38]} rotationY={0.15} hop={b(0.75).hop} squash={b(0.75).squash} />

            {/* Flailing Rogue Golem plummeting 4 meters straight into the deep river gorge! */}
            <RogueGolem
              position={[0.25, gy, 0.35]}
              rotationY={NORTH + plunge * 0.42}
              walk={t * 6.2}
              armR={-2.15 + Math.sin(t * 18) * 0.78}
              armL={-2.15 - Math.sin(t * 18) * 0.78}
              bow={-0.22 + plunge * 0.42}
            />
            {plunge > 0.42 ? (
              <>
                <SoundRings position={[0.25, WATER_Y + 0.08, 0.35]} t={plunge * 1.15} color="#ffd998" reach={2.8} />
                <Bits position={[0.25, WATER_Y + 0.28, 0.35]} t={Math.max(0.02, t - 0.22)} color="#9beeff" count={34} power={2.25} />
                <Puffs position={[0.25, WATER_Y + 0.42, 0.35]} count={18} color="#fff4dc" />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "6.sink",
      zone: "riverbed",
      look: "overworld-sunset",
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
      note: "Sunset-lit riverbed crash: Golem slams onto the silt floor and blankly tracks three bright orange Fish swimming past its nose!",
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
                color="#fff3d6"
              />
            ))}
            {land > 0.65 ? (
              <>
                <Puffs position={[-0.25, 0.22, 0]} count={12} color="#ffe7ba" />
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
      look: "overworld-sunset",
      ...cam.orbit({
        on: [1.75, BRIDGE_Y + 0.52, -3.32],
        onTo: [3.35, -0.58, -3.85],
        dist: 4.15,
        distTo: 5.55,
        yaw: -144,
        yawTo: -162,
        pitch: 18,
        pitchTo: 42,
        fov: 45,
      }),
      fovTo: 48,
      shake: 0.032,
      impacts: [
        sceneImpact("6.scoop", "6.rope", "snapping", 0.082, 0.36),
        sceneImpact("6.scoop", "6.rope", "pulled", 0.075, 0.36),
      ],
      note: "HEART-STOPPING 'OH NO!!' CLIFF PLUNGE: snapping cable violently yanks Hero's ankle -> Hero grabs a crumbling cliff stone that RIPS LOOSE -> Hero pitches HEADFIRST (135° full-3D tumble + wind streaks!) over the 4m cliff toward EMPTY planks while Dad #1 frantically sprint-pushes the cart from `z = -7.35`!",
      stage: (t, { p }) => {
        const snapAt = Math.min(0.22, w("6.rope", "snapping"));
        const yankAt = Math.max(0.26, Math.min(0.55, w("6.rope", "pulled")));
        const snap = tw(t, 0.01, snapAt + 0.16);
        const yank = tw(t, Math.max(0.06, snapAt - 0.04), yankAt + 0.16);
        // Brief 0.18s cliff-edge grab stutter (`t = 0.28..0.46`) before the stone rips free and Hero plummets headfirst!
        const plunge = tw(t, Math.max(0.36, yankAt), 1.44);
        const vault = tw(t, Math.max(0.14, snapAt + 0.04), Math.max(0.62, yankAt + 0.34));

        // Vault cleanly past `x = 2.24` cliff wall (`centerY >= 1.82` while `hx < 2.75`), then plummet 2.3m headfirst!
        const hx = 1.48 + vault * 1.92 + plunge * 0.15;
        const centerY =
          BRIDGE_Y +
          0.48 +
          Math.sin(vault * Math.PI) * 0.44 -
          plunge * plunge * 2.35;
        const hz = -3.18 - vault * 0.27;

        // Full 3D body somersault pitch: jerks forward (`+0.85 rad` on ankle yank), then pitches HEADFIRST (`+2.42 rad` / 139°)!
        const tumblePitch = yank * 0.78 + plunge * 1.64;
        const tumbleRoll = -yank * 0.18 + Math.sin(plunge * Math.PI * 1.5) * 0.34;

        // Down on the boardwalk (`DOCK_Y = -2.68`), Dad #1 is FRANTICALLY sprint-shoving the cart from `z = -7.35` -> `-5.35`!
        const cartZ = -7.35 + p * 2.0;
        const pushHop = slimeBounce(t, 4.4, 0.16, 0);

        // Crumbling cliff-edge cobble stone ripping free at `plunge > 0.05` and plummeting into the gorge!
        const rockDrop = tw(t, Math.max(0.34, yankAt - 0.02), 1.42);
        return (
          <>
            {/* Dad #1 (straw hat) racing at full speed down the boardwalk shoving the covered cart toward the empty drop zone! */}
            <Wheelbarrow
              position={[3.55, DOCK_Y, cartZ]}
              rotationY={SOUTH}
              wheelSpin={p * 16}
              tilt={0.05 + Math.sin(t * 20) * 0.025}
              covered
              withSlimeBlock
              slimeScale={0.88}
            />
            <TinyDad
              which={1}
              position={[3.55, DOCK_Y, cartZ - 1.06]}
              rotationY={SOUTH}
              hop={pushHop.hop}
              squash={pushHop.squash + 0.12}
              nod={0.22}
              mood="angry"
            />
            <Puffs position={[3.55, DOCK_Y + 0.12, cartZ - 1.28]} count={7} color="#f5e1be" />

            {/* Whipping snapped bridge cable lashing behind Hero's ankle on the bridgehead! */}
            <SnappingBridgeRope
              anchor={[1.98, BRIDGE_Y + 0.22, -3.88]}
              ankleTarget={[Math.min(2.18, hx - 0.32), BRIDGE_Y + 0.18, -3.56]}
              snap={snap}
            />
            {snap > 0.12 && snap < 0.85 ? (
              <>
                <Bits position={[1.76, BRIDGE_Y + 0.24, -3.42]} t={Math.max(0.02, t - 0.04)} color="#ffcf6e" count={18} power={1.55} />
                <Puffs position={[1.65, BRIDGE_Y + 0.16, -3.32]} count={8} color="#fff0cf" />
              </>
            ) : null}

            {/* Ripped-free cliff-edge cobble block + falling rubble chunks tumbling down into the gorge! */}
            {rockDrop > 0.02 ? (
              <>
                <Vox
                  kind="cobble"
                  tint="#6c7568"
                  position={[2.48 + rockDrop * 0.35, BRIDGE_Y + 0.05 - rockDrop * rockDrop * 3.1, -2.55]}
                  rotation={[rockDrop * 3.2, rockDrop * 2.1, rockDrop * 2.6]}
                  size={[0.26, 0.22, 0.26]}
                />
                <Bits position={[2.22, BRIDGE_Y + 0.08, -2.85]} t={rockDrop * 0.9} color="#8e9688" count={14} power={1.3} />
              </>
            ) : null}

            {/* Rushing vertical wind streaks once Hero pitches headfirst over the cliff! */}
            {plunge > 0.18 ? <FallStreaks position={[hx, centerY, hz]} t={t} count={12} radius={0.86} span={2.1} /> : null}

            {/* FULL 3D HEADFIRST TUMBLING HERO (`center-of-mass` group pitch + roll + frantic flailing limbs!) */}
            <group position={[hx, centerY, hz]} rotation={[tumblePitch, EAST - 0.12 + plunge * 0.45, tumbleRoll]}>
              <group position={[0, -0.47, 0]}>
                <Hero
                  position={[0, 0, 0]}
                  rotationY={0}
                  pose={tripOverLedgePose(t, yank, plunge)}
                  face="fear"
                />
              </group>
            </group>

            {/* Dads #2, #3, #4 launched into panicked freefall arcs — with #3 diving steepest ahead! */}
            <TinyDad
              which={2}
              position={[Math.max(2.65, hx - 0.58), centerY + 0.58, hz - 0.52]}
              rotationY={-plunge * 3.2}
              squash={-0.22 * plunge}
              mood="scared"
            />
            <TinyDad
              which={3}
              position={[hx + 0.58, centerY - 0.15 - plunge * 0.48, hz + 0.08]}
              rotationY={plunge * 4.6}
              squash={-0.26 * plunge}
              mood="scared"
            />
            <TinyDad
              which={4}
              position={[hx + 0.54, centerY + 0.64, hz + 0.56]}
              rotationY={-plunge * 3.6}
              squash={-0.22 * plunge}
              mood="scared"
            />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [3.55, DOCK_Y + 1.65, -4.35],
        onTo: [3.55, DOCK_Y + 1.25, -3.55],
        dist: 5.35,
        distTo: 4.15,
        yaw: 142,
        yawTo: 166,
        pitch: 22,
        pitchTo: 12,
        fov: 46,
      }),
      shake: 0.024,
      impacts: [sceneImpact("6.scoop", "6.three", "wheelbarrow", 0.058, 0.32)],
      note: "HEROIC CART INTERCEPT + #3 SHEET SNAG: Dad #1 sprints full-tilt behind the handles ramming the covered cart (`z: -5.35 -> -3.53`) right underneath headfirst-plummeting Hero as Dad #3 slams onto the sheet!",
      stage: (t) => {
        const hitAt = w("6.three", "wheelbarrow");
        const pushIn = tw(t, 0, Math.max(0.45, hitAt));
        const fallIn = tw(t, 0, Math.max(0.38, hitAt));
        const rebound = tw(t, Math.max(0.32, hitAt - 0.04), hitAt + 0.48);

        // Dad #1 rams the cart from `z = -5.35` straight into the catch bullseye `z = -3.53` (`slime center = -3.45`)!
        const cartZ = -5.35 + pushIn * 1.82;
        const pushBounce = slimeBounce(t, 4.6, 0.15 * (1 - rebound * 0.7), 0.1);

        // Dad #3 plummets ahead of Hero, squishing onto the covered cart (`DOCK_Y + 1.62 = -1.06`, zero OBB hit!) and snagging the sheet!
        const d3x = 3.55 - rebound * 1.08;
        const d3y =
          rebound <= 0.01
            ? 0.45 - fallIn * 1.51
            : (DOCK_Y + 1.62) * (1 - rebound) + DOCK_Y * rebound + Math.sin(rebound * Math.PI) * 0.48;
        const d3z = cartZ + 0.08 + rebound * 0.14;

        // Hero hurtles fast & headfirst down through the sunset gorge (`centerY: +1.25 -> -0.12`) with continuous 3D tumble!
        const heroCenterY = 1.25 - (fallIn * 0.88 + rebound * 0.49);
        const tumblePitch = 2.42 + (fallIn + rebound) * 1.45;
        const tumbleRoll = 0.24 * Math.cos(t * 9);
        return (
          <>
            <Wheelbarrow
              position={[3.55, DOCK_Y, cartZ]}
              rotationY={SOUTH}
              wheelSpin={pushIn * 15}
              tilt={0.04 * (1 - rebound) - rebound * 0.06}
              rollZ={-rebound * 0.08}
              covered
              sheetFly={rebound * 0.34}
              withSlimeBlock
              slimeScale={0.88}
              slimeGlow={0.85}
            />
            <Glow position={[3.55, DOCK_Y + 0.88, cartZ + 0.08]} size={0.9 + rebound * 1.1} color="#8eff62" opacity={0.32 * rebound} />

            {/* Dad #1 heroically pushing the cart handles all the way into the drop zone! */}
            <TinyDad
              which={1}
              position={[3.55, DOCK_Y, cartZ - 1.06]}
              rotationY={SOUTH}
              hop={pushBounce.hop}
              squash={pushBounce.squash + 0.14}
              nod={0.2}
              mood={rebound > 0.5 ? "happy" : "angry"}
            />
            {pushIn < 0.98 ? <Puffs position={[3.55, DOCK_Y + 0.12, cartZ - 1.3]} count={8} color="#f5e1be" /> : null}

            {/* Dad #3 slamming onto the canvas cover and ripping it loose as he bounces clear! */}
            <TinyDad
              which={3}
              position={[d3x, d3y, d3z]}
              rotationY={fallIn * 3.8 + rebound * 2.6}
              squash={pop(t, hitAt, 0.26) * 0.48 - (1 - fallIn) * 0.2}
              mood={rebound > 0.6 ? "happy" : "scared"}
            />

            {/* Rushing speed streaks + headfirst-somersaulting Hero hurtling down overhead! */}
            <FallStreaks position={[3.55, heroCenterY, -3.45]} t={t} count={12} radius={0.88} span={2.2} />
            <group position={[3.55, heroCenterY, -3.45]} rotation={[tumblePitch, 2.75, tumbleRoll]}>
              <group position={[0, -0.47, 0]}>
                <Hero position={[0, 0, 0]} rotationY={0} pose={windmillFallPose(t)} face="fear" />
              </group>
            </group>

            <TinyDad which={2} position={[2.82, heroCenterY + 0.48, -3.15]} rotationY={-t * 4.2} squash={-0.2} mood="scared" />
            <TinyDad which={4} position={[4.28, heroCenterY + 0.56, -3.82]} rotationY={t * 4.2} squash={-0.2} mood="scared" />

            {rebound > 0.05 ? (
              <>
                <Puffs position={[3.55, DOCK_Y + 1.48, cartZ + 0.08]} count={9} color="#fff1d6" />
                <Bits position={[3.55, DOCK_Y + 1.42, cartZ + 0.08]} t={Math.max(0.02, t - hitAt + 0.05)} color="#9dff70" count={14} power={1.2} />
              </>
            ) : null}
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [3.55, DOCK_Y + 1.15, -3.55],
        onTo: [3.55, DOCK_Y + 1.35, -3.45],
        dist: 4.65,
        distTo: 3.65,
        yaw: -140,
        yawTo: -166,
        pitch: 19,
        pitchTo: 9,
        fov: 45,
      }),
      shake: 0.022,
      impacts: [sceneImpact("6.scoop", "6.block", "flew", 0.055, 0.32)],
      note: "SPLIT-SECOND UNVEIL INSIDE THE BRACED CART: Dad #1 locks the cart handles in place with wheel-skid puffs as the white sheet whips away, revealing the glowing Slime Block inside the cart milliseconds before tumbling Hero hits!",
      stage: (t) => {
        const fly = tw(t, 0.02, w("6.block", "flew") + 0.34);
        const dropHero = tw(t, 0.02, 1.35);
        const b1 = slimeBounce(t, 3.0, 0.14, 0.0);
        const b3 = slimeBounce(t, 3.2, 0.2, 0.35);
        const sq = pop(t, 0.14, 0.28) * 0.24;
        const topY = cartSlimeTopY(DOCK_Y, 0.88, sq);
        // Hero hurtles through the final 1.9m of freefall (`centerY: +1.12 -> topY + 0.56 = -0.80`), completing his flip right above the Slime Block!
        const heroCenterY = Math.max(topY + 0.56, 1.12 - dropHero * 1.92);
        const tumblePitch = 4.25 + dropHero * 1.92;
        return (
          <>
            {/* THE SAME CART braced squarely on the catch mark (`[3.55, DOCK_Y, -3.53]`) with the glowing Slime Block gleaming inside! */}
            <Wheelbarrow
              position={[3.55, DOCK_Y, -3.53]}
              rotationY={SOUTH}
              tilt={-0.03 * (1 - fly)}
              withSlimeBlock
              slimeScale={0.88}
              slimeSquash={sq}
              slimeGlow={0.75 + fly * 0.45}
            />
            <Glow position={[3.55, DOCK_Y + 0.95, -3.45]} size={1.35 + fly * 1.35} color="#8eff62" opacity={0.24 + fly * 0.26} />

            {/* Dad #1 bracing the rear wooden handles (`z = -4.59`) + skid puffs from stopping just in time! */}
            <TinyDad which={1} position={[3.55, DOCK_Y, -4.59]} rotationY={SOUTH} hop={b1.hop} squash={b1.squash + 0.1} mood="happy" />
            {fly < 0.55 ? <Puffs position={[3.55, DOCK_Y + 0.12, -3.88]} count={7} color="#f5e1be" /> : null}

            {/* White canvas sheet whipping dramatically clear across the left foreground (`x <= 2.55`, well clear of Hero!) */}
            <Vox
              kind="wool"
              tint="#ebe4d2"
              position={[2.55 - fly * 1.65, DOCK_Y + 1.55 + fly * 1.35, -2.78 + fly * 0.65]}
              rotation={[fly * 1.85, fly * 1.95, fly * 1.45]}
              size={[0.96, 0.08, 1.04]}
            />

            {/* Dad #3 cheering beside the cart (`x = 2.46`) */}
            <TinyDad which={3} position={[2.46, DOCK_Y, -3.35]} rotationY={EAST - 0.25} hop={b3.hop} squash={b3.squash} mood="happy" />

            {/* High-speed wind streaks + tumbling Hero hurtling straight down onto the Slime Block in the cart! */}
            <FallStreaks position={[3.55, heroCenterY, -3.45]} t={t} count={10} radius={0.86} span={1.95} />
            <group position={[3.55, heroCenterY, -3.45]} rotation={[tumblePitch, 2.8, Math.sin(t * 8) * 0.14]}>
              <group position={[0, -0.47, 0]}>
                <Hero position={[0, 0, 0]} rotationY={0} pose={windmillFallPose(t)} face="wow" />
              </group>
            </group>

            <TinyDad which={2} position={[2.82, heroCenterY + 0.38, -3.12]} rotationY={-2.7} squash={-0.18} mood="scared" />
            <TinyDad which={4} position={[4.28, heroCenterY + 0.44, -3.82]} rotationY={2.9} squash={-0.18} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.boing",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.pan({
        from: [-0.85, 1.45, -8.25],
        on: [3.55, DOCK_Y + 1.35, -3.45],
        onTo: [3.1, 4.75, -5.05],
        fov: 46,
        fovTo: 42,
      }),
      shake: 0.024,
      impacts: [sceneImpact("6.scoop", "6.boing", "bounced", 0.082, 0.4)],
      note: "EPIC 7-METER SUNSET GORGE CATAPULT: Hero slams into the Slime Block inside Dad #1's cart, compressing it deep and rocketing Hero + all 4 tiny dads high out of the gorge and above the swamp trees!",
      stage: (t) => {
        const boingAt = Math.max(0.18, w("6.boing", "bounced") - 0.08);
        const sq = pop(t, boingAt, 0.34) * 0.58;
        const blockTop = cartSlimeTopY(DOCK_Y, 0.88, sq);
        const drop = tw(t, 0, boingAt);
        const up = tw(t, boingAt, Math.max(0.95, boingAt + 0.92));
        const joyBlend = tw(t, Math.max(0, boingAt - 0.06), boingAt + 0.18);
        const hx = 3.55 - up * 0.45;
        const hz = -3.45 - up * 1.65;
        const hy =
          t < boingAt
            ? blockTop + 0.03 + (1 - drop) * 0.62
            : blockTop + 0.03 + up * 6.35 + Math.sin(up * Math.PI) * 1.25;
        return (
          <>
            {/* Swamp trees on the upper north bank framing Hero soaring high above their crowns! */}
            <Tree position={[0.35, 0, -8.95]} height={2.95} leaf="#3b7830" />
            <Tree position={[6.15, 0, -7.25]} height={3.15} leaf="#448537" />

            {/* Dad #1's Cart on the gorge boardwalk with the Slime Block squashing & rebounding on impact! */}
            <Wheelbarrow
              position={[3.55, DOCK_Y, -3.53]}
              rotationY={SOUTH}
              tilt={sq * 0.12}
              withSlimeBlock
              slimeScale={0.88}
              slimeSquash={sq}
              slimeGlow={1}
            />

            <Hero
              position={[hx, hy, hz]}
              rotationY={2.85 + up * 0.35}
              pose={blendPose(windmillFallPose(t), skyJoyPose(t), joyBlend)}
              face={joyBlend > 0.35 ? "grin" : "wow"}
            />

            {/* Dads #1 & #3 launch up from beside the cart on the rebound wave to join #2 & #4 in the sunset sky! */}
            <TinyDad
              which={1}
              position={[
                3.55 * (1 - up) + (hx - 0.68) * up,
                (DOCK_Y + (1 - up) * 0.02) * (1 - up) + (hy + 0.08) * up,
                -4.59 * (1 - up) + (hz + 0.14) * up,
              ]}
              rotationY={2.8}
              squash={t >= boingAt ? -0.22 : 0.16}
            />
            <TinyDad which={2} position={[hx + 0.68, hy + 0.08, hz + 0.14]} rotationY={-2.8} squash={t >= boingAt ? -0.22 : 0.14} />
            <TinyDad
              which={3}
              position={[
                2.46 * (1 - up) + (hx - 0.55) * up,
                DOCK_Y * (1 - up) + (hy + 0.58) * up,
                -3.35 * (1 - up) + (hz - 0.52) * up,
              ]}
              rotationY={2.9}
              squash={t >= boingAt ? -0.22 : 0.16}
            />
            <TinyDad which={4} position={[hx + 0.55, hy + 0.58, hz - 0.52]} rotationY={-2.9} squash={t >= boingAt ? -0.22 : 0.14} />

            {t >= boingAt ? (
              <>
                <SoundRings position={[3.55, blockTop, -3.45]} t={t - boingAt} color="#9dff70" reach={2.45} />
                <Bits position={[3.55, blockTop, -3.45]} t={t - boingAt} color="#9dff70" count={22} power={1.65} />
                <Puffs position={[3.55, blockTop, -3.45]} count={14} color="#c5ff9e" />
              </>
            ) : null}
          </>
        );
      },
    },
  ],
});
