import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Beam, Bits, Bubble, Bush, Cannon, Crate, DUSK, DustRing, Fill, Hero, Jets, Katana, Mate, Nora, OldMan, PLACE, Shield, Smoke, Streaks, SubscribeSign, ZONE,
  ease, f, front, hop, jolt, lerp, lerp3, pop, ramp, timing, toward, wordAt,
} from "./kit";
import { P } from "./fight";
import { BUSH } from "./scene5";
import { CR, Woods } from "./scene6";

/** Where the old man comes down, east of the hole; his cannon and what it points at. */
const OLDC: Vec3 = f(3.9, 0, -0.5);
const GUN: Vec3 = [OLDC[0] - 0.42, 1.2, OLDC[2] + 0.25];
const AIM: Vec3 = [CR[0], 0.45, CR[2]];
const MUZZLE = lerp3(GUN, AIM, 0.42);
/** The teller in his hole: `lie` puts his feet here and his head to the north. */
const LIE: Vec3 = [CR[0], 0.04, CR[2] - 0.25];
/** Where Nora stops, between the hole and the cannon. */
const SH: Vec3 = f(2.35, 0, -0.25);
/** Where she lands out of the bush, and where she drops into the slide. */
const N0: Vec3 = f(2.95, 0, -1.95);
const N1: Vec3 = f(2.75, 0, -1.4);
const LEAPN = P({ air: true, pitch: 0.35, R: [-1.3, 1.2], L: [0.7, 0.9], aR: [-2.6, 0, 0.5], aL: [0.5, 0, -0.6], head: [-0.2, 0, 0] });
const LANDN = P({ pitch: 0.45, R: [-0.9, 1.3], L: [0.3, 1.0], aR: [0.6, 0, 0.5], aL: [-0.8, 0, -0.3], head: [-0.3, 0, 0] });
const RED = "#ff3b2e";
const W = -Math.PI / 2;
const E = Math.PI / 2;
const All: React.FC = () => <Woods cut2={1} hole />;
/** Where he stands once she has pulled him out. */
const UP: Vec3 = [CR[0] + 0.1, 0, CR[2] + 0.75];

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Nora",
  shots: [
    {
      cue: "13.cannon",
      ...cam.orbit({ on: [OLDC[0] - 0.5, 1.25, OLDC[2]], dist: 3.8, distTo: 3.2, yaw: -40, yawTo: -8, pitch: 2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The camera comes round him as his other arm lifts. Its plates unfold one after another, click, click, click, into the barrel of a cannon as long as he is tall.",
      impacts: [{ at: 0.45, amp: 0.1, dur: 0.3 }, { at: 0.9, amp: 0.03, dur: 0.15 }, { at: 1.2, amp: 0.03, dur: 0.15 }, { at: 1.5, amp: 0.04, dur: 0.15 }],
      stage: (t) => {
        const o = wordAt("13.cannon", "folded");
        const drop = 5.5 * (1 - ramp(t, 0, 0.45)) ** 2;
        return (
          <>
            {/* He has to be seen to arrive: he drops out of the sky on his jets in the first half second. */}
            <OldMan position={[OLDC[0], drop, OLDC[2]]} rotationY={W} animation={drop > 0.05 ? "fall" : "guard"} suit={1} />
            <Jets position={[OLDC[0], drop, OLDC[2]]} power={drop > 0.05 ? 1 : 0} t={t} color={RED} />
            <DustRing position={OLDC} t={t - 0.45} size={1.8} color="#6a7a5a" />
            <Bits position={[OLDC[0], 0.1, OLDC[2]]} t={t - 0.45} color="#6a7a5a" count={12} power={2} />
            {t > 0.5 ? <Cannon position={GUN} to={AIM} open={ease(ramp(t, o - 0.1, o + 0.9))} /> : null}
            <Bits position={GUN} t={t - o} color="#8a8a96" count={8} power={1.4} />
            <Bits position={lerp3(GUN, AIM, 0.2)} t={t - o - 0.4} color={RED} count={8} power={1.4} />
            <Fill on={[OLDC[0], 1.3, OLDC[2]]} yaw={-28} power={4} />
            <All />
          </>
        );
      },
    },
    {
      cue: "13.fired",
      ...cam.push({ on: lerp3(AIM, GUN, 0.8), dist: 4.4, to: 2.2, yaw: toward(OLDC, CR) * 57.3, pitch: -6, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Down the barrel, from the hole, rushing in. The inside of it goes from dark to orange to white, and the air around the muzzle starts to shake.",
      shake: 0.015,
      stage: (t) => {
        const lit = wordAt("13.fired", "lit");
        const ch = ease(ramp(t, 0.3, lit + 0.3));
        return (
          <>
            <OldMan position={OLDC} rotationY={W} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={ch} />
            <Bits position={MUZZLE} t={(t % 0.3)} color="#ffb060" count={8} power={1.2 * ch} />
            <pointLight position={lerp3(GUN, AIM, 0.6)} color="#ffb060" intensity={40 * ch} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "13.reboot",
      ...cam.push({ on: [CR[0], 0.5, CR[2] - 0.2], dist: 4.6, to: 3.6, yaw: -10, pitch: 30, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Him in his hole. He gets his shoulders off the ground, and the suit locks: the eyes of the helmet go out and two words come up, REBOOTING, then PLEASE WAIT with a little bar that fills very slowly. He drops back. The orange light on him is getting brighter.",
      stage: (t) => {
        const up = wordAt("13.reboot", "up");
        const re = wordAt("13.reboot", "rebooting");
        const pl = wordAt("13.reboot", "please");
        const rise = ease(ramp(t, 0.1, up)) * (1 - ease(ramp(t, re - 0.1, re + 0.15)));
        return (
          <>
            <Hero position={LIE} animation="lie" blendTo="sit" blend={1 - 0.55 * rise} suit={1} eyes={t > re ? (Math.sin(t * 9) > 0.6 ? 0.5 : 0) : 1} />
            <group scale={pop(t, re - 0.08) * (t > pl - 0.05 ? 0 : 1)}>
              <Bubble text="REBOOTING" position={[CR[0], 1.2, CR[2] - 1.5]} scale={0.4} dark />
            </group>
            <group scale={pop(t, pl - 0.05)}>
              <Bubble text="PLEASE WAIT" position={[CR[0], 1.2, CR[2] - 1.5]} scale={0.36} dark />
            </group>
            {t > pl ? (
              <mesh position={[CR[0] - 0.5 + 0.2 * ramp(t, pl, 3.4), 0.86, CR[2] - 1.45]}>
                <boxGeometry args={[0.02 + 0.4 * ramp(t, pl, 3.4), 0.06, 0.02]} />
                <meshBasicMaterial color="#4fe3ff" />
              </mesh>
            ) : null}
            <pointLight position={[CR[0] + 1.6, 1.2, CR[2] + 0.4]} color="#ffb060" intensity={4 + 26 * ramp(t, 0, 3.4)} distance={7} decay={2} />
            <Smoke position={[CR[0] - 0.8, 0.2, CR[2] - 0.4]} count={4} spread={0.5} />
            <All />
          </>
        );
      },
    },
    {
      cue: "14.bush",
      ...cam.push({ on: [BUSH[0] - 0.1, 1.2, BUSH[2] + 0.4], onTo: [N0[0] - 0.1, 1.15, N0[2]], dist: 5.2, to: 4.5, yaw: -10, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The cannon is glowing on the right of the frame and the bush at the back of the clearing is shaking. On 'jumped' somebody comes out over the top of it in one leap, in a cloud of leaves: red ponytail, teal hoodie, a small white drone at her shoulder. She lands running.",
      impacts: [{ at: 0.7, amp: 0.06, dur: 0.25 }, { at: 1.15, amp: 0.05, dur: 0.2 }],
      stage: (t) => {
        const j = wordAt("14.bush", "jumped");
        const k = ramp(t, j, j + 0.45);
        const N: Vec3 = [lerp(BUSH[0], N0[0], k), k > 0 && k < 1 ? 0.5 + 1.25 * 4 * k * (1 - k) * (1 - 0.35 * k) : k >= 1 ? 0 : -0.6, lerp(BUSH[2] - 0.2, N0[2], k)];
        const yaw = toward(BUSH, N1);
        return (
          <>
            <Hero position={LIE} animation="lie" suit={1} visor={1} face="fear" />
            <Bush position={BUSH} shake={t < j + 0.3 ? 1 : 0} t={t} />
            {k > 0 ? <Nora position={N} rotationY={yaw} pose={k < 1 ? LEAPN : LANDN} face="brave" /> : null}
            {k > 0 ? <Shield position={[N[0] - 0.55, N[1] + 1.55, N[2] - 0.1]} rotationY={yaw} on={0} /> : null}
            <Bits position={[BUSH[0], 1.0, BUSH[2] + 0.2]} t={t - j} color="#3a7d34" count={30} power={3.4} />
            <Bits position={[BUSH[0], 1.0, BUSH[2] + 0.2]} t={t - j + 0.02} color="#2f6a2c" count={20} power={2.4} seed={4} />
            <DustRing position={N0} t={t - j - 0.45} size={1.3} color="#8a8a66" />
            <OldMan position={OLDC} rotationY={W} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={0.6 + 0.4 * ramp(t, 0, 1.35)} />
            <pointLight position={[GUN[0] - 0.6, 1.4, GUN[2] + 0.6]} color="#ffb060" intensity={10 + 14 * ramp(t, 0, 1.35)} distance={7} decay={2} />
            <All />
          </>
        );
      },
    },
    {
      cue: "14.bush",
      cut: 1.35,
      ...cam.push({ on: [N0[0] - 0.05, 1.45, N0[2] + 0.2], onTo: [N1[0], 1.45, N1[2]], dist: 2.9, to: 2.3, yaw: -24, pitch: -6, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Slow, and close, from where he is lying: her face as she runs at the cannon, teeth shut, ponytail straight out behind her, the orange light coming up on her. 'It was Nora.'",
      stage: (t, { dur }) => {
        const k = ease(t / dur);
        const N = lerp3(N0, N1, k);
        const d = Math.hypot(N1[0] - N0[0], N1[2] - N0[2]);
        const yaw = toward(N0, N1);
        return (
          <>
            <Nora position={N} rotationY={yaw} animation="run" animDistance={0.6 + d * k} face="brave" />
            <Shield position={[N[0] - 0.5, 1.72 + 0.04 * Math.sin(t * 9), N[2] + 0.15]} rotationY={yaw} on={0} />
            <Streaks position={[N[0], 1.3, N[2] - 0.8]} yaw={yaw} t={t * 0.3} n={8} spread={0.9} speed={12} color="#ffe0c0" />
            <Bits position={[N0[0], 0.1, N0[2]]} t={t * 0.5 + 0.05} color="#8aa070" count={8} power={1.4} />
            <pointLight position={[N[0] + 1.3, 1.5, N[2] + 0.9]} color="#ffb060" intensity={8 + 16 * k} distance={6} decay={2} />
            <Fill on={[N[0], 1.45, N[2]]} yaw={-24} power={2.5} color="#ffe6d0" />
            <All />
          </>
        );
      },
    },
    {
      cue: "14.slide",
      ...cam.push({ on: [CR[0] + 0.6, 0.95, CR[2]], onTo: [SH[0] - 0.2, 1.05, SH[2]], dist: 6.2, to: 5.4, yaw: 0, pitch: 7, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "She drops and slides the last three steps on her knees, right across the front of his hole, throwing up dirt, and comes up on one knee between him and the cannon with her hand out. On 'shield' the drone snaps a square of blue light open in front of her.",
      impacts: [{ at: 1.7, amp: 0.05, dur: 0.25 }],
      stage: (t) => {
        const s = wordAt("14.slide", "shield");
        const k = ramp(t, 0, 0.95);
        const sl = 1 - (1 - k) * (1 - k);
        const N = lerp3(N1, SH, sl);
        const upk = ease(ramp(t, 0.95, 1.3));
        return (
          <>
            <Hero position={LIE} animation="lie" suit={1} visor={1} face="fear" />
            <Nora position={N} rotationY={lerp(toward(N1, SH), E, upk)} animation={upk > 0.5 ? "push" : "crouch"} face="brave" />
            {[0.15, 0.4, 0.65, 0.9].map((w, i) => (
              <Bits key={i} position={lerp3(N1, SH, 1 - (1 - w) * (1 - w))} t={t - w} color="#7a6a4a" count={8} power={1.8} />
            ))}
            <DustRing position={SH} t={t - 0.9} size={1.2} color="#7a6a4a" />
            <Shield position={[lerp(N[0] + 0.9, SH[0] + 0.62, upk), lerp(1.5, 1.2, upk), SH[2]]} rotationY={E * 0.75} on={ease(ramp(t, s - 0.2, s))} hit={jolt(t, s, 0.35)} r={1.2} />
            <Bits position={[SH[0] + 0.7, 1.2, SH[2]]} t={t - s + 0.1} color="#7dfff0" count={14} power={2.2} />
            <OldMan position={OLDC} rotationY={W} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={1} />
            <pointLight position={[SH[0] + 1.0, 1.4, SH[2] + 0.8]} color="#ffb060" intensity={40} distance={7} decay={2} />
            <All />
          </>
        );
      },
    },
    {
      cue: "14.blast",
      ...cam.push({ on: [SH[0] + 0.3, 2.0, SH[2]], onTo: [SH[0] + 0.3, 3.6, SH[2]], dist: 7.6, to: 9.6, yaw: 0, pitch: -8, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The cannon goes off: a bar of orange light across the clearing. It hits the shield, the shield goes white, and the whole blast turns upward and goes straight up out of the forest into the sky, and the camera goes back and up with it.",
      impacts: [{ at: 0.45, amp: 0.14, dur: 0.6 }],
      shake: 0.015,
      stage: (t) => {
        const hit = wordAt("14.blast", "hit");
        const on = t > hit - 0.1;
        const w = 0.36 + 0.07 * Math.sin(t * 60);
        const P: Vec3 = [SH[0] + 0.72, 1.2, SH[2]];
        return (
          <>
            <Hero position={LIE} animation="lie" suit={1} />
            <Nora position={SH} rotationY={E} animation="push" face="brave" />
            <Shield position={[SH[0] + 0.62, 1.2, SH[2]]} rotationY={E * 0.75} on={1} hit={on ? 0.7 + 0.3 * Math.sin(t * 50) : 0} r={1.2} />
            <OldMan position={[OLDC[0] + 0.12 * jolt(t, hit - 0.1, 0.3), 0, OLDC[2]]} rotationY={W} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={1} />
            {on ? <Beam from={MUZZLE} to={P} width={w} color="#ff8a2a" core="#fff2c0" /> : null}
            {on ? <Beam from={P} to={[P[0] - 0.8, 34, P[2] - 2]} width={w * 1.25} color="#ff8a2a" core="#fff2c0" /> : null}
            {on ? <pointLight position={[P[0], 1.8, P[2] + 1.2]} color="#ffb060" intensity={140} distance={16} decay={2} /> : null}
            <Bits position={P} t={t - hit + 0.1} color="#fff2c0" count={26} power={4} />
            <Bits position={P} t={(t - hit + 0.1) % 0.35} color="#ffb060" count={8} power={2.4} />
            <DustRing position={SH} t={t - hit + 0.1} size={2.6} color="#7a6a4a" />
            <All />
          </>
        );
      },
    },
    {
      cue: "14.push",
      ...cam.push({ on: [SH[0], 1.15, SH[2]], onTo: [SH[0] - 0.45, 1.15, SH[2]], dist: 4.6, to: 3.6, yaw: -22, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Close on her behind the shield, the blast still pouring onto the other side of it. It shoves her back, her feet cutting two lines in the dirt: one step, then two. Her teeth are shut and her hair is flying. Sparks go past. Then the light stops, all at once, and she is still standing.",
      shake: 0.02,
      impacts: [{ at: 1.2, amp: 0.06, dur: 0.3 }, { at: 1.9, amp: 0.07, dur: 0.3 }],
      stage: (t) => {
        const one = wordAt("14.push", "one");
        const two = wordAt("14.push", "two");
        const no = wordAt("14.push", "nothing");
        const back = 0.22 * ease(ramp(t, one - 0.1, one + 0.15)) + 0.24 * ease(ramp(t, two - 0.1, two + 0.15)) + 0.04 * Math.sin(t * 30) * (t < no ? 1 : 0) * 0.3;
        const on = t < no;
        const N: Vec3 = [SH[0] - back, 0, SH[2]];
        const P: Vec3 = [N[0] + 0.72, 1.2, N[2]];
        const w = 0.36 + 0.07 * Math.sin(t * 60);
        return (
          <>
            <Hero position={LIE} animation="lie" suit={1} visor={1} face="wow" />
            <Nora position={N} rotationY={E} animation="push" face={on ? "angry" : "brave"} headPitch={on ? 0.15 : 0} />
            <Shield position={[N[0] + 0.62, 1.2, N[2]]} rotationY={E * 0.75} on={1} hit={on ? 0.6 + 0.4 * Math.sin(t * 50) : jolt(t, no, 0.4)} r={1.2} />
            {on ? <Beam from={MUZZLE} to={P} width={w} color="#ff8a2a" core="#fff2c0" /> : null}
            {on ? <Beam from={P} to={[P[0] - 0.8, 34, P[2] - 2]} width={w * 1.25} color="#ff8a2a" core="#fff2c0" /> : null}
            {on ? <pointLight position={[P[0], 1.8, P[2] + 1.2]} color="#ffb060" intensity={90} distance={12} decay={2} /> : null}
            {on ? <Bits position={P} t={t % 0.3} color="#fff2c0" count={10} power={3} /> : null}
            {on ? <Streaks position={[N[0] - 0.6, 1.3, N[2]]} yaw={W} t={t} n={8} spread={0.9} speed={12} color="#ffd8a0" /> : null}
            <Bits position={[N[0] - 0.1, 0.08, N[2]]} t={t - one} color="#7a6a4a" count={8} power={1.6} />
            <Bits position={[N[0] - 0.1, 0.08, N[2]]} t={t - two} color="#7a6a4a" count={8} power={1.6} />
            {!on ? <Smoke position={[P[0] + 0.2, 1.0, P[2]]} count={6} spread={0.7} /> : null}
            <OldMan position={OLDC} rotationY={W} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={on ? 1 : 0.2} />
            <All />
          </>
        );
      },
    },
    {
      cue: "14.gone",
      ...cam.push({ on: [OLDC[0], 1.35, OLDC[2]], onTo: [OLDC[0], 1.9, OLDC[2]], dist: 3.6, to: 5.2, yaw: -12, pitch: -4, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The cannon folds away, smoking. The red eyes turn to her. Then to him, for longer. Then his boots light, and he is a red line going up into the dark, and the grass where he stood is burning in two small circles.",
      impacts: [{ at: 2.5, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const her = wordAt("14.gone", "her");
        const me = wordAt("14.gone", "me");
        const gone = wordAt("14.gone", "gone");
        const yaw = 0.5 * ease(ramp(t, her - 0.3, her)) - 1.0 * ease(ramp(t, me - 0.3, me));
        const up = ramp(t, gone - 0.25, gone + 0.15);
        const P: Vec3 = [OLDC[0], 40 * up * up, OLDC[2]];
        return (
          <>
            <OldMan position={P} rotationY={W * 0.5} animation={up > 0 ? "reachUp" : "idle"} suit={1} headYaw={yaw} />
            <Jets position={P} power={ramp(t, gone - 0.45, gone - 0.25)} t={t} color={RED} />
            {up > 0.1 ? <Beam from={[OLDC[0], 0.3, OLDC[2]]} to={[P[0], P[1] + 0.5, P[2]]} width={0.14 * (1 - ramp(t, gone + 0.15, gone + 0.5))} color={RED} core="#ffd0c0" /> : null}
            {t < her ? <Cannon position={GUN} to={AIM} open={1 - ease(ramp(t, 0, her))} /> : null}
            <Smoke position={[GUN[0] - 0.4, 1.2, GUN[2]]} count={4} spread={0.4} />
            <DustRing position={OLDC} t={t - gone + 0.25} size={2.2} color="#6a7a5a" />
            <Bits position={[OLDC[0], 0.2, OLDC[2]]} t={t - gone + 0.25} color={RED} count={18} power={2.8} />
            <Fill on={[OLDC[0], 1.3, OLDC[2]]} yaw={-12} power={3} />
            <All />
          </>
        );
      },
    },
    {
      cue: "15.who",
      ...cam.push({ on: [CR[0] + 0.55, 1.2, CR[2] + 0.5], dist: 4.8, to: 4.0, yaw: 0, pitch: 6, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "She turns, gets him by the arm and hauls him up out of his own hole. He comes up with his visor open and both hands out: WHY ME?",
      stage: (t) => {
        const why = wordAt("15.who", "why");
        const up = ease(ramp(t, 0.15, 0.85));
        const NP: Vec3 = [UP[0] + 0.95, 0, UP[2] + 0.1];
        return (
          <>
            <Hero position={[UP[0], 0.04 * (1 - up), UP[2]]} rotationY={0.5 * up} animation={up < 1 ? "lie" : "shrug"} blendTo="idle" blend={1 - up} suit={1} visor={1} face="worried" />
            <Nora position={NP} rotationY={W * 0.7} animation={up < 1 ? "reach" : "idle"} face="uneasy" headYaw={up >= 1 ? 1.0 : 0} />
            <Shield position={[NP[0] + 0.45, 1.9 + 0.05 * Math.sin(t * 4), NP[2] - 0.3]} on={0} />
            <group scale={pop(t, why - 0.1)}>
              <Bubble text="WHY ME?" position={[UP[0], 2.45, UP[2]]} scale={0.4} dark />
            </group>
            <Fill on={[UP[0] + 0.5, 1.4, UP[2]]} yaw={0} power={4} />
            <All />
          </>
        );
      },
    },
    {
      cue: "15.threw",
      ...cam.push({ on: [UP[0] + 0.95, 1.5, UP[2] + 0.1], dist: 2.9, to: 2.2, yaw: 14, pitch: 0, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Nora, close, turning from the sky to him, red hair, a yellow bow, dirt on her face. She is not smiling.",
      stage: (t) => (
        <>
          <Nora position={[UP[0] + 0.95, 0, UP[2] + 0.1]} rotationY={1.0 - 1.2 * ease(ramp(t, 0.1, 0.8))} animation="talk" face="uneasy" headPitch={-0.3 * (1 - ease(ramp(t, 0.1, 0.6)))} />
          <Fill on={[UP[0] + 0.95, 1.5, UP[2]]} yaw={14} power={4} />
        </>
      ),
    },
    {
      cue: "15.broke",
      ...cam.push({ on: [0.4, 1.6, 1.0], dist: 8.6, to: 7.0, yaw: 0, pitch: 4, fov: 44 }),
      zone: ZONE.town,
      look: DUSK,
      note: "What she is telling him, a long time ago: the square under a dark sky. A young man in a dark suit of armor with red eyes walks into it, and on 'break' a red beam from his hand goes across the square into the bell. People run.",
      impacts: [{ at: 2.9, amp: 0.08, dur: 0.4 }],
      stage: (t, { p }) => {
        const br = wordAt("15.broke", "break");
        const on = t > br - 0.1;
        const walk = ease(ramp(t, 0, br - 0.5));
        const HE: Vec3 = [2.4 - 1.3 * walk, 0, 3.4];
        const yaw = toward(HE, PLACE.bell);
        return (
          <>
            <OldMan position={HE} rotationY={yaw} animation={t > br - 0.5 ? "point" : "walk"} animDistance={1.3 * walk} suit={1} />
            {on ? <Beam from={front(HE, yaw, 0.7, 1.25)} to={[PLACE.bell[0], 2.0, PLACE.bell[2]]} width={0.2 + 0.04 * Math.sin(t * 50)} color={RED} core="#ffd0c0" /> : null}
            {on ? <pointLight position={[0.8, 2, 1]} color={RED} intensity={60} distance={12} decay={2} /> : null}
            <Bits position={[PLACE.bell[0], 2.0, PLACE.bell[2] + 0.4]} t={t - br + 0.1} color="#ffb060" count={26} power={3.6} />
            <Mate n={1} position={[-0.6 - 3.2 * p, 0, 2.4]} rotationY={W} animation="run" animDistance={3.2 * p} face="fear" />
            <Mate n={2} position={[0.2 - 2.8 * p, 0, 4.0]} rotationY={W} animation="run" animDistance={2.8 * p} face="fear" />
            <Mate n={4} position={[-1.6 - 2.4 * p, 0, 1.2]} rotationY={W} animation="run" animDistance={2.4 * p} face="fear" />
          </>
        );
      },
    },
    {
      cue: "15.took",
      ...cam.push({ on: [0.2, 1.4, 2.6], onTo: [0.2, 2.0, 2.6], dist: 5.6, to: 4.8, yaw: 0, pitch: 2, fov: 44 }),
      zone: ZONE.town,
      look: DUSK,
      note: "The same square. He is in his own clothes, between two people who are not going to let go, and his dark helmet with the red eyes is going up and away from him out of the top of the frame. He reaches after it.",
      stage: (t) => {
        const away = wordAt("15.took", "away");
        const k = ease(ramp(t, away - 0.4, away + 1.2));
        return (
          <>
            <OldMan position={[0.2, 0, 2.6]} animation="reachUp" hair="#5a4a3a" headPitch={-0.4} />
            <group position={[0.2 + 0.3 * k, 2.25 + 2.9 * k, 2.6]} rotation={[0.4, 2.5 * k, 0]}>
              <mesh>
                <boxGeometry args={[0.52, 0.52, 0.52]} />
                <meshStandardMaterial color="#34343e" metalness={0.5} roughness={0.4} />
              </mesh>
              <mesh position={[0, 0.03, 0.262]}>
                <boxGeometry args={[0.36, 0.08, 0.02]} />
                <meshBasicMaterial color={RED} />
              </mesh>
            </group>
            <Mate n={3} position={[-1.1 + 0.3 * ease(ramp(t, 0, 0.6)), 0, 2.3]} rotationY={0.9} animation="reach" face="angry" />
            <Mate n={5} position={[1.5 - 0.3 * ease(ramp(t, 0, 0.6)), 0, 2.3]} rotationY={-0.9} animation="reach" face="angry" />
            <Fill on={[0.2, 1.4, 2.6]} yaw={0} power={5} />
          </>
        );
      },
    },
    {
      cue: "15.helmet",
      ...cam.push({ on: [UP[0] + 0.5, 1.45, UP[2]], dist: 4.0, to: 3.2, yaw: 0, pitch: 0, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Back in the forest. Her eyes go from his face up to his helmet, and stay there. On 'white' she takes a step back from him.",
      stage: (t) => {
        const wh = wordAt("15.helmet", "white");
        const back = 0.35 * ease(ramp(t, wh - 0.15, wh + 0.2));
        return (
          <>
            <Hero position={UP} rotationY={0.5} animation="idle" suit={1} visor={1} face="worried" />
            <Nora position={[UP[0] + 0.95 + back, 0, UP[2] + 0.1]} rotationY={-0.8} animation={back > 0.05 ? "scared" : "idle"} face={t > wh - 0.2 ? "fear" : "uneasy"} headPitch={-0.2 * ease(ramp(t, 0.3, 0.8))} />
            <Fill on={[UP[0] + 0.5, 1.4, UP[2]]} yaw={0} power={4} />
            <All />
          </>
        );
      },
    },
    {
      cue: "15.same",
      ...cam.push({ on: [UP[0] + 0.45, 1.5, UP[2]], onTo: [UP[0], 1.58, UP[2]], dist: 3.6, to: 1.7, yaw: 4, pitch: 0, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "She points at it: THE SAME ROBOT. He looks up, as if he could see his own helmet. Then nobody says anything, and we go slowly in on the helmet: the visor comes down by itself, and behind it the blue eyes go red.",
      stage: (t) => {
        const same = wordAt("15.same", "same");
        const his = wordAt("15.same", "his");
        const shut = ease(ramp(t, his + 0.15, his + 0.45));
        const red = t > his + 0.55;
        return (
          <>
            <Hero position={UP} rotationY={0.5 * (1 - shut)} animation="idle" suit={1} visor={1 - shut} face="worried" headPitch={-0.25 * ease(ramp(t, same, his)) * (1 - shut)} glow={red ? RED : undefined} eyes={red ? 1.6 + 0.6 * Math.sin(t * 9) : 1} />
            <Nora position={[UP[0] + 1.3, 0, UP[2] + 0.1]} rotationY={-0.8} animation="point" face="fear" />
            <group scale={pop(t, same - 0.15) * (t > his + 0.5 ? 0 : 1)}>
              <Bubble text="THE SAME ROBOT!" position={[UP[0] + 0.75, 2.5, UP[2]]} scale={0.3} dark />
            </group>
            {red ? <pointLight position={[UP[0], 1.6, UP[2] + 0.9]} color={RED} intensity={5} distance={3} decay={2} /> : null}
            <Fill on={[UP[0] + 0.3, 1.4, UP[2]]} yaw={4} power={4 * (1 - 0.6 * shut)} />
            <All />
          </>
        );
      },
    },
    {
      cue: "15.sub",
      ...cam.push({ on: [UP[0] + 0.5, 1.7, UP[2]], dist: 5.2, to: 4.7, yaw: 0, pitch: 2, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The two of them in the clearing, him in the suit with his visor up again, her with the drone over her shoulder. A sign comes up out of the grass between them: like, and subscribe.",
      stage: (t) => {
        const sub = wordAt("15.sub", "subscribe");
        const C: Vec3 = [UP[0] + 0.5, 0, UP[2]];
        return (
          <>
            <Hero position={[C[0] - 0.75, 0, C[2]]} rotationY={0.2} animation="wave" suit={1} visor={1} face="smile" />
            <Nora position={[C[0] + 0.75, 0, C[2]]} rotationY={-0.2} animation="idle" face="smile" />
            <Shield position={[C[0] + 1.3, 1.95 + 0.05 * Math.sin(t * 5), C[2] - 0.3]} on={0} />
            <group position={[C[0], 2.75 * pop(t, sub - 0.25), C[2] - 0.2]}>
              <SubscribeSign position={[0, 0, 0]} rotationY={0} scale={0.55} />
              <mesh position={[0, -1.55, -0.04]}>
                <boxGeometry args={[0.07, 2.4, 0.05]} />
                <meshStandardMaterial color="#5c3f24" />
              </mesh>
            </group>
            <Bits position={[C[0], 0.1, C[2] - 0.2]} t={t - sub + 0.25} color="#6a8a4a" count={12} power={2} />
            <Fill on={[C[0], 1.4, C[2]]} yaw={0} power={5} />
            <All />
          </>
        );
      },
    },
  ],
});
