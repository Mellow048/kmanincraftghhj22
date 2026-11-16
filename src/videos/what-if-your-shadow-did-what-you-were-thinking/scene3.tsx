import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BedBox, Classmate, Figure, Friend, HALL, Hero, ME, NORTH, SPOT, SOUTH, SubscribeSign, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * "The window" — cues 9.ask → 11.why.
 *
 * The film's first payoff (9.she, ~36%) is a sentence. The second one (10.window, ~57%) is a picture: the shadow
 * standing in a window of a house he has never been in. Then the reveal, which is not a twist about the power - it
 * is a twist about who the power belongs to.
 */

const Shadow: React.FC<{ at: Vec3; scale?: number; arm?: number; opacity?: number }> = ({ at, scale = 1, arm = 0, opacity = 0.85 }) => (
  <group position={at} scale={[scale, scale, scale]}>
    <Block size={[0.34, 0.34, 0.03]} position={[0, 1.22, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.4, 0.52, 0.03]} position={[0, 0.79, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.13, 0.42, 0.03]} position={[-0.27, 0.86 + arm * 0.16, 0]} rotation={[0, 0, -0.1 - arm * 0.9]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.13, 0.42, 0.03]} position={[0.27, 0.86, 0]} rotation={[0, 0, 0.1 + arm * 0.4]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.14, 0.5, 0.03]} position={[-0.11, 0.28, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.14, 0.5, 0.03]} position={[0.11, 0.28, 0]} color="#05050a" opacity={opacity} castShadow={false} />
  </group>
);

/**
 * The house across the street. It only exists for three shots, so it is built out of the pack's own blocks and
 * lit from one window. The window is the whole point: it is the only warm thing in a cold shot.
 */
