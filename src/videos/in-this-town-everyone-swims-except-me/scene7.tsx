import { Glow, Vox, cam, storyScene } from "../../engine";
import {
  ArenaCrowd, Bib, Dive, EAST, Hero, Kid, NORTH, R, ROBE, SOUTH, SignBoard, SoundRings, StartLine, Swim, Villager, WEST, WL, laneZ, posed, sine,
  timing, tw, w,
  bandAt,
} from "./kit";

/**
 * 07 THE CONTEST — a signature, a number, a pool that is not his pool, and four words.
 *
 * Pool one: x −15 (the blocks) to +15 (the finish), ten lanes across z −10 … +10. He is in lane 5 (z = −1),
 * the kid in black and white is in lane 6 (z = +1). The sign-up desk is west of the start.
 */
const DESK = R(-24, 0, 4);
const ME_Z = laneZ(5);
const SIGNER: [number, number, number] = [DESK[0], 0, DESK[2] + 1.12];
const signing = (j: number) => posed("idle", 0, { bodyPitch: 0.35, armR: [-1.95 + j, j * 2, 0] });
/** His fist over the form: worked out from the pose, so the paper and the lens can be put under and on it. */
const FIST = bandAt({ position: SIGNER, rotationY: NORTH, pose: signing(0) }, undefined, -0.62);
const TWO = w("7.go", "two");
const ONE = w("7.go", "one");
const GO = w("7.go", "go");
const SMALL = w("7.smallest", "the");

