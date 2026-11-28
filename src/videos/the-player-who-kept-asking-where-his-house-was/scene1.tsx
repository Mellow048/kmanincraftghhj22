import {
  BlueRoofCottage,
  PLACE,
  ServerPlayer,
  TrailSign,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.smp;
const I = PLACE.irl;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "40th Time Asking, Trail Signs & IRL Truth",
  shots: [
    {
      cue: "1.ask",
      ...cam.front({ actor: at(S, 0, 0, 2.2), dist: 4.8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "smp",
      hud: {
        banner: { text: "40TH TIME", color: "#ff4f42" },
        chat: [{ sender: "Arthur", text: "hey guys... which house is mine?", color: "#ffffff" }],
        typing: true,
      },
      note: "Hook: Silver-haired Arthur turns confused 10 blocks from his blue-roofed cottage while chat types.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, 2.2)} rotationY={0} animation="lookAround" face="worried" badge="?" time={t} />
        </>
      ),
    },
    {
      cue: "1.close",
      ...cam.sweep({ on: at(S, 0, 1.8, 7.5), dist: 8.5, fromYaw: -20, toYaw: 20, pitch: 12, fov: 46 }),
      zone: "smp",
      note: "Wide parallax showing Arthur standing just ten blocks from his bright blue wool roof.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, 2.2)} rotationY={0} animation="shrug" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "1.mock",
      ...cam.twoShot({ a: at(S, -1.3, 0, 1.8), b: at(S, 1.3, 0, 1.8), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "smp",
      hud: {
        chat: [
          { sender: "Rex", text: "fake noob lol", color: "#ff6b6b" },
          { sender: "Rex", text: "open your eyes bro", color: "#ff6b6b" },
        ],
      },
      note: "Rex and players point and laugh in chat calling Arthur a fake-noob troll.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="bully" nameTag="Rex" position={at(S, -1.3, 0, 1.8)} rotationY={0.4} animation="laugh" face="laugh" time={t} />
          <ServerPlayer role="friendA" position={at(S, 1.3, 0, 1.8)} rotationY={-0.4} animation="point" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.tease",
      ...cam.front({ actor: at(S, 0, 0, -2.0), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "smp",
      note: "Open loop tease: Server Owner watches thoughtfully from Spawn.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, 0, 0, -2.0)} rotationY={0} animation="idle" face="calm" time={t} />
      ),
    },
    {
      cue: "2.signs",
      ...cam.track({ from: at(S, 0, 0, -1.0), to: at(S, 0, 0, 5.0), sideDist: 5.2, lead: 1.0, height: 1.6, fov: 44 }),
      zone: "smp",
      note: "Arthur walks carefully placing clumsy oak trail signs every five blocks from Spawn.",
      stage: (t) => {
        const w = moveBetween(at(S, 0, 0, -1.0), at(S, 0, 0, 5.0), t, 0, 1.4);
        return (
          <>
            <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
            <TrailSign position={at(S, 1.8, 0, 0.5)} title="MY HOUSE ->" />
            <TrailSign position={at(S, 1.8, 0, 5.0)} title="BLUE ROOF" />
            <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="calm" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.blue",
      ...cam.heroLow({ on: at(S, 0, 2.8, 10.5), dist: 7.4, yaw: 16, fov: 44 }),
      zone: "smp",
      note: "Bright daylight hero angle up at Arthur's unmistakable bright blue wool roof.",
      stage: () => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <TrailSign position={at(S, 2.2, 0, 7.2)} title="BLUE ROOF" />
        </>
      ),
    },
    {
      cue: "2.past",
      ...cam.track({ from: at(S, -2.5, 0, 7.0), to: at(S, 2.8, 0, 7.0), sideDist: 5.4, lead: 0.9, height: 1.6, fov: 44 }),
      zone: "smp",
      note: "Arthur accidentally walks right past his own front door while players snicker behind him.",
      stage: (t) => {
        const w = moveBetween(at(S, -2.5, 0, 7.0), at(S, 2.8, 0, 7.0), t, 0, 1.4);
        return (
          <>
            <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
            <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.rex",
      ...cam.twoShot({ a: at(S, -0.8, 0, 6.4), b: at(S, 1.1, 0, 6.4), dist: 5.0, height: 1.5, fov: 42 }),
      zone: "smp",
      note: "Bully Rex follows Arthur around mocking every single step.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 1.1, 0, 6.4)} rotationY={0.4} animation="idle" face="sad" time={t} />
          <ServerPlayer role="bully" nameTag="Rex" position={at(S, -0.9, 0, 6.4)} rotationY={1.1} animation="point" face="laugh" time={t} />
        </>
      ),
    },
    {
      cue: "3.desk",
      ...cam.sweep({ on: at(I, 0, 1.2, -1.9), dist: 3.0, fromYaw: -52, toYaw: -34, pitch: 8, fov: 40 }),
      zone: "irl",
      look: "warm-room",
      note: "Human truth reveal: 72-year-old Arthur sits quietly at his warm lamp-lit IRL computer desk.",
      stage: (t) => (
        <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" position={at(I, 0, 0, -1.6)} rotationY={Math.PI} animation="sit" face="calm" time={t} />
      ),
    },
    {
      cue: "3.note",
      ...cam.sweep({ on: at(I, 0.45, 1.52, -2.56), dist: 2.6, fromYaw: -16, toYaw: 16, pitch: 4, fov: 36 }),
      zone: "irl",
      look: "warm-room",
      hud: { banner: { text: "FIND THE BLUE ROOF", color: "#ffe066" } },
      note: "Close sweep on the yellow sticky note taped to Arthur's monitor: FIND THE BLUE ROOF.",
      stage: (t) => (
        <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" position={at(I, 0, 0, -1.6)} rotationY={Math.PI} animation="sit" face="calm" time={t} />
      ),
    },
    {
      cue: "3.sam",
      ...cam.twoShot({ a: at(S, -1.1, 0, 7.2), b: at(S, 1.1, 0, 7.2), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "smp",
      look: "overworld-golden",
      hud: { filter: "sepia", banner: { text: "BEFORE COLLEGE", color: "#ffdd57" } },
      note: "Warm sepia flashback: grandson Sam smiling beside Arthur as they finish the blue-roofed cottage together.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, -1.1, 0, 7.2)} rotationY={0.4} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="hero" nameTag="Sam" position={at(S, 1.1, 0, 7.2)} rotationY={-0.4} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "3.place",
      ...cam.front({ actor: at(S, 0, 0, 7.2), dist: 5.0, fov: 42, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-golden",
      hud: { filter: "sepia" },
      note: "Arthur and Sam hug outside their blue-roofed cottage—the one place they could always meet.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, -0.65, 0, 7.2)} rotationY={1.0} animation="hug" face="smile" time={t} />
          <ServerPlayer role="hero" nameTag="Sam" position={at(S, 0.65, 0, 7.2)} rotationY={-1.0} animation="hug" face="smile" time={t} />
        </>
      ),
    },
  ],
});
