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
        on: [0, 0.72, -9.8],
        onTo: [0, 0.52, -10.55],
        dist: 4.85,
        distTo: 3.45,
        yaw: 36,
        yawTo: -16,
        pitch: 18,
        pitchTo: 9,
        fov: 43,
      }),
      handheld: 0.014,
      impacts: [sceneImpact("7.hug", "7.hug", "hug", 0.035, 0.26)],
      note: "Visual contrast gag + warm payoff: behind Hero, a big neighbour slime accidentally boings its kid backward while Hero kneels and all four tiny dads sprint-hop safely into his open arms!",
      stage: (t) => {
        const boingAt = w("7.hug", "hug");
        const bgKnock = tw(t, Math.max(0.05, boingAt - 0.1), boingAt + 0.45);
        const hopIn = tw(t, 0.12, 0.85);
        const h1 = slimeHopTo([-1.45, PATH_Y, -10.15], [-0.42, PATH_Y, -10.52], hopIn, 3, 0.24);
        const h2 = slimeHopTo([1.45, PATH_Y, -10.15], [0.42, PATH_Y, -10.52], hopIn, 3, 0.24);
        const h3 = slimeHopTo([-0.85, PATH_Y, -9.65], [-0.18, PATH_Y + 0.18 * hopIn, -10.48], hopIn, 3, 0.26);
        const h4 = slimeHopTo([0.85, PATH_Y, -9.65], [0.18, PATH_Y + 0.18 * hopIn, -10.48], hopIn, 3, 0.26);
        return (
          <>
            {/* Background comedy proof of "A big dad could never hug me without hurting me"! */}
            <NeighborBigDad
              variant={0}
              position={[-1.85 + jolt(t, boingAt, 0.22), PATH_Y, -13.1]}
              rotationY={0.55}
              squash={pop(t, boingAt, 0.25) * 0.32}
            />
            <Villager
              position={[-0.75 + bgKnock * 1.55, PATH_Y + Math.sin(bgKnock * Math.PI) * 0.42, -12.95]}
              rotationY={-0.55}
              scale={CHILD}
              robe={ROBE.farmer}
              lean={-bgKnock * 0.85}
            />
            <Hero
              position={[0, PATH_Y + GROUND_SIT, -10.85]}
              rotationY={SOUTH}
              pose={groundSitPose(t, {
                armR: openArmsPose(t).armR,
                armL: openArmsPose(t).armL,
                head: [0.18, Math.sin(t * 3.5) * 0.16, 0],
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
      ...cam.orbit({
        on: [0, 0.65, -10.75],
        dist: 3.15,
        distTo: 2.32,
        yaw: -44,
        yawTo: 22,
        pitch: 14,
        pitchTo: 5,
        fov: 38,
      }),
      handheld: 0.012,
      note: "Joyful 4-way cuddle orbit: Dad #1 hops right onto Hero's head while #2, #3, #4 squish his cheeks & chest as three PixelHearts pop!",
      stage: (t) => {
        const crown = slimeHopTo([-0.48, PATH_Y, -10.55], [0, PATH_Y + 0.92, -10.82], tw(t, 0.05, 0.58), 2, 0.28);
        const b = (ph: number) => slimeBounce(t, 2.2, 0.08, ph);
        return (
          <>
            <Hero
              position={[0, PATH_Y + GROUND_SIT, -10.85]}
              rotationY={SOUTH}
              pose={groundSitPose(t, {
                bodyPitch: 0.14,
                armR: [-1.22, -0.38, 0],
                armL: [-1.22, 0.38, 0],
                head: [0.1, Math.sin(t * 4.2) * 0.16, 0],
              })}
              face="grin"
              gaze={0}
            />
            <TinyDad which={1} position={crown.position} rotationY={SOUTH} hop={crown.hop} squash={crown.squash + 0.12} />
            <TinyDad which={2} position={[0.42, PATH_Y + 0.22, -10.62]} rotationY={-2.4} hop={b(0.25).hop} squash={0.16 + b(0.25).squash} />
            <TinyDad which={3} position={[-0.38, PATH_Y + 0.22, -10.62]} rotationY={2.4} hop={b(0.5).hop} squash={0.16 + b(0.5).squash} />
            <TinyDad which={4} position={[0.02, PATH_Y + 0.26, -10.48]} rotationY={3.14} hop={b(0.75).hop} squash={0.18 + b(0.75).squash} />
            <PixelHeart position={[-0.45, 1.15 + t * 0.28, -10.75]} scale={0.62 * tw(t, 0.08, 0.35)} />
            <PixelHeart position={[0.48, 1.28 + t * 0.32, -10.75]} scale={0.72 * tw(t, 0.28, 0.55)} />
            <PixelHeart position={[0, 1.55 + t * 0.26, -10.78]} scale={0.85 * tw(t, 0.45, 0.75)} />
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
        onTo: [6.45, 5.45, 6.45],
        dist: 6.5,
        to: 7.85,
        yaw: -34,
        pitch: -5,
        fov: 45,
        fovTo: 48,
      }),
      impacts: [
        sceneImpact("7.hug", "7.roof", "bounced", 0.055, 0.32),
        sceneImpact("7.hug", "7.roof", "tower", 0.042, 0.28),
      ],
      note: "TRIUMPHANT BELL-TOWER LAUNCH: all four dads double-bounce the Slime Block, rocketing Hero past the ringing school Bell Tower while the whole schoolyard cheers!",
      stage: (t) => {
        const launchAt = w("7.roof", "bounced") - 0.12;
        const bellAt = w("7.roof", "tower");
        const launch = tw(t, Math.max(0, launchAt), bellAt + 0.28);
        const heroY = PATH_Y + 0.88 + launch * 4.95 + Math.sin(launch * Math.PI) * 1.45;
        const heroX = 4.35 + launch * 2.05;
        const heroZ = 3.6 + launch * 2.85;
        const b = (ph: number) => slimeBounce(t, 2.8, 0.26, ph);
        return (
          <>
            <SlimeBlockProp position={[4.35, PATH_Y, 3.6]} squash={pop(t, Math.max(0.08, launchAt), 0.34) * 0.58} glow={1} />
            <Hero
              position={[heroX, heroY, heroZ]}
              rotationY={-0.45 + launch * 0.35}
              pose={skyJoyPose(t)}
              face="grin"
            />
            {t >= bellAt - 0.1 ? (
              <SoundRings position={[7.2, 4.4, 7.8]} t={t - (bellAt - 0.1)} color="#ffe066" reach={2.1} />
            ) : null}
            <TinyDad which={1} position={[3.55, PATH_Y, 3.2]} rotationY={0.45} hop={b(0).hop} squash={b(0).squash} />
            <TinyDad which={2} position={[3.55, PATH_Y, 4.0]} rotationY={0.45} hop={b(0.25).hop} squash={b(0.25).squash} />
            <TinyDad which={3} position={[5.15, PATH_Y, 3.2]} rotationY={-0.45} hop={b(0.5).hop} squash={b(0.5).squash} />
            <TinyDad which={4} position={[5.15, PATH_Y, 4.0]} rotationY={-0.45} hop={b(0.75).hop} squash={b(0.75).squash} />
            <Villager position={[5.55, PATH_Y + Math.abs(Math.sin(t * 9)) * 0.12, 4.95]} rotationY={WEST + 0.3} scale={CHILD} robe={ROBE.farmer} lookAt={[heroX, heroY, heroZ]} />
            <Villager position={[3.25, PATH_Y + Math.abs(Math.cos(t * 9)) * 0.12, 4.75]} rotationY={0.45} scale={CHILD} robe={ROBE.white} lookAt={[heroX, heroY, heroZ]} />
            <NeighborBigDad variant={1} position={[2.65, PATH_Y + b(0.4).hop, 2.25]} rotationY={0.55} squash={b(0.4).squash} />
            <Puffs position={[4.35, 0.95, 3.6]} count={12} color="#c5ff9e" />
          </>
        );
      },
    },
    {
      cue: "7.gate",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.65, 0.95, 3.5],
        onTo: [3.25, 0.95, 3.5],
        dist: 4.75,
        distTo: 3.85,
        yaw: 56,
        yawTo: 22,
        pitch: 14,
        pitchTo: 8,
        fov: 44,
      }),
      handheld: 0.015,
      note: "Hero & stacked dads BOTH centered: Hero jogs proudly through the school gate pushing the wheelbarrow with his tall waving DadStack while four schoolkids jump cheering!",
      stage: (t, { p }) => {
        const dist = p * 2.75;
        const x = 0.55 + dist;
        return (
          <>
            <Hero
              position={[x - 0.52, PATH_Y, 3.5]}
              rotationY={EAST}
              animation="run"
              arms="hold"
              animDistance={dist * 1.15}
              plantFeet
              face="grin"
              gaze={0}
            />
            <Wheelbarrow
              position={[x + 0.48, PATH_Y, 3.5]}
              rotationY={EAST}
              tilt={-0.08 + Math.sin(t * 10) * 0.02}
              wheelSpin={dist * 5.8}
            />
            <DadStack
              position={[x + 0.48, PATH_Y + 0.28, 3.5]}
              rotationY={EAST}
              sway={Math.sin(t * 6.5) * 0.32}
              squash={0.08 + Math.abs(Math.sin(t * 8)) * 0.12}
              topLean={0.22}
            />
            <Villager position={[2.85, PATH_Y + Math.abs(Math.sin(t * 9)) * 0.14, 1.95]} rotationY={-0.35} scale={CHILD} robe={ROBE.farmer} lookAt={[x, 1.0, 3.5]} />
            <Villager position={[3.85, PATH_Y + Math.abs(Math.cos(t * 9)) * 0.14, 2.05]} rotationY={-0.65} scale={CHILD} robe={ROBE.brown} lookAt={[x, 1.0, 3.5]} />
            <Villager position={[2.95, PATH_Y + Math.abs(Math.cos(t * 8.5)) * 0.14, 5.05]} rotationY={-2.65} scale={CHILD} robe={ROBE.white} lookAt={[x, 1.0, 3.5]} />
            <Villager position={[3.95, PATH_Y + Math.abs(Math.sin(t * 8.5)) * 0.14, 4.95]} rotationY={-2.35} scale={CHILD} robe={ROBE.smith} lookAt={[x, 1.0, 3.5]} />
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
        dist: 4.65,
        distTo: 3.65,
        yaw: 18,
        yawTo: -12,
        pitch: 11,
        pitchTo: 5,
        fov: 42,
      }),
      handheld: 0.012,
      impacts: [
        sceneImpact("7.hug", "8.sub", "subscribe", 0.032, 0.24),
        sceneImpact("7.hug", "8.sub", "slips", 0.038, 0.26),
      ],
      note: "3-beat kinetic CTA: SubscribeSign pops open + dads rapid-stack, Hero points & waves, and Dad #3 slips comically out of the stack landing with a pancake boing!",
      stage: (t) => {
        const subPop = tw(t, 0.02, 0.38);
        const slipAt = Math.max(0.85, w("8.sub", "slips") - 0.22);
        const slip = tw(t, slipAt, slipAt + 0.34);
        const b = slimeBounce(t, 2.4, 0.1, 0.1);
        return (
          <>
            <Hero
              position={[-0.62, PATH_Y, -8.88]}
              rotationY={0.16}
              animation={t < 0.9 ? "point" : "wave"}
              face="grin"
              gaze={0}
              headYaw={slip * 0.28}
            />
            <SubscribeSign
              position={[-0.02, 0.92 + pop(t, 0.22, 0.28) * 0.12, -8.48]}
              rotationY={-0.08}
              scale={0.46 * subPop}
              tilt={Math.sin(t * 7) * 0.05 + slip * 0.06}
            />
            <TinyDad which={1} position={[0.68, PATH_Y, -8.82]} rotationY={-0.18} squash={b.squash} />
            <TinyDad
              which={2}
              position={[(1 - subPop) * 0.35 + 0.68, PATH_Y + 0.37 * subPop, -8.82]}
              rotationY={-0.18}
              squash={b.squash * 0.9}
            />
            <TinyDad
              which={3}
              position={[
                0.68 + slip * 0.64,
                PATH_Y + 0.74 * subPop * (1 - slip) + Math.sin(slip * Math.PI) * 0.32,
                -8.78 + slip * 0.22,
              ]}
              rotationY={-0.18 + slip * 1.45}
              squash={slip > 0.82 ? 0.42 : b.squash * 0.8}
              mood={slip > 0.15 ? "scared" : "happy"}
            />
            <TinyDad
              which={4}
              position={[0.68, PATH_Y + (1.11 * subPop) - slip * 0.37, -8.8]}
              rotationY={-0.18}
              squash={pop(t, slipAt + 0.24, 0.26) * 0.34}
            />
            {slip > 0.75 ? <Puffs position={[1.32, PATH_Y + 0.12, -8.56]} count={6} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
  ],
});
