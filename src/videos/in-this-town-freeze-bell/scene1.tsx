import { cam, storyScene } from "../../engine";
import { CarryBasket, Hero, PLACE, TownPeople, timing, wordAt } from "./kit";
/** Beat 1: The bell. The recorded words, not hand-set seconds, own every cut. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The bell",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.2, 4.2], dist: 3.5, to: 3.15, yaw: 0, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Meet the teller before anything else: a warm face, the market and its moving people stacked behind his shoulders.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.square} animation="talk" face="smile" time={t + 0.8} /><TownPeople t={t} compact />
      </>),
    },
    {
      cue: "1.freeze",
      ...cam.push({ on: [0, 1.2, 3.5], dist: 5.1, to: 4.6, yaw: 4, pitch: 8, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "On the spoken bell every performer holds their current pose. The lens and the dust keep moving: this is obedience, not stopped time.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.square} animation="hold" face="uneasy" time={0.8 + Math.min(t, wordAt("1.freeze", "bell"))} /><TownPeople t={Math.min(t, wordAt("1.freeze", "bell"))} frozen={t >= wordAt("1.freeze", "bell")} compact /><CarryBasket position={[1.2, 0, 1.1]} t={Math.min(t, wordAt("1.freeze", "bell"))} frozen={t >= wordAt("1.freeze", "bell")} />
      </>),
    },
  ],
});
