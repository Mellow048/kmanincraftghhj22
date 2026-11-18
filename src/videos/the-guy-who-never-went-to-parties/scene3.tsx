import { cam, storyScene } from "../../engine";
import type React from "react";
import { Bubble, Hero, Player, ROBE, Villager, Vox, chestOf, faceOf, pop, ramp, timing, wordAt } from "./kit";

/**
 * BEAT 4 — THE ANSWER (0:52–1:07), BEAT 5 — THE FAIL (1:07–1:19), BEAT 6 — THE TRAINING (1:19–1:47).
 *
 * The reversal lands early, at 0:57, which is the RETENTION.md rule: the first payoff is at 36% of the film,
 * not at 90%. A viewer who gets an answer a third of the way in trusts the film with the rest.
 *
 * The training arc is the meme. "HUS HUS HUS" is not a chopping sound: it is the running chant from the
 * Daniel LaBelle and Spider-Man run edits, rhythmic breathing at speed. So he trains like an athlete, and the
 * chant is what he breathes. That is why it is funny twice.
 */

const ONION = wordAt("4.plate", "plate");
const CHANT = wordAt("6.chant", "huh");
const ALMOST = wordAt("5.almost", "almost");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The answer, the egg, and the training",
  shots: [
    {
      cue: "4.lazy",
      // Correcting himself. The camera has to be on HIM, admitting it, not on the town.
      ...cam.push({ on: faceOf([-2.2, 0, 1.0], 0.8), dist: 3.1, to: 2.6, yaw: -8, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The teller at his gate, working it out, and the light on him alone. He is admitting he had the town wrong.",
      stage: () => <Hero position={[-2.2, 0, 1.0]} rotationY={0.15} animation="idle" face="uneasy" gaze={0} />,
    },
    {
      cue: "4.truth",
      // THE REVERSAL. One villager, close, and behind him the whole street eating raw vegetables.
      ...cam.orbit({ on: chestOf([0.2, 0, -0.8], 0.94), dist: 4.2, distTo: 3.5, yaw: -14, yawTo: 14, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "A villager mid-bite of a plain raw carrot, and behind him the whole street doing the same. The answer to the question, as a picture, at 0:57 of the film, and the one frame in the film that has to be unmissable.",
      stage: () => (
        <>
          <Villager position={[0.2, 0, -0.8]} robe={ROBE.brown} phase={0.7} />
          <Vox kind="wool" tint="#e8853c" position={[0.2, 1.28, -0.5]} size={[0.09, 0.3, 0.09]} />
          <Villager position={[-1.0, 0, -2.2]} robe={ROBE.white} phase={1.6} />
          <Villager position={[1.1, 0, -2.6]} robe={ROBE.red} phase={2.3} />
          <Vox kind="wool" tint="#e8853c" position={[1.1, 1.28, -2.3]} size={[0.09, 0.3, 0.09]} />
          <Villager position={[0.1, 0, -3.6]} robe={ROBE.farmer} phase={0.4} />
          {/* The street is dark in every other night shot. This one is the reveal, so it is lit like one. */}
          <pointLight position={[1.6, 2.4, 1.2]} color="#fff0d8" intensity={34} distance={9} decay={1.8} />
          <pointLight position={[-1.8, 1.8, -2.4]} color="#cfe0ff" intensity={18} distance={7} decay={2} />
        </>
      ),
    },
    {
      cue: "4.cannot",
      // The thesis, in one picture: a thing you cannot want if you have never had it. A plate, untouched.
      ...cam.top({ on: [0, 0.9, 400.5], height: 4.4, to: 3.7, spin: [8, -8], fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "Straight down on a hot plate of food on the kitchen table, steaming, with nobody at the table. The one thing in town nobody has ever wanted.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#f7f4ea" position={[0, 0.9, 400.5]} size={[0.52, 0.05, 0.52]} />
          <Vox kind="wool" tint="#c9783c" position={[0, 0.95, 400.5]} size={[0.38, 0.09, 0.38]} />
          <Vox kind="wool" tint="#5f9a3c" position={[0.1, 0.99, 400.46]} size={[0.1, 0.03, 0.1]} />
          <Vox kind="wool" tint="#e8e2d0" position={[0, 1.05 + ramp(t, 0.2, 1.4) * 0.3, 0.5]} size={[0.16, 0.05, 0.16]} opacity={1 - ramp(t, 0.2, 1.4)} />
        </>
      ),
    },
    {
      cue: "4.plate",
      // THE JOKE: he takes a plate to a party and somebody throws it like a frisbee.
      ...cam.truck({ on: [0.0, 1.3, -0.8], dist: 4.6, yaw: 20, pitch: 5, fov: 44, by: [-3.4, 0, 0.6] }),
      zone: "village",
      look: "overworld-sunset",
      note: "The plate flying away across the street like a frisbee, mid-air, with the teller's hands still out where it left them. The camera pans with it.",
      stage: (t) => (
        <>
          <Hero position={[-2.2, 0, 1.0]} rotationY={0.5} animation="idle" face="wow" gaze={0} />
          <Vox kind="wool" tint="#f7f4ea" position={[0.4 + ramp(t, 0.1, 1.2) * 2.6, 1.2 + Math.sin(t * 3) * 0.2, -1.0]} size={[0.4, 0.04, 0.4]} />
          <Player who={5} position={[1.4, 0, -2.2]} rotationY={Math.PI - 0.4} animation="idle" face="laugh" />
        </>
      ),
    },
    {
      cue: "4.cried",
      // The payoff of the whole first act: a grown man eats soup and cries. Close, and let him.
      ...cam.push({ on: faceOf([0.3, 0, -1.0], 0.94), dist: 3.2, to: 2.7, yaw: 6, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-sunset",
      note: "A grown villager with a spoon and a bowl, absolutely weeping. Played completely straight, which is why it is funny and also why it lands.",
      stage: (t) => (
        <>
          <Villager position={[0.3, 0, -1.0]} robe={ROBE.elder} phase={0.5} strain={0.2} lean={Math.sin(t * 2) * 0.04} />
          <Vox kind="wool" tint="#e8e2d0" position={[0.3, 1.12, -0.55]} size={[0.26, 0.1, 0.26]} />
          <Vox kind="wool" tint="#8fd0ff" position={[0.18, 1.34, -0.92]} size={[0.05, 0.16, 0.02]} opacity={ramp(t, 0.3, 0.9)} />
          <Vox kind="wool" tint="#8fd0ff" position={[0.44, 1.32, -0.92]} size={[0.05, 0.14, 0.02]} opacity={ramp(t, 0.5, 1.1)} />
        </>
      ),
    },
    {
      cue: "4.told",
      // He asks what it is. The teller says soup. Two-shot, the teller lit, the villager in pieces.
      ...cam.push({ on: [0.0, 1.35, -0.8], dist: 4.0, to: 3.4, yaw: -16, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The teller and the crying villager stacked in one frame, the bowl held between them like an offering. This is the closest the town comes to understanding.",
      stage: () => (
        <>
          <Hero position={[-1.1, 0, 0.3]} rotationY={0.9} animation="idle" face="calm" gaze={0} />
          <Villager position={[0.2, 0, -1.3]} robe={ROBE.elder} phase={0.6} />
          <Vox kind="wool" tint="#e8e2d0" position={[0.2, 1.1, -0.85]} size={[0.28, 0.12, 0.28]} />
        </>
      ),
    },
    {
      cue: "4.whole",
      // The whole party stops, for a bowl of soup. Wide, and every single body turned the same way.
      ...cam.push({ on: [0, 2.0, -2.6], dist: 11.0, to: 9.2, yaw: 4, pitch: 12, fov: 48 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Wide on the street: every dancer stopped, every body turned toward one bowl. The party has become a crowd around a plate.",
      stage: () => (
        <>
          <Villager position={[-0.5, 0, -1.4]} robe={ROBE.red} phase={0.3} />
          <Villager position={[0.7, 0, -2.2]} robe={ROBE.white} phase={1.1} />
          <Villager position={[-1.5, 0, -2.8]} robe={ROBE.blue} phase={1.8} />
          <Villager position={[1.6, 0, -3.4]} robe={ROBE.brown} phase={2.5} />
          <Player who={2} position={[-2.4, 0, -3.9]} rotationY={Math.PI} animation="idle" face="wow" />
          <Player who={7} position={[0.4, 0, -4.4]} rotationY={Math.PI} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "5.but",
      // Back to the kitchen, and back to bad. The board, the egg, and total confidence.
      ...cam.push({ on: [0, 1.25, 400.3], dist: 3.6, to: 3.0, yaw: -18, pitch: 8, fov: 40 }),
      zone: "home",
      look: "kitchen-day",
      note: "The pan on the stove, one egg in it, and his hands in position. Everything about this frame says he thinks he can do it.",
      stage: () => (
        <>
          <Vox kind="wool" tint="#3a3a42" position={[-2.1, 1.06, 397.45]} size={[0.5, 0.06, 0.5]} />
          <Vox kind="wool" tint="#f2f0e8" position={[-2.1, 1.1, 397.45]} size={[0.2, 0.05, 0.2]} />
        </>
      ),
    },
    {
      cue: "5.egg",
      // THE EGG GOES UP. Cut inside the line is not needed: the thrust of the pan is the whole first half second.
      ...cam.push({ on: [-2.1, 1.45, 397.7], dist: 3.4, to: 2.9, yaw: 10, pitch: -4, fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "Low angle on the pan as he flicks it: the egg leaving the pan and still going, and his face coming round to follow it.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#3a3a42" position={[-2.1, 1.06 + Math.max(0, t - 0.05) * 0.2, -2.55]} size={[0.5, 0.06, 0.5]} />
          <Vox kind="wool" tint="#f2f0e8" position={[-2.1, 1.2 + t * t * 6.2, 397]} size={[0.2, 0.06, 0.2]} />
          <Hero position={[-2.1, 0, 398.5]} rotationY={Math.PI} animation="idle" face="wow" gaze={0} headPitch={-0.5} />
        </>
      ),
    },
    {
      cue: "5.flipped",
      // It kept going. The ceiling, and the egg flattening against it.
      ...cam.push({ on: [-2.1, 2.0, 397.9], dist: 4.0, to: 3.4, yaw: 8, pitch: -18, fov: 46 }),
      zone: "home",
      look: "kitchen-day",
      note: "Tilted up at the ceiling where the egg has just hit and is spreading. The single funniest frame in the film, so it gets its own shot and no caption over the pan.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#f2f0e8" position={[-2.1, 2.9, 397.45]} size={[0.2 + ramp(t, 0.05, 0.5) * 0.4, 0.03, 0.2 + ramp(t, 0.05, 0.5) * 0.4]} />
          <Vox kind="wool" tint="#f7d34a" position={[-2.1, 2.86, 397.45]} size={[0.1, 0.03, 0.1]} />
        </>
      ),
    },
    {
      cue: "5.ceiling",
      // Then it came back down. The egg on the floor, and the dog arriving.
      ...cam.push({ on: [-2, 1.7, 398], dist: 3.8, to: 3.2, yaw: -10, pitch: 14, fov: 44 }),
      zone: "home",
      look: "kitchen-day",
      note: "Down on the floor: the egg landed, and the dog is already there with its nose in it. Down is the joke, so the camera is high.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#f2f0e8" position={[-2, 0.04, 397.8]} size={[0.3 + ramp(t, 0, 0.3) * 0.3, 0.03, 0.3 + ramp(t, 0, 0.3) * 0.3]} />
          <Vox kind="wool" tint="#c8b08a" position={[-1.4 - ramp(t, 0.2, 1.4) * 0.5, 0.24, -1.7]} size={[0.5, 0.32, 0.8]} />
          <Vox kind="wool" tint="#c8b08a" position={[-1.5 - ramp(t, 0.2, 1.4) * 0.5, 0.42, -2.1]} size={[0.3, 0.28, 0.3]} />
        </>
      ),
    },
    {
      cue: "5.dog2",
      // The dog got there first. Over his shoulder at the dog, and his hands still up.
      ...cam.push({ on: [-1.6, 0.7, 398], dist: 3.4, to: 2.9, yaw: -22, pitch: 12, fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "Over his shoulder: the dog eating the egg off the floor, and the teller's hands still up in the air where the pan left them.",
      stage: () => (
        <>
          <Hero position={[-2.5, 0, 398.6]} rotationY={2.5} animation="idle" face="calm" gaze={0} />
          <Vox kind="wool" tint="#c8b08a" position={[-1.7, 0.24, 397.8]} size={[0.5, 0.32, 0.8]} />
          <Vox kind="wool" tint="#c8b08a" position={[-1.7, 0.42, 397.5]} size={[0.3, 0.28, 0.3]} />
        </>
      ),
    },
    {
      cue: "5.almost",
      // "Almost." Alone, in his kitchen, said out loud to nobody. The best beat in the whole script.
      ...cam.push({ on: faceOf([-2.2, 0, 399.4], 0.8), dist: 3.2, to: 2.7, yaw: 4, pitch: 3, fov: 38 }),
      zone: "home",
      look: "kitchen-day",
      note: "His face, dead centre, saying one word to an empty kitchen. The pause after it is the joke, so the frame must not move much and must not cut early.",
      stage: (t) => (
        <>
          <Hero position={[-2.2, 0, 399.4]} rotationY={0} animation="idle" face="uneasy" gaze={0} />
          <Vox kind="wool" tint="#c8ced4" position={[-2, 1.1, 398.1]} size={[0.05, 0.3, 0.12]} opacity={1 - ramp(t, ALMOST + 0.5, ALMOST + 1.2)} />
        </>
      ),
    },
    {
      cue: "6.trained",
      // THE TRAINING ARC. Every shot from here is one image of work, and the lens is always low and close.
      ...cam.push({ on: [0, 1.25, 400.25], dist: 3.7, to: 3.1, yaw: -14, pitch: 8, fov: 40 }),
      zone: "home",
      look: "kitchen-day",
      note: "The board, the pile of vegetables, and him at the top of the frame with his sleeves pushed up. The start of the arc, and it has to look like training, not cooking.",
      stage: () => (
        <>
          <Hero position={[-0.1, 0, 400.9]} rotationY={0.1} animation="idle" face="brave" gaze={0} />
          <Vox kind="wool" tint="#d9c8a8" position={[-0.5, 0.9, 400.3]} size={[0.16, 0.12, 0.16]} />
          <Vox kind="wool" tint="#e8853c" position={[-0.2, 0.9, 400.35]} size={[0.13, 0.13, 0.13]} />
          <Vox kind="wool" tint="#7ac04f" position={[0.1, 0.9, 400.3]} size={[0.11, 0.13, 0.11]} />
        </>
      ),
    },
    {
      cue: "6.slow",
      // One onion. Then another. Slow, deliberate, boring on purpose.
      ...cam.top({ on: [-0.25, 0.94, 400.3], height: 3.8, to: 3.2, spin: [5, -5], fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "Extreme close on a single onion being cut slowly: the knife down, the pieces separating, his fingers holding it. The discipline before the spectacle.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#d9c8a8" position={[-0.35, 0.9, 400.3]} size={[0.2, 0.14, 0.2]} />
          <Vox kind="wool" tint="#e8e2d0" position={[-0.5, 0.9, 400.34]} size={[0.09, 0.05, 0.09]} />
          <Vox kind="wool" tint="#c8ced4" position={[-0.35, 1.05 + Math.abs(Math.sin(t * 2.2)) * 0.08, 400]} size={[0.04, 0.28, 0.1]} />
        </>
      ),
    },
    {
      cue: "6.faster",
      // Then faster. The same frame, and the knife is now a different object.
      ...cam.truck({ on: [-0.2, 1.1, 400.3], dist: 3.4, yaw: -22, pitch: 10, fov: 42, by: [1.4, 0, 0] }),
      zone: "home",
      look: "kitchen-day",
      note: "The identical frame to the shot before, at twice the speed. A cut back to the same setup is the cleanest way to show speed without a word.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#d9c8a8" position={[-0.3, 0.9, 400.3]} size={[0.22, 0.14, 0.22]} />
          <Vox kind="wool" tint="#e8e2d0" position={[-0.42, 0.9, 400.36]} size={[0.1, 0.05, 0.1]} />
          <Vox kind="wool" tint="#e8e2d0" position={[-0.2, 0.9, 400.24]} size={[0.1, 0.05, 0.1]} />
          <Vox kind="wool" tint="#e8e2d0" position={[-0.09, 0.9, 400.33]} size={[0.07, 0.05, 0.07]} />
          <Vox kind="wool" tint="#c8ced4" position={[-0.26, 1.02 + Math.abs(Math.sin(t * 22)) * 0.16, 400]} size={[0.04, 0.28, 0.1]} />
        </>
      ),
    },
    {
      cue: "6.chant",
      // HUS HUS HUS. The chant shot: his face, mid-effort, breathing in rhythm. This is the meme.
      ...cam.push({ on: faceOf([0, 0, 400.9], 0.8), dist: 3.1, to: 2.6, yaw: -8, pitch: 2, fov: 38 }),
      zone: "home",
      look: "kitchen-day",
      note: "His face at the board, breathing in rhythm, eyes on the knife and not on us. The chant is the running meme, so this is a training shot and it has to look like effort.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 400.9]} rotationY={0.05} animation="idle" face="brave" gaze={0} headPitch={0.18} />
          <Bubble text="HUS" position={[-0.55, 2.0 + Math.sin(t * 9) * 0.03, 401]} scale={pop(t, CHANT) * 0.55 * pulse(t, 9)} rotationY={0} dark tail={1} />
        </>
      ),
    },
    {
      cue: "6.blade",
      // The knife blurs. The chant again, and this time the frame is the blade and the debris.
      ...cam.push({ on: [-0.15, 1.15, 400.3], dist: 3.3, to: 2.8, yaw: -26, pitch: 12, fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "The knife at full speed with vegetable going everywhere, the frame almost full of flying pieces. The visual equivalent of the chant.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#c8ced4" position={[-0.15, 0.96 + Math.abs(Math.sin(t * 26)) * 0.2, 400]} size={[0.04, 0.3, 0.1]} />
          {Array.from({ length: 9 }, (_, i) => (
            <Vox
              key={i}
              kind="wool"
              tint={i % 3 === 0 ? "#e8853c" : i % 3 === 1 ? "#7ac04f" : "#e8e2d0"}
              position={[-0.3 + Math.sin(t * 7 + i) * 0.5, 0.95 + Math.abs(Math.cos(t * 5 + i)) * 0.4, 400 + Math.cos(t * 6 + i) * 0.35]}
              size={[0.06, 0.06, 0.06]}
            />
          ))}
        </>
      ),
    },
    {
      cue: "6.pancake",
      // A pancake, caught. After the egg, this is the payoff, and it should look easy.
      ...cam.push({ on: [-2.1, 1.55, 397.8], dist: 3.6, to: 3.0, yaw: 12, pitch: -8, fov: 44 }),
      zone: "home",
      look: "kitchen-day",
      note: "A pancake landing back in the pan, and his hand already moving to catch the handle. The same frame as the egg, with the opposite result.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#3a3a42" position={[-2.1, 1.06, 397.45]} size={[0.5, 0.06, 0.5]} />
          <Vox kind="wool" tint="#e8c07a" position={[-2.1, 1.2 + Math.abs(Math.cos((t / 1.2) * Math.PI)) * 0.45, 397]} size={[0.3, 0.05, 0.3]} />
          <Hero position={[-2.1, 0, 398.6]} rotationY={Math.PI} animation="idle" face="grin" gaze={0} />
        </>
      ),
    },
    {
      cue: "6.again",
      // Again. Then four at once. A stack of pans.
      ...cam.push({ on: [-2.1, 1.7, 397.9], dist: 4.2, to: 3.5, yaw: -12, pitch: -10, fov: 46 }),
      zone: "home",
      look: "kitchen-day",
      note: "Four pans on the stove at once, and four pancakes in the air, all at different heights. The joke is the confidence with which this is done.",
      stage: (t) => (
        <>
          {[-2.7, -2.3, -1.9, -1.5].map((x, i) => (
            <group key={x}>
              <Vox kind="wool" tint="#3a3a42" position={[x, 1.06, 397]} size={[0.42, 0.06, 0.42]} />
              <Vox kind="wool" tint="#e8c07a" position={[x, 1.24 + Math.abs(Math.cos(t * 3 + i * 0.7)) * 0.4, 397]} size={[0.24, 0.05, 0.24]} />
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "6.burn",
      // The pan gave up. Smoke, black food, and his face lit by the fire.
      ...cam.push({ on: [-2.1, 1.4, 397.8], dist: 3.5, to: 3.0, yaw: 16, pitch: 6, fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "A pan of food so burnt the pan has gone black, with smoke coming off it and the orange firelight on his face. The one failure in the montage, kept brief.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#1e1a18" position={[-2.1, 1.1, 397.45]} size={[0.48, 0.1, 0.48]} />
          <Vox kind="wool" tint="#2b2220" position={[-2.1, 1.2 + ramp(t, 0, 1.6) * 0.9, -2.55]} size={[0.3, 0.3, 0.3]} opacity={0.5 * (1 - ramp(t, 0.4, 1.6))} />
          <pointLight position={[-2.1, 1.3, 397.7]} color="#ff7a2a" intensity={pop(t, 0.1) * 14} distance={4} decay={2} />
          <Hero position={[-2.1, 0, 398.7]} rotationY={Math.PI} animation="idle" face="ouch" gaze={0} />
        </>
      ),
    },
    {
      cue: "6.omelette",
      // Omelettes until the arms stopped. Top-down: a table covered in plated omelettes.
      ...cam.top({ on: [0, 0.8, 400.6], height: 4.4, to: 3.7, spin: [-9, 9], fov: 46 }),
      zone: "home",
      look: "kitchen-day",
      note: "Straight down on the table, covered in plate after plate after plate of omelettes. The volume is the joke, and only a top-down can hold it.",
      stage: () => (
        <>
          {[-0.9, -0.3, 0.3, 0.9].flatMap((x) => [-0.4, 0.2, 0.8].map((z, j) => (
            <group key={`${x}${z}`}>
              <Vox kind="wool" tint="#f7f4ea" position={[x, 0.81, z + 400.6]} size={[0.3, 0.03, 0.3]} />
              <Vox kind="wool" tint={j % 2 ? "#e8c07a" : "#efd08c"} position={[x, 0.84, z + 400.6]} size={[0.22, 0.04, 0.22]} />
            </group>
          )))}
        </>
      ),
    },
    {
      cue: "6.calendar",
      // Months pass like a flip book. A calendar on the wall, torn, then bare.
      ...cam.truck({ on: [1.6, 1.7, 397.3], dist: 3.8, yaw: 0, pitch: 3, fov: 42, by: [-2.6, 0, 0] }),
      zone: "home",
      look: "kitchen-day",
      note: "A wall calendar with its pages flicking over, then nothing left but the backing board. Months, in one object, in one shot.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#f2ecd8" position={[1.6, 1.7, 397.08]} size={[0.8, 1.0, 0.03]} />
          <Vox kind="wool" tint="#c8402f" position={[1.6, 2.06, 397.1]} size={[0.82, 0.12, 0.02]} />
          <Vox kind="wool" tint="#e8e2d0" position={[1.6, 1.62 - ramp(t, 0.3, 1.8) * 0.5, -2.89]} size={[0.66, 0.06 + ramp(t, 0.3, 1.8) * 0.5, 0.02]} />
          {Array.from({ length: 6 }, (_, i) => (
            <Vox key={i} kind="wool" tint="#f7f4ea" position={[1.25 + (i % 3) * 0.35, 1.9 - Math.floor(i / 3) * 0.3, 397]} size={[0.16, 0.16, 0.01]} opacity={1 - ramp(t, 0.5 + i * 0.15, 1.0 + i * 0.15)} />
          ))}
        </>
      ),
    },
    {
      cue: "6.months",
      // The last line of the arc, and the frame is a wide of the same kitchen, changed: knives everywhere.
      ...cam.push({ on: [0, 1.7, 400.2], dist: 6.4, to: 5.5, yaw: -6, pitch: 8, fov: 48 }),
      zone: "home",
      look: "kitchen-day",
      note: "Wide on the kitchen at the end of the arc: a knife rack full, every surface worn, the calendar gone, and him small in the middle of it. The room has changed.",
      stage: () => (
        <>
          <Hero position={[-0.2, 0, 401.2]} rotationY={0.3} animation="idle" face="calm" gaze={0} />
          <Vox kind="wool" tint="#c9a06a" position={[1.6, 2.05, 397.1]} size={[0.7, 0.14, 0.05]} />
          {Array.from({ length: 7 }, (_, i) => (
            <Vox key={i} kind="wool" tint="#c8ced4" position={[1.35 + i * 0.09, 1.88, 397]} size={[0.03, 0.2 + (i % 3) * 0.05, 0.02]} />
          ))}
        </>
      ),
    },
  ],
});

/** The chant, on the beat: 0 except for a short punch on each beat. */
function pulse(t: number, perSecond: number): number {
  return 0.55 + 0.45 * Math.abs(Math.sin(t * perSecond * 0.5));
}
void Player;
void Vox;
void ramp;
