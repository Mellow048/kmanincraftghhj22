import { Glow, cam, clamp01, storyScene } from "../../engine";
import { PATH_Y, PORCH_Y, VILLAGE, villageWalkRoute } from "./marks";
import {
  Bits,
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
  seesawSurfaceY,
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
        const dadSq = 0.28 * wind + pop(t, bounceAt, 0.3) * 0.38;
        const dadTopY = PATH_Y + 1.38 * (1 - dadSq * 0.08);
        const kidY = dadTopY + launch * 2.15 + Math.sin(launch * Math.PI) * 1.05;
        const kidX = 4.85 + launch * 1.95;
        const b2 = slimeBounce(t, 1.7, 0.28, 0.35);
        return (
          <>
            <NeighborBigDad
              variant={0}
              position={[4.85, PATH_Y, 2.5]}
              rotationY={0.35}
              squash={dadSq}
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
        dist: 4.35,
        to: 3.35,
        yaw: -58,
        pitch: 24,
        fov: 42,
        fovTo: 39,
      }),
      impacts: [sceneImpact("3.corner", "3.plank", "jumped", 0.045, 0.3)],
      ease: "outCubic",
      note: "Dynamic tilt-down push: all four tiny dads leap high together in one parabolic arc and slam onto the seesaw!",
      stage: (t) => {
        const jumpAt = w("3.plank", "jumped");
        const k = tw(t, Math.max(0, jumpAt - 0.32), jumpAt + 0.18);
        const landed = k > 0.85;
        const tilt = 0.13 - (landed ? 0.08 : 0);
        const arcY = Math.sin(k * Math.PI) * 0.72;
        const zStart = 1.62;
        const zLand = 2.65;
        const zCur = zStart + (zLand - zStart) * k;
        const heroY = seesawSurfaceY(PATH_Y, 3.5, tilt, 4.42);
        const dadFrontY = (1 - k) * PATH_Y + k * seesawSurfaceY(PATH_Y, 3.5, tilt, zLand - 0.12);
        const dadBackY = (1 - k) * PATH_Y + k * seesawSurfaceY(PATH_Y, 3.5, tilt, zLand + 0.24);
        return (
          <>
            <SeesawPlank position={[4.35, PATH_Y, 3.5]} tilt={tilt} />
            <Hero
              position={[4.35, heroY, 4.42]}
              rotationY={0.25}
              pose={posed("crouch", t, { head: [0.18, 0.25, 0] })}
              plantFeet
              face="brave"
            />
            <TinyDad which={1} position={[4.15, dadFrontY + arcY, zCur - 0.12]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            <TinyDad which={2} position={[4.55, dadFrontY + arcY, zCur - 0.12]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            <TinyDad which={3} position={[4.15, dadBackY + arcY, zCur + 0.24]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            <TinyDad which={4} position={[4.55, dadBackY + arcY, zCur + 0.24]} rotationY={SOUTH} squash={landed ? 0.34 : -0.16} />
            {landed ? <Puffs position={[4.35, dadFrontY + 0.05, 2.75]} count={6} color="#f3e6c8" /> : null}
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
        dist: 3.95,
        distTo: 3.25,
        yaw: -38,
        yawTo: -18,
        pitch: 10,
        pitchTo: 6,
        fov: 40,
      }),
      handheld: 0.014,
      note: "Hero pops up two tiny inches off the exact seesaw plane and slumps smoothly in embarrassment while two schoolkids bounce-laugh behind him.",
      stage: (t) => {
        const hop = Math.sin(tw(t, 0.04, 0.38) * Math.PI) * 0.08;
        const laugh = tw(t, w("3.inch", "laughed") - 0.15, w("3.inch", "laughed") + 0.35);
        const tilt = 0.05;
        return (
          <>
            <SeesawPlank position={[4.35, PATH_Y, 3.5]} tilt={tilt} />
            <Hero
              position={[4.35, seesawSurfaceY(PATH_Y, 3.5, tilt, 4.42) + hop, 4.42]}
              rotationY={SOUTH - 0.15}
              animation="idle"
              blendTo="ache"
              blend={laugh}
              plantFeet
              face="frown"
              gaze={0}
              headPitch={0.28 * laugh}
            />
            <TinyDad which={1} position={[4.15, seesawSurfaceY(PATH_Y, 3.5, tilt, 2.58), 2.58]} rotationY={SOUTH} squash={0.26} mood="sad" />
            <TinyDad which={3} position={[4.55, seesawSurfaceY(PATH_Y, 3.5, tilt, 2.82), 2.82]} rotationY={SOUTH} squash={0.28} mood="sad" />
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
      ...cam.orbit({
        on: [0, 0.42, -10.2],
        onTo: [-0.15, 0.36, -9.85],
        dist: 3.65,
        distTo: 2.75,
        yaw: 28,
        yawTo: -14,
        pitch: 16,
        pitchTo: 10,
        fov: 40,
      }),
      note: "Emotional contrast: Hero walks up onto the cottage porch in the background while all four tiny dads stop bouncing and exchange sad looks.",
      stage: (t, { p }) => {
        const droop = tw(t, 0, 0.55);
        const glance = tw(t, 0.42, 0.92);
        const hz = -10.8 - p * 1.55;
        const hy = hz <= -11.8 ? PORCH_Y : PATH_Y + clamp01((-11.6 - hz) / 0.2) * (PORCH_Y - PATH_Y);
        return (
          <>
            <Hero
              position={[0, hy, hz]}
              rotationY={3.14}
              animation="walk"
              animDistance={p * 1.55}
              plantFeet
              face="frown"
              headPitch={0.28}
            />
            <TinyDad which={1} position={[-0.72, PATH_Y, -9.65]} rotationY={0.25 - glance * 0.65} squash={0.14 + droop * 0.16} mood="sad" nod={0.2 * droop} />
            <TinyDad which={2} position={[-0.24, PATH_Y, -9.55]} rotationY={0.1 + glance * 0.55} squash={0.14 + droop * 0.16} mood="sad" nod={0.22 * droop} />
            <TinyDad which={3} position={[0.24, PATH_Y, -9.58]} rotationY={-0.1 - glance * 0.65} squash={0.16 + droop * 0.18} mood="sad" nod={0.24 * droop} />
            <TinyDad which={4} position={[0.72, PATH_Y, -9.68]} rotationY={-0.25 - glance * 0.75} squash={0.14 + droop * 0.16} mood="sad" nod={0.2 * droop} />
          </>
        );
      },
    },
    {
      cue: "3.shed",
      zone: "village",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [VILLAGE.shed[0], 0.52, -12.15],
        dist: 4.25,
        distTo: 3.05,
        yaw: -42,
        yawTo: 16,
        pitch: 22,
        pitchTo: 12,
        fov: 42,
      }),
      impacts: [sceneImpact("3.corner", "3.shed", "pressed", 0.038, 0.28)],
      note: "High-energy crafting huddle: four well-spaced tiny dads hop-press glowing slimeballs into a clean pyramid stack with zero overlap!",
      stage: (t) => {
        const pressAt = w("3.shed", "pressed");
        const press = tw(t, Math.max(0, pressAt - 0.3), w("3.shed", "together") + 0.15);
        // Keep all 4 dads on a >=0.56m radius circle around [-5.4, 0, -12.15] so they never overlap each other or the central slimeballs!
        const h1 = slimeHopTo([-6.42, 0, -12.28], [-6.02, 0, -12.22], press, 3, 0.22);
        const h2 = slimeHopTo([-4.38, 0, -12.28], [-4.78, 0, -12.22], press, 3, 0.22);
        const h3 = slimeHopTo([-6.05, 0, -11.35], [-5.74, 0, -11.62], press, 3, 0.22);
        const h4 = slimeHopTo([-4.75, 0, -11.35], [-5.06, 0, -11.62], press, 3, 0.22);
        return (
          <>
            {/* Distinct non-overlapping 3-slimeball cluster that fuses into a neat glowing block */}
            <SlimeballProp position={[-5.4 - 0.24 * (1 - press * 0.45), 0.02, -12.18]} scale={1.05 + press * 0.35} squash={press * 0.22} />
            <SlimeballProp position={[-5.4 + 0.24 * (1 - press * 0.45), 0.02, -12.18]} scale={1.05 + press * 0.35} squash={press * 0.22} />
            <SlimeballProp position={[-5.4, 0.24 + press * 0.08, -12.15]} scale={0.95 + press * 0.42} squash={press * 0.22} />
            <Glow position={[-5.4, 0.38, -12.15]} size={0.7 + press * 1.45} color="#8eff62" opacity={0.18 + press * 0.34} />
            {press > 0.45 ? <Bits position={[-5.4, 0.38, -12.15]} t={t - pressAt * 0.6} color="#9dff70" count={14} power={1.05} /> : null}
            <TinyDad which={1} position={h1.position} rotationY={0.55} hop={h1.hop} squash={h1.squash + 0.16 * press} mood="angry" />
            <TinyDad which={2} position={h2.position} rotationY={-0.55} hop={h2.hop} squash={h2.squash + 0.16 * press} mood="angry" />
            <TinyDad which={3} position={h3.position} rotationY={0.35} hop={h3.hop} squash={h3.squash + 0.16 * press} mood="happy" />
            <TinyDad which={4} position={h4.position} rotationY={-0.35} hop={h4.hop} squash={h4.squash + 0.16 * press} mood="angry" />
          </>
        );
      },
    },
  ],
});
