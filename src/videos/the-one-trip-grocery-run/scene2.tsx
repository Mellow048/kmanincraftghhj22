import { Block, cam, storyScene } from "../../engine";
import { Kid, PaperBag, Sister, timing, smooth } from "./kit";
export const scene2=storyScene(timing,{
 id: "scene2",
 title:"A sensible plan",shots:[
 {cue:"2.sat",...cam.truck({on:[0,1.25,1.4],by:[-1.15,0,0],dist:6.1,yaw:8,pitch:8,fov:46}),zone:"driveway",look:"overworld-day",note:"The sister makes separate trips, a bag at a time; four neat bags wait in a row while she walks between the car and house.",stage:(t)=> <>
  <Sister position={[-2.5+2.4*smooth((t%1.1)/1.1),0,.85]} animation="walk" animDistance={2.4*smooth((t%1.1)/1.1)} plantFeet time={t} face="calm"/>
  {[0,1,2,3].map(i=><PaperBag key={i} at={[-2.2+i*1.15,.02,1.8]} tint={i%2?"#b98252":"#d0a06b"}/>)}
 </>},
 {cue:"2.one",...cam.push({on:[-1,1.4,1.3],dist:4.2,to:3.5,yaw:-17,pitch:2,fov:40}),zone:"driveway",look:"overworld-day",note:"He points from the separate bags to the ONE TRIP sign, turning a grocery errand into a personal rule.",stage:(t)=> <>
  <Kid position={[-1.25,0,1.5]} animation="point" face="brave" time={t}/><Block position={[-.2,.7,1.75]} size={[.08,1.4,.08]} color="#704d31"/>
  <Block position={[-.2,1.4,1.74]} size={[1.45,.55,.08]} color="#31424a"/><Block position={[-.2,1.4,1.67]} size={[1.3,.42,.02]} color="#3b5260"/>
 </>},
 {cue:"2.eggs",...cam.push({on:[.9,1.4,1.2],dist:3.25,to:2.6,yaw:21,pitch:2,fov:38}),zone:"driveway",look:"overworld-day",note:"The sister holds up the closed egg carton like a skeptical judge. He looks at the carton, then nods as if it has signed a waiver.",stage:(t)=> <>
  <Sister position={[1,0,1.25]} animation="hold" face="uneasy" time={t}/><Block position={[1,1.25,1.72]} size={[.52,.16,.35]} color="#d7d2bd"/>
  <Kid position={[-.65,0,1.6]} face="brave" headYaw={.2} time={t}/>
 </>},
 {cue:"2.contest",...cam.orbit({on:[0,1.25,1.2],dist:5.3,yaw:12,yawTo:-9,pitch:12,fov:45,distTo:4.9}),zone:"driveway",look:"overworld-day",note:"The sister continues her calm separate trips in the background. He squares his shoulders at the mountain of groceries.",stage:(t)=> <>
  <Sister position={[2,0,.9]} animation="walk" animDistance={.4} time={t} face="calm"/>
  <Kid position={[-1,0,1.9]} face="brave" time={t}/>
  {[0,1,2,3].map(i=><PaperBag key={i} at={[-1.2+i*.65,.02,2.25]} tint={i%2?"#b98252":"#d0a06b"}/>)}
 </>}
]});
