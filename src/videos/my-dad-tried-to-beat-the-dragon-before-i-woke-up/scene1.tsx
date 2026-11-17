import type React from "react";
import { Block, Glow, LightPool, PixelText, Torch, Vox, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { SubscribeSign, pop, ramp } from "../../../Topics/Shared";
import {
  Boy,
  Dad,
  Desk,
  Dragon,
  Enderman,
  EyeGrid,
  Pearl,
  PLACE,
  Portal,
  SorrySign,
  Shaft,
  at,
  timing,
  wordAt,
} from "./kit";

/**
 * One scene: the whole story, cut on the line.
 *
 * The voice is the clock (timing.json, measured from the recording), and every shot lands on a cue.
 * Nine of the longest lines are cut into two angles — that is what brings the median shot to 2.1s,
 * which is where the reference film lives (1.79s) instead of where one-shot-per-line leaves it (2.8s).
 *
 * The light changes for a reason, never for decoration: cold monitor blue at midnight, torch orange
 * down the shaft, orange again when the lava finds him, and the first gold of morning on the two
 * shots that pay the film off.
 */

/** Where each thing stands, in world metres. */
const DESK_AT = at(PLACE.room, 0, 0, 1.6);
const DAD_AT = at(PLACE.room, 0, 0, 0.2);
const BOY_AT = at(PLACE.room, 1.5, 0, 0.6);
const SHAFT_BOTTOM = at(PLACE.shaft, 0, -6.0, 0);
const ENDERMAN_AT = at(PLACE.field, 0, 0, -2.4);
const DAD_FIELD = at(PLACE.field, 0, 0, 0.9);
const DRAGON_AT = at(PLACE.end, 0, 7.5, 26);
const SUB_AT = at(PLACE.field, 1.2, 1.5, 2.6);

/** The wooden sword, made at midnight and swung at the end. */
const Sword: React.FC<{ position: Vec3; rotationY?: number; rotationZ?: number; scale?: number }> = ({
  position,
  rotationY = 0,
  rotationZ = 0,
  scale = 1,
}) => (
  <group position={position} rotation={[0, rotationY, rotationZ]} scale={scale}>
    <Block position={[0, 0.34, 0]} size={[0.07, 0.62, 0.07]} color="#8a6236" />
    <Block position={[0, 0.66, 0]} size={[0.2, 0.1, 0.09]} color="#b8905a" />
    <Block position={[0, 0.72, 0]} size={[0.22, 0.08, 0.1]} color="#c8a06a" />
  </group>
);

/** A clock on the wall, always reading the hour the story is at. */
const WallClock: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0, 0]} size={[0.7, 0.7, 0.1]} />
    <Block position={[0, 0, 0.06]} size={[0.54, 0.54, 0.02]} color="#e8e2d0" castShadow={false} />
    <Block position={[0, 0.16, 0.08]} size={[0.04, 0.2, 0.01]} color="#2b2b33" castShadow={false} />
    <Block position={[0.12, 0, 0.08]} size={[0.16, 0.04, 0.01]} color="#2b2b33" castShadow={false} />
  </group>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Four hundred blocks",
  shots: [
    // ---------------------------------------------------------------- 1. hook
    {
      cue: "1.never",
      ...cam.push({ on: [DAD_AT[0], 1.45, DAD_AT[2]], dist: 3.9, to: 3.0, yaw: 0, pitch: 6, fov: 46 }),
      zone: "room",
      look: "ward-night",
      note: "Open on the man, not the game: a man in armour he has put on back to front, lit only by a monitor, both hands on a mouse he is holding wrong. The room is cold blue; the screen is the only warm thing, and it is behind the lens, so his face is the brightest part of the frame.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="press" face="brave" />
        </>
      ),
    },
    {
      cue: "1.never",
      cut: 1.75,
      ...cam.push({ on: [DAD_AT[0] + 0.1, 0.85, DAD_AT[2] + 0.55], dist: 1.8, to: 1.55, yaw: -22, pitch: 16, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "The second half of the line is the proof: one finger pressing the mouse, over and over, the way you would knock on a door. Nothing in the game responds.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="press" face="brave" />
          <Block position={[DAD_AT[0] + 0.34, 0.82, DAD_AT[2] + 0.42]} size={[0.16, 0.06, 0.24]} color="#2b2f36" />
        </>
      ),
    },
    {
      cue: "1.promise",
      ...cam.push({ on: at(PLACE.room, -2.6, 1.9, 0.2), dist: 2.6, to: 2.0, yaw: 24, pitch: 4, fov: 38 }),
      zone: "room",
      look: "ward-night",
      note: "The promise, written down, because a man who is not sure he can do a thing writes it down: a note taped to the wall above the desk. The lens drives in on it, and the words are the title.",
      stage: (t) => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="press" face="brave" />
          <Block position={at(PLACE.room, -2.6, 1.9, 0.05)} size={[1.5, 1.0, 0.04]} color="#e8e2cf" castShadow={false} />
          <PixelText text="BEAT IT" position={at(PLACE.room, -2.6, 2.14, 0.08)} height={0.2} maxWidth={1.3} color="#c8442e" />
          <PixelText text="BEFORE HE WAKES" position={at(PLACE.room, -2.6, 1.68, 0.08)} height={0.15} maxWidth={1.3} color="#c8442e" />
          <Glow position={at(PLACE.room, -2.6, 1.9, 0.4)} size={1.4} color="#7fd6a0" opacity={0.1} />
        </>
      ),
    },
    {
      cue: "1.promise",
      cut: 1.55,
      ...cam.push({ on: [DAD_AT[0], 1.5, DAD_AT[2]], dist: 1.8, to: 1.55, yaw: 6, pitch: 2, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "His face on the word 'promised'. The armour strap is on the wrong shoulder and he has not noticed. He is not funny here — he is concentrating.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="press" face="brave" />
        </>
      ),
    },
    {
      cue: "1.down",
      ...cam.top({ on: at(PLACE.shaft, 0, 0.02, 0), height: 9, to: 3.4, fov: 52 }),
      zone: "shaft",
      look: "overworld-night",
      note: "The mechanic, shown before it is explained: straight down into a one-block hole, torch after torch, going further than the frame can follow. Looking down it is the first thing in the film that feels dangerous.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Dad position={SHAFT_BOTTOM} rotationY={0} animation="crouch" face="brave" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 2. catch-22
    {
      cue: "2.needs",
      ...cam.push({ on: at(PLACE.room, 1.9, 0.95, 1.2), dist: 1.8, to: 1.55, yaw: -14, pitch: 22, fov: 36 }),
      zone: "room",
      look: "ward-night",
      note: "The grid, empty. Twelve slots that have to be filled before anything in this film can happen, and the dad does not know what goes in them.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="press" face="uneasy" />
          <EyeGrid position={at(PLACE.room, 1.9, 0.4, 1.2)} rotationY={-0.3} filled={0} />
        </>
      ),
    },
    {
      cue: "2.needs",
      cut: 1.4,
      ...cam.push({ on: [DAD_AT[0], 1.5, DAD_AT[2]], dist: 1.8, to: 1.55, yaw: 10, pitch: 6, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "And him, not knowing: a man who has played for one evening, being told the game needs twelve of a thing he has never seen. He is not stupid. He has simply never done this before.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="lookAround" face="uneasy" />
        </>
      ),
    },
    {
      cue: "2.pearls",
      ...cam.push({ on: at(PLACE.room, 1.9, 0.62, 1.2), dist: 1.8, to: 1.55, yaw: -8, pitch: 30, fov: 30 }),
      zone: "room",
      look: "ward-night",
      note: "One pearl, held on the grid like an object in a museum: the whole film is this one block, and he cannot get it.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <EyeGrid position={at(PLACE.room, 1.9, 0.4, 1.2)} rotationY={-0.3} filled={0} />
          <Pearl position={at(PLACE.room, 1.9, 0.55, 1.2)} t={0} />
        </>
      ),
    },
    {
      cue: "2.look",
      ...cam.push({ on: [ENDERMAN_AT[0], 2.3, ENDERMAN_AT[2]], dist: 6.2, to: 4.4, yaw: 8, pitch: 4, fov: 44 }),
      zone: "field",
      look: "overworld-night",
      note: "The enderman, at the edge of the torchlight: three blocks of black with two violet eyes. It is not attacking. It is just standing there, and that is worse.",
      stage: () => <Enderman position={ENDERMAN_AT} rotationY={0} awake={pop(0, 0)} />,
    },
    {
      cue: "2.look",
      cut: 1.5,
      ...cam.push({ on: [ENDERMAN_AT[0], 2.42, ENDERMAN_AT[2] + 0.16], dist: 1.8, to: 1.55, yaw: 2, pitch: 2, fov: 30 }),
      zone: "field",
      look: "overworld-night",
      note: "The two violet eyes, filling the frame, and nothing else. This is the monster he will not look at, and the film makes the audience look at it for him.",
      stage: () => (
        <>
          <Enderman position={ENDERMAN_AT} rotationY={0} />
          <Glow position={[ENDERMAN_AT[0], 2.42, ENDERMAN_AT[2] + 0.4]} size={1.1} color="#c86bff" opacity={0.34} />
        </>
      ),
    },
    {
      cue: "2.wont",
      ...cam.push({ on: [DAD_FIELD[0], 1.6, DAD_FIELD[2]], dist: 1.8, to: 1.55, yaw: -12, pitch: 8, fov: 40 }),
      zone: "field",
      look: "overworld-night",
      note: "He turns his whole head away, one hand up over his eyes, standing three metres from the only thing that can finish the job. The enderman's eyes stay lit at the edge of frame the whole shot.",
      stage: () => (
        <>
          <Enderman position={ENDERMAN_AT} rotationY={0} />
          <Dad position={DAD_FIELD} rotationY={0} animation="guard" face="scared" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 3. why
    {
      cue: "3.slow",
      ...cam.push({ on: [BOY_AT[0], 1.25, BOY_AT[2]], dist: 2.6, to: 2.1, yaw: 16, pitch: 6, fov: 40 }),
      zone: "room",
      look: "ward-night",
      note: "Two years ago, and the room is the same room: the boy at the same desk, saying the cruellest thing a twelve-year-old can say to his dad, with his back half turned. The camera is where the dad was standing.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Boy position={BOY_AT} rotationY={0} animation="talk" face="angry" />
          <Dad position={at(PLACE.room, -0.4, 0, -1.6)} rotationY={0} animation="idle" face="hurt" />
        </>
      ),
    },
    {
      cue: "3.slow",
      cut: 1.6,
      ...cam.push({ on: [BOY_AT[0] - 0.3, 1.35, BOY_AT[2] - 0.1], dist: 1.8, to: 1.55, yaw: 12, pitch: 2, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "The words themselves, on his face: 'too slow'. He does not shout it. That is why it lands.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Boy position={BOY_AT} rotationY={0} animation="talk" face="angry" />
        </>
      ),
    },
    {
      cue: "3.heard",
      ...cam.push({ on: at(PLACE.room, -0.4, 1.5, -1.6), dist: 1.8, to: 1.55, yaw: 6, pitch: 3, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "The dad, in the doorway, hearing it, and deciding not to let it show. Nothing moves but his eyes.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={at(PLACE.room, -0.4, 0, -1.6)} rotationY={0} animation="idle" face="hurt" />
        </>
      ),
    },
    {
      cue: "3.heard",
      cut: 1.5,
      ...cam.push({ on: [BOY_AT[0], 1.3, BOY_AT[2]], dist: 3.0, to: 2.5, yaw: -4, pitch: 5, fov: 40 }),
      zone: "room",
      look: "ward-night",
      note: "What the dad saw from the doorway: his son's back, lit by the monitor, not turning round. The shot a parent remembers.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Boy position={BOY_AT} rotationY={0} animation="idle" face="angry" />
        </>
      ),
    },
    {
      cue: "3.midnight",
      ...cam.push({ on: at(PLACE.room, 1.9, 0.72, 1.2), dist: 1.8, to: 1.55, yaw: -30, pitch: 18, fov: 34 }),
      zone: "room",
      look: "ward-night",
      note: "Midnight, on the clock on the wall, and the first thing he ever crafted: a wooden sword, because a sword is what you make when you are going to fight something.",
      stage: () => (
        <>
          <WallClock position={at(PLACE.room, -1.2, 2.2, 3.75)} rotationY={Math.PI} />
          <EyeGrid position={at(PLACE.room, 1.9, 0.4, 1.2)} rotationY={-0.3} filled={0} />
          <Sword position={at(PLACE.room, 1.9, 0.48, 1.5)} rotationY={0.4} rotationZ={Math.PI / 2} scale={1.1} />
          <Glow position={at(PLACE.room, 1.9, 0.6, 1.5)} size={0.8} color="#ffd08a" opacity={0.18} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 4. grind
    {
      cue: "4.dug",
      ...cam.top({ on: at(PLACE.shaft, 0, -5.2, 0), height: 5.6, to: 1.2, fov: 54 }),
      zone: "shaft",
      look: "overworld-night",
      note: "Down the shaft and into it: four hundred blocks of torchlight, seen from inside, falling. The walls are the only thing moving.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Dad position={SHAFT_BOTTOM} rotationY={0} animation="crouch" face="brave" />
        </>
      ),
    },
    {
      cue: "4.dug",
      cut: 1.6,
      ...cam.push({ on: [SHAFT_BOTTOM[0], 0.95, SHAFT_BOTTOM[2]], dist: 1.8, to: 1.55, yaw: 10, pitch: 16, fov: 38 }),
      zone: "shaft",
      look: "overworld-night",
      note: "At the bottom, in the only light there is: a man on his knees, swinging at stone with a wooden sword, because it is the only tool he has.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Dad position={SHAFT_BOTTOM} rotationY={0} animation="crouch" arms="press" face="brave" />
          <Torch position={at(PLACE.shaft, -0.6, -5.0, -0.5)} light={7} seed={3} />
        </>
      ),
    },
    {
      cue: "4.torch",
      ...cam.push({ on: at(PLACE.shaft, 0.3, -2.7, -1.15), dist: 4.0, to: 3.4, yaw: -20, pitch: 8, fov: 42 }),
      zone: "shaft",
      look: "overworld-night",
      note: "A hand placing a torch on the wall, every ten blocks, each one a decision not to be frightened. The flame is the warmest thing in the film so far.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Torch position={at(PLACE.shaft, -0.62, -2.6, -1.15)} light={4} seed={2} />
        </>
      ),
    },
    {
      cue: "4.count",
      ...cam.truck({ on: at(PLACE.shaft, 0.6, -1.1, -0.66), dist: 1.5, yaw: 90, pitch: 2, fov: 34, by: [0, -4.2, 0] }),
      zone: "shaft",
      look: "overworld-night",
      note: "The count, written on the wall like a calendar: one hundred, two, three, four. The lens slides down past all of them, which is how you show six hours in three seconds.",
      stage: () => <Shaft position={PLACE.shaft} depth={6} />,
    },

    // ---------------------------------------------------------------- 5. heart
    {
      cue: "5.bed",
      ...cam.push({ on: at(PLACE.room, -2.7, 1.15, 1.6), dist: 2.8, to: 2.3, yaw: 30, pitch: 8, fov: 42 }),
      zone: "room",
      look: "ward-night",
      note: "Years ago, at bedtime: the boy asking, already knowing the answer. He asks anyway. That is the part that undoes the dad.",
      stage: () => (
        <>
          <Vox kind="wool" position={at(PLACE.room, -2.7, 0.3, 1.9)} size={[2.2, 0.4, 1.4]} tint="#4a6ea8" />
          <Boy position={at(PLACE.room, -2.7, 0, 1.6)} rotationY={0} animation="talk" face="smile" />
          <Dad position={at(PLACE.room, -1.2, 0, 2.6)} rotationY={0} animation="idle" face="sleepy" />
        </>
      ),
    },
    {
      cue: "5.tired",
      ...cam.push({ on: at(PLACE.room, -1.2, 1.5, 2.6), dist: 1.8, to: 1.55, yaw: -8, pitch: 5, fov: 36 }),
      zone: "room",
      look: "ward-night",
      note: "Tomorrow. He says tomorrow, and he means it, and he is so tired he can barely stand up. The boy is out of frame, which is the point: this is a shot about a man who cannot give what is being asked.",
      stage: () => (
        <>
          <Dad position={at(PLACE.room, -1.2, 0, 2.6)} rotationY={0} animation="ache" face="sleepy" />
        </>
      ),
    },
    {
      cue: "5.now",
      ...cam.push({ on: [SHAFT_BOTTOM[0], 1.2, SHAFT_BOTTOM[2]], dist: 2.6, to: 3.4, yaw: 6, pitch: 2, fov: 44 }),
      zone: "shaft",
      look: "overworld-night",
      note: "Now it is him looking up the shaft at a light nobody is coming to switch on. Same man, other end of the wall.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Dad position={SHAFT_BOTTOM} rotationY={0} animation="lookAround" face="uneasy" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 6. low
    {
      cue: "5.now",
      cut: 1.3,
      ...cam.push({ on: [SHAFT_BOTTOM[0], 1.25, SHAFT_BOTTOM[2]], dist: 1.8, to: 1.55, yaw: 20, pitch: 2, fov: 34 }),
      zone: "shaft",
      look: "overworld-night",
      note: "Lit from below by his own torch: the same face that said 'tomorrow', four hundred blocks down, wide awake at five in the morning.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Dad position={SHAFT_BOTTOM} rotationY={0} animation="lookAround" face="uneasy" />
          <Torch position={at(PLACE.shaft, -0.6, -5.0, -0.5)} light={7} seed={3} />
          <Glow position={at(PLACE.shaft, 0, -5.2, -0.2)} size={1.6} color="#ffb060" opacity={0.24} />
        </>
      ),
    },
    {
      cue: "6.lava",
      ...cam.push({ on: [SHAFT_BOTTOM[0], SHAFT_BOTTOM[1] + 1.15, SHAFT_BOTTOM[2]], dist: 1.8, to: 1.55, yaw: 20, pitch: 2, fov: 38 }),
      zone: "shaft",
      look: "lava-shore",
      note: "Four in the morning, and the torch finds lava: the shaft turns orange in one frame, and his face turns with it. He does not move, because there is nowhere to go. The lava is behind him, not in front of him — the shot is his face, not the light.",
      stage: (t) => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Dad position={SHAFT_BOTTOM} rotationY={0} animation="panic" face="surprised" />
          <Block position={at(PLACE.shaft, 0, -5.0, -1.15)} size={[1.5, 0.7, 0.06]} color="#ff7a14" emissive="#ff5a00" emissiveIntensity={1.0} castShadow={false} />
          <Glow position={at(PLACE.shaft, 0, -5.1, -0.9)} size={1.9 + Math.sin(t * 6) * 0.12} color="#ff8a2a" opacity={0.3} />
          <LightPool position={at(PLACE.shaft, 0, -5.97, 0)} width={2.2} depth={2.2} color="#ff8a2a" opacity={0.2} />
        </>
      ),
    },
    {
      cue: "6.orange",
      ...cam.top({ on: at(PLACE.shaft, 0, -6.0, 0), height: 4.4, to: 6.2, fov: 50 }),
      zone: "shaft",
      look: "lava-shore",
      note: "The shaft he has just lost: straight up and away, the four hundred blocks of it getting smaller, and an orange pool at the bottom where the lava is. No music from here to the rescue — the film goes quiet so the defeat lands.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <Block position={at(PLACE.shaft, 0, -5.2, -1.15)} size={[1.4, 0.5, 0.06]} color="#ff7a14" emissive="#ff5a00" emissiveIntensity={0.7} castShadow={false} />
          <Glow position={at(PLACE.shaft, 0, -5.5, -1.1)} size={1.2} color="#ff8a2a" opacity={0.16} />
          <LightPool position={at(PLACE.shaft, 0, -5.97, 0)} width={2.0} depth={2.0} color="#ff8a2a" opacity={0.16} />
        </>
      ),
    },
    {
      cue: "6.quiet",
      ...cam.push({ on: [DAD_AT[0], 1.35, DAD_AT[2]], dist: 1.8, to: 1.55, yaw: 4, pitch: 22, fov: 36 }),
      zone: "room",
      look: "ward-night",
      note: "Back at the desk, head down, the monitor still going. The screen light is the only thing in the room and it is on a man who has stopped.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="collapse" face="sad" />
        </>
      ),
    },
    {
      cue: "6.quiet",
      cut: 1.7,
      ...cam.push({ on: at(PLACE.room, -0.1, 0.86, 1.5), dist: 1.8, to: 1.55, yaw: -18, pitch: 34, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "His hands on the keyboard, not typing. The screen is still going, the game is still running, and the man has stopped. Six hours of digging, and then nothing at all.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="collapse" face="sad" />
          <Block position={at(PLACE.room, -0.1, 0.84, 1.45)} size={[0.5, 0.05, 0.2]} color="#2b2f36" />
        </>
      ),
    },
    {
      cue: "6.sign",
      ...cam.push({ on: at(PLACE.shaft, 0.2, 1.28, 0.6), dist: 1.8, to: 1.55, yaw: 12, pitch: 2, fov: 34 }),
      zone: "shaft",
      look: "overworld-night",
      note: "The sign at the top of the hole, in the grey light before sunrise. Six words, and the film's whole middle is in them.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <SorrySign position={at(PLACE.shaft, 0.2, 0, 0.6)} rotationY={0.2} />
          <Glow position={at(PLACE.shaft, 0.2, 1.3, 0.9)} size={1.2} color="#cfe0ff" opacity={0.12} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 7. rescue
    {
      cue: "7.read",
      ...cam.push({ on: at(PLACE.shaft, 0.2, 1.4, 1.6), dist: 2.6, to: 2.1, yaw: -4, pitch: 4, fov: 40 }),
      zone: "shaft",
      look: "overworld-sunset",
      note: "Morning: the boy at the top of the hole, reading the sign, and understanding what four hundred blocks means. The sky behind him is the first blue of the film.",
      stage: () => (
        <>
          <Shaft position={PLACE.shaft} depth={6} />
          <SorrySign position={at(PLACE.shaft, 0.2, 0, 0.6)} rotationY={0.2} />
          <Boy position={at(PLACE.shaft, 0.2, 0, 1.6)} rotationY={0} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "7.read",
      cut: 1.8,
      ...cam.push({ on: at(PLACE.shaft, 0.2, 1.15, 1.6), dist: 1.8, to: 1.55, yaw: -2, pitch: 2, fov: 30 }),
      zone: "shaft",
      look: "overworld-sunset",
      note: "His face on 'sorry'. He does not laugh. Nothing about this shot is funny, which is what turns the film.",
      stage: () => (
        <>
          <Boy position={at(PLACE.shaft, 0.2, 0, 1.6)} rotationY={0} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "7.said",
      ...cam.push({ on: [DAD_AT[0], 1.3, DAD_AT[2]], dist: 1.8, to: 1.55, yaw: 14, pitch: 12, fov: 38 }),
      zone: "room",
      look: "ward-night",
      note: "The boy's hand on his father's shoulder, and the shoulder is the whole shot: the dad has fallen asleep at the keyboard with the game still running.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="sleep" face="sleepy" />
          <Boy position={at(PLACE.room, 0.65, 0, 0.5)} rotationY={0} animation="leanOver" face="sad" />
        </>
      ),
    },
    {
      cue: "7.said",
      cut: 1.6,
      ...cam.push({ on: [DAD_AT[0], 1.45, DAD_AT[2]], dist: 1.8, to: 1.55, yaw: 8, pitch: 2, fov: 32 }),
      zone: "room",
      look: "ward-night",
      note: "His eyes open on 'Dad'. He has been asleep for eleven minutes.",
      stage: () => (
        <>
          <Desk position={DESK_AT} />
          <Dad position={DAD_AT} rotationY={0} animation="standUp" face="surprised" />
        </>
      ),
    },
    {
      cue: "7.look",
      ...cam.push({ on: [ENDERMAN_AT[0], 2.3, ENDERMAN_AT[2]], dist: 3.4, to: 2.6, yaw: 6, pitch: 2, fov: 36 }),
      zone: "field",
      look: "overworld-night",
      note: "The enderman, closer than it has ever been, and the boy telling him the one thing he has to do: look at it. The two violet eyes fill more of the frame than they have all film.",
      stage: () => (
        <>
          <Enderman position={ENDERMAN_AT} rotationY={0} />
          <Dad position={DAD_FIELD} rotationY={0} animation="cower" face="scared" />
          <Boy position={at(PLACE.field, 1.1, 0, 0.4)} rotationY={0} animation="point" face="brave" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 8. payoff
    {
      cue: "8.turned",
      ...cam.push({ on: [DAD_FIELD[0], 1.55, DAD_FIELD[2]], dist: 1.8, to: 1.55, yaw: -8, pitch: 6, fov: 34 }),
      zone: "field",
      look: "overworld-night",
      note: "He turns. This is the shot the whole film is for: a man in his forties, in armour on backwards, screwing up the courage to look at a cartoon monster because his son asked him to.",
      stage: () => (
        <>
          <Dad position={DAD_FIELD} rotationY={0} animation="lookAround" face="surprised" />
          <Enderman position={ENDERMAN_AT} rotationY={0} />
        </>
      ),
    },
    {
      cue: "8.turned",
      cut: 1.4,
      ...cam.push({ on: [ENDERMAN_AT[0], 2.3, ENDERMAN_AT[2] + 0.9], dist: 1.8, to: 1.55, yaw: 4, pitch: 2, fov: 34 }),
      zone: "field",
      look: "overworld-night",
      note: "What he sees when he turns: the enderman, at his height, eyes level with his. Held for a beat and a half — the bravest half second in the film.",
      stage: (t) => (
        <>
          <Enderman position={ENDERMAN_AT} rotationY={0} awake={ramp(t, 0.1, 0.5)} />
          <Glow position={[ENDERMAN_AT[0], 2.4, ENDERMAN_AT[2] + 0.6]} size={1.8} color="#c86bff" opacity={0.22} />
        </>
      ),
    },
    {
      cue: "8.pearl",
      ...cam.push({ on: at(PLACE.field, 0, 0.2, -1.6), dist: 1.8, to: 1.55, yaw: 14, pitch: 26, fov: 34 }),
      zone: "field",
      look: "overworld-night",
      note: "The pearl, on the ground where the enderman was: the reward was always for looking. It lands in the first second of the line, so the rest of the shot is the two of them realising it worked.",
      stage: (t) => (
        <>
          <Pearl position={at(PLACE.field, 0, 0.02, -1.6)} t={t} />
          <Dad position={DAD_FIELD} rotationY={0} animation="reach" face="wow" />
          <Glow position={at(PLACE.field, 0, 0.3, -1.4)} size={1.3} color="#3fd6c0" opacity={0.3} />
        </>
      ),
    },
    {
      cue: "8.portal",
      ...cam.push({ on: at(PLACE.stronghold, 0, 0.6, 0), dist: 4.4, to: 3.6, yaw: 0, pitch: 12, fov: 46 }),
      zone: "stronghold",
      look: "overworld-sunset",
      note: "The portal room, and twelve eyes going into twelve slots: the grid from the second beat, full at last. Breakfast light comes in from somewhere off frame — it is morning and they have been up all night.",
      stage: (t) => (
        <>
          <Portal position={PLACE.stronghold} open={ramp(t, 0.4, 1.6)} />
          <EyeGrid position={at(PLACE.stronghold, 0, 0.4, 0)} filled={Math.min(12, Math.floor(ramp(t, 0.2, 2.2) * 12))} />
        </>
      ),
    },
    {
      cue: "8.portal",
      cut: 1.35,
      ...cam.push({ on: at(PLACE.stronghold, 0, 1.3, 1.4), dist: 4.4, to: 3.4, yaw: 2, pitch: 8, fov: 44 }),
      zone: "stronghold",
      look: "overworld-sunset",
      note: "The two of them in front of it, side by side, the way the film opens with one of them alone. Same framing, twice the people.",
      stage: (t) => (
        <>
          <Portal position={PLACE.stronghold} open={1} />
          <Dad position={at(PLACE.stronghold, -0.7, 0, 1.6)} rotationY={0} animation="idle" face="grin" />
          <Boy position={at(PLACE.stronghold, 0.75, 0, 1.5)} rotationY={0} animation="cheer" face="happy" />
          <Glow position={at(PLACE.stronghold, 0, 1.4, 1.0)} size={2.4} color="#ffd08a" opacity={0.16 * ramp(t, 0, 0.6)} />
        </>
      ),
    },
    {
      cue: "8.sword",
      ...cam.push({ on: [DRAGON_AT[0], 6.6, DRAGON_AT[2] + 1.2], dist: 11.0, to: 8.2, yaw: 8, pitch: 6, fov: 52 }),
      zone: "end",
      look: "overworld-sunset",
      note: "The End: the dragon, and one man in mismatched armour running at it with the wooden sword he made at midnight. He is not the best person for this job. He is the only one who wanted it.",
      stage: (t) => (
        <>
          <Dragon position={DRAGON_AT} rotationY={0} beat={t} />
          <Dad position={at(PLACE.end, 0, 0, 21.5)} rotationY={0} animation="run" arms="lift" face="brave" />
          <Sword position={at(PLACE.end, 0.35, 1.5, 21.6)} rotationY={0.3} rotationZ={-0.5} scale={1.3} />
          <Glow position={at(PLACE.end, 0, 3, 24)} size={7} color="#8a4fe0" opacity={0.16} />
        </>
      ),
    },
    {
      cue: "8.sword",
      cut: 1.5,
      ...cam.push({ on: [DRAGON_AT[0], 6.2, DRAGON_AT[2] - 0.6], dist: 1.8, to: 1.55, yaw: 10, pitch: 4, fov: 34 }),
      zone: "end",
      look: "overworld-sunset",
      note: "The last hit, in close: a wooden sword, and the dragon breaking into light. The boy is watching from the edge of frame, which is the only review he wanted.",
      stage: (t) => (
        <>
          <Dragon position={DRAGON_AT} rotationY={0} beat={t} />
          <Sword position={at(PLACE.end, 0.2, 6.4, 25.4)} rotationY={0.2} rotationZ={-0.9} scale={1.6} />
          <Glow position={at(PLACE.end, 0, 6.8, 25.2)} size={4 + ramp(t, 0.2, 1.0) * 5} color="#ffd7a0" opacity={0.5} />
          <Boy position={at(PLACE.end, 2.6, 0, 20.5)} rotationY={0} animation="cheer" face="wow" />
        </>
      ),
    },
    {
      cue: "8.dig",
      ...cam.push({ on: [SUB_AT[0], 1.5, SUB_AT[2]], dist: 4.6, to: 3.6, yaw: -4, pitch: 4, fov: 44 }),
      zone: "field",
      look: "overworld-sunset",
      note: "The payoff held for one beat before the ask: the two of them side by side in the first gold of morning, the hole he dug behind them, and his armour still on backwards. The film opened with one of them alone at a desk; it ends with both of them standing up.",
      stage: (t) => (
        <>
          <Dad position={at(PLACE.field, -0.5, 0, 1.2)} rotationY={0} animation="idle" face="grin" />
          <Boy position={at(PLACE.field, 0.9, 0, 1.3)} rotationY={0} animation="idle" face="happy" />
          <Glow position={at(PLACE.field, 0, 1.6, 2.0)} size={3} color="#ffd08a" opacity={0.14} />
        </>
      ),
    },
    {
      cue: "9.sub",
      ...cam.push({ on: [SUB_AT[0], 1.6, SUB_AT[2]], dist: 2.6, to: 2.2, yaw: -8, pitch: 2, fov: 38 }),
      zone: "field",
      look: "overworld-sunset",
      note: "The sign, on the last word, in the same shot as the two of them: it goes up after the story is finished, never during it.",
      stage: (t) => (
        <>
          <Dad position={at(PLACE.field, -0.5, 0, 1.2)} rotationY={0} animation="idle" face="grin" />
          <Boy position={at(PLACE.field, 0.9, 0, 1.3)} rotationY={0} animation="wave" face="happy" />
          <SubscribeSign position={SUB_AT} rotationY={0.1} scale={pop(t - 0.1, 0, 0.3) * 1.15} />
          <Glow position={at(PLACE.field, 0, 1.6, 2.0)} size={3} color="#ffd08a" opacity={0.14} />
        </>
      ),
    },
  ],
});
