import type React from "react";
import {
  Block,
  Chest,
  CitizenLead,
  Creeper,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  FloatingNumber,
  Glow,
  OrbitingItemRing,
  PLACE,
  Vox,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Shared Frame-0 & Final-Loop camera and stage for a seamless Shorts loop. */
export const LOOP_CAM = cam.push({
  on: on(PLACE.square, 0, 1.4, -0.4),
  dist: 7.3,
  to: 6.1,
  yaw: 10,
  pitch: 9,
  fov: 45,
});

export const LoopTaxStage: React.FC<{ t: number }> = ({ t }) => (
  <>
    <CitizenLead nameTag="Leo" position={on(PLACE.square, -0.9, 0, 0.6)} rotationY={0.2} animation="cheer" face="grin" time={t} />
    <Chest position={on(PLACE.square, 1.1, 0, 0.4)} open={0.75} />
    <EmeraldFountain position={on(PLACE.square, 1.1, 0.9, 0.4)} t={Math.max(0, t - 0.08)} count={16} color="#4ce8ff" />
    <FloatingItemPyramid count={10} position={on(PLACE.square, -0.9, 2.35, 0.6)} color="#4ce8ff" t={t} />
    <ExplainerCrowd positions={[on(PLACE.square, -3.0, 0, -2.2), on(PLACE.square, 2.8, 0, -2.0), on(PLACE.square, -2.2, 0, -3.4)]} animation="wave" time={t} />
  </>
);

/** Scene 1 (Beats 1–2): Zero Taxes -> Dark Grass -> Creepers Blow Up Leo's House. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Zero Taxes & Creepers",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "square",
      note: "Loopable Frame-0 hook: Leo cheers beside a glowing diamond fountain and town chest.",
      stage: (t) => <LoopTaxStage t={t} />,
    },
    {
      cue: "1.ten",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Leo proudly holds up 10 orbiting cyan diamonds every single day.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="cheer" face="grin" time={t} />
          <OrbitingItemRing count={10} radius={0.85} position={on(PLACE.square, 0, 1.35, 0.8)} color="#4ce8ff" t={t} />
          <FloatingNumber text="10" color="#4ce8ff" position={on(PLACE.square, 0, 2.7, 0.8)} height={0.75 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "1.keep",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "square",
      note: "No king, no rules — Leo laughs proudly keeping all 10 diamonds in his own chest.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -0.5, 0, 0.8)} rotationY={0.2} animation="laugh" face="grin" time={t} />
          <Chest position={on(PLACE.square, 0.9, 0, 0.8)} open={0.85} />
          <FloatingItemPyramid count={10} position={on(PLACE.square, 0.9, 1.45, 0.8)} color="#4ce8ff" t={t} />
        </>
      ),
    },
    {
      cue: "1.dark",
      ...cam.push({ on: on(PLACE.square, 0, 1.3, 0.5), dist: 7.7, to: 6.4, yaw: 12, pitch: 9, fov: 46 }),
      zone: "square",
      look: "overworld-night",
      note: "Hard cut to dark night: Leo shrugs in pitch-dark spawn with zero torches.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <FloatingNumber text="0 TORCHES" color="#ff6b57" position={on(PLACE.square, 0, 2.55, 0.8)} height={0.62 * pop(t, 0.15)} />
        </>
      ),
    },
    {
      cue: "1.roads",
      ...cam.truck({ on: on(PLACE.square, 0, 1.1, 0.2), dist: 7.7, yaw: 0, pitch: 12, by: [1.4, 0, 0], fov: 46 }),
      zone: "square",
      look: "overworld-night",
      note: "Empty dark grass with Leo's small lonely oak house and zero walls around it.",
      stage: (t) => (
        <>
          <Vox kind="planks" position={on(PLACE.square, 0, 1.1, -1.6)} size={[3.2, 2.2, 3.0]} />
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="cower" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "2.night",
      ...cam.twoShot({ a: on(PLACE.square, -1.4, 0, 0.8), b: on(PLACE.square, 1.4, 0, 0.8), facing: 0, dist: 7.1, to: 5.8, side: -10, pitch: 8, fov: 46 }),
      zone: "square",
      look: "overworld-night",
      note: "Three green Creepers creep forward out of the dark grass toward Leo's house!",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Creeper position={on(PLACE.square, -1.5, 0, -0.4 + step * 1.1)} rotationY={0.15} swell={step * 0.4} />
            <Creeper position={on(PLACE.square, 0, 0, -0.8 + step * 1.2)} rotationY={0} swell={step * 0.5} />
            <Creeper position={on(PLACE.square, 1.5, 0, -0.4 + step * 1.1)} rotationY={-0.15} swell={step * 0.4} />
          </>
        );
      },
    },
    {
      cue: "2.boom",
      ...cam.front({ actor: on(PLACE.square, 0, 0.4, 0.8), facing: 0, dist: 6.7, to: 5.6, side: 14, pitch: 8, fov: 46 }),
      zone: "square",
      look: "overworld-night",
      note: "BOOM! Creeper blasts Leo's roof as -5 diamonds flash bright coral-red!",
      stage: (t) => {
        const boomAt = Math.max(0.15, wordAt("2.boom", "Boom") + 0.05);
        const hit = t >= boomAt;
        return (
          <>
            <CitizenLead nameTag="Leo" position={on(PLACE.square, -1.1, 0, 1.0)} rotationY={0.35} animation="cower" face="fear" time={t} />
            {!hit ? (
              <Creeper position={on(PLACE.square, 0.8, 0, 0.8)} rotationY={-0.25} swell={0.9} />
            ) : (
              <>
                <Glow position={on(PLACE.square, 0.8, 1.2, 0.8)} size={3.6} color="#ff8844" opacity={0.65} />
                <Block position={on(PLACE.square, 0.5, 1.8 + (t - boomAt) * 1.6, 0.7)} size={[0.45, 0.45, 0.45]} color="#8c6239" />
                <FloatingNumber text="-5" color="#ff4f42" position={on(PLACE.square, 0.8, 2.6, 0.8)} height={0.85 * pop(t, boomAt)} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "2.again",
      ...cam.twoShot({ a: on(PLACE.square, -1.1, 0, 0.8), b: on(PLACE.square, 1.1, 0, 0.8), facing: 0, dist: 6.7, to: 5.6, side: -12, pitch: 8, fov: 45 }),
      zone: "square",
      look: "overworld-night",
      note: "Next night, a Creeper blasts Leo's friend's house too while both players panic.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -1.2, 0, 1.0)} rotationY={0.2} animation="cower" face="sad" time={t} />
          <CitizenLead nameTag="Sam" position={on(PLACE.square, 1.2, 0, 1.0)} rotationY={-0.2} animation="cower" face="fear" time={t} />
          <Creeper position={on(PLACE.square, 0, 0, -0.4)} rotationY={0} swell={0.65} />
          <Glow position={on(PLACE.square, 0, 1.2, -0.4)} size={2.6} color="#ff8844" opacity={0.35} />
        </>
      ),
    },
    {
      cue: "2.broke",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Leo shrugs helplessly beside one tiny stone block — nobody can afford a whole wall alone.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -0.5, 0, 0.8)} rotationY={0.15} animation="shrug" face="sad" time={t} />
          <Vox kind="stoneBrick" position={on(PLACE.square, 0.9, 0.45, 0.8)} size={[0.9, 0.9, 0.9]} />
          <FloatingNumber text="TOO EXPENSIVE" color="#ff6b57" position={on(PLACE.square, 0.2, 2.65, 0.8)} height={0.55 * pop(t, 0.15)} />
        </>
      ),
    },
  ],
});
