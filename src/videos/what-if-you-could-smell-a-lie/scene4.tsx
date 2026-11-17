import { cam, storyScene } from "../../engine";
import { A, Friend, Hero, timing, fit } from "./kit";

/**
 * THE FRIEND. Four shots, eight seconds.
 *
 * The one person who tells him the limit he refuses to hear, and then the one thing the power cannot read:
 * a friend who simply leaves.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The friend",
  shots: [
    {
      cue: "9.friend",
      ...cam.push(fit({ on: A("hall", 0, 1.25, 0.1), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "hall",
      note: "By the lockers, the friend says the true thing: it tells you it is a lie, never why.",
      stage: () => (
        <>
          <Friend position={A("hall", 0.6, 0, 0.1)} rotationY={0} animation="talk" face="uneasy" />
          <Hero position={A("hall", -0.7, 0, 0.5)} rotationY={0.4} animation="idle" face="frown" />
        </>
      ),
    },
    {
      cue: "9.why",
      ...cam.push(fit({ on: A("hall", 0.6, 1.35, 0.1), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "hall",
      note: "The friend's face, straight down the lens of the moment. No smoke anywhere near him.",
      stage: () => <Friend position={A("hall", 0.6, 0, 0.1)} rotationY={0} animation="talk" face="calm" />,
    },
    {
      cue: "9.sat",
      ...cam.push(fit({ on: A("hall", -0.5, 1.2, 0.4), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "hall",
      note: "The friend goes. He walks out of the frame and the picture keeps him leaving.",
      stage: () => (
        <>
          <Friend position={A("hall", 1.6, 0, -0.3)} rotationY={Math.PI / 2} animation="walk" face="calm" />
          <Hero position={A("hall", -0.7, 0, 0.5)} rotationY={0.4} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "9.gone",
      ...cam.push(fit({ on: A("hall", -0.6, 1.3, 0.4), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "hall",
      note: "Him alone in the corridor with nothing to smell. The power is useless on silence.",
      stage: () => <Hero position={A("hall", -0.6, 0, 0.4)} rotationY={0.2} animation="idle" face="calm" />,
    },
  ],
});
