import type React from "react";
import { Block, Glow, PixelText, Torch, Vox, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { SubscribeSign, pop, ramp } from "../../../Topics/Stories";
import {
  Brother,
  Castle,
  Coins,
  Creeper,
  Desk,
  Kid,
  NamedChest,
  PLACE,
  ServerScreen,
  SpawnSign,
  at,
  timing,
} from "./kit";

/**
 * One scene: the whole story, cut on the line.
 *
 * Two rules hold the film up. The first three seconds are a question — one player online on a
 * server nobody has joined for three years — and the answer to it ("It's me") is its own shot.
 * And nothing the brother feels is ever said out loud until he says it himself, in the last ten
 * seconds: until then the audience only ever sees what he does with a block.
 *
 * The light moves once, at the end: three years of night, and then the castle finished in the
 * first sun of a Friday morning.
 */

/** Where each thing stands, in world metres. */
const DESK_AT = at(PLACE.room, 0, 0, 1.7);
const SCREEN_AT = at(PLACE.room, 0, 0, 1.2);
const KID_AT = at(PLACE.room, 0, 0, 2.4);
const CASTLE_AT = at(PLACE.hill, 0, 0, 0);
const SPOT_AT = at(PLACE.hill, 0, 0.5, 4.2); // the same spot, every night
const HILL_STAND = at(PLACE.hill, 1.9, 0.5, 5.6);
const SPAWN_SIGN_AT = at(PLACE.spawn, 0, 0, 0.6);
const WALL_AT = at(PLACE.hill, 0, 0, 4.2); // the wall he fills in, one block a night
const TOP_AT = at(PLACE.hill, 0, 5.6, 1.2); // on the roof
const SUB_AT = at(PLACE.hill, 2.6, 1.0, 6.2);

/** How much of the broken wall is filled in at each beat (0 to 1). */
const FILLED = { early: 0.06, middle: 0.42, late: 0.93, done: 1 };

/** A calendar on the wall, with Friday ringed. */
const Calendar: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0, 0]} size={[0.9, 1.1, 0.05]} color="#e8e2cf" castShadow={false} />
    <PixelText text="FRI" position={[0, 0.34, 0.04]} height={0.2} maxWidth={0.7} color="#8a3f2f" />
    <Block position={[0, -0.24, 0.04]} size={[0.62, 0.44, 0.01]} color="#c8442e" castShadow={false} />
    <PixelText text="5" position={[0, -0.24, 0.06]} height={0.24} maxWidth={0.4} color="#f4efe0" />
  </group>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "One player online",
  shots: [
    // ---------------------------------------------------------------- 1. hook
    {
      cue: "1.left",
      ...cam.push({ on: at(PLACE.hill, 0, 3.4, -1), dist: 26, to: 20, yaw: 8, pitch: 8, fov: 52 }),
      zone: "hill",
      look: "overworld-night",
      note: "Open on the question, not the answer: a castle on a hill at night, half finished, one torch lit — and one small figure standing still in the courtyard, doing nothing at all. The audience has three seconds to wonder why he is here alone.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.middle} />
          <Kid position={SPOT_AT} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "1.online",
      ...cam.push({ on: at(PLACE.room, 0, 1.2, 1.0), dist: 2.1, to: 1.6, yaw: -6, pitch: 10, fov: 36 }),
      zone: "room",
      look: "ward-night",
      note: "The screen: ONE PLAYER ONLINE, in the dark, with nobody at the keyboard. The number is the brightest thing in the frame.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <ServerScreen position={SCREEN_AT} players={1} />
        </>
      ),
    },
    {
      cue: "1.online",
      cut: 1.5,
      ...cam.push({ on: [KID_AT[0], 1.35, KID_AT[2]], dist: 1.9, to: 1.55, yaw: 4, pitch: 6, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "Every night. Cut to the boy, lit green by the screen, wide awake at whatever hour this is. He is not playing. He is keeping something on.",
      stage: () => (
        <>
          <ServerScreen position={SCREEN_AT} players={1} />
          <Kid position={KID_AT} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [KID_AT[0], 1.3, KID_AT[2]], dist: 1.35, to: 1.15, yaw: 6, pitch: 2, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "The reveal, said straight to camera and thrown away in nine frames: it's me. He does not look pleased about it.",
      stage: () => (
        <>
          <ServerScreen position={SCREEN_AT} players={1} />
          <Kid position={KID_AT} rotationY={Math.PI} animation="idle" face="frown" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 2. what he left
    {
      cue: "2.castle",
      ...cam.push({ on: at(PLACE.hill, 0, 4.2, 0), dist: 22, to: 16, yaw: 24, pitch: 10, fov: 50 }),
      zone: "hill",
      look: "overworld-night",
      note: "What he left: the castle, seen properly for the first time. Three walls, two towers, and one wall that simply stops half way up. A building with a hole in it.",
      stage: () => <Castle position={CASTLE_AT} filled={FILLED.early} />,
    },
    {
      cue: "2.chest",
      ...cam.push({ on: at(PLACE.hill, -2.6, 1.3, 1.6), dist: 2.4, to: 1.9, yaw: -18, pitch: 20, fov: 36 }),
      zone: "hill",
      look: "overworld-night",
      note: "Inside: a chest with his name on it, still there, three years on.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.early} />
          <NamedChest position={at(PLACE.hill, -2.6, 0.5, 1.6)} rotationY={0.3} name="HIS NAME" />
          <Torch position={at(PLACE.hill, -3.4, 0.5, 2.6)} light={5} seed={41} />
        </>
      ),
    },
    {
      cue: "2.chest",
      cut: 1.35,
      ...cam.push({ on: at(PLACE.hill, 2.4, 1.1, 0.4), dist: 2.2, to: 1.8, yaw: 26, pitch: 14, fov: 36 }),
      zone: "hill",
      look: "overworld-night",
      note: "And a bed with his name on it. Nobody has slept in it. Nobody has moved it. He left a life here, labelled.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.early} />
          <Vox kind="wool" position={at(PLACE.hill, 2.4, 0.7, 0.4)} size={[2.2, 0.4, 1.2]} tint="#7a4a6a" />
          <Vox kind="wool" position={at(PLACE.hill, 3.2, 0.98, 0.4)} size={[0.5, 0.3, 1.1]} tint="#e6e2d8" />
          <PixelText text="HIS BED" position={at(PLACE.hill, 2.4, 1.5, 0.2)} height={0.2} maxWidth={1.3} color="#e8dcc0" />
        </>
      ),
    },
    {
      cue: "2.stopped",
      ...cam.push({ on: [WALL_AT[0], 2.4, WALL_AT[2]], dist: 5.4, to: 4.2, yaw: 0, pitch: 12, fov: 44 }),
      zone: "hill",
      look: "overworld-night",
      note: "The wall, and where it stops: he put the last block down the day he stopped talking to us, and the ragged top of the wall is the day the conversation ended.",
      stage: () => <Castle position={CASTLE_AT} filled={FILLED.early} />,
    },
    {
      cue: "2.stopped",
      cut: 1.7,
      ...cam.push({ on: [HILL_STAND[0], 1.3, HILL_STAND[2]], dist: 2.0, to: 1.7, yaw: 172, pitch: 6, fov: 36 }),
      zone: "hill",
      look: "overworld-night",
      note: "The boy, looking at it, saying the hard part flatly. He does not blame anybody out loud. That is what makes it land.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.early} />
          <Kid position={HILL_STAND} rotationY={-2.6} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "2.seed",
      ...cam.push({ on: [KID_AT[0], 1.3, KID_AT[2]], dist: 1.6, to: 1.35, yaw: 10, pitch: 0, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "'I know the seed by heart.' A fifteen-year-old who has memorised the number of a world so he can keep visiting a person who is not there. He has never told anyone, and the shot is the telling.",
      stage: () => (
        <>
          <ServerScreen position={SCREEN_AT} players={1} />
          <Kid position={KID_AT} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 3. the promise to himself
    {
      cue: "3.pay",
      ...cam.push({ on: at(PLACE.room, 0.5, 0.9, 1.5), dist: 1.5, to: 1.2, yaw: -26, pitch: 32, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "Lunch money, counted out on the desk: nine coins, and what a server costs. The shot is small on purpose — this is the only place in the film where the story is about money.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Coins position={at(PLACE.room, 0.5, 0.8, 1.5)} count={9} />
          <Glow position={at(PLACE.room, 0.5, 1.0, 1.2)} size={1.2} color="#7fd6a0" opacity={0.1} />
        </>
      ),
    },
    {
      cue: "3.night",
      ...cam.push({ on: [SPOT_AT[0], 1.5, SPOT_AT[2]], dist: 4.2, to: 3.0, yaw: 12, pitch: 8, fov: 40 }),
      zone: "hill",
      look: "overworld-night",
      note: "The same spot, every night: he logs on and stands in the doorway of a castle he is not building, and waits for a person who is not coming. The camera does not move, because he does not.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.middle} />
          <Kid position={SPOT_AT} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "3.block",
      ...cam.push({ on: [WALL_AT[0] + 0.6, 1.2, WALL_AT[2] + 1.0], dist: 1.9, to: 1.5, yaw: 20, pitch: 12, fov: 34 }),
      zone: "hill",
      look: "overworld-night",
      note: "One block. His hand placing it on the top of the wall, at the exact height his brother stopped. It is the smallest action in the film and the one it is all about.",
      stage: (t) => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.middle + 0.01 * ramp(t, 0.2, 1.4)} />
          <Kid position={at(PLACE.hill, 0.9, 0.5, 5.0)} rotationY={-2.9} animation="press" face="calm" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 4. the grind
    {
      cue: "4.two",
      ...cam.push({ on: [WALL_AT[0], 2.4, WALL_AT[2]], dist: 7.5, to: 11, yaw: 16, pitch: 8, fov: 46 }),
      zone: "hill",
      look: "overworld-night",
      note: "The payoff of the grind, and the shot that turns the film: pull back and the wall is nearly full. One block a night, and three years of nights is enough to build a wall. The audience works it out for themselves.",
      stage: () => <Castle position={CASTLE_AT} filled={FILLED.late} />,
    },
    {
      cue: "4.two",
      cut: 1.7,
      ...cam.push({ on: [WALL_AT[0] - 2.4, 2.0, WALL_AT[2] + 0.5], dist: 2.4, to: 2.0, yaw: 34, pitch: 4, fov: 34 }),
      zone: "hill",
      look: "overworld-night",
      note: "Along the wall, raking past three years of single blocks: mossy, new, and the odd one slightly out of line from a night he was tired.",
      stage: () => <Castle position={CASTLE_AT} filled={FILLED.late} />,
    },
    {
      cue: "4.mobs",
      ...cam.push({ on: at(PLACE.hill, -7.4, 1.2, -6.2), dist: 3.4, to: 2.7, yaw: -24, pitch: 6, fov: 38 }),
      zone: "hill",
      look: "overworld-night",
      note: "A creeper, at the very edge of the torchlight, standing still. He has kept these out of a castle for three years. This is what a night's work looks like from the outside.",
      stage: () => (
        <>
          <Creeper position={at(PLACE.hill, -7.4, 0, -6.2)} rotationY={0.6} />
          <Torch position={at(PLACE.hill, -5.6, 0.3, -4.8)} light={6} seed={24} />
        </>
      ),
    },
    {
      cue: "4.mobs",
      cut: 1.5,
      ...cam.push({ on: at(PLACE.hill, -5.4, 1.3, -4.6), dist: 2.2, to: 1.8, yaw: -30, pitch: 8, fov: 36 }),
      zone: "hill",
      look: "overworld-night",
      note: "A torch going back on the wall, the same one, for the thousandth time. Keeping the lights on is the whole job.",
      stage: () => (
        <>
          <Torch position={at(PLACE.hill, -5.4, 0.9, -4.6)} light={7} seed={25} />
          <Kid position={at(PLACE.hill, -4.5, 0, -3.8)} rotationY={-2.2} animation="reachUp" face="calm" />
        </>
      ),
    },
    {
      cue: "4.roof",
      ...cam.push({ on: [TOP_AT[0], 6.4, TOP_AT[2]], dist: 8.5, to: 6.4, yaw: 20, pitch: 10, fov: 46 }),
      zone: "hill",
      look: "overworld-night",
      note: "Last month he finished the roof his brother never started: the biggest single thing in the film, and the film is nearly half over before we see it. It is his castle now, and he still will not say so.",
      stage: (t) => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.late} roof={ramp(t, 0, 1.1)} />
          <Kid position={TOP_AT} rotationY={-2.4} animation="crouch" face="calm" />
        </>
      ),
    },
    {
      cue: "4.never",
      ...cam.push({ on: at(PLACE.room, 0, 1.2, 1.0), dist: 2.4, to: 2.0, yaw: -4, pitch: 8, fov: 36 }),
      zone: "room",
      look: "ward-night",
      note: "Back to the number. Still one. He has built a roof for a man who has not opened the door.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <ServerScreen position={SCREEN_AT} players={1} />
        </>
      ),
    },
    {
      cue: "4.never",
      cut: 1.5,
      ...cam.push({ on: [KID_AT[0], 1.3, KID_AT[2]], dist: 1.5, to: 1.3, yaw: 8, pitch: 0, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "'Not once in three years.' He says it like a fact he has already made peace with, which is worse than saying it sadly.",
      stage: () => (
        <>
          <ServerScreen position={SCREEN_AT} players={1} />
          <Kid position={KID_AT} rotationY={Math.PI} animation="idle" face="frown" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 5. the low point
    {
      cue: "5.birthday",
      ...cam.push({ on: at(PLACE.room, -2.6, 1.9, -3.4), dist: 2.0, to: 1.6, yaw: 12, pitch: 0, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "The deadline, on a calendar on the wall, ringed in red: Friday. And it is his brother's birthday, which is the cruellest detail in the film.",
      stage: () => (
        <>
          <Calendar position={at(PLACE.room, -2.6, 1.9, -3.4)} rotationY={0} />
          <Glow position={at(PLACE.room, -2.6, 1.9, -3.0)} size={1.2} color="#ff9a7a" opacity={0.12} />
        </>
      ),
    },
    {
      cue: "5.sign",
      ...cam.push({ on: at(PLACE.spawn, 0, 1.1, 2.2), dist: 4.2, to: 3.2, yaw: 176, pitch: 6, fov: 42 }),
      zone: "spawn",
      look: "overworld-night",
      note: "The sign going in at the spawn point, just in case: the thing you leave when you have stopped believing and cannot stop hoping.",
      stage: (t) => (
        <>
          <SpawnSign position={SPAWN_SIGN_AT} rotationY={0.1} />
          <Kid position={at(PLACE.spawn, 0, 0, 2.2)} rotationY={Math.PI} animation="crouch" face="sad" />
          <Glow position={at(PLACE.spawn, 0, 1.3, 0.4)} size={1.6} color="#ffc078" opacity={0.1 + pop(t, 0.3, 0.5) * 0.1} />
        </>
      ),
    },
    {
      cue: "5.words",
      ...cam.push({ on: at(PLACE.spawn, 0, 1.4, 0.2), dist: 1.9, to: 1.5, yaw: 8, pitch: 2, fov: 32 }),
      zone: "spawn",
      look: "overworld-night",
      note: "The words on it, held: STILL HERE. The film's title, written by a boy on a sign nobody may read.",
      stage: () => (
        <>
          <SpawnSign position={SPAWN_SIGN_AT} rotationY={0.1} />
          <Glow position={at(PLACE.spawn, 0, 1.4, 0.6)} size={1.8} color="#ffc078" opacity={0.14} />
        </>
      ),
    },
    {
      cue: "5.words",
      cut: 1.3,
      ...cam.push({ on: at(PLACE.spawn, 0, 1.3, 2.4), dist: 1.4, to: 1.2, yaw: 174, pitch: 4, fov: 32 }),
      zone: "spawn",
      look: "overworld-night",
      note: "'I kept it.' His face in the torchlight. He is not crying. He has been doing this too long to cry about it.",
      stage: () => <Kid position={at(PLACE.spawn, 0, 0, 2.4)} rotationY={Math.PI} animation="idle" face="sad" />,
    },

    // ---------------------------------------------------------------- 6. the turn
    {
      cue: "6.friday",
      ...cam.push({ on: at(PLACE.room, 0, 1.2, 1.0), dist: 2.6, to: 2.2, yaw: -6, pitch: 6, fov: 38 }),
      zone: "room",
      look: "ward-night",
      note: "Friday. One player online. The same shot as the second beat, which is the point: nothing has changed for three years and this is the day it does.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <ServerScreen position={SCREEN_AT} players={1} />
          <Kid position={KID_AT} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "6.two",
      ...cam.push({ on: at(PLACE.room, 0, 1.3, 0.9), dist: 1.4, to: 1.15, yaw: -4, pitch: 4, fov: 30 }),
      zone: "room",
      look: "ward-night",
      note: "The number changes: ONE becomes TWO. The tightest shot in the film, on the smallest change in the film. Everything that follows is in this one frame.",
      stage: (t) => (
        <>
          <ServerScreen position={SCREEN_AT} players={ramp(t, 0.25, 0.7) > 0.5 ? 2 : 1} highlight={ramp(t, 0.25, 0.7)} />
          <Glow position={at(PLACE.room, 0, 1.3, 0.6)} size={1.6} color="#7fd6a0" opacity={0.1 + ramp(t, 0.25, 0.7) * 0.28} />
        </>
      ),
    },
    {
      cue: "6.name",
      ...cam.push({ on: at(PLACE.room, 0, 1.05, 0.8), dist: 0.95, to: 0.8, yaw: -2, pitch: 0, fov: 28 }),
      zone: "room",
      look: "ward-night",
      note: "And the name, glowing on the screen: his name, after three years. The film's one true arrival, and it is seven letters of pixel text.",
      stage: (t) => (
        <ServerScreen position={SCREEN_AT} players={2} name="HIS NAME" highlight={ramp(t, 0, 0.5)} />
      ),
    },
    {
      cue: "6.wait",
      ...cam.push({ on: [KID_AT[0], 1.3, KID_AT[2]], dist: 2.8, to: 3.6, yaw: 6, pitch: 4, fov: 38 }),
      zone: "room",
      look: "ward-night",
      note: "He does not move for an hour, so neither does the camera: the widest we have seen the room, a boy sitting perfectly still in front of the only thing he has wanted for three years.",
      stage: () => (
        <>
          <ServerScreen position={SCREEN_AT} players={2} name="HIS NAME" highlight={1} />
          <Kid position={KID_AT} rotationY={Math.PI} animation="idle" face="wow" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 7. the payoff
    {
      cue: "7.walked",
      ...cam.push({ on: [SPOT_AT[0], 1.6, SPOT_AT[2] + 1], dist: 6.4, to: 5.0, yaw: 186, pitch: 6, fov: 44 }),
      zone: "hill",
      look: "overworld-night",
      note: "The brother, in the castle for the first time in three years, walking it wall to wall without saying a word. The boy watches him from the doorway, and the camera watches from behind the boy: we are as far from the brother as he is.",
      stage: (t) => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.done} roof={1} />
          <Brother position={at(PLACE.hill, -1.2, 0.5, 1.2 + t * 0.5)} rotationY={-1.4} animation="walk" face="calm" />
          <Kid position={SPOT_AT} rotationY={Math.PI} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "7.walked",
      cut: 1.8,
      ...cam.push({ on: at(PLACE.hill, -1.2, 1.5, 1.4), dist: 2.6, to: 2.1, yaw: -150, pitch: 4, fov: 36 }),
      zone: "hill",
      look: "overworld-night",
      note: "His face, and still no words: a man walking round a castle he abandoned, seeing what his little brother has done to it.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.done} roof={1} />
          <Brother position={at(PLACE.hill, -1.2, 0.5, 1.4)} rotationY={-1.4} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "7.block",
      ...cam.push({ on: at(PLACE.hill, 0, 6.6, 1.6), dist: 3.2, to: 2.4, yaw: 14, pitch: 14, fov: 36 }),
      zone: "hill",
      look: "overworld-night",
      note: "Then he puts down one block. The last one. Not the boy — the brother, finishing his own castle three years late, and the film lets the action say everything he has not.",
      stage: (t) => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.done} roof={1} last={pop(t, 0.5, 0.4)} />
          <Brother position={at(PLACE.hill, 0, 5.6, 2.2)} rotationY={-2.9} animation="press" face="calm" />
        </>
      ),
    },
    {
      cue: "7.said",
      ...cam.push({ on: at(PLACE.hill, 0, 1.55, 2.6), dist: 1.8, to: 1.5, yaw: 172, pitch: 2, fov: 32 }),
      zone: "hill",
      look: "overworld-night",
      note: "The first words anyone says in this film, at seventy seconds in, and they reframe the whole thing: he was watching. Every Sunday. He never left the world; he only stopped speaking in it.",
      stage: () => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.done} roof={1} last={1} />
          <Brother position={at(PLACE.hill, 0, 0.5, 2.6)} rotationY={Math.PI} animation="talk" face="sad" />
        </>
      ),
    },
    {
      cue: "7.said",
      cut: 1.6,
      ...cam.push({ on: [SPOT_AT[0], 1.3, SPOT_AT[2]], dist: 1.35, to: 1.15, yaw: 178, pitch: 0, fov: 30 }),
      zone: "hill",
      look: "overworld-night",
      note: "And the boy hearing it: three years of nights, answered in six words. The film's one close-up of him crying, and it is the shortest shot in the payoff.",
      stage: () => (
        <>
          <Kid position={SPOT_AT} rotationY={Math.PI} animation="idle" face="crying" />
        </>
      ),
    },
    {
      cue: "7.light",
      ...cam.push({ on: at(PLACE.hill, 0, 5.0, -1), dist: 24, to: 17, yaw: 22, pitch: 12, fov: 52 }),
      zone: "hill",
      look: "overworld-sunset",
      note: "The morning: the castle finished, every torch still lit, and both of them on the wall it took three years to fill. The film has been night from the first frame to this one, and this is the first sun in it.",
      stage: (t) => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.done} roof={1} last={1} />
          <Brother position={at(PLACE.hill, -1.1, 5.6, 1.2)} rotationY={-0.4} animation="idle" face="smile" />
          <Kid position={at(PLACE.hill, 0.9, 5.6, 1.4)} rotationY={0.3} animation="idle" face="smile" />
          <Glow position={at(PLACE.hill, 0, 6.4, 1.2)} size={5} color="#ffd08a" opacity={0.12 + ramp(t, 0, 1.2) * 0.14} />
        </>
      ),
    },
    {
      cue: "7.sub",
      ...cam.push({ on: at(PLACE.hill, 0, 3.2, 2), dist: 19, to: 15, yaw: 6, pitch: 10, fov: 48 }),
      zone: "hill",
      look: "overworld-sunset",
      note: "The last shot holds the whole castle, every torch lit, with the two of them small on the wall — the picture the CTA is asking about — and the sign comes up beside it, after the story is finished, never during it.",
      stage: (t) => (
        <>
          <Castle position={CASTLE_AT} filled={FILLED.done} roof={1} last={1} />
          <Brother position={at(PLACE.hill, -1.1, 5.6, 1.2)} rotationY={-0.4} animation="idle" face="smile" />
          <Kid position={at(PLACE.hill, 0.9, 5.6, 1.4)} rotationY={0.3} animation="wave" face="smile" />
          <SubscribeSign position={SUB_AT} rotationY={0.2} scale={pop(t - 0.3, 0, 0.4) * 1.15} />
        </>
      ),
    },
  ],
});
