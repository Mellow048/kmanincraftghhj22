import { memo } from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, useActiveShot, useFilmTime, Vox, Zone } from "../../engine";
import { Fence, Hut, LanternPost } from "../../../Topics/InThisTown";
import { CHEST, DECK, hatchMove, planksMove, ROOF, WRECK, w } from "./kit";
import { Parts, bar, type Piece } from "./props";
import { Sea } from "./sea";

const wood=["#94684b","#a37955","#89634b","#b08259","#986d4f","#a88662","#75543c"];
const rocks=["#5c7775","#6b807c","#57736c","#687774","#63716d"];
const hash=(i:number)=>((Math.sin(i*12.763+94.23)*34763.68)%1+1)%1;
const dock:Piece[]=[];
for(let i=0;i<27;i++) {
  const z=1.53-i*0.359;
  dock.push({at:[-0.15,DECK-0.09,z],size:[2.43+(i%6===0?0.08:0),0.18,0.349],color:wood[i%wood.length]});
  for(const x of [-1.22,0.94]) dock.push({at:[x,DECK+0.004,z],size:[0.038,0.012,0.031],color:"#4c5351"});
}
for(let i=0;i<16;i++) {
  const x=-1.52-i*0.355;
  dock.push({at:[x,DECK-0.092,0.66],size:[0.345,0.183,1.14+hash(i)*.05],color:wood[(i*11)%wood.length]});
}
for(const [x,z] of [[-.99,1.34],[-.99,-2.2],[.96,-2.2],[.96,-5.53],[-.99,-5.53],[-3.51,.99],[-5.72,0.14],[-6.92,1.01]]){
  dock.push({at:[x,-0.14,z],size:[0.238,2.219,0.238],color:"#70523c"});
  dock.push({at:[x,0.934,z],size:[0.275,0.118,0.275],color:"#ac825c"});
  dock.push({at:[x,0.778,z],size:[0.250,0.074,0.250],color:"#c0a47b"});
}
const TOWN= memo(function Town(){return <>
  <Vox kind="sand" position={[-8.9,-0.41,-12.9]} size={[31.5,1.9,15.3]} tint="#c1ae8e"/>
  <Vox kind="grass" side="dirt" position={[-11.5,0.18,-15.1]} size={[30.5,1.46,13.28]} tint="#657f43"/>
  <Vox kind="path" position={[-7.9,0.928,-9.8]} size={[27,0.037,3.1]} tint="#a0805e"/>
  <Hut at={[-5.5,0.93,-11.8]} w={5.6} d={5.7} h={3.2} windows={[-1.58,1.49]} roof="#3f6870" tint="#baa476"/>
  <Hut at={[1.42,0.91,-11.6]} w={4.5} d={4} h={3.1} windows={[1.24]} door={-1.03} roof="#9b5949" tint="#d2bb8d"/>
  <Hut at={[-12.6,0.93,-12.1]} w={5.4} d={5.8} h={3.6} windows={[-1.49,1.53]} roof="#94614b" wall="cobble"/>
  <Hut at={[-18,0.93,-14.7]} w={4.6} h={3} windows={[1.35]} roof="#406667" tint="#ac9a79"/>
  <Hut at={[-3.9,1.2,-23.5]} w={5.8} h={4.1} roof="#5b7461" tint="#aeb59e"/>
  <Vox kind="cobble" position={[-0.15,0.28,-7.52]} size={[2.45,0.56,0.93]}/>
  <Vox kind="stone" position={[-0.15,0.635,-8.07]} size={[2.47,0.25,0.71]}/>
  <Vox kind="stone" position={[-0.15,0.798,-8.52]} size={[2.47,0.19,0.58]}/>
  <Fence from={[-8.15,0.91,-8.46]} to={[-2.35,0.91,-8.46]}/>
  <Fence from={[1.73,0.91,-8.65]} to={[5.2,0.91,-8.65]}/>
  <Tree position={[-10.4,0.92,-9.2]} height={4.1} leaf="#638551"/>
  <Tree position={[-16.57,0.92,-8.6]} height={4.2} leaf="#598452"/>
  <Tree position={[5.9,0.91,-14.07]} height={4.8} leaf="#648c53"/>
  <Tree position={[-1.2,0.92,-17.76]} height={4.6} leaf="#66894c"/>
  <Tree position={[-21.1,0.92,-17.7]} height={5.7} leaf="#567e48"/>
  <Parts pieces={dock}/>
  <LanternPost position={[-1.09,DECK,-3.95]} turn={Math.PI/2} height={2.29} seed={4}/>
  <LanternPost position={[-5.69,DECK,0.83]} turn={Math.PI} height={2.12} seed={8}/>
  <Vox kind="darkPlanks" position={[-0.87,0.82,-2.84]} size={[0.71,0.44,0.57]} tint="#947353"/>
  <Vox kind="planks" position={[-0.94,0.82,-1.06]} size={[0.63,0.45,0.59]} tint="#a0794b"/>
  <Vox kind="planks" position={[-0.92,1.19,-1.10]} size={[0.47,0.302,0.40]} tint="#987544"/>
  <Block position={[-3.7,0.983,1.16]} size={[0.31,0.42,0.08]} color="#b14c40"/>
  <Block position={[-3.7,1.018,1.21]} size={[0.295,0.07,0.024]} color="#e0d2b4" rotation-z={0.30}/>
  <GodRay position={[-2.2,5.3,-2.4]} width={6} height={13} rotation={[0.35,0,0.52]} opacity={0.035} color="#ffecd0"/>
  <Dust position={[-0.54,1.4,0.10]} area={[8,2,5]} count={22} size={0.033} color="#ffe9c8" opacity={0.22} seed={12} speed={0.3}/>
  <Glow position={[-1.09,2.32,-3.93]} size={.79} opacity={.11} color="#f8c784"/>
  <LightPool position={[-0.34,DECK+0.01,-3.8]} width={2.9} depth={3.5} color="#ffc77a" opacity={0.12}/>
</>});

