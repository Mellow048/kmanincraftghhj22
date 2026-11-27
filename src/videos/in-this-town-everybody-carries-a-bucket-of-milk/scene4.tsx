import {
  BabyCow,
  BaronCream,
  Bits,
  Block,
  Dad,
  FloatingNumber,
  Glow,
  Hero,
  MilkBucket,
  Player,
  Sign,
  Smoke,
  SubscribeSign,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 4 (Beat 7): Instant Karma for Baron Cream + 48 Rescued + Dad Returns + CTA. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Karma, Rescue & Dad Home",
  shots: [
    {
      cue: "7.karma",
      ...cam.front({ actor: [0.4, 0, 1.4], facing: 0, dist: 4.8, to: 4.0, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Baron Cream marches furiously out into the square yelling that cow milk doesn't count.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.85));
        return (
          <BaronCream
            position={[1.4 - w * 1.0, 0, 1.4]}
            rotationY={w < 0.96 ? -Math.PI / 2 : -0.25}
            animation={w < 0.96 ? "walk" : "point"}
            animDistance={w * 1.0}
            face="angry"
            time={t}
          />
        );
      },
    },
    {
      cue: "7.splash2",
      ...cam.front({ actor: [0.4, 0.4, 1.4], facing: 0, dist: 4.8, to: 4.0, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "A stray purple potion arcs down and splashes right on Baron Cream's shiny boots!",
      stage: (t) => {
        const hitAt = Math.max(0.18, wordAt("7.splash2", "hit") - 0.05);
        const fall = ease(ramp(t, 0, hitAt));
        const hit = t >= hitAt;
        return (
          <>
            <BaronCream position={[0.4, 0, 1.4]} rotationY={0} animation={hit ? "cower" : "point"} face={hit ? "surprised" : "angry"} time={t} />
            {!hit && (
              <Block
                position={[0.4, 3.0 - fall * 2.8, 1.5]}
                size={[0.22, 0.28, 0.22]}
                color="#b84cff"
                emissive="#b84cff"
                emissiveIntensity={0.85}
              />
            )}
            {hit && (
              <>
                <Glow position={[0.4, 0.4, 1.4]} size={2.2} color="#b84cff" opacity={0.55} />
                <Bits position={[0.4, 0.45, 1.4]} count={18} color="#c266ff" t={t - hitAt} />
                <Smoke position={[0.4, 0.5, 1.4]} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "7.refuse",
      ...cam.push({ on: [0.2, 2.2, 1.4], dist: 6.0, to: 5.2, yaw: 12, pitch: -8, fov: 46 }),
      zone: "town",
      note: "Baron Cream crosses his arms, refuses to touch Moo, and floats helplessly up into the sky.",
      stage: (t) => {
        const rise = ease(ramp(t, 0.1, 1.6));
        return (
          <>
            <BaronCream position={[0.6, 0.4 + rise * 4.5, 1.4]} rotationY={0} animation="fall" face="angry" time={t} />
            <Hero position={[-1.0, 0, 1.6]} rotationY={0.35} animation="shrug" face="smug" time={t} />
            <BabyCow position={[-1.8, 0, 1.6]} rotationY={0.3} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.rescue",
      ...cam.push({ on: [0, 2.0, 1.4], dist: 6.4, to: 5.4, yaw: -10, pitch: 6, fov: 48 }),
      zone: "town",
      note: "Townsfolk cast 48 gleaming MilkBuckets upward on thin white fishing lines!",
      stage: (t) => {
        const cast = ease(ramp(t, 0.1, 1.1));
        return (
          <>
            <Hero position={[-1.4, 0, 1.6]} rotationY={0.2} animation="reachUp" face="grin" time={t} />
            <Player who={2} position={[0, 0, 1.6]} rotationY={0} animation="reachUp" face="grin" time={t} />
            <Player who={4} position={[1.4, 0, 1.6]} rotationY={-0.2} animation="reachUp" face="grin" time={t} />
            {[-1.4, 0, 1.4].map((x, i) => (
              <group key={i}>
                <Block position={[x, 1.5 + cast * 1.4, 1.6]} size={[0.03, 1.2 + cast * 2.8, 0.03]} color="#f5f5f5" castShadow={false} />
                <MilkBucket position={[x, 2.0 + cast * 2.8, 1.6]} scale={1.05} />
              </group>
            ))}
            <FloatingNumber text="48!" color="#4be08a" position={[0, 3.2, 1.6]} height={0.7 * (1.2 * pop(t, 0.12))} />
          </>
        );
      },
    },
    {
      cue: "7.return",
      ...cam.push({ on: [0, 1.6, 1.6], dist: 6.6, to: 5.6, yaw: 10, pitch: 8, fov: 48 }),
      zone: "town",
      note: "All 48 townsfolk drink their milk and float safely back down to the square, cheering!",
      stage: (t) => {
        const drop = ease(ramp(t, 0, 1.1));
        const y = Math.max(0, 3.2 * (1 - drop));
        const landed = y <= 0.05;
        return (
          <>
            <Player who={2} position={[-1.8, y, 1.6]} rotationY={0.2} animation={landed ? "cheer" : "fall"} face="grin" time={t} />
            <Player who={3} position={[0, y * 1.15, 1.4]} rotationY={0} animation={landed ? "cheer" : "fall"} face="grin" time={t} />
            <Player who={5} position={[1.8, y * 0.9, 1.6]} rotationY={-0.2} animation={landed ? "cheer" : "fall"} face="grin" time={t} />
            {landed && <Bits position={[0, 0.6, 1.6]} count={18} color="#ffe066" t={t - 1.0} />}
          </>
        );
      },
    },
    {
      cue: "7.dadback",
      ...cam.front({ actor: [0, 1.2, 1.6], facing: 0, dist: 5.0, to: 4.2, side: -14, pitch: 6, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Emotional climax: Toby's Dad gently touches down on the cobbles smiling warmly.",
      stage: (t) => {
        const drop = ease(ramp(t, 0, 1.0));
        const y = Math.max(0, 2.8 * (1 - drop));
        return (
          <>
            <Dad position={[0, y, 1.6]} rotationY={0} animation={y > 0.05 ? "fall" : "wave"} face="grin" time={t} />
            <Glow position={[0, y + 1.0, 1.6]} size={2.2} color="#ffe8a3" opacity={0.32} />
          </>
        );
      },
    },
    {
      cue: "7.hug",
      ...cam.twoShot({ a: [-0.6, 0, 1.6], b: [0.7, 0, 1.6], facing: 0, dist: 4.6, to: 3.8, side: 12, pitch: 8, fov: 42 }),
      zone: "town",
      look: "overworld-golden",
      note: "Heartwarming reunion: Dad and Toby cheer together right beside Moo in the golden square.",
      stage: (t) => (
        <>
          <Dad position={[-0.65, 0, 1.6]} rotationY={0.35} animation="cheer" face="grin" time={t} />
          <Hero position={[0.45, 0, 1.6]} rotationY={-0.35} animation="cheer" face="grin" time={t} />
          <BabyCow position={[1.45, 0, 1.65]} rotationY={-0.3} t={t} />
          <Bits position={[0, 1.6, 1.6]} count={14} color="#ff7a8a" t={t} />
        </>
      ),
    },
    {
      cue: "7.closed",
      ...cam.push({ on: [1.2, 1.2, 0.8], dist: 5.4, to: 4.6, yaw: -12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Baron Cream's milk shop sits empty with a crooked OUT OF BUSINESS sign.",
      stage: (t) => (
        <>
          <Sign title="OUT OF BUSINESS" position={[1.2, 1.0, 0.9]} rotationY={-0.15} />
          <MilkBucket position={[0.3, 0.04, 1.4]} scale={1.0} empty />
          <MilkBucket position={[2.1, 0.04, 1.4]} scale={1.0} empty />
          <Smoke position={[1.2, 1.2, 0.8]} />
        </>
      ),
    },
    {
      cue: "7.cows",
      ...cam.push({ on: [0, 1.2, 1.6], dist: 6.2, to: 5.2, yaw: 10, pitch: 9, fov: 46 }),
      zone: "town",
      note: "Happy town square where everyone walks with friendly baby cows instead of paying 100 emeralds.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        const anim = w > 0.02 && w < 0.98 ? "walk" : "cheer";
        return (
          <>
            <Player who={2} position={[-1.8, 0, 1.1 + w * 0.9]} rotationY={0} animation={anim} animDistance={w * 0.9} face="grin" time={t} />
            <BabyCow position={[-0.9, 0, 1.2 + w * 0.9]} rotationY={0} scale={0.68} t={t} />
            <Player who={4} position={[1.1, 0, 1.1 + w * 0.9]} rotationY={0} animation={anim} animDistance={w * 0.9} face="grin" time={t} />
            <BabyCow position={[2.0, 0, 1.2 + w * 0.9]} rotationY={0} scale={0.68} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.cta",
      ...cam.twoShot({ a: [-0.7, 0, 1.6], b: [1.1, 0, 1.6], facing: 0, dist: 5.0, to: 4.2, side: -10, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Final CTA: Toby and Moo wave warmly beside a glowing SubscribeSign!",
      stage: (t) => (
        <>
          <Hero position={[-1.0, 0, 1.6]} rotationY={0.15} animation="wave" face="grin" time={t} />
          <BabyCow position={[0.05, 0, 1.65]} rotationY={0.1} scale={0.78} t={t} />
          <SubscribeSign position={[1.55, 0, 1.5]} rotationY={-0.25} />
        </>
      ),
    },
  ],
});
