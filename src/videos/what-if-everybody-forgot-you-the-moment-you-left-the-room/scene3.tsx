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
      ...cam.push({ on: [24.20, 1.10, 57.60], dist: 4.16, to: 3.61, yaw: -35, pitch: 2, fov: 48 }),
      zone: "drive",
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
      ...cam.push({ on: [-0.50, 1.05, 78.70], dist: 2.77, to: 2.22, yaw: 46, pitch: 4, fov: 46 }),
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
      ...cam.push({ on: [-0.10, 0.80, 78.80], dist: 1.99, to: 1.44, yaw: 41, pitch: 1, fov: 38 }),
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
      ...cam.push({ on: [-0.50, 1.10, 78.60], dist: 2.29, to: 1.74, yaw: 38, pitch: 4, fov: 36 }),
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
      ...cam.push({ on: [0.40, 1.10, 78.80], dist: 2.39, to: 1.84, yaw: 22, pitch: 5, fov: 42 }),
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
      ...cam.push({ on: [-0.50, 1.10, 78.70], dist: 1.92, to: 1.37, yaw: 47, pitch: 4, fov: 38 }),
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
      ...cam.push({ on: [-0.20, 0.95, 78.70], dist: 2.88, to: 2.33, yaw: 29, pitch: 6, fov: 44 }),
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
      ...cam.push({ on: [-0.10, 0.74, 78.80], dist: 1.51, to: 0.96, yaw: 37, pitch: 7, fov: 34 }),
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
      ...cam.push({ on: [0.00, 1.15, 84.00], dist: 5.61, to: 5.06, yaw: 178, pitch: 2, fov: 50 }),
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
      ...cam.push({ on: [24.10, 1.28, 62.00], dist: 2.60, to: 2.05, yaw: 178, pitch: -1, fov: 44 }),
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
      ...cam.push({ on: [24.10, 1.30, 60.40], dist: 2.00, to: 1.45, yaw: 3, pitch: 0, fov: 36 }),
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
      ...cam.push({ on: [24.20, 1.30, 64.60], dist: 5.20, to: 4.65, yaw: 178, pitch: 0, fov: 50 }),
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
