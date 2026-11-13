import { Glow, cam, storyScene } from "../../engine";
import { Bundle, Hero, SubscribeSign, timing } from "./kit";

const HIDES: [number, number, number] = [17, 0, 7.9];

/** THE BUTTON. One line, to camera, and out. It is a joke, and it is also the cliffhanger. */
export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "The button",
  shots: [
    {
      cue: "18.sub",
      ...cam.push({ on: [17, 0.82, 7.95], dist: 2.5, to: 2.0, yaw: 4, pitch: 4 }),
      impacts: [
        { at: 0.3, amp: 0.07, dur: 0.3 },
        { at: 1.1, amp: 0.1, dur: 0.3 },
      ],
      zone: "town",
      look: "overworld-storm",
      note: "'Subscribe before she finds me': hiding behind the old well, sign held over his head, the worm beside him. The ground jumps twice: her feet.",
      stage: (t) => (
        <>
          <Hero position={HIDES} rotationY={0} animation="cower" face="fear" />
          <SubscribeSign position={[17, 1.32, 8.08]} scale={0.48} tilt={Math.sin(t * 19) * 0.035} />
          <Bundle position={[17.5, 0, 8.05]} rotationY={-0.3} lift={0.8} />
          <Glow position={[16, 5.5, 3]} size={16 + Math.sin(t * 5) * 2} color="#ff7a1e" opacity={0.45} />
        </>
      ),
    },
  ],
});
