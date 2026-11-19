import { storyScene } from "../../engine";
import { cue, timing, w } from "./kit";
import { SlotPerformance } from "./clue";

export const scene4=storyScene(timing,{
  id:"scene4",title:"The crooked stripe",shots:[
    {
      cue:"4.red",zone:"wreck",look:"overworld-day",fov:38,ease:"linear",
      from: w(4.34,1.63,-2.69),
      to: w(3.97,1.50,-2.59),
      target: w(1.93,.64,-.22),
      targetTo: w(1.91,.82,-.41),
      note:"Surface again beside the tied skiff. The red handle noses out of a black gap before he names the color.",
      stage:(t)=><SlotPerformance s={cue("4.red").start+t} mode="red" />,
    },
    {
      cue:"4.match",zone:"wreck",look:"overworld-day",fov:37,ease:"linear",
      from:w(3.19,4.18,.52),
      to:w(2.91,3.92,.47),
      target:w(2.07,.54,-.065),
      targetTo:w(2.00,.58,-.053),
      note:"A high comparison keeps both matching cream bends in one view: one over the cabin gap, one on the boat seat.",
      stage:(t)=><SlotPerformance s={cue("4.match").start+t} mode="match" />,
    },
    {
      cue:"4.hand",zone:"wreck",look:"overworld-day",fov:33,ease:"linear",
      from:w(2.92,1.61,-1.35),
      to:w(2.70,1.38,-1.27),
      target:w(1.79,.817,-.41),
      targetTo:w(1.82,.811,-.40),
      note:"Rake along the shaft, then see it travel with the hand wrapped around it. The wreck is inhabited.",
      stage:(t)=><SlotPerformance s={cue("4.hand").start+t} mode="hand" />,
    },
    {
      cue:"4.dad",zone:"wreck",look:"overworld-day",fov:34,
      from:w(3.05,.89,-.196),
      to:w(2.81,.92,-.28),
      target:w(1.07,.893,-.48),
      targetTo:w(1.10,.908,-.46),
      note:"The kid's eye level through the boards; Dad moves into the slice of light to say the quoted words.",
      stage:(t)=><SlotPerformance s={cue("4.dad").start+t} mode="dad" />,
    },
    {
      cue:"4.here",zone:"wreck",look:"overworld-day",fov:41,ease:"linear",
      from:w(2.83,1.91,-2.52),
      to:w(2.94,1.46,-2.24),
      target:w(1.84,.91,-.46),
      targetTo:w(1.85,.91,-.45),
      note:"Pull back for the kid reaching; the two hands meet at the broken edge rather than on opposite cuts.",
      stage:(t)=><SlotPerformance s={cue("4.here").start+t} mode="here" />,
    },
  ],
});
