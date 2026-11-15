import { cam, storyScene } from "../../engine";
import { Bits, Hero, IronGolem, PLACE, ROBE, SOUTH, Smoke, Villager, ramp, timing } from "./kit";

const FELL = PLACE.fell;

/**
 * BEAT 1 — the hook, in his words: it died, the next morning it came back, nobody would tell him how.
 *
 * Shot one is the ash where the golem stood, with the boy still in it (Rule A). Shot two cuts to the
 * impossible thing, from below, at the well — the one place in town that has anything to do with
 * coming back. Shot three is the town refusing to answer.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Our golem died",
  shots: [
    {
      cue: "1.died",
...cam.push({ on: [FELL[0] - 0.2, 1.0, FELL[2] + 0.1], dist: 2.6, to: 5.2, yaw: -98, pitch: 10, fov: 48 }),
      shake: 0.02,
      handheld: 0.01,
      impacts: [{ at: 0.3, amp: 0.05, dur: 0.4 }],
      zone: "gate",
      look: "lantern-night",
      note: "The words are 'our golem died' and the picture is where it died: the scorched ground inside the gate, smoke still going up, the boy crouched in the middle of it. Not the fight — the morning after the fight.",
      stage: (t) => (
        <>
          <Hero
            position={[20.5, 0, 1.6]}
            rotationY={SOUTH - 1.5}
            animation="crouch"
            face="fear"
            gaze={0}
            headPitch={0.36 - 0.32 * ramp(t, 0.15, 1.7)}
          />
          <Smoke position={[FELL[0], 0, FELL[2]]} count={14} rise={3.2} spread={1.6} size={0.26} opacity={0.55} lean={0.3} />
          {/* the iron that came off it is still coming down out of the dark */}
          <Bits position={[FELL[0] + 0.3, 1.5, FELL[2] - 0.2]} t={t + 0.35} color="#7d838c" count={16} power={1.1} />
          <Bits position={[FELL[0] - 0.5, 1.9, FELL[2] + 0.4]} t={t + 0.7} color="#4a4f56" count={10} power={0.8} />
        </>
      ),
    },
    {
      cue: "1.back",
...cam.push({ on: [PLACE.well[0] + 0.3, 1.5, PLACE.well[2] - 0.4], dist: 7.4, to: 3.4, yaw: -18, pitch: -13, fov: 48 }),
      shake: 0.012,
      handheld: 0.008,
      zone: "village",
      look: "overworld-day",
      note: "The impossible thing, from below, in morning light: the golem standing at the well, whole, a flower in its hand. The line says it came back; the picture says nothing about it is different.",
      stage: (t) => (
        <>
          <IronGolem
            position={[-2.6, 0, 3.4]}
            rotationY={SOUTH - 0.35}
            flower
            headPitch={0.12 - 0.22 * ramp(t, 0.25, 1.5)}
            headYaw={-0.15 + 0.55 * ramp(t, 0.25, 1.5)}
            armR={-0.7 - 0.45 * ramp(t, 0.55, 1.6)}
          />
          <Hero position={[-0.2, 0, 5.6]} rotationY={SOUTH + 0.5} animation="idle" face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "1.how",
...cam.push({ on: [-11, 2.0, -4.05], dist: 5.6, to: 2.5, yaw: 36, pitch: 5, fov: 42 }),
      shake: 0.014,
      zone: "village",
      look: "overworld-day",
      note: "'Nobody would tell me how': the oldest woman, on her porch, looks at him and then away. One face, one refusal, nothing else moving.",
      stage: (t, { p }) => (
        <>
          <Villager
            position={[-11, 0.5, -4.1]}
            rotationY={SOUTH + 0.5}
            robe={ROBE.white}
            hat="straw"
            turn={0.3 + 1.3 * p}
            hmm={0.35}
            phase={0.4}
          />
          <Hero position={[-8.7, 0, -2.5]} rotationY={SOUTH + 0.4} animation="idle" face="uneasy" gaze={0} />
        </>
      ),
    },
  ],
});
