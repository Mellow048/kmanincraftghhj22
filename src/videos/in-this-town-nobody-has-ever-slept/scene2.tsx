import { cam, storyScene } from "../../engine";
import {
  Bubble,
  Dad,
  EAST,
  Hero,
  LavaBucket,
  Mum,
  NORTH,
  ROBE,
  SOUTH,
  Villager,
  WEST,
  ease,
  faceOf,
  pop,
  ramp,
  timing,
  villagerFace,
  wordAt,
} from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The Only One Who Stops",
  shots: [
    {
      cue: "2.me",
      ...cam.truck({ on: [-1.4, 1.0, 2], by: [2.2, 0, 0], dist: 3.4, yaw: 14, pitch: 8, fov: 38, screenOffset: [0, 0.06] }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero stops dead and yawns slumping onto cobblestones while rushing crowd weaves quickly around him.",
      stage: (t) => {
        const STOP = wordAt("2.me", "stop");
        const stopX = t < STOP ? -0.9 + (t / Math.max(0.1, STOP)) * 0.9 : 0;
        return (
          <>
            <Hero
              position={[stopX, 0, 2]}
              rotationY={0.2}
              animation={t < STOP ? "walk" : "shrug"}
              animDistance={t < STOP ? t * 1.5 : 0}
              face={t < STOP ? "smile" : "sleepy"}
              headPitch={t < STOP ? 0 : 0.28}
              time={t}
            />
            <Villager robe={ROBE.brown} position={[-2.2 + t * 2.1, 0, 0.7]} rotationY={EAST} walk={t * 1.9} />
            <Villager robe={ROBE.blue} position={[2.4 - t * 2.0, 0, 3.2]} rotationY={WEST} walk={t * 1.8} />
          </>
        );
      },
    },
    {
      cue: "2.mum",
      ...cam.pan({ from: [-4.2, 1.8, 3.8], on: [-3.0, 1.15, -0.8], onTo: [-8.6, 1.15, -4.4], fov: 42 }),
      zone: "nether",
      look: "lava-shore",
      note: "Camera sweeps past Mum slogging heavy glowing lava pail across to Dad tending giant crimson mushrooms.",
      stage: (t) => {
        const DAD = wordAt("2.mum", "dad");
        const mumMove = ease(ramp(t, 0, DAD)) * 1.8;
        const dadMove = ease(ramp(t, DAD, DAD + 1.1)) * 0.45;
        return (
          <>
            <Mum
              position={[-2.2 - mumMove, 0, -0.8]}
              rotationY={WEST}
              walk={mumMove}
              strain={0.55 + 0.15 * Math.sin(t * 4)}
              carry={<LavaBucket position={[0, 0.44, 0]} scale={0.68} swing={Math.sin(t * 4) * 0.2} />}
            />
            <Dad
              position={[-8.6, 0, -4.4 + dadMove]}
              rotationY={SOUTH - 0.3}
              walk={dadMove}
              nod={0.25 + 0.18 * Math.sin(t * 5)}
            />
          </>
        );
      },
    },
    {
      cue: "2.door",
      ...cam.ots({ speaker: [-1.0, 1.15, -0.3], listener: [-2, 0.9, 1.4], back: 2.0, push: 0.75, height: 1.35, fov: 38 }),
      zone: "nether",
      look: "lava-shore",
      note: "Over-shoulder frame as Hero steps up questioning and Mum grimly points downward to hot basalt floor.",
      stage: (t) => {
        const POINTED = wordAt("2.door", "pointed");
        return (
          <>
            <Hero
              position={[-2 + ease(ramp(t, 0, 0.9)) * 0.35, 0, 1.4]}
              rotationY={NORTH + 0.55}
              animation={t < POINTED ? "talk" : "scared"}
              face={t < POINTED ? "frown" : "wow"}
              time={t}
            />
            <Mum
              position={[-1.0, 0, -0.3]}
              rotationY={SOUTH - 0.45}
              nod={t > POINTED ? 0.52 : 0.15 * Math.sin(t * 3)}
              lean={t > POINTED ? 0.22 : 0}
              carry={<LavaBucket position={[0, 0.35, 0]} scale={0.55} />}
            />
            <Bubble text="DOWN?" position={[-1.9, 1.75, 1.2]} dark rotationY={0.4} scale={pop(t, 0.4)} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.push({ on: villagerFace([-1.0, 0, -0.3]), dist: 2.8, to: 1.7, yaw: 18, pitch: 0, fov: 32, screenOffset: [0, 0.05] }),
      zone: "nether",
      look: "lava-shore",
      note: "Sudden push onto silent villager faces tightening and averting gaze rather than answer why.",
      stage: (t) => {
        const WHY = wordAt("2.why", "why");
        return (
          <>
            <Mum position={[-1.0, 0, -0.3]} rotationY={SOUTH - ease(ramp(t, 0, WHY)) * 0.65} hmm={0.25} turn={-0.3 * ramp(t, 0, 1)} />
            <Villager robe={ROBE.brown} position={[0.4, 0, -0.7]} rotationY={SOUTH + 0.6 * ramp(t, 0.2, 1)} hmm={0.2 * ramp(t, 0.2, 1)} />
            <Hero position={[-1.6, 0, 1.4]} rotationY={NORTH + 0.4} animation="shrug" face="uneasy" time={t} />
          </>
        );
      },
    },
  ],
});
