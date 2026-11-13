import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 7: An inch from his nose. Camera cuts do not reset the underlying performance. */
export const scene7=storyScene(timing,{
 id:"scene7",title:"An inch from his nose",shots:[
  (()=>{const id="7.locker";return {cue:"7.locker",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[.15,1.08,-.4],dist:6.4,to:5.8,yaw:0,pitch:8,fov:50}),
    note:"Two player bullies crowd the green-robed friend into a hollow locker. The red hero is approaching from the left of the same hallway.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="7.book";return {cue:"7.book",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[-.55,.35,.28],dist:2.65,to:2.3,yaw:15,pitch:20,fov:46}),
    note:"Follow his blue book down to the floor and keep the nearby shoes in frame; its pickup position is established before the rescue.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="7.door";return {cue:"7.door",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[.05,1.02,-.35],dist:4.0,to:3.65,yaw:24,pitch:12,fov:50}),
    note:"The blue door visibly swings from its left hinge toward the villager's nose. The bully's arm supplies the wind-up.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="7.stop";return {cue:"7.stop",zone:"hall",look:"overworld-day" as const,
    ...({
    from:[.45,2.50,-.55],
    to:[.42,2.43,-.55],
    target:[0,1.42,-.63],fov:47,ease:'inOutSine' as const}),
    note:"The blue panel stops an inch from his nose. Then the hero visibly reaches the near hinge and swings the touched door clear; the untouched bully, background children and lights stay frozen.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
