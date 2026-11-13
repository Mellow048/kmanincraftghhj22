import type { Pose, Vec3 } from '../../engine';
import { at, cue } from './timeline';
import { add, aimHand, distance, handWorld, mix, phase, punch, recoil, route, shoulderWorld, sleevePoint, smooth, turn, v } from './motion';

export const WINDOW_CENTRE:Vec3=[1.48,1.82,-2.22];
export const CURTAIN_PULL=at('2.curtains','closed');
export const CURTAIN_MEET=CURTAIN_PULL+.38;
const ARRIVE=CURTAIN_PULL-.3;
const REACH=CURTAIN_PULL-.43;
const RELEASE=CURTAIN_MEET+.24;
const MOTHER_WINDOW:Vec3=[2.52,0,-1.72];
export const CURTAIN_CUFF:Vec3=[.28,-.225,.13];

/** One performance across the answer/curtain cuts. Head, feet, sleeves, cord and cloth share anchors. */
export function curtainsMother(t:number){
 const move=route(t,[[cue('2.answer').start,[-.9,0,-.4]],[at('2.answer','asked')-.13,[-.9,0,-.4]],[ARRIVE,MOTHER_WINDOW],[cue('3.school').end,MOTHER_WINDOW]],true);
 const travelling=phase(t,at('2.answer','asked')-.13,ARRIVE);
 const yaw=turn(.35,2.03,smooth(phase(t,at('2.answer','I')-.2,at('2.answer','her'))));
 const rotationY=turn(yaw,Math.PI,smooth(phase(t,ARRIVE-.3,ARRIVE+.04)));
 const reach=punch(t,REACH,.27)*(1-punch(t,RELEASE,.38));
 const pull=punch(t,CURTAIN_PULL,.24);
 const arm:Vec3=[mix(-.75,mix(-1.47,-.56,pull),reach),0,.04*reach];
 const offset:Vec3=[0,.11*reach,.055*reach];
 const bob=-.075*pull*reach+Math.sin(travelling*Math.PI*8)*.016*(travelling>0&&travelling<1?1:0);
 const lean=-.07*pull*reach;
 return {...move,rotationY,arm,offset,bob,lean,grip:sleevePoint(move.position,rotationY,.96,arm,offset,lean,bob,CURTAIN_CUFF),pull,reach,step:1-punch(t,ARRIVE-.23,.23)};
}
export function curtainState(t:number){
 const closing=t>=cue('2.answer').start&&t<cue('3.school').end;
 const closed=(t>=CURTAIN_MEET&&t<cue('3.school').end)||t>=cue('6.told').start;
 const amount=closing?punch(t,CURTAIN_PULL,.38):closed?1:0;
 const gap=mix(1.3,.015,amount);
 const flutter=closing?(Math.sin(phase(t,CURTAIN_PULL,CURTAIN_MEET)*Math.PI)*.09+recoil(t,CURTAIN_MEET,.085)):0;
 const initial=curtainsMother(CURTAIN_PULL-.06).grip;
 const final=curtainsMother(CURTAIN_MEET+.08).grip;
 const grip=t<CURTAIN_PULL-.06?initial:t<RELEASE?curtainsMother(t).grip:add(final,[0,recoil(t,RELEASE,.025),0]);
 return {gap,flutter,grip,amount};
}

const BOWL_PLACE=at('6.hands','bowl')+.12;
const BOWL_FROM=at('6.hands','put')-.12;
const WASH_POSITION:Vec3=[-1.16,0,-1.3];
function bowlContact(t:number){
 const put=punch(t,BOWL_FROM,BOWL_PLACE-BOWL_FROM);
 const wash=Math.sin((t-cue('6.told').start)*11)*.09*(1-punch(t,at('6.told','glass')-.12,.18));
 const arm:Vec3=[mix(-1.02+wash,-.33,put),0,0];
 const lean=.3*put;
 const base=sleevePoint(WASH_POSITION,-Math.PI/2,.96,[-.33,0,0],[0,0,.12],.3,0);
 const lift=(.97-base[1])/(.96*Math.cos(.3));
 const offset:Vec3=[0,lift*put,.12];
 return {arm,lean,offset,put,bowl:sleevePoint(WASH_POSITION,-Math.PI/2,.96,arm,offset,lean)};
}
export function washingMother(t:number){
 const contact=bowlContact(Math.min(t,BOWL_PLACE));
 const recover=punch(t,BOWL_PLACE+.1,.55);
 const toDoor=punch(t,cue('6.question').start+.22,1.0);
 const position=v(WASH_POSITION,[-1.65,0,-1.79],toDoor);
 const rotationY=turn(turn(-Math.PI/2,1.0,punch(t,BOWL_PLACE+.24,.55)),Math.PI,toDoor);
 const check=punch(t,at('6.lock','checked')-.2,.18)*(1-punch(t,at('6.lock','lock')+.2,.3));
 const arm=v(contact.arm,[-.75,0,0],recover);
 arm[0]=mix(arm[0],-1.2,check);
 const offset=v(contact.offset,[0,0,0],recover);
 const walk=toDoor*Math.hypot(.49,.49);
 const warning=punch(t,at('6.rule',"Don't")-.12,.18)*(1-punch(t,at('6.rule','that')+.07,.2));
 arm[0]-=.20*warning;
 const lean=contact.lean*(1-recover)+check*.12+.08*warning;
 const bob=0;
 const bowl=t<BOWL_PLACE?contact.bowl:bowlContact(BOWL_PLACE).bowl;
 return {position,rotationY,arm,offset,lean,bob,walk,bowl,put:contact.put,check,warning,step:1-punch(t,cue('6.question').start+.97,.25)};
}

