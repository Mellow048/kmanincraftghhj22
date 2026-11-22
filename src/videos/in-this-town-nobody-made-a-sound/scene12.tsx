import { Block, cam, storyScene } from "../../engine";
import { Hero, PLACE, ThingBelow, Town, NORTH, ease, ramp, timing, wordAt } from "./kit";
import { BELOW, WOOL } from "./marks";

const NOT = wordAt("12.not", "angry");
const LONELY = wordAt("12.lonely", "Lonely");
const STILL = wordAt("12.still", "still");

/**
 * THE REVEAL, AS A PICTURE AND A SILENCE. What is under the town is not a mouth with teeth: it is a huge soft thing
 * that was listening for the town and had stopped hearing it. Three shots in the dark, then the town above, standing.
 */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "It answered",
  shots: [
    {
      cue: "12.low",
      ...cam.push({ on: [BELOW.at[0], 2.6, BELOW.at[2] + 1], dist: 15.5, to: 12.6, yaw: 3, pitch: 9, fov: 42 }),
      zone: "below",
      look: "overworld-night",
      note: "A low note, and the dark room under the town begins to have a shape in it: a mass the size of six houses, breathing. The lens comes in at the height of a child, not a hero.",
      stage: (t) => <ThingBelow at={BELOW.at} awake={0.55} t={t} />,
    },
    {
      cue: "12.not",
      ...cam.push({ on: [BELOW.at[0] - 2.3, 3.1, BELOW.at[2] + 4.1], dist: 3.6, to: 2.7, yaw: -8, pitch: 2, fov: 34 }),
      zone: "below",
      look: "overworld-night",
      note: "One eye, opening, with no anger in it at all. This is the shot that decides what the film is: 'not angry' has to read on a single square of light.",
      stage: (t) => {
        const open = ease(ramp(t, NOT - 0.2, NOT + 0.2));
        return <ThingBelow at={BELOW.at} awake={0.62 + open * 0.3} t={t} />;
      },
    },
    {
      cue: "12.lonely",
      ...cam.push({ on: [BELOW.at[0], 2.9, BELOW.at[2] - 1], dist: 22.5, to: 19.0, yaw: 0, pitch: 14, fov: 46 }),
      zone: "below",
      look: "overworld-night",
      note: "And then all of it: one thing the size of the town, alone on a floor of dark, with wool hanging over it like a ceiling of the people it was listening for. On 'Lonely' nobody speaks in the room.",
      stage: (t) => {
        const long = ease(ramp(t, LONELY - 0.1, LONELY + 0.2));
        return (
          <>
            <ThingBelow at={BELOW.at} awake={0.92 + long * 0.04} t={t} />
            <Block position={[BELOW.at[0] + 11, 0.3, BELOW.at[2] + 8]} size={[2.2, 0.6, 2.2]} color="#3a332a" roughness={1} />
            <Block position={[BELOW.at[0] - 12, 0.4, BELOW.at[2] + 6]} size={[2.6, 0.8, 2.4]} color="#3a332a" roughness={1} />
          </>
        );
      },
    },
    {
      cue: "12.still",
      ...cam.push({ on: [0, 1.4, 4.4], dist: 6.6, to: 5.4, yaw: -8, pitch: 8, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "Up in the street: the whole town out of its blankets, standing in the wool in the dark, looking down at the ground it stands on. On 'still' nobody moves — the one time they are all together.",
      stage: (t) => {
        const out = ease(ramp(t, STILL - 0.5, STILL + 0.3));
        return (
          <>
            {[
              [-6.8, 1.2],
              [-4.4, 2.6],
              [-1.9, 1.0],
              [1.6, 2.2],
              [4.2, 1.1],
              [6.8, 2.4],
              [-2.9, 4.0],
              [3.1, 4.2],
            ].map(([x, z], i) => (
              <Town key={i} position={[x, WOOL, z]} rotationY={NORTH + 0.2 * Math.sin(i)} nod={0.46 * out + 0.02} lean={0.04 * out} />
            ))}
            <Hero position={[PLACE.tower[0] - 1.4, WOOL, PLACE.tower[2] + 3.4]} rotationY={NORTH + 0.6} animation="idle" time={t} face="uneasy" headPitch={0.3} />
          </>
        );
      },
    },
  ],
});
