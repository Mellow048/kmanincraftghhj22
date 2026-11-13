import type {Vec3} from '../../engine';
/** Film-only set extensions start at the pack's boundary; never lay a second top face over its floor. */
export const SCHOOL_EXTENSIONS={
 classFloor:{position:[0,-.1,8.5] as Vec3,size:[9.4,.2,9] as Vec3}, // pack ends at z=4
 classCeiling:{position:[0,3.7,8.5] as Vec3,size:[9.8,.2,9] as Vec3},
 hallFloor:{position:[0,-.05,7.5] as Vec3,size:[16,.1,11] as Vec3}, // tiles end at z=2
 hallCeiling:{position:[0,3.5,7.6] as Vec3,size:[16,.2,10.8] as Vec3}, // pack roof ends at z=2.2
};
/** Seven extras plus the two leads: exactly one actor per occupied seat. */
export const CLASSROOM_EXTRAS=[-2.4,0,2.4].flatMap((x,col)=>[-.4,1.25,2.9].flatMap((z,row)=>
 row===1&&col<2?[]:[{col,row,who:col+row*3,villager:(col+row)%2===1,position:[x,(col+row)%2?-.09:-.02,z] as Vec3}]));
