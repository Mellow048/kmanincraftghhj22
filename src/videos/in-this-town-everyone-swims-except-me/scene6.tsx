import { Glow, cam, storyScene } from "../../engine";
import {
  Chicken, Dive, Drops, EAST, Foam, HM, Hang, Hero, NORTH, P, PoolLife, Ring, SOUTH, Splash, Stars, Swim, WEST, WL, Wake, posed, sine, timing, tw, w,
  bandAt, hangBody,
  BUTTON, PressLabel,
} from "./kit";

/**
 * 06 THE RING — he puts it on, hits both ends of the pool with his head, and finds the buttons.
 *
 * Lane 4 again (z = +3). On MAX he crosses sixteen metres in under a second: he is a white line on the water and
 * then a noise at the far wall. The buttons: red is max, yellow is medium, green is low. It comes set to red.
 */
const LZ = 3;
const BLOCK = P(-8.6, 0.5, LZ);
const E_WALL = P(8, 0, LZ);
const W_WALL = P(-8, 0, LZ);
/** Where he stops to look at the thing: hanging on the south wall, his right forearm up on the white edge. */
const REST = P(-5.5, 0, 4.0);
/** About where the band is then: on his right wrist, on the coping. */

const armOnEdge: [number, number, number] = [-2.2, 0, 0];
/** The buttons on his wrist, as he rests: worked out from the pose, not guessed. They face east. */
const BAND = bandAt(hangBody(REST, SOUTH, 0.8, 0, 0.08, armOnEdge), undefined, -0.529, 0.1);

const MED = w("6.medium", "medium");
const LOW = w("6.medium", "low");
const SHORT = w("6.scared", "the");
const PRESS_LOW = w("6.low", "pressed");

