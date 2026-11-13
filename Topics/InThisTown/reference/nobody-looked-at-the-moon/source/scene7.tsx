import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bucket, CHILD, EAST, Folk, Friend, HAT_BACK, Hero, IronGolem, KID, PLACE, ROBE, WEST, ease, golemHand, jolt, ramp, timing, wordAt } from "./kit";

const TIPPED = wordAt("7.tip", "tipped");
const DROPPED = wordAt("7.bucket", "dropped");
const LANDS = DROPPED + 0.26;
const WEEK = wordAt("7.week", "week");
const KNOCK_1 = wordAt("7.knock", "knocked");
const KNOCK_2 = wordAt("7.knock", "on") + 0.06;

/**
 * Where he stands to do it: at the top of the square, facing south, at the moon over his own roof.
 * (From any nearer his house, the roof is in the way.)
 */
const ME: Vec3 = [0, 0, -0.7];
/** Where the golem ends up: right behind him, so that its right hand, raised, is over his head. */
const GOLEM: Vec3 = [-0.69, 0, -2.0];
const ARM_UP = -2.376;
const HAND = golemHand(GOLEM, 0, ARM_UP);
/** The rim of the bucket when it is on his head. */
const ON_HEAD = 1.3 * KID;
/** His eyes, for the one shot that is what he sees. */
const EYES: Vec3 = [ME[0], 1.2, ME[2] + 0.12];

/** The post of the board with the rule on it. He finds it with his head. */
const POST = PLACE.sign;
/** Where the town knocks on him. */
const KNOCKED: Vec3 = [-4.0, 0, 3.6];

