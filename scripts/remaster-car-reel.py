"""Remaster the approved car reel: measured speech clock, tight cuts, original hook.
Requires numpy, imageio-ffmpeg and (to rebuild alignment.json) pocketsphinx.
All imagery is authored in the existing Minecraft engine; this builds audio and scene directions only.
"""
import json, math, subprocess, sys, wave
from pathlib import Path
import numpy as np
sys.path.insert(0,str(Path(__file__).resolve().parent))
import narration as nar
ROOT=Path(__file__).resolve().parents[1]
FILM=ROOT/'src/videos/the-guy-who-never-had-a-car'
AUDIO=ROOT/'public/audio/the-guy-who-never-had-a-car'
BUILD=ROOT/'out/car-remaster';BUILD.mkdir(parents=True,exist_ok=True)
SR=44100;FPS=30;FF=nar.ffmpeg_exe()
aligned=json.loads((FILM/'alignment.json').read_text())
shots=[];words=[];takes=[];cursor=0

def shot(mode,frames,card='',zone='drive',look='overworld-night',view=None):
 global cursor
 frames=int(frames)
 if frames<3:raise ValueError(('short shot',mode,frames))
 shots.append(dict(start=cursor,end=cursor+frames,mode=mode,card=card,zone=zone,look=look,view=view))
 cursor+=frames

def part(name,tempo,entries,zone='drive',look='overworld-night'):
 """Cut on measured WORD onsets, not equal-duration guesses."""
 global cursor
 a=aligned[name];start,end=a['trim']
 pcm=nar.decode(str(AUDIO/'raw'/f'{name}.mp3'),SR,tempo,start,end)
 # actual output duration, not just requested atempo, is the remapping clock
 ratio=(len(pcm)/SR)/(end-start)
 spans=[(s*ratio,e*ratio) for s,e in a['spans']]
 at=cursor/FPS
 for w,(s,e) in zip(a['words'],spans):
  words.append(dict(w=w,s=round(at+max(0,s-.025),4),e=round(at+e,4)))
 frames=math.ceil(len(pcm)/SR*FPS)
 takes.append(dict(name=name,tempo=tempo,at=at,frames=frames,pcm=pcm))
 bounds=[0]+[round(spans[i][0]*FPS) for i,*_ in entries[1:]]+[frames]
 for j,(i,mode,card,*view) in enumerate(entries):
  shot(mode,bounds[j+1]-bounds[j],card,zone,look,view[0] if view else None)

def gap(frames,mode='wash',card='',zone='drive',look='overworld-night',view=None):
 shot(mode,frames,card,zone,look,view)

# Preserve the original 6.8-second opening, including its two contact angles and payoff glimpse.
shot('wash',54,'HUS HUS HUS',view='hook-contact')
shot('wash',51,view='hook-face')
shot('mirror',99,'HE NEVER HAD A CAR','shop','warm-room','hook-mirror')
# Captions for the preserved audio: original raw was looped at 1.65x, up to 6.48 seconds.
a=aligned['01-chant'];orig=nar.decode(str(AUDIO/'raw/01-chant.mp3'),SR,1.65)
k=len(orig)/SR/6.48
for loop in range(2):
 for s,e in a['spans']:
  s=(s+a['trim'][0])*k+loop*len(orig)/SR;e=(e+a['trim'][0])*k+loop*len(orig)/SR
  if s<6.48:words.append(dict(w='HUS!',s=round(s,4),e=round(min(e,6.48),4)))
