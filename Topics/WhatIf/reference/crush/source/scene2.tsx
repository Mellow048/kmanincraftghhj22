import type React from "react";
import { cam, storyScene, stride } from "../../engine";
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
/**
 * The teller at the mirror. Drawn twice: once in the room and once in the glass. Nothing else is: a heart of
 * anybody's floating in that glass would be a heart beside his head, and the line is that there is none.
 */
const AtTheMirror: React.FC<{ t: number }> = ({ t }) => (
  <Hero position={HOME.mirror} rotationY={WEST} animation="idle" face={t > NOT ? "uneasy" : "smile"} headPitch={-0.3 * ease(ramp(t, NOT - 0.5, NOT))} headYaw={t > NOT ? Math.sin((t - NOT) * 9) * 0.25 : 0} gaze={0} />
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
      from: HOME.at(-1.35, 1.55, 2.3),
      to: HOME.at(-1.47, 1.55, 2.28),
      target: HOME.at(-4.4, 1.3, 1.75),
      fov: 36,
      ease: "inOutSine",
      zone: "kitchen",
      note: "Past his shoulder, into the mirror: his face, as big as the glass will give it, and over it nothing at all. He looks up at where it should be, and from side to side. He cannot see his own: the last picture of the film answers this one.",
      stage: (t) => (
        <>
          <AtTheMirror t={t} />
          <Reflection glass={HOME.glass}>
            <Kitchen at={PLACE.kitchen} image />
            <AtTheMirror t={t} />
          </Reflection>
        </>
      ),
    },
  ],
});
