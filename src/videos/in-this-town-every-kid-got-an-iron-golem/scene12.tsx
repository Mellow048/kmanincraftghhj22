import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Cinder, FaceLight, Folk, HeldUmbrella, Hero, NORTH, PLACE, ROBE, SOUTH, SatGolem, SnowGolem, Stick, Umbrella, WEST, ease, faceOf, handAt, ramp, timing, wordAt } from "./kit";

const STAND = PLACE.stand;
/** He has stepped round in front of what is left, and looks down at it. */
const ME: Vec3 = [STAND[0] + 0.1, 0, STAND[2] + 1.0];
const DOWN = wordAt("12.left", "down");

/** What is left of him: a pumpkin on a wet patch, and two sticks. */
const Left: React.FC<{ up?: number }> = ({ up = 0 }) => (
  <>
    <SnowGolem position={STAND} rotationY={0.25} snow={0} wet={1.0} armR={null} armL={null} headPitch={-up} />
    <Stick position={[STAND[0] - 0.75, 0.04, STAND[2] + 0.2]} rotation={[0, 0.5, 0]} />
    <Stick position={[STAND[0] + 0.7, 0.04, STAND[2] - 0.45]} rotation={[0, -0.9, 0]} />
  </>
);
const After = () => (
  <>
    <Cinder position={[STAND[0] - 2.6, 0, STAND[2] - 0.6]} seed={3} />
    <Cinder position={[STAND[0] - 4.4, 0, STAND[2] + 1.8]} seed={5} rotationY={1} />
    <Cinder position={[STAND[0] - 1.6, 0, STAND[2] + 2.6]} seed={8} rotationY={2} steam={0.6} />
    <Cinder position={[STAND[0] + 2.2, 0, STAND[2] - 1.9]} seed={11} rotationY={0.4} />
  </>
);

/** QUIET. The joke he made about the name, said back to him. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "A pumpkin and a puddle",
  shots: [
    {
      cue: "12.quiet",
      ...cam.push({ on: [STAND[0] - 0.2, 0.9, STAND[2] + 0.3], dist: 5.6, to: 8.4, yaw: 14, pitch: 22, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "'Then it was quiet': rise away from the square. Grey heaps steam in the road. The town stands at the edges and does not come nearer. In the middle, a boy still holds up the black ribs of an umbrella, and slowly looks down at what it is over.",
      stage: (t) => {
        const me: Vec3 = [STAND[0] + 0.6, 0, STAND[2] + 0.3];
        const drop = ease(ramp(t, 0.55, 1.2));
        return (
          <>
            <Left />
            <After />
            <Hero position={me} rotationY={-1.2} animation="reachUp" face={drop > 0.5 ? "frown" : "wow"} headYaw={0.5 * drop} headPitch={0.55 * drop} gaze={0} />
            <HeldUmbrella p={me} rotY={-1.2} up={1} open={1} burn={1} flame={false} />
            <FaceLight position={[STAND[0] - 0.6, 2.6, STAND[2] + 2.6]} power={12} reach={9} />
            <Folk spots={[[STAND[0] - 3.6, STAND[2] - 2.4, 1.0, ROBE.brown], [STAND[0] + 2.6, STAND[2] + 2.9, -2.4, ROBE.white], [STAND[0] - 2.4, STAND[2] + 4.2, 2.6, ROBE.farmer], [STAND[0] + 3.3, STAND[2] - 0.2, WEST, ROBE.friend, true]]} at={[STAND[0], 0.6, STAND[2]]} />
            <SatGolem position={[STAND[0] - 5.4, 0, STAND[2] + 0.4]} rotationY={1.3} droop={0.5} />
          </>
        );
      },
    },
    {
      cue: "12.left",
      ...cam.top({ on: [STAND[0], 0.1, STAND[2] + 0.25], height: 3.7, to: 2.9, spin: [9, -3], fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'I looked down. There was a pumpkin, and a puddle': what he sees, from straight above. Wet stone, two sticks, and the pumpkin lying in the middle of the water with its face turned up at him.",
      stage: (t) => (
        <>
          <Left up={1.25} />
          <Hero position={ME} rotationY={NORTH} animation="idle" face="frown" headPitch={0.6 * ease(ramp(t, 0, DOWN + 0.2))} />
          <FaceLight position={[STAND[0] - 0.8, 1.6, STAND[2] + 0.4]} power={7} />
        </>
      ),
    },
    {
      cue: "12.name",
      ...cam.push({ on: faceOf(ME), dist: 2.2, to: 1.75, yaw: 168, pitch: -17, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "'I had named him that as a joke': the boy's face, from down where the pumpkin is, looking up at him as he looks down at it.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="frown" headPitch={0.4 + 0.18 * ease(ramp(t, 0.7, 1.1))} saccade={false} gaze={0} />
          <FaceLight position={[ME[0] - 0.7, 0.9, ME[2] - 1.3]} power={5} reach={4} />
          <Folk spots={[[ME[0] - 1.9, ME[2] + 2.6, NORTH, ROBE.white], [ME[0] + 1.7, ME[2] + 3.2, NORTH, ROBE.brown]]} at={[STAND[0], 0.6, STAND[2]]} />
        </>
      ),
    },
  ],
});
void SOUTH;
