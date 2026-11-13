import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Class, FACE, GYM, HEART, Heart, Hero, HeroInTie, JO, Jo, Leo, ME, Mia, NORTH, SOUTH, SPOT, TALL, apart, boing, ease, faceOf, joHeart, ramp, route, timing, toward, wordAt } from "./kit";
import { Dancers } from "./scene10";
import { LEO_AT, ME_AT, MIA_AT } from "./scene11";
import { Cups, HUGE } from "./scene12";

const OVER = wordAt("13.over", "over");
const SHOULDER = wordAt("13.over", "shoulder");
const BEHIND = wordAt("13.leo", "behind");
const JUST = wordAt("13.leo", "just");
const BIGGEST = wordAt("13.biggest", "biggest");
const SCHOOL = wordAt("13.biggest", "school");
const TINY = wordAt("13.gate", "tiny");
const STEP = wordAt("13.step", "step");
const GREW = wordAt("13.step", "grew");
const BIG = wordAt("13.near", "big");
const NEAR = wordAt("13.near", "near");

/** The gym door, where he stands to look out, and where one step takes him. */
const AT_DOOR: Vec3 = GYM.at(-0.4, 0, 9.3);
const ONE_STEP: Vec3 = GYM.at(-0.2, 0, 10.5);
/** Jo, under the lamp inside the gate. She came. She did not come in. */
const JO_AT = GYM.lamp;
/** His run down the path, and where he stops: an arm's length from her. */
const RUN: Vec3[] = [ONE_STEP, GYM.at(-0.15, 0, 19.5), GYM.at(0.68, 0, 22.12)];
const RUN_LENGTH = apart(RUN[0], RUN[1]) + apart(RUN[1], RUN[2]);

