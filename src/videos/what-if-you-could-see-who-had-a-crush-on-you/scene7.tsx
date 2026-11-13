import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Class, EAST, HEART, Heart, Hero, Jo, JO, MIA, Mia, NORTH, SPOT, Stars, TALL, WEST, cueStart, ease, ramp, route, timing, wordAt } from "./kit";

const GROW = wordAt("7.walk", "grow");
const BONK = wordAt("7.door", "door");

/** Where the heart he is watching floats. */
const HER_HEART: Vec3 = [MIA[0], TALL.seated + 0.44, MIA[2]];
/** 7.walk: he creeps along the front of the room, past her desk. Then he turns his back on where he is going. */
const CREEP: Vec3[] = [SPOT.at(-3.35, 0, -1.72), SPOT.at(-1.98, 0, -1.72)];
/** 7.watch and 7.door: backwards along the front, round the corner of the teacher's desk, into the door (east wall). */
const BACKWARDS: Vec3[] = [SPOT.at(0.7, 0, -1.85), SPOT.at(3.3, 0, -1.95), SPOT.at(4.43, 0, -2.5)];
const AT_THE_DOOR = BACKWARDS[2];
/** One walk, cut in two: how far along `BACKWARDS` he is, in seconds since 7.watch began. He hits the door on 'door'. */
const SINCE_WATCH = cueStart("7.door") - cueStart("7.watch");
const LENGTH = 2.6 + 1.257;
const along = (s: number) => LENGTH * ramp(s, -0.15, SINCE_WATCH + BONK);

/**
 * THE FIRST TRY. He walks past her desk to see her heart grow, and walks into a door instead. The heart does not
 * move, and the reason is in the picture: the desk two behind hers is empty. Leo is not in the room.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The first try",
  shots: [
    {
      cue: "7.walk",
      ...cam.push({ on: SPOT.at(-2.5, 1.5, -1.0), dist: 3.2, to: 2.9, yaw: 8, pitch: 7, fov: 48 }),
      handheld: 0.012,
      zone: "class",
      note: "From behind her: the back of her head, her small heart over it, and him creeping across the front of the room on tiptoe, left to right, with his eyes fixed on the heart. It does not change. By the end he has turned round to keep watching it, and is walking backwards.",
      stage: (t) => {
        const p = ease(ramp(t, 0.1, GROW + 0.25));
        const walk = route(CREEP, 1.37 * p);
        // Past her desk he turns to face it, so that he can go on looking: his back is now the way he is going.
        const turn = ease(ramp(t, GROW - 0.5, GROW + 0.2));
        return (
          <>
            <Class without={["me", "leo", "mia"]} />
            <Mia position={MIA} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
            <Heart over={MIA} tall={TALL.seated} size={HEART.small} yaw={8} />
            <Hero position={walk.position} rotationY={EAST - Math.PI * turn} animation="creep" animDistance={walk.animDistance} face={p > 0.45 ? "wow" : "grin"} lookAt={HER_HEART} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "7.watch",
      ...cam.truck({ on: SPOT.at(0.75, 1.12, -1.85), dist: 2.25, yaw: -90, pitch: 2, fov: 40, by: [1.65, 0, -0.06] }),
      shake: 0.012,
      zone: "class",
      note: "His face, close, walking backwards with his eyes wide and never off the heart. The lens backs away with him. Over his shoulder the door comes up the room at us, and he is the only one who cannot see it.",
      stage: (t) => {
        const walk = route(BACKWARDS, along(t));
        return (
          <>
            <Class without={["me", "leo"]} />
            <Heart over={MIA} tall={TALL.seated} size={HEART.small} yaw={-90} />
            <Hero position={walk.position} rotationY={WEST} animation="walk" animDistance={-walk.animDistance} face="wow" headPitch={-0.1} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "7.door",
      ...cam.push({ on: SPOT.at(4.15, 1.15, -2.4), dist: 3.5, to: 3.1, yaw: -38, pitch: 6, fov: 44 }),
      impacts: [{ at: BONK, amp: 0.1, dur: 0.45 }],
      zone: "class",
      note: "The door, and him backing into the frame towards it, still looking the other way. On 'door' the back of his head meets it: stars, his arms fly up, and he bounces off it.",
      stage: (t) => {
        const walk = route(BACKWARDS, along(SINCE_WATCH + t));
        const after = t - BONK;
        const off = after > 0 ? 0.42 * (1 - Math.exp(-after * 7)) : 0;
        const at: Vec3 = [walk.position[0] - off, 0, walk.position[2] + off * 0.25];
        return (
          <>
            <Class without={["me", "leo"]} />
            {after > 0 ? (
              <Hero position={at} rotationY={WEST} animation="fall" face="ouch" headPitch={0.5 * Math.exp(-after * 5)} gaze={0} />
            ) : (
              <Hero position={at} rotationY={WEST} animation="walk" animDistance={-walk.animDistance} face="wow" headPitch={-0.1} gaze={0} />
            )}
            <Stars position={[AT_THE_DOOR[0] + 0.14, 1.3, AT_THE_DOOR[2]]} t={after} seed={7} />
          </>
        );
      },
    },
    {
      cue: "7.laugh",
      ...cam.push({ on: SPOT.at(-2.35, 1.2, 0.7), onTo: SPOT.at(-2.4, 1.36, -0.1), dist: 3.9, to: 2.7, yaw: 196, pitch: 8, fov: 46 }),
      handheld: 0.012,
      zone: "class",
      note: "The class laughs, and Mia laughs with them. The lens goes in on her heart: the same small size it was when he started. And the desk two behind hers is empty: the tall kid in green is not in the room today.",
      stage: (t) => (
        <>
          <Class without={["me", "leo", "jo", "mia"]} laugh />
          <Mia position={MIA} rotationY={NORTH} animation="sit" arms="laugh" face="laugh" headYaw={-0.28} headRoll={Math.sin(t * 9) * 0.05} />
          <Jo position={JO} rotationY={NORTH} animation="sit" face="uneasy" lookAt={AT_THE_DOOR} gaze={0} />
          <Heart over={MIA} tall={TALL.seated} size={HEART.small} yaw={196} />
        </>
      ),
    },
  ],
});
