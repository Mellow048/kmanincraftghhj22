import { cam, storyScene, walkSegment } from "../../engine";
import { Boy, CookedChicken, IronGolem, PLACE, Poppy, SillCup, Sister, Teller, ease, ramp, timing, wordAt } from "./kit";

const SIT = wordAt("6.cried", "sat");
const GAVE = wordAt("6.gave", "gave");
const SAID = wordAt("7.said", "took");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "He sat on the step and cried",
  shots: [
    {
      cue: "6.hedge",
      ...cam.push({ on: [-10.2, 0.68, 0.5], dist: 3.5, to: 2.15, yaw: 18, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Morning light: Teller creeps forward peering warily over hedge leaves toward the villager boy's doorway.",
      stage: (t) => {
        const creep = ease(ramp(t, 0, 1.2));
        return (
          <Teller position={[-10.45 + creep * 0.25, 0, 0.75 - creep * 0.28]} rotationY={0.08} animation="peek" face="uneasy" lookAt={[PLACE.step[0], 1.1, PLACE.step[2]]} tailUp={0.2} time={t} headPitch={-0.15} />
        );
      },
    },
    {
      cue: "6.boy",
      ...cam.orbit({ on: [-9.4, 0.9, -3.5], dist: 3.9, distTo: 2.75, yaw: -22, yawTo: 14, pitch: 10, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Boy hurries out door to windowsill, peeks into empty cup and starts sharply.",
      stage: (t, { p }) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.26]} />
          <Boy position={[-10.4 + 1.3 * ease(p), 0, -3.65]} rotationY={-0.2 + ease(p) * 0.5} walk={1.8 * p} lookAt={PLACE.sill} />
        </>
      ),
    },
    {
      cue: "6.cried",
      ...cam.push({ on: [-9.1, 0.85, -3.85], dist: 3.45, to: 2.05, yaw: 24, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      impacts: [{ at: SIT, amp: 0.02, dur: 0.2 }],
      zone: "street",
      look: "overworld-day",
      note: "Boy drops heavily onto wooden step below empty windowsill cup hanging his head weeping.",
      stage: (t) => {
        const drop = ease(ramp(t, Math.max(0.05, SIT - 0.1), SIT + 0.3));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.26]} />
            <Boy position={[-9.1, (1 - drop) * 0.12, -3.85]} rotationY={0.384} sit={drop > 0.2} nod={drop * 0.45} lean={0.04 + drop * 0.18} />
          </>
        );
      },
    },
    {
      cue: "6.golem",
      ...cam.crane({ on: [-9.1, 1.0, -3.6], dist: 5.7, toDist: 4.1, yaw: 34, fromPitch: -6, toPitch: 14, fov: 46, screenOffset: [0, 0.06] }),
      impacts: [{ at: 0.35, amp: 0.018, dur: 0.18 }, { at: 0.8, amp: 0.018, dur: 0.18 }],
      zone: "street",
      look: "overworld-day",
      note: "Massive Iron Golem stomps solidly up the cobblestone path and halts beside tiny crying Boy.",
      stage: (t, { p }) => (
        <>
          <Boy position={[-9.1, 0, -3.85]} rotationY={0.593} sit lean={0.16} />
          <IronGolem position={[-9.4 + 1.6 * ease(p), 0, -2.7]} rotationY={0.32} walk={2.0 * p} armR={-0.3} armL={-0.1} headPitch={0.28} />
        </>
      ),
    },
    {
      cue: "6.gave",
      ...cam.orbit({ on: [-9.05, 1.6, -3.1], dist: 3.4, distTo: 2.35, yaw: 18, yawTo: 54, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Memory reveal: Iron Golem extends giant hand holding red Poppy down toward Boy's reaching fingers.",
      stage: (t) => {
        const give = ease(ramp(t, 0, Math.max(0.4, GAVE + 0.35)));
        return (
          <>
            <IronGolem position={[-9.1, 0, -2.8]} rotationY={0.698} armR={-1.15 - give * 0.35} armL={-0.1} headPitch={0.65} walk={0} />
            <Poppy position={[-8.85, 1.45 - give * 0.25, -3.35 - give * 0.35]} scale={1.15} />
            <Boy position={[-9.1, 0, -3.85]} rotationY={0.4} sit lean={0.05} lookAt={[-9.0, 1.5, -3.1]} />
          </>
        );
      },
    },
    {
      cue: "7.sister",
      ...cam.push({ on: [-10.4, 0.68, 0.65], dist: 3.8, to: 2.45, yaw: 18, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Sister bounds into hedge gripping giant absurd CookedChicken while Teller ducks back in surprise.",
      stage: (t, { p }) => (
        <>
          <Teller position={[-10.2, 0, 0.5]} rotationY={0.22 - ease(p) * 0.4} animation={p > 0.5 ? "cower" : "peek"} face="ouch" time={t} tailUp={0.12} />
          <Sister position={[-12.1 + 1.25 * ease(p), 0, 0.9]} rotationY={-0.08} animation={p < 0.85 ? "walk" : "idle"} animDistance={1.25 * p} carry={<CookedChicken scale={1.15} />} face="calm" time={t} tailUp={0.55} />
        </>
      ),
    },
    {
      cue: "7.said",
      ...cam.push({ on: [-11.0, 0.72, 0.9], dist: 3.3, to: 1.95, yaw: -24, pitch: 5, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Sister steps forward nodding sternly with huge roast chicken in jaw lecturing Teller.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 0.9));
        return (
          <Sister position={[-11.1 + step * 0.22, 0, 0.9]} rotationY={-0.38} animation="talk" animDistance={step * 0.3} face={t > SAID ? "frown" : "calm"} time={t * 1.4} carry={<CookedChicken scale={1.1} />} tailUp={0.45} headPitch={-0.06} />
        );
      },
    },
    {
      cue: "7.day",
      ...cam.ots({ speaker: [-11.1, 0.68, 0.9], listener: [-10.2, 0.68, 0.5], back: 1.85, push: 0.75 }),
      zone: "street",
      look: "overworld-day",
      note: "OTS over Sister as Teller squares shoulders bravely and steps out of the hedge toward sunlit street.",
      stage: (t) => {
        const tellerWalk = walkSegment([-10.2, 0, 0.5], [-9.95, 0, 0.1], t, 0.2, 1.3, { yaw: -0.6 });
        return (
          <>
            <Teller {...tellerWalk} face={t > 0.3 ? "brave" : "uneasy"} time={t} tailUp={0.25} />
            <Sister position={[-11.1, 0, 0.9]} rotationY={-0.87} animation="talk" face="frown" time={t} tailUp={0.45} />
          </>
        );
      },
    },
  ],
});
