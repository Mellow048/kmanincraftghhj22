import {
  Bread,
  Chest,
  CitizenLead,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  Official,
  PLACE,
  ShopStall,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Shared Frame-0 & Final-Loop camera and stage for a seamless YouTube Shorts loop! */
export const LOOP_CAM = cam.push({
  on: on(PLACE.square, 0, 1.45, -0.8),
  dist: 6.2,
  to: 5.2,
  yaw: 8,
  pitch: 9,
  fov: 46,
});

export const LoopMarketStage: React.FC<{ t: number }> = ({ t }) => (
  <>
    <ShopStall price={2} position={on(PLACE.square, -2.6, 0, -1.6)} t={t} showPickaxe={false} />
    <ShopStall price={2} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
    <ShopStall price={2} position={on(PLACE.square, 2.6, 0, -1.6)} t={t} showPickaxe={false} />
    <Bread position={on(PLACE.square, 0, 1.35 + Math.sin(t * 3.5) * 0.08, -0.95)} scale={1.4} />
    <CitizenLead nameTag="Miles" position={on(PLACE.square, -1.1, 0, 1.1)} rotationY={0.25} headYaw={Math.sin(t * 2.5) * 0.2} animation="point" face="grin" time={t} />
    <EmeraldFountain position={on(PLACE.square, 0, 1.6, -1.0)} t={Math.max(0, t - 0.1)} count={16} />
  </>
);

/** Scene 1 (Beats 1–2): 3 Competing Bakers -> Sterling Buys Everyone Out. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Competition & The Buyout",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "square",
      note: "Cold open Frame-0 hook (matches final loop shot): 3 competing bread stalls at 2 emeralds each + emerald burst.",
      stage: (t) => <LoopMarketStage t={t} />,
    },
    {
      cue: "1.three",
      ...cam.truck({ on: on(PLACE.square, -2.4, 1.35, -0.8), dist: 5.8, yaw: 6, pitch: 8, by: [4.8, 0, 0], fov: 46 }),
      zone: "square",
      note: "Smooth lateral truck across all 3 competing bakers waving behind their stalls.",
      stage: (t) => (
        <>
          <ShopStall price={2} position={on(PLACE.square, -2.6, 0, -1.6)} t={t} showPickaxe={false} />
          <ShopStall price={2} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
          <ShopStall price={2} position={on(PLACE.square, 2.6, 0, -1.6)} t={t} showPickaxe={false} />
          <ExplainerCrowd
            positions={[on(PLACE.square, -2.6, 0, -1.8), on(PLACE.square, 0, 0, -1.8), on(PLACE.square, 2.6, 0, -1.8)]}
            animation="wave"
            face="smile"
            time={t}
          />
        </>
      ),
    },
    {
      cue: "1.two",
      ...cam.push({ on: on(PLACE.square, 0, 1.4, -1.0), dist: 4.8, to: 3.9, yaw: -10, pitch: 7, fov: 44 }),
      zone: "square",
      note: "Front push onto the center 2-emerald bread stall with bouncing golden loaf.",
      stage: (t) => (
        <>
          <ShopStall price={2} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
          <Bread position={on(PLACE.square, 0, 1.35 + Math.sin(t * 4) * 0.08, -0.95)} scale={1.5} />
          <Official role="mod" position={on(PLACE.square, 0, 0, -1.8)} rotationY={0} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.save",
      ...cam.front({ actor: on(PLACE.square, -0.6, 0, 1.1), facing: 0, dist: 5.0, to: 4.2, side: 16, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Miles walks happily past the stalls with FloatingItemPyramid of saved emeralds overhead.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.8));
        return (
          <>
            <ShopStall price={2} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
            <FloatingItemPyramid count={6} position={on(PLACE.square, -1.2 + w * 1.1, 2.25, 1.1)} t={t} />
            <CitizenLead nameTag="Miles" position={on(PLACE.square, -1.2 + w * 1.1, 0, 1.1)} rotationY={w < 0.9 ? Math.PI / 2 : 0.25} animation={w < 0.9 ? "walk" : "cheer"} animDistance={w * 1.1} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.best",
      ...cam.twoShot({ a: on(PLACE.square, -2.0, 0, 0.6), b: on(PLACE.square, 0.8, 0, 0.6), facing: 0, dist: 5.8, to: 4.9, side: -8, pitch: 8, fov: 46 }),
      zone: "square",
      note: "Left stall flips to 5 so Miles briskly walks right to the 2-emerald stall next door.",
      stage: (t) => {
        const w = ease(ramp(t, 0.1, 0.9));
        return (
          <>
            <ShopStall price={5} position={on(PLACE.square, -2.4, 0, -1.6)} t={t} showPickaxe={false} />
            <ShopStall price={2} position={on(PLACE.square, 0.8, 0, -1.6)} t={t} showPickaxe={false} />
            <CitizenLead nameTag="Miles" position={on(PLACE.square, -2.0 + w * 2.6, 0, 0.6)} rotationY={w > 0.02 && w < 0.98 ? Math.PI / 2 : 0.2} animation={w > 0.02 && w < 0.98 ? "walk" : "point"} animDistance={w * 2.6} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.rich",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 1.0), facing: 0, dist: 5.0, to: 4.1, side: -16, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Sterling struts into the square beside a glowing emerald-stuffed Chest.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.square, 1.25, 0, 1.0)} open={ease(ramp(t, 0.1, 0.7))} gold={1} kind="emerald" />
          <EliteLead variant="tycoon" nameTag="Sterling" position={on(PLACE.square, -0.3, 0, 1.0)} rotationY={0.15} animation="cheer" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "2.buy1",
      ...cam.twoShot({ a: on(PLACE.square, -2.4, 0, -0.4), b: on(PLACE.square, -0.6, 0, 0.8), facing: 0, dist: 5.4, to: 4.6, side: 14, pitch: 8, fov: 46 }),
      zone: "square",
      note: "Sterling tosses emeralds and shuts down the first bakery stall (price flips to SOLD).",
      stage: (t) => {
        const shut = t > wordAt("2.buy1", "shuts");
        return (
          <>
            <ShopStall price={shut ? "SOLD" : 2} position={on(PLACE.square, -2.4, 0, -1.6)} t={t} showPickaxe={false} />
            <EliteLead variant="tycoon" nameTag="Sterling" position={on(PLACE.square, -0.6, 0, 0.8)} rotationY={-0.4} animation="point" face="smug" time={t} />
            <EmeraldFountain position={on(PLACE.square, -2.0, 1.2, -0.8)} t={Math.max(0, t - 0.15)} count={12} />
          </>
        );
      },
    },
    {
      cue: "2.buy2",
      ...cam.twoShot({ a: on(PLACE.square, 0.6, 0, 0.8), b: on(PLACE.square, 2.4, 0, -0.4), facing: 0, dist: 5.4, to: 4.6, side: -14, pitch: 8, fov: 46 }),
      zone: "square",
      note: "Sterling knocks down the second stall on the spoken word.",
      stage: (t) => {
        const drop = t > wordAt("2.buy2", "knocks") ? 0.15 : 1;
        return (
          <>
            <group scale={[1, drop, 1]}>
              <ShopStall price={2} position={on(PLACE.square, 2.4, 0, -1.6)} t={t} showPickaxe={false} />
            </group>
            <EliteLead variant="tycoon" nameTag="Sterling" position={on(PLACE.square, 0.6, 0, 0.8)} rotationY={0.4} animation="push" face="smug" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.one",
      ...cam.push({ on: on(PLACE.square, 0, 1.5, -1.2), dist: 6.4, to: 5.2, yaw: 10, pitch: 10, fov: 46 }),
      zone: "square",
      note: "Wide reveal: only Sterling's crowned mega-shop remains in the entire square.",
      stage: (t) => (
        <>
          <ShopStall price={2} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 0, 0, -1.8)} rotationY={0} animation="laugh" face="smug" time={t} />
        </>
      ),
    },
  ],
});
