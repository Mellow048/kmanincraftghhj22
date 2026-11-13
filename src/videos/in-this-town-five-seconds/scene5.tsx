import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 5: Touch it, then get out of its way. Camera cuts do not reset the underlying performance. */
export const scene5=storyScene(timing,{
 id:"scene5",title:"Touch it, then get out of its way",shots:[
  (()=>{const id="5.touch";return {cue:"5.touch",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.25,1.12,.65],dist:4.0,to:3.65,yaw:15,pitch:8,fov:46}),
    note:"He reaches, takes the hovering book and shifts it while his hand remains in contact. The untouched mother and room remain frozen.",
    stage:(local:number)=><TouchDemo t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="5.release";return {cue:"5.release",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.25,.98,-.02],dist:2.4,to:2.15,yaw:125,pitch:20,fov:44}),
    note:"The fingers withdraw and the book waits in the air above the table. A deliberate silent hold completes all five seconds; then it drops the final few centimeters.",
    stage:(local:number)=><TouchDemo t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="5.chalk";return {cue:"5.chalk",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[1.2,1.45,.7],dist:2.45,to:2.15,yaw:165,pitch:5,fov:42}),
    note:"The teacher's throwing arm winds back; the chalk travels the classroom at speed and stops at the boy's nose.",
    stage:(local:number)=><ChalkLesson t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="5.proud";return {cue:"5.proud",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[1.2,1.46,.9],dist:1.8,to:1.6,yaw:170,pitch:3,fov:36}),
    note:"Proud eyes right over the frozen chalk. He never steps away: the mistake is visible before the punchline.",
    stage:(local:number)=><ChalkLesson t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="5.bonk";return {cue:"5.bonk",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[1.2,1.46,.78],dist:2.2,to:1.95,yaw:165,pitch:4,fov:40}),
    note:"Hold the same spatial relationship through the exact fifth second. Chalk taps his nose, powder scatters, his head recoils.",
    stage:(local:number)=><ChalkLesson t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
