import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, PLACE, Ringer, WEST, ease, faceOf, ramp, timing, villagerFace, wordAt } from "./kit";

const WHY = wordAt("5.ask", "why");
const ALL = wordAt("5.know", "all");
const LOWERED = wordAt("5.away", "lowered");
const WALKED = wordAt("5.away", "walked");

/** She stands on the corner of the bell's step. He stands below her, a step away, looking up. */
const HER = PLACE.ringer;
const ME: Vec3 = [-3.4, 0, 0.35];
const TO_ME = Math.atan2(ME[0] - HER[0], ME[2] - HER[2]);
const TO_HER = TO_ME + Math.PI;
/** How he stands to listen: half turned away, one ear to her, his face to us. */
const LISTENING = Math.PI - 0.8;
/** Where she steps down to, before she walks off up the street. */
const DOWN: Vec3 = [-4.9, 0, 0.35];

/** THE BELL RINGER. The only one who will say anything, and all she has is the rule's other half. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The bell ringer",
  shots: [
    {
      cue: "5.ask",
      ...cam.push({ on: [-3.9, 1.75, -0.6], dist: 3.8, to: 3.3, yaw: 47, pitch: -15, fov: 44 }),
      zone: "village",
      note: "'I asked the old bell ringer why': her up on the step of her bell, him below. On 'why' his arm goes straight up at the thing he is asking about, and his head stays down. He points without looking.",
      stage: (t) => (
        <>
          <Ringer position={HER} rotationY={TO_ME} nod={0.42 - 0.12 * ease(ramp(t, WHY, WHY + 0.3))} />
          <Hero position={ME} rotationY={TO_HER} animation="talk" blendTo="reachUp" blend={1 - ease(ramp(t, WHY - 0.2, WHY + 0.08))} face="smile" gaze={0} headPitch={0.08} />
        </>
      ),
    },
    {
      cue: "5.know",
      ...cam.push({ on: villagerFace(HER), dist: 2.0, to: 1.55, yaw: 15, pitch: -22, fov: 36 }),
      zone: "village",
      note: "'All I know is this': her, the way he sees her, from down under her brim. Her head comes up a little to say it. It is the most anybody in this town has ever said.",
      stage: (t) => <Ringer position={HER} rotationY={TO_ME} nod={0.42 - 0.2 * ease(ramp(t, 0.2, 0.8))} hmm={ramp(t, ALL - 0.05, ALL + 0.1) * (1 - ramp(t, 1.7, 1.9))} />,
    },
    {
      cue: "5.rule",
      ...cam.push({ on: [-3.5, 1.5, -0.1], dist: 2.75, to: 2.4, yaw: 84, pitch: -8, fov: 46 }),
      zone: "village",
      note: "'Never let it catch you looking': she bends right down off her step and says it into his ear, brim over brim, the way you tell a child about a hot stove. His face, to us: he has never been given a rule with a reason in it before.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 0.45));
        return (
          <>
            <Ringer position={HER} rotationY={TO_ME} lean={0.52 * k} nod={0.1} hmm={0.5 * (1 - ramp(t, 1.15, 1.35))} />
            <Hero position={ME} rotationY={LISTENING} animation="idle" face="uneasy" gaze={0} saccade={false} headYaw={-0.75} headRoll={-0.08} />
          </>
        );
      },
    },
    {
      cue: "5.away",
      ...cam.push({ on: [-4.6, 1.2, 0.0], dist: 5.3, to: 4.7, yaw: 110, pitch: -4, fov: 44 }),
      zone: "village",
      note: "'She lowered her hat and walked away': the brim comes down like a shutter. She steps off her stone and goes, up the street, towards the far lantern, without looking back. He watches her all the way.",
      stage: (t) => {
        const down = ease(ramp(t, LOWERED + 0.25, WALKED));
        const gone = Math.max(0, t - WALKED) * 1.2;
        const her: Vec3 = [HER[0] + (DOWN[0] - HER[0]) * down - gone, HER[1] * (1 - down), HER[2] + (DOWN[2] - HER[2]) * down + gone * 0.04];
        return (
          <>
            <Ringer position={her} rotationY={TO_ME + (WEST - TO_ME) * down} walk={down * 1.4 + gone} nod={0.22 + 0.4 * ease(ramp(t, LOWERED, LOWERED + 0.25))} />
            <Hero position={ME} rotationY={TO_HER} animation="idle" face="uneasy" gaze={0} lookAt={[her[0], her[1] + 1.5, her[2]]} />
          </>
        );
      },
    },
  ],
});

void faceOf;
