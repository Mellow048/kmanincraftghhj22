import { cam, storyScene } from "../../engine";
import { A, Bell, Bed, Chair, Hero, Plate, Receipt, Stall, Stick, Table, Trader, face, look, timing } from "./kit";

/**
 * 68 shots, one per line of narration, and the camera goes to the noun.
 *
 * When the voice says plate, the shot is the plate. Arm, arm. Floor, floor. The teller's face is the punctuation,
 * not the subject; it appears when the sentence has no noun worth pointing at, or when the joke needs a straight
 * face to land.
 */

const H = (x: number, y: number, z: number) => A("hut", x, y, z);
const HEAD = A("hut", 1.0, 1.45, 1.0);
const ARM = A("hut", 0.66, 1.05, 1.0);
const LEGS = A("hut", 1.0, 0.36, 1.0);
const MOUTH = A("hut", 1.0, 1.33, 1.0);
const PLATE = A("hut", 0, 0.86, 0.6);
const TABLE = A("hut", 0, 0.8, 0.6);
const FLOOR = A("hut", 0.4, 0.06, -0.6);
const CHAIR = A("hut", -2.0, 0.5, 0.4);
const BED = A("hut", -2.9, 0.5, -2.6);
const STICK = A("hut", 3.6, 1.1, 3.2);
const T_HEAD = A("hut", -0.6, 1.5, -0.2);
const BELL = A("yard", 0, 2.0, 31.2);
const STALL = A("market", 0, 1.1, 62);
const IN_HUT = (
  <>
    <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />
    <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="idle" face="smug" />
  </>
);

