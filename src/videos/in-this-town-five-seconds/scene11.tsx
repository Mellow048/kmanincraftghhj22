import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 11: Over the doorstep. Camera cuts do not reset the underlying performance. */
export const scene11=storyScene(timing,{
 id:"scene11",title:"Over the doorstep",shots:[
  (()=>{const id="11.stop";return {cue:"11.stop",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[0,.72,-.95],dist:2.35,to:2.1,yaw:45,pitch:28,fov:45}),
    note:"The arrow stops just above the old villager's chest; its feathers, head and small remaining gap all read in the same frame.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.drag";return {cue:"11.drag",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.1,.85,-1.7],dist:5.3,to:4.8,yaw:10,pitch:16,fov:50}),
    note:"A wide enough view to see the hand reach, collar contact and the whole villager slide continuously over the visible sill.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.door";return {cue:"11.door",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.2,.86,-2.2],dist:3.6,to:3.3,yaw:180,pitch:16,fov:58}),
    note:"From inside the same opening: the hero's foot swings into the door and the hinge takes it all the way shut before time returns.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.hit";return {cue:"11.hit",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[0,.76,-1.91],dist:2.8,to:2.45,yaw:25,pitch:5,fov:44}),
    note:"Outside again, still the same door. Exactly five seconds end, and the arrow completes the short remaining flight into the wood.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.safe";return {cue:"11.safe",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.25,.72,-3.35],dist:2.3,to:2.1,yaw:78,pitch:22,fov:50}),
    note:"Inside the protected room, the old villager breathes and the boy stays beside him. Keep the doorway behind the lens, not between us and their faces.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
