import { memo, useMemo } from "react";
import * as T from "three";
import { Block, ContactShadow, Dust, Glow, GodRay, LightPool, PixelText, Sign, Tree, Vox } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hut, LanternLine, LanternPost, Well } from "../../../Topics/InThisTown/places";
import { Lantern } from "../../../Topics/InThisTown/things";
import { CakeStand, DeliveryTable, Parts, Present } from "./props";
import type { Part } from "./props";
import { LAND, RAIL_GAUGE, TIP_AT, railFrame, terrainAt, xAt, yAt } from "./rail";

// One valley: bakery at z=-22, tall rail across the orchard from -20 to 11,
// wide gravel entry from 12–29, party deck beside the rails at z=30–44.
// The camera travels in the clear corridor x=-5…5. +X side holds the stand.
const dirtPalette = ["#736d50","#8a7d59","#8e9166","#a9a37d","#615f4d"];

const section = (a: Vec3, b: Vec3, width: number, height: number, color: string): Part => {
  const from = new T.Vector3(...a), to = new T.Vector3(...b);
  const delta = to.clone().sub(from);
  const yaw = Math.atan2(delta.x,delta.z);
  const pitch = -Math.atan2(delta.y,Math.hypot(delta.x,delta.z));
  const r = new T.Euler().setFromQuaternion(new T.Quaternion().setFromEuler(new T.Euler(pitch,yaw,0,"YXZ")));
  return {at:from.lerp(to,.5).toArray(),size:[width,height,delta.length()+.007],color,rot:[r.x,r.y,r.z]};
};

function trackDetails() {
  const metal: Part[] = [], timber: Part[] = [], bed: Part[] = [];
  const start = -25.6, spacing=.48, count = 158;
  const path = Array.from({length:count+1},(_,i)=>railFrame(start+i*spacing));
  for (let i=0;i<count;i++) {
    const a=path[i], b=path[i+1];
    const z=a.origin.z;
    const rot = new T.Euler().setFromQuaternion(a.rotation);
    const r: Vec3=[rot.x,rot.y,rot.z];
    const power = (z<-15 || (z>16&&z<18));
    timber.push({at:a.world([0,-.072,0]),size:[1.435,.073,.169],color:["#78563d","#6d4f37","#846347","#584635"][i%4],rot:r});
    if (power) metal.push({at:a.world([0,-.022,0]),size:[.73,.029,.091],color:i%2?"#d97839":"#c74635",rot:r});
    for (const s of [-1,1]) {
      const x=s*RAIL_GAUGE/2;
      metal.push(section(a.world([x,-.029,0]),b.world([x,-.029,0]),.061,.055,power?"#c58d4e":"#858e91"));
      metal.push(section(a.world([x,-.001,0]),b.world([x,-.001,0]),.069,.016,power?"#edbb66":"#aaafb0"));
      if (i%2===0) metal.push({at:a.world([x+s*.064,-.026,0]),size:[.044,.037,.051],color:"#51595b",rot:r});
      if (z<12) timber.push(section(a.world([s*.586,-.162,0]),b.world([s*.586,-.162,0]),.137,.136,"#71543d"));
    }
    if (i%5===0 && z<12) {
      const y=a.origin.y-.10, ground=terrainAt(z+1)-.075;
      if (y-ground>.19) for (const s of [-1,1]) {
        const x=a.origin.x+s*.60;
        const h=y-ground;
        timber.push({at:[x,ground+h*.5,z],size:[.172,h,.187],color:"#735238"});
        bed.push({at:[x,ground+.040,z],size:[.275,.155,.297],color:"#829078"});
        if (h>.62) timber.push(section([x,ground+.09,z-.48],[x,y-.097,z+.16],.091,.098,"#634733"));
      }
    }
    for (const s of [-1,1]) if (z>=11.8) {
      bed.push({at:[s*(.53+(i%6)*.119),.023,z+.12*Math.sin(i*7.3)],size:[.14+(i%3)*.063,.038,.17+(i%4)*.053],color:dirtPalette[(i+(s>0?2:0))%5],rot:[0,.6*Math.sin(i*2.9),0]});
    }
  }
  return {metal,timber,bed};
}

