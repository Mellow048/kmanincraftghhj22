import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, Hero, Player, SPOT, SOUTH, EAST, NORTH, WEST, Teacher, Tray, SubscribeSign, Friend,
  HALL, R, LUNCH, SHOP, YARD, DRIVE, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * "The tin, and the voice" — Cues 10.wall to 12.suba. His mother's table, the tin, and somebody saying his name.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tin, and the voice",
  shots: [
    {
      // The paper in his hand, and he is walking out of the school gates with it.
      cue: "10.mum",
      ...cam.push({ on: [-27.00, 1.25, 3.00], dist: 7.21, to: 8.11, yaw: 146, pitch: -2, fov: 46 }),
      zone: "yard",
      note: "The paper in his hand, and he is walking out of the school gates with it.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(-1.6, 0, 1.8)} rotationY={SOUTH} animation="walk" animDistance={1.0} face="calm" />
          <Player who={9} position={DRIVE.at(-0.5, 0, 2.4)} rotationY={SOUTH} animation="walk" animDistance={0.8} />
        </>
      ),
    },
    {
      // The kitchen at night: his mum at the table with a pencil and a tin of coins.
      cue: "11.paid",
      ...cam.push({ on: [0.60, 1.20, 81.30], dist: 2.75, to: 3.45, yaw: -163, pitch: -8, fov: 44 }),
      zone: "room",
      note: "The kitchen at night: his mum at the table with a pencil and a tin of coins.",
      stage: (_t) => (
        <>
          <Player who={9} position={R(-0.5, 0, -0.9)} rotationY={NORTH} animation="sit" />
          <Block position={R(-0.1, 0.72, -1.2)} size={[2.0, 0.08, 1.0]} color="#8a6a44" />
          <Block position={R(0.2, 0.82, -1.1)} size={[0.26, 0.18, 0.22]} color="#b8b2a0" castShadow={false} />
          {[0, 1, 2].map((i) => <Block key={i} position={R(0.0 + i * 0.06, 0.92, -1.05)} size={[0.05, 0.05, 0.05]} color="#e0c060" castShadow={false} />)}
        </>
      ),
    },
    {
      // Her hands, counting coins, and the tin is nearly full.
      cue: "11.paida",
      ...cam.push({ on: [0.50, 0.85, 80.40], dist: 1.72, to: 1.32, yaw: -159, pitch: -5, fov: 36 }),
      zone: "room",
      note: "Her hands, counting coins, and the tin is nearly full.",
      stage: (_t) => (
        <>
          <Block position={R(-0.1, 0.72, -1.2)} size={[2.0, 0.08, 1.0]} color="#8a6a44" />
          <Block position={R(0.22, 0.82, -1.12)} size={[0.26, 0.18, 0.22]} color="#b8b2a0" castShadow={false} />
          {[0, 1, 2, 3].map((i) => <Block key={i} position={R(0.02 + i * 0.07, 0.90, -1.06)} size={[0.05, 0.05, 0.05]} color="#e0c060" castShadow={false} />)}
          <Player who={9} position={R(-0.6, 0, -0.9)} rotationY={NORTH} animation="sit" />
        </>
      ),
    },
    {
      // Her face, lit from one side, and she does not know he is in the doorway.
      cue: "11.mine",
      ...cam.push({ on: [0.40, 1.25, 80.90], dist: 2.77, to: 2.47, yaw: -167, pitch: -4, fov: 36 }),
      zone: "room",
      note: "Her face, lit from one side, and she does not know he is in the doorway.",
      stage: (_t) => (
        <>
          <Player who={9} position={R(-0.5, 0, -0.9)} rotationY={NORTH} animation="sit" />
          <Block position={R(-0.1, 0.72, -1.2)} size={[2.0, 0.08, 1.0]} color="#8a6a44" />
        </>
      ),
    },
    {
      // Him in the doorway watching her, and it is the stillest he has been all film.
      cue: "11.why",
      ...cam.push({ on: [1.70, 1.30, 81.90], dist: 3.65, to: 4.25, yaw: -148, pitch: -5, fov: 40 }),
      zone: "room",
      note: "Him in the doorway watching her, and it is the stillest he has been all film.",
      stage: (_t) => (
        <>
          <Hero position={R(0.6, 0, 0.4)} rotationY={NORTH} animation="idle" face="brave" />
          <Player who={9} position={R(-0.5, 0, -0.9)} rotationY={NORTH} animation="sit" />
        </>
      ),
    },
    {
      // Her, and she has just noticed him, and she does not stop counting.
      cue: "11.whya",
      ...cam.push({ on: [1.00, 1.20, 80.20], dist: 2.23, to: 1.93, yaw: -144, pitch: -4, fov: 38 }),
      zone: "room",
      note: "Her, and she has just noticed him, and she does not stop counting.",
      stage: (_t) => (
        <>
          <Player who={9} position={R(-0.5, 0, -0.9)} rotationY={NORTH} animation="sit" />
          <Block position={R(0.2, 0.82, -1.1)} size={[0.26, 0.18, 0.22]} color="#b8b2a0" castShadow={false} />
        </>
      ),
    },
    {
      // The two of them at the table, the tin between them, the pence on the wood.
      cue: "12.world",
      ...cam.push({ on: [0.30, 1.25, 81.50], dist: 3.00, to: 3.60, yaw: -168, pitch: -10, fov: 42 }),
      zone: "room",
      note: "The two of them at the table, the tin between them, the pence on the wood.",
      stage: (_t) => (
        <>
          <Player who={9} position={R(-0.7, 0, -0.9)} rotationY={NORTH} animation="sit" />
          <Hero position={R(0.5, 0, 0.1)} rotationY={NORTH} animation="sit" face="calm" />
          <Block position={R(-0.1, 0.72, -1.2)} size={[2.0, 0.08, 1.0]} color="#8a6a44" />
          <Block position={R(0.1, 0.80, -1.1)} size={[0.26, 0.18, 0.22]} color="#b8b2a0" castShadow={false} />
        </>
      ),
    },
    {
      // Her hand over his hand on the tin.
      cue: "12.worlda",
      ...cam.push({ on: [0.20, 0.90, 80.20], dist: 1.47, to: 1.07, yaw: -164, pitch: -9, fov: 34 }),
      zone: "room",
      note: "Her hand over his hand on the tin.",
      stage: (_t) => (
        <>
          <Block position={R(-0.1, 0.72, -1.2)} size={[2.0, 0.08, 1.0]} color="#8a6a44" />
          <Block position={R(0.1, 0.80, -1.1)} size={[0.26, 0.18, 0.22]} color="#b8b2a0" castShadow={false} />
          <Block position={R(-0.05, 0.86, -1.05)} size={[0.2, 0.06, 0.16]} color="#d8b48a" castShadow={false} />
        </>
      ),
    },
    {
      // The front door from inside, open, and daylight on the step.
      cue: "12.out",
      ...cam.push({ on: [0.30, 1.30, 78.80], dist: 5.68, to: 6.68, yaw: -9, pitch: -2, fov: 48 }),
      zone: "room",
      note: "The front door from inside, open, and daylight on the step.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(0, 0, -1.4)} rotationY={SOUTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Him on the step under the sky, and somebody off-camera has said his name.
      cue: "12.outa",
      ...cam.push({ on: [24.40, 1.25, 59.40], dist: 4.01, to: 4.51, yaw: -3, pitch: -1, fov: 42 }),
      zone: "drive",
      note: "Him on the step under the sky, and somebody off-camera has said his name.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(0, 0, 1.2)} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // His face, turning toward the voice, and he does not know it.
      cue: "12.sub",
      ...cam.push({ on: [24.20, 1.35, 61.00], dist: 2.41, to: 2.01, yaw: 175, pitch: -2, fov: 34 }),
      zone: "drive",
      note: "His face, turning toward the voice, and he does not know it.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(0, 0, 1.4)} rotationY={SOUTH + 0.5} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // The street, empty except for one person at the gate, and the sign.
      cue: "12.suba",
      ...cam.push({ on: [24.00, 1.30, 59.00], dist: 5.66, to: 6.86, yaw: 8, pitch: 0, fov: 48 }),
      zone: "drive",
      note: "The street, empty except for one person at the gate, and the sign.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(0.1, 0, 1.6)} rotationY={NORTH} animation="idle" face="wow" />
          <Player who={11} position={DRIVE.at(0.4, 0, 5.0)} rotationY={NORTH} animation="idle" />
          <SubscribeSign position={DRIVE.at(-1.9, 1.5, 2.0)} rotationY={NORTH + 0.25} scale={0.9} tilt={0.04} />
        </>
      ),
    },
  ],
});
