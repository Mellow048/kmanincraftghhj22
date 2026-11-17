import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, Hero, Player, SPOT, SOUTH, EAST, NORTH, WEST, Adult, Tray, SubscribeSign, Friend,
  HALL, R, HOME, LUNCH, SHOP, YARD, DRIVE, ease, ramp, timing, wordAt,
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
      ...cam.push({ on: [0.10, 1.05, 160.40], dist: 3.75, to: 3.20, yaw: 34, pitch: 4, fov: 46 }),
      zone: "kitchen",
      note: "The kitchen at night: his mum at the table with a pencil and a tin of coins.",
      stage: (_t) => (
        <>
          <Player who={9} position={HOME.chair} rotationY={NORTH} animation="sit" />
          <Block position={[0.62, 0.80, 0.72]} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Block key={i} position={[0.50 + (i % 3) * 0.06, 0.90, 0.68 + Math.floor(i / 3) * 0.05]} size={[0.045, 0.045, 0.045]} color="#e0c060" castShadow={false} />
          ))}
          <Block position={[-0.1, 0.795, 0.62]} size={[0.4, 0.014, 0.28]} color="#e9e6da" castShadow={false} />
        </>
      ),
    },
    {
      // Her hands, counting coins, and the tin is nearly full.
      cue: "11.paida",
      ...cam.push({ on: [0.30, 0.82, 160.70], dist: 2.80, to: 2.25, yaw: 35, pitch: 3, fov: 40 }),
      zone: "kitchen",
      note: "Her hands, counting coins, and the tin is nearly full.",
      stage: (_t) => (
        <>
          <Block position={[0.62, 0.80, 0.72]} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Block key={i} position={[0.50 + (i % 3) * 0.06, 0.90, 0.68 + Math.floor(i / 3) * 0.05]} size={[0.045, 0.045, 0.045]} color="#e0c060" castShadow={false} />
          ))}
          <Block position={[-0.1, 0.795, 0.62]} size={[0.4, 0.014, 0.28]} color="#e9e6da" castShadow={false} />
        </>
      ),
    },
    {
      // Her face, lit from one side, and she does not know he is in the doorway.
      cue: "11.mine",
      ...cam.push({ on: [-0.10, 1.15, 160.60], dist: 3.22, to: 2.67, yaw: 36, pitch: 3, fov: 40 }),
      zone: "kitchen",
      note: "Her face, lit from one side, and she does not know he is in the doorway.",
      stage: (_t) => (
        <>
          <Player who={9} position={HOME.chair} rotationY={NORTH} animation="sit" />
          <Block position={[0.62, 0.80, 0.72]} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
          <Block position={[-0.1, 0.795, 0.62]} size={[0.4, 0.014, 0.28]} color="#e9e6da" castShadow={false} />
        </>
      ),
    },
    {
      // Him in the doorway watching her, and it is the stillest he has been all film.
      cue: "11.why",
      ...cam.push({ on: [0.70, 1.10, 161.00], dist: 3.37, to: 2.82, yaw: 30, pitch: 4, fov: 44 }),
      zone: "kitchen",
      note: "Him in the doorway watching her, and it is the stillest he has been all film.",
      stage: (_t) => (
        <>
          <Hero position={[0.4, 0, 3.4]} rotationY={-0.06} animation="idle" face="brave" />
          <Player who={9} position={HOME.chair} rotationY={NORTH} animation="sit" />
        </>
      ),
    },
    {
      // Her, and she has just noticed him, and she does not stop counting.
      cue: "11.whya",
      ...cam.push({ on: [0.30, 1.12, 160.60], dist: 3.28, to: 2.73, yaw: 31, pitch: 2, fov: 40 }),
      zone: "kitchen",
      note: "Her, and she has just noticed him, and she does not stop counting.",
      stage: (_t) => (
        <>
          <Player who={9} position={HOME.chair} rotationY={NORTH} animation="sit" />
          <Block position={[0.62, 0.80, 0.72]} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
        </>
      ),
    },
    {
      // The two of them at the table, the tin between them, the pence on the wood.
      cue: "12.world",
      ...cam.push({ on: [0.20, 0.95, 160.60], dist: 3.57, to: 3.02, yaw: 32, pitch: 5, fov: 46 }),
      zone: "kitchen",
      note: "The two of them at the table, the tin between them, the pence on the wood.",
      stage: (_t) => (
        <>
          <Player who={9} position={HOME.chair} rotationY={NORTH} animation="sit" />
          <Hero position={[1.1, 0, 2.9]} rotationY={0.01} animation="sit" face="calm" />
          <Block position={[0.62, 0.80, 0.72]} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
          <Block position={[0.2, 0.775, 0.7]} size={[0.3, 0.016, 0.28]} color="#f7f4ea" castShadow={false} />
        </>
      ),
    },
    {
      // Her hand over his hand on the tin.
      cue: "12.worlda",
      ...cam.push({ on: [0.30, 0.78, 160.70], dist: 2.87, to: 2.32, yaw: 29, pitch: 3, fov: 36 }),
      zone: "kitchen",
      note: "Her hand over his hand on the tin.",
      stage: (_t) => (
        <>
          <Block position={[0.62, 0.80, 0.72]} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
          <Block position={[0.5, 0.86, 0.7]} size={[0.2, 0.05, 0.14]} color="#d8b48a" castShadow={false} />
        </>
      ),
    },
    {
      // The front door from inside, open, and daylight on the step.
      cue: "12.out",
      ...cam.push({ on: [3.50, 1.20, 159.10], dist: 3.99, to: 3.44, yaw: -51, pitch: 3, fov: 50 }),
      zone: "kitchen",
      note: "The front door from inside, open, and daylight on the step.",
      stage: (_t) => (
        <>
          <Hero position={[1.2, 0, 1.9]} rotationY={EAST} animation="idle" face="calm" />
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
          <Hero position={DRIVE.at(0, 0, 1.2)} rotationY={0.39} animation="idle" face="wow" />
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
      // The last frame. Three things have to be true at once: he faces the lens (he was turned away at 0.33 rad
      // when the lens is on his other side), the person at the gate is visible and small, and the sign is in frame.
      // The sign was hung at x -2.0, i.e. two metres to his left and outside a 50-degree frame at this range.
      // Solved: hero faces 3.01 rad. The sign was at x -1.05, z +2.9 — 22° off the lens axis, i.e. outside the
      // 16° half-angle of a 54° frame: it was clipped by the right edge in the finished render. Now at x -0.65,
      // z +3.4: 9° off axis, 1.28 m wide in a 2.29 m frame, so it reads whole above his shoulder.
      ...cam.push({ on: [24.20, 1.30, 64.60], dist: 5.20, to: 4.65, yaw: 178, pitch: 0, fov: 54 }),
      zone: "drive",
      note: "The street, empty except for one person at the gate, and the sign.",
      stage: (_t) => (
        <>
          <Hero position={DRIVE.at(0.1, 0, 1.6)} rotationY={3.01} animation="idle" face="wow" />
          <Player who={11} position={DRIVE.at(1.6, 0, 4.2)} rotationY={SOUTH} animation="idle" />
          <SubscribeSign position={DRIVE.at(-0.65, 2.10, 3.40)} rotationY={NORTH + 0.2} scale={0.78} tilt={0.03} />
        </>
      ),
    },
  ],
});
