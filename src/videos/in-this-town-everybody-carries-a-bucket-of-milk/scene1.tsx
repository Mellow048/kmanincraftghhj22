import {
  BabyCow,
  Block,
  Hero,
  MilkBucket,
  Player,
  ROBE,
  Sign,
  Villager,
  Witch,
  cam,
  ease,
  pop,
  ramp,
  room,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Scene 1 (Beats 1–2): Bright Milk-Bucket Hook + Absurd Comedy Montage. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Everybody Carries Milk",
  shots: [
    {
      cue: "1.town",
      ...cam.front({ actor: [0, 0, 2.0], facing: 0, dist: 5.8, to: 4.9, side: 10, pitch: 8, fov: 46 }),
      zone: "town",
      note: "Bright Frame-1 hook: townsfolk walk toward camera holding bright white MilkBuckets in sunny square.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        const anim = w > 0.02 && w < 0.98 ? "walk" : "cheer";
        return (
          <>
            <Hero position={[0, 0, 1.2 + w * 1.1]} rotationY={0} animation={anim} animDistance={w * 1.1} face="grin" time={t}>
              <MilkBucket position={[0, -0.05, 0.14]} scale={0.9} />
            </Hero>
            <Player who={1} position={[-1.6, 0, 1.0 + w * 0.9]} rotationY={0} animation={anim} animDistance={w * 0.9} face="smile" time={t}>
              <MilkBucket position={[0, -0.05, 0.14]} scale={0.9} />
            </Player>
            <Player who={3} position={[1.6, 0, 1.0 + w * 0.9]} rotationY={0} animation={anim} animDistance={w * 0.9} face="smile" time={t}>
              <MilkBucket position={[0, -0.05, 0.14]} scale={0.9} />
            </Player>
          </>
        );
      },
    },
    {
      cue: "1.noon",
      ...cam.crane({ on: [0, 3.2, -0.5], dist: 5.4, toDist: 4.5, yaw: 12, fromPitch: -18, toPitch: 6, fov: 46 }),
      zone: "town",
      note: "Low-to-high crane reveal of the hovering Witch flying over the town square.",
      stage: (t) => <Witch position={[-1.0 + t * 1.2, 3.1, -0.5]} rotationY={0.3} t={t} />,
    },
    {
      cue: "1.splash",
      ...cam.push({ on: [0, 1.5, 1.2], dist: 5.4, to: 4.5, yaw: -14, pitch: 9, fov: 46 }),
      zone: "town",
      note: "Witch drops glowing purple splash potion down toward panicked townsfolk.",
      stage: (t) => {
        const drop = ease(ramp(t, 0.1, 0.8));
        return (
          <>
            <Witch position={[0, 3.5, 0.4]} t={t} />
            <Block position={[0, 3.2 - drop * 2.9, 1.2]} size={[0.25, 0.3, 0.25]} color="#b84cff" emissive="#b84cff" emissiveIntensity={0.8} />
            <Player who={2} position={[-1.3, 0, 1.6]} rotationY={0.4} animation="scared" face="fear" time={t} />
            <Player who={4} position={[1.3, 0, 1.6]} rotationY={-0.4} animation="cower" face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.sip",
      ...cam.front({ actor: [0, 0, 1.6], facing: 0, dist: 4.6, to: 3.8, side: 14, pitch: 7, fov: 44 }),
      zone: "town",
      note: "Villager raises MilkBucket for a sip and immediately smiles as purple glow clears.",
      stage: (t) => {
        const drank = t > wordAt("1.sip", "clears");
        return (
          <Player who={1} position={[0, 0, 1.6]} rotationY={0} animation={drank ? "cheer" : "reachUp"} face={drank ? "grin" : "uneasy"} time={t}>
            <MilkBucket position={[0, -0.05, 0.14]} scale={0.95} empty={drank} />
          </Player>
        );
      },
    },
    {
      cue: "1.none",
      ...cam.crane({ on: [0, 2.0, 1.5], dist: 5.6, yaw: -12, fromPitch: -10, toPitch: 16, fov: 46 }),
      zone: "town",
      note: "Unlucky villager without milk floats helplessly straight up into the sky!",
      stage: (t) => (
        <Player who={5} position={[0, 0.3 + ease(ramp(t, 0, 1.0)) * 3.6, 1.5]} rotationY={0} animation="fall" face="fear" time={t} />
      ),
    },
    {
      cue: "2.mayor",
      ...cam.front({ actor: [0, 0, 1.4], facing: 0, dist: 4.8, to: 4.0, side: 16, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Comedy gag 1: Mayor pauses mid-speech at podium to chug milk.",
      stage: (t) => (
        <>
          <Block position={[0, 0.55, 2.1]} size={[0.8, 1.1, 0.5]} color="#6b4628" />
          <Player who={6} position={[0, 0, 1.4]} rotationY={0} animation="talk" face="smile" time={t}>
            <MilkBucket position={[0, -0.05, 0.14]} scale={0.9} />
          </Player>
        </>
      ),
    },
    {
      cue: "2.post",
      ...cam.truck({ on: [-1.4, 1.2, 1.8], dist: 5.0, yaw: 14, pitch: 8, by: [2.8, 0, 0], fov: 44 }),
      zone: "town",
      note: "Comedy gag 2: Postman marches sideways carrying 4 milk buckets.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 1.0));
        return (
          <Player who={7} position={[-1.4 + w * 2.8, 0, 1.8]} rotationY={w > 0.02 && w < 0.98 ? Math.PI / 2 : 0.25} animation={w > 0.02 && w < 0.98 ? "walk" : "wave"} animDistance={w * 2.8} face="calm" time={t}>
            <MilkBucket position={[0, -0.05, 0.14]} scale={0.85} />
            <MilkBucket position={[0, 0.22, 0.14]} scale={0.85} />
          </Player>
        );
      },
    },
    {
      cue: "2.kids",
      ...cam.twoShot({ a: room(-1.0, 0, 0.4), b: room(1.0, 0, 0.4), facing: 0, dist: 5.2, to: 4.4, side: 10, pitch: 10, fov: 46 }),
      zone: "room",
      note: "Comedy gag 3: Classroom desks each topped with a bright white MilkBucket.",
      stage: (t) => (
        <>
          <Block position={room(-1.0, 0.45, 0.9)} size={[1.1, 0.7, 0.6]} color="#8a5e34" />
          <Block position={room(1.0, 0.45, 0.9)} size={[1.1, 0.7, 0.6]} color="#8a5e34" />
          <MilkBucket position={room(-1.0, 0.82, 0.9)} scale={0.85} />
          <MilkBucket position={room(1.0, 0.82, 0.9)} scale={0.85} />
          <Player who={0} scale={0.8} position={room(-1.0, 0, 0.2)} rotationY={0} animation="wave" face="smile" time={t} />
          <Player who={3} scale={0.8} position={room(1.0, 0, 0.2)} rotationY={0} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "2.baker",
      ...cam.front({ actor: [0, 0, 1.4], facing: 0, dist: 4.8, to: 4.0, side: -14, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Comedy gag 4: Baker holds a blue water bucket instead of milk and starts rising.",
      stage: (t) => (
        <Villager
          position={[0, ease(ramp(t, 0.35, 1.0)) * 2.2, 1.4]}
          rotationY={0}
          robe={ROBE.white}
          strain={ramp(t, 0.35, 1.0)}
          tilt={Math.sin(t * 14) * 0.14}
          nod={-0.35 * ramp(t, 0.35, 1.0)}
          carry={
            <group>
              <Block position={[0, 0.14, 0]} size={[0.24, 0.26, 0.24]} color="#9ea6b2" />
              <Block position={[0, 0.26, 0]} size={[0.2, 0.04, 0.2]} color="#3a86ff" />
            </group>
          }
        />
      ),
    },
    {
      cue: "2.sixth",
      ...cam.push({ on: [0, 1.3, 1.0], dist: 4.8, to: 4.0, yaw: 10, pitch: 8, fov: 44 }),
      zone: "town",
      note: "Deadpan punchline: BAKER WANTED (6TH) sign pops up outside empty bakery.",
      stage: (t) => (
        <>
          <Sign title="BAKER WANTED (6TH)" position={[0, 1.0 * pop(t, 0.1), 1.0]} />
          <Hero position={[-1.4, 0, 1.6]} rotationY={0.35} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
  ],
});
