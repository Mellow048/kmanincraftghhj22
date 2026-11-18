import { cam, storyScene } from "../../engine";
import type React from "react";
import { Bubble, Hero, Player, ROBE, Villager, Vox, chestOf, faceOf, pop, ramp, timing, wordAt } from "./kit";

/**
 * BEAT 7 — THE JOB (1:47–2:09), BEAT 8 — THE REUNION (2:09–2:32), BEAT 9 — THE TURN (2:32–2:37).
 *
 * The ending does not land softly. RETENTION.md: the last quarter escalates twice. So the job arc escalates
 * (he is the calm one in a panicking kitchen), the reunion escalates ("Training."), and then the film turns
 * over one more time: they are still not going to learn. That last turn is the whole reason the film is
 * about a town and not about a boy.
 */

const TRAIN = wordAt("8.training", "training");
const CHANT = wordAt("8.chant", "huh");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The job, the reunion, and the turn",
  shots: [
    {
      cue: "7.walked",
      // Walking into a restaurant that is a vending machine. The whole joke of act one, paid off.
      ...cam.truck({ on: [8.0, 1.6, 5.0], dist: 6.0, yaw: 10, pitch: 6, fov: 46, by: [-3.2, 0, 0] }),
      zone: "village",
      look: "overworld-sunset",
      note: "The teller walking up to the vending machine in a chef's uniform, and the camera trucking with him so the machine grows in frame. Full seriousness, which is the joke.",
      stage: (t) => (
        <>
          <Hero position={[5.4, 0, 6.2]} rotationY={-1.2} animation="walk" animDistance={ramp(t, 0, 2) * 2.4} face="brave" />
          <Villager position={[9.2, 0, 5.2]} robe={ROBE.white} phase={1.1} />
        </>
      ),
    },
    {
      cue: "7.door",
      // The machine's door, open, with a real kitchen light coming out of it.
      ...cam.push({ on: [8.0, 1.5, 4.9], dist: 3.8, to: 3.2, yaw: -8, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The vending machine's front panel swung open like a door, and warm kitchen light spilling out. The reveal that behind the joke there is a real restaurant.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#ffd9a8" position={[8.0, 1.3, 4.62]} size={[1.2, 1.6, 0.02]} />
          <Vox kind="wool" tint="#3a3a42" position={[8.75, 1.3, 4.6]} size={[0.06, 1.7, 0.5]} />
          <pointLight position={[8.0, 1.4, 4.2]} color="#ffd9a8" intensity={pop(t, 0.1) * 20} distance={6} decay={2} />
        </>
      ),
    },
    {
      cue: "7.asked",
      // He asks for a job. The head chef, close, and not impressed.
      ...cam.push({ on: chestOf([0, 0, 500], 1.0), dist: 5.2, to: 4.4, yaw: 8, pitch: 8, fov: 44 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The head chef behind the hot line, arms folded, absolutely unimpressed. A big man in a big kitchen, and the teller small at the bottom of the frame.",
      stage: () => (
        <>
          <Villager position={[0, 0, 499.8]} robe={ROBE.smith} phase={0.4} scale={1.05} />
          <Hero position={[-0.55, 0, 501]} rotationY={0.2} animation="idle" face="brave" gaze={0} />
        </>
      ),
    },
    {
      cue: "7.chef",
      // He looks at the knife, then at him. A close-up on an object, then the face — done inside one shot
      // by putting the knife in the foreground.
      ...cam.push({ on: [-0.15, 1.25, 500.4], dist: 3.7, to: 3.1, yaw: -32, pitch: 10, fov: 42 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The chef's hand picking up the teller's knife off the bench and turning it over. The knife is judged before the boy is.",
      stage: () => (
        <>
          <Vox kind="wool" tint="#c8ced4" position={[-0.15, 1.06, 500.4]} size={[0.04, 0.34, 0.1]} />
          <Vox kind="wool" tint="#8a6a44" position={[-0.15, 0.9, 500.3]} size={[0.06, 0.08, 0.2]} />
          <Villager position={[0.5, 0, 499.7]} robe={ROBE.smith} phase={1.2} scale={1.05} />
        </>
      ),
    },
    {
      cue: "7.word",
      // One word. "When?" Delivered at a villager, from a villager who has never cooked anything.
      ...cam.push({ on: faceOf([0.2, 0, 499.6], 1.05), dist: 3.1, to: 2.6, yaw: 4, pitch: 2, fov: 38 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The chef's face saying one word, and the teller's shoulder in the corner of the frame. The smallest possible answer to a big ask.",
      stage: (t) => (
        <>
          <Villager position={[0.2, 0, 499.6]} robe={ROBE.smith} phase={0.8} scale={1.05} />
          <Bubble text="WHEN?" position={[0.2, 2.1, 499.8]} scale={pop(t, 0.3) * 0.8} rotationY={0} dark />
          <Hero position={[-0.8, 0, 500.7]} rotationY={0.5} animation="idle" face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "7.night",
      // That night: the whole town came. Wide on the restaurant, full, and the hot line going.
      ...cam.push({ on: [0, 2.0, 500.6], dist: 9.0, to: 7.6, yaw: -6, pitch: 12, fov: 50 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The restaurant full to the door, every table taken, and steam over the hot line. The town that has never eaten has turned up to eat.",
      stage: (t) => (
        <>
          <Villager position={[-1.6, 0, 501.4]} robe={ROBE.brown} phase={0.3} />
          <Villager position={[1.4, 0, 501]} robe={ROBE.white} phase={1.2} />
          <Villager position={[0.2, 0, 502.2]} robe={ROBE.red} phase={2.0} />
          <Player who={1} position={[-2.8, 0, 502.4]} rotationY={Math.PI} animation="idle" face="smile" />
          <Player who={8} position={[2.9, 0, 502.6]} rotationY={Math.PI} animation="idle" face="grin" />
          <Vox kind="wool" tint="#e8e2d0" position={[-1.6, 1.34 + ramp(t, 0, 2) * 0.5, 1.1]} size={[0.3, 0.2, 0.3]} opacity={0.4 * (1 - ramp(t, 0, 2))} />
        </>
      ),
    },
    {
      cue: "7.apron",
      // The calmest person in the building. He ties his apron, and the frame is his hands.
      ...cam.top({ on: [-1.5, 1.0, 499.8], height: 3.2, to: 2.7, spin: [6, -6], fov: 42 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "His hands tying the apron knot, and behind them the kitchen in chaos. Still hands in a moving frame, which is the whole character.",
      stage: (t) => (
        <>
          <Hero position={[-1.5, 0, 499.6]} rotationY={0.15} animation="idle" face="calm" gaze={0} />
          <Vox kind="wool" tint="#f2ecd8" position={[-1.5, 0.85, 500.05]} size={[0.3, 0.5, 0.02]} />
          <Villager position={[1.4, 0, 497.6]} robe={ROBE.blue} phase={t * 4} walk={Math.sin(t * 9) * 0.6} hmm={0.6} />
        </>
      ),
    },
    {
      cue: "7.hands",
      // Chopping. Flipping. Plating. Chopping again. The fastest cutting in the film.
      ...cam.top({ on: [-1.5, 1.0, 498.9], height: 3.0, to: 2.5, spin: [8, -8], fov: 42 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "His hands at the board at full speed, four plates in different states around him. The training arc, cashed.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#c8ced4" position={[-1.5, 1.0 + Math.abs(Math.sin(t * 24)) * 0.16, 498]} size={[0.04, 0.3, 0.1]} />
          {[-1.9, -1.5, -1.1, -0.7].map((x, i) => (
            <Vox key={x} kind="wool" tint={i % 2 ? "#e8c07a" : "#f7f4ea"} position={[x, 0.92, 499 + (i % 2) * 0.16]} size={[0.28, 0.04, 0.28]} />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <Vox key={i} kind="wool" tint={i % 2 ? "#7ac04f" : "#e8853c"} position={[-1.7 + Math.sin(t * 9 + i) * 0.35, 1.05 + Math.abs(Math.cos(t * 7 + i)) * 0.3, 498]} size={[0.05, 0.05, 0.05]} />
          ))}
        </>
      ),
    },
    {
      cue: "7.smoke",
      // Something catches fire behind him and he does not look. This is the character, in one shot.
      // The lens stands at the west end of the hot line, looking east along it: the fire is BEHIND him in
      // depth and both of them read. From the front of the room the bench hides him and the fire is off frame.
      // The look point is the hero, not empty air west of him: aiming at a point with nothing behind the
      // subject is how a lens ends up pointed at a wall.
      ...cam.push({ on: [0.45, 1.3, 498.7], dist: 4.0, to: 3.4, yaw: 32, pitch: 7, fov: 46 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "Fire behind him on the line, another cook panicking, and the teller not turning round. The whole film's thesis in a single frame.",
      stage: (t) => (
        <>
          <Hero position={[0.45, 0, 498.05]} rotationY={-0.35} animation="idle" face="calm" gaze={0} />
          <Villager position={[1.55, 0, 496.9]} robe={ROBE.red} phase={t * 5} walk={Math.sin(t * 12) * 0.7} hmm={0.9} />
          {/* the fire, on the line behind him and INSIDE the frame: a fire the caption promises and the
              lens cannot see is a stage direction, not a shot */}
          <Vox kind="wool" tint="#ff7a14" position={[2.35, 1.35 + ramp(t, 0, 1.8) * 0.55, 496.7]} size={[0.55, 0.7 + ramp(t, 0, 1.8) * 0.7, 0.5]} />
          <Vox kind="wool" tint="#ffd04a" position={[2.35, 1.3 + ramp(t, 0, 1.8) * 0.4, 496.68]} size={[0.3, 0.45 + ramp(t, 0, 1.8) * 0.45, 0.3]} />
          <pointLight position={[2.35, 1.8, 497.1]} color="#ff7a2a" intensity={26 + Math.sin(t * 12) * 9} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "7.watch",
      // He did not see it. Said honestly, and it is the one time the film lets him be small.
      ...cam.push({ on: faceOf([-1.2, 0, 499], 0.8), dist: 3.2, to: 2.7, yaw: -8, pitch: 2, fov: 38 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "His face, still calm, with the orange firelight behind him doing all the acting. He genuinely did not look.",
      stage: () => <Hero position={[-1.2, 0, 499]} rotationY={0.05} animation="idle" face="smile" gaze={0} />,
    },
    {
      cue: "8.door",
      // The reunion. The restaurant door, and three people in party clothes standing in it.
      ...cam.push({ on: [0, 1.7, 503], dist: 4.4, to: 3.7, yaw: 158, pitch: 4, fov: 46 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The dining room door open, and his three old friends silhouetted in it in party clothes, looking for the first time at a room full of people eating.",
      stage: () => (
        <>
          <Player who={0} position={[-0.6, 0, 504]} rotationY={0.1} animation="idle" face="wow" />
          <Player who={4} position={[0.6, 0, 504.2]} rotationY={-0.2} animation="idle" face="grin" />
          <Player who={8} position={[0, 0, 504.7]} rotationY={0} animation="idle" face="calm" />
          <Villager position={[-2.2, 0, 501.5]} robe={ROBE.white} phase={0.6} />
          <Villager position={[2.2, 0, 501.8]} robe={ROBE.brown} phase={1.3} />
        </>
      ),
    },
    {
      cue: "8.dressed",
      // Still dressed for a party, still not eating. A quick look at the clothes: sequins, and a paper cup.
      ...cam.push({ on: [0.2, 1.35, 501.6], dist: 5.2, to: 4.4, yaw: 12, pitch: 6, fov: 44 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "Their party clothes from the chest down, and a paper cup from the vending machine in one hand, while everybody around them eats off plates. One detail shot carries it.",
      stage: () => (
        <>
          <Player who={4} position={[0.2, 0, 501.6]} rotationY={0.2} animation="idle" face="calm" />
          <Vox kind="wool" tint="#e8e2d0" position={[0.6, 0.95, 501.5]} size={[0.12, 0.2, 0.12]} />
        </>
      ),
    },
    {
      cue: "8.looked",
      // One of them looks at the kitchen, then at him. The double take, in one frame: both of them.
      ...cam.pan({ from: [2.6, 2.0, 503.2], on: [0, 1.35, 500.2], onTo: [-1.2, 1.35, 498.8], fov: 44 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The friend in the foreground with his head half turned, and the teller visible past him in the pass, working. The double take, played in depth.",
      stage: () => (
        <>
          <Player who={0} position={[0.5, 0, 501.2]} rotationY={0.7} animation="idle" face="wow" />
          <Hero position={[-1.1, 0, 498.4]} rotationY={2.6} animation="idle" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "8.wait",
      // "Wait. Is that him?" The face of a person recalculating four years of a friendship.
      ...cam.push({ on: faceOf([0.4, 0, 501], 1.0), dist: 3.1, to: 2.6, yaw: -6, pitch: 2, fov: 38 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The friend's face, close, absolutely certain he is wrong and absolutely certain he is right. The best reaction shot in the film.",
      stage: (t) => (
        <>
          <Player who={0} position={[0.4, 0, 501]} rotationY={0.3} animation="idle" face="wow" />
          <Bubble text="WAIT…" position={[0.4, 2.05, 501.25]} scale={pop(t, 0.2) * 0.8} rotationY={0} dark />
        </>
      ),
    },
    {
      cue: "8.how",
      // "Bro. How did you get this good?" Two of them, stacked, both shouting.
      ...cam.push({ on: [0, 1.5, 501.2], dist: 4.0, to: 3.4, yaw: 8, pitch: 4, fov: 44 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "Two friends stacked up the frame, both talking at once, exactly the way they were in the first party shot. Same composition, four years later.",
      stage: (t) => (
        <>
          <Player who={4} position={[-0.3, 0, 501]} rotationY={0.1} animation="idle" face="laugh" />
          <Player who={8} position={[0.6, 0, 499.8]} rotationY={-0.3} animation="idle" face="grin" />
          <Bubble text="BRO?!" position={[0.5, 2.1, 500.9]} scale={pop(t, 0.15) * 0.85} rotationY={0} dark tail={1} />
        </>
      ),
    },
    {
      cue: "8.turned",
      // He turns around slowly. The shot the whole film has been waiting for: the hero turn.
      ...cam.orbit({ on: faceOf([-1.2, 0, 498.8], 0.8), dist: 3.6, distTo: 3.0, yaw: 42, yawTo: -18, pitch: 4, fov: 40 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The camera swings all the way round him as he turns, so the frame goes from his back to his face while he is still moving. The one shot in the film that is allowed to be cool.",
      stage: (t) => (
        <>
          <Hero position={[-1.2, 0, 498.8]} rotationY={ramp(t, 0.1, 1.0) * Math.PI} animation="idle" face="smile" gaze={0} />
          <Vox kind="wool" tint="#c8ced4" position={[-0.9, 1, 498.9]} size={[0.04, 0.3, 0.1]} />
        </>
      ),
    },
    {
      cue: "8.training",
      // ONE WORD. The deadpan. The frame holds on him for the whole beat.
      ...cam.push({ on: faceOf([-1.2, 0, 498.8], 0.8), dist: 3.0, to: 2.5, yaw: 0, pitch: 2, fov: 36 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "Said straight down the lens, one word, no expression. This is the line the thumbnail sells, so it gets a clean frame and the whole beat.",
      stage: (t) => (
        <>
          <Hero position={[-1.2, 0, 498.8]} rotationY={0} animation="idle" face="calm" gaze={0} />
          <Bubble text="TRAINING." position={[-1.2, 2.02, 499]} scale={pop(t, TRAIN) * 0.9} rotationY={0} dark />
        </>
      ),
    },
    {
      cue: "8.nothing",
      // Nobody says anything for a whole second. Wide, and four people standing still.
      ...cam.push({ on: [0, 1.5, 500.2], dist: 6.6, to: 5.6, yaw: 8, pitch: 6, fov: 46 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "Wide and still: him, the three friends, and a second of silence. Nothing moves. The quiet is the joke, so the camera must not either.",
      stage: () => (
        <>
          <Hero position={[-1.2, 0, 498.8]} rotationY={0} animation="idle" face="calm" gaze={0} />
          <Player who={0} position={[0.3, 0, 501.6]} rotationY={0.2} animation="idle" face="wow" />
          <Player who={4} position={[-0.4, 0, 502.2]} rotationY={0} animation="idle" face="wow" />
          <Player who={8} position={[0.9, 0, 502.5]} rotationY={-0.2} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "8.onions",
      // Back to work. The turn, and the knife comes back out.
      ...cam.top({ on: [-1.2, 1.0, 498.7], height: 3.1, to: 2.6, spin: [6, -6], fov: 42 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "He turns back to the board and picks the knife up again, and the friends are still in the corner of the frame, uncomprehending.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#c8ced4" position={[-1.2, 0.98 + Math.abs(Math.sin(t * 18)) * 0.12, 498]} size={[0.04, 0.28, 0.1]} />
          <Player who={4} position={[0.9, 0, 500.6]} rotationY={0.4} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "8.chant",
      // HUS HUS HUS, in a restaurant, to two people who have never trained for anything.
      ...cam.push({ on: faceOf([-1.2, 0, 498.8], 0.8), dist: 3.2, to: 2.7, yaw: -12, pitch: 2, fov: 38 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The chant again, in a professional kitchen, at two friends who still do not understand what they are looking at. The film's last joke before the turn.",
      stage: (t) => (
        <>
          <Hero position={[-1.2, 0, 498.8]} rotationY={0.05} animation="idle" face="brave" gaze={0} headPitch={0.16} />
          <Bubble text="HUS" position={[-1.6, 2.0 + Math.sin(t * 9) * 0.03, 499]} scale={pop(t, CHANT) * 0.6 * (0.55 + 0.45 * Math.abs(Math.sin(t * 4.5)))} rotationY={0} dark tail={1} />
        </>
      ),
    },
    {
      cue: "9.now",
      // The turn. The restaurant at night, full, and the queue outside.
      ...cam.push({ on: [0, 2.2, 502], dist: 10.0, to: 8.5, yaw: 6, pitch: 11, fov: 50 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The restaurant at the end: every table full, the hot line going, and a queue visible through the door. The town got what it wanted without ever wanting it.",
      stage: (t) => (
        <>
          <Villager position={[-1.8, 0, 501.2]} robe={ROBE.brown} phase={0.4} />
          <Villager position={[1.6, 0, 501]} robe={ROBE.white} phase={1.3} />
          <Villager position={[0.2, 0, 502.4]} robe={ROBE.red} phase={2.1} />
          <Player who={2} position={[-2.9, 0, 502.6]} rotationY={Math.PI} animation="idle" face="grin" />
          <Player who={7} position={[2.9, 0, 502.7]} rotationY={Math.PI} animation="idle" face="smile" />
          <Hero position={[0, 0, 498]} rotationY={0} animation="idle" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "9.line",
      // The queue goes down the street. The dog is first. The joke from the first act, paid.
      ...cam.truck({ on: [8.0, 1.6, 6.4], dist: 6.4, yaw: 14, pitch: 6, fov: 46, by: [-4.0, 0, 0] }),
      zone: "village",
      look: "overworld-sunset",
      note: "The queue again, longer than before, and the dog is at the front of it. The exact shot from the first act, four years later, with one more animal in it.",
      stage: () => (
        <>
          <Vox kind="wool" tint="#c8b08a" position={[7.4, 0.28, 6.0]} size={[0.4, 0.32, 0.7]} />
          <Vox kind="wool" tint="#c8b08a" position={[7.4, 0.45, 5.6]} size={[0.28, 0.26, 0.28]} />
          <Villager position={[6.2, 0, 6.5]} robe={ROBE.red} phase={0.4} />
          <Villager position={[5.0, 0, 6.8]} robe={ROBE.white} phase={1.2} />
          <Villager position={[3.8, 0, 7.0]} robe={ROBE.farmer} phase={2.0} />
          <Player who={3} position={[2.6, 0, 7.1]} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "9.fridge",
      // My fridge is full. The first joke of the film, reversed in one frame.
      //
      // The lens stands back in the room's open floor and looks across at the open fridge, so the door is a
      // wing of the frame instead of a wall in front of it. Every shelf is at z 397.9 and the food sits
      // between the door and the body, which is the only place it can be seen from.
      ...cam.push({ on: [2.75, 1.2, 397.9], dist: 3.5, to: 3.0, yaw: -28, pitch: -4, fov: 42 }),
      zone: "home",
      look: "kitchen-day",
      note: "The same fridge, open, and stacked to the door with food. The first joke in the film, paid off in the last minute.",
      stage: () => (
        <>
          {/* body, open door swung to the left, and the lit inside */}
          <Vox kind="wool" tint="#dfe6ea" position={[2.75, 0.9, 398.35]} size={[1.02, 1.8, 0.7]} />
          <Vox kind="wool" tint="#f7fbff" position={[2.75, 0.9, 397.98]} size={[0.94, 1.72, 0.04]} />
          <Vox kind="wool" tint="#e8eef2" position={[2.2, 0.9, 397.6]} size={[0.06, 1.72, 0.62]} />
          <pointLight position={[2.1, 1.6, 398.2]} color="#f2f8ff" intensity={26} distance={5} decay={2} />
          {[-0.62, -0.12, 0.38, 0.86].map((y, i) => (
            <group key={y}>
              <Vox kind="wool" tint="#d8e2e8" position={[2.75, y, 397.99]} size={[0.86, 0.04, 0.28]} />
              <Vox kind="wool" tint={["#c8402f", "#7ac04f", "#e8853c", "#e8c07a"][i]} position={[2.52, y + 0.11, 397.99]} size={[0.16, 0.16, 0.22]} />
              <Vox kind="wool" tint={["#3f8a4f", "#e8a21c", "#c9783c", "#f7f4ea"][i]} position={[2.92, y + 0.11, 397.99]} size={[0.16, 0.16, 0.22]} />
            </group>
          ))}
          {/* the top shelf, packed to the door: the punchline is volume, so it is a wall of colour */}
          <Vox kind="wool" tint="#d8e2e8" position={[2.75, 1.34, 397.99]} size={[0.86, 0.04, 0.28]} />
          {[2.42, 2.6, 2.78, 2.96, 3.12].map((x, i) => (
            <Vox key={x} kind="wool" tint={["#c8402f", "#f7f4ea", "#7ac04f", "#e8c07a", "#c9783c"][i]} position={[x, 1.48, 397.99]} size={[0.15, 0.22, 0.2]} />
          ))}
        </>
      ),
    },
    {
      cue: "9.nobody",
      // Nobody has ever asked why the parties never end. The town, at night, and not one of them looking up.
      ...cam.push({ on: [0, 1.8, -2.0], dist: 8.0, to: 6.8, yaw: 6, pitch: 10, fov: 48 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The street at night, everyone dancing, nobody asking anything. The question the viewer has been carrying since the first act, put back on the screen as an answer.",
      stage: (t) => (
        <>
          <Villager position={[-0.6, 0, -0.8]} robe={ROBE.red} phase={0.3} walk={Math.sin(t * 3.4) * 0.5} />
          <Villager position={[0.8, 0, -1.8]} robe={ROBE.white} phase={1.1} walk={Math.cos(t * 3.0) * 0.5} />
          <Villager position={[-1.6, 0, -2.8]} robe={ROBE.blue} phase={1.9} walk={Math.sin(t * 2.8) * 0.5} />
          <Villager position={[1.7, 0, -3.6]} robe={ROBE.brown} phase={2.6} walk={Math.cos(t * 3.2) * 0.5} />
          <Player who={5} position={[0.1, 0, -4.2]} rotationY={Math.PI} animation="idle" face="grin" />
        </>
      ),
    },
    {
      cue: "9.but",
      // I know why. The teller, in his kitchen, and the frame is his face and the knife.
      ...cam.push({ on: faceOf([-0.2, 0, 400], 0.8), dist: 3.2, to: 2.7, yaw: -8, pitch: 3, fov: 38 }),
      zone: "home",
      look: "kitchen-day",
      note: "The teller, the only person in this town who can cook, saying the thing the whole film has been building to. The knife is in frame, and it is his.",
      stage: () => (
        <>
          <Hero position={[-0.2, 0, 400]} rotationY={0.1} animation="idle" face="smug" gaze={0} />
          <Vox kind="wool" tint="#c8ced4" position={[0.2, 1.0, 400]} size={[0.04, 0.3, 0.1]} />
        </>
      ),
    },
    {
      cue: "9.and",
      // And they are not going to learn. The perfect button: he turns back to the board, and the frame
      // leaves him working while the town queues outside.
      ...cam.push({ on: [0.2, 1.3, 400.4], dist: 4.7, to: 4.0, yaw: 20, pitch: 8, fov: 44 }),
      zone: "home",
      look: "kitchen-day",
      note: "The last picture: him at the board with his back to us and the whole kitchen behind him, working, while outside a town queues for a thing it will never make itself.",
      stage: () => (
        <>
          <Hero position={[0.2, 0, 400]} rotationY={Math.PI} animation="idle" face="calm" gaze={0} headPitch={0.2} />
          <Vox kind="wool" tint="#c9a06a" position={[0.2, 1.05, 398]} size={[6.0, 1.6, 0.15]} />
          <Vox kind="wool" tint="#c8ced4" position={[0.4, 1.02, 400]} size={[0.04, 0.28, 0.1]} />
        </>
      ),
    },
    {
      cue: "10.sub",
      // THE ASK. The subscribe sign, and the joke continues into it.
      ...cam.push({ on: [0, 1.6, 501.6], dist: 5.0, to: 4.3, yaw: 150, pitch: 4, fov: 46 }),
      zone: "restaurant",
      look: "lava-shore",
      note: "The teller at the pass with the sign beside him, and the restaurant working behind. The ask is part of the joke, not an interruption of it.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 500.6]} rotationY={0} animation="idle" face="grin" gaze={0} />
          <Vox kind="wool" tint="#f2ecd8" position={[0, 2.6, 501.2]} size={[2.2, 0.7, 0.06]} />
          <Vox kind="wool" tint="#c8402f" position={[0, 2.6, 501.16]} size={[2.0, 0.1, 0.02]} />
          <Vox kind="wool" tint="#e8a21c" position={[0, 2.34, 501.16]} size={[1.8, 0.08, 0.02]} />
          <Vox kind="wool" tint="#c8ced4" position={[-1.2, 1.9, 501.2]} size={[0.05, 1.4, 0.05]} />
          <Vox kind="wool" tint="#c8ced4" position={[1.2, 1.9, 501.2]} size={[0.05, 1.4, 0.05]} />
          <pointLight position={[0, 2.8, 502]} color="#ffe4b0" intensity={pop(t, 0.1) * 14} distance={6} decay={2} />
        </>
      ),
    },
  ],
});
