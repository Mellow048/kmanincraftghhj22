#!/usr/bin/env python3
"""Rebuild this film from its nine untouched recordings, then add two deliberate silent holds.
No words are changed. The 32-frame hold after 5.release gives the touch demonstration
an entire five-second stop; the extra tail is the approved reaction/hard-black ending.
Requires the same dependencies as narration.py. Idempotent: always starts from raw audio.
"""
from pathlib import Path
import hashlib, importlib.util, json, re, subprocess, sys
import numpy as np
ROOT = Path(__file__).resolve().parents[1]
SLUG = 'in-this-town-five-seconds'
spec = importlib.util.spec_from_file_location('narration', ROOT/'scripts/narration.py')
n = importlib.util.module_from_spec(spec); spec.loader.exec_module(n)
n.build(SLUG, 255, 'auto', 0.06, False, 30, 0.42, 0.06)
p = ROOT/'src/videos'/SLUG
j = json.loads((p/'timing.json').read_text())
voice = ROOT/'public/audio'/SLUG/'narration.mp3'
x = n.decode(str(voice), n.SR_OUT)
# 40.45 is inside the measured 40.295–40.628 silence, not through a word.
prev = next(c for c in j['cues'] if c['id']=='5.release')
following = next(c for c in j['cues'] if c['id']=='5.chalk')
e = max(w['e'] for w in j['words'] if prev['start'] <= w['s'] < prev['end'])
s = min(w['s'] for w in j['words'] if following['start'] <= w['s'] < following['end'])
bonk = next(c for c in j['cues'] if c['id']=='5.bonk')
bw = [w for w in j['words'] if bonk['start'] <= w['s'] < bonk['end']]
later = next(w for w in bw if w['w'].startswith('later'))
it = next(w for w in bw if w['w']=='it')
edits = [( (e+s)/2, 32/30, 'Complete five-second touch/release demonstration.'), ((later['e']+it['s'])/2, .4, 'Allow visible chalk wind-up and travel before its exact five-second stop.')]
extra = sum(d for _,d,_ in edits)
for point,duration,_ in reversed(edits):
    assert not any(w['s'] < point < w['e'] for w in j['words']), 'An edit would cut a word'
    sample=round(point*n.SR_OUT)
    x=np.concatenate([x[:sample], np.zeros(round(duration*n.SR_OUT), np.float32), x[sample:]])
subprocess.run([n.ffmpeg_exe(), '-v','error','-y','-f','f32le','-ar',str(n.SR_OUT),'-ac','1','-i','-', '-b:a','160k',str(voice)], input=x.astype(np.float32).tobytes(),check=True)
def shift(t): return t+sum(d for p,d,_ in edits if t>=p)
for w in j['words']:
    w['s']=round(shift(w['s']),3);w['e']=round(shift(w['e']),3)
for c in j['cues']:
    c['start']=round(round(shift(c['start'])*30)/30,4);c['end']=round(round(shift(c['end'])*30)/30,4)
for clip in j['clips']:
    end=shift(clip['at']+clip['seconds']);clip['at']=round(shift(clip['at']),3);clip['seconds']=round(end-clip['at'],3)
j['duration']=round(round((j['duration']+extra+0.6)*30)/30,4)
j['cues'][-1]['end']=j['duration']
j['wordsPerMinute']=round(len(j['words'])/j['words'][-1]['e']*60,1)
j['productionEdits']=[{'type':'silence','sourceAt':round(p,6),'frames':round(d*30),'reason':why} for p,d,why in edits]+[{'type':'tail','frames':18,'reason':'Prince recognition, brief reaction and hard black. No CTA.'}]
j['rebuild']='PYTHONPATH="$PWD/out/film-tools" python3 scripts/five-seconds-timing.py'
(p/'timing.json').write_text(json.dumps(j,indent=1)+'\n')
text=(p/'narration.md').read_text()
spoken=' '.join(re.findall(r'^\[[^\]]+\]\s*(.+)$',text,re.M))
log={'voice':'voice-00','spoken_sha256':hashlib.sha256(spoken.encode()).hexdigest(),'alignment':'all nine clips aligned against measured audio; no estimated word timings','recordings':[],'timing_sha256':hashlib.sha256((p/'timing.json').read_bytes()).hexdigest(),'narration_sha256':hashlib.sha256(voice.read_bytes()).hexdigest(),'duration':j['duration'],'tempo':j['tempo'],'words':len(j['words']),'clips':j['clips'],'edits':j['productionEdits']}
for f in sorted(voice.parent.glob('raw/*.mp3')):
    log['recordings'].append({'path':str(f.relative_to(ROOT)), 'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
(p/'narration-production.json').write_text(json.dumps(log,indent=2)+'\n')
print(f"Final timing: {j['duration']}s, {round(j['duration']*30)} frames; {j['wordsPerMinute']}wpm. Two silent holds totalling {extra:.4f}s, no spoken edits.")
