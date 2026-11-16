import { Glow, Vox, cam, storyScene } from "../../engine";
import {
  Bubbles, Dive, EAST, Foam, Friend, HM, Hero, NORTH, P, Phone, PoolLife, SOUTH, Splash, Swim, Under, WEST, WL, posed, sine, timing, tw, w,
} from "./kit";

/**
 * 03 LEARN FAST — a video, and a morning of going in and going down.
 *
 * The lane is lane 4, the one by the south deck (z = +3), so the lens can stand on the deck beside it.
 * West end x = −8 (the blocks), east end x = +8.
 */
const LZ = 3;
const BLOCK = P(-8.6, 0.5, LZ);
/** Sitting on the floor of the pool, legs out. The floor is 2.4 m down. */
const onFloor = (t: number, arms: "crossed" | "down" = "crossed") =>
  posed("sit", t, {
    legR: [-Math.PI / 2, 0, 0.2],
    legL: [-Math.PI / 2, 0, -0.2],
    kneeR: [0, 0, 0],
    kneeL: [0, 0, 0],
    armR: arms === "crossed" ? [-0.9, 0, -0.7] : [-0.2, 0, 0.2],
    armL: arms === "crossed" ? [-0.9, 0, 0.7] : [-0.2, 0, -0.2],
  });
