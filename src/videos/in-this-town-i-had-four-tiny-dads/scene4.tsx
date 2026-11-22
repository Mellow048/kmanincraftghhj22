import { cam, storyScene } from "../../engine";
import { BRIDGE_Y } from "./marks";
import {
  BridgePinPost,
  Hero,
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

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Across The Barred Bridge",
  shots: [
    {
      cue: "4.sunset",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [-0.25, BRIDGE_Y + 0.65, -4.05], dist: 4.4, to: 3.45, yaw: 26, pitch: 14, fov: 42 }),
      note: "At sunset, Hero unbars the wooden bridge crossbar alone to prove he does not need guarding.",
      stage: (t) => {
        const lift = tw(t, w("4.sunset", "unbarred") - 0.15, w("4.sunset", "bridge") + 0.25);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={lift * 0.88} pinOut={lift * 0.4} />
            <Hero
              position={[-0.72, BRIDGE_Y, -3.85]}
              rotationY={0.42}
              animation={lift < 0.6 ? "press" : "idle"}
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
      ...cam.push({ on: [0, 0.95, 6.2], dist: 5.1, to: 4.05, yaw: -22, pitch: 14, fov: 44 }),
      note: "Hero crosses off the south end of the bridge into the mossy stone ruins, walking toward us.",
      stage: (_t, { p }) => (
        <Hero
          position={[0, 0.14, 5.35 + p * 1.45]}
          rotationY={SOUTH}
          animation="walk"
          animDistance={p * 1.5}
          plantFeet
          face="uneasy"
          headYaw={Math.sin(p * 6) * 0.22}
        />
      ),
    },
    {
      cue: "4.vine",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.16,
      ...cam.push({ on: [0.1, 1.35, 6.8], dist: 5.2, to: 4.15, yaw: 24, pitch: 8, fov: 43 }),
      note: "Night falls: the vine-covered stone bulk beside the ruins stands up—it's alive!",
      stage: (t) => {
        const rise = tw(t, w("4.vine", "stood") - 0.35, w("4.vine", "up") + 0.25);
        return (
          <>
            <RogueGolem
              position={[0.55, 0.14 - (1 - rise) * 0.55, 7.15]}
              rotationY={0.32}
              bow={(1 - rise) * 0.65}
              armL={-0.35 * (1 - rise)}
              armR={-0.35 * (1 - rise)}
            />
            <Hero
              position={[-0.85, 0.14, 6.25]}
              rotationY={0.52}
              animation="scared"
              face="surprised"
            />
          </>
        );
      },
    },
    {
      cue: "4.golem",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.25, 1.55, 6.85], dist: 5.4, to: 4.3, yaw: -22, pitch: -6, fov: 44 }),
      note: "Full-body low angle: the 2.7m mossy Iron Golem towers over Hero from head to toe!",
      stage: (t) => (
        <>
          <RogueGolem
            position={[0.45, 0.14, 7.05]}
            rotationY={-0.32}
            headPitch={0.22}
            headYaw={Math.sin(t * 2) * 0.08}
          />
          <Hero
            position={[-0.78, 0.14, 6.15]}
            rotationY={0.48}
            animation="cower"
            face="scared"
            headPitch={-0.32}
          />
        </>
      ),
    },
    {
      cue: "4.past",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.05, 1.25, 6.2], dist: 5.2, to: 4.15, yaw: 32, pitch: 12, fov: 43 }),
      note: "Minecraft rule: Iron Golems ignore peaceful human kids—it lumbers right past frozen Hero!",
      stage: (_t, { p }) => (
        <>
          <RogueGolem
            position={[0.65, 0.14, 5.55 + p * 1.45]}
            rotationY={0.35}
            walk={p * 1.5}
          />
          <Hero
            position={[-0.82, 0.14, 6.15]}
            rotationY={0.45}
            animation="peek"
            face="surprised"
            headYaw={-0.35 + p * 0.65}
          />
        </>
      ),
    },
    {
      cue: "4.barrow",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0, BRIDGE_Y + 0.45, -2.5], dist: 4.8, to: 3.75, yaw: -20, pitch: 16, fov: 43 }),
      note: "Uh-oh: all four tiny dads roll onto the north end of the bridge pushing their covered wheelbarrow with Hero's coat!",
      stage: (t, { p }) => {
        const z = -3.2 + p * 1.15;
        return (
          <>
            <Wheelbarrow position={[0, BRIDGE_Y, z + 0.35]} rotationY={SOUTH} covered wheelSpin={p * 5.5} />
            <TornBabyCoat position={[0, BRIDGE_Y + 0.88, z + 0.42]} />
            <TinyDad which={1} position={[-0.45, BRIDGE_Y, z - 0.55]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5)) * 0.16} mood="scared" />
            <TinyDad which={2} position={[-0.15, BRIDGE_Y, z - 0.62]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 1)) * 0.16} mood="scared" />
            <TinyDad which={3} position={[0.15, BRIDGE_Y, z - 0.62]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 2)) * 0.16} mood="scared" />
            <TinyDad which={4} position={[0.45, BRIDGE_Y, z - 0.55]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 6.5 + 3)) * 0.16} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "4.hunt",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.18,
      ...cam.push({ on: [0.15, BRIDGE_Y + 1.35, 3.2], dist: 4.6, to: 3.55, yaw: 152, pitch: -3, fov: 41 }),
      note: "An Iron Golem hunts every slime on sight: it whips around with blazing red eyes and charges onto the bridge!",
      stage: (_t, { p }) => (
        <RogueGolem
          position={[0.15, BRIDGE_Y, 3.85 - p * 1.35]}
          rotationY={2.75}
          walk={p * 2.1}
          armL={-0.6 - p * 0.9}
          armR={-0.6 - p * 0.9}
          headPitch={0.14}
        />
      ),
    },
    {
      cue: "4.slam",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.34,
      ...cam.push({ on: [-1.15, BRIDGE_Y + 0.55, 0.85], dist: 4.8, to: 3.75, yaw: 136, pitch: 18, fov: 43 }),
      note: "SMASH! Both massive iron fists slam twin white craters straight into the west bridge curb!",
      stage: (t) => {
        const slamAt = w("4.slam", "slammed");
        const k = tw(t, slamAt - 0.18, slamAt + 0.14);
        const arm = -2.15 * (1 - k) - 0.25 * k;
        return (
          <>
            <RogueGolem
              position={[-0.65, BRIDGE_Y, 1.45]}
              rotationY={2.35}
              armL={arm}
              armR={arm}
              headPitch={0.25 * k}
            />
            {t >= slamAt - 0.02 ? (
              <>
                <TwinWhiteCraters position={[-1.45, BRIDGE_Y + 0.02, 0.85]} rotationY={0.4} fresh={Math.max(0.2, k)} />
                <Puffs position={[-1.45, BRIDGE_Y + 0.22, 0.85]} count={11} color="#eceee6" />
              </>
            ) : null}
            <Hero
              position={[0.55, BRIDGE_Y, 0.25]}
              rotationY={2.15}
              animation="cower"
              face="scared"
            />
          </>
        );
      },
    },
  ],
});
