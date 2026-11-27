import {
  Bits,
  Block,
  ChiefFlint,
  FireflySwarm,
  FloatingNumber,
  HandTorch,
  Hero,
  Mom,
  PipFirefly,
  Player,
  ShadowCreature,
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

/** Scene 4 (Beat 7): Instant Karma for Chief Flint + 30 Rescued + Mom Home + CTA. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Karma, Rescue & Mom Home",
  shots: [
    {
      cue: "7.flint2",
      ...cam.front({ actor: [0.4, 0, 1.4], facing: 0, dist: 6.3, to: 5.2, side: 14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Chief Flint marches out furiously yelling that bugs aren't legal light!",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.85));
        return (
          <ChiefFlint position={[1.4 - w * 1.0, 0, 1.4]} rotationY={-0.3} animation="walk" animDistance={w * 1.0} face="angry" time={t}>
            <HandTorch position={[0, -0.04, 0.16]} lit />
          </ChiefFlint>
        );
      },
    },
    {
      cue: "7.gust",
      ...cam.front({ actor: [0.4, 0, 1.4], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-storm",
      note: "One strong gust blows Chief Flint's fancy lantern straight out!",
      stage: (t) => {
        const outAt = Math.max(0.18, wordAt("7.gust", "out") - 0.1);
        const out = t >= outAt;
        return (
          <>
            <ChiefFlint position={[0.4, 0, 1.4]} rotationY={0} animation={out ? "cower" : "point"} face={out ? "surprised" : "angry"} time={t}>
              <HandTorch position={[0, -0.04, 0.16]} lit={!out} />
            </ChiefFlint>
            {out && <Smoke position={[0.4, 1.4, 1.5]} />}
          </>
        );
      },
    },
    {
      cue: "7.mud",
      ...cam.twoShot({ a: [-0.8, 0, 1.6], b: [0.9, 0, 1.5], facing: 0, dist: 6.7, to: 5.6, side: 12, pitch: 10, fov: 45 }),
      zone: "town",
      note: "Instant karma: Chief Flint tumbles backward into a brown mud puddle while Kai grins.",
      stage: (t) => (
        <>
          <Block position={[0.9, 0.05, 1.5]} size={[2.2, 0.08, 1.6]} color="#4d3623" />
          <ChiefFlint position={[0.9, 0, 1.5]} rotationY={0} animation="cower" face="fear" time={t} />
          <Hero position={[-1.0, 0, 1.6]} rotationY={0.35} animation="laugh" face="grin" time={t} />
          <PipFirefly position={[-0.4, 1.7, 1.6]} t={t} />
        </>
      ),
    },
    {
      cue: "7.chase",
      ...cam.push({ on: [0, 1.8, 1.2], dist: 7.9, to: 6.6, yaw: -10, pitch: 8, fov: 48 }),
      zone: "town",
      look: "overworld-golden",
      note: "The golden FireflySwarm chases every ShadowCreature fleeing back into the woods!",
      stage: (t) => {
        const flee = ease(ramp(t, 0.05, 1.0));
        return (
          <>
            <FireflySwarm position={[0, 2.0, 1.4]} count={20} t={t} />
            <ShadowCreature position={[-1.4 - flee * 2.4, 0, 0.6 - flee * 1.5]} rotationY={Math.PI} t={t} />
            <ShadowCreature position={[1.4 + flee * 2.4, 0, 0.6 - flee * 1.5]} rotationY={Math.PI} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.return",
      ...cam.push({ on: [0, 1.4, 1.6], dist: 7.9, to: 6.6, yaw: 10, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-golden",
      note: "All 30 missing townsfolk walk safely out of the forest cheering under the fireflies!",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Player who={2} position={[-1.7, 0, 0.6 + w * 1.1]} rotationY={0.15} animation="walk" animDistance={w * 1.1} face="grin" time={t} />
            <Player who={3} position={[0, 0, 0.4 + w * 1.2]} rotationY={0} animation="cheer" face="grin" time={t} />
            <Player who={5} position={[1.7, 0, 0.6 + w * 1.1]} rotationY={-0.15} animation="walk" animDistance={w * 1.1} face="grin" time={t} />
            <FireflySwarm position={[0, 2.4, 1.2]} count={14} t={t} />
            <FloatingNumber text="30 SAFE!" color="#4be08a" position={[0, 3.1, 1.2]} height={0.72 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "7.momback",
      ...cam.front({ actor: [0, 0, 1.5], facing: 0, dist: 6.3, to: 5.2, side: -14, pitch: 7, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Emotional climax: Mom steps out of the trees into the warm golden firefly light smiling!",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.95));
        return (
          <>
            <Mom position={[0, 0, 0.5 + w * 1.1]} rotationY={0} animation="walk" animDistance={w * 1.1} face="grin" time={t} />
            <PipFirefly position={[0.65, 1.7, 1.5]} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.hug",
      ...cam.twoShot({ a: [-0.6, 0, 1.6], b: [0.6, 0, 1.6], facing: 0, dist: 6.2, to: 5.0, side: 12, pitch: 8, fov: 42 }),
      zone: "town",
      look: "overworld-golden",
      note: "Heartwarming reunion: Mom and Kai cheer warmly while Pip dances right between them!",
      stage: (t) => (
        <>
          <Mom position={[-0.6, 0, 1.6]} rotationY={0.35} animation="cheer" face="grin" time={t} />
          <Hero position={[0.5, 0, 1.6]} rotationY={-0.35} animation="cheer" face="grin" time={t} />
          <PipFirefly position={[0, 1.9, 1.7]} scale={1.15} t={t} />
          <Bits position={[0, 1.6, 1.6]} count={14} color="#ffe066" t={t} />
        </>
      ),
    },
    {
      cue: "7.closed",
      ...cam.push({ on: [1.2, 1.2, 0.8], dist: 6.9, to: 5.8, yaw: -12, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Chief Flint's coal shop sits empty with an OUT OF BUSINESS sign.",
      stage: () => (
        <>
          <Sign title="CLOSED" subtitle="FOR GOOD" width={1.45} position={[1.2, 1.0, 0.9]} rotationY={-0.15} />
          <HandTorch position={[0.3, 0.1, 1.4]} lit={false} />
          <HandTorch position={[2.1, 0.1, 1.4]} lit={false} />
          <Smoke position={[1.2, 1.2, 0.8]} />
        </>
      ),
    },
    {
      cue: "7.free",
      ...cam.push({ on: [0, 1.3, 1.6], dist: 7.7, to: 6.4, yaw: 10, pitch: 9, fov: 46 }),
      zone: "town",
      look: "overworld-golden",
      note: "Happy glowing town square where everyone walks freely under golden fireflies.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Player who={2} position={[-1.6, 0, 1.0 + w * 0.9]} rotationY={0} animation="walk" animDistance={w * 0.9} face="grin" time={t} />
            <Player who={4} position={[1.6, 0, 1.0 + w * 0.9]} rotationY={0} animation="walk" animDistance={w * 0.9} face="grin" time={t} />
            <FireflySwarm position={[0, 2.2, 1.5]} count={16} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.cta",
      ...cam.twoShot({ a: [-0.7, 0, 1.6], b: [1.1, 0, 1.6], facing: 0, dist: 6.5, to: 5.4, side: -10, pitch: 8, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      note: "Final CTA: Kai waves warmly with Pip hovering beside a glowing SubscribeSign!",
      stage: (t) => (
        <>
          <Hero position={[-1.0, 0, 1.6]} rotationY={0.15} animation="wave" face="grin" time={t} />
          <PipFirefly position={[-0.1, 1.65, 1.7]} scale={1.15} t={t} />
          <SubscribeSign position={[1.5, 0, 1.5]} rotationY={-0.25} />
        </>
      ),
    },
  ],
});
