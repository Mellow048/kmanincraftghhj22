import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 6: Who was she hiding me from?. Camera cuts do not reset the underlying performance. */
export const scene6=storyScene(timing,{
 id:"scene6",title:"Who was she hiding me from?",shots:[
  (()=>{const id="6.told";return {cue:"6.told",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.25,1.25,.2],dist:3.8,to:3.5,yaw:-15,pitch:5,fov:43}),
    note:"Over the mother's side of the kitchen, he tells her what happened, still in his recognizable red shirt.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.hands";return {cue:"6.hands",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.68,1.1,-.5],dist:3.5,to:3.15,yaw:15,pitch:15,fov:46}),
    note:"The bowl lowers to the washing counter. Her interruption is the answer before her words are.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.rule";return {cue:"6.rule",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.4,1.49,-.5],dist:2.1,to:1.75,yaw:10,pitch:3,fov:38}),
    note:"Mother's one long eyebrow fills the frame. A warning from someone who already knows what he is.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.question";return {cue:"6.question",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.8,1.46,.75],dist:1.85,to:1.65,yaw:-25,pitch:3,fov:38}),
    note:"His eyes search her face. No invented explanation answers the question.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.lock";return {cue:"6.lock",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.65,1.3,-1.8],dist:2.9,to:2.55,yaw:15,pitch:5,fov:43}),
    note:"Track her last steps to the actual door; the latch slides home rather than cutting straight to an already locked door.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
