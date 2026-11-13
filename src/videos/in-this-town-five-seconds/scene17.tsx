import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 17: The empty space, and the rabbit. Camera cuts do not reset the underlying performance. */
export const scene17=storyScene(timing,{
 id:"scene17",title:"The empty space, and the rabbit",shots:[
  (()=>{const id="17.resume";return {cue:"17.resume",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(HERO_FREEZE,[1.25,.95,.45]),dist:5.8,to:5.3,yaw:25,pitch:14,fov:50}),
    note:"Exactly 150 frozen frames finish. Ice, breath and background dust resume together; the boy is already clear of the old lane.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.ice";return {cue:"17.ice",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(HERO_FREEZE,[-.3,.6,0]),dist:3.6,to:3.1,yaw:15,pitch:20,fov:47}),
    note:"Ice smashes into the space the red shirt occupied, leaving visible shards. The runner brakes and looks back, giving his next step a readable wind-up.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.hit";return {cue:"17.hit",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(ROCK_END,[0,.20,0]),dist:2.1,to:1.85,yaw:25,pitch:20,fov:46}),
    note:"Foot, rock, contact: the next planted toe catches the placed rock. No face injury and no unexplained fall.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.fall";return {cue:"17.fall",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(MAN_FREEZE,[1.3,.72,.1]),dist:4.25,to:3.75,yaw:121,pitch:23,fov:52}),
    note:"One continuous stumble, full turning recovery attempt, then the supported back landing. The rabbit never leaves his arm.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.rabbit";return {cue:"17.rabbit",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(MAN_FREEZE,[1.25,.82,.65]),dist:3.65,to:3.4,yaw:50,pitch:19,fov:48}),
    note:"The hero walks the last step, bends and lifts the rabbit from the supporting palm into both hands. Follow the entire transfer; then he takes a real step back so the injured man has space to rise.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.breathe";return {cue:"17.breathe",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(rescuedRabbit(t),[0,.35,0]))(cue(id).start),onTo:(t=>add(rescuedRabbit(t),[0,.35,0]))(cue(id).end-1/30),dist:1.8,to:(1.8)-.08,yaw:100,pitch:8,fov:40}), ...follow(id,t=>add(rescuedRabbit(t),[0,.35,0]),1.8,100,8,40),
    note:"Its black ear and twitching nose fill the frame. Alive, supported, no ice over the face.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
