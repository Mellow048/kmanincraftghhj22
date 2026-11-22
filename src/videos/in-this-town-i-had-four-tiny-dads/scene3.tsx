import { cam, storyScene } from "../../engine";
import { PATH_Y, VILLAGE, villageWalkRoute } from "./marks";
import {
  CHILD,
  EAST,
  Hero,
  NORTH,
  NeighborBigDad,
  ROBE,
  SOUTH,
  SeesawPlank,
  SlimeballProp,
  TinyDad,
  Villager,
  WEST,
  pop,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clip 03 — School Embarrassment & Secret Shed Plan (`03-school`, 7 shots):
 *   Making them wait at the corner, Roof Jump Day failure ("two inches"), wishing for "one real dad",
 *   and the four tiny dads going silent before secretly pressing slimeballs together in the shed.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Two Inches & A Secret In The Shed",
  shots: [
    {
      cue: "3.corner",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [-0.6, 0.85, 0.9], dist: 3.3, to: 2.55, yaw: -38, pitch: 12, fov: 39 }),
      note: "Morning embarrassment: Hero stops at the school corner and motions his four tiny dads to stay hidden behind him.",
      stage: (t) => {
        const stopGesture = tw(t, 0.1, w("3.corner", "stop") + 0.25);
        return (
          <>
            <Hero
              position={[0.15, PATH_Y, 1.35]}
              rotationY={NORTH + 0.35}
              animation="press"
              blendTo="talk"
              blend={stopGesture}
              face="uneasy"
              headYaw={-0.25 * stopGesture}
            />
            <TinyDad which={1} position={[-1.05, PATH_Y, 0.25]} rotationY={0.35} squash={0.14 * stopGesture} mood="sad" />
            <TinyDad which={2} position={[-1.48, PATH_Y, 0.42]} rotationY={0.45} squash={0.16 * stopGesture} mood="calm" />
            <TinyDad which={3} position={[-1.22, PATH_Y, -0.18]} rotationY={0.3} squash={0.14 * stopGesture} mood="sad" />
            <TinyDad which={4} position={[-1.68, PATH_Y, -0.05]} rotationY={0.5} squash={0.18 * stopGesture} mood="sad" />
          </>
        );
      },
    },
    {
      cue: "3.friday",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [5.6, 2.4, 3.5], dist: 5.5, to: 4.35, yaw: -62, pitch: -8, fov: 44 }),
      note: "Roof Jump Day in the schoolyard: giant neighbour slime dads bounce cheering kids all the way onto the school roof!",
      stage: (t) => {
        const launch = tw(t, w("3.friday", "bounced") - 0.1, w("3.friday", "roof") + 0.25);
        const arc = Math.sin(launch * Math.PI * 0.72) * 4.3;
        return (
          <>
            <NeighborBigDad
              variant={0}
              position={[4.8, PATH_Y, 2.5]}
              rotationY={EAST}
              squash={pop(t, w("3.friday", "bounced"), 0.28) * 0.38}
            />
            <Villager
              position={[5.4 + launch * 1.8, PATH_Y + arc, 2.5]}
              rotationY={WEST}
              scale={CHILD}
              robe={ROBE.farmer}
              nod={-0.3 * launch}
            />
            <NeighborBigDad
              variant={1}
              position={[4.9, PATH_Y, 4.7]}
              rotationY={EAST}
              squash={pop(t, 0.15, 0.28) * 0.34}
            />
            <Hero
              position={[3.1, PATH_Y, 3.6]}
              rotationY={EAST}
              animation="lookAround"
              face="wow"
              headPitch={-0.38 * launch}
            />
          </>
        );
      },
    },
    {
      cue: "3.plank",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [4.2, 0.65, 3.5], dist: 2.85, to: 2.2, yaw: -48, pitch: 18, fov: 37 }),
      note: "Hero stands ready on the seesaw plank as all four tiny dads leap in unison onto the opposite end!",
      stage: (t) => {
        const jumpAt = w("3.plank", "jumped");
        const drop = tw(t, jumpAt - 0.15, jumpAt + 0.28);
        const arcY = 0.65 * (1 - drop) + Math.sin(drop * Math.PI) * 0.35;
        return (
          <>
            <SeesawPlank position={[4.2, PATH_Y, 3.5]} tilt={-0.12 + drop * 0.16} />
            <Hero
              position={[4.2, PATH_Y + 0.22, 4.42]}
              rotationY={NORTH}
              animation="crouch"
              face="brave"
              headPitch={0.18}
            />
            <TinyDad which={1} position={[4.02, PATH_Y + 0.24 + arcY, 2.55]} rotationY={SOUTH} squash={drop * 0.32} />
            <TinyDad which={2} position={[4.38, PATH_Y + 0.24 + arcY, 2.55]} rotationY={SOUTH} squash={drop * 0.32} />
            <TinyDad which={3} position={[4.02, PATH_Y + 0.24 + arcY, 2.92]} rotationY={SOUTH} squash={drop * 0.32} />
            <TinyDad which={4} position={[4.38, PATH_Y + 0.24 + arcY, 2.92]} rotationY={SOUTH} squash={drop * 0.32} />
          </>
        );
      },
    },
    {
      cue: "3.inch",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({ on: [4.2, 0.92, 4.2], dist: 2.95, distTo: 2.4, yaw: 36, yawTo: 18, pitch: 10, fov: 38 }),
      note: "Pathetic two-inch hop: Hero barely clears the plank while schoolyard kids point and laugh around him.",
      stage: (t) => {
        const hop = Math.sin(tw(t, 0.05, 0.42) * Math.PI) * 0.075;
        const laugh = tw(t, w("3.inch", "laughed") - 0.15, w("3.inch", "laughed") + 0.35);
        return (
          <>
            <SeesawPlank position={[4.2, PATH_Y, 3.5]} tilt={0.04} />
            <Hero
              position={[4.2, PATH_Y + 0.22 + hop, 4.42]}
              rotationY={SOUTH - 0.25}
              animation={laugh > 0.2 ? "ache" : "idle"}
              face="sad"
              headPitch={0.28 * laugh}
            />
            <TinyDad which={1} position={[4.02, PATH_Y + 0.2, 2.58]} rotationY={SOUTH} squash={0.28} mood="sad" />
            <TinyDad which={3} position={[4.38, PATH_Y + 0.2, 2.75]} rotationY={SOUTH} squash={0.3} mood="sad" />
            <Villager
              position={[5.35, PATH_Y, 4.85]}
              rotationY={WEST - 0.3}
              scale={CHILD}
              robe={ROBE.farmer}
              nod={Math.sin(t * 9) * 0.18 * laugh}
            />
            <Villager
              position={[3.15, PATH_Y, 5.05]}
              rotationY={EAST + 0.35}
              scale={CHILD}
              robe={ROBE.white}
              nod={Math.cos(t * 9) * 0.18 * laugh}
            />
          </>
        );
      },
    },
    {
      cue: "3.wish",
      zone: "village",
      look: "overworld-sunset",
      ...cam.truck({
        on: [0, 0.95, -8.5],
        dist: 3.15,
        yaw: -26,
        pitch: 12,
        by: [0, 0, 1.5],
        fov: 38,
      }),
      note: "Sunset walk home: Hero trudges with slumped shoulders wishing for one real dad while his four dads overhear behind him.",
      stage: (t, { p }) => {
        const step = villageWalkRoute(p * 0.35);
        return (
          <>
            <Hero
              {...step}
              animation="walk"
              plantFeet
              face="sad"
              headPitch={0.26}
              headYaw={Math.sin(t * 1.8) * 0.08}
            />
            <TinyDad which={1} position={[-0.38, PATH_Y, step.position[2] - 1.55]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2)) * 0.08} mood="sad" />
            <TinyDad which={2} position={[0.36, PATH_Y, step.position[2] - 1.72]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2 + 0.8)) * 0.08} mood="sad" />
            <TinyDad which={3} position={[-0.14, PATH_Y, step.position[2] - 2.05]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2 + 1.6)) * 0.06} mood="sad" />
            <TinyDad which={4} position={[0.28, PATH_Y, step.position[2] - 2.18]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2 + 2.4)) * 0.06} mood="sad" />
          </>
        );
      },
    },
    {
      cue: "3.quiet",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [0, 0.36, -9.2], dist: 2.3, to: 1.78, yaw: 44, pitch: 16, fov: 35 }),
      note: "Heart-tugging close-up: all four tiny dads come to a dead halt on the cobbles—not a single bounce left in them.",
      stage: (t) => {
        const droop = tw(t, 0, 0.85);
        return (
          <>
            <TinyDad which={1} position={[-0.48, PATH_Y, -9.1]} rotationY={0.25} squash={0.14 + droop * 0.16} mood="sad" nod={0.2 * droop} />
            <TinyDad which={2} position={[0.08, PATH_Y, -9.02]} rotationY={-0.18} squash={0.14 + droop * 0.16} mood="sad" nod={0.22 * droop} />
            <TinyDad which={3} position={[-0.22, PATH_Y, -9.58]} rotationY={0.12} squash={0.16 + droop * 0.18} mood="sad" nod={0.24 * droop} />
            <TinyDad which={4} position={[0.42, PATH_Y, -9.48]} rotationY={-0.32} squash={0.15 + droop * 0.16} mood="sad" nod={0.2 * droop} />
          </>
        );
      },
    },
    {
      cue: "3.shed",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [VILLAGE.shed[0], 0.55, VILLAGE.shed[2] + 0.9], dist: 2.7, to: 2.05, yaw: -34, pitch: 14, fov: 36 }),
      note: "Planting the payoff by the shed: the four tiny dads press glowing green slimeballs tightly together before heading inside.",
      stage: (t) => {
        const press = tw(t, w("3.shed", "pressed") - 0.2, w("3.shed", "together") + 0.2);
        return (
          <>
            <SlimeballProp position={[-5.4 - 0.18 * (1 - press), 0.04, -12.55]} scale={1.1 + press * 0.35} squash={press * 0.25} />
            <SlimeballProp position={[-5.4 + 0.18 * (1 - press), 0.04, -12.55]} scale={1.1 + press * 0.35} squash={press * 0.25} />
            <SlimeballProp position={[-5.4, 0.04 + press * 0.16, -12.38]} scale={1.1 + press * 0.35} squash={press * 0.25} />
            <TinyDad which={1} position={[-5.95 + press * 0.18, 0, -12.55]} rotationY={EAST} squash={0.12 + press * 0.2} mood="calm" />
            <TinyDad which={2} position={[-4.85 - press * 0.18, 0, -12.55]} rotationY={WEST} squash={0.12 + press * 0.2} mood="calm" />
            <TinyDad which={3} position={[-5.4, 0, -12.02 - press * 0.12]} rotationY={NORTH} squash={0.15 + press * 0.22} mood="calm" />
            <TinyDad which={4} position={[-5.4, 0, -13.05 + press * 0.14]} rotationY={SOUTH} squash={0.15 + press * 0.22} mood="calm" />
          </>
        );
      },
    },
  ],
});
