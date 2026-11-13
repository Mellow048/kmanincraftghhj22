import type React from "react";
import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Dad, Dog, DogBowl, HEART, HOME, Heart, Hero, Kitchen, Mom, NORTH, PLACE, Reflection, SOUTH, TALL, Tie, WEST, ease, ramp, timing, wordAt } from "./kit";

const PINK = wordAt("2.mom", "pink");
const DOUBLED = wordAt("2.dad", "doubled");
const DINNER = wordAt("2.dog", "for");
const NOT = wordAt("2.mirror", "could");

/** Mom cooks at the stove; dad comes in by the door and stops beside her. */
const MOM = HOME.stove;
const DAD_FROM = HOME.at(3.0, 0, -1.0);
const DAD_TO = HOME.at(1.55, 0, -1.8);
/** The dog waits by the counter, and then does not. The bowl is nearer the lens than he is. */
const DOG_WAITS = HOME.at(-2.2, 0, -1.55);
const DOG_EATS = HOME.at(-2.2, 0, -0.3);
/** At the mirror: the dog sits at his left foot, where the glass can see it and the lens cannot. */
const DOG_SITS: Vec3 = HOME.at(-2.74, 0, 1.2);

/** The teller at the mirror, and the dog that followed him. Drawn twice: once in the room and once in the glass. */
const AtTheMirror: React.FC<{ t: number; yaw: number }> = ({ t, yaw }) => (
  <>
    <Hero position={HOME.mirror} rotationY={WEST} animation="idle" face={t > NOT ? "uneasy" : "smile"} headPitch={-0.3 * ease(ramp(t, NOT - 0.5, NOT))} headYaw={t > NOT ? Math.sin((t - NOT) * 9) * 0.25 : 0} gaze={0} />
    <Dog position={DOG_SITS} rotationY={WEST - 0.3} pose="sit" wag={1.6} headPitch={-0.3} headTilt={0.2} />
    <Heart over={DOG_SITS} tall={TALL.dogSitting} size={HEART.small * 1.5} yaw={yaw} />
  </>
);

/**
 * THE DAY IT CAME. Breakfast: the look of the power is set on three hearts in nine seconds (mom, mom and dad, the dog),
 * and the rule is shown before it is said: a heart grows when what it is for comes close. Then the mirror: he has none
 * that he can see. That line is paid off by the last picture of the film.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The day it came",
  shots: [
    {
      cue: "2.mom",
      ...cam.push({ on: HOME.at(0.6, 1.62, -1.95), dist: 3.6, to: 3.1, yaw: 10, pitch: 4, fov: 40 }),
      zone: "kitchen",
      note: "Mom at the stove, turning round with breakfast, and on 'pink' the heart pops over her head, against the dark cupboards. One person, one heart, nothing else: this is where the viewer learns the look.",
      stage: (t) => (
        <>
          <Mom position={MOM} rotationY={NORTH + ease(ramp(t, 0.05, 0.6)) * Math.PI} animation="idle" arms="hold" face="smile" />
          <Heart over={MOM} tall={TALL.adult} size={HEART.mid} t={t - PINK} yaw={10} />
        </>
      ),
    },
    {
      cue: "2.dad",
      ...cam.push({ on: HOME.at(1.1, 1.62, -1.8), dist: 4.7, to: 4.3, yaw: -35, pitch: 6, fov: 48 }),
      zone: "kitchen",
      note: "Dad walks in from the hall and both hearts swell as he comes: his and hers, twice the size by the time he is beside her. The rule of the power, shown a line before it is said.",
      stage: (t) => {
        const p = ramp(t, -0.25, 1.05);
        const near = ease(ramp(t, DOUBLED - 0.55, DOUBLED + 0.15));
        const walk = stride(DAD_FROM, DAD_TO, p);
        const turn = p < 1 ? walk.rotationY : WEST + 0.3;
        return (
          <>
            <Mom position={MOM} rotationY={SOUTH + 0.5 * ease(ramp(t, 0.2, 0.8))} animation="idle" arms="hold" face={near > 0.5 ? "grin" : "smile"} />
            <Heart over={MOM} tall={TALL.adult} size={HEART.mid * (1 + near)} yaw={-35} />
            {p < 1 ? <Dad {...walk} animation="walk" face="smile" /> : <Dad position={DAD_TO} rotationY={turn} animation="idle" arms="wave" face="grin" />}
            <Tie position={walk.position} rotationY={turn} scale={1.02} reach={0.5} swing={p < 1 ? 0.1 : 0} />
            <Heart over={walk.position} tall={TALL.adult + 0.03} size={HEART.mid * (0.7 + 1.3 * near)} t={t - 0.3} yaw={-35} />
          </>
        );
      },
    },
    {
      cue: "2.dog",
      ...cam.push({ on: HOME.at(-2.2, 0.72, -0.7), onTo: HOME.at(-2.2, 0.56, -0.2), dist: 3.0, to: 2.6, yaw: 13, pitch: 10, fov: 40 }),
      zone: "kitchen",
      note: "The joke, and the rule again: the dog has a heart too. On 'for his dinner' he trots to his bowl, at the lens, and the heart grows with every step towards it.",
      stage: (t) => {
        const p = ease(ramp(t, DINNER - 0.3, DINNER + 0.3));
        const walk = stride(DOG_WAITS, DOG_EATS, p);
        return (
          <>
            <DogBowl position={HOME.bowl} />
            <Dog position={walk.position} rotationY={SOUTH} pose={p <= 0 ? "sit" : p < 1 ? "stand" : "eat"} walked={walk.animDistance} wag={p > 0 ? 2.4 : 1.2} headPitch={p <= 0 ? -0.1 : 0} headTilt={p <= 0 ? 0.18 : 0} />
            <Heart over={walk.position} tall={TALL.dog - 0.2 * p} size={HEART.small + 0.26 * p} t={t - 0.08} yaw={13} />
          </>
        );
      },
    },
    {
      cue: "2.mirror",
      ...cam.push({ on: HOME.at(-3.5, 1.22, 1.78), dist: 2.9, to: 2.5, yaw: 90, pitch: 18, fov: 40 }),
      zone: "kitchen",
      note: "Over his head, into the mirror: his face, his dog with its heart, and nothing at all over his own head. He looks up at where it should be, and from side to side. He cannot see his own: the last picture of the film answers this one.",
      stage: (t) => (
        <>
          <AtTheMirror t={t} yaw={90} />
          <Reflection glass={HOME.glass}>
            <Kitchen at={PLACE.kitchen} image />
            <AtTheMirror t={t} yaw={-90} />
          </Reflection>
        </>
      ),
    },
  ],
});
