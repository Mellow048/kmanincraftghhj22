import { cam, storyScene } from "../../engine";
import { Class, FACE, HEART, Heart, Hero, JO, Jo, LEO, Leo, ME, MIA, Mia, NORTH, SPOT, TALL, ease, jolt, ramp, timing, wordAt } from "./kit";

const MIAS = wordAt("5.mia", "mia's");
const WINDOW = wordAt("5.small", "window");
const FOR_ME = wordAt("5.forme", "me");
const KNOW = wordAt("5.forme", "know");

/**
 * THE WISH. The one heart he wants to read, and it tells him nothing: it is always small. Three pictures: her, where
 * she sits (and who sits two desks behind her), and him deciding. In the third the answer to the whole film floats
 * right behind his head, and he looks the other way.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The wish",
  shots: [
    {
      cue: "5.mia",
      ...cam.push({ on: SPOT.at(-2.4, 1.22, -0.4), dist: 2.75, to: 2.35, yaw: 140, pitch: 3, fov: 38 }),
      handheld: 0.012,
      zone: "class",
      note: "Mia, alone in the frame, the window light behind her and one small heart over her head. She writes, and on her name she looks up and smiles at the board, not at him. The first sight of her: violet, long fair hair.",
      stage: (t) => {
        const up = ease(ramp(t, MIAS - 0.25, MIAS + 0.1));
        return (
          <>
            <Class without={["mia", "me", "jo"]} />
            <Mia position={MIA} rotationY={NORTH} animation="sit" face={up > 0.5 ? "smile" : "calm"} headPitch={0.32 - 0.36 * up} headYaw={0.3 - 0.42 * up} headRoll={0.1 * up} gaze={0} />
            <Heart over={MIA} tall={TALL.seated} size={HEART.small} yaw={140} />
          </>
        );
      },
    },
    {
      cue: "5.small",
      ...cam.push({ on: SPOT.at(-2.5, 1.2, 0.8), dist: 4.5, to: 4.0, yaw: 155, pitch: 9, fov: 48 }),
      handheld: 0.01,
      zone: "class",
      note: "Her column of desks, from the board: Mia in front, turning to the window, and her heart the same small size as ever. Two desks behind her sits the tallest kid in the class, in green, looking at the back of her head. Nobody says his name for a minute.",
      stage: (t) => {
        const look = ease(ramp(t, WINDOW - 0.1, WINDOW + 0.4));
        return (
          <>
            <Class without={["mia", "leo", "me", "jo"]} />
            <Mia position={MIA} rotationY={NORTH} animation="sit" face="smile" headPitch={0.28 - 0.3 * look} headYaw={-0.2 + 0.5 * look} headRoll={0.08 * look} gaze={0} />
            <Heart over={MIA} tall={TALL.seated} size={HEART.small} yaw={155} />
            <Leo position={LEO} rotationY={NORTH} animation="sit" face="smile" headPitch={0.04} headYaw={Math.sin(t * 1.3) * 0.06} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "5.forme",
      ...cam.push({ on: SPOT.at(0.05, 1.27, 1.9), dist: 3.3, to: 2.95, yaw: 200, pitch: -2, fov: 44 }),
      handheld: 0.012,
      impacts: [{ at: KNOW, amp: 0.03, dur: 0.3 }],
      zone: "class",
      note: "His face, turned to the window where she is, asking. Behind him sits a girl with two bunches, smiling at the back of his head, and over her floats a heart five times the size of Mia's. He does not turn round. On 'I had to know' he nods, hard.",
      stage: (t) => {
        const sure = ramp(t, KNOW - 0.05, KNOW + 0.05);
        return (
          <>
            <Class without={["me", "jo"]} />
            <Hero position={ME} rotationY={NORTH} animation="sit" face={sure > 0.5 ? "brave" : t > FOR_ME ? "grin" : "wow"} lookAt={sure > 0.5 ? undefined : FACE.mia} headYaw={0.5} headPitch={0.5 * Math.abs(jolt(t, KNOW, 1))} headRoll={0.12 * (1 - sure)} gaze={0} />
            <Jo position={JO} rotationY={NORTH} animation="sit" face="smile" lookAt={[ME[0], 1.2, ME[2]]} gaze={0} />
            <Heart over={JO} tall={TALL.seated} size={HEART.jo} yaw={200} />
          </>
        );
      },
    },
  ],
});
