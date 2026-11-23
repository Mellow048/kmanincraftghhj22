import { cam, storyScene } from "../../engine";
import { PATH_Y } from "./marks";
import {
  CHILD,
  DadStack,
  EAST,
  GROUND_SIT,
  Hero,
  NeighborBigDad,
  PixelHeart,
  Puffs,
  ROBE,
  SOUTH,
  SlimeBlockProp,
  SoundRings,
  SubscribeSign,
  TinyDad,
  Villager,
  WEST,
  Wheelbarrow,
  groundSitPose,
  jolt,
  openArmsPose,
  pop,
  sceneImpact,
  skyJoyPose,
  slimeBlockTopY,
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
        on: [0, 0.72, -8.85],
        onTo: [0, 0.54, -9.25],
        dist: 4.85,
        distTo: 3.55,
        yaw: 36,
        yawTo: -16,
        pitch: 18,
        pitchTo: 9,
        fov: 43,
      }),
      handheld: 0.014,
      impacts: [sceneImpact("7.hug", "7.hug", "hug", 0.035, 0.26)],
      note: "Zero-phasing contrast gag + warm group hug: NeighborBigDad stands on flat grass (`z = -10.95`, well clear of the `z = -12.0` porch!) while all 4 tiny dads hop neatly around sitting Hero!",
      stage: (t) => {
        const boingAt = w("7.hug", "hug");
        const bgKnock = tw(t, Math.max(0.05, boingAt - 0.1), boingAt + 0.45);
        const hopIn = tw(t, 0.1, 0.85);
        // Land cleanly around Hero (`[0, PATH_Y, -9.35]`, sitting legs extend to `z = -8.82`) with zero leg/torso phasing!
        const h1 = slimeHopTo([-1.48, PATH_Y, -9.05], [-0.56, PATH_Y, -9.22], hopIn, 3, 0.24);
        const h2 = slimeHopTo([1.48, PATH_Y, -9.05], [0.56, PATH_Y, -9.22], hopIn, 3, 0.24);
        const h3 = slimeHopTo([-0.95, PATH_Y, -8.25], [-0.34, PATH_Y, -8.52], hopIn, 3, 0.26);
        const h4 = slimeHopTo([0.95, PATH_Y, -8.25], [0.34, PATH_Y, -8.52], hopIn, 3, 0.26);
        return (
          <>
            {/* Background big slime dad on flat grass `y = 0, z = -10.95` (`1.05m` clear of cottage porch `z = -12.0`!) */}
            <NeighborBigDad
              variant={0}
              position={[-2.05 + jolt(t, boingAt, 0.22), 0, -10.95]}
              rotationY={0.65}
              squash={pop(t, boingAt, 0.25) * 0.32}
            />
            <Villager
              position={[-0.95 + bgKnock * 1.35, PATH_Y + Math.sin(bgKnock * Math.PI) * 0.38, -10.85]}
              rotationY={-0.65}
              scale={CHILD}
              robe={ROBE.farmer}
              lean={-bgKnock * 0.75}
            />
            <Hero
              position={[0, PATH_Y + GROUND_SIT, -9.35]}
              rotationY={SOUTH}
              pose={groundSitPose(t, {
                armR: openArmsPose(t).armR,
                armL: openArmsPose(t).armL,
                head: [0.18, Math.sin(t * 3.5) * 0.16, 0],
              })}
              face="grin"
            />
            <TinyDad which={1} position={h1.position} rotationY={2.55} hop={h1.hop} squash={h1.squash} />
            <TinyDad which={2} position={h2.position} rotationY={-2.55} hop={h2.hop} squash={h2.squash} />
            <TinyDad which={3} position={h3.position} rotationY={2.95} hop={h3.hop} squash={h3.squash} />
            <TinyDad which={4} position={h4.position} rotationY={-2.95} hop={h4.hop} squash={h4.squash} />
          </>
        );
      },
    },
    {
      cue: "7.hold",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0, 0.64, -9.2],
        dist: 3.25,
        distTo: 2.45,
        yaw: -42,
        yawTo: 22,
        pitch: 15,
        pitchTo: 6,
        fov: 39,
      }),
      handheld: 0.012,
      note: "Zero-phasing 4-way cuddle: #1 hops cleanly onto Hero's head (`y = PATH_Y + 0.91`), #2 & #3 sit on the ground against his hips inside wide-wrapped arms, and #4 bounces in front!",
      stage: (t) => {
        // Single high `0.68m` vault (`hops=1`) from `x=-1.08` so #1 arcs cleanly OVER Hero's shoulder onto his head!
        const crown = slimeHopTo([-1.08, PATH_Y, -9.38], [0, PATH_Y + 0.94, -9.38], tw(t, 0.05, 0.58), 1, 0.68);
        const b = (ph: number) => slimeBounce(t, 2.2, 0.08, ph);
        return (
          <>
            <Hero
              position={[0, PATH_Y + GROUND_SIT, -9.35]}
              rotationY={SOUTH}
              pose={groundSitPose(t, {
                bodyPitch: 0.08,
                // Wide hugging arms wrapped OVER/AROUND `#2` & `#3` so sleeves never skewer through slime cubes!
                armR: [-0.62, -0.78, -0.45],
                armL: [-0.62, 0.78, 0.45],
                head: [0.08, Math.sin(t * 4.2) * 0.15, 0],
              })}
              face="grin"
              gaze={0}
            />
            <TinyDad which={1} position={crown.position} rotationY={SOUTH} hop={crown.hop} squash={crown.squash + 0.1} />
            <TinyDad which={2} position={[-0.56, PATH_Y, -9.18]} rotationY={2.2} hop={b(0.25).hop} squash={0.14 + b(0.25).squash} />
            <TinyDad which={3} position={[0.56, PATH_Y, -9.18]} rotationY={-2.2} hop={b(0.5).hop} squash={0.14 + b(0.5).squash} />
            <TinyDad which={4} position={[0, PATH_Y, -8.48]} rotationY={3.14} hop={b(0.75).hop} squash={0.16 + b(0.75).squash} />
            <PixelHeart position={[-0.52, 1.15 + t * 0.28, -9.25]} scale={0.62 * tw(t, 0.08, 0.35)} />
            <PixelHeart position={[0.52, 1.28 + t * 0.32, -9.25]} scale={0.72 * tw(t, 0.28, 0.55)} />
            <PixelHeart position={[0, 1.58 + t * 0.26, -9.32]} scale={0.85 * tw(t, 0.45, 0.75)} />
          </>
        );
      },
    },
    {
      cue: "7.roof",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [4.35, 1.25, 3.6],
        onTo: [5.55, 5.65, 5.95],
        dist: 6.65,
        to: 7.85,
        yaw: -36,
        pitch: -5,
        fov: 45,
        fovTo: 48,
      }),
      impacts: [
        sceneImpact("7.hug", "7.roof", "bounced", 0.055, 0.32),
        sceneImpact("7.hug", "7.roof", "tower", 0.042, 0.28),
      ],
      note: "ZERO-PHASING BELL-TOWER LAUNCH: `slimeBlockTopY` keeps Hero's shoes on top of the Slime Block, arcing cleanly in front of the schoolhouse (`x <= 5.55 < 8.1`) & bell tower (`z <= 5.95 < 6.65`)!",
      stage: (t) => {
        const launchAt = w("7.roof", "bounced") - 0.12;
        const bellAt = w("7.roof", "tower");
        const sq = pop(t, Math.max(0.08, launchAt), 0.34) * 0.56;
        const blockTop = slimeBlockTopY(PATH_Y, 1, sq);
        const launch = tw(t, Math.max(0, launchAt), bellAt + 0.28);
        const heroY = blockTop + launch * 4.85 + Math.sin(launch * Math.PI) * 1.35;
        const heroX = 4.35 + launch * 1.15;
        const heroZ = 3.6 + launch * 2.25;
        const b = (ph: number) => slimeBounce(t, 2.8, 0.26, ph);
        return (
          <>
            <SlimeBlockProp position={[4.35, PATH_Y, 3.6]} squash={sq} glow={1} />
            <Hero
              position={[heroX, heroY, heroZ]}
              rotationY={-0.45 + launch * 0.35}
              pose={skyJoyPose(t)}
              face="grin"
            />
            {t >= bellAt - 0.1 ? (
              <SoundRings position={[7.2, 4.4, 7.8]} t={t - (bellAt - 0.1)} color="#ffe066" reach={2.1} />
            ) : null}
            <TinyDad which={1} position={[3.42, PATH_Y, 3.15]} rotationY={0.45} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[3.42, PATH_Y, 4.05]} rotationY={0.45} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[5.28, PATH_Y, 3.15]} rotationY={-0.45} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[5.28, PATH_Y, 4.05]} rotationY={-0.45} hop={b(0.75).hop} squash={b(0.75).squash} />
            <Villager position={[5.85, PATH_Y + Math.abs(Math.sin(t * 9)) * 0.12, 5.15]} rotationY={WEST + 0.3} scale={CHILD} robe={ROBE.farmer} lookAt={[heroX, heroY, heroZ]} />
            <Villager position={[2.85, PATH_Y + Math.abs(Math.cos(t * 9)) * 0.12, 5.05]} rotationY={0.45} scale={CHILD} robe={ROBE.white} lookAt={[heroX, heroY, heroZ]} />
            <NeighborBigDad variant={1} position={[2.35, 0 + b(0.4).hop, 1.95]} rotationY={0.55} squash={b(0.4).squash} />
            <Puffs position={[4.35, blockTop, 3.6]} count={12} color="#c5ff9e" />
          </>
        );
      },
    },
    {
      cue: "7.gate",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.65, 0.98, 3.5],
        onTo: [3.25, 0.98, 3.5],
        dist: 4.85,
        distTo: 3.95,
        yaw: 54,
        yawTo: 22,
        pitch: 14,
        pitchTo: 8,
        fov: 44,
      }),
      handheld: 0.015,
      note: "Zero-phasing school gate parade: `DadStack` sits flush on the wheelbarrow tray (`PATH_Y + 0.42`) and Hero grips the handles (`1.06m` back) rolling proudly between cheering kids!",
      stage: (t, { p }) => {
        const dist = p * 2.75;
        const x = 0.65 + dist;
        return (
          <>
            <Hero
              position={[x - 0.64, PATH_Y, 3.5]}
              rotationY={EAST}
              animation="walk"
              arms="hold"
              animDistance={dist}
              plantFeet
              face="grin"
              gaze={0}
            />
            <Wheelbarrow
              position={[x + 0.44, PATH_Y, 3.5]}
              rotationY={EAST}
              tilt={-0.06 + Math.sin(t * 10) * 0.02}
              wheelSpin={dist * 5.8}
            />
            <DadStack
              position={[x + 0.48, PATH_Y + 0.42, 3.5]}
              rotationY={EAST}
              sway={Math.sin(t * 6.5) * 0.3}
              squash={0.08 + Math.abs(Math.sin(t * 8)) * 0.1}
              topLean={0.2}
            />
            <Villager position={[2.85, PATH_Y + Math.abs(Math.sin(t * 9)) * 0.14, 1.85]} rotationY={-0.35} scale={CHILD} robe={ROBE.farmer} lookAt={[x, 1.0, 3.5]} />
            <Villager position={[3.85, PATH_Y + Math.abs(Math.cos(t * 9)) * 0.14, 1.95]} rotationY={-0.65} scale={CHILD} robe={ROBE.brown} lookAt={[x, 1.0, 3.5]} />
            <Villager position={[2.95, PATH_Y + Math.abs(Math.cos(t * 8.5)) * 0.14, 5.15]} rotationY={-2.65} scale={CHILD} robe={ROBE.white} lookAt={[x, 1.0, 3.5]} />
            <Villager position={[3.95, PATH_Y + Math.abs(Math.sin(t * 8.5)) * 0.14, 5.05]} rotationY={-2.35} scale={CHILD} robe={ROBE.smith} lookAt={[x, 1.0, 3.5]} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.05, 0.92, -8.85],
        dist: 4.85,
        distTo: 3.85,
        yaw: 18,
        yawTo: -12,
        pitch: 12,
        pitchTo: 6,
        fov: 43,
      }),
      handheld: 0.012,
      impacts: [
        sceneImpact("7.hug", "8.sub", "subscribe", 0.032, 0.24),
        sceneImpact("7.hug", "8.sub", "slips", 0.038, 0.26),
      ],
      note: "Clean 3-lane CTA (`Hero` at `x=-0.92`, `SubscribeSign` at `x=0`, `DadStack` at `x=+0.92`): #3 slips cleanly sideways before #4 drops onto #2 with zero overlap!",
      stage: (t) => {
        const subPop = tw(t, 0.02, 0.38);
        const slipAt = Math.max(0.85, w("8.sub", "slips") - 0.22);
        const slip = tw(t, slipAt, slipAt + 0.34);
        const drop4 = tw(t, slipAt + 0.14, slipAt + 0.38);
        const b = slimeBounce(t, 2.4, 0.08, 0.1);
        return (
          <>
            <Hero
              position={[-0.92, PATH_Y, -8.88]}
              rotationY={0.18}
              animation="point"
              blendTo="wave"
              blend={tw(t, 0.78, 1.08)}
              plantFeet
              face="grin"
              gaze={0}
              headYaw={slip * 0.28}
            />
            <SubscribeSign
              position={[0.0, 0.9 + pop(t, 0.22, 0.28) * 0.12, -8.45]}
              rotationY={-0.06}
              scale={0.44 * subPop}
              tilt={Math.sin(t * 7) * 0.05 + slip * 0.06}
            />
            <TinyDad which={1} position={[0.92, PATH_Y, -8.82]} rotationY={-0.18} squash={b.squash} />
            <TinyDad
              which={2}
              position={[0.92 + Math.sin(t * 6) * 0.03, PATH_Y + 0.39, -8.82]}
              rotationY={-0.18}
              squash={b.squash * 0.85}
            />
            <TinyDad
              which={3}
              position={[
                0.92 + slip * 0.68,
                PATH_Y + 0.78 * (1 - slip) + Math.sin(slip * Math.PI) * 0.34,
                -8.8 + slip * 0.22,
              ]}
              rotationY={-0.18 + slip * 1.45}
              squash={slip > 0.82 ? 0.4 : b.squash * 0.75}
              mood={slip > 0.15 ? "scared" : "happy"}
            />
            <TinyDad
              which={4}
              position={[0.92 + Math.sin(t * 6) * 0.05, PATH_Y + 1.17 - drop4 * 0.38, -8.8]}
              rotationY={-0.18}
              squash={pop(t, slipAt + 0.26, 0.26) * 0.32}
            />
            {slip > 0.75 ? <Puffs position={[1.6, PATH_Y + 0.12, -8.56]} count={6} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
  ],
});
