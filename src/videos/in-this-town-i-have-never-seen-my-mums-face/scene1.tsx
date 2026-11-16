import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Dad, Enders, Heart, Hero, Mum, NORTH, SOUTH, EAST, WEST, STREET, SoundRings, Thing, Zap, posed, timing, tw, w } from "./kit";

/** 01 — He has never seen his mum's face. She is an enderman; everyone here is. */
const ME: Vec3 = [0.42, 0, 10];
const MUM: Vec3 = [-0.42, 0, 10];
const eyes = (p: Vec3): Vec3 => [p[0], 1.22, p[2]];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Never seen her face",
  shots: [
    {
      cue: "1.face",
      ...cam.push({ on: [0, 1.4, 10], dist: 5.3, to: 4.5, yaw: 8, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The premise in the first second: a kid in a yellow shirt holds a three-metre enderman's hand and stares hard at the ground. She has a pink bow, and she is looking down at him. Behind them a street of endermen carries blocks about.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={SOUTH} headPitch={0.8} face="uneasy" pose={posed("idle", t, { armL: [0, 0, -0.75], armR: [0, 0, 0.1] })} />
          <Mum position={MUM} rotationY={SOUTH} lookAt={eyes(ME)} />
          <Enders spots={STREET.filter((_, i) => i % 2 === 0 && i > 0)} t={t} face={SOUTH} walk={0.5 + t * 1.2} shift={[0.6, 0, -2 + t * 1.2]} />
          <Enders spots={STREET.filter((_, i) => i % 2 === 1)} t={t} face={NORTH} walk={0.5 + t * 1.2} shift={[-0.6, 0, 1 - t * 1.2]} first={7} />
        </>
      ),
    },
    {
      cue: "1.ender",
      ...cam.push({ on: [0, 1.2, 0.5], dist: 16, to: 13.5, yaw: -14, pitch: 28, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "From over the roofs: the whole street, purple roofs, a heap of odd blocks by every house, and endermen going both ways with a block each. On 'everyone' one of them pops out of the street in a purple puff and pops in again further up.",
      stage: (t) => {
        const pop = w("1.ender", "Everyone");
        return (
          <>
            <Enders spots={STREET.filter((_, i) => i % 2 === 0)} t={t} face={SOUTH} walk={0.6 + t * 1.3} shift={[0.5, 0, t * 1.3]} />
            <Enders spots={STREET.filter((_, i) => i % 2 === 1)} t={t} face={NORTH} walk={0.6 + t * 1.3} shift={[-0.5, 0, 2 - t * 1.3]} first={9} />
            <Enders spots={[[-3.4, 9.5, EAST], [3.5, 5.5, WEST], [-3.3, -3, EAST]]} t={t} first={20} />
            {t < pop ? <Enders spots={[[0.2, 9.6]]} t={t} first={31} /> : <Enders spots={[[-0.4, -9.2]]} t={t} first={31} />}
            <Zap position={[0.2, 0, 9.6]} t={t - pop} seed={3} />
            <Zap position={[-0.4, 0, -9.2]} t={t - pop - 0.05} seed={5} />
          </>
        );
      },
    },
    {
      cue: "1.scream",
      ...cam.push({ on: [0, 1.65, 10], dist: 5.4, to: 4.7, yaw: -6, pitch: 0, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Side on, the two of them face to face: on 'look' he lifts his head to her, and on 'screams' her jaw drops, she shakes, rings come off her head and he ducks with his hands up.",
      stage: (t) => {
        const up = tw(t, w("1.scream", "look") - 0.1, w("1.scream", "look") + 0.2);
        const at = w("1.scream", "screams") - 0.22;
        const on = t > at;
        return (
          <>
            <Hero position={[0.8, 0, 10]} rotationY={WEST} headPitch={on ? 0.5 : 0.35 - up * 1.0} face={on ? "fear" : "smile"} animation={on ? "cower" : "idle"} />
            <Mum position={[-0.8, 0, 10]} rotationY={EAST} lookAt={[0.8, 1.22, 10]} jaw={on ? 1 : 0} shake={on ? 1 : 0} mood={on ? "scared" : "calm"} />
            <SoundRings position={[-0.55, 2.75, 10.3]} t={t - at} color="#e9b8ff" reach={1.5} />
            <SoundRings position={[-0.55, 2.75, 10.3]} t={t - at - 0.35} color="#e9b8ff" reach={1.5} />
          </>
        );
      },
    },
    {
      cue: "1.help",
      ...cam.push({ on: [-0.8, 2.6, 10], dist: 3.6, to: 3.1, yaw: 24, pitch: -8, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on her: the jaw shuts, she droops, her eyes go sad. She is sorry. She did not mean to.",
      stage: (t) => (
        <>
          <Mum position={[-0.8, 0, 10]} rotationY={0.45} jaw={Math.max(0, 0.7 - t * 2.4)} shake={Math.max(0, 0.6 - t * 2)} mood="sad" nod={tw(t, 0.1, 0.6) * 0.35} tilt={tw(t, 0.2, 0.8) * 0.18} />
          <Hero position={[0.8, 0, 10]} rotationY={WEST} headPitch={0.5} face="uneasy" animation="cower" />
        </>
      ),
    },
    {
      cue: "1.dad",
      ...cam.truck({ on: [0.3, 1.7, 9.6], dist: 6.4, yaw: 162, pitch: 3, fov: 46, by: [0, 0, -3.4] }),
      ease: "linear" as const,
      zone: "town",
      look: "overworld-day",
      note: "Dad, in a straw hat, comes up the street towards us with a grass block in his arms and two flowers growing on it. The kid trots at his knee, looking at the block and not at him.",
      stage: (t) => (
        <>
          <Dad position={[0.3, 0, 9.6 - t * 1.31]} rotationY={NORTH} walk={t * 1.31} carry={1} mood="happy">
            <Thing kind={8} />
          </Dad>
          <Hero position={[-0.5, 0, 9.0 - t * 1.31]} rotationY={NORTH} animation="walk" face="smile" headPitch={0.1} headYaw={-0.5} />
          <Enders spots={[[2.0, 14, SOUTH], [-2.2, 17.5, SOUTH]]} t={t} first={3} walk={t * 1.1} shift={[0, 0, t * 1.1]} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [-0.1, 1.5, -9.7], dist: 5.2, to: 4.4, yaw: -10, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Years ago, in front of their house: dad pops in with a purple puff, and what he holds out in both arms this time is a baby in a yellow shirt. Mum bends in from the side to look; the baby waves; a heart comes up over her.",
      stage: (t) => {
        const hi = w("1.me", "me") - 0.5;
        return (
          <>
            <Zap position={[0.4, 0, -10.6]} t={t + 0.25} seed={2} />
            <Dad position={[0.4, 0, -10.6]} rotationY={SOUTH} carry={1} lookAt={[0.4, 1.3, -9.3]} mood="happy">
              <Hero position={[0, -0.26, 0]} scale={0.42} animation={t > hi ? "wave" : "idle"} face="grin" headPitch={-0.3} />
            </Dad>
            <Mum position={[-0.75, 0, -9.7]} rotationY={EAST - 0.5} lean={tw(t, 0.3, 0.9) * 0.4} lookAt={[0.4, 1.3, -9.3]} mood="happy" tilt={Math.sin(t * 4) * 0.08} />
            <Heart position={[-0.3, 3.2, -9.6]} scale={tw(t, hi, hi + 0.3) * 1.1} />
          </>
        );
      },
    },
  ],
});
