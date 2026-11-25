import { cam, storyScene } from "../../engine";
import { Dad as DadFox, PLACE, RedFlower, SillCup, Teller, timing, wordAt } from "./kit";

const FlowerInMouth: React.FC = () => <RedFlower scale={0.8} rotation={[0, 0, 1.5]} />;

const RULE = wordAt("4.one", "One");
const REACH = wordAt("5.climb", "climb");

/**
 * Scene 2 — THE RULE, and the flower.
 *
 * The dad gives the family rule in one line, the lens finds the sill across the street, and the teller takes the
 * easiest thing he has ever taken. The cup is placed before it is important: it is a cup on a windowsill with a flower
 * in it, and nothing about it says present.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "One thing, nothing anybody is holding",
  shots: [
    {
      cue: "4.night",
      ...cam.push({ on: [PLACE.path[0] + 1.1, 0.95, PLACE.path[2] - 0.2], dist: 3.1, to: 2.6, yaw: 58, pitch: -2, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "The father, over the teller's shoulder, at the foot of the path: the first night on his own. Dad's head is level with the boy's window behind him — the window is in the shot before anyone says so.",
      stage: (t) => (
        <>
          <Teller position={[PLACE.path[0] + 1.1, 0, PLACE.path[2] + 0.7]} rotationY={Math.PI} animation="idle" face="brave" tailUp={0.5} time={t} />
          <DadFox position={[PLACE.path[0] + 1.15, 0, PLACE.path[2] - 1.1]} rotationY={0} animation="talk" face="calm" tailUp={0.3} time={t} headPitch={0.18} />
        </>
      ),
    },
    {
      cue: "4.one",
      ...cam.push({ on: [PLACE.path[0] + 1.1, 1.1, PLACE.path[2] - 1.0], dist: 2.5, to: 2.0, yaw: 26, pitch: -4, fov: 36 }),
      zone: "street",
      look: "overworld-night",
      note: "On the word 'One': the father's face, close, and one paw up — the whole rule in a gesture. Push in as he says it so the last word lands on his eyes.",
      stage: (t) => (
        <DadFox position={[PLACE.path[0] + 1.1, 0, PLACE.path[2] - 1.0]} rotationY={0.3} animation="point" face={t > RULE ? "calm" : "calm"} tailUp={0.25} time={t} headPitch={-0.05} />
      ),
    },
    {
      cue: "4.window",
      ...cam.push({ on: [PLACE.sill[0], 1.05, PLACE.sill[2]], dist: 4.0, to: 3.0, yaw: -14, pitch: 16, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "'Then I saw the window': crane up the wall from the teller's eyeline to the sill, so the audience finds the cup exactly when he does. The window is open a hand's width; the flower's red is the only colour.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
          <Teller position={[PLACE.sill[0], 0, PLACE.sill[2] + 2.4]} rotationY={Math.PI} animation="lookAround" face="wow" lookAt={PLACE.sill} tailUp={0.55} time={t} />
        </>
      ),
    },
    {
      cue: "4.width",
      ...cam.push({ on: [PLACE.sill[0] + 0.5, PLACE.sill[1] + 0.1, PLACE.sill[2]], dist: 1.5, to: 1.2, yaw: -22, pitch: 4, fov: 34 }),
      zone: "street",
      look: "overworld-night",
      note: "On the window itself: the gap, the sill, and the cup in it. Do not push into the room. The point is that the gap is the width of a paw and has been all night, every night.",
      stage: () => <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />,
    },
    {
      cue: "4.cup",
      ...cam.push({ on: [PLACE.sill[0] + 0.32, PLACE.sill[1] + 0.28, PLACE.sill[2] + 0.1], dist: 0.95, to: 0.72, yaw: 12, pitch: 8, fov: 30 }),
      zone: "street",
      look: "overworld-night",
      note: "'And in the cup, one red flower': the closest shot in the film, and it is only a flower in a cup. This frame is the whole promise of the film. Hold it.",
      stage: () => <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />,
    },
    {
      cue: "5.climb",
      ...cam.push({ on: [PLACE.sill[0], 1.35, PLACE.sill[2]], dist: 1.4, to: 1.05, yaw: 26, pitch: -2, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "'I didn't even have to climb': the teller's face arrives at the sill in one movement, no climb, no struggle — reachUp from the step, and he is already there. Comedy is in how little it took.",
      stage: (t) => (
        <Teller position={[PLACE.sill[0], 0, PLACE.sill[2] + 0.9]} rotationY={Math.PI} animation="reachUp" face={t > REACH ? "smile" : "uneasy"} lookAt={PLACE.sill} tailUp={0.7} time={t} />
      ),
    },
    {
      cue: "5.easy",
      ...cam.push({ on: [PLACE.sill[0], 1.42, PLACE.sill[2]], dist: 1.3, to: 1.6, yaw: -8, pitch: 2, fov: 38 }),
      zone: "street",
      look: "overworld-night",
      note: "'Easiest thing I ever took. Not a sword. A flower': the flower goes in his mouth and he is already turning away with it, casually. Pull back so the emptiness of the cup and the flower in his jaw are in one frame.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
          <Teller position={[PLACE.sill[0] + 0.55, 0, PLACE.sill[2] + 1.0]} rotationY={-0.6} animation="idle" face="grin" carry={<FlowerInMouth />} tailUp={0.65} time={t} />
        </>
      ),
    },
    {
      cue: "5.thought",
      ...cam.orbit({ on: [PLACE.sill[0] + 0.6, 1.0, PLACE.sill[2] + 1.2], dist: 1.9, distTo: 1.6, yaw: -34, yawTo: -8, pitch: 4, fov: 36 }),
      zone: "street",
      look: "overworld-night",
      note: "'I thought, this is a thing that matters': profile, the flower across his jaw, a small fox holding something that is not food for the first time. The orbit keeps the red flower on screen and the sky behind him.",
      stage: (t) => (
        <Teller position={[PLACE.sill[0] + 0.6, 0, PLACE.sill[2] + 1.2]} rotationY={-0.9} animation="idle" face="calm" carry={<FlowerInMouth />} tailUp={0.5} time={t} headPitch={0.1} />
      ),
    },
    {
      cue: "5.home",
      ...cam.truck({ on: [PLACE.sill[0] + 1.4, 0.9, PLACE.sill[2] + 2.6], by: [-3.2, 0, 0.6], dist: 4.2, yaw: 62, pitch: 6, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "'I carried it home in my mouth': track with him as he trots out of frame, the flower lit by the lamp post. This is the last happy frame in the film; make it read as a win.",
      stage: (t, { p }) => (
        <Teller position={[PLACE.sill[0] + 1.4 - 3.0 * p, 0, PLACE.sill[2] + 2.6]} rotationY={-1.6} animation="walk" animDistance={3.0 * p} face="grin" carry={<FlowerInMouth />} tailUp={0.75} time={t} />
      ),
    },
  ],
});