const Landscape = memo(() => {
  const track = useMemo(trackDetails,[]);
  return <>
    <Vox kind="grass" side="dirt" tint="#769b5e" position={[0,-.54,8]} size={[182,1.08,191]} castShadow={false} tile={1.13} />
    {Array.from({length:20},(_,i)=>{
      const z = -25.3+i*1.8;
      const h = terrainAt(z+.85);
      if (h <= 0) return null;
      const w = 25.5+(i%3)*1.75;
      return <Vox key={i} kind="grass" side="dirt" tint={i%3?"#73975a":"#7c9d5b"} position={[xAt(z)-.32,h*.5-.013,z]} size={[w,h+.026,1.799]} tile={1.20} />;
    })}
    <Vox kind="path" tint="#b8a277" position={[0,.005,31.9]} size={[2.22,.019,41.1]} tile={.84} castShadow={false} />
    <Vox kind="mossy" tint="#95947a" position={[4.13,.018,LAND[2]+1.66]} size={[6.69,.035,12.90]} tile={1.10} castShadow={false} />
    <Parts pieces={track.timber} />
    <Parts pieces={track.metal} shadows={false} />
    <Parts pieces={track.bed} shadows={false} />
    <FarVillage />
    <Banks />
  </>;
});

function FarVillage() {
  return <>
    <Hut at={[-11.8,terrainAt(-15),-15]} w={5.1} d={5.3} windows={[-1.55,1.49]} roof="#865643" turn={.47} />
    <Hut at={[9.4,terrainAt(-7),-7]} w={5.6} d={4.4} windows={[-1.68,1.62]} roof="#6a7b69" turn={-1.26} lit />
    <Hut at={[-10.0,0,16.7]} w={6.4} d={5.3} windows={[-1.95,1.92]} roof="#975645" turn={1.21} lit />
    <Hut at={[10.7,.01,20.9]} w={6.5} d={5.9} windows={[-2.1,2.01]} wall="stoneBrick" roof="#688472" turn={-1.41} />
    <Hut at={[8.5,0,LAND[2]+4.6]} w={7.1} d={6.0} windows={[-2.2,2.11]} wall="planks" tint="#b59b75" roof="#a0584c" turn={-1.64} lit />
    <Hut at={[-11.4,0,47.8]} w={7.1} d={6.0} windows={[-2.13,2.21]} tint="#bd9d70" roof="#865552" turn={2.03} />
    <Hut at={[-8.52,0,35.0]} w={5.82} d={4.46} windows={[-1.78,1.68]} wall="planks" tint="#bc996e" roof="#9c594e" turn={1.36} lit />
    <Well position={[5.7,.018,23.7]} />
    {[[-5.5,-37.2,12.8],[10.8,-34.1,13.3],[-11.3,53.8,18.6],[7.4,58.6,19.4]].map(([x,z,w],i)=><group key={i} position={[x,0,z]}>
      <Vox kind="grass" side="dirt" tint="#779657" size={[w,5.37,12.3]} position={[0,2.632,0]} tile={1.32} />
      <Vox kind="grass" side="dirt" tint="#79985d" size={[w*.75,1.42,8.41]} position={[-.42,5.996,-.42]} tile={1.32} />
      <Tree position={[.84,6.706,-1.6]} height={3.75} spread={1.07} leaf={i%2?"#718954":"#5e8b4c"} />
    </group>)}
    <Tree position={[-5.3,0,33.4]} height={3.67} spread={1.06} leaf="#70894c" />
    <Vox kind="leaves" tint="#618050" size={[1.18,.81,6.24]} position={[-4.92,.40,34.6]} />
    <Tree position={[8.15,terrainAt(3),3]} height={3.95} spread={.88} leaf="#7a9347" />
    {[-24,-9,8,28,49,61].map((z,i)=><group key={z} position={[i%2?-24:24,0,z]}>
      <Vox kind="grass" side="dirt" tint="#789260" position={[0,1.2,0]} size={[13,2.48,14.5]} tile={1.4} />
      <Vox kind="grass" side="dirt" tint="#7f9c6c" position={[i%2?-2.3:1.7,3.01,.3]} size={[9.2,1.34,10.8]} tile={1.4} />
      <Tree position={[i%2?-3.1:2.6,3.68,.8]} height={3.12+i%3*.5} spread={1.05} leaf={i%2?"#587f58":"#678d53"} />
    </group>)}
  </>;
}

