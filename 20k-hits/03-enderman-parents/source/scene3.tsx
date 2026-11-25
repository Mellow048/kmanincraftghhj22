import { cam, storyScene } from "../../engine";
import { Block, Drawing, Enders, Hero, Mum, NORTH, PURPLE, Puddle, SOUTH, EAST, WEST, STREET, SoundRings, Zap, posed, timing, tw, w } from "./kit";

/** 03 — Everything he tried. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Everything",
  shots: [
    {
      cue: "3.tried",
      ...cam.truck({ on: [0, 1.0, 7.6], dist: 4.0, yaw: 6, pitch: 3, fov: 44, by: [0, 0, 1.6] }),
      ease: "linear" as const,
      zone: "town",
      look: "overworld-day",
      note: "He marches down the street at us with his jaw set and one fist up: a kid with a plan.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 7.6 + t * 1.45]} rotationY={SOUTH} animation="walk" face="brave" pose={undefined} />
          <Enders spots={[[-1.6, 3.2, NORTH], [1.7, 1.2, SOUTH]]} t={t} first={3} />
        </>
      ),
    },
    {
      cue: "3.puddle",
      ...cam.push({ on: [0, 1.3, 6], dist: 6.3, to: 5.6, yaw: 0, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He crouches at a puddle to look at her in it. She is on the far side of it, leaning well back; on 'endermen' she is a purple puff, and now she is a long way up the street, still looking at him.",
      stage: (t) => {
        const tp = w("3.puddle", "Endermen") - 0.15;
        return (
          <>
            <Puddle position={[-0.25, 0, 6]} size={[1.0, 1.3]} />
            <Hero position={[-1.05, 0, 6]} rotationY={EAST} animation="crouch" headPitch={0.45} face={t < tp ? "smile" : "frown"} />
            {t < tp ? <Mum position={[1.0, 0, 6]} rotationY={WEST} lean={-0.22} mood="scared" lookAt={[-1.05, 1, 6]} shake={0.15} /> : <Mum position={[0.9, 0, -1.5]} rotationY={SOUTH} mood="scared" lookAt={[-1.05, 1, 6]} />}
            <Zap position={[1.0, 0, 6]} t={t - tp} seed={3} />
            <Zap position={[0.9, 0, -1.5]} t={t - tp - 0.05} seed={8} />
          </>
        );
      },
    },
    {
      cue: "3.fingers",
      ...cam.push({ on: [0, 1.6, 6], dist: 5.3, to: 4.7, yaw: 10, pitch: 0, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Face to face again, and this time both his hands are over his face with the fingers a little open. On 'she' the jaw drops and the rings come off her.",
      stage: (t) => {
        const at = w("3.fingers", "She") - 0.12;
        const on = t > at;
        return (
          <>
            <Hero position={[0.75, 0, 6]} rotationY={WEST} headPitch={-0.55} face={on ? "fear" : "smile"} pose={posed("idle", t, { armR: [-2.25, 0, -0.35], armL: [-2.25, 0, 0.35] })} />
            <Mum position={[-0.75, 0, 6]} rotationY={EAST} lookAt={[0.75, 1.22, 6]} jaw={on ? 1 : 0} shake={on ? 1 : 0} mood={on ? "scared" : "calm"} />
            <SoundRings position={[-0.5, 2.75, 6.3]} t={t - at} color="#e9b8ff" reach={1.5} />
            <SoundRings position={[-0.5, 2.75, 6.3]} t={t - at - 0.3} color="#e9b8ff" reach={1.5} />
          </>
        );
      },
    },
    {
      cue: "3.next",
      ...cam.push({ on: [0, 1.5, 2.5], dist: 12, to: 10.5, yaw: -10, pitch: 16, fov: 48 }),
      shake: 0.03,
      zone: "town",
      look: "overworld-day",
      note: "The whole street: every enderman in it has its jaw down and is shaking, rings off every head. The kid is in the middle with his hands over his ears.",
      stage: (t) => (
        <>
          <Enders spots={STREET.slice(1)} t={t} face={SOUTH} jaw={1} shake={1} mood="scared" hold={false} />
          {[[1.1, 4.6], [-0.3, 2.6], [1.4, 0.8], [-1.3, -0.8], [-2.3, 3.6]].map(([x, z], i) => (
            <SoundRings key={i} position={[x, 2.8, z + 0.3]} t={(t + i * 0.17) % 0.7} color="#e9b8ff" reach={1.3} />
          ))}
          <Hero position={[-0.4, 0, 6.2]} rotationY={SOUTH} animation="cower" face="ouch" />
        </>
      ),
    },
    {
      cue: "3.behind",
      ...cam.push({ on: [0.1, 1.9, 5.4], dist: 5.2, to: 4.3, yaw: 14, pitch: -3, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "From behind them both: she faces up the street, he stands at her heels with his head tipped right back, and all there is to see is the back of a black head and a pink bow. On 'now' her head starts to turn, and his drops like a stone.",
      stage: (t) => {
        const a = w("3.behind", "Now") - 0.1;
        const turn = tw(t, a, a + 0.35) * (1 - tw(t, a + 0.9, a + 1.2));
        return (
          <>
            <Mum position={[0, 0, 5]} rotationY={NORTH} turn={turn * 1.1} />
            <Hero position={[0.15, 0, 6.2]} rotationY={NORTH} headPitch={turn > 0.15 ? 0.75 : -0.75} face="smile" />
          </>
        );
      },
    },
    {
      cue: "3.drew",
      ...cam.push({ on: [0, 0.1, 8.05], dist: 2.9, to: 2.4, yaw: 0, pitch: 60, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Looking down at a sheet of paper on the ground, the kid bent over the top of it with a purple crayon. On 'two' one purple dot appears on the empty page, and on 'purple' the other. That is all of it.",
      stage: (t) => {
        const d1 = w("3.drew", "Two") - 0.05;
        const d2 = w("3.drew", "purple") - 0.02;
        return (
          <>
            <group position={[0, 0.07, 8.1]} rotation={[-Math.PI / 2, 0, 0]}>
              <Drawing dots={t > d2 ? 2 : t > d1 ? 1 : 0} rest={false} scale={1.25} />
            </group>
            <Hero position={[0.05, 0, 7.25]} rotationY={SOUTH} animation="leanOver" face="brave" headPitch={0.5}>
              <Block position={[0, -0.05, 0.08]} size={[0.05, 0.05, 0.22]} color={PURPLE} />
            </Hero>
          </>
        );
      },
    },
    {
      cue: "3.guess",
      ...cam.push({ on: [0, 1.0, 8.35], dist: 2.7, to: 2.1, yaw: -8, pitch: 0, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "He holds the finished drawing up to us, very proud: a square head, the two purple dots, and everything he made up: a huge red smile, a pink bow, a sun and a heart.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 8]} rotationY={SOUTH} animation="hold" face="grin" />
          <Drawing position={[0, 0.98 + Math.sin(t * 5) * 0.012, 8.4]} rotation={[-0.08, 0, Math.sin(t * 3) * 0.03]} scale={1.05} />
        </>
      ),
    },
    {
      cue: "3.carry",
      ...cam.truck({ on: [0.1, 1.75, 4], dist: 5.6, yaw: 0, pitch: 0, fov: 46, by: [0, 0, 1.9] }),
      ease: "linear" as const,
      zone: "town",
      look: "overworld-day",
      note: "Mum comes down the street with the drawing held out in both arms the way the others hold their blocks, and she is looking down at him. He walks at her knee and looks at the ground, smiling.",
      stage: (t) => (
        <>
          <Mum position={[-0.35, 0, 4 + t * 1.15]} rotationY={SOUTH} walk={t * 1.15} carry={1} mood="happy" lookAt={[0.7, 1.2, 4.6 + t * 1.15]}>
            <Drawing position={[0, 0.1, 0]} rotation={[-0.2, 0, 0]} scale={1.15} />
          </Mum>
          <Hero position={[0.7, 0, 4.6 + t * 1.15]} rotationY={SOUTH} animation="walk" headPitch={0.6} face="smile" />
          <Enders spots={[[-2.0, 0.5, NORTH], [1.9, -2, SOUTH]]} t={t} first={5} walk={t} shift={[0, 0, 0]} />
        </>
      ),
    },
  ],
});
