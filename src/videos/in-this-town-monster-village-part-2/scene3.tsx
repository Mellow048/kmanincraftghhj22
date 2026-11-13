import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Bubble, Bus, Dad, DustRing, FARM, Fill, Folk, Hero, Hiss, MudDoor, Mum, NIGHT, NORTH, EAST, WEST, Puffs, Raider, WARM, ZONES,
  ease, h, hop, jolt, manFace, pop, ramp, timing, wordAt,
} from "./kit";
import { Everyone } from "./scene2";

const [FX, , FZ] = FARM;
/** The middle of the door frame in the hideout's roof. */
const LID: Vec3 = h(3, 5.1, 2.6);
const UP: Vec3 = h(1, 5.2, 1);

/** PLAYERS OVERHEAD: the lid, the wrecked farm from outside, and forty monsters not breathing. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Nothing here but mud",
  shots: [
    {
      cue: "5.boots",
      ...cam.push({ on: h(-0.4, 1.9, 0), dist: 7.4, to: 6.6, yaw: 0, pitch: -6, fov: 44 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The village, all thinking. On 'boots' the roof thuds, dust comes down off the beams in three places, and every head in the room goes up at once.",
      impacts: [
        { at: 0.95, amp: 0.06, dur: 0.25 },
        { at: 1.4, amp: 0.06, dur: 0.25 },
        { at: 1.85, amp: 0.05, dur: 0.25 },
      ],
      stage: (t) => {
        const boots = wordAt("5.boots", "boots");
        return (
          <>
            <Everyone t={t} look={t > boots ? UP : undefined} mood={t > boots ? "scared" : "sad"} hopAt={boots} />
            {[[-2, 0.5, 0], [1, 1.2, 0.45], [-0.3, -0.6, 0.9]].map(([x, z, d], i) => (
              <group key={i}>
                <Bits position={h(x, 4.9, z)} t={t - boots - d} color="#c9a877" count={9} power={0.9} seed={i + 2} />
                {t > boots + d && t < boots + d + 0.9 ? <Puffs position={h(x, 4.7 - (t - boots - d) * 2.4, z)} color="#d9c7a4" count={4} rise={0.2} spread={0.35} size={0.07} speed={1.2} opacity={0.7} /> : null}
              </group>
            ))}
          </>
        );
      },
    },
    {
      cue: "5.lid",
      ...cam.push({ on: h(3, 3.9, 2.3), dist: 4.6, to: 3.6, yaw: 62, pitch: -24, fov: 44 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The boy goes up the ladder to the square of night sky in the roof. On 'mud' he drags a handful of it over the lid from outside, and on 'shut' the lid comes down and the blue light goes out.",
      impacts: [{ at: 2.75, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const pushed = wordAt("5.lid", "pushed");
        const shut = wordAt("5.lid", "shut");
        const climb = ease(ramp(t, 0, pushed - 0.1));
        const k = 1.25 * (1 - ease(ramp(t, shut - 0.3, shut)));
        return (
          <>
            <Hero position={h(3, 0.4 + 2.8 * climb, 2.34)} rotationY={NORTH} animation={climb < 1 ? "walk" : "idle"} animDistance={3 * climb} arms={t > pushed - 0.1 ? "reach" : undefined} face="uneasy" headPitch={-0.5} />
            {/* The lid, hinged along its west edge: planks under, mud over. */}
            <group position={[LID[0] - 0.84, LID[1], LID[2]]} rotation={[0, 0, k]}>
              <Block position={[0.84, 0, 0]} size={[1.7, 0.1, 1.76]} color="#8a6238" castShadow={false} />
              <Block position={[0.84, 0.08, 0]} size={[1.7, 0.06, 1.76]} color="#5b4331" castShadow={false} />
            </group>
            <pointLight position={[LID[0], LID[1] - 0.5, LID[2]]} color="#9db4ff" intensity={22 * (k / 1.25)} distance={7} decay={2} />
            <Bits position={[LID[0] + 0.3, LID[1] - 0.1, LID[2]]} t={t - pushed - 0.15} color="#5b4331" count={12} power={1.2} />
            <Bits position={[LID[0], LID[1] - 0.1, LID[2]]} t={t - shut} color="#c9a877" count={10} power={1.5} seed={5} />
            <Mum position={h(1.6, 0, 3.4)} rotationY={1.2} mood="scared" lookAt={LID} arms={0.4} />
          </>
        );
      },
    },
    {
      cue: "5.farm",
      ...cam.push({ on: [FX - 0.6, 0.9, FZ - 0.4], dist: 9.5, to: 11.5, yaw: 8, pitch: 15, fov: 44 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Outside. The last line of lamplight round the door goes out, and it is a square of mud in a wrecked pig farm. Three torches are coming in along the road.",
      stage: (t, { p }) => {
        const gone = ease(ramp(t, 0.1, 0.55));
        return (
          <>
            <MudDoor k={0.1 * (1 - gone)} glow={10 * (1 - gone)} />
            <DustRing position={[FX, 0.07, FZ]} t={t - 0.5} size={1.5} color="#5b4331" />
            {[0, 1, 2].map((i) => (
              <Raider key={i} who={i} torch sword={false} position={[FX - 11.5 + 3.2 * p - i * 1.3, 0, FZ - 2.6 + i * 1.1]} rotationY={EAST} animation="walk" animDistance={3.2 * p} face="angry" />
            ))}
          </>
        );
      },
    },
    {
      cue: "5.breath",
      ...cam.truck({ on: h(-1.3, 1.5, 0), dist: 4.3, yaw: 0, pitch: 0, fov: 40, by: [2.4, 0, 0] }),
      ease: "linear",
      zone: ZONES.hide,
      look: WARM,
      note: "Along a row of them looking up with their mouths shut tight. Dad is rattling. On 'bones' he grabs hold of himself, a second skeleton grabs hold of dad, and the rattling stops.",
      stage: (t) => {
        const bones = wordAt("5.breath", "bones");
        const held = ramp(t, bones - 0.12, bones);
        return (
          <>
            <Mum position={h(-1.6, 0, 0)} mood="scared" lookAt={UP} arms={0.15} />
            <Hero position={h(-0.7, 0, 0.5)} animation="idle" face="fear" lookAt={UP} />
            <Hiss position={h(0.1, 0, -0.2)} mood="scared" lookAt={UP} scale={1 + 0.05 * Math.sin(t * 3)} />
            <Dad position={h(1.0, 0, 0)} mood="scared" rattle={1 - held} tilt={0.12 * held} lookAt={held ? undefined : UP} nod={0.2 * held} />
            <Folk kind="skeleton" n={3} position={h(1.75 - 0.3 * held, 0, 0)} rotationY={-0.6 * held} mood="scared" rattle={1 - held} tilt={-0.22 * held} />
          </>
        );
      },
    },
    {
      cue: "5.looked",
      ...cam.push({ on: [FX - 0.3, 1.2, FZ - 0.6], dist: 8.6, to: 7.6, yaw: 6, pitch: 9, fov: 44 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Three players with torches in the farm, one look each, on each 'looked': one bends into the trough, one looks behind the half shed, one looks under a fence rail. Nothing.",
      stage: (t) => {
        const a = wordAt("5.looked", "looked");
        const b = wordAt("5.looked", "looked", 1);
        const c = wordAt("5.looked", "looked", 2);
        const bend = (at: number): number => Math.sin(Math.PI * ramp(t, at - 0.1, at + 0.55));
        return (
          <>
            <MudDoor />
            <pointLight position={[FX, 2.6, FZ + 3]} color="#cdd6ff" intensity={34} distance={11} decay={2} />
            <Raider who={1} torch sword={false} position={[FX - 1.5, 0, FZ - 0.6]} rotationY={NORTH + 0.2} animation={bend(a) > 0.25 ? "leanOver" : "idle"} headPitch={0.4 * bend(a)} face="angry" />
            <Raider who={2} torch sword={false} position={[FX + 2.6 + 0.5 * bend(b), 0, FZ - 0.9]} rotationY={NORTH - 0.4} animation="idle" headYaw={-0.9 * bend(b)} face="angry" />
            <Raider who={0} torch sword={false} position={[FX - 3.4, 0, FZ + 1.3]} rotationY={WEST + 0.5} animation={bend(c) > 0.25 ? "leanOver" : "idle"} headPitch={0.4 * bend(c)} face="angry" />
          </>
        );
      },
    },
    {
      cue: "5.stood",
      ...cam.push({ on: [FX, 0.55, FZ], dist: 3.5, to: 2.9, yaw: 24, pitch: 12, fov: 42 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Low on the patch of mud. Two boots walk onto it and stop. He jumps on it, once, on 'door'. Mud splashes. The door stays where it is.",
      impacts: [{ at: 1.05, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const stood = wordAt("5.stood", "stood");
        const door = wordAt("5.stood", "door");
        const k = ease(ramp(t, 0, stood + 0.1));
        return (
          <>
            <MudDoor />
            <pointLight position={[FX + 1, 1.6, FZ + 2]} color="#cdd6ff" intensity={20} distance={7} decay={2} />
            <Raider who={0} torch sword={false} position={[FX - 1.6 + 1.6 * k, hop(t, door - 0.3, 0.3, 0.3), FZ]} rotationY={EAST - 0.4 * k} animation={k < 1 ? "walk" : "idle"} animDistance={1.6 * k} face="angry" headPitch={0.5 * k} />
            <Bits position={[FX, 0.12, FZ]} t={t - door} color="#5b4331" count={14} power={2.0} />
            <DustRing position={[FX, 0.07, FZ]} t={t - door} size={1.5} color="#5b4331" />
          </>
        );
      },
    },
    {
      cue: "5.left",
      ...cam.push({ on: manFace([FX, 0, FZ]), dist: 4.2, to: 5.4, yaw: 14, pitch: 3, fov: 42 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "The big one, standing on the door, shrugs and says it. Then on 'left' he turns and all three of them walk away, back up the road.",
      stage: (t) => {
        const said = wordAt("5.left", "nothing");
        const left = wordAt("5.left", "left");
        const go = ramp(t, left - 0.25, left + 0.9);
        const at: Vec3 = [FX - 2.6 * go, 0, FZ - 0.9 * go];
        return (
          <>
            <MudDoor />
            <Fill on={manFace(at)} yaw={14} power={10} d={2.2} />
            <Raider who={0} torch sword={false} position={at} rotationY={0.25 + (WEST - 0.25) * ease(ramp(t, left - 0.3, left - 0.05))} animation={go > 0 ? "walk" : "shrug"} animDistance={2.8 * go} face="angry" />
            {go < 0.25 ? <Bubble text="NOTHING HERE BUT MUD." position={[FX + 0.15, 2.72, FZ + 0.4]} rotationY={0.24} scale={0.44 * pop(t, said - 0.05)} tail={-1} dark /> : null}
            <Raider who={1} torch sword={false} position={[FX - 2.2 - 2.4 * go, 0, FZ - 1.6]} rotationY={go > 0 ? WEST : 0.9} animation={go > 0 ? "walk" : "idle"} animDistance={2.4 * go} face="angry" />
            <Raider who={2} torch sword={false} position={[FX + 2.4 - 2.4 * go, 0, FZ - 1.4]} rotationY={go > 0 ? WEST : -0.9} animation={go > 0 ? "walk" : "idle"} animDistance={2.4 * go} face="angry" />
          </>
        );
      },
    },
    {
      cue: "5.sigh",
      ...cam.push({ on: h(-0.5, 1.5, -0.4), dist: 7.6, to: 7.0, yaw: 0, pitch: 5, fov: 44 }),
      zone: ZONES.hide,
      look: WARM,
      note: "All of them let go at once on 'sighed': every body sags forward, a puff of breath goes up off each of them, and the bus goes flat like a pancake.",
      stage: (t) => {
        const sigh = wordAt("5.sigh", "sighed");
        const k = ease(ramp(t, sigh - 0.1, sigh + 0.35));
        const flat = k * (1 + 0.3 * Math.sin(Math.min(1, ramp(t, sigh + 0.3, sigh + 0.8)) * Math.PI));
        return (
          <>
            <Everyone t={t} mood={k > 0.3 ? "happy" : "scared"} look={k > 0.3 ? undefined : UP} lean={0.3 * Math.sin(k * Math.PI * 0.85)} bus={false} />
            <Bus position={h(-3.4, 0, -0.8)} squash={0.42 * flat} mood="happy" size={1.5} />
            {k > 0 && k < 1
              ? [[-1.6, 0.2, 1.9], [-0.6, -0.4, 2.0], [0.6, 0.1, 1.8], [0, 1.3, 1.2], [1.9, -0.9, 3.0], [-2.6, -1.4, 1.9], [1.2, -2.2, 1.9]].map(([x, z, y], i) => (
                  <Puffs key={i} position={h(x, y, z + 0.3)} color="#ffffff" count={3} rise={0.5} spread={0.2} size={0.07} speed={1.4} opacity={0.6} />
                ))
              : null}
          </>
        );
      },
    },
  ],
});
