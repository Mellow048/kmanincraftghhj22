import { memo, useLayoutEffect, useRef } from "react";
import * as T from "three";
import { Block, Glow, Vox, pixelTex } from "../../engine";
import type { Vec3 } from "../../engine";
import { FLOOR, RAIL_GAUGE } from "./rail";

export type Part = { at: Vec3; size: Vec3; color: string; rot?: Vec3 };
const cube = new T.BoxGeometry(1,1,1);

/** Batch the small details; keep the moving assemblies separate from the track. */
export const Parts = memo(({ pieces, shadows = true }: { pieces: readonly Part[]; shadows?: boolean }) => {
  const ref = useRef<T.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const o = new T.Object3D();
    const c = new T.Color();
    pieces.forEach(({ at, size, color, rot }, i) => {
      o.position.set(...at);
      o.scale.set(...size);
      o.rotation.set(...(rot ?? [0,0,0]));
      o.updateMatrix();
      mesh.setMatrixAt(i,o.matrix);
      mesh.setColorAt(i,c.set(color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  },[pieces]);
  return <instancedMesh ref={ref} args={[cube,undefined,pieces.length]} castShadow={shadows} receiveShadow>
    <meshStandardMaterial roughness={.89} />
  </instancedMesh>;
});

const BANDS: Part[] = [
  {at:[0,.277,0],size:[1.22,.094,1.49],color:"#424c54"},
  {at:[0,.222,0],size:[1.03,.065,1.34],color:"#333b44"},
];
for (const s of [-1,1]) {
  BANDS.push(
    {at:[s*.575,.543,0],size:[.110,.438,1.50],color:"#616e78"},
    {at:[s*.571,.777,0],size:[.151,.082,1.59],color:"#b5bac0"},
    {at:[s*.638,.624,0],size:[.022,.102,1.463],color:"#87949c"},
    {at:[s*.635,.407,0],size:[.029,.117,1.478],color:"#46535c"},
    {at:[0,.543,s*.704],size:[1.112,.438,.109],color:"#6d7980"},
    {at:[0,.777,s*.734],size:[1.292,.082,.129],color:"#b8c1c5"},
    {at:[0,.395,s*.769],size:[1.19,.103,.028],color:"#475259"},
    {at:[0,.640,s*.770],size:[1.117,.086,.023],color:"#879398"},
  );
  for (let i=0;i<5;i++) {
    BANDS.push({at:[s*.658,.623,(i-2)*.282],size:[.026,.040,.038],color:i%2?"#b6bec3":"#515d62"});
    BANDS.push({at:[(i-2)*.226,.633,s*.79],size:[.039,.040,.022],color:"#b8bfc0"});
  }
}
for (let i=0;i<6;i++) BANDS.push({at:[(i-2.5)*.169,FLOOR-.009,0],size:[.166,.018,1.28],color:["#635854","#6b6160","#76706a"][i%3]});

const Wheel = ({ at, spin }: { at: Vec3; spin: number }) => <group position={at} rotation={[spin,0,0]}>
  <mesh rotation={[0,0,Math.PI/2]} castShadow receiveShadow>
    <cylinderGeometry args={[.168,.168,.123,12]} />
    <meshStandardMaterial color="#292f35" roughness={.85} />
  </mesh>
  <mesh rotation={[0,0,Math.PI/2]} castShadow receiveShadow>
    <cylinderGeometry args={[.127,.127,.155,12]} />
    <meshStandardMaterial color="#5b6770" roughness={.76} metalness={.19} />
  </mesh>
  <Block size={[.179,.085,.085]} color="#9f8464" />
  {[0,1,2,3].map(i=><group key={i} rotation={[i*Math.PI/2,0,0]}>
    <Block position={[0,.081,0]} size={[.172,.029,.029]} color="#677881" />
  </group>)}
</group>;

export const Minecart = ({ distance }: { distance: number }) => <>
  <Parts pieces={BANDS} />
  {[-1,1].flatMap(x=>[-.461,.461].map(z=><Wheel key={`${x}/${z}`} at={[x*(RAIL_GAUGE/2),.168,z]} spin={distance/.168} />))}
  <Block position={[0,.562,.785]} size={[.475,.196,.043]} color="#963e40" />
  <Block position={[0,.566,.811]} size={[.426,.144,.022]} color="#b8634c" />
  <Block position={[0,.549,.828]} size={[.204,.044,.022]} color="#f6dec0" />
  <Block position={[0,.585,.828]} size={[.144,.036,.022]} color="#f2bd8e" />
  <Block position={[0,.615,.829]} size={[.028,.029,.022]} color="#edbd65" />
</>;

const CAKE_PARTS: Part[] = [
  {at:[0,.027,0],size:[.988,.054,.820],color:"#5e8988"},
  {at:[0,.050,0],size:[.950,.025,.779],color:"#85b8b3"},
  {at:[0,.160,0],size:[.843,.214,.684],color:"#bc7850"},
  {at:[0,.177,0],size:[.850,.038,.691],color:"#ba405b"},
  {at:[0,.274,0],size:[.867,.127,.711],color:"#fff1de"},
  {at:[0,.376,-.014],size:[.584,.139,.480],color:"#ca9466"},
  {at:[0,.465,-.014],size:[.602,.092,.500],color:"#fff3de"},
  {at:[0,.423,-.014],size:[.591,.028,.494],color:"#df7887"},
];
for (let i=0;i<11;i++) {
  const x = (i-5)*.071;
  const len=.047+((i*13)%5)*.010;
  for (const s of [-1,1]) {
    CAKE_PARTS.push({at:[x,.218-len/2,s*.349],size:[.051,len,.019],color:i%3?"#f9e5d2":"#efc6bd"});
    CAKE_PARTS.push({at:[x*.86,.343,s*.302],size:[.043,.018,.034],color:["#d75068","#e89a89","#a73551"][i%3]});
  }
}
for (const x of [-.21,0,.21]) {
  const y = x===0 ? .596 : .567;
  const h = x===0 ? .173 : .126;
  CAKE_PARTS.push({at:[x,y,-.014],size:[.052,h,.052],color:x===0?"#9870b5":"#ea7d6a"});
  CAKE_PARTS.push({at:[x,y+h/2+.009,-.014],size:[.014,.023,.014],color:"#5f3b34"});
  for (const s of [-1,1]) CAKE_PARTS.push({at:[x,y+.018*s,.014],size:[.054,.012,.008],color:"#ffd498"});
}
export const BirthdayCake = ({ lit }: { lit: boolean }) => <>
  <Parts pieces={CAKE_PARTS} />
  {lit && <>
    <Block position={[0,.720,-.014]} size={[.038,.067,.038]} color="#fff2a3" emissive="#f7aa42" emissiveIntensity={.7} />
    <Glow position={[0,.727,-.014]} size={.20} color="#ffad4c" opacity={.27} />
  </>}
</>;

export const Present = ({ at, size = .44, color = "#ba576d", ribbon = "#ffc770", yaw = 0 }: { at: Vec3; size?: number; color?: string; ribbon?: string; yaw?: number }) => <group position={at} rotation-y={yaw}>
  <Block position={[0,size*.43,0]} size={[size,size*.86,size*.85]} map={pixelTex(color,[.4,.4],{jitter:.044})} />
  <Block position={[0,size*.87,0]} size={[size*1.075,size*.14,size*.92]} color={color} />
  <Block position={[0,size*.48,0]} size={[size*.17,size*.96,size*.878]} color={ribbon} />
  <Block position={[0,size*.94,0]} size={[size*1.08,size*.024,size*.168]} color={ribbon} />
  {[-1,1].map(s=><Block key={s} position={[s*size*.14,size*1.01,0]} size={[size*.26,size*.12,size*.13]} rotation={[0,0,s*.52]} color={ribbon} />)}
</group>;

export const Emerald = () => <group>
  <Block size={[.163,.227,.085]} color="#1c885d" metalness={.17} roughness={.49} />
  <Block size={[.234,.139,.084]} color="#329c69" metalness={.12} roughness={.50} />
  <Block position={[0,.006,.046]} size={[.153,.148,.022]} color="#52db84" />
  <Block position={[-.032,.052,.060]} size={[.063,.024,.009]} color="#c3ffb0" emissive="#56db76" emissiveIntensity={.22} />
  <Block position={[.042,-.046,.060]} size={[.077,.028,.008]} color="#26995b" />
</group>;

export const CakeStand = ({ at }: { at: Vec3 }) => <group position={at}>
  <Block position={[0,-.016,0]} size={[1.067,.032,.914]} color="#e5ede8" />
  <Block position={[0,-.041,0]} size={[1.015,.021,.869]} color="#7da8b1" />
  <Block position={[0,-.087,0]} size={[.206,.088,.206]} color="#e0dacc" />
  <Block position={[0,-.128,0]} size={[.520,.033,.437]} color="#bdd0cb" />
</group>;

export const DeliveryTable = ({ at }: { at: Vec3 }) => <group position={[at[0]+.23,at[1]-.148,at[2]]}>
  {[-1,1].flatMap(x=>[-1,1].map(z=><Vox key={`${x}/${z}`} kind="log" tint="#78503d" position={[x*.578,-.606,z*.571]} size={[.141,1.10,.141]}/>))}
  <Vox kind="planks" tint="#a57550" position={[0,-.078,0]} size={[1.590,.125,1.459]} tile={.78} />
  <Vox kind="wool" tint="#a25867" position={[0,-.004,0]} size={[1.602,.023,1.418]} tile={.49} />
  {[-1,1].map(s=><group key={s} position={[s*.805,-.128,0]}>
    <Vox kind="wool" tint="#99495b" size={[.027,.250,1.418]} tile={.49} />
    {[-.57,-.42,-.27,-.12,.03,.18,.33,.48,.63].map((z,i)=><Block key={z} position={[0,-.13,z]} size={[.033,.051,.109]} color={i%2?"#f5d5a6":"#db9e71"} />)}
  </group>)}
  <Vox kind="log" tint="#82503a" position={[0,-.755,0]} size={[.171,.117,1.271]} />
</group>;
