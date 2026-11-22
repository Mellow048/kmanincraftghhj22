import { cam, storyScene } from "../../engine";
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
  SOUTH,
  SlimeBlockProp,
  TinyDad,
  VineRope,
  WEST,
  Wheelbarrow,
  pop,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clip 06 — Dropping The Golem & The Secret Slime Block Save (`06-drop`, 8 shots):
 *   Hero scoops his four tiny dads up, knocks the pin so the heavy Iron Golem sinks to the riverbed,
 *   gets pulled off the ledge by a snapping vine rope, and Dad #3 uncovers their secret Slime Block—BOING!
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Iron Golems Cannot Swim",
  shots: [
    {
      cue: "6.scoop",
      zone: "bridge",
      look: "overworld-night",
      ...cam.truck({
        on: [0, BRIDGE_Y + 0.9, 0.2],
        dist: 3.05,
        yaw: -42,
        pitch: 12,
        by: [0, 0, -2.1],
        fov: 38,
      }),
      note: "Hero scoops all four tiny dads into his arms and sprints back toward the bridge post!",
      stage: (_t, { p }) => {
        const z = 0.4 - p * 2.45;
        return (
          <>
            <Hero
              position={[0, BRIDGE_Y, z]}
              rotationY={NORTH}
              animation="run"
              arms="hold"
              animDistance={p * 2.45}
              plantFeet
              face="brave"
            />
            <TinyDad which={1} position={[-0.18, BRIDGE_Y + 0.78, z - 0.28]} rotationY={NORTH} scale={0.62} mood="scared" />
            <TinyDad which={2} position={[0.18, BRIDGE_Y + 0.78, z - 0.28]} rotationY={NORTH} scale={0.62} mood="scared" />
            <TinyDad which={3} position={[-0.16, BRIDGE_Y + 1.06, z - 0.25]} rotationY={NORTH} scale={0.62} mood="scared" />
            <TinyDad which={4} position={[0.16, BRIDGE_Y + 1.06, z - 0.25]} rotationY={NORTH} scale={0.62} mood="scared" />
            <RogueGolem position={[0.15, BRIDGE_Y, z + 2.15]} rotationY={NORTH} scale={1.16} walk={p * 3.2} />
          </>
        );
      },
    },
    {
      cue: "6.pin",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [1.55, BRIDGE_Y + 0.88, -4.15], dist: 2.15, to: 1.58, yaw: 36, pitch: 10, fov: 34 }),
      note: "Tight action insert: Hero slams the wooden locking pin clean out of the bridge post!",
      stage: (t) => {
        const hitAt = w("6.pin", "knocked");
        const out = tw(t, hitAt, hitAt + 0.35);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.85} pinOut={out * 1.25} />
            <Hero
              position={[1.25, BRIDGE_Y, -3.65]}
              rotationY={NORTH - 0.35}
              animation="press"
              blendTo="reach"
              blend={out}
              face="brave"
            />
            {t >= hitAt ? <Bits position={[1.95, BRIDGE_Y + 0.95, -4.0]} t={t - hitAt} color="#d4a259" count={10} power={0.95} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.drop",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.014,
      ...cam.push({ on: [1.35, 0.75, 0.4], dist: 4.8, to: 3.85, yaw: -52, pitch: 18, fov: 44 }),
      note: "Minecraft rule #2: the heavy Iron Golem plunges through the gap straight into the deep swamp river!",
      stage: (t) => {
        const fall = tw(t, 0.05, w("6.drop", "swim") + 0.2);
        const y = BRIDGE_Y - fall * 2.55;
        return (
          <>
            <RogueGolem
              position={[1.55, y, 0.4]}
              rotationY={NORTH + fall * 0.4}
              scale={1.16}
              armR={-1.8 + fall * 0.6}
              armL={-1.5 + fall * 0.5}
            />
            {fall > 0.42 ? (
              <>
                <Puffs position={[1.55, WATER_Y + 0.25, 0.4]} count={11} color="#c4fff2" />
                <Bits position={[1.55, WATER_Y + 0.35, 0.4]} t={t} color="#7fffe8" count={16} power={1.2} />
              </>
            ) : null}
            <Hero position={[-0.25, BRIDGE_Y, -3.35]} rotationY={SOUTH - 0.35} animation="peek" face="wow" />
          </>
        );
      },
    },
    {
      cue: "6.sink",
      zone: "riverbed",
      look: "hallway-night",
      ...cam.push({ on: [0, 1.35, 0], dist: 3.85, to: 2.95, yaw: 24, pitch: 10, fov: 40 }),
      note: "Deadpan underwater payoff: the heavy Iron Golem thuds onto the riverbed and stares blankly at a passing fish.",
      stage: (t, { p }) => {
        const settle = tw(t, 0, 0.38);
        const fishX = -1.15 + p * 2.25;
        return (
          <>
            <RogueGolem
              position={[0, RIVERBED_Y + (1 - settle) * 1.1, -0.25]}
              rotationY={SOUTH}
              scale={1.15}
              headYaw={-0.35 + p * 0.7}
              headPitch={0.18}
              armR={-0.12}
              armL={0.12}
            />
            <Fish
              position={[fishX, 1.82 + Math.sin(t * 4.5) * 0.08, 0.62]}
              rotation={[0, EAST, 0]}
              scale={1.45}
            />
            {settle > 0.6 ? <Puffs position={[0, 0.18, -0.25]} count={8} color="#7cd9c6" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.rope",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [1.45, BRIDGE_Y + 0.45, -0.4], dist: 2.85, to: 2.15, yaw: -28, pitch: 22, fov: 37 }),
      note: "Twist! A snapping vine rope yanks Hero right off the broken bridge ledge with his dads in his arms!",
      stage: (t) => {
        const pull = tw(t, w("6.rope", "pulled") - 0.15, w("6.rope", "ledge") + 0.2);
        return (
          <>
            <VineRope top={[1.82, BRIDGE_Y + 0.25, -0.35]} length={1.6 + pull * 1.1} sway={t * 5} />
            <Hero
              position={[1.15 + pull * 0.95, BRIDGE_Y - pull * 0.85, -0.4]}
              rotationY={EAST}
              animation={pull > 0.2 ? "fall" : "stagger"}
              face="fear"
            />
            <TinyDad which={1} position={[1.25 + pull * 0.85, BRIDGE_Y + 0.55 - pull * 0.75, -0.2]} scale={0.62} mood="scared" />
            <TinyDad which={3} position={[1.38 + pull * 0.98, BRIDGE_Y + 0.45 - pull * 0.95, -0.55]} scale={0.62} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [1.55, 1.05, -2.85], dist: 2.65, to: 1.98, yaw: 44, pitch: 28, fov: 36 }),
      note: "Plant paid off! Clumsy Dad #3 in the blue tie slips out of Hero's sleeve straight toward their covered wheelbarrow below!",
      stage: (t) => {
        const drop = tw(t, 0.05, w("6.three", "wheelbarrow") + 0.15);
        return (
          <>
            <Wheelbarrow position={[1.55, 0.12, -2.95]} rotationY={NORTH} covered sheetFly={drop * 0.22} />
            <TinyDad
              which={3}
              position={[1.55, 2.05 - drop * 1.15, -2.85]}
              rotationY={drop * 1.8}
              squash={pop(t, w("6.three", "wheelbarrow"), 0.24) * 0.42}
              mood="scared"
            />
            <Hero position={[1.48, 2.55 - drop * 0.55, -2.75]} rotationY={SOUTH} animation="fall" face="wow" />
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [1.55, 0.82, -2.95], dist: 2.5, to: 1.82, yaw: -36, pitch: 20, fov: 35 }),
      note: "The cloth sheet whips away, unveiling the glowing nine-slimeball Slime Block they secretly built in the shed!",
      stage: (t) => {
        const fly = tw(t, 0.04, w("6.block", "slime") + 0.2);
        return (
          <>
            <Wheelbarrow
              position={[1.55, 0.12, -2.95]}
              rotationY={NORTH}
              covered
              sheetFly={0.22 + fly * 1.35}
              withSlimeBlock
            />
            <TinyDad
              which={3}
              position={[2.15, 0.12, -2.85]}
              rotationY={WEST}
              hop={Math.abs(Math.sin(t * 6)) * 0.18}
              mood="happy"
            />
          </>
        );
      },
    },
    {
      cue: "6.boing",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [1.55, 2.65, -2.95], dist: 5.1, to: 3.85, yaw: 22, pitch: -16, fov: 45 }),
      note: "Minecraft rule #3: zero fall damage! Hero and his dads hit the Slime Block and BOING high above the moonlit trees!",
      stage: (t) => {
        const hitAt = w("6.boing", "hit");
        const pre = tw(t, 0, Math.max(0.12, hitAt));
        const launch = tw(t, hitAt, hitAt + 0.85);
        const y = t < hitAt ? 2.4 * (1 - pre) + 0.95 : 0.95 + launch * 5.6;
        const sq = pop(t, hitAt, 0.28);
        return (
          <>
            <SlimeBlockProp position={[1.55, 0.12, -2.95]} scale={1.1} squash={sq * 0.65} glow={0.85 + sq * 0.4} />
            <Hero
              position={[1.55, y, -2.95]}
              rotationY={SOUTH}
              animation={t < hitAt ? "fall" : "cheer"}
              face={t < hitAt ? "wow" : "laugh"}
            />
            <TinyDad which={1} position={[1.05, y + 0.25, -2.85]} rotationY={SOUTH} mood="happy" />
            <TinyDad which={2} position={[2.05, y + 0.25, -2.85]} rotationY={SOUTH} mood="happy" />
            <TinyDad which={3} position={[1.25, y - 0.35, -2.75]} rotationY={SOUTH} mood="happy" />
            <TinyDad which={4} position={[1.85, y - 0.35, -2.75]} rotationY={SOUTH} mood="happy" />
            {t >= hitAt ? <Bits position={[1.55, 1.0, -2.95]} t={t - hitAt} color="#8aff66" count={20} power={1.4} /> : null}
          </>
        );
      },
    },
  ],
});
