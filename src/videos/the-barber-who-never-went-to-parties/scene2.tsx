import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CutPaper, F1_SCALE, F2_SCALE, Friend1, Friend2, Hero, HomeDoor, InHand, Note, PLACE, Person, Plate, add, faceOf, holdUp, home, hop, timing, tw, w } from "./kit";

/**
 * 2. EVERY NIGHT WAS A PARTY. One year earlier. What I was (a kid who cannot cut a sheet of paper along a line),
 * what the town was (the house across the road, every night), and the two who knocked. They are not bullies. They
 * want me to come. "YOU'RE BEING WEIRD AGAIN!" is the line that comes back.
 */

const TABLE = PLACE.table;
const ME_TABLE: Vec3 = add(TABLE, 0, 0, -0.62);
const F1_STEP: Vec3 = add(PLACE.step, -0.36, 0, 0.1);
const F2_STEP: Vec3 = add(PLACE.step, 0.38, 0, -0.25);
const ME_HALL: Vec3 = add(PLACE.hall, 0, 0, -0.5);
const PARTY = PLACE.party;

const Dancers = ({ t }: { t: number }) => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <Person key={i} who={i + 1} top="party" position={[PARTY[0] - 2.4 + i * 1.2, 0.02 + hop(t % 0.5, 0.05 + (i % 2) * 0.12, 0.22, 0.3), PARTY[2] + 1.9 + (i % 2) * 0.9]} rotationY={Math.sin(t * 3 + i) * 0.6} animation="cheer" face="laugh" />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <Note key={i} position={[PARTY[0] - 2 + i * 1.4, 2.3 + (i % 2) * 0.8, PARTY[2] + 1.2]} t={t} phase={i * 0.27} color={["#ff3fa0", "#3fb8ff", "#ffe14a", "#6aff6a"][i]} size={1.7} />
    ))}
  </>
);

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Every night was a party",
  shots: [
    {
      cue: "2.paper",
      ...cam.push({ on: add(TABLE, 0, 1.12, -0.3), dist: 2.5, to: 2.15, yaw: -8, pitch: 13, fov: 40 }),
      zone: "dinner",
      look: "overworld-night",
      note: "The start of the skill: safety scissors, a dotted line, and a cut that leaves it at once.",
      stage: (t) => {
        const p = holdUp(t, 0.42, 0.05);
        p.armR = [-0.82 + Math.sin(t * 9) * 0.07, 0, 0.1 - tw(t, 0.6, 1.9) * 0.3];
        p.armL = [-0.7, 0, -0.25];
        p.head = [0.38, 0, 0];
        p.bodyPitch = 0.12;
        return (
          <>
            <Hero position={ME_TABLE} pose={p} face={t < 1.5 ? "brave" : "uneasy"} gaze={0}>
              <InHand t={t} rate={3} handle="#e8433a" scale={0.75} />
            </Hero>
            <CutPaper position={add(TABLE, 0.05, 0.79, 0.08)} cut={tw(t, 0.3, 1.9)} />
            <Plate lines={["ONE YEAR", "EARLIER"]} position={add(TABLE, 0, 2.32, 0)} width={0.8} k={t < 1.7 ? 1 : 0} color="#ffe14a" />
          </>
        );
      },
    },
    {
      cue: "2.party",
      ...cam.push({ on: [PARTY[0], 3.4, PARTY[2]], dist: 14.5, to: 13, yaw: -8, pitch: -2, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "The town's parties as one place we can come back to: the house across the road, flashing.",
      stage: (t) => <Dancers t={t} />,
    },
    {
      cue: "2.door",
      ...cam.push({ on: home(0, 1.35, 0.3), dist: 3.7, to: 3.2, yaw: 172, pitch: 4, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "From the path, their backs at my door: the same two every night, and me small in the hall.",
      stage: (t) => {
        const knock = w("2.door", "knocked");
        const open = tw(t, knock + 0.45, knock + 0.75);
        return (
          <>
            <HomeDoor open={open} />
            <Friend1 position={[F1_STEP[0], F1_STEP[1] + hop(t, 0.2, 0.12, 0.25) + hop(t, 0.9, 0.12, 0.25), F1_STEP[2]]} animation={t > knock - 0.1 && t < knock + 0.5 ? "press" : "idle"} />
            <Friend2 position={F2_STEP} animation="idle" />
            {open > 0.3 ? <Hero position={ME_HALL} rotationY={Math.PI} face="uneasy" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.friday",
      ...cam.push({ on: faceOf(F1_STEP, F1_SCALE), dist: 1.75, to: 1.5, yaw: -6, pitch: -1, fov: 36 }),
      zone: "home",
      look: "overworld-night",
      note: "The loud friend close, party hat on, the party behind his head: he is not cruel, he is keen.",
      stage: (t) => (
        <>
          <HomeDoor open={1} />
          <Friend1 position={[F1_STEP[0], F1_STEP[1] + hop(t, 0.05, 0.1, 0.22) + hop(t, 0.6, 0.1, 0.22), F1_STEP[2]]} animation="cheer" face="laugh" gaze={0} />
          <Friend2 position={F2_STEP} animation="idle" />
          <Dancers t={t} />
        </>
      ),
    },
    {
      cue: "2.whole",
      ...cam.push({ on: add(PLACE.step, 0, 1.45, 0), dist: 2.7, to: 2.4, yaw: 5, pitch: -3, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "He points back at the house: everybody is there, and the picture shows how near it is.",
      stage: (t) => (
        <>
          <HomeDoor open={1} />
          <Friend1 position={F1_STEP} rotationY={2.5} animation="point" face="grin" headYaw={-2.2} />
          <Friend2 position={F2_STEP} animation="cheer" face="grin" gaze={0} />
          <Dancers t={t} />
        </>
      ),
    },
    {
      cue: "2.who",
      ...cam.push({ on: faceOf(F2_STEP, F2_SCALE), dist: 1.8, to: 1.5, yaw: 8, pitch: -1, fov: 36 }),
      zone: "home",
      look: "overworld-night",
      note: "The big friend's face, with his own neat hair: the head that is wrecked in frame one.",
      stage: (t) => (
        <>
          <HomeDoor open={1} />
          <Friend1 position={F1_STEP} animation="idle" face="grin" />
          <Friend2 position={F2_STEP} animation="shrug" face="laugh" gaze={0} />
          <Dancers t={t} />
        </>
      ),
    },
    {
      cue: "2.weird",
      ...cam.push({ on: faceOf(ME_HALL), dist: 2.1, to: 1.75, yaw: 174, pitch: 1, fov: 36 }),
      zone: "home",
      look: "overworld-night",
      note: "My face as the word WEIRD lands: scissors and paper still in my hand. The word returns later.",
      stage: (t) => (
        <>
          <HomeDoor open={1} />
          <Hero position={ME_HALL} rotationY={Math.PI} pose={holdUp(t, 0.55, -0.3)} face={t < 0.5 ? "uneasy" : "sad"} gaze={0}>
            <InHand rate={0} handle="#e8433a" scale={0.75} />
          </Hero>
        </>
      ),
    },
    {
      cue: "2.weird",
      cut: 0.93,
      ...cam.push({ on: home(0, 1.4, 0.3), dist: 3.9, to: 3.5, yaw: 168, pitch: 4, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "From the path, the door shuts on the two of them: my choice, made without a word, every night.",
      stage: (t) => {
        const shut = tw(t, 0.12, 0.45);
        return (
          <>
            <HomeDoor open={1 - shut} />
            {shut < 0.8 ? <Hero position={ME_HALL} rotationY={Math.PI} face="neutral" gaze={0} /> : null}
            <Friend1 position={F1_STEP} animation={t > 0.42 ? "shrug" : "idle"} face="frown" headYaw={t > 0.5 ? -0.9 : 0} />
            <Friend2 position={F2_STEP} animation="idle" face="neutral" headYaw={t > 0.58 ? 0.9 : 0} />
          </>
        );
      },
    },
  ],
});
