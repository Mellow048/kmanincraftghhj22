import { storyScene } from "../../engine";
import { EmptyBerth, Leaving, Painting, Payment, WashedUp } from "./dock";
import { timing } from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1", title: "One fish", shots: [
    {
      cue: "1.pay", zone: "harbor", look: "overworld-day", fov: 42, ease: "linear",
      from: [5.54,1.89,3.31],
      to: [4.97,1.68,3.21],
      target: [1.68,.94,.68],
      targetTo: [1.74,.98,.82],
      note: "Start at the rail with the cod in hand and the dolphin already rising; show the snout taking the fish.",
      stage: (t)=><Payment t={t}/>,
    },
    {
      cue: "1.empty", zone: "harbor", look: "overworld-day", fov: 42, ease: "linear",
      from: [-.16,5.08,-3.03],
      to: [-2.18,4.57,-2.57],
      target: [-2.76,.41,1.69],
      targetTo: [-3.37,.42,2.14],
      note: "High travelling view over the dock and the kid to the berth with only a severed rope in it.",
      stage: (t)=><EmptyBerth t={t}/>,
    },
    {
      cue: "1.half", zone: "harbor", look: "overworld-day", fov: 36,
      from: [1.47,1.81,2.13],
      to: [1.24,1.78,1.93],
      target: [.17,.90,.36],
      targetTo: [.12,1.02,.25],
      note: "The kid lifts the dripping red piece and stops on the exposed snapped end and the old white paint.",
      stage: (t)=><WashedUp t={t}/>,
    },
    {
      cue: "1.stripe", zone: "harbor", look: "overworld-sunset", fov: 42, ease: "linear",
      from: [-2.78,2.62,-.66],
      to: [-2.52,2.41,-.82],
      target: [-.01,1.19,-1.61],
      targetTo: [.02,1.14,-1.59],
      note: "A warmer look back. He painted the white zigzag himself while Dad held the full oar across the bench.",
      stage: (t)=><Painting t={t}/>,
    },
    {
      cue: "1.lunch", zone: "harbor", look: "overworld-sunset", fov: 39, ease: "linear",
      from: [4.09,1.15,-1.97],
      to: [3.54,1.26,-1.87],
      target: [1.35,1.08,.43],
      targetTo: [1.43,.99,.52],
      note: "Low cross angle on Dad's familiar handout while his son watches him, the model for the bargain.",
      stage: (t)=><Payment t={t} memory/>,
    },
    {
      cue: "1.guess", zone: "harbor", look: "overworld-day", fov: 43, ease: "linear",
      from: [-.28,3.15,-1.62],
      to: [-.17,3.18,-1.28],
      target: [1.50,.48,1.33],
      targetTo: [1.68,.40,1.60],
      note: "From behind his shoulder, follow the dolphin's wake as he takes the painted half into the waiting boat.",
      stage: (t)=><Leaving t={t}/>,
    },
  ],
});