/** THE HAT AND THE BUCKET. First try: straight up. The town has an answer for that, and it is made of iron. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The hat and the bucket",
  shots: [
    {
      cue: "7.tip",
      ...cam.push({ on: [ME[0], 1.3, ME[2]], dist: 2.5, to: 2.1, yaw: 5, pitch: -4, fov: 42 }),
      zone: "village",
      note: "'I tipped my hat back': him, hand on the brim. On 'tipped' it goes back, and for the first time there is nothing between his face and the sky. Over the top of his hat, the golem has come down the lane and stopped.",
      stage: (t) => {
        const k = ease(ramp(t, TIPPED, TIPPED + 0.5));
        const arrive = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Hero position={ME} animation="idle" blendTo="reachUp" blend={1 - ease(ramp(t, TIPPED - 0.4, TIPPED))} face={k > 0.5 ? "wow" : "brave"} gaze={0} headPitch={-0.42 * k} hatTilt={HAT_BACK - 0.5 * k} />
            <IronGolem position={[GOLEM[0], 0, GOLEM[2] - 2.2 * (1 - arrive)]} walk={2.2 * arrive} headPitch={0.1 + 0.4 * ease(ramp(t, TIPPED, TIPPED + 0.3))} hat />
          </>
        );
      },
    },
    {
      cue: "7.edge",
      ...cam.pan({ from: EYES, on: [0, 7.2, EYES[2] + 10], onTo: [0, 7.95, EYES[2] + 10], fov: 44 }),
      zone: "village",
      note: "'I saw one white edge': his own eyes. The underside of the brim fills the sky, and as it lifts, in the gap between the straw and his roof, there is one white edge of something very big.",
      stage: (t) => {
        // The white comes in under the straw on "one", and is all there by "white". (Sums worked from his eyes:
        // the lip of the brim passes the foot of the moon at a tip of 0.29, and at 0.34 a third of it shows.)
        const tip = 0.14 + 0.2 * ease(ramp(t, 0.1, 0.72)) + 0.02 * ramp(t, 0.72, 1.43);
        return (
          <group position={[ME[0], 1.42, ME[2]]} rotation={[-tip, 0, 0]}>
            <Block size={[2.8, 0.03, 1.4]} color="#a8892e" emissive="#7a5f1c" emissiveIntensity={0.4} castShadow={false} />
            <Block position={[0, -0.02, 0.68]} size={[2.8, 0.07, 0.07]} color="#b08f2c" castShadow={false} />
          </group>
        );
      },
    },
    {
      cue: "7.bucket",
      ...cam.push({ on: [0, 1.9, ME[2] - 0.2], dist: 3.9, to: 3.5, yaw: 8, pitch: -11, fov: 44 }),
      impacts: [{ at: LANDS, amp: 0.035, dur: 0.3 }],
      zone: "village",
      note: "'The iron golem dropped a bucket over my head': the arm comes over him from behind, as slow as a crane. On 'dropped' it lets go. The bucket lands, his hat jumps, and comes down again on top of the bucket.",
      stage: (t) => {
        const arm = -0.4 + (ARM_UP + 0.4) * ease(ramp(t, 0, 0.85));
        const hand = golemHand(GOLEM, 0, arm);
        const fall = ramp(t, DROPPED, LANDS) ** 2;
        const landed = t >= LANDS;
        const hop = Math.sin(ramp(t, LANDS, LANDS + 0.5) * Math.PI);
        return (
          <>
            <Hero
              position={ME}
              animation={landed ? "scared" : "idle"}
              face="wow"
              gaze={0}
              headPitch={landed ? 0 : -0.42}
              hat={landed ? "bucket" : "on"}
              hatTilt={landed ? 0.25 * hop + jolt(t, LANDS + 0.5, 0.25) : HAT_BACK - 0.5}
              hatLift={0.5 * hop}
            />
            <IronGolem position={GOLEM} armR={landed ? ARM_UP + 1.2 * ease(ramp(t, LANDS + 0.2, LANDS + 0.9)) : arm} headPitch={0.5} hat />
            {landed ? null : (
              <Bucket
                position={[hand[0] + (ME[0] - hand[0]) * fall, hand[1] - 0.27 + (ON_HEAD - (HAND[1] - 0.27)) * fall, hand[2] + (ME[2] - hand[2]) * fall]}
                rotation={[Math.PI * fall, 0, 0]}
                scale={KID}
                swing={0.25 * (1 - fall)}
              />
            )}
          </>
        );
      },
    },
    {
      cue: "7.week",
      ...cam.truck({ on: [POST[0] - 0.8, 1.05, POST[2]], dist: 3.5, yaw: 6, pitch: -3, by: [0.5, 0, 0], fov: 42 }),
      impacts: [{ at: WEEK, amp: 0.02, dur: 0.2 }],
      zone: "village",
      note: "'I wore it for a week': him, crossing the square with his arms out in front and a bucket for a head, the hat still on top of it. On 'week' he finds the post of the board with the rule on it.",
      stage: (t) => {
        const from = POST[0] - 1.12;
        const x = Math.min(POST[0] - 0.3, from + 1.5 * t) - 0.12 * ramp(t, WEEK, WEEK + 0.12);
        return (
          <>
            <Hero
              position={[x, 0, POST[2]]}
              rotationY={EAST}
              animation="walk"
              arms="hold"
              animDistance={Math.min(x - from, 1.5 * t)}
              hat="bucket"
              hatTilt={jolt(t, WEEK, 0.5)}
              hatLift={Math.abs(jolt(t, WEEK, 0.12))}
              headRoll={jolt(t, WEEK, 0.2)}
            />
            <Folk position={[1.1, 0, 5.9]} rotationY={0.5} robe={ROBE.white} phase={1.9} />
          </>
        );
      },
    },
    {
      cue: "7.knock",
      ...cam.push({ on: [KNOCKED[0], 1.2, KNOCKED[2]], dist: 5.2, to: 4.7, yaw: -2, pitch: -3, fov: 42 }),
      zone: "village",
      note: "'Everybody knocked on it': nobody here has hands, so they knock with their noses. One on 'knocked', one after it. His best friend stands by and just looks up at him.",
      stage: (t) => {
        const peck = (at: number) => Math.sin(ramp(t, at - 0.14, at + 0.14) * Math.PI);
        return (
          <>
            <Hero position={KNOCKED} animation="idle" hat="bucket" hatTilt={jolt(t, KNOCK_1, 0.3) - jolt(t, KNOCK_2, 0.3)} headRoll={jolt(t, KNOCK_1, 0.16) - jolt(t, KNOCK_2, 0.16)} />
            <Folk position={[KNOCKED[0] - 0.95, 0, KNOCKED[2] - 0.2]} rotationY={EAST - 0.2} robe={ROBE.brown} lean={0.34 * peck(KNOCK_1)} nod={0.2} phase={0.3} />
            <Folk position={[KNOCKED[0] + 0.95, 0, KNOCKED[2] - 0.2]} rotationY={WEST + 0.2} robe={ROBE.blue} lean={0.34 * peck(KNOCK_2)} nod={0.2} phase={3.4} />
            <Friend position={[KNOCKED[0] + 0.7, 0, KNOCKED[2] + 0.9]} rotationY={-2.48} scale={CHILD} nod={-0.3} tilt={0.14} />
          </>
        );
      },
    },
  ],
});
