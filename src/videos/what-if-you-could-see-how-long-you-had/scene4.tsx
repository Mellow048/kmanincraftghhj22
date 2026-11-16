import { cam, storyScene } from "../../engine";
import { Classmate, HALL, Hero, ME, NORTH, Overhead, SPOT, SubscribeSign, WEST, ease, ramp, timing, wordAt } from "./kit";

/**
 * THE USE, AND THE REVEAL.
 *
 * Ten seconds to find Jo, and the whole film's answer arrives in the last thirty seconds: her clock was never off.
 * It was counting on him. Every shot here is a cut on the noun of a very short line, because 11.run to 14.sub is
 * 24 seconds and thirteen shots.
 */

const RUN = wordAt("11.run", "ran");
const JO3 = wordAt("12.jo3", "Jo");
const ONE = wordAt("12.one", "one");
const NOT = wordAt("13.not", "understood");
const ON = wordAt("13.on", "counting");
const WHY = wordAt("13.why", "because");
const ME_ = wordAt("13.me", "alone");
const TALK = wordAt("14.talk", "talked");
const OUT = wordAt("14.out", "out");
const SCHOOL = wordAt("14.school", "turned");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The use, the reveal",
  shots: [
    {
      // Ten seconds. I ran. He runs at the lens down the hallway: the fastest shot in the film.
      cue: "11.run",
      ...cam.push({ on: HALL.at(0.6, 1.1, 0.3), dist: 4.6, to: 3.4, yaw: -96, pitch: 2, fov: 54 }),
      zone: "hall",
      note: "The hallway with him coming at us flat out: arms pumping, bag off his shoulder, his own clock still in the top of the frame because it is following him. The film has been slow for forty seconds and now it is a chase, which is the change of gear part 1 makes at 40%.",
      stage: (t) => {
        const k = ramp(t, 0, 1.3);
        return (
          <>
            <Hero position={[3.2 - 3.0 * k, 0, 0.3]} rotationY={WEST} animation="run" animDistance={3.0 * k} face="fear" />
            <Overhead over={[3.2 - 3.0 * k, 0, 0.3]} kind="clock" size={0.88} t={t - RUN} steady rotationY={Math.PI} />
          </>
        );
      },
    },
    {
      // Jo was by the door, where she always is. And she had a clock. The empty space over her head, filled at last.
      cue: "12.jo3",
      ...cam.push({ on: SPOT.at(2.6, 1.5, 1.0), dist: 3.4, to: 2.8, yaw: 206, pitch: 2, fov: 44 }),
      zone: "class",
      note: "Jo by the door, and over her head - where there has been nothing for the whole film, in every shot she was in - there is now a clock. The camera has to hold her and not the teller, because the audience has been waiting for this frame since 0:30.",
      stage: (t) => {
        const k = ramp(t, 0, 1.2);
        return (
          <>
            <Hero position={[SPOT.seat(2, 0)[0] + 1.6 - 0.5 * k, 0, SPOT.seat(2, 0)[2] + 1.4]} rotationY={NORTH} animation="idle" face="fear" />
            <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.4} animation="idle" face="calm" />
            <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={0.75} t={t - JO3} steady rotationY={Math.PI} />
          </>
        );
      },
    },
    {
      // It said one. Hard on the clock, at one: the smallest number in the film, on the calmest person in it.
      cue: "12.one",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 0.15, 1.95, SPOT.seat(2, 0)[2] - 0.35], dist: 1.4, to: 1.2, yaw: 176, pitch: 0, fov: 34 }),
      zone: "class",
      note: "Nothing but Jo's clock at one. It is the mirror of 10.ten - same framing, same size, same emptiness around it - and the audience has already been taught how to read that shot, which is why it lands in half a second.",
      stage: (t) => (
        <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={1.00} t={t - ONE} steady rotationY={Math.PI} />
      ),
    },
    {
      // Then I understood. It was never counting down. Round on his face as it arrives.
      cue: "13.not",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 1.1, 1.3, SPOT.seat(2, 0)[2] + 1.1], dist: 2.2, to: 1.8, yaw: 188, pitch: 2, fov: 38 }),
      zone: "class",
      note: "His face from the front as the idea lands: not fear any more, something worse and quieter, which is the face of somebody finding out he has been the problem. This is the shot the thumbnail is made from.",
      stage: (t) => (
        <Hero position={[SPOT.seat(2, 0)[0] + 1.1, 0, SPOT.seat(2, 0)[2] + 1.1]} rotationY={NORTH - 0.2} animation="idle" face={t > NOT ? "ouch" : "fear"} />
      ),
    },
    {
      // It was counting on me. The line the thumbnail sells, and a hard cut to her clock at one again.
      cue: "13.on",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 0.15, 1.95, SPOT.seat(2, 0)[2] - 0.35], dist: 1.6, to: 1.3, yaw: 152, pitch: -4, fov: 36 }),
      zone: "class",
      note: "Back to Jo's clock at one, from a new side and lower: the number that has not moved for a week, over the head of the person he has walked past every day. The line explains the whole film and the picture is the same picture, which is how a reveal is supposed to work.",
      stage: () => <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={1.00} t={0.2} steady rotationY={Math.PI} />,
    },
    {
      // She was at one because of me. For a week of not saying anything. The two of them in one frame at last.
      cue: "13.why",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 1.1, 1.25, SPOT.seat(2, 0)[2] + 0.4], dist: 3.0, to: 2.5, yaw: 208, pitch: 4, fov: 46 }),
      zone: "class",
      note: "Both of them in one frame, side on, the clock still at one between them: the first time in the film the teller and Jo are the same picture. The distance between them is the thing he has to cross, and the lens leaves it in the frame.",
      stage: (t) => (
        <>
          <Hero position={[SPOT.seat(2, 0)[0] + 1.6, 0, SPOT.seat(2, 0)[2] + 1.2]} rotationY={NORTH + 0.9} animation="idle" face="ouch" />
          <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.4} animation="idle" face="calm" />
          <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={0.75} t={t - WHY} steady rotationY={Math.PI} />
        </>
      ),
    },
    {
      // The power never showed me when. It showed me who was alone. The line that turns the title upside down.
      cue: "13.me",
      ...cam.orbit({ on: [SPOT.seat(2, 0)[0] + 0.9, 1.3, SPOT.seat(2, 0)[2] + 0.5], dist: 3.3, yaw: 200, yawTo: 218, pitch: 8, fov: 48 }),
      zone: "class",
      note: "Swing slowly round the two of them while the film says what the power actually was: not a warning system, a loneliness detector. The curve of the orbit keeps the clock in frame the whole way, because the clock is the sentence.",
      stage: () => (
        <>
          <Hero position={[SPOT.seat(2, 0)[0] + 1.6, 0, SPOT.seat(2, 0)[2] + 1.2]} rotationY={NORTH + 0.9} animation="idle" face="calm" />
          <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.4} animation="idle" face="calm" />
          <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={0.75} t={0.2} steady rotationY={Math.PI} />
        </>
      ),
    },
    {
      // So I did the one thing I had not done all week. I talked to her. He crosses the floor.
      cue: "14.talk",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 0.9, 1.1, SPOT.seat(2, 0)[2] + 0.5], dist: 3.6, to: 3.0, yaw: 186, pitch: 6, fov: 46 }),
      zone: "class",
      note: "From behind Jo's shoulder: the teller walking across the last two metres to her, and he is not looking at the clock. That is the action of the film - a boy choosing to look at a face instead of a number - and it is one small walk.",
      stage: (t) => {
        const k = ramp(t, 0, 1.5);
        return (
          <>
            <Hero position={[SPOT.seat(2, 0)[0] + 1.6 - 1.0 * k, 0, SPOT.seat(2, 0)[2] + 1.2 - 0.9 * k]} rotationY={NORTH + 0.5} animation="walk" animDistance={1.35 * k} face="calm" />
            <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.4} animation="idle" face="calm" />
            <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={0.75} t={t - TALK} steady rotationY={Math.PI} />
          </>
        );
      },
    },
    {
      // Her clock went out. And the space above her head is empty again: the payoff of the plant at 0:30.
      cue: "14.out",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 0.15, 1.6, SPOT.seat(2, 0)[2] - 0.35], dist: 2.2, to: 1.8, yaw: 190, pitch: -2, fov: 40 }),
      zone: "class",
      note: "Up on the space over Jo's head and there is nothing in it, and this time it is the good news: the same empty frame as 5.why, with the opposite meaning. Two shots in one film that look identical and mean the reverse of each other is the cheapest, best trick in the format.",
      stage: (t) => {
        const fade = 1 - ease(ramp(t, OUT - 0.15, OUT + 0.25));
        return (
          <>
            <Hero position={[SPOT.seat(2, 0)[0] + 0.75, 0, SPOT.seat(2, 0)[2] + 0.45]} rotationY={NORTH + 0.4} animation="idle" face="smile" />
            <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH - 0.2} animation="idle" face="grin" />
            <Overhead over={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} kind="clock" size={0.75} t={0.2} fade={fade} steady rotationY={Math.PI} />
          </>
        );
      },
    },
    {
      // Then every clock in the school turned round, and every one was counting. The cliffhanger.
      cue: "14.school",
      ...cam.orbit({ on: SPOT.at(0.4, 1.5, 0.4), dist: 4.6, yaw: 184, yawTo: 224, pitch: 14, fov: 50 }),
      zone: "class",
      note: "The whole class again, and this time every clock on every head swings round to face him - and every one of them is small. Forty kids at four and at three, all counting, all looking at the teller. It is the same wide frame the film opened on, turned against him.",
      stage: (t) => {
        const turn = ease(ramp(t, SCHOOL - 0.1, SCHOOL + 0.6));
        const seats = [0, 2].flatMap((col) => [0, 1, 2].map((row) => [col, row] as [number, number]));
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="sit" face="fear" headPitch={-0.15} />
            <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
            {seats.map(([col, row], i) => (
              <Classmate key={`${col}${row}`} who={col * 3 + row + 2} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
            ))}
            {seats.map(([col, row], i) => (
              <Overhead
                key={`c${col}${row}`}
                over={SPOT.seat(col, row)}
                kind="clock"
                size={0.34 + (i % 3) * 0.06}
                t={t - SCHOOL - Math.min(turn, 0.9) * 0.05 * i}
                steady
                rotationY={(1 - turn) * Math.PI}
              />
            ))}
          </>
        );
      },
    },
    {
      // Subscribe, and I will tell you what they were counting down to. The last picture: the sign, and a clock.
      cue: "14.sub",
      ...cam.push({ on: SPOT.at(0.4, 1.8, 2.6), dist: 4.0, to: 4.6, yaw: 178, pitch: -2, fov: 50 }),
      zone: "class",
      note: "Back up and away off the whole room: forty clocks counting and the red sign coming up over the board. The film ends on the teller's back, in a room full of clocks, with the question asked - which is a reason to subscribe, not a request for one.",
      stage: (t) => {
        const seats = [0, 2].flatMap((col) => [0, 1, 2].map((row) => [col, row] as [number, number]));
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="sit" face="fear" headPitch={-0.1} />
            <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
            {seats.map(([col, row], i) => (
              <Classmate key={`${col}${row}`} who={col * 3 + row + 2} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
            ))}
            {seats.map(([col, row], i) => (
              <Overhead key={`c${col}${row}`} over={SPOT.seat(col, row)} kind="clock" size={0.34 + (i % 3) * 0.06} t={t} steady rotationY={0} />
            ))}
            <SubscribeSign position={SPOT.at(0, 3.0, -3.3)} rotationY={0} scale={1.1} />
          </>
        );
      },
    },
  ],
});