gap(9,'rewind','REWIND',look='overworld-sunset')
part('02-invite',1.12,[(0,'cruise',''),(8,'invite','')],zone='road',look='overworld-sunset')
part('03-town',1.24,[(0,'cruise',''),(7,'friends',''),(12,'cruise','','road-detail'),(18,'lonely','NOBODY BELIEVED IN ME'),(23,'sponge',''),(27,'lonely','A DIFFERENT DREAM')],zone='drive',look='overworld-sunset')
part('04-dream',1.22,[(0,'dream',''),(6,'dream','MAKE IT SHINE','dream-detail')],zone='shop',look='warm-room')
part('05-almost',2.4,[(0,'fail','AHH'),(1,'react','ALMOST ALMOST')],look='overworld-sunset')
part('06-grind',1.25,[(0,'wash','WHILE THEY WERE PARTYING'),(6,'dry','I WAS POLISHING'),(14,'fail','DAY 1'),(18,'toothbrush','THEY SLEPT I BUFFED'),(20,'sponges',"TALENT IS A LIE IT'S REPS"),(25,'meal','FUEL NOT FLAVOUR'),(29,'wash',''),(32,'calendar','NEVER MISS A MONDAY')])
# Eight quick action beats replace the former ten-second holds. No silent portraits.
for mode,card in [('wash',''),('dry',''),('toothbrush',''),('sponges',"IT'S REPS"),('calendar',''),('wash',''),('dry',''),('wash','')]:gap(12,mode,card)
part('07-months',1.2,[(0,'gloves','MONTHS PASSED'),(4,'wash','READY')],look='overworld-sunset')
part('08-hired',1.2,[(0,'arrive','HIRED'),(6,'gloves',''),(9,'wash','NEVER MISS A MONDAY')],zone='shop',look='warm-room')
part('09-reunion',1.15,[(0,'wreck',''),(4,'reunion',''),(7,'reunion','','friend-reverse')],zone='shop',look='warm-room')
part('10-training',1.1,[(0,'answer','TRAINING'),(1,'answer',"I'VE GOT WORK IN THE MORNING")],zone='shop',look='warm-room')
gap(15,'pigeon','',zone='shop',look='warm-room')
part('01-chant',1.65,[(0,'fast','HUS HUS HUS'),(2,'toothbrush',''),(4,'fast','','fast-overhead'),(6,'dry',''),(8,'fast','','fast-face')],zone='shop',look='warm-room')
gap(21,'wipe','ONE FINAL WIPE','shop','warm-room')
gap(39,'mirror','','shop','warm-room')
gap(54,'leave',"A REAL MAN DOESN'T NEED A CAR",'shop','warm-room')
gap(42,'end',"A REAL MAN DOESN'T NEED A CAR",'shop','warm-room')
D=cursor/FPS;n=round(D*SR)

# A fresh 158 BPM original phonk-style bed starts AFTER the untouched hook.
rng=np.random.default_rng(48);music=np.zeros(n,np.float32);mix=np.zeros(n,np.float32);duck=np.ones(n,np.float32)
def put(dst,at,x,g=1):
 i=round(at*SR);end=min(len(dst),i+len(x))
 if end>i:dst[i:end]+=x[:end-i]*g
beat=60/158
for b in range(math.ceil((D-6.8)/beat)):
 at=6.8+b*beat;t=np.arange(int(.32*SR))/SR
 kick=np.sin(2*np.pi*(46*t+75*.023*(1-np.exp(-t/.023))))*np.exp(-t*16)
 if b%4 in (0,2):put(music,at,np.tanh(2.7*kick)*.34)
 if b%4 in (1,3):put(music,at,rng.normal(0,1,len(t))*np.exp(-t*29)*.10)
 for off in (0,.5):
  ht=np.arange(int(.06*SR))/SR;noise=rng.normal(0,1,len(ht));noise=np.diff(noise,prepend=0)
  put(music,at+off*beat,noise*np.exp(-ht*70)*.023)
 note=[0,0,-3,2,0,7,2,-3][b%8];f=55*2**(note/12);bt=np.arange(int(beat*SR))/SR
 put(music,at,np.tanh(2.5*np.sin(2*np.pi*f*bt))*np.exp(-bt*3.2)*.15)
 if b%8 in (0,2,3,5,6):
  ct=np.arange(int(.18*SR))/SR;cf=660*2**([0,3,7,10,7,3,0,-2][b%8]/12)
  bell=(np.sin(2*np.pi*cf*ct)+.6*np.sin(2*np.pi*cf*1.48*ct))*np.exp(-ct*26)
  put(music,at+.5*beat,np.tanh(bell*2)*.052)
