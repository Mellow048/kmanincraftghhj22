import { cam, storyScene } from "../../engine";
import { PATH_Y } from "./marks";
import {
  CHILD,
  DadStack,
  EAST,
  Hero,
  NeighborBigDad,
  OriginalBigDad,
  Puffs,
  ROBE,
  ReedBasket,
  SOUTH,
  TinyDad,
  Villager,
  WEST,
  Wheelbarrow,
  jolt,
  pop,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clip 01 — Hook (`01-hook`, 7 shots):
 *   Every other kid in town has one huge 2-block slime dad; I have four tiny knee-high ones,
 *   and they are all the same guy.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Four Tiny Dads",
  shots: [
    {
      cue: "1.town",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0, 1.05, -4.5], dist: 3.6, to: 2.85, yaw: 14, pitch: 8, fov: 40 }),
      note: "Bright hook: teller faces lens in orange hoodie while giant 2-block neighbour slime dads bounce past behind him.",
      stage: (t, { p }) => {
        const hop1 = Math.abs(Math.sin(t * 4.4)) * 0.42;
        const hop2 = Math.abs(Math.sin(t * 4.1 + 1.3)) * 0.38;
        return (
          <>
            <Hero
              position={[0, PATH_Y, -4.5]}
              rotationY={SOUTH}
              animation="talk"
              face="smile"
              headYaw={Math.sin(t * 2.6) * 0.14}
              headPitch={-0.05 + Math.cos(t * 2.1) * 0.05}
            />
            {/* Giant 2-block neighbour slime dads bouncing down the street with their kids */}
            <NeighborBigDad
              variant={0}
              position={[-1.45, PATH_Y + hop1, -8.2 + p * 2.8]}
              rotationY={SOUTH}
              squash={hop1 < 0.06 ? 0.25 : -0.12}
            />
            <Villager
              position={[-0.45, PATH_Y, -8.0 + p * 2.8]}
              rotationY={SOUTH}
              scale={CHILD}
              robe={ROBE.farmer}
              walk={p * 2.8}
            />
            <NeighborBigDad
              variant={1}
              position={[1.55, PATH_Y + hop2, -6.4 - p * 2.4]}
              rotationY={Math.PI}
              squash={hop2 < 0.06 ? 0.24 : -0.1}
            />
            <Villager
              position={[0.65, PATH_Y, -6.3 - p * 2.4]}
              rotationY={Math.PI}
              scale={CHILD}
              robe={ROBE.white}
              walk={p * 2.4}
            />
          </>
        );
      },
    },
    {
      cue: "1.four",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0.35, 0.52, -4.4], dist: 2.15, to: 1.68, yaw: -42, pitch: 14, fov: 35 }),
      note: "Low reverse close-up at knee height: all four tiny slime dads pop-hop into frame beside his shoes.",
      stage: (t) => {
        const k1 = tw(t, 0.0, 0.32);
        const k2 = tw(t, 0.12, 0.45);
        const k3 = tw(t, w("1.four", "four") * 0.6, w("1.four", "tiny") + 0.2);
        const k4 = tw(t, 0.28, 0.65);
        return (
          <>
            <Hero
              position={[-0.25, PATH_Y, -4.5]}
              rotationY={0.35}
              animation="idle"
              face="grin"
              headPitch={0.28}
              headYaw={0.32 + Math.sin(t * 3) * 0.05}
            />
            <TinyDad
              which={1}
              position={[0.32, PATH_Y, -4.18]}
              rotationY={-0.3}
              hop={Math.sin(k1 * Math.PI) * 0.35}
              squash={pop(t, 0.3, 0.22) * 0.35}
            />
            <TinyDad
              which={2}
              position={[0.74, PATH_Y, -4.34]}
              rotationY={-0.45}
              hop={Math.sin(k2 * Math.PI) * 0.38}
              squash={pop(t, 0.42, 0.22) * 0.35}
            />
            <TinyDad
              which={3}
              position={[0.48, PATH_Y, -4.72]}
              rotationY={-0.25}
              hop={Math.sin(k3 * Math.PI) * 0.4}
              squash={pop(t, 0.52, 0.22) * 0.35}
            />
            <TinyDad
              which={4}
              position={[0.92, PATH_Y, -4.78]}
              rotationY={-0.5}
              hop={Math.sin(k4 * Math.PI) * 0.42}
              squash={pop(t, 0.62, 0.22) * 0.35}
            />
          </>
        );
      },
    },
    {
      cue: "1.same",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({ on: [0.22, 0.98, -4.45], dist: 2.75, distTo: 2.35, yaw: 34, yawTo: 18, pitch: -6, fov: 37 }),
      note: "Hero-angle two-shot: the four tiny dads stack into one wobbling four-high totem beside the smiling kid.",
      stage: (t) => {
        const settle = pop(t, w("1.same", "same"), 0.3);
        return (
          <>
            <Hero
              position={[-0.36, PATH_Y, -4.45]}
              rotationY={0.18}
              animation="point"
              blendTo="talk"
              blend={tw(t, 0.1, 0.8)}
              face="laugh"
              headYaw={0.22}
            />
            <DadStack
              position={[0.46, PATH_Y, -4.42]}
              rotationY={-0.22}
              sway={Math.sin(t * 4.5) * 0.45}
              squash={0.12 + settle * 0.26}
              topLean={Math.sin(t * 3.2) * 0.3}
            />
          </>
        );
      },
    },
    {
      cue: "1.reed",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [-1.4, 0.62, -8.2], dist: 3.2, to: 2.45, yaw: -38, pitch: 18, fov: 36 }),
      note: "Warm flashback by the swamp bank: baby hero reaches up from a woven reed basket as one huge slime dad hops close.",
      stage: (t, { p }) => {
        const approach = tw(t, 0, 0.9);
        const hop = Math.abs(Math.sin(t * 4.2)) * 0.28 * (1 - approach * 0.5);
        return (
          <>
            <ReedBasket position={[-1.95, 0.12, -8.3]} rotationY={0.45} reach={0.35 + p * 0.65} />
            <OriginalBigDad
              position={[-0.45 - approach * 0.42, 0.12 + hop, -7.85]}
              rotationY={WEST + 0.25}
              squash={hop < 0.04 ? 0.2 : -0.08}
              nod={0.22 * approach}
              mood="happy"
            />
          </>
        );
      },
    },
    {
      cue: "1.tall",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [-1.15, 1.05, -8.05], dist: 3.9, to: 3.15, yaw: 32, pitch: -12, fov: 40 }),
      note: "Low awe angle looking up at the towering two-block slime dad beaming down at the tiny basket.",
      stage: (t) => {
        const bounce = Math.abs(Math.sin(t * 3.8)) * 0.22;
        return (
          <>
            <ReedBasket position={[-1.95, 0.12, -8.3]} rotationY={0.45} reach={0.85} />
            <OriginalBigDad
              position={[-0.85, 0.12 + bounce, -7.9]}
              rotationY={WEST + 0.18}
              squash={bounce < 0.04 ? 0.24 : -0.12}
              nod={0.18 + Math.sin(t * 3.8) * 0.08}
            />
          </>
        );
      },
    },
    {
      cue: "1.pat",
      zone: "room",
      look: "warm-room",
      ...cam.pan({
        from: [0.3, 1.45, 2.75],
        on: [-0.55, 0.85, -0.3],
        onTo: [1.15, 0.65, 0.2],
        fov: 42,
      }),
      note: "Inside the cottage: one affectionate pat from two-block Dad launches young Hero sliding across the floorboards!",
      stage: (t) => {
        const hitAt = w("1.pat", "pat");
        const slide = tw(t, hitAt, hitAt + 0.72);
        const bump = jolt(t, hitAt, 0.26);
        return (
          <>
            <OriginalBigDad
              position={[-1.15 + bump * 0.8, 0, -0.35]}
              rotationY={EAST - 0.15}
              squash={pop(t, hitAt, 0.26) * 0.35}
              mood={t > hitAt + 0.15 ? "scared" : "happy"}
            />
            <Hero
              scale={0.64}
              position={[-0.05 + slide * 1.65, Math.sin(slide * Math.PI) * 0.28, -0.15 + slide * 0.35]}
              rotationY={WEST + slide * 0.6}
              animation={t < hitAt ? "laugh" : "stagger"}
              face={t < hitAt ? "laugh" : "wow"}
              headPitch={-0.18 * slide}
            />
            {t >= hitAt ? <Puffs position={[0.1, 0.35, -0.1]} count={7} color="#fff3d6" /> : null}
          </>
        );
      },
    },
    {
      cue: "1.barrow",
      zone: "village",
      look: "overworld-day",
      ...cam.truck({
        on: [0, 0.78, -9.2],
        dist: 2.85,
        yaw: -34,
        pitch: 14,
        by: [0, 0, 1.65],
        fov: 38,
      }),
      note: "Present day: Hero happily wheels all four tiny dads down the sunny village lane in one green-stained wheelbarrow.",
      stage: (t, { p }) => {
        const z = -9.6 + p * 1.75;
        return (
          <>
            <Hero
              position={[0, PATH_Y, z - 0.68]}
              rotationY={SOUTH}
              animation="walk"
              arms="hold"
              animDistance={p * 1.75}
              plantFeet
              face="smile"
              headPitch={0.14}
            />
            <Wheelbarrow
              position={[0, PATH_Y, z + 0.28]}
              rotationY={SOUTH}
              tilt={-0.08}
              wheelSpin={p * 7.5}
              withDads
              dadBounce={t * 6.2}
            />
          </>
        );
      },
    },
  ],
});
