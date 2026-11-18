import { Block, cam, storyScene } from "../../engine";
import { Car, Kid, Load, Sister, timing, smooth, move } from "./kit";
import type {Vec3} from "../../engine";
const FROM:Vec3=[-1.7,0,1.7], TO:Vec3=[1.1,0,2.8];
export const scene7=storyScene(timing,{
 id: "scene7",
 title:"One left",shots:[
 {cue:"7.ours",...cam.push({on:[0,1.25,2.1],dist:6.3,to:5.6,yaw:7,pitch:8,fov:45}),zone:"driveway",look:"overworld-sunset",note:"Match the opening: the kid brings the family groceries to the kitchen in one complete carry, still composed.",stage:(t)=> <>
  <Kid position={move(FROM,TO,smooth(t/1.15))} rotationY={-.15} animation="walk" arms="hold" animDistance={2*smooth(t/1.15)} face="calm" time={t}/><group position={move(FROM,TO,smooth(t/1.15))}><Load tidy sway={.025}/></group>
 </>},
 {cue:"7.trunk",...cam.truck({on:[0,1.1,-.2],by:[1.1,0,0],dist:5.8,yaw:-12,pitch:9,fov:44}),zone:"driveway",look:"overworld-sunset",note:"His sister checks the trunk. All the bags are gone, and the blue car looks empty.",stage:(t)=> <>
  <Car potato={false}/><Sister position={[-1.6,0,1.2]} animation="reach" face="calm" time={t}/>
 </>},
 {cue:"7.empty",...cam.push({on:[0,1.25,1.55],dist:6.2,to:5.2,yaw:0,pitch:19,fov:46}),zone:"driveway",look:"overworld-sunset",note:"A clear, slightly overhead view into the open trunk tray. The blanket lifts away and leaves the lone potato visible against the dark lining.",stage:(t)=> <>
  {/* A plainly readable open trunk tray sits beyond the car's rear bumper, not buried inside the solid block body. */}
  <Block position={[0,1.17,1.72]} size={[2.4,.12,1.05]} color="#252c32"/>
  <Block position={[-1.08,1.4,1.72]} size={[.12,.42,1.05]} color="#39434b"/>
  <Block position={[1.08,1.4,1.72]} size={[.12,.42,1.05]} color="#39434b"/>
  <Block position={[0,1.4,2.22]} size={[2.1,.42,.12]} color="#39434b"/>
  <Block position={[-.55,1.32,1.49]} size={[1.12,.09,.62]} color="#65717a" rotation-x={-.58*smooth(t/.38)}/>
  <Block position={[.38,1.34,1.79]} size={[.36,.23,.3]} color="#d7a75e"/>
 </>},
 {cue:"7.potato",...cam.push({on:[0,1.28,1.72],dist:4.8,to:4.0,yaw:0,pitch:24,fov:43}),zone:"driveway",look:"overworld-sunset",note:"Hold on the one bright potato, unmistakably alone in the open trunk. Let the quiet visual reveal land before he moves.",stage:()=> <>
  <Block position={[0,1.17,1.72]} size={[2.4,.12,1.05]} color="#252c32"/>
  <Block position={[-1.08,1.4,1.72]} size={[.12,.42,1.05]} color="#39434b"/>
  <Block position={[1.08,1.4,1.72]} size={[.12,.42,1.05]} color="#39434b"/>
  <Block position={[0,1.4,2.22]} size={[2.1,.42,.12]} color="#39434b"/>
  <Block position={[-.55,1.32,1.49]} size={[1.12,.09,.62]} color="#65717a" rotation-x={-.58}/>
  <Block position={[.38,1.34,1.79]} size={[.4,.25,.34]} color="#e3b76d"/>
 </>},
 {cue:"7.back",...cam.push({on:[0,1.35,2.75],dist:5.5,to:4.8,yaw:0,pitch:8,fov:45}),zone:"driveway",look:"overworld-sunset",note:"He has retrieved the potato and turns back toward the house; the small golden prop is clearly in his hands.",stage:(t)=> <>
  <Kid position={[0,0,2.65]} animation="reach" arms="hold" face="uneasy" time={t}/>
  <Block position={[0,1.02,3.02]} size={[.36,.25,.3]} color="#e3b76d"/>
 </>},
 {cue:"7.hus",...cam.truck({on:[0,1.25,2.7],by:[0,0,.45],dist:5.7,yaw:0,pitch:8,fov:44}),zone:"driveway",look:"overworld-sunset",note:"Final button, not a montage: he carries one potato in both hands, solemnly as the whole grocery mountain, breathing HUS on each visible step. Cut on the carry.",stage:(t)=> <>
  <Kid position={[0,0,2.65+1.05*smooth(t/1.15)]} animation="walk" arms="hold" animDistance={1.05*smooth(t/1.15)} face="calm" time={t}/>
  <Block position={[0,1.02,3.02+1.05*smooth(t/1.15)]} size={[.36,.25,.3]} color="#e3b76d"/>
 </>}
]});
