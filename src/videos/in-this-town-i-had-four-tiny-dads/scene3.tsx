import { Glow, cam, storyScene } from "../../engine";
import { PATH_Y, VILLAGE, villageWalkRoute } from "./marks";
import {
  CHILD,
  EAST,
  Hero,
  NeighborBigDad,
  Puffs,
  ROBE,
  SOUTH,
  SeesawPlank,
  SlimeballProp,
  TinyDad,
  Villager,
  WEST,
  pop,
  posed,
  sceneImpact,
  slimeBounce,
  slimeHopTo,
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
      ...cam.orbit({
        on: [-0.35, 0.78, 0.65],
        dist: 4.65,
        distTo: 3.65,
        yaw: 36,
        yawTo: 12,
        pitch: 12,
        pitchTo: 8,
        fov: 42,
      }),
      handheld: 0.014,
      note: "At the street corner: Hero turns around with a firm stop palm while his four hopping tiny dads skid to a halt.",
      stage: (t) => {
        const stopAt = w("3.corner", "stop");
        const arrive = tw(t, 0, stopAt);
        const h1 = slimeHopTo([-0.95, PATH_Y, -0.35], [-0.72, PATH_Y, 0.42], arrive, 2, 0.22);
        const h2 = slimeHopTo([-1.42, PATH_Y, -0.18], [-1.22, PATH_Y, 0.58], arrive, 2, 0.22);
        const h3 = slimeHopTo([-1.18, PATH_Y, -0.75], [-0.98, PATH_Y, -0.02], arrive, 2, 0.22);
        const h4 = slimeHopTo([-1.65, PATH_Y, -0.58], [-1.45, PATH_Y, 0.14], arrive, 2, 0.22);
        return (
          <>
            <Hero
              position={[0.35, PATH_Y, 1.05]}
              rotationY={-0.62}
              animation="press"
              blendTo="talk"
              blend={tw(t, stopAt - 0.1, stopAt + 0.35)}
              face="uneasy"
              lookAt={[-0.95, 0.35, 0.35]}
            />
            <TinyDad which={1} position={h1.position} rotationY={0.42} hop={h1.hop} squash={h1.squash + 0.14 * arrive} mood="sad" />
            <TinyDad which={2} position={h2.position} rotationY={0.48} hop={h2.hop} squash={h2.squash + 0.14 * arrive} mood="calm" />
            <TinyDad which={3} position={h3.position} rotationY={0.35} hop={h3.hop} squash={h3.squash + 0.14 * arrive} mood="sad" />
            <TinyDad which={4} position={h4.position} rotationY={0.5} hop={h4.hop} squash={h4.squash + 0.14 * arrive} mood="sad" />
          </>
        );
      },
    },
    {
      cue: "3.friday",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [4.95, 1.05, 3.1],
        onTo: [5.55, 2.75, 2.95],
        dist: 6.4,
        to: 7.5,
        yaw: -28,
        pitch: 5,
        fov: 44,
        fovTo: 48,
      }),
      impacts: [sceneImpact("3.corner", "3.friday", "bounced", 0.045, 0.32)],
      note: "Rising crane + pull-out in the schoolyard: camera tilts up WITH the villager kid launched high onto the schoolhouse roof!",
      stage: (t) => {
        const bounceAt = w("3.friday", "bounced");
        const wind = tw(t, Math.max(0, bounceAt - 0.28), bounceAt);
        const launch = tw(t, bounceAt, w("3.friday", "roof") + 0.35);
        const kidY = PATH_Y + launch * 3.15 + Math.sin(launch * Math.PI) * 1.15;
        const kidX = 5.15 + launch * 1.65;
        const b2 = slimeBounce(t, 1.7, 0.28, 0.35);
        return (
          <>
            <NeighborBigDad
              variant={0}
              position={[4.85, PATH_Y, 2.5]}
              rotationY={0.35}
              squash={0.28 * wind + pop(t, bounceAt, 0.3) * 0.38}
            />
            <Villager
              position={[kidX, kidY, 2.5]}
              rotationY={-0.45}
              scale={CHILD}
              robe={ROBE.farmer}
              nod={-0.28 * launch}
            />
            <NeighborBigDad
              variant={1}
              position={[4.95, PATH_Y + b2.hop, 4.65]}
              rotationY={0.25}
              squash={b2.squash}
            />
            <Hero
              position={[3.42, PATH_Y, 3.65]}
              rotationY={0.68}
              animation="lookAround"
              face="wow"
              lookAt={[kidX, kidY + 0.5, 2.5]}
            />
            {t >= bounceAt ? <Puffs position={[5.05, 0.45, 2.5]} count={8} color="#c5ff9e" /> : null}
          </>
        );
      },
    },
    {
      cue: "3.plank",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [4.35, 0.92, 2.85],
        onTo: [4.35, 0.48, 3.55],
        dist: 4.55,
        to: 3.45,
        yaw: -44,
        pitch: 22,
        fov: 42,
        fovTo: 39,
      }),
      impacts: [sceneImpact("3.corner", "3.plank", "jumped", 0.045, 0.3)],
      ease: "outCubic",
      note: "Dynamic tilt-down push: all four tiny dads leap high together in one parabolic arc and slam onto the seesaw!",
      stage: (t) => {
        const jumpAt = w("3.plank", "jumped");
        const k = tw(t, Math.max(0, jumpAt - 0.32), jumpAt + 0.18);
        const arcY = Math.sin(k * Math.PI) * 0.72 + (1 - k) * 0.15;
        const zStart = 2.05;
        const zLand = 2.65;
        const zCur = zStart + (zLand - zStart) * k;
        const landed = k > 0.85;
        return (
          <>
            <SeesawPlank position={[4.35, PATH_Y, 3.5]} tilt={-0.14 + (landed ? 0.2 : 0)} />
            <Hero
              position={[4.35, PATH_Y + 0.22, 4.42]}
              rotationY={0.25}
              pose={posed("crouch", t, { head: [0.18, 0.25, 0] })}
              face="brave"
            />
            <TinyDad which={1} position={[4.16, PATH_Y + 0.22 + arcY, zCur - 0.12]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            <TinyDad which={2} position={[4.54, PATH_Y + 0.22 + arcY, zCur - 0.12]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            <TinyDad which={3} position={[4.16, PATH_Y + 0.22 + arcY, zCur + 0.24]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            <TinyDad which={4} position={[4.54, PATH_Y + 0.22 + arcY, zCur + 0.24]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            {landed ? <Puffs position={[4.35, 0.32, 2.75]} count={6} color="#f3e6c8" /> : null}
          </>
        );
      },
    },
    {
      cue: "3.inch",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [4.35, 0.88, 4.25],
        dist: 4.25,
        distTo: 3.4,
        yaw: 34,
        yawTo: 10,
        pitch: 8,
        pitchTo: 5,
        fov: 40,
      }),
      handheld: 0.014,
      note: "Hero pops up two tiny inches and slumps in embarrassment while two schoolkids bounce-laugh behind him.",
      stage: (t) => {
        const hop = Math.sin(tw(t, 0.04, 0.38) * Math.PI) * 0.08;
        const laugh = tw(t, w("3.inch", "laughed") - 0.15, w("3.inch", "laughed") + 0.35);
        return (
          <>
            <SeesawPlank position={[4.35, PATH_Y, 3.5]} tilt={0.05} />
            <Hero
              position={[4.35, PATH_Y + 0.22 + hop, 4.42]}
              rotationY={SOUTH - 0.15}
              animation={laugh > 0.2 ? "ache" : "idle"}
              face="frown"
              gaze={0}
              headPitch={0.28 * laugh}
            />
            <TinyDad which={1} position={[4.16, PATH_Y + 0.2, 2.58]} rotationY={SOUTH} squash={0.26} mood="sad" />
            <TinyDad which={3} position={[4.54, PATH_Y + 0.2, 2.82]} rotationY={SOUTH} squash={0.28} mood="sad" />
            <Villager
              position={[5.42, PATH_Y + Math.abs(Math.sin(t * 8)) * 0.08 * laugh, 4.65]}
              rotationY={WEST + 0.35}
              scale={CHILD}
              robe={ROBE.farmer}
              nod={Math.sin(t * 10) * 0.2 * laugh}
            />
            <Villager
              position={[3.28, PATH_Y + Math.abs(Math.cos(t * 8)) * 0.08 * laugh, 4.75]}
              rotationY={EAST - 0.35}
              scale={CHILD}
              robe={ROBE.white}
              nod={Math.cos(t * 10) * 0.2 * laugh}
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
        on: [0, 0.88, -8.5],
        dist: 4.5,
        yaw: -26,
        pitch: 12,
        by: [0, 0, 2.05],
        fov: 42,
      }),
      ease: "linear",
      handheld: 0.015,
      note: "Sunset tracking walk: Hero trudges home wishing for one real dad while his four tiny dads hop softly behind.",
      stage: (t, { p }) => {
        const step = villageWalkRoute(p * 0.42);
        const b = (ph: number) => slimeBounce(t, 1.35, 0.1, ph);
        return (
          <>
            <Hero
              {...step}
              animation="walk"
              plantFeet
              face="frown"
              headPitch={0.26}
              headYaw={Math.sin(t * 1.8) * 0.08}
            />
            <TinyDad which={1} position={[-0.45, PATH_Y, step.position[2] - 1.45]} rotationY={SOUTH} hop={b(0).hop} squash={b(0).squash} mood="sad" />
            <TinyDad which={2} position={[0.45, PATH_Y, step.position[2] - 1.55]} rotationY={SOUTH} hop={b(0.25).hop} squash={b(0.25).squash} mood="sad" />
            <TinyDad which={3} position={[-0.18, PATH_Y, step.position[2] - 1.95]} rotationY={SOUTH} hop={b(0.5).hop} squash={b(0.5).squash} mood="sad" />
            <TinyDad which={4} position={[0.25, PATH_Y, step.position[2] - 2.05]} rotationY={SOUTH} hop={b(0.75).hop} squash={b(0.75).squash} mood="sad" />
          </>
        );
      },
    },
    {
      cue: "3.quiet",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({
        on: [0, 0.34, -9.1],
        dist: 3.45,
        to: 2.62,
        yaw: 24,
        pitch: 15,
        fov: 38,
        fovTo: 35,
      }),
      note: "Stillness contrast: after bouncing in every shot, all four tiny dads stop completely still and droop on the cobbles.",
      stage: (t) => {
        const droop = tw(t, 0, 0.85);
        return (
          <>
            <TinyDad which={1} position={[-0.68, PATH_Y, -9.1]} rotationY={0.22} squash={0.12 + droop * 0.16} mood="sad" nod={0.2 * droop} />
            <TinyDad which={2} position={[-0.22, PATH_Y, -9.02]} rotationY={0.08} squash={0.12 + droop * 0.16} mood="sad" nod={0.22 * droop} />
            <TinyDad which={3} position={[0.24, PATH_Y, -9.05]} rotationY={-0.08} squash={0.14 + droop * 0.18} mood="sad" nod={0.24 * droop} />
            <TinyDad which={4} position={[0.7, PATH_Y, -9.15]} rotationY={-0.22} squash={0.12 + droop * 0.16} mood="sad" nod={0.2 * droop} />
          </>
        );
      },
    },
    {
      cue: "3.shed",
      zone: "village",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [VILLAGE.shed[0], 0.45, -12.3],
        dist: 4.05,
        distTo: 2.95,
        yaw: -36,
        yawTo: -14,
        pitch: 20,
        pitchTo: 13,
        fov: 40,
      }),
      note: "Secretive arc outside the shed: all four tiny dads hop inward pressing glowing green slimeballs into a bright core!",
      stage: (t) => {
        const press = tw(t, w("3.shed", "pressed") - 0.25, w("3.shed", "together") + 0.2);
        const h1 = slimeHopTo([-6.15, 0, -12.32], [-5.82, 0, -12.32], press, 2, 0.16);
        const h2 = slimeHopTo([-4.65, 0, -12.32], [-4.98, 0, -12.32], press, 2, 0.16);
        const h3 = slimeHopTo([-5.72, 0, -11.75], [-5.58, 0, -11.98], press, 2, 0.16);
        const h4 = slimeHopTo([-5.08, 0, -11.75], [-5.22, 0, -11.98], press, 2, 0.16);
        return (
          <>
            <SlimeballProp position={[-5.4 - 0.22 * (1 - press), 0.04, -12.32]} scale={1.1 + press * 0.4} squash={press * 0.24} />
            <SlimeballProp position={[-5.4 + 0.22 * (1 - press), 0.04, -12.32]} scale={1.1 + press * 0.4} squash={press * 0.24} />
            <SlimeballProp position={[-5.4, 0.04 + press * 0.18, -12.2]} scale={1.1 + press * 0.4} squash={press * 0.24} />
            <Glow position={[-5.4, 0.28, -12.28]} size={0.6 + press * 1.1} color="#8eff62" opacity={0.14 + press * 0.28} />
            <TinyDad which={1} position={h1.position} rotationY={0.55} hop={h1.hop} squash={h1.squash + 0.16 * press} mood="calm" />
            <TinyDad which={2} position={h2.position} rotationY={-0.55} hop={h2.hop} squash={h2.squash + 0.16 * press} mood="calm" />
            <TinyDad which={3} position={h3.position} rotationY={0.25} hop={h3.hop} squash={h3.squash + 0.16 * press} mood="calm" />
            <TinyDad which={4} position={h4.position} rotationY={-0.25} hop={h4.hop} squash={h4.squash + 0.16 * press} mood="calm" />
          </>
        );
      },
    },
  ],
});
