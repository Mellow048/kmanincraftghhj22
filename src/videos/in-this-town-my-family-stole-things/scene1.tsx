import { Block, cam, storyScene } from "../../engine";
import { Berries, CookedChicken, Fox, PLACE, SillCup, Sword, timing, wordAt } from "./kit";

const B = wordAt("1.back", "buying");
const GIFT = wordAt("1.gift", "stole");

/**
 * Scene 1 — THE HOOK, done in seven seconds.
 *
 * Four pictures and four lines: three foxes on a roof with what they took; a sill with a berry on it; a berry sitting
 * where a thing used to be; and the same sill with a red flower on it and the teller's nose an inch away.
 *
 * Every prop is ordinary before it is evidence. Nothing here explains; every line plants.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My family stole things",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [-31.05, 0.95, 1.0], dist: 7.6, to: 7.0, yaw: 8, pitch: 0, fov: 44 }),
      zone: "street",
      look: "overworld-sunset",
      note: "Three foxes in a row on the grass at the west edge of town, at night, tight enough that all three read in the 9:16 slit: the father with a sword lying across his jaw, the sister with a whole cooked chicken, and the smallest one at the end with nothing but his paws. The sword is a straight line, the chicken a fat one, the cub the smallest shape. Nothing moves but three heads turning together.",
      stage: () => (
        <>
          <Fox who={1} position={[-31.9, 0, 1.0]} rotationY={-0.210} scale={0.72} animation="idle" shirt="#3a4f8a" carry={<Sword scale={0.5} rotation={[0, 0, 1.4]} />} tailUp={0.6} face="calm" />
          <Fox who={2} position={[-31.05, 0, 0.95]} rotationY={-0.210} scale={0.62} animation="idle" shirt="#7a5a2a" carry={<CookedChicken scale={0.7} />} tailUp={0.4} face="smile" />
          <Fox who={0} position={[-30.2, 0, 1.0]} rotationY={-0.210} scale={0.58} animation="idle" shirt="#2f6f5a" tailUp={0.25} face="uneasy" />
        </>
      ),
    },
    {
      cue: "1.night",
      ...cam.push({ on: [-9.1, 1.4, -4.85], dist: 2.2, to: 1.85, yaw: 8, pitch: 4, fov: 38 }),
      zone: "street",
      look: "overworld-sunset",
      note: "The sill, close: the cup, and one berry sitting in it where a flower would go. A fox's paws arrive on the sill edge from below on 'berries' — somebody has done this before.",
      stage: (t) => {
        const at = wordAt("1.night", "berries");
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.1]} berry t={t} />
            <Fox who={0} position={[-8.95, 0, -3.5]} rotationY={-0.210} scale={0.62} animation="reachUp" shirt="#2f6f5a" tailUp={0.6} face={t > at ? "smile" : "uneasy"} time={t} />
          </>
        );
      },
    },
    {
      cue: "1.back",
      ...cam.push({ on: [-9.1, 1.35, -4.85], dist: 1.9, to: 1.6, yaw: -26, pitch: 6, fov: 36 }),
      zone: "street",
      look: "overworld-sunset",
      note: "Over the sill into the boy's dark room, on the word 'buying': one berry, lit, on the boards, and on the floor just inside the window the empty dust outline where a thing used to be — a small rectangle with a clear space around it. The trade, as a diagram, with no one in it.",
      stage: () => (
        <>
          <SillCup position={[PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.12]} berry />
          {/* the empty place on the boards: a dust outline, a clear rectangle, and one berry left on it */}
          <group position={[PLACE.sill[0] + 0.9, 0.02, PLACE.sill[2] - 1.1]}>
            <Block position={[0, 0.01, 0]} size={[0.34, 0.02, 0.24]} color="#5a4630" castShadow={false} />
            <Block position={[0, 0.004, 0]} size={[0.42, 0.02, 0.32]} color="#3f3022" castShadow={false} />
          </group>
        </>
      ),
    },
    {
      cue: "1.gift",
      ...cam.push({ on: [-9.1, 1.3, -4.85], dist: 2.3, to: 2.0, yaw: 40, pitch: 6, fov: 36 }),
      zone: "street",
      look: "overworld-sunset",
      note: "On 'gift': the same sill, and now the cup has a red flower in it and the teller's nose is an inch from it. He is not sneaking in this shot. He is looking at it. Hold the flower in frame the whole move: it is the only red in the film's first seven seconds.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.12]} flower />
          <Fox who={0} position={[-8.95, 0, -3.55]} scale={0.66} animation="reachUp" face={t > GIFT ? "wow" : "uneasy"} lookAt={PLACE.sill} time={t} tailUp={0.6} />
        </>
      ),
    },
    {
      cue: "2.why",
      ...cam.push({ on: [-9.1, 1.44, -4.85], dist: 2.0, to: 1.7, yaw: 2, pitch: 16, fov: 42 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'Here's how he did it': straight down onto the sill, where the two halves of the trade sit side by side — the cup and the berries. No fox, no boy, nobody's face. The system, laid out on a shelf.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] - 0.28, PLACE.sill[1], PLACE.sill[2] + 0.08]} />
          <Berries position={[PLACE.sill[0] + 0.34, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.2} count={7} t={t} />
        </>
      ),
    },
    {
      cue: "2.carry",
      ...cam.push({ on: [-8.6, 0.7, -2.9], dist: 2.6, to: 2.2, yaw: -18, pitch: 2, fov: 40 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'We carry one thing in our mouth, and if we find food we drop it to eat': a fox with a berry in its jaw, made to look like an ordinary fox thing to do, at ground level. This is the rule the whole ending runs on, so it is taught as a joke about being an animal.",
      stage: (t) => (
        <Fox who={3} position={[-8.6, 0, -2.9]} rotationY={-0.664} scale={0.6} animation="hold" shirt="#4a3f6a" carry={<Berries scale={0.7} count={2} />} tailUp={0.4} face="calm" time={t} />
      ),
    },
    {
      cue: "2.worked",
      ...cam.push({ on: [-9.1, 1.44, -4.85], dist: 2.1, to: 1.8, yaw: -6, pitch: 18, fov: 40 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'He worked that out. He left food, we left the thing': back on the sill, top down, and the cup has a berry in it while the berries sit beside it. The swap, made visible in one frame, before the audience has been told what it means.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] - 0.28, PLACE.sill[1], PLACE.sill[2] + 0.08]} berry t={t} />
          <Berries position={[PLACE.sill[0] + 0.34, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.1} count={5} t={t} />
        </>
      ),
    },
    {
      cue: "3.dad",
      ...cam.push({ on: [-9.9, 0.8, -2.4], dist: 4.2, to: 3.7, yaw: -24, pitch: 2, fov: 44 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'My dad took a sword once. My sister took a whole cooked chicken': the two of them walking away up the dark street with the loot in their jaws, backs to the lens, no shame in it. The joke is in the walk, so give them room to strut.",
      stage: (t, { p }) => (
        <>
          <Fox who={1} position={[-9.9 - 1.4 * p, 0, -2.6]} rotationY={-1.571} scale={0.72} animation="walk" animDistance={1.4 * p} shirt="#3a4f8a" carry={<Sword scale={0.5} rotation={[0, 0, 1.4]} />} tailUp={0.6} face="calm" time={t} />
          <Fox who={2} position={[-9.1 - 1.4 * p, 0, -2.4]} rotationY={-1.571} scale={0.62} animation="walk" animDistance={1.4 * p} shirt="#7a5a2a" carry={<CookedChicken scale={0.7} />} tailUp={0.45} face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "3.me",
      ...cam.push({ on: [-10.4, 0.75, -3.2], dist: 2.6, to: 2.2, yaw: 32, pitch: 0, fov: 40 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'I was the worst thief we ever had': the smallest one, alone, at the very back of the two of them, and framed low so he is a head shorter than the whole town. This is the joke the film is built on, and it has to land in one image with no gesture at all.",
      stage: (t) => (
        <Fox who={0} position={[-10.4, 0, -3.2]} rotationY={0.209} scale={0.58} animation="idle" shirt="#2f6f5a" face="ouch" tailUp={0.15} time={t} headPitch={-0.12} />
      ),
    },
    {
      cue: "3.flower",
      ...cam.push({ on: [-9.1, 1.42, -4.85], dist: 2.0, to: 1.6, yaw: 10, pitch: 6, fov: 38 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'So one night I took a red flower off his sill': the push does all the work — from the whole window down to the cup, and the flower is the last thing to fill the frame. Nobody in this shot. The film's title promise, delivered as an object.",
      stage: () => <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />,
    },
  ],
});
