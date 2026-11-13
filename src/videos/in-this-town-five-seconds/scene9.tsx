import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 9: He protected me, too. Camera cuts do not reset the underlying performance. */
export const scene9=storyScene(timing,{
 id:"scene9",title:"He protected me, too",shots:[
  (()=>{const id="9.lunch";return {cue:"9.lunch",zone:"lunch",look:"overworld-day" as const,
    ...cam.push({on:[0,.85,.1],dist:3.3,to:2.8,yaw:0,pitch:25,fov:46}),
    note:"This time an entire loaf crosses the same tabletop. Reusing the geography makes the change in generosity immediate.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="9.why";return {cue:"9.why",zone:"lunch",look:"overworld-day" as const,
    ...cam.push({on:[.65,1.28,-.65],dist:2,to:1.8,yaw:0,pitch:3,fov:40}),
    note:"The villager friend leans toward the hero and speaks; his wish is sincere, not a throwaway joke.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="9.math";return {cue:"9.math",zone:"lunch",look:"overworld-day" as const,
    ...cam.push({on:[0,.93,-.08],dist:2.5,to:2.15,yaw:0,pitch:38,fov:46}),
    note:"Tilt to the open exercise book, then the red-shirted boy follows the lines and understands. The friend has something real to give back.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="9.help";return {cue:"9.help",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[0,1.35,1.25],dist:2.2,to:1.95,yaw:125,pitch:4,fov:44}),
    note:"Back at the recognizable middle desk, his hand rises and his face changes: he has the answer without stopping time.",
    stage:(local:number)=><SchoolDay t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
