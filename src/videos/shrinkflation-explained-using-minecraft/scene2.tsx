import {
  CitizenLead,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  MinecraftCake,
  PLACE,
  ShinyCakeBox,
  StoneBillboard,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const B = PLACE.bakery;
const W = PLACE.workshop;
const M = PLACE.market;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Rising Farm Costs & The Sneaky Workshop Trick",
  shots: [
    {
      cue: "3.costs",
      ...cam.sweep({ on: at(M, -4.0, 1.6, -2.0), dist: 5.6, fromYaw: -20, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "market",
      hud: { banner: { text: "COSTS TRIPLED!", color: "#ff4f42" } },
      note: "Wheat, sugar, and milk ingredient prices jump dramatically across the village farm.",
      stage: (t) => (
        <>
          <FloatingNumber text="1 -> 3" position={at(M, -4.0, 2.4, -2.0)} color="#ff4f42" />
          <EliteLead variant="pres" nameTag="Sterling" position={at(M, -4.0, 0, 0.2)} rotationY={-0.4} animation="panic" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "3.farm",
      ...cam.front({ actor: at(M, -4.0, 0, 0.2), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "market",
      hud: { counter: { label: "INGREDIENT COST", from: 1, to: 3, suffix: "x", startAt: 0.05, dur: 1.1, color: "#ff4f42" } },
      note: "Sterling panics watching his ingredient costs roll from 1x to 3x.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Sterling" position={at(M, -4.0, 0, 0.2)} rotationY={0} animation="shrug" face="worried" time={t} />
      ),
    },
    {
      cue: "3.raise",
      ...cam.sweep({ on: at(B, 0, 1.8, -2.0), dist: 5.4, fromYaw: -18, toYaw: 18, pitch: 8, fov: 42 }),
      zone: "bakery",
      hud: { banner: { text: "8 EMERALDS", color: "#ff4f42" } },
      note: "Sterling slaps an 8 EMERALDS sign onto the bakery front.",
      stage: (t) => (
        <>
          <StoneBillboard text="8 EMERALDS" position={at(B, -2.6, 1.8, -2.2)} width={3.2} height={0.9} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.2, 0, -1.0)} rotationY={-0.3} animation="point" face="neutral" time={t} />
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={7} />
        </>
      ),
    },
    {
      cue: "3.walk",
      ...cam.track({ from: at(B, 0, 0, 0.8), to: at(B, 0, 0, 5.2), sideDist: 5.6, lead: 0.8, height: 1.8, fov: 46 }),
      zone: "bakery",
      note: "The entire crowd of buyers immediately turns around and walks away from the 8-emerald price tag.",
      stage: (t) => {
        const w = moveBetween(at(B, 0, 0, 0.6), at(B, 0, 0, 5.4), t, 0, 1.4);
        return (
          <>
            <CitizenLead variant="leo" nameTag="Felint" position={w.position} rotationY={0} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="frown" time={t} />
            <ExplainerCrowd
              positions={[
                [w.position[0] - 1.6, 0, w.position[2] + 0.4],
                [w.position[0] + 1.6, 0, w.position[2] + 0.5],
              ]}
              rotationY={0}
              animation={w.moving ? "walk" : "idle"}
              animDistance={w.animDistance}
              face="frown"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "3.zero",
      ...cam.front({ actor: at(B, 1.0, 0, -1.0), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "bakery",
      hud: { stamp: { text: "SALES: 0", color: "#ff3b30", at: 0.2, angle: -10 } },
      note: "Red SALES: 0 stamp slams down as Sterling stares at an empty bakery.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Sterling" position={at(B, 1.0, 0, -1.0)} rotationY={0} animation="panic" face="sad" time={t} />
      ),
    },
    {
      cue: "4.slam",
      ...cam.sweep({ on: at(B, -2.0, 1.8, -2.0), dist: 5.0, fromYaw: 20, toYaw: -20, pitch: 8, fov: 42 }),
      zone: "bakery",
      hud: { banner: { text: "BACK TO 5 EMERALDS!", color: "#55ff55" } },
      note: "Sterling slams the price sign right back down to 5 EMERALDS with a sly grin.",
      stage: (t) => (
        <>
          <StoneBillboard text="5 EMERALDS" position={at(B, -2.6, 1.8, -2.2)} width={3.2} height={0.9} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(B, -0.8, 0, -0.9)} rotationY={-0.4} animation="cheer" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "4.cheer",
      ...cam.track({ from: at(B, 0, 0, 5.2), to: at(B, 0, 0, 0.6), sideDist: 5.6, lead: 0.9, height: 1.7, fov: 46 }),
      zone: "bakery",
      note: "Every customer cheers and sprints straight back to Sterling's counter.",
      stage: (t) => {
        const w = moveBetween(at(B, 0, 0, 5.2), at(B, 0, 0, 0.6), t, 0, 1.35);
        return (
          <>
            <CitizenLead variant="leo" nameTag="Felint" position={w.position} rotationY={Math.PI} animation={w.moving ? "run" : "cheer"} animDistance={w.animDistance} face="grin" time={t} />
            <ExplainerCrowd
              positions={[
                [w.position[0] - 1.6, 0, w.position[2] + 0.5],
                [w.position[0] + 1.6, 0, w.position[2] + 0.4],
              ]}
              rotationY={Math.PI}
              animation={w.moving ? "run" : "cheer"}
              animDistance={w.animDistance}
              face="grin"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.back",
      ...cam.front({ actor: at(W, 0, 0, -1.2), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "workshop",
      look: "warm-room",
      note: "Behind the curtain, Sterling steps into his secret back workshop with a smug grin.",
      stage: (t) => {
        const w = moveBetween(at(W, -2.2, 0, -1.0), at(W, 0, 0, -1.2), t, 0, 1.1);
        return (
          <>
            <EliteLead variant="pres" nameTag="Sterling" position={w.position} rotationY={w.moving ? w.rotationY : 0} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="smug" time={t} />
            <MinecraftCake position={at(W, 0, 0.99, -2.7)} slices={7} />
          </>
        );
      },
    },
    {
      cue: "4.cut",
      ...cam.sweep({ on: at(W, 0, 1.2, -2.6), dist: 3.6, fromYaw: -20, toYaw: 20, pitch: 14, fov: 40 }),
      zone: "workshop",
      look: "warm-room",
      note: "OTS: Sterling slices two full pieces cleanly off the seven-slice cake.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" nameTag="Sterling" position={at(W, 0.9, 0, -1.4)} rotationY={-2.4} animation="press" face="smug" time={t} />
          <MinecraftCake position={at(W, 0, 0.99, -2.7)} slices={t > 0.5 ? 5 : 7} />
        </>
      ),
    },
    {
      cue: "4.tall",
      ...cam.sweep({ on: at(W, 0, 1.4, -2.6), dist: 3.8, fromYaw: -55, toYaw: -25, pitch: 12, fov: 40 }),
      zone: "workshop",
      look: "warm-room",
      note: "OTS: He slides the shrunken cake into an even taller, flashier red-and-white box.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" nameTag="Sterling" position={at(W, 1.2, 0, -1.4)} rotationY={-2.5} animation="point" face="grin" time={t} />
          <ShinyCakeBox position={at(W, 0, 0.99, -2.7)} lidOpen={0.4} tall slices={5} />
        </>
      ),
    },
    {
      cue: "4.new",
      ...cam.front({ actor: at(W, 0, 0, -1.4), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "workshop",
      look: "warm-room",
      hud: { stamp: { text: "NEW LOOK!", color: "#ffdd57", at: 0.2, angle: -9 } },
      note: "Gold NEW LOOK! stamp slams onto the oversized box while the price stays 5 emeralds.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" nameTag="Sterling" position={at(W, 1.1, 0, -1.4)} rotationY={-0.4} animation="cheer" face="grin" time={t} />
          <ShinyCakeBox position={at(W, -0.3, 0.99, -2.7)} lidOpen={0} tall slices={5} />
        </>
      ),
    },
    {
      cue: "4.pile",
      ...cam.sweep({ on: at(W, 0, 1.25, -2.6), dist: 4.2, fromYaw: -22, toYaw: 20, pitch: 14, fov: 42 }),
      zone: "workshop",
      look: "warm-room",
      hud: { banner: { text: "+5 EXTRA EMERALDS!", color: "#55ff55" } },
      note: "The stolen slices stack into bonus cakes to sell for another five emeralds!",
      stage: (t) => (
        <>
          <MinecraftCake position={at(W, -1.2, 0.99, -2.7)} slices={5} />
          <MinecraftCake position={at(W, 0.2, 0.99, -2.7)} slices={5} />
          <MinecraftCake position={at(W, 1.6, 0.99, -2.7)} slices={4} />
          <EliteLead variant="pres" nameTag="Sterling" position={at(W, 2.2, 0, -1.3)} rotationY={-0.5} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "4.w1",
      ...cam.front({ actor: at(B, 0, 0, -1.2), dist: 4.2, facing: -0.75, fov: 40, screenOffset: [0, 0.06] }),
      zone: "bakery",
      hud: { clock: "WEEK 1", banner: { text: "7 SLICES · 5 EMERALDS", color: "#55ff55" } },
      note: "Rapid proof montage: Week 1 — full 7-slice cake for 5 emeralds.",
      stage: (t) => (
        <>
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={7} scale={1.15} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.4, 0, -0.4)} rotationY={0.4} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.w2",
      ...cam.sweep({ on: at(B, 0, 1.1, -1.6), dist: 4.2, fromYaw: 50, toYaw: 80, pitch: 10, fov: 40 }),
      zone: "bakery",
      hud: { clock: "WEEK 2", banner: { text: "5 SLICES · 5 EMERALDS", color: "#ffdd57" } },
      note: "Rapid proof montage: Week 2 — 5 slices for the same 5 emeralds.",
      stage: (t) => (
        <>
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={5} scale={1.15} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.4, 0, -0.4)} rotationY={0.4} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "4.w3",
      ...cam.sweep({ on: at(B, 0, 1.1, -1.6), dist: 4.2, fromYaw: 45, toYaw: 75, pitch: 10, fov: 40 }),
      zone: "bakery",
      hud: { clock: "WEEK 3", banner: { text: "3 SLICES · 5 EMERALDS", color: "#ff922b" } },
      note: "Rapid proof montage: Week 3 — 3 slices for the same 5 emeralds.",
      stage: (t) => (
        <>
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={3} scale={1.15} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.4, 0, -0.4)} rotationY={0.4} animation="point" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "4.w4",
      ...cam.front({ actor: at(B, 0, 0, -1.2), dist: 4.0, facing: 0.75, fov: 38, screenOffset: [0, 0.06] }),
      zone: "bakery",
      hud: { clock: "WEEK 4", banner: { text: "1 SLICE · 5 EMERALDS!", color: "#ff4f42" } },
      note: "Rapid proof montage: Week 4 — one tiny slice while the 5-emerald price never budged.",
      stage: (t) => (
        <>
          <MinecraftCake position={at(B, 0, 1.09, -2.0)} slices={1} scale={1.15} />
          <CitizenLead variant="leo" nameTag="Felint" position={at(B, -1.4, 0, -0.4)} rotationY={0.4} animation="panic" face="surprised" time={t} />
        </>
      ),
    },
  ],
});
