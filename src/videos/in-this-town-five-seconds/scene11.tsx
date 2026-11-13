import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 11: Over the doorstep. Camera cuts do not reset the underlying performance. */
export const scene11=storyScene(timing,{
 id:"scene11",title:"Over the doorstep",shots:[
  (()=>{const id="11.stop";return {cue:"11.stop",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[0,.72,-.95],dist:2.35,to:2.1,yaw:45,pitch:28,fov:45}),
    note:"The arrow stops just above the old villager's chest; its feathers, head and small remaining gap all read in the same frame.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.drag";return {cue:"11.drag",zone:"rescue",look:"overworld-night" as const,
    ...({
    from:[.45,2.3,2.35],
    to:[.35,1.9,1.85],
    target:[-.2,.65,-2.1],fov:55,ease:'inOutSine' as const}),
    note:"A wide enough view to see the hand reach, collar contact and the whole villager slide continuously over the visible sill.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.door";return {cue:"11.door",zone:"rescue",look:"overworld-night" as const,
    ...({
    from:[1.5,1.8,-4.6],
    to:[1.3,1.65,-4.4],
    target:[-.2,.8,-2.6],fov:55,ease:'inOutSine' as const}),
    note:"From inside the same opening: the foot catches the inward-opening door and stays on the panel all the way through its closing arc. He withdraws only when it meets the frame; released objects do not move during a stop.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.hit";return {cue:"11.hit",zone:"rescue",look:"overworld-night" as const,
    ...({
    from:[-.8,.98,-1.53],
    to:[-.74,.94,-1.53],
    target:[0,.7,-1.68],fov:54,ease:'inOutSine' as const}),
    note:"Outside again, still the same door. Exactly five seconds end, and the arrow completes the short remaining flight into the wood.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="11.safe";return {cue:"11.safe",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.2,.58,-3.98],dist:2.35,to:2.15,yaw:78,pitch:22,fov:50}),
    note:"Inside the protected room, the old villager breathes and the boy stays beside him. Keep the doorway behind the lens, not between us and their faces.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