/** The big kids warming up along the start: taller than him, every one. */
const Pros = ({ t, from = -7, n = 6 }: { t: number; from?: number; n?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const z = from + i * 1.7;
      const kind = i % 3;
      return (
        <Kid
          key={i}
          n={i + 3}
          scale={0.98 + (i % 2) * 0.06}
          position={R(-17.2 + (i % 2) * 0.5, 0.04 + (kind === 1 ? Math.abs(Math.sin(t * 6 + i)) * 0.16 : 0), z)}
          rotationY={EAST}
          pose={
            kind === 0
              ? posed("idle", t, { armR: [t * 8 + i, 0, 0.2], armL: [t * 8 + i + Math.PI, 0, -0.2] })
              : kind === 1
                ? posed("idle", t, { armR: [-2.9, 0, 0.3], armL: [-2.9, 0, -0.3] })
                : posed("idle", t, { bodyPitch: 0.9 + Math.sin(t * 3 + i) * 0.25, armR: [-1.6, 0, 0.1], armL: [-1.6, 0, -0.1] })
          }
          face="brave"
        />
      );
    })}
  </>
);

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The contest",
  shots: [
    {
      cue: "7.days",
      ...cam.push({ on: R(-4, 0, 0), dist: 34, to: 28, yaw: -90, pitch: 27, fov: 52 }),
      zone: "arena",
      look: "overworld-day",
      note: "Race day from the air: flags, a stand full of the town on each side, ten lanes of blue, tents, and two more pools beyond it, each bigger than the last.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={0.4} south />
          <Pros t={t} />
          {[2, 4, 7, 9].map((ln, i) => (
            <Swim key={ln} who={i + 1} at={R(-10 + i * 4 + t * 1.6, WL, laneZ(ln))} heading={EAST} mode="crawl" t={t} seed={ln} />
          ))}
          <Hero position={[DESK[0], 0, DESK[2] + 1.15]} rotationY={NORTH} animation="idle" ring={3} />
          <Villager position={[DESK[0], 0, DESK[2] - 0.85]} robe={ROBE.white} phase={0.3} />
        </>
      ),
    },
    {
      cue: "7.days",
      cut: 0.95,
      ...cam.push({ on: [DESK[0], 0.95, DESK[2] + 0.5], dist: 4.4, to: 3.5, yaw: 58, pitch: 12, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "The sign-up desk under its red awning: a villager behind it, a queue of kids taller than him behind him, and him bent over the list with the pen.",
      stage: (t) => (
        <>
          <Villager position={[DESK[0], 0, DESK[2] - 0.85]} robe={ROBE.white} nod={0.35} phase={0.3} />
          <Hero position={[DESK[0], 0, DESK[2] + 1.12]} rotationY={NORTH} pose={posed("idle", t, { bodyPitch: 0.35, armR: [-1.35 + Math.sin(t * 14) * 0.05, 0, 0] })} ring={3} face="uneasy" headPitch={0.4}>
            <Vox kind="log" tint="#f6f2e6" position={[0, -0.02, 0.06]} size={[0.025, 0.2, 0.025]} />
          </Hero>
          <Vox kind="wool" tint="#ffffff" position={[DESK[0] + 0.22, 0.955, DESK[2] + 0.32]} size={[0.5, 0.012, 0.36]} />
          {[0, 1, 2].map((i) => (
            <Kid key={i} n={i + 4} scale={0.98} position={[DESK[0] + (i % 2) * 0.3, 0, DESK[2] + 2.3 + i * 1.0]} rotationY={NORTH} animation="idle" phase={i} face="neutral" />
          ))}
        </>
      ),
    },
    {
      cue: "7.hands",
      ...cam.push({ on: [FIST[0], 1.0, FIST[2]], dist: 1.45, to: 1.05, yaw: 228, pitch: 36, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "On the list: his fist round the pen, the pen jumping, and under it a line of ink that was meant to be his name and looks like a heartbeat.",
      stage: (t) => {
        const j = Math.sin(t * 31) * 0.03 + Math.sin(t * 47) * 0.02;
        return (
          <>
            <Hero position={SIGNER} rotationY={NORTH} pose={signing(j)} ring={3} face="uneasy" headPitch={0.4}>
              <Vox kind="wool" tint="#2f6fd0" position={[0, -0.02, -0.08]} size={[0.035, 0.035, 0.22]} />
            </Hero>
            <Vox kind="wool" tint="#ffffff" position={[FIST[0] + 0.05, 0.955, FIST[2] - 0.02]} size={[0.56, 0.012, 0.4]} />
            {Array.from({ length: Math.min(9, Math.floor(t * 8)) }, (_, i) => (
              <Vox key={i} kind="wool" tint="#1d2b3a" position={[FIST[0] + 0.24 - i * 0.04, 0.964, FIST[2] - 0.06 + Math.sin(i * 2.3) * 0.035]} size={[0.035, 0.004, 0.02 + Math.abs(Math.sin(i * 1.7)) * 0.04]} />
            ))}
          </>
        );
      },
    },
    {
      cue: "7.number",
      ...cam.push({ on: [DESK[0], 1.0, DESK[2] + 2.4], dist: 3.5, to: 2.3, yaw: -10, pitch: 4, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "He turns round from the desk with a white square pinned to his chest: 66. He looks down at it upside down, then up at the kids in the queue, who have numbers like 1 and 2.",
      stage: (t) => (
        <>
          <Villager position={[DESK[0], 0, DESK[2] - 0.85]} robe={ROBE.white} phase={0.3} />
          <Hero position={[DESK[0], 0, DESK[2] + 2.4]} rotationY={SOUTH} animation="idle" ring={3} face={t < 0.8 ? "uneasy" : "frown"} headPitch={0.45 - tw(t, 0.7, 1.0) * 0.5} />
          <Bib position={[DESK[0], 1.0, DESK[2] + 2.52]} text="66" />
          <Kid n={5} scale={1.0} position={[DESK[0] + 0.75, 0, DESK[2] + 1.6]} rotationY={NORTH} animation="idle" face="neutral" />
          <Bib position={[DESK[0] + 0.75, 1.25, DESK[2] + 1.72]} text="2" />
        </>
      ),
    },
    {
      cue: "7.crowd",
      ...cam.orbit({ on: R(0, 0.5, 0), dist: 30, yaw: 62, yawTo: 47, pitch: 22, fov: 52 }),
      zone: "arena",
      look: "overworld-day",
      note: "Round the pool from the corner: both stands full and on their feet, kids doing lengths to warm up, kids on the deck windmilling their arms. A lot of people.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={1} south />
          <Pros t={t} n={8} from={-8} />
          {[1, 3, 4, 6, 8, 10].map((ln, i) => (
            <Swim key={ln} who={i + 1} at={R(-11 + ((i * 7) % 20) + t * 1.8, WL, laneZ(ln))} heading={EAST} mode="crawl" t={t} rate={1.3} seed={ln} />
          ))}
        </>
      ),
    },
    {
      cue: "7.pro",
      ...cam.truck({ on: R(-17, 1.05, -5.5), dist: 4.8, yaw: 90, pitch: 3, fov: 42, by: [0, 0, 8.6] }),
      zone: "arena",
      look: "overworld-day",
      note: "Along the row at the start, from over the water: tall kid windmilling, tall kid jumping, tall kid touching his toes — and at the end of the row, a head shorter, him, looking up at them.",
      stage: (t) => (
        <>
          <Pros t={t} n={6} from={-7} />
          <Hero position={R(-17.0, 0.04, 3.6)} rotationY={EAST - 0.9} animation="idle" ring={3} face="uneasy" headPitch={-0.35} />
          <Bib position={R(-16.92, 1.02, 3.52)} rotationY={EAST - 0.9} text="66" />
        </>
      ),
    },
    {
      cue: "7.matter",
      ...cam.push({ on: R(-17.0, 1.14, 3.6), dist: 2.4, to: 1.6, yaw: 72, pitch: -6, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "Up at him from below: he brings the wrist up in front of his chest, the band shows gold, and the worry goes off his face and something smug comes on.",
      stage: (t) => (
        <>
          <Pros t={t} n={6} from={-7} />
          <Hero position={R(-17.0, 0.04, 3.6)} rotationY={EAST - 0.2} pose={posed("idle", t, { armR: [-1.9 * tw(t, 0.1, 0.6), 0, -0.25] })} ring={3} face={t < 0.7 ? "uneasy" : "smug"} headYaw={-0.25} headPitch={0.1} />
          <Glow position={R(-16.6, 1.25, 3.85)} size={0.5 * tw(t, 0.4, 0.8)} color="#ffd98a" opacity={0.4} />
        </>
      ),
    },
    {
      cue: "7.table",
      ...cam.orbit({ on: R(18.6, 1.8, -3), dist: 4.3, distTo: 3.4, yaw: 118, yawTo: 82, pitch: 6, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "Round the cup on its red cloth at the finish end: gold, as tall as the table is wide, the whole pool and both stands bent in its side.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={0.5} />
          <Glow position={R(18.6, 2.1, -3)} size={1.6 + Math.sin(t * 5) * 0.2} color="#ffe28a" opacity={0.4} />
          <Villager position={R(19.2, 0, -0.6)} rotationY={WEST} robe={ROBE.smith} lookAt={R(18.6, 1.8, -3)} phase={0.7} />
        </>
      ),
    },
    {
      cue: "7.big",
      ...cam.orbit({ on: R(-16.4, 1.1, ME_Z), onTo: R(-9, 0.2, ME_Z), dist: 3.4, distTo: 9, yaw: -90, yawTo: -90, pitch: 5, pitchTo: 30, fov: 48 }),
      zone: "arena",
      look: "overworld-day",
      note: "From behind his shoulder, rising: the back of his head, and over it the pool opening out — lane after lane after lane, and the far wall a long way off.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={0.3} south />
          <Hero position={R(-17.0, 0.04, ME_Z)} rotationY={EAST} pose={posed("idle", t, { bodyPitch: -0.06, armR: [0, 0, 0.05 + tw(t, 0.3, 0.8) * 0.1], armL: [0, 0, -0.05 - tw(t, 0.3, 0.8) * 0.1] })} ring={3} />
          {[2, 7, 9].map((ln, i) => (
            <Swim key={ln} who={i + 1} at={R(-6 + i * 5 + t * 1.6, WL, laneZ(ln))} heading={EAST} mode="crawl" t={t} seed={ln} />
          ))}
        </>
      ),
    },
    {
      cue: "7.speaker",
      ...cam.push({ on: R(-17.1, 3.95, 11.6), dist: 3.5, to: 2.8, yaw: 60, pitch: -24, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Up at the grey box on its pole against the sky and the flags: it coughs, and rings of sound come off the front of it and grow.",
      stage: (t) => (
        <>
          <SoundRings at={R(-17.0, 4.1, 11.6)} t={t} dir={EAST} loud={1 + Math.sin(t * 30) * 0.15} />
          <Glow position={R(-17.0, 4.1, 11.6)} size={0.8 + Math.sin(t * 40) * 0.2} color="#fff6c8" opacity={0.3} />
        </>
      ),
    },
    {
      cue: "7.three",
      ...cam.push({ on: R(62, 0, 0), dist: 92, to: 80, yaw: -90, pitch: 26, fov: 52 }),
      zone: "arena",
      look: "overworld-day",
      note: "From very high: three blue rectangles in a row across the field, small, bigger, biggest. The one with the crowd round it is the small one.",
      stage: (t) => <ArenaCrowd t={t} south rows={3} />,
    },
    {
      cue: "7.smallest",
      ...cam.push({ on: R(-20.4, 1.9, -7), dist: 10.5, to: 8.6, yaw: 90, pitch: 2, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "The board by the start, read from over the water: SUMMER RACE. POOL ONE. THE SMALLEST. A villager stands under it nodding at every word.",
      stage: (t) => (
        <>
          <Villager position={R(-19.6, 0, -3.7)} rotationY={EAST} robe={ROBE.elder} hmm={0.5 + 0.5 * Math.sin(t * 7)} phase={0.3} />
          <Kid n={6} scale={0.98} position={R(-18.6, 0.04, -9.6)} rotationY={WEST} animation="idle" face="neutral" />
        </>
      ),
    },
    {
      cue: "7.smallest",
      cut: Math.max(0.6, SMALL - 0.05),
      ...cam.push({ on: R(-17.0, 1.16, ME_Z), dist: 2.5, to: 1.7, yaw: 96, pitch: -3, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "His face, reading it: the mouth comes open a little at a time. The tall kids on either side of him have not even looked up.",
      stage: (t) => (
        <>
          <Hero position={R(-17.0, 0.04, ME_Z)} rotationY={EAST} animation="idle" ring={3} face={t < 0.35 ? "uneasy" : "surprised"} headYaw={0.3 - tw(t, 0.2, 0.6) * 0.3} />
          <Bib position={R(-16.88, 1.0, ME_Z)} rotationY={EAST} text="66" />
          <Kid n={4} scale={1.02} position={R(-17.3, 0.04, ME_Z - 1.3)} rotationY={EAST} pose={posed("idle", t, { armR: [t * 8, 0, 0.2], armL: [t * 8 + Math.PI, 0, -0.2] })} face="brave" />
          <Kid n={7} scale={1.04} position={R(-17.3, 0.04, ME_Z + 1.3)} rotationY={EAST} pose={posed("idle", t, { bodyPitch: 0.9, armR: [-1.6, 0, 0.1], armL: [-1.6, 0, -0.1] })} face="brave" />
        </>
      ),
    },
    {
      cue: "7.most",
      ...cam.push({ on: R(-19.4, 1.45, 6.6), dist: 7.4, to: 6.0, yaw: 90, pitch: 3, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "The rules, chalked on a second board: three boxes for three pools, and MOST WINS. The racers stand in front of it in a row with their backs to us, him the short one.",
      stage: (t) => (
        <>
          <SignBoard at={R(-19.6, 0, 6.6)} rotationY={Math.PI / 2} width={3.0} height={2.9} tint="#3a4a44" lines={[{ text: "MOST WINS", height: 0.34, color: "#f6f2e6" }, { text: "1  2  3", height: 0.5, color: "#ffe28a" }]} />
          {[0, 1, 2, 3].map((i) => (
            <Kid key={i} n={i + 3} scale={1.0 + (i % 2) * 0.05} position={R(-17.4, 0.04, 4.9 + i * 0.85 + (i > 1 ? 0.85 : 0))} rotationY={WEST} animation="idle" phase={i} />
          ))}
          <Hero position={R(-17.4, 0.04, 6.6)} rotationY={WEST} animation="idle" ring={3} headPitch={-0.2} />
          <Bib position={R(-17.27, 1.0, 6.6)} rotationY={EAST} text="66" />
        </>
      ),
    },
    {
      cue: "7.what",
      ...cam.push({ on: R(-15.2, 1.25, ME_Z), dist: 6.4, to: 2.3, yaw: -90, pitch: 12, fov: 25, fovTo: 68 }),
      zone: "arena",
      look: "overworld-day",
      note: "Behind him up on his block: the lens comes in and opens wide at once, and the lane in front of him stretches like a pulled sweet until the far wall is a line.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={0.3} south />
          <StartLine tl={0} go={99} only={[3, 4, 6, 7]} />
          <Hero position={R(-15.6, 0.5, ME_Z)} rotationY={EAST} animation="scared" ring={3} />
          <Bib position={R(-15.72, 1.5, ME_Z)} rotationY={WEST} text="66" />
        </>
      ),
    },
    {
      cue: "7.go",
      ...cam.truck({ on: R(-15.6, 1.05, -4.5), dist: 6.2, yaw: 62, pitch: 8, fov: 42, by: [0, 0, 4.5] }),
      zone: "arena",
      look: "overworld-day",
      note: "'Three': down the line of blocks from over the water, ten backs bent, ten pairs of hands on ten edges. Nobody moving.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} />
          <StartLine tl={t} go={GO} />
        </>
      ),
    },
    {
      cue: "7.go",
      cut: TWO - 0.05,
      ...cam.push({ on: R(-15.45, 1.0, ME_Z), dist: 2.2, to: 1.7, yaw: 76, pitch: 3, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "'Two': his face, bent over his knees. His eyes slide sideways to the lane beside him and come back.",
      stage: (t) => (
        <>
          <StartLine tl={t + TWO - 0.05} go={GO} only={[4, 5, 6]} heroFace="fear" />
          <ArenaCrowd t={t} />
        </>
      ),
    },
    {
      cue: "7.go",
      cut: ONE - 0.05,
      ...cam.push({ on: R(-15.4, 0.95, laneZ(6)), dist: 2.4, to: 1.9, yaw: 118, pitch: 2, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "'One': the lane beside him. A kid in black and white, not nervous at all, rocking back for the start — with something gold on his wrist, if you were looking.",
      stage: (t) => (
        <>
          <StartLine tl={t + ONE - 0.05} go={GO} only={[5, 6, 7]} />
          <ArenaCrowd t={t} south north={false} />
        </>
      ),
    },
    {
      cue: "7.go",
      cut: GO - 0.04,
      ...cam.push({ on: R(-13.4, 0.4, 0), dist: 15, to: 13.5, yaw: 30, pitch: 24, fov: 52 }),
      zone: "arena",
      look: "overworld-day",
      note: "'Go': from high at the side, the whole line leaves the blocks at once and hangs flat over the water — and one red one, a beat behind the rest, goes in like a dropped tray.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={1} />
          <StartLine tl={t + GO - 0.04} go={GO} />
        </>
      ),
    },
  ],
});
