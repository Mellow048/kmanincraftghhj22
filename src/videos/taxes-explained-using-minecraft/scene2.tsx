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
  moveBetween,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 2 (Beats 3–5): Town Deal -> Builders March & Raise Wall -> Greedy Mod 60% Statue Abuse. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "20% Deal, Walls & Abuse",
  shots: [
    {
      cue: "3.meet",
      ...cam.streetOverview({ from: on(PLACE.street, 0, 0, 10), to: on(PLACE.street, 0, 0, 3), height: 5.8, fov: 46 }),
      zone: "street",
      note: "High crane down the lively street as the whole server gathers around the community chest!",
      stage: (t) => (
        <>
          <ExplainerCrowd positions={[on(PLACE.street, -2.5, 0, -4.5), on(PLACE.street, 0, 0, -5.0), on(PLACE.street, 2.5, 0, -4.5)]} animation="wave" time={t} />
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.8, 0, -1.0)} rotationY={0.35} animation="wave" face="calm" time={t} />
          <CitizenLead variant="maya" nameTag="Maya" position={on(PLACE.street, 1.9, 0, -1.2)} rotationY={-0.35} animation="wave" face="smile" time={t} />
          <Official position={on(PLACE.street, 0, 0, -2.2)} rotationY={0} animation="point" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "3.rule",
      ...cam.sweep({ on: on(PLACE.hall, 0, 1.4, 0), dist: 6.6, fromYaw: -22, toYaw: 16, pitch: 8 }),
      zone: "hall",
      note: "Inside the Council Hall: Official points to the Order RuleBoard as players listen.",
      stage: (t) => (
        <>
          <Official position={on(PLACE.hall, -1.4, 0, 0.6)} rotationY={0.4} animation="point" face="smile" time={t} />
          <RuleBoard mode="order" position={on(PLACE.hall, 0.9, 0, -0.4)} rotationY={-0.18} />
        </>
      ),
    },
    {
      cue: "3.two",
      ...cam.track({ from: on(PLACE.street, -2.8, 0, 2.5), to: on(PLACE.street, -0.5, 0, 0.2), sideDist: 5.8, side: 1, lead: 1.6 }),
      zone: "street",
      note: "Continuous A->B walk: Leo physically walks up to the open Town Chest and drops 2 diamonds!",
      stage: (t) => {
        const w = moveBetween(on(PLACE.street, -2.8, 0, 2.5), on(PLACE.street, -0.6, 0, 0.3), t, 0, 1.3);
        return (
          <>
            <CitizenLead variant="leo" nameTag="Leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "press"} animDistance={w.animDistance} face="uneasy" time={t} />
            <Chest position={on(PLACE.street, 0.8, 0, 0)} open={0.85} />
            <FloatingItemPyramid count={2} position={on(PLACE.street, 0.8, 1.4, 0)} color="#4ce8ff" t={t} />
            <FloatingNumber text="2 / 10" color="#4ce8ff" position={on(PLACE.street, 0.8, 2.6, 0)} height={0.62 * pop(t, 0.15)} />
          </>
        );
      },
    },
    {
      cue: "3.twenty",
      ...cam.sweep({ on: on(PLACE.hall, 0, 1.3, 0), dist: 6.2, fromYaw: 24, toYaw: -18, pitch: 9 }),
      zone: "hall",
      note: "Parallax orbit around the glowing Treasury Chest as 20% TAX pops overhead.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.hall, 0, 0, 0)} open={0.88} />
          <OrbitingItemRing count={6} radius={0.75} position={on(PLACE.hall, 0, 1.3, 0)} color="#4ce8ff" t={t} />
          <FloatingNumber text="20% TAX" color="#4be08a" position={on(PLACE.hall, 0, 2.6, 0)} height={0.65 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "3.groan",
      ...cam.sweep({ on: on(PLACE.street, -1.5, 1.3, 2), dist: 6.2, fromYaw: 70, toYaw: 105, pitch: 8 }),
      zone: "street",
      note: "Cross-street angle: Leo groans watching 2 diamonds leave his hand while Sam pats his shoulder.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.5, 0, 2)} rotationY={Math.PI / 2} animation="shrug" face="frown" time={t} />
          <FloatingNumber text="-2" color="#ff9944" position={on(PLACE.street, -1.5, 2.65, 2)} height={0.65 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "4.mods",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.4, -2), dist: 6.6, fromYaw: -25, toYaw: 18, pitch: 9 }),
      zone: "street",
      note: "Next morning, the Official opens the overflowing community chest bursting with cyan diamonds!",
      stage: (t) => (
        <>
          <Official position={on(PLACE.street, -1.3, 0, -2)} rotationY={0.45} animation="cheer" face="grin" time={t} />
          <Chest position={on(PLACE.street, 0.5, 0, -2)} open={0.95} />
          <EmeraldFountain position={on(PLACE.street, 0.5, 0.95, -2)} t={t} count={20} color="#4ce8ff" />
        </>
      ),
    },
    {
      cue: "4.wall",
      ...cam.track({ from: on(PLACE.street, -2.5, 0, -4), to: on(PLACE.street, 2.5, 0, -4), sideDist: 6.4, side: 1, lead: 1.0 }),
      zone: "street",
      note: "Synchronized builder squad marches across the road raising a tall protective stone wall!",
      stage: (t) => {
        const rise = ease(ramp(t, 0.05, 1.1));
        const b1 = moveBetween(on(PLACE.street, -2.5, 0, -3.5), on(PLACE.street, 0.5, 0, -3.5), t, 0, 1.4);
        const b2 = moveBetween(on(PLACE.street, -0.5, 0, -3.5), on(PLACE.street, 2.5, 0, -3.5), t, 0, 1.4);
        return (
          <>
            <Vox kind="stoneBrick" position={on(PLACE.street, 0, 1.6 * rise, -6.5)} size={[8.6, Math.max(0.25, 3.2 * rise), 0.7]} />
            <CitizenLead variant="builder" nameTag="Builder" position={b1.position} rotationY={b1.rotationY} animation={b1.moving ? "walk" : "press"} animDistance={b1.animDistance} face="grin" time={t} />
            <CitizenLead variant="alex" position={b2.position} rotationY={b2.rotationY} animation={b2.moving ? "walk" : "press"} animDistance={b2.animDistance} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.torch",
      ...cam.streetOverview({ from: on(PLACE.street, 0, 0, 12), to: on(PLACE.street, 0, 0, 2), height: 4.8, fov: 46 }),
      zone: "street",
      look: "overworld-golden",
      note: "Golden sunset sweep down the entire village road as warm bright torches light both sidewalks!",
      stage: (t) => {
        const w = moveBetween(on(PLACE.street, 0, 0, -2), on(PLACE.street, 0, 0, 6), t, 0, 1.8);
        return (
          <>
            {[-3.2, 3.2].flatMap((x, xi) =>
              [-6, -2, 2, 6].map((z, zi) => <Torch key={`${xi}${zi}`} position={on(PLACE.street, x, 0.6, z)} light={2.2} />),
            )}
            <CitizenLead variant="leo" nameTag="Leo" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.road",
      ...cam.track({ from: on(PLACE.street, -1.0, 0, 8), to: on(PLACE.street, -1.0, 0, 0), sideDist: 5.8, side: -1, lead: 2.0 }),
      zone: "street",
      note: "Clean tracking shot: Leo and Maya stroll happily down the newly paved village street!",
      stage: (t) => {
        const w1 = moveBetween(on(PLACE.street, -1.0, 0, 8), on(PLACE.street, -1.0, 0, 0), t, 0, 1.9);
        const w2 = moveBetween(on(PLACE.street, 1.2, 0, 7.5), on(PLACE.street, 1.2, 0, -0.5), t, 0, 1.9);
        return (
          <>
            <CitizenLead variant="leo" nameTag="Leo" position={w1.position} rotationY={w1.rotationY} animation={w1.moving ? "walk" : "wave"} animDistance={w1.animDistance} face="grin" time={t} />
            <CitizenLead variant="maya" nameTag="Maya" position={w2.position} rotationY={w2.rotationY} animation={w2.moving ? "walk" : "wave"} animDistance={w2.animDistance} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.safe",
      ...cam.heroLow({ on: on(PLACE.street, 0, 0, -5), dist: 6.8, yaw: -16 }),
      zone: "street",
      look: "overworld-night",
      note: "Low-angle night payoff: Creepers bounce harmlessly off the tall stone wall while Leo cheers on top!",
      stage: (t) => {
        const bounce = Math.abs(Math.sin(t * 5)) * 0.5;
        return (
          <>
            <Vox kind="stoneBrick" position={on(PLACE.street, 0, 1.5, -6.0)} size={[8.4, 3.0, 0.7]} />
            <Torch position={on(PLACE.street, -2.4, 3.1, -6.0)} light={2.5} />
            <Torch position={on(PLACE.street, 2.4, 3.1, -6.0)} light={2.5} />
            <Creeper position={on(PLACE.street, -1.5, 0, -4.6 + bounce)} rotationY={Math.PI} />
            <Creeper position={on(PLACE.street, 1.5, 0, -4.5 + bounce)} rotationY={Math.PI} />
            <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, 0, 3.0, -6.0)} rotationY={0} animation="cheer" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.math",
      ...cam.sweep({ on: on(PLACE.hall, 0, 1.1, 0), dist: 6.4, fromYaw: -20, toYaw: 20, pitch: 9 }),
      zone: "hall",
      note: "Parallax orbit around the Balance scale: 8 safe diamonds outweigh 5 after a Creeper!",
      stage: (t) => (
        <Balance
          position={on(PLACE.hall, 0, 0, 0)}
          tilt={-0.65 * ease(ramp(t, 0.1, 1.0))}
          left={<FloatingItemPyramid count={8} position={[0, 0.4, 0]} color="#4be08a" t={t} scale={0.75} />}
          right={<FloatingItemPyramid count={5} position={[0, 0.4, 0]} color="#ff4f42" t={t} scale={0.75} />}
        />
      ),
    },
    {
      cue: "4.win",
      ...cam.sweep({ on: on(PLACE.hall, 0, 1.4, 0), dist: 6.6, fromYaw: 18, toYaw: -18, pitch: 9 }),
      zone: "hall",
      note: "Animated BarChart cleanly framed inside 9:16: 8 SAFE beats 5 LEFT!",
      stage: (t) => {
        const k = ease(ramp(t, 0.08, 0.9));
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
      ...cam.sweep({ on: on(PLACE.hall, 0, 1.3, 1), dist: 6.2, fromYaw: -16, toYaw: 16, pitch: 8 }),
      zone: "hall",
      note: "Pivot beat in Council Hall: Leo points ahead warning what happens when taxes break.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.hall, 0, 0, 1)} rotationY={0} animation="point" face="worried" time={t} />
          <ChatToast text="WHEN TAXES BREAK..." position={on(PLACE.hall, 0, 2.6, 1)} height={0.24 * pop(t, 0.12)} color="#ff6b57" />
        </>
      ),
    },
    {
      cue: "5.greedy",
      ...cam.track({ from: on(PLACE.hall, -3.0, 0, 1.0), to: on(PLACE.hall, 0.2, 0, 0.5), sideDist: 5.8, side: 1, lead: 1.4 }),
      zone: "hall",
      note: "Greedy Mod struts across the Council Hall straight up to the overflowing Town Chest!",
      stage: (t) => {
        const w = moveBetween(on(PLACE.hall, -3.0, 0, 1.0), on(PLACE.hall, -0.3, 0, 0.5), t, 0, 1.4);
        return (
          <>
            <EliteLead nameTag="Greedy Mod" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "laugh"} animDistance={w.animDistance} face="smug" time={t} />
            <Chest position={on(PLACE.hall, 1.2, 0, 0.5)} open={0.92} />
          </>
        );
      },
    },
    {
      cue: "5.six",
      ...cam.sweep({ on: on(PLACE.hall, 0, 1.4, 0.5), dist: 6.4, fromYaw: 20, toYaw: -18, pitch: 8 }),
      zone: "hall",
      note: "Tax flips from 2/10 to coral-red 6/10 (60%!) above the smug Greedy Mod.",
      stage: (t) => {
        const flipAt = Math.max(0.25, wordAt("5.six", "six") - 0.05);
        const six = t >= flipAt;
        return (
          <>
            <EliteLead nameTag="Greedy Mod" position={on(PLACE.hall, 0, 0, 0.5)} rotationY={0} animation="point" face="smug" time={t} />
            <FloatingNumber
              text={six ? "6 / 10 (60%!)" : "2 / 10"}
              color={six ? "#ff4f42" : "#4be08a"}
              position={on(PLACE.hall, 0, 2.75, 0.5)}
              height={0.62 * pop(t, six ? flipAt : 0.08)}
            />
          </>
        );
      },
    },
    {
      cue: "5.wait",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.3, 2), dist: 6.8, fromYaw: -22, toYaw: 20, pitch: 9 }),
      zone: "street",
      note: "Distinct citizens (Leo, Sam, Maya) wait in the street hoping for better walls and lights.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.8, 0, 2)} rotationY={0.25} animation="shrug" face="worried" time={t} />
          <CitizenLead variant="sam" nameTag="Sam" position={on(PLACE.street, 0, 0, 1.6)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <CitizenLead variant="maya" nameTag="Maya" position={on(PLACE.street, 1.8, 0, 2)} rotationY={-0.25} animation="shrug" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "5.statue",
      ...cam.heroLow({ on: on(PLACE.street, 0, 0.8, -2), dist: 7.4, yaw: -18 }),
      zone: "street",
      note: "Dramatic low-angle upward tilt: a GIANT gleaming GoldStatue of the Greedy Mod towers over the street!",
      stage: (t) => (
        <>
          <GoldStatue position={on(PLACE.street, 0, 0, -2.5)} scale={1.0} />
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.street, 2.2, 0, -0.5)} rotationY={-0.35} animation="laugh" face="smug" time={t} />
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -2.2, 0, -0.5)} rotationY={0.35} animation="cower" face="angry" time={t} />
        </>
      ),
    },
    {
      cue: "5.dark2",
      ...cam.streetOverview({ from: on(PLACE.street, 0, 0, 8), to: on(PLACE.street, 0, 0, 1), height: 5.2, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "Night crane: torches go dark and Creepers march right back down the street toward Leo!",
      stage: (t) => {
        const c1 = moveBetween(on(PLACE.street, -2.0, 0, -6), on(PLACE.street, -1.4, 0, -1), t, 0, 1.6);
        const c2 = moveBetween(on(PLACE.street, 2.0, 0, -6), on(PLACE.street, 1.4, 0, -1), t, 0, 1.6);
        return (
          <>
            <Creeper position={c1.position} rotationY={c1.rotationY} swell={0.35} />
            <Creeper position={c2.position} rotationY={c2.rotationY} swell={0.35} />
            <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, 0, 0, 1.2)} rotationY={0} animation="cower" face="fear" time={t} />
          </>
        );
      },
    },
  ],
});
