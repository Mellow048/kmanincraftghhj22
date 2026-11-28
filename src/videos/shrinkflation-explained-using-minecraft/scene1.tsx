import {
  CitizenLead,
  EliteLead,
  ExplainerCrowd,
  FloatingItemPyramid,
  LOOP_CAM,
  MinecraftCake,
  PLACE,
  ShinyCakeBox,
  StoneBillboard,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const B = PLACE.bakery;
const M = PLACE.market;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Cold Climax Loop Hook & Day 1 Fair Cake",
  shots: [
    {
      cue: "1.hook",
      ...LOOP_CAM,
      zone: "bakery",
      hud: { banner: { text: "SAME PRICE: 5 EMERALDS!", color: "#ffdd57" } },
      note: "Exact Frame-0 LOOP_CAM: Felint lifts the giant shiny cake box lid while Tycoon Sterling grins beside his vault.",
      stage: (t) => {
        const lid = ease(ramp(t, 0.2, 1.1));
        return (
          <>
            <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0.4} animation="reach" face="surprised" time={t} />
            <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.5, 0, -1.2)} rotationY={-0.3} animation="cheer" face="grin" time={t} />
            <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={lid} tall slices={1} />
          </>
        );
      },
    },
    {
      cue: "1.box",
      ...cam.front({ actor: at(B, -1.2, 0, -0.4), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "bakery",
      note: "Close front shot on Felint lifting the oversized red-and-white cake box lid.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0.35} animation="lift" face="surprised" time={t} />
          <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={1} tall slices={1} />
        </>
      ),
    },
    {
      cue: "1.slice",
      ...cam.sweep({ on: at(B, 0, 1.45, -2.0), dist: 3.4, fromYaw: -20, toYaw: 20, pitch: 18, fov: 38 }),
      zone: "bakery",
      note: "Tight sweep into the oversized box revealing one tiny sad slice of cake surrounded by empty air.",
      stage: () => <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={1} tall slices={1} />,
    },
    {
      cue: "1.price",
      ...cam.twoShot({ a: at(B, -1.2, 0, -0.4), b: at(B, 1.5, 0, -1.2), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "bakery",
      note: "Felint stares in disbelief while Sterling shrugs happily beside the 5-emerald counter.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.2, 0, -0.4)} rotationY={0.7} animation="shrug" face="frown" time={t} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.5, 0, -1.2)} rotationY={-0.6} animation="wave" face="grin" time={t} />
          <ShinyCakeBox position={at(B, 0, 1.09, -2.0)} lidOpen={1} tall slices={1} />
        </>
      ),
    },
    {
      cue: "2.day1",
      ...cam.sweep({ on: at(B, 0, 1.35, -2.0), dist: 4.4, fromYaw: 20, toYaw: -20, pitch: 14, fov: 42 }),
      zone: "bakery",
      hud: { clock: "DAY 1" },
      note: "Day 1 concrete setup: a full, proud 7-slice Minecraft Cake sits on Sterling's counter.",
      stage: (t) => (
        <>
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={7} scale={1.15} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.4, 0, -1.3)} rotationY={-0.3} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "2.five",
      ...cam.sweep({ on: at(B, -2.6, 2.0, -2.2), dist: 5.0, fromYaw: -18, toYaw: 18, pitch: 8, fov: 42 }),
      zone: "bakery",
      note: "StoneBillboard reads 5 EMERALDS with a crisp 5-emerald FloatingItemPyramid glowing above.",
      stage: (t) => (
        <>
          <StoneBillboard text="5 EMERALDS" position={at(B, -2.6, 1.8, -2.2)} width={3.2} height={0.9} />
          <FloatingItemPyramid count={5} position={at(B, -2.6, 2.9, -2.2)} t={t} />
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={7} />
        </>
      ),
    },
    {
      cue: "2.buy",
      ...cam.track({ from: at(B, -3.5, 0, 1.2), to: at(B, -0.8, 0, -0.4), sideDist: 5.0, lead: 0.9, height: 1.6, fov: 44 }),
      zone: "bakery",
      note: "Felint walks happily up to Sterling's bakery every Friday paying five emeralds.",
      stage: (t) => {
        const w = moveBetween(at(B, -3.5, 0, 1.2), at(B, -0.8, 0, -0.4), t, 0, 1.3);
        return (
          <>
            <CitizenLead variant="leo" nameTag="Felint" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
            <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={7} />
          </>
        );
      },
    },
    {
      cue: "2.share",
      ...cam.twoShot({ a: at(M, -1.2, 0, 2.2), b: at(M, 1.2, 0, 2.2), dist: 5.4, height: 1.5, fov: 44 }),
      zone: "market",
      note: "Felint shares all seven slices happily with friends in the sunny village square.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Felint" position={at(M, 0, 0, 2.2)} rotationY={0} animation="cheer" face="grin" time={t}>
            <MinecraftCake position={[0, 0.05, 0.28]} slices={7} scale={0.65} />
          </CitizenLead>
          <ExplainerCrowd
            positions={[at(M, -1.8, 0, 2.0), at(M, 1.8, 0, 2.0)]}
            rotationY={0}
            animation="cheer"
            face="grin"
            time={t}
          />
        </>
      ),
    },
  ],
});
