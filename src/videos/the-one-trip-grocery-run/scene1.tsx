import { Block, cam, PixelText, storyScene } from "../../engine";
import { Kid, Load, move, smooth, timing } from "./kit";
import type { Vec3 } from "../../engine";

const A:Vec3=[-1.9,0,1.15], B:Vec3=[1.35,0,2.7], LOOK:Vec3=[0,1.45,2.3];
const carry=(t:number)=>move(A,B,smooth(t/1.55));
export const scene1=storyScene(timing,{
  id:"scene1",title:"One trip",
  shots:[
    {cue:"1.hus",...cam.truck({on:LOOK,by:[.5,0,-.25],dist:7.1,yaw:7,pitch:12,fov:48}),zone:"driveway",look:"overworld-day",note:"Open mid-carry: the full grocery load, the eggs upright, and the little potato still visible in the trunk. Three HUS breaths mark three steps.",stage:(t)=> <>
      <Kid position={carry(t)} rotationY={-.22} animation="walk" arms="hold" animDistance={1.5*smooth(t/1.55)} time={t} face="brave"/>
      <group position={carry(t)}><Load sway={Math.sin(t*6)*.12}/></group>
      <PixelText text="ONE TRIP" position={[-.4,2.75,1.4]} height={.36} maxWidth={2}/>
    </>},
    {cue:"1.one",...cam.push({on:[1.2,1.35,2.8],dist:4.2,to:3.8,yaw:13,pitch:3,fov:41}),zone:"driveway",look:"overworld-day",note:"The kid reaches the landing without setting anything down. His rigidly serious face is framed by the overloaded bags.",stage:(t)=> <>
      <Kid position={B} rotationY={-.2} animation="idle" time={t} face="calm"/><Load sway={.04}/>
    </>},
    {cue:"1.bag",...cam.push({on:[.08,1.47,3.16],dist:2.3,to:1.85,yaw:-4,pitch:4,fov:36}),zone:"driveway",look:"overworld-day",note:"Insert: eggs, bread and cans are all still in the carry. The potato is a tiny shape at the far trunk edge, not a reveal yet.",stage:(t)=> <>
      <EggInsert/><Load sway={Math.sin(t*5)*.08}/>
    </>},
    {cue:"1.how",...cam.orbit({on:[1.05,1.55,2.6],dist:3.3,yaw:8,yawTo:-7,pitch:4,fov:40,distTo:3.05}),zone:"driveway",look:"overworld-day",note:"He turns toward the camera without dropping the load; hold the question in his deadpan expression, then cut back to the first sensible trip.",stage:(t)=> <>
      <Kid position={B} rotationY={-.3} face="calm" headYaw={.32} time={t}/><Load/>
    </>},
  ]
});
function EggInsert(){return <group position={[.05,0,2.6]}><Block position={[0,1.3,0]} size={[1.2,.08,.9]} color="#c9b796"/><Block position={[0,1.58,0]} size={[.72,.48,.54]} color="#d7d2bd"/><Block position={[0,1.84,-.2]} size={[.72,.06,.12]} color="#aeb9a5"/><Block position={[0,1.89,.2]} size={[.65,.08,.35]} color="#eee6cd"/><Block position={[-.42,1.9,0]} size={[.16,.08,.13]} color="#b63e35"/></group>}
