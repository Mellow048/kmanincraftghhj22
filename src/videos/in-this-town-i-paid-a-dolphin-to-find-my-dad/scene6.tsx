import { storyScene } from "../../engine";
import { cue, timing, w } from "./kit";
import { ArmsOut } from "./rescue";
import { LeaveGold } from "./underwater";
import { Home } from "./dock";

export const scene6=storyScene(timing,{
  id:"scene6",title:"Double",shots:[
    {
      cue:"6.up",zone:"wreck",look:"overworld-day",fov:36,ease:"linear",
      from:w(1.72,3.01,3.62),
      to:w(1.65,2.91,3.40),
      target:w(.55,1.47,.84),
      targetTo:w(.61,1.78,.79),
      note:"Arm to arm at the clear hatch. Dad's shoulders follow his hand up into daylight, then the smile arrives.",
      stage:(t)=><ArmsOut s={cue("6.up").start+t}/>,
    },
    {
      cue:"6.boat",zone:"wreck",look:"overworld-day",fov:44,ease:"linear",
      from:w(5.62,1.72,2.40),
      to:w(5.18,1.58,2.23),
      target:w(1.81,1.22,.85),
      targetTo:w(2.58,.82,.51),
      note:"Reverse to the floating boat. The kid keeps Dad's weight until their feet find the seats.",
      stage:(t)=><ArmsOut s={cue("6.boat").start+t} boat/>,
    },
    {
      cue:"6.chest",zone:"underwater",look:"overworld-day",fov:45,ease:"linear",
      from:w(4.55,-1.53,-4.57),
      to:w(4.40,-1.28,-4.54),
      target:w(1.93,-1.66,-2.95),
      targetTo:w(1.99,-1.52,-2.81),
      note:"Quiet reverse callback from the seabed: the unclaimed gold stays; a dolphin and the wake leave together.",
      stage:(t)=><LeaveGold t={t}/>,
    },
    {
      cue:"6.home",zone:"harbor",look:"overworld-sunset",fov:43,ease:"linear",
      from:[3.19,2.61,-1.74],
      to:[2.91,2.43,-1.56],
      target:[.38,1.09,.61],
      targetTo:[.43,1.05,.65],
      note:"Return to the same harbor at gold hour, now with Dad kneeling and the old fish box between them.",
      stage:(t)=><Home s={cue("6.home").start+t}/>,
    },
    {
      cue:"6.first",zone:"harbor",look:"overworld-sunset",fov:39,ease:"linear",
      from:[3.98,1.01,-.69],
      to:[3.66,1.10,-.51],
      target:[1.26,1.04,.19],
      targetTo:[1.39,1.02,.20],
      note:"Low waterline echo of the opening. Dad extends the first cod, with the dolphin waiting instead of grabbing it yet.",
      stage:(t)=><Home s={cue("6.first").start+t}/>,
    },
    {
      cue:"6.second",zone:"harbor",look:"overworld-sunset",fov:38,ease:"linear",
      from:[3.97,2.43,2.63],
      to:[4.12,2.26,2.41],
      target:[.94,1.03,.58],
      targetTo:[1.18,1.02,.37],
      note:"Tilt round above the box and show the second fish come up while the first stays visible in the other hand.",
      stage:(t)=><Home s={cue("6.second").start+t}/>,
    },
    {
      cue:"6.double",zone:"harbor",look:"overworld-sunset",fov:43,ease:"linear",
      from:[4.55,1.97,3.12],
      to:[4.72,1.84,3.23],
      target:[1.47,.99,.48],
      targetTo:[1.55,.91,.62],
      note:"Side on to both hands: hold the two distinct cod for the count, then two bites and a happy turn.",
      stage:(t)=><Home s={cue("6.double").start+t}/>,
    },
    {
      cue:"6.close",zone:"harbor",look:"overworld-sunset",fov:47,ease:"linear",
      from:[3.51,2.67,5.21],
      to:[3.88,2.95,5.63],
      target:[.99,.97,.87],
      targetTo:[1.18,.89,.98],
      note:"The completed family and one last splash. Only after both fish are taken does the kid's short closing tag play.",
      stage:(t)=><Home s={cue("6.close").start+t}/>,
    },
  ],
});
