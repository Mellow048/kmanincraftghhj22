import { Vox, cam, storyScene } from "../../engine";
import { Hero, PLACE, Player, Ring, Rival, SignBoard, Splash, Trophy, Villager, timing, travel } from "./kit";

/**
 * 07 THE CONTEST — the smallest of three pools, and everyone in it looks like a professional.
 *
 * The joke is scale: he signed up for the town race and walked into a championship.
 * The trophy is on a table by the water, so the want is in every frame.
 */

const A = PLACE.arena[0];

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The Contest",
  shots: [
    {
      cue: "7.days",
      ...cam.push({ on: [A - 20, 1.05, 12], dist: 5.4, to: 4.2, yaw: 38, pitch: 10, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Three days later: a trestle table at the gate, a queue, and him at the front of it with a pen. The town race has become an event.",
      stage: () => (
        <>
          <Vox kind="planks" tint="#b8935e" position={[A - 20, 0.45, 12]} size={[3.0, 0.9, 1.1]} />
          <SignBoard at={[A - 23.6, 0.6, 12.6]} width={3.2} height={1.9} rotationY={0.5} lines={[{ text: "SWIM RACE", height: 0.36 }, { text: "ENTRIES", height: 0.34, color: "#a83c2a" }]} />
          <Hero position={[A - 20, 0, 13.4]} rotationY={Math.PI} animation="reach" face="worried" />
          <Player who={1} position={[A - 21.6, 0, 12.2]} rotationY={1.4} animation="idle" />
          <Player who={5} position={[A - 18.4, 0, 13.8]} rotationY={-2.4} animation="idle" />
        </>
      ),
    },
    {
      cue: "7.hands",
      ...cam.push({ on: [A - 20, 0.95, 12.6], dist: 1.15, to: 0.85, yaw: 20, pitch: 22, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "Down on the table: a pen in a shaking hand, and the paper moving with it. Nerves, shown at the size of a signature.",
      stage: () => (
        <>
          <Vox kind="planks" tint="#b8935e" position={[A - 20, 0.45, 12]} size={[3.0, 0.9, 1.1]} />
          <Vox kind="wool" tint="#f4f0e2" position={[A - 20.1, 0.91, 12.3]} size={[0.5, 0.02, 0.7]} />
          <Hero position={[A - 20, 0, 13.1]} rotationY={Math.PI} animation="press" face="worried" />
        </>
      ),
    },
    {
      cue: "7.number",
      ...cam.push({ on: [A - 20, 1.05, 12.9], dist: 1.9, to: 1.4, yaw: -14, pitch: 6, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "A paper number is pinned on the red shirt: sixty-six. He is a competitor now, in a shirt his mother would recognise.",
      stage: () => (
        <>
          <Hero position={[A - 20, 0, 12.9]} rotationY={0.1} animation="idle" face="worried" />
          <Vox kind="wool" tint="#f4f0e2" position={[A - 19.72, 0.95, 12.68]} size={[0.34, 0.34, 0.03]} rotation={[0, 0.1, 0.05]} />
        </>
      ),
    },
    {
      cue: "7.crowd",
      ...cam.push({ on: [A - 6, 1.2, 10], dist: 15, to: 17, yaw: 22, pitch: 22, fov: 44 }),
      zone: "arena",
      look: "overworld-day",
      note: "The whole field from up in the stands: tents, flags, both banks of bleachers full, and one small pool at the bottom of it.",
      stage: () => (
        <>
        </>
      ),
    },
    {
      cue: "7.pro",
      ...cam.push({ on: [A - 10, 1.35, -2], dist: 3.8, to: 3.0, yaw: 178, pitch: -8, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "A low line-up of the others at the blocks: black and white, tall, goggles, no nerves. The rival is the still one in the middle.",
      stage: () => (
        <>
          <Player who={1} position={[A - 14.3, 0, -4.4]} rotationY={Math.PI} animation="idle" shoes="#1c1c1c" />
          <Rival position={[A - 14.1, 0, -2]} rotationY={Math.PI} animation="idle" shoes="#1c1c1c" />
          <Player who={5} position={[A - 14.3, 0, 0.4]} rotationY={Math.PI} animation="idle" shoes="#1c1c1c" />
          <Player who={11} position={[A - 14.1, 0, 2.6]} rotationY={Math.PI} animation="idle" shoes="#1c1c1c" />
        </>
      ),
    },
    {
      cue: "7.matter",
      ...cam.push({ on: [A - 10, 0.95, -2], dist: 2.2, to: 1.7, yaw: 22, pitch: 10, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "He taps the ring against his other hand: it did not matter that they all looked like professionals, because he had this.",
      stage: () => (
        <>
          <Hero position={[A - 14.1, 0, -2]} rotationY={0.4} animation="hold" face="neutral" ring />
        </>
      ),
    },
    {
      cue: "7.table",
      ...cam.push({ on: [A + 27.5, 1.15, -6], dist: 3.6, to: 2.6, yaw: -100, pitch: 9, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "The cup on a table by the water, at the finish wall: the whole film's want, standing where he will arrive out of breath.",
      stage: () => (
        <>
          <Trophy position={[A + 26.6, 1.09, -6]} scale={1.6} glow={0.5} />
          <Trophy position={[A + 28.4, 1.09, -6]} scale={1.2} glow={0.3} />
        </>
      ),
    },
    {
      cue: "7.big",
      ...cam.push({ on: [A + 18, 2.0, 0], dist: 26, to: 21, yaw: 118, pitch: 14, fov: 44 }),
      zone: "arena",
      look: "overworld-day",
      note: "He sees the pool: not one pool but three, in a row going back, each one bigger than the last. A high, wide reveal.",
      stage: () => (
        <>
          <Hero position={[A - 11.4, 0, 6.6]} rotationY={-1.2} animation="idle" face="surprised" headPitch={-0.1} />
        </>
      ),
    },
    {
      cue: "7.speaker",
      ...cam.push({ on: [A - 12.4, 3.1, 9], dist: 3.2, to: 2.4, yaw: 34, pitch: -14, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "Up at the loudspeaker on its pole, from below: the voice of the day arrives from above everyone's heads.",
      stage: () => (
        <>
          <Vox kind="log" position={[A - 12.4, 1.6, 9]} size={[0.18, 3.2, 0.18]} />
          <Vox kind="stone" tint="#9aa4a8" position={[A - 12.4, 3.25, 9]} size={[0.5, 0.7, 0.5]} />
          <Vox kind="wool" tint="#2b2b2b" position={[A - 12.4, 3.62, 9]} size={[0.6, 0.1, 0.6]} />
        </>
      ),
    },
    {
      cue: "7.three",
      ...cam.truck({ on: [A + 30, 2.2, 0], dist: 30, yaw: 100, pitch: 11, fov: 44, by: [0, 0, -8] }),
      zone: "arena",
      look: "overworld-day",
      note: "Travelling across all three pools, biggest at the back: three sizes of the same idea, and he has entered the smallest.",
      stage: () => (
        <>
          <Hero position={[A - 11.4, 0, 6.6]} rotationY={-1.6} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "7.smallest",
      ...cam.push({ on: [A - 8, 2.5, 14], dist: 9, to: 7.4, yaw: 6, pitch: 4, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "The board that says it plainly: this is pool one, the smallest — with a boy standing under it, doing the arithmetic.",
      stage: () => (
        <>
          <Hero position={[A - 9.6, 0, 12.6]} rotationY={0.2} animation="idle" face="sad" headPitch={0.2} />
        </>
      ),
    },
    {
      cue: "7.most",
      ...cam.push({ on: [A + 27.2, 1.6, -5.4], dist: 4.6, to: 3.6, yaw: -114, pitch: 6, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "The rule on its board next to the cup: MOST WINS TAKES THE TROPHY. No explanation given, because the town never gives one.",
      stage: () => (
        <>
          <SignBoard at={[A + 25.2, 1.2, -8.6]} width={3.4} height={2.0} rotationY={-1.9} lines={[{ text: "MOST WINS", height: 0.34 }, { text: "TAKES THE", height: 0.34 }, { text: "TROPHY", height: 0.42, color: "#a83c2a" }]} />
          <Trophy position={[A + 26.6, 1.09, -6]} scale={1.6} glow={0.5} />
        </>
      ),
    },
    {
      cue: "7.what",
      ...cam.push({ on: [A - 11, 0.7, 2], dist: 9, to: 7.6, yaw: 92, pitch: 8, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "From the far end of the smallest pool: it is still the size of a municipal building, and he is a red dot at the near wall.",
      stage: () => (
        <>
          <Hero position={[A - 11.2, 0, 6.9]} rotationY={1.2} animation="idle" face="surprised" headYaw={-0.4} />
        </>
      ),
    },
    {
      cue: "7.go",
      ...cam.push({ on: [A - 13, 0.5, 0], dist: 5.0, to: 3.8, yaw: 96, pitch: 2, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "Along the line of blocks: five bodies folded over the edge, one red back among them. Three, two, one — and the smoke.",
      stage: () => (
        <>
          <Player who={1} position={[A - 12.9, 0, -4]} rotationY={-2.9} animation="crouch" />
          <Rival position={[A - 12.9, 0, -2]} rotationY={-2.9} animation="crouch" />
          <Hero position={[A - 12.9, 0, 0]} rotationY={-2.9} animation="crouch" face="scared" />
          <Player who={5} position={[A - 12.9, 0, 2]} rotationY={-2.9} animation="crouch" />
          <Splash at={[A - 12.2, 0.3, 0]} size={0.1} count={5} seed={81} />
        </>
      ),
    },
  ],
});

