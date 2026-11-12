import { cam, storyScene } from "../../engine";
import { Bread, CarryBasket, Elder, Friend, Hero, NORTH, PLACE, PassingShadow, Still, TownPeople, timing, wordAt, Baker, Neighbor } from "./kit";
/** Beat 3: An ordinary life with one rule. The recorded words, not hand-set seconds, own every cut. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "An ordinary life with one rule",
  shots: [
    {
      cue: "3.lessons",
      ...cam.push({ on: [11.05, 1.3, 6.1], dist: 5.1, to: 4.6, yaw: 0, pitch: 12, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Standing-still class: two children in depth, a loaf balanced on each head, and the teacher above them on the far side of the bench.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.lessonHero} animation="idle" face="brave" time={0.8} breath={0} weightShift={0} /><Bread position={[10.5, 1.47, 6.8]} bun /><Friend position={PLACE.lessonFriend} animation="idle" face="grin" time={0.8} /><Bread position={[11.65, 1.42, 5.8]} bun /><Elder position={[11.1, 0, 4.4]} animation="point" face="calm" time={t + 0.8} />
      </>),
    },
    {
      cue: "3.cheat",
      ...cam.push({ on: [11.65, 1.15, 5.8], dist: 2.25, to: 1.9, yaw: 10, pitch: 4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The friend has eaten his lesson. Push on the bite and his pleased face while the teller still balances his own bun in the near edge.",
      stage: (t, { p, dur }) => (<>
        <Friend position={PLACE.lessonFriend} animation="hug" face="grin" headPitch={0.28} time={t + 0.8} /><Bread position={[11.65, 0.8, 6.05]} bun bitten /><Hero position={PLACE.lessonHero} animation="idle" face="frown" headYaw={0.6} time={0.8} /><Bread position={[10.5, 1.47, 6.8]} bun />
      </>),
    },
    {
      cue: "3.market",
      ...cam.push({ on: [6, 1.4, -1.7], dist: 4.5, to: 3.9, yaw: 25, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The baker puts one loaf on a short stack. Bring the camera down to counter height so the low piles are a readable daily habit.",
      stage: (t, { p, dur }) => (<>
        <Baker position={PLACE.baker} animation="reach" face="smile" time={t + 0.8} /><Bread position={[6, 1.03 + 0.25 * (1 - p), -1.6]} scale={0.85} /><Hero position={[5.1, 0, -0.05]} animation="idle" face="smile" rotationY={0.2} time={t + 0.8} />
      </>),
    },
    {
      cue: "3.noses",
      ...cam.push({ on: [0, 1.2, 4.2], dist: 2.5, to: 2.05, yaw: 10, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "A little pre-emptive scratch before carrying anything. The comic idea is in the teller and his friend, not another unexplained town rule.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.square} animation="ache" face="grin" time={t + 0.8} headPitch={0.1} /><Friend position={[0.7, 0, 2.7]} animation="ache" face="laugh" time={t + 1.4} />
      </>),
    },
    {
      cue: "3.baskets",
      ...cam.push({ on: [6.1, 1.15, 0.25], dist: 3.8, to: 3.3, yaw: 16, pitch: 10, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The basket is held between two hands, not magically suspended. It stops on froze; the baker behind also holds her reaching pose.",
      stage: (t, { p, dur }) => (<>
        <CarryBasket position={PLACE.customer} t={Math.min(t, wordAt("3.baskets", "froze"))} frozen={t >= wordAt("3.baskets", "froze")} /><Still><Baker position={PLACE.baker} animation="reach" face="smile" time={0.8} /></Still>
      </>),
    },
    {
      cue: "3.lookdown",
      ...cam.push({ on: [0, 1.1, 4.2], dist: 3.0, to: 2.5, yaw: 8, pitch: 24, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The teller and everyone behind him look at their shoes. A soft moving shadow makes that downward gaze a choice; never stop the camera.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.square} animation="idle" face="calm" time={0.8} headPitch={0.45} blink={false} breath={0} weightShift={0} /><TownPeople frozen compact /><PassingShadow progress={p} />
      </>),
    },
    {
      cue: "3.second",
      ...cam.push({ on: [4.8, 1.45, 0.9], dist: 8.4, to: 7.4, yaw: -12, pitch: 18, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "The second chime restarts only the people. The same basket continues its journey and the kid grins: this interruption has always felt normal.",
      stage: (t, { p, dur }) => (<>
        <CarryBasket position={[6.1 + Math.max(0, t - wordAt("3.second", "ring")) * 0.42, 0, 0.3]} t={Math.max(0, t - wordAt("3.second", "ring"))} frozen={t < wordAt("3.second", "ring")} /><TownPeople t={Math.max(0, t - wordAt("3.second", "ring"))} frozen={t < wordAt("3.second", "ring")} /><Hero position={[4.2, 0, 1.6]} animation="wave" face="grin" time={0.8 + Math.max(0, t - wordAt("3.second", "ring"))} /><Baker position={PLACE.baker} animation="reach" face="smile" time={0.8 + Math.max(0, t - wordAt("3.second", "ring"))} />
      </>),
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [-3.4, 1.65, -2.1], dist: 5.4, to: 4.8, yaw: 38, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "After the market restarts, the iron golem alone keeps his eyes on the ground. The kid glances up at him; the same lowered face will return in the last memory.",
      stage: (t) => (<>
        <Hero position={[-2.7, 0, -0.75]} rotationY={NORTH} animation="idle" face="frown" headPitch={-0.2} headYaw={0.35} time={t + 0.8} /><TownPeople t={t} />
      </>),
    },
    {
      cue: "3.bun",
      ...cam.push({ on: [3.2, 1.12, -0.5], dist: 3.9, to: 3.3, yaw: -32, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "A clearly motivated memory of sharing the big bun. The neighbor sits on the stool and the smaller kid stands nearer, so faces and food stack vertically.",
      stage: (t, { p, dur }) => (<>
        <Neighbor position={[3.2, 0, -0.9]} animation="sit" arms="hold" face="smile" time={t + 0.8} /><Bread position={[3.2, 0.53, -0.48]} bun scale={1.25} /><Hero position={[3.1, 0, 0.8]} rotationY={NORTH} animation="hold" face="smile" time={t + 0.8} />
      </>),
    },
    {
      cue: "3.home",
      ...cam.push({ on: [0, 1.2, 4.2], dist: 2.6, to: 2.15, yaw: -8, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Back in the present, the boy likes his home. Let his small smile land before the unanswered question returns.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.square} animation="idle" face="smile" time={t + 0.8} /><TownPeople t={t} />
      </>),
    },
  ],
});
