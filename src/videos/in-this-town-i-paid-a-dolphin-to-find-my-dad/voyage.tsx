import * as T from "three";
import { Block, MinecraftAvatar, type Vec3 } from "../../engine";
import { add, bob, cue, DINGHY, env, HARBOR_BOAT, Kid, KID, mix, palm, reach, rise, span, stance, w, wordAt } from "./kit";
import { bar, Dinghy, Dolphin, PaintedOar, Parts, Splash, Wake } from "./props";

const BOAT_PATH = new T.CatmullRomCurve3([
  new T.Vector3(...HARBOR_BOAT),new T.Vector3(.48,0,6.2),new T.Vector3(.31,0,12.9),
  new T.Vector3(3.12,0,19.9),new T.Vector3(8.9,0,27.8),new T.Vector3(...w(...DINGHY)),
]);
const SEARCH=cue("2.search").start, TURN=cue("2.turn").start, TIE=cue("2.tie").start;
const DIVE=cue("2.dive").start;
export const DOLPHIN_DIVE=wordAt("2.dive","under")-.10;
export const KID_DIVE=wordAt("2.dive","after")+.04;
export const boatPath=(p:number):Vec3=>BOAT_PATH.getPointAt(Math.max(0,Math.min(1,p))).toArray();
export const boatTime=(s:number)=>span(SEARCH-.28,TIE,s);
export const boatAt=(s:number)=>boatPath(boatTime(s));
const boatYaw=(s:number)=>{
  const dir=BOAT_PATH.getTangentAt(boatTime(s)); return Math.atan2(dir.x,dir.z);
};

function Rowing({ at, age, yaw, crew=0, searchScale=1 }: {at:Vec3; age:number;yaw:number;crew?:0|1|2;searchScale?:number}) {
  const tilt=0.043*Math.sin(age*5.43), roll=0.027*Math.sin(age*4.82);
  const p=stance("sit",age), wave=Math.sin(age*5.62), lift=Math.cos(age*5.62);
  p.bodyPitch=.24+.20*wave;
  const seat:Vec3=[0,.277,-.438];
  const al:Vec3=[-.35,.89+lift*.07,.02+.21*wave], ar:Vec3=[.35,.89+lift*.07,.02+.21*wave];
  reach(p,seat,0,KID,-1,al); reach(p,seat,0,KID,1,ar);
  return <group position={at} rotation={[tilt,yaw,roll,"YXZ"]} scale={searchScale}>
    <Dinghy at={[0,0,0]}/>
    {crew ? <MinecraftAvatar position={seat} pose={p} time={age} scale={.90} outfit="tee"
      face="bearded" skin={crew===1?"#b28363":"#d1a181"} hair={crew===1?"#584439":"#554534"}
      colors={{torso:crew===1?"#a05547":"#7c8580",arms:"skin",legs:"#424759"}} shoes="#343f42"/>
      : <Kid at={seat} yaw={0} p={p} t={age} face="brave" look={[0,1.16,3.3]}/>}
    {!crew&&<PaintedOar seam={[-.38,.285,.18]} to={[.32,.309,.98]} piece="blade" />}
    {([-1,1] as const).map((s)=>{
      const handle=palm(p,seat,0,KID,s);
      const lock:Vec3=[s*.63,.336,.11];
      const blade = add(lock,[s*.71,(-.23+Math.max(0,lift)*.19),-.22-wave*.57]);
      return <Parts key={s} pieces={[bar(handle,lock,.071,.056,"#b28e68"),bar(lock,blade,.074,.058,"#b28e68"),
        bar(mix(lock,blade,.68),add(blade,[s*.28,-.107,-.09-wave*.055]),.226,.069,"#9e704e")]}/>;
    })}
    <Wake at={[0,.03,-.86]} t={age}/>
    {[-1,1].map(s=><Splash key={s} at={[s*1.27,0,-.25]} t={(age*.893)%1} start={.24} size={.29} velocity={-1.8} seed={s*7}/>)}
  </group>;
}

export function Crossing({ s }: {s:number}) {
  const t=s-SEARCH, p=boatTime(s), b=add(boatAt(s),[0,bob(s,3),0]);
  const yaw=boatYaw(s), turn=rise(s,TURN+wordAt("2.turn","turned")-.71,TURN+.97);
  const nose=add(boatPath(Math.min(.99,p+.077)),[.65*Math.sin(turn*1.57),.036+.588*env(s,TURN-.23,TURN+.64,TURN+1.67),.36]);
  const dYaw=mix([.07,0,0],[1.41,0,0],turn)[0]-(rise(s,TIE-.71,TIE)*1.23);
  return <>
    <Rowing at={b} age={s} yaw={yaw}/>
    <Rowing at={[b[0]-1.47-t*.50,bob(s,2),b[2]+5.29+t*.77]} age={s+.17} yaw={-.38} crew={1} searchScale={1.2}/>
    <Rowing at={[b[0]-3.17-t*.83,bob(s,9),b[2]+12.3+t*.86]} age={s+.39} yaw={-.48} crew={2} searchScale={1.2}/>
    <Dolphin nose={nose} yaw={dYaw} pitch={-.38+rise(s,TURN+.6,TURN+1.5)*.57} bank={-.3*env(s,TURN-.35,TURN+.57,TURN+1.2)} t={s}/>
    <Splash at={add(boatAt(TURN+.40),[.74,0,2.95])} t={s-TURN} start={.39} size={.62}/>
  </>;
}

