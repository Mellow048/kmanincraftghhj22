import { type Vec3 } from "../../engine";
import { add, cue, Dad, DAD, env, Kid, KID, mix, palm, reach, rise, stance, w, wordAt } from "./kit";
import { bar, PaintedOar, Parts, Splash, type Piece } from "./props";
import { shardAt, TiedBoat, tiedAt } from "./voyage";

export const RED=cue("4.red").start;
const MATCH=cue("4.match").start, HAND=cue("4.hand").start, DAD_CUE=cue("4.dad").start,
  HERE=cue("4.here").start, REEF=cue("5.reef").start;
export const TIP_TAP=wordAt("4.red","red")-.20;
const zSlot=-.432;
const palmInside:Vec3=w(1.56,.823,-.44);
export const DAD_WRECK:Vec3=w(.65,.123,-.454);
const kYaw=-1.49, dYaw=1.53;

function handleAmount(s:number){
  const t=s-RED;
  return rise(t,.23,TIP_TAP+.46)*(1-rise(s,DAD_CUE-.12,DAD_CUE+.55))
    *(.82+.17*env(s,HAND+wordAt("4.hand","moved")-.14,HAND+.71,HAND+1.28));
}

export function SlotPerformance({ s, mode }: {s:number;mode:"red"|"match"|"hand"|"dad"|"here"|"reef"|"cabin"}) {
  const t=s-RED, b=tiedAt(s), climb=rise(t,-.14,1.03);
  const letIn=rise(s,HERE+.14,HERE+1.52);
  const glimpse=rise(s,DAD_CUE-.22,DAD_CUE+.36);
  const compare=env(s,MATCH-.31,MATCH+.16,HAND+.28);
  const kAt=add(b,[-.17+compare*.25-.22*letIn,.277-(1-climb)*.66,-.46+(1-climb)*.86-compare*.34]);
  const p=stance("kneel"); p.bodyPitch=.48+.18*letIn; p.head=[-.07,0,.087];
  const expose=handleAmount(s);
  const tip:Vec3=w(1.304+expose*.91,.807+expose*.032,zSlot+Math.sin(s*3.3)*.017*expose);
  const propEnd:Vec3=add(tip,[-.946,.018,-.049]);
  const getUp=rise(t,.10,1.13);
  reach(p,kAt,kYaw,KID,1,w(2.27,.39,.37-.25*getUp),.94);
  const kReach=mix(add(b,[-.49,.39,-.75]),add(palmInside,[.04,.019,-.019]),letIn);
  reach(p,kAt,kYaw,KID,-1,kReach);
  const kHand=palm(p,kAt,kYaw,KID,-1);
  const look = mode==="match" ? mix(tip,shardAt(s),env(s,MATCH+.02,MATCH+.66,MATCH+1.65)) :
    mode==="reef" ? w(4.14,.38,4.27) : mode==="red" || mode==="hand" ? tip : palmInside;

  const d=stance("low");
  d.bodyPitch = .69-.075*glimpse;
  d.bodyY=-.549+.019*Math.sin(s*6)*glimpse;
  reach(d,DAD_WRECK,dYaw,DAD,1,letIn>.1 ? kHand : palmInside,.93);
  reach(d,DAD_WRECK,dYaw,DAD,-1, mode==="reef"?w(1.78,.86,.04):w(1.48,.58,-.18),1);
  const quote=s>DAD_CUE+wordAt("4.dad","is")-.05 && s<DAD_CUE+1.52;
  const brace:Vec3=w(1.294,.832,zSlot+.088);
  const knuckle:Vec3=mix(w(1.39,.815,zSlot+.08),add(tip,[-.35,.058,.047]),expose);
  return <>
    <TiedBoat s={s}/>
    {(mode!=="dad"&&mode!=="cabin"&&mode!=="hand"&&mode!=="match")&&<Kid at={kAt} yaw={kYaw} p={p} t={s} face={mode==="here"?"smile":"worried"} look={look}/>}
    {expose>.08&&<PaintedOar seam={tip} to={propEnd} piece="handle" roll={.16}/>}
    {mode==="hand"&&<Parts pieces={[
      bar(brace,knuckle,.144,.144,"#bc8b69"),
      {at:add(knuckle,[.026,.045,-.044]),size:[.152,.092,.123],color:"#d4a17a"},
      ...[0,1,2].map(i=>({at:add(knuckle,[(i-1)*.043+.035,.012,-.105]),size:[.038,.092,.073],color:i%2?"#c69472":"#d2a17d"} as Piece)),
      {at:add(brace,[-.082,.015,.03]),size:[.228,.173,.17],color:"#327a7b"},
    ]}/>}
    {mode==="red"&&<Splash at={w(2.98,0,.47)} t={t} start={.04} size={.51} seed={3}/>}
    {(["dad","here","cabin","reef"] as const).some(k=>k===mode)&&<Dad at={DAD_WRECK} yaw={mode==="cabin"?1.31:dYaw} p={d} t={s}
      look={mode==="reef"?w(3.47,.85,2.3):mode==="cabin"?w(1.56,.80,-1.05):add(kAt,[-.28,1.04,.08])} face={quote?"wow":mode==="here"?"smile":"worried"}/>}
    <FishingWreck s={s}/>
  </>;
}
const fishing:Piece[]=[
  {at:[0,0,0],size:[.256,.278,1.72],color:"#b6794e"},
  {at:[-.03,.224,0],size:[.239,.204,1.48],color:"#a06a43"},
  {at:[-.015,.389,-.18],size:[.268,.108,1.15],color:"#288487"},
  {at:[-.02,.452,-.05],size:[.286,.061,1.44],color:"#dfba8b"},
  {at:[.046,.045,.858],size:[.159,.224,.19],color:"#d09e63",turn:[.2,.3,.1]},
  {at:[.133,.204,-.47],size:[.13,.64,.185],turn:[.24,0,-.25],color:"#af8057"},
  {at:[.238,-.062,.38],size:[.61,.119,.21],turn:[.06,.07,-.44],color:"#9e6d45"},
];
export function FishingWreck({s}: {s:number}) {
  return <group position={w(4.23,.082,.46+3.2)} rotation={[.43,.48,.38+.034*Math.sin(s*3.7)]}>
    <Parts pieces={fishing}/>
  </group>;
}
