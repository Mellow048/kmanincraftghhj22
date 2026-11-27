import {
  Bits,
  ChiefFlint,
  FireflyJar,
  FireflySwarm,
  FloatingNumber,
  Glow,
  HandTorch,
  Hero,
  PipFirefly,
  Player,
  ShadowCreature,
  Sign,
  Smoke,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 3 (Beats 5–6): Windstorm Blows Out Every Torch + Kai's Living-Glow Twist + 50 Fireflies! */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Windstorm & Firefly Swarm",
  shots: [
    {
      cue: "5.wind",
      ...cam.push({ on: [0, 1.5, 1.2], dist: 7.7, to: 6.4, yaw: 10, pitch: 8, fov: 48 }),
      zone: "town",
      look: "overworld-storm",
      note: "A howling windstorm slams the village square as townsfolk brace against the blast.",
      stage: (t) => (
        <>
          <Player who={2} position={[-1.6, 0, 1.6]} rotationY={0.2} animation="cower" face="fear" time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit />
          </Player>
          <Player who={4} position={[1.6, 0, 1.6]} rotationY={-0.2} animation="cower" face="fear" time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit />
          </Player>
          <Hero position={[0, 0, 2.0]} rotationY={0} animation="cower" face="surprised" time={t}>
            <FireflyJar position={[0, -0.04, 0.14]} t={t} />
          </Hero>
        </>
      ),
    },
    {
      cue: "5.out2",
      ...cam.twoShot({ a: [-1.2, 0, 1.6], b: [1.2, 0, 1.6], facing: 0, dist: 6.7, to: 5.6, side: -12, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "WHOOSH! Every single wooden torch on the street blows out in unison!",
      stage: (t) => {
        const outAt = Math.max(0.15, wordAt("5.out2", "out") - 0.1);
        const out = t >= outAt;
        return (
          <>
            <Player who={2} position={[-1.2, 0, 1.6]} rotationY={0.2} animation={out ? "cower" : "wave"} face={out ? "fear" : "surprised"} time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit={!out} />
            </Player>
            <Player who={4} position={[1.2, 0, 1.6]} rotationY={-0.2} animation={out ? "cower" : "wave"} face={out ? "fear" : "surprised"} time={t}>
              <HandTorch position={[0, -0.04, 0.14]} lit={!out} />
            </Player>
            {out && <Smoke position={[0, 1.4, 1.6]} />}
          </>
        );
      },
    },
    {
      cue: "5.lock",
      ...cam.front({ actor: [1.2, 0, 1.0], facing: 0, dist: 6.5, to: 5.4, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "Chief Flint slams his iron door and jacks storm lanterns to 200 emeralds!",
      stage: (t) => (
        <>
          <ChiefFlint position={[1.2, 0, 1.0]} rotationY={0} animation="point" face="angry" time={t} />
          <Sign title="CLOSED!" subtitle="200 EMERALDS" width={1.45} position={[2.8, 1.0, 0.9]} rotationY={-0.25} />
          <FloatingNumber text="200!" color="#ff4f42" position={[1.2, 2.75, 1.0]} height={0.82 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "5.creep",
      ...cam.push({ on: [0, 1.4, 1.0], dist: 7.5, to: 6.2, yaw: -10, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Tall black ShadowCreatures creep straight onto the dark cobble square!",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.1));
        return (
          <>
            <ShadowCreature position={[-1.7 + s * 0.5, 0, 0.2 + s * 1.0]} rotationY={0.25} t={t} />
            <ShadowCreature position={[0, 0, -0.2 + s * 1.1]} rotationY={0} t={t} />
            <ShadowCreature position={[1.7 - s * 0.5, 0, 0.2 + s * 1.0]} rotationY={-0.25} t={t} />
          </>
        );
      },
    },
    {
      cue: "5.trap",
      ...cam.twoShot({ a: [-1.2, 0, 1.6], b: [1.2, 0, 1.6], facing: 0, dist: 6.7, to: 5.6, side: 10, pitch: 8, fov: 45 }),
      zone: "town",
      look: "overworld-night",
      note: "Neighbors back up waving cold dead sticks in panic.",
      stage: (t) => (
        <>
          <Player who={2} position={[-1.2, 0, 1.6]} rotationY={0.2} animation="cower" face="fear" time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit={false} />
          </Player>
          <Player who={5} position={[1.2, 0, 1.6]} rotationY={-0.2} animation="cower" face="fear" time={t}>
            <HandTorch position={[0, -0.04, 0.14]} lit={false} />
          </Player>
        </>
      ),
    },
    {
      cue: "5.broke",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Villager shrugs with empty pockets — nobody can afford 200 emeralds.",
      stage: (t) => (
        <>
          <Player who={3} position={[0, 0, 1.6]} rotationY={0} animation="shrug" face="sad" time={t} />
          <FloatingNumber text="0 EMERALDS" color="#ff6b57" position={[0, 2.6, 1.6]} height={0.62 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "6.rule",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 7, fov: 42 }),
      zone: "town",
      look: "overworld-golden",
      note: "Hero twist! Golden lightbulb moment as Kai grins and points up.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.6]} rotationY={0} animation="point" face="grin" time={t}>
            <FireflyJar position={[0, -0.04, 0.16]} t={t} />
          </Hero>
          <Glow position={[0, 2.35, 1.6]} size={1.6} color="#ffe066" opacity={0.45 * pop(t, 0.1)} />
          <FloatingNumber text="!" color="#ffd84d" position={[0, 2.45, 1.6]} height={0.85 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "6.fire",
      ...cam.front({ actor: [0, 0.8, 1.6], facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 8, fov: 42 }),
      zone: "town",
      look: "overworld-storm",
      note: "Close-up of a wooden torch flame blowing out immediately in the wind.",
      stage: (t) => {
        const outAt = Math.max(0.2, wordAt("6.fire", "fire") - 0.05);
        return (
          <>
            <HandTorch position={[0, 0.4, 1.6]} scale={2.2} lit={t < outAt} />
            <FloatingNumber text="BLOWN OUT" color="#ff6b57" position={[0, 2.0, 1.6]} height={0.58 * pop(t, outAt)} />
          </>
        );
      },
    },
    {
      cue: "6.bug",
      ...cam.front({ actor: [0, 0.9, 1.6], facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 8, fov: 42 }),
      zone: "town",
      look: "overworld-golden",
      note: "Close-up of Pip's FireflyJar glowing steady and bright — wind can't blow out living glow!",
      stage: (t) => (
        <>
          <FireflyJar position={[0, 0.45, 1.6]} scale={2.2} t={t} />
          <FloatingNumber text="LIVING GLOW!" color="#ffe066" position={[0, 2.05, 1.6]} height={0.62 * pop(t, 0.12)} />
        </>
      ),
    },
    {
      cue: "6.open",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 6.2, to: 5.0, side: -12, pitch: 7, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Kai pops Pip's jar lid open and holds it high above his head!",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.6]} rotationY={0} animation="reachUp" face="grin" time={t}>
            <FireflyJar position={[0, -0.04, 0.16]} empty={t > 0.35} t={t} />
          </Hero>
          {t > 0.35 && <PipFirefly position={[0, 2.1 + (t - 0.35) * 1.4, 1.6]} scale={1.1} t={t} />}
        </>
      ),
    },
    {
      cue: "6.fly",
      ...cam.push({ on: [0, 2.8, 1.6], dist: 7.1, to: 5.8, yaw: 12, pitch: -8, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Pip shoots straight upward like a bright golden star lighting the night sky!",
      stage: (t) => {
        const rise = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Hero position={[0, 0, 1.6]} rotationY={0} animation="cheer" face="grin" time={t} />
            <PipFirefly position={[0, 1.8 + rise * 2.4, 1.6]} scale={1.35} t={t} />
            <Bits position={[0, 2.2 + rise * 2.0, 1.6]} count={14} color="#ffe066" t={t} />
          </>
        );
      },
    },
    {
      cue: "6.call",
      ...cam.front({ actor: [0, 2.8, 1.4], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: -6, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Pip blinks brightly three times toward the dark pine woods!",
      stage: (t) => {
        const pulse = Math.abs(Math.sin(t * 9)) * 0.65;
        return (
          <>
            <PipFirefly position={[0, 2.8, 1.4]} scale={1.3 + pulse * 0.4} t={t} />
            <Glow position={[0, 2.8, 1.4]} size={2.2 + pulse * 1.4} color="#fff066" opacity={0.45 + pulse * 0.3} />
          </>
        );
      },
    },
    {
      cue: "6.swarm",
      ...cam.push({ on: [0, 2.0, 1.4], dist: 7.9, to: 6.4, yaw: 10, pitch: 6, fov: 48 }),
      zone: "town",
      look: "overworld-golden",
      note: "Fifty glowing golden fireflies burst into the square flooding everything with warm light!",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.8]} rotationY={0} animation="cheer" face="grin" time={t} />
          <Player who={2} position={[-1.6, 0, 1.7]} rotationY={0.2} animation="cheer" face="grin" time={t} />
          <Player who={4} position={[1.6, 0, 1.7]} rotationY={-0.2} animation="cheer" face="grin" time={t} />
          <FireflySwarm position={[0, 2.2, 1.2]} count={20} t={t} />
          <FloatingNumber text="50 FIREFLIES!" color="#ffe066" position={[0, 3.3, 1.2]} height={0.68 * pop(t, 0.1)} />
        </>
      ),
    },
  ],
});