for take in takes:
 pcm=take['pcm'].copy();pcm/=max(.1,float(np.max(np.abs(pcm))));pcm*=.68
 edge=min(160,len(pcm)//2);pcm[:edge]*=np.linspace(0,1,edge);pcm[-edge:]*=np.linspace(1,0,edge)
 put(mix,take['at'],pcm)
 i=round(take['at']*SR);duck[i:i+len(pcm)]=.28
for s in shots:
 at=s['start']/FPS
 if at<6.8:continue
 if s['mode']=='pigeon':music[round(at*SR):round(s['end']/FPS*SR)]=0
 if s['mode'] in ('wash','dry','fast','wipe','toothbrush','fail'):
  t=np.arange(int(.19*SR))/SR;put(mix,at,rng.normal(0,1,len(t))*np.sin(np.linspace(0,np.pi,len(t)))**2*.055)
 if s['mode'] in ('rewind','fail','arrive','wreck','wipe'):
  t=np.arange(int(.23*SR))/SR;put(mix,at,np.sin(2*np.pi*(78*t-55*t*t))*np.exp(-t*16)*.24)
mix=np.tanh((mix+music*duck)*1.15)*.91
hook=nar.decode(str(AUDIO/'hook.wav'),SR)
mix[:round(6.8*SR)]=hook[:round(6.8*SR)]
mix[-SR:]*=np.linspace(1,0,SR)
with wave.open(str(BUILD/'mix.wav'),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype('<i2').tobytes())
subprocess.run([FF,'-y','-v','error','-i',str(BUILD/'mix.wav'),'-c:a','libmp3lame','-b:a','192k',str(AUDIO/'mix.mp3')],check=True)

# Shot presets are authored around the actual actor/prop, not generated random cameras.
V={
 'hook-contact':([.8,1.2,1.1],3.2,2.8,35,5,36),
 'hook-face':([1.32,1.55,1],2,1.7,18,0,36),
 'hook-mirror':([0,1.1,1],6,5.4,20,10,44),
 'wash':([.8,1.2,1],4.3,3.6,30,8,44),'dry':([.8,1.1,1],3.9,3.2,-25,16,44),
 'rewind':([0,1.1,0],6.6,6,25,18,44),'cruise':([0,1.2,0],6.5,5.8,25,8,44),
 'road-detail':([.5,1.1,.5],5.5,4.7,-25,12,42),'invite':([.3,1.3,.2],5.8,5,20,6,44),
 'friends':([0,1.2,1],5.8,5,-20,4,44),'sponge':([1.35,1.3,1],2.8,2.4,10,10,36),
 'lonely':([1.9,1.25,2.5],4.4,3.7,20,8,42),'dream':([0,1.2,.2],6,5.1,-25,10,44),
 'dream-detail':([0,1.1,1],4.8,4,25,8,42),'fail':([0,1.1,1],5.8,5,-20,6,44),
 'react':([1.35,1.45,1],2.6,2.2,10,2,36),'toothbrush':([1.1,.7,1.25],4,3.5,45,20,40),
 'meal':([.8,.55,2.1],3.3,2.8,12,38,38),'sponges':([-.2,.35,1.8],3.5,3,15,42,42),
 'calendar':([.2,1.4,2],3.3,2.8,8,5,40),'gloves':([1.35,1.15,1],3.3,2.8,5,12,36),
 'arrive':([1,1.3,0],7.6,6.3,15,12,44),'wreck':([0,1.2,.5],7,6,-20,8,44),
 'reunion':([.5,1.4,1.7],5.8,5.1,18,6,44),'friend-reverse':([-.9,1.4,1.7],5.5,4.8,-25,5,42),
 'answer':([1.35,1.5,1],2.6,2.2,0,1,36),'pigeon':([0,1.5,.1],4.5,4,22,8,42),
 'fast':([.9,1.1,1.2],3.5,3,38,15,40),'fast-overhead':([.5,1.2,1],4.4,3.7,-28,35,44),
 'fast-face':([1.35,1.5,1],2.5,2.1,0,2,36),'wipe':([0,1.1,1],5.8,5,20,8,44),
 'mirror':([0,.95,2.1],3.3,2.8,0,4,36),'leave':([0,1.2,.8],6,6.5,-18,10,44),
 'end':([0,1.3,.5],7,7.5,18,12,44),
}
words.sort(key=lambda w:w['s']);cues=[]
source="""import React from 'react';
import {storyScene,cam} from '../../engine';
import type {Timing} from '../../engine';
import timingJson from './timing.json';
import {Stage} from './stage';
const timing=timingJson as Timing;
export const scene1=storyScene(timing, {
 id: 'scene1',
 title: 'Remaster — the speech is the clock',
 shots: [
"""
for i,s in enumerate(shots):
 a=s['start']/FPS;b=s['end']/FPS
 # Road actions always live on the road set, even while the narrator discusses the town.
 zone='road' if s['mode'] in ('cruise','friends','invite') else s['zone']
 off={'drive':0,'road':40,'shop':-40}[zone]
 view=s['view'] or s['mode'];on,dist,to,yaw,pitch,fov=V[view];on=[on[0]+off,on[1],on[2]]
 camera=f'...cam.push({{on:{json.dumps(on)},dist:{dist},to:{to},yaw:{yaw},pitch:{pitch},fov:{fov}}})'
 if zone=='road' and s['mode'] in ('cruise','friends'):
  endon=[on[0],on[1],on[2]+(b-a)*1.65]
  camera=f'...cam.push({{on:{json.dumps(on)},onTo:{json.dumps(endon)},dist:{dist},to:{to},yaw:{yaw},pitch:{pitch},fov:{fov}}})'
 text=' '.join(w['w'] for w in words if a<=w['s']<b) or '...'
 cues.append(dict(id=str(i+1),start=round(a,6),end=round(b,6),text=text))
 note=f"{s['mode']}: Cut on the measured voice; show a new action or consequence rather than a held portrait."
 source+=f"""  {{
   cue: '{i+1}',
   {camera},
   zone: '{zone}', look: '{s['look']}',
   note: {json.dumps(note)},
   stage: (t)=><Stage mode={json.dumps(s['mode'])} time={{t}} absolute={{{a:.6f}}} offset={{{off}}} card={{{json.dumps(s['card'])}}}/>,
  }},
"""
source+=' ],\n});\n'
(FILM/'scene1.tsx').write_text(source)
timing=dict(fps=30,duration=D,estimated=False,wordTimingMethod='Forced alignment on raw voice-20 recordings, mapped through measured atempo output; HUS uses acoustic burst onsets.',wordsPerMinute=round(len(words)/D*60,1),cues=cues,words=words)
(FILM/'timing.json').write_text(json.dumps(timing,indent=2)+'\n')
(FILM/'narration.md').write_text('# Car reel remaster — approved wording, tighter performance/edit\n\nWord timing is measured from the raw recordings; no equal-spacing fallback.\n\n```narration\n'+'\n'.join(f"[{c['id']}] {c['text']}" for c in cues)+'\n```\n')
(FILM/'remaster-edit.json').write_text(json.dumps(dict(duration=D,frames=cursor,hookUnchangedUntil=6.8,alignment='pocketsphinx forced alignment; measured HUS bursts',takes=[{k:v for k,v in t.items() if k!='pcm'} for t in takes],shots=shots),indent=2)+'\n')
print(f'REMASTER: {D:.2f}s, {cursor} frames, {len(shots)} shots, {len(words)} measured words')
for t in takes:print(t['name'],f"at {t['at']:.3f}s, {t['tempo']}x, {t['frames']/30:.3f}s")
