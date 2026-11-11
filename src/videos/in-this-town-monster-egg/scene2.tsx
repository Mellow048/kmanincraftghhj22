import { cam, storyScene } from "../../engine";
import { Eyes, Hero, Kid, NestEggs, PLACE, pop, ramp, timing } from "./kit";

const N = PLACE.nest;

/** THREE MYSTERIES. What nobody knows: where the eggs come from, and who brings them. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Three mysteries",
  shots: [
    {
      cue: "2.shrug",
      ...cam.orbit({ on: [N[0], 1.0, 5.4], dist: 1.9, yaw: -18, yawTo: 14, pitch: -3 }),
      zone: "town",
      look: "overworld-day",
      note: "Back to the teller for the first question. He shrugs, and the nest it is all about sits behind him.",
      stage: () => (
        <>
          <Hero position={[N[0], 0, 5.4]} animation="shrug" face="neutral" />
          <NestEggs />
        </>
      ),
    },
    {
      cue: "2.nest",
      ...cam.push({ on: [N[0], 0.45, N[2]], dist: 8.6, to: 6.0, yaw: 18, pitch: 32, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "'They just appeared': the empty stone nest fills with eggs, one pop at a time, while we sink towards it.",
      stage: (t) => <NestEggs shown={(i) => pop(t, 0.3 + i * 0.3)} />,
    },
    {
      cue: "2.count",
      ...cam.top({ on: [N[0], 0.3, N[2]], height: 10.5, to: 8.8, spin: [-14, 10], fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "'One for every child': straight down on the nest, a ring of kids reaching in, turning like a clock.",
      stage: () => (
        <>
          <NestEggs />
          {[-1.3, 0, 1.3].map((x, i) => (
            <group key={i}>
              <Kid who={i} position={[N[0] + x, 0, N[2] - 3.3]} rotationY={0} animation="reach" face="grin" />
              <Kid who={i + 3} position={[N[0] + x, 0, N[2] + 3.3]} rotationY={Math.PI} animation="reach" face="grin" />
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "2.night",
      ...cam.push({ on: [N[0] + 0.3, 1.5, N[2] - 1], dist: 8.2, to: 5.6, yaw: -10, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-night",
      note: "The plant for the ending: the nest at night, empty, and two eyes that open in the dark behind the stones.",
      stage: (t) => {
        const open = ramp(t, 1.5, 1.62) * (1 - ramp(t, 2.42, 2.48) + ramp(t, 2.56, 2.62));
        return <Eyes position={[N[0] + 1.25, 3.0, N[2] - 4.9]} open={open} />;
      },
    },
  ],
});
