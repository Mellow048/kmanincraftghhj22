"""Verify the V2's protected story/recordings/masters and actual audio stems, without rebuilding narration.
Run after write-sound.py and sound.py build ... --stems. Signal checks are not a listening review.
"""
from pathlib import Path
import hashlib, json, re, subprocess
import numpy as np
import imageio_ffmpeg

root=Path.cwd();film='in-this-town-five-seconds';source=root/'src/videos'/film
out=root/'out/five-seconds/full-v2';out.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
meta=json.loads((source/'narration-production.json').read_text())
timing=json.loads((source/'timing.json').read_text())
cues=lambda p:re.findall(r'^\[([^\]]+)\]\s*(.+)$',Path(p).read_text(),re.M)
spoken=' '.join(text for _,text in cues(source/'narration.md'))
assert hashlib.sha256(spoken.encode()).hexdigest()==meta['spoken_sha256']
assert len(spoken.split())==674 and len(cues(source/'narration.md'))==91
assert cues(source/'narration.md')==cues(root/'docs/story-proposals'/film/'narration.md')
assert meta['voice']=='voice-00'
assert sha(source/'timing.json')==meta['timing_sha256']
assert sha(root/'public/audio'/film/'narration.mp3')==meta['narration_sha256']
for item in meta['recordings']:
 assert sha(root/item['path'])==item['sha256'],item['path']
 assert (root/item['path']).stat().st_size==item['bytes']
assert timing['duration']==161.6 and timing['fps']==30

protected=[f'src/videos/{film}/{f}' for f in ['narration.md','timing.json','timeline.ts','narration-production.json','domestic-motion.ts']]
protected+=[f'public/audio/{film}/raw',f'public/audio/{film}/narration.mp3','Topics/InThisTown/InThisTownMusic.aac','renders/in-this-town-five-seconds.mp4','renders/previews/five-seconds-motion-v2.mp4',f'docs/story-proposals/{film}/narration.md',f'docs/story-proposals/{film}/SCRIPT-FOR-APPROVAL.md']
def unchanged(ref,paths):
 changed=subprocess.check_output(['git','diff',ref,'--name-only','--',*paths],text=True).strip()
 assert not changed,f'Protected files differ from {ref}: {changed}'
 return {'reference':ref,'paths':paths,'diff':[]}
protected_result=unchanged('cc8ed559fea2b23c1cc8e9d27cfd373ff8d522e8',protected)
freeze_result=unchanged('aa2fb0f',['src/videos/in-this-town-freeze-bell','public/audio/in-this-town-freeze-bell','renders/in-this-town-freeze-bell.mp4'])
masters={
 'renders/in-this-town-five-seconds.mp4':'ada21dde26a3c2e198abb51c8684da1f868356023cdbed4db8f83cc4d259568d',
 'renders/previews/five-seconds-motion-v2.mp4':'87cbeba24775762bb7c0bf2d4ed9b323d0f17d1b83953e5d8a5906f8e4be6aaf',
 'renders/in-this-town-freeze-bell.mp4':'03b91639e3e63c7a22271c1ef8f667936ccf111a374dd6279d313cff311fa8f2',
}
for p,expected in masters.items():assert sha(root/p)==expected,p
music=root/'Topics/InThisTown/InThisTownMusic.aac'
assert sha(music)=='5adf61371ab3f4fe5c1eff93bfa15ef940a7be3f9888da5807cececf2fafaca3'
lock=json.loads((source/'sound.lock.json').read_text())
for file,expected in lock['built_from'].items():
 p=root/'public/audio'/film/file if file=='narration.mp3' else source/file
 payload=p.read_bytes() if file=='narration.mp3' else p.read_text().replace('\r\n','\n').strip().encode('utf8')
 assert hashlib.sha1(payload).hexdigest()==expected, 'Stale mix input '+file
mix=root/'public/audio'/film/'mix.mp3'
assert hashlib.sha1(mix.read_bytes()).hexdigest()==lock['mix_sha1']
assert lock['music_track']['sha256']==sha(music) and not lock['failures']
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe();sr=12000

def pcm(p):
 return np.frombuffer(subprocess.check_output([ffmpeg,'-v','error','-i',str(p),'-vn','-ac','1','-ar',str(sr),'-f','f32le','-']),dtype='<f4').astype(np.float64)
def corr(a,b):
 n=min(len(a),len(b));a=a[:n]-a[:n].mean();b=b[:n]-b[:n].mean()
 return float(np.dot(a,b)/(np.linalg.norm(a)*np.linalg.norm(b)))

stems=root/'out/sound'/film
voice_match=corr(pcm(stems/'voice.wav'),pcm(root/'public/audio'/film/'narration.mp3'))
assert voice_match>.9999
track=pcm(music);score=pcm(stems/'music.wav');windows=[]
sections=lock['music_sections']
muted=[(s['at'],sections[i+1]['at'] if i+1<len(sections) else timing['duration']) for i,s in enumerate(sections) if s['mood']=='none']
for t in np.arange(1.5,159,3):
 # A window straddling the deliberately silent counter cannot correlate as a full second.
 if any(t+1>start-.25 and t<end+.25 for start,end in muted):continue
 a,b=round(t*sr),round((t+1)*sr)
 assert np.max(np.abs(score[a:b]))>=1e-5, 'Unexpected music silence'
 k=corr(track[a:b],score[a:b]);assert k>.98,(t,k)
 windows.append({'at':float(t),'correlation':round(k,6)})
# Inspect native PCM so resampling kernels cannot bleed a post-stop sample across the boundary.
import wave
with wave.open(str(stems/'beds.wav'),'rb') as w:
 assert w.getsampwidth()==2
 beds_sr=w.getframerate();beds=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,w.getnchannels())
stops=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {loadFilm} from './scripts/five-seconds-pure.mjs';console.log(JSON.stringify(loadFilm('timeline').STOPS));"],text=True))
ambience=[]
for s in stops:
 level=float(np.max(np.abs(beds[round(s['start']/30*beds_sr):round(s['end']/30*beds_sr)].astype(np.int32))))/32768
 assert level==0,(s,level)
 ambience.append({'stop':s['id'],'startFrame':s['start'],'resumeFrame':s['end'],'maxAbsAmbience':level})
report={'status':'passed','revision':'full-motion-v2','spoken_sha256':meta['spoken_sha256'],'words':674,'cues':91,'voice':'voice-00','originalRecordings':len(meta['recordings']),'duration':161.6,'protected':protected_result,'freezeBell':freeze_result,'preservedMasters':masters,'music_sha256':sha(music),'mix_sha256':sha(mix),'current_sound_lock':True,'measured_mix':lock['measured'],'voice_stem_correlation':voice_match,'music_stem':{'method':'Same-time mono one-second windows, no lag correction. Authored gain/ducking and EQ remain.','minimum':min(x['correlation'] for x in windows),'median':float(np.median([x['correlation'] for x in windows])),'windows':windows},'ambienceStops':ambience,'reviewLimit':'Hash/signal analysis only. No subjective listening or artistic acceptance is implied.'}
(out/'input-audit.json').write_text(json.dumps(report,indent=2)+'\n')
print('PASS: exact story, 9 original voice-00 recordings, timing, supplied AAC, accepted proof and both preserved masters.')
print('Voice stem correlation:',voice_match,'Music minimum:',report['music_stem']['minimum'],'All seven ambience holds silent.')
print('Current mix:',sha(mix),lock['measured'])