/** Seats and prop origins are shared by performance, camera and the contact tests. */
export const LUNCH_HERO:Vec3=[-.43,0,.55];
export const LUNCH_FRIEND:Vec3=[.6,-.045,-.78];
export const LUNCH_BOOK:Vec3=[-.72,.84,-.05];
export const BOOK_TOUCH=at('9.math','Then')+.015;
export const BOOK_OPEN=BOOK_TOUCH+.10;
export const BOOK_END=at('9.math','math')-.10;

/** Find a seated lean that puts the real shoulder exactly one un-stretched arm from the contact. */
export function seatedReach(target:Vec3,side:1|-1):Partial<Pose>{
 const error=(pitch:number)=>distance(shoulderWorld(LUNCH_HERO,Math.PI,.95,{bodyY:-.125,bodyPitch:pitch},side),target)-.61875*.95;
 let low=-.12, high=.88;
 // The target is in front of the seat; this interval is monotonic for these tabletop contacts.
 for(let i=0;i<26;i++){const mid=(low+high)/2;if(error(mid)>0)low=mid;else high=mid;}
 const pose:Partial<Pose>={bodyY:-.125,bodyPitch:(low+high)/2,bodyRoll:0,bodyYaw:0};
 const arm=aimHand(LUNCH_HERO,Math.PI,.95,pose,target,side);
 if(side===1)pose.armR=arm;else pose.armL=arm;
 return pose;
}

function breadPush(t:number,first:boolean){
 const hit=first?at('3.lunch','split'):at('9.lunch','pushed');
 const push=punch(t,hit,first?.47:.65);
 const lean=mix(.1,.42,push), yaw=-.65;
 const position=v(LUNCH_FRIEND,add(LUNCH_FRIEND,[-.06,0,.10]),push);
 const arm:Vec3=[mix(-.72,-1.3,push),0,0];
 // A few millimetres of vertical sleeve accent holds the same contact at the loaf's back edge.
 const raw=sleevePoint(position,yaw,.88,arm,[0,0,0],lean,0);
 const offset:Vec3=[0,(.90-raw[1])/(.88*Math.cos(lean)),0];
 const grip=sleevePoint(position,yaw,.88,arm,offset,lean,0);
 const size=first?.53:.78;
 const bread:Vec3=[grip[0]+Math.sin(yaw)*(.15*size+.018),.815,grip[2]+Math.cos(yaw)*(.15*size+.018)];
 return {position,arm,lean,yaw,offset,grip,bread,push,hit,size};
}
/** The bread stays on wood. Sleeves push it; the boy meets it; released bread does not keep sliding. */
export function lunchMotion(t:number,first=false){
 const hit=first?at('3.lunch','split'):at('9.lunch','pushed');
 const end=hit+(first?.47:.65);
 const contact=breadPush(Math.min(t,end),first);
 const retract=punch(t,end+.16,.46);
 const explain=punch(t,at('9.why','said'),.18)*(1-punch(t,at('9.why','too')+.03,.3));
 const emph=first?0:explain;
 const arm=v(contact.arm,[-.75-.23*emph,0,0],retract);
 const lean=mix(contact.lean,.08+.10*emph,retract);
 const offset=v(contact.offset,[0,0,0],retract);
 const receive=punch(t,end-.37,.37)*(1-punch(t,end+.23,.42));
 const receiveTarget:Vec3=[contact.bread[0],.9,contact.bread[2]+.15*contact.size];
 const receiver=seatedReach(receiveTarget,-1);
 const opening=first?0:punch(t,BOOK_OPEN,BOOK_END-BOOK_OPEN);
 const angle=Math.PI*opening;
 // Contact is on the actual outer edge of the hinged cover, not an invented hand location.
 const cover:Vec3=[LUNCH_BOOK[0]+.30*Math.cos(angle),LUNCH_BOOK[1]+.055+.30*Math.sin(angle),LUNCH_BOOK[2]+.03];
 const openReach=first?0:punch(t,BOOK_TOUCH-.30,.30)*(1-punch(t,BOOK_END+.12,.32));
 const opener=seatedReach(cover,1);
 const understand=first?0:punch(t,at('9.math','finally'),.24);
 return {...contact,position:v(contact.position,LUNCH_FRIEND,retract),arm,lean,offset,retract,receive,receiveTarget,receiver,opening,cover,openReach,opener,understand};
}
