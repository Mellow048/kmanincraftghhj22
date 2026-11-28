import {
  DiamondSword,
  MinecraftBed,
  PLACE,
  PhantomMob,
  ServerPlayer,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const C = PLACE.cabin;
const I = PLACE.irl;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "200 Days Awake, Phantoms & Little Brother Truth",
  shots: [
    {
      cue: "1.never",
      ...cam.front({ actor: at(C, 0, 0, 3.2), dist: 4.8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "lantern-night",
      hud: {
        clock: "DAY 200 · 3:00 AM",
        counter: { label: "DAYS AWAKE", from: 1, to: 200, startAt: 0.05, dur: 1.2, color: "#ffdd57" },
      },
      note: "Hook: Big brother stands awake outside the cherry cabin beside an untouched bed as the 200-day counter rolls up.",
      stage: (t) => {
        const w = moveBetween(at(C, 0, 0, 2.4), at(C, 0, 0, 3.4), t, 0, 1.0);
        return (
          <>
            <MinecraftBed position={at(C, 1.8, 0, 3.0)} color="#e03131" />
            <ServerPlayer role="hero" nameTag="Marcus" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "guard"} animDistance={w.animDistance} face="brave" time={t}>
              <DiamondSword position={[0, 0.04, 0.24]} scale={1.1} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "1.vamp",
      ...cam.twoShot({ a: at(C, -1.4, 0, 4.2), b: at(C, 1.4, 0, 4.2), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "cabin",
      look: "lantern-night",
      hud: {
        chat: [
          { sender: "Bully", text: "bro never sleeps lol", color: "#ff6b6b" },
          { sender: "Bully", text: "literal vampire", color: "#ff6b6b" },
        ],
      },
      note: "Wrong label: players point and laugh calling him 'the vampire' with a ? badge popping.",
      stage: (t) => (
        <>
          <ServerPlayer role="bully" nameTag="Kyle" position={at(C, -1.4, 0, 4.2)} rotationY={0.5} animation="laugh" face="laugh" time={t} />
          <ServerPlayer role="hero" nameTag="Marcus" badge="?" position={at(C, 1.4, 0, 4.2)} rotationY={-0.5} animation="idle" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "1.open",
      ...cam.front({ actor: at(C, 0, 0, 3.2), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "lantern-night",
      note: "Open loop: Server Owner watches Marcus closely from the edge of the cherry trees.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown position={at(C, 0, 0, 3.2)} rotationY={0} animation="idle" face="calm" time={t} />
      ),
    },
    {
      cue: "2.three",
      ...cam.heroLow({ on: at(C, 0, 3.2, 2.5), dist: 7.2, yaw: -16, fov: 46 }),
      zone: "cabin",
      look: "overworld-night",
      hud: { banner: { text: "3 DAYS NO SLEEP", color: "#55ff55" } },
      note: "Glowing green-eyed Phantoms circle high in the midnight sky over the cherry cabin.",
      stage: (t) => {
        const f = ease(ramp(t, 0, 1.4));
        return (
          <>
            <PhantomMob position={at(C, -2.5 + f * 3.8, 4.6 - f * 0.8, 1.5)} rotationY={0.8} scale={1.15} time={t} />
            <PhantomMob position={at(C, 2.6 - f * 3.2, 5.2 - f * 0.9, 2.8)} rotationY={-0.9} scale={1.1} time={t + 0.4} />
          </>
        );
      },
    },
    {
      cue: "2.sky",
      ...cam.sweep({ on: at(C, 0, 2.8, 2.8), dist: 6.2, fromYaw: -20, toYaw: 20, pitch: 10, fov: 44 }),
      zone: "cabin",
      look: "overworld-night",
      note: "Phantoms swoop down out of the midnight sky straight toward the cabin porch.",
      stage: (t) => {
        const d = ease(ramp(t, 0, 1.35));
        return (
          <>
            <PhantomMob position={at(C, -1.2 + d * 1.4, 4.4 - d * 2.2, 2.2 + d * 1.2)} rotationY={0.3} scale={1.15} time={t} />
            <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 0, 0, 3.4)} rotationY={0.2} animation="guard" face="brave" time={t}>
              <DiamondSword position={[0, 0.04, 0.24]} scale={1.1} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "2.fight",
      ...cam.front({ actor: at(C, 0, 0, 3.4), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "overworld-night",
      hud: { clock: "3:00 AM" },
      note: "At 3:00 AM every night, Marcus swings his diamond sword fighting Phantoms off alone.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 0, 0, 3.4)} rotationY={0} animation="push" face="brave" time={t}>
            <DiamondSword position={[0, 0.06, 0.28]} scale={1.15} />
          </ServerPlayer>
          <PhantomMob position={at(C, 1.4, 2.4, 2.8)} rotationY={-0.7} scale={1.05} time={t} />
        </>
      ),
    },
    {
      cue: "2.roof",
      ...cam.sweep({ on: at(C, 0, 1.6, 2.8), dist: 6.0, fromYaw: 20, toYaw: -20, pitch: 12, fov: 44 }),
      zone: "cabin",
      look: "overworld-night",
      note: "Marcus stands lone guard outside the warm glowing cherry cabin door.",
      stage: (t) => (
        <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 0, 0, 3.0)} rotationY={0} animation="guard" face="brave" time={t}>
          <DiamondSword position={[0, 0.04, 0.24]} scale={1.1} />
        </ServerPlayer>
      ),
    },
    {
      cue: "3.not",
      ...cam.front({ actor: at(C, 0, 0, 3.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "lantern-night",
      note: "Human truth: Marcus lowers his sword—he was never a vampire or tryhard.",
      stage: (t) => {
        const w = moveBetween(at(C, 0, 0, 2.4), at(C, 0, 0, 3.4), t, 0, 1.2);
        return <ServerPlayer role="hero" nameTag="Marcus" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="calm" time={t} />;
      },
    },
    {
      cue: "3.bro",
      ...cam.twoShot({ a: at(C, -0.8, 0, 3.2), b: at(C, 0.8, 0, 3.2), dist: 4.8, height: 1.4, fov: 42 }),
      zone: "cabin",
      look: "lantern-night",
      note: "He was a big brother standing watch over his little brother Leo inside.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Marcus" position={at(C, -0.8, 0, 3.2)} rotationY={0.5} animation="wave" face="smile" time={t} />
          <ServerPlayer role="friendA" nameTag="Little Bro" scale={0.78} position={at(C, 0.8, 0, 3.2)} rotationY={-0.5} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "3.irl",
      ...cam.front({ actor: at(I, 0, 0, -1.6), dist: 3.8, fov: 42, screenOffset: [0, 0.06] }),
      zone: "irl",
      look: "warm-room",
      note: "IRL house cutaway: his little brother hugs his knees on the floor beside the couch, afraid of the dark.",
      stage: (t) => (
        <ServerPlayer role="friendA" scale={0.78} position={at(I, 0, 0, -1.6)} rotationY={0} animation="cower" face="scared" time={t} />
      ),
    },
    {
      cue: "3.awake",
      ...cam.front({ actor: at(C, 0, 0, 3.2), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "overworld-night",
      note: "Every night Marcus stayed awake outside keeping every monster away from his brother's roof.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Marcus" position={at(C, 0, 0, 3.2)} rotationY={0} animation="guard" face="brave" time={t}>
            <DiamondSword position={[0, 0.04, 0.24]} scale={1.1} />
          </ServerPlayer>
          <PhantomMob position={at(C, -1.6, 2.8, 2.0)} rotationY={0.6} scale={1.0} time={t} />
        </>
      ),
    },
    {
      cue: "3.safe",
      ...cam.front({ actor: at(I, 0, 0, -1.6), dist: 3.8, fov: 42, screenOffset: [0, 0.06] }),
      zone: "irl",
      look: "warm-room",
      note: "Inside the warm lamp-lit house, his little brother smiles peacefully playing safe.",
      stage: (t) => (
        <ServerPlayer role="friendA" scale={0.78} position={at(I, 0, 0, -1.6)} rotationY={0} animation="cheer" face="grin" time={t} />
      ),
    },
  ],
});
