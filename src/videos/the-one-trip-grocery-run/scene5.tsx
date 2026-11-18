import { Block, cam, PixelText, storyScene } from "../../engine";
import { Can, EggCarton, Kid, Load, PaperBag, timing, smooth } from "./kit";
export const scene5=storyScene(timing,{
 id: "scene5",
 title:"The method",shots:[
 {cue:"5.scale",...cam.push({on:[-1,1.05,0],dist:3.5,to:3.15,yaw:26,pitch:26,fov:40}),zone:"kitchen",look:"overworld-day",note:"He places an ordinary bag on a bathroom scale and records its weight with grave care.",stage:(t)=> <>
  <Block position={[-1,.36,.35]} size={[.72,.12,.68]} color="#5f6d72"/><Block position={[-1,.45,.35]} size={[.52,.05,.48]} color="#d9e1d7"/><PaperBag at={[-1,.53,.35]} scale={.8}/><Kid position={[.1,0,.9]} animation="crouch" face="calm" time={t}/>
 </>},
 {cue:"5.plan",...cam.push({on:[0,1.15,.4],dist:4,to:3.5,yaw:3,pitch:4,fov:42}),zone:"kitchen",look:"overworld-day",note:"He puts heavy cans close against his chest and keeps bread and soft food high in the stack.",stage:(t)=> <>
  <Kid position={[0,0,.6]} arms="hold" face="calm" time={t}/><Can at={[-.15,1.15,.8]}/><Can at={[.13,1.15,.8]} tint="#538054"/><Block position={[0,1.7,.85]} size={[.6,.18,.35]} color="#dfad62"/>
 </>},
 {cue:"5.tote",...cam.push({on:[0,1.15,.85],dist:2.8,to:2.2,yaw:-12,pitch:7,fov:36}),zone:"kitchen",look:"overworld-day",note:"A spare reusable tote sleeves the paper handles so they stop cutting into his fingers.",stage:(t)=> <>
  <Kid position={[0,0,.5]} face="smile" time={t}/><PaperBag at={[-.27,.85,.9]}/><PaperBag at={[.3,.85,.9]} tint="#d0a06b"/><Block position={[0,1.2,.97]} size={[.72,.12,.09]} color="#d26d46"/>
 </>},
 {cue:"5.guess",...cam.orbit({on:[-.8,1.2,.8],dist:3.8,yaw:5,yawTo:-17,pitch:13,fov:41,distTo:3.5}),zone:"kitchen",look:"overworld-day",note:"He compares the scale to the mountain of bags; numbers do not help with a handle tearing. His face stays entirely serious.",stage:(t)=> <>
  <Kid position={[-.7,0,.7]} face="calm" headYaw={-.25} time={t}/><Block position={[-1,.38,.35]} size={[.72,.12,.68]} color="#5f6d72"/><PaperBag at={[.55,.05,1.25]} tint="#b98252"/><PaperBag at={[1,.05,1.2]} tint="#d0a06b"/>
 </>},
 {cue:"5.hus",...cam.truck({on:[0,1.15,.4],by:[1.1,0,0],dist:5.5,yaw:11,pitch:8,fov:44}),zone:"kitchen",look:"overworld-day",note:"The corrected load crosses the kitchen in one continuous three-breath carry. Bags stay level; the egg carton is upright.",stage:(t)=> <>
  <Kid position={[-1.4+2.2*smooth(t/1.4),0,.4]} rotationY={.45} animation="walk" arms="hold" animDistance={2.2*smooth(t/1.4)} time={t} face="calm"/><group position={[-1.4+2.2*smooth(t/1.4),0,.4]}><Load sway={Math.sin(t*7)*.04} tidy/></group>
 </>},
 {cue:"5.done",...cam.push({on:[1,1.3,.5],dist:4,to:3.45,yaw:-16,pitch:3,fov:42}),zone:"kitchen",look:"overworld-day",note:"The bags stand around him intact. He marks the successful run with a quiet, self-issued score.",stage:(t)=> <>
  <Kid position={[.8,0,.5]} face="calm" time={t}/><PaperBag at={[-1.1,.03,.2]}/><PaperBag at={[1.6,.03,.2]} tint="#d0a06b"/><EggCarton at={[.25,.03,.45]}/><PixelText text="ONE TRIP" position={[.1,2.35,-1.1]} height={.28} maxWidth={1.6}/>
 </>}
]});
