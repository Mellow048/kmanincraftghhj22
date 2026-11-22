import { cam, storyScene } from "../../engine";
import { PATH_Y } from "./marks";
import {
  CHILD,
  DadStack,
  EAST,
  GROUND_SIT,
  Hero,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SlimeBlockProp,
  SubscribeSign,
  TinyDad,
  Villager,
  WEST,
  Wheelbarrow,
  groundSitPose,
  openArmsPose,
  pop,
  sceneImpact,
  skyJoyPose,
  slimeBounce,
  slimeHopTo,
  timing,
  tw,
  w,
} from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Zero-Damage Hug & Roof Jump Victory",
  shots: [
    {
      cue: "7.hug",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0, 0.58, -10.8],
        dist: 4.35,
        distTo: 3.35,
        yaw: -32,
        yawTo: 12,
        pitch: 18,
        pitchTo: 10,
        fov: 41,
      }),
      handheld: 0.012,
      note: "Sunny morning payoff: sitting in front of their cottage, Hero opens his arms as all four tiny dads hop onto his lap without hurting him!",
      stage: (t) => {
        const hopIn = tw(t, 0.08, 0.68);
        const h1 = slimeHopTo([-1.15, PATH_Y, -10.35], [-0.42, PATH_Y, -10.52], hopIn, 2, 0.22);
        const h2 = slimeHopTo([1.15, PATH_Y, -10.35], [0.42, PATH_Y, -10.52], hopIn, 2, 0.22);
        const h3 = slimeHopTo([-0.65, PATH_Y, -9.95], [-0.18, PATH_Y + 0.18 * hopIn, -10.48], hopIn, 2, 0.24);
        const h4 = slimeHopTo([0.65, PATH_Y, -9.95], [0.18, PATH_Y + 0.18 * hopIn, -10.48], hopIn, 2, 0.24);
        return (
          <>
            <Hero
              position={[0, PATH_Y + GROUND_SIT, -10.85]}
              rotationY={SOUTH}
              pose={groundSitPose(t, {
                armR: openArmsPose(t).armR,
                armL: openArmsPose(t).armL,
                head: [0.18, Math.sin(t * 3) * 0.12, 0],
              })}
              face="grin"
            />
            <TinyDad which={1} position={h1.position} rotationY={2.75} hop={h1.hop} squash={h1.squash} />
            <TinyDad which={2} position={h2.position} rotationY={-2.75} hop={h2.hop} squash={h2.squash} />
            <TinyDad which={3} position={h3.position} rotationY={3.0} hop={h3.hop} squash={h3.squash} />
            <TinyDad which={4} position={h4.position} rotationY={-3.0} hop={h4.hop} squash={h4.squash} />
          </>
        );
      },
    },
    {
      cue: "7.hold",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [0, 0.56, -10.7],
        dist: 2.95,
        to: 2.25,
        yaw: 16,
        pitch: 12,
        fov: 37,
        fovTo: 34,
      }),
      handheld: 0.01,
      note: "Heartfelt macro close-up: all four tiny dads cuddle against Hero's chest and shoulders at once as a pixel heart floats up!",
      stage: (t) => {
        const b = (ph: number) => slimeBounce(t, 1.8, 0.06, ph);
        return (
          <>
            <Hero
              position={[0, PATH_Y + GROUND_SIT, -10.85]}
              rotationY={SOUTH}
              pose={groundSitPose(t, {
                bodyPitch: 0.16,
                armR: [-1.18, -0.36, 0],
                armL: [-1.18, 0.36, 0],
                head: [0.14, Math.sin(t * 2.6) * 0.1, 0],
              })}
              face="grin"
              gaze={0}
            />
            <TinyDad which={1} position={[-0.44, PATH_Y, -10.55]} rotationY={2.6} hop={b(0).hop} squash={0.14 + b(0).squash} />
            <TinyDad which={2} position={[0.44, PATH_Y, -10.55]} rotationY={-2.6} hop={b(0.25).hop} squash={0.14 + b(0.25).squash} />
            <TinyDad which={3} position={[-0.16, PATH_Y + 0.24, -10.52]} rotationY={2.95} hop={b(0.5).hop} squash={0.16 + b(0.5).squash} />
            <TinyDad which={4} position={[0.18, PATH_Y + 0.24, -10.52]} rotationY={-2.95} hop={b(0.75).hop} squash={0.16 + b(0.75).squash} />
            <PixelHeart position={[0, 1.25 + t * 0.22, -10.75]} scale={0.75} />
          </>
        );
      },
    },
    {
      cue: "7.roof",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [4.35, 1.15, 3.6],
        onTo: [6.35, 5.15, 6.2],
        dist: 6.4,
        to: 7.8,
        yaw: -32,
        pitch: -5,
        fov: 45,
        fovTo: 48,
      }),
      impacts: [sceneImpact("7.hug", "7.roof", "bounced", 0.05, 0.32)],
      note: "TRIUMPHANT SKYWARD CRANE: Hero bounces off the Slime Block (`skyJoyPose`) soaring right past the school Bell Tower!",
      stage: (t) => {
        const launchAt = w("7.roof", "bounced") - 0.1;
        const launch = tw(t, Math.max(0, launchAt), w("7.roof", "tower") + 0.3);
        const heroY = PATH_Y + 0.88 + launch * 4.55 + Math.sin(launch * Math.PI) * 1.35;
        const heroX = 4.35 + launch * 1.95;
        const heroZ = 3.6 + launch * 2.55;
        const b = (ph: number) => slimeBounce(t, 2.4, 0.2, ph);
        return (
          <>
            <SlimeBlockProp position={[4.35, PATH_Y, 3.6]} squash={pop(t, Math.max(0.08, launchAt), 0.32) * 0.55} glow={1} />
            <Hero
              position={[heroX, heroY, heroZ]}
              rotationY={-0.45}
              pose={skyJoyPose(t)}
              face="grin"
            />
            <TinyDad which={1} position={[3.55, PATH_Y, 3.2]} rotationY={0.45} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[3.55, PATH_Y, 4.0]} rotationY={0.45} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[5.15, PATH_Y, 3.2]} rotationY={-0.45} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[5.15, PATH_Y, 4.0]} rotationY={-0.45} hop={b(0.75).hop} squash={b(0.75).squash} />
            <Villager position={[5.55, PATH_Y, 4.95]} rotationY={WEST + 0.3} scale={CHILD} robe={ROBE.farmer} lookAt={[heroX, heroY, heroZ]} />
            <Villager position={[3.25, PATH_Y, 4.75]} rotationY={0.45} scale={CHILD} robe={ROBE.white} lookAt={[heroX, heroY, heroZ]} />
            <Puffs position={[4.35, 0.95, 3.6]} count={10} color="#c5ff9e" />
          </>
        );
      },
    },
    {
      cue: "7.gate",
      zone: "village",
      look: "overworld-day",
      ...cam.truck({
        on: [0.4, 0.85, 3.5],
        dist: 4.55,
        yaw: -36,
        pitch: 12,
        by: [2.55, 0, 0],
        fov: 43,
      }),
      ease: "linear",
      handheld: 0.015,
      note: "Proud arrival `cam.truck`: Hero wheels all four bouncing dads right through the front school gate while schoolkids cheer!",
      stage: (t, { p }) => {
        const dist = p * 2.55;
        const x = -0.15 + dist;
        return (
          <>
            <Hero
              position={[x - 0.72, PATH_Y, 3.5]}
              rotationY={EAST}
              animation="walk"
              arms="hold"
              animDistance={dist}
              plantFeet
              face="grin"
            />
            <Wheelbarrow
              position={[x + 0.28, PATH_Y, 3.5]}
              rotationY={EAST}
              tilt={-0.08}
              wheelSpin={dist * 4.8}
              withDads
              dadBounce={t * 8.5}
            />
            <Villager position={[3.25, PATH_Y, 2.25]} rotationY={-0.55} scale={CHILD} robe={ROBE.farmer} lookAt={[x, 0.8, 3.5]} />
            <Villager position={[3.35, PATH_Y, 4.75]} rotationY={-2.55} scale={CHILD} robe={ROBE.white} lookAt={[x, 0.8, 3.5]} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [0, 0.92, -8.85],
        dist: 4.65,
        to: 3.75,
        yaw: -10,
        pitch: 8,
        fov: 42,
        fovTo: 39,
      }),
      handheld: 0.012,
      impacts: [sceneImpact("7.hug", "8.sub", "slips", 0.032, 0.24)],
      note: "Punchy CTA + callback gag: Hero waves beside his four-dad stack holding SubscribeSign—until Dad #3 comically slips out on 'slips'!",
      stage: (t) => {
        const slipAt = w("8.sub", "slips");
        const slip = tw(t, slipAt - 0.08, slipAt + 0.36);
        const b = slimeBounce(t, 2.0, 0.08, 0.1);
        return (
          <>
            <Hero
              position={[-0.58, PATH_Y, -8.88]}
              rotationY={0.14}
              animation="wave"
              face="grin"
              gaze={0}
              headYaw={slip * 0.22}
            />
            <SubscribeSign
              position={[-0.02, 0.92, -8.48]}
              rotationY={-0.08}
              scale={0.45}
              tilt={Math.sin(t * 6) * 0.04}
            />
            <TinyDad which={1} position={[0.68, PATH_Y, -8.82]} rotationY={-0.18} squash={b.squash} />
            <TinyDad which={2} position={[0.68, PATH_Y + 0.37, -8.82]} rotationY={-0.18} squash={b.squash * 0.9} />
            <TinyDad
              which={3}
              position={[0.68 + slip * 0.56, PATH_Y + 0.74 * (1 - slip) + Math.sin(slip * Math.PI) * 0.22, -8.78 + slip * 0.18]}
              rotationY={-0.18 + slip * 0.85}
              squash={slip > 0.85 ? 0.36 : b.squash * 0.8}
              mood={slip > 0.2 ? "scared" : "happy"}
            />
            <TinyDad
              which={4}
              position={[0.68, PATH_Y + 1.11 - slip * 0.37, -8.8]}
              rotationY={-0.18}
              squash={pop(t, slipAt + 0.2, 0.24) * 0.28}
            />
          </>
        );
      },
    },
  ],
});
