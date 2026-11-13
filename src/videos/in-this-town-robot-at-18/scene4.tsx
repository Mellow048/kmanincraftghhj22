import { Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Bubble, DESK, Fill, HeadAt, Hero, NIGHT, ZONE,
  ease, front, jolt, lerp, pop, ramp, room, timing, wordAt,
} from "./kit";

/** The head on the chest, and him in front of it. He faces east, at it; the camera is to the south. */
const HEAD: Vec3 = [DESK[0], DESK[1] + 0.27, DESK[2]];
const ME: Vec3 = room(0.95, 0, -1.7);
const E = Math.PI / 2;
/** Where he stands to put it on: the middle of the room, facing us. */
const MID: Vec3 = room(0.3, 0, -0.6);
const CYAN = "#4fe3ff";

/** THE BUTTON, and what the head was. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "It was a suit",
  shots: [
    {
      cue: "8.night",
      ...cam.push({ on: room(1.55, 1.0, -1.7), dist: 4.6, to: 3.8, yaw: 0, pitch: 6, fov: 44 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "His room, at night, one torch. The head sits on the chest. He stands in front of it with his arms hanging, nose to nose with it, staring. It stares back.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={E} animation="idle" face="frown" headPitch={0.3} />
          <HeadAt position={HEAD} rotation={[0, -E, 0]} />
          <Fill on={[ME[0], 1.5, ME[2]]} yaw={0} power={5} />
        </>
      ),
    },
    {
      cue: "8.how",
      ...cam.push({ on: [ME[0] + 0.1, 1.5, ME[2]], dist: 2.3, to: 2.0, yaw: 55, pitch: 2, fov: 40 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "His face, close, over the top of the head. A question mark.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={E} animation="shrug" face="uneasy" headPitch={0.2} />
          <HeadAt position={HEAD} rotation={[0, -E, 0]} />
          <Fill on={[ME[0], 1.5, ME[2]]} yaw={55} power={5} />
          <group scale={pop(t, 0.15)}>
            <Bubble text="?" position={[ME[0] - 0.1, 2.45, ME[2]]} rotationY={0.9} scale={0.6} dark />
          </group>
        </>
      ),
    },
    {
      cue: "8.nose",
      ...cam.push({ on: [ME[0] + 0.45, 1.3, ME[2]], dist: 2.9, to: 2.4, yaw: 0, pitch: 4, fov: 42 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "He has it in both hands and turns it: upside down, then one ear to his eye, then, on 'nose', he holds it over his face and looks up into it.",
      stage: (t) => {
        const over = wordAt("8.nose", "over");
        const ears = wordAt("8.nose", "ears");
        const nose = wordAt("8.nose", "nose");
        const flip = Math.PI * ease(ramp(t, over - 0.25, over + 0.15));
        const ear = E * ease(ramp(t, ears - 0.3, ears));
        const up = ease(ramp(t, nose - 0.4, nose - 0.05));
        const at = front(ME, E, 0.5, lerp(1.1, 1.75, up));
        return (
          <>
            <Hero position={ME} rotationY={E} animation={up > 0.4 ? "reachUp" : "hold"} face={up > 0.4 ? "worried" : "frown"} headPitch={lerp(0.3, -0.45, up)} />
            <HeadAt position={at} rotation={[flip * (1 - up) - 0.9 * up, -E + ear * (1 - up), 0]} />
            <Fill on={[ME[0], 1.5, ME[2]]} yaw={0} power={5} />
          </>
        );
      },
    },
    {
      cue: "8.button",
      ...cam.push({ on: [HEAD[0] - 0.3, HEAD[1], HEAD[2]], dist: 1.9, to: 1.1, yaw: 0, pitch: 8, fov: 40 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "The back of the head, very close, grey with dust. His finger wipes across it. Under the dust, one small round button, glowing faintly blue.",
      stage: (t) => {
        const dust = wordAt("8.button", "dust");
        const b = wordAt("8.button", "button");
        const wipe = ease(ramp(t, dust - 0.5, dust));
        return (
          <>
            <HeadAt position={[HEAD[0] - 0.3, HEAD[1], HEAD[2]]} rotation={[0, Math.PI, 0]} button={ease(ramp(t, dust - 0.2, b))} />
            <Bits position={[HEAD[0] - 0.3 - 0.25 + 0.5 * wipe, HEAD[1] + 0.05, HEAD[2] + 0.3]} t={(t - dust + 0.5) % 0.4} color="#b8b0a0" count={5} power={0.7} />
            <Glow position={[HEAD[0] - 0.3, HEAD[1] - 0.02, HEAD[2] + 0.32]} size={0.5} color={CYAN} opacity={0.5 * ease(ramp(t, b - 0.2, b + 0.2))} />
            <Fill on={[HEAD[0] - 0.3, HEAD[1], HEAD[2]]} yaw={0} power={4} d={1.6} />
          </>
        );
      },
    },
    {
      cue: "8.press",
      ...cam.push({ on: [HEAD[0] - 0.3, HEAD[1], HEAD[2]], dist: 1.1, to: 0.9, yaw: 0, pitch: 8, fov: 40 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "Click. The button goes in and the whole back of the head lights up.",
      impacts: [{ at: 0.3, amp: 0.03, dur: 0.2 }],
      stage: (t) => (
        <>
          <HeadAt position={[HEAD[0] - 0.3, HEAD[1], HEAD[2]]} rotation={[0, Math.PI, 0]} button={1 + 2 * jolt(t, 0.3, 0.4)} />
          <Glow position={[HEAD[0] - 0.3, HEAD[1] - 0.02, HEAD[2] + 0.32]} size={0.5 + 1.2 * ramp(t, 0.3, 0.7)} color={CYAN} opacity={0.6} />
          <Bits position={[HEAD[0] - 0.3, HEAD[1], HEAD[2] + 0.35]} t={t - 0.3} color={CYAN} count={10} power={1.4} />
          <Fill on={[HEAD[0] - 0.3, HEAD[1], HEAD[2]]} yaw={0} power={4} d={1.6} />
        </>
      ),
    },
    {
      cue: "9.opened",
      ...cam.push({ on: [HEAD[0] - 0.3, HEAD[1] + 0.1, HEAD[2]], dist: 2.4, to: 2.0, yaw: 0, pitch: 6, fov: 42 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "The head, from the front now. Its eyes come on, blue. Its face slides up and back like a visor. It is hollow. It is a helmet.",
      stage: (t) => {
        const o = wordAt("9.opened", "opened");
        const open = ease(ramp(t, o - 0.1, o + 0.5));
        return (
          <>
            <HeadAt position={[HEAD[0] - 0.3, HEAD[1], HEAD[2]]} rotation={[0, 0, 0]} eyes={ease(ramp(t, 0, 0.3))} open={open} />
            <Glow position={[HEAD[0] - 0.3, HEAD[1], HEAD[2] + 0.2]} size={1.6} color={CYAN} opacity={0.35} />
            <pointLight position={[HEAD[0] - 0.3, HEAD[1], HEAD[2] + 0.8]} color={CYAN} intensity={3} distance={4} decay={2} />
            <Fill on={[HEAD[0] - 0.3, HEAD[1], HEAD[2]]} yaw={0} power={3} d={1.6} />
          </>
        );
      },
    },
    {
      cue: "9.on",
      ...cam.push({ on: [MID[0], 1.5, MID[2]], dist: 2.8, to: 2.5, yaw: 0, pitch: 2, fov: 42 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "He lifts it over his head with both hands, and it comes down on him. The visor shuts.",
      stage: (t) => {
        const on = ease(ramp(t, 0.15, 0.55));
        const worn = on >= 1;
        return (
          <>
            <Hero position={MID} animation={worn ? "idle" : "reachUp"} face="worried" suit={worn ? 0.1 : 0} visor={1 - ease(ramp(t, 0.6, 0.85))} />
            {worn ? null : <HeadAt position={[MID[0], lerp(2.35, 1.6, on), MID[2]]} open={1} eyes={1} />}
            <Fill on={[MID[0], 1.5, MID[2]]} yaw={0} power={5} />
          </>
        );
      },
    },
    {
      cue: "9.metal",
      ...cam.orbit({ on: [MID[0], 1.05, MID[2]], dist: 4.6, distTo: 4.2, yaw: -25, yawTo: 25, pitch: 4, fov: 44 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "Silver metal runs down him from the helmet, a line of blue light going with it: his neck and chest, then both arms, then his legs, and it stops at his toes.",
      stage: (t) => {
        const neck = wordAt("9.metal", "neck");
        const arms = wordAt("9.metal", "arms");
        const legs = wordAt("9.metal", "legs");
        const toes = wordAt("9.metal", "toes");
        const suit = t > legs ? 1 : t > arms ? 0.6 : t > neck ? 0.35 : 0.1;
        const line = t < neck ? 1.5 : t < arms ? lerp(1.5, 1.1, ramp(t, neck, arms)) : t < legs ? lerp(1.1, 0.75, ramp(t, arms, legs)) : lerp(0.75, 0.02, ramp(t, legs, toes));
        return (
          <>
            <Hero position={MID} animation={t > arms && t < legs ? "lookAround" : "idle"} suit={suit} headPitch={0.45 * ease(ramp(t, neck, arms))} />
            {t < toes + 0.2 ? (
              <mesh position={[MID[0], line, MID[2]]}>
                <boxGeometry args={[0.95, 0.04, 0.5]} />
                <meshBasicMaterial color={CYAN} transparent opacity={0.85} />
              </mesh>
            ) : null}
            {[neck, arms, legs, toes].map((w, i) => (
              <Bits key={i} position={[MID[0], [1.3, 1.0, 0.6, 0.1][i], MID[2] + 0.2]} t={t - w} color={CYAN} count={12} power={1.8} />
            ))}
            <pointLight position={[MID[0], line, MID[2] + 0.9]} color={CYAN} intensity={5} distance={4} decay={2} />
            <Fill on={[MID[0], 1.2, MID[2]]} yaw={0} power={6} />
          </>
        );
      },
    },
    {
      cue: "9.armor",
      ...cam.push({ on: [MID[0], 1.0, MID[2]], dist: 3.6, to: 4.6, yaw: 0, pitch: -6, fov: 44 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "From low down, pulling back: the whole of him in silver armor, blue eyes lit in a helmet with no face. He looks at his own two hands.",
      stage: (t) => {
        const s = wordAt("9.armor", "silver");
        return (
          <>
            <Hero position={MID} animation={t > s ? "guard" : "hold"} suit={1} eyes={1 + jolt(t, s, 0.5)} headPitch={t > s ? 0 : 0.4} />
            <Glow position={[MID[0], 1.56, MID[2] + 0.3]} size={0.9} color={CYAN} opacity={0.3} />
            <Fill on={[MID[0], 1.2, MID[2]]} yaw={0} power={8} />
            <Fill on={[MID[0], 1.2, MID[2]]} yaw={140} power={5} color={CYAN} />
          </>
        );
      },
    },
    {
      cue: "9.suit",
      ...cam.push({ on: [MID[0], 1.5, MID[2]], dist: 2.6, to: 2.0, yaw: 12, pitch: 0, fov: 40 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "The visor slides up. His face, inside the helmet, grinning from ear to ear.",
      stage: (t) => {
        const suit = wordAt("9.suit", "suit");
        return (
          <>
            <Hero position={MID} rotationY={0.2} animation="idle" suit={1} visor={ease(ramp(t, 0.2, 0.6))} face={t > suit - 0.3 ? "grin" : "wow"} />
            <Fill on={[MID[0], 1.5, MID[2]]} yaw={12} power={6} />
          </>
        );
      },
    },
  ],
});
