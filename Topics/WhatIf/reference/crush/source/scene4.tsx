import { Block, cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { BEN, Ben, Class, Classmate, Cookie, CookieStack, EAST, GYM, GymTeacher, HEART, Heart, Held, Hero, LILY, LUNCH, Lily, MathTeacher, NORTH, SOUTH, SPOT, Sandwich, TALL, ease, ramp, timing, wordAt } from "./kit";

const DOUBLED = wordAt("4.ben", "doubled");
const SAT = wordAt("4.ben", "sat");
const SHARING = wordAt("4.lunch", "sharing");
const COOKIE = wordAt("4.cookie", "cookie");
const HANDS = wordAt("4.hands", "holding");

/** 4.lunch: the two of them on one bench, facing the lens. */
const BEN_EATS = LUNCH.seat(0, "n", 0.42);
const LILY_EATS = LUNCH.seat(0, "n", -0.42);
/** 4.cookie: his table, and the ones who wait behind him. */
const SHOP = LUNCH.seat(1, "n", 0);
const QUEUE: Vec3[] = [LUNCH.at(2.05, 0, -2.75), LUNCH.at(3.3, 0, -2.85)];
const PAYER = LUNCH.at(1.72, 0, -1.72);
/** 4.hands: the middle of the gym floor. */
const SHE = GYM.at(-0.37, 0, 0.6);
const HE = GYM.at(0.37, 0, 0.6);

/**
 * THE FUN. He uses it, and it works: Ben and Lily, then cookies, then two teachers. Three "by…" lines, three places,
 * each bigger than the last. Two of the film's places are shown here in daylight (the lunch room, the gym), so that
 * the viewer knows them when the story comes back.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The fun",
  shots: [
    {
      cue: "4.ben",
      ...cam.push({ on: SPOT.at(2.22, 1.3, 2.0), dist: 3.8, to: 3.4, yaw: 196, pitch: 6, fov: 46 }),
      zone: "class",
      note: "Ben's desk, with Lily at the desk behind him. He makes Ben sit, stand and sit again, and her heart doubles each time Ben sits. It is the picture of him and Jo, one desk over, and he is standing right in it.",
      stage: (t) => {
        // Sitting: 0 = on his feet, 1 = in the chair. Down on "doubled", up again, down on "sat down".
        const sit = ease(ramp(t, DOUBLED - 0.3, DOUBLED)) - ease(ramp(t, DOUBLED + 0.3, DOUBLED + 0.55)) + ease(ramp(t, SAT - 0.1, SAT + 0.2));
        return (
          <>
            <Class without={["ben", "lily", "me"]} />
            <Ben position={BEN} rotationY={NORTH} animation="sit" blendTo="idle" blend={sit} face={sit > 0.5 && t > SAT ? "grin" : "uneasy"} />
            <Lily position={LILY} rotationY={NORTH} animation="sit" face="smile" headPitch={0.22} />
            <Heart over={LILY} tall={TALL.seated} size={HEART.mid * (1 + sit)} yaw={196} />
            <Hero position={SPOT.at(1.72, 0, 1.45)} rotationY={EAST - 0.5} animation="talk" face="grin" lookAt={[BEN[0], 1.2, BEN[2]]} />
          </>
        );
      },
    },
    {
      cue: "4.lunch",
      ...cam.push({ on: LUNCH.at(-2.7, 1.32, -1.9), dist: 3.4, to: 3.0, yaw: 8, pitch: 6, fov: 40 }),
      zone: "lunch",
      note: "Ben and Lily on one bench with half a sandwich each, and two hearts so big that they have run into one another. It worked. The lunch room, in daylight: it comes back at 8.line.",
      stage: (t) => {
        const lean = ease(ramp(t, SHARING - 0.2, SHARING + 0.4));
        return (
          <>
            <Ben position={BEN_EATS} rotationY={SOUTH} animation="sit" arms="hold" face="grin" headRoll={0.14 * lean} headYaw={0.3 * lean} />
            <Lily position={LILY_EATS} rotationY={SOUTH} animation="sit" arms="hold" face="grin" headRoll={-0.14 * lean} headYaw={-0.3 * lean} />
            <Held by={BEN_EATS} facing={SOUTH} out={0.34} up={0.86}>
              <Sandwich position={[0, 0, 0]} rotation={[0.5, 0.3, 0]} />
            </Held>
            <Held by={LILY_EATS} facing={SOUTH} out={0.34} up={0.86}>
              <Sandwich position={[0, 0, 0]} rotation={[0.5, -0.3, 0]} />
            </Held>
            <Heart over={BEN_EATS} tall={TALL.seated} size={0.5} t={t + 1} yaw={8} />
            <Heart over={LILY_EATS} tall={TALL.seated} size={0.5} t={t + 2.2} yaw={8} />
          </>
        );
      },
    },
    {
      cue: "4.cookie",
      ...cam.push({ on: LUNCH.at(2.7, 1.12, -1.75), dist: 3.3, to: 2.8, yaw: -7, pitch: 9, fov: 42 }),
      zone: "lunch",
      note: "He has a business. A pile of cookies climbs on the table beside him until it is as high as his head, one for each question, and the next two customers wait behind him with a cookie each and a heart over each head.",
      stage: (t) => {
        const paid = ease(ramp(t, COOKIE - 0.25, COOKIE + 0.1));
        return (
          <>
            <Hero position={SHOP} rotationY={SOUTH} animation="sit" arms="talk" face="grin" headYaw={-0.5} />
            <CookieStack position={LUNCH.top(1, 0.62, -0.06)} count={5 + 7 * ramp(t, 0.1, COOKIE - 0.3) + paid} />
            <Classmate who={6} position={PAYER} rotationY={EAST + 0.2} animation="idle" arms="reach" face="smile">
              {paid < 0.6 ? <Cookie position={[0, -0.04, 0.03]} rotation={[0.3, 0, 0]} scale={0.9} /> : null}
            </Classmate>
            <Heart over={PAYER} size={HEART.small * 1.3} yaw={-7} />
            {QUEUE.map((at, i) => (
              <group key={i}>
                <Classmate who={i ? 10 : 1} position={at} rotationY={SOUTH} animation="idle" arms="hold" face={i ? "smile" : "grin"} phase={i * 1.3} />
                <Held by={at} facing={SOUTH} out={0.3} up={0.82}>
                  <Cookie position={[0, 0, 0]} rotation={[0.9, 0, 0]} />
                </Held>
                <Heart over={at} size={i ? HEART.mid : HEART.small} yaw={-7} t={t + i} />
              </group>
            ))}
          </>
        );
      },
    },
    {
      cue: "4.hands",
      ...cam.push({ on: GYM.at(0, 1.32, 0.5), dist: 6.2, to: 5.6, yaw: -5, pitch: 4, fov: 44 }),
      zone: "gym",
      note: "The gym, in daylight: the two teachers side by side in the middle of the floor, hand in hand, with a heart each as tall as they are, and the class running laps round them. This is the room the film ends in.",
      stage: (t) => {
        const close = ease(ramp(t, HANDS - 0.5, HANDS + 0.2));
        return (
          <>
            <MathTeacher position={SHE} rotationY={SOUTH + 0.12} animation="idle" face={close > 0.5 ? "grin" : "smile"} headRoll={-0.12 * close} headYaw={0.35 * close} />
            <GymTeacher position={HE} rotationY={SOUTH - 0.12} animation="idle" face="grin" headRoll={0.12 * close} headYaw={-0.35 * close} />
            <Heart over={SHE} tall={TALL.adult} size={0.5 + 0.5 * close} yaw={-5} t={t + 1.1} />
            <Heart over={HE} tall={TALL.adult + 0.06} size={0.5 + 0.5 * close} yaw={-5} t={t + 2.6} />
            {[0, 1, 2, 3].map((i) => {
              const lap = stride(GYM.at(-7.4 + i * 1.5, 0, -2.6 - (i % 2) * 0.9), GYM.at(4.4 + i * 1.5, 0, -2.6 - (i % 2) * 0.9), ramp(t, -0.4, 3.4));
              return <Classmate key={i} who={[6, 9, 1, 11][i]} {...lap} animation="run" face="grin" phase={i * 0.4} />;
            })}
            {/* their two hands, in one */}
            <Block position={GYM.at(0, 0.71, 0.62)} size={[0.2, 0.16, 0.16]} color="#c9906a" />
          </>
        );
      },
    },
  ],
});
