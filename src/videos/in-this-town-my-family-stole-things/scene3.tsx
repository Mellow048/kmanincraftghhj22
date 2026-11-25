import { cam, storyScene } from "../../engine";
import { Boy, CookedChicken, IronGolem, PLACE, RedFlower, SillCup, Sister, Teller, timing, wordAt } from "./kit";

const SIT = wordAt("6.cried", "sat");
const GAVE = wordAt("6.gave", "gave");
const SAID = wordAt("7.said", "took");

/**
 * Scene 3 — THE MORNING. The cost, and the sister's verdict.
 *
 * The boy finds the cup empty and sits on his own step. The golem arrives, and the golem's empty hand is where the
 * audience works out what the flower was. Then the sister turns up with a whole chicken in her mouth, which is the
 * joke, and says the only thing in the film that is an actual rule.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "He sat on the step and cried",
  shots: [
    {
      cue: "6.hedge",
      ...cam.push({ on: [-9.5, 0.85, 0.4], dist: 2.6, to: 2.2, yaw: 4, pitch: 2, fov: 42 }),
      zone: "street",
      look: "overworld-day",
      note: "'In the morning I watched the house from the hedge': the teller's head low in the hedge in the foreground, the boy's house small behind him across the street. Fear is a low camera: put the lens under his chin.",
      stage: (t) => (
        <Teller position={[PLACE.hedge[0], 0, PLACE.hedge[2]]} rotationY={-0.280} animation="peek" face="uneasy" lookAt={[PLACE.step[0], 1.1, PLACE.step[2]]} tailUp={0.15} time={t} headPitch={-0.2} />
      ),
    },
    {
      cue: "6.boy",
      ...cam.push({ on: [-9.4, 0.85, -3.2], dist: 3.0, to: 2.5, yaw: -10, pitch: 2, fov: 42 }),
      zone: "street",
      look: "overworld-day",
      note: "'The boy came out to the cup': the boy walks out of his door and up to the sill, from behind and to the side, so the audience knows before he does.",
      stage: (t, { p }) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
          <Boy position={[PLACE.step[0] - 1.1 + 1.1 * p, 0, PLACE.step[2] + 0.2]} rotationY={-0.525} walk={1.6 * p} lookAt={PLACE.sill} />
        </>
      ),
    },
    {
      cue: "6.cried",
      ...cam.push({ on: [-9.5, 0.62, -3.9], dist: 2.3, to: 1.9, yaw: 22, pitch: 0, fov: 36 }),
      zone: "street",
      look: "overworld-day",
      note: "On 'sat': the boy drops onto the step, the empty cup above and behind him in frame. The face changes on the cut, never inside it: he is calm walking, and he is crying sitting, and the cut between is the sound of the whole film stopping.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
          <Boy position={PLACE.step} rotationY={0.034} sit lookAt={[PLACE.sill[0], 1.4, PLACE.sill[2]]} lean={t > SIT ? 0.14 : 0.02} />
        </>
      ),
    },
    {
      cue: "6.golem",
      ...cam.push({ on: [-10.2, 1.3, -3.0], dist: 5.6, to: 4.8, yaw: 34, pitch: 4, fov: 46 }),
      zone: "street",
      look: "overworld-day",
      note: "'The iron golem came up the path and stopped': 2.7 m of iron filling a third of the frame, and the boy tiny on his step beside it. It stops exactly where a friend would stop, which is what makes it sad.",
      stage: (t, { p }) => (
        <>
          <Boy position={PLACE.step} rotationY={0.243} sit />
          <IronGolem position={[PLACE.path[0] + 1.4 * (1 - p), 0, PLACE.path[2] - 0.4]} rotationY={0.243} walk={1.4 * p} armR={-0.2} armL={-0.1} headPitch={0.28} />
        </>
      ),
    },
    {
      cue: "6.gave",
      ...cam.push({ on: [-10.2, 1.5, -2.6], dist: 3.2, to: 2.7, yaw: 40, pitch: 2, fov: 36 }),
      zone: "street",
      look: "overworld-day",
      note: "On 'gave': the golem's open hand, palm up, a few inches above the boy's head — and it is holding nothing, because it gave the flower away. Do not show the boy in this frame. The empty hand is the whole reveal.",
      stage: (t) => <IronGolem position={[PLACE.path[0] + 1.3, 0, PLACE.path[2] - 0.4]} rotationY={0.348} armR={-1.35} armL={-0.1} headPitch={1.5} walk={0} />,
    },
    {
      cue: "7.sister",
      ...cam.push({ on: [-10.3, 0.8, 0.4], dist: 3.2, to: 2.7, yaw: 12, pitch: 2, fov: 44 }),
      zone: "street",
      look: "overworld-day",
      note: "'My sister found me in the hedge with a whole chicken in her mouth': she arrives beside him, and the chicken is enormous and absurd and she is completely unbothered. The joke has to land before the line does.",
      stage: (t, { p }) => (
        <>
          <Teller position={[PLACE.hedge[0], 0, PLACE.hedge[2]]} rotationY={-0.141} animation="peek" face="ouch" time={t} tailUp={0.1} />
          <Sister position={[PLACE.hedge[0] - 1.5 + 0.9 * p, 0, PLACE.hedge[2] + 0.4]} rotationY={-0.141} animation={p < 1 ? "walk" : "idle"} animDistance={0.9 * p} carry={<CookedChicken scale={1.15} />} face="calm" time={t} tailUp={0.5} />
        </>
      ),
    },
    {
      cue: "7.said",
      ...cam.push({ on: [-10.4, 0.95, 0.7], dist: 2.2, to: 1.85, yaw: -22, pitch: 0, fov: 34 }),
      zone: "street",
      look: "overworld-day",
      note: "Her face with the chicken still in her jaw at the bottom of the frame, saying it. Push in on 'present': the word is the turn of the film and it has to land on her eyes, not her beak.",
      stage: (t) => <Sister position={[PLACE.hedge[0] - 0.9, 0, PLACE.hedge[2] + 0.4]} rotationY={-0.734} animation="talk" face={t > SAID ? "frown" : "calm"} time={t} carry={<CookedChicken scale={1.1} />} tailUp={0.45} headPitch={-0.06} />,
    },
    {
      cue: "7.day",
      ...cam.push({ on: [-9.5, 0.8, 0.35], dist: 2.6, to: 2.2, yaw: -34, pitch: 0, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "'Take it back in the day. That is the only way it counts': over her shoulder onto him, and his face is the answer. He has no idea what that is going to cost, and the audience should.",
      stage: (t) => (
        <>
          <Teller position={[PLACE.hedge[0], 0, PLACE.hedge[2]]} rotationY={-0.943} animation="idle" face={t > 0.3 ? "brave" : "uneasy"} time={t} tailUp={0.2} />
          <Sister position={[PLACE.hedge[0] - 0.9, 0, PLACE.hedge[2] + 0.4]} rotationY={-0.943} animation="talk" face="frown" time={t} tailUp={0.45} />
        </>
      ),
    },
  ],
});
