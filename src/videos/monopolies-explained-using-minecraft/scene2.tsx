import {
  Balance,
  BarChart,
  Bread,
  ChatToast,
  CitizenLead,
  EliteLead,
  EmeraldFountain,
  FloatingItemPyramid,
  FloatingNumber,
  OrbitingItemRing,
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

/** Scene 2 (Beats 3–5): Shock Flip (2 -> 15), Quality Crash, Monopoly Definition & Balance Scale. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Price Shock & Monopoly Math",
  shots: [
    {
      cue: "3.walk",
      ...cam.front({ actor: on(PLACE.square, -0.6, 0, 1.0), facing: 0, dist: 5.2, to: 4.3, side: 16, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Miles walks up cheerfully holding his emeralds toward the lone shop.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.85));
        return (
          <>
            <ShopStall price={2} position={on(PLACE.square, 0.6, 0, -1.6)} t={t} showPickaxe={false} />
            <CitizenLead nameTag="Miles" position={on(PLACE.square, -1.6 + w * 1.2, 0, 1.2 - w * 0.4)} rotationY={w < 0.98 ? Math.atan2(1.2, -0.4) : 0.35} animation={w < 0.98 ? "walk" : "point"} animDistance={w * 1.3} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.flip",
      ...cam.twoShot({ a: on(PLACE.square, -0.9, 0, 0.8), b: on(PLACE.square, 0.7, 0, -1.2), facing: 0, dist: 5.4, to: 4.5, side: -10, pitch: 8, fov: 46 }),
      zone: "square",
      note: "PriceBillboard flips from 2 to 15 on 'fifteen' as Miles throws both arms up in shock!",
      stage: (t) => {
        const flipped = t >= wordAt("3.flip", "fifteen");
        return (
          <>
            <ShopStall price={flipped ? 15 : 2} position={on(PLACE.square, 0.6, 0, -1.6)} t={t} showPickaxe={false} />
            <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 0.6, 0, -1.8)} rotationY={0} animation="laugh" face="smug" time={t} />
            <CitizenLead nameTag="Miles" position={on(PLACE.square, -1.0, 0, 0.9)} rotationY={0.35} animation={flipped ? "scared" : "point"} face={flipped ? "wow" : "smile"} time={t} />
          </>
        );
      },
    },
    {
      cue: "3.same",
      ...cam.push({ on: on(PLACE.square, 0.6, 1.4, -1.0), dist: 4.8, to: 3.9, yaw: 10, pitch: 7, fov: 44 }),
      zone: "square",
      note: "Tight front push on the exact same bread under the 15-emerald sign.",
      stage: (t) => (
        <>
          <ShopStall price={15} position={on(PLACE.square, 0.6, 0, -1.6)} t={t} showPickaxe={false} />
          <Bread position={on(PLACE.square, 0.6, 1.35 + Math.sin(t * 4) * 0.06, -0.95)} scale={1.4} />
          <FloatingNumber text="15!" color="#ff4f42" position={on(PLACE.square, 0.6, 2.8, -1.2)} height={0.7 * (pop(t, 0.2))} />
        </>
      ),
    },
    {
      cue: "3.what",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 1.0), facing: 0, dist: 4.4, to: 3.6, side: -14, pitch: 6, fov: 42 }),
      zone: "square",
      note: "Miles shrugs directly to camera with a giant ? chat toast.",
      stage: (t) => (
        <>
          <ShopStall price={15} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
          <CitizenLead nameTag="Miles" position={on(PLACE.square, 0, 0, 1.0)} rotationY={0} animation="shrug" face="wow" time={t} />
          <ChatToast text="WHAT HAPPENED?!" position={on(PLACE.square, 0, 2.65, 1.0)} height={0.28 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "3.choice",
      ...cam.push({ on: on(PLACE.square, 0, 1.4, -0.6), dist: 6.2, to: 5.2, yaw: 8, pitch: 9, fov: 46 }),
      zone: "square",
      note: "Visual contrast: 3 -> 1 floating counter over the lone remaining shop.",
      stage: (t) => {
        const one = t > wordAt("3.choice", "Today");
        return (
          <>
            <ShopStall price={one ? 15 : 2} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
            <FloatingNumber text={one ? "1 CHOICE" : "3 CHOICES"} color={one ? "#ff4f42" : "#4be08a"} position={on(PLACE.square, 0, 3.1, -1.0)} height={0.7 * (0.9 * pop(t, 0.1))} />
            <CitizenLead nameTag="Miles" position={on(PLACE.square, -1.1, 0, 1.0)} rotationY={0.25} animation={one ? "cower" : "point"} face={one ? "frown" : "smile"} time={t} />
          </>
        );
      },
    },
    {
      cue: "4.pay",
      ...cam.twoShot({ a: on(PLACE.square, -1.0, 0, 0.8), b: on(PLACE.square, 0.8, 0, 0.4), facing: 0, dist: 5.4, to: 4.6, side: 12, pitch: 8, fov: 46 }),
      zone: "square",
      note: "Miles reluctantly hands over his tall emerald stack to smug Sterling.",
      stage: (t) => (
        <>
          <ShopStall price={15} position={on(PLACE.square, 0.8, 0, -1.6)} t={t} showPickaxe={false} />
          <FloatingItemPyramid count={Math.max(1, Math.round((1 - ramp(t, 0.1, 0.9)) * 10))} position={on(PLACE.square, -1.0, 2.25, 0.8)} t={t} />
          <CitizenLead nameTag="Miles" position={on(PLACE.square, -1.0, 0, 0.8)} rotationY={0.4} animation="reach" face="frown" time={t} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 0.8, 0, -1.8)} rotationY={-0.2} animation="laugh" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "4.cheap",
      ...cam.front({ actor: on(PLACE.square, 0.5, 0, 0.8), facing: 0, dist: 4.8, to: 4.0, side: -16, pitch: 7, fov: 44 }),
      zone: "square",
      note: "Sterling casually shrugs behind his counter while tossing a tiny stale crumb loaf.",
      stage: (t) => (
        <>
          <ShopStall price={15} position={on(PLACE.square, 0.5, 0, -1.6)} t={t} showPickaxe={false} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 0.5, 0, 0.8)} rotationY={0} animation="shrug" face="smug" time={t} />
          <Bread position={on(PLACE.square, -0.7, 1.0, 0.8)} scale={0.55} />
        </>
      ),
    },
    {
      cue: "4.stale",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 1.0), facing: 0, dist: 4.6, to: 3.8, side: 14, pitch: 7, fov: 44 }),
      zone: "square",
      note: "Miles stares in disgust at the tiny stale loaf in front of him.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Miles" position={on(PLACE.square, 0, 0, 1.0)} rotationY={0} animation="cower" face="ouch" time={t} />
          <Bread position={on(PLACE.square, 0.75, 1.15, 1.2)} scale={0.48} />
        </>
      ),
    },
    {
      cue: "4.why",
      ...cam.front({ actor: on(PLACE.hall, 0, 0, -1.0), facing: 0, dist: 5.0, to: 4.2, side: -14, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Inside Sterling's hall: Sterling laughs from his throne with arms wide.",
      stage: (t) => (
        <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.hall, 0, 0, -1.0)} rotationY={0} animation="laugh" face="smug" time={t} />
      ),
    },
    {
      cue: "4.price",
      ...cam.push({ on: on(PLACE.square, 0, 1.4, 0.0), dist: 5.6, to: 4.6, yaw: 10, pitch: 9, fov: 46 }),
      zone: "square",
      note: "Animated BarChart: PRICE bar shoots sky-high while QUALITY bar drops to the floor!",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.85));
        return (
          <BarChart
            position={on(PLACE.square, 0, 0, 0)}
            values={[0.4 + k * 2.4, 2.2 - k * 1.8]}
            labels={["PRICE", "QUALITY"]}
            colors={["#ff4f42", "#4be08a"]}
          />
        );
      },
    },
    {
      cue: "5.name",
      ...cam.push({ on: on(PLACE.hall, 0, 1.5, -1.2), dist: 5.2, to: 4.3, yaw: -12, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Bold title stamp: MONOPOLY pops over crowned Sterling in his hall.",
      stage: (t) => (
        <>
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.hall, 0, 0, -1.2)} rotationY={0} animation="cheer" face="smug" time={t} />
          <ChatToast text="MONOPOLY" position={on(PLACE.hall, 0, 2.9, -1.0)} height={0.34 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "5.rule",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.4), facing: 0, dist: 5.4, to: 4.5, side: 14, pitch: 9, fov: 46 }),
      zone: "square",
      note: "Sterling points across the empty square he now owns alone.",
      stage: (t) => (
        <>
          <ShopStall price={15} position={on(PLACE.square, 0, 0, -1.6)} t={t} showPickaxe={false} />
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.square, 0, 0, 0.4)} rotationY={0} animation="point" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "5.gone",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 5.0, to: 4.2, side: -14, pitch: 8, fov: 44 }),
      zone: "square",
      note: "OrbitingItemRing of Miles's emeralds shrinks as his purchasing power fades.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Miles" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <OrbitingItemRing count={10} radius={0.75 - ease(ramp(t, 0.1, 0.9)) * 0.35} position={on(PLACE.square, 0, 1.35, 1.4)} t={t} />
        </>
      ),
    },
    {
      cue: "5.scale",
      ...cam.push({ on: on(PLACE.square, 0, 1.3, 0.2), dist: 5.2, to: 4.3, yaw: 8, pitch: 9, fov: 46 }),
      zone: "square",
      note: "3D Balance scale starts level: 15 emeralds balancing a stack of bread loaves.",
      stage: (t) => (
        <Balance
          position={on(PLACE.square, 0, 0, 0.2)}
          tilt={0.05 * Math.sin(t * 3)}
          left={<FloatingItemPyramid count={10} position={[0, 0.15, 0]} scale={0.45} t={t} />}
          right={<Bread position={[0, 0.12, 0]} scale={1.1} />}
        />
      ),
    },
    {
      cue: "5.half",
      ...cam.push({ on: on(PLACE.square, 0, 1.3, 0.2), dist: 5.0, to: 4.2, yaw: -10, pitch: 9, fov: 46 }),
      zone: "square",
      note: "Balance scale tips hard downward as 15 emeralds barely buy 1 tiny loaf.",
      stage: (t) => (
        <>
          <Balance
            position={on(PLACE.square, 0, 0, 0.2)}
            tilt={-0.42 * ease(ramp(t, 0.1, 0.8))}
            left={<FloatingItemPyramid count={10} position={[0, 0.15, 0]} scale={0.45} t={t} />}
            right={<Bread position={[0, 0.12, 0]} scale={0.55} />}
          />
          <CitizenLead nameTag="Miles" position={on(PLACE.square, 1.7, 0, 0.6)} rotationY={-0.4} animation="cower" face="ouch" time={t} />
        </>
      ),
    },
    {
      cue: "5.vault",
      ...cam.front({ actor: on(PLACE.hall, 0, 0, -1.0), facing: 0, dist: 5.4, to: 4.5, side: 14, pitch: 9, fov: 46 }),
      zone: "hall",
      note: "Giant EmeraldFountain rains straight into Sterling's vault as he cheers!",
      stage: (t) => (
        <>
          <EliteLead variant="tycoon" nameTag="Sterling" crown position={on(PLACE.hall, 0, 0, -1.0)} rotationY={0} animation="cheer" face="grin" time={t} />
          <EmeraldFountain position={on(PLACE.hall, 0, 1.6, -0.8)} t={t} count={30} />
        </>
      ),
    },
  ],
});
