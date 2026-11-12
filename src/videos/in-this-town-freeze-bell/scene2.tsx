import { Block, cam, storyScene } from "../../engine";
import { Hero, NORTH, PassingShadow, TownPeople, ramp, timing, wordAt, Neighbor } from "./kit";
/** Beat 2: Three unanswered things. The recorded words, not hand-set seconds, own every cut. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Three unanswered things",
  shots: [
    {
      cue: "2.ringer",
      ...cam.push({ on: [0, 5.7, -8.8], dist: 5.4, to: 4.8, yaw: -14, pitch: -6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Look up into an empty bell tower. The small kid below cannot reach it, and no grown-up is standing beside it.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-0.7, 0, -5.6]} animation="lookAround" face="frown" headPitch={-0.5} time={t + 0.8} />
      </>),
    },
    {
      cue: "2.scrape",
      ...cam.push({ on: [0, 6.06, -16.7], dist: 2.7, to: 2.2, yaw: 14, pitch: 8, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The rope vanishes through a real slot. Move toward the darkness while a scrape is heard beyond it; withhold its source.",
      stage: (t, { p, dur }) => (<>
        <Block position={[0.22, 5.72, -16.55]} size={[0.05, 0.035, 0.05]} color="#cbaa70" />
      </>),
    },
    {
      cue: "2.neighbor",
      ...cam.push({ on: [3.1, 1.15, -0.4], dist: 4.4, to: 3.9, yaw: 18, pitch: 21, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "A memory: the turquoise neighbor alone turns his head while everyone else stays still. A broad shadow crosses the ground, never a revealed hand yet.",
      stage: (t, { p, dur }) => (<>
        <Neighbor position={[3.2, 0, -0.9]} animation="idle" face="uneasy" time={0.8} headYaw={ramp(t, wordAt("2.neighbor", "moved"), wordAt("2.neighbor", "moved") + 0.4) * 0.8} /><Hero position={[3.3,0,0.7]} rotationY={NORTH} animation="idle" face="uneasy" time={0.8} breath={0} weightShift={0} /><TownPeople frozen /><PassingShadow position={[3.2, 0.09, -0.9]} progress={p} width={9} />
      </>),
    },
    {
      cue: "2.empty",
      ...cam.push({ on: [-12, 1.4, -4.6], dist: 5.1, to: 4.5, yaw: 5, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Cut to his closed blue-roofed house, with the teller waiting outside. No disappearance effect: the empty home is the evidence.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-11.6, 0, -2.8]} rotationY={-0.3} animation="idle" face="uneasy" headYaw={-0.7} time={t + 0.8} />
      </>),
    },
  ],
});