const islands:Piece[]=[];
for(const [cx,cz,r,h] of [[-39,12,8.5,6],[28,39,7.8,5],[26,44,4.1,3],[-31,60,7.1,6],[-49,43,10.5,7],[-15,-26,9.0,5.4],[17,56,3.9,2.4],[12,29,3.3,1.2]]){
  for(let i=0;i<21;i++){
    const a=i*2.39996,rad=Math.sqrt(i/21)*r;
    const x=cx+Math.cos(a)*rad, z=cz+Math.sin(a)*rad;
    const y=Math.max(0.34,Math.round((h*(1-rad/r)*.8+hash(i)*h*.37)*3)/3);
    const sx=r*(0.27+hash(i+7)*.21), sz=r*(.26+hash(i+53)*.22);
    islands.push({at:[x,(y-.84)/2,z],size:[sx,y+.84,sz],color:rocks[i%5]});
    if(y>.57) islands.push({at:[x,y+0.06,z],size:[sx,0.12,sz],color:["#657b4d","#5f7749","#526b47"][i%3]});
  }
}
const seabed:Piece[]=[];
for(let i=0;i<90;i++){
  const x=(hash(i*3+1)-.5)*24, z=(hash(i*3+2)-.5)*26;
  const h=.21+Math.floor(hash(i*3+3)*5)*0.27;
  const hue=i%3?rocks[i%5]:"#829882";
  seabed.push({at:[x,-3.26+h/2,z],size:[0.45+hash(i*9)*1.58,h,0.63+hash(i*9+5)*1.85],color:hue});
  if(i%3===1) for(let j=0;j<4;j++){
    const ht=.19+hash(i*11+j)*.53;
    seabed.push({at:[x+(j%2-.5)*.20,-3.26+h+ht*.5,z+(Math.floor(j/2)-.5)*.20],size:[.065,ht,.06],color:["#496453","#668266","#598374"][j%3],turn:[.16*(j-1),0,.14*(j-2)]});
  }
}
const ship:Piece[]=[];
// Jagged hull with continuous strakes; the torn bow opens a route to the chest below.
for(let row=0;row<6;row++)for(const side of [-1,1]){
  for(let i=0;i<10;i++){
    const z=-4.18+i*.76, width=1.34-(row*.095)-(z<-2.7?(-z-2.7)*.27:0)-(z>1.85?(z-1.85)*.36:0);
    if((side===1 && i<5 && (row===0 || (i>1&&i<4&&row<5))) || (side===-1&&i===0&&row<3)) continue;
    const x=side*(width+.12), y=.28-row*.40;
    ship.push({at:[x,y,z],size:[.217,.371,.75],color:wood[(i+row*3+4)%7]});
    if((i%3===0 && row>0)||(i%2===0&&row===0))ship.push({at:[x+side*.09,y+.10,z],size:[.105,.102,.75],color:row===0?"#63847e":"#405f59"});
  }
}
for(let i=0;i<11;i++)ship.push({at:[0,-2.22,-4.18+i*.68],size:[i<2?1.68:2.15,.22,.661],color:wood[(5+i*2)%7]});
for(const z of [-3.54,-2.03,-.55,.86,2.38]) {
  ship.push(bar([-1.42,.36,z],[-.82,-2.17,z-.12],.16,.19,"#654e3a"));
  if(z> -2.03)ship.push(bar([1.43,.36,z],[.82,-2.22,z-.12],.16,.19,"#644e40"));
}
// Back and far walls, with a broken slot on the side facing the dinghy.
for(let i=0;i<5;i++){
  const y=.24+i*.181;
  ship.push({at:[-1.51,y,.19],size:[.18,.173,4.67],color:wood[(i+4)%7]});
  ship.push({at:[0,y,2.43],size:[3.06,.173,.2],color:wood[(i+2)%7]});
  ship.push({at:[0,y,-2.14],size:[2.92,.173,.18],color:wood[(i+3)%7]});
  if(i<2)ship.push({at:[1.51,y,.19],size:[.196,.174,4.67],color:wood[i+2]});
  else {
    ship.push({at:[1.51,y,1.253+(i%2)*.055],size:[.184,.173,2.372-(i%2)*.11],color:wood[i+1]});
    ship.push({at:[1.51,y,-1.52],size:[.189,.173,1.25+(i%2)*.16],color:wood[i+2]});
  }
}
for(let i=0;i<17;i++){
  const z=-2.08+i*.274;
  if(z>=.356 && z<=1.73){
    ship.push({at:[-1.127,ROOF-.081,z],size:[1.068,.152,.267],color:wood[(i*3)%7]});
    ship.push({at:[1.210,ROOF-.081,z],size:[.754,.152,.267],color:wood[(i*3+2)%7]});
  } else ship.push({at:[-.016,ROOF-.081,z],size:[3.195,.152,.267],color:wood[(i*3)%7]});
}
ship.push(
  {at:[0,0.087,.17],size:[2.99,.145,4.54],color:"#80644d"},
  {at:[1.55,.92,1.66],size:[.217,1.23,.211],color:"#6c513a"},
  {at:[1.55,.92,-1.06],size:[.19,1.25,.217],color:"#6a513d"},
  {at:[-.98,1.76,-1.71],size:[.24,1.114,.25],turn:[.24,0,.08],color:"#685043"},
  {at:[1.01,1.302,-.02],size:[.247,.13,.27],turn:[0,.11,-.08],color:"#766952"},
  {at:[1.45,1.09,1.07],size:[.214,.78,.16],color:"#55746d"},
);
// Low strip of ragged sail and mast splinter, well out of the hand/hatch action.
for(let i=0;i<6;i++)ship.push({at:[-1.03+i*.146,1.59-(i%3)*.15,-1.80-(i*.07)],size:[.159,.52-(i%3)*.12,.066],turn:[.13,-.38,-.17],color:i%2?"#8d9b90":"#a3aea1"});
const floorBars:Piece[]=Array.from({length:10},(_,i)=>({at:[-.006,.165,-1.99+i*.45],size:[2.7,.064,.427],color:wood[(i*5+5)%7]}));
const REEF=memo(function Reef(){return <group position={WRECK}>
  <Parts pieces={ship}/><Parts pieces={floorBars}/>
  <Vox kind="planks" position={[CHEST[0]-.046,CHEST[1]-.071,CHEST[2]+.083]} size={[1.76,.151,1.47]} tint="#857756" rotation={[0,.52,0]}/>
  <Vox kind="mossy" position={[4.56,-.31,4.31]} size={[2.44,.71,2.06]} tint="#607b67"/>
  <Vox kind="stone" position={[5.39,-.03,4.51]} size={[1.73,.66,1.57]} tint="#677b72"/>
  <Vox kind="mossy" position={[5.84,.31,4.76]} size={[1.39,.49,1.33]} tint="#6c8268"/>
  <Vox kind="stone" position={[4.78,-.20,3.09]} size={[1.65,.45,.82]} tint="#657d71"/>
  <Vox kind="sand" position={[0,-3.61,0]} size={[46,.64,49]} tint="#869f87"/>
  <Parts pieces={seabed} shadow={false}/>
  <Dust position={[1.35,-1.90,-1.5]} area={[9,2.9,12]} count={48} size={.031} color="#c8e5d8" opacity={0.29} speed={0.24} seed={6}/>
  <LightPool position={[2.1,-3.27,-3.0]} width={6.5} depth={7.2} color="#a9f4de" opacity={.27}/>
</group>});

