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

/** The house the shadow drew on the board in scene one: three windows, one door. It is the last picture too. */
const DrawnHouse: React.FC<{ at: Vec3; scale?: number }> = ({ at, scale = 1 }) => (
  <group position={at} scale={[scale, scale, scale]}>
    <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, 0.6]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[1.5, 0.1, 0.03]} position={[0, 0.5, 0]} rotation={[0, 0, -0.6]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[0.08, 0.62, 0.03]} position={[-0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[0.08, 0.62, 0.03]} position={[0.62, 0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    <Block size={[1.28, 0.07, 0.03]} position={[0, -0.16, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    {[-0.36, 0, 0.36].map((x) => (
      <Block key={x} size={[0.17, 0.15, 0.03]} position={[x, 0.14, 0]} color="#05050a" opacity={0.8} castShadow={false} />
    ))}
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
      ...cam.push({ on: [0.2, 2.4, 1.1], dist: 8.6, to: 7.0, yaw: 0, pitch: 3, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "THE PICTURE THE FILM WAS BUILT FOR. From the pavement, across the street: one house, one lit upstairs window, and in it a flat black figure standing with its arms at its sides. He is small at the bottom of the frame with his back to us, looking up. The window is the only warm thing in the shot, and the audience should get the answer about a second before he says it.",
      stage: (t) => (
        <>
          <Hero position={[0.2, 0, 1.5]} rotationY={NORTH} animation="idle" face="calm" headPitch={-0.3} />
          <Shadow at={[0.95, 2.3, -2.24]} scale={0.86} opacity={1} arm={0.05 + 0.04 * Math.sin(t * 1.6)} />
        </>
      ),
    },
    {
      // It climbs. The impossible bit, one small frame.
      cue: "10.up",
      ...cam.push({ on: [0.4, 2.0, -0.9], dist: 4.6, to: 3.8, yaw: 12, pitch: -6, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "Looking UP at the corner of the house while a flat black shape goes up the brick like a staircase: hands and feet on the wall, no respect for gravity. Low camera, so the sky is behind it and it reads as a silhouette.",
      stage: (t) => {
        const k = ramp(t, 0.05, 0.95);
        return <Shadow at={[1.5 + 0.1 * k, 0.7 + 1.5 * k, -2.1]} scale={0.8} arm={0.35 + 0.15 * Math.sin(t * 7)} />;
      },
    },
    {
      // He goes after it, and this is him DOING the thing.
      cue: "10.open",
      ...cam.push({ on: [0.95, 2.2, -1.0], dist: 3.0, to: 2.3, yaw: 4, pitch: -2, fov: 38 }),
      zone: "street",
      look: "overworld-night",
      note: "Him on the sill, actually climbing in: one leg over, both hands on the frame, and the room beyond him dark. A kid breaking into his own brother's bedroom and not knowing it yet.",
      stage: (t) => {
        const k = ramp(t, 0, 0.9);
        return <Hero position={[0.95, 0.3 + 1.55 * k, -1.75]} rotationY={NORTH} animation="walk" animDistance={1.1 * k} face="brave" />;
      },
    },
    {
      // The name on the door, and the whole film turns on a plaque.
      cue: "11.brother",
      ...cam.push({ on: [-2.6, 1.62, -2.1], dist: 1.5, to: 1.2, yaw: 0, pitch: 0, fov: 32 }),
      zone: "street",
      look: "overworld-night",
      note: "The name plate on the front door, filling the frame: one short word on a strip of paper at the height a kid's name goes. Nothing else. The audience works it out one beat before he says it.",
      stage: () => (
        <group position={[-2.6, 1.62, -2.19]}>
          <Block size={[1.0, 0.4, 0.06]} position={[0, 0, 0]} color="#e8e2d2" castShadow={false} />
          <Figure text="SAM" position={[0, 0, 0.05]} height={0.25} color="#2b2118" shadow={false} castShadow={false} />
          <pointLight position={[0, 0, 0.6]} color="#ffe9c4" intensity={6} distance={2.5} decay={2} />
        </group>
      ),
    },
    {
      // The second half of the name, on his face, because the audience is ahead of him now.
      cue: "11.brother2",
      ...cam.push({ on: [0.95, 1.55, -1.5], dist: 2.3, to: 1.9, yaw: 8, pitch: 2, fov: 38 }),
      zone: "street",
      look: "overworld-night",
      note: "SPLIT: 'his name was on the door. My brother's name.' His face, lit from the window above him, and he has stopped moving. The line is not a question and it is not a cry: it is a fact arriving.",
      stage: (_t) => <Hero position={[0.95, 1.55, -1.75]} rotationY={NORTH} animation="walk" animDistance={1.1} face="ouch" />,
    },
    {
      // The window from the pavement, empty of him now, and the shadow still standing in it.
      cue: "11.dead",
      ...cam.push({ on: [0.95, 2.9, 0.2], dist: 3.4, to: 2.7, yaw: 0, pitch: 1, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "Hard on the lit window on its own, from the street: the shadow standing in it, and nothing else alive in the frame. Two years of a room kept ready is all in the fact that the light is still on.",
      stage: (_t) => <Shadow at={[0.95, 2.32, -2.24]} scale={0.9} opacity={1} arm={0.05} />,
    },
    {
      // The reveal, said as a fact about the room, not about the power.
      cue: "11.look",
      ...cam.push({ on: [0.95, 2.95, -2.2], dist: 2.6, to: 2.0, yaw: 0, pitch: 0, fov: 38 }),
      zone: "street",
      look: "overworld-night",
      note: "The window from close, so the shadow fills the glass and the frame of the window is around it. It is the size of a kid. That is the whole reveal, and it needs no line at all.",
      stage: (t) => <Shadow at={[0.95, 2.32, -2.24]} scale={1.0} opacity={1} arm={0.05 + 0.03 * Math.sin(t * 1.4)} />,
    },
    {
      // The line the film was built for.
      cue: "11.said",
      ...cam.push({ on: [0.95, 2.6, 0.3], dist: 3.0, to: 3.8, yaw: -8, pitch: 2, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "Pull back off the window to the whole house and the street: one lit room in a dark row, and him on the pavement in front of it. He is not crying. He is working it out, which is worse.",
      stage: (_t) => (
        <>
          <Hero position={[0.95, 0, 1.3]} rotationY={NORTH} animation="idle" face="ouch" />
          <Shadow at={[0.95, 2.32, -2.24]} scale={0.86} opacity={1} arm={0.05} />
        </>
      ),
    },
    {
      // One line that reframes the whole film, said flat.
      cue: "11.mine",
      ...cam.push({ on: [0.95, 2.5, -2.15], dist: 1.9, to: 1.5, yaw: 180, pitch: 0, fov: 34 }),
      zone: "street",
      look: "overworld-night",
      note: "From inside the glass looking OUT: the shadow's back filling the lower half of the frame, and the dark street beyond it. It has been the main character for a minute, and this is the shot that says so.",
      stage: (_t) => <Shadow at={[0.95, 2.32, -2.3]} scale={1.05} opacity={1} arm={0.05} />,
    },
    {
      cue: "11.mine2",
      ...cam.push({ on: [0.95, 2.55, 0.0], dist: 2.4, to: 1.9, yaw: 4, pitch: 1, fov: 34 }),
      zone: "street",
      look: "overworld-night",
      note: "SPLIT: 'it was his, borrowing mine'. Back outside, tighter on the window and the shadow in it, because the sentence is about ownership and the picture should not move while it is said.",
      stage: (_t) => <Shadow at={[0.95, 2.32, -2.24]} scale={0.95} opacity={1} arm={0.05} />,
    },
    {
      // The rule, closed. The limit from 3.cant, answered by the plant.
      cue: "11.why",
      ...cam.push({ on: [0.95, 3.3, -1.9], dist: 4.4, to: 3.6, yaw: 0, pitch: 0, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "The whole face of the house with the window in it, and the empty sill under it: a shadow cannot go where its owner has not been, and the one place this one could go was up that wall. Let it drift back slowly. Do not cut away during the explanation.",
      stage: (_t) => <Shadow at={[0.95, 2.32, -2.24]} scale={0.86} opacity={1} arm={0.05} />,
    },
    {
      cue: "11.why2",
      ...cam.push({ on: [0.95, 3.0, -1.2], dist: 3.2, to: 2.6, yaw: 0, pitch: 2, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "SPLIT: 'so it borrowed a brother who could'. Closer again, and the window is still on. The last thing the audience should feel before the daylight is that the light has been on the whole time.",
      stage: (_t) => <Shadow at={[0.95, 2.32, -2.24]} scale={0.9} opacity={1} arm={0.05} />,
    },
    {
      // Acceptance, then a new stair.
      cue: "12.wrong",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.8), dist: 3.6, to: 4.4, yaw: 176, pitch: 4, fov: 48 }),
      zone: "class",
      note: "Back in the classroom daylight, which should feel wrong after the dark street: the whole class around him, every one of them with a shadow doing something different, and he is looking at his own. The film has to come back to the joke one last time before it asks anything of the viewer.",
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
      cue: "12.wrong2",
      ...cam.push({ on: [ME[0], 0.9, ME[2] + 0.9], dist: 2.6, to: 2.1, yaw: 178, pitch: 20, fov: 44 }),
      zone: "class",
      note: "SPLIT: 'it was his window'. Down at the shadow under his chair: flat on the floor, black, and the only shadow in the room that is standing up.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
          <group rotation={[-Math.PI / 2, 0, 0]} position={[ME[0], 0.02, ME[2] + 0.6]}>
            <Shadow at={[0, 0, 0]} scale={0.85} arm={0.2 + 0.1 * Math.sin(t * 2)} />
          </group>
        </>
      ),
    },
    {
      // He thinks it loudly. The last action in the film is the teller doing something.
      cue: "12.tell",
      ...cam.push({ on: SPOT.at(0, 1.2, -1.4), dist: 2.4, to: 1.9, yaw: 16, pitch: 1, fov: 36 }),
      zone: "class",
      note: "Him sitting on the floor of a dark room with his eyes shut, doing the hardest thing in the film: thinking at somebody. Lit from one side like the bedroom window, so the two rooms rhyme.",
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
      ...cam.push({ on: SPOT.at(0, 1.7, -2.9), dist: 3.0, to: 3.6, yaw: 0, pitch: 4, fov: 46 }),
      zone: "class",
      note: "The board, the drawing of the house still on it, and the sign coming up over it. The cliffhanger is a sound off-camera, so the last picture has to be the thing that is listening for it.",
      stage: (t) => (
        <>
          <SubscribeSign position={SPOT.at(0.2, 2.15, -3.5)} rotationY={0} scale={1.0} tilt={0.03 + Math.sin(t * 9) * 0.01} />
          <Hero position={SPOT.at(0, 0, -2.2)} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "12.sub2",
      ...cam.push({ on: SPOT.at(0.2, 2.3, -3.4), dist: 2.2, to: 1.8, yaw: 0, pitch: 0, fov: 36 }),
      zone: "class",
      note: "SPLIT: the ask, tight on the drawing and the sign together, so the last frame is the house that was on the wall all along and the reason to stay.",
      stage: (t) => (
        <>
          <SubscribeSign position={SPOT.at(0.2, 2.3, -3.5)} rotationY={0} scale={1.15} tilt={0.04 + Math.sin(t * 9) * 0.012} />
        </>
      ),
    },
  ],
});
