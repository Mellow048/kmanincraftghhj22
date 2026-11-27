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
  moveBetween,
  on,
  pop,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Shared Frame-0 & Final-Loop camera and stage for a seamless Shorts loop. */
export const LOOP_CAM = cam.streetOverview({
  from: on(PLACE.street, 0, 0, 11),
  to: on(PLACE.street, 0, 0, 5.5),
  height: 5.4,
  fov: 46,
});

export const LoopTaxStage: React.FC<{ t: number }> = ({ t }) => (
  <>
    <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.2, 0, 0.5)} rotationY={0.2} animation="cheer" face="grin" time={t} />
    <CitizenLead variant="sam" nameTag="Sam" position={on(PLACE.street, 2.2, 0, -2.5)} rotationY={-0.3} animation="wave" face="smile" time={t} />
    <CitizenLead variant="alex" position={on(PLACE.street, -2.4, 0, -4.0)} rotationY={0.35} animation="wave" face="grin" time={t} />
    <Chest position={on(PLACE.street, 1.2, 0, 0.4)} open={0.8} />
    <EmeraldFountain position={on(PLACE.street, 1.2, 0.9, 0.4)} t={Math.max(0, t - 0.08)} count={18} color="#4ce8ff" />
    <FloatingItemPyramid count={10} position={on(PLACE.street, -1.2, 2.35, 0.5)} color="#4ce8ff" t={t} />
  </>
);

