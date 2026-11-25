import { cam, storyScene } from "../../engine";
import { Berries, DogVillager, IronGolem, PLACE, RedFlower, SillCup, Teller, timing, wordAt } from "./kit";

const TURN = wordAt("8.turn", "turned");
const RAN = wordAt("8.ran", "ran");
const DROP = wordAt("9.drop", "dropped");

/**
 * Scene 4 — DAYLIGHT. The try, and the failure.
 *
 * He goes back in the day, which is the wrong thing to do, and every dog in town knows it. The golem turns, he runs,
 * and the day is spent. Then the berries are on the sill and he does what a fox does: he drops the flower to eat.
 *
 * The failure has to cost him something visible: the flower goes in the mud, and he leaves with nothing.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A fox in a village at noon",
  shots: [
    {
      cue: "8.walk",
      ...cam.push({ on: [-8.5, 0.8, -1.8], dist: 3.5, to: 3.2, yaw: 74, pitch: 2, fov: 44 }),
      zone: "street",
      look: "overworld-day",
      note: "'So I went back in the day': tracking beside him as he walks up the middle of the empty street in full sun, flower in his jaw, ears already back. The street is too bright and too open. That is the threat.",
      stage: (t, { p }) => (
        <Teller position={[PLACE.path[0] + 2.5 - 1.6 * p, 0, PLACE.path[2] + 0.4]} rotationY={-1.571} animation="walk" animDistance={1.6 * p} face="brave" ears={0.7} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} tailUp={0.1} time={t} />
      ),
    },
    {
      cue: "8.dogs",
      ...cam.push({ on: [-9.0, 0.62, -1.4], dist: 2.4, to: 2.0, yaw: -18, pitch: 0, fov: 48 }),
      zone: "street",
      look: "overworld-day",
      note: "'Every dog in that town knew before I did': a dog, up on its feet, ears up, looking straight past the lens at him. Low and close so the audience is on the fox's side of the bark.",
      stage: (t) => (
        <>
          <DogVillager who={1} position={[PLACE.path[0] + 3.4, 0, PLACE.path[2] + 1.5]} rotationY={-0.664} scale={0.82} bark={1} tailUp={0.2} lookAt={[PLACE.path[0] + 2.2, 0.5, PLACE.path[2] - 0.2]} />
          <Teller position={[PLACE.path[0] + 2.2, 0, PLACE.path[2] - 0.2]} rotationY={-0.664} animation="idle" face="fear" ears={1} tailUp={0} time={t} />
        </>
      ),
    },
    {
      cue: "8.turn",
      ...cam.push({ on: [-10.0, 1.25, -2.2], dist: 5.2, to: 4.3, yaw: 46, pitch: 8, fov: 46 }),
      zone: "street",
      look: "overworld-day",
      note: "On 'turned round': the golem on the path rotates to face him, and the crane up makes it double in height in one move. Halfway up the path is where he stops, and the audience should feel the exact inch of it.",
      stage: (t) => (
        <>
          <IronGolem position={[PLACE.path[0] - 0.2, 0, PLACE.path[2] - 1.6]} rotationY={0.453} armR={-0.5} armL={-0.4} headPitch={0.4} />
          <Teller position={[PLACE.path[0] + 1.5, 0, PLACE.path[2] + 0.6]} rotationY={0.453} animation="idle" face={t > TURN ? "fear" : "brave"} ears={t > TURN ? 1 : 0.5} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} tailUp={0.05} time={t} />
        </>
      ),
    },
    {
      cue: "8.ran",
      ...cam.push({ on: [-7.8, 0.7, -1.2], dist: 3.6, to: 3.6, yaw: 82, pitch: 2, fov: 46 }),
      zone: "street",
      look: "overworld-day",
      note: "'So I ran with the flower still in my mouth': low and beside him at a full run, ears flat, the flower a red streak. Fast. This is the one shot in the film that should feel like a chase.",
      stage: (t, { p }) => (
        <Teller position={[PLACE.path[0] + 4.2 - 2.4 * p, 0, PLACE.path[2] + 1.4]} rotationY={-1.571} animation="run" animDistance={2.4 * p} face={t > RAN ? "fear" : "fear"} ears={1} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} tailUp={0.8} time={t} />
      ),
    },
    {
      cue: "9.night",
      ...cam.push({ on: [-9.1, 1.46, -4.85], dist: 2.3, to: 1.9, yaw: 4, pitch: 4, fov: 40 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'That night there were berries on the sill': the cup gone, and the pile of berries in its place. The berries were never a symbol; they are food, and they are enough for a fox.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
          <Berries position={[PLACE.sill[0] - 0.1, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.25} count={9} t={t} />
        </>
      ),
    },
    {
      cue: "9.drop",
      ...cam.push({ on: [-9.0, 1.36, -4.7], dist: 1.8, to: 1.5, yaw: -12, pitch: 4, fov: 34 }),
      zone: "street",
      look: "overworld-sunset",
      note: "On 'dropped': the flower leaves his jaw and lands on the sill, next to the berries. One movement, no cut. The drop is the engine of the film, so give it the only unhurried frame in the chase.",
      stage: (t) => {
        const k = Math.min(1, Math.max(0, (t - DROP + 0.12) / 0.3));
        return (
          <>
            <Berries position={[PLACE.sill[0] - 0.28, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.2} count={9} t={t} />
            <RedFlower position={[PLACE.sill[0] + 0.16, PLACE.sill[1] + 0.12 - 0.1 * k, PLACE.sill[2] + 0.24 + 0.1 * k]} scale={0.8} rotation={[0, 0, 1.5 + 1.2 * k]} />
            <Teller position={[PLACE.sill[0] + 0.4, 0, PLACE.sill[2] + 1.1]} rotationY={-0.559} animation={k < 1 ? "hold" : "idle"} face="calm" tailUp={0.45} time={t} />
          </>
        );
      },
    },
    {
      cue: "9.ate",
      ...cam.push({ on: [-9.1, 1.4, -4.85], dist: 1.5, to: 1.3, yaw: 16, pitch: 2, fov: 32 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'Because of course I ate them': his jaw working through the pile, the flower on the sill behind him, forgotten, still red. The joke and the damage in one frame, and the audience should laugh and then feel it.",
      stage: (t) => (
        <>
          <Berries position={[PLACE.sill[0] - 0.2, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.1]} scale={1.1} count={4} t={t} />
          <RedFlower position={[PLACE.sill[0] + 0.5, PLACE.sill[1] + 0.1, PLACE.sill[2] + 0.3]} scale={0.8} rotation={[0, 0, 2.6]} wilt={0.4} />
          <Teller position={[PLACE.sill[0] - 0.2, 0, PLACE.sill[2] + 1.0]} rotationY={-0.071} animation="hold" face="laugh" carry={<Berries scale={0.8} count={3} t={t} />} tailUp={0.55} time={t} />
        </>
      ),
    },
    {
      cue: "9.nothing",
      ...cam.push({ on: [-9.3, 0.9, -3.9], dist: 3.4, to: 3.0, yaw: 30, pitch: 4, fov: 44 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'Then I went home with nothing at all': wide, from behind him, walking away from the house with the sill still in frame — the flower on it, the cup empty, the window open a hand's width. He has failed, and the picture has to say so without a word.",
      stage: (t, { p }) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
          <RedFlower position={[PLACE.sill[0] + 0.5, PLACE.sill[1] + 0.1, PLACE.sill[2] + 0.3]} scale={0.8} rotation={[0, 0, 2.6]} wilt={0.5} />
          <Teller position={[PLACE.sill[0] - 0.1, 0, PLACE.sill[2] + 1.1 + 2.2 * p]} rotationY={-1.571} animation="walk" animDistance={2.2 * p} face="frown" tailUp={0.05} time={t} />
        </>
      ),
    },
  ],
});
