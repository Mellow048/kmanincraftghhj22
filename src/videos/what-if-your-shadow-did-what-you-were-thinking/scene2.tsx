import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Classmate, EAST, Friend, Hero, HALL, NORTH, SPOT, SOUTH, WEST, ease, ramp, timing, wordAt } from "./kit";

/**
 * "The price" — cues 6.almost → 9.me.
 *
 * The film changes gear here: the shadow stops being funny the moment it leaves the room without him. Nothing in
 * this scene is a joke. The music drops out for the first time at 7.quiet, and the shadow - which has been the
 * loudest thing in every frame - is suddenly the smallest thing in it.
 */

/** The same flat black pawn, now a floor shadow, but `at` is wherever it has got to. */
const Shadow: React.FC<{ at: Vec3; scale?: number; arm?: number; leg?: number; opacity?: number; sitting?: boolean }> = ({
  at,
  scale = 1,
  arm = 0,
  leg = 0,
  opacity = 0.82,
  sitting = false,
}) => (
  <group position={at} scale={[scale, scale, scale]}>
    <Block size={[0.34, 0.34, 0.03]} position={[0, sitting ? 0.62 : 1.22, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.4, sitting ? 0.36 : 0.52, 0.03]} position={[0, sitting ? 0.3 : 0.79, 0]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.13, 0.42, 0.03]} position={[-0.27, (sitting ? 0.42 : 0.86) + arm * 0.16, 0]} rotation={[0, 0, -0.1 - arm * 0.9]} color="#05050a" opacity={opacity} castShadow={false} />
    <Block size={[0.13, 0.42, 0.03]} position={[0.27, sitting ? 0.42 : 0.86, 0]} rotation={[0, 0, 0.1 + arm * 0.4]} color="#05050a" opacity={opacity} castShadow={false} />
    {sitting ? (
      <>
        <Block size={[0.44, 0.12, 0.03]} position={[0, 0.06, 0]} color="#05050a" opacity={opacity} castShadow={false} />
      </>
    ) : (
      <>
        <Block size={[0.14, 0.5, 0.03]} position={[-0.11, 0.28, 0]} rotation={[0, 0, leg]} color="#05050a" opacity={opacity} castShadow={false} />
        <Block size={[0.14, 0.5, 0.03]} position={[0.11, 0.28, 0]} rotation={[0, 0, -leg]} color="#05050a" opacity={opacity} castShadow={false} />
      </>
    )}
  </group>
);

