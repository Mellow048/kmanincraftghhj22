import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { HAT_BACK, Hero, Lantern, ROBE, Walker, ease, ramp, timing, wordAt } from "./kit";

const ALLOWED = wordAt("1.look", "allowed");

/** Where he stops, three steps out of his own door. He faces north, into the square. */
const OUT: Vec3 = [0, 0, 7.4];
/** Where the second picture finds him: at the mouth of the lane, with the whole town behind him and the moon on top of it. */
const LANE: Vec3 = [0, 0, -5.3];

/** HOOK. The moon comes up, the town comes out, and nobody is allowed to look. The premise in two pictures. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.wake",
      ...cam.push({ on: [0, 5.2, 8], dist: 13.5, to: 12.2, yaw: 180, pitch: -15, fov: 56 }),
      zone: "village",
      note: "'We woke up with the moon': from the lane, low. The moon climbs behind his roof, twice the size it will ever be again, and the town walks out under it in hats as wide as doors. Not one head is up.",
      stage: (t) => (
        <>
          <Hero {...stride([0, 0, 9.1], OUT, ease(ramp(t, 0.25, 1.75)))} animation="walk" face="smile" headPitch={0.3} />
          <Walker from={[-3.6, 0, 6.2]} to={[3.8, 0, 5.6]} t={t + 1.2} speed={0.95} robe={ROBE.blue} phase={3.4} />
          <Walker from={[3.4, 0, 4.4]} to={[-3.6, 0, 4.0]} t={t + 0.8} speed={0.85} robe={ROBE.white} phase={1.9} />
          <Walker from={[-2.6, 0, 0.2]} to={[-2.2, 0, 7]} t={t + 0.5} speed={0.8} robe={ROBE.farmer} phase={2.7} />
          <Walker from={[2.3, 0, -1.6]} to={[2.9, 0, 4]} t={t} speed={0.9} robe={ROBE.red} phase={0.9} />
        </>
      ),
    },
    {
      cue: "1.look",
      ...cam.push({ on: [LANE[0], 1.33, LANE[2]], dist: 2.6, to: 2.25, yaw: 180, pitch: -8, fov: 46 }),
      zone: "village",
      note: "'Nobody was allowed to look at it': the poster. Him, from under his own brim, his town behind him, and the whole moon sitting on top of his hat where he cannot see it. His head starts to go back. On 'allowed' his own hand pulls the brim down.",
      stage: (t) => {
        const up = ease(ramp(t, 0.05, 0.45)) * (1 - ease(ramp(t, ALLOWED, ALLOWED + 0.16)));
        const down = ease(ramp(t, ALLOWED, ALLOWED + 0.2));
        return (
          <>
            <Hero
              position={LANE}
              rotationY={Math.PI}
              animation="idle"
              blendTo="reachUp"
              blend={1 - down}
              face={t < ALLOWED + 0.08 ? "wow" : "uneasy"}
              gaze={0}
              headPitch={-0.34 * up + 0.1 * down}
              hatTilt={HAT_BACK - 0.12 * up + 0.42 * down}
            />
            {/* Every light in town is behind him here. One lantern on the ground beside the lens, so that he is red and not a shadow. */}
            <Lantern position={[1.25, 0.47, -7.3]} chain={0.06} light={9} reach={7} seed={41} />
          </>
        );
      },
    },
  ],
});
