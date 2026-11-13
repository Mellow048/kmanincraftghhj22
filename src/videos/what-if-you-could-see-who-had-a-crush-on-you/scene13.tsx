import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Class, EAST, FACE, GYM, HEART, Heart, Hero, HeroInTie, JO, Jo, Leo, ME, Mia, NORTH, SOUTH, SPOT, TALL, WEST, apart, boing, ease, faceOf, joHeart, ramp, route, timing, toward, wordAt } from "./kit";
import { Dancers } from "./scene10";
import { LEO_AT, ME_AT, MIA_AT } from "./scene11";
import { Cups } from "./scene12";

const OVER = wordAt("13.over", "over");
const SHOULDER = wordAt("13.over", "shoulder");
const BEHIND = wordAt("13.leo", "behind");
const JUST = wordAt("13.leo", "just");
const BIGGEST = wordAt("13.biggest", "biggest");
const SCHOOL = wordAt("13.biggest", "school");
const TINY = wordAt("13.gate", "tiny");
const STEP = wordAt("13.step", "step");
const GREW = wordAt("13.step", "grew");
const NEAR = wordAt("13.near", "near");
const ME_W = wordAt("13.near", "me");

/** The gym door, where he stands to look out, and where one step takes him. */
const AT_DOOR: Vec3 = GYM.at(-0.4, 0, 9.3);
const ONE_STEP: Vec3 = GYM.at(-0.2, 0, 10.5);
/** Jo, under the lamp inside the gate. She came. She did not come in. */
const JO_AT = GYM.lamp;
/** She is looking at the door she did not go in at. */
const JO_WAITS = toward(JO_AT, AT_DOOR);
/** His run down the path, and where it ends: beside her in the gateway, an arm's length off, side on to the street. */
const HE_STOPS: Vec3 = GYM.at(-0.2, 0, 23.0);
const RUN: Vec3[] = [GYM.at(-0.2, 0, 13.2), GYM.at(-0.3, 0, 21.4), HE_STOPS];
const RUN_LENGTH = apart(RUN[0], RUN[1]) + apart(RUN[1], RUN[2]);
/** Face to face in the gateway, each turned a third of the way to the street: side on, a head is the side of a box. */
const HE_FACES = EAST - 0.5;
const JO_FACES = WEST + 0.5;

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
      from: GYM.at(-0.8, 1.52, 2.05),
      to: GYM.at(-0.8, 1.52, 1.93),
      target: GYM.at(0, 1.22, 0),
      fov: 36,
      ease: "inOutSine",
      handheld: 0.012,
      zone: "gym",
      note: "From behind his shoulder, where somebody else is standing: her face, lit pink from above, and her eyes are not on him. They are on the lens. On 'over' she lifts a hand to it. The back of his head is the dark edge of the frame, and on 'shoulder' it tips to one side.",
      stage: (t) => {
        const tip = ease(ramp(t, SHOULDER - 0.05, SHOULDER + 0.25));
        return (
          <>
            <Dancers t={t} keep={(_, z) => z < -1} />
            <Mia position={MIA_AT} rotationY={SOUTH} animation="idle" arms={t > OVER - 0.1 ? "wave" : undefined} face="grin" lookAt={GYM.at(-0.8, 1.5, 2.0)} gaze={0} />
            {/* The heart is over the top of the frame: this close, all the lens would get of it is its dark rim. Its light is on her. */}
            <pointLight position={GYM.at(0.2, 2.3, 0.8)} color="#ff9cc0" intensity={5} distance={7} decay={2} />
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
            <HeroInTie t={t} position={ME_AT} rotationY={NORTH} animation="idle" face={t > BEHIND + 0.45 ? "frown" : "uneasy"} headYaw={1.25 * look} headPitch={0.3 * ease(ramp(t, JUST, JUST + 0.5))} gaze={0} />
            {past > 0 ? <Leo {...leo} animation="walk" arms="hold" face="grin" gaze={0} /> : <Leo position={LEO_AT} rotationY={facing} animation="idle" arms="hold" face="grin" gaze={0} />}
            <Cups by={leo.position} facing={past > 0 ? leo.rotationY : facing} offer={1 - past} />
            {/* Neither the heart nor the girl under it is drawn: the lens is inside the one and over the head of the other. Its light is on their faces. */}
            <pointLight position={GYM.at(0.1, 2.4, 0.45)} color="#ff9cc0" intensity={6} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "13.biggest",
      ...cam.push({ on: SPOT.at(-0.03, 1.27, 1.9), onTo: SPOT.at(-0.06, 1.32, 2.2), dist: 3.3, to: 2.85, yaw: 200, pitch: -2, fov: 44 }),
      handheld: 0.012,
      zone: "class",
      note: "The picture of 5.forme, in daylight, as it was all week: his face turned to the window where Mia sits, and right behind him Jo, and the biggest heart in the school. Her hand goes out to tap his shoulder and comes back without doing it. This time the lens leaves him and goes to her.",
      stage: (t) => {
        const tap = ease(ramp(t, 0.15, BIGGEST)) - ease(ramp(t, SCHOOL - 0.25, SCHOOL + 0.15));
        return (
          <>
            <Class without={["me", "jo"]} />
            <Hero position={ME} rotationY={NORTH} animation="sit" face="smile" lookAt={FACE.mia} gaze={0} />
            <Jo position={JO} rotationY={NORTH} animation="sit" arms={tap > 0.5 ? "reach" : undefined} face={tap > 0.5 ? "smile" : "uneasy"} headPitch={0.22 * (1 - tap)} gaze={0} />
            <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={200} />
          </>
        );
      },
    },
    {
      cue: "13.gate",
      look: "overworld-night",
      from: GYM.at(-0.1, 1.55, 5.6),
      to: GYM.at(0.4, 1.45, 20.3),
      target: GYM.at(0.5, 1.4, 20),
      targetTo: [JO_AT[0], 1.32, JO_AT[2]],
      fov: 40,
      ease: "inOutSine",
      shake: 0.008,
      zone: "gym",
      note: "The view of 10.jo, and this time somebody is there. The lens leaves him in the doorway and flies out of the party, down the dark path, fourteen metres, to the lamp at the gate: Jo, in her school clothes, her eyes on the ground. On 'tiny' she looks up at the door. The heart over her is the smallest in the film, and the lens coming all this way has not made it one hair bigger.",
      stage: (t) => (
        <>
          <Dancers t={t} aisle keep={(_, z) => z > 3} />
          <HeroInTie t={t} position={AT_DOOR} rotationY={toward(AT_DOOR, JO_AT)} animation="idle" face="wow" gaze={0} />
          <Jo position={JO_AT} rotationY={JO_WAITS} animation="idle" face="frown" headPitch={0.3 * (1 - ease(ramp(t, TINY - 0.5, TINY)))} gaze={0} />
          <Heart over={JO_AT} size={joHeart(apart(JO_AT, AT_DOOR))} yaw={186} steady />
        </>
      ),
    },
    {
      cue: "13.step",
      look: "overworld-night",
      from: GYM.at(1.45, 2.0, 26.6),
      to: GYM.at(1.43, 2.0, 26.45),
      target: GYM.at(-0.55, 0.5, 10),
      fov: 38,
      ease: "inOutSine",
      handheld: 0.012,
      impacts: [{ at: GREW, amp: 0.04, dur: 0.3 }],
      zone: "gym",
      note: "From the height of a street lamp, behind her: on the left her two bunches and the dot of a heart over them, and past her shoulder, at the far end of the path, the lit door with him in it, no bigger than a thumb. On 'step' he jumps one step out onto the path. On 'grew' the heart over her head, fourteen metres away from him, swells.",
      stage: (t) => {
        const k = ramp(t, STEP - 0.12, STEP + 0.2);
        const he: Vec3 = [AT_DOOR[0] + (ONE_STEP[0] - AT_DOOR[0]) * k, 0.28 * Math.sin(k * Math.PI), AT_DOOR[2] + (ONE_STEP[2] - AT_DOOR[2]) * k];
        const tiny = joHeart(apart(JO_AT, AT_DOOR));
        const grown = joHeart(apart(JO_AT, ONE_STEP));
        return (
          <>
            <HeroInTie t={t} swing={k > 0 && k < 1 ? 1 : 0} position={he} rotationY={toward(AT_DOOR, JO_AT)} animation={k > 0 && k < 1 ? "jump" : "idle"} face="wow" gaze={0} />
            <Jo position={JO_AT} rotationY={JO_WAITS} animation="idle" face="uneasy" headPitch={0.2 * (1 - ease(ramp(t, STEP, STEP + 0.3)))} gaze={0} />
            <Heart over={JO_AT} size={tiny + (grown - tiny) * boing(t, GREW - 0.1, 0.6)} yaw={12} steady />
            {/* A street lamp behind the lens: without it her back is a black shape with a dot over it. */}
            <pointLight position={GYM.at(1.5, 2.7, 25.3)} color="#ffe2b0" intensity={16} distance={8} decay={2} />
          </>
        );
      },
    },
    {
      cue: "13.near",
      look: "overworld-night",
      from: GYM.at(0.3, 2.0, 26.75),
      to: GYM.at(0.3, 2.0, 26.6),
      target: GYM.at(0.33, 1.62, 23.05),
      fov: 50,
      ease: "inOutSine",
      handheld: 0.012,
      impacts: [{ at: NEAR, amp: 0.05, dur: 0.4 }],
      zone: "gym",
      note: "The same lamp's height, through the gate, with the brick beside the door behind her and nothing else: she stands on the right with the small heart over her, and up the path behind her he comes out of the lit door at a run, a dot, then a boy, and with every metre the heart swells, until he brakes beside her on 'near' and it is the biggest heart in the school again. She has turned round with him. He is looking over her head; she looks up to see at what, and there is nothing there.",
      stage: (t) => {
        // He runs flat out and brakes in the last metres: he is beside her on 'near'.
        const k = ramp(t, -0.15, NEAR - 0.12);
        const he = route(RUN, RUN_LENGTH * (1 - (1 - k) ** 1.5));
        const arrived = k >= 1;
        const d = apart(JO_AT, he.position);
        // She turns as he comes round her, from the door to the boy who has stopped beside her.
        const round = ease(1 - ramp(d, 1.3, 4.6));
        const settle = ease(ramp(t, NEAR - 0.2, NEAR + 0.1));
        const up = t > ME_W + 0.05;
        return (
          <>
            <HeroInTie
              t={t}
              swing={arrived ? 0 : 1}
              position={he.position}
              animDistance={he.animDistance}
              rotationY={he.rotationY + (HE_FACES - he.rotationY) * settle}
              animation={arrived ? "idle" : "run"}
              face={t > ME_W ? "grin" : "wow"}
              headPitch={-0.24 * settle}
              gaze={0}
            />
            {up ? (
              <Jo position={JO_AT} rotationY={JO_FACES} animation="idle" face="uneasy" headPitch={-0.45} gaze={0} />
            ) : (
              <Jo position={JO_AT} rotationY={JO_WAITS + (JO_FACES - JO_WAITS) * round} animation="idle" face={d < 6 ? "wow" : "uneasy"} lookAt={faceOf(he.position)} gaze={0} />
            )}
            <Heart over={JO_AT} size={joHeart(d)} yaw={-6} steady />
            {/* A street lamp behind the lens, on the two faces: the lantern of the gate is behind them. */}
            <pointLight position={GYM.at(0.25, 2.8, 25.4)} color="#ffe2b0" intensity={22} distance={9} decay={2} />
          </>
        );
      },
    },
  ],
});
