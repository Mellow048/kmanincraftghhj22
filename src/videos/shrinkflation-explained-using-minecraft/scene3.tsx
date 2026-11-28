import {
  Balance,
  CitizenLead,
  CompareChestPair,
  EliteLead,
  LOOP_CAM,
  MinecraftCake,
  PLACE,
  ShinyCakeBox,
  at,
  cam,
  ease,
  ramp,
  storyScene,
  timing,
} from "./kit";

const B = PLACE.bakery;
const M = PLACE.market;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Chest Comparison, Balance Scale, Grocery Bridge & Seamless Loop",
  shots: [
    {
      cue: "5.chests",
      ...cam.sweep({ on: at(M, 0, 1.2, 1.2), dist: 5.8, fromYaw: -20, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "market",
      note: "Twin CompareChestPair comparing BEFORE vs AFTER emerald cost for one full cake.",
      stage: () => (
        <CompareChestPair
          position={at(M, 0, 0, 1.2)}
          leftLabel="BEFORE: 5E"
          rightLabel="AFTER: 15E"
          leftCount={5}
          rightCount={15}
        />
      ),
    },
    {
      cue: "5.before",
      ...cam.front({ actor: at(M, -1.6, 0, 1.5), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "market",
      hud: { banner: { text: "BEFORE: 5 EMERALDS", color: "#55ff55" } },
      note: "Left side: Felint smiling beside a full 7-slice cake costing just 5 emeralds.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(M, -1.6, 0, 1.5)} rotationY={0.2} animation="wave" face="smile" time={t} />
          <MinecraftCake position={at(M, -0.4, 0.06, 1.5)} slices={7} />
        </>
      ),
    },
    {
      cue: "5.after",
      ...cam.front({ actor: at(M, 1.6, 0, 1.5), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "market",
      hud: { counter: { label: "1 FULL CAKE NOW", from: 5, to: 15, suffix: " EMERALDS", startAt: 0.05, dur: 1.1, color: "#ff4f42" } },
      note: "Right side: counter rolls 5 -> 15 emeralds to get the same full cake.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(M, 1.6, 0, 1.5)} rotationY={-0.2} animation="panic" face="surprised" time={t} />
          <MinecraftCake position={at(M, 0.4, 0.06, 1.5)} slices={1} />
        </>
      ),
    },
    {
      cue: "5.scale",
      ...cam.sweep({ on: at(M, 0, 1.5, 1.2), dist: 5.4, fromYaw: -20, toYaw: 20, pitch: 10, fov: 44 }),
      zone: "market",
      note: "3D wooden Balance scale tips hard as Felint's 5 emeralds buy less and less cake.",
      stage: (t) => {
        const tilt = ease(ramp(t, 0.1, 1.2)) * 0.42;
        return (
          <Balance
            position={at(M, 0, 0, 1.2)}
            tilt={tilt}
            left={<MinecraftCake slices={1} scale={0.55} />}
            right={<MinecraftCake slices={7} scale={0.55} />}
          />
        );
      },
    },
    {
      cue: "5.punch1",
      ...cam.front({ actor: at(B, 1.4, 0, -1.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bakery",
      hud: { banner: { text: "PRICE: SAME", color: "#ffdd57" } },
      note: "Clarity punch #1: the price tag never went up.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.4, 0, -1.2)} rotationY={0} animation="point" face="smug" time={t} />
      ),
    },
    {
      cue: "5.punch2",
      ...cam.front({ actor: at(B, -1.2, 0, -0.4), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bakery",
      hud: { banner: { text: "EMERALDS: SAME", color: "#55ff55" } },
      note: "Clarity punch #2: your emeralds never shrank.",
      stage: (t) => (
        <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0} animation="shrug" face="uneasy" time={t} />
      ),
    },
    {
      cue: "5.punch3",
      ...cam.sweep({ on: at(B, 0, 1.35, -2.0), dist: 3.4, fromYaw: -18, toYaw: 18, pitch: 14, fov: 38 }),
      zone: "bakery",
      hud: { stamp: { text: "SHRINKFLATION", color: "#ff3b30", at: 0.25, angle: -8 } },
      note: "Clarity punch #3: the cake shrank—SHRINKFLATION stamp slams in.",
      stage: () => <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={1} scale={1.15} />,
    },
    {
      cue: "6.real",
      ...cam.truck({ on: at(M, 7.8, 1.8, -1.8), by: [3.4, 0, 0], dist: 4.6, yaw: 0, pitch: 6, fov: 42 }),
      zone: "market",
      note: "Real-world bridge: lateral truck along the grocery aisle shelf.",
      stage: (t) => (
        <CitizenLead variant="leo" nameTag="Felint" position={at(M, 8.2, 0, 0.2)} rotationY={Math.PI} animation="idle" face="uneasy" time={t} />
      ),
    },
    {
      cue: "6.chips",
      ...cam.sweep({ on: at(M, 9.5, 2.0, -1.8), dist: 4.4, fromYaw: -20, toYaw: 20, pitch: 8, fov: 40 }),
      zone: "market",
      hud: {
        checklist: {
          title: "GROCERY AISLE",
          rows: [
            { text: "Half-Empty Chip Bags", at: 0.05, done: "fail", doneAt: 0.25 },
            { text: "Smaller Cereal Boxes", at: 0.45, done: "fail", doneAt: 0.65 },
            { text: "Thinner Candy Bars", at: 0.85, done: "fail", doneAt: 1.05 },
          ],
        },
      },
      note: "Checklist modal highlights half-empty chip bags, smaller cereal boxes, and thinner candy bars.",
      stage: () => null,
    },
    {
      cue: "6.hide",
      ...cam.front({ actor: at(M, 9.5, 0, 0.2), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "market",
      note: "Felint shakes his head—buyers notice a higher price tag immediately.",
      stage: (t) => (
        <CitizenLead variant="leo" nameTag="Felint" position={at(M, 9.5, 0, 0.2)} rotationY={0} animation="shrug" face="frown" time={t} />
      ),
    },
    {
      cue: "6.inside",
      ...cam.sweep({ on: at(B, 0, 1.45, -2.0), dist: 3.8, fromYaw: 18, toYaw: -18, pitch: 14, fov: 40 }),
      zone: "bakery",
      note: "Companies hide the price hike quietly inside the taller box.",
      stage: () => <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={0.85} tall slices={1} />,
    },
    {
      cue: "7.felint",
      ...cam.front({ actor: at(B, -1.2, 0, -0.4), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bakery",
      note: "Debate-bait pan left to Felint holding one tiny sad slice.",
      stage: (t) => (
        <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0} animation="shrug" face="sad" time={t}>
          <MinecraftCake position={[0, 0.04, 0.24]} slices={1} scale={0.7} />
        </CitizenLead>
      ),
    },
    {
      cue: "7.sterling",
      ...cam.front({ actor: at(B, 1.5, 0, -1.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bakery",
      note: "Debate-bait pan right to Sterling grinning proudly beside his emerald vault.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.5, 0, -1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
      ),
    },
    {
      cue: "7.check",
      ...cam.twoShot({ a: at(B, -1.2, 0, -0.4), b: at(B, 1.5, 0, -1.2), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "bakery",
      note: "Two-shot framing both Felint and Sterling to split the comment section.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0.4} animation="idle" face="frown" time={t} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.5, 0, -1.2)} rotationY={-0.4} animation="wave" face="grin" time={t} />
          <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={0} tall slices={1} />
        </>
      ),
    },
    {
      cue: "7.stay",
      ...cam.sweep({ on: at(B, 0, 1.4, -1.5), dist: 4.8, fromYaw: 16, toYaw: -14, pitch: 10, fov: 42 }),
      zone: "bakery",
      note: "Camera glides smoothly into position to hand off seamlessly to Frame 0.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0.4} animation="reach" face="uneasy" time={t} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.5, 0, -1.2)} rotationY={-0.3} animation="cheer" face="grin" time={t} />
          <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={0} tall slices={1} />
        </>
      ),
    },
    {
      cue: "7.loop",
      ...LOOP_CAM,
      zone: "bakery",
      note: "Exact LOOP_CAM handoff matching Frame 0 lid pop so the rewatch loops seamlessly.",
      stage: (t) => {
        const lid = ease(ramp(t, 0.3, 1.1));
        return (
          <>
            <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0.4} animation="reach" face="surprised" time={t} />
            <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.5, 0, -1.2)} rotationY={-0.3} animation="cheer" face="grin" time={t} />
            <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={lid} tall slices={1} />
          </>
        );
      },
    },
  ],
});
