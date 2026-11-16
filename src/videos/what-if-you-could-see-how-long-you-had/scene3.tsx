import type { Vec3 } from "../../engine";
import { cam, storyScene } from "../../engine";
import { Classmate, Figure, Icon, EAST, HALL, Hero, ME, NORTH, SPOT, ease, ramp, timing, wordAt } from "./kit";

/**
 * THE WEEK, AND THE EDGE.
 *
 * The middle of the film, and the part part 4 got wrong: the teller is in every single shot, doing something, and
 * when the camera looks away from him it is because he is looking at something. He is never a spectator here.
 *
 * The edge is the longest beat after the rule, on purpose: it is where the viewer has to slow down with him.
 */

const WEEK = wordAt("7.week", "week");
const HANDS = wordAt("7.hands", "bad");
const WRONG2 = wordAt("7.wrong2", "busy");
const QUIET = wordAt("8.quiet", "quiet");
const EXCEPT = wordAt("8.easy2", "except");
const MINE = wordAt("10.mine", "looked");
const TEN = wordAt("10.ten", "ten");


/** The power, drawn the way a phone can read it: the NUMBER, white, outlined, with a small clock badge on top. */
const BigNumber: React.FC<{ n: string; over: Vec3; t?: number; tall?: number; size?: number; color?: string; tint?: string; fade?: number; rotationY?: number }> = ({ n, over, t = 1, tall = 1.34, size = 0.5, color, tint, fade = 0, rotationY = 0 }) => {
  const s = (1 - Math.min(1, Math.max(0, fade))) * (0.6 + 0.4 * Math.min(1, Math.max(0, t / 0.25)));
  if (s <= 0.01) return null;
  const at: Vec3 = [over[0], over[1] + tall + 0.42 + size * 0.5, over[2]];
  const c = color ?? tint ?? "#ffffff";
  return (
    <group position={at} rotation={[0, rotationY, 0]} scale={[s, s, s]}>
      <Figure text={n} position={[0, 0, 0]} height={size} depth={0.55} color={c} outline glow={0.5} castShadow={false} />
      <Icon kind="clock" position={[0, size * 0.78, 0]} height={size * 0.44} depth={0.5} color={c} outline glow={0.6} castShadow={false} />
    </group>
  );
};

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The week, and the edge",
  shots: [
    {
      // So I spent a week being the only calm person in school. The camera tracks with him through the hallway and
      // everything around him is going wrong, and he is the only one walking.
      cue: "7.week",
      ...cam.truck({ on: HALL.at(-2.0, 1.15, 0.35), dist: 3.0, yaw: -90, pitch: 5, fov: 46, by: [3.4, 0, 0] }),
      zone: "hall",
      note: "Tracking along the lockers beside him while a fight goes on behind his shoulder: two kids at it, a teacher coming, and the teller walking through the middle of it completely unbothered because he knew it was coming. The calm man in a corridor full of noise is the picture of the whole middle of this film.",
      stage: (t) => {
        const k = ramp(t, 0, 2.4);
        return (
          <>
            <Hero position={HALL.at(-2.0 + 3.0 * k, 0, 0.3)} rotationY={EAST} animation="walk" animDistance={3.0 * k} face="calm" />
            <Classmate who={4} position={HALL.at(-1.1, 0, -1.15)} rotationY={NORTH - 0.4} animation="idle" face="frown" />
            <Classmate who={7} position={HALL.at(0.7, 0, -1.3)} rotationY={NORTH + 0.6} animation="idle" face="frown" />
            <BigNumber n="12" over={HALL.at(-1.1, 0, -1.15)} size={0.62} t={t - WEEK} rotationY={-1.5708} />
          </>
        );
      },
    },
    {
      // I got very good at school that week. I was very bad at people. His grades, and an empty chair beside him.
      cue: "7.hands",
      ...cam.push({ on: SPOT.at(1.4, 1.0, 0.6), dist: 3.0, to: 2.6, yaw: 150, pitch: 16, fov: 44 }),
      zone: "class",
      note: "Down on his desk: a page covered in right answers and his hand flat on it, and in the row beside him a chair with nobody sitting in it. The line is a joke about being good at school; the picture is the price, and the two are in the same frame so the joke lands and hurts at once.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" headPitch={0.25} />
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Classmate who={9} position={SPOT.seat(0, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <BigNumber n="40" over={SPOT.seat(0, 1)} size={0.62} t={t - HANDS}   rotationY={2.618} />
        </>
      ),
    },
    {
      // I did not talk to anybody. I was too busy reading them. The classroom from above, him alone at a desk.
      cue: "7.wrong2",
      ...cam.top({ on: SPOT.at(0.6, 0.4, 0.4), height: 2.7, to: 2.3 }),
      zone: "class",
      note: "Straight down on the back of the room: the teller at his desk on his own, and every other kid in the shot leaning away from him. From above, a kid sitting by himself is the loneliest picture the camera can make, and it needs no line to explain it.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          {[0, 2].flatMap((col) => [0, 1].map((row) => <Classmate key={`${col}${row}`} who={col * 2 + row + 4} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.35} />))}
          <BigNumber n="40" over={SPOT.seat(0, 1)} size={0.62} t={t - WRONG2} rotationY={0} />
        </>
      ),
    },
    {
      // Then one day the school was quiet. Every clock was far off. The calm wide shot: every clock in the frame is
      // big and far away, and the whole room is at rest. The misdirection: it reads as him being good at this.
      cue: "8.quiet",
      ...cam.orbit({ on: SPOT.at(0, 1.3, 0.4), dist: 5.4, yaw: 186, yawTo: 200, pitch: 12, fov: 50 }),
      zone: "class",
      note: "The whole class from the board side, swinging round: every head in the frame has a big calm clock over it, forty, sixty, ninety, at 0:55 of a two-minute film. It is the most peaceful shot so far, and the audience should be waiting for the catch, because that is what a quiet frame this late means.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
          {[0, 2].flatMap((col) => [0, 1, 2].map((row) => <Classmate key={`${col}${row}`} who={col * 3 + row + 2} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <BigNumber n="40" over={SPOT.seat(0, 0)} size={0.62} t={t - QUIET}   rotationY={3.2463}/>
          <BigNumber n="40" over={SPOT.seat(2, 1)} size={0.62} t={t - QUIET - 0.15}   rotationY={3.2463}/>
          <BigNumber n="40" over={SPOT.seat(1, 1)} size={0.62} t={t - QUIET - 0.3}   rotationY={3.2463}/>
        </>
      ),
    },
    {
      // Every clock except one, and it was over my head. He looks up. The camera goes with him.
      cue: "8.easy2",
      ...cam.push({ on: SPOT.at(1, 1.55, 1.6), dist: 3.0, to: 2.5, yaw: 192, pitch: -12, fov: 46 }),
      zone: "class",
      note: "From under his chin looking up: the ceiling, the lights, and then his own clock coming down into frame above his own head. He has spent the whole film looking at other people's and the camera has never once been above his, and now the audience sees it before he does.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face={t > EXCEPT ? "fear" : "calm"} headPitch={-0.25} />
          <BigNumber n="10"over={ME} size={0.62} t={t - EXCEPT}   rotationY={3.351}/>
        </>
      ),
    },
    {
      // I had never looked at mine. Ten. Close on his face and the clock above it at the same time.
      cue: "10.mine",
      ...cam.push({ on: SPOT.at(1, 1.45, 2.0), dist: 2.9, to: 2.5, yaw: 170, pitch: -6, fov: 42 }),
      zone: "class",
      note: "The composition the film has been saving: his face, eyes up, and his own clock at ten in the same frame over his head. One shot, both things, because this is the reversal and it must not be split across a cut where the viewer could miss the connection.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="fear" headPitch={-0.2} />
          <BigNumber n="10"over={ME} size={0.62} t={t - MINE}   rotationY={2.9671}/>
        </>
      ),
    },
    {
      // It said ten. Hard on the clock on its own, and nothing else in the frame: the number is the whole shot.
      cue: "10.ten",
      ...cam.push({ on: [ME[0], 2.05, ME[2]], dist: 1.5, to: 1.25, yaw: 0, pitch: 0, fov: 34 }),
      zone: "class",
      note: "Nothing but the clock, filling the frame, at ten: no face under it, no room around it. It is the smallest object the film has ever put on screen and it is the loudest thing in it. A hard cut in from a two-shot to this is the beat that turns the film over.",
      stage: (t) => <BigNumber n="10"over={ME} size={0.62} t={t - TEN}   rotationY={0.0}/>,
    },
  ],
});
