import type React from "react";
import { Block, cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Classmate, DEG, EAST, Figure, Heart, Held, Hero, Icon, Jo, NORTH, SOUTH, Stars, SubscribeSign, WEST, apart, ease, hall, joHeart, pop, ramp, timing, wordAt } from "./kit";
import { HER_LOCKER } from "./scene1";
import { HALL_KIDS, hallKid } from "./scene3";

const EVERY = wordAt("14.gone", "every");
const GONE = wordAt("14.gone", "gone");
const JO_W = wordAt("14.loud", "jo");
const LOUD = wordAt("14.loud", "loud");
const TELL = wordAt("14.sub", "tell");
const WHAT = wordAt("14.sub", "what");
const THREW = wordAt("14.sub", "threw");
const HIT = THREW + 0.12;

/** Where he stops to ask her: an arm's length from her locker. */
const HE_ASKS: Vec3 = hall(0.66, 0, -0.72);
const HE_FROM: Vec3 = hall(-2.2, 0, -0.72);
/** Both of them turned a little to the lens, so that a face is a face and not the side of a box. */
const HE_FACES = EAST - 0.4;
const JO_FACES = WEST + 0.4;
/** Jo with her back to the hall, at her locker: north, reached by turning away from the lens. */
const TO_LOCKER = -Math.PI;

/**
 * WHAT HE SAYS, out loud: the film's question in two signs. The bubble is the one Jo's ASK HER came in (9.ask);
 * the heart in it is the only one in the school that anybody but him can see.
 */
const Asks: React.FC<{ position: Vec3; rotationY: number; scale: number }> = ({ position, rotationY, scale }) => {
  if (scale <= 0.01) return null;
  const w = 0.86;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block size={[w + 0.09, 0.53, 0.03]} color="#15151a" castShadow={false} />
      <Block position={[0, 0, 0.012]} size={[w, 0.44, 0.03]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.45} castShadow={false} />
      <Block position={[-w * 0.24, -0.3, 0]} size={[0.15, 0.15, 0.03]} color="#15151a" castShadow={false} />
      <Block position={[-w * 0.24, -0.27, 0.012]} size={[0.09, 0.13, 0.03]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.45} castShadow={false} />
      <Icon kind="heart" position={[-0.19, 0, 0.05]} height={0.3} depth={0.4} glow={0.5} shadow={false} castShadow={false} />
      <Figure text="?" position={[0.21, 0, 0.05]} height={0.3} depth={0.4} color="#16161c" shadow={false} castShadow={false} />
    </group>
  );
};

