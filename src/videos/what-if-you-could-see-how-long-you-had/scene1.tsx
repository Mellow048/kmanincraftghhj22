import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Classmate, Figure, Hero, Icon, ME, NORTH, R, SOUTH, SPOT, Teacher, WEST, ease, ramp, timing, wordAt } from "./kit";

/**
 * HOOK, and the rule.
 *
 * The power has ONE look for the whole film: a NUMBER over a head, with a small clock badge. It is set here, in the
 * first shot, and it never changes size, colour or part - except that it counts down, which is the only thing about
 * it that ever changes.
 *
 * Sizes are the story: 40 is small and calm, 4 is the one in front of him, 2 and 3 are the jokes, and the number is
 * carried by the icon's own count (`Figure` is not used - a clock is a clock, not a number on a card).
 */

const SEE = wordAt("1.what", "see");
const LIVE = wordAt("1.live", "live");
const TEMPER = wordAt("1.temper", "temper");
const FOUR = wordAt("2.before", "four");
const UP = wordAt("2.up", "shouting");

/**
 * THE POWER'S ONE LOOK.
 *
 * A NUMBER over a head, in big white cubes with a dark outline, and a small clock turned on its side next to it so
 * the viewer can see WHAT the number is. This is `Figure` and not `Overhead` for one measured reason: `Overhead`'s
 * clock icon is a pale outline on a pale classroom wall, and on the first stills run it could not be seen at all.
 * A number six cubes high with an outline reads at the size a phone is held.
 *
 * The number is the rule. There is no size to interpret: `40` over a calm man and `4` over the boy who goes off.
 */
