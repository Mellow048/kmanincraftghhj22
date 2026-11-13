#!/usr/bin/env node
/** A revision proof, not a new/short film. Renders selected ranges of the actual 161.6 s composition. */
import fs from 'node:fs';
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { openBrowser, selectComposition, renderStill, renderMedia } from '@remotion/renderer';

const root=process.cwd();
const folder=path.join(root,'out/five-seconds/motion-v2');
fs.mkdirSync(folder,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public')});
const browserExecutable=process.env.REMOTION_CHROME??null;
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable,chromiumOptions});
const errors=[];
const base={serveUrl,browserExecutable,chromiumOptions,puppeteerInstance:browser,onBrowserLog:log=>{if(log.type==='error'){errors.push(log);console.error(log.text);}}};
const ranges=[
 {name:'curtains',first:270,last:428},
 {name:'bowl',first:1437,last:1569},
 {name:'friendship',first:2125,last:2303},
];
try {
 const composition=await selectComposition({...base,id:'in-this-town-five-seconds'});
 if(process.argv.includes('--stills')){
  const frames=(process.env.PREVIEW_FRAMES??'337,363,386,396,404,416,1447,1486,1498,1516,1543,2142,2165,2185,2215,2240,2250,2260,2290').split(',').map(Number);
  for(const frame of frames){
   await renderStill({...base,composition,frame,scale:.4,imageFormat:'jpeg',jpegQuality:92,output:path.join(folder,`frame-${String(frame).padStart(5,'0')}.jpg`)});
   console.log('STILL',frame);
  }
 }else{
  const selected=process.env.PREVIEW_PART?ranges.filter(r=>r.name===process.env.PREVIEW_PART):ranges;
  for(const part of selected){
   console.log('START',part.name,part.first,part.last);
   let last=-1;
   await renderMedia({...base,composition,frameRange:[part.first,part.last],scale:2/3,codec:'h264',crf:19,audioBitrate:'192k',concurrency:2,
    outputLocation:path.join(folder,part.name+'.mp4'),
    onProgress:({progress})=>{const p=Math.floor(progress*10)*10;if(p>last){last=p;console.log(part.name,p+'%');}}});
   console.log('FINISHED',part.name);
  }
 }
 fs.writeFileSync(path.join(folder,'render-log.json'),JSON.stringify({ranges,sourceFrames:composition.durationInFrames,fps:composition.fps,previewFrames:ranges.reduce((n,r)=>n+r.last-r.first+1,0),errors},null,2)+'\n');
 if(errors.length)process.exitCode=1;
}finally{await browser.close({silent:true});}
