#!/usr/bin/env node
/** Render comparable, isolated source snapshots. Never checks out another branch or edits a legacy film. */
import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
const current=process.cwd(),baseline=process.env.REGRESSION_BASELINE;
if(!baseline)throw Error('REGRESSION_BASELINE must name an isolated source snapshot, not another checkout branch');
const output=path.join(current,'out/five-seconds/full-v2/regression');
const films=['in-this-town-freeze-bell','in-this-town-monster-egg','in-this-town-nobody-looked-at-the-moon','in-this-town-pumpkin-heads','in-this-town-same-face','in-this-town-superpower-at-18','in-this-town-superpower-at-18-part-2'];
const browserExecutable=process.env.REMOTION_CHROME??null,chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable,chromiumOptions}),errors=[];
const base={browserExecutable,chromiumOptions,puppeteerInstance:browser,onBrowserLog:log=>{if(log.type==='error'){errors.push(log);console.error(log.text);}}};
try{
 for(const [name,root] of [['before',path.resolve(baseline)],['after',current]]){
  const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public')});
  for(const id of films){
   const composition=await selectComposition({...base,serveUrl,id}),out=path.join(output,name,id);fs.mkdirSync(out,{recursive:true});
   for(const frame of id==='in-this-town-freeze-bell'?[0,1240,4770,5132]:[0,1240]){
    await renderStill({...base,serveUrl,composition,frame,scale:.25,imageFormat:'png',output:path.join(out,`frame-${String(frame).padStart(5,'0')}.png`)});
    console.log(name,id,frame);
   }
  }
  const fixtureUrl=await bundle({entryPoint:path.join(root,'scripts/five-seconds-shared-defaults.tsx'),publicDir:path.join(root,'public')});
  const composition=await selectComposition({...base,serveUrl:fixtureUrl,id:'shared-default-skeleton'}),out=path.join(output,name,'default-skeleton');fs.mkdirSync(out,{recursive:true});
  for(const frame of [0,39]){await renderStill({...base,serveUrl:fixtureUrl,composition,frame,imageFormat:'png',output:path.join(out,`frame-${String(frame).padStart(5,'0')}.png`)});console.log(name,'default-skeleton',frame);}
 }
 if(errors.length)throw Error('Browser errors in regression');
 fs.writeFileSync(path.join(output,'render-log.json'),JSON.stringify({baseline:path.resolve(baseline),films,filmSamplesPerVersion:16,defaultSkeletonSamplesPerVersion:2,browserErrors:errors},null,2)+'\n');
}finally{await browser.close({silent:true});}