const Clock: React.FC<{ over: Vec3; n: string; t: number; tall?: number; size?: number; tint?: string; rotationY?: number }> = ({ over, n, t, tall = 1.34, size = 0.5, tint = "#ffffff", rotationY = 0 }) => {
  const at: Vec3 = [over[0], over[1] + tall + 0.42 + size * 0.5, over[2]];
  const pop = ease(Math.min(1, Math.max(0, t / 0.25)));
  if (t < 0) return null;
  return (
    <group position={[at[0], at[1], at[2]]} rotation={[0, rotationY, 0]} scale={[0.6 + 0.4 * pop, 0.6 + 0.4 * pop, 0.6 + 0.4 * pop]}>
      <Figure text={n} position={[0, 0, 0]} height={size} depth={0.55} color={tint} outline glow={0.5} castShadow={false} />
      <Icon kind="clock" position={[0, size * 0.78, 0]} height={size * 0.44} depth={0.5} color={tint} outline glow={0.6} castShadow={false} />
    </group>
  );
};

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook and the rule",
  shots: [
    {
      // THE HOOK. The power as one picture: the teller's back at the bottom of the frame, the class stacked ahead of
      // him, and over the head in front of him a clock at four - while the boy's own line is still being asked.
      cue: "1.what",
      // THE HOOK, and it has to be the strange thing on frame one, not a room. Close and low over the boy in the
      // front row: one face with a clock at four over it, and the rest of the class falling away behind. The old
      // wide put the teller's back in the middle of frame and the clock the size of a fingernail.
      ...cam.push({ on: SPOT.face(1, 0), dist: 1.55, to: 1.28, yaw: 6, pitch: -3, fov: 40 }),
      zone: "class",
      note: "THE HOOK, and the power in one picture: the teller's back low in the frame, the class stacked away in front of him, the board at the top, and over the boy in the front row a clock at four. Nothing else in the school has one, so the clock is the only bright thing above the heads.",
      stage: (t) => (
        <>
          {[0, 2].flatMap((col) => [0, 1, 2].map((row) => <Classmate key={`${col}${row}`} who={col * 3 + row + 4} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.35} />
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <Clock over={SPOT.seat(1, 0)} n="4" t={t - SEE} size={0.7} rotationY={0.0} />
        </>
      ),
    },
    {
      // Not how long you had to live. The clock is a clock, not a timer on a life: one small tick past it.
      cue: "1.live",
      ...cam.push({ on: SPOT.at(0, 1.62, 0.4), dist: 3.4, to: 3.0, yaw: 4, pitch: -6, fov: 42 }),
      zone: "class",
      note: "Up to the clock itself on the word: it hangs over the front row, small, plain, ordinary, the way a clock is ordinary when it is counting something that is not a life. The heads underneath are calm and the clock is calm. This is the picture that says the film is not about dying.",
      stage: (t) => (
        <>
          <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Clock over={SPOT.seat(1, 0)} n="4" t={t - LIVE} size={0.62}  rotationY={0.0698}/>
        </>
      ),
    },
    {
      // How long before you lost your temper: the clock starts to run. Same clock, and now it is winding down.
      cue: "1.temper",
      ...cam.push({ on: SPOT.at(1, 1.4, 0.2), dist: 2.9, to: 2.4, yaw: 28, pitch: 6, fov: 44 }),
      zone: "class",
      note: "The clock from the side, and it begins to run: the boy under it starts to fidget, and the thing over his head gets smaller as the line says what it counts. Two people, one small bright clock, no explanation - the viewer works out the rule of the film from this one shot.",
      stage: (t) => {
        const shrink = 0.62 - 0.12 * ease(ramp(t, 0, 1.3));
        return (
          <>
            <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="uneasy" headPitch={0.1} />
            <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
            <Clock over={SPOT.seat(1, 0)} n="4" t={t - TEMPER} size={shrink}  rotationY={0.4887}/>
          </>
        );
      },
    },
    {
      // One morning, I could. Round on the teller: the one who can see it. A new face on the cut.
      cue: "1.me",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.0, to: 1.6, yaw: 172, pitch: 2, fov: 36 }),
      zone: "class",
      note: "Cut round to the teller's face from the board side: the one who can see it, and the only person in the room looking at something nobody else is. His eyes are up, not on the board. Behind him is the back wall of the room, because the lens is inside it now.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" gaze={0} />
          <pointLight position={[ME[0], 1.7, ME[2] + 0.9]} color="#fff2d8" intensity={4} distance={3} decay={2} />
        </>
      ),
    },
    {
      // The boy in front of me had four. The clock is nearly out, and the boy has not noticed.
      cue: "2.before",
      ...cam.push({ on: SPOT.at(0, 1.4, 0.6), dist: 3.0, to: 2.5, yaw: 8, pitch: 8, fov: 42 }),
      zone: "class",
      note: "The clock at four, and the boy under it with his pen still moving. The joke is the gap between the two: a number that small over somebody that calm. The teller's shoulder is at the bottom of the frame, close, so the viewer knows whose eyes this is.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="uneasy" headPitch={-0.06} />
          <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.25} />
          <Clock over={SPOT.seat(1, 0)} n="4" t={t - FOUR} size={0.60}  rotationY={0.1396}/>
        </>
      ),
    },
    {
      // Four seconds. I did not know four what. On the clock, and it is running out.
      cue: "2.four",
      ...cam.push({ on: SPOT.at(1, 1.7, 0.3), dist: 2.2, to: 1.85, yaw: -14, pitch: -10, fov: 38 }),
      zone: "class",
      note: "Hard on the clock, from under it, so it fills the top of the frame and the boy's head is a dark shape under it. It is going down while he says he did not know four what. The audience does not know either, and the clock is not going to tell them.",
      stage: (t) => {
        const s = 0.6 - 0.08 * ease(ramp(t, 0, 1.5));
        return (
          <>
            <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.2} />
            <Clock over={SPOT.seat(1, 0)} n="4" t={t - 0.1} size={s}  rotationY={-0.2443}/>
          </>
        );
      },
    },
    {
      // Then his shoulders went up, and he was shouting at the teacher. The payoff of the last line, on the word.
      cue: "2.up",
      ...cam.push({ on: SPOT.at(1.2, 1.45, -0.8), dist: 4.2, to: 3.6, yaw: 208, pitch: 4, fov: 46 }),
      zone: "class",
      note: "From the board side: the boy is up out of his chair at the teacher with both hands out, and the whole front row has turned to look. His clock is gone - not run out of sight, gone. That is the first time the film shows what zero looks like, and the teller is at the bottom of the frame watching it happen.",
      stage: (t) => {
        const up = ease(ramp(t, 0, UP));
        return (
          <>
            <Classmate who={3} position={[SPOT.seat(1, 0)[0], 0.12 * up, SPOT.seat(1, 0)[2]]} rotationY={NORTH + 0.4 * up} animation={up > 0.4 ? "idle" : "sit"} face={up > 0.3 ? "frown" : "calm"} headPitch={0.2 - 0.2 * up} />
            <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
            <Teacher position={SPOT.teacher} animation="idle" face="ouch" />
            <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="wow" headPitch={-0.1} />
          </>
        );
      },
    },
    {
      // My teacher had forty. He was fine. A calm, wide picture: the joke is the size of the number over a man at ease.
      cue: "3.teacher",
      ...cam.push({ on: SPOT.at(-0.3, 1.45, -2.6), dist: 4.6, to: 4.2, yaw: 38, pitch: 5, fov: 44 }),
      zone: "class",
      note: "The teacher at the board with a clock at forty over his head, writing, perfectly happy. Wide and calm on purpose: after the boy went off, the film shows a man with ten times the number who is not going to. The rule is not 'short clock, about to go off' - it is 'short clock, going off soon'.",
      stage: (t) => (
        <>
          <Teacher position={SPOT.teacher} animation="idle" face="calm" />
          <Clock over={SPOT.teacher} n="40" tall={1.8} t={t} size={0.50} tint="#e8f2ff"  rotationY={0.6632}/>
        </>
      ),
    },
    {
      // The dinner lady had two, so I let people go first. A tiny clock, a small kindness, played as routine.
      cue: "3.lady",
      ...cam.push({ on: SPOT.at(2.4, 1.3, 2.6), dist: 3.6, to: 3.0, yaw: -52, pitch: 2, fov: 46 }),
      zone: "class",
      note: "The back of the room and the door: a dinner lady with a clock at two, and the teller stepping out of the way to let her past. He does not look at her face, he looks at the number - which is the whole character in one picture, and the reason the last act costs him something.",
      stage: (t) => (
        <>
          <Hero position={[ME[0] + 0.5, 0, ME[2] - 0.9]} rotationY={NORTH - 0.7} animation="idle" face="calm" />
          <Classmate who={7} position={[ME[0] + 2.2, 0, ME[2] - 2.2]} rotationY={SPOT.door ? NORTH : NORTH} animation="walk" face="calm" headPitch={0.1} />
          <Clock over={[ME[0] + 2.2, 0, ME[2] - 2.2]} n="2" tall={1.8} t={t} size={0.52} tint="#e8f2ff"  rotationY={-0.9076}/>
        </>
      ),
    },
    {
      // My brother had three. I gave him the remote before he asked. At home, at night: the power works on the sofa.
      cue: "3.brother",
      ...cam.push({ on: R(0, 1.05, -1.05), dist: 2.4, to: 2.0, yaw: 180, pitch: 7, fov: 44 }),
      zone: "room",
      note: "The teller's own room with the wardrobe and the books behind them: his little brother sitting on the floor with a big clock at three over his head, and the teller already holding out the remote before the boy can ask. The clock is BIG because the number is small - the size is how close the person is to going off, and this one is nearly out.",
      stage: (t) => (
        <>
          <Hero position={R(0.8, 0, -0.55)} rotationY={WEST} animation="idle" face="smile" />
          <Classmate who={9} position={R(-0.15, 0, -1.35)} rotationY={SOUTH} animation="sit" face="grin" headPitch={-0.1} />
          <Clock over={R(-0.15, 0, -1.35)} n="3" tall={1.0} t={t} size={0.52}  rotationY={3.1416}/>
        </>
      ),
    },
    {
      // This was going to be easy. The teller, pleased with himself, in the room he has just handled.
      cue: "3.easy",
      ...cam.push({ on: R(0.8, 1.15, -0.55), dist: 1.9, to: 1.5, yaw: 40, pitch: 3, fov: 36 }),
      zone: "room",
      note: "Close on the teller's face, well inside the room this time, and he is delighted with himself - which is the wrong expression a third of the way into a film about a power. The viewer should feel the floor under him before he does.",
      stage: () => (
        <>
          <Hero position={R(0.8, 0, -0.55)} rotationY={WEST} animation="idle" face="grin" />
          <pointLight position={R(0.55, 1.6, 0.4)} color="#fff2d8" intensity={4} distance={3} decay={2} />
        </>
      ),
    },
    {
      // A clock told you when. Nothing told you why. The limit, said out loud once: no picture of a clock at all.
      cue: "3.limit",
      ...cam.push({ on: R(0, 1.15, -0.8), dist: 1.8, to: 3.4, yaw: 180, pitch: 2, fov: 50 }),
      zone: "room",
      note: "The whole room from the far wall, the teller small in it, and NO clock anywhere in the frame: the line that names the limit is the one line with the power taken out of the picture. Pulling back instead of pushing in makes it the stillest shot in the film, which is what a rule sounds like.",
      stage: () => <Hero position={R(0.9, 0, -0.4)} rotationY={WEST} animation="idle" face="calm" />,
    },
  ],
});
