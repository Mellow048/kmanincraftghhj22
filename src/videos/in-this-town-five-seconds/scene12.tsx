import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 12: For the rabbit. Camera cuts do not reset the underlying performance. */
export const scene12=storyScene(timing,{
 id:"scene12",title:"For the rabbit",shots:[
  (()=>{const id="12.thanks";return {cue:"12.thanks",zone:"rescue",look:"overworld-night" as const,
    ...({
    from:[1.95,1.8,-2.6],
    to:[1.75,1.7,-2.65],
    target:[-.15,.95,-3.1],fov:55,ease:'inOutSine' as const}),
    note:"The old man rocks forward, rises from the floor and offers the carrot on his joined sleeves. The boy steps closer and reaches to receive it; neither actor resets at the cut.",
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
    ...({
    from:[-4.55,2.5,-2.25],
    to:[-4.5,2.4,-2.25],
    target:[-4.55,1.42,-3.35],fov:48,ease:'inOutSine' as const}),
    note:"The boy looks away on the golem excuse as mother starts toward the window behind him. Keep her real walk visible; do not materialize a golem that did not perform this rescue.",
    stage:(local:number)=><MotherChecks t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="12.window";return {cue:"12.window",zone:"bedroom",look:"overworld-night" as const,
    ...({
    from:[-3.95,1.65,-.5],
    to:[-3.85,1.62,-.65],
    target:[-3.5,1.40,-2.13],fov:46,ease:'inOutSine' as const}),
    note:"Her sleeves meet the lower sash handle, draw it down through the real window tracks and withdraw after the rail lands. The curtain settles; this is the same clear window he looks through later.",
    stage:(local:number)=><MotherChecks t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
