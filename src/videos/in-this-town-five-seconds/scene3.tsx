import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 3: A seat, a loaf, one black ear. Camera cuts do not reset the underlying performance. */
export const scene3=storyScene(timing,{
 id:"scene3",title:"A seat, a loaf, one black ear",shots:[
  (()=>{const id="3.school";return {cue:"3.school",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-.2,1.15,-.3],dist:4.8,to:4.4,yaw:10,pitch:6,fov:48}),
    note:"Breakfast first: the teenager leaves the table for the door, showing where the school-day transition begins.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="3.class";return {cue:"3.class",zone:"class",look:"overworld-day" as const,
    ...({
    from:[4.15,3.10,2.9],
    to:[3.9,2.9,2.65],
    target:[-.3,1.15,-.7],targetTo:[-.35,1.15,-1.5],fov:57,ease:'linear' as const}),
    note:"Look diagonally toward the board with the mixed class below it. Keep the teacher and the raised chalk in frame through the backward wind-up, fast release and travel to the desk. No throw behind the camera.",
    stage:(local:number)=><SchoolDay t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="3.seat";return {cue:"3.seat",zone:"class",look:"overworld-day" as const,
    ...({
    from:[-3.9,2.4,.25],
    to:[-3.6,2.24,.3],
    target:[-1.2,1.3,1.25],fov:52,ease:'inOutSine' as const}),
    note:"Stack the two adjoining desks in depth. His green-robed friend turns toward the seat he has saved.",
    stage:(local:number)=><SchoolDay t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="3.lunch";return {cue:"3.lunch",zone:"lunch",look:"overworld-day" as const,
    ...cam.push({on:[.02,1.04,-.02],dist:4.1,to:3.85,yaw:-90,pitch:22,fov:49}),
    note:"His sleeve pushes a share of the bread across the wood; the red-shirted boy leans forward to receive it. The other share stays on the friend's side.",
    stage:(local:number)=><Lunch t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="3.rabbit";return {cue:"3.rabbit",zone:"street",look:"overworld-day" as const,
    ...cam.push({on:[1.25,.8,1.2],dist:3.7,to:3.3,yaw:40,pitch:13,fov:46}),
    note:"The two friends bend to the neighbor's rabbit. See the carrot leave the boy's hand and reach the ground.",
    stage:(local:number)=><FeedRabbit t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="3.ear";return {cue:"3.ear",zone:"street",look:"overworld-day" as const,
    ...cam.push({on:[1.28,.4,1.1],dist:1.65,to:1.45,yaw:135,pitch:15,fov:42}),
    note:"The rabbit's unmistakable black ear and twitching nose, then its mouth at his pale shoelace: an affectionate identification, not a disposable animal.",
    stage:(local:number)=><FeedRabbit t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
