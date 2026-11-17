import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, EAST, Friend, Hero, ME, NORTH, SOUTH, SPOT, WEST, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * "Hook and the jokes" — cues 1.if → 6.read.
 *
 * THE POWER'S ONE LOOK, and it is the same in every shot of the film: wherever the teller stands, his shadow is a
 * flat black pawn on the wall or the floor behind him, and it is doing something he is not. It never changes shape
 * or colour. The only thing that changes is WHAT it is doing.
 *
 * Flat black on purpose: a shadow is the cheapest effect there is, and it reads at a glance on a phone because it
 * is the only pure black thing in a room made of beige and green.
 */

/** The shadow. Flat, black, and always in the same pose family: head, body, two arms, two legs. */
const Shadow: React.FC<{ at: Vec3; rotationY?: number; scale?: number; arm?: number; leg?: number; opacity?: number; sitting?: boolean }> = ({
  at,
  rotationY = 0,
  scale = 1,
  arm = 0,
  leg = 0,
  opacity = 0.82,
  sitting = false,
}) => (
  <group position={at} rotation={[0, rotationY, 0]} scale={[scale, scale, scale]}>
    <Block size={[0.34, 0.34, 0.03]} position={[0, sitting ? 0.62 : 1.22, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.4, sitting ? 0.36 : 0.52, 0.03]} position={[0, sitting ? 0.3 : 0.79, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.13, 0.42, 0.03]} position={[-0.27, (sitting ? 0.42 : 0.86) + arm * 0.16, 0]} rotation={[0, 0, -0.1 - arm * 0.9]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.13, 0.42, 0.03]} position={[0.27, sitting ? 0.42 : 0.86, 0]} rotation={[0, 0, 0.1 + arm * 0.4]} color="#05050a" opacity={opacity} castShadow={false} />
    {sitting ? (
      <Block size={[0.44, 0.12, 0.03]} position={[0, 0.06, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    ) : (
      <>
        <Block size={[0.14, 0.5, 0.03]} position={[-0.11, 0.28, 0]} rotation={[0, 0, leg]} color="#05050a" opacity={opacity} castShadow={false} />
        <Block size={[0.14, 0.5, 0.03]} position={[0.11, 0.28, 0]} rotation={[0, 0, -leg]} color="#05050a" opacity={opacity} castShadow={false} />
      </>
    )}
  </group>
);

/** The classroom's north wall, just in front of the board: where the shadow plays for the whole first half. */
const WALL: Vec3 = SPOT.at(0, 0, -3.885);
/** Where his shadow actually is: well to the right of him, on a part of the board he is not standing in front of. */
const WALL_ASIDE: Vec3 = SPOT.at(1.75, 0, -3.885);

/** The house the shadow draws: three windows, one door. Used twice here and once at the end of the film. */
const DrawnHouse: React.FC<{ at: Vec3; scale?: number; draw?: number }> = ({ at, scale = 1, draw = 1 }) => (
  <group position={at} scale={[scale, scale, scale]}>
    <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, 0.6]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, -0.6]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[0.08 * draw, 0.62, 0.03]} position={[-0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[0.08 * draw, 0.62, 0.03]} position={[0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[1.28 * draw, 0.07, 0.03]} position={[0, -0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    {[-0.36, 0, 0.36].map((x) => (
      <Block key={x} size={[0.17, 0.15, 0.03]} position={[x, 0.14, 0]} color="#05050a" opacity={0.8 * draw} castShadow={false} />
    ))}
  </group>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook and the jokes",
  shots: [
    {
      // THE HOOK. The question over the one picture that explains it.
      cue: "1.if",
      // THE HOOK, and it took three tries. `on` is what the lens LOOKS AT, so looking at the boy keeps him dead centre
      // and the board behind him dead centre too - his head lands on the shadow's hand at every yaw. The lens now looks
      // at the SHADOW's own height on the board (WALL is the foot of it): the waving figure fills frame one, and he is
      // the small dark thing at the bottom edge.
      // He is turned away, so we read the shadow - the wrong one of the two - first.
      // THE HOOK, fourth and last try, and the rule that came out of it: a shadow behind a person is a shadow you
      // cannot see, from any angle, because `on` is the look point. So the hook is not "him and his shadow" - it is
      // the shadow ALONE, a metre and a half to the right of him, waving at nothing. That is also the better image:
      // frame one is a hand that is not doing what its owner is doing.
      ...cam.push({ on: SPOT.at(1.75, 1.05, -3.885), dist: 2.5, to: 2.2, yaw: 6, pitch: 1, fov: 40 }),
      zone: "class",
      note: "The question, over the picture that answers it: the teller standing in front of the board, and on the board behind him a flat black shadow with its arm up, waving. It is his size, it is in the right place, and it is doing the one thing he is not.",
      stage: (t) => (
        <>
          <Shadow at={WALL_ASIDE} arm={ease(ramp(t, 0.2, 0.7))} />
        </>
      ),
    },
    {
      // The second half of the question: "instead of what you were doing".
      cue: "1.if2",
      // The sentence turns at "instead", so the shot does too: pull back to take in BOTH, him rigidly still on the
      // left and the shadow a long way to the right of him with its arm going. The gap between them is the joke.
      ...cam.push({ on: SPOT.at(0.85, 1.10, -3.2), dist: 3.4, to: 3.0, yaw: 4, pitch: 0, fov: 46 }),
      zone: "class",
      note: "SPLIT: both of them, and the space between them. Him perfectly still, the shadow a metre and a half away with its arm going. The joke has to be readable in one second.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -2.0)} rotationY={NORTH} animation="idle" face="calm" />
          <Shadow at={WALL_ASIDE} arm={0.75 + 0.2 * Math.sin(t * 7)} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: SPOT.at(-0.15, 1.3, -2.0), dist: 2.9, to: 2.5, yaw: 18, pitch: 2, fov: 40 }),
      zone: "class",
      note: "Push in on him and keep the shadow in the corner of the frame so the two are in one picture: he is doing nothing at all and the shadow is walking. The joke of the whole film is in this frame.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -2.0)} rotationY={NORTH} animation="idle" face="uneasy" />
          <Shadow at={WALL} arm={0.2 + 0.3 * Math.sin(t * 3)} leg={0.25} />
        </>
      ),
    },
    {
      cue: "1.day",
      ...cam.top({ on: SPOT.at(0, 0.2, -1.6), height: 4.0, to: 3.0 }),
      zone: "class",
      note: "Straight down: him standing in an empty aisle with his shadow behind him on the floor, and every other shadow in the room lying still the way shadows are supposed to. The odd one out is the whole picture, and from above it needs no explaining.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -1.6)} rotationY={NORTH} animation="idle" face="calm" />
          <Classmate who={4} position={SPOT.seat(0, 1)} rotationY={NORTH} animation="sit" face="calm" />
          <Classmate who={5} position={SPOT.seat(2, 1)} rotationY={NORTH} animation="sit" face="calm" />
          <group rotation={[-Math.PI / 2, 0, 0]} position={SPOT.at(0, 0.02, -1.1)}>
            <Shadow at={[0, 0, 0]} arm={0.5 + 0.2 * Math.sin(t * 4)} />
          </group>
        </>
      ),
    },
    {
      cue: "1.girl",
      ...cam.push({ on: SPOT.at(1.5, 1.3, -0.6), dist: 3.6, to: 3.0, yaw: 24, pitch: 3, fov: 44 }),
      zone: "class",
      note: "The girl by the window, and the teller in the near foreground with his back to us so we see what he sees: her, and over his shoulder his own shadow up on the wall, arm out, pointing at her. He has not moved.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0.3, 0, -1.4)} rotationY={EAST} animation="idle" face="uneasy" />
          <Classmate who={2} position={SPOT.at(1.9, 0, -0.5)} rotationY={SOUTH + 0.4} animation="idle" face="calm" />
          <Shadow at={SPOT.at(0.1, 0, -3.885)} rotationY={0} arm={0.85} />
        </>
      ),
    },
    {
      // JOKE ONE. She waves back.
      cue: "2.wave",
      ...cam.push({ on: SPOT.at(1.9, 1.3, -0.5), dist: 2.4, to: 2.0, yaw: 8, pitch: 2, fov: 38 }),
      zone: "class",
      note: "Hard on the girl's face as she waves, delighted, at somebody who is not waving. It is funnier the closer it is, and it needs to be one second long.",
      stage: (_t) => <Classmate who={2} position={SPOT.at(1.9, 0, -0.5)} rotationY={SOUTH + 0.4} animation="wave" face="grin" />,
    },
    {
      cue: "2.wave2",
      ...cam.push({ on: SPOT.at(0.4, 1.35, -1.4), dist: 2.3, to: 2.0, yaw: 34, pitch: 1, fov: 36 }),
      zone: "class",
      note: "Back on him, appalled, with his arm pinned to his side by his own hand, and the shadow on the wall behind him still waving like nothing is wrong.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0.3, 0, -1.4)} rotationY={EAST} animation="idle" face="ouch" />
          <Shadow at={SPOT.at(0.3, 0, -3.885)} rotationY={0} arm={0.9 + 0.1 * Math.sin(t * 7)} />
        </>
      ),
    },
    {
      cue: "2.cant2",
      ...cam.push({ on: SPOT.at(0.3, 1.15, -1.4), dist: 1.9, to: 1.65, yaw: 60, pitch: 0, fov: 34 }),
      zone: "class",
      note: "His arm, jammed down, at a distance where the joke is the muscle in his jaw. One second. The last shot of the first joke has to be the smallest.",
      stage: (_t) => <Hero position={SPOT.at(0.3, 0, -1.4)} rotationY={EAST} animation="idle" face="frown" />,
    },
    {
      cue: "3.same",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.8), dist: 5.2, to: 4.4, yaw: 0, pitch: 8, fov: 48 }),
      zone: "class",
      note: "Wide on him in front of the board, and on the board his shadow is doing what he is thinking; beside him two classmates who are plainly not doing what they are thinking. The rule is 'it does not copy me, it tells on me', and this frame is that rule.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -2.0)} rotationY={NORTH} animation="idle" face="calm" />
          <Classmate who={4} position={SPOT.at(-1.6, 0, -1.7)} rotationY={NORTH} animation="idle" face="calm" />
          <Classmate who={6} position={SPOT.at(1.6, 0, -1.7)} rotationY={NORTH} animation="idle" face="calm" />
          <Shadow at={WALL} arm={0.6} leg={0.3 * Math.sin(t * 5)} />
        </>
      ),
    },
    {
      // JOKE TWO: assembly. He is standing; the shadow sits.
      cue: "3.sit",
      ...cam.push({ on: SPOT.at(0, 1.15, -1.9), dist: 4.2, to: 3.6, yaw: 12, pitch: 6, fov: 46 }),
      zone: "class",
      note: "He is standing to attention in a room full of seated kids, straight-backed and mortified, while his shadow on the wall is sitting cross-legged with its chin in its hands. The room is the joke: everybody else is doing the right thing.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0, 0, -2.2)} rotationY={NORTH} animation="idle" face="uneasy" />
          <Classmate who={1} position={SPOT.at(-1.5, 0, -0.6)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.2} />
          <Classmate who={3} position={SPOT.at(1.5, 0, -0.6)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.2} />
          <Shadow at={SPOT.at(0, 0, -3.885)} sitting />
        </>
      ),
    },
    {
      cue: "3.five",
      ...cam.top({ on: SPOT.at(0, 0.3, -1.4), height: 4.4, to: 3.4 }),
      zone: "class",
      note: "From above on the whole room: six shadows on the floor and every single one of them doing something different, because every kid in that room is thinking something different. His is the one waving.",
      stage: (t) => (
        <>
          {[[-1.6, 0.2], [1.4, 0.4], [-1.2, 1.9], [1.6, 2.0]].map(([x, z], i) => (
            <Classmate key={i} who={i + 4} position={SPOT.at(x, 0, z)} rotationY={NORTH} animation="idle" face="calm" />
          ))}
          <Hero position={SPOT.at(0, 0, -1.4)} rotationY={NORTH} animation="idle" face="calm" />
          {[[-1.6, 0.75, 0.3], [1.4, 0.95, -0.5], [-1.2, 2.45, 0.8], [1.6, 2.55, 0.2]].map(([x, z, a], i) => (
            <group key={`s${i}`} rotation={[-Math.PI / 2, 0, 0]} position={SPOT.at(x, 0.02, z)}>
              <Shadow at={[0, 0, 0]} scale={0.9} arm={a} />
            </group>
          ))}
          <group rotation={[-Math.PI / 2, 0, 0]} position={SPOT.at(0, 0.02, -0.85)}>
            <Shadow at={[0, 0, 0]} arm={0.95 + 0.05 * Math.sin(t * 6)} />
          </group>
        </>
      ),
    },
    {
      // The limit, said flat, and the shadow's shape is the joke.
      cue: "3.cant",
      ...cam.push({ on: SPOT.at(0, 1.05, -2.0), dist: 2.4, to: 2.7, yaw: -8, pitch: 0, fov: 42 }),
      zone: "class",
      note: "Wide and low with the shadow big on the wall behind him, arms up, screaming silently. He is talking about what it cannot do while the picture says what it is desperate to do.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0, 0, -2.0)} rotationY={NORTH} animation="idle" face="calm" />
          <group position={WALL} scale={[1.25, 1.25, 1.25]}>
            <Block size={[0.74, 0.42, 0.03]} position={[0, 0.74, 0]} color="#05050a" opacity={0.82} castShadow={false} />
            <Block size={[0.34, 0.34, 0.03]} position={[0, 1.24, 0]} color="#05050a" opacity={0.82} castShadow={false} />
            <Block size={[0.13, 0.42, 0.03]} position={[-0.44, 0.9, 0]} rotation={[0, 0, -1.2]} color="#05050a" opacity={0.82} castShadow={false} />
            <Block size={[0.13, 0.42, 0.03]} position={[0.44, 0.9, 0]} rotation={[0, 0, 1.2]} color="#05050a" opacity={0.82} castShadow={false} />
          </group>
        </>
      ),
    },
    {
      // JOKE THREE.
      cue: "4.punch",
      ...cam.push({ on: SPOT.at(0.6, 1.25, -1.0), dist: 3.8, to: 3.2, yaw: 30, pitch: 4, fov: 46 }),
      zone: "class",
      note: "Two boys squared up in the aisle, and the teller nowhere near them - except his shadow is up on the wall between them with both fists swinging. He is standing at the back with his hands in his pockets, mortified.",
      stage: (t) => (
        <>
          <Classmate who={7} position={SPOT.at(1.3, 0, -1.6)} rotationY={WEST} animation="idle" face="frown" />
          <Classmate who={8} position={SPOT.at(2.2, 0, -1.6)} rotationY={WEST + 0.3} animation="idle" face="frown" />
          <Hero position={SPOT.at(-0.6, 0, -0.6)} rotationY={NORTH + 0.5} animation="idle" face="ouch" />
          <Shadow at={SPOT.at(1.2, 0, -3.885)} arm={0.7 + 0.3 * Math.sin(t * 12)} />
        </>
      ),
    },
    {
      cue: "4.won",
      ...cam.push({ on: SPOT.at(1.75, 1.25, -1.6), dist: 2.6, to: 2.1, yaw: -6, pitch: 2, fov: 40 }),
      zone: "class",
      note: "The two boys, one of them rubbing his jaw, looking around for who hit him, and finding nobody: the teller is six metres away. Keep both their faces in frame; the joke is their confusion, not his.",
      stage: (_t) => (
        <>
          <Classmate who={7} position={SPOT.at(1.3, 0, -1.6)} rotationY={EAST} animation="idle" face="ouch" />
          <Classmate who={8} position={SPOT.at(2.2, 0, -1.6)} rotationY={WEST} animation="idle" face="frown" />
        </>
      ),
    },
    {
      // The line the whole film turns on, and it is said as a boast.
      cue: "4.said",
      ...cam.push({ on: SPOT.at(-0.6, 1.35, -0.6), dist: 2.2, to: 1.85, yaw: 22, pitch: 1, fov: 36 }),
      zone: "class",
      note: "On him, and he looks pleased with himself. Held close because the expression has to change during the line.",
      stage: (_t) => <Hero position={SPOT.at(-0.6, 0, -0.6)} rotationY={NORTH + 0.5} animation="idle" face="grin" />,
    },
    {
      cue: "4.said2",
      ...cam.push({ on: SPOT.at(-0.6, 1.32, -0.6), dist: 1.8, to: 1.55, yaw: 22, pitch: 1, fov: 32 }),
      zone: "class",
      note: "SPLIT: 'I was the one who never had to lie'. Closer, and the grin should be gone: it is not a boast any more, it is the thing that is going to cost him Jo.",
      stage: (_t) => <Hero position={SPOT.at(-0.6, 0, -0.6)} rotationY={NORTH + 0.5} animation="idle" face="calm" />,
    },
    {
      cue: "4.alone",
      ...cam.push({ on: SPOT.at(0, 1.4, -1.2), dist: 5.6, to: 4.8, yaw: 176, pitch: 5, fov: 52 }),
      zone: "class",
      note: "The whole class from the front, all of them with their heads down, and him in the middle of them with the only shadow in the room that is moving. 'The only kid in that school with something in his head' is a lonely line, so the frame is a crowd.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
          {[0, 2].flatMap((col) => [0, 1].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 2 + row + 3} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          )))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <group rotation={[-Math.PI / 2, 0, 0]} position={[ME[0], 0.02, ME[2] + 0.6]}>
            <Shadow at={[0, 0, 0]} scale={0.85} arm={0.4 + 0.2 * Math.sin(t * 3)} />
          </group>
        </>
      ),
    },
    {
      // JOKE FOUR, and the first real clue.
      cue: "5.art",
      ...cam.push({ on: SPOT.at(-1.4, 1.5, -2.9), dist: 3.2, to: 2.6, yaw: 26, pitch: 3, fov: 44 }),
      zone: "class",
      note: "The board, and on it a house being drawn by a shadow's hand: three windows, a door, a roof. The teller is at his desk in the foreground with a maths paper in front of him and a pencil he is not holding.",
      stage: (t) => {
        const k = ramp(t, 0.1, 1.4);
        return (
          <>
            <Hero position={SPOT.at(-1.4, 0, -1.2)} rotationY={NORTH} animation="idle" face="calm" />
            <DrawnHouse at={SPOT.at(0.2, 1.75, -3.68)} draw={k} />
          </>
        );
      },
    },
    {
      cue: "5.and",
      ...cam.push({ on: SPOT.at(0.2, 1.6, -3.4), dist: 2.2, to: 1.75, yaw: 4, pitch: 0, fov: 36 }),
      zone: "class",
      note: "Close on the drawing: a house in black on a green board, and nothing else in the frame. It has to look like a real house somebody lived in, not a doodle, because the ending is inside it.",
      stage: (_t) => <DrawnHouse at={SPOT.at(0.2, 1.75, -3.68)} />,
    },
    {
      cue: "5.five2",
      ...cam.push({ on: SPOT.at(0.2, 1.1, -3.3), dist: 3.4, to: 2.7, yaw: 0, pitch: 12, fov: 44 }),
      zone: "class",
      note: "The board from below, so the house is above him, and he is underneath it: the day-a-week house, the same three windows. He looks up at it the way you look at something you have seen before and cannot place.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0.2, 0, -2.7)} rotationY={NORTH} animation="idle" face="uneasy" headPitch={-0.3} />
          <DrawnHouse at={SPOT.at(0.2, 2.1, -3.68)} scale={1.15} />
        </>
      ),
    },
    {
      cue: "5.five3",
      ...cam.push({ on: SPOT.at(0.2, 1.95, -3.3), dist: 2.0, to: 1.7, yaw: 0, pitch: 4, fov: 34 }),
      zone: "class",
      note: "SPLIT: 'three windows, one door', hard on the drawing itself. Those three windows are the room at the end of the film, and the audience has to see them clearly enough to recognise them then.",
      stage: (t) => <DrawnHouse at={SPOT.at(0.2, 2.15, -3.68)} scale={1.3} draw={ease(ramp(t, 0, 0.4))} />,
    },
    {
      // JOKE FIVE.
      cue: "6.dance",
      ...cam.push({ on: SPOT.at(0, 1.2, -1.6), dist: 4.6, to: 3.8, yaw: -16, pitch: 3, fov: 48 }),
      zone: "class",
      note: "The teacher leaning into him, finger up, and the teller rigid, and the shadow on the wall behind them both, dancing: one leg out, arms up, having the best day of its life. The joke is entirely in the background.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -1.8)} rotationY={NORTH} animation="idle" face="frown" />
          <Classmate who={5} position={SPOT.at(-0.9, 0, -1.2)} rotationY={SOUTH - 0.5} animation="idle" face="frown" />
          <Shadow at={WALL} arm={0.5 + 0.5 * Math.sin(t * 9)} leg={0.5 * Math.sin(t * 11)} scale={1.1} />
        </>
      ),
    },
    {
      // The misread the reveal will correct.
      cue: "6.read",
      ...cam.push({ on: SPOT.at(0, 1.35, -1.8), dist: 2.3, to: 1.95, yaw: 14, pitch: 1, fov: 36 }),
      zone: "class",
      note: "Close on him, and he is almost proud of it. He thinks he has found the trick. The audience has to see him being pleased so the last line lands on a face they remember.",
      stage: (_t) => <Hero position={SPOT.at(0, 0, -1.8)} rotationY={NORTH} animation="idle" face="grin" />,
    },
  ],
});
