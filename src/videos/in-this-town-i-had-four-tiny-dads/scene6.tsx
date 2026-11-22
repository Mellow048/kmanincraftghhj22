import { Glow, Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, WATER_Y } from "./marks";
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
  Wheelbarrow,
  pop,
  timing,
  tw,
  w,
} from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Bridge Drop & The Secret Slime Block",
  shots: [
    {
      cue: "6.scoop",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.1, BRIDGE_Y + 0.85, -1.5], dist: 4.8, to: 3.8, yaw: 154, pitch: 12, fov: 43 }),
      note: "Hero scoops all four tiny dads into his arms and sprints north toward us as the Golem chases behind!",
      stage: (_t, { p }) => {
        const z = -0.55 - p * 1.95;
        return (
          <>
            <Hero
              position={[0.1, BRIDGE_Y, z]}
              rotationY={2.85}
              animation="run"
              arms="hold"
              animDistance={p * 2.2}
              plantFeet
              face="brave"
            />
            <TinyDad which={1} position={[-0.12, BRIDGE_Y + 0.68, z - 0.25]} rotationY={2.85} scale={0.78} />
            <TinyDad which={2} position={[0.22, BRIDGE_Y + 0.68, z - 0.25]} rotationY={2.85} scale={0.78} />
            <TinyDad which={3} position={[0.05, BRIDGE_Y + 0.96, z - 0.22]} rotationY={2.85} scale={0.78} />
            <TinyDad which={4} position={[0.05, BRIDGE_Y + 0.68, z - 0.45]} rotationY={2.85} scale={0.78} />
            <RogueGolem
              position={[0.15, BRIDGE_Y, 1.55 - p * 1.35]}
              rotationY={2.82}
              walk={p * 1.8}
              armL={-1.1}
              armR={-1.1}
            />
          </>
        );
      },
    },
    {
      cue: "6.pin",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.95, BRIDGE_Y + 0.68, -4.1], dist: 4.1, to: 3.2, yaw: 28, pitch: 14, fov: 41 }),
      note: "At the north post: Hero knocks the wooden locking pin clean out of the bridge support!",
      stage: (t) => {
        const knock = tw(t, w("6.pin", "knocked") - 0.1, w("6.pin", "pin") + 0.25);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0.85} pinOut={knock * 1.35} />
            <Hero
              position={[1.15, BRIDGE_Y, -3.88]}
              rotationY={0.42}
              animation="press"
              face="brave"
            />
            {knock > 0.2 ? <Puffs position={[1.95, BRIDGE_Y + 0.92, -4.0]} count={6} color="#f5e3b8" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.drop",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.3,
      ...cam.push({ on: [0.25, BRIDGE_Y + 0.35, 0.4], dist: 6.4, to: 5.1, yaw: 112, pitch: 16, fov: 46 }),
      note: "CRASH! The middle planks give way and drop the heavy Iron Golem straight into the deep swamp river!",
      stage: (t) => {
        const drop = tw(t, w("6.drop", "fell") - 0.15, w("6.drop", "swim") + 0.2);
        return (
          <>
            <Vox
              kind="darkPlanks"
              tint="#5e4429"
              position={[0.2, BRIDGE_Y - 0.2 - drop * 1.15, 0.5]}
              rotation={[drop * 0.55, 0, -drop * 0.28]}
              size={[3.8, 0.26, 3.6]}
            />
            <RogueGolem
              position={[0.25, BRIDGE_Y - drop * 1.65, 0.55]}
              rotationY={2.15}
              armL={-1.95}
              armR={-1.85}
              headPitch={-0.25}
            />
            <Hero position={[0.45, BRIDGE_Y, -4.35]} rotationY={1.9} animation="peek" face="wow" />
            {drop > 0.45 ? <Bits position={[0.35, WATER_Y + 0.15, 0.55]} t={t} color="#8fe4ff" count={16} power={1.2} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.sink",
      zone: "riverbed",
      look: "overworld-night",
      ...cam.push({ on: [0.1, 1.35, 0], dist: 4.8, to: 3.8, yaw: -22, pitch: 8, fov: 43 }),
      note: "Deadpan Minecraft payoff on the aqua riverbed: the sunken Iron Golem stands motionless staring at a tiny fish!",
      stage: (t) => (
        <>
          <RogueGolem
            position={[-0.38, 0, 0]}
            rotationY={0.38}
            headPitch={0.08}
            headYaw={0.28}
          />
          <Fish
            position={[0.58 + Math.sin(t * 2.2) * 0.14, 1.82 + Math.cos(t * 3.1) * 0.06, 0.22]}
            rotation={[0, -1.35 + Math.sin(t * 3.5) * 0.18, 0]}
            scale={1.3}
          />
        </>
      ),
    },
    {
      cue: "6.rope",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.2,
      ...cam.push({ on: [0.35, BRIDGE_Y + 0.45, -4.5], dist: 4.6, to: 3.65, yaw: 34, pitch: 16, fov: 42 }),
      note: "Uh-oh! A snapping vine rope catches Hero's ankle and yanks him off the bridge ledge!",
      stage: (t) => {
        const yank = tw(t, w("6.rope", "pulled") - 0.15, w("6.rope", "ledge") + 0.25);
        return (
          <>
            <VineRope top={[1.15, BRIDGE_Y + 0.85, -4.25]} length={1.95} sway={t * 6} />
            <Hero
              position={[0.35 + yank * 0.85, BRIDGE_Y + Math.sin(yank * Math.PI) * 0.25 - yank * 0.65, -4.45 - yank * 0.45]}
              rotationY={0.45 + yank * 0.4}
              animation={yank < 0.25 ? "stagger" : "fall"}
              face="scared"
            />
            <TinyDad which={1} position={[0.1, BRIDGE_Y + 0.55 - yank * 0.45, -4.3]} rotationY={0.45} scale={0.8} mood="scared" />
            <TinyDad which={3} position={[0.55, BRIDGE_Y + 0.65 - yank * 0.55, -4.3]} rotationY={0.45} scale={0.8} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.three",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.85, 0.85, -6.2], dist: 4.2, to: 3.25, yaw: -24, pitch: 22, fov: 41 }),
      note: "Clumsy Dad #3 in his blue tie slips first—tumbling down toward their covered wheelbarrow on the bank!",
      stage: (t) => {
        const fall = tw(t, 0, w("6.three", "wheelbarrow") + 0.2);
        return (
          <>
            <Wheelbarrow position={[0.85, 0.12, -6.25]} rotationY={0.25} covered sheetFly={fall * 0.25} />
            <TinyDad
              which={3}
              position={[0.85, 1.85 - fall * 1.05, -6.18]}
              rotationY={-0.3 + fall * 1.4}
              squash={pop(t, w("6.three", "wheelbarrow"), 0.25) * 0.35}
              mood="scared"
            />
          </>
        );
      },
    },
    {
      cue: "6.block",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.85, 0.72, -6.25], dist: 3.9, to: 3.0, yaw: 24, pitch: 20, fov: 40 }),
      note: "Payoff of the shed secret: the cloth sheet flies off, revealing one glowing nine-slimeball Slime Block!",
      stage: (t) => {
        const fly = tw(t, 0, w("6.block", "slime") + 0.25);
        return (
          <>
            <Wheelbarrow
              position={[0.85, 0.12, -6.25]}
              rotationY={0.25}
              covered
              sheetFly={0.2 + fly * 1.2}
              withSlimeBlock
            />
            <TinyDad which={3} position={[0.18, 0.12, -6.05]} rotationY={0.35} hop={Math.abs(Math.sin(t * 6)) * 0.18} mood="happy" />
            <Glow position={[0.85, 0.78, -6.25]} size={1.8} color="#8eff62" opacity={0.28 + fly * 0.22} />
          </>
        );
      },
    },
    {
      cue: "6.boing",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.85, 2.35, -6.25], dist: 6.4, to: 5.1, yaw: -22, pitch: -6, fov: 46 }),
      note: "BOING! Hero and all four tiny dads hit the Slime Block with zero damage and rocket high into the moonlit sky!",
      stage: (t) => {
        const hitAt = w("6.boing", "hit");
        const flight = tw(t, hitAt, w("6.boing", "trees") + 0.35);
        const yHero = hitAt > t ? 2.4 - (t / Math.max(0.15, hitAt)) * 1.55 : 0.85 + Math.sin(flight * Math.PI * 0.68) * 3.85;
        const sq = pop(t, hitAt, 0.28);
        return (
          <>
            <SlimeBlockProp position={[0.85, 0.12, -6.25]} scale={0.95} squash={sq * 0.55} glow={0.9} />
            <Hero
              position={[0.85, yHero, -6.25]}
              rotationY={-0.25}
              animation={t < hitAt ? "fall" : "cheer"}
              face="grin"
            />
            <TinyDad which={1} position={[0.15, yHero + 0.22, -6.15]} rotationY={-0.2} mood="happy" />
            <TinyDad which={2} position={[1.55, yHero + 0.28, -6.15]} rotationY={-0.3} mood="happy" />
            <TinyDad which={3} position={[0.35, yHero - 0.35, -6.05]} rotationY={-0.25} mood="happy" />
            <TinyDad which={4} position={[1.38, yHero - 0.3, -6.05]} rotationY={-0.25} mood="happy" />
            {t >= hitAt ? <Puffs position={[0.85, 0.95, -6.25]} count={12} color="#b4ff90" /> : null}
          </>
        );
      },
    },
  ],
});