/** Him at the rest place. `lit` is the button that is on. `press` 0–1 brings the left hand over to the band. */
const AtRest = ({ t, lit, press = 0, face, headPitch = 0.35 }: { t: number; lit: 1 | 2 | 3; press?: number; face: "surprised" | "uneasy" | "fear" | "hurt" | "frown"; headPitch?: number }) => (
  <Hang wall={REST} heading={SOUTH} k={0.8} t={t} kick={0.08} ring={lit} face={face} headPitch={headPitch} headYaw={-0.35} armR={armOnEdge} armL={press > 0 ? [-2.2 + 0.1 * press, 0, 0.55 * press] : undefined} />
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The ring",
  shots: [
    {
      cue: "6.morning",
      ...cam.push({ on: HM(0, 0.98, 0.85), dist: 1.9, to: 1.4, yaw: -18, pitch: 10, fov: 38 }),
      zone: "home",
      look: "warm-room",
      note: "Morning in his room, close on his two hands: the left one pushes the gold band over the right fist and up onto the wrist. It fits. It should not fit.",
      stage: (t) => {
        const on = tw(t, 0.15, 0.7);
        return (
          <>
            <Hero position={HM(0, 0, 0.5)} rotationY={SOUTH} pose={posed("idle", t, { armR: [-1.35, 0, -0.1], armL: [-1.35 + 0.15 * on, 0, 0.45] })} ring={on > 0.95 ? 1 : false} face={on > 0.95 ? "surprised" : "uneasy"} headPitch={0.5} />
            {on <= 0.95 ? <Ring position={HM(0.2, 0.95, 1.05 - on * 0.12)} rotation={[Math.PI / 2, 0, 0]} scale={4.3} glow={1.2} /> : null}
            <Glow position={HM(0.2, 0.95, 1.0)} size={0.5 + tw(t, 0.65, 0.8) * 0.5} color="#ffd98a" opacity={0.25 + tw(t, 0.65, 0.8) * 0.3} />
          </>
        );
      },
    },
    {
      cue: "6.luck",
      ...cam.push({ on: HM(0, 1.15, 0.5), dist: 2.6, to: 2.0, yaw: 14, pitch: 2, fov: 38 }),
      zone: "home",
      look: "warm-room",
      note: "He holds the fist up in the window light and looks at it on his wrist, and gives it one small hopeful nod, the way you would a lucky sock.",
      stage: (t) => (
        <>
          <Hero position={HM(0, 0, 0.5)} rotationY={SOUTH + 0.2} pose={posed("idle", t, { armR: [-2.25 + Math.sin(t * 3) * 0.05, 0, -0.25] })} ring={1} face="smile" headYaw={-0.3} headPitch={-0.1 + tw(t, 0.5, 0.75) * 0.25} />
          <Glow position={HM(-0.2, 1.5, 0.75)} size={0.6} color="#ffd98a" opacity={0.3} />
        </>
      ),
    },
    {
      cue: "6.alone",
      ...cam.push({ on: P(-2, 0, 0.5), dist: 19, to: 16, yaw: -70, pitch: 30, fov: 46 }),
      zone: "pool",
      look: "overworld-day",
      note: "The town pool with nobody in it: flat water, a float going round by itself, the lifeguard asleep on his chair. One red shirt comes in at the gate and looks about for a green one.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Hero position={P(-12.8 + t * 1.5, 0, 0.6)} rotationY={EAST} animation="walk" animDistance={t * 1.5} ring={1} face="neutral" headYaw={Math.sin(t * 3.2) * 0.7} />
        </>
      ),
    },
    {
      cue: "6.alone",
      cut: 1.18,
      ...cam.push({ on: P(-8.4, 1.15, LZ), dist: 3.2, to: 2.5, yaw: -112, pitch: 10, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Behind him on the block, alone: sixteen metres of empty lane in front of his toes, and the band on his wrist catching the sun.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Hero position={BLOCK} rotationY={EAST} pose={posed("idle", t, { bodyPitch: 0.15 + tw(t, 0.3, 0.9) * 0.3, bodyY: -tw(t, 0.3, 0.9) * 0.06 })} ring={1} face="brave" />
        </>
      ),
    },
    {
      cue: "6.dive",
      ...cam.push({ on: P(-6.2, 0.3, LZ), dist: 6.6, to: 5.8, yaw: -28, pitch: 20, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "From the deck: an ordinary dive, an ordinary splash — and then he is not there. A white line unrolls down the lane faster than the eye and off the edge of the frame.",
      stage: (t) => {
        const s = Math.max(0, t - 0.7);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Dive from={BLOCK} heading={EAST} t={t} at={0.2} reach={2.6} speed={17} rate={3} ring={1} face="brave" />
            {s > 0 ? <Wake from={P(-5.6, WL, LZ)} to={P(Math.min(7.2, -5.6 + 17 * s), WL, LZ)} t={t} size={1.3} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.bonk",
      ...cam.push({ on: P(7.5, 0.1, LZ), dist: 3.9, to: 3.2, yaw: 58, pitch: 22, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "The far wall: the white line arrives, and his head arrives at the tiles a moment before the rest of him. Water goes up over the edge. Stars come out.",
      stage: (t) => {
        const hit = 0.26;
        const x = Math.min(7.25, 2.8 + (t / hit) * 4.45);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            {t < hit ? (
              <Swim at={P(x, WL, LZ)} heading={EAST} mode="crawl" t={t} rate={3} ring={1} face="brave" foam={1.5} />
            ) : (
              <Hang wall={E_WALL} heading={EAST} k={0.35} t={t} kick={0} ring={1} face="dizzy" headYaw={Math.sin(t * 9) * 0.3 * Math.exp(-(t - hit) * 2)} />
            )}
            <Wake from={P(-1, WL, LZ)} to={P(Math.min(6.3, x - 0.6), WL, LZ)} t={t} size={1.2} />
            <Splash at={P(7.8, WL, LZ)} k={(t - hit) / 0.8} size={2.0} n={24} seed={2} />
            {t > hit ? <Stars at={P(7.3, 0.42, LZ)} t={t} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.side",
      ...cam.push({ on: P(1.5, 0, LZ), dist: 14, to: 12, yaw: 90, pitch: 30, fov: 46 }),
      zone: "pool",
      look: "overworld-day",
      note: "From over the far end, looking back: a foam road sixteen metres long, still fizzing, from the block to his chin. He turns round in the water and looks all the way down it.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Swim at={P(7.0, WL, LZ)} heading={EAST + tw(t, 0.15, 0.8) * Math.PI} mode="tread" t={t} ring={1} face="surprised" />
          <Wake from={P(-5.6, WL, LZ)} to={P(6.2, WL, LZ)} t={t} size={1.25 - t * 0.3} />
        </>
      ),
    },
    {
      cue: "6.back",
      ...cam.push({ on: P(-2.5, 0, LZ), dist: 8.6, to: 7.2, yaw: -90, pitch: 19, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "From behind the block: at the far end a small red head goes under, and the white line comes back up the lane straight at the lens like a fuse.",
      stage: (t) => {
        const k = Math.min(1, Math.max(0, (t - 0.3) / 0.8));
        const x = 7.0 - k * 14.2;
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Swim at={P(x, WL, LZ)} heading={WEST} mode="crawl" t={t} rate={3} ring={1} face="brave" foam={1.6} />
            {k > 0 ? <Wake from={P(7.0, WL, LZ)} to={P(x + 0.7, WL, LZ)} t={t} size={1.3} seed={5} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.bonk2",
      ...cam.push({ on: P(-7.6, 0.2, LZ), dist: 3.0, to: 2.3, yaw: -56, pitch: 27, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Down on the near wall: forehead, tiles, the same noise. He bobs back off it with his eyes crossed and a new set of stars going round the other way.",
      stage: (t) => {
        const hit = 0.1;
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Hang wall={[W_WALL[0] + Math.max(0, hit - t) * 14 + (t > hit ? Math.sin((t - hit) * 5) * 0.12 * Math.exp(-(t - hit) * 2) : 0), 0, LZ]} heading={WEST} k={0.35} t={t} kick={0} ring={1} face={t > hit ? "dizzy" : "brave"} headYaw={t > hit ? Math.sin(t * 8) * 0.35 : 0} />
            <Splash at={P(-7.8, WL, LZ)} k={(t - hit) / 0.8} size={1.8} n={22} seed={6} />
            {t > hit ? <Stars at={P(-7.25, 0.45, LZ)} t={-t} n={5} /> : null}
            <Wake from={P(-1, WL, LZ)} to={P(-6.6, WL, LZ)} t={t} size={1.1 - t * 0.4} seed={3} />
          </>
        );
      },
    },
    {
      cue: "6.same",
      ...cam.push({ on: P(6.2, 0, LZ), dist: 6.4, to: 5.4, yaw: 150, pitch: 62, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "From high over the far wall: the line comes down the lane a third time and stops dead on the tiles in a burst of white.",
      stage: (t) => {
        const hit = 0.42;
        const x = Math.min(7.25, -3 + (t / hit) * 10.25);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            {t < hit ? <Swim at={P(x, WL, LZ)} heading={EAST} mode="crawl" t={t} rate={3} ring={1} foam={1.5} /> : <Hang wall={E_WALL} heading={EAST} k={0.35} t={t} kick={0} ring={1} face="dizzy" />}
            <Wake from={P(-3, WL, LZ)} to={P(Math.max(-2.9, x - 0.6), WL, LZ)} t={t} size={1.2} />
            <Splash at={P(7.8, WL, LZ)} k={(t - hit) / 0.6} size={2.0} n={24} seed={9} />
            {t > hit ? <Stars at={P(7.3, 0.42, LZ)} t={t} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.same",
      cut: 0.9,
      ...cam.push({ on: P(-6.4, 0, LZ), dist: 6.0, to: 5.2, yaw: -150, pitch: 60, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "And over the near wall: back it comes, and stops dead on those tiles too. A chicken on the deck has started watching the ends, like tennis.",
      stage: (t) => {
        const hit = 0.38;
        const x = Math.max(-7.25, 3 - (t / hit) * 10.25);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            {t < hit ? <Swim at={P(x, WL, LZ)} heading={WEST} mode="crawl" t={t} rate={3} ring={1} foam={1.5} /> : <Hang wall={W_WALL} heading={WEST} k={0.35} t={t} kick={0} ring={1} face="dizzy" />}
            <Wake from={P(3, WL, LZ)} to={P(Math.min(2.9, x + 0.6), WL, LZ)} t={t} size={1.2} seed={4} />
            <Splash at={P(-7.8, WL, LZ)} k={(t - hit) / 0.6} size={2.0} n={24} seed={8} />
            {t > hit ? <Stars at={P(-7.3, 0.42, LZ)} t={t} /> : null}
            <Chicken position={P(-6.2, 0.04, 4.7)} rotationY={t < hit ? 1.6 : -2.4} scale={1.3} phase={0.3} />
          </>
        );
      },
    },
    {
      cue: "6.dream",
      ...cam.top({ on: P(-1, 0, 2.6), height: 3.3, to: 4.6, spin: [0, 38], fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down: he floats on his back in the middle of the pool with his arms out, turning slowly, looking at the sky, three stars still going round his head.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Swim at={P(-1, WL, 2.6)} heading={EAST + t * 0.35} mode="float" t={t} ring={1} face="dizzy" />
          <Stars at={P(-1 - Math.sin(Math.PI / 2 + t * 0.35) * 0.72, 0.1, 2.6 - Math.cos(Math.PI / 2 + t * 0.35) * 0.72)} t={t * 0.6} n={3} r={0.34} />
          <Foam at={P(-1, WL, 2.6)} t={t * 0.3} size={1.6} n={6} />
        </>
      ),
    },
    {
      cue: "6.hurt",
      ...cam.push({ on: P(-5.5, 0.16, 3.72), dist: 2.5, to: 1.8, yaw: 14, pitch: 22, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "Close from the deck: he hangs on the side with one hand and holds his forehead with the other, teeth shut. Dreams do not come with this.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Hang wall={REST} heading={SOUTH} k={0.75} t={t} kick={0.08} ring={1} face="hurt" headPitch={0.1} armR={[-2.75, 0, -0.75]} />
          <Stars at={P(-5.5, 0.5, 3.75)} t={t * 0.5} n={3} r={0.3} />
        </>
      ),
    },
    {
      cue: "6.looked",
      ...cam.push({ on: [BAND[0] - 0.12, 0.18, BAND[2] - 0.12], dist: 2.0, to: 1.25, yaw: 58, pitch: 30, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "The hand comes down off his head onto the white edge, and there it is on his wrist in front of his nose. His eyes go to it and stay there.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Hang wall={REST} heading={SOUTH} k={0.8} t={t} kick={0.08} ring={1} face={t < 0.45 ? "hurt" : "surprised"} headPitch={0.35} headYaw={-0.35 * tw(t, 0.2, 0.5)} armR={[-2.75 + tw(t, 0, 0.4) * 0.55, 0, -0.75 * (1 - tw(t, 0, 0.4))]} />
          <Glow position={BAND} size={0.35 + tw(t, 0.4, 0.8) * 0.3} color="#ffd98a" opacity={0.35} />
        </>
      ),
    },
    {
      cue: "6.buttons",
      ...cam.orbit({ on: BAND, dist: 1.0, distTo: 0.72, yaw: 112, yawTo: 70, pitch: 26, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "As close as the lens goes: the wet gold band on a wet red sleeve on the tiles, and along it three raised buttons in a row. Red. Yellow. Green.",
      stage: (t) => (
        <>
          <AtRest t={t} lit={1} face="surprised" />
          <Glow position={BAND} size={0.4} color="#ffd98a" opacity={0.3} />
        </>
      ),
    },
    {
      cue: "6.medium",
      ...cam.push({ on: BAND, dist: 0.72, to: 0.55, yaw: 70, pitch: 30, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "The three buttons, lighting one after another as he works out what each one is: red on 'max', yellow on 'medium', green on 'low'. Red is the one that was on.",
      stage: (t) => {
        const lit = t < MED - 0.05 ? 1 : t < LOW - 0.05 ? 2 : 3;
        return (
          <>
            <AtRest t={t} lit={lit} face="uneasy" />
            {/* each dot is named as it lights */}
            <PressLabel key={lit} at={[BAND[0] + 0.02, BAND[1] + 0.13, BAND[2]]} t={t} from={lit === 1 ? 0.05 : lit === 2 ? MED - 0.05 : LOW - 0.05} text={BUTTON[lit][0]} color={BUTTON[lit][1]} yaw={70} pitch={30} height={0.05} />
            <Glow position={BAND} size={0.3 + Math.sin(t * 10) * 0.03} color={lit === 1 ? "#ff8a7a" : lit === 2 ? "#ffe28a" : "#9ff0c0"} opacity={0.4} />
          </>
        );
      },
    },
    {
      cue: "6.scared",
      ...cam.push({ on: [BAND[0] - 0.14, 0.18, BAND[2] - 0.1], dist: 1.7, to: 1.3, yaw: 62, pitch: 30, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "His other hand comes across, wet finger out, and goes down on the yellow one. It lights. He looks up the lane.",
      stage: (t) => {
        const press = tw(t, 0.1, 0.5);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <AtRest t={t} lit={press > 0.9 ? 2 : 1} press={press} face="uneasy" />
            <PressLabel at={[BAND[0], BAND[1] + 0.3, BAND[2]]} t={t} from={0.46} text="MEDIUM" color={BUTTON[2][1]} yaw={62} pitch={30} height={0.11} />
            <Glow position={BAND} size={0.3 + press * 0.3} color="#ffe28a" opacity={0.25 + press * 0.3} />
          </>
        );
      },
    },
    {
      cue: "6.scared",
      cut: Math.max(0.6, SHORT - 0.05),
      ...cam.push({ on: P(-5.4, 0.3, LZ), onTo: P(1.6, 0.3, LZ), dist: 2.8, to: 8.5, yaw: -90, pitch: 12, fov: 62, fovTo: 23 }),
      zone: "pool",
      look: "overworld-day",
      note: "Behind him as he pushes off: the lens pulls back and squeezes, and the far wall, the board and the hedge come rushing up the lane to meet him. The pool has gone short.",
      stage: (t, { p }) => {
        const x = -5.6 + 7.2 * sine(p);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Swim at={P(x, WL, LZ)} heading={EAST} mode="crawl" t={t} rate={2.4} ring={2} foam={1.3} />
            <Wake from={P(-6.5, WL, LZ)} to={P(x - 0.8, WL, LZ)} t={t} size={0.9} />
          </>
        );
      },
    },
    {
      cue: "6.low",
      ...cam.push({ on: P(1.6, 0.14, 3.1), dist: 2.8, to: 2.0, yaw: 8, pitch: 16, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "He has stopped in the middle, breathing hard, eyes wide, holding the wrist up out of the water. One finger finds the green button and pushes it like a doorbell.",
      stage: (t) => {
        const press = tw(t, PRESS_LOW - 0.15, PRESS_LOW + 0.2);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Swim
              at={P(1.6, WL, 3.0)}
              heading={SOUTH}
              mode="tread"
              t={t}
              ring={press > 0.9 ? 3 : 2}
              pose={posed("idle", t, { bodyPitch: 0.08, armR: [-1.75, 0, -0.1], armL: [-1.7, 0, 0.3 + 0.35 * press], legR: [Math.sin(t * 6) * 0.5, 0, 0.2], legL: [-Math.sin(t * 6) * 0.5, 0, -0.2], head: [0.25, -0.2, 0] })}
              face={press > 0.9 ? "uneasy" : "fear"}
            />
            <Glow position={P(1.4, 0.2, 3.45)} size={0.4 + press * 0.3} color={press > 0.9 ? "#9ff0c0" : "#ffe28a"} opacity={0.35} />
            <PressLabel at={P(1.6, 0.6, 3.2)} t={t} from={PRESS_LOW + 0.15} text="LOW" color={BUTTON[3][1]} yaw={8} pitch={16} height={0.13} />
          </>
        );
      },
    },
    {
      cue: "6.fast",
      ...cam.truck({ on: P(-4.2, 0.1, LZ), dist: 5.6, yaw: 60, pitch: 22, fov: 42, by: [6.0, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Leading him down the lane: a real stroke now, long and even, a clean arrowhead of wake — and a grin every time his face comes round for air.",
      stage: (t, { p }) => {
        const x = -4.2 + 6.0 * sine(p);
        return (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Swim at={P(x, WL, LZ)} heading={EAST} mode="crawl" t={t} rate={1.8} ring={3} face="grin" foam={1.1} />
            <Wake from={P(x - 4.5, WL, LZ)} to={P(x - 1.0, WL, LZ)} t={t} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "6.how",
      ...cam.orbit({ on: P(-2, 0.98, 5.0), dist: 3.4, distTo: 2.9, yaw: -28, yawTo: 18, pitch: 7, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Round him on the deck, dripping: he holds the wrist up and turns it one way and the other, looking for where the swimming is kept. The chicken looks too.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} kids={false} />
          <Hero position={P(-2, 0.04, 5.0)} rotationY={SOUTH} pose={posed("idle", t, { armR: [-2.0, Math.sin(t * 5) * 0.4, -0.2], armL: [-2.6, 0, 0.5] })} ring={3} face="uneasy" headYaw={-0.3} headPitch={-0.05} />
          <Drops top={P(-2, 0.9, 5.0)} t={t} height={0.8} spread={0.25} n={8} speed={1.4} />
          <Chicken position={P(-1.0, 0.04, 5.5)} rotationY={-1.9} scale={1.3} phase={0.9} />
        </>
      ),
    },
    {
      cue: "6.shrug",
      ...cam.push({ on: P(-2, 0.9, 4.8), dist: 3.6, to: 3.1, yaw: 16, pitch: 8, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "He looks at us, both shoulders go up to his ears and down again, and he turns round and jumps back in.",
      stage: (t) =>
        t < 0.62 ? (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Hero position={P(-2, 0.04, 5.0)} rotationY={SOUTH} animation="shrug" ring={3} face="smile" />
            <Chicken position={P(-1.0, 0.04, 5.5)} rotationY={-1.9} scale={1.3} phase={0.9} />
          </>
        ) : (
          <>
            <PoolLife lanes={[]} kids={false} />
            <Dive from={P(-2, 0.04, 4.6)} heading={NORTH} t={t} at={0.8} reach={2.0} ring={3} face="grin" />
            <Chicken position={P(-1.0, 0.04, 5.5)} rotationY={-2.6} scale={1.3} phase={0.9} />
          </>
        ),
    },
  ],
});
