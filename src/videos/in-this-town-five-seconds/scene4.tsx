import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 4: The first stop. Camera cuts do not reset the underlying performance. */
export const scene4=storyScene(timing,{
 id:"scene4",title:"The first stop",shots:[
  (()=>{const id="4.first";return {cue:"4.first",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.35,1,.8],dist:3.3,to:2.8,yaw:-15,pitch:9,fov:42}),
    note:"The glass is still high beside his hand. See the release and the beginning of the fall, not just a floating prop.",
    stage:(local:number)=><GlassDiscovery t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="4.stop";return {cue:"4.stop",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.2,.67,.97],dist:1.65,to:1.4,yaw:-15,pitch:14,fov:40}),
    note:"Go down with the glass until it stops above the floor; separated water cubes hang with it.",
    stage:(local:number)=><GlassDiscovery t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="4.everything";return {cue:"4.everything",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[-.3,1.35,-.3],dist:4.3,to:4.0,yaw:14,pitch:5,fov:48}),
    note:"Mother, clock and water in the same geography. Nothing in the background blinks, flickers or drifts during the stop.",
    stage:(local:number)=><GlassDiscovery t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="4.five";return {cue:"4.five",zone:"kitchen",look:"overworld-day" as const,
    ...cam.push({on:[.18,.46,.97],dist:2.4,to:2.1,yaw:5,pitch:24,fov:44}),
    note:"Keep the glass and floor together for the last beats of the exact 150-frame stop. It resumes its fall and breaks on the tiles.",
    stage:(local:number)=><GlassDiscovery t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
