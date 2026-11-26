import { cam, storyScene } from "../../engine";
import { Berries, PLACE, SillCup, Sister, Sword, Teller, ease, ramp, timing, wordAt } from "./kit";

const BERRY = wordAt("13.berry", "put");

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "I put a berry in it",
  shots: [
    {
      cue: "13.berry",
      ...cam.push({ on: [-8.6, 1.55, -4.65], dist: 3.3, to: 1.95, yaw: 18, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      impacts: [{ at: BERRY, amp: 0.02, dur: 0.2 }],
      zone: "street",
      look: "overworld-day",
      note: "Teller trots up and gently drops one shining red berry right into the empty second cup.",
      stage: (t) => {
        const k = Math.min(1, Math.max(0, (t - BERRY + 0.15) / 0.4));
        const step = ease(ramp(t, 0, Math.max(0.3, BERRY)));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.26]} berry={k >= 0.75} t={t} />
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.26]} flower />
            <Teller
              position={[-8.05, 0, -3.55 - step * 0.35]}
              rotationY={0.24}
              animation={k < 0.75 ? "reachUp" : "hold"}
              carry={k < 0.75 ? <Berries scale={0.7} count={1} /> : undefined}
              face={k < 0.75 ? "brave" : "smile"}
              tailUp={0.65}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "13.bad",
      ...cam.orbit({ on: [-8.05, 0.72, -3.85], dist: 3.3, distTo: 2.05, yaw: 34, yawTo: -16, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Teller spins squarely to camera shrugging cheerfully with huge cheeky grin.",
      stage: (t) => {
        const shrug = ease(ramp(t, 0, 1.1));
        return (
          <Teller position={[-8.05, 0, -3.85 + shrug * 0.2]} rotationY={0.35 - shrug * 0.25} animation="shrug" face="grin" tailUp={0.55} time={t * 1.3} />
        );
      },
    },
    {
      cue: "13.sister",
      ...cam.ots({ speaker: [-9.65, 0.68, -3.45], listener: [-8.05, 0.68, -3.85], back: 1.85, push: 0.75 }),
      zone: "street",
      look: "overworld-day",
      note: "OTS as Sister walks up smiling with empty jaws for the first time in the film.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Teller position={[-8.05, 0, -3.85]} rotationY={0.7} animation="wave" face="smile" tailUp={0.6} time={t} />
            <Sister position={[-9.9 + walk * 0.35, 0, -3.4]} rotationY={0.42} animation={walk < 0.7 ? "walk" : "talk"} animDistance={walk * 0.45} face="smile" tailUp={0.6} time={t} headPitch={0.08} />
          </>
        );
      },
    },
    {
      cue: "13.only",
      ...cam.orbit({ on: [-8.6, 1.45, -4.65], dist: 3.8, distTo: 2.5, yaw: -16, yawTo: 18, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Both glowing cups in frame as Teller walks proudly past windowsill beneath warm sun.",
      stage: (t) => {
        const strut = ease(ramp(t, 0, 1.3));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.26]} flower />
            <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.26]} berry t={t} />
            <Teller position={[-8.8 + strut * 0.75, 0, -3.45]} rotationY={0.85} animation="walk" animDistance={strut * 0.85} face="happy" tailUp={0.55} time={t} />
          </>
        );
      },
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [-8.35, 1.5, -4.65], dist: 3.6, to: 2.2, yaw: -18, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-golden",
      note: "Final punchline: Dad's gleaming iron sword leans beside both flower and berry cups as Teller leaps joyfully beside sill.",
      stage: (t) => {
        const hop = ease(ramp(t, 0.15, 1.25));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.26]} flower />
            <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.26]} berry t={t} />
            <Sword position={[PLACE.sill[0] + 1.65, PLACE.sill[1] + 0.05 + hop * 0.06, PLACE.sill[2] + 0.2]} scale={0.62} rotation={[0, 0, 0.14]} />
            <Teller position={[-8.1, 0, -3.45]} rotationY={0.12} animation="cheer" face="grin" tailUp={0.7} time={t} />
          </>
        );
      },
    },
  ],
});
