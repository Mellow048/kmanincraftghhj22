import { cam, storyScene } from "../../engine";
import type React from "react";
import { Bubble, CHILD, Hero, Player, ROBE, Villager, Vox, chestOf, faceOf, pop, timing, wordAt } from "./kit";

/**
 * BEAT 2 — THE JOKES (0:11–0:34) and BEAT 3 — THE QUESTION (0:34–0:52).
 *
 * Five impossible facts played as ordinary, then the question the whole film hangs on: why does nobody in
 * this town cook? Every joke here is a CLUE to the answer, which is what RETENTION.md asks for: a clue that
 * is not funny is an explanation, and explanations are where people leave.
 */

const ME = [-2.2, 0, 1.0] as [number, number, number];
const ONION = wordAt("2.onion", "onion");
const VEND = wordAt("2.vending", "vending");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The jokes, and the question",
  shots: [
    {
      cue: "2.bro",
      // The friends, stacked in depth at the teller's gate, leaning in. Every one of them is mid-shout.
      ...cam.push({ on: [0.2, 1.5, -1.0], dist: 4.4, to: 3.7, yaw: -14, pitch: 4, fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Three friends stacked up the frame at the gate, all talking at once. The invitation is a wall of faces, and the teller is not in it yet.",
      stage: (t) => (
        <>
          <Player who={0} position={[-0.1, 0, 0.2]} rotationY={Math.PI} animation="idle" face="grin" />
          <Player who={4} position={[0.7, 0, -1.1]} rotationY={Math.PI - 0.3} animation="idle" face="laugh" />
          <Player who={8} position={[-0.9, 0, -2.0]} rotationY={Math.PI + 0.4} animation="idle" face="smile" />
          <Bubble text="BRO!" position={[-0.1, 2.15, 0.1]} scale={pop(t, 0.05) * 0.9} rotationY={0} dark />
        </>
      ),
    },
    {
      cue: "2.yolo",
      // One line, delivered as gospel, with a beat of air. The empty street behind it says nobody is coming.
      ...cam.push({ on: faceOf([0.6, 0, -0.9], 0.8), dist: 3.2, to: 2.7, yaw: 10, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Right into the loudest friend's face as he says the line. The joke is that he is completely serious about it.",
      stage: () => (
        <>
          <Player who={4} position={[0.6, 0, -0.9]} rotationY={Math.PI} animation="idle" face="wow" />
          <Bubble text="YOLO" position={[0.6, 2.05, -0.75]} scale={0.8} rotationY={0} dark tail={1} />
        </>
      ),
    },
    {
      cue: "2.said",
      // The teller's answer, and the first real joke of the film: he agrees, which is why he is staying in.
      ...cam.push({ on: faceOf(ME, 0.8), dist: 3.0, to: 2.5, yaw: -10, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The teller agreeing with them, sincerely, holding the bag of vegetables. He is not being difficult. He has a plan.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={0.2} animation="idle" face="smile" gaze={0} />
          <Vox kind="wool" tint="#b89a6a" position={[-2.6, 0.55, 1.25]} size={[0.34, 0.4, 0.24]} />
          <Vox kind="wool" tint="#5f9a3c" position={[-2.6, 0.78 + pop(t, 0.3) * 0.06, 1.25]} size={[0.3, 0.1, 0.2]} />
        </>
      ),
    },
    {
      cue: "2.mum",
      // Cereal at eleven at night, called dinner. Straight down on the bowl so the joke is the SOUND of it.
      ...cam.push({ on: [-0.2, 1.05, 400.5], dist: 3.5, to: 3.0, yaw: 22, pitch: 16, fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "Looking down at a bowl of dry cereal on the kitchen table at night, with a fork beside it because nobody in this house knows what to do with it either.",
      stage: () => (
        <>
          <Bowl position={[-0.2, 0.9, 400.5]} />
          <Vox kind="wool" tint="#c8ced4" position={[0.35, 0.9, 400.55]} size={[0.2, 0.02, 0.06]} />
        </>
      ),
    },
    {
      cue: "2.fridge",
      // THE BEST JOKE IN THE FILM, and it needs to be a WIDE: the fridge open, and nothing in it.
      ...cam.push({ on: [2.75, 1.25, 397.9], dist: 3.4, to: 2.9, yaw: 8, pitch: -4, fov: 40 }),
      zone: "home",
      look: "kitchen-day",
      note: "The fridge standing open with exactly one shelf and nothing on it. The line says the fridge contains a fridge; the picture has to be at least as empty as that.",
      // The fridge itself is the world's prop in its `empty` state, with the little fridge inside it.
      // Nothing is drawn over it here. The camera does the movement.
      stage: () => <></>,
    },
    {
      cue: "2.onion",
      // THE CLUE THAT IS ALSO THE FUNNIEST SHOT: a kid at a party eating a raw onion like an apple.
      ...cam.push({ on: chestOf([0.4, 0, -0.6], 0.8), dist: 3.4, to: 2.9, yaw: -20, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-sunset",
      note: "A kid at a party with a whole raw onion in both hands, mid-bite, entirely happy. Played straight: nobody in the frame thinks this is strange.",
      stage: (t) => (
        <>
          <Player who={6} position={[0.4, 0, -0.6]} rotationY={Math.PI + 0.15} animation="idle" face="laugh" />
          <Vox kind="wool" tint="#e8d8c0" position={[0.4, 1.02, 0.06]} size={[0.17, 0.17, 0.17]} />
          <Vox kind="wool" tint="#7ac04f" position={[0.4, 1.14, 0.06]} size={[0.05, 0.06, 0.05]} />
          <Vox kind="wool" tint="#5f9a3c" position={[0.62, 1.0, -0.3]} size={[0.28, 0.2, 0.16]} />
          <Bubble text="MMM" position={[0.4, 2.0, -0.5]} scale={pop(t, ONION + 0.2) * 0.7} rotationY={0} dark />
        </>
      ),
    },
    {
      cue: "2.dog",
      // The dog eats better than the children, and the dog eats grass. Low angle so the dog is a giant.
      ...cam.push({ on: [-0.4, 0.45, 0.4], dist: 3.0, to: 2.5, yaw: 16, pitch: -10, fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Low angle on the dog, nose down in the grass, with a plate beside it that has been licked clean. The dog is eating better than anybody.",
      stage: () => (
        <>
          <Vox kind="wool" tint="#c8b08a" position={[-0.4, 0.34, 0.4]} size={[0.6, 0.36, 0.9]} />
          <Vox kind="wool" tint="#c8b08a" position={[-0.4, 0.52, -0.06]} size={[0.36, 0.32, 0.36]} />
          <Vox kind="wool" tint="#3a2f28" position={[-0.4, 0.74, -0.16]} size={[0.14, 0.12, 0.1]} />
          <Vox kind="wool" tint="#e8e2d0" position={[0.5, 0.03, 0.5]} size={[0.5, 0.04, 0.5]} />
        </>
      ),
    },
    {
      cue: "2.vending",
      // THE VENDING MACHINE, lit blue in the middle of a warm street. The town's only restaurant.
      ...cam.push({ on: [8.0, 1.4, 5.0], dist: 4.4, to: 3.7, yaw: -12, pitch: 4, fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The vending machine standing on the pavement in blue light, the only cold light in the film so far, and the only place in this town you can get food.",
      stage: (t) => (
        <>
          <Villager position={[7.1, 0, 5.7]} robe={ROBE.blue} phase={1.2} walk={palp(t)} />
          <Villager position={[8.9, 0, 6.4]} robe={ROBE.white} phase={2.1} walk={palp(t + 0.4)} />
        </>
      ),
    },
    {
      cue: "2.queue",
      // A QUEUE for it. Six of them, standing in a line up the street, all facing one blue box.
      ...cam.truck({ on: [8.0, 1.4, 6.6], dist: 5.0, yaw: 14, pitch: 5, fov: 44, by: [-3.0, 0, 0] }),
      zone: "village",
      look: "overworld-sunset",
      note: "The queue that does not move: six people in a line up the street, all facing the machine. The camera trucks along them so the length of the line is the punchline.",
      stage: () => (
        <>
          <Villager position={[7.6, 0, 6.1]} robe={ROBE.brown} phase={0.3} />
          <Villager position={[6.4, 0, 6.6]} robe={ROBE.red} phase={0.9} />
          <Villager position={[5.2, 0, 6.9]} robe={ROBE.farmer} phase={1.5} />
          <Villager position={[4.0, 0, 7.1]} robe={ROBE.white} phase={2.2} />
          <Player who={3} position={[2.8, 0, 7.2]} rotationY={Math.PI} animation="idle" face="calm" />
          <Player who={10} position={[1.6, 0, 7.2]} rotationY={Math.PI} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "3.ask",
      // The question, asked to camera. The teller in the middle of the street, hands out, nobody answering.
      ...cam.push({ on: faceOf(ME, 0.8), dist: 3.2, to: 2.7, yaw: 4, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The teller asking the question straight down the lens. This is the line the film is built on, so the face has to be the only thing in the frame.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={0} animation="idle" face="uneasy" gaze={0} />
          <Bubble text="WHY?" position={[-2.2, 2.15, 1.3]} scale={pop(t, 0.4) * 0.85} rotationY={0} dark />
        </>
      ),
    },
    {
      cue: "3.same",
      // Everybody gives the same answer, so: the same shrug, three times, in three depths.
      ...cam.push({ on: [0.4, 1.5, -1.6], dist: 5.2, to: 4.4, yaw: 12, pitch: 7, fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Three villagers in a row up the street, all doing the identical shrug at the same moment. The sameness is the clue.",
      stage: (t) => (
        <>
          <Villager position={[-0.2, 0, -0.4]} robe={ROBE.white} phase={0.4} hmm={shrug(t)} />
          <Villager position={[0.3, 0, -2.0]} robe={ROBE.red} phase={0.4} hmm={shrug(t)} />
          <Villager position={[0.5, 0, -3.5]} robe={ROBE.blue} phase={0.4} hmm={shrug(t)} />
        </>
      ),
    },
    {
      cue: "3.time",
      // The teller's theory, and it is wrong. He says it in the kitchen, knife in hand, mid-work.
      ...cam.push({ on: chestOf([0, 0, 400.2], 0.8), dist: 3.5, to: 3.0, yaw: -32, pitch: 6, fov: 40 }),
      zone: "home",
      look: "kitchen-day",
      note: "The teller at his board, knife up, saying what he thinks of them. He is going to be wrong, and the frame should make him look confident.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 400.2]} rotationY={-0.3} animation="idle" face="smug" gaze={0} />
          <Vox kind="wool" tint="#c8ced4" position={[0.3, 1.06 + Math.abs(Math.sin(t * 7)) * 0.1, 400]} size={[0.05, 0.3, 0.12]} />
        </>
      ),
    },
    {
      cue: "3.showed",
      // The friend's kitchen. The lens goes in through the doorway and the room is a museum.
      ...cam.push({ on: [0, 1.4, 399.2], dist: 5.8, to: 4.9, yaw: 8, pitch: 12, fov: 46 }),
      zone: "home",
      look: "kitchen-day",
      note: "The friend walking into his own kitchen and waving at it like a showroom. Nothing in this room has ever been used.",
      stage: () => (
        <>
          <Player who={0} position={[-0.5, 0, 398.6]} rotationY={0.4} animation="idle" face="grin" />
        </>
      ),
    },
    {
      cue: "3.brand",
      // Everything still wrapped. Close on the counter with the plastic still on it.
      ...cam.top({ on: [-1.4, 0.98, 397.6], height: 3.2, to: 2.7, spin: [-8, 8], fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "Close on a brand new counter with the protective film still on it, still creased in the corners. Not used once.",
      stage: () => (
        <>
          <Vox kind="wool" tint="#dfe8ee" position={[-1.4, 1, 397.55]} size={[1.3, 0.06, 0.7]} />
          <Vox kind="wool" tint="#c8d4dc" position={[-1.95, 1, 397.55]} size={[0.06, 0.07, 0.7]} />
        </>
      ),
    },
    {
      cue: "3.never",
      // A brand-new, never-used pan, still in its box, hanging on a wall. The hinge of the whole film.
      ...cam.truck({ on: [-1, 1.4, 397.4], dist: 3.6, yaw: -34, pitch: 8, fov: 42, by: [2.6, 0, 0] }),
      zone: "home",
      look: "kitchen-day",
      note: "A pan still in its cardboard, hung on a nail at eye level, because that is where you put a thing you own and do not use. The single most important object in the film after the knife.",
      stage: () => (
        <>
          <Vox kind="wool" tint="#c9a06a" position={[-1, 1.55, 397.1]} size={[0.6, 0.7, 0.04]} />
          <Vox kind="wool" tint="#3a3a42" position={[-1, 1.55, 397.16]} size={[0.4, 0.06, 0.4]} />
          <Vox kind="wool" tint="#3a3a42" position={[-1, 1.62, 397.02]} size={[0.06, 0.3, 0.05]} />
        </>
      ),
    },
    {
      cue: "3.every",
      // Every house on the street, and every one is the same. The camera walks the fronts.
      ...cam.truck({ on: [-2.0, 1.8, -3.2], dist: 11.0, yaw: 12, pitch: 16, fov: 50, by: [6.0, 0, 1.0] }),
      zone: "village",
      look: "overworld-sunset",
      note: "The camera trucks along the fronts of five houses and every single kitchen window shows the same unused counter. Saying it once with a picture instead of five times with words.",
      stage: () => (
        <>
          <Villager position={[1.0, 0, -3.6]} robe={ROBE.friend} phase={0.5} walk={0.2} />
          <Player who={11} position={[3.6, 0, -3.7]} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "3.school",
      // Four party classes and no cooking class. The school board, in one picture.
      ...cam.push({ on: [0, 1.7, -0.4], dist: 6.2, to: 5.3, yaw: -10, pitch: -4, fov: 46 }),
      zone: "village",
      look: "overworld-sunset",
      note: "A school noticeboard with four class names on it and not one of them is cooking. Read as a joke, not as information.",
      stage: (t) => (
        <>
          <Vox kind="planks" tint="#6a5a44" position={[0, 1.7, -0.4]} size={[3.2, 1.9, 0.12]} />
          {["PARTY 1", "PARTY 2", "PARTY 3", "PARTY 4"].map((text, i) => (
            <Paper key={text} text={text} position={[-1.1 + (i % 2) * 1.3, 2.1 - Math.floor(i / 2) * 0.8, -0.31]} t={t} i={i} />
          ))}
        </>
      ),
    },
    {
      cue: "3.name",
      // THE QUESTION, NAMED. He is alone in the street in the rain, and the frame is just him and the empty town.
      ...cam.push({ on: faceOf(ME, 0.8), dist: 3.0, to: 2.5, yaw: 6, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The question said out loud, to nobody, in the middle of an empty street. This line costs the viewer the most to leave after, so nothing else is in frame.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={0.1} animation="idle" face="uneasy" gaze={0} />
        </>
      ),
    },
  ],
});

/** A slow pulse, the way a queue shuffles forward and then does not. */
function palp(t: number): number {
  return Math.max(0, Math.sin(t * 2.4)) * 0.18;
}
/** One shrug, held. */
function shrug(t: number): number {
  return Math.min(1, Math.max(0, (t - 0.2) / 0.5));
}

const Bowl: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <>
    <Vox kind="wool" tint="#f2f0e8" position={position} size={[0.3, 0.16, 0.3]} />
    <Vox kind="wool" tint="#c9a06a" position={[position[0], position[1] + 0.08, position[2]]} size={[0.24, 0.06, 0.24]} />
  </>
);

const Paper: React.FC<{ text: string; position: [number, number, number]; t: number; i: number }> = ({ text, position, t, i }) => (
  <>
    <Vox kind="wool" tint="#f2ecd8" position={position} size={[1.1, 0.66, 0.03]} />
    <Vox kind="wool" tint="#3a3344" position={[position[0], position[1] + 0.18, position[2] + 0.02]} size={[0.8, 0.06, 0.01]} />
    <Vox kind="wool" tint="#3a3344" position={[position[0], position[1] - 0.02, position[2] + 0.02]} size={[0.6, 0.05, 0.01]} />
    <Vox kind="wool" tint={["#c8402f", "#e8a21c", "#3f8a4f", "#8a4ab0"][i]} position={[position[0], position[1] + 0.3, position[2] + 0.02]} size={[0.14, 0.03, 0.01]} />
    {void text}
  </>
);

void CHILD;
void VEND;
