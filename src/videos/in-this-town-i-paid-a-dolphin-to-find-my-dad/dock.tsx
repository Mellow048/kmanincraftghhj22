import { Block, Glow, Vox, getPose, type Vec3 } from "../../engine";
import { Fish } from "../../../Topics/InThisTown";
import { add, bob, cue, Dad, DAD, DECK, env, FOLEY, HARBOR_BOAT, Kid, KID, mix, palm, reach, rise, stance, wordAt } from "./kit";
import { bar, Dinghy, Dolphin, FishBox, PaintedOar, Parts, Splash } from "./props";

const oarWet: Vec3 = [0.33,DECK+0.092,0.22];
const berth: Vec3 = [-3.66,0.32,1.89];
const kidEdge: Vec3 = [0.71,DECK,0.64];
const across=Math.PI/2;
export const BOX: Vec3=[0.07,DECK,0.97];
const fishRotation: Vec3 = [0,0.46,0.19];

function HarborDinghy({s, oar=false}: {s:number; oar?:boolean}) {
  const b=add(HARBOR_BOAT,[0.019*Math.sin(s*1.22),bob(s,3),0.043*Math.sin(s*1.4)]);
  return <>
    <Dinghy at={b} yaw={-0.077} roll={0.032*Math.sin(s*2.25)}/>
    {oar&&<PaintedOar seam={add(b,[-0.26,0.29,-0.38])} to={add(b,[0.34,0.30,0.56])} piece="blade"/>}
  </>;
}

/** The fish actually follows the hand until the dorsal body rig's snout reaches it. */
export function Payment({ t, memory=false }: {t:number;memory?:boolean}) {
  const when=memory ? wordAt("1.lunch","lunch")-0.02 : FOLEY.take;
  const wet=when-0.61, gone=when+0.24;
  const at:Vec3 = memory ? [0.625,DECK,0.66] : kidEdge;
  const yaw=1.43;
  const p=stance("kneel");
  p.bodyPitch=0.40+0.16*env(t,when-.47,when,when+.43);
  p.bodyY-=0.031*rise(t,0.10,when);
  const offer=rise(t,-0.21,when-0.12);
  const reachFor = mix([1.26,0.98,0.44],[1.65,0.923,0.27],offer);
  const scale=memory?DAD:KID;
  reach(p,at,yaw,scale,1,reachFor,0.83+0.17*offer);
  reach(p,at,yaw,scale,-1,[0.94,.71,1.08],.77);
  const hand=add(palm(p,at,yaw,scale,1),[.12,-.029,-.045]);
  const contact=add(hand,[.177,.004,-.046]);
  const lift=rise(t,wet,when);
  const leave=rise(t,when,when+0.38), away=rise(t,when+.31,when+1.38);
  const nose:Vec3=add(contact,[.50*(1-lift)+.19*leave+.43*away, -.29*(1-lift)+.10*Math.sin(leave*Math.PI)-1.02*away, .18*(1-lift)+.36*leave+.57*away]);
  const fishAt=t<when ? hand : add(nose,[-.109*Math.cos(leave*2.2),0,.042]);
  const reaction=rise(t,when+.12,when+.62);
  p.head=[-.06,0,-.16*reaction];
  return <>
    <FishBox at={BOX} fish={0} />
    {memory ? <><Dad at={at} yaw={yaw} p={p} t={t} hat face="smile" look={nose}/>
      <Kid at={[-.47,DECK,1.05]} yaw={1.5} p={stance("kneel")} t={t} face="wow" look={nose}/></>
      : <Kid at={at} yaw={yaw} p={p} t={t} face={t<when+.28?"brave":"uneasy"} look={mix(nose,[2.27,1.41,1.92],.23+.32*reaction)}/>}
    {t<gone && <Fish position={fishAt} scale={1.08} rotation={fishRotation}/>}
    <Dolphin nose={nose} yaw={-1.78+leave*.39+away*3.40} pitch={-0.51-.19*env(t,wet,when,when+.19)+1.06*away}
      bank={-0.12+.37*away} t={t} bite={env(t,when-.20,when-.044,when+.073)}/>
    <Splash at={add(contact,[.48,-contact[1],.10])} t={t} start={Math.max(0,wet)} size={0.66} seed={1}/>
    <Splash at={[2.39,0,1.23]} t={t} start={memory ? when+.26 : FOLEY.dive} size={.86} seed={9}/>
  </>;
}

