import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import * as THREE from 'three';
const cache=new Map();
const film=path.resolve('src/videos/in-this-town-five-seconds');
const allowed=new Set(['motion','timeline','performance','domestic-motion','home-motion','school-motion','rescue-motion','chase-motion','school-layout'].map(n=>path.join(film,n+'.ts')));
for(const n of ['anim','math'])allowed.add(path.resolve('src/engine',n+'.ts'));
/** Compile only deterministic choreography. This never imports React or starts a renderer. */
export function loadPure(file){
 file=path.resolve(file);if(!path.extname(file))file+='.ts';
 if(file===path.join(film,'timing.json'))return JSON.parse(fs.readFileSync(file,'utf8'));
 if(!allowed.has(file))throw new Error('Unexpected pure-module dependency '+file);
 if(cache.has(file))return cache.get(file);
 const module={exports:{}};cache.set(file,module.exports);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const require=id=>id==='three'?THREE:loadPure(path.resolve(path.dirname(file),id));
 new Function('require','module','exports',code)(require,module,module.exports);return module.exports;
}
export const loadFilm=name=>loadPure(path.join(film,name));
