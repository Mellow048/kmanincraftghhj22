import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 9: He protected me, too. Camera cuts do not reset the underlying performance. */
export const scene9=storyScene(timing,{
 id:"scene9",title:"He protected me, too",shots:[
  (()=>{const id="9.lunch";return {cue:"9.lunch",zone:"lunch",look:"overworld-day" as const,
    ...cam.push({on:[.02,1.04,-.02],dist:4.1,to:3.85,yaw:-90,pitch:22,fov:49}),
    note:"The same table, but a whole loaf: the friend leans into a real sleeve-led push and the boy reaches forward to meet it. No loaf floats between the actors.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="9.why";return {cue:"9.why",zone:"lunch",look:"overworld-day" as const,
    ...cam.push({on:[.6,1.32,-.78],dist:2.25,to:2.10,yaw:-5,pitch:8,fov:41}),
    note:"He releases the loaf and straightens, then leans into his sincere wish to protect the boy too. The generosity and the hesitation belong to the same performance.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="9.math";return {cue:"9.math",zone:"lunch",look:"overworld-day" as const,
    ...({
    from:[-2.8,2.15,-1.55],
    to:[-2.5,1.86,-1.4],
    target:[-.61,.99,.2],targetTo:[-.43,1.26,.54],fov:44,ease:'inOutSine' as const}),
    note:"The boy's hand hinges the blue cover open, revealing the actual multiplication exercise. Lift the view with his understanding and small nod, while his friend explains across the table.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="9.help";return {cue:"9.help",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[0,1.35,1.25],dist:2.2,to:1.95,yaw:125,pitch:4,fov:44}),
    note:"Back at the recognizable middle desk, his hand rises and his face changes: he has the answer without stopping time.",
    stage:(local:number)=><SchoolDay t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