export const scenes = storyScene(timing, {
  id: "scene1",
  title: "I traded my bed for a plate of stew",
  shots: [
    // 1 — hook: the trade itself
    {
      cue: "1.hook",
      ...cam.push(look(PLATE, 1.15, 24, 16, 30)),
      look: "warm-room",
      note: "The plate of stew, dead centre, before anything else in the film.",
      stage: () => (
        <>
          {IN_HUT}
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} stew />
        </>
      ),
    },
    {
      cue: "1.cold",
      ...cam.push(look(PLATE, 0.72, 20, 26, 28)),
      look: "warm-room",
      note: "Closer on the stew: no steam, no shine. Cold is a thing you can see.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} stew />
        </>
      ),
    },
    {
      cue: "1.fine",
      ...cam.push(face(HEAD, 2.1, 8, 2, 38)),
      look: "warm-room",
      note: "His face, entirely untroubled, for one second and no longer.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "1.plate",
      ...cam.push(look(TABLE, 1.0, 30, 22, 30)),
      look: "warm-room",
      note: "The empty tabletop where a plate should be. Nothing where the plate was.",
      stage: () => <Table at={[0, 0, 0.6]} />,
    },
    {
      cue: "1.rule",
      ...cam.push(look(BELL, 1.9, 30, 12, 36)),
      look: "overworld-day",
      note: "The bell in the yard, hanging over the whole film's rule.",
      stage: () => <Bell at={[0, 1.6, 31.2]} />,
    },
    {
      cue: "1.both",
      ...cam.push(face(T_HEAD, 1.9, 10, 2, 40)),
      look: "warm-room",
      note: "The trader, smug, holding a plate that is now legally his.",
      stage: () => (
        <>
          <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="idle" face="smug" />
          <Plate at={[-0.6, 1.0, -0.1]} empty />
        </>
      ),
    },
    {
      cue: "1.bell",
      ...cam.orbit({ on: BELL, dist: 1.7, yaw: 20, yawTo: -12, pitchTo: 18, fov: 36 }),
      look: "overworld-day",
      note: "A slow arc around the bell: the only thing in the village that is not owned.",
      stage: () => <Bell at={[0, 1.6, 31.2]} />,
    },

    // 2 — the stick and the receipt, planted
    {
      cue: "2.stick",
      ...cam.push(look(STICK, 0.95, 34, 18, 30)),
      look: "warm-room",
      note: "The stick leaning by the door. Boring, on purpose, for exactly two seconds.",
      stage: () => <Stick at={[3.6, 0, 3.2]} />,
    },
    {
      cue: "2.pocket",
      ...cam.push({ on: A("hut", 1.0, 0.95, 1.0), dist: 0.85, to: 0.7, yaw: 14, pitch: -26, fov: 32 }),
      look: "warm-room",
      note: "Looking down at the pocket: the receipt goes in, and the film moves on.",
      stage: () => (
        <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" headPitch={0.5} />
      ),
    },
    {
      cue: "2.night",
      ...cam.push({ on: BED, dist: 2.6, to: 2.2, yaw: 34, pitch: 14, fov: 40 }),
      look: "overworld-night",
      note: "The trader asleep in the bed the narrator no longer owns.",
      stage: () => (
        <>
          <Bed at={[-2.9, 0, -2.6]} />
          <Trader position={A("hut", -2.9, 0.55, -2.6)} rotationY={0} animation="sleep" face="sleepy" />
        </>
      ),
    },
    {
      cue: "2.floor",
      ...cam.push(look(FLOOR, 1.9, 30, 30, 34)),
      look: "overworld-night",
      note: "The floor, from standing height, which is where it all starts.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={1.6} animation="sleep" face="sleepy" />,
    },
    {
      cue: "2.hisfloor",
      ...cam.push(look(FLOOR, 0.9, 40, 34, 28)),
      look: "overworld-night",
      note: "One plank, close. It is his plank now: the camera has to make that land.",
      stage: () => null,
    },
    {
      cue: "2.morning",
      ...cam.push(face(T_HEAD, 2.0, 8, 2, 40)),
      look: "warm-room",
      note: "The trader in the morning, plate in hand, no explanation offered.",
      stage: () => (
        <>
          <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="idle" face="smug" />
          <Plate at={[-0.6, 1.0, -0.1]} empty />
        </>
      ),
    },
    {
      cue: "2.table",
      ...cam.pan({ from: H(1.6, 1.5, 2.4), on: PLATE, onTo: TABLE, fov: 38 }),
      look: "warm-room",
      note: "Follow the plate out of the room; the table comes with it, and so does the room.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} empty />
        </>
      ),
    },

    // 3 — the ladder: floor, chair, standing
    {
      cue: "3.why",
      ...cam.top({ on: PLATE, height: 2.4, to: 2.0, spin: [0, 0.4], fov: 40 }),
      look: "warm-room",
      note: "Straight down on the plate on the table: touching is the whole law.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} empty />
        </>
      ),
    },
    {
      cue: "3.tuesday",
      ...cam.push({ on: TABLE, dist: 3.0, to: 2.6, yaw: 26, pitch: 12, fov: 42 }),
      look: "warm-room",
      note: "The table, and the trader standing where the table used to be mine.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Trader position={A("hut", 0, 0, 2.0)} rotationY={0} animation="idle" face="smug" />
        </>
      ),
    },
    {
      cue: "3.floorplan",
      ...cam.push(look(FLOOR, 1.5, 28, 28, 32)),
      look: "warm-room",
      note: "The floor again, but this time it is the thing he now owns.",
      stage: () => <Hero position={A("hut", 1.2, 0, 1.2)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "3.chair",
      ...cam.push(look(CHAIR, 1.2, 26, 16, 32)),
      look: "warm-room",
      note: "The chair: the last furniture that has not been spoken about yet.",
      stage: () => <Chair at={[-2.0, 0, 0.4]} />,
    },
    {
      cue: "3.stood",
      ...cam.push({ on: A("hut", -2.0, 1.2, 0.4), dist: 2.4, to: 2.0, yaw: 34, pitch: -8, fov: 40 }),
      look: "warm-room",
      note: "A low angle up at him standing on the chair, which is a joke and a scale clue.",
      stage: () => (
        <>
          <Chair at={[-2.0, 0, 0.4]} />
          <Hero position={A("hut", -2.0, 0.55, 0.4)} rotationY={0.5} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "3.wednesday",
      ...cam.push(look(A("hut", -2.0, 0.06, 0.4), 1.6, 30, 24, 34)),
      look: "warm-room",
      note: "The chair is gone by Wednesday. The floor where it stood is not.",
      stage: () => null,
    },
    {
      cue: "3.because",
      ...cam.push({ on: LEGS, dist: 1.3, to: 1.05, yaw: 20, pitch: -12, fov: 34 }),
      look: "warm-room",
      note: "His feet on the floor: the floor owns them now, and the shot says so.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },

    // 4 — arm and legs
    {
      cue: "4.hours",
      ...cam.push({ on: HEAD, dist: 3.0, to: 2.5, yaw: 22, pitch: 6, fov: 44 }),
      look: "warm-room",
      note: "Nine hours of standing, in one shot, with a face that has not moved.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "4.thursday",
      ...cam.push(look(ARM, 0.8, 26, 6, 30)),
      look: "warm-room",
      note: "The arm, filling the frame. The camera is on it because the sentence is.",
      stage: () => (
        <>
          <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />
          <Trader position={A("hut", 0.1, 0, 1.1)} rotationY={-0.9} animation="idle" face="smug" arms="hold" />
        </>
      ),
    },
    {
      cue: "4.armwhy",
      ...cam.push(look(ARM, 0.62, 40, 4, 26)),
      look: "warm-room",
      note: "Tighter: the hand that passed the plate, still attached, for now.",
      stage: () => (
        <>
          <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />
          <Plate at={[0.66, 1.02, 1.0]} empty />
        </>
      ),
    },
    {
      cue: "4.inspect",
      ...cam.push({ on: A("hut", 0.4, 1.25, 0.6), dist: 1.4, to: 1.1, yaw: 18, pitch: 4, fov: 32 }),
      look: "warm-room",
      note: "The trader holding the arm up to the light, like a carpenter with a plank.",
      stage: () => (
        <>
          <Trader position={A("hut", -0.2, 0, -0.2)} rotationY={0} animation="hold" face="smug" />
          <Hero position={A("hut", 0.55, 0, 0.35)} rotationY={-1.4} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "4.goodwork",
      ...cam.push(face(T_HEAD, 1.7, 12, 2, 38)),
      look: "warm-room",
      note: "His face saying it was good work: the only compliment in the film.",
      stage: () => <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="talk" face="smug" />,
    },
    {
      cue: "4.friday",
      ...cam.push({ on: LEGS, dist: 1.4, to: 1.1, yaw: 16, pitch: -6, fov: 34 }),
      look: "warm-room",
      note: "The legs, next: the camera is getting lower as he loses height.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "4.legswhy",
      ...cam.truck({ on: LEGS, by: [0.5, 0, 0], dist: 1.5, yaw: 20, pitch: -4, fov: 34 }),
      look: "warm-room",
      note: "A sideways slide on the legs that walked him to the door.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="walk" face="blank" />,
    },

    // 5 — carried, mouth, market
    {
      cue: "5.carried",
      ...cam.push({ on: A("hut", 0, 1.4, 0.4), dist: 3.4, to: 2.9, yaw: 30, pitch: 10, fov: 44 }),
      look: "warm-room",
      note: "Carried through his own door, by the man who took his legs.",
      stage: () => (
        <>
          <Trader position={A("hut", -0.2, 0, 1.0)} rotationY={0.2} animation="hold" face="smug" />
          <Hero position={A("hut", -0.15, 1.15, 1.0)} rotationY={-1.5} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "5.duty",
      ...cam.push(face(T_HEAD, 1.6, 14, 0, 38)),
      look: "warm-room",
      note: "He says it is his job now, with the flatness of a man reading a rota.",
      stage: () => <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="talk" face="smug" />,
    },
    {
      cue: "5.saturday",
      ...cam.push(look(MOUTH, 0.65, 10, 0, 28)),
      look: "warm-room",
      note: "The mouth, close, in the middle of a sentence it no longer owns.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="talk" face="blank" />,
    },
    {
      cue: "5.mouthwhy",
      ...cam.push(face(HEAD, 1.6, 6, 0, 36)),
      look: "warm-room",
      note: "The same face, still blank, while the voice explains the loss.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "5.talks",
      ...cam.push({ on: STALL, dist: 3.6, to: 3.1, yaw: 24, pitch: 10, fov: 44 }),
      look: "overworld-day",
      note: "The market stall, and the trader doing the narrator's talking.",
      stage: () => (
        <>
          <Stall at={[0, 0, 62]} />
          <Trader position={A("market", -0.2, 0, 63.4)} rotationY={0} animation="talk" face="smug" />
          <Hero position={A("market", 0.9, 0, 63.4)} rotationY={0} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "5.prices",
      ...cam.push(look(A("market", 0.6, 0.9, 62.2), 0.9, 26, 12, 30)),
      look: "overworld-day",
      note: "The goods on the counter: my prices, said in somebody else's voice.",
      stage: () => <Stall at={[0, 0, 62]} />,
    },
    {
      cue: "5.nothing",
      ...cam.push(look(A("hut", 1.0, 0.95, 1.0), 0.85, 10, -4, 30)),
      look: "warm-room",
      note: "One hand, one receipt: everything he still owns, in one frame.",
      stage: () => (
        <>
          <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />
          <Receipt at={[0.95, 1.16, 1.06]} />
        </>
      ),
    },

    // 6 — the pivot
    {
      cue: "6.pivot",
      ...cam.top({ on: PLATE, height: 2.2, to: 1.9, spin: [0.3, 0], fov: 40 }),
      look: "warm-room",
      note: "Top-down on the plate again: the pattern is the shape of the whole film.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} empty />
        </>
      ),
    },
    {
      cue: "6.pivot2",
      ...cam.push(face(HEAD, 2.2, 6, 2, 38)),
      look: "warm-room",
      note: "The pattern stated to his own face, so the rule lands as a sentence.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "6.how",
      ...cam.push(look(ARM, 0.7, 30, 8, 28)),
      look: "warm-room",
      note: "The arm again, because the question is about the arm.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "6.simply",
      ...cam.push({ on: STICK, dist: 2.0, to: 1.5, yaw: 30, pitch: 16, fov: 38 }),
      look: "warm-room",
      note: "The stick by the door, promoted from props to plot.",
      stage: () => <Stick at={[3.6, 0, 3.2]} />,
    },
    {
      cue: "6.stick2",
      ...cam.push(look(STICK, 0.7, 20, 10, 26)),
      look: "warm-room",
      note: "The stick, dead centre, the cheapest object in the village.",
      stage: () => <Stick at={[3.6, 0, 3.2]} />,
    },
    {
      cue: "6.neverheld",
      ...cam.push({ on: PLATE, dist: 1.5, to: 1.1, yaw: 34, pitch: 12, fov: 32 }),
      look: "warm-room",
      note: "Stick against plate: it pushed it, and that is all it ever did.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} empty />
          <Stick at={[-0.55, 0.86, 0.6]} held />
        </>
      ),
    },
    {
      cue: "6.receipt",
      ...cam.push(look(A("hut", 1.0, 1.14, 1.06), 0.55, 8, 0, 24)),
      look: "warm-room",
      note: "The receipt, readable: no refunds, binding, and never touched.",
      stage: () => (
        <Receipt at={[1.0, 1.14, 1.06]} tilt />
      ),
    },
    {
      cue: "6.trousers",
      ...cam.push({ on: A("hut", 1.0, 0.9, 1.0), dist: 0.8, to: 0.65, yaw: 8, pitch: -30, fov: 30 }),
      look: "warm-room",
      note: "Down at the pocket again: the joke is the other trousers.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" headPitch={0.6} />,
    },

    // 7 — the loophole
    {
      cue: "7.bellfoot",
      ...cam.push({ on: BELL, dist: 2.0, to: 1.5, yaw: 24, pitch: -16, fov: 38 }),
      look: "overworld-day",
      note: "Low angle up at the bell, rung by a foot because the arm is elsewhere.",
      stage: () => <Bell at={[0, 1.6, 31.2]} />,
    },
    {
      cue: "7.refuse",
      ...cam.push(face(T_HEAD, 1.6, 12, 0, 38)),
      look: "overworld-day",
      note: "The rule about villagers, said over the villager's own face.",
      stage: () => <Trader position={A("yard", 0, 0, 30.6)} rotationY={0} animation="idle" face="smug" />,
    },
    {
      cue: "7.offer",
      ...cam.push({ on: A("yard", 0.3, 1.2, 30.8), dist: 1.5, to: 1.15, yaw: 18, pitch: 4, fov: 36 }),
      look: "overworld-day",
      note: "The receipt offered across the yard, held by a hand that is not his.",
      stage: () => (
        <>
          <Trader position={A("yard", -0.4, 0, 30.6)} rotationY={0} animation="idle" face="smug" />
          <Receipt at={[0.3, 1.2, 30.8]} tilt />
        </>
      ),
    },
    {
      cue: "7.terms",
      ...cam.push(look(A("yard", 0.3, 1.2, 30.8), 0.5, 6, 0, 22)),
      look: "overworld-day",
      note: "The terms on the paper, filling the frame: everything that touched it.",
      stage: () => <Receipt at={[0.3, 1.2, 30.8]} tilt />,
    },
    {
      cue: "7.read",
      ...cam.push(face(A("yard", -0.4, 1.5, 30.6), 1.5, 10, 0, 36)),
      look: "overworld-day",
      note: "He reads it. He cannot read. The face does not change.",
      stage: () => <Trader position={A("yard", -0.4, 0, 30.6)} rotationY={0} animation="idle" face="smug" headPitch={0.4} />,
    },
    {
      cue: "7.accepted",
      ...cam.push(look(A("yard", 0, 1.15, 30.8), 0.9, 12, 2, 30)),
      look: "overworld-day",
      note: "Two hands, one receipt: binding is binding, for both of us.",
      stage: () => <Receipt at={[0, 1.15, 30.8]} tilt />,
    },
    {
      cue: "7.witharm",
      ...cam.push(look(A("yard", 0.5, 1.1, 30.8), 0.8, 34, 4, 28)),
      look: "overworld-day",
      note: "The arm that used to be his, holding the paper that used to be his.",
      stage: () => (
        <>
          <Trader position={A("yard", -0.2, 0, 30.6)} rotationY={0} animation="hold" face="smug" />
          <Receipt at={[0.5, 1.1, 30.8]} />
        </>
      ),
    },

    // 8 — the win, object by object
    {
      cue: "8.bed",
      ...cam.push({ on: BED, dist: 2.4, to: 2.0, yaw: 30, pitch: 14, fov: 40 }),
      look: "warm-room",
      note: "The bed, empty, back where it was: the film pays out one noun at a time.",
      stage: () => <Bed at={[-2.9, 0, -2.6]} />,
    },
    {
      cue: "8.table2",
      ...cam.push(look(TABLE, 2.0, 24, 14, 38)),
      look: "warm-room",
      note: "The table, back, with nobody standing where it used to be.",
      stage: () => <Table at={[0, 0, 0.6]} />,
    },
    {
      cue: "8.floor2",
      ...cam.push(look(FLOOR, 1.6, 26, 26, 34)),
      look: "warm-room",
      note: "The floor, his again, though the camera still shoots it low.",
      stage: () => null,
    },
    {
      cue: "8.chair2",
      ...cam.push(look(CHAIR, 1.4, 24, 16, 32)),
      look: "warm-room",
      note: "The chair, upright, four legs on a floor he owns.",
      stage: () => <Chair at={[-2.0, 0, 0.4]} />,
    },
    {
      cue: "8.arm2",
      ...cam.push(look(ARM, 0.62, 28, 6, 28)),
      look: "warm-room",
      note: "His arm, back on his body, and the camera still does not trust it.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "8.legs2",
      ...cam.push(look(LEGS, 1.1, 20, -2, 32)),
      look: "warm-room",
      note: "Both legs, back together, the left one a step behind.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "8.mouth2",
      ...cam.push(face(HEAD, 1.8, 8, 2, 38)),
      look: "warm-room",
      note: "The mouth is back, so the face gets the shot: thank you, flat.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="talk" face="blank" />,
    },

    // 9 — the button
    {
      cue: "9.price",
      ...cam.push(look(A("hut", 0.4, 0.9, 0.6), 0.9, 24, 16, 30)),
      look: "warm-room",
      note: "The receipt next to the plate: one of them was free.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} stew />
          <Receipt at={[0.5, 0.92, 0.6]} tilt />
        </>
      ),
    },
    {
      cue: "9.tuesday2",
      ...cam.push({ on: A("hut", 0.4, 1.3, 0.9), dist: 3.8, to: 3.2, yaw: 28, pitch: 10, fov: 46 }),
      look: "warm-room",
      note: "The whole hut, his again, and it looks exactly the same as before.",
      stage: () => (
        <>
          <Bed at={[-2.9, 0, -2.6]} />
          <Table at={[0, 0, 0.6]} />
          <Chair at={[-2.0, 0, 0.4]} />
          <Hero position={A("hut", 1.2, 0, 1.4)} rotationY={0} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "9.but",
      ...cam.push(look(A("hut", 1.0, 1.14, 1.06), 0.5, 8, 0, 22)),
      look: "warm-room",
      note: "The receipt again, and this time it is the threat, not the tool.",
      stage: () => <Receipt at={[1.0, 1.14, 1.06]} tilt />,
    },
    {
      cue: "9.debt",
      ...cam.push(face(T_HEAD, 1.7, 12, 0, 38)),
      look: "warm-room",
      note: "The trader with the paper, and the debt that came attached to it.",
      stage: () => (
        <>
          <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="idle" face="smug" />
          <Receipt at={[-0.6, 1.1, -0.1]} tilt />
        </>
      ),
    },
    {
      cue: "9.four",
      ...cam.push(look(A("hut", -0.6, 1.1, -0.1), 0.55, 10, 0, 24)),
      look: "warm-room",
      note: "Push into the paper where the number would be: four hundred dollars.",
      stage: () => <Receipt at={[-0.6, 1.1, -0.1]} tilt />,
    },
    {
      cue: "9.before",
      ...cam.push(face(HEAD, 1.9, 6, 3, 38)),
      look: "warm-room",
      note: "His face, owing money he owed before any of this started.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "9.best",
      ...cam.push(face(T_HEAD, 1.5, 14, 0, 36)),
      look: "warm-room",
      note: "The last compliment in the film, from the man who owns everything.",
      stage: () => <Trader position={A("hut", -0.6, 0, -0.2)} rotationY={0} animation="talk" face="grin" />,
    },

    // 10 — the end
    {
      cue: "10.dinner",
      ...cam.push({ on: A("hut", 0.2, 0.8, 0.9), dist: 3.0, to: 2.6, yaw: 24, pitch: 6, fov: 44 }),
      look: "warm-room",
      note: "Dinner in his own house: the table is there and he is eating on the floor.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} />
          <Hero position={A("hut", 0.9, 0, 1.2)} rotationY={0} animation="sit" face="blank" />
        </>
      ),
    },
    {
      cue: "10.onfloor",
      ...cam.push(look(FLOOR, 1.4, 30, 24, 32)),
      look: "warm-room",
      note: "The floor, with a fork on it: the plate is still his.",
      stage: () => <Hero position={A("hut", 1.0, 0, 0.8)} rotationY={0} animation="sit" face="blank" />,
    },
    {
      cue: "10.stillcold",
      ...cam.push(look(PLATE, 0.7, 18, 28, 26)),
      look: "warm-room",
      note: "The stew, cold in the first second and cold in the last one.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} stew />
        </>
      ),
    },
    {
      cue: "10.again",
      ...cam.push(face(HEAD, 2.0, 8, 2, 40)),
      look: "warm-room",
      note: "He would do it again, and the face says he means it.",
      stage: () => <Hero position={A("hut", 1.0, 0, 1.0)} rotationY={0} animation="idle" face="blank" />,
    },
    {
      cue: "10.sub",
      ...cam.push({ on: A("hut", 0.3, 1.2, 1.0), dist: 4.2, to: 3.7, yaw: 20, pitch: 8, fov: 48 }),
      look: "warm-room",
      note: "Both of them, one hut, one plate: the ask lands on the picture.",
      stage: () => (
        <>
          <Table at={[0, 0, 0.6]} />
          <Plate at={[0, 0.86, 0.6]} />
          <Hero position={A("hut", 1.2, 0, 1.4)} rotationY={0} animation="idle" face="blank" />
          <Trader position={A("hut", -0.9, 0, 0.9)} rotationY={1.2} animation="idle" face="smug" />
        </>
      ),
    },
  ],
});
