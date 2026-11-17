import type { Vec3 } from "../../engine";
import { cam, storyScene } from "../../engine";
import { Classmate, Figure, Icon, EAST, HALL, Hero, ME, NORTH, SOUTH, SPOT, ease, ramp, timing, wordAt } from "./kit";

/**
 * THE WRONG GUESSES, and Jo.
 *
 * From here the power stops being funny in the way it was. He starts using it on people instead of beside them,
 * he gets the reason wrong, and the one person who does not have a clock is the one he never asks about.
 *
 * The power is the SAME look in every shot (`BigNumber`: a number and a clock badge), never given a size by
 * hand except as a function of how close to zero that person is: see `tick()` below, which every scene imports.
 */

const WARN = wordAt("4.warn", "ten");
const FRIDAY = wordAt("4.friday", "Friday");
const JO = wordAt("5.jo", "Jo");
const NOTHING = wordAt("5.why", "Nothing");
const WHAT = wordAt("5.shrug", "looking");
const PLANT = wordAt("6.plant", "why");


/** The power, drawn the way a phone can read it: the NUMBER, white, outlined, with a small clock badge on top. */
const BigNumber: React.FC<{ n: string; over: Vec3; t?: number; tall?: number; size?: number; color?: string; tint?: string; fade?: number; rotationY?: number }> = ({ n, over, t = 1, tall = 1.34, size = 0.5, color, tint, fade = 0, rotationY = 0 }) => {
  const s = (1 - Math.min(1, Math.max(0, fade))) * (0.6 + 0.4 * Math.min(1, Math.max(0, t / 0.25)));
  if (s <= 0.01) return null;
  const at: Vec3 = [over[0], over[1] + tall + 0.42 + size * 0.5, over[2]];
  const c = color ?? tint ?? "#ffffff";
  return (
    <group position={at} rotation={[0, rotationY, 0]} scale={[s, s, s]}>
      <Figure text={n} position={[0, 0, 0]} height={size} depth={0.55} color={c} outline glow={0.5} castShadow={false} />
      <Icon kind="clock" position={[0, size * 0.78, 0]} height={size * 0.44} depth={0.5} color={c} outline glow={0.6} castShadow={false} />
    </group>
  );
};

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Wrong guesses, and Jo",
  shots: [
    {
      // I told a boy he had ten seconds. He told me to get lost. The first time the power is used as a threat.
      cue: "4.warn",
      ...cam.push({ on: SPOT.at(0.6, 1.3, 1.0), dist: 3.4, to: 2.9, yaw: 196, pitch: 3, fov: 44 }),
      zone: "class",
      note: "Two kids standing in the aisle between the desks: the teller leaning in, doing somebody a favour he was not asked for, and the other boy with his bag already on his shoulder telling him where to go. The clock over the second boy is at ten and it stays at ten, because nothing about this is going to set him off.",
      stage: (t) => (
        <>
          <Hero position={[ME[0] - 0.3, 0, ME[2] - 1.3]} rotationY={-2.90} animation="idle" face="brave" />
          <Classmate who={5} position={[ME[0] + 0.7, 0, ME[2] - 2.1]} rotationY={NORTH - 0.5} animation="idle" face="frown" />
          <BigNumber n="10"over={[ME[0] + 0.7, 0, ME[2] - 2.1]} size={0.62} t={t - WARN}   rotationY={3.4208}/>
        </>
      ),
    },
    {
      // Every Friday, two people got a clock I did not expect. Wide: the class, and two clocks he did not predict.
      cue: "4.friday",
      ...cam.push({ on: SPOT.at(0, 1.3, 1.4), dist: 5.0, to: 4.5, yaw: 184, pitch: 10, fov: 48 }),
      zone: "class",
      note: "From the board side, across the faces: two kids he had written off are at two and at three, and the ones he had been watching are all at forty and above. His whole method is wrong in one frame, and he is looking at the two he got wrong, not at the clock.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="uneasy" />
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Classmate who={3} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Classmate who={6} position={SPOT.seat(0, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Classmate who={8} position={SPOT.seat(2, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <BigNumber n="2"over={SPOT.seat(0, 1)} tall={1.34} size={0.62} t={t - FRIDAY}   rotationY={3.2114}/>
          <BigNumber n="2"over={SPOT.seat(2, 1)} tall={1.34} size={0.62} t={t - FRIDAY - 0.2}   rotationY={3.2114}/>
        </>
      ),
    },
    {
      // So I stopped guessing out loud. He shuts up about it, and the picture says what that costs: nobody.
      cue: "4.wrong",
      ...cam.push({ on: SPOT.at(0, 1.5, 0.2), dist: 3.2, to: 5.6, yaw: 176, pitch: -4, fov: 52 }),
      zone: "class",
      note: "Pull back off his face and let the whole class come in around him: everybody heads-down at their desks and the teller sitting perfectly still with his mouth shut. The price of being right about people is that you stop talking to them, and this is the shot where he starts paying it.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="sit" face="calm" />
          {[0, 2].flatMap((col) => [0, 1].map((row) => <Classmate key={`${col}${row}`} who={col * 2 + row + 4} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.35} />))}
          <Classmate who={1} position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.35} />
        </>
      ),
    },
    {
      // Jo sits by the door. Jo does not have a clock. The most important shot in the film: what is NOT there.
      cue: "5.jo",
      ...cam.push({ on: SPOT.at(2.9, 1.2, 1.2), dist: 3.0, to: 2.5, yaw: 214, pitch: 2, fov: 42 }),
      zone: "class",
      note: "Jo at the end of the front row by the door, and above her head there is nothing at all. Every other person in this film has had a clock from the first second; she is the only clean sky in the frame. She is looking at him, and he is looking above her head, which is the whole tragedy and costs no words.",
      stage: (t) => (
        <>
          <Classmate who={1} position={SPOT.seat(1, 0)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.3} />
          <Hero position={ME} rotationY={NORTH} animation="sit" face="uneasy" headPitch={-0.08} />
          <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.5} animation="sit" face="calm" />
          {/* Nothing over her. The absence is drawn: the light where the clock would be. */}
          <pointLight position={[SPOT.seat(2, 0)[0] + 0.15, 2.1, SPOT.seat(2, 0)[2] - 0.35]} color="#ffffff" intensity={2.2 * ease(ramp(t, JO - 0.1, JO + 0.4))} distance={1.4} decay={2} />
        </>
      ),
    },
    {
      // Not a big number. Nothing. I asked her about it. Push in on the empty air over her head.
      cue: "5.why",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 0.15, 1.95, SPOT.seat(2, 0)[2] - 0.35], dist: 2.3, to: 1.9, yaw: 196, pitch: 2, fov: 46 }),
      zone: "class",
      note: "Hard up on the space above Jo's head where every other clock in this film has been. There is nothing there, and the camera stays on it long enough to be uncomfortable, which is what makes the audience ask the question the teller asks.",
      stage: (t) => (
        <>
          <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.5} animation="sit" face="calm" />
          <pointLight position={[SPOT.seat(2, 0)[0] + 0.6, 2.15, SPOT.seat(2, 0)[2] + 0.75]} color="#ffffff" intensity={5 * ease(ramp(t, NOTHING - 0.05, NOTHING + 0.4))} distance={2.2} decay={2} />
        </>
      ),
    },
    {
      // She said, what are you looking at? I said, nothing. She catches him staring: the first person to do that.
      cue: "5.shrug",
      ...cam.push({ on: [SPOT.seat(2, 0)[0] + 0.15, 1.15, SPOT.seat(2, 0)[2] - 0.35], dist: 2.2, to: 1.8, yaw: 178, pitch: 4, fov: 38 }),
      zone: "class",
      note: "Down to her face on the word: she has turned round and caught him looking above her head, and he has had to invent an answer. She is not annoyed, she is interested, which is worse for him. The only line of direct speech in the film belongs to her.",
      stage: (t) => (
        <Classmate who={2} position={[SPOT.seat(2, 0)[0] + 0.15, 0, SPOT.seat(2, 0)[2] - 0.35]} rotationY={NORTH + 0.5} animation="sit" face={t > WHAT ? "grin" : "calm"} headPitch={-0.06} />
      ),
    },
    {
      // A clock tells you when. Nothing tells you why. The limit, named for the second and last time, and he walks
      // away from it: the plant that pays the entire ending.
      cue: "6.plant",
      ...cam.push({ on: HALL.at(0.9, 1.35, 0.9), dist: 3.9, to: 3.3, yaw: -16, pitch: 6, fov: 44 }),
      zone: "hall",
      note: "The hallway, and he is walking away from the camera with his hands in his pockets: the line that names the limit is said over his back, on the move, so it sounds like something he shrugged off. It is the answer to the film, thrown away in a corridor.",
      stage: (t) => {
        const k = ramp(t, 0, 1.8);
        return (
          <>
            <Hero position={[HALL.at(0.2 * k, 0, 0.9 - 1.6 * k)[0], 0, HALL.at(0.2 * k, 0, 0.9 - 1.6 * k)[2]]} rotationY={NORTH} animation="walk" animDistance={1.6 * k} face="calm" />
            <Classmate who={3} position={HALL.at(1.65, 0, 0.5)} rotationY={SOUTH} animation="idle" face="calm" />
            <BigNumber n="40" over={[1.5, 0, -1.2]} size={0.50} t={t - PLANT}  rotationY={-0.3491}/>
          </>
        );
      },
    },
    {
      // I said that out loud, once, and forgot about it. He rounds a corner and it is gone: the plant is planted.
      cue: "6.wave",
      ...cam.push({ on: HALL.at(-0.4, 1.35, 0.1), dist: 5.2, to: 4.4, yaw: -80, pitch: 7, fov: 48 }),
      zone: "hall",
      note: "Along the lockers, the teller still walking, and the boy with the clock is behind him and going out of frame. The line says he forgot the most important thing he ever said, and the picture does the same thing: the clock leaves the frame while he is still talking.",
      stage: (t) => {
        const k = ramp(t, 0, 1.4);
        return (
          <>
            <Hero position={HALL.at(-2.4 + 2.4 * k, 0, 0.3)} rotationY={EAST} animation="walk" animDistance={2.4 * k} face="calm" />
          </>
        );
      },
    },
  ],
});
