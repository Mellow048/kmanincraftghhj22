import { Block, cam, storyScene } from "../../engine";
import { Hero, HungBell, NORTH, PLACE, SOUTH, SubscribeSign, ThingBelow, ease, ramp, timing, wordAt } from "./kit";
import { BELOW, TOWER, WOOL } from "./marks";

const ANSWER = wordAt("14.answer", "answer");
const GAP: [number, number, number] = [PLACE.tower[0] - 1.2, TOWER.floorTop, PLACE.tower[2] - 1.2];

/**
 * THE BUTTON. First the callback: the bell above, the gap in the floor, and one teal eye opening under it — the town
 * is not alone down there and the last spoken line is an invitation, not a warning. Then the sign, on the subscribe
 * line, planted in the wool like every other lesson in this town.
 */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "Answer it back",
  shots: [
    {
      cue: "14.answer",
      ...cam.push({ on: [PLACE.tower[0] - 0.6, PLACE.towerIn + 0.4, PLACE.tower[2] - 0.4], dist: 4.6, to: 3.6, yaw: -10, pitch: -12, fov: 42 }),
      zone: "tower",
      look: "overworld-night",
      note: "The bell above, the gap in the floor below, and on 'answer' one teal eye opening in the dark under the boards: the town's answer, still there, still listening.",
      stage: (t) => {
        const back = ease(ramp(t, ANSWER - 0.5, ANSWER + 0.4));
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={0.09 * Math.sin(t * 2.4)} />
            <Block position={[GAP[0], GAP[1] + 0.04, GAP[2]]} size={[1.5, 0.05, 1.2]} color="#08080a" />
            <Block position={[GAP[0], GAP[1] - 0.06, GAP[2]]} size={[1.4, 0.06, 1.1]} color="#8ef2de" emissive="#4fd8c0" emissiveIntensity={1.2 + back * 2.6} opacity={0.25 + back * 0.7} transparent />
            <Block position={[GAP[0] - 0.2, GAP[1] - 0.7, GAP[2] - 0.1]} size={[0.9, 0.7, 0.5]} color="#8ef2de" emissive="#4fd8c0" emissiveIntensity={0.8 * back} opacity={0.06 + back * 0.5} transparent />
            <ThingBelow at={[BELOW.at[0], -9.4, BELOW.at[2]]} awake={back * 0.5} t={t} />
          </>
        );
      },
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [PLACE.towerFoot[0], WOOL + 1.0, PLACE.towerFoot[2] - 0.4], dist: 3.6, to: 2.9, yaw: 8, pitch: 4, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "The sign, on the subscribe line, planted in the wool in front of the tower with the kid's shoulder in frame: the joke stays inside the film's own world, a board in a town of boards.",
      stage: () => (
        <>
          <SubscribeSign position={[PLACE.towerFoot[0] - 0.2, WOOL + 0.02, PLACE.towerFoot[2] - 0.5]} rotationY={NORTH} scale={0.42} tilt={Math.sin(0.4) * 0.02} />
          <Hero position={[PLACE.towerFoot[0] - 1.3, WOOL, PLACE.towerFoot[2] + 0.2]} rotationY={SOUTH + 0.3} animation="idle" face="grin" />
          <Block position={[PLACE.towerFoot[0] + 0.6, WOOL + 0.1, PLACE.towerFoot[2] - 0.2]} size={[0.5, 0.2, 0.4]} rotation={[0, 0.6, 0]} color="#e8dfc9" roughness={1} />
        </>
      ),
    },
  ],
});
