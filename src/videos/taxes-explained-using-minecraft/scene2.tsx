import {
  Balance,
  BarChart,
  ChatToast,
  Chest,
  CitizenLead,
  Creeper,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  FloatingNumber,
  GoldStatue,
  Official,
  OrbitingItemRing,
  PLACE,
  RuleBoard,
  Torch,
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

/** Scene 2 (Beats 3–5): 20% Tax Deal -> Walls/Torches/Roads Payoff -> Greedy Mod 60% Abuse. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "20% Deal, Walls & Abuse",
  shots: [
    {
      cue: "3.meet",
      ...cam.push({ on: on(PLACE.square, 0, 1.3, 0.6), dist: 7.7, to: 6.4, yaw: -10, pitch: 9, fov: 46 }),
      zone: "square",
      note: "The whole server gathers in the town square around a bright community chest.",
      stage: (t) => (
        <>
          <ExplainerCrowd positions={[on(PLACE.square, -2.2, 0, -0.8), on(PLACE.square, -1.1, 0, -1.0), on(PLACE.square, 0, 0, -1.1), on(PLACE.square, 1.1, 0, -1.0), on(PLACE.square, 2.2, 0, -0.8)]} animation="wave" time={t} />
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -1.2, 0, 1.0)} rotationY={0.25} animation="wave" face="calm" time={t} />
          <Official position={on(PLACE.square, 1.2, 0, 1.0)} rotationY={-0.25} animation="point" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "3.rule",
      ...cam.front({ actor: on(PLACE.hall, 0, 0.5, 0), facing: 0, dist: 6.5, to: 5.4, side: 14, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Official points to a bold RuleBoard displaying the simple server rule.",
      stage: (t) => (
        <>
          <Official position={on(PLACE.hall, -1.1, 0, 0.6)} rotationY={0.35} animation="point" face="smile" time={t} />
          <RuleBoard mode="order" position={on(PLACE.hall, 0.8, 0, 0.2)} rotationY={-0.15} />
        </>
      ),
    },
    {
      cue: "3.two",
      ...cam.twoShot({ a: on(PLACE.square, -0.9, 0, 0.8), b: on(PLACE.square, 0.9, 0, 0.8), facing: 0, dist: 6.3, to: 5.2, side: -12, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Leo drops 2 cyan diamonds out of 10 into the open Town Chest.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -0.9, 0, 0.8)} rotationY={0.4} animation="press" face="uneasy" time={t} />
          <Chest position={on(PLACE.square, 0.9, 0, 0.8)} open={0.8} />
          <FloatingItemPyramid count={2} position={on(PLACE.square, 0.9, 1.35, 0.8)} color="#4ce8ff" t={t} />
          <FloatingNumber text="2 / 10" color="#4ce8ff" position={on(PLACE.square, 0.9, 2.5, 0.8)} height={0.7 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "3.twenty",
      ...cam.front({ actor: on(PLACE.hall, 0, 0.5, 0.4), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Big green 20% TAX callout pops over the open town chest.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.hall, 0, 0, 0.4)} open={0.85} />
          <OrbitingItemRing count={6} radius={0.7} position={on(PLACE.hall, 0, 1.25, 0.4)} color="#4ce8ff" t={t} />
          <FloatingNumber text="20% TAX" color="#4be08a" position={on(PLACE.hall, 0, 2.55, 0.4)} height={0.78 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "3.groan",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 7, fov: 42 }),
      zone: "square",
      note: "Leo groans with a frown watching 2 of his hard-earned diamonds leave his hand.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="shrug" face="frown" time={t} />
          <FloatingNumber text="-2" color="#ff9944" position={on(PLACE.square, 0, 2.6, 0.8)} height={0.72 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "4.mods",
      ...cam.twoShot({ a: on(PLACE.square, -0.9, 0, 0.8), b: on(PLACE.square, 0.9, 0, 0.8), facing: 0, dist: 6.5, to: 5.4, side: 12, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Next morning, the mods open the overflowing town chest bursting with cyan diamonds!",
      stage: (t) => (
        <>
          <Official position={on(PLACE.square, -1.0, 0, 0.8)} rotationY={0.4} animation="cheer" face="grin" time={t} />
          <Chest position={on(PLACE.square, 0.5, 0, 0.8)} open={0.95} />
          <EmeraldFountain position={on(PLACE.square, 0.5, 0.95, 0.8)} t={t} count={18} color="#4ce8ff" />
        </>
      ),
    },
    {
      cue: "4.wall",
      ...cam.push({ on: on(PLACE.square, 0, 1.8, -0.6), dist: 7.9, to: 6.6, yaw: -12, pitch: 8, fov: 46 }),
      zone: "square",
      note: "Builders raise a tall protective stone brick wall rising straight up from the grass!",
      stage: (t) => {
        const rise = ease(ramp(t, 0.05, 0.9));
        return (
          <>
            <Vox kind="stoneBrick" position={on(PLACE.square, 0, 1.5 * rise, -1.6)} size={[8.0, Math.max(0.2, 3.0 * rise), 0.7]} />
            <Official position={on(PLACE.square, -1.4, 0, 0.8)} rotationY={0.2} animation="press" face="grin" time={t} />
            <CitizenLead nameTag="Builder" position={on(PLACE.square, 1.4, 0, 0.8)} rotationY={-0.2} animation="press" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.torch",
      ...cam.truck({ on: on(PLACE.square, 0, 1.3, 0.4), dist: 7.3, yaw: 0, pitch: 9, by: [1.3, 0, 0], fov: 46 }),
      zone: "square",
      look: "overworld-golden",
      note: "Warm bright torches pop along every path lighting the whole village golden.",
      stage: (t) => (
        <>
          {[-2.4, -0.8, 0.8, 2.4].map((x, i) => (
            <Torch key={i} position={on(PLACE.square, x, 0.6, 0.4)} light={2.0} />
          ))}
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 1.4)} rotationY={0} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "4.road",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.7, to: 5.5, side: 14, pitch: 10, fov: 44 }),
      zone: "square",
      note: "Clean paved stone roads stretch right to every door as Leo walks happily down the street.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Vox kind="stoneBrick" position={on(PLACE.square, 0, 0.06, 0.6)} size={[2.6, 0.12, 8.0]} />
            <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, -0.2 + w * 1.4)} rotationY={0} animation="walk" animDistance={w * 1.4} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.safe",
      ...cam.twoShot({ a: on(PLACE.square, -1.2, 0, 0.4), b: on(PLACE.square, 1.2, 0, 0.4), facing: 0, dist: 7.3, to: 6.0, side: -12, pitch: 8, fov: 46 }),
      zone: "square",
      look: "overworld-night",
      note: "At night, Creepers slam harmlessly into the tall stone wall while Leo cheers safely behind it!",
      stage: (t) => {
        const bounce = Math.abs(Math.sin(t * 5)) * 0.45;
        return (
          <>
            <Vox kind="stoneBrick" position={on(PLACE.square, 0, 1.4, -0.2)} size={[6.8, 2.8, 0.6]} />
            <Torch position={on(PLACE.square, -2.0, 2.9, -0.2)} light={2.4} />
            <Torch position={on(PLACE.square, 2.0, 2.9, -0.2)} light={2.4} />
            <Creeper position={on(PLACE.square, -1.2, 0, 0.8 + bounce)} rotationY={Math.PI} />
            <Creeper position={on(PLACE.square, 1.2, 0, 0.9 + bounce)} rotationY={Math.PI} />
            <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 2.8, -0.2)} rotationY={0} animation="cheer" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.math",
      ...cam.front({ actor: on(PLACE.hall, 0, 0.9, 0), facing: 0, dist: 6.7, to: 5.6, side: 12, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Balance scale compares 8 safe diamonds vs 5 left after a creeper blast.",
      stage: (t) => (
        <Balance
          position={on(PLACE.hall, 0, 0, 0)}
          tilt={-0.65 * ease(ramp(t, 0.1, 0.9))}
          left={<FloatingItemPyramid count={8} position={[0, 0.4, 0]} color="#4be08a" t={t} scale={0.75} />}
          right={<FloatingItemPyramid count={5} position={[0, 0.4, 0]} color="#ff4f42" t={t} scale={0.75} />}
        />
      ),
    },
    {
      cue: "4.win",
      ...cam.push({ on: on(PLACE.hall, 0, 1.4, 0), dist: 7.1, to: 5.8, yaw: -10, pitch: 9, fov: 45 }),
      zone: "hall",
      note: "Animated BarChart proves 8 SAFE beats 5 AFTER CREEPER!",
      stage: (t) => {
        const k = ease(ramp(t, 0.08, 0.85));
        return (
          <BarChart
            position={on(PLACE.hall, 0, 0, 0)}
            values={[2.4 * k, 1.4 * k]}
            labels={["8 SAFE", "5 LEFT"]}
            colors={["#4be08a", "#ff4f42"]}
          />
        );
      },
    },
    {
      cue: "5.but",
      ...cam.front({ actor: on(PLACE.hall, 0, 0, 0.6), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Pivot beat: Leo points forward warning what happens when taxes break.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.hall, 0, 0, 0.6)} rotationY={0} animation="point" face="worried" time={t} />
          <ChatToast text="WHEN TAXES BREAK..." position={on(PLACE.hall, 0, 2.65, 0.6)} height={0.28 * pop(t, 0.12)} color="#ff6b57" />
        </>
      ),
    },
    {
      cue: "5.greedy",
      ...cam.front({ actor: on(PLACE.hall, 0, 0, 0.6), facing: 0, dist: 6.3, to: 5.2, side: -16, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Smug EliteLead takes over the town chest laughing greedily.",
      stage: (t) => (
        <>
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.hall, 0, 0, 0.6)} rotationY={0} animation="laugh" face="smug" time={t} />
          <Chest position={on(PLACE.hall, 1.2, 0, 0.5)} open={0.9} />
        </>
      ),
    },
    {
      cue: "5.six",
      ...cam.front({ actor: on(PLACE.hall, 0, 0, 0.6), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "hall",
      note: "Tax jumps from 2 diamonds to bright coral-red 6/10 (60%)!",
      stage: (t) => {
        const flipAt = Math.max(0.2, wordAt("5.six", "six") - 0.05);
        const six = t >= flipAt;
        return (
          <>
            <EliteLead nameTag="Greedy Mod" position={on(PLACE.hall, 0, 0, 0.6)} rotationY={0} animation="point" face="smug" time={t} />
            <FloatingNumber
              text={six ? "6 / 10 (60%!)" : "2 / 10"}
              color={six ? "#ff4f42" : "#4be08a"}
              position={on(PLACE.hall, 0, 2.7, 0.6)}
              height={0.72 * pop(t, six ? flipAt : 0.08)}
            />
          </>
        );
      },
    },
    {
      cue: "5.wait",
      ...cam.twoShot({ a: on(PLACE.square, -1.1, 0, 0.8), b: on(PLACE.square, 1.1, 0, 0.8), facing: 0, dist: 6.7, to: 5.6, side: 10, pitch: 8, fov: 45 }),
      zone: "square",
      note: "Town players stand waiting eagerly for better walls and brighter streets.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -1.1, 0, 0.8)} rotationY={0.2} animation="shrug" face="worried" time={t} />
          <CitizenLead nameTag="Sam" position={on(PLACE.square, 1.1, 0, 0.8)} rotationY={-0.2} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "5.statue",
      ...cam.push({ on: on(PLACE.square, 0, 2.3, -0.8), dist: 7.9, to: 6.6, yaw: -14, pitch: 6, fov: 46 }),
      zone: "square",
      note: "Ridiculous reveal: a GIANT gleaming GoldStatue of the Greedy Mod towers over spawn!",
      stage: (t) => (
        <>
          <GoldStatue position={on(PLACE.square, 0, 0, -1.0)} scale={0.95} />
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.square, 1.8, 0, 0.9)} rotationY={-0.3} animation="laugh" face="smug" time={t} />
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -1.8, 0, 0.9)} rotationY={0.3} animation="cower" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "5.dark2",
      ...cam.twoShot({ a: on(PLACE.square, -1.2, 0, 0.8), b: on(PLACE.square, 1.2, 0, 0.8), facing: 0, dist: 6.9, to: 5.7, side: 12, pitch: 8, fov: 46 }),
      zone: "square",
      look: "overworld-night",
      note: "The torches go dark again and green Creepers sneak right back into spawn!",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Creeper position={on(PLACE.square, -1.2, 0, -0.2 + step * 0.9)} rotationY={0.2} swell={0.3} />
            <Creeper position={on(PLACE.square, 1.2, 0, -0.2 + step * 0.9)} rotationY={-0.2} swell={0.3} />
            <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 1.4)} rotationY={0} animation="cower" face="fear" time={t} />
          </>
        );
      },
    },
  ],
});
