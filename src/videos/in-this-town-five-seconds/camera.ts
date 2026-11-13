import { around, cam } from "../../engine";
import type { Vec3, StoryShot } from "../../engine";
import { cue } from "./timeline";
/** Follow the same trajectory the performance uses, at five points, never a guessed endpoint. */
export function follow(id:string, locate:(t:number)=>Vec3, dist=4, yaw=0, pitch=7, fov=44):Pick<StoryShot,'from'|'to'|'path'|'target'|'targetPath'|'fov'|'ease'>{
 const c=cue(id),times=[0,.25,.5,.75,1].map(k=>c.start+(c.end-c.start-1/30)*k), targets=times.map(locate);
 const path=targets.map(p=>around(p,dist,yaw,pitch));
 return {from:path[0],path,target:targets[0],targetPath:targets,fov,ease:'linear'};
}
export const push=(on:Vec3,dist:number,to:number,yaw=0,pitch=6,fov=40)=>cam.push({on,dist,to,yaw,pitch,fov});
