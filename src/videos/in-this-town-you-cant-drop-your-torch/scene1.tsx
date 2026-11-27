import type React from "react";
import {
  BabyCrib,
  Block,
  Kai,
  ROOM_POS,
  SchoolDesk,
  ShadowCreature,
  Smoke,
  Torch,
  Townie,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 1 (10 shots): Hook & visual comedy gags (baby crib, barber, joggers, school, mailman).
 * Full multi-axis framing + continuous A->B locomotion via moveBetween().
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Scene 1",
  shots: [
    {
      cue: "1.town",
      look: "lantern-night",
      note: "High crane glides down the dark 56m village avenue as torch-carrying townsfolk guard the road.",
      ...cam.streetOverview({ from: [0, 0, 13.0], to: [0, 0, 6.2], height: 5.6, fov: 46 }),
      stage: (t) => {
        const w = moveBetween([-3.2, 0, 4.4], [-2.8, 0, -2.6], t, 0, 2.2);
        return (
          <>
            <Townie who={1} position={[0, 0, 0.2]} animation="idle" face="brave" torch light={3} time={t} />
            <Townie who={3} position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} torch time={t} />
            <Townie who={5} position={[3.4, 0, -2.2]} rotationY={-0.6} animation="idle" torch time={t} />
            <ShadowCreature position={[-2.4, 0, -7.5]} rotationY={0.2} t={t} />
            <ShadowCreature position={[2.8, 0, -8.2]} rotationY={-0.3} t={t} />
          </>
        );
      },
    },
    {
      cue: "1.dark",
      look: "lantern-night",
      note: "Low-angle horror shot looking up at tall living shadows creeping off the dark pine forest.",
      ...cam.heroLow({ on: [0, 0, -11.5], dist: 6.2, yaw: -18, fov: 46 }),
      stage: (t) => (
        <>
          <ShadowCreature position={[-2.4, 0, -11.2]} rotationY={0.2} scale={1.15} t={t} />
          <ShadowCreature position={[0.2, 0, -12.8]} rotationY={0} scale={1.25} t={t} />
          <ShadowCreature position={[2.8, 0, -11.5]} rotationY={-0.2} scale={1.12} t={t} />
        </>
      ),
    },
    {
      cue: "1.light",
      look: "lantern-night",
      note: "Dynamic cross-street sweep as a bright handheld torch flame pushes two shadows straight back.",
      ...cam.sweep({ on: [0, 1.35, 0.2], dist: 5.2, fromYaw: 34, toYaw: -28, pitch: 8, fov: 42 }),
      stage: (t) => {
        const recoil = moveBetween([0, 0, -4.0], [0, 0, -8.5], t, 0.2, 1.8);
        return (
          <>
            <Townie who={1} position={[0, 0, 0.2]} animation="reachUp" face="brave" torch light={4} time={t} />
            <ShadowCreature position={[-1.8, 0, recoil.position[2]]} rotationY={0.2} t={t} />
            <ShadowCreature position={[1.8, 0, recoil.position[2] - 0.5]} rotationY={-0.2} t={t} />
          </>
        );
      },
    },
    {
      cue: "1.out",
      look: "lantern-night",
      note: "Side tracking camera follows a living shadow dragging an unlit villager back toward the dark alley.",
      ...cam.track({ from: [-2.2, 0, 2.2], to: [-4.6, 0, -5.4], sideDist: 4.8, side: 1, height: 1.6, fov: 44 }),
      stage: (t) => {
        const drag = moveBetween([-2.2, 0, 2.2], [-4.6, 0, -5.4], t, 0, 2.1);
        return (
          <>
            <Townie who={3} position={drag.position} rotationY={drag.rotationY + Math.PI} animation="cower" face="scared" time={t} />
            <ShadowCreature position={[drag.position[0] - 0.5, 0, drag.position[2] - 0.9]} rotationY={0.2} scale={1.15} t={t} />
          </>
        );
      },
    },
    {
      cue: "1.sleep",
      zone: "room",
      look: "lantern-night",
      note: "Cozy interior sweep around a real wooden baby crib with slatted rails and a lit corner torch.",
      ...cam.sweep({ on: [ROOM_POS[0], 0.85, ROOM_POS[2] - 0.6], dist: 4.2, fromYaw: -34, toYaw: 28, pitch: 14, fov: 42 }),
      stage: () => (
        <group position={ROOM_POS}>
          <BabyCrib position={[0, 0, -0.6]} lit />
        </group>
      ),
    },
    {
      cue: "2.barber",
      look: "lantern-night",
      note: "Comedic arc around the town barber carefully cutting hair while gripping a blazing torch.",
      ...cam.sweep({ on: [-1.4, 1.35, 1.2], dist: 4.8, fromYaw: -32, toYaw: 24, pitch: 8, fov: 40 }),
      stage: (t) => (
        <>
          <Block position={[-1.4, 0.35, 1.2]} size={[0.75, 0.7, 0.75]} color="#8a2e2e" />
          <Townie who={1} position={[-1.4, 0.2, 1.2]} animation="sit" face="uneasy" time={t} />
          <Townie who={5} position={[-2.2, 0, 1.1]} rotationY={1.4 + Math.sin(t * 3) * 0.12} animation="press" face="grin" torch light={3} time={t} />
        </>
      ),
    },
    {
      cue: "2.jog",
      look: "lantern-night",
      note: "Fast side tracking shot keeping pace with two joggers sprinting laps holding lit torches.",
      ...cam.track({ from: [-5.8, 0, 3.4], to: [5.8, 0, 3.4], sideDist: 5.0, side: 1, height: 1.6, fov: 44 }),
      stage: (t) => {
        const a = moveBetween([-5.8, 0, 3.4], [5.8, 0, 3.4], t, 0, 2.2);
        const b = moveBetween([6.0, 0, 5.0], [-5.6, 0, 5.0], t, 0, 2.2);
        return (
          <>
            <Townie who={1} position={a.position} rotationY={a.rotationY} animation="run" animDistance={a.animDistance} face="happy" torch light={2.6} time={t} />
            <Townie who={3} position={b.position} rotationY={b.rotationY} animation="run" animDistance={b.animDistance} face="grin" torch light={2.6} time={t} />
          </>
        );
      },
    },
    {
      cue: "2.school",
      zone: "room",
      look: "lantern-night",
      note: "Classroom sweep across wooden desks as two students balance blazing torches beside their books.",
      ...cam.sweep({ on: [ROOM_POS[0], 1.05, ROOM_POS[2] - 0.2], dist: 4.8, fromYaw: 112, toYaw: 78, pitch: 12, fov: 42 }),
      stage: (t) => (
        <group position={ROOM_POS}>
          <SchoolDesk position={[-1.1, 0, -0.4]} />
          <SchoolDesk position={[1.1, 0, -0.4]} />
          <Torch position={[-0.85, 0.82, -0.4]} />
          <Torch position={[1.35, 0.82, -0.4]} />
          <Townie who={1} position={[-1.1, 0, 0.25]} rotationY={Math.PI} animation="sit" face="calm" scale={0.76} time={t} />
          <Townie who={3} position={[1.1, 0, 0.25]} rotationY={Math.PI + Math.sin(t * 2) * 0.08} animation="sit" face="smile" scale={0.76} time={t} />
        </group>
      ),
    },
    {
      cue: "2.mail",
      look: "lantern-night",
      note: "Tracking shot follows the mailman jogging down the cobble street until he sneezes his torch out.",
      ...cam.track({ from: [5.2, 0, 5.4], to: [-1.2, 0, 2.4], sideDist: 4.6, side: -1, height: 1.55, fov: 44 }),
      stage: (t) => {
        const m = moveBetween([5.2, 0, 5.4], [-1.2, 0, 2.4], t, 0, 2.0);
        const out = t >= 1.15;
        return (
          <>
            <Townie who={5} position={m.position} rotationY={m.rotationY} animation={out ? "cower" : "walk"} animDistance={m.animDistance} face={out ? "scared" : "smile"} torch={!out} light={out ? 0 : 2.5} time={t} />
            {out ? <Smoke position={[m.position[0], 1.2, m.position[2]]} count={10} /> : null}
          </>
        );
      },
    },
    {
      cue: "2.fifth",
      look: "lantern-night",
      note: "High street crane looks down on two shrugging townsfolk as Kai steps forward in the foreground.",
      ...cam.streetOverview({ from: [2.2, 0, 8.2], to: [-1.8, 0, 5.2], height: 4.0, fov: 44 }),
      stage: (t) => (
        <>
          <Townie who={1} position={[-1.4, 0, 1.4]} rotationY={0.3} animation="shrug" face="uneasy" torch time={t} />
          <Townie who={3} position={[1.4, 0, 1.2]} rotationY={-0.3} animation="wave" face="worried" torch time={t} />
          <Kai position={[0.9, 0, 2.3]} rotationY={-0.2} animation="idle" face="smile" time={t} />
        </>
      ),
    },
  ],
});
