import { Block, cam, storyScene } from "../../engine";
import { Bucket, EAST, Hero, NORTH, PLACE, SOUTH, Town, WEST, ease, jolt, ramp, timing, wordAt } from "./kit";

const HIM = PLACE.kid;
const HICCUP = wordAt("1.hiccup", "Hiccup");
const STOPPED = wordAt("1.hiccup", "stopped");
const FACE = [HIM[0], HIM[1] + 1.22, HIM[2]] as [number, number, number];

/** Five people who have not made a sound all morning, standing on wool. */
const Line = ({ t, turn }: { t: number; turn: number }) => (
  <>
    {[
      [-5.6, 0.2, WEST + 0.3],
      [-2.7, -0.1, WEST],
      [0.4, 0.3, EAST],
      [3.5, -0.2, EAST],
      [6.4, 0.4, EAST + 0.4],
    ].map(([x, z, rot], i) => (
      <Town
        key={i}
        position={[x, PLACE.wool, z]}
        rotationY={NORTH + (rot as number) * 0.16 + turn * (i % 2 ? 0.22 : -0.28)}
        lean={0.02 * Math.sin(t * 0.8 + i)}
        nod={0.05}
      />
    ))}
  </>
);

/**
 * FRAME ONE. The street, the wool, and nobody making a sound — then the one kid in the town who cannot help it.
 * The first hiccup is the film's engine: everything after it is somebody deciding whether to make a noise.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Nobody made a sound",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.05, 2], dist: 13.5, to: 10.6, yaw: 0, pitch: 3, fov: 50 }),
      zone: "street",
      look: "overworld-day",
      note: "Frame one, one picture: a street floored in wool and five people standing in it, facing away, saying nothing. The lens walks in on them.",
      stage: (t) => (
        <>
          <Line t={t} turn={0} />
          <Bucket position={[-1.9, PLACE.wool, 3.3]} rotation={[0, 0.5, 0]} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: FACE, dist: 1.42, to: 1.16, yaw: 7, pitch: 2, fov: 33 }),
      zone: "street",
      look: "overworld-day",
      note: "The teller's face, alone in the frame: he is the one who is about to break the rule he was born into. Keep him small in the lens.",
      stage: () => <Hero position={HIM} rotationY={SOUTH} animation="idle" face="uneasy" gaze={0} headPitch={0.04} />,
    },
    {
      cue: "1.kid",
      ...cam.orbit({ on: [HIM[0], HIM[1] + 0.95, HIM[2]], dist: 4.7, distTo: 3.8, yaw: 26, yawTo: 46, pitch: 7, fov: 42 }),
      zone: "street",
      look: "overworld-day",
      note: "He is the only one in the middle of the street, and every head in the town is turned to him. The lens circles so we see the ring of faces.",
      stage: (t) => (
        <>
          <Hero position={HIM} rotationY={SOUTH} animation="idle" face="uneasy" lookAt={FACE} headPitch={-0.02} />
          {[
            [-3.4, 0.2],
            [-1.6, -1.1],
            [2.6, -1.0],
            [4.3, 0.1],
            [-3.0, 3.4],
            [2.2, 3.6],
          ].map(([x, z], i) => (
            <Town key={i} position={[x, PLACE.wool, z]} rotationY={Math.atan2(HIM[0] - x, HIM[2] - z)} lookAt={FACE} lean={ease(ramp(t, 0.1 + i * 0.04, 0.7 + i * 0.04)) * 0.05} />
          ))}
        </>
      ),
    },
    {
      cue: "1.hiccup",
      ...cam.push({ on: [HIM[0], HIM[1] + 1.06, HIM[2]], dist: 2.3, to: 1.72, yaw: -33, pitch: -3, fov: 34 }),
      zone: "street",
      look: "overworld-day",
      note: "On 'Hiccup' his whole body jumps and the arms fly up. On 'stopped' every head in the street snaps round to him — the town's silence breaks first.",
      stage: (t) => {
        const up = ease(ramp(t, HICCUP - 0.08, HICCUP + 0.12));
        const snap = ease(ramp(t, STOPPED - 0.22, STOPPED + 0.05));
        return (
          <>
            <Hero
              position={[HIM[0] + jolt(t, HICCUP, 0.03), HIM[1] + jolt(t, HICCUP, 0.05), HIM[2]]}
              rotationY={SOUTH - 0.24}
              animation="talk"
              arms={up > 0.4 ? "reachUp" : "idle"}
              blendTo="idle"
              blend={1 - up * 0.8}
              time={t}
              face="wow"
              headPitch={-0.06 - snap * 0.1}
            />
            {[
              [-3.2, -0.4],
              [-1.2, -1.2],
              [2.9, -0.6],
              [-2.6, 3.2],
              [2.4, 3.3],
            ].map(([x, z], i) => (
              <Town key={i} position={[x, PLACE.wool, z]} rotationY={Math.atan2(HIM[0] - x, HIM[2] - z) * snap + NORTH * (1 - snap)} lean={snap * 0.06} nod={snap * 0.04} />
            ))}
            <Block position={[-1.4, PLACE.wool + 0.1, 3.5]} size={[0.5, 0.2, 0.4]} rotation={[0, 0.4, 0.2]} color="#e4dac4" roughness={1} />
          </>
        );
      },
    },
  ],
});
