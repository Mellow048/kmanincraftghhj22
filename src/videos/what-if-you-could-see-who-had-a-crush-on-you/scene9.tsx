import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, Classmate, DEG, GYM, Heart, Hero, Jo, SOUTH, WEST, apart, ease, faceOf, hall, joHeart, pop, ramp, route, timing, wordAt } from "./kit";

const WHY = wordAt("9.smile", "why");
const SMILING = wordAt("9.smile", "smiling");
const MIA_W = wordAt("9.ask", "mia");
const SAID = wordAt("9.ask", "said");
const ASK = wordAt("9.ask", "ask");
const SHE = wordAt("9.home", "she");

/** The lockers after lunch: he leans on them and smiles at the ceiling; she comes up to him. */
const HE_LEANS = hall(-1.25, 0, -0.9);
const JO_FROM = hall(1.5, 0, -0.35);
const JO_STOPS = hall(-0.42, 0, -0.62);

/** The school gate, after the bell. He goes right, the way they always go. She does not. */
const GATE_HE: Vec3[] = [GYM.at(0.45, 0, 23.6), GYM.at(0.75, 0, 25.5), GYM.at(4.6, 0, 26.4)];
const GATE_JO: Vec3[] = [GYM.at(-0.45, 0, 23.6), GYM.at(-0.55, 0, 25.3), GYM.at(-3.4, 0, 26.2)];

/**
 * THE PRICE. He tells her. She gives him the best advice anybody gives him in the film, in three words, and then
 * she walks home the other way. Her heart is in every one of these pictures, and it is the size of how near he is.
 */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The price",
  shots: [
    {
      cue: "9.smile",
      ...cam.push({ on: hall(-0.82, 1.5, -0.8), dist: 4.1, to: 3.7, yaw: -14, pitch: 2, fov: 46 }),
      handheld: 0.012,
      zone: "hall",
      note: "He leans on the lockers and grins at the ceiling. Jo walks up to him, her heart swelling with every step, and waves a hand in front of his face on 'smiling'. He does not see the hand either.",
      stage: (t) => {
        const come = ease(ramp(t, -0.2, WHY + 0.1));
        const walk = stride(JO_FROM, JO_STOPS, come);
        return (
          <>
            <Hero position={HE_LEANS} rotationY={SOUTH + 0.15} animation="idle" face="grin" headPitch={-0.38} headRoll={Math.sin(t * 2.2) * 0.12} headYaw={-0.2} gaze={0} />
            {come < 1 ? (
              <Jo {...walk} animation="walk" face="smile" gaze={0} />
            ) : (
              <Jo position={JO_STOPS} rotationY={WEST + 0.55} animation="idle" arms={t > SMILING - 0.2 ? "wave" : undefined} face="uneasy" lookAt={faceOf(HE_LEANS)} gaze={0} />
            )}
            <Heart over={walk.position} size={joHeart(apart(walk.position, HE_LEANS))} yaw={-14} />
            <Classmate who={6} position={hall(3.4, 0, -0.95)} rotationY={SOUTH - 0.4} animation="talk" face="smile" />
            <Classmate who={9} position={hall(4.2, 0, -0.9)} rotationY={SOUTH + 0.5} animation="idle" face="grin" />
          </>
        );
      },
    },
    {
      cue: "9.ask",
      ...cam.push({ on: [JO_STOPS[0] + 0.06, 1.4, JO_STOPS[2]], dist: 2.85, to: 2.6, yaw: -28, pitch: -17, fov: 54 }),
      handheld: 0.012,
      zone: "hall",
      note: "From low down, her face and the whole of the heart over it while he tells her about Mia: the smile goes on 'Mia', and her eyes go down. Then she looks up and says it, and the three words are hers: ASK HER. The heart does not shrink by a hair: he is still standing next to her.",
      stage: (t) => {
        const told = ramp(t, MIA_W + 0.1, MIA_W + 0.3);
        const says = ramp(t, SAID + 0.1, SAID + 0.25);
        const speaking = t > ASK - 0.32 && t < ASK + 0.6 && Math.sin(t * 26) > 0;
        return (
          <>
            <Hero position={HE_LEANS} rotationY={SOUTH + 0.9} animation="idle" arms="talk" face="grin" lookAt={faceOf(JO_STOPS)} gaze={0} />
            <Jo
              position={JO_STOPS}
              rotationY={WEST + 0.55}
              animation="idle"
              arms={says > 0.5 ? "talk" : undefined}
              face={speaking ? "wow" : says > 0.5 ? "calm" : told > 0.5 ? "frown" : "smile"}
              headPitch={0.28 * told * (1 - says)}
              headYaw={-0.2 * told * (1 - says)}
              gaze={0}
            />
            <Heart over={JO_STOPS} size={joHeart(apart(JO_STOPS, HE_LEANS))} yaw={-28} />
            <Bubble text="ASK HER" position={[JO_STOPS[0] + 0.46, 1.74, JO_STOPS[2] + 0.3]} rotationY={-28 * DEG} scale={0.3 * pop(t, ASK - 0.32)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "9.home",
      from: GYM.at(-5.4, 1.7, 26.8),
      to: GYM.at(-5.0, 1.65, 26.6),
      target: GYM.at(-0.2, 1.4, 24.9),
      fov: 48,
      ease: "inOutSine",
      handheld: 0.012,
      zone: "gym",
      note: "From down the street: the school gate after the bell. They come out together; he turns right, the way they always walk, with his head in the clouds, and goes. She stops on the kerb and watches him, and then she comes the other way, towards us, and the heart over her shrinks with every step he takes.",
      stage: (t) => {
        // He never slows down. She stops where the path meets the street, waits for him to look round, and goes.
        const he = route(GATE_HE, 1.75 * (t + 0.55));
        const out = 1.75 * Math.min(t + 0.55, 1.0);
        const away = 1.5 * Math.max(0, t - SHE - 0.12);
        const jo = route(GATE_JO, out + away);
        const waits = t + 0.55 >= 1.0 && away <= 0;
        return (
          <>
            <Hero {...he} animation="walk" face="grin" headPitch={-0.3} headRoll={Math.sin(t * 3) * 0.08} gaze={0} />
            {waits ? (
              <Jo position={jo.position} rotationY={SOUTH + 0.5} animation="idle" face="frown" lookAt={faceOf(he.position)} gaze={0} />
            ) : (
              <Jo {...jo} animation="walk" face="frown" headPitch={away > 0 ? 0.22 : 0} gaze={0} />
            )}
            <Heart over={jo.position} size={joHeart(apart(jo.position, he.position))} yaw={-70} />
            <Classmate who={3} {...stride(GYM.at(-0.2, 0, 19), GYM.at(-0.2, 0, 22.6), ramp(t, -0.3, 2.3))} animation="walk" face="smile" />
            <Classmate who={7} {...stride(GYM.at(0.5, 0, 17.8), GYM.at(0.5, 0, 21.6), ramp(t, -0.3, 2.3))} animation="walk" face="grin" />
          </>
        );
      },
    },
  ],
});