/**
 * THE TURN. Six shots, and each one undoes something he was sure of: where she was looking, who was behind him,
 * which heart was the big one, and why. The power never lied. He read it standing in the one place it could not
 * be read from.
 */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "The turn",
  shots: [
    {
      cue: "13.over",
      look: "overworld-night",
      from: GYM.at(-0.44, 1.5, 1.6),
      to: GYM.at(-0.42, 1.5, 1.5),
      target: GYM.at(0, 1.22, 0),
      fov: 40,
      ease: "inOutSine",
      handheld: 0.012,
      zone: "gym",
      note: "From behind his shoulder, where somebody else is standing: her face, lit up, and her eyes are not on him. They are on the lens. On 'over' she lifts a hand to it. The back of his head is in the corner of the frame, and on 'shoulder' it tips to one side.",
      stage: (t) => {
        const tip = ease(ramp(t, SHOULDER - 0.05, SHOULDER + 0.25));
        return (
          <>
            <Dancers t={t} keep={(_, z) => z < -1} />
            <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" arms={t > OVER - 0.1 ? "wave" : undefined} face="grin" lookAt={GYM.at(-0.5, 1.46, 1.7)} gaze={0} />
            <Heart over={MIA_AT} size={HUGE} yaw={-16} />
            <pointLight position={GYM.at(0.1, 2.0, 0.9)} color="#ff9cc0" intensity={12} distance={7} decay={2} />
            <HeroInTie t={t} position={ME_AT} rotationY={NORTH} animation="idle" face="uneasy" headRoll={0.2 * tip} headYaw={0.25 * tip} gaze={0} />
            {/* The tall kid in green is not drawn: the lens is standing where he is. */}
          </>
        );
      },
    },
    {
      cue: "13.leo",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.2, 1.2, 1.15), dist: 2.7, to: 2.45, yaw: 174, pitch: 22, fov: 42 }),
      handheld: 0.012,
      impacts: [{ at: BEHIND, amp: 0.05, dur: 0.35 }],
      zone: "gym",
      note: "The lunch line picture a third time, and now he looks: his head goes round over his shoulder on 'behind' and there is Leo, a cup in each hand, smiling past him. He turns back to the front with nothing on his face. On 'just like' Leo steps round him and out of the frame, to her, and he is left standing there in his dad's tie.",
      stage: (t) => {
        const look = ease(ramp(t, BEHIND - 0.35, BEHIND - 0.1)) - ease(ramp(t, BEHIND + 0.3, BEHIND + 0.6));
        const past = ease(ramp(t, JUST - 0.1, JUST + 0.85));
        const leo = stride(LEO_AT, GYM.at(-0.62, 0, 0.3), past);
        const facing = toward(LEO_AT, MIA_AT);
        return (
          <>
            <Dancers t={t} aisle keep={(_, z) => z > 4.8} />
            <Mia position={MIA_AT} rotationY={SOUTH + 0.3} animation="idle" face="grin" gaze={0} />
            <HeroInTie t={t} position={ME_AT} rotationY={NORTH} animation="idle" face={t > BEHIND + 0.45 ? "frown" : "uneasy"} headYaw={1.25 * look} headPitch={0.3 * ease(ramp(t, JUST, JUST + 0.5))} gaze={0} />
            {past > 0 ? <Leo {...leo} animation="walk" arms="hold" face="grin" gaze={0} /> : <Leo position={LEO_AT} rotationY={facing} animation="idle" arms="hold" face="grin" gaze={0} />}
            <Cups by={leo.position} facing={past > 0 ? leo.rotationY : facing} offer={1 - past} />
            {/* The heart is not drawn: the lens is inside it. Its light is on their faces. */}
            <pointLight position={GYM.at(0.1, 2.4, 0.45)} color="#ff9cc0" intensity={14} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "13.biggest",
      ...cam.push({ on: SPOT.at(-0.05, 1.26, 1.9), onTo: SPOT.at(-0.08, 1.32, 2.15), dist: 3.1, to: 2.85, yaw: 158, pitch: -2, fov: 46 }),
      handheld: 0.012,
      zone: "class",
      note: "The classroom, in daylight, as it was all week: he is looking at the window, where Mia sits. Right behind him is Jo, and the biggest heart in the school, and her hand going out to tap his shoulder and coming back without doing it. The lens leaves him and goes to her.",
      stage: (t) => {
        const tap = ease(ramp(t, 0.15, BIGGEST)) - ease(ramp(t, SCHOOL - 0.25, SCHOOL + 0.15));
        return (
          <>
            <Class without={["me", "jo"]} />
            <Hero position={ME} rotationY={NORTH} animation="sit" face="smile" lookAt={FACE.mia} gaze={0} />
            <Jo position={JO} rotationY={NORTH} animation="sit" arms={tap > 0.5 ? "reach" : undefined} face={tap > 0.5 ? "smile" : "uneasy"} headPitch={0.22 * (1 - tap)} gaze={0} />
            <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={158} />
          </>
        );
      },
    },
    {
      cue: "13.gate",
      look: "overworld-night",
      from: GYM.at(-0.1, 1.55, 5.6),
      to: GYM.at(0.75, 1.45, 19.5),
      target: GYM.at(0.5, 1.4, 20),
      targetTo: GYM.at(1.2, 1.42, 22.9),
      fov: 40,
      ease: "inOutSine",
      shake: 0.008,
      zone: "gym",
      note: "The view of 10.jo, and this time somebody is there. The lens leaves him in the doorway and flies out of the party, down the dark path, fourteen metres, to the lamp at the gate: Jo, in her school clothes, hugging her arms, looking at the door. The heart over her is the smallest in the film.",
      stage: (t) => (
        <>
          <Dancers t={t} aisle keep={(_, z) => z > 3} />
          <HeroInTie t={t} position={AT_DOOR} rotationY={toward(AT_DOOR, JO_AT)} animation="idle" face="wow" gaze={0} />
          <Jo position={JO_AT} rotationY={toward(JO_AT, AT_DOOR)} animation="idle" arms="hug" face="frown" headPitch={0.22 * (1 - ease(ramp(t, TINY - 0.5, TINY)))} gaze={0} />
          <Heart over={JO_AT} size={joHeart(apart(JO_AT, AT_DOOR))} yaw={190} />
        </>
      ),
    },
    {
      cue: "13.step",
      look: "overworld-night",
      from: GYM.at(1.2, 1.55, 24.95),
      to: GYM.at(1.17, 1.55, 24.7),
      target: GYM.at(0.35, 1.25, 12),
      fov: 46,
      ease: "inOutSine",
      handheld: 0.012,
      impacts: [{ at: GREW, amp: 0.04, dur: 0.3 }],
      zone: "gym",
      note: "From behind her, at the gate: her two bunches and the dot of a heart over them, and at the far end of the path the lit door with him in it, no bigger than a thumb. On 'step' he jumps one step out onto the path. On 'grew' the heart over her head, fourteen metres away from him, swells.",
      stage: (t) => {
        const k = ramp(t, STEP - 0.12, STEP + 0.2);
        const he: Vec3 = [AT_DOOR[0] + (ONE_STEP[0] - AT_DOOR[0]) * k, 0.28 * Math.sin(k * Math.PI), AT_DOOR[2] + (ONE_STEP[2] - AT_DOOR[2]) * k];
        const tiny = joHeart(apart(JO_AT, AT_DOOR));
        const grown = joHeart(apart(JO_AT, ONE_STEP));
        return (
          <>
            <HeroInTie t={t} swing={k > 0 && k < 1 ? 1 : 0} position={he} rotationY={toward(AT_DOOR, JO_AT)} animation={k > 0 && k < 1 ? "jump" : "idle"} face="wow" gaze={0} />
            <Jo position={JO_AT} rotationY={toward(JO_AT, AT_DOOR)} animation="idle" arms="hug" face="uneasy" headPitch={0.2 * (1 - ease(ramp(t, STEP, STEP + 0.3)))} gaze={0} />
            <Heart over={JO_AT} size={tiny + (grown - tiny) * boing(t, GREW - 0.1, 0.6)} yaw={0} />
          </>
        );
      },
    },
    {
      cue: "13.near",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(1.3, 1.42, 22.9), dist: 3.0, to: 2.7, yaw: 196, pitch: -17, fov: 54 }),
      handheld: 0.012,
      impacts: [{ at: NEAR, amp: 0.05, dur: 0.4 }],
      zone: "gym",
      note: "Her face under the lamp, from low down, and the heart over it: he is running down the path behind the lens, and with every metre it swells, small, then the size of her head, then on 'near' the biggest heart in the school again, as he comes into the frame and stops in front of her out of breath. She has no idea what he is looking at.",
      stage: (t) => {
        // He runs flat out and brakes in the last two metres.
        const k = ramp(t, -0.1, BIG + 1.25);
        const he = route(RUN, RUN_LENGTH * (1 - (1 - k) ** 1.7));
        const arrived = k >= 1;
        const d = apart(JO_AT, he.position);
        return (
          <>
            {arrived ? (
              <HeroInTie t={t} position={RUN[2]} rotationY={toward(RUN[2], JO_AT)} animation="idle" face="wow" headPitch={-0.42} gaze={0} />
            ) : (
              <HeroInTie t={t} swing={1} {...he} animation="run" face="wow" gaze={0} />
            )}
            <Jo position={JO_AT} rotationY={toward(JO_AT, AT_DOOR)} animation="idle" arms={d < 6 ? undefined : "hug"} face={arrived ? "smile" : d < 7 ? "wow" : "uneasy"} lookAt={faceOf(he.position)} gaze={0} />
            <Heart over={JO_AT} size={joHeart(d)} yaw={196} />
          </>
        );
      },
    },
  ],
});
