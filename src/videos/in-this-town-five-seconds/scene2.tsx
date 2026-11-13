import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";
import { curtainsMother } from "./domestic-motion";

/** Beat 2: She closed the curtains first. Camera cuts do not reset the underlying performance. */
export const scene2=storyScene(timing,{
 id:"scene2",title:"She closed the curtains first",shots:[
  (()=>{const id="2.mother";return {cue:"2.mother",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-.05,1.25,.0],dist:4.9,to:4.5,yaw:10,pitch:6,fov:48}),
    note:"Put the long-nosed white-robed mother and the red-shirted player face in one frame: their difference is immediately readable.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="2.adopted";return {cue:"2.adopted",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-1.08,1.16,-.1],dist:2.8,to:2.6,yaw:15,pitch:9,fov:44}),
    note:"A memory of her folded arms supporting the same child as a small baby. No age is invented.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="2.where";return {cue:"2.where",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.8,1.46,.75],dist:1.8,to:1.6,yaw:-35,pitch:3,fov:38}),
    note:"His question, on his face; the mother looks away in the background instead of answering.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="2.answer";return {cue:"2.answer",zone:"kitchen",look:"overworld-day" as const,
    ...({
    from:[-1.8,1.85,2.6],
    to:[-1.55,1.9,2.3],
    target:[-.9,1.05,-.4],targetPath:[0,.25,.5,.75,1].map(k=>add(curtainsMother(cue(id).start+(cue(id).end-cue(id).start-1/30)*k).position,[0,1.05,0])),fov:49,ease:'linear' as const}),
    note:"Her head leads the evasive turn, then her feet carry her to the window. Track the whole walk rather than cutting from one standing position to another.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="2.curtains";return {cue:"2.curtains",zone:"kitchen",look:"overworld-day" as const,
    ...({
    from:[-.65,2.08,1.25],
    to:[-.40,2.0,1.1],
    target:[1.85,1.5,-2.07],targetTo:[1.88,1.5,-2.07],fov:50,ease:'inOutSine' as const}),
    note:"Keep sleeves, cord, rail and cloth in frame. She reaches, catches the cord, pulls decisively on closed, then releases as the top-hung panels settle and the window light dims.",
    stage:(local:number)=><MotherStory t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
