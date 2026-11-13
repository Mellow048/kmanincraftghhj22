import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 17: The empty space, and the rabbit. Camera cuts do not reset the underlying performance. */
export const scene17=storyScene(timing,{
 id:"scene17",title:"The empty space, and the rabbit",shots:[
  (()=>{const id="17.resume";return {cue:"17.resume",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(HERO_FREEZE,[1.25,.95,.45]),dist:5.8,to:5.3,yaw:25,pitch:14,fov:50}),
    note:"Exactly 150 frozen frames finish. Ice, breath and background dust resume together; the boy is already clear of the old lane.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.ice";return {cue:"17.ice",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(HERO_FREEZE,[-.2,.35,0]),onTo:add(ROCK_END,[-.4,.65,0]),dist:5.1,to:4.8,yaw:28,pitch:18,fov:53}),
    note:"Move from the scattering ice to the man's checking step in one view. The shot does not sit on empty ground after the shards have settled.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.hit";return {cue:"17.hit",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(ROCK_END,[0,.20,0]),dist:2.1,to:1.85,yaw:25,pitch:20,fov:46}),
    note:"Foot, rock, contact: the next planted toe catches the placed rock. No face injury and no unexplained fall.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.fall";return {cue:"17.fall",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(v(manMotion(t).position,counterHero(t).position,.2),[0,.80,0]))(cue(id).start),onTo:(t=>add(v(manMotion(t).position,counterHero(t).position,.2),[0,.80,0]))(cue(id).end-1/30),dist:5.35,to:(5.35)-.08,yaw:130,pitch:22,fov:52}), ...follow(id,t=>add(v(manMotion(t).position,counterHero(t).position,.2),[0,.80,0]),5.35,130,22,52),
    impacts:[{at:LAND-cue(id).start,amp:.055,dur:.20}], note:"The caught foot pitches his weight forward through two failed recovery steps. He twists half around to shield the rabbit, drops under gravity, lands shoulder/back first and skids; no upright full-circle pirouette.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.rabbit";return {cue:"17.rabbit",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(v(counterHero(t).position,rabbitAt(t),.55),[0,.6,0]))(cue(id).start),onTo:(t=>add(v(counterHero(t).position,rabbitAt(t),.55),[0,.6,0]))(cue(id).end-1/30),dist:3.7,to:(3.7)-.08,yaw:35,pitch:23,fov:49}), ...follow(id,t=>add(v(counterHero(t).position,rabbitAt(t),.55),[0,.6,0]),3.7,35,23,49),
    note:"The hero walks the last step, bends and lifts the rabbit from the supporting palm into both hands. Follow the entire transfer; then he takes a real step back so the injured man has space to rise.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="17.breathe";return {cue:"17.breathe",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(rescuedRabbit(t),[0,.35,0]))(cue(id).start),onTo:(t=>add(rescuedRabbit(t),[0,.35,0]))(cue(id).end-1/30),dist:1.8,to:(1.8)-.08,yaw:100,pitch:8,fov:40}), ...follow(id,t=>add(rescuedRabbit(t),[0,.35,0]),1.8,100,8,40),
    note:"Its black ear and twitching nose fill the frame. Alive, supported, no ice over the face.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