function Banks() {
  const flowers = useMemo(()=>{
    const pieces: Part[]=[];
    for(let i=0;i<205;i++) {
      const z=-24+(i*.38196601125%1)*71;
      const s=i%2?-1:1;
      const x=xAt(z)+s*(1.06+(i*.61803398875%1)*6.1);
      if (s>0&&z>29&&z<45) continue;
      const y=terrainAt(z+.49);
      const d=.11+i%7*.023;
      pieces.push({at:[x,y+d*.5,z],size:[.039,d,.047],color:["#577a42","#759750","#85a45c"][i%3],rot:[.12,0,(i%5-2)*.18]});
      if (i%3===0) pieces.push({at:[x,y+d,z],size:[.112,.062,.106],color:["#ecc976","#e5c4cb","#bf7a63","#f5e1c6"][i%4]});
    }
    return pieces;
  },[]);
  return <>
    <Parts pieces={flowers} shadows={false} />
    {[-21,-13,-5,4,12,23,43].map((z,i)=><Tree key={i} position={[(i%2?-1:1)*(6.5+(i%3)*2.0),terrainAt(z),z]} height={3.13+i%3*.51} spread={.88+(i%3)*.1} leaf={["#548949","#6f9449","#88874a"][i%3]} />)}
    {[-15,-8,1,9,19,28,43].map((z,i)=><LanternPost key={z} position={[xAt(z)+(z===28?3.44:2.02),terrainAt(z),z]} turn={-1.57} height={2.76+i%2*.28} light={0} seed={11+i} />)}
    {[-13,-6,13,21].map((z,i)=><group key={z} position={[-5.8-i%2*.6,terrainAt(z),z]}>
      <Vox kind="leaves" tint="#6b8c48" position={[0,.22,0]} size={[1.31,.53,1.05]} tile={.62} />
      <Vox kind="stone" tint="#9a9b83" position={[.56,.12,.48]} size={[.51,.30,.43]} tile={.61} />
    </group>)}
  </>;
}

const Bakery = memo(() => {
  const y = terrainAt(-23);
  return <group position={[0,y,-22.34]}>
    <Hut at={[0,0,0]} w={6.3} h={3.7} d={4.92} windows={[-1.96,1.96]} tint="#c09468" roof="#a9684b" lit open />
    <Vox kind="log" position={[0,2.92,.31]} size={[5.8,.196,.36]} tint="#745643" />
    <Sign position={[0,2.78,.56]} width={2.68} height={.55} title="HILLTOP BAKERY" bg="#7d4445" fg="#fff1cd" accent="#eeaa77" />
    {Array.from({length:11},(_,i)=><Vox key={i} kind="wool" tint={i%2?"#d5ba98":"#a45151"} position={[(i-5)*.499,2.48,.98]} size={[.502,.108,1.01]} rotation={[.11,0,0]} tile={.53} />)}
    <Vox kind="planks" tint="#a87649" position={[0,.070,.63]} size={[6.31,.14,1.38]} />
    <Lantern position={[-2.34,2.37,.72]} chain={.14} light={1.5} seed={9} />
    <Lantern position={[2.43,2.39,.72]} chain={.18} light={1.2} seed={16} />
    <Vox kind="hay" position={[-2,.4,1.07]} size={[.76,.73,.70]} />
    <GodRay position={[1.35,1.52,1.06]} rotation={[.33,0,-.35]} width={1.18} height={2.72} color="#ffd6a0" opacity={.08} />
    <Dust position={[0,1.5,2]} area={[5,3,5]} count={53} color="#ffe1a7" opacity={.26} size={.027} seed={74} />
  </group>;
});

const BUNTING = makeBunting();
function makeBunting() {
  const cables: Part[] = [], flags: Part[] = [];
  const p = (u:number):Vec3=>[5.16+.64*u,3.51-.39*Math.sin(u*Math.PI),LAND[2]-2.92+8.88*u];
  for (let i=0;i<15;i++) {
    cables.push(section(p(i/15),p((i+1)/15),.026,.026,"#605546"));
    const q=p((i+.50)/15);
    flags.push({at:[q[0],q[1]-.117,q[2]],size:[.038,.27,.26],color:["#c76372","#f4bd63","#65b4a5","#cf81b6"][i%4],rot:[-.12+.21*Math.cos(i),0,.104*Math.sin(i)]});
  }
  return [...cables,...flags];
}

