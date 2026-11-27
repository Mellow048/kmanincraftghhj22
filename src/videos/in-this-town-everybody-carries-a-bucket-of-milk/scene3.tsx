import {
  BabyCow,
  BaronCream,
  Bits,
  Block,
  FloatingNumber,
  Glow,
  Hero,
  MilkBucket,
  Player,
  Sign,
  Smoke,
  Witch,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 3 (Beats 5–6): The Purple Storm + Witch Attack + Toby's Infinite-Milk Twist. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Storm & Infinite Milk",
  shots: [
    {
      cue: "5.storm",
      ...cam.push({ on: [0, 2.2, 1.2], dist: 6.4, to: 5.2, yaw: 0, pitch: 8, fov: 48 }),
      zone: "town",
      look: "overworld-storm",
      note: "The sky turns purple over the square as townsfolk look up in panic.",
      stage: (t) => (
        <>
          <Glow position={[0, 5.2, 0]} size={5.0} color="#a84cff" opacity={0.42} />
          <Player who={2} position={[-1.6, 0, 1.6]} rotationY={0.2} animation="cower" face="fear" time={t} />
          <Player who={4} position={[1.6, 0, 1.6]} rotationY={-0.2} animation="cower" face="fear" time={t} />
          <Hero position={[0, 0, 2.0]} rotationY={0} animation="reachUp" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "5.witch",
      ...cam.push({ on: [0, 3.8, 0.4], dist: 5.8, to: 4.5, yaw: -12, pitch: -8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "Hovering Witch sweeps in above the square holding glowing purple splash potions.",
      stage: (t) => {
        const swoop = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Witch position={[-1.8 + swoop * 1.8, 3.4, 0.4]} rotationY={0.2} t={t} />
            <Bits position={[0, 3.6, 0.4]} count={14} color="#c266ff" t={t} />
          </>
        );
      },
    },
    {
      cue: "5.lock",
      ...cam.front({ actor: [1.2, 0, 1.0], facing: 0, dist: 5.0, to: 4.2, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "Baron Cream slams his shop shut and jacks the price to 200.",
      stage: (t) => (
        <>
          <BaronCream position={[1.2, 0, 1.0]} rotationY={0} animation="point" face="angry" time={t} />
          <Sign title="CLOSED — 200!" position={[2.8, 1.0, 0.9]} rotationY={-0.25} />
          <FloatingNumber text="200!" color="#ff4f42" position={[1.2, 2.75, 1.0]} height={0.7 * (1.15 * pop(t, 0.12))} />
        </>
      ),
    },
    {
      cue: "5.hit",
      ...cam.front({ actor: [-0.4, 0.4, 1.5], facing: 0, dist: 4.8, to: 4.0, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "A purple splash potion arcs down and smashes beside the neighbor's boots.",
      stage: (t) => {
        const impactAt = Math.max(0.18, wordAt("5.hit", "smashed") - 0.05);
        const fall = ease(ramp(t, 0, impactAt));
        const hit = t >= impactAt;
        return (
          <>
            <Player who={3} position={[-0.4, 0, 1.5]} rotationY={0} animation={hit ? "cower" : "wave"} face="surprised" time={t} />
            {!hit && (
              <Block
                position={[-0.1, 3.2 - fall * 3.0, 1.5]}
                size={[0.22, 0.28, 0.22]}
                color="#b84cff"
                emissive="#b84cff"
                emissiveIntensity={0.85}
              />
            )}
            {hit && (
              <>
                <Glow position={[-0.4, 0.35, 1.5]} size={2.2} color="#b84cff" opacity={0.55} />
                <Bits position={[-0.4, 0.4, 1.5]} count={18} color="#c266ff" t={t - impactAt} />
                <Smoke position={[-0.4, 0.5, 1.5]} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "5.rise",
      ...cam.push({ on: [-0.4, 2.6, 1.5], dist: 6.2, to: 5.4, yaw: 12, pitch: -10, fov: 48 }),
      zone: "town",
      look: "overworld-storm",
      note: "Neighbor floats straight upward past 5, 10, 15 block markers!",
      stage: (t) => {
        const rise = ease(ramp(t, 0, 1.8));
        const t5 = wordAt("5.rise", "Five");
        const t10 = wordAt("5.rise", "Ten");
        const t15 = wordAt("5.rise", "Fifteen");
        return (
          <>
            <Player who={3} position={[-0.4, 0.5 + rise * 4.2, 1.5]} rotationY={0} animation="fall" face="fear" time={t} />
            <Glow position={[-0.4, 0.9 + rise * 4.2, 1.5]} size={1.8} color="#b84cff" opacity={0.35} />
            {t >= t5 && <FloatingNumber text="5" color="#d48cff" position={[1.2, 1.6, 1.5]} height={0.7 * (pop(t, t5))} />}
            {t >= t10 && <FloatingNumber text="10" color="#ff9944" position={[1.2, 3.0, 1.5]} height={0.7 * (pop(t, t10))} />}
            {t >= t15 && <FloatingNumber text="15!" color="#ff4f42" position={[1.2, 4.4, 1.5]} height={0.7 * (1.15 * pop(t, t15))} />}
          </>
        );
      },
    },
    {
      cue: "5.empty",
      ...cam.twoShot({ a: [-1.2, 0, 1.6], b: [1.2, 0, 1.6], facing: 0, dist: 5.2, to: 4.4, side: 10, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "Townsfolk hold upside-down empty buckets in despair.",
      stage: (t) => (
        <>
          <Player who={2} position={[-1.2, 0, 1.6]} rotationY={0.25} animation="shrug" face="sad" time={t}>
            <MilkBucket position={[0, -0.05, 0.14]} scale={0.95} empty />
          </Player>
          <Player who={5} position={[1.2, 0, 1.6]} rotationY={-0.25} animation="cower" face="sad" time={t}>
            <MilkBucket position={[0, -0.05, 0.14]} scale={0.95} empty />
          </Player>
        </>
      ),
    },
    {
      cue: "6.rule",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 4.4, to: 3.6, side: -14, pitch: 7, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "Hero twist! Golden lightbulb moment as Toby grins and points up.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.6]} rotationY={0} animation="point" face="grin" time={t} />
          <Glow position={[0, 2.35, 1.6]} size={1.6} color="#ffe066" opacity={0.45 * pop(t, 0.1)} />
          <FloatingNumber text="!" color="#ffd84d" position={[0, 2.45, 1.6]} height={0.7 * (1.2 * pop(t, 0.1))} />
        </>
      ),
    },
    {
      cue: "6.once",
      ...cam.front({ actor: [0, 0.8, 1.6], facing: 0, dist: 4.4, to: 3.7, side: 14, pitch: 8, fov: 42 }),
      zone: "town",
      note: "A single milk bucket drains empty with a bold 1x tag.",
      stage: (t) => {
        const flipAt = Math.max(0.25, wordAt("6.once", "single") - 0.05);
        return (
          <>
            <MilkBucket position={[0, 0.4, 1.6]} scale={2.0} empty={t >= flipAt} />
            <FloatingNumber text="1x ONLY" color="#ff6b57" position={[0, 1.85, 1.6]} height={0.7 * (pop(t, 0.1))} />
          </>
        );
      },
    },
    {
      cue: "6.infinite",
      ...cam.twoShot({ a: [-0.7, 0, 1.6], b: [0.8, 0, 1.6], facing: 0, dist: 4.8, to: 4.0, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Toby cheers beside Moo as a glowing golden INFINITE label pops above Moo!",
      stage: (t) => (
        <>
          <Hero position={[-0.8, 0, 1.6]} rotationY={0.35} animation="cheer" face="grin" time={t} />
          <BabyCow position={[0.7, 0, 1.6]} rotationY={-0.15} scale={0.82} t={t} />
          <Glow position={[0.7, 1.3, 1.6]} size={2.2} color="#fff2a6" opacity={0.35} />
          <FloatingNumber text="INFINITE!" color="#4be08a" position={[0.7, 2.1, 1.6]} height={0.7 * (1.15 * pop(t, 0.12))} />
        </>
      ),
    },
    {
      cue: "6.grab",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 4.6, to: 3.8, side: 12, pitch: 7, fov: 44 }),
      zone: "town",
      note: "Toby waves both arms yelling for everyone's empty buckets as buckets fly in!",
      stage: (t) => {
        const fly = ease(ramp(t, 0.15, 0.95));
        return (
          <>
            <Hero position={[0, 0, 1.6]} rotationY={0} animation="wave" face="grin" time={t} />
            <MilkBucket position={[-2.4 + fly * 1.6, 1.2 + Math.sin(fly * Math.PI) * 0.8, 1.6]} scale={1.0} empty />
            <MilkBucket position={[2.4 - fly * 1.6, 1.1 + Math.sin(fly * Math.PI) * 0.9, 1.6]} scale={1.0} empty />
          </>
        );
      },
    },
    {
      cue: "6.milk",
      ...cam.twoShot({ a: [-0.7, 0, 1.6], b: [0.8, 0, 1.6], facing: 0, dist: 4.8, to: 4.0, side: -12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Toby milks Moo rapidly as full white milk buckets stack up 1..10!",
      stage: (t) => {
        const count = Math.min(10, Math.max(1, Math.floor(t * 7) + 1));
        return (
          <>
            <Hero position={[-0.8, 0, 1.6]} rotationY={0.45} animation="press" face="grin" time={t}>
              <MilkBucket position={[0, -0.05, 0.14]} scale={0.95} />
            </Hero>
            <BabyCow position={[0.5, 0, 1.6]} rotationY={-0.3} t={t} />
            <MilkBucket position={[-1.7, 0.04, 1.8]} scale={1.0} />
            <MilkBucket position={[-1.3, 0.04, 2.1]} scale={1.0} />
            <MilkBucket position={[-1.5, 0.34, 1.95]} scale={1.0} />
            <FloatingNumber text={`x${count}`} color="#ffffff" position={[0, 2.35, 1.6]} height={0.7 * (1.15 * pop(t, 0.05))} />
          </>
        );
      },
    },
    {
      cue: "6.chain",
      ...cam.push({ on: [0, 1.8, 1.6], dist: 6.2, to: 5.2, yaw: 10, pitch: 6, fov: 46 }),
      zone: "town",
      note: "Whole street tosses glowing full MilkBuckets straight up into the sky!",
      stage: (t) => {
        const toss = ease(ramp(t, 0.08, 1.1));
        return (
          <>
            <Hero position={[-1.5, 0, 1.6]} rotationY={0.2} animation="cheer" face="grin" time={t} />
            <Player who={2} position={[0, 0, 1.6]} rotationY={0} animation="reachUp" face="grin" time={t} />
            <Player who={4} position={[1.5, 0, 1.6]} rotationY={-0.2} animation="cheer" face="grin" time={t} />
            <MilkBucket position={[-1.2, 1.4 + toss * 3.8, 1.6]} scale={1.15} />
            <MilkBucket position={[0, 1.6 + toss * 4.2, 1.6]} scale={1.15} />
            <MilkBucket position={[1.2, 1.3 + toss * 3.6, 1.6]} scale={1.15} />
          </>
        );
      },
    },
    {
      cue: "6.catch",
      ...cam.front({ actor: [0, 1.2, 1.6], facing: 0, dist: 5.4, to: 4.4, side: -14, pitch: 6, fov: 46 }),
      zone: "town",
      note: "Neighbor catches a milk bucket midair, drinks it, and lands safely on the cobbles!",
      stage: (t) => {
        const landAt = Math.max(0.25, wordAt("6.catch", "landed") - 0.15);
        const drop = ease(ramp(t, 0.15, landAt + 0.35));
        const y = Math.max(0, 3.6 * (1 - drop));
        const landed = y <= 0.05;
        return (
          <>
            <Player
              who={3}
              position={[0, y, 1.6]}
              rotationY={0}
              animation={landed ? "cheer" : "fall"}
              face={landed ? "grin" : "surprised"}
              time={t}
            >
              <MilkBucket position={[0, -0.05, 0.14]} scale={0.95} empty={landed} />
            </Player>
            {landed && <Bits position={[0, 0.4, 1.6]} count={16} color="#ffffff" t={t - landAt} />}
          </>
        );
      },
    },
  ],
});