/** Flat on the floor, pointing north (the direction that reads as "facing us" from a low camera). */
const floorShadow = (at: Vec3) => (
  <group rotation={[-Math.PI / 2, 0, 0]} position={[at[0], 0.02, at[2]]}>
    <Shadow at={[0, 0, 0]} />
  </group>
);

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The price",
  shots: [
    {
      // The turn. Same joke setup, and the shadow is not on the wall any more.
      cue: "6.almost",
      ...cam.push({ on: SPOT.at(0, 1.3, -1.9), dist: 3.2, to: 2.7, yaw: 6, pitch: 3, fov: 40 }),
      zone: "class",
      note: "Him in front of an empty board. Every shot up to this one had the shadow on that board, and this one does not: the frame that has been the film's whole grammar is suddenly missing its other half. It should feel like a missing tooth.",
      stage: (_t) => <Hero position={SPOT.at(0, 0, -1.9)} rotationY={0.01} animation="idle" face="uneasy" />,
    },
    {
      // It walks out. The door, and the shadow going through it on its own.
      cue: "7.down",
      ...cam.push({ on: SPOT.at(3.35, 1.25, -2.5), dist: 5.0, to: 4.2, yaw: -27, pitch: 5, fov: 48 }),
      zone: "class",
      note: "The classroom door at the end of the room, open, and a flat black shape halfway out of it with its back to us. He is at his desk, small in the foreground, not following. Nobody has to say anything.",
      stage: (t) => {
        const k = ramp(t, 0.15, 1.6);
        return (
          <>
            <Hero position={SPOT.at(0.6, 0, 1.4)} rotationY={Math.PI - 0.5} animation="idle" face="uneasy" />
            <group rotation={[0, 0, 0]} position={[SPOT.at(2.4 + 0.9 * k, 0.02, -1.2 - 1.3 * k)[0], 0.02, -1.2 - 1.3 * k]}>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <Shadow at={[0, 0, 0]} opacity={0.5} arm={0.3} />
              </group>
            </group>
          </>
        );
      },
    },
    {
      // SPLIT: 'I could feel which way', on his face, from his chair.
      cue: "7.down2",
      ...cam.push({ on: SPOT.at(3.2, 1.2, -2.6), dist: 3.43, to: 2.88, yaw: 96, pitch: 4, fov: 46 }),
      zone: "class",
      note: "SPLIT: 'I could feel which way', on his face, from his chair.",
      stage: (t) => {
        const k = ramp(t, 0.15, 1.6);
        return (
          <>
            <Hero position={SPOT.at(0.6, 0, 1.4)} rotationY={2.02} animation="idle" face="uneasy" />
            <group rotation={[0, 0, 0]} position={[SPOT.at(2.4 + 0.9 * k, 0.02, -1.2 - 1.3 * k)[0], 0.02, -1.2 - 1.3 * k]}>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <Shadow at={[0, 0, 0]} opacity={0.5} arm={0.3} />
              </group>
            </group>
          </>
        );
      },
    },
    {
      // The hallway, with a piece of him in it.
      cue: "7.hall",
      ...cam.push({ on: HALL.at(-1.0, 1.3, 1.3), dist: 4.6, to: 5.6, yaw: -46, pitch: 6, fov: 50 }),
      zone: "hall",
      note: "The long hallway with the lockers, empty except for one flat shadow lying on the floor at the far end, alone, facing away. This is the loneliest picture the pack can make and it costs nothing: a corridor's length does the work.",
      stage: (_t) => (
        <group rotation={[-Math.PI / 2, 0, 0]} position={HALL.at(4.6, 0.02, 0.4)}>
          <Shadow at={[0, 0, 0]} opacity={0.6} />
        </group>
      ),
    },
    {
      // The price named, and the music stops here.
      cue: "7.quiet",
      ...cam.push({ on: SPOT.at(0, 1.12, -1.5), dist: 2.1, to: 2.5, yaw: -20, pitch: 0, fov: 38 }),
      zone: "class",
      note: "On him, and this is the shot where he decides. He is standing very still with his fists closed, and there is nothing behind him: no shadow on the board, no shadow on the floor. Deliberately the emptiest frame in the film.",
      stage: (_t) => <Hero position={SPOT.at(0, 0, -1.5)} rotationY={-0.35} animation="idle" face="brave" />,
    },
    {
      // SPLIT: 'if I think nothing, it does nothing', on the empty board where the shadow used to be.
      cue: "7.quiet2",
      ...cam.push({ on: SPOT.at(0, 1.12, -1.5), dist: 1.64, to: 2.0, yaw: -20, pitch: 0, fov: 38 }),
      zone: "class",
      note: "SPLIT: 'if I think nothing, it does nothing', on the empty board where the shadow used to be.",
      stage: (_t) => <Hero position={SPOT.at(0, 0, -1.5)} rotationY={-0.44} animation="idle" face="brave" />,
    },
    {
      // The cost of the plan, and the film's best gag after the turn.
      cue: "8.think",
      ...cam.push({ on: SPOT.at(0, 1.4, -1.7), dist: 3.0, to: 2.5, yaw: 8, pitch: 2, fov: 40 }),
      zone: "class",
      note: "He is trying to think nothing, so: eyes screwed shut, jaw clenched, and behind him on the board a shadow that is CONCENTRATING TOO - straining, wobbling, about to give. The joke is that not thinking is the hardest work he has ever done.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -1.7)} rotationY={0.32} animation="idle" face="brave" />
          <group position={SPOT.at(0, 0, -3.885)} scale={[1.05, 1.05, 1.05]}>
            <Shadow at={[0, 0, 0]} arm={0.25 + 0.06 * Math.sin(t * 14)} leg={0.05 * Math.sin(t * 9)} opacity={0.7} />
          </group>
        </>
      ),
    },
    {
      // SPLIT: 'thinking about not thinking counts', on the strain.
      cue: "8.think2",
      ...cam.push({ on: SPOT.at(0, 1.4, -1.7), dist: 2.34, to: 2.0, yaw: 8, pitch: 2, fov: 40 }),
      zone: "class",
      note: "SPLIT: 'thinking about not thinking counts', on the strain.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(0, 0, -1.7)} rotationY={0.32} animation="idle" face="brave" />
          <group position={SPOT.at(0, 0, -3.885)} scale={[1.05, 1.05, 1.05]}>
            <Shadow at={[0, 0, 0]} arm={0.25 + 0.06 * Math.sin(t * 14)} leg={0.05 * Math.sin(t * 9)} opacity={0.7} />
          </group>
        </>
      ),
    },
    {
      // A week of it, and the shadow sitting on the floor doing nothing.
      cue: "8.still",
      ...cam.push({ on: SPOT.at(1.4, 1.0, 0.6), dist: 4.0, to: 3.3, yaw: 44, pitch: 8, fov: 48 }),
      zone: "class",
      note: "The maths room out of hours: desks, dark, and one flat black shape sitting on the floor in the middle of it, chin on its hands, facing nothing. No teller in the frame at all - this is the only shot in the film without him, and it is the cost.",
      stage: (_t) => (
        <>
          <Classmate who={4} position={SPOT.seat(0, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.4} />
          <Classmate who={6} position={SPOT.seat(2, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.4} />
          <group rotation={[-Math.PI / 2, 0, 0]} position={SPOT.at(0.9, 0.02, 1.0)}>
            <Shadow at={[0, 0, 0]} sitting />
          </group>
        </>
      ),
    },
    {
      // SPLIT: 'doing nothing', close on the shadow's hands on the floor.
      cue: "8.still2",
      ...cam.push({ on: SPOT.at(1.4, 1.0, 0.6), dist: 3.12, to: 2.64, yaw: 44, pitch: 8, fov: 48 }),
      zone: "class",
      note: "SPLIT: 'doing nothing', close on the shadow's hands on the floor.",
      stage: (_t) => (
        <>
          <Classmate who={4} position={SPOT.seat(0, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.4} />
          <Classmate who={6} position={SPOT.seat(2, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.4} />
          <group rotation={[-Math.PI / 2, 0, 0]} position={SPOT.at(0.9, 0.02, 1.0)}>
            <Shadow at={[0, 0, 0]} sitting />
          </group>
        </>
      ),
    },
    {
      // Jo. She talks to it, which nobody else has done.
      cue: "9.jo",
      ...cam.push({ on: SPOT.at(0.9, 1.15, 1.0), dist: 3.4, to: 2.8, yaw: 20, pitch: 5, fov: 44 }),
      zone: "class",
      note: "Jo sitting on the floor of the maths room with her back against a desk, talking to a shadow, and the shadow sitting up a little straighter because somebody is talking to it. Not sad yet: the first warm thing in two minutes.",
      stage: (_t) => (
        <>
          <Friend position={SPOT.at(0.1, 0, 1.5)} rotationY={SOUTH + 0.7} animation="sit" face="smile" />
          <group rotation={[-Math.PI / 2, 0, 0]} position={SPOT.at(0.9, 0.02, 1.0)}>
            <Shadow at={[0, 0, 0]} sitting arm={0.1} />
          </group>
        </>
      ),
    },
    {
      // Her answer is the line that plants the window.
      cue: "9.me",
      ...cam.push({ on: SPOT.at(0.6, 1.3, 1.35), dist: 2.2, to: 1.85, yaw: -12, pitch: 0, fov: 36 }),
      zone: "class",
      note: "Her face, close, and she is completely serious: she has seen something and she is not going to explain it. The audience should file this line away without knowing they have.",
      stage: (_t) => <Friend position={SPOT.at(0.1, 0, 1.5)} rotationY={SOUTH + 0.7} animation="sit" face="calm" />,
    },
    {
      // SPLIT: 'she said, I know', on Jo, not him. It is her line.
      cue: "9.me2",
      ...cam.push({ on: SPOT.at(0.6, 1.3, 1.35), dist: 1.72, to: 1.48, yaw: -12, pitch: 0, fov: 36 }),
      zone: "class",
      note: "SPLIT: 'she said, I know', on Jo, not him. It is her line.",
      stage: (_t) => <Friend position={SPOT.at(0.1, 0, 1.5)} rotationY={SOUTH + 0.7} animation="sit" face="calm" />,
    },
  ],
});
