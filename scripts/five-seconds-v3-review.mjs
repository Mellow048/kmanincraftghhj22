#!/usr/bin/env node
/** Source-frame review of the V3 correction proof, not a shortened deliverable or an approval assertion. */
import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
const root=process.cwd(),dir=path.join(root,'out/five-seconds/v3',process.env.REVIEW_PASS??'staging');
fs.mkdirSync(dir,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public')});
const browserExecutable=process.env.REMOTION_CHROME??null,chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable,chromiumOptions}),errors=[];
const base={serveUrl,browserExecutable,chromiumOptions,puppeteerInstance:browser,onBrowserLog:log=>{if(log.type==='error'){errors.push(log);console.error(log.text);}}};
try{
 const composition=await selectComposition({...base,id:'in-this-town-five-seconds'});
 if(process.argv.includes('--clips')){
  const {ranges}=JSON.parse(fs.readFileSync(path.join(root,'src/videos/in-this-town-five-seconds/v3-preview-plan.json'),'utf8'));
  for(const part of ranges.filter(r=>!process.env.REVIEW_PART||r.name===process.env.REVIEW_PART)){
   console.log('START',part.name);let last=-1;
   await renderMedia({...base,composition,frameRange:[part.first,part.last],scale:2/3,codec:'h264',crf:19,audioBitrate:'192k',concurrency:2,outputLocation:path.join(dir,part.name+'.mp4'),onProgress:({progress})=>{const p=Math.floor(progress*10)*10;if(p>last){last=p;console.log(part.name,p+'%');}}});
   console.log('DONE',part.name);
  }
 }else{
  const frames=(process.env.REVIEW_FRAMES??'927,1180,1380,1865,1925,2604,2630,2726,2787,3000,3230,3300,3500,3572,4002,4212,4280,4455,4505,4648').split(',').map(Number);
  for(const frame of frames){await renderStill({...base,composition,frame,scale:.4,imageFormat:'jpeg',jpegQuality:92,output:path.join(dir,`frame-${String(frame).padStart(5,'0')}.jpg`)});console.log('STILL',frame);}
 }
 fs.writeFileSync(path.join(dir,'render-log.json'),JSON.stringify({frames:composition.durationInFrames,fps:composition.fps,errors},null,2)+'\n');
 if(errors.length)process.exitCode=1;
}finally{await browser.close({silent:true});}