const BirthdaySet = memo(() => <>
  <group position={[0,0,29.3]}>
    {[-1,1].map(s=><group key={s} position={[s*1.50,0,0]}>
      <Vox kind="cobble" position={[0,.13,0]} size={[.38,.26,.40]} />
      <Vox kind="log" tint="#906547" position={[0,1.79,0]} size={[.173,3.45,.171]} />
      <Lantern position={[0,3.33,-.14]} chain={.14} seed={16+s} />
    </group>)}
    <Vox kind="planks" tint="#a66064" position={[0,3.32,0]} size={[3.28,.428,.146]} />
    <PixelText text="BIRTHDAY" position={[0,3.336,-.087]} rotationY={Math.PI} maxWidth={2.69} height={.278} />
    {[-1.05,-.54,0,.54,1.05].map((x,i)=><Block key={x} position={[x,3.035,0]} size={[.27,.236,.063]} rotation={[0,0,(i%2?.11:-.11)]} color={["#e09772","#73b6a3","#db817c","#e8b66c","#9874b2"][i]} />)}
  </group>
  <DeliveryTable at={LAND} />
  <CakeStand at={LAND} />
  <ContactShadow position={[LAND[0]+.27,.044,LAND[2]]} width={1.93} depth={2.11} opacity={.38} />
  <Parts pieces={BUNTING} />
  <LanternLine from={[5.16,3.61,LAND[2]-3.04]} to={[5.80,3.61,LAND[2]+5.92]} count={7} sag={.33} lit={[1,5]} light={4.5} seed={23} />
  {[-3.01,5.94].map((z,i)=><group key={z} position={[i?5.80:5.16,0,LAND[2]+z]}>
    <Vox kind="log" tint="#79583f" position={[0,1.80,0]} size={[.148,3.60,.145]} />
    <Block position={[0,.131,0]} size={[.306,.246,.303]} color="#6d716c" />
    <Glow position={[0,3.52,-.04]} size={.48} opacity={.23} color="#ffd096" />
  </group>)}
  <group position={[4.91,.045,LAND[2]+.85]} rotation-y={-Math.PI/2}>
    <Vox kind="planks" tint="#89475c" position={[0,2.21,0]} size={[2.88,.503,.089]} />
    <PixelText text="HAPPY BIRTHDAY" position={[0,2.228,.051]} maxWidth={2.65} height={.268} />
    {[-1,1].map(s=><Vox key={s} kind="log" position={[s*1.33,1.26,-.052]} size={[.11,2.51,.13]} />)}
  </group>
  <Present at={[2.49,.041,LAND[2]+1.18]} yaw={.21} />
  <Present at={[3.08,.041,LAND[2]+.83]} color="#608eaa" ribbon="#f7da91" yaw={-.20} size={.57} />
  <Present at={[3.45,.041,LAND[2]+1.54]} color="#799d69" ribbon="#fae4b7" yaw={.39} size={.39} />
  <Present at={[2.9,.041,TIP_AT[2]+.69]} color="#965d8d" ribbon="#ffbe73" yaw={.32} size={.46} />
  <Vox kind="planks" tint="#917757" position={[4.32,.25,TIP_AT[2]+.42]} size={[.43,.47,2.45]} tile={.89} />
  <LightPool position={[2.75,.051,LAND[2]+1.1]} color="#fdd48b" width={5.6} depth={7.1} opacity={.24} />
  <Dust position={[2.4,1.51,LAND[2]+.45]} color="#fff0c4" area={[4.4,2.8,6.3]} count={53} size={.024} opacity={.34} speed={1.2} />
  <pointLight position={[4.24,3.18,LAND[2]-1.96]} color="#a5dfff" intensity={8.6} distance={9} decay={2} />
  <pointLight position={[.65,3.05,TIP_AT[2]+1.18]} color="#ffd4ad" intensity={7.8} distance={7} decay={2} />
</>);

export function World() {
  return <>
    <Landscape />
    <Bakery />
    <BirthdaySet />
    <pointLight position={[-1.9,6.1,-15.7]} color="#b3deff" intensity={10.0} distance={9.0} decay={2} />
    <pointLight position={[2.18,4.15,.32]} color="#bfdefb" intensity={11.1} distance={8.1} decay={2} />
  </>;
}