/** Scene 1 (Beats 1–2): Zero Taxes -> Dark Village Street -> Creepers March Out of Alley & Blast Leo's House. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Zero Taxes & Creepers",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "street",
      note: "High crane street overview hook: Leo cheers beside diamond fountain & chest with villagers along the 56m street.",
      stage: (t) => <LoopTaxStage t={t} />,
    },
    {
      cue: "1.ten",
      ...cam.track({ from: on(PLACE.street, -1.5, 0, 8), to: on(PLACE.street, -1.5, 0, 1.5), sideDist: 5.6, side: 1, lead: 2.0 }),
      zone: "street",
      note: "Tracking shot down the street: Leo walks home carrying 10 orbiting cyan diamonds!",
      stage: (t) => {
        const w = moveBetween(on(PLACE.street, -1.5, 0, 8), on(PLACE.street, -1.5, 0, 1.5), t, 0, 1.9);
        return (
          <>
            <CitizenLead variant="leo" nameTag="Leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
            <OrbitingItemRing count={10} radius={0.85} position={[w.position[0], 1.35, w.position[2]]} color="#4ce8ff" t={t} />
            <FloatingNumber text="10" color="#4ce8ff" position={[w.position[0], 2.75, w.position[2]]} height={0.62 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "1.keep",
      ...cam.sweep({ on: on(PLACE.street, -2.5, 1.3, 0), dist: 6.4, fromYaw: 75, toYaw: 112, pitch: 8 }),
      zone: "street",
      note: "Cross-street parallax sweep facing Leo's house: Leo laughs stashing all 10 diamonds in his own chest.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -3.0, 0, 0.6)} rotationY={Math.PI / 2} animation="laugh" face="grin" time={t} />
          <Chest position={on(PLACE.street, -3.0, 0, -0.8)} rotationY={Math.PI / 2} open={0.85} />
          <FloatingItemPyramid count={10} position={on(PLACE.street, -3.0, 1.45, -0.8)} color="#4ce8ff" t={t} />
        </>
      ),
    },
    {
      cue: "1.dark",
      ...cam.streetOverview({ from: on(PLACE.street, 0, 0, -6), to: on(PLACE.street, 0, 0, 4), height: 5.5, fov: 48 }),
      zone: "street",
      look: "overworld-night",
      note: "Reverse-angle crane down the dark night street: Leo shrugs in pitch darkness with 0 torches.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, 0, 0, -2)} rotationY={Math.PI} animation="shrug" face="uneasy" time={t} />
          <FloatingNumber text="0 TORCHES" color="#ff6b57" position={on(PLACE.street, 0, 2.6, -2)} height={0.58 * pop(t, 0.15)} />
        </>
      ),
    },
    {
      cue: "1.roads",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.2, -5), dist: 7.4, fromYaw: -35, toYaw: 10, pitch: 12 }),
      zone: "street",
      look: "overworld-night",
      note: "Wide night sweep across the unprotected street as Leo and Sam look around nervously.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.6, 0, -4)} rotationY={0.2} animation="cower" face="worried" time={t} />
          <CitizenLead variant="sam" nameTag="Sam" position={on(PLACE.street, 1.8, 0, -5)} rotationY={-0.3} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.night",
      ...cam.heroLow({ on: on(PLACE.street, -2.5, 0, -1.5), dist: 6.4, yaw: 65 }),
      zone: "street",
      look: "overworld-night",
      note: "Low-angle alley shot: 3 green Creepers physically march out of the dark gap between houses!",
      stage: (t) => {
        const c1 = moveBetween(on(PLACE.street, -7.5, 0, -2.5), on(PLACE.street, -1.5, 0, -2.5), t, 0, 1.8);
        const c2 = moveBetween(on(PLACE.street, -8.2, 0, -1.0), on(PLACE.street, -2.2, 0, -1.0), t, 0.1, 1.9);
        const c3 = moveBetween(on(PLACE.street, -7.8, 0, 0.4), on(PLACE.street, -1.8, 0, 0.4), t, 0.2, 2.0);
        return (
          <>
            <Creeper position={c1.position} rotationY={c1.rotationY} swell={0.35} />
            <Creeper position={c2.position} rotationY={c2.rotationY} swell={0.45} />
            <Creeper position={c3.position} rotationY={c3.rotationY} swell={0.35} />
          </>
        );
      },
    },
    {
      cue: "2.boom",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.4, 0), dist: 6.8, fromYaw: -22, toYaw: 18, pitch: 8 }),
      zone: "street",
      look: "overworld-night",
      note: "BOOM! Creeper explodes beside Leo as debris flies and -5 diamonds flashes coral-red!",
      stage: (t) => {
        const boomAt = Math.max(0.15, wordAt("2.boom", "Boom") + 0.05);
        const hit = t >= boomAt;
        return (
          <>
            <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.6, 0, 0.8)} rotationY={0.45} animation="cower" face="fear" time={t} />
            {!hit ? (
              <Creeper position={on(PLACE.street, 0.8, 0, 0.5)} rotationY={-0.35} swell={0.92} />
            ) : (
              <>
                <Glow position={on(PLACE.street, 0.8, 1.3, 0.5)} size={4.0} color="#ff8844" opacity={0.7} />
                <Block position={on(PLACE.street, 0.4, 1.8 + (t - boomAt) * 1.6, 0.5)} size={[0.45, 0.45, 0.45]} color="#8c6239" />
                <Block position={on(PLACE.street, 1.3, 1.5 + (t - boomAt) * 1.9, 0.2)} size={[0.38, 0.38, 0.38]} color="#6b4928" />
                <FloatingNumber text="-5" color="#ff4f42" position={on(PLACE.street, 0.8, 2.75, 0.5)} height={0.72 * pop(t, boomAt)} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "2.again",
      ...cam.sweep({ on: on(PLACE.street, 2.5, 1.3, 4), dist: 6.8, fromYaw: -105, toYaw: -68, pitch: 8 }),
      zone: "street",
      look: "overworld-night",
      note: "Cross-street angle on Sam's side: distinct teal-hoodie Sam & Leo panic as another Creeper swells!",
      stage: (t) => (
        <>
          <CitizenLead variant="sam" nameTag="Sam" position={on(PLACE.street, 3.0, 0, 3.0)} rotationY={-Math.PI / 2} animation="cower" face="fear" time={t} />
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, 3.0, 0, 5.2)} rotationY={-Math.PI / 2} animation="cower" face="sad" time={t} />
          <Creeper position={on(PLACE.street, 1.2, 0, 4.1)} rotationY={Math.PI / 2} swell={0.72} />
          <Glow position={on(PLACE.street, 1.2, 1.2, 4.1)} size={2.8} color="#ff8844" opacity={0.38} />
        </>
      ),
    },
    {
      cue: "2.broke",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.3, 2), dist: 6.4, fromYaw: 15, toYaw: -20, pitch: 9 }),
      zone: "street",
      note: "Morning after: Leo, Sam, and Alex shrug around one lonely stone block — too expensive alone.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.5, 0, 2.0)} rotationY={0.3} animation="shrug" face="sad" time={t} />
          <CitizenLead variant="alex" nameTag="Alex" position={on(PLACE.street, 1.6, 0, 2.0)} rotationY={-0.3} animation="shrug" face="worried" time={t} />
          <Vox kind="stoneBrick" position={on(PLACE.street, 0, 0.45, 1.8)} size={[0.9, 0.9, 0.9]} />
          <FloatingNumber text="TOO MUCH!" color="#ff6b57" position={on(PLACE.street, 0, 2.55, 1.8)} height={0.56 * pop(t, 0.12)} />
        </>
      ),
    },
  ],
});
