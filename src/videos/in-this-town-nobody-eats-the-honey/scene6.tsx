import {
  BeeMob,
  Dad,
  FlowerRallyRows,
  HoneyJar,
  Kid,
  Mayor,
  PLACE,
  Player,
  PoppyFlower,
  SubscribeSign,
  WoodenSpoon,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const H = PLACE.hall;
const M = PLACE.meadow;
const S = PLACE.school;

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The Memorial Wall & 400-Flower Rally",
  shots: [
    {
      cue: "6.list",
      ...cam.truck({ on: at(H, -1.8, 2.0, -2.0), by: [3.6, 0, 0], dist: 4.4, yaw: 0, pitch: 6, fov: 42 }),
      zone: "hall",
      look: "overworld-sunset",
      hud: {
        checklist: {
          title: "EVERY CLUE",
          rows: [
            { text: "The Names", at: 0.05, done: true, doneAt: 0.25 },
            { text: "The Flowers", at: 0.45, done: true, doneAt: 0.65 },
            { text: "The Smoke & Sorry", at: 0.85, done: true, doneAt: 1.05 },
          ],
        },
      },
      note: "List payoff: truck along the glowing memorial wall as every planted clue clicks into place.",
      stage: (t) => {
        const w = moveBetween(at(H, -1.6, 0, 1.0), at(H, 1.4, 0, 1.0), t, 0, 1.5);
        return <Kid position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="sad" time={t} />;
      },
    },
    {
      cue: "6.sting",
      ...cam.front({ actor: at(H, 0, 0, 0.8), dist: 4.4, fov: 40, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "overworld-sunset",
      note: "Mayor places a gentle hand near Kid's shoulder explaining that a sting is a bee's very last act.",
      stage: (t) => (
        <>
          <Mayor position={at(H, 0.9, 0, 0.8)} rotationY={-0.8} animation="talk" face="calm" time={t} />
          <Kid position={at(H, -0.8, 0, 0.8)} rotationY={0.8} animation="idle" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "6.why",
      ...cam.twoShot({ a: at(H, -0.8, 0, 0.8), b: at(H, 0.9, 0, 0.8), dist: 4.8, height: 1.5, fov: 42 }),
      zone: "hall",
      look: "overworld-sunset",
      note: "The smoke keeps bees from ever having to sting, and the sorry means the town remembers.",
      stage: (t) => (
        <>
          <Mayor position={at(H, 0.9, 0, 0.8)} rotationY={-0.8} animation="point" face="calm" time={t} />
          <Kid position={at(H, -0.8, 0, 0.8)} rotationY={0.8} animation="idle" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "6.grandma",
      ...cam.sweep({ on: at(H, 0, 3.2, -2.0), dist: 3.6, fromYaw: -18, toYaw: 18, pitch: 4, fov: 38 }),
      zone: "hall",
      look: "overworld-sunset",
      hud: { banner: { text: "FIRST", color: "#ffdd57", sub: "SAVED GRANDMA" } },
      note: "Callback to the dusty top jar FIRST—the one that saved his grandma.",
      stage: (t) => <HoneyJar position={at(H, 0, 3.0, -2.1)} scale={1.15} glow={0.35 + Math.sin(t * 3) * 0.05} />,
    },
    {
      cue: "6.saved",
      ...cam.twoShot({ a: at(H, -1.6, 0, 1.2), b: at(H, 1.6, 0, 1.2), dist: 5.8, height: 1.5, fov: 44 }),
      zone: "hall",
      look: "overworld-sunset",
      note: "Townspeople step quietly into the Honey Hall—grandma, baker, teacher—half the town alive because of a jar.",
      stage: (t) => (
        <>
          <Player who={1} scale={0.95} position={at(H, -2.0, 0, 1.2)} rotationY={0.3} animation="idle" face="calm" time={t} />
          <Player who={3} scale={0.95} position={at(H, -0.6, 0, 1.4)} rotationY={0.1} animation="idle" face="smile" time={t} />
          <Player who={4} scale={0.95} position={at(H, 0.8, 0, 1.4)} rotationY={-0.1} animation="idle" face="smile" time={t} />
          <Player who={5} scale={0.95} position={at(H, 2.1, 0, 1.2)} rotationY={-0.3} animation="idle" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "6.empty",
      ...cam.sweep({ on: at(H, 0, 1.65, -2.0), dist: 3.4, fromYaw: 18, toYaw: -18, pitch: 4, fov: 38 }),
      zone: "hall",
      look: "overworld-sunset",
      hud: { banner: { text: "SPOON", color: "#ffdd57", sub: "EMPTY MEMORIAL JAR" } },
      note: "OTS: Mayor places one empty glass jar on the shelf labeled SPOON beside Kid's wooden spoon.",
      stage: (t) => (
        <>
          <HoneyJar position={at(H, 0, 1.5, -2.1)} scale={1.15} empty />
          <WoodenSpoon position={at(H, 0.45, 1.52, -2.1)} scale={1.0} />
          <Mayor position={at(H, 0.9, 0, -1.1)} rotationY={-2.5} animation="reach" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "6.mine2",
      ...cam.front({ actor: at(H, 0, 0, 0.8), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "overworld-sunset",
      note: "Kid realizes the honey that saved his life came from his own little bee's hive.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.0));
        return <Kid position={at(H, 0, 0, 0.8 - s * 0.4)} rotationY={0} animation="ache" face="crying" time={t} />;
      },
    },
    {
      cue: "6.plant",
      ...cam.front({ actor: at(S, 0, 0, -0.4), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "school",
      look: "overworld-day",
      note: "Bright morning: Kid kneels and plants his red poppy gently beneath the windowsill.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Kid position={at(S, -0.5, 0, -0.5)} rotationY={0.8} animation="reach" face="smile" time={t} />
            <PoppyFlower position={at(S, 0.3, 0, -0.5)} scale={0.7 + s * 0.5} />
          </>
        );
      },
    },
    {
      cue: "6.rally",
      ...cam.streetOverview({
        from: at(M, 0, 0, 11.5),
        to: at(M, 0, 0, 5.5),
        on: at(M, 0, 0.9, 0),
        height: 5.0,
        fov: 46,
      }),
      zone: "meadow",
      look: "overworld-day",
      hud: { counter: { label: "FLOWERS PLANTED", from: 1, to: 400, startAt: 0.08, dur: 1.4, color: "#55ff55" } },
      note: "OTS whole-town community rally: everyone kneels across the sunlit meadow planting 400 flowers.",
      stage: (t) => {
        const p = ease(ramp(t, 0, 1.45));
        return (
          <>
            <FlowerRallyRows position={at(M, 0, 0, 0)} progress={p} />
            <Kid position={at(M, -0.9, 0, 2.2)} rotationY={2.6} animation="crouch" face="smile" time={t} />
            <Dad position={at(M, -2.0, 0, 2.0)} rotationY={Math.PI} animation="crouch" face="smile" time={t} />
            <Mayor position={at(M, 2.0, 0, 2.0)} rotationY={Math.PI} animation="crouch" face="smile" time={t} />
            <Player who={1} scale={0.85} position={at(M, -3.5, 0, 0.5)} rotationY={0.6} animation="crouch" face="smile" time={t} />
            <Player who={3} scale={0.85} position={at(M, 3.5, 0, 0.5)} rotationY={-0.6} animation="crouch" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.crops",
      ...cam.sweep({ on: at(M, 0, 1.2, 0), dist: 6.8, fromYaw: -22, toYaw: 22, pitch: 14, fov: 46 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Happy golden bees drift across the 400 blooming flowers making the entire valley glow.",
      stage: (t) => (
        <>
          <FlowerRallyRows position={at(M, 0, 0, 0)} progress={1} />
          {[-3.0, -1.2, 0.6, 2.4, 3.8].map((bx, i) => (
            <BeeMob
              key={i}
              position={at(M, bx + Math.sin(t * 2 + i) * 0.5, 1.4 + (i % 2) * 0.4, -0.8 + (i % 3) * 0.9)}
              rotationY={i % 2 === 0 ? 0.5 : -0.5}
              scale={1.0}
              time={t + i * 0.2}
            />
          ))}
        </>
      ),
    },
    {
      cue: "6.sorry2",
      ...cam.twoShot({ a: at(M, -1.4, 0, 2.4), b: at(M, 1.4, 0, 2.4), dist: 5.8, height: 1.5, fov: 44 }),
      zone: "meadow",
      look: "overworld-day",
      hud: { banner: { text: '"SORRY."', color: "#f8f9fa" } },
      note: "Callback payoff: the whole town bows quietly together in the flower field—nobody laughs.",
      stage: (t) => (
        <>
          <FlowerRallyRows position={at(M, 0, 0, 0)} progress={1} />
          <Kid position={at(M, 0, 0, 2.4)} rotationY={0} animation="idle" face="calm" time={t} />
          <Dad position={at(M, -1.6, 0, 2.4)} rotationY={0.1} animation="idle" face="calm" time={t} />
          <Mayor position={at(M, 1.6, 0, 2.4)} rotationY={-0.1} animation="idle" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "6.sub",
      ...cam.front({ actor: at(H, 0, 0, 0.8), dist: 4.8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Seamless Frame-0 loop + story-locked CTA: back in Honey Hall holding a poppy beside the 400 glowing jars.",
      stage: (t) => {
        const w = moveBetween(at(H, 0, 0, 0.4), at(H, 0, 0, 1.2), t, 0, 0.8);
        return (
          <>
            <SubscribeSign position={at(H, 0, 3.6, -1.2)} />
            <Kid position={w.position} rotationY={0} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="smile" time={t}>
              <PoppyFlower position={[0, 0, 0.24]} scale={1.1} />
            </Kid>
            <BeeMob position={at(H, 0.9, 1.55, 1.2)} rotationY={-0.4} scale={1.1} time={t} />
          </>
        );
      },
    },
  ],
});
