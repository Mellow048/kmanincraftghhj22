import { Block, Glow, type Vec3 } from "../../engine";
import { add, cue, Dad, DAD, FOLEY, hatchMove, Kid, KID, mix, palm, reach, reachCeiling, rise, ROOF, span, stance, w, wordAt } from "./kit";
import { FishingWreck } from "./clue";
import { PaintedOar, Splash } from "./props";
import { shardAt, shardTo, TiedBoat, tiedAt } from "./voyage";

const BEAM=cue("5.beam").start, PULL=cue("5.pull").start, PUSH=cue("5.push").start,
  FETCH=cue("5.boat").start, UNDER=cue("5.under").start, NOW=cue("5.now").start,
  UP=cue("6.up").start, SAFE=cue("6.boat").start;
const POST=cue("5.open").start;
const handle=w(.70,ROOF+.127,1.026), edge=w(1.38,ROOF,-.447);
const tugTime=wordAt("5.pull","pulled");
const slipTime=wordAt("5.pull","slipped");
const pushTime=wordAt("5.push","pushed");

function BeamArrival({s}: {s:number}){
  const b=tiedAt(s), t=s-BEAM, q=rise(t,.21,1.47);
  const a=mix(add(b,[-.31,.28,-.22]),w(1.09,ROOF,1.54),q);
  a[1]+=.30*Math.sin(q*Math.PI);
  const yaw=-.70-q*1.26, p=stance("kneel");
  p.bodyPitch=.62-.27*q;
  p.bodyY-=.063*(1-q);
  p.legR=[-1.06+.46*q,0,.11]; p.kneeR=[1.31-.69*q,0,0];
  p.legL=[-.31-.61*q,0,-.13]; p.kneeL=[1.22-.36*q,0,0];
  reach(p,a,yaw,KID,1,mix(edge,handle,q*.82),.88);
  reach(p,a,yaw,KID,-1,mix(w(1.51,ROOF,.37),w(.83,ROOF,1.53),q),.93);
  return <><TiedBoat s={s}/><Kid at={a} yaw={yaw} p={p} t={s} look={handle} face="brave"/><FishingWreck s={s}/></>;
}

function Pulling({s}: {s:number}){
  const t=s-PULL;
  const tug=rise(t,tugTime-.12,slipTime-.11), down=rise(t,slipTime,slipTime+.39);
  const a=w(1.034+.165*down,ROOF,1.595+.153*down);
  const yaw=-2.47, p=stance("kneel");
  p.bodyY=-.18+.05*tug-.15*down; p.bodyPitch=.46-.35*tug+.58*down;
  p.legL=[-.72-.48*down,0,-.11]; p.legR=[.08+.83*down,0,.13];
  p.kneeL=[.94,0,0]; p.kneeR=[1.22-.55*down,0,0];
  reach(p,a,yaw,KID,1,add(handle,[0,.037,.075]),1-.59*down);
  reach(p,a,yaw,KID,-1,mix(add(handle,[.017,.024,-.098]),w(1.08,ROOF+.042,1.86),down));
  const count= t>slipTime&&t<slipTime+.35 ? 5:0;
  return <>
    <TiedBoat s={s}/>
    <Kid at={a} yaw={yaw} p={p} t={s} face={down>.1?"ouch":"brave"} look={handle}/>
    {Array.from({length:count},(_,i)=>{
      const q=span(slipTime,slipTime+.35,t);
      return <Block key={i} position={w(1.0+(i-2)*.045+q*.19,ROOF+.014+Math.sin(q*Math.PI)*(.06+.02*i),1.64+(i-1)*.062+q*.15)}
        size={[.023,.024,.026]} color="#cda477"/>;
    })}
  </>;
}

export function DadBelow({s, work=false}: {s:number;work?:boolean}){
  const t=s-PUSH, p=stance("low");
  const strain=work ? rise(t,.07,pushTime+.36)*(1-rise(t,1.33,2.30)) : rise(s,NOW+.32,NOW+1.68);
  const h=hatchMove(s);
  const a=w(.133,.13+(strain*.03)+h*.002,1.080);
  const yaw=1.16;
  p.bodyY=-.754+.033*strain+.24*h; p.bodyPitch=.52-.055*strain;
  // An aimed rigid arm does not shorten. Cap the actual palm until the lid is out of its way.
  const cap=ROOF-.245+.35*h;
  reachCeiling(p,a,yaw,DAD,1,w(.35,.89+.22*strain,1.05),cap,.70+.30*strain);
  reachCeiling(p,a,yaw,DAD,-1,w(.39,.87+.22*strain,1.15),cap,.69+.31*strain);
  return <Dad at={a} yaw={yaw} p={p} t={s} face={strain>.4?"ouch":"brave"} look={w(.48,1.38,1.14)}/>;
}