export function EmptyBerth({t}: {t:number}) {
  const p=getPose("walk",t*.72);
  const a:Vec3=mix([-.55,DECK,0.83],[-2.63,DECK,.77],rise(t,0.12,2.24));
  if(t>2.28){p.legL=[-.16,0,0]; p.legR=[.06,0,0];p.bodyPitch=.06;}
  const yaw=-1.45;
  const rope=[bar([-3.47,.78,1],[-3.46,.61,1.27],.035,.036,"#9b8966"),
    bar([-3.46,.61,1.27],[-3.60,.17,1.58],.028,.03,"#a99573"),
    bar([-3.60,.17,1.58],[-3.68,.13+bob(t,4),1.83],.030,.031,"#c7ad7f")];
  return <>
    <Parts pieces={rope}/>
    <HarborDinghy s={t+3}/>
    <Kid at={a} yaw={yaw} p={p} t={t} face="worried" look={berth}/>
    <PaintedOar seam={oarWet} to={[-.52,DECK+.089,1.06]} piece="blade"/>
    <Block position={[-2.96,DECK+.045,0.89]} size={[.46,.089,.61]} color="#766748"/>
    <Splash at={[-3.98,0,1.06]} t={t} start={0.40} size={.43} seed={5}/>
  </>;
}

export function WashedUp({t}: {t:number}) {
  const at:Vec3=[.17,DECK+.01,-.16];
  const p=stance("low"); p.bodyPitch=.50; p.head=[.14,0,.02];
  const yaw=-0.19, lift=rise(t,wordAt("1.half","oar")-.40,1.45);
  reach(p,at,yaw,KID,1, mix(oarWet,[0.44,1.19,.52],lift));
  reach(p,at,yaw,KID,-1,[-.19,.86,.35],.68);
  const hold=add(palm(p,at,yaw,KID,1),[.012,-.054,.061]);
  const seam=mix(oarWet,hold,rise(t,.39,.75));
  return <>
    <Kid at={at} yaw={yaw} p={p} t={t} look={seam} face="sad"/>
    <PaintedOar seam={seam} to={add(seam,mix([-.85,0,.84],[-.74,.31,.64],lift))} piece="blade"/>
    <Splash at={[1.19,0,.42]} t={t} start={0.49} size={.54} seed={7}/>
  </>;
}

export function Painting({t}: {t:number}) {
  const k:Vec3=[.28,DECK,-1.09], d:Vec3=[-.40,DECK,-2.08];
  const yawK=-2.75, yawD=0.39, p=stance("kneel"), dad=stance("kneel");
  p.bodyY-=.03; p.bodyPitch=.43; dad.bodyPitch=.37;
  const seam:Vec3=[-.045,0.984,-1.59];
  const brushAcross=rise(t,.23,1.52);
  const brush:Vec3=[.02+brushAcross*.273,1.106+Math.sin(t*9.6)*.028,-1.59+brushAcross*.064];
  reach(p,k,yawK,KID,1,brush); reach(p,k,yawK,KID,-1,[-.10,1.073,-1.26],.88);
  reach(dad,d,yawD,DAD,-1,[-.55,1.033,-1.61]); reach(dad,d,yawD,DAD,1,[.142,1.05,-1.66]);
  const h=palm(p,k,yawK,KID,1);
  return <>
    <Vox kind="planks" position={[-.10,.753,-1.65]} size={[1.66,.326,.388]} tint="#a58054"/>
    <PaintedOar seam={seam} to={[1.13,0.985,-1.59]} piece="blade" intact/>
    <PaintedOar seam={seam} to={[-.98,.985,-1.59]} piece="handle" intact/>
    <Block position={[-.46,1.006,-1.76]} size={[.153,.176,.153]} color="#968970"/>
    <Block position={[-.46,1.098,-1.76]} size={[.134,.024,.141]} color="#e9e0be"/>
    <Kid at={k} yaw={yawK} p={p} t={t} face="smile" look={brush}/>
    <Dad at={d} yaw={yawD} p={dad} t={t} hat face="smile" look={k}/>
    <Parts pieces={[bar(add(h,[0,.10,0]),add(h,[.023,-.142,.043]),.044,.044,"#7a593c"),
      bar(add(h,[.023,-.136,.043]),add(h,[.033,-.188,.051]),.066,.032,"#f1e8cc")]}/>
    <Glow position={[-.26,1.00,-1.57]} size={.43} color="#ffdcaa" opacity={.16}/>
  </>;
}

