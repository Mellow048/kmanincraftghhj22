import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Classmate, Cup, EAST, Friend, HALL, Hero, ME, NORTH, R, SPOT, SOUTH, Teacher, WEST, ease, ramp, timing, wordAt,
} from "./kit";

/**
 * The tin
 *
 * Cues 11.paid -> 12.suba. The reveal, and the ask.
 */

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tin",
  shots: [
    {
      // The kitchen at night: his mum at the table with a pencil and a tin of coins.
      cue: "11.paid",
      ...cam.push({ on: R(0, 1.15, -0.3), dist: 2.8, to: 2.3, yaw: 178, pitch: 8, fov: 44 }),
      zone: "room",
      note: "The kitchen at night: his mum at the table with a pencil and a tin of coins.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // Her hands, counting coins, and the tin is nearly full.
      cue: "11.paida",
      ...cam.push({ on: R(0, 0.75, -0.5), dist: 1.7, to: 1.4, yaw: 176, pitch: 14, fov: 36 }),
      zone: "room",
      note: "Her hands, counting coins, and the tin is nearly full.",
      stage: (_t) => (
        <>
          <Block position={R(0, 0.78, -0.55)} size={[0.9, 0.06, 0.6]} color="#6a4f3a" castShadow={false} />
          <Block position={R(0.1, 0.86, -0.5)} size={[0.24, 0.16, 0.2]} color="#b8b2a0" castShadow={false} />
          {[0, 1, 2, 3, 4].map((i) => <Block key={i} position={R(-0.1 + i * 0.06, 0.95, -0.5)} size={[0.04, 0.04, 0.04]} color="#e0c060" castShadow={false} />)}
        </>
      ),
    },
    {
      // Her face, lit from one side, and she does not know he is in the doorway.
      cue: "11.mine",
      ...cam.push({ on: R(0, 1.2, -0.6), dist: 2.0, to: 1.7, yaw: 184, pitch: 2, fov: 36 }),
      zone: "room",
      note: "Her face, lit from one side, and she does not know he is in the doorway.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // Him in the doorway watching her, and it is the stillest he has been all film.
      cue: "11.why",
      ...cam.push({ on: R(0.9, 1.2, 0.9), dist: 2.6, to: 2.1, yaw: 8, pitch: 2, fov: 40 }),
      zone: "room",
      note: "Him in the doorway watching her, and it is the stillest he has been all film.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="ouch" />
        </>
      ),
    },
    {
      // Her, and she has just noticed him, and she does not stop counting.
      cue: "11.whya",
      ...cam.push({ on: R(0, 1.2, -0.6), dist: 2.2, to: 1.9, yaw: 180, pitch: 1, fov: 38 }),
      zone: "room",
      note: "Her, and she has just noticed him, and she does not stop counting.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // The two of them at the table, the tin between them, the pence on the wood.
      cue: "12.world",
      ...cam.push({ on: R(0, 1.1, -0.4), dist: 3.0, to: 2.5, yaw: 176, pitch: 6, fov: 42 }),
      zone: "room",
      note: "The two of them at the table, the tin between them, the pence on the wood.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // Her hand over his hand on the tin.
      cue: "12.worlda",
      ...cam.push({ on: R(0, 0.9, -0.5), dist: 1.6, to: 1.35, yaw: 174, pitch: 16, fov: 34 }),
      zone: "room",
      note: "Her hand over his hand on the tin.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      // The front door from inside, open, and daylight on the step.
      cue: "12.out",
      ...cam.push({ on: R(0, 1.2, 1.6), dist: 3.4, to: 4.6, yaw: 182, pitch: 4, fov: 48 }),
      zone: "room",
      note: "The front door from inside, open, and daylight on the step.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="calm" />
        </>
      ),
    },
    {
      // Him on the step under the sky, and somebody off-camera has said his name.
      cue: "12.outa",
      ...cam.push({ on: R(0, 1.3, 1.8), dist: 2.6, to: 2.1, yaw: 178, pitch: 2, fov: 42 }),
      zone: "room",
      note: "Him on the step under the sky, and somebody off-camera has said his name.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // His face, turning toward the voice, and he does not know it.
      cue: "12.sub",
      ...cam.push({ on: R(0, 1.4, 1.8), dist: 1.9, to: 1.7, yaw: 186, pitch: 1, fov: 34 }),
      zone: "room",
      note: "His face, turning toward the voice, and he does not know it.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // The street, empty except for one person at the gate, and the sign.
      cue: "12.suba",
      ...cam.push({ on: R(0, 1.5, 1.6), dist: 3.6, to: 4.4, yaw: 184, pitch: 3, fov: 48 }),
      zone: "room",
      note: "The street, empty except for one person at the gate, and the sign.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" face="wow" />
        </>
      ),
    },
  ],
});
