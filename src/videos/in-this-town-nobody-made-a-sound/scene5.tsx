import { Block, cam, storyScene } from "../../engine";
import { EAST, Hero, NORTH, PLACE, SOUTH, Town, WEST, ease, ramp, timing, wordAt } from "./kit";
import { WOOL } from "./marks";

const HIM = PLACE.kid;
const CAREFUL = wordAt("5.sorry", "careful");
const HATE = wordAt("5.hate", "hated");

/** The town stepping around him, the way you step around something broken. */
const Around = ({ t }: { t: number }) => (
  <>
    {[
      [-2.9, -0.9, EAST, 1.2],
      [3.4, -0.8, WEST, 1.6],
      [-1.1, 2.9, NORTH, 0.9],
      [2.1, 3.1, NORTH + 0.3, 1.4],
    ].map(([x, z, rot, speed], i) => (
      <Town key={i} position={[x + Math.sin(t * 0.7 + i) * 0.1, WOOL, z]} rotationY={(rot as number) + 0.1 * Math.sin(t + i)} walk={t * (speed as number) * 0.35} nod={0.12} />
    ))}
  </>
);

/**
 * WHAT HE THOUGHT IT WAS. He believes the town is quiet for his sake — and the picture agrees with him: everybody
 * tiptoeing, a blanket brought for his head, and a chest he has started to hate. This is the belief the ending
 * takes away from him.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "I thought it was for me",
  shots: [
    {
      cue: "5.think",
      ...cam.orbit({ on: [HIM[0], WOOL + 0.55, HIM[2]], dist: 5.4, distTo: 4.4, yaw: 34, yawTo: 20, pitch: 16, fov: 44 }),
      zone: "street",
      look: "overworld-day",
      note: "He is still on the wool and the whole street is walking around the space he takes up, like water round a stone. Their care looks exactly like a town avoiding him.",
      stage: (t) => (
        <>
          <Hero position={[HIM[0], WOOL, HIM[2]]} rotationY={WEST + 0.5} animation="lie" time={t} face="sad" breath={1.6} />
          <Around t={t} />
        </>
      ),
    },
    {
      cue: "5.sorry",
      ...cam.push({ on: [HIM[0], WOOL + 0.5, HIM[2]], dist: 2.7, to: 2.1, yaw: -12, pitch: 11, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "One villager kneels over him and lays a folded piece of wool under his head — the kindest thing in the film, and on his face it lands as pity. On 'careful' she stops moving.",
      stage: (t) => {
        const fold = ease(ramp(t, CAREFUL - 0.6, CAREFUL + 0.1));
        return (
          <>
            <Hero position={[HIM[0], WOOL, HIM[2]]} rotationY={WEST + 0.5} animation="lie" time={t} face="sad" gaze={0} />
            <Town position={[HIM[0] + 0.9, WOOL, HIM[2] + 0.5]} rotationY={SOUTH - 0.4} lean={0.55} nod={0.3} strain={0.3} />
            <Block position={[HIM[0] + 0.35, WOOL + 0.16 + fold * 0.06, HIM[2] + 0.3]} size={[0.6, 0.16, 0.44]} rotation={[0.1, 0.3, 0]} color="#f2ebd8" roughness={1} />
          </>
        );
      },
    },
    {
      cue: "5.hate",
      ...cam.push({ on: [HIM[0], WOOL + 0.7, HIM[2]], dist: 2.2, to: 1.55, yaw: 6, pitch: 18, fov: 34 }),
      zone: "street",
      look: "overworld-day",
      note: "Straight down on him: both hands come up over his own chest on 'hated', and press, as if he could hold the next one in. The one place in the film where he is angry at himself.",
      stage: (t) => {
        const press = ease(ramp(t, HATE - 0.2, HATE + 0.3));
        return (
          <>
            <Hero
              position={[HIM[0], WOOL, HIM[2]]}
              rotationY={WEST + 0.5}
              animation="lie"
              arms={press > 0.3 ? "reach" : "idle"}
              time={t}
              face={press > 0.4 ? "angry" : "sad"}
              headPitch={0.1}
              breath={1.2 + press}
            />
            <Block position={[HIM[0] + 0.9, WOOL + 0.2, HIM[2] + 0.7]} size={[0.7, 0.2, 0.5]} color="#f2ebd8" roughness={1} />
            <Town position={[HIM[0] - 2.6, WOOL, HIM[2] - 0.4]} rotationY={EAST} nod={0.2} />
            <Town position={[HIM[0] + 2.9, WOOL, HIM[2] + 0.9]} rotationY={NORTH} />
          </>
        );
      },
    },
  ],
});
