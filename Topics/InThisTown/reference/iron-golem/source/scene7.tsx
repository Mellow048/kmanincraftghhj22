import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, FaceLight, Glow, Hero, IronGolem, NORTH, SOUTH, SnowGolem, WEST, ease, ramp, snowFace, timing, wordAt } from "./kit";

/** Where the iron golems stand at night: [x, z, the way each was facing]. */
const NIGHT: Array<[number, number, number]> = [
  [0.5, 0.2, SOUTH], [2.5, 4.4, NORTH], [5.4, 1.6, WEST], [7.6, 5.6, NORTH], [9.3, -0.6, SOUTH], [11.4, 3.2, 2.4],
  [13.6, 0.3, SOUTH], [15.5, 5.2, NORTH], [17.4, 2.0, WEST], [20, -0.4, 0.6], [21.5, 4.4, NORTH], [24, 1.8, -1.0],
];
const TURNED = wordAt("7.face", "turned");
/** Turn the short way round to face the gate. */
const toEast = (from: number, k: number) => from + (((EAST - from + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * k;

const HIM: Vec3 = [12.3, 0, 1.4];
/** The lens starts behind the teller's shoulder, at his door. */
const LENS: Vec3 = [8.0, 1.55, -3.9];
const WATCH = wordAt("7.puddle", "watching");
const yawTo = (Math.atan2(LENS[0] - HIM[0], LENS[2] - HIM[2]) * 180) / Math.PI;

/** EVERY NIGHT. What the iron ones are for, shown before anybody knows it. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Facing the gate",
  shots: [
    {
      cue: "7.face",
      ...cam.push({ on: [15, 2.6, 2.2], dist: 17, to: 14, yaw: -90, pitch: 7, fov: 46 }),
      zone: "village",
      look: "overworld-night",
      note: "'Every iron golem turned to face the black gate': the street by moonlight, from behind them. One after another, all down it, they turn their backs on us and stand looking up the hill.",
      stage: (t) => (
        <>
          {/* Moonlight on their backs, and a haze behind the gate so its frame can be seen from the street. */}
          <FaceLight position={[3, 10, 2.2]} power={170} reach={34} color="#b4c6ff" />
          <FaceLight position={[13, 10, 2.2]} power={170} reach={34} color="#b4c6ff" />
          <FaceLight position={[23, 10, 2.2]} power={170} reach={34} color="#b4c6ff" />
          <Glow position={[47, 9.6, 2]} size={20} color="#8ea2f0" opacity={0.6} />
          {NIGHT.map(([x, z, rot], i) => {
            const k = ease(ramp(t, TURNED - 0.5 + i * 0.07, TURNED + 0.1 + i * 0.07));
            return <IronGolem key={i} position={[x, 0, z]} rotationY={toEast(rot, k)} headPitch={-0.12 * k} walk={k * 0.6} />;
          })}
        </>
      ),
    },
    {
      cue: "7.puddle",
      ...cam.push({ on: snowFace(HIM), dist: 6.9, to: 5.8, yaw: yawTo, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "'Only Puddle faced the other way. He was watching me': over the teller's shoulder, from his door. Iron backs, all turned to the hill, and between two of them one pumpkin face, turned to him. It lifts a stick.",
      stage: (t) => {
        const rot = Math.atan2(LENS[0] - HIM[0], LENS[2] - HIM[2]);
        const wave = ramp(t, WATCH, WATCH + 0.25);
        return (
          <>
            <SnowGolem position={HIM} rotationY={rot} fill={5} headRoll={0.14 * ease(ramp(t, 0.5, 1.0))} armR={{ raise: 0.3 + 0.75 * wave + 0.15 * wave * Math.sin(t * 9), swing: 0.4 }} armL={{ raise: 0.25, swing: 0.2 }} />
            <IronGolem position={[10.6, 0, 2.9]} rotationY={EAST} headPitch={-0.12} />
            <IronGolem position={[13.3, 0, -0.5]} rotationY={EAST} headPitch={-0.12} />
            <IronGolem position={[15.5, 0, 4.4]} rotationY={EAST} headPitch={-0.12} />
            <IronGolem position={[17.6, 0, 1.8]} rotationY={EAST} headPitch={-0.12} />
            <Hero position={[8.73, 0, -2.43]} rotationY={rot + Math.PI} animation="idle" face="frown" />
            <FaceLight position={[8.1, 1.9, -3.7]} power={9} reach={3} />
          </>
        );
      },
    },
  ],
});
