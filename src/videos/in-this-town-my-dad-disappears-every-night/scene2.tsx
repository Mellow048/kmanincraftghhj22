import {
  Block,
  BlockSheep,
  DEG,
  EAST,
  Fence,
  FloatingNumber,
  Hero,
  LoafPile,
  Player,
  PotionSwirl,
  Puffs,
  ROOM_POS,
  SOUTH,
  Vox,
  WEST,
  cam,
  ease,
  on,
  ramp,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 2 — Shame at home -> Strange morning miracles around the town. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Strange morning miracles",
  shots: [
    {
      cue: "2.hood",
      ...cam.track({ from: [1.2, 0, 10.5], to: [-1.4, 0, 6.2], sideDist: 5.8, side: -1, height: 1.5, lead: 1.6, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Lateral tracking shot: kid pulls his OWN SUNNY YELLOW HOOD low and hurries home fast down the golden afternoon street.",
      stage: (t, { dur }) => {
        const walk = walkSegment([1.2, 0, 10.5], [-1.4, 0, 6.2], t, 0, dur, { gait: "run" });
        return (
          <>
            <Hero {...walk} animDistance={walk.animDistance} yellowHood hoodLow face="frown" headPitch={0.28} />
            <Player who={6} position={[2.2, 0, 8.2]} rotationY={WEST} animation="idle" face="calm" />
          </>
        );
      },
    },
    {
      cue: "2.chair",
      ...cam.sweep({ on: on(ROOM_POS, 0, 1.05, -0.4), dist: 5.8, distTo: 4.7, fromYaw: -16, toYaw: 18, pitch: 11, fov: 46 }),
      zone: "room",
      look: "overworld-night",
      hud: { clock: "8:00 PM" },
      note: "Warm interior dining room: kid sits alone at left side of oak dinner table staring across at Dad's empty chair.",
      stage: (t) => {
        const emptyAt = w("2.chair", "empty");
        return (
          <group position={ROOM_POS}>
            <Hero position={[-1.4, 0, -0.4]} rotationY={EAST} animation="sit" face="frown" lookAt={on(ROOM_POS, 1.4, 0.9, -0.4)} />
            {t >= emptyAt ? <FloatingNumber text="EMPTY" position={[1.45, 1.75, -0.4]} color="#ff4f42" height={0.38} /> : null}
          </group>
        );
      },
    },
    {
      cue: "2.shame",
      ...cam.front({ actor: on(ROOM_POS, -1.4, 0.25, -0.4), facing: SOUTH, dist: 6.0, to: 4.9, side: 18, pitch: 6, fov: 45 }),
      zone: "room",
      look: "overworld-night",
      hud: { clock: "8:05 PM" },
      note: "Heartbreaking close push on the kid (continuous seated position [-1.4, 0, -0.4]!) with downturned frown, tears, and drooping head.",
      stage: (t) => {
        const shameAt = w("2.shame", "shame");
        return (
          <group position={ROOM_POS}>
            <Hero
              position={[-1.4, 0, -0.4]}
              rotationY={26 * DEG}
              animation={t > shameAt ? "ache" : "sit"}
              face="frown"
              tears={0.85}
              headPitch={0.18 + ease(ramp(t, shameAt - 0.1, shameAt + 0.5)) * 0.24}
            />
            <PotionSwirl position={[1.4, 1.0, -0.4]} t={t} intensity={0.75} />
          </group>
        );
      },
    },
    {
      cue: "2.wrong",
      ...cam.streetOverview({ from: [0, 0, 16], to: [0, 0, 8], on: [0, 1.2, 5.0], onTo: [0, 1.2, 2.0], height: 6.2, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      hud: { clock: "7:00 AM · NEXT DAY" },
      note: "Bright morning high overview locked onto the village street as neighbors step outside pointing in amazement.",
      stage: (t, { dur }) => {
        const kidWalk = walkSegment([0, 0, 9.5], [0, 0, 5.5], t, 0, dur, { gait: "walk" });
        return (
          <>
            <Hero {...kidWalk} animDistance={kidWalk.animDistance} face="wow" />
            <Player who={1} position={[-2.3, 0, 5.5]} rotationY={EAST} animation="point" face="wow" />
            <Player who={2} position={[2.2, 0, 2.5]} rotationY={WEST} animation="wave" face="grin" />
            <Player who={3} position={[-2.1, 0, -3.0]} rotationY={EAST} animation="cheer" face="grin" />
          </>
        );
      },
    },
    {
      cue: "3.weird",
      ...cam.track({ from: [-0.8, 0, 4.5], to: [1.6, 0, 0.5], sideDist: 5.8, side: 1, height: 1.6, lead: 1.5, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Tracking kid walking curiously down the sunlit morning street looking left and right at buzzing neighbors.",
      stage: (t, { dur }) => {
        const walk = walkSegment([-0.8, 0, 4.5], [1.6, 0, 0.5], t, 0, dur, { gait: "walk" });
        return (
          <>
            <Hero {...walk} animDistance={walk.animDistance} face="wow" />
            <Player who={4} position={[-2.4, 0, 2.0]} rotationY={EAST} animation="point" face="wow" />
            <Player who={5} position={[2.5, 0, -1.2]} rotationY={WEST} animation="talk" face="grin" />
          </>
        );
      },
    },
    {
      cue: "3.hole",
      ...cam.heroLow({ on: [-2.4, 0.8, -5.0], dist: 6.4, yaw: 68, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Low angle looking up at Old Nora pointing anxiously up at the broken dark gap in her wooden roof.",
      stage: (t) => {
        const holeAt = w("3.hole", "hole");
        return (
          <>
            <Player who={7} position={[-2.2, 0, -5.0]} rotationY={EAST} animation={t > holeAt ? "point" : "shrug"} face="sad" headPitch={-0.25 - ramp(t, holeAt, holeAt + 0.4) * 0.25} />
            <group position={[-4.2, 3.3, -5.0]}>
              <Vox kind="planks" tint="#7c5328" position={[-0.7, 0, 0]} size={[1.1, 0.18, 2.6]} />
              <Vox kind="planks" tint="#7c5328" position={[0.7, 0, 0]} size={[1.1, 0.18, 2.6]} />
              <Block position={[0, 0.04, 0]} size={[0.7, 0.16, 1.3]} color="#16141a" />
            </group>
          </>
        );
      },
    },
    {
      cue: "3.fixed",
      ...cam.sweep({ on: [-2.4, 2.2, -5.0], dist: 6.6, distTo: 5.3, fromYaw: 52, toYaw: 94, pitch: -4, fov: 45 }),
      zone: "town",
      look: "overworld-day",
      note: "Sweeping up to Nora's roof as fresh golden oak planks pop cleanly into the hole on 'patched' and Nora cheers!",
      stage: (t) => {
        const patchAt = w("3.fixed", "patched");
        const k = ease(ramp(t, patchAt, patchAt + 0.35));
        return (
          <>
            <Player who={7} position={[-2.2, 0, -5.0]} rotationY={EAST} animation={t > patchAt ? "cheer" : "idle"} face={t > patchAt ? "grin" : "wow"} />
            <Hero position={[0.2, 0, -4.6]} rotationY={WEST} animation="point" face="wow" />
            <group position={[-4.2, 3.3, -5.0]}>
              <Vox kind="planks" tint="#7c5328" position={[-0.7, 0, 0]} size={[1.1, 0.18, 2.6]} />
              <Vox kind="planks" tint="#7c5328" position={[0.7, 0, 0]} size={[1.1, 0.18, 2.6]} />
              {k > 0.02 ? (
                <Vox kind="planks" tint="#e5b462" position={[0, 0.05 + (1 - k) * 0.5, 0]} size={[0.82 * k, 0.22, 1.4]} />
              ) : null}
            </group>
            {t >= patchAt ? <Puffs position={[-3.8, 3.4, -5.0]} color="#fff0c4" /> : null}
          </>
        );
      },
    },
    {
      cue: "3.baker",
      ...cam.sweep({ on: [2.8, 1.3, -9.8], dist: 6.2, distTo: 5.0, fromYaw: -76, toYaw: -52, pitch: 9, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Brick Bakery & raised wooden front porch: baker steps onto his porch in delight as 10 golden loaves sit neatly ON the waist-high bread stand!",
      stage: (t) => {
        const tenAt = w("3.baker", "ten");
        return (
          <>
            <Player who={8} position={[3.8, 0.24, -10.5]} rotationY={WEST} animation={t > tenAt ? "wave" : "idle"} face="grin" />
            <LoafPile position={[3.42, 1.02, -9.05]} rotationY={-Math.PI / 2} count={10} />
            <Hero position={[0.45, 0, -11.4]} rotationY={115 * DEG} animation="idle" face="wow" />
            {t >= tenAt ? <FloatingNumber text="10 LOAF" position={[3.42, 2.35, -9.05]} color="#ffd84d" height={0.42} /> : null}
          </>
        );
      },
    },
    {
      cue: "3.porch",
      ...cam.front({ actor: [3.42, 0.72, -9.05], facing: WEST, dist: 6.4, to: 5.2, side: -22, pitch: 10, fov: 45 }),
      zone: "town",
      look: "overworld-day",
      note: "Close angled push on the wooden Bakery bread stand & front porch (EXACT locked actor coordinates from 3.baker — zero teleport!).",
      stage: (t) => {
        const porchAt = w("3.porch", "porch");
        return (
          <>
            <LoafPile position={[3.42, 1.02, -9.05]} rotationY={-Math.PI / 2} count={10} />
            <Player who={8} position={[3.8, 0.24, -10.5]} rotationY={-125 * DEG} animation={t > porchAt ? "cheer" : "reach"} face="grin" />
            <Hero position={[0.45, 0, -11.4]} rotationY={115 * DEG} animation={t > porchAt ? "point" : "idle"} face="smile" />
          </>
        );
      },
    },
    {
      cue: "3.sheep",
      ...cam.sweep({ on: [-0.8, 0.9, -16.5], dist: 6.6, distTo: 5.3, fromYaw: -26, toYaw: 16, pitch: 12, fov: 45 }),
      zone: "town",
      look: "overworld-day",
      note: "Sweeping past a fluffy white sheep happily hopping inside a fresh oak fence pen.",
      stage: (t) => {
        const fenceAt = w("3.sheep", "fence");
        const hop = Math.abs(Math.sin(t * 5.2)) * 0.22;
        return (
          <>
            <BlockSheep position={[-0.8, 0, -16.5]} rotationY={25 * DEG} hop={hop} />
            <Fence from={[-2.2, 0, -17.8]} to={[0.6, 0, -17.8]} />
            <Fence from={[-2.2, 0, -15.2]} to={[0.6, 0, -15.2]} />
            <Fence from={[-2.2, 0, -17.8]} to={[-2.2, 0, -15.2]} />
            <Fence from={[0.6, 0, -17.8]} to={[0.6, 0, -15.2]} />
            <Hero position={[1.9, 0, -16.2]} rotationY={WEST} animation={t > fenceAt ? "point" : "idle"} face="wow" />
          </>
        );
      },
    },
  ],
});
