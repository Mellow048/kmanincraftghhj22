import {
  FloatingHeart,
  PLACE,
  ServerCrowd,
  ServerPlayer,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const H = PLACE.hall;
const C = PLACE.cabin;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "50 Beds Waiting, First Sleep in 200 Days & Story CTA",
  shots: [
    {
      cue: "7.join",
      ...cam.track({ from: at(H, 0, 0, 6.2), to: at(H, 0, 0, 2.8), sideDist: 4.8, lead: 0.9, height: 1.6, fov: 44 }),
      zone: "hall",
      look: "warm-room",
      hud: { chat: [{ text: "Marcus joined the game", color: "#ffdd57" }] },
      note: "Next evening: Marcus steps inside the grand wooden hall and freezes in awe.",
      stage: (t) => {
        const w = moveBetween(at(H, 0, 0, 6.2), at(H, 0, 0, 2.8), t, 0, 1.3);
        return (
          <ServerPlayer role="hero" nameTag="Marcus" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="surprised" time={t} />
        );
      },
    },
    {
      cue: "7.wait",
      ...cam.sweep({ on: at(H, 0, 1.4, -0.5), dist: 7.4, fromYaw: -22, toYaw: 22, pitch: 14, fov: 46 }),
      zone: "hall",
      look: "warm-room",
      note: "Fifty colorful beds and fifty smiling players wait welcomingly for Marcus.",
      stage: (t) => (
        <>
          <FloatingHeart position={at(H, 0, 2.5, 0)} count={8} t={t} />
          <ServerPlayer role="hero" nameTag="Marcus" position={at(H, 0, 0, 3.0)} rotationY={Math.PI} animation="idle" face="smile" badge="heart" time={t} />
          <ServerCrowd
            members={[
              { role: "owner", position: at(H, -1.8, 0, 1.2), rotationY: 0.3, animation: "wave" },
              { role: "friendA", position: at(H, 1.8, 0, 1.2), rotationY: -0.3, animation: "wave" },
              { role: "mom", position: at(H, -3.6, 0, -1.2), rotationY: 0.2, animation: "cheer" },
              { role: "bully", position: at(H, 3.6, 0, -1.2), rotationY: -0.2, animation: "wave" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.chat",
      ...cam.front({ actor: at(H, 0, 0, 2.8), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "warm-room",
      hud: {
        chat: [{ sender: "Marcus", text: "I'm not alone anymore.", color: "#55ff55" }],
        typing: true,
      },
      note: "Marcus smiles with happy tears and types: 'I'm not alone anymore.'",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Marcus" position={at(H, 0, 0, 2.8)} rotationY={0} animation="press" face="smile" badge="heart" time={t} />
      ),
    },
    {
      cue: "7.all",
      ...cam.streetOverview({ from: at(H, 0, 0, 9.5), to: at(H, 0, 0, 4.8), on: at(H, 0, 0.9, -0.5), height: 5.0, fov: 46 }),
      zone: "hall",
      look: "lantern-night",
      hud: { banner: { text: "50 / 50 SLEEPING", color: "#55ff55" } },
      note: "All fifty players lie down in their beds at the exact same second.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Marcus" position={at(H, 0, 0.58, 1.2)} rotationY={0} animation="sleep" face="sleepy" time={t} />
          <ServerCrowd
            members={[
              { role: "owner", position: at(H, -1.8, 0.58, 1.2), rotationY: 0, animation: "sleep" },
              { role: "friendA", position: at(H, 1.8, 0.58, 1.2), rotationY: 0, animation: "sleep" },
              { role: "mom", position: at(H, -3.6, 0.58, -1.2), rotationY: 0, animation: "sleep" },
              { role: "bully", position: at(H, 3.6, 0.58, -1.2), rotationY: 0, animation: "sleep" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.sleep",
      ...cam.sweep({ on: at(H, 0, 0.9, 1.2), dist: 3.6, fromYaw: -18, toYaw: 18, pitch: 18, fov: 40 }),
      zone: "hall",
      look: "lantern-night",
      hud: { clock: "DAY 201 · RESTING" },
      note: "Peaceful close-up on Marcus finally sleeping soundly for the first time in 200 days.",
      stage: (t) => (
        <>
          <FloatingHeart position={at(H, 0, 1.6, 1.2)} count={6} t={t} />
          <ServerPlayer role="hero" nameTag="Marcus" position={at(H, 0, 0.58, 1.2)} rotationY={0} animation="sleep" face="sleepy" time={t} />
        </>
      ),
    },
    {
      cue: "7.dawn",
      ...cam.streetOverview({ from: at(C, 0, 0, 11.5), to: at(C, 0, 0, 6.2), on: at(C, 0, 2.0, 1.5), height: 4.8, fov: 46 }),
      zone: "cabin",
      look: "overworld-golden",
      hud: { clock: "6:00 AM · SUNRISE" },
      note: "Bright golden morning breaks over the Cherry Blossom Cabin with zero Phantoms in the sky.",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 0, 0, 3.2)} rotationY={0} animation="cheer" face="grin" time={t} />
      ),
    },
    {
      cue: "7.hug",
      ...cam.twoShot({ a: at(C, -0.7, 0, 3.2), b: at(C, 0.7, 0, 3.2), dist: 4.6, height: 1.4, fov: 42 }),
      zone: "cabin",
      look: "overworld-golden",
      note: "His little brother runs out the cabin door grinning and hugs Marcus tight.",
      stage: (t) => (
        <>
          <FloatingHeart position={at(C, 0, 2.2, 3.2)} count={8} t={t} />
          <ServerPlayer role="hero" nameTag="Marcus" position={at(C, -0.65, 0, 3.2)} rotationY={1.0} animation="hug" face="grin" time={t} />
          <ServerPlayer role="friendA" nameTag="Little Bro" scale={0.78} position={at(C, 0.65, 0, 3.2)} rotationY={-1.0} animation="hug" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "7.sub",
      ...cam.front({ actor: at(H, 0, 0, 2.8), dist: 5.2, fov: 44, screenOffset: [0, 0.08] }),
      zone: "hall",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Story-locked CTA: Marcus, his little brother, and Owner wave in front of the 50 beds as Subscribed pops.",
      stage: (t) => (
        <>
          <FloatingHeart position={at(H, 0, 2.5, 2.8)} count={8} t={t} />
          <ServerPlayer role="hero" nameTag="Marcus" position={at(H, -1.0, 0, 2.8)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <ServerPlayer role="friendA" nameTag="Little Bro" scale={0.78} position={at(H, 0.2, 0, 2.8)} rotationY={0} animation="wave" face="grin" time={t + 0.15} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(H, 1.4, 0, 2.8)} rotationY={-0.1} animation="wave" face="grin" time={t + 0.3} />
        </>
      ),
    },
  ],
});
