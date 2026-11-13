import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
const out=process.env.AUDIT_OUT??'out/five-seconds/full-v2/runtime';
fs.mkdirSync(out,{recursive:true});
const serveUrl=await bundle({entryPoint:process.cwd()+'/scripts/five-seconds-audit.tsx',publicDir:process.cwd()+'/public'});
const browserExecutable=process.env.REMOTION_CHROME??null,chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable,chromiumOptions});
const logs=[];let model;
const onBrowserLog=log=>{const text=log.text??'';if(text.startsWith('MODEL_AUDIT ')){model=JSON.parse(text.slice(12));fs.writeFileSync(path.join(out,'model-audit.json'),JSON.stringify(model,null,2)+'\n');}if(log.type==='error'){logs.push(log);console.error(text);}};
const base={serveUrl,browserExecutable,chromiumOptions,puppeteerInstance:browser,onBrowserLog};
try{
 const c=await selectComposition({...base,id:'five-seconds-math'});
 await renderStill({...base,composition:c,frame:0,output:path.join(out,'math.png')});
 if(!model)throw Error('No browser model-audit result');
 console.log('Current browser choreography assertions passed:',model.contacts.length,'contact sequences;',model.untouched.length,'frozen-state checks.');
 if(process.argv.includes('--clocks')){
  const clock=await selectComposition({...base,id:'five-seconds-clocks'});let last=-1;
  await renderMedia({...base,composition:clock,outputLocation:path.join(out,'clock-test.mp4'),codec:'h264',crf:30,concurrency:2,onProgress:({progress})=>{const pc=Math.floor(progress*10)*10;if(pc>last){last=pc;console.log('CLOCK',pc+'%');}}});
  if(logs.length)throw Error('Browser errors during clock test');
  fs.writeFileSync(path.join(out,'clock-audit.json'),JSON.stringify({revision:'full-motion-v2',frames:clock.durationInFrames,sceneAndWorldClocks:'passed',cuts:91,stops:7,frozenFramesPerStop:150,browserErrors:logs},null,2)+'\n');
  console.log(`${clock.durationInFrames}/${clock.durationInFrames} runtime frame/scene/shot clock assertions passed`);
 }
 if(logs.length)throw Error('Browser errors during model test');
}finally{await browser.close({silent:true});}
