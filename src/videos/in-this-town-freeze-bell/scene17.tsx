import { cam, storyScene } from "../../engine";
import { CarryBun, Giant, Hero, JarNeighbor, NORTH, EAST, ReachingHand, ShadowKey, ramp, timing, wordAt } from "./kit";
/** Beat 17: A child and his toys. The recorded words, not hand-set seconds, own every cut. */
export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "A child and his toys",
  shots: [
    {
      cue: "17.box",
      ...cam.push({ on: [0,0,2], dist: 114, to: 108, yaw: 78, pitch: 42, fov: 56 }),
      zone: "bedroom",
      look: "void",
      note: "The picture answers first: the entire unchanged village, its scenery, and a glass lid on a wooden toy box. The furniture beyond is suddenly enormous.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,2.49,-20.8]} rotationY={NORTH} animation="idle" face="wow" time={0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "17.boy",
      ...cam.push({ on: [36,24,-1], dist: 60, to: 55, yaw: -70, pitch: 3, fov: 44 }),
      zone: "bedroom",
      look: "void",
      note: "The ringer is an ordinary child at a terrible scale, with the approved red Player look. His reaching hand supports the open lid; do not turn him into a monster.",
      stage: (t, { p, dur }) => (<>
        <Giant /><Hero position={[4,2.49,-20.8]} rotationY={NORTH} animation="idle" face="fear" time={0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "17.rope",
      ...cam.push({ on: [4.7,11.25,-15.4], dist: 9.8, to: 9, yaw: 125, pitch: 10, fov: 44 }),
      zone: "bedroom",
      look: "void",
      note: "Replay the opening from the revealing side: the lid lifts the same rope through the slot and trips the same bell. The kid stays on the screw below it.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,2.49,-20.8]} rotationY={EAST} animation="idle" face="uneasy" time={0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "17.second",
      ...cam.push({ on: [18,11.2,-17], dist: 5.5, to: 4.9, yaw: 130, pitch: 25, fov: 40 }),
      zone: "bedroom",
      look: "void",
      note: "A close view of a real hinge as the lid closes and the second bell rings. This advances the present action; do not add a third chime.",
      stage: (t, { p, dur }) => (<>
        <JarNeighbor />
      </>),
    },
    {
      cue: "17.toys",
      ...cam.push({ on: [4,1.2,-19.2], dist: 2.5, to: 2.05, yaw: 135, pitch: 4, fov: 36 }),
      zone: "shelf",
      look: "void",
      note: "Return to the teller holding the opening pose, now understood as pretending to be a toy. The closed scenery behind him is the back of his whole world.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-19.2]} rotationY={NORTH} animation="idle" face="fear" time={0.8} breath={0} weightShift={0} blink={false} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "17.jar",
      ...cam.push({ on: [7.2,1.4,-23.3], dist: 7.4, to: 6.8, yaw: 40, pitch: 38, fov: 44 }),
      zone: "shelf",
      look: "void",
      note: "The camera rises over the small yellow shoulder and finds the turquoise neighbor under glass. Stack them by depth: no side-by-side pair lost at the phone edges.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[8.65,0,-21.7]} rotationY={-2.46} animation="idle" face="wow" time={0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "17.alive",
      ...cam.push({ on: [7.2,1.5,-22.77], dist: 2.5, to: 2.1, yaw: 5, pitch: 5, fov: 36 }),
      zone: "shelf",
      look: "void",
      note: "The same face and clothes from the opening, close behind glass. A hand presses forward and the eyes move: he has been collected, not killed.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[8.65,0,-21.7]} rotationY={-2.46} animation="idle" face="wow" time={0.8} pack /><JarNeighbor alive t={t} />
      </>),
    },
    {
      cue: "17.bun",
      ...cam.push({ on: [8.5,1.05,-21.7], dist: 3.0, to: 2.5, yaw: 174, pitch: 12, fov: 38 }),
      zone: "shelf",
      look: "void",
      note: "Reverse through the side of the glass to the bun held out to him. The extra food was for this person all along, and the kid has found him alive.",
      stage: (t, { p, dur }) => (<>
        <CarryBun position={[8.65,0,-21.7]} rotationY={-2.46} headYaw={-0.55} t={t + 0.8} face="uneasy" pack /><JarNeighbor alive t={t} />
      </>),
    },
    {
      cue: "17.reach",
      ...cam.push({ on: [7.9,1.0,-22.3], dist: 3.6, to: 3.1, yaw: 35, pitch: 24, fov: 40 }),
      zone: "shelf",
      look: "void",
      note: "The movement has a reason: he reaches toward the lower edge to free his neighbor. His hand approaches the glass on reached; no rescue teleport.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[8.65 - ramp(t,wordAt("17.reach","reached"),wordAt("17.reach","reached") + 0.6) * 0.29,0,-21.7 - ramp(t,wordAt("17.reach","reached"),wordAt("17.reach","reached") + 0.6) * 0.345]} rotationY={-2.46} animation="reach" face="brave" time={0.8} pack /><JarNeighbor alive t={t} />
      </>),
    },
    {
      cue: "17.shadow",
      ...cam.push({ on: [7.78,1.02,-22.34], dist: 1.8, to: 1.55, yaw: 20, pitch: 25, fov: 38 }),
      zone: "shelf",
      look: "void",
      note: "The same shadow returns, now with its source just overhead. Light the reaching hand so the passing shadow actually falls across it, not merely across the floor.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[8.36,0,-22.045]} rotationY={-2.46} animation="reach" face="fear" time={0.8} pack /><JarNeighbor alive t={t} /><ReachingHand progress={0.3 + p * 0.35} /><ShadowKey />
      </>),
    },
  ],
});
