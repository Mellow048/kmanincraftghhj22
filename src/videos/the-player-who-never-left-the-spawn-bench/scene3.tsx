import {
  ChatToast,
  FloatingNumber,
  Glow,
  Jake,
  Maya,
  Owner,
  PLACE,
  RedFlower,
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

/** Scene 3 (Beats 5–7): Guilt -> Owner Rally -> 40 Players Rebuild -> Maya Returns Home. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Rebuild & Coming Home",
  shots: [
    {
      cue: "5.quiet",
      ...cam.twoShot({ a: on(PLACE.server, -1.2, 0, 1.0), b: on(PLACE.server, 1.2, 0, 1.0), facing: 0, dist: 6.9, to: 5.8, side: 10, pitch: 8, fov: 45 }),
      zone: "server",
      note: "The entire server goes silent around the empty bench crater, heads bowed.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="crater" />
          <ServerPlayer role="friendA" position={on(PLACE.server, -1.4, 0, 1.2)} rotationY={0.35} animation="cower" face="sad" time={t} />
          <ServerPlayer role="friendC" position={on(PLACE.server, 1.4, 0, 1.2)} rotationY={-0.35} animation="cower" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "5.jake2",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 0.8), facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 7, fov: 42 }),
      zone: "server",
      note: "Jake stares down at the crater he blew up, full of regret.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.2)} state="crater" />
          <Jake position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="shrug" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "5.owner",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 0.8), facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 7, fov: 42 }),
      zone: "server",
      note: "Owner rally! Server Owner points forward typing 'grab your oak planks'.",
      stage: (t) => (
        <>
          <Owner position={on(PLACE.server, 0, 0, 0.8)} rotationY={0} animation="point" face="grin" time={t} />
          <ChatToast sender="Owner" text="grab your oak planks!" position={on(PLACE.server, 0, 2.55, 0.8)} height={0.26 * pop(t, 0.1)} color="#ffd84d" />
        </>
      ),
    },
    {
      cue: "6.forty",
      ...cam.push({ on: on(PLACE.server, 0, 1.3, 0.8), dist: 7.9, to: 6.6, yaw: -10, pitch: 9, fov: 46 }),
      zone: "server",
      note: "40 players rush into spawn square ready to rebuild together!",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Owner position={on(PLACE.server, 0, 0, 0.6)} rotationY={0} animation="cheer" face="grin" time={t} />
            <ServerPlayer role="friendA" position={on(PLACE.server, -2.0 + w * 0.6, 0, 1.1)} rotationY={w < 0.96 ? Math.PI / 2 : 0.3} animation={w < 0.96 ? "run" : "cheer"} animDistance={w * 0.6} face="grin" time={t} />
            <ServerPlayer role="friendB" position={on(PLACE.server, 2.0 - w * 0.6, 0, 1.1)} rotationY={w < 0.96 ? -Math.PI / 2 : -0.3} animation={w < 0.96 ? "run" : "cheer"} animDistance={w * 0.6} face="grin" time={t} />
            <Jake position={on(PLACE.server, 1.0, 0, 1.6)} rotationY={-0.2} animation="wave" face="calm" time={t} />
            <FloatingNumber text="40 PLAYERS" color="#4be08a" position={on(PLACE.server, 0, 2.8, 0.6)} height={0.65 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "6.build",
      ...cam.twoShot({ a: on(PLACE.server, -1.0, 0, 0.8), b: on(PLACE.server, 1.0, 0, 0.8), facing: 0, dist: 6.7, to: 5.6, side: 12, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Players rebuild Maya's oak bench flanked by warm glowing lanterns!",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Owner position={on(PLACE.server, -1.6, 0, 1.1)} rotationY={0.4} animation="press" face="grin" time={t} />
          <Jake position={on(PLACE.server, 1.6, 0, 1.1)} rotationY={-0.4} animation="press" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.plate",
      ...cam.front({ actor: on(PLACE.server, 0, 0.2, 0.8), facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 10, fov: 42 }),
      zone: "server",
      note: "Close-up of the shiny golden pressure plate wired right in front of Maya's seat.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Glow position={on(PLACE.server, 0, 0.25, 1.22)} size={1.4} color="#ffd84d" opacity={0.42} />
          <Owner position={on(PLACE.server, 1.4, 0, 1.2)} rotationY={-0.5} animation="point" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "6.auto",
      ...cam.front({ actor: on(PLACE.server, 0, 0.3, 0.8), facing: 0, dist: 6.3, to: 5.2, side: 12, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Owner taps the golden plate and 'welcome back!' pops automatically in chat!",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Owner position={on(PLACE.server, 0, 0, 1.22)} rotationY={0} animation="cheer" face="grin" time={t} />
          <ChatToast text="AUTO: welcome back!" position={on(PLACE.server, 0, 2.55, 1.0)} height={0.26 * pop(t, 0.12)} color="#4be08a" />
        </>
      ),
    },
    {
      cue: "6.town",
      ...cam.push({ on: on(PLACE.server, 0, 1.5, 0.4), dist: 8.1, to: 6.7, yaw: 12, pitch: 10, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Cozy lantern-lit spawn village glows warmly all around Maya's rebuilt bench.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <ServerPlayer role="friendA" position={on(PLACE.server, -2.2, 0, 1.2)} rotationY={0.3} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="friendC" position={on(PLACE.server, 2.2, 0, 1.2)} rotationY={-0.3} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "7.back2",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 0.8), facing: 0, dist: 6.3, to: 5.2, side: -12, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Next afternoon at 4 PM, Maya logs back in and gasps with a huge smile.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Maya position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="wave" face="surprised" time={t} />
          <FloatingNumber text="4:00 PM" color="#ffd84d" position={on(PLACE.server, 0, 2.55, 1.2)} height={0.58 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.line",
      ...cam.push({ on: on(PLACE.server, 0, 1.3, 1.0), dist: 7.9, to: 6.6, yaw: 10, pitch: 8, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Players line up across the golden square waving and cheering for Maya!",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Maya position={on(PLACE.server, 0, 0.35, 0.55)} rotationY={0} animation="cheer" face="grin" time={t} />
          <Owner position={on(PLACE.server, -2.0, 0, 1.5)} rotationY={0.35} animation="wave" face="grin" time={t} />
          <ServerPlayer role="friendA" position={on(PLACE.server, -1.0, 0, 1.8)} rotationY={0.2} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="friendB" position={on(PLACE.server, 1.1, 0, 1.8)} rotationY={-0.2} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="friendC" position={on(PLACE.server, 2.1, 0, 1.5)} rotationY={-0.35} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "7.flowers",
      ...cam.twoShot({ a: on(PLACE.server, -0.7, 0, 0.8), b: on(PLACE.server, 0.9, 0, 1.0), facing: 0, dist: 6.3, to: 5.2, side: 12, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Jake walks up humbly and drops bright red poppy flowers at Maya's feet.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.85));
        return (
          <>
            <SpawnBench position={on(PLACE.server, -0.7, 0, 0.4)} state="rebuilt" />
            <Maya position={on(PLACE.server, -0.7, 0.35, 0.55)} rotationY={0.3} animation="wave" face="smile" time={t} />
            <Jake position={on(PLACE.server, 1.5 - w * 0.6, 0, 1.1)} rotationY={w < 0.96 ? -Math.PI / 2 : -0.4} animation={w < 0.96 ? "walk" : "press"} animDistance={w * 0.6} face="smile" time={t} />
            <RedFlower position={on(PLACE.server, 0.1, 0.04, 1.1)} scale={1.1 * pop(t, 0.35)} />
            <RedFlower position={on(PLACE.server, 0.35, 0.04, 1.25)} scale={1.0 * pop(t, 0.45)} />
          </>
        );
      },
    },
    {
      cue: "7.glad",
      ...cam.twoShot({ a: on(PLACE.server, -0.45, 0.2, 0.6), b: on(PLACE.server, 0.45, 0.2, 0.6), facing: 0, dist: 6.2, to: 5.0, side: -12, pitch: 7, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Jake sits right beside Maya on her oak bench with 'glad you're back' in chat.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Maya position={on(PLACE.server, -0.48, 0.35, 0.55)} rotationY={0.15} animation="wave" face="grin" time={t} />
          <Jake position={on(PLACE.server, 0.48, 0.35, 0.55)} rotationY={-0.15} animation="wave" face="smile" time={t} />
          <ChatToast sender="Jake" text="glad you're back" position={on(PLACE.server, 0.4, 2.5, 0.55)} height={0.26 * pop(t, 0.12)} color="#ffd84d" />
        </>
      ),
    },
    {
      cue: "7.home",
      ...cam.front({ actor: on(PLACE.server, 0, 0.25, 0.6), facing: 0, dist: 6.2, to: 5.0, side: 10, pitch: 7, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm closing payoff: Maya smiles brightly on her lantern bench typing 'I'm home'.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Maya position={on(PLACE.server, -0.45, 0.35, 0.55)} rotationY={0.1} animation="cheer" face="grin" time={t} />
          <Jake position={on(PLACE.server, 0.48, 0.35, 0.55)} rotationY={-0.1} animation="cheer" face="grin" time={t} />
          <ChatToast sender="Maya" text="I'm home" position={on(PLACE.server, 0, 2.55, 0.55)} height={0.3 * pop(t, 0.12)} color="#6ee7b7" />
        </>
      ),
    },
    {
      cue: "7.cta",
      ...cam.front({ actor: on(PLACE.server, 0, 0.25, 0.6), facing: 0, dist: 6.3, to: 5.2, side: -10, pitch: 7, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm story-tied Subscribe CTA: Maya and Jake wave from the glowing lantern bench.",
      stage: (t) => (
        <>
          <SpawnBench position={on(PLACE.server, 0, 0, 0.4)} state="rebuilt" />
          <Maya position={on(PLACE.server, -0.48, 0.35, 0.55)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <Jake position={on(PLACE.server, 0.48, 0.35, 0.55)} rotationY={-0.1} animation="wave" face="grin" time={t} />
          <FloatingNumber text="SUBSCRIBE" color="#ffd84d" position={on(PLACE.server, 0, 2.65, 0.55)} height={0.62 * pop(t, 0.1)} />
        </>
      ),
    },
  ],
});