function Fetching({s}: {s:number}){
  const b=tiedAt(s), t=s-FETCH, p=stance("low");
  const a=add(b,[.015,.272,.04]), yaw=.31;
  p.bodyPitch=.60-rise(t,1.08,2.0)*.25;
  p.bodyY-=.047;
  const st=shardAt(s), end=shardTo(s);
  const take=rise(t,wordAt("5.boat","half")-.24,wordAt("5.boat","half")+.30), raise=rise(t,1.12,1.95);
  reach(p,a,yaw,KID,-1,mix(st,add(st,[-.10,.61,.20]),raise));
  reach(p,a,yaw,KID,1,mix(add(b,[.47,.335,.38]),add(end,[-.22,.52,.61]),raise),.89);
  const h=palm(p,a,yaw,KID,-1);
  const seam=mix(st,add(h,[.018,-.07,.027]),take);
  return <>
    <TiedBoat s={s} shard={false}/>
    <PaintedOar seam={seam} to={add(seam,mix([end[0]-st[0],end[1]-st[1],end[2]-st[2]],[.74,.48,-.66],raise))} piece="blade"/>
    <Kid at={a} yaw={yaw} p={p} t={s} face="brave" look={seam}/>
  </>;
}

/** This is a true lever: point and grip are sampled on opposite sides of the same pivot. */
export function OarLever({s}: {s:number}) {
  const seat=rise(s,UNDER+.12,UNDER+wordAt("5.under","under")+.25);
  const press=rise(s,NOW+wordAt("5.now","leaned")-.48,FOLEY.roll+.15);
  const free=rise(s,FOLEY.roll+.32,FOLEY.hatch+.68);
  const z=-.14+(1-seat)*.31-free*.46;
  const pivot=w(1.011+(1-seat)*.32+free*.54,1.378+(1-seat)*.108+free*.05,z);
  const angle=.25-.48*press+.15*free;
  const tip=add(pivot,[-.354*Math.cos(angle),-.354*Math.sin(angle),-.015]);
  const end=add(pivot,[.796*Math.cos(angle),.796*Math.sin(angle),.044]);
  const at=w(1.21+free*.054,ROOF,-.650+free*.170);
  const yaw=.556+free*.37,p=stance("kneel");
  p.bodyY=-.255-.101*press+.16*free;
  p.bodyPitch=.48+.23*press-.22*free;
  reach(p,at,yaw,KID,1,add(mix(end,tip,.12),[.017,.057,0]));
  reach(p,at,yaw,KID,-1,add(mix(end,tip,.36),[-.006,.057,-.025]));
  return <>
    <TiedBoat s={s} shard={false}/>
    <PaintedOar seam={tip} to={end} piece="blade" roll={.07}/>
    <Kid at={at} yaw={yaw} p={p} t={s} face={free>.74?"wow":"brave"} look={free>.56?w(.37,1.94,1.06):tip}/>
    {s>=NOW&&<DadBelow s={s}/>}
    {s>=FOLEY.hatch && hBeamLight(s)}
  </>;
}
const hBeamLight = (s:number) => <Glow position={w(.33,1.46,1.05)} size={1.35} color="#fbd9a2" opacity={.22*hatchMove(s)}/>;

export function RescueWork({s, beat}: {s:number;beat:"beam"|"pull"|"push"|"boat"|"wedge"}){
  if(beat==="beam") return <BeamArrival s={s}/>;
  if(beat==="pull") return <Pulling s={s}/>;
  if(beat==="push") return <><DadBelow s={s} work/><TiedBoat s={s}/></>;
  if(beat==="boat") return <Fetching s={s}/>;
  return <OarLever s={s}/>;
}

export function ArmsOut({s, boat=false}: {s:number;boat?:boolean}) {
  const t=s-(boat?SAFE:UP);
  const up=boat ? 1 : rise(t,wordAt("6.up","arm")-.75,2.40);
  const settle=boat?rise(t,.23,1.36):0;
  const b=tiedAt(s), d=mix(w(.14,.123+.962*up,1.043),add(b,[-.02,.281,.421]),settle);
  const k=mix(w(1.085,ROOF,.27+.28*up),add(b,[.113,.268,-.461]),settle);
  d[1]+=boat ? .245*Math.sin(settle*Math.PI) : 0;
  const dp=stance("kneel"), kp=stance("kneel");
  dp.bodyY=-.44+.24*up-.19*settle;
  dp.bodyPitch=.49-.21*up+.19*settle;
  const dyaw=1.70-1.94*settle, kyaw=-.91+1.1*settle;
  const meeting=mix(w(.77,1.26+.56*up,.84),add(b,[-.070,.81,.168]),settle);
  reach(dp,d,dyaw,DAD,1,meeting); reach(dp,d,dyaw,DAD,-1,mix(w(.29,1.244,1.72),add(b,[-.52,.39,.63]),settle));
  const hand=palm(dp,d,dyaw,DAD,1);
  reach(kp,k,kyaw,KID,-1,add(hand,[-.041,.043,.047]));
  reach(kp,k,kyaw,KID,1,mix(w(.74,1.288,.643),add(b,[.47,.38,-.08]),settle),.91);
  return <>
    <TiedBoat s={s} shard={false} />
    <PaintedOar seam={w(1.49,1.299,-.30)} to={w(1.41,1.30,-1.46)} piece="blade"/>
    <Kid at={k} yaw={kyaw} p={kp} t={s} look={hand} face={up>.75?"smile":"brave"}/>
    <Dad at={d} yaw={dyaw} p={dp} t={s} look={add(k,[0,.79,0])} face={up>.75?"smile":"ouch"}/>
    {boat&&<Splash at={add(b,[.46,-b[1],.64])} start={.82} t={t} size={.5} seed={6}/>}
    {!boat&&hBeamLight(s)}
  </>;
}
