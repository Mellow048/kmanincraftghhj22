import type React from "react";
import { cam, lerp, storyScene, stride } from "../../engine";
import { Dragon, Golem, Phoenix, SoundRings } from "../../../Topics/InThisTown/creatures";
import { Adult, EAST, HeroBundle, Kid, WEST, carried, ease, ramp, timing, wordAt } from "./kit";
import { OvenDragon } from "./scene3";

/** Where he stops in the street with the worm. The finale plays from here. */
export const STOPS: [number, number, number] = [8.1, 0, 1.2];
const BUNDLE = carried(STOPS, WEST, "hug");
const TINY = wordAt("16.sound", "tiny");

/**
 * Every monster in the street, west to east. `turn(i)` 0 → 1 swings number i
 * from whatever it was doing to face the wall; `bow` lowers them all.
 */
export const StreetMonsters: React.FC<{ turn?: (i: number) => number; bow?: number }> = ({ turn = () => 1, bow = 0 }) => {
  const face = (from: number, i: number) => lerp(from, EAST, turn(i));
  return (
    <>
      <Golem position={[6.4, 0, 0.3]} rotationY={face(-0.5, 0)} bow={bow} rank="88,000" />
      <Dragon position={[9.2, 0, 2.2]} rotationY={face(3.6, 1)} scale={0.8} fold={0.5} bow={bow} rank="250,000" />
      <Phoenix position={[11.2, 1.1 - bow * 0.5, 0.5]} rotationY={face(-1.6, 2)} scale={0.7} bow={bow} rank="10,000" />
      <Dragon position={[13.2, 0, 2.0]} rotationY={face(-2.2, 3)} scale={0.9} color="#3f7fd8" belly="#cfe0ff" fold={0.5} bow={bow} phase={2} />
      <Golem position={[16.2, 0, 0.4]} rotationY={face(2.9, 4)} bow={bow} />
      <Dragon position={[18.2, 0, 2.1]} rotationY={face(0.4, 5)} scale={0.5} color="#e8792a" belly="#f6d38a" fold={0.6} bow={bow} phase={4} />
    </>
  );
};

/** THE LONG WAIT. The town laughs at the worm, right up to the moment it makes a sound. */
export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "The sound",
  shots: [
    {
      cue: "16.home",
      ...cam.truck({ on: [11.5, 1.0, 1.2], dist: 2.6, yaw: -90, pitch: 2, by: [-3.4, 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "'The whole town laughed': back in daylight, walking at us with the worm in the blanket from act two, and people pointing as he passes.",
      stage: (t, { p }) => (
        <>
          <HeroBundle {...stride([11.5, 0, 1.2], STOPS, p)} animation="walk" face="frown" lift={0.24} />
          <Adult who={1} position={[13.0, 0, 0.25]} rotationY={-1.9} animation="laugh" face="laugh" />
          <Kid who={2} position={[12.3, 0, 2.15]} rotationY={-2.5} animation="laugh" face="laugh" />
          <Adult who={3} position={[14.4, 0, 2.0]} rotationY={-2.1} animation="laugh" face="laugh" />
          <Kid who={1} position={[11.0, 0, 0.2]} rotationY={-1.8} animation="laugh" face="laugh" />
          <Adult who={2} position={[10.0, 0, 2.25]} rotationY={-2.4} animation="laugh" face="laugh" />
        </>
      ),
    },
    {
      cue: "16.sound",
      ...cam.push({ on: [BUNDLE[0] - 0.05, BUNDLE[1] + 0.36, BUNDLE[2]], dist: 1.5, to: 1.15, yaw: -66, pitch: 16, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "'One tiny sound': the worm's head in the blanket low in the frame, his face above it looking down. Its mouth opens on 'tiny' and rings leave it.",
      stage: (t) => (
        <>
          <HeroBundle position={STOPS} rotationY={WEST} face={t < TINY ? "frown" : "wow"} headPitch={0.24} lift={0.22} mouth={ramp(t, TINY, TINY + 0.08)} />
          <SoundRings position={[BUNDLE[0] - 0.24, BUNDLE[1] + 0.3, BUNDLE[2]]} rotationY={WEST} t={(t - TINY) * 1.1} reach={0.9} color="#fff3b0" />
        </>
      ),
    },
    {
      cue: "16.stop",
      ...cam.push({ on: [3.1, 0.75, -0.55], dist: 2.5, to: 1.95, yaw: 62, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      note: "'Every dragon stopped': the bakery dragon again. Its fire cuts off mid-breath and its head comes round to look at us.",
      stage: (t) => <OvenDragon fire={1 - ramp(t, 0.12, 0.26)} headYaw={-1.2 * ease(ramp(t, 0.28, 0.7))} />,
    },
    {
      cue: "16.landed",
      ...cam.push({ on: [-4.9, 3.55, -1.9], dist: 3.3, to: 2.6, yaw: 18, pitch: -12 }),
      zone: "town",
      look: "overworld-day",
      note: "'Every phoenix landed': one drops onto the mail perch and folds its wings. Under a second.",
      stage: (t) => (
        <Phoenix position={[-4.9, 3.3 + (1 - ease(ramp(t, 0, 0.5))) * 0.9, -1.9]} rotationY={0.9} scale={0.7} fly={t < 0.5} rank="10,000" />
      ),
    },
    {
      cue: "16.turn",
      ...cam.push({ on: [11.5, 0.5, 1.2], dist: 14.5, to: 12, yaw: -90, pitch: 30, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "'One by one, every monster turned to the wall': from high over the street, six monsters swing round in turn, nearest first, to face the gate.",
      stage: (t) => (
        <>
          <StreetMonsters turn={(i) => ease(ramp(t, 0.2 + i * 0.42, 0.7 + i * 0.42))} />
          <HeroBundle position={STOPS} rotationY={EAST} face="wow" lift={0.7} />
          <Adult who={1} position={[12.2, 0, -0.3]} rotationY={1.2} animation="lookAround" face="wow" />
          <Kid who={2} position={[14.9, 0, 2.9]} rotationY={-2} animation="lookAround" face="wow" />
          <Adult who={3} position={[10.4, 0, 3.0]} rotationY={2.4} animation="lookAround" face="wow" />
        </>
      ),
    },
    {
      cue: "16.bow",
      ...cam.push({ on: [12, 0.5, 1.2], dist: 13, to: 12.2, yaw: 90, pitch: 28, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "'And bowed': the reverse angle from over the gate. Sixteen frames, and every head goes down together.",
      stage: (t) => (
        <>
          <StreetMonsters bow={ease(ramp(t, 0.03, 0.36))} />
          <HeroBundle position={STOPS} rotationY={EAST} face="wow" lift={0.7} />
        </>
      ),
    },
  ],
});
