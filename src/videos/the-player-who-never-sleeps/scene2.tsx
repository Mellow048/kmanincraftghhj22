import {
  DiamondSword,
  MinecraftBed,
  PLACE,
  ServerCrowd,
  ServerPlayer,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const C = PLACE.cabin;
const H = PLACE.hall;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Cruel Mockery, Owner DM & 50-Bed Server Rally",
  shots: [
    {
      cue: "4.bully",
      ...cam.twoShot({ a: at(C, -1.1, 0, 3.4), b: at(C, 1.1, 0, 3.4), dist: 5.0, height: 1.5, fov: 42 }),
      zone: "cabin",
      look: "overworld-night",
      note: "Cruel turning point: bully Kyle walks right up to Marcus laughing in his face.",
      stage: (t) => (
        <>
          <ServerPlayer role="bully" nameTag="Kyle" position={at(C, -1.1, 0, 3.4)} rotationY={1.1} animation="laugh" face="laugh" time={t} />
          <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 1.1, 0, 3.4)} rotationY={-1.1} animation="idle" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "4.mock",
      ...cam.front({ actor: at(C, -1.1, 0, 3.4), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "overworld-night",
      hud: {
        chat: [{ sender: "Kyle", text: "you're just scared of monsters lol", color: "#ff6b6b" }],
        typing: true,
      },
      note: "Bully mocks Marcus in server chat.",
      stage: (t) => (
        <ServerPlayer role="bully" nameTag="Kyle" position={at(C, -1.1, 0, 3.4)} rotationY={0.2} animation="point" face="laugh" time={t} />
      ),
    },
    {
      cue: "4.hurt",
      ...cam.front({ actor: at(C, 1.1, 0, 3.4), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "overworld-night",
      note: "Marcus lowers his diamond sword with TearDrops falling down his cheek.",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 1.1, 0, 3.4)} rotationY={0} animation="cower" face="crying" tears={1} time={t}>
          <DiamondSword position={[0, -0.06, 0.2]} scale={1.0} />
        </ServerPlayer>
      ),
    },
    {
      cue: "4.left",
      ...cam.sweep({ on: at(C, 1.1, 1.2, 3.4), dist: 5.2, fromYaw: -18, toYaw: 18, pitch: 10, fov: 44 }),
      zone: "cabin",
      look: "overworld-night",
      hud: { chat: [{ text: "Marcus left the game", color: "#ffdd57" }] },
      note: "Marcus logs off leaving the porch completely empty and silent.",
      stage: () => <MinecraftBed position={at(C, 2.2, 0, 3.2)} color="#e03131" />,
    },
    {
      cue: "5.msg",
      ...cam.front({ actor: at(C, 0, 0, 3.0), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "lantern-night",
      hud: {
        chat: [{ sender: "Owner", text: "Hey Marcus, are you okay?", color: "#55ff55", whisper: true }],
        typing: true,
      },
      note: "Emotional silence breath: Owner privately messages Marcus asking what happened.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown position={at(C, 0, 0, 3.0)} rotationY={0} animation="press" face="worried" time={t} />
      ),
    },
    {
      cue: "5.tell",
      ...cam.front({ actor: at(C, 0, 0, 3.0), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "lantern-night",
      hud: {
        chat: [{ sender: "Marcus", text: "My little brother is scared of the dark...", color: "#ffffff", whisper: true }],
      },
      note: "Marcus opens up privately to the Owner about protecting his little brother.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown position={at(C, 0, 0, 3.0)} rotationY={0} animation="idle" face="surprised" time={t} />
      ),
    },
    {
      cue: "5.idea",
      ...cam.front({ actor: at(C, 0, 0, 3.0), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "lantern-night",
      note: "Overhead ! badge pops over Owner—he knows the exact vanilla Minecraft solution!",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown badge="!" badgePopStart={0.15} position={at(C, 0, 0, 3.0)} rotationY={0} animation="point" face="brave" time={t} />
      ),
    },
    {
      cue: "6.one",
      ...cam.sweep({ on: at(H, 0, 0.8, 0), dist: 4.2, fromYaw: -20, toYaw: 20, pitch: 14, fov: 42 }),
      zone: "hall",
      look: "warm-room",
      hud: { banner: { text: "1 BED SKIPS THE NIGHT", color: "#55ff55" } },
      note: "Vanilla Minecraft mechanic: sleeping skips the entire night so zero Phantoms spawn.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown position={at(H, 0, 0, 1.8)} rotationY={Math.PI} animation="point" face="grin" time={t} />
      ),
    },
    {
      cue: "6.ping",
      ...cam.front({ actor: at(H, 0, 0, 2.2), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "warm-room",
      hud: { chat: [{ sender: "Owner", text: "@everyone BRING A BED TO SPAWN HALL!", color: "#55ff55" }] },
      note: "Owner rallies the entire server to bring wool and oak planks to the grand hall.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown position={at(H, 0, 0, 2.2)} rotationY={0} animation="cheer" face="grin" time={t} />
      ),
    },
    {
      cue: "6.build",
      ...cam.track({ from: at(H, -4.0, 0, 4.5), to: at(H, 1.5, 0, 2.2), sideDist: 5.4, lead: 1.0, height: 1.8, fov: 46 }),
      zone: "hall",
      look: "warm-room",
      note: "Players rush into the grand wooden hall carrying colorful beds.",
      stage: (t) => {
        const w = moveBetween(at(H, -4.0, 0, 4.5), at(H, 1.5, 0, 2.2), t, 0, 1.4);
        return (
          <>
            <ServerPlayer role="owner" nameTag="Owner" crown position={at(H, 0, 0, -0.5)} rotationY={0} animation="cheer" face="grin" time={t} />
            <ServerCrowd
              members={[
                { role: "friendA", position: w.position, rotationY: w.rotationY, animation: "run", animDistance: w.animDistance },
                { role: "mom", position: [w.position[0] - 1.4, 0, w.position[2] + 0.8], rotationY: w.rotationY, animation: "run", animDistance: w.animDistance },
              ]}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "6.fifty",
      ...cam.streetOverview({ from: at(H, 0, 0, 10.5), to: at(H, 0, 0, 5.2), on: at(H, 0, 1.2, -1.0), height: 5.2, fov: 46 }),
      zone: "hall",
      look: "warm-room",
      hud: { counter: { label: "BEDS PLACED", from: 1, to: 50, startAt: 0.05, dur: 1.3, color: "#ffdd57" } },
      note: "Screenshot-worthy crane revealing 50 colorful beds lined up side by side across the hall!",
      stage: (t) => (
        <ServerCrowd
          members={[
            { role: "owner", position: at(H, 0, 0, 4.8), rotationY: Math.PI, animation: "cheer" },
            { role: "friendA", position: at(H, -2.5, 0, 4.6), rotationY: Math.PI, animation: "cheer" },
            { role: "mom", position: at(H, 2.5, 0, 4.6), rotationY: Math.PI, animation: "cheer" },
          ]}
          time={t}
        />
      ),
    },
  ],
});