/** The shutter and fallen beam are never camera cheats: they move through space in that order. */
export function WreckHardware({ s }: {s:number}) {
  const beam=planksMove(s), hatch=hatchMove(s);
  const tug=0.012*Math.sin((s-46)*43)*(s>=46.14&&s<=47.26 ? Math.sin((s-46.14)*2.60) : s>=48.23&&s<=49.1 ? Math.sin((s-48.23)*3.6) : 0);
  return <group position={WRECK}>
    <group position={[-.583,ROOF-.053,.365]} rotation-z={hatch*1.48+tug}>
      <Vox kind="darkPlanks" tint="#b18a66" position={[.71,0,.69]} size={[1.42,.131,1.389]}/>
      {[.12,1.23].map(x=><Block key={x} position={[x,.068,.69]} size={[.108,.045,1.37]} color="#77543b"/>)}
      {[.16,1.22].map(z=><Block key={z} position={[.045,.045,z]} size={[.213,.084,.114]} color="#4b5652"/>)}
      <Block position={[1.28,.103,.66]} size={[.15,.073,.293]} color="#525952"/>
      <Block position={[1.281,.147,.660]} size={[.055,.041,.195]} color="#a3a194"/>
    </group>
    <group position={[.668+beam*.608,1.436+Math.sin(Math.PI*beam)*.135,1.00-beam*.095]} rotation={[.023,-.075-beam*.13,-.24-beam*1.641]}>
      <Vox kind="log" tint="#84634d" position={[0,0,0]} size={[.308,.302,2.452]}/>
      <Vox kind="planks" tint="#9c7451" position={[-.008,.002,-1.232]} size={[.287,.284,.035]}/>
      <Block position={[-.036,.061,-1.277]} size={[.102,.077,.112]} color="#9d7b5a"/>
    </group>
  </group>;
}

