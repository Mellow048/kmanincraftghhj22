import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 6: Who was she hiding me from?. Camera cuts do not reset the underlying performance. */
export const scene6=storyScene(timing,{
 id:"scene6",title:"Who was she hiding me from?",shots:[
  (()=>{const id="6.told";return {cue:"6.told",zone:"kitchen",look:"overworld-day" as const,
    ...({
    from:[1.9,1.95,3.6],
    to:[1.65,1.9,3.4],
    target:[-.65,1.12,-.8],fov:49,ease:'inOutSine' as const}),
    note:"The boy gestures about the glass across the kitchen; mother is actually washing the bowl before she hears him. Her head stops first, before she sets it down.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.hands";return {cue:"6.hands",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.70,1.17,-1.25],dist:3.35,to:3.18,yaw:10,pitch:12,fov:46}),
    note:"Stay on the same joined sleeves and bowl through the lowering, countertop contact, release and her turn toward him. The bowl never travels independently of its support.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.rule";return {cue:"6.rule",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.16,1.48,-1.3],dist:2.15,to:1.99,yaw:50,pitch:5,fov:40}),
    note:"She has finished setting the bowl down. Now the white-robed mother turns toward the boy and gives the warning, rather than holding a generic idle pose.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.question";return {cue:"6.question",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.8,1.46,.75],dist:1.85,to:1.65,yaw:-110,pitch:3,fov:38}),
    note:"His eyes search her face. No invented explanation answers the question.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="6.lock";return {cue:"6.lock",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.65,1.3,-1.8],dist:2.9,to:2.55,yaw:15,pitch:5,fov:43}),
    note:"Track her last steps to the actual door; the latch slides home rather than cutting straight to an already locked door.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