const House: React.FC<{ at: Vec3; lit?: number }> = ({ at, lit = 1 }) => (
  <group position={at}>
    {/* wall, two floors */}
    <Block size={[5.0, 4.2, 0.3]} position={[0, 2.1, 0]} color="#6a4f3a" castShadow={false} />
    {/* roof */}
    <Block size={[5.4, 0.24, 0.5]} position={[0, 4.3, 0.05]} rotation={[0, 0, 0]} color="#4a382a" castShadow={false} />
    {/* the upstairs window: lit, and empty */}
    <Block size={[1.2, 1.3, 0.1]} position={[0.9, 2.9, 0.16]} color="#151013" castShadow={false} />
    <Block
      size={[1.0, 1.1, 0.06]}
      position={[0.9, 2.9, 0.2]}
      color={lit > 0.5 ? "#ffd79a" : "#2a2430"}
      emissive={lit > 0.5 ? "#ffc478" : "#000000"}
      emissiveIntensity={1.5 * lit}
      castShadow={false}
    />
    {/* the shadow standing in it */}
    <Shadow at={[0.9, 2.34, 0.26]} scale={0.62} arm={0.05} opacity={0.92 * lit} />
    {/* the window frame cross */}
    <Block size={[0.07, 1.3, 0.02]} position={[0.9, 2.9, 0.27]} color="#151013" castShadow={false} />
    <Block size={[1.2, 0.07, 0.02]} position={[0.9, 2.9, 0.27]} color="#151013" castShadow={false} />
    {/* the door */}
    <Block size={[0.9, 1.9, 0.12]} position={[-1.3, 0.95, 0.16]} color="#3c2c20" castShadow={false} />
    {/* a name plate on the door */}
    <Block size={[0.42, 0.16, 0.04]} position={[-1.3, 1.55, 0.24]} color="#e8e2d2" castShadow={false} />
    <pointLight position={[0.9, 2.9, 0.9]} color="#ffcf92" intensity={9 * lit} distance={5} decay={2} />
  </group>
);

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The window",
  shots: [
    {
      // Her answer. The plant that pays the title.
      cue: "9.ask",
      ...cam.push({ on: SPOT.at(0.6, 1.3, 1.3), dist: 2.4, to: 2.0, yaw: -6, pitch: 1, fov: 38 }),
      zone: "class",
      note: "Him, crouched, asking. The camera is low because he is, and because the line he is asking is the last small thing before the film opens up.",
      stage: (_t) => <Hero position={SPOT.at(0.2, 0, 1.9)} rotationY={SOUTH - 0.6} animation="sit" face="uneasy" />,
    },
    {
      // THE FIRST PAYOFF (~36%). One sentence, from a person who has been watching.
      cue: "9.she",
      ...cam.push({ on: SPOT.at(0.2, 1.35, 1.5), dist: 2.0, to: 1.7, yaw: 10, pitch: 0, fov: 34 }),
      zone: "class",
      note: "Close on Jo, and she says the line that turns the whole film: it is the only thing in this town that turns up. She should look like she has known this for a while and did not think it was a secret.",
      stage: (_t) => <Friend position={SPOT.at(0.1, 0, 1.5)} rotationY={SOUTH + 0.7} animation="sit" face="calm" />,
    },
    {
      // THE PROMISE PAID WITH A PICTURE (~57%): a shadow in a window of a house he has never been in.
      cue: "10.window",
      ...cam.push({ on: HALL.at(0.4, 2.2, 0.2), dist: 9.0, to: 7.6, yaw: -24, pitch: 6, fov: 44 }),
      zone: "hall",
      note: "The street, from the pavement, at night: one house with one window lit and a flat black figure standing in it, arms at its sides, facing out. He is small at the bottom of the frame, looking up. The window is the only warm thing in the shot, and it is the first time the film has shown him something he could not have guessed.",
      stage: (t) => (
        <>
          <Hero position={HALL.at(-1.2, 0, 1.4)} rotationY={NORTH + 0.4} animation="idle" face="calm" headPitch={-0.25} />
          <House at={HALL.at(2.2, 0, -2.4)} lit={ease(ramp(t, 0.1, 0.7))} />
          <pointLight position={HALL.at(-1.0, 2.4, 2.6)} color="#8fa8d8" intensity={10} distance={12} decay={2} />
        </>
      ),
    },
    {
      // Closer: it went UP the wall. The impossible bit, kept to one small frame.
      cue: "10.up",
      ...cam.push({ on: HALL.at(1.4, 3.0, -1.6), dist: 4.0, to: 3.2, yaw: -10, pitch: 12, fov: 40 }),
      zone: "hall",
      note: "Hard on the corner of the house, and a flat black shape climbing the wall: the shadow going up the brick like it is a staircase. Looking up at it, because the teller is.",
      stage: (t) => {
        const k = ramp(t, 0.1, 1.3);
        return (
          <>
            <House at={HALL.at(2.2, 0, -2.4)} lit={1} />
            <group position={HALL.at(1.35 + 0.55 * k, 0.6 + 1.7 * k, -2.32)} rotation={[0, 0, -0.25]}>
              <Shadow at={[0, 0, 0]} scale={0.55} arm={0.4} />
            </group>
          </>
        );
      },
    },
    {
      // And he goes after it. This is the teller DOING the thing, which the whole study says he must.
      cue: "10.open",
      ...cam.push({ on: HALL.at(1.72, 1.4, -2.2), dist: 2.6, to: 2.0, yaw: 8, pitch: 4, fov: 40 }),
      zone: "hall",
      note: "Him on the wall of the house, actually climbing, hands on the sill, and the room beyond the glass dark. A kid breaking into his own brother's room and not knowing it yet.",
      stage: (t) => {
        const k = ramp(t, 0, 1.0);
        return (
          <>
            <House at={HALL.at(2.2, 0, -2.4)} lit={0.35} />
            <Hero position={HALL.at(1.5, 0.2 + 1.1 * k, -1.55)} rotationY={NORTH} animation="walk" animDistance={1.0 * k} face="brave" />
          </>
        );
      },
    },
    {
      // The name on the door, and the whole film turns on a plaque.
      cue: "11.brother",
      ...cam.push({ on: HALL.at(0.9, 1.55, -2.3), dist: 1.7, to: 1.45, yaw: 0, pitch: 0, fov: 32 }),
      zone: "hall",
      note: "The name plate on the door of the room, filling the frame: one short word on a strip of paper, at the height a kid's name goes. Nothing else. This is the moment the audience works it out one beat before he says it.",
      stage: () => (
        <group position={HALL.at(0.9, 1.55, -2.32)}>
          <Block size={[1.05, 0.42, 0.06]} position={[0, 0, 0]} color="#e8e2d2" castShadow={false} />
          <Figure text="SAM" position={[0, 0, 0.05]} height={0.26} color="#2b2118" shadow={false} castShadow={false} />
          <pointLight position={[0, 0, 0.5]} color="#ffe9c4" intensity={5} distance={2.5} decay={2} />
        </group>
      ),
    },
    {
      // SPLIT: the rest of the name, on his face, because the audience is ahead of him now.
      cue: "11.brother2",
      ...cam.push({ on: HALL.at(0.9, 1.55, -2.3), dist: 1.33, to: 1.16, yaw: 0, pitch: 0, fov: 32 }),
      zone: "hall",
      note: "SPLIT: the rest of the name, on his face, because the audience is ahead of him now.",
      stage: () => (
        <group position={HALL.at(0.9, 1.55, -2.32)}>
          <Block size={[1.05, 0.42, 0.06]} position={[0, 0, 0]} color="#e8e2d2" castShadow={false} />
          <Figure text="SAM" position={[0, 0, 0.05]} height={0.26} color="#2b2118" shadow={false} castShadow={false} />
          <pointLight position={[0, 0, 0.5]} color="#ffe9c4" intensity={5} distance={2.5} decay={2} />
        </group>
      ),
    },
    {
      // The bed, empty for two years, and a shadow in the window of it.
      cue: "11.dead",
      ...cam.push({ on: HALL.at(0.9, 1.1, -3.4), dist: 4.2, to: 3.4, yaw: 0, pitch: 6, fov: 46 }),
      zone: "hall",
      note: "The bedroom: a made bed with nobody in it, a window with a shadow standing in it, and him in the doorway. The room has been kept. That is the detail that does the work, not the dialogue.",
      stage: (t) => (
        <>
          <BedBox position={HALL.at(0.9, 0, -5.2)} rotationY={0} />
          <Hero position={HALL.at(0.9, 0, -3.0)} rotationY={NORTH} animation="idle" face="ouch" />
          <Shadow at={HALL.at(0.9, 0.35, -5.9)} scale={0.85} arm={0.1 + 0.05 * Math.sin(t * 2)} />
          <pointLight position={HALL.at(0.9, 2.3, -5.4)} color="#ffcf92" intensity={9} distance={6} decay={2} />
        </>
      ),
    },
    {
      // The reveal, said as a fact about the room, not about the power.
      cue: "11.look",
      ...cam.push({ on: HALL.at(0.9, 1.3, -5.0), dist: 3.0, to: 2.4, yaw: 6, pitch: 2, fov: 40 }),
      zone: "hall",
      note: "The window from inside: the shadow standing in it with its back to the glass, facing the empty bed. From behind him, so we see what he sees, and so the shadow is between him and the night.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(0.9, 0, -3.4)} rotationY={NORTH} animation="idle" face="calm" />
          <Shadow at={HALL.at(0.9, 0.35, -5.9)} scale={1.0} arm={0.05} />
          <pointLight position={HALL.at(0.9, 2.3, -5.4)} color="#ffcf92" intensity={11} distance={6} decay={2} />
        </>
      ),
    },
    {
      // The line the film was built for.
      cue: "11.said",
      ...cam.push({ on: HALL.at(0.9, 1.25, -3.2), dist: 2.0, to: 1.7, yaw: 4, pitch: 1, fov: 34 }),
      zone: "hall",
      note: "Him, and he is not crying: he is working it out, which is worse. The line is generosity, and it is the kind of thing a kid says when he has just understood something too big to cry about.",
      stage: (_t) => <Hero position={HALL.at(0.9, 0, -3.4)} rotationY={NORTH} animation="idle" face="ouch" />,
    },
    {
      // One line that reframes the whole film, said flat, because it is the answer.
      cue: "11.mine",
      ...cam.push({ on: HALL.at(0.9, 1.4, -5.6), dist: 2.4, to: 2.9, yaw: 180, pitch: 2, fov: 42 }),
      zone: "hall",
      note: "From the window looking back into the room: the shadow in the foreground, its back to the glass, and the teller's face small and lit at the far side of the room. The shadow has been the main character for a minute and this is the shot that says so.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(0.9, 0, -3.4)} rotationY={NORTH} animation="idle" face="calm" />
          <Shadow at={HALL.at(0.9, 0.35, -5.88)} scale={1.1} arm={0.05} />
          <pointLight position={HALL.at(0.9, 1.9, -3.9)} color="#fff0d0" intensity={7} distance={5} decay={2} />
        </>
      ),
    },
    {
      // SPLIT: 'it was his, borrowing mine', on the shadow in the window.
      cue: "11.mine2",
      ...cam.push({ on: HALL.at(0.9, 1.4, -5.6), dist: 1.87, to: 2.32, yaw: 180, pitch: 2, fov: 42 }),
      zone: "hall",
      note: "SPLIT: 'it was his, borrowing mine', on the shadow in the window.",
      stage: (_t) => (
        <>
          <Hero position={HALL.at(0.9, 0, -3.4)} rotationY={NORTH} animation="idle" face="calm" />
          <Shadow at={HALL.at(0.9, 0.35, -5.88)} scale={1.1} arm={0.05} />
          <pointLight position={HALL.at(0.9, 1.9, -3.9)} color="#fff0d0" intensity={7} distance={5} decay={2} />
        </>
      ),
    },
    {
      // The rule, closed. The limit from 3.cant, answered by the plant.
      cue: "11.why",
      ...cam.push({ on: HALL.at(0.9, 1.55, -5.2), dist: 1.8, to: 2.2, yaw: 10, pitch: 0, fov: 38 }),
      zone: "hall",
      note: "Tight on the shadow in the window, and for the first time it looks like what it is: a kid's shape, standing where a kid used to stand. Let the camera drift back slowly. Do not cut away from it during the explanation.",
      stage: (_t) => (
        <>
          <Shadow at={HALL.at(0.9, 0.35, -5.9)} scale={1.15} arm={0.05} />
          <pointLight position={HALL.at(0.9, 2.2, -5.2)} color="#ffcf92" intensity={12} distance={6} decay={2} />
        </>
      ),
    },
    {
      // SPLIT: 'so it borrowed a brother who could', on the teller, because the rule is his now.
      cue: "11.why2",
      ...cam.push({ on: HALL.at(0.9, 1.55, -5.2), dist: 1.4, to: 1.76, yaw: 10, pitch: 0, fov: 38 }),
      zone: "hall",
      note: "SPLIT: 'so it borrowed a brother who could', on the teller, because the rule is his now.",
      stage: (_t) => (
        <>
          <Shadow at={HALL.at(0.9, 0.35, -5.9)} scale={1.15} arm={0.05} />
          <pointLight position={HALL.at(0.9, 2.2, -5.2)} color="#ffcf92" intensity={12} distance={6} decay={2} />
        </>
      ),
    },
    {
      // Acceptance, then a new stair. The last quarter escalates twice.
      cue: "12.wrong",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.8), dist: 3.6, to: 4.4, yaw: 176, pitch: 4, fov: 48 }),
      zone: "class",
      note: "Back in the classroom daylight, which should feel wrong after the dark bedroom: the whole class around him, and every one of them has a shadow doing something different, and he is looking at his own. The film has to come back to the joke one last time before it asks anything of the viewer.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
          {[0, 2].flatMap((col) => [0, 1].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 2 + row + 3} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          )))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <group rotation={[-Math.PI / 2, 0, 0]} position={[ME[0], 0.02, ME[2] + 0.6]}>
            <Shadow at={[0, 0, 0]} scale={0.85} arm={0.2 + 0.1 * Math.sin(t * 2)} />
          </group>
        </>
      ),
    },
    {
      // SPLIT: 'it was his window', on the shadow under his own chair.
      cue: "12.wrong2",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.8), dist: 2.81, to: 3.52, yaw: 176, pitch: 4, fov: 48 }),
      zone: "class",
      note: "SPLIT: 'it was his window', on the shadow under his own chair.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
          {[0, 2].flatMap((col) => [0, 1].map((row) => (
            <Classmate key={`${col}${row}`} who={col * 2 + row + 3} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          )))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <group rotation={[-Math.PI / 2, 0, 0]} position={[ME[0], 0.02, ME[2] + 0.6]}>
            <Shadow at={[0, 0, 0]} scale={0.85} arm={0.2 + 0.1 * Math.sin(t * 2)} />
          </group>
        </>
      ),
    },
    {
      // He thinks it loudly. The film's last action is the teller doing something.
      cue: "12.tell",
      ...cam.push({ on: SPOT.at(0, 1.2, -1.4), dist: 2.4, to: 1.9, yaw: 16, pitch: 1, fov: 36 }),
      zone: "class",
      note: "Him sitting on the floor of a dark room with his eyes shut, doing the hardest thing in the film: thinking at somebody. Lit from one side like the bedroom, so the two rooms rhyme.",
      stage: (_t) => (
        <>
          <Hero position={SPOT.at(0, 0, -1.4)} rotationY={NORTH} animation="sit" face="calm" />
          <pointLight position={SPOT.at(0.8, 1.7, 0.4)} color="#ffcf92" intensity={7} distance={4} decay={2} />
        </>
      ),
    },
    {
      // The ask, and the next question already open.
      cue: "12.sub",
      ...cam.push({ on: SPOT.at(0, 1.6, -3.0), dist: 3.2, to: 3.9, yaw: 0, pitch: 4, fov: 46 }),
      zone: "class",
      note: "The board, the drawing of the house on it, and the sign coming up over it: the cliffhanger is a sound off-camera, so the last picture has to be the thing that is listening for it.",
      stage: (t) => (
        <>
          <group position={SPOT.at(0, 1.9, -3.68)} scale={[1.1, 1.1, 1.1]}>
            <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, 0.6]} color="#05050a" opacity={0.8} castShadow={false} />
            <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, -0.6]} color="#05050a" opacity={0.8} castShadow={false} />
            <Block size={[0.08, 0.62, 0.03]} position={[-0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
            <Block size={[0.08, 0.62, 0.03]} position={[0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
            {[-0.36, 0, 0.36].map((x) => (
              <Block key={x} size={[0.17, 0.15, 0.03]} position={[x, 0.14, 0]} color="#05050a" opacity={0.8} castShadow={false} />
            ))}
          </group>
          <SubscribeSign position={SPOT.at(0.2, 3.15, -3.6)} rotationY={0} scale={0.8} tilt={0.03 + Math.sin(t * 9) * 0.01} />
          <Hero position={SPOT.at(0, 0, -2.2)} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // SPLIT: the ask, on the board and the sign.
      cue: "12.sub2",
      ...cam.push({ on: SPOT.at(0, 1.6, -3.0), dist: 2.5, to: 3.12, yaw: 0, pitch: 4, fov: 46 }),
      zone: "class",
      note: "SPLIT: the ask, on the board and the sign.",
      stage: (t) => (
        <>
          <group position={SPOT.at(0, 1.9, -3.68)} scale={[1.1, 1.1, 1.1]}>
            <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, 0.6]} color="#05050a" opacity={0.8} castShadow={false} />
            <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, -0.6]} color="#05050a" opacity={0.8} castShadow={false} />
            <Block size={[0.08, 0.62, 0.03]} position={[-0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
            <Block size={[0.08, 0.62, 0.03]} position={[0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
            {[-0.36, 0, 0.36].map((x) => (
              <Block key={x} size={[0.17, 0.15, 0.03]} position={[x, 0.14, 0]} color="#05050a" opacity={0.8} castShadow={false} />
            ))}
          </group>
          <SubscribeSign position={SPOT.at(0.2, 3.15, -3.6)} rotationY={0} scale={0.8} tilt={0.03 + Math.sin(t * 9) * 0.01} />
          <Hero position={SPOT.at(0, 0, -2.2)} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
  ],
});