export const tiePost:Vec3=w(1.564,.65,-1.057);
export const tiedAt=(s:number)=>add(w(...DINGHY),[.04*Math.sin(s*1.4),bob(s,4),.036*Math.sin(s*1.82)]);
export const shardAt=(s:number)=>add(tiedAt(s),[-.34,.303,.43]);
export const shardTo=(s:number)=>add(shardAt(s),[.415,.009,-1.016]);

export function TiedBoat({ s, shard=true, rope=1 }: {s:number;shard?:boolean;rope?:number}) {
  const b=tiedAt(s);
  const cleat=add(b,[-.55,.328,-.73]);
  const wrap=add(tiePost,[.081,.112,.026]);
  const length=mix(cleat,wrap,rope), belly=add(mix(cleat,length,.56),[0,-.074*rope,0]);
  return <>
    <Dinghy at={b} yaw={-.047} roll={.038*Math.sin(s*1.45)} />
    {shard&&<PaintedOar seam={shardAt(s)} to={shardTo(s)} piece="blade"/>}
    <Block position={cleat} size={[.079,.077,.18]} color="#545b59"/>
    {rope>.007&&<Parts pieces={[
      bar(cleat,belly,.037,.038,"#a89b76"),bar(belly,length,.037,.038,"#b9a684"),
      ...(rope>.95 ? [bar(add(wrap,[-.17,-.035,-.033]),add(wrap,[.025,.006,-.082]),.034,.04,"#baa280"),
        bar(add(wrap,[.013,-.015,.06]),add(wrap,[-.195,-.058,.052]),.036,.041,"#c4af87")] : []),
    ]}/>}
  </>;
}

export function Tying({t}: {t:number}) {
  const s=TIE+t, b=tiedAt(s), at=add(b,[-.21,.275,-.52]);
  const yaw=-2.02, p=stance("kneel");p.bodyPitch=.56;
  const reachFor=rise(t,.12,.74);
  const a=mix(add(b,[-.5,.39,-.42]),add(tiePost,[.102,.133,.046]),reachFor);
  reach(p,at,yaw,KID,1,a);
  reach(p,at,yaw,KID,-1,add(b,[-.48,.42,-.24]),.92);
  const hand=palm(p,at,yaw,KID,1);
  return <>
    <TiedBoat s={s} rope={reachFor}/>
    <Kid at={at} yaw={yaw} p={p} t={s} face="brave" look={a}/>
    {reachFor<.95&&<Parts pieces={[bar(hand,add(b,[-.55,.328,-.73]),.035,.037,"#ada280")]}/>}
    <Dolphin nose={w(2.58,.18+bob(s,1),1.88)} yaw={-.16+t*.68} pitch={-.19} t={s}/>
  </>;
}

export function Diving({t}: {t:number}) {
  const s=DIVE+t, b=tiedAt(s);
  const down=rise(t,DOLPHIN_DIVE-.28,DOLPHIN_DIVE+.63), kid=rise(t,KID_DIVE-.53,KID_DIVE+.31);
  const p=stance(kid>.75?"swim":"kneel",s);
  const at=mix(add(b,[.04,.27,.46]),w(2.75,-1.20,1.28),kid);
  at[1]+=.32*Math.sin(kid*Math.PI);
  p.bodyPitch= .51+kid*.73;
  if(kid<=.75){p.armR=[-1.41-kid*.79,0,.16];p.armL=[-1.38-kid*.85,0,-.17];}
  return <>
    <TiedBoat s={s}/>
    <Kid at={at} yaw={.47*down} p={p} t={s} look={w(2.6,-.1,2.3)} face="brave"/>
    <Dolphin nose={w(2.48+.07*down,.35-1.36*down,1.39+2.26*down)} yaw={.19} pitch={-.39+1.66*down} bank={-.21*down} t={s}/>
    <Splash at={w(2.52,0,1.64)} start={DOLPHIN_DIVE} t={t} size={1.0} seed={2} velocity={1}/>
    <Splash at={w(2.76,0,1.41)} start={KID_DIVE} t={t} size={1.12} seed={12}/>
  </>;
}
