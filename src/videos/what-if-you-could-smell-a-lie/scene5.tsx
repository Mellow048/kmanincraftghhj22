import { cam, storyScene } from "../../engine";
import { A, Card, Classmate, CookieStack, Hero, Mum, NORTH, SPOT, Toast, timing, fit } from "./kit";

/**
 * THE EDGE AND THE ACT. Six shots.
 *
 * His birthday: every mouth in the room burning at once. He reads it as an attack, stands on a chair and says
 * it out loud. This is the biggest and quietest beat in the film.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The birthday",
  shots: [
    {
      cue: "10.bday",
      ...cam.push(fit({ on: SPOT.at(0, 1.0, 0.4), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "class",
      look: "overworld-sunset",
      note: "The whole class standing round one desk with a cake on it, him in the middle of them.",
      stage: () => (
        <>
          <Hero position={SPOT.at(0, 0, 1.4)} rotationY={0} animation="idle" face="uneasy" />
          {[[-2.2, 0.6], [2.0, 0.5], [-1.4, -0.9], [1.6, -1.1]].map(([x, z], i) => (
            <Classmate key={i} who={i + 2} position={SPOT.at(x, 0, z)} rotationY={Math.PI} animation="idle" face="smile" />
          ))}
          <CookieStack position={SPOT.at(0, 0.9, 0.1)} count={13} />
        </>
      ),
    },
    {
      cue: "10.cake",
      ...cam.push(fit({ on: SPOT.at(0, 1.0, 0.1), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      look: "overworld-sunset",
      note: "The cake alone, thirteen candles' worth of it, and the first wisp coming off it.",
      stage: () => (
        <>
          <CookieStack position={SPOT.at(0, 0.9, 0.1)} count={13} />
          <Toast at={SPOT.at(0, 0.1, 0.2)} n={14} seed={6} />
        </>
      ),
    },
    {
      cue: "10.smile",
      ...cam.push(fit({ on: SPOT.at(0, 1.35, 0.6), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      look: "overworld-sunset",
      note: "Four faces in a row, all smiling, all of them smoking. The gags of act one turned into a horror.",
      stage: () => (
        <>
          {[[-1.5, 0.2], [0.0, -0.2], [1.5, 0.1]].map(([x, z], i) => (
            <Classmate key={i} who={i + 4} position={SPOT.at(x, 0, z)} rotationY={Math.PI} animation="idle" face="smile" />
          ))}
          <Toast at={SPOT.at(-1.5, 0, 0.2)} n={8} seed={1} />
          <Toast at={SPOT.at(0, 0, -0.2)} n={8} seed={3} />
          <Toast at={SPOT.at(1.5, 0, 0.1)} n={8} seed={9} />
        </>
      ),
    },
    {
      cue: "11.stand",
      ...cam.push(fit({ on: SPOT.at(0, 1.5, 0.9), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      look: "overworld-sunset",
      note: "He gets up on a chair, so the lens is under him looking slightly up. Small kid, tall frame.",
      stage: () => (
        <>
          <Hero position={SPOT.at(0, 0.46, 0.9)} rotationY={0} animation="idle" face="brave" />
          <Classmate who={7} position={SPOT.at(-1.6, 0, 0.2)} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "11.say",
      ...cam.push(fit({ on: SPOT.at(0, 1.9, 0.9), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      look: "overworld-sunset",
      note: "His face, up there, saying it to the whole room.",
      stage: () => <Hero position={SPOT.at(0, 0.46, 0.9)} rotationY={0} animation="talk" face="frown" />,
    },
    {
      cue: "11.still",
      ...cam.push(fit({ on: SPOT.at(0.4, 0.95, 0.2), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "class",
      look: "overworld-sunset",
      note: "The room, from above his shoulder: everybody stopped, and one card face down on the desk.",
      stage: () => (
        <>
          <Hero position={SPOT.at(0, 0.46, 0.9)} rotationY={0} animation="idle" face="fear" />
          {[[-1.8, 0.0], [1.4, -0.4]].map(([x, z], i) => (
            <Classmate key={i} who={i + 5} position={SPOT.at(x, 0, z)} rotationY={Math.PI} animation="idle" face="uneasy" />
          ))}
          <Card position={SPOT.at(0.4, 0.78, 0.1)} rotation={[-1.2, 0, 0]} text="" />
        </>
      ),
    },
  ],
});
