import { cam, storyScene } from "../../engine";
import { PATH_Y } from "./marks";
import {
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
      ...cam.push({ on: [0, 0.98, -4.4], dist: 5.2, to: 4.1, yaw: 10, pitch: 7, fov: 45 }),
      note: "Hook: Hero waves at the lens in his orange hoodie while two big neighbour slime dads bounce down the village street behind him.",
      stage: (t, { p }) => {
        const hop1 = Math.abs(Math.sin(t * 4.2)) * 0.34;
        const hop2 = Math.abs(Math.sin(t * 3.9 + 1.4)) * 0.3;
        return (
          <>
            <Hero
              position={[0, PATH_Y, -3.3]}
              rotationY={SOUTH}
              animation="wave"
              blendTo="talk"
              blend={tw(t, 0.35, 1.1)}
              face="grin"
              headYaw={Math.sin(t * 2.5) * 0.12}
            />
            <NeighborBigDad
              variant={0}
              position={[-1.65, PATH_Y + hop1, -7.2 + p * 2.2]}
              rotationY={0.25}
              squash={hop1 < 0.05 ? 0.22 : -0.1}
            />
            <Villager
              position={[-0.55, PATH_Y, -7.0 + p * 2.2]}
              rotationY={SOUTH}
              scale={CHILD}
              robe={ROBE.farmer}
              walk={p * 2.2}
            />
            <NeighborBigDad
              variant={1}
              position={[1.7, PATH_Y + hop2, -8.4 + p * 1.8]}
              rotationY={-0.25}
              squash={hop2 < 0.05 ? 0.2 : -0.1}
            />
            <Villager
              position={[0.68, PATH_Y, -8.2 + p * 1.8]}
              rotationY={SOUTH}
              scale={CHILD}
              robe={ROBE.white}
              walk={p * 1.8}
            />
          </>
        );
      },
    },
    {
      cue: "1.four",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0.22, 0.52, -3.4], dist: 3.65, to: 2.85, yaw: -28, pitch: 20, fov: 41 }),
      note: "Clear knee-height medium-close: four tiny 38cm slime dads pop-hop in a neat row right beside Hero's sneakers.",
      stage: (t) => {
        const k1 = tw(t, 0.0, 0.3);
        const k2 = tw(t, 0.12, 0.44);
        const k3 = tw(t, w("1.four", "four") * 0.5, w("1.four", "tiny") + 0.2);
        const k4 = tw(t, 0.26, 0.62);
        return (
          <>
            <Hero
              position={[-0.65, PATH_Y, -3.45]}
              rotationY={0.38}
              animation="idle"
              face="grin"
              headPitch={0.26}
              headYaw={0.28 + Math.sin(t * 3) * 0.05}
            />
            <TinyDad which={1} position={[-0.02, PATH_Y, -3.28]} rotationY={-0.22} hop={Math.sin(k1 * Math.PI) * 0.32} squash={pop(t, 0.3, 0.22) * 0.3} />
            <TinyDad which={2} position={[0.42, PATH_Y, -3.35]} rotationY={-0.28} hop={Math.sin(k2 * Math.PI) * 0.34} squash={pop(t, 0.42, 0.22) * 0.3} />
            <TinyDad which={3} position={[0.86, PATH_Y, -3.44]} rotationY={-0.34} hop={Math.sin(k3 * Math.PI) * 0.36} squash={pop(t, 0.52, 0.22) * 0.3} />
            <TinyDad which={4} position={[1.28, PATH_Y, -3.55]} rotationY={-0.4} hop={Math.sin(k4 * Math.PI) * 0.38} squash={pop(t, 0.62, 0.22) * 0.3} />
          </>
        );
      },
    },
    {
      cue: "1.same",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({ on: [0.05, 0.85, -3.45], dist: 4.35, distTo: 3.55, yaw: 24, yawTo: 8, pitch: 5, fov: 42 }),
      note: "Two-shot: the four tiny dads stack cleanly into a 1.5m four-high totem beside Hero.",
      stage: (t) => {
        const settle = pop(t, w("1.same", "same"), 0.3);
        return (
          <>
            <Hero
              position={[-0.58, PATH_Y, -3.45]}
              rotationY={0.22}
              animation="point"
              blendTo="talk"
              blend={tw(t, 0.1, 0.8)}
              face="grin"
              headYaw={0.18}
            />
            <DadStack
              position={[0.52, PATH_Y, -3.42]}
              rotationY={-0.18}
              sway={Math.sin(t * 4.4) * 0.35}
              squash={0.1 + settle * 0.22}
              topLean={Math.sin(t * 3.2) * 0.22}
            />
          </>
        );
      },
    },
    {
      cue: "1.reed",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [-0.35, 0.68, -8.5], dist: 4.8, to: 3.85, yaw: -24, pitch: 20, fov: 43 }),
      note: "Sunset flashback on the grassy swamp bank: Baby Hero reaches up from a reed basket as Big Slime Dad hops up.",
      stage: (t, { p }) => {
        const approach = tw(t, 0, 0.9);
        const hop = Math.abs(Math.sin(t * 4.2)) * 0.24 * (1 - approach * 0.5);
        return (
          <>
            <ReedBasket position={[-1.18, 0.12, -8.45]} rotationY={0.32} reach={0.35 + p * 0.65} />
            <OriginalBigDad
              position={[0.65 - approach * 0.38, 0.12 + hop, -8.55]}
              rotationY={-0.48}
              squash={hop < 0.04 ? 0.18 : -0.08}
              nod={0.18 * approach}
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
      ...cam.push({ on: [-0.25, 0.88, -8.5], dist: 5.4, to: 4.35, yaw: 22, pitch: -3, fov: 44 }),
      note: "Full-body low angle showing two-block OriginalBigDad standing proudly beside the tiny baby basket.",
      stage: (t) => {
        const bounce = Math.abs(Math.sin(t * 3.8)) * 0.2;
        return (
          <>
            <ReedBasket position={[-1.18, 0.12, -8.45]} rotationY={0.28} reach={0.85} />
            <OriginalBigDad
              position={[0.28, 0.12 + bounce, -8.55]}
              rotationY={-0.32}
              squash={bounce < 0.04 ? 0.22 : -0.1}
              nod={0.15 + Math.sin(t * 3.8) * 0.06}
            />
          </>
        );
      },
    },
    {
      cue: "1.pat",
      zone: "room",
      look: "overworld-day",
      ...cam.push({ on: [0.1, 0.85, 0.1], dist: 5.3, to: 4.5, yaw: -14, pitch: 12, fov: 46 }),
      note: "Inside the bright cottage room: one pat from big Dad sends young Hero sliding across the floorboards!",
      stage: (t) => {
        const hitAt = w("1.pat", "pat");
        const slide = tw(t, hitAt, hitAt + 0.72);
        const bump = jolt(t, hitAt, 0.25);
        return (
          <>
            <OriginalBigDad
              position={[-1.08 + bump * 0.55, 0, -0.15]}
              rotationY={0.52}
              squash={pop(t, hitAt, 0.26) * 0.3}
              mood={t > hitAt + 0.15 ? "scared" : "happy"}
            />
            <Hero
              scale={0.64}
              position={[0.05 + slide * 1.45, Math.sin(slide * Math.PI) * 0.24, 0.15 + slide * 0.25]}
              rotationY={-0.45 + slide * 0.5}
              animation={t < hitAt ? "wave" : "stagger"}
              face={t < hitAt ? "grin" : "wow"}
            />
            {t >= hitAt ? <Puffs position={[0.15, 0.35, 0.15]} count={7} color="#fff3d6" /> : null}
          </>
        );
      },
    },
    {
      cue: "1.barrow",
      zone: "village",
      look: "overworld-day",
      ...cam.truck({
        on: [0, 0.82, -8.6],
        dist: 4.5,
        yaw: 32,
        pitch: 14,
        by: [0, 0, 1.75],
        fov: 43,
      }),
      note: "Present day: Hero wheels all four tiny dads down the sunny village street in one green-stained wheelbarrow.",
      stage: (t, { p }) => {
        const z = -9.0 + p * 1.75;
        return (
          <>
            <Hero
              position={[0, PATH_Y, z - 0.72]}
              rotationY={SOUTH}
              animation="walk"
              arms="hold"
              animDistance={p * 1.75}
              plantFeet
              face="smile"
              headPitch={0.12}
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
