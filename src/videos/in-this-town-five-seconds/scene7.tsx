import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

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
    ...cam.push({on:[.05,1.35,-.8],dist:3.6,to:3.2,yaw:0,pitch:4,fov:48}),
    note:"The blue door visibly swings from its left hinge toward the villager's nose. The bully's arm supplies the wind-up.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="7.stop";return {cue:"7.stop",zone:"hall",look:"overworld-day" as const,
    ...({
    from:[.68,1.49,-.65],
    to:[.63,1.47,-.64],
    target:[0,1.34,-.59],fov:46,ease:'inOutSine' as const}),
    note:"A close profile of door edge and long nose as the swing stops. All bullies, background children and light motion stop with it.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
