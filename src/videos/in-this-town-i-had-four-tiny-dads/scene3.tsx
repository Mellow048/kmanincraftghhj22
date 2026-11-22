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

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Two Inches & A Secret In The Shed",
  shots: [
    {
      cue: "3.corner",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [-0.45, 0.82, 0.7], dist: 4.8, to: 3.75, yaw: 28, pitch: 12, fov: 43 }),
      note: "At the street corner: Hero turns in 3/4 view and motions his four tiny dads to wait out of sight.",
      stage: (t) => {
        const stopGesture = tw(t, 0.1, w("3.corner", "stop") + 0.25);
        return (
          <>
            <Hero
              position={[0.35, PATH_Y, 1.05]}
              rotationY={-0.62}
              animation="press"
              blendTo="talk"
              blend={stopGesture}
              face="uneasy"
              headYaw={-0.18 * stopGesture}
            />
            <TinyDad which={1} position={[-0.78, PATH_Y, 0.45]} rotationY={0.42} squash={0.12 * stopGesture} mood="sad" />
            <TinyDad which={2} position={[-1.25, PATH_Y, 0.62]} rotationY={0.48} squash={0.14 * stopGesture} mood="calm" />
            <TinyDad which={3} position={[-1.02, PATH_Y, 0.02]} rotationY={0.35} squash={0.12 * stopGesture} mood="sad" />
            <TinyDad which={4} position={[-1.48, PATH_Y, 0.18]} rotationY={0.5} squash={0.15 * stopGesture} mood="sad" />
          </>
        );
      },
    },
    {
      cue: "3.friday",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [5.35, 1.75, 3.3], dist: 7.6, to: 6.2, yaw: -26, pitch: 10, fov: 46 }),
      note: "Roof Jump Day in the open schoolyard: big neighbour slime dads bounce kids high toward the schoolhouse roof!",
      stage: (t) => {
        const launch = tw(t, w("3.friday", "bounced") - 0.1, w("3.friday", "roof") + 0.35);
        const arc = Math.abs(Math.sin(t * 4.2)) * 2.15 + launch * 0.95;
        return (
          <>
            <NeighborBigDad
              variant={0}
              position={[4.85, PATH_Y, 2.5]}
              rotationY={0.35}
              squash={pop(t, w("3.friday", "bounced"), 0.28) * 0.34}
            />
            <Villager
              position={[5.35 + launch * 1.15, PATH_Y + arc, 2.5]}
              rotationY={-0.4}
              scale={CHILD}
              robe={ROBE.farmer}
              nod={-0.25 * launch}
            />
            <NeighborBigDad
              variant={1}
              position={[4.95, PATH_Y, 4.6]}
              rotationY={0.25}
              squash={pop(t, 0.15, 0.28) * 0.3}
            />
            <Hero
              position={[3.45, PATH_Y, 3.6]}
              rotationY={0.65}
              animation="lookAround"
              face="wow"
              headPitch={-0.28 * launch}
            />
          </>
        );
      },
    },
    {
      cue: "3.plank",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [4.35, 0.72, 3.5], dist: 4.5, to: 3.55, yaw: -42, pitch: 20, fov: 42 }),
      note: "Hero braces on the seesaw plank as all four tiny 38cm dads jump together onto the opposite end!",
      stage: (t) => {
        const jumpAt = w("3.plank", "jumped");
        const drop = tw(t, jumpAt - 0.15, jumpAt + 0.28);
        const arcY = 0.58 * (1 - drop) + Math.sin(drop * Math.PI) * 0.32;
        return (
          <>
            <SeesawPlank position={[4.35, PATH_Y, 3.5]} tilt={-0.12 + drop * 0.16} />
            <Hero
              position={[4.35, PATH_Y + 0.22, 4.42]}
              rotationY={0.25}
              animation="crouch"
              face="brave"
              headPitch={0.14}
            />
            <TinyDad which={1} position={[4.16, PATH_Y + 0.24 + arcY, 2.55]} rotationY={SOUTH} squash={drop * 0.28} />
            <TinyDad which={2} position={[4.54, PATH_Y + 0.24 + arcY, 2.55]} rotationY={SOUTH} squash={drop * 0.28} />
            <TinyDad which={3} position={[4.16, PATH_Y + 0.24 + arcY, 2.95]} rotationY={SOUTH} squash={drop * 0.28} />
            <TinyDad which={4} position={[4.54, PATH_Y + 0.24 + arcY, 2.95]} rotationY={SOUTH} squash={drop * 0.28} />
          </>
        );
      },
    },
    {
      cue: "3.inch",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({ on: [4.35, 0.92, 4.1], dist: 4.4, distTo: 3.55, yaw: 32, yawTo: 14, pitch: 10, fov: 42 }),
      note: "Hero goes up a pathetic two inches on the plank while watching schoolkids laugh.",
      stage: (t) => {
        const hop = Math.sin(tw(t, 0.05, 0.42) * Math.PI) * 0.075;
        const laugh = tw(t, w("3.inch", "laughed") - 0.15, w("3.inch", "laughed") + 0.35);
        return (
          <>
            <SeesawPlank position={[4.35, PATH_Y, 3.5]} tilt={0.04} />
            <Hero
              position={[4.35, PATH_Y + 0.22 + hop, 4.42]}
              rotationY={SOUTH - 0.18}
              animation={laugh > 0.2 ? "ache" : "idle"}
              face="sad"
              headPitch={0.26 * laugh}
            />
            <TinyDad which={1} position={[4.16, PATH_Y + 0.2, 2.58]} rotationY={SOUTH} squash={0.24} mood="sad" />
            <TinyDad which={3} position={[4.54, PATH_Y + 0.2, 2.82]} rotationY={SOUTH} squash={0.26} mood="sad" />
            <Villager
              position={[5.45, PATH_Y, 4.65]}
              rotationY={WEST + 0.35}
              scale={CHILD}
              robe={ROBE.farmer}
              nod={Math.sin(t * 9) * 0.18 * laugh}
            />
            <Villager
              position={[3.25, PATH_Y, 4.75]}
              rotationY={EAST - 0.35}
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
        on: [0, 0.92, -8.4],
        dist: 4.6,
        yaw: -22,
        pitch: 14,
        by: [0, 0, 1.5],
        fov: 43,
      }),
      note: "Sunset walk home: Hero walks toward us wishing for one real dad while his four tiny dads trail quietly behind.",
      stage: (t, { p }) => {
        const step = villageWalkRoute(p * 0.35);
        return (
          <>
            <Hero
              {...step}
              animation="walk"
              plantFeet
              face="sad"
              headPitch={0.24}
              headYaw={Math.sin(t * 1.8) * 0.08}
            />
            <TinyDad which={1} position={[-0.45, PATH_Y, step.position[2] - 1.45]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2)) * 0.06} mood="sad" />
            <TinyDad which={2} position={[0.45, PATH_Y, step.position[2] - 1.55]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2 + 0.8)) * 0.06} mood="sad" />
            <TinyDad which={3} position={[-0.18, PATH_Y, step.position[2] - 1.95]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2 + 1.6)) * 0.05} mood="sad" />
            <TinyDad which={4} position={[0.25, PATH_Y, step.position[2] - 2.05]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 3.2 + 2.4)) * 0.05} mood="sad" />
          </>
        );
      },
    },
    {
      cue: "3.quiet",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [0, 0.38, -9.2], dist: 3.6, to: 2.75, yaw: 26, pitch: 20, fov: 40 }),
      note: "All four tiny dads stop completely still on the cobbles—not a single bounce after hearing his wish.",
      stage: (t) => {
        const droop = tw(t, 0, 0.85);
        return (
          <>
            <TinyDad which={1} position={[-0.68, PATH_Y, -9.1]} rotationY={0.22} squash={0.12 + droop * 0.14} mood="sad" nod={0.18 * droop} />
            <TinyDad which={2} position={[-0.22, PATH_Y, -9.02]} rotationY={0.08} squash={0.12 + droop * 0.14} mood="sad" nod={0.2 * droop} />
            <TinyDad which={3} position={[0.24, PATH_Y, -9.05]} rotationY={-0.08} squash={0.14 + droop * 0.16} mood="sad" nod={0.22 * droop} />
            <TinyDad which={4} position={[0.7, PATH_Y, -9.15]} rotationY={-0.22} squash={0.12 + droop * 0.14} mood="sad" nod={0.18 * droop} />
          </>
        );
      },
    },
    {
      cue: "3.shed",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [VILLAGE.shed[0], 0.52, -12.35], dist: 4.15, to: 3.25, yaw: -24, pitch: 18, fov: 41 }),
      note: "In front of the wooden shed: all four tiny dads press glowing green slimeballs together into one block.",
      stage: (t) => {
        const press = tw(t, w("3.shed", "pressed") - 0.2, w("3.shed", "together") + 0.2);
        return (
          <>
            <SlimeballProp position={[-5.4 - 0.2 * (1 - press), 0.04, -12.35]} scale={1.1 + press * 0.35} squash={press * 0.22} />
            <SlimeballProp position={[-5.4 + 0.2 * (1 - press), 0.04, -12.35]} scale={1.1 + press * 0.35} squash={press * 0.22} />
            <SlimeballProp position={[-5.4, 0.04 + press * 0.16, -12.22]} scale={1.1 + press * 0.35} squash={press * 0.22} />
            <TinyDad which={1} position={[-6.05 + press * 0.18, 0, -12.32]} rotationY={0.55} squash={0.1 + press * 0.18} mood="calm" />
            <TinyDad which={2} position={[-4.75 - press * 0.18, 0, -12.32]} rotationY={-0.55} squash={0.1 + press * 0.18} mood="calm" />
            <TinyDad which={3} position={[-5.65, 0, -11.85 - press * 0.12]} rotationY={0.25} squash={0.12 + press * 0.2} mood="calm" />
            <TinyDad which={4} position={[-5.15, 0, -11.85 - press * 0.12]} rotationY={-0.25} squash={0.12 + press * 0.2} mood="calm" />
          </>
        );
      },
    },
  ],
});
