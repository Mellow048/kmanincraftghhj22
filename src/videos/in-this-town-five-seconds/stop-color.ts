import {STOPS} from './timeline';
/** An owner-requested camera effect, not a world-clock change: immediate monochrome, then color returns. */
export function stopColor(frame:number):number{
 const f=Math.round(frame),s=STOPS.find(stop=>f>=stop.start&&f<stop.start+24);
 if(!s)return 0;
 const elapsed=f-s.start;
 return elapsed<9?1:Math.max(0,1-(elapsed-9)/15);
}
