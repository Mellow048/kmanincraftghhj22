import { cam, storyScene } from "../../engine";
import { EAST, Hero, Jar, Mum, NORTH, SOUTH, Villager, WEST, ease, ramp, timing } from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Not for one person",
  shots: [
    {
      cue: "5.mum",
      ...cam.push({ on: [-0.4, 1.32, -1.7], dist: 4.0, to: 2.6, yaw: -16, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Mum gently lifts savings jar straight out of Hero's hands and places it cleanly back up on timber shelf.",
      stage: (t) => {
        const back = ease(ramp(t, 0.2, 1.15));
        return (
          <>
            <Mum position={[-1.0, 0, -1.9 - back * 0.25]} rotationY={EAST} animation={back < 0.7 ? "hold" : "reach"} face="worried" headPitch={0.12} lookAt={[0.1, 1.2, -1.8]} time={t} />
            <Hero position={[0.35 + back * 0.18, 0, -1.8]} rotationY={WEST} animation={back < 0.6 ? "reach" : "shrug"} face="frown" headPitch={0.1} time={t} />
            <Jar position={[-0.6, 1.1 + back * 0.2, -2.0 - back * 0.6]} fill={0.45} />
          </>
        );
      },
    },
    {
      cue: "5.old",
      ...cam.orbit({ on: [1.3, 1.35, -9.8], dist: 4.1, distTo: 2.85, yaw: -12, yawTo: 26, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Elder fisherman steps slowly back from wooden ladder shaking wide-hatted head as Hero pleads forward.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Villager position={[1.0, 0, -10.0 + step * 0.25]} rotationY={SOUTH} hmm={0.5 + 0.5 * Math.sin(t * 4)} walk={step * 0.3} hat="wide" />
            <Hero position={[2.1 - step * 0.3, 0, -9.2 - step * 0.2]} rotationY={-0.6} animation="talk" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "5.two",
      ...cam.orbit({ on: [6.4, 6.2, -31.4], dist: 7.4, distTo: 5.2, yaw: -22, yawTo: 18, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Two wealthy families stroll across high stone terrace waving stiffly downward toward invisible town.",
      stage: (t) => {
        const wave = Math.sin(t * 4.5);
        return (
          <>
            <Villager position={[5.4, 5.85, -31.4 + t * 0.2]} rotationY={SOUTH} hat="straw" walk={t * 0.6} hmm={0.2 * wave} />
            <Villager position={[6.2, 5.85, -31.2]} rotationY={SOUTH} strain={0.4 + 0.3 * Math.abs(wave)} kid />
            <Villager position={[7.1, 5.85, -31.5 - t * 0.15]} rotationY={SOUTH} walk={t * 0.4} robe="#7a5a44" />
            <Villager position={[7.8, 5.85, -31.3]} rotationY={SOUTH} strain={0.3 + 0.2 * wave} kid />
          </>
        );
      },
    },
    {
      cue: "5.more",
      ...cam.push({ on: [2.0, 1.38, -9.2], dist: 3.9, to: 2.25, yaw: -16, pitch: -4, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Aggressive push as Hero plants foot forward setting jaw hard while raising fist toward mountain top.",
      stage: (t) => {
        const firm = ease(ramp(t, 0, 1.0));
        return (
          <Hero position={[2.0, 0, -9.0 - firm * 0.4]} rotationY={NORTH} animation={firm > 0.45 ? "reachUp" : "walk"} animDistance={firm * 0.5} face="brave" headPitch={-0.6} lookAt={[2, 30, -31]} time={t} />
        );
      },
    },
  ],
});
