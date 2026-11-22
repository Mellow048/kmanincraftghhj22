import { cam, storyScene } from "../../engine";
import { BRIDGE_Y, bridgePushRoute } from "./marks";
import {
  Bits,
  BridgePinPost,
  Hero,
  NORTH,
  Puffs,
  RogueGolem,
  SOUTH,
  TinyDad,
  TornBabyCoat,
  TwinWhiteCraters,
  Wheelbarrow,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clip 04 — Unbarring The Bridge & Waking The Iron Golem (`04-bridge`, 8 shots):
 *   Hero unbars the bridge at sunset, crosses into the stone ruins, wakes a towering Iron Golem,
 *   sees it ignore him—until his four tiny dads roll onto the bridge and both fists slam craters into the rail!
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Across The Barred Bridge",
  shots: [
    {
      cue: "4.sunset",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [0.35, BRIDGE_Y + 0.9, -4.15], dist: 3.35, to: 2.6, yaw: 38, pitch: 12, fov: 39 }),
      note: "Defiant sunset beat: Hero pulls the locking pin and swings the heavy bridge bar open alone.",
      stage: (t) => {
        const open = tw(t, 0.08, w("4.sunset", "unbarred") + 0.35);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={open * 0.88} pinOut={open * 0.7} />
            <Hero
              position={[0.78, BRIDGE_Y, -4.72]}
              rotationY={0.25}
              animation="lift"
              blendTo="reachUp"
              blend={open}
              face="brave"
              headPitch={-0.15 * open}
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
        on: [0, BRIDGE_Y + 0.85, 0.6],
        dist: 4.3,
        yaw: -28,
        pitch: 14,
        by: [0, -0.3, 2.2],
        fov: 42,
      }),
      note: "Hero crosses the stone span into the mossy ruins on the far swamp bank.",
      stage: (t, { p }) => {
        const z = 0.2 + p * 3.1;
        return (
          <>
            <Hero
              position={[0, BRIDGE_Y - tw(p, 0.7, 1) * 0.25, z]}
              rotationY={SOUTH}
              animation="walk"
              animDistance={p * 3.1}
              plantFeet
              face="uneasy"
              headYaw={Math.sin(t * 2.5) * 0.22}
            />
          </>
        );
      },
    },
    {
      cue: "4.vine",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.2, 1.55, 8.6], dist: 3.15, to: 2.45, yaw: 24, pitch: -8, fov: 36 }),
      note: "Night falls: the tangled vines against the stone ruin shudder and stand straight up.",
      stage: (t) => {
        const rise = tw(t, w("4.vine", "vines") - 0.1, w("4.vine", "stood") + 0.35);
        return (
          <>
            <RogueGolem
              position={[0.2, 0.12, 8.8]}
              rotationY={NORTH}
              scale={1.14}
              bow={0.85 * (1 - rise)}
              headPitch={0.45 * (1 - rise)}
              armR={0.4 * (1 - rise)}
              armL={0.4 * (1 - rise)}
            />
            {rise > 0.15 ? <Bits position={[0.2, 1.6, 8.4]} t={t} color="#498f3a" count={9} power={0.6} /> : null}
          </>
        );
      },
    },
    {
      cue: "4.golem",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.1, 1.85, 7.6], dist: 4.5, to: 3.55, yaw: -32, pitch: -15, fov: 42 }),
      note: "Low dread-angle reveal: the damaged Iron Golem towers taller than a house over frozen Hero.",
      stage: (t, { p }) => (
        <>
          <RogueGolem
            position={[0.15, 0.12, 8.3 - p * 0.75]}
            rotationY={NORTH}
            scale={1.18}
            walk={p * 0.9}
            headPitch={0.22}
          />
          <Hero
            position={[-0.35, 0.18, 6.25]}
            rotationY={SOUTH}
            animation="scared"
            face="fear"
            headPitch={-0.38}
            headYaw={Math.sin(t * 6) * 0.04}
          />
        </>
      ),
    },
    {
      cue: "4.past",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({ on: [0.1, BRIDGE_Y + 1.05, 2.2], dist: 3.45, distTo: 2.8, yaw: 52, yawTo: 34, pitch: 10, fov: 39 }),
      note: "Minecraft rule #1 in action: Iron Golems ignore peaceful human kids—it lumbers right past Hero onto the bridge!",
      stage: (_t, { p }) => (
        <>
          <RogueGolem
            position={[0.45, BRIDGE_Y, 3.3 - p * 2.1]}
            rotationY={NORTH}
            scale={1.16}
            walk={p * 2.4}
            headPitch={0.05}
          />
          <Hero
            position={[-0.82, BRIDGE_Y, 2.45]}
            rotationY={-0.4 - p * 1.4}
            animation="cower"
            blendTo="lookAround"
            blend={p}
            face="wow"
          />
        </>
      ),
    },
    {
      cue: "4.barrow",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0, BRIDGE_Y + 0.62, -2.6], dist: 3.2, to: 2.45, yaw: -36, pitch: 14, fov: 38 }),
      note: "Reverse onto the north span: all four tiny dads roll onto the bridge pushing their covered barrow and Hero's coat!",
      stage: (t, { p }) => {
        const mark = bridgePushRoute(p * 0.55);
        return (
          <>
            <Wheelbarrow
              position={[mark.position[0], BRIDGE_Y, mark.position[2] + 0.45]}
              rotationY={SOUTH}
              wheelSpin={p * 6.5}
              covered
            />
            <TornBabyCoat position={[mark.position[0], BRIDGE_Y + 0.96, mark.position[2] + 0.5]} scale={0.95} />
            <TinyDad which={1} position={[-0.32, BRIDGE_Y, mark.position[2] - 0.35]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6)) * 0.14} mood="scared" />
            <TinyDad which={2} position={[0.32, BRIDGE_Y, mark.position[2] - 0.35]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6 + 1)) * 0.14} mood="scared" />
            <TinyDad which={3} position={[-0.22, BRIDGE_Y, mark.position[2] - 0.82]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6 + 2)) * 0.14} mood="scared" />
            <TinyDad which={4} position={[0.22, BRIDGE_Y, mark.position[2] - 0.82]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6 + 3)) * 0.14} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "4.hunt",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.35, BRIDGE_Y + 1.95, 1.1], dist: 2.35, to: 1.72, yaw: 16, pitch: -8, fov: 34 }),
      note: "Tight terror close-up: the Golem locks onto the slimes and raises both massive iron arms overhead.",
      stage: (t) => {
        const windUp = tw(t, 0.08, w("4.hunt", "slime") + 0.25);
        return (
          <>
            <RogueGolem
              position={[0.35, BRIDGE_Y, 1.15]}
              rotationY={NORTH}
              scale={1.16}
              headPitch={0.26 * windUp}
              headYaw={-0.12 * (1 - windUp)}
              armR={-2.35 * windUp}
              armL={-2.35 * windUp}
            />
          </>
        );
      },
    },
    {
      cue: "4.slam",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.018,
      ...cam.push({ on: [-0.95, BRIDGE_Y + 0.72, -0.4], dist: 3.45, to: 2.68, yaw: -44, pitch: 18, fov: 40 }),
      note: "Both iron fists crash down onto the bridge parapet, smashing two identical white craters into the stone!",
      stage: (t) => {
        const slamAt = w("4.slam", "slammed");
        const down = tw(t, 0, slamAt + 0.08);
        const hit = t >= slamAt;
        return (
          <>
            <RogueGolem
              position={[-0.75, BRIDGE_Y, 0.35]}
              rotationY={NORTH + 0.35}
              scale={1.16}
              bow={down * 0.42}
              armR={-2.35 + down * 2.95}
              armL={-2.35 + down * 2.95}
            />
            {hit ? (
              <>
                <TwinWhiteCraters position={[-1.45, BRIDGE_Y + 0.02, -0.45]} rotationY={0.35} fresh={tw(t, slamAt, slamAt + 0.14)} />
                <Puffs position={[-1.45, BRIDGE_Y + 0.25, -0.45]} count={10} color="#e8e8e0" />
                <Bits position={[-1.45, BRIDGE_Y + 0.3, -0.45]} t={t - slamAt} color="#cfcfc6" count={14} power={1.15} />
              </>
            ) : null}
            <TinyDad which={1} position={[-0.35 + down * 0.45, BRIDGE_Y, -1.35]} rotationY={SOUTH} hop={down * 0.28} mood="scared" />
            <TinyDad which={3} position={[0.25 + down * 0.5, BRIDGE_Y, -1.55]} rotationY={SOUTH} hop={down * 0.32} mood="scared" />
          </>
        );
      },
    },
  ],
});
