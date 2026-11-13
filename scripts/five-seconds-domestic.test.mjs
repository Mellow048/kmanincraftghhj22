import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import * as THREE from 'three';

// Compile just the pure choreography modules, not the renderer. Rendering has its own review/regression gate.
const root=path.resolve('src/videos/in-this-town-five-seconds');
const cache=new Map();
function load(name){
 if(cache.has(name))return cache.get(name);
 assert.ok(['domestic-motion','motion','timeline'].includes(name));
 const module={exports:{}};cache.set(name,module.exports);
 const source=ts.transpileModule(fs.readFileSync(path.join(root,name+'.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const require=(id)=>id==='three'?THREE:id==='./timing.json'?JSON.parse(fs.readFileSync(path.join(root,'timing.json'),'utf8')):load(id.replace('./',''));
 new Function('require','module','exports',source)(require,module,module.exports);
 return module.exports;
}
const d=load('domestic-motion'),m=load('motion'),{at,cue}=load('timeline');
const near=(a,b,eps=1e-6)=>assert.ok(m.distance(a,b)<=eps,`${JSON.stringify(a)} vs ${JSON.stringify(b)}: ${m.distance(a,b)}`);

test('curtain walk continues across the cut, at ordinary walking speed',()=>{
 let previous=d.curtainsMother(cue('2.answer').start);
 for(let f=Math.ceil(cue('2.answer').start*30);f<=Math.floor(cue('2.curtains').end*30);f++){
  const q=d.curtainsMother(f/30);
  assert.ok(m.distance(previous.position,q.position)*30<2.8);
  assert.ok(Math.abs(q.rotationY-previous.rotationY)<.22);
  previous=q;
 }
 near(d.curtainsMother(cue('2.answer').end).position,d.curtainsMother(cue('2.curtains').start).position);
});
test('curtain cord stays in the actual joined sleeves during the pull',()=>{
 for(let f=Math.ceil((d.CURTAIN_PULL-.05)*30);f<=Math.floor((d.CURTAIN_MEET+.23)*30);f++){
  const t=f/30,q=d.curtainsMother(t);
  near(d.curtainState(t).grip,m.sleevePoint(q.position,q.rotationY,.96,q.arm,q.offset,q.lean,q.bob,d.CURTAIN_CUFF));
 }
 assert.equal(d.curtainState(d.CURTAIN_PULL-.01).gap,1.3);
 assert.ok(d.curtainState(d.CURTAIN_MEET+.05).gap<.02);
});
test('bowl is supported until its base meets the counter, then stays there',()=>{
 const contact=at('6.hands','bowl')+.12;
 for(let f=Math.ceil(cue('6.told').start*30);f<=Math.floor(contact*30);f++){
  const q=d.washingMother(f/30);
  near(q.bowl,m.sleevePoint(q.position,q.rotationY,.96,q.arm,q.offset,q.lean,q.bob));
 }
 const placed=d.washingMother(contact).bowl;
 assert.ok(placed[0]-.225>=-2.84&&placed[0]+.225<=-1.36);
 assert.ok(Math.abs((placed[1]-.01)-.95)<.012);
 for(let f=Math.ceil(contact*30);f<cue('6.lock').end*30;f++)near(d.washingMother(f/30).bowl,placed);
});
for(const first of [false,true])test(`${first?'half':'whole'} loaf stays on the wood and is sleeve-driven, not a floating tween`,()=>{
 const start=at(first?'3.lunch':'9.lunch',first?'split':'pushed'),end=start+(first?.47:.65);
 for(let f=Math.ceil(start*30);f<=Math.floor(end*30);f++){
  const q=d.lunchMotion(f/30,first);
  const actual=m.sleevePoint(q.position,q.yaw,.88,q.arm,q.offset,q.lean,0);
  near(actual,q.grip);
  assert.equal(q.bread[1],.815);
  assert.ok(Math.abs(actual[1]-.90)<1e-6);
 }
 const placed=d.lunchMotion(end,first).bread;
 for(let f=Math.ceil(end*30);f<(first?cue('3.lunch').end:cue('9.math').end)*30;f++)near(d.lunchMotion(f/30,first).bread,placed);
});
test('receiver meets the loaf with the real left hand, without stretching the rig',()=>{
 for(let f=0;f<30*cue('9.math').end;f++){
  const q=d.lunchMotion(f/30);
  if(q.receive===1)near(m.handWorld(d.LUNCH_HERO,Math.PI,.95,q.receiver,-1),q.receiveTarget,.012);
 }
});
test('the real right hand follows the hinged book cover, including its high point',()=>{
 for(let f=Math.ceil(d.BOOK_TOUCH*30);f<=Math.floor(d.BOOK_END*30);f++){
  const q=d.lunchMotion(f/30);
  assert.equal(q.openReach,1);
  near(m.handWorld(d.LUNCH_HERO,Math.PI,.95,q.opener,1),q.cover,.012);
 }
 assert.equal(d.lunchMotion(d.BOOK_OPEN-.01).opening,0);
 assert.equal(d.lunchMotion(d.BOOK_END+.01).opening,1);
});