export function World(){
  const a=useActiveShot(), seconds=useFilmTime();
  const underwater=a?.shot.zone==="underwater";
  const warm=a?.shot.look==="overworld-sunset";
  return <>
    <Sea warm={warm}/>
    {!underwater&&<Parts pieces={islands} shadow={false}/>}
    <Zone name="harbor" with={["sea"]}><TOWN/></Zone>
    <Zone name="wreck" with={["underwater"]}><REEF/><WreckHardware s={seconds}/></Zone>
    {underwater&&<>
      <GodRay position={w(3.4,-1.31,-3.5)} rotation={[.13,0,-.49]} width={2.8} height={3.6} color="#96efdf" opacity={.095}/>
      <GodRay position={w(-1.8,-1.46,1.8)} rotation={[.24,0,-.27]} width={2.4} height={3.8} color="#a7e6d9" opacity={.068}/>
      <fogExp2 attach="fog" args={["#3f8c89",0.106]}/>
      <pointLight position={w(2.4,-.9,-3.5)} intensity={.80} decay={0} distance={7.9} color="#a8e3d9"/>
      <pointLight position={w(2.02,-1.46,-3.04)} intensity={.45} decay={0} distance={3.2} color="#ffc384"/>
    </>}
    {a?.shot.zone==="wreck" && <>
      <pointLight position={w(.42,.68,-.56)} intensity={.71} decay={0} distance={3.2} color="#eec99e"/>
      <pointLight position={w(3.1,1.12,.05)} intensity={.39} decay={0} distance={5.9} color="#c6e8e2"/>
    </>}
    {warm&&<pointLight position={[2.3,2.42,1.93]} intensity={.85} decay={0} distance={8.3} color="#fff0c9"/>}
  </>;
}
