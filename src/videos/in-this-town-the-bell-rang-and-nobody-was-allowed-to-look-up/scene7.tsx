import { cam, storyScene } from "../../engine";
import { Baker, BellRope, Dad, Friend, Golem, Hero, Mum, Puller, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "They saw it",
  shots: [
    {
      cue: "7.scream",
      ...cam.push({ on: [-0.6, 1.3, 1.5], dist: 2.8, to: 1.9, yaw: 12, pitch: 4, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "Mum snaps upright. The friend stops singing and his nose comes up.",
      stage: (t) => {
        const stop = ease(ramp(t, wordAt("7.scream", "stopped"), wordAt("7.scream", "stopped") + 0.25));
        return (
          <>
            <Mum position={[-1.4, 0, 1.15]} lean={-0.25} nod={-0.35} />
            <Friend position={[0.55, 0, 1.55]} lean={0.5 * (1 - stop)} nod={0.7 * (1 - stop) - 0.3 * stop} hmm={1 - stop} />
          </>
        );
      },
    },
    {
      cue: "7.run",
      ...cam.push({ on: [0.2, 1.6, -1.6], dist: 6.4, to: 5.2, yaw: 4, pitch: 2, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "From behind them: they run toward the bell, and the bell is in the same frame.",
      stage: (t) => {
        const go = ease(ramp(t, wordAt("7.run", "Toward"), wordAt("7.run", "Toward") + 0.8));
        return (
          <>
            <Mum position={[-0.75, 0, 1.5 - go * 1.2]} rotationY={Math.PI} walk={2.4} />
            <Dad position={[0.55, 0, 1.8 - go * 1.1]} rotationY={Math.PI} walk={2.4} />
            <Baker position={[1.45, 0, 1.2 - go * 1]} rotationY={Math.PI} walk={2.2} />
            <Golem position={[-1.6, 0, 2.2 - go * 0.9]} rotationY={Math.PI} bow={0.05} walk={1.6} />
          </>
        );
      },
    },
    {
      cue: "7.rope",
      ...cam.push({ on: [0, 1.5, -2.05], dist: 5.2, to: 4.2, yaw: 14, pitch: 6, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "From the side: raised hands meet the rope, and the count is a row you can see.",
      stage: (t) => {
        const more = ease(ramp(t, wordAt("7.rope", "twenty"), wordAt("7.rope", "twenty") + 0.3));
        const n = more > 0.45 ? 14 : 8;
        const tints = ["#6a8f4a", "#8a5a3a", "#3d5f9a", "#8a3b2a", "#6a4030", "#5a4a6a", "#3f6b3a", "#8a5a2a"];
        return (
          <>
            <BellRope pull={0.85} />
            <Hero position={[0.05, 0, -2.05]} rotationY={Math.PI} animation="reachUp" face="brave" />
            {Array.from({ length: n }).map((_, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2) - 1;
              return (
                <Puller
                  key={i}
                  position={[row * 0.42 + (col === 0 ? 0.55 : -0.55), 0, -2.12 - col * 0.12]}
                  rotationY={Math.PI}
                  tint={tints[i % tints.length]}
                />
              );
            })}
          </>
        );
      },
    },
    {
      cue: "7.ring",
      ...cam.orbit({ on: [0.3, 4.2, -1.8], dist: 7, yaw: -40, yawTo: 24, pitch: 14, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "The bell will not stop, and the thing has turned toward all of them.",
      stage: (t) => (
        <>
          <SkyThing position={[1.1, 3.8, -2.2]} scale={1.45} turn={-0.35} reach={0.25} />
          <Hero position={[0.1, 0, 0.8]} animation="reachUp" face="brave" />
        </>
      ),
    },
  ],
});
