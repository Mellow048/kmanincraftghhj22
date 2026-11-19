import { storyScene } from "../../engine";
import { add, cue, timing, w } from "./kit";
import { boatAt, Crossing, Diving, Tying } from "./voyage";
const B=boatAt(cue("2.search").start), C=boatAt(cue("2.turn").start), E=boatAt(cue("2.tie").start);

export const scene2 = storyScene(timing,{
  id:"scene2",title:"The other way", shots:[
    {
      cue:"2.search", zone:"sea", look:"overworld-day", fov:46, ease:"linear",
      from: add(B,[.0,3.77,-6.02]),
      to: add(C,[.54,4.14,-6.36]),
      target: add(B,[-1.18,.51,5.28]),
      targetTo: add(C,[-1.25,.62,5.53]),
      note:"Geography first: two search boats head together into open water and his boat brings up the rear.",
      stage:(t)=><Crossing s={cue("2.search").start+t}/>,
    },
    {
      cue:"2.turn", zone:"sea+wreck", look:"overworld-day", fov:43, ease:"linear",
      from: add(C,[1.43,1.68,-3.96]),
      to: add(E,[4.06,2.14,-3.94]),
      target: add(C,[.50,.50,2.00]),
      targetTo: add(E,[.22,.58,1.50]),
      path: [add(C,[1.43,1.68,-3.96]),add(boatAt(16.72),[2.48,1.90,-4.01]),add(E,[4.06,2.14,-3.94])],
      note:"Track the skiff low at the reef as the dolphin banks east, out of the searchers' line.",
      stage:(t)=><Crossing s={cue("2.turn").start+t}/>,
    },
    {
      cue:"2.tie", zone:"wreck", look:"overworld-day", fov:38,
      from: w(3.33,3.70,-1.83),
      to: w(3.02,3.28,-1.62),
      target: w(2.05,.48,-.46),
      targetTo: w(2.09,.48,-.45),
      note:"Overhead detail of the dinghy tied to the wreck. Leave the painted half across the seat in the same view.",
      stage:(t)=><Tying t={t}/>,
    },
    {
      cue:"2.dive", zone:"wreck", look:"overworld-day", fov:45, ease:"linear",
      from: w(5.72,1.24,2.58),
      to: w(5.08,.69,2.91),
      target: w(2.50,.54,1.24),
      targetTo: w(2.69,.32,1.58),
      note:"Water-level profile. First the dorsal fin goes down, then the kid leaves the boat and splashes in after it.",
      stage:(t)=><Diving t={t}/>,
    },
  ],
});
