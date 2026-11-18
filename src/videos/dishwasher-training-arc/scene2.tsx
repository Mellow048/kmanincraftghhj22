import { defineScene } from "../../engine";
import { DoorFriends, useFrameAt } from "./performance";
import { CUT } from "./marks";

export const scene2 = defineScene({
  id: "scene2",
  title: "The invitation",
  duration: 5.1,
  shots: [
    {
      at: 0.0,
      dur: 3.3666666666666667,
      from: [0.839, 1.72, 1.37],
      to: [0.89, 1.84, 1.41],
      target: [1.128, 1.151, -1.918],
      targetTo: [1.143, 1.191, -1.947],
      fov: 47,
      zone: "home+porch",
      look: "warm-room",
      ease: "linear",
      note: "Cross the house to the open threshold: warm refusal on one side, two party friends outside. Keep the short one below the tall one.",
    },
    {
      at: 3.3666666666666667,
      dur: 1.7333333333333334,
      from: [1.143,1.61,-2.955],
      to: [1.205,1.635,-2.825],
      target: [1.804,1.216,-0.858],
      targetTo: [1.884,1.214,-0.815],
      fov: 47,
      zone: "home+porch+reverse",
      look: "warm-room",
      ease: "linear",
      note: "From the party side of the door, catch his unamused refusal and the pivot back to work. The bright room is his choice.",
    },
  ],
  Component: () => <DoorFriends f={useFrameAt(CUT.door)} />,
});
