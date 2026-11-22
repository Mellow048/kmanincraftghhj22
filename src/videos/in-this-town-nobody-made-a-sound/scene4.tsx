import { Block, cam, storyScene } from "../../engine";
import { EAST, Hero, NORTH, PLACE, Town, WEST, ease, jolt, ramp, timing, wordAt } from "./kit";
import { WOOL } from "./marks";

const HIM = PLACE.kid;
const BREATH = wordAt("4.try", "breath");
const BLUE = wordAt("4.bad", "blue");
const OVER = wordAt("4.bad", "over");
const AGAIN = wordAt("4.again", "hiccupped");

/**
 * THE ONLY SOUND IN TOWN. He tries to hold it in, turns blue doing it, goes over in the wool, and hiccups again
 * from the floor. The joke and the wound are the same shot: it is funny and it is his whole life.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The only sound",
  shots: [
    {
      cue: "4.only",
      ...cam.orbit({ on: [HIM[0], HIM[1] + 0.7, HIM[2]], dist: 8.2, distTo: 7.0, yaw: -26, yawTo: -14, pitch: 13, fov: 46 }),
      zone: "street",
      look: "overworld-day",
      note: "From up and behind: one small kid in the middle of a wide wool street, and every door shut around him. The lens drifts in on the emptiness.",
      stage: (t) => (
        <>
          <Hero position={HIM} rotationY={EAST} animation="idle" time={t} face="uneasy" weightShift={0.6} />
          <Town position={[-7.5, WOOL, -1.2]} rotationY={NORTH} lean={0} />
          <Town position={[7.8, WOOL, 0.6]} rotationY={NORTH + 0.2} />
          <Block position={[1.9, WOOL + 0.06, 4.1]} size={[0.9, 0.12, 0.7]} rotation={[0, 0.3, 0]} color="#e4dac4" roughness={1} />
        </>
      ),
    },
    {
      cue: "4.try",
      ...cam.push({ on: [HIM[0], HIM[1] + 1.2, HIM[2]], dist: 1.5, to: 1.16, yaw: 10, pitch: 0, fov: 32 }),
      zone: "street",
      look: "overworld-day",
      note: "His face, holding it in: cheeks full, eyes wide, mouth shut tight on the word 'breath'. The lens is close enough to see the strain in the eyes.",
      stage: (t) => {
        const held = ease(ramp(t, BREATH - 0.5, BREATH + 0.1));
        return <Hero position={HIM} rotationY={EAST - 0.1} animation="idle" time={t} face={held > 0.4 ? "dizzy" : "uneasy"} breath={1 + held * 2.4} headPitch={0.02 + held * 0.05} />;
      },
    },
    {
      cue: "4.bad",
      ...cam.push({ on: [HIM[0], HIM[1] + 0.9, HIM[2]], dist: 3.1, to: 2.5, yaw: -18, pitch: 6, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "He turns a colour no kid should turn, then goes over sideways into the wool on 'over'. Keep both the colour and the fall in one frame — it is one gag.",
      stage: (t) => {
        const blue = ease(ramp(t, BLUE - 0.1, BLUE + 0.25));
        const down = ease(ramp(t, OVER - 0.34, OVER + 0.16));
        return (
          <Hero
            position={[HIM[0], HIM[1] - down * 0.02, HIM[2]]}
            rotationY={EAST - down * 0.5}
            animation={down > 0.5 ? "collapse" : "idle"}
            blendTo="idle"
            blend={1 - down}
            time={t + 0.4}
            skin={blue > 0.5 ? "#7fb6c9" : "#e0b189"}
            face={down > 0.6 ? "dizzy" : "ouch"}
            breath={1 + blue * 2}
            plantFeet={false}
          />
        );
      },
    },
    {
      cue: "4.again",
      ...cam.push({ on: [HIM[0], WOOL + 0.3, HIM[2] + 0.1], dist: 2.4, to: 1.8, yaw: 40, pitch: -8, fov: 38 }),
      zone: "street",
      look: "overworld-day",
      note: "From the floor, almost in the wool: he is down, and on 'hiccupped' the little jolt goes through him again. The wool takes it. The lens does not blink.",
      stage: (t) => (
        <>
          <Hero
            position={[HIM[0], WOOL + jolt(t, AGAIN, 0.03), HIM[2]]}
            rotationY={WEST + 0.6}
            animation="lie"
            time={t}
            face="uneasy"
            breath={2}
          />
          <Block position={[HIM[0] - 1.5, WOOL + 0.04, HIM[2] + 0.5]} size={[1.8, 0.08, 1.4]} color="#e8dfc9" roughness={1} />
        </>
      ),
    },
  ],
});
