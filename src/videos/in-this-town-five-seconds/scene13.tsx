import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 13: A man with no lantern. Camera cuts do not reset the underlying performance. */
export const scene13=storyScene(timing,{
 id:"scene13",title:"A man with no lantern",shots:[
  (()=>{const id="13.sound";return {cue:"13.sound",zone:"bedroom",look:"overworld-night" as const,
    ...({
    from:[-6.95,2.25,-5.15],
    to:[-6.65,2.05,-4.7],
    target:[-5.5,1.0,-4.45],targetPath:[0,.25,.5,.75,1].map(k=>add(homeHero(cue(id).start+(cue(id).end-cue(id).start-1/30)*k).position,[0,1.02,0])),fov:58,ease:'linear' as const}),
    note:"From beside the bed: a crunch makes him rise and go to the window. The same bed and real doorway remain around him.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="13.white";return {cue:"13.white",zone:"street",look:"overworld-night" as const,
    ...({
    from:[-3.9,1.82,-2.35],
    to:[-3.82,1.8,-2.3],
    target:[1.3,1.3,1.2],fov:43,ease:'inOutSine' as const}),
    note:"His actual view through the clear panes: a white-clothed player stands beside the rabbit outside. The window's timber edges frame the discovery.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="13.beard";return {cue:"13.beard",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:[1.3,1.55,1.2],dist:2.1,to:1.8,yaw:-20,pitch:3,fov:38}),
    note:"A clear bearded player face, white sleeves and empty free hand. No villager nose and no lantern are substituted.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="13.kneel";return {cue:"13.kneel",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:[1.45,.9,1.4],dist:3.6,to:3.2,yaw:20,pitch:10,fov:47}),
    note:"Show knees bend and the man lower his hand all the way beside the rabbit's feet.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="13.frost";return {cue:"13.frost",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:[2.0,.4,1.65],dist:2.05,to:1.85,yaw:25,pitch:24,fov:46}),
    note:"Ice grows outward from the lowered fingers around the rabbit's legs, never across its living face.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="13.dinner";return {cue:"13.dinner",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(v(manMotion(t).position,carriedRabbit(t),.5),[0,.65,0]))(cue(id).start),onTo:(t=>add(v(manMotion(t).position,carriedRabbit(t),.5),[0,.65,0]))(cue(id).end-1/30),dist:2.25,to:(2.25)-.08,yaw:0,pitch:12,fov:56}), ...follow(id,t=>add(v(manMotion(t).position,carriedRabbit(t),.5),[0,.65,0]),2.25,0,12,56),
    note:"Stay with the supported rabbit as his arm lifts it from the ground and he straightens. The food line lands on the beard, not on an empty yard.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
