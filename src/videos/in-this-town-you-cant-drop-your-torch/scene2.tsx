import {
  ChiefFlint,
  CoalMountain,
  FireflyJar,
  FloatingNumber,
  HandTorch,
  Hero,
  Mom,
  Player,
  ShadowCreature,
  Sign,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 2 (Beats 3–4): Meet Kai & Pip + Chief Flint Coal Villain + 30 Missing + Mom Lost. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Kai, Pip & Chief Flint",
  shots: [
    {
      cue: "3.kai",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 6.2, to: 5.0, side: 14, pitch: 7, fov: 44 }),
      zone: "town",
      note: "Meet Kai waving cheerfully with empty hands instead of a wooden torch.",
      stage: (t) => <Hero position={[0, 0, 1.6]} rotationY={0} animation="wave" face="grin" time={t} />,
    },
    {
      cue: "3.pip",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 7, fov: 42 }),
      zone: "town",
      look: "overworld-golden",
      note: "Kai holds up his glowing glass FireflyJar with golden firefly Pip inside!",
      stage: (t) => (
        <Hero position={[0, 0, 1.6]} rotationY={0} animation="cheer" face="grin" time={t}>
          <FireflyJar position={[0, -0.04, 0.16]} scale={1.15} t={t} />
        </Hero>
      ),
    },
    {
      cue: "3.laugh",
      ...cam.twoShot({ a: [-1.2, 0, 1.6], b: [1.2, 0, 1.6], facing: 0, dist: 6.7, to: 5.6, side: 10, pitch: 8, fov: 45 }),
      zone: "town",
      note: "Kids point and laugh calling Kai 'bug boy' while he holds Pip's jar close.",
      stage: (t) => (
        <>
          <Player who={2} scale={0.8} position={[-1.3, 0, 1.6]} rotationY={0.45} animation="laugh" face="smug" time={t} />
          <Player who={4} scale={0.8} position={[-0.3, 0, 1.4]} rotationY={0.35} animation="point" face="grin" time={t} />
          <Hero position={[1.2, 0, 1.6]} rotationY={-0.3} animation="shrug" face="frown" time={t}>
            <FireflyJar position={[0, -0.04, 0.14]} t={t} />
          </Hero>
        </>
      ),
    },
    {
      cue: "3.flint",
      ...cam.front({ actor: [1.8, 0, 0.8], facing: 0, dist: 6.5, to: 5.4, side: -16, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Villain intro: Chief Flint laughs smugly outside his COAL SHOP sign.",
      stage: (t) => (
        <>
          <ChiefFlint position={[1.8, 0, 0.8]} rotationY={0} animation="laugh" face="smug" time={t} />
          <Sign title="COAL SHOP" subtitle="FLINT" width={1.45} position={[3.3, 1.0, 0.6]} rotationY={-0.25} />
        </>
      ),
    },
    {
      cue: "3.quote",
      ...cam.twoShot({ a: [0.9, 0, 1.4], b: [-0.9, 0, 1.4], facing: 0, dist: 6.5, to: 5.4, side: 12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Chief Flint points mockingly down at Kai's tiny firefly jar.",
      stage: (t) => (
        <>
          <ChiefFlint position={[0.9, 0, 1.4]} rotationY={-0.45} animation="point" face="smug" time={t} />
          <Hero position={[-0.9, 0, 1.4]} rotationY={0.45} animation="cower" face="uneasy" time={t}>
            <FireflyJar position={[0, -0.04, 0.14]} t={t} />
          </Hero>
        </>
      ),
    },
    {
      cue: "3.gone",
      ...cam.front({ actor: [0.9, 0, 1.4], facing: 0, dist: 6.2, to: 5.0, side: -14, pitch: 7, fov: 42 }),
      zone: "town",
      note: "Chief Flint waves a blazing torch chuckling that one gust makes Kai shadow food.",
      stage: (t) => (
        <ChiefFlint position={[0.9, 0, 1.4]} rotationY={0} animation="laugh" face="smug" time={t}>
          <HandTorch position={[0, -0.04, 0.16]} lit />
        </ChiefFlint>
      ),
    },
    {
      cue: "4.mine",
      ...cam.push({ on: [1.0, 1.3, 0.8], dist: 7.3, to: 6.0, yaw: 12, pitch: 9, fov: 46 }),
      zone: "town",
      note: "Chief Flint proudly shows off his coal shop lined with blazing torches.",
      stage: (t) => (
        <>
          <ChiefFlint position={[1.0, 0, 0.8]} rotationY={0} animation="wave" face="smug" time={t} />
          <HandTorch position={[-0.2, 0.2, 1.4]} lit scale={1.3} />
          <HandTorch position={[2.2, 0.2, 1.4]} lit scale={1.3} />
          <Sign title="COAL MINE" width={1.45} position={[2.8, 1.0, 0.8]} rotationY={-0.2} />
        </>
      ),
    },
    {
      cue: "4.ten",
      ...cam.front({ actor: [0, 0, 1.4], facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Green 10 FloatingNumber pops over Chief Flint on a clear calm night.",
      stage: (t) => (
        <>
          <ChiefFlint position={[0, 0, 1.4]} rotationY={0} animation="point" face="smile" time={t} />
          <FloatingNumber text="10" color="#4be08a" position={[0, 2.75, 1.4]} height={0.75 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.hundred",
      ...cam.front({ actor: [0, 0, 1.4], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "Price spikes to bright coral-red 100! when the wind blows.",
      stage: (t) => (
        <>
          <ChiefFlint position={[0, 0, 1.4]} rotationY={0} animation="laugh" face="smug" time={t} />
          <FloatingNumber text="100!" color="#ff4f42" position={[0, 2.75, 1.4]} height={0.82 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.pile",
      ...cam.front({ actor: [0, 0.9, 0.8], facing: 0, dist: 6.7, to: 5.5, side: 16, pitch: 9, fov: 44 }),
      zone: "town",
      note: "Chief Flint sits smugly atop his giant CoalMountain counting profits.",
      stage: (t) => (
        <>
          <CoalMountain position={[0, 0, 0.8]} />
          <ChiefFlint position={[0, 1.05, 0.8]} rotationY={0} animation="sit" headYaw={Math.sin(t * 2.5) * 0.2} face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "4.thirty",
      ...cam.push({ on: [0, 1.6, 1.0], dist: 7.9, to: 6.6, yaw: 0, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-night",
      note: "Dramatic red 30 hovers over the dark street as ShadowCreatures lead townsfolk away.",
      stage: (t) => (
        <>
          <FloatingNumber text="30" color="#ff4f42" position={[0, 2.75, 1.0]} height={0.88 * pop(t, 0.1)} />
          <ShadowCreature position={[-1.8, 0, 0.8]} rotationY={0.2} t={t} />
          <ShadowCreature position={[1.8, 0, 0.8]} rotationY={-0.2} t={t} />
          <Player who={3} position={[0, 0, 1.5]} rotationY={0} animation="cower" face="fear" time={t} />
        </>
      ),
    },
    {
      cue: "4.mom",
      ...cam.twoShot({ a: [-0.8, 0, 1.5], b: [0.8, 0, 1.5], facing: 0, dist: 6.3, to: 5.2, side: 12, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Emotional beat: Mom hands Pip's glowing jar to Kai before stepping back into the dark woods.",
      stage: (t) => {
        const leave = ease(ramp(t, Math.max(0.2, wordAt("4.mom", "Pip") - 0.1), 1.0));
        return (
          <>
            <Hero position={[-0.8, 0, 1.5]} rotationY={0.4} animation="reachUp" face="sad" time={t}>
              <FireflyJar position={[0, -0.04, 0.16]} t={t} />
            </Hero>
            <Mom position={[0.8 + leave * 1.6, 0, 1.5 - leave * 1.2]} rotationY={-0.35} animation={leave > 0.1 ? "walk" : "wave"} animDistance={leave * 2.0} face="sad" time={t} />
          </>
        );
      },
    },
  ],
});
