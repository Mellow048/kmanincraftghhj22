import { cam, storyScene, stride } from "../../engine";
import { CHILD, Hero, IronGolem, NORTH, PLACE, ROBE, SOUTH, Villager, golemHand, timing } from "./kit";

const POST = PLACE.post;

/** THE ITCH. He likes it here. That is why the question costs something. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The itch",
  shots: [
    {
      cue: "4.good",
      ...cam.push({ on: [1.35, 1.3, 3.3], dist: 3.0, to: 4.0, yaw: -33, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'It was a good life': he smiles at us and the camera pulls back to show why. The golem, the flower, the children, the neighbours going by.",
      stage: (t, { p }) => (
        <>
          <Hero position={[0.55, 0, 4.6]} rotationY={-0.58} animation="idle" face="smile" gaze={0} />
          <IronGolem position={POST} rotationY={SOUTH} bow={0.42} armR={-0.92} headPitch={0.35} flower />
          <Villager position={[3.52, 0, 2.95]} rotationY={NORTH} scale={CHILD} kid robe={ROBE.friend} lookAt={golemHand(POST, SOUTH, -0.92)} phase={1.1} />
          <Villager {...stride([-2.6, 0, 1.4], [-0.9, 0, 1.2], p)} walk={t * 1.15} robe={ROBE.farmer} hat="straw" phase={2.7} />
        </>
      ),
    },
    {
      cue: "4.why",
      ...cam.push({ on: [0.55, 0.88, 4.85], dist: 1.9, to: 1.55, yaw: 12, pitch: 30, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Why was I different?': from above, he holds both hands out and looks down at them. The hands are the question.",
      stage: () => <Hero position={[0.55, 0, 4.6]} animation="hold" face="frown" headPitch={0.3} saccade={false} />,
    },
  ],
});
