import {
  BabyCow,
  BaronCream,
  Dad,
  EmeraldThrone,
  FloatingNumber,
  Hero,
  MilkBucket,
  Player,
  Sign,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 2 (Beats 3–4): Meet Toby & Moo + Baron Cream Villain + 48 Floating + Dad Lost. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Toby, Moo & Baron Cream",
  shots: [
    {
      cue: "3.me",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 4.6, to: 3.8, side: 14, pitch: 7, fov: 44 }),
      zone: "town",
      note: "Meet Toby waving cheerfully with empty hands.",
      stage: (t) => <Hero position={[0, 0, 1.6]} rotationY={0} animation="wave" face="grin" time={t} />,
    },
    {
      cue: "3.moo",
      ...cam.twoShot({ a: [-0.7, 0, 1.6], b: [0.8, 0, 1.6], facing: 0, dist: 4.8, to: 4.0, side: -12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Toby walks side by side with adorable spotted baby cow Moo wearing Dad's red collar.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Hero position={[-0.7, 0, 0.8 + w * 1.1]} rotationY={0} animation={w > 0.02 && w < 0.98 ? "walk" : "cheer"} animDistance={w * 1.1} face="grin" time={t} />
            <BabyCow position={[0.7, 0, 0.9 + w * 1.1]} rotationY={0} t={t} />
          </>
        );
      },
    },
    {
      cue: "3.laugh",
      ...cam.twoShot({ a: [-1.3, 0, 1.6], b: [1.3, 0, 1.6], facing: 0, dist: 5.4, to: 4.6, side: 10, pitch: 8, fov: 46 }),
      zone: "town",
      note: "Kids laugh pointing at Toby and Moo while Toby frowns.",
      stage: (t) => (
        <>
          <Player who={2} scale={0.8} position={[-1.4, 0, 1.6]} rotationY={0.45} animation="laugh" face="smug" time={t} />
          <Player who={4} scale={0.8} position={[-0.4, 0, 1.4]} rotationY={0.35} animation="point" face="grin" time={t} />
          <Hero position={[1.1, 0, 1.6]} rotationY={-0.3} animation="shrug" face="frown" time={t} />
          <BabyCow position={[2.0, 0, 1.6]} rotationY={-0.3} t={t} />
        </>
      ),
    },
    {
      cue: "3.baron",
      ...cam.front({ actor: [2.2, 0, 0.6], facing: 0, dist: 5.0, to: 4.2, side: -16, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Villain intro: Baron Cream laughs smugly outside his MILK SHOP sign.",
      stage: (t) => (
        <>
          <BaronCream position={[2.2, 0, 0.6]} rotationY={0} animation="laugh" face="smug" time={t} />
          <Sign title="BARON'S MILK SHOP" position={[3.8, 1.0, 0.4]} rotationY={-0.25} />
        </>
      ),
    },
    {
      cue: "3.quote",
      ...cam.twoShot({ a: [0.8, 0, 1.2], b: [-0.9, 0, 1.2], facing: 0, dist: 5.0, to: 4.2, side: 12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Baron Cream points mockingly down at Toby and Moo.",
      stage: (t) => (
        <>
          <BaronCream position={[0.9, 0, 1.2]} rotationY={-0.45} animation="point" face="smug" time={t} />
          <Hero position={[-0.9, 0, 1.2]} rotationY={0.45} animation="cower" face="uneasy" time={t} />
          <BabyCow position={[-1.8, 0, 1.2]} rotationY={0.4} t={t} />
        </>
      ),
    },
    {
      cue: "3.float1",
      ...cam.front({ actor: [0.9, 0, 1.2], facing: 0, dist: 4.6, to: 3.8, side: -14, pitch: 7, fov: 42 }),
      zone: "town",
      note: "Baron Cream mimics floating upward while chuckling.",
      stage: (t) => (
        <BaronCream position={[0.9, 0, 1.2]} rotationY={0} animation="laugh" face="smug" time={t}>
          <MilkBucket position={[0, -0.05, 0.14]} scale={0.95} />
        </BaronCream>
      ),
    },
    {
      cue: "4.shop",
      ...cam.push({ on: [1.5, 1.4, 0.5], dist: 5.8, to: 4.8, yaw: 12, pitch: 9, fov: 46 }),
      zone: "town",
      note: "Wide view of Baron Cream's milk shop lined with gleaming white MilkBuckets.",
      stage: (t) => (
        <>
          <BaronCream position={[1.5, 0, 0.5]} rotationY={0} animation="wave" face="smug" time={t} />
          <MilkBucket position={[0.2, 0.05, 1.3]} scale={1.1} />
          <MilkBucket position={[0.8, 0.05, 1.3]} scale={1.1} />
          <MilkBucket position={[2.2, 0.05, 1.3]} scale={1.1} />
          <Sign title="10 EMERALDS" position={[3.1, 1.0, 0.8]} rotationY={-0.2} />
        </>
      ),
    },
    {
      cue: "4.ten",
      ...cam.front({ actor: [0, 0, 1.4], facing: 0, dist: 4.8, to: 4.0, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "FloatingNumber 10 pops over Baron Cream's shop counter.",
      stage: (t) => (
        <>
          <BaronCream position={[0, 0, 1.4]} rotationY={0} animation="point" face="smile" time={t} />
          <FloatingNumber text="10" color="#4be08a" position={[0, 2.75, 1.4]} height={0.7 * (pop(t, 0.1))} />
        </>
      ),
    },
    {
      cue: "4.hundred",
      ...cam.front({ actor: [0, 0, 1.4], facing: 0, dist: 4.8, to: 4.0, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Price jumps to bright coral-red 100 FloatingNumber as Baron Cream laughs.",
      stage: (t) => (
        <>
          <BaronCream position={[0, 0, 1.4]} rotationY={0} animation="laugh" face="smug" time={t} />
          <FloatingNumber text="100!" color="#ff4f42" position={[0, 2.75, 1.4]} height={0.7 * (1.1 * pop(t, 0.1))} />
        </>
      ),
    },
    {
      cue: "4.throne",
      ...cam.front({ actor: [0, 0.9, 0.8], facing: 0, dist: 5.2, to: 4.3, side: 16, pitch: 9, fov: 44 }),
      zone: "town",
      note: "Baron Cream sits proudly atop his gleaming EmeraldThrone!",
      stage: (t) => (
        <>
          <EmeraldThrone position={[0, 0, 0.8]} />
          <BaronCream position={[0, 0.72, 0.8]} rotationY={0} animation="sit" face="smug" headYaw={Math.sin(t * 2.5) * 0.2} time={t} />
          <FloatingNumber text="9000" color="#ffd84d" position={[0, 3.1, 0.8]} height={0.7 * (pop(t, 0.15))} />
        </>
      ),
    },
    {
      cue: "4.forty8",
      ...cam.push({ on: [0, 2.2, 1.0], dist: 6.8, to: 5.6, yaw: 0, pitch: 10, fov: 48 }),
      zone: "town",
      look: "overworld-golden",
      note: "Dramatic red FloatingNumber 48 hovers over the street as silhouettes float up.",
      stage: (t) => (
        <>
          <FloatingNumber text="48" color="#ff4f42" position={[0, 2.6, 1.0]} height={0.7 * (1.3 * pop(t, 0.1))} />
          <Player who={3} position={[-2.0, 1.2 + t * 1.4, 0.5]} rotationY={0} animation="fall" face="fear" time={t} />
          <Player who={5} position={[2.0, 1.6 + t * 1.4, 0.5]} rotationY={0} animation="fall" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "4.dad",
      ...cam.twoShot({ a: [-0.8, 0, 1.4], b: [0.8, 0, 1.4], facing: 0, dist: 4.8, to: 4.0, side: 12, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Emotional beat: Dad kneels beside Moo's red collar, then begins floating away while Toby reaches up.",
      stage: (t) => {
        const rise = ease(ramp(t, Math.max(0.2, wordAt("4.dad", "collar") - 0.1), 1.0));
        return (
          <>
            <Hero position={[-0.9, 0, 1.4]} rotationY={0.4} animation="reachUp" face="fear" time={t} />
            <BabyCow position={[-1.7, 0, 1.4]} rotationY={0.4} t={t} />
            <Dad position={[0.9, rise * 2.6, 1.4]} rotationY={-0.3} animation={rise > 0.1 ? "fall" : "wave"} face={rise > 0.1 ? "fear" : "smile"} time={t} />
          </>
        );
      },
    },
  ],
});
