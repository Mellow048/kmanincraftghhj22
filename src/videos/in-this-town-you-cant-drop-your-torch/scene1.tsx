import {
  Block,
  FloatingNumber,
  HandTorch,
  Player,
  ShadowCreature,
  Sign,
  cam,
  ease,
  pop,
  ramp,
  room,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 1 (Beats 1–2): Hook + Living Shadows Rule + Torch Sight Gags. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Never Drop Your Torch",
  shots: [
    {
      cue: "1.town",
      ...cam.twoShot({ a: [-1.4, 0, 1.6], b: [1.4, 0, 1.6], facing: 0, dist: 7.1, to: 5.8, side: 10, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-golden",
      note: "Hook: Every villager walks through town gripping a blazing wooden torch!",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Player who={2} position={[-1.4, 0, 0.8 + w * 1.1]} rotationY={0} animation="walk" animDistance={w * 1.1} face="calm" time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit />
            </Player>
            <Player who={4} position={[1.4, 0, 0.9 + w * 1.0]} rotationY={0} animation="walk" animDistance={w * 1.0} face="calm" time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit />
            </Player>
          </>
        );
      },
    },
    {
      cue: "1.dark",
      ...cam.push({ on: [0, 1.5, 0.8], dist: 7.5, to: 6.2, yaw: -12, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "At dusk, tall black ShadowCreatures with glowing purple eyes creep out of the trees!",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.1));
        return (
          <>
            <ShadowCreature position={[-1.6 + s * 0.6, 0, 0.4 + s * 0.8]} rotationY={0.2} t={t} />
            <ShadowCreature position={[1.6 - s * 0.6, 0, 0.5 + s * 0.8]} rotationY={-0.2} t={t} />
          </>
        );
      },
    },
    {
      cue: "1.light",
      ...cam.twoShot({ a: [-1.1, 0, 1.5], b: [1.2, 0, 1.5], facing: 0, dist: 6.7, to: 5.6, side: 12, pitch: 8, fov: 45 }),
      zone: "town",
      look: "overworld-night",
      note: "A townsfolk thrusts a bright torch forward pushing the ShadowCreature straight back!",
      stage: (t) => {
        const push = ease(ramp(t, 0.1, 0.9));
        return (
          <>
            <Player who={3} position={[-1.1, 0, 1.5]} rotationY={0.45} animation="point" face="brave" time={t}>
              <HandTorch position={[0, -0.04, 0.16]} lit scale={1.2} />
            </Player>
            <ShadowCreature position={[0.9 + push * 1.3, 0, 1.5]} rotationY={-0.4} t={t} />
          </>
        );
      },
    },
    {
      cue: "1.out",
      ...cam.front({ actor: [0, 0, 1.5], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Torch goes out — ShadowCreature looms behind the startled villager!",
      stage: (t) => {
        const outAt = Math.max(0.15, wordAt("1.out", "out") - 0.05);
        const dark = t >= outAt;
        return (
          <>
            <Player who={5} position={[0, 0, 1.6]} rotationY={0} animation={dark ? "cower" : "wave"} face={dark ? "fear" : "calm"} time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit={!dark} />
            </Player>
            {dark && <ShadowCreature position={[0.9, 0, 0.9]} rotationY={-0.3} t={t} />}
          </>
        );
      },
    },
    {
      cue: "1.sleep",
      ...cam.front({ actor: room(0, 0.2, 0.4), facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 10, fov: 44 }),
      zone: "room",
      note: "Visual sight gag: kid sleeps cozily in bed right beside a giant blazing torch!",
      stage: (t) => (
        <>
          <Block position={room(0, 0.3, 0.2)} size={[1.4, 0.5, 2.2]} color="#d94646" />
          <Player who={2} scale={0.75} position={room(0, 0.56, 0.2)} rotationY={0} animation="wave" face="smile" time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit />
          </Player>
        </>
      ),
    },
    {
      cue: "2.barber",
      ...cam.twoShot({ a: [-0.8, 0, 1.5], b: [0.8, 0, 1.5], facing: 0, dist: 6.3, to: 5.2, side: -12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Comedy beat: barber trims hair while gripping a blazing torch in his other hand.",
      stage: (t) => (
        <>
          <Player who={4} position={[-0.7, 0, 1.5]} rotationY={0.4} animation="press" face="grin" time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit />
          </Player>
          <Player who={3} position={[0.7, 0, 1.5]} rotationY={-0.3} animation="sit" headYaw={Math.sin(t * 2.5) * 0.18} face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.jog",
      ...cam.truck({ on: [0, 1.1, 1.5], dist: 6.7, yaw: 0, pitch: 8, by: [1.5, 0, 0], fov: 45 }),
      zone: "town",
      note: "Runners sprint laps holding blazing torches like glow sticks!",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Player who={2} position={[-1.8 + s * 2.8, 0, 1.5]} rotationY={Math.PI / 2} animation="run" animDistance={s * 2.8} face="grin" time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit />
            </Player>
            <Player who={5} position={[-0.4 + s * 2.6, 0, 1.9]} rotationY={Math.PI / 2} animation="run" animDistance={s * 2.6} face="smile" time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit />
            </Player>
          </>
        );
      },
    },
    {
      cue: "2.school",
      ...cam.twoShot({ a: room(-1.0, 0, 0.6), b: room(1.0, 0, 0.6), facing: 0, dist: 6.5, to: 5.4, side: 10, pitch: 9, fov: 44 }),
      zone: "room",
      note: "Classroom sight gag: every kid balances a lit torch on top of their wooden desk!",
      stage: (t) => (
        <>
          <Block position={room(-1.0, 0.45, 0.9)} size={[1.1, 0.85, 0.7]} color="#9c7042" />
          <HandTorch position={room(-1.0, 0.88, 0.9)} lit />
          <Player who={2} scale={0.78} position={room(-1.0, 0, 0.2)} rotationY={0} animation="wave" face="smile" time={t} />
          <Block position={room(1.0, 0.45, 0.9)} size={[1.1, 0.85, 0.7]} color="#9c7042" />
          <HandTorch position={room(1.0, 0.88, 0.9)} lit />
          <Player who={4} scale={0.78} position={room(1.0, 0, 0.2)} rotationY={0} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "2.mail",
      ...cam.front({ actor: [0, 0, 1.5], facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "The mailman sneezes his torch out on Tuesday looking shocked!",
      stage: (t) => {
        const sneezeAt = Math.max(0.18, wordAt("2.mail", "sneezed") - 0.05);
        const out = t >= sneezeAt;
        return (
          <Player who={3} position={[0, 0, 1.5]} rotationY={0} animation={out ? "cower" : "walk"} animDistance={0.3} face={out ? "surprised" : "smile"} time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit={!out} />
          </Player>
        );
      },
    },
    {
      cue: "2.fifth",
      ...cam.front({ actor: [0, 0.4, 1.4], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Punchline gag: 'MAILMAN #5' sign pops with a giant 5 FloatingNumber!",
      stage: (t) => (
        <>
          <Sign title="MAILMAN #5" subtitle="HIRING" width={1.4} position={[0, 0.9, 1.2]} />
          <FloatingNumber text="#5" color="#ff4f42" position={[0, 2.55, 1.2]} height={0.78 * pop(t, 0.1)} />
        </>
      ),
    },
  ],
});
