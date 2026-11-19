import { storyScene } from "../../engine";
import { cue, timing, w } from "./kit";
import { Below } from "./underwater";
export const scene3=storyScene(timing,{
  id:"scene3",title:"Not Dad",shots:[
    {
      cue:"3.hope",zone:"underwater",look:"overworld-day", fov:44, ease:"linear",
      from: w(5.19,-.32,2.84),
      to: w(4.62,-.67,.00),
      target: w(2.62,-1.08,-.52),
      targetTo: w(2.22,-1.53,-2.29),
      note:"Travelling over his shoulder under the ribs of the wreck. Follow the dolphin into the turquoise light.",
      stage:(t)=><Below s={cue("3.hope").start+t}/>,
    },
    {
      cue:"3.chest",zone:"underwater",look:"overworld-day",fov:40,
      from: w(4.60,-1.06,-1.90),
      to: w(4.37,-1.04,-1.71),
      target: w(1.98,-1.77,-3.36),
      targetTo: w(1.99,-1.73,-3.43),
      note:"Break the chase on the dull corner of a chest; the dolphin checks back for the kid.",
      stage:(t)=><Below s={cue("3.chest").start+t}/>,
    },
    {
      cue:"3.gold",zone:"underwater",look:"overworld-day",fov:39,ease:"linear",
      from: w(3.19,-1.33,-1.44),
      to: w(3.04,-1.36,-1.62),
      target: w(2.05,-1.76,-3.43),
      targetTo: w(2.02,-1.74,-3.46),
      note:"Odd low angle from the treasure side. Gold and the hesitation in his face are visible together.",
      stage:(t)=><Below s={cue("3.gold").start+t}/>,
    },
    {
      cue:"3.leave",zone:"underwater",look:"overworld-day",fov:43,ease:"linear",
      from: w(5.14,-1.58,-3.22),
      to: w(5.16,-.30,-1.49),
      target: w(2.43,-1.41,-3.25),
      targetTo: w(2.84,-.28,-.89),
      note:"Blue side reverse. The hand that almost reached for the gold pulls back and the kid swims toward the light.",
      stage:(t)=><Below s={cue("3.leave").start+t}/>,
    },
  ],
});
