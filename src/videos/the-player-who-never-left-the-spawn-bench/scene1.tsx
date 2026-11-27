import {
  Block,
  ChatToast,
  FloatingNumber,
  Maya,
  PLACE,
  ServerPlayer,
  SpawnBench,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

/** Scene 1 (Beats 1–2): Maya Sits on the Spawn Bench Greeting Everyone While Players Call Her an AFK Bot. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Spawn Bench",
  shots: [
    {
      cue: "1.bench",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.6), facing: 0, dist: 6.5, to: 5.3, side: 14, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Hook: Maya sits happily on the oak spawn bench waving warmly to the square.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="wave" face="smile" time={t} />
          <ServerPlayer role="friendA" position={on(PLACE.server, -3.2, 0, -1.8)} rotationY={0.4} animation="wave" face="smile" time={t} />
          <ServerPlayer role="friendB" position={on(PLACE.server, 3.1, 0, -1.6)} rotationY={-0.35} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.four",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.6), facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "server",
      note: "4:00 PM tag pops above Maya as she joins the server and sits on the bench.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="sit" headYaw={Math.sin(t * 2.4) * 0.22} face="smile" time={t} />
          <FloatingNumber text="4:00 PM" color="#ffd84d" position={on(PLACE.server, 0, 2.55, 0.55)} height={0.62 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "1.hi",
      ...cam.twoShot({ a: on(PLACE.server, -1.1, 0, 0.8), b: on(PLACE.server, 1.1, 0, 0.8), facing: 0, dist: 6.7, to: 5.6, side: 12, pitch: 8, fov: 45 }),
      zone: "server",
      note: "Maya waves gently while a glowing diamond block sits untouched beside her.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, -0.7, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, -0.7, 0.35, 0.55)} rotationY={0.15} animation="wave" face="calm" time={t} />
          <Block position={on(PLACE.server, 1.3, 0.4, 0.8)} size={[0.75, 0.75, 0.75]} color="#4ce8ff" emissive="#22b8d6" emissiveIntensity={0.25} />
        </>
      ),
    },
    {
      cue: "1.chat",
      ...cam.front({ actor: on(PLACE.server, 0, 0.3, 0.6), facing: 0, dist: 6.2, to: 5.0, side: 12, pitch: 7, fov: 42 }),
      zone: "server",
      note: "Warm ChatToast pops right above Maya: '<Maya> hi'.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="wave" face="grin" time={t} />
          <ChatToast sender="Maya" text="hi" position={on(PLACE.server, 0, 2.45, 0.55)} height={0.28 * pop(t, 0.1)} color="#6ee7b7" />
        </>
      ),
    },
    {
      cue: "1.back",
      ...cam.twoShot({ a: on(PLACE.server, -0.9, 0, 0.7), b: on(PLACE.server, 1.1, 0, 1.1), facing: 0, dist: 6.5, to: 5.4, side: -12, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Another player walks into spawn and Maya waves with 'welcome back' in chat.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        return (
          <>
            <SpawnBench position={on(PLACE.server, -0.9, 0, 0.4)} state="plain" />
            <Maya position={on(PLACE.server, -0.9, 0.35, 0.55)} rotationY={0.35} animation="wave" face="grin" time={t} />
            <ServerPlayer role="friendA" position={on(PLACE.server, 1.8 - w * 0.9, 0, 1.2)} rotationY={w < 0.96 ? -Math.PI / 2 : -0.35} animation={w < 0.96 ? "walk" : "wave"} animDistance={w * 0.9} face="smile" time={t} />
            <ChatToast sender="Maya" text="welcome back" position={on(PLACE.server, -0.6, 2.5, 0.6)} height={0.26 * pop(t, 0.12)} color="#6ee7b7" />
          </>
        );
      },
    },
    {
      cue: "2.hut",
      ...cam.push({ on: on(PLACE.server, 0, 1.2, 0.6), dist: 7.3, to: 6.1, yaw: 12, pitch: 9, fov: 46 }),
      zone: "server",
      note: "Wide view of Maya on her simple oak bench with empty grass where a house would be.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="sit" headYaw={Math.sin(t * 2.2) * 0.25} face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "2.walk",
      ...cam.twoShot({ a: on(PLACE.server, -1.2, 0, 0.8), b: on(PLACE.server, 1.2, 0, 1.4), facing: 0, dist: 6.9, to: 5.8, side: -10, pitch: 8, fov: 45 }),
      zone: "server",
      note: "Fast armored players sprint right past Maya's bench without stopping.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.1));
        return (
          <>
            <SpawnBench position={on(PLACE.server, -1.1, 0, 0.4)} state="plain" />
            <Maya position={on(PLACE.server, -1.1, 0.35, 0.55)} rotationY={0.3} animation="wave" face="smile" time={t} />
            <ServerPlayer role="friendB" position={on(PLACE.server, -2.0 + s * 4.2, 0, 1.9)} rotationY={Math.PI / 2} animation={s > 0.02 && s < 0.98 ? "run" : "idle"} animDistance={s * 4.2} face="calm" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.wave",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.6), facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 7, fov: 42 }),
      zone: "server",
      note: "Close front view of Maya smiling warmly and waving from her oak bench.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "2.bot",
      ...cam.twoShot({ a: on(PLACE.server, -1.1, 0, 1.0), b: on(PLACE.server, 1.1, 0, 1.0), facing: 0, dist: 6.7, to: 5.6, side: 10, pitch: 8, fov: 45 }),
      zone: "server",
      note: "Two players laugh and point calling Maya an AFK bot while she sits quietly.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, -1.2, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, -1.2, 0.35, 0.55)} rotationY={0.25} animation="sit" headYaw={0.25 + Math.sin(t * 2) * 0.1} face="uneasy" time={t} />
          <ServerPlayer role="friendC" position={on(PLACE.server, 1.0, 0, 1.2)} rotationY={-0.5} animation="laugh" face="smug" time={t} />
          <ChatToast text="LAZY AFK BOT LOL" position={on(PLACE.server, 1.0, 2.55, 1.2)} height={0.25 * pop(t, 0.12)} color="#ff6b57" />
        </>
      ),
    },
    {
      cue: "2.why",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.6), facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 7, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Quiet golden-hour shot of Maya alone on her bench — nobody asked why she never moved.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="plain" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="sit" headYaw={Math.sin(t * 1.8) * 0.18} face="sad" time={t} />
        </>
      ),
    },
  ],
});
