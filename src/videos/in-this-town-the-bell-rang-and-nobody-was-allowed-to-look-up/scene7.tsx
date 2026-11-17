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
      ...cam.truck({ on: [-1.2, 1.3, 1.2], dist: 6.2, yaw: 30, pitch: 8, fov: 46, by: [3.2, 0, -1.6] }),
      zone: "village",
      look: DAY,
      note: "They run toward the tower, not away from it. That is the turn.",
      stage: (t) => {
        const go = ease(ramp(t, wordAt("7.run", "Toward"), wordAt("7.run", "Toward") + 0.7));
        return (
          <>
            <Mum position={[-2.6 + go * 1.4, 0, 1.5 - go * 0.8]} walk={go * 3} />
            <Dad position={[-0.8 + go * 1.2, 0, 1.7 - go * 0.7]} walk={go * 3} />
            <Baker position={[0.8 + go * 1.1, 0, 1.2 - go * 0.6]} walk={go * 2.6} />
            <Golem position={[2.6 + go * 0.6, 0, 2.2]} bow={0.15} walk={go * 1.4} />
          </>
        );
      },
    },
    {
      cue: "7.rope",
      ...cam.push({ on: [0.05, 1.5, -2.15], dist: 5.8, to: 4.6, yaw: 76, pitch: 6, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "From the side: raised hands meet the rope, and the count is a row you can see.",
      stage: (t) => {
        const more = ease(ramp(t, wordAt("7.rope", "twenty"), wordAt("7.rope", "twenty") + 0.3));
        const n = more > 0.45 ? 14 : 8;
        const tints = ["#6a8f4a", "#8a5a3a", "#3d5f9a", "#8a3b2a", "#6a4030", "#5a4a6a", "#3f6b3a", "#8a5a2a"];
        return (
          <>
            <BellRope pull={0.35} />
            <Hero position={[0.1, 0, -1.95]} rotationY={Math.PI} animation="reachUp" face="brave" />
            {Array.from({ length: n }).map((_, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2) - 2;
              return (
                <Puller
                  key={i}
                  position={[row * 0.52 + (col === 0 ? 0.7 : -0.15), 0, -2.05 - col * 0.22]}
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