export function Leaving({t}: {t:number}) {
  const near:Vec3=[.66,DECK,.57];
  const yaw=1.54, p=stance("low"); p.bodyPitch=.49+rise(t,.17,.98)*.19;
  const b=add(HARBOR_BOAT,[0,bob(t,3),.11*t]);
  const on:Vec3=add(b,[-.28,.287,.42]);
  reach(p,near,yaw,KID,1,on); reach(p,near,yaw,KID,-1,[1.04,.74,.89],.86);
  const held=palm(p,near,yaw,KID,1);
  const seam=mix(held,on,rise(t,.52,1.02));
  return <>
    <Dinghy at={b} yaw={-.06+.17*t} />
    <PaintedOar seam={seam} to={add(seam,[.56,.02,-.93])} piece="blade"/>
    <Kid at={near} yaw={yaw} p={p} t={t} face="brave" look={[3.9,.32,6.3]}/>
    <Dolphin nose={[2.03+.78*t,.13+.16*Math.sin(t*2.6),3.60+2.41*t]} pitch={.12} yaw={.36} t={t+5}/>
    <Splash at={[2.25,0,4.2]} t={t} start={.24} size={.77} seed={8}/>
  </>;
}

const dadHome:Vec3=[.50,DECK,.29];
const kidHome:Vec3=[-.139,DECK,1.34];
const first=cue("6.first").start+wordAt("6.first","out");
const second=cue("6.second").start+wordAt("6.second","took");
export const DOUBLE=cue("6.double").start+FOLEY.twoFish;
export function Home({s}: {s:number}) {
  const t=s-cue("6.home").start;
  const dad=stance("kneel"), kid=stance("kneel"); dad.bodyPitch=.47;
  const yaw=1.52, ky=1.93;
  const open=rise(t,.08,.63);
  const show1=rise(s,first-.59,first+.21), show2=rise(s,second-.48,second+.46);
  const keep1=1-rise(s,DOUBLE+.04,DOUBLE+.57), keep2=1-rise(s,DOUBLE+.25,DOUBLE+.69);
  const boxRight:Vec3=[.41,DECK+.37,.78], boxLeft:Vec3=[.25,DECK+.31,.94];
  const right= mix(boxRight,[1.33,1.05,-.075],show1);
  const left= mix(boxLeft,[1.35,1.03,.71],show2);
  reach(dad,dadHome,yaw,DAD,1,mix(right,[.94,1.26,.079],1-keep1),.93);
  reach(dad,dadHome,yaw,DAD,-1,mix(left,[1.0,.95,.76],1-keep2),.97);
  const a=add(palm(dad,dadHome,yaw,DAD,1),[.13,-.044,-.023]);
  const b=add(palm(dad,dadHome,yaw,DAD,-1),[.14,-.044,.016]);
  const close=rise(s,DOUBLE-.35,DOUBLE), pass=rise(s,DOUBLE,DOUBLE+.23), dip=rise(s,DOUBLE+.31,DOUBLE+1.02);
  const nose=add(mix(a,b,pass),[.16+(1-close)*.61+dip*.95,-(1-close)*(.35+.07*Math.sin(t*3))+dip*(-.70)-.93*rise(s,DOUBLE+.87,DOUBLE+1.78),.29*(1-close)+dip*.92]);
  reach(kid,kidHome,ky,KID,1,[.40,.96,1.14],.75);
  reach(kid,kidHome,ky,KID,-1,[.39,.77,1.51],.89);
  return <>
    <FishBox at={BOX} lid={1.79*open} fish={s>=second ? 0 : s>=first-.18 ? 1 : 2}/>
    <Kid at={kidHome} yaw={ky} p={kid} t={s} face={s>second-.35?"grin":s>first?"smile":"calm"} look={s>DOUBLE+.21?add(dadHome,[.1,1.1,0]):nose}/>
    <Dad at={dadHome} yaw={yaw} p={dad} t={s} face={s>=DOUBLE ? "grin" : "smile"} look={s<first-.47?BOX:s>DOUBLE+.80?mix(nose,add(kidHome,[.2,.98,.05]),.66):nose}/>
    {s>first-.38 && s<DOUBLE+.10 && <Fish position={s<DOUBLE?a:add(nose,[-.12,-.041,0])} rotation={[0,1.09,.26]} scale={1.08}/>}
    {s>second-.17 && s<DOUBLE+.37 && <Fish position={s<DOUBLE+.23?b:add(nose,[-.11,-.018,.031])} rotation={[0,1.25,-.26]} scale={1.08}/>}
    {s>first-.37 && <Dolphin nose={nose} yaw={-1.29-.06*pass+2.72*dip} pitch={-.48+.84*dip} bank={.1-.34*dip} t={s}
      bite={Math.max(env(s,DOUBLE-.196,DOUBLE-.025,DOUBLE+.075),env(s,DOUBLE+.10,DOUBLE+.20,DOUBLE+.304))}/>}
    <Splash at={[2.38,0,.12]} t={s} start={first-.37} size={.70} seed={4}/>
    <Splash at={[2.04,0,.31]} t={s} start={DOUBLE-.30} size={.7} seed={3}/>
    <Splash at={[2.70,0,1.79]} t={s} start={DOUBLE+.56} size={.92} seed={8}/>
  </>;
}
