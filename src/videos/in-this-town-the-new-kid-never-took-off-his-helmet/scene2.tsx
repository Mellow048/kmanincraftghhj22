import { MinecraftAvatar, cam, storyScene } from "../../engine";
import {
  ADULT, Bag, Bread, Bubble, Classmates, DAY, EAST, HOME, Hero, NORTH, NewKid, Player, Posters, ROBE, SPOT, TABLE, Villager, WALL, WEST, YARD, at, ease, faceOf,
  kidHead, pop, ramp, timing, wordAt,
} from "./kit";
import { HF, HS, KF, KS } from "./scene1";

/** The bags of the ones who are gone stay under their desks. */
const Bags: React.FC<{ n: number }> = ({ n }) => (
  <>
    {(
      [
        [2, 0, "#c8402f"],
        [2, 1, "#3f6fb8"],
        [1, 0, "#e8a21c"],
        [1, 1, "#6a4aa8"],
      ] as Array<[number, number, string]>
    )
      .slice(0, n)
      .map(([c, r, color]) => (
        <Bag key={`${c}${r}`} position={at(SPOT.seat(c, r), 0.05, 0, -0.42)} color={color} rotationY={0.3} />
      ))}
  </>
);

/**
 * ACT 2. Kids go missing, one desk at a time, and every one of them had been mean to the new kid. Nobody listens.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Missing",
  shots: [
    {
      cue: "2.first",
      ...cam.push({ on: SPOT.desk(2, 0), dist: 2.7, to: 1.9, yaw: 160, pitch: 20, fov: 40 }),
      zone: "class",
      look: DAY,
      note: "An empty desk at the front, the chair pushed in. The kids behind it look at it and not at the board.",
      stage: () => (
        <>
          <Classmates gone={1} look={SPOT.desk(2, 0)} />
          <Bags n={1} />
          <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.3} />
          <Hero position={HS} rotationY={NORTH} animation="sit" face="uneasy" />
        </>
      ),
    },
    {
      cue: "2.desk",
      ...cam.push({ on: at(SPOT.seat(2, 0), 0.05, 0.22, -0.42), dist: 1.7, to: 1.25, yaw: 200, pitch: 5, fov: 40 }),
      zone: "class",
      look: DAY,
      note: "The lens on the floor: his bag is still under the desk. A kid who runs away takes his bag.",
      stage: () => (
        <>
          <Classmates gone={1} />
          <Bags n={1} />
        </>
      ),
    },
    {
      cue: "2.ran",
      ...cam.orbit({ on: at(YARD, 0, 1.35, -3.3), dist: 5.4, distTo: 4.8, yaw: -24, yawTo: 8, pitch: 4, fov: 42 }),
      zone: "yard",
      look: DAY,
      note: "Two grown-ups on the school step, shrugging it off between themselves. One poster on the wall behind them.",
      stage: (t) => (
        <>
          <Villager position={at(YARD, -0.65, 0.2, -3.6)} rotationY={0.5} scale={ADULT} robe={ROBE.brown} hmm={1} />
          <Villager position={at(YARD, 0.65, 0.2, -3.5)} rotationY={-0.6} scale={ADULT} robe={ROBE.white} turn={Math.sin(t * 2.4) * 0.4} nod={0.1} phase={1.4} />
          <Posters n={1} />
        </>
      ),
    },
    {
      cue: "2.more",
      ...cam.push({ on: at(SPOT.desk(2, 1), 0, 0, 0.2), dist: 5.0, to: 4.4, yaw: 180, pitch: 27, fov: 46 }),
      zone: "class",
      look: DAY,
      note: "Down the east column from the front: two empty desks in a row now, two bags, and the one kid left in the column behind them.",
      stage: () => (
        <>
          <Classmates gone={2} />
          <Bags n={2} />
        </>
      ),
    },
    {
      cue: "2.more",
      cut: wordAt("2.more", "friday") - 0.3,
      ...cam.push({ on: at(SPOT.desk(1, 1), -0.5, 0, 0.2), dist: 5.0, to: 4.3, yaw: 180, pitch: 27, fov: 46 }),
      zone: "class",
      look: DAY,
      note: "Down the middle column: two more empty desks, and behind them the teller, with the helmet beside him looking straight ahead.",
      stage: () => (
        <>
          <Classmates gone={4} />
          <Bags n={4} />
          <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.2} />
          <Hero position={HS} rotationY={NORTH} animation="sit" face="fear" />
        </>
      ),
    },
    {
      cue: "2.posters",
      ...cam.truck({ on: at(WALL, -5.2, 1.7, 0.14), dist: 5.2, yaw: 30, pitch: 2, fov: 44, by: [7.5, 0, 0] }),
      zone: "yard",
      look: DAY,
      note: "Along the school wall: MISSING, MISSING, MISSING. The yard behind the lens is empty; a ball nobody came back for.",
      stage: () => <Posters n={7} />,
    },
    {
      cue: "2.noticed",
      ...cam.push({ on: HF, dist: 1.5, to: 1.3, yaw: 172, pitch: 2, fov: 36 }),
      zone: "class",
      look: DAY,
      note: "The teller, close. His eyes go sideways, to the desk next to his.",
      stage: () => (
        <>
          <Hero position={HS} rotationY={NORTH} animation="sit" face="uneasy" lookAt={at(KF, 0.9, 0, -0.9)} />
          <Classmates gone={4} />
        </>
      ),
    },
    {
      cue: "2.mean",
      ...cam.push({ on: KF, dist: 3.2, to: 2.5, yaw: 180, pitch: 10, fov: 38 }),
      zone: "class",
      look: DAY,
      note: "The helmet, dead ahead, and the lens going in. Nobody sits in front of him any more.",
      stage: (t) => (
        <>
          <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.15} weightShift={0} />
          <Classmates gone={4} hide={["0,0", "0,1"]} look={t < 1.0 ? KF : undefined} />
        </>
      ),
    },
    {
      cue: "2.three",
      ...cam.push({ on: at(TABLE, 0.3, 1.0, -0.4), dist: 3.3, to: 3.0, yaw: -26, pitch: 10, fov: 42 }),
      zone: "yard",
      look: DAY,
      note: "What the teller remembers, one: the blond one snatches his roll and throws it over the yard.",
      stage: (t) => {
        const k = ramp(t, 0.25, 0.85);
        return (
          <>
            <NewKid position={at(TABLE, 0, 0, -0.75)} animation="sit" />
            <Player who={8} scale={0.8} position={at(TABLE, 1.0, 0, 0.1)} rotationY={-2.2} animation={k > 0 ? "push" : "reach"} face="laugh" />
            <Bread position={at(TABLE, 0.3 + 3.4 * k, 0.78 + 2.2 * k * (1 - k) + 0.3 * k, -0.3 + 2.0 * k)} rotation={[t * 9, t * 5, 0]} />
          </>
        );
      },
    },
    {
      cue: "2.three",
      cut: wordAt("2.three", "knocked") - 0.32,
      ...cam.push({ on: kidHead(at(YARD, -2.8, -0.15, 0.6)), dist: 2.9, to: 2.5, yaw: 8, pitch: 2, fov: 40 }),
      zone: "yard",
      look: DAY,
      note: "Two: the one in orange knocks on the helmet like a door. Tok, tok.",
      stage: (t) => {
        const knock = Math.max(0, Math.sin(t * 16));
        return (
          <>
            <NewKid position={at(YARD, -3, 0, 0.6)} animation="idle" headRoll={-0.05 * knock} />
            <Player who={10} scale={0.8} position={at(YARD, -2.38 - 0.04 * knock, 0, 0.72)} rotationY={WEST} animation="point" face="grin" />
          </>
        );
      },
    },
    {
      cue: "2.three",
      cut: wordAt("2.three", "tried") - 0.32,
      ...cam.push({ on: at(YARD, -3, 1.1, 0.9), dist: 3.6, to: 3.2, yaw: 84, pitch: 3, fov: 42 }),
      zone: "yard",
      look: DAY,
      note: "Three, from the side: the red-haired one has both hands on the helmet and pulls. The new kid holds it down with everything he has.",
      stage: (t) => (
        <>
          <NewKid position={at(YARD, -3, 0, 0.6 + Math.sin(t * 13) * 0.02)} animation="scared" lift={0.015 + Math.abs(Math.sin(t * 13)) * 0.02} />
          <Player who={6} scale={0.8} position={at(YARD, -3, 0, 1.22 + Math.sin(t * 13) * 0.03)} rotationY={NORTH} animation="lift" face="grin" />
        </>
      ),
    },
    {
      cue: "2.mom",
      ...cam.push({ on: at(HOME, -1.3, 1.3, 1.4), dist: 4.2, to: 3.6, yaw: 24, pitch: 7, fov: 42 }),
      zone: "yard",
      look: DAY,
      note: "At his own door, over his shoulder, his mother on the step above him: he tells his mother, pointing back at the school. She shakes her head at him.",
      stage: (t) => {
        const no = wordAt("2.mom", "do") - 0.1;
        return (
          <>
            <MinecraftAvatar position={at(HOME, -1.3, 0.2, 0.75)} skin="#dba47c" hair="#3a2415" colors={{ torso: "#b98ad8", arms: "#b98ad8", legs: "#5a4a7a" }} face={t > no ? "frown" : "neutral"} animation={t > no ? "talk" : "idle"} headYaw={t > no ? Math.sin((t - no) * 9) * 0.35 : 0} headPitch={0.25} blink />
            <Hero position={at(HOME, -1.3, 0, 2.3)} rotationY={NORTH} animation={t > no ? "idle" : "talk"} arms={t > no ? undefined : "point"} face={t > no ? "frown" : "uneasy"} headPitch={-0.3} />
            <Posters n={7} />
          </>
        );
      },
    },
    {
      cue: "2.sit",
      ...cam.push({ on: at(HS, 0, 1.15, 0), dist: 3.5, to: 3.0, yaw: 180, pitch: 8, fov: 40 }),
      zone: "class",
      look: DAY,
      note: "Over the teacher's shoulder, down the column of empty desks: the teller on his feet, pointing at the next desk. 'Sit down.' He sits.",
      stage: (t) => {
        const sit = wordAt("2.sit", "sit") + 0.15;
        return (
          <>
            <Villager position={at(HS, 0.55, 0, -2.75)} scale={ADULT} robe={ROBE.white} lookAt={HF} nod={t > sit - 0.3 ? 0.3 : 0} />
            {t < sit ? (
              <Hero position={at(HS, 0, 0, 0.3)} rotationY={NORTH} animation="talk" arms="point" face="uneasy" />
            ) : (
              <Hero position={HS} rotationY={NORTH} animation="sit" face="frown" headPitch={0.3} />
            )}
            <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.2} />
            <Classmates gone={4} />
            <Bags n={4} />
          </>
        );
      },
    },
  ],
});
void EAST;
void Bubble;
void pop;
void faceOf;
void ease;
