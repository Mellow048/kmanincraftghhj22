import {
  Block,
  ChatToast,
  FloatingNumber,
  Glow,
  Jake,
  Maya,
  PLACE,
  ServerPlayer,
  SpawnBench,
  TntBlock,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 2 (Beats 3–4): Jake Blows Up the Bench -> Maya Types 'sorry' -> Sister Reveals IRL Truth. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The TNT Grief & IRL Reveal",
  shots: [
    {
      cue: "3.jake",
      ...cam.front({ actor: on(PLACE.server, 0.8, 0, 1.0), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Jake stomps toward the spawn bench looking annoyed and angry.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.9));
        return (
          <Jake position={on(PLACE.server, 1.8 - w * 1.0, 0, 1.0)} rotationY={-0.3} animation="walk" animDistance={w * 1.0} face="angry" time={t} />
        );
      },
    },
    {
      cue: "3.tnt",
      ...cam.twoShot({ a: on(PLACE.server, -0.7, 0, 0.6), b: on(PLACE.server, 0.9, 0, 1.0), facing: 0, dist: 6.5, to: 5.4, side: -12, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Jake drops a flashing red TNT block right beside Maya's wooden bench!",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, -0.7, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, -0.7, 0.35, 0.55)} rotationY={0.3} animation="cower" face="surprised" time={t} />
          <Jake position={on(PLACE.server, 1.1, 0, 1.0)} rotationY={-0.45} animation="press" face="smug" time={t} />
          <TntBlock position={on(PLACE.server, 0.25, 0, 0.85)} flash={Math.floor(t * 8) % 2 === 0} />
        </>
      ),
    },
    {
      cue: "3.boom",
      ...cam.push({ on: on(PLACE.server, 0, 1.2, 0.6), dist: 7.3, to: 6.0, yaw: 10, pitch: 8, fov: 46 }),
      zone: "server",
      note: "BOOM! Orange flash and oak splinters fly across the spawn square leaving a crater.",
      stage: (t) => {
        const boomAt = Math.max(0.12, wordAt("3.boom", "Boom") + 0.04);
        const hit = t >= boomAt;
        return (
          <>
            <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state={hit ? "crater" : "plain"} />
            {hit && (
              <>
                <Glow position={on(PLACE.server, 0, 1.1, 0.5)} size={3.6} color="#ff8844" opacity={0.65} />
                <Block position={on(PLACE.server, -0.7, 1.4 + (t - boomAt) * 1.6, 0.8)} size={[0.38, 0.18, 0.24]} color="#9c7042" />
                <Block position={on(PLACE.server, 0.8, 1.2 + (t - boomAt) * 1.8, 0.6)} size={[0.34, 0.16, 0.22]} color="#7a5630" />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "3.type",
      ...cam.front({ actor: on(PLACE.server, 0.6, 0, 1.0), facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 7, fov: 42 }),
      zone: "server",
      note: "Jake laughs pointing at the crater with a cruel ChatToast above him.",
      stage: (t) => (
        <>
          <Jake position={on(PLACE.server, 0.6, 0, 1.0)} rotationY={0} animation="laugh" face="smug" time={t} />
          <ChatToast sender="Jake" text="go actually play the game" position={on(PLACE.server, 0.6, 2.55, 1.0)} height={0.24 * pop(t, 0.1)} color="#ff4f42" />
        </>
      ),
    },
    {
      cue: "3.stand",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 0.6), facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Heartbreaking beat: Maya stands quietly in the empty crater looking down.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="crater" />
          <Maya position={on(PLACE.server, 0, 0, 0.6)} rotationY={0} animation="cower" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "3.sorry",
      ...cam.front({ actor: on(PLACE.server, 0, 0.1, 0.6), facing: 0, dist: 6.2, to: 5.0, side: 12, pitch: 7, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Maya's single quiet word 'sorry' floats gently above her in chat.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="crater" />
          <Maya position={on(PLACE.server, 0, 0, 0.6)} rotationY={0} animation="shrug" face="sad" time={t} />
          <ChatToast sender="Maya" text="sorry" position={on(PLACE.server, 0, 2.45, 0.6)} height={0.28 * pop(t, 0.12)} color="#cbd5e1" />
        </>
      ),
    },
    {
      cue: "3.left",
      ...cam.push({ on: on(PLACE.server, 0, 1.0, 0.6), dist: 6.9, to: 5.8, yaw: -10, pitch: 10, fov: 44 }),
      zone: "server",
      look: "overworld-night",
      note: "Maya vanishes leaving only the dark empty crater and 'Maya left the game' toast.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="crater" />
          <ChatToast text="Maya left the game" position={on(PLACE.server, 0, 2.1, 0.6)} height={0.26 * pop(t, 0.1)} color="#ffe066" />
        </>
      ),
    },
    {
      cue: "4.days",
      ...cam.push({ on: on(PLACE.server, 0, 1.1, 0.6), dist: 7.1, to: 6.0, yaw: 12, pitch: 10, fov: 45 }),
      zone: "server",
      note: "Three days pass — the empty bench spot sits quiet with a 3 DAYS LATER label.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="crater" />
          <FloatingNumber text="3 DAYS LATER" color="#cbd5e1" position={on(PLACE.server, 0, 2.35, 0.6)} height={0.55 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.join",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 0.6), facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Maya's avatar appears in the square as her older sister types a message in chat.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="crater" />
          <Maya position={on(PLACE.server, 0, 0, 0.6)} rotationY={0} animation="point" face="worried" time={t} />
          <ChatToast sender="Maya (Sister)" text="Hey, this is Maya's sister..." position={on(PLACE.server, 0, 2.55, 0.6)} height={0.24 * pop(t, 0.12)} color="#93c5fd" />
        </>
      ),
    },
    {
      cue: "4.hands",
      ...cam.front({ actor: on(PLACE.irl, 0, 0.4, -0.3), facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 8, fov: 42 }),
      zone: "irl",
      note: "IRL bedroom cutaway: Maya sits at her desk trying gently to hold the mouse.",
      stage: (t) => (
        <Maya position={on(PLACE.irl, 0, 0.25, -0.1)} rotationY={0.25} animation="sit" headYaw={Math.sin(t * 2.5) * 0.18} face="worried" time={t} />
      ),
    },
    {
      cue: "4.keys",
      ...cam.front({ actor: on(PLACE.irl, 0, 0.4, -0.3), facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 8, fov: 42 }),
      zone: "irl",
      note: "Maya gently presses two keys on her keyboard at her desk with a quiet smile.",
      stage: (t) => (
        <>
          <Maya position={on(PLACE.irl, 0, 0.25, -0.1)} rotationY={0} animation="press" face="calm" time={t} />
          <FloatingNumber text="2 KEYS" color="#93c5fd" position={on(PLACE.irl, 0, 2.45, -0.1)} height={0.58 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "4.desk",
      ...cam.twoShot({ a: on(PLACE.school, -0.9, 0, 0.6), b: on(PLACE.school, 1.0, 0, 0.6), facing: 0, dist: 6.5, to: 5.4, side: -10, pitch: 8, fov: 44 }),
      zone: "school",
      note: "IRL classroom cutaway: Maya looks down sadly at her desk while classmates point.",
      stage: (t) => (
        <>
          <Maya position={on(PLACE.school, -0.9, 0, 0.6)} rotationY={0.2} animation="cower" face="sad" time={t} />
          <ServerPlayer role="friendA" position={on(PLACE.school, 1.0, 0, 0.6)} rotationY={-0.35} animation="point" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "4.only",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.6), facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 7, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm flashback to Maya smiling peacefully on the oak spawn bench.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.loved",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.6), facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 7, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm 'hi! welcome back!' chat floats above Maya's smiling face.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="cheer" face="grin" time={t} />
          <ChatToast sender="Maya" text="hi! welcome back!" position={on(PLACE.server, 0, 2.5, 0.55)} height={0.26 * pop(t, 0.1)} color="#6ee7b7" />
        </>
      ),
    },
  ],
});
