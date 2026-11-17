import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Chair, Chest, DAD, DOOR, Dad, GARDEN, ME, Me, Sword, Table, Zombie, fit, timing } from "./kit";

/**
 * THE FILM, in 36 shots. 60.6 seconds, median shot 1.7 s — the reference's rhythm.
 *
 * Front of the door = night (`lantern-night`). Behind it = day (`overworld-day` inside the house too, because
 * the sun comes through the back opening). The cut between those two lights is the story.
 */

const NIGHT = "overworld-night" as const;
const DAY = "overworld-day" as const;
const ROOM = "warm-room" as const;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const clamp01 = (k: number) => Math.max(0, Math.min(1, k));
/** Zero before `a`, one after `b`: for reactions that land on a word. */
const ramp = (t: number, a: number, b: number) => clamp01((t - a) / Math.max(0.01, b - a));

export const scenes = storyScene(timing, {
  id: "scene1",
  title: "The doorway",
  shots: [
    // ---------------------------------------------------------------- 01 hook
    {
      cue: "1.door",
      ...cam.push({ on: [0, 1.2, -0.3], dist: 2.7, to: 2.45, yaw: 178, pitch: 3, fov: 54 }),
      look: ROOM,
      note: "The fact of the film in one frame: his back in the doorway, the night outside, and the house dark behind him.",
      stage: () => <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />,
    },
    {
      cue: "1.why",
      ...cam.push({ on: [-0.62, 1.28, -0.22], dist: 1.9, to: 1.75, yaw: 150, pitch: 4, fov: 38 }),
      look: ROOM,
      note: "His hand on the door frame. Not gripping it hard. Just resting, the way you rest on something you never let go of.",
      stage: () => <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />,
    },
    {
      cue: "1.rule",
      ...cam.push({ on: [0, 1.1, 2.2], dist: 5.4, to: 5.0, yaw: 5, pitch: 5, fov: 52 }),
      look: NIGHT,
      note: "The street, the two torches, the path coming in, and the man standing in the only gap in the wall.",
      stage: (t) => <Zombie position={[0.35, 0, lerp(7.6, 6.2, ramp(t, 0, 1.8))]} rotationY={Math.PI} animation="walk" face="blank" />,
    },
    {
      cue: "1.explain",
      ...cam.push({ on: [0.32, 1.42, 6.0], dist: 2.3, to: 2.15, yaw: 176, pitch: 3, fov: 40 }),
      look: NIGHT,
      note: "Close on the zombie's face as the rule is said out loud, so the audience learns it from the thing it stops.",
      stage: (t) => <Zombie position={[0.35, 0, lerp(6.2, 5.4, ramp(t, 0, 2.6))]} rotationY={Math.PI} animation="walk" face="blank" />,
    },

    // ---------------------------------------------------------------- 02 the first night
    {
      cue: "2.first",
      ...cam.push({ on: [0, 1.15, 3.0], dist: 4.8, to: 4.4, yaw: 10, pitch: 6, fov: 54 }),
      look: NIGHT,
      note: "The zombie on the path with the house behind it: a small green body walking toward a lit doorway.",
      stage: (t) => <Zombie position={[0.3, 0, lerp(5.0, 3.2, ramp(t, 0, 2.0))]} rotationY={Math.PI} animation="walk" face="blank" />,
    },
    {
      cue: "2.saw",
      ...cam.push({ on: [0.28, 1.4, 2.0], dist: 2.1, to: 2.0, yaw: 178, pitch: 2, fov: 38 }),
      look: NIGHT,
      note: "It stops. The head comes up and the body does not. This is the rule happening, in one small motion.",
      stage: () => <Zombie position={[0.28, 0, 1.95]} rotationY={Math.PI} animation="idle" face="surprised" headPitch={0.16} />,
    },
    {
      cue: "2.left",
      ...cam.push({ on: [0.3, 1.35, 2.1], dist: 2.4, to: 2.3, yaw: 186, pitch: 3, fov: 40 }),
      look: NIGHT,
      note: "It turns and walks off into the dark. The joke is that the rule is real, and the story is that he relies on it.",
      stage: (t) => <Zombie position={[lerp(0.3, 1.4, ramp(t, 0, 1.0)), 0, lerp(2.1, 3.3, ramp(t, 0, 1.0))]} rotationY={Math.PI * 0.62} animation="walk" face="blank" />,
    },
    {
      cue: "2.stayed",
      ...cam.push({ on: [0, 1.2, -0.42], dist: 3.0, to: 2.7, yaw: 172, pitch: 3, fov: 48 }),
      look: NIGHT,
      note: "Back to his shoulders, and the torchlight moving on him. He has not moved a centimetre through any of it.",
      stage: () => <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />,
    },

    // ---------------------------------------------------------------- 03 the boy behind him
    {
      cue: "3.grew",
      ...cam.push({ on: [0, 1.2, -0.42], dist: 4.6, to: 5.4, yaw: 176, pitch: 4, fov: 52 }),
      look: ROOM,
      note: "Pull back into the house: his back stays the same size in frame while the room around him opens up.",
      stage: (t) => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[lerp(-1.9, -1.6, ramp(t, 0, 1.0)), 0, -2.9]} rotationY={0.5} animation="idle" face="brave" />
        </>
      ),
    },
    {
      cue: "3.floor",
      ...cam.push({ on: [0, 1.45, -1.2], dist: 4.6, to: 4.2, yaw: 12, pitch: 9, fov: 58 }),
      look: ROOM,
      note: "Up at the new ceiling over his head: the second floor the boy built, and the ladder still leaning under it.",
      stage: () => <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />,
    },
    {
      cue: "3.never",
      ...cam.push({ on: [0, 1.62, -0.5], dist: 2.0, to: 1.9, yaw: 168, pitch: 2, fov: 38 }),
      look: ROOM,
      note: "The back of his head, close. Six years of a father who never turns round is one still, repeated.",
      stage: () => <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />,
    },
    {
      cue: "3.busy",
      ...cam.push({ on: [0, 1.2, -2.4], dist: 2.9, to: 2.7, yaw: 178, pitch: 4, fov: 46 }),
      look: ROOM,
      note: "The boy standing in his own house, talking to his father's back, and getting no answer out of it.",
      stage: () => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[0, 0, -2.75]} rotationY={0} animation="talk" face="frown" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 04 the inventory
    {
      cue: "4.check",
      ...cam.push({ on: [-1.7, 0.6, -1.05], dist: 2.5, to: 2.3, yaw: 148, pitch: 24, fov: 46 }),
      look: ROOM,
      note: "The chest by the door, lid open, and him still in frame behind it. The boy is going through his father's pockets.",
      stage: () => (
        <>
          <Chest position={[-1.7, 0, -1.05]} rotationY={0.5} />
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[-1.5, 0, -1.9]} rotationY={2.4} animation="idle" face="uneasy" headPitch={0.3} />
        </>
      ),
    },
    {
      cue: "4.nothing",
      ...cam.push({ on: [-1.7, 0.52, -1.05], dist: 1.75, to: 1.65, yaw: 150, pitch: 34, fov: 42 }),
      look: ROOM,
      note: "Inside the chest. Black bottom, no items. Nothing has been put in it for six years and nothing is coming out.",
      stage: () => <Chest position={[-1.7, 0, -1.05]} rotationY={0.5} />,
    },
    {
      cue: "4.six",
      ...cam.push({ on: [0.1, 1.0, -0.45], dist: 2.1, to: 2.0, yaw: 214, pitch: 2, fov: 40 }),
      look: ROOM,
      note: "His belt and hands, from the side. The inventory line lands on the only object he has ever carried.",
      stage: () => <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />,
    },
    {
      cue: "4.sword",
      ...cam.push({ on: [0.42, 1.02, -0.5], dist: 1.8, to: 1.7, yaw: 226, pitch: 6, fov: 36 }),
      look: ROOM,
      note: "The wooden sword, pommel first, one hit left. It is the whole of the film's promise in an object.",
      stage: () => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Sword position={[0.42, 0.86, -0.46]} rotationY={0.4} />
        </>
      ),
    },

    // ---------------------------------------------------------------- 05 the answer
    {
      cue: "5.asked",
      ...cam.push({ on: [0, 1.3, -1.9], dist: 3.4, to: 3.2, yaw: 352, pitch: 4, fov: 48 }),
      look: ROOM,
      note: "Over the father's shoulder at the son asking the question. Both faces are almost lost to the dark.",
      stage: () => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[0, 0, -2.4]} rotationY={0} animation="talk" face="brave" />
        </>
      ),
    },
    {
      cue: "5.you",
      ...cam.push({ on: [0, 1.52, -0.42], dist: 2.5, to: 2.35, yaw: 4, pitch: 1, fov: 38 }),
      look: NIGHT,
      note: "His face, lit only by the torches, saying the line that turns the whole film around.",
      stage: () => <Dad position={DAD} rotationY={0} animation="talk" face="bearded" />,
    },
    {
      cue: "5.sixteen",
      ...cam.push({ on: [0, 1.5, -2.4], dist: 2.5, to: 2.35, yaw: 178, pitch: 1, fov: 38 }),
      look: ROOM,
      note: "The son, sixteen and taller than the last time this was decided, saying nobody told him.",
      stage: () => <Me position={[0, 0, -2.4]} rotationY={0} animation="talk" face="sad" />,
    },
    {
      cue: "5.nobody",
      ...cam.push({ on: [0, 1.25, -1.3], dist: 3.4, to: 3.2, yaw: 138, pitch: 6, fov: 50 }),
      look: ROOM,
      note: "Side-on two-shot: the man in the door and the boy behind him, one block apart and six years wide.",
      stage: () => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[0, 0, -2.4]} rotationY={0} animation="idle" face="sad" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 06 the swap
    {
      cue: "6.stand",
      ...cam.push({ on: [0, 1.2, -0.9], dist: 3.6, to: 3.4, yaw: 176, pitch: 4, fov: 50 }),
      look: ROOM,
      note: "The boy walks up and stands in the gap beside his father. Two bodies, one doorway, no room for a monster.",
      stage: (t) => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[lerp(0.55, 0.02, ramp(t, 0, 1.4)), 0, lerp(-2.6, -0.9, ramp(t, 0, 1.4))]} rotationY={0} animation="walk" face="brave" />
        </>
      ),
    },
    {
      cue: "6.hand",
      ...cam.push({ on: [0, 1.3, -0.5], dist: 2.0, to: 1.9, yaw: 200, pitch: 4, fov: 36 }),
      look: ROOM,
      note: "A sixteen-year-old's hand on a father's shoulder. The only physical contact in the film, and it lasts a second.",
      stage: () => (
        <>
          <Dad position={DAD} rotationY={0} animation="idle" face="bearded" />
          <Me position={[-0.06, 0, -0.95]} rotationY={0} animation="idle" face="brave" />
        </>
      ),
    },
    {
      cue: "6.swap",
      ...cam.push({ on: [0, 1.2, -1.0], dist: 3.2, to: 3.05, yaw: 182, pitch: 4, fov: 48 }),
      look: ROOM,
      note: "One step backwards and the two of them have changed places. No magic, no glow: just a boy taking a shift.",
      stage: (t) => (
        <>
          <Dad position={[0, 0, lerp(-0.42, -1.05, ramp(t, 0, 0.9))]} rotationY={0} animation="walk" face="bearded" />
          <Me position={[0, 0, lerp(-0.95, -0.42, ramp(t, 0, 0.9))]} rotationY={0} animation="walk" face="brave" />
        </>
      ),
    },
    {
      cue: "6.freeze",
      ...cam.push({ on: [0, 1.35, -1.4], dist: 3.0, to: 2.8, yaw: 6, pitch: 3, fov: 50 }),
      look: ROOM,
      note: "The father, inside his own house for the first time, with the doorway now filled by his son behind him.",
      stage: () => (
        <>
          <Dad position={[0, 0, -1.5]} rotationY={0} animation="idle" face="scared" />
          <Me position={[0, 0, -0.42]} rotationY={0} animation="idle" face="brave" />
        </>
      ),
    },
    {
      cue: "6.scared",
      ...cam.push({ on: [0, 1.5, -1.45], dist: 2.4, to: 2.3, yaw: 8, pitch: 1, fov: 38 }),
      look: ROOM,
      note: "His face: not relieved. Frightened of the room, because the monsters were never the thing that held him here.",
      stage: () => <Dad position={[0, 0, -1.5]} rotationY={0} animation="idle" face="fear" />,
    },

    // ---------------------------------------------------------------- 07 one step
    {
      cue: "7.said",
      ...cam.push({ on: [0, 1.25, -2.4], dist: 3.4, to: 3.2, yaw: 176, pitch: 4, fov: 50 }),
      look: ROOM,
      note: "The son in the door, the father one step into the house, and the sun coming through the back opening.",
      stage: () => (
        <>
          <Me position={[0, 0, -0.42]} rotationY={0} animation="talk" face="brave" />
          <Dad position={[0, 0, -2.0]} rotationY={0} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "7.step",
      ...cam.push({ on: [0, 0.16, -2.7], dist: 1.8, to: 1.7, yaw: 196, pitch: 12, fov: 40 }),
      look: ROOM,
      note: "A boot on planks. The smallest possible movement, and the one that costs him the most in the whole film.",
      stage: () => <Dad position={[0, 0, -2.7]} rotationY={0} animation="walk" face="uneasy" />,
    },
    {
      cue: "7.another",
      ...cam.push({ on: [0, 1.2, -3.6], dist: 3.2, to: 3.0, yaw: 172, pitch: 4, fov: 52 }),
      look: ROOM,
      note: "Another step, and the dark of the house starts to give way to the daylight at the back of it.",
      stage: () => (
        <>
          <Dad position={[0, 0, -3.9]} rotationY={0} animation="walk" face="uneasy" />
          <Me position={[0, 0, -0.42]} rotationY={0} animation="idle" face="brave" />
        </>
      ),
    },
    {
      cue: "7.saw",
      ...cam.push({ on: [0, 1.4, -4.4], dist: 2.8, to: 2.65, yaw: 150, pitch: 4, fov: 46 }),
      look: DAY,
      note: "He turns around. Over his shoulder, out of the back of his own house, is a garden he has never been in.",
      stage: () => <Dad position={[0, 0, -4.9]} rotationY={Math.PI * 0.85} animation="idle" face="wow" />,
    },
    {
      cue: "7.things",
      ...cam.push({ on: [0.6, 1.1, -7.4], dist: 4.4, to: 4.1, yaw: 186, pitch: 8, fov: 54 }),
      look: DAY,
      note: "The reveal: a pond, an oak, a table, and two chairs. Built by a boy who was waiting for exactly this.",
      stage: () => (
        <>
          <Table position={GARDEN.table} />
          <Chair position={GARDEN.chairA} rotationY={Math.PI / 2} />
          <Chair position={GARDEN.chairB} rotationY={-Math.PI / 2} />
          <Dad position={[0, 0, -6.2]} rotationY={Math.PI * 0.9} animation="idle" face="wow" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 08 the morning
    {
      cue: "8.sun",
      ...cam.push({ on: [GARDEN.chairA[0], 1.15, GARDEN.chairA[2]], dist: 2.9, to: 2.7, yaw: 152, pitch: 5, fov: 46 }),
      look: DAY,
      note: "He sits down in the sun. The one image the whole film was built to arrive at, and it holds for two seconds.",
      stage: () => (
        <>
          <Chair position={GARDEN.chairA} rotationY={Math.PI / 2} />
          <Dad position={[GARDEN.chairA[0], 0, GARDEN.chairA[2]]} rotationY={Math.PI / 2} animation="sit" face="calm" />
          <Table position={GARDEN.table} />
        </>
      ),
    },
    {
      cue: "8.sword",
      ...cam.push({ on: [GARDEN.table[0], 0.6, GARDEN.table[2]], dist: 1.9, to: 1.8, yaw: 196, pitch: 22, fov: 40 }),
      look: DAY,
      note: "The wooden sword laid flat on the table between them, worn pale across the grip he never used.",
      stage: () => (
        <>
          <Table position={GARDEN.table} />
          <Sword position={[GARDEN.table[0] - 0.1, 0.58, GARDEN.table[2]]} rotationY={0.2} />
        </>
      ),
    },
    {
      cue: "8.onehit",
      ...cam.push({ on: [GARDEN.table[0] + 0.18, 0.62, GARDEN.table[2]], dist: 1.5, to: 1.45, yaw: 206, pitch: 30, fov: 36 }),
      look: DAY,
      note: "The blade end, close enough to count the notches. One hit left, after six years of not spending it.",
      stage: () => (
        <>
          <Table position={GARDEN.table} />
          <Sword position={[GARDEN.table[0] - 0.1, 0.58, GARDEN.table[2]]} rotationY={0.2} />
        </>
      ),
    },
    {
      cue: "8.used",
      ...cam.push({ on: [GARDEN.chairA[0] + 0.1, 0.8, GARDEN.chairA[2]], dist: 2.2, to: 2.1, yaw: 150, pitch: 10, fov: 42 }),
      look: DAY,
      note: "His hand on the table beside it. He does not pick it up. He is deciding not to need it.",
      stage: () => (
        <>
          <Chair position={GARDEN.chairA} rotationY={Math.PI / 2} />
          <Dad position={[GARDEN.chairA[0], 0, GARDEN.chairA[2]]} rotationY={Math.PI / 2} animation="sit" face="calm" />
          <Table position={GARDEN.table} />
          <Sword position={[GARDEN.table[0] - 0.1, 0.58, GARDEN.table[2]]} rotationY={0.2} />
        </>
      ),
    },
    {
      cue: "8.now",
      ...cam.push({ on: [GARDEN.chairA[0], 1.25, GARDEN.chairA[2]], dist: 2.2, to: 2.1, yaw: 128, pitch: 3, fov: 40 }),
      look: DAY,
      note: "His face in daylight, and the first thing it does in the film is soften. He says he did not need it after all.",
      stage: () => (
        <>
          <Chair position={GARDEN.chairA} rotationY={Math.PI / 2} />
          <Dad position={[GARDEN.chairA[0], 0, GARDEN.chairA[2]]} rotationY={Math.PI / 2} animation="talk" face="smile" />
        </>
      ),
    },

    // ---------------------------------------------------------------- 09 the ask
    {
      cue: "9.sub",
      ...cam.push({ on: [1.5, 1.0, -7.4], dist: 4.6, to: 4.3, yaw: 168, pitch: 9, fov: 54 }),
      look: DAY,
      note: "Two chairs, two people, one garden. The ask lands on the only thing the film was ever about: taking a shift.",
      stage: () => (
        <>
          <Table position={GARDEN.table} />
          <Chair position={GARDEN.chairA} rotationY={Math.PI / 2} />
          <Chair position={GARDEN.chairB} rotationY={-Math.PI / 2} />
          <Dad position={[GARDEN.chairA[0], 0, GARDEN.chairA[2]]} rotationY={Math.PI / 2} animation="sit" face="smile" />
          <Me position={[GARDEN.chairB[0], 0, GARDEN.chairB[2]]} rotationY={-Math.PI / 2} animation="sit" face="grin" />
        </>
      ),
    },
  ],
});

/** Kept for the camera bible's rule: a shot's look is either side of the door. */
export const LIGHTS = { NIGHT, DAY, ROOM } as const;
export type LightName = keyof typeof LIGHTS;
export type Vec3ish = Vec3;
