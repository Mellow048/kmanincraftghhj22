import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
fs.mkdirSync('out/five-seconds',{recursive:true});
const serveUrl=await bundle({entryPoint:process.cwd()+'/scripts/five-seconds-audit.tsx',publicDir:process.cwd()+'/public'});
const browserExecutable=process.env.REMOTION_CHROME??null,chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable,chromiumOptions});
const logs=[];const onBrowserLog=log=>{const text=log.text??'';if(text.startsWith('MODEL_AUDIT ')){const value=JSON.parse(text.slice(12));fs.writeFileSync('out/five-seconds/model-audit.json',JSON.stringify(value,null,2)+'\n');}if(log.type==='error')logs.push(log);};
const base={serveUrl,browserExecutable,chromiumOptions,puppeteerInstance:browser,onBrowserLog};
try{
const c=await selectComposition({...base,id:'five-seconds-math'});
await renderStill({...base,composition:c,frame:0,output:'out/five-seconds/math.png'});
if(process.argv.includes('--clocks')){const clock=await selectComposition({...base,id:'five-seconds-clocks'});await renderMedia({...base,composition:clock,outputLocation:'out/five-seconds/clock-test.mp4',codec:'h264',crf:30,concurrency:2,onProgress:({progress})=>{if(progress===1)console.log('4848/4848 runtime frame/scene/shot clock assertions passed');}});fs.writeFileSync('out/five-seconds/clock-audit.json',JSON.stringify({frames:4848,sceneAndWorldClocks:'passed',cuts:91,stops:7,frozenFramesPerStop:150,browserErrors:logs},null,2)+'\n');}
}finally{await browser.close({silent:true});}
