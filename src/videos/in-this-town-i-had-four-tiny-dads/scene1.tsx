import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { PATH_Y } from "./marks";
import {
  ADULT,
  CHILD,
  DadStack,
  Hero,
  NeighborBigDad,
  OriginalBigDad,
  Puffs,
  ROBE,
  ReedBasket,
  SOUTH,
  TinyDad,
  Villager,
  Wheelbarrow,
  jolt,
  pop,
  posed,
  sceneImpact,
  slimeBounce,
  slimeHopTo,
  timing,
  tw,
  w,
} from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Four Tiny Dads",
  shots: [
    {
      cue: "1.town",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [0, 1.02, -4.6],
        onTo: [0, 1.02, -3.15],
        dist: 5.1,
        to: 4.05,
        yaw: 9,
        pitch: 6,
        fov: 46,
        fovTo: 42,
      }),
      arc: 0.34,
      handheld: 0.014,
      note: "Kinetic hook: everyone walks down the sunny street toward the lens—two huge bouncing neighbour slime dads behind Hero, who waves straight into the camera.",
      stage: (t, { p }) => {
        const d = p * 1.65;
        const b1 = slimeBounce(t, 1.85, 0.42, 0.1);
        const b2 = slimeBounce(t, 1.7, 0.38, 0.55);
        const heroZ = -4.55 + d;
        const thumbBack = tw(t, w("1.town", "one") - 0.1, w("1.town", "dad") + 0.15);
        return (
          <>
            <Hero
              position={[0, PATH_Y, heroZ]}
              rotationY={SOUTH}
              animation="walk"
              arms={thumbBack > 0.35 ? "point" : "wave"}
              animDistance={d}
              plantFeet
              face="grin"
              gaze={0}
              headYaw={-0.18 * thumbBack + Math.sin(t * 3) * 0.08}
            />
            <NeighborBigDad
              variant={0}
              position={[-1.62, PATH_Y + b1.hop, -7.8 + d * 1.25]}
              rotationY={0.22}
              squash={b1.squash}
            />
            <Villager
              position={[-0.58, PATH_Y, -7.35 + d * 1.25]}
              rotationY={SOUTH}
              scale={CHILD}
              robe={ROBE.farmer}
              walk={d * 1.25}
              lookAt={[0, 1.1, heroZ]}
            />
            <NeighborBigDad
              variant={1}
              position={[1.68, PATH_Y + b2.hop, -8.8 + d * 1.15]}
              rotationY={-0.22}
              squash={b2.squash}
            />
            <Villager
              position={[0.65, PATH_Y, -8.35 + d * 1.15]}
              rotationY={SOUTH}
              scale={CHILD}
              robe={ROBE.white}
              walk={d * 1.15}
            />
            <Villager
              position={[-2.62, PATH_Y, -5.2]}
              rotationY={0.95}
              scale={ADULT}
              robe={ROBE.brown}
              lookAt={[0, 1.1, heroZ]}
            />
          </>
        );
      },
    },
    {
      cue: "1.four",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.18, 0.46, -3.15],
        onTo: [0.34, 0.42, -3.15],
        dist: 3.45,
        distTo: 2.75,
        yaw: -36,
        yawTo: -12,
        pitch: 16,
        pitchTo: 8,
        fov: 40,
      }),
      handheld: 0.012,
      note: "Low sneaker-height arc: all four tiny 38cm dads tumble-hop out from behind Hero's shoes in 1-2-3-4 rhythm!",
      stage: (t) => {
        const h1 = slimeHopTo([-0.08, PATH_Y, -3.86], [-0.08, PATH_Y, -3.05], tw(t, 0.0, 0.36), 2, 0.28, 1);
        const h2 = slimeHopTo([0.38, PATH_Y, -3.92], [0.38, PATH_Y, -3.12], tw(t, 0.1, 0.48), 2, 0.3, 2);
        const h3 = slimeHopTo([0.84, PATH_Y, -3.98], [0.84, PATH_Y, -3.22], tw(t, 0.2, 0.6), 2, 0.32, 3);
        const h4 = slimeHopTo([1.30, PATH_Y, -4.04], [1.30, PATH_Y, -3.35], tw(t, 0.3, 0.72), 2, 0.34, 4);
        const idle = (ph: number) => slimeBounce(t, 1.9, 0.12, ph);
        const after = tw(t, 0.68, 1.0);
        return (
          <>
            <Hero
              position={[-0.78, PATH_Y, -3.08]}
              rotationY={0.42}
              pose={posed("idle", t, {
                bodyPitch: 0.12,
                armR: [-0.65, -0.25, 0.18],
                head: [0.28, 0.25, 0],
              })}
              face="grin"
            />
            <TinyDad which={1} position={h1.position} rotationY={-0.18} hop={h1.hop + idle(0.1).hop * after} squash={h1.squash + idle(0.1).squash * after} />
            <TinyDad which={2} position={h2.position} rotationY={-0.25} hop={h2.hop + idle(0.35).hop * after} squash={h2.squash + idle(0.35).squash * after} />
            <TinyDad which={3} position={h3.position} rotationY={-0.32} hop={h3.hop + idle(0.6).hop * after} squash={h3.squash + idle(0.6).squash * after} />
            <TinyDad which={4} position={h4.position} rotationY={-0.38} hop={h4.hop + idle(0.85).hop * after} squash={h4.squash + idle(0.85).squash * after} />
            {t > 0.28 && t < 0.75 ? <Puffs position={[0.42, 0.12, -3.12]} count={5} color="#f3e6c8" /> : null}
          </>
        );
      },
    },
    {
      cue: "1.same",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.1, 0.52, -3.2],
        onTo: [0.06, 0.96, -3.2],
        dist: 4.2,
        distTo: 3.45,
        yaw: 28,
        yawTo: -6,
        pitch: 14,
        pitchTo: 3,
        fov: 41,
      }),
      handheld: 0.012,
      note: "Rising crane + orbit: we watch #2, #3, and #4 physically hop up onto #1's head into a wobbling four-high totem!",
      stage: (t) => {
        const build = tw(t, 0.02, w("1.same", "same") + 0.18);
        const settle = pop(t, w("1.same", "guy"), 0.26);
        return (
          <>
            <Hero
              position={[-0.58, PATH_Y, -3.22]}
              rotationY={0.22}
              animation="point"
              blendTo="talk"
              blend={tw(t, 0.25, 0.9)}
              face="grin"
              gaze={0}
              lookAt={[0.52, 0.4 + build * 0.95, -3.2]}
            />
            <DadStack
              position={[0.52, PATH_Y, -3.18]}
              rotationY={-0.14}
              assemble={build}
              sway={Math.sin(t * 4.8) * 0.34}
              squash={0.08 + settle * 0.22}
              topLean={Math.sin(t * 3.6) * 0.24}
            />
          </>
        );
      },
    },
    {
      cue: "1.reed",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0.15, 0.62, -9.2],
        onTo: [-0.45, 0.58, -9.2],
        dist: 4.6,
        distTo: 3.65,
        yaw: 146,
        yawTo: 166,
        pitch: 18,
        pitchTo: 11,
        fov: 42,
      }),
      note: "Unobstructed north-bank sunset glide: OriginalBigDad hops in discrete bouncy arcs up to Baby Hero's reed basket.",
      stage: (_t, { p }) => {
        const hop = slimeHopTo([1.05, 0.15, -9.25], [0.34, 0.15, -9.2], tw(p, 0, 0.85), 3, 0.28);
        return (
          <>
            <ReedBasket position={[-0.98, 0.15, -9.15]} rotationY={2.55} reach={0.3 + p * 0.7} />
            <OriginalBigDad
              position={[hop.position[0], hop.position[1] + hop.hop, hop.position[2]]}
              rotationY={-2.55}
              squash={hop.squash}
              nod={0.22 * p}
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
      ...cam.push({
        on: [-0.32, 0.72, -9.2],
        onTo: [-0.12, 1.08, -9.2],
        dist: 5.0,
        to: 4.1,
        yaw: -152,
        pitch: -6,
        fov: 44,
        fovTo: 39,
      }),
      arc: -0.28,
      note: "Low worm's-eye tilt-up on the north bank: towering two-block OriginalBigDad bounces proudly beside the tiny basket!",
      stage: (t) => {
        const b = slimeBounce(t, 1.55, 0.26, 0.2);
        return (
          <>
            <ReedBasket position={[-0.98, 0.15, -9.15]} rotationY={-2.55} reach={0.9} />
            <OriginalBigDad
              position={[0.42, 0.15 + b.hop, -9.22]}
              rotationY={2.55}
              squash={b.squash}
              nod={0.14 + b.lean}
            />
          </>
        );
      },
    },
    {
      cue: "1.pat",
      zone: "room",
      look: "overworld-day",
      ...cam.push({
        on: [-0.25, 0.78, 0.0],
        onTo: [0.52, 0.72, 0.12],
        dist: 5.6,
        to: 4.75,
        yaw: 10,
        pitch: 14,
        fov: 46,
        fovTo: 42,
      }),
      impacts: [sceneImpact("1.town", "1.pat", "pat", 0.055, 0.34)],
      ease: "outCubic",
      note: "Whip-follow push inside the cottage: Big Dad's loving pat launches young Hero skidding across the rug!",
      stage: (t) => {
        const hitAt = w("1.pat", "pat");
        const wind = tw(t, Math.max(0, hitAt - 0.25), hitAt);
        const slide = tw(t, hitAt, hitAt + 0.68);
        const bump = jolt(t, hitAt, 0.28);
        return (
          <>
            <OriginalBigDad
              position={[-0.76 - wind * 0.12 + bump * 0.42, 0, -0.52]}
              rotationY={0.48}
              squash={-0.12 * wind + pop(t, hitAt, 0.26) * 0.34}
              mood={t > hitAt + 0.14 ? "scared" : "happy"}
            />
            <Hero
              scale={0.64}
              position={[0.24 + slide * 1.0, Math.sin(slide * Math.PI) * 0.28, 0.12 + slide * 0.2]}
              rotationY={-0.38 + slide * 0.45}
              animation={t < hitAt ? "wave" : "stagger"}
              animDistance={slide * 1.5}
              face={t < hitAt ? "grin" : "ouch"}
            />
            {t >= hitAt ? <Puffs position={[0.12, 0.32, 0.15]} count={8} color="#fff3d6" /> : null}
          </>
        );
      },
    },
    {
      cue: "1.barrow",
      zone: "village",
      look: "overworld-day",
      ...cam.truck({
        on: [0, 0.82, -8.8],
        dist: 4.4,
        yaw: 34,
        pitch: 13,
        by: [0, 0, 2.35],
        fov: 43,
      }),
      ease: "linear",
      handheld: 0.016,
      note: "Brisk Steadicam walk-track: Hero wheels all four bouncing tiny dads down the lane as a neighbour turns to watch.",
      stage: (t, { p }) => {
        const dist = p * 2.35;
        const z = -9.2 + dist;
        const wobble = Math.sin(t * 11) * 0.018;
        const vPos: Vec3 = [1.85, PATH_Y, -7.8];
        return (
          <>
            <Hero
              position={[0, PATH_Y, z - 0.72]}
              rotationY={SOUTH}
              animation="walk"
              arms="hold"
              animDistance={dist}
              plantFeet
              face="grin"
              gaze={0}
              headPitch={0.1}
            />
            <Wheelbarrow
              position={[0, PATH_Y, z + 0.28]}
              rotationY={SOUTH + wobble}
              tilt={-0.08 + wobble}
              wheelSpin={dist * 4.8}
              withDads
              dadBounce={t * 8.2}
            />
            <Villager
              position={vPos}
              rotationY={-0.85}
              scale={ADULT}
              robe={ROBE.farmer}
              lookAt={[0, 0.7, z + 0.2]}
            />
          </>
        );
      },
    },
  ],
});
