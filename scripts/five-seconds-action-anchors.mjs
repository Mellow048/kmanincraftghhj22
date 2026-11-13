#!/usr/bin/env node
/** The sound writer asks the actual pure picture choreography for its contact frames. */
import {loadFilm} from './five-seconds-pure.mjs';
const m=loadFilm('motion'),h=loadFilm('home-motion'),l=loadFilm('school-motion'),r=loadFilm('rescue-motion'),c=loadFilm('chase-motion'),{at,cue,STOP}=loadFilm('timeline');
function steps(fn,a,b,halfStride,who,pan=0){
 const out=[];let last=Math.floor(fn(a)/halfStride);
 for(let f=Math.ceil(a*30)+1;f<b*30;f++){
  const d=fn(f/30),n=Math.floor(d/halfStride);
  if(n>last)out.push({t:f/30,who,pan});last=n;
 }
 return out;
}
const chaseSteps=[...steps(t=>m.manMotion(t).travel,m.RUN_START,STOP.counter.a,1.55/2,'white-clothed runner',.2),...steps(t=>m.counterHero(t).distance,m.HERO_RUN,STOP.counter.a,1.55*.95/2,'red-shirted pursuer',-.2)];
const counterSteps=[...steps(t=>m.counterHero(t).distance,c.PICK_ROCK+.3,at('16.throw','Set')-.20,1.55*.95/2,'the run in front'),...steps(t=>m.counterHero(t).distance,c.PLACE_ROCK+.25,c.SIDE_END,1.24*.95/2,'the sidestep')];
const placement=h.touchState(h.BOOK_RELEASE).book;
const result={glassDrop:h.GLASS_DROP,glassHit:h.GLASS_HIT,bookTouch:h.BOOK_TOUCH,bookRelease:h.BOOK_RELEASE,bookLand:STOP.touch.b+Math.sqrt((placement[1]-.853)/4.9),feedPlace:h.CARROT_SET,classChalkFire:at('3.class','chalk')-.13,chalkHit:l.CHALK_HIT,lockerOpen:m.LOCKER_OPEN_START,lockerOpenEnd:m.LOCKER_OPEN_END,lockerGrip:m.LOCKER_GRAB,lockerPickup:l.LOCKER_PICK,lockerPlace:l.LOCKER_PLACE,elderGrip:r.ELDER_GRAB,doorKick:m.DOOR_KICK,doorShut:m.DOOR_SHUT,carrotPass:r.CARROT_PASS,windowPull:h.SASH_DOWN,windowShut:h.SASH_CLOSED,rabbitLift:c.LIFT_START,rockPickup:c.PICK_ROCK,rockPlace:c.PLACE_ROCK,spinStart:at('17.fall','spun')-.15,land:m.LAND,rabbitTake:c.TAKE_RABBIT,chaseSteps,counterSteps};
console.log(JSON.stringify(result));
