import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Class, Eraser, FACE, HEART, Heart, Hero, JO, Jo, ME, NORTH, SPOT, Stars, TALL, WEST, ease, ramp, timing, wordAt } from "./kit";

const BEHIND = wordAt("6.jo", "behind");
const BIGGEST = wordAt("6.biggest", "biggest");
const WHOEVER = wordAt("6.lucky", "whoever");
const LUCKY = wordAt("6.lucky", "lucky");
const HIT = wordAt("6.eraser", "my");
const THROW = HIT - 0.2;

/** Where her heart floats, for somebody to look up at. */
const HER_HEART: Vec3 = [JO[0], TALL.seated + 0.34 + HEART.jo * 0.5, JO[2]];
/** The eraser lies on her desk until she needs it. */
const ON_HER_DESK: Vec3 = [SPOT.desk(1, 2)[0] + 0.24, SPOT.desk(1, 2)[1] + 0.03, SPOT.desk(1, 2)[2] - 0.08];
/** Her hand at the top of the throw, and the back of his head. */
const FROM: Vec3 = [JO[0] - 0.19, 1.62, JO[2] - 0.12];
const BACK_OF_HEAD: Vec3 = [ME[0], 1.2, ME[2] + 0.17];

/**
 * JO. The friend, and the biggest heart in the school, and the worst thing he could have said to her. He turns
 * round in his chair to talk to her; she is the one person in the film who talks back.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Jo",
  shots: [
    {
      cue: "6.jo",
      ...cam.push({ on: SPOT.at(0.15, 1.22, 1.5), dist: 3.5, to: 3.1, yaw: -17, pitch: 5, fov: 46 }),
      handheld: 0.012,
      zone: "class",
      note: "Over her shoulder: he swings round in his chair to her, grinning, the way he does in every class. We see her two bunches from behind and the bottom of something very big and pink hanging over her head.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.12, BEHIND - 0.3));
        return (
          <>
            <Class without={["me", "jo"]} />
            <Hero position={ME} rotationY={NORTH + (Math.PI / 2) * turn} animation="sit" arms={turn > 0.9 ? "talk" : undefined} face={turn > 0.5 ? "grin" : "calm"} lookAt={turn > 0.6 ? FACE.jo : undefined} gaze={0} />
            <Jo position={JO} rotationY={NORTH} animation="sit" arms={turn > 0.8 ? "wave" : undefined} face="grin" headRoll={0.08 * turn} />
            <Eraser position={ON_HER_DESK} rotation={[0, 0.4, 0]} />
            <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={-17} />
          </>
        );
      },
    },
    {
      cue: "6.biggest",
      ...cam.push({ on: SPOT.at(0, 1.33, 2.9), dist: 2.7, to: 2.3, yaw: 153, pitch: -19, fov: 52 }),
      handheld: 0.012,
      impacts: [{ at: BIGGEST, amp: 0.03, dur: 0.3 }],
      zone: "class",
      note: "From down by his desk, looking up at her: her laughing face and the heart over it, as wide as her desk, and the lens going in under it. Mia's filled a tenth of the frame; this one fills a third. It is this big because he is sitting right there; nobody says so for a minute.",
      stage: (t) => (
        <>
          <Class without={["me", "jo"]} />
          <Jo position={JO} rotationY={NORTH} animation="sit" arms="talk" face={t > BIGGEST ? "grin" : "laugh"} lookAt={[ME[0], 1.2, ME[2]]} gaze={0} />
          <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={153} />
        </>
      ),
    },
    {
      cue: "6.lucky",
      ...cam.push({ on: SPOT.at(0, 1.26, 2.5), dist: 3.5, to: 3.2, yaw: 195, pitch: -4, fov: 46 }),
      handheld: 0.012,
      zone: "class",
      note: "He has turned right round to her, and he points up at the heart over her head: whoever he is, he is one lucky guy. Her smile goes. Her hand goes to the eraser on her desk.",
      stage: (t) => {
        const said = ramp(t, LUCKY + 0.15, LUCKY + 0.3);
        return (
          <>
            <Class without={["me", "jo"]} />
            <Hero position={ME} rotationY={WEST} animation="sit" arms={t > LUCKY - 0.2 ? "reachUp" : t > WHOEVER ? "shrug" : "talk"} face="grin" lookAt={t > LUCKY - 0.2 ? HER_HEART : FACE.jo} gaze={0} />
            <Jo position={JO} rotationY={NORTH} animation="sit" arms={said > 0.5 ? "reach" : undefined} face={said > 0.5 ? "frown" : t > WHOEVER + 0.4 ? "uneasy" : "smile"} headPitch={0.2 * said} lookAt={said > 0.5 ? undefined : [ME[0], 1.2, ME[2]]} gaze={0} />
            <Eraser position={ON_HER_DESK} rotation={[0, 0.4, 0]} />
            <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={195} />
          </>
        );
      },
    },
    {
      cue: "6.eraser",
      ...cam.push({ on: SPOT.at(-0.05, 1.26, 1.9), dist: 3.1, to: 2.85, yaw: 158, pitch: -2, fov: 44 }),
      impacts: [{ at: HIT, amp: 0.07, dur: 0.35 }],
      zone: "class",
      note: "He has turned back to the front, pleased with himself. Behind him her arm goes up with the eraser, comes down, and it bounces off the back of his head on 'my head'. The heart over her has not shrunk by a hair.",
      stage: (t) => {
        const fly = ramp(t, THROW, HIT);
        const after = t - HIT;
        // In her hand, then on its way, then off his head and up towards the lens.
        const at: Vec3 =
          after < 0
            ? [FROM[0] + (BACK_OF_HEAD[0] - FROM[0]) * fly, FROM[1] + (BACK_OF_HEAD[1] - FROM[1]) * fly + 0.12 * Math.sin(fly * Math.PI), FROM[2] + (BACK_OF_HEAD[2] - FROM[2]) * fly]
            : [BACK_OF_HEAD[0] + 0.5 * after, BACK_OF_HEAD[1] + 2.6 * after - 4.9 * after * after, BACK_OF_HEAD[2] - 0.5 * after];
        return (
          <>
            <Class without={["me", "jo"]} />
            <Hero position={ME} rotationY={NORTH} animation="sit" face={after > 0 ? "ouch" : "grin"} headPitch={after > 0 ? 0.6 * Math.exp(-after * 6) : -0.06} headRoll={after > 0 ? 0 : 0.08} gaze={0} />
            <Jo position={JO} rotationY={NORTH} animation="sit" arms={t < THROW ? "reachUp" : "reach"} face="frown" gaze={0} />
            {t > THROW - 0.45 ? <Eraser position={t < THROW ? FROM : at} rotation={[t * 14, t * 9, 0]} /> : null}
            <Stars position={BACK_OF_HEAD} t={after} seed={4} />
            <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={158} />
          </>
        );
      },
    },
  ],
});