const STOP = w("3.stop", "stopped");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Learn fast",
  shots: [
    {
      cue: "3.phone",
      ...cam.push({ on: HM(1.3, 0.95, 0.5), dist: 3.9, to: 2.7, yaw: -20, pitch: 8, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "His room at night: he sits on the end of the bed in the dark with his hair still wet, and the only light in the room is the phone in his hands, blue on his face.",
      stage: (t) => (
        <>
          <Hero position={HM(1.3, 0.16, 0.55)} rotationY={SOUTH} pose={posed("sit", t, { armR: [-1.0, 0, -0.28], armL: [-1.0, 0, 0.28] })} face="frown" headPitch={0.45} />
          <Phone position={HM(1.3, 0.83, 0.96)} rotation={[-0.95, Math.PI, 0]} word="LEARN FAST" scale={1.15} />
          <pointLight position={HM(1.3, 1.0, 1.0)} color="#9fd0ff" intensity={2.2 + Math.sin(t * 7) * 0.5} distance={3.2} decay={2} />
          <Glow position={HM(1.3, 0.9, 0.98)} size={0.7} color="#9fd0ff" opacity={0.35} />
        </>
      ),
    },
    {
      cue: "3.title",
      ...cam.push({ on: HM(1.3, 0.84, 0.96), dist: 0.8, to: 0.56, yaw: 180, pitch: 50, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "Over his shoulder, down onto the screen: LEARN FAST, in letters as big as the phone, and his thumb coming down on it.",
      stage: (t) => (
        <>
          {/* through his eyes: the phone in his two hands, sleeves coming in from the bottom of the frame */}
          <Phone position={HM(1.3, 0.83, 0.96)} rotation={[-0.95, Math.PI, 0]} word="LEARN FAST" scale={1.15} />
          {[-1, 1].map((sx) => (
            <group key={sx}>
              <Vox kind="wool" tint="#e0ac84" position={HM(1.3 + sx * 0.085, 0.815, 0.95)} size={[0.05, 0.06, 0.13]} />
              <Vox kind="wool" tint="#c8372d" position={HM(1.3 + sx * 0.13, 0.76, 0.76)} size={[0.11, 0.11, 0.3]} />
            </group>
          ))}
          <pointLight position={HM(1.3, 1.1, 1.0)} color="#bfe0ff" intensity={0.25 + tw(t, 0.9, 1.1) * 0.2} distance={3} decay={2} />
        </>
      ),
    },
    {
      cue: "3.try",
      ...cam.push({ on: P(-8.2, 0.95, LZ), dist: 4.8, to: 4.0, yaw: 42, pitch: 7, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Morning: he is up on the block doing the video's arm circles in the air, very seriously, and then he bends and goes. His friend, behind him, has both thumbs up.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1, 2]} />
          {t < 0.62 ? (
            <Hero position={BLOCK} rotationY={EAST} pose={posed("idle", t, { armR: [t * 10, 0, 0.18], armL: [t * 10 + Math.PI, 0, -0.18], bodyPitch: 0.25 })} face="brave" />
          ) : (
            <Dive from={BLOCK} heading={EAST} t={t} at={1.02} reach={2.2} then="sink" face="brave" />
          )}
          <Friend position={P(-9.9, 0.02, LZ - 1.2)} rotationY={EAST + 0.3} animation="cheer" face="grin" />
        </>
      ),
    },
    {
      cue: "3.sank",
      ...cam.push({ on: P(-6.0, -1.0, LZ), dist: 3.7, to: 3.0, yaw: 100, pitch: -4, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Under, side on: he comes through the surface in a cloud of bubbles with his arms still doing the circles, and goes to the bottom at the same speed he came in.",
      stage: (t) => (
        <>
          <Under on={P(-6, 0, LZ)} yaw={100} dist={3.7} />
          <Swim at={P(-6.0, WL, LZ)} heading={EAST} mode="sink" t={t} depth={0.1 + t * 1.2} face="fear" foam={0} />
          <Bubbles at={P(-6.0, -1.4 + t * 0.3, LZ)} t={t} n={16} rise={1.3} spread={0.4} />
        </>
      ),
    },
    {
      cue: "3.again",
      ...cam.push({ on: P(-7.0, 0, LZ), dist: 6.2, to: 5.2, yaw: -12, pitch: 48, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "From above the block: off he goes again, flat, and the water takes him like a dropped plate.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1, 2]} />
          <Dive from={BLOCK} heading={EAST} t={t} at={0.3} reach={2.0} then="sink" />
          <Friend position={P(-9.9, 0.02, LZ - 1.2)} rotationY={EAST + 0.3} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "3.again",
      cut: 1.02,
      ...cam.push({ on: P(-5.6, -1.75, LZ), dist: 3.2, to: 2.6, yaw: 118, pitch: 6, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "The floor of the pool: he sits on it with his arms folded, cross, letting his air out, while a small kid swims over the top of him without looking down.",
      stage: (t) => (
        <>
          <Under on={P(-5.6, 0, LZ)} yaw={118} dist={3.2} />
          <Hero position={P(-5.6, -2.74, LZ)} rotationY={EAST - 0.5} pose={onFloor(t)} face="frown" shadow={false} />
          <Bubbles at={P(-5.5, -1.75, LZ)} t={t} n={10} rise={1.5} spread={0.12} />
          <Swim who={4} at={P(-7.6 + t * 2.4, WL, LZ - 0.3)} heading={EAST} mode="crawl" t={t} foam={0} seed={3} />
        </>
      ),
    },
    {
      cue: "3.again2",
      ...cam.push({ on: P(-7.7, 0.6, LZ), dist: 4.2, to: 3.5, yaw: 90, pitch: 7, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "From the water in front of the block: he comes off it straight at the lens, arms wide, mouth open.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Dive from={BLOCK} heading={EAST} t={t} at={0.08} reach={2.3} then="sink" face="fear" />
          <Friend position={P(-9.9, 0.02, LZ - 1.2)} rotationY={EAST + 0.3} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "3.again2",
      cut: 0.68,
      ...cam.push({ on: P(-5.0, 0.2, 3.3), dist: 5.0, to: 4.3, yaw: -62, pitch: 14, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "And off the side this time, at a run, knees up. The friend on the deck has stopped clapping and has a hand over his eyes.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Dive from={P(-5.0, 0.04, 4.35)} heading={NORTH} t={t} at={0.12} reach={1.9} then="sink" face="brave" seed={4} />
          <Friend position={P(-3.4, 0.02, 4.8)} rotationY={WEST} pose={posed("idle", t, { armR: [-2.5, 0, -0.5], armL: [-2.5, 0, 0.5] })} face="worried" headPitch={0.3} />
        </>
      ),
    },
    {
      cue: "3.up",
      ...cam.push({ on: P(-4, 0.05, 2.5), dist: 3.1, to: 2.2, yaw: 24, pitch: 14, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "At the water line: his head is out. It stays out. He looks down at the water round his chin, then up, and the grin arrives.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1, 2]} />
          <Swim at={P(-4, WL, 2.5)} heading={0.3} mode="tread" t={t} face={t < 0.55 ? "surprised" : "grin"} />
          <Friend position={P(-6.3, 0.02, 4.5)} rotationY={EAST + 1.0} animation={t < 0.5 ? "idle" : "cheer"} face={t < 0.5 ? "surprised" : "laugh"} />
        </>
      ),
    },
    {
      cue: "3.cross",
      ...cam.truck({ on: P(-4, 0, LZ), dist: 5.6, yaw: 18, pitch: 28, fov: 40, by: [4.6, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Along the lane with him from above: an ugly stroke, all elbows and white water, but it goes forward. On the deck his friend runs level with him, shouting.",
      stage: (t, { p }) => {
        const x = -4 + 4.6 * sine(p);
        return (
          <>
            <PoolLife lanes={[1, 2]} />
            <Swim at={P(x, WL, LZ)} heading={EAST} mode="crawl" t={t} rate={1.35} face="brave" foam={1.3} />
            <Friend position={P(x - 0.4, 0.02, 4.9)} rotationY={EAST} animation="run" animDistance={x * 1.0 + 9} arms="cheer" face="laugh" />
          </>
        );
      },
    },
    {
      cue: "3.stop",
      ...cam.push({ on: P(7.1, 0.0, LZ), dist: 3.8, to: 3.1, yaw: -68, pitch: 13, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "The far wall: he stops, both fists go up out of the water, and on 'stopped' the fists go straight down after the rest of him. The friend's cheer stops halfway.",
      stage: (t) => {
        const down = Math.max(0, t - STOP - 0.1);
        return (
          <>
            <PoolLife lanes={[1]} />
            <Swim
              at={P(7.15, WL, LZ)}
              heading={WEST + 0.5}
              mode="tread"
              t={t}
              depth={down * 2.4}
              pose={down > 0 ? undefined : posed("cheer", t, { legR: [0.3, 0, 0.1], legL: [-0.3, 0, -0.1] })}
              face={down > 0 ? "fear" : "laugh"}
              foam={down > 0.5 ? 0 : 1}
            />
            {down > 0 ? <Foam at={P(7.15, WL, LZ)} t={t} size={1.3} n={10} /> : null}
            {down > 0.15 ? <Bubbles at={P(7.15, WL - 0.3, LZ)} t={t} n={8} rise={0.3} spread={0.3} /> : null}
            <Friend position={P(9.2, 0.02, LZ + 0.9)} rotationY={WEST} animation={down > 0 ? "idle" : "cheer"} face={down > 0 ? "surprised" : "laugh"} />
          </>
        );
      },
    },
    {
      cue: "3.coin",
      ...cam.push({ on: P(7.0, -0.9, LZ), onTo: P(7.0, -1.6, LZ), dist: 3.4, to: 2.9, yaw: -92, pitch: 0, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Under: he goes down standing to attention, turning slowly, and beside him, at exactly the same speed, turning the same way, a gold coin somebody dropped.",
      stage: (t) => {
        const d = Math.min(1.2, 0.25 + t * 0.85);
        return (
          <>
            <Under on={P(7, 0, LZ)} yaw={-92} dist={3.4} />
            <Swim at={P(7.1, WL, LZ)} heading={t * 4.2} mode="sink" t={t} depth={d} pose={posed("idle", 0, { armR: [0, 0, 0.04], armL: [0, 0, -0.04] })} face="blank" foam={0} />
            <Vox kind="wool" tint="#f2c84a" emissive="#f2c84a" position={P(6.45, -0.75 - d, LZ + 0.35)} rotation={[0, t * 4.2, Math.PI / 2]} size={[0.02, 0.16, 0.16]} />
            <Bubbles at={P(7.1, -0.9 - d * 0.5, LZ)} t={t} n={8} rise={1.3} spread={0.2} />
          </>
        );
      },
    },
  ],
});
