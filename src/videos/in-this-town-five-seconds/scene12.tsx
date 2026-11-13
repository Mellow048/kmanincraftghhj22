import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 12: For the rabbit. Camera cuts do not reset the underlying performance. */
export const scene12=storyScene(timing,{
 id:"scene12",title:"For the rabbit",shots:[
  (()=>{const id="12.thanks";return {cue:"12.thanks",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.12,1,-3.2],dist:2.25,to:2.05,yaw:80,pitch:9,fov:48}),
    note:"The old man raises himself from the ground into a seated position and offers a carrot. Recovery is an action, not a new standing pose.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30} thanks/>,
  };})(),
  (()=>{const id="12.rabbit";return {cue:"12.rabbit",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.1,1.06,-2.8],dist:1.55,to:1.35,yaw:90,pitch:8,fov:42}),
    note:"The carrot passes across the gap between them, with the old neighbor's long nose in the background. The black-eared rabbit has an owner.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30} thanks/>,
  };})(),
  (()=>{const id="12.mother";return {cue:"12.mother",zone:"bedroom",look:"overworld-night" as const,
    ...cam.push({on:[-4.9,1.3,-3.7],dist:2.7,to:2.4,yaw:0,pitch:5,fov:48}),
    note:"Home inside the lit doorway: mother leans toward the sleeve he holds out and checks him for scratches.",
    stage:(local:number)=><MotherChecks t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="12.lie";return {cue:"12.lie",zone:"bedroom",look:"overworld-night" as const,
    ...cam.push({on:[-4.55,1.46,-3.35],dist:1.85,to:1.65,yaw:0,pitch:3,fov:38}),
    note:"The boy looks away on the golem excuse. Do not materialize a golem that did not actually perform this rescue.",
    stage:(local:number)=><MotherChecks t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="12.window";return {cue:"12.window",zone:"bedroom",look:"overworld-night" as const,
    ...cam.push({on:[-3.65,1.65,-2.25],dist:2.7,to:2.35,yaw:-100,pitch:5,fov:46}),
    note:"Mother walks the last steps to his real window and closes it. Warm interior, cool glass; the night is not over.",
    stage:(local:number)=><MotherChecks t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