/**
 * THE OLD WAY. The power goes in the night, the way it came. What is left is the hall, Jo's locker, and a thing
 * he has to do with his mouth. The last heart in the film is the one he could never see: his own, over his own
 * head, the size of how near she is.
 */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The old way",
  shots: [
    {
      cue: "14.gone",
      ...cam.push({ on: hall(1.9, 1.42, 0.2), dist: 4.9, to: 4.1, yaw: -90, pitch: 6, fov: 44 }),
      handheld: 0.012,
      zone: "hall",
      note: "The hall where the hearts first appeared, through the same lens: he walks at us looking over every head, and behind him they go out one after another, from the far doors to the nearest, like lamps. By 'gone' there is not one left.",
      stage: (t) => {
        const walk = stride(hall(3.1, 0, 0.2), hall(1.5, 0, 0.2), ramp(t, -0.2, 2.3));
        return (
          <>
            <Hero {...walk} animation="walk" face={t > GONE ? "frown" : "uneasy"} headYaw={Math.sin(t * 3.4) * 0.6} headPitch={-0.2} gaze={0} />
            {HALL_KIDS.map(([x, side, who, size], i) => {
              const at = hallKid(x, side);
              // The farthest goes out first: the dark comes down the hall towards him.
              const out = EVERY - 0.3 + (HALL_KIDS.length - 1 - i) * 0.13;
              return (
                <group key={i}>
                  <Classmate who={who} position={at} rotationY={side < 0 ? SOUTH + (i % 2 ? 0.5 : -0.4) : NORTH + (i % 2 ? 0.4 : -0.5)} animation={i % 3 === 0 ? "talk" : "idle"} face={i % 2 ? "smile" : "grin"} phase={i * 0.7} />
                  {size > 0 ? <Heart over={at} size={size} yaw={-90} fade={ramp(t, out, out + 0.16)} /> : null}
                </group>
              );
            })}
          </>
        );
      },
    },
    {
      cue: "14.loud",
      ...cam.orbit({ on: hall(1.0, 1.36, -0.8), dist: 4.6, distTo: 3.95, yaw: 68, yawTo: 8, pitch: 2, fov: 46 }),
      handheld: 0.012,
      zone: "hall",
      note: "Jo at her locker, where the film began, and him coming up the hall to her. Nobody in this school has a heart over their head any more: except that we can see one over his, and it is swelling with every step he takes towards her, the way hers did. The lens swings round to face them as he stops. On 'out loud' he opens his mouth, and what comes out is a heart and a question mark.",
      stage: (t, { p }) => {
        const walk = stride(HE_FROM, HE_ASKS, 1 - (1 - ramp(t, -0.1, JO_W + 0.55)) ** 1.6);
        const there = t > JO_W + 0.55;
        const turn = ease(ramp(t, JO_W - 0.05, JO_W + 0.3));
        const says = t > LOUD - 0.2;
        // The heart faces the lens, and the lens is going round them.
        const yaw = 68 + (8 - 68) * (0.5 - 0.5 * Math.cos(Math.PI * p));
        return (
          <>
            {there ? (
              <Hero position={HE_ASKS} rotationY={HE_FACES} animation="idle" arms={says ? "talk" : undefined} face={says ? (Math.sin(t * 24) > 0 ? "wow" : "smile") : "brave"} gaze={0} />
            ) : (
              <Hero {...walk} animation="walk" face="brave" gaze={0} />
            )}
            <Heart over={walk.position} size={joHeart(apart(walk.position, HER_LOCKER))} yaw={yaw} />
            <Jo position={HER_LOCKER} rotationY={TO_LOCKER + (JO_FACES - TO_LOCKER) * turn} animation="idle" arms={turn < 0.3 ? "reach" : undefined} face={says ? "wow" : turn > 0.5 ? "smile" : "calm"} gaze={0} />
            <Asks position={[HE_ASKS[0] + 0.52, 1.74, HE_ASKS[2] + 0.12]} rotationY={yaw * DEG} scale={0.62 * pop(t, LOUD - 0.2)} />
            <Classmate who={6} position={hall(-4.4, 0, -0.95)} rotationY={SOUTH + 0.4} animation="talk" face="smile" />
            <Classmate who={9} position={hall(-5.3, 0, 1.35)} rotationY={NORTH - 0.4} animation="idle" face="grin" />
            <Classmate who={4} position={hall(-3.5, 0, 1.35)} rotationY={NORTH + 0.5} animation="idle" face="smile" />
          </>
        );
      },
    },
    {
      cue: "14.sub",
      ...cam.push({ on: hall(0.92, 1.36, -0.8), dist: 3.95, to: 3.7, yaw: 8, pitch: 2, fov: 46 }),
      handheld: 0.012,
      impacts: [{ at: HIT, amp: 0.08, dur: 0.4 }],
      zone: "hall",
      note: "He turns to us and holds up the red sign, grinning over the top of it, his heart still over his head. Behind him Jo turns to her locker on 'tell you', puts an arm in up to the shoulder, and comes round with it wound back. On 'threw' it lands: stars, his head knocked sideways, the sign swinging. What it was is not in the picture.",
      stage: (t) => {
        const turned = ease(ramp(t, 0, 0.28));
        const toLocker = ease(ramp(t, TELL - 0.25, TELL + 0.05)) - ease(ramp(t, WHAT - 0.05, WHAT + 0.2));
        const after = t - HIT;
        const knock = after > 0 ? Math.exp(-after * 5) : 0;
        const sign = pop(t, 0.05, 0.26);
        return (
          <>
            <Hero position={HE_ASKS} rotationY={HE_FACES + (SOUTH - HE_FACES) * turned} animation="idle" arms="hold" face={after > 0 && after < 0.45 ? "ouch" : "grin"} headRoll={0.5 * knock * Math.cos(after * 16)} headYaw={-0.3 * knock} gaze={0} />
            <Heart over={HE_ASKS} size={joHeart(apart(HE_ASKS, HER_LOCKER))} yaw={8} />
            <Held by={HE_ASKS} facing={SOUTH} out={0.3} up={1.04}>
              <SubscribeSign position={[0, 0, 0]} scale={0.45 * sign} tilt={(sign > 0 ? Math.sin(t * 9) * 0.06 * Math.exp(-t * 2.4) : 0) + 0.22 * knock * Math.sin(after * 15)} />
            </Held>
            <Jo
              position={HER_LOCKER}
              rotationY={JO_FACES + (TO_LOCKER - JO_FACES) * toLocker}
              animation="idle"
              arms={toLocker > 0.5 ? "reach" : t > WHAT + 0.1 && t < THREW ? "reachUp" : t >= THREW && after < 0.35 ? "reach" : undefined}
              face={t > WHAT ? "grin" : "smile"}
              gaze={0}
            />
            <Stars position={[HE_ASKS[0] + 0.2, 1.32, HE_ASKS[2] + 0.05]} t={after} seed={7} />
            <Stars position={[HE_ASKS[0] + 0.24, 1.2, HE_ASKS[2] + 0.12]} t={after - 0.04} seed={3} />
          </>
        );
      },
    },
  ],
});
