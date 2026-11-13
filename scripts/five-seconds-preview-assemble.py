#!/usr/bin/env python3
"""Assemble three actual-film excerpts. No retiming, narration edits or final-master replacement.
Run after scripts/five-seconds-motion-preview.mjs. Requires FFmpeg and ffprobe; Pillow for review sheets.
"""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/'out/five-seconds/motion-v2'
DEST=ROOT/'renders/previews/five-seconds-motion-v2.mp4'
DATA=ROOT/'src/videos/in-this-town-five-seconds'
RANGES=[('curtains',270,428),('bowl',1437,1569),('friendship',2125,2303)]

def ffmpeg():
    if os.environ.get('FFMPEG'):return os.environ['FFMPEG']
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return shutil.which('ffmpeg') or 'ffmpeg'
FF=ffmpeg()
FFPROBE=os.environ.get('FFPROBE') or shutil.which('ffprobe') or str(ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe')

def run(args,**kw):return subprocess.run(args,check=True,**kw)
def probe(args):return json.loads(subprocess.check_output([FFPROBE,'-v','error',*args,'-of','json',str(DEST)]))
DEST.parent.mkdir(parents=True,exist_ok=True)
args=[FF,'-hide_banner','-loglevel','warning','-y']
filters=[]
for i,(name,first,last) in enumerate(RANGES):
    args+=['-i',str(WORK/(name+'.mp4'))]
    n=last-first+1;duration=n/30
    filters+=[f'[{i}:v]trim=end_frame={n},setpts=PTS-STARTPTS,setsar=1[v{i}]',
              f'[{i}:a]atrim=duration={duration:.9f},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.008,afade=t=out:st={duration-.008:.9f}:d=0.008[a{i}]']
filters+=[''.join(f'[v{i}][a{i}]' for i in range(len(RANGES)))+'concat=n=3:v=1:a=1[v][a]',
          '[v]settb=expr=1/30000,setpts=N*1000[video]']
args+=['-filter_complex',';'.join(filters),'-map','[video]','-map','[a]',
       '-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-r','30','-fps_mode','cfr',
       '-c:a','aac','-b:a','192k','-ar','48000','-video_track_timescale','30000','-movflags','+faststart',str(DEST)]
if '--review-only' not in sys.argv:run(args)
meta=probe(['-show_streams','-show_format','-count_frames'])
video=next(s for s in meta['streams'] if s['codec_type']=='video')
audio=next(s for s in meta['streams'] if s['codec_type']=='audio')
frames=sum(b-a+1 for _,a,b in RANGES)
assert (video['width'],video['height'])==(720,1280)
assert video['avg_frame_rate']=='30/1'
assert int(video['nb_read_frames'])==frames==471
pts=probe(['-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp_time'])['frames']
error=max(abs(float(p['best_effort_timestamp_time'])-i/30) for i,p in enumerate(pts))
assert error<.000001
decoded=run([FF,'-v','error','-xerror','-i',str(DEST),'-f','null','-'],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
assert not decoded.stderr.strip(),decoded.stderr.decode(errors='replace')

# Compare the encoded soundtrack with the SAME ranges of the authored mix (not a listening review).
import numpy as np
def samples(args):
    raw=subprocess.check_output([FF,'-v','error',*args,'-ac','1','-ar','16000','-f','f32le','-'])
    return np.frombuffer(raw,dtype='<f4').astype(np.float64)
expected_filters=['[0:a]asplit=3[i0][i1][i2]']
for i,(_,first,last) in enumerate(RANGES):
    duration=(last-first+1)/30
    expected_filters.append(f'[i{i}]atrim=start={first/30:.9f}:end={(last+1)/30:.9f},asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st={duration-.008:.9f}:d=0.008[e{i}]')
expected_filters.append('[e0][e1][e2]concat=n=3:v=0:a=1[expected]')
reference=samples(['-i',str(ROOT/'public/audio/in-this-town-five-seconds/mix.mp3'),'-filter_complex',';'.join(expected_filters),'-map','[expected]'])
actual=samples(['-i',str(DEST),'-vn'])
length=min(len(reference),len(actual));reference=reference[:length];actual=actual[:length]
audio_correlation=float(np.corrcoef(reference,actual)[0,1])
assert audio_correlation>.995, f'Preview soundtrack/excerpts do not align: {audio_correlation}'
segment_correlations=[]
offset=0
for name,first,last in RANGES:
    n=round((last-first+1)/30*16000)
    # Ignore 20 ms of codec/filter edge response, but retain the whole narrated passage.
    a,b=offset+320,min(length,offset+n-320)
    correlation=float(np.corrcoef(reference[a:b],actual[a:b])[0,1]);assert correlation>.995
    segment_correlations.append({'name':name,'zero_lag_correlation':correlation})
    offset+=n

# Extract a temporal strip from each encoded passage. These are review aids, not playback certification.
from PIL import Image, ImageDraw
review=WORK/'encoded-review';review.mkdir(exist_ok=True)
offset=0
sheets=[]
for name,first,last in RANGES:
    n=last-first+1
    sample=sorted(set([*range(0,n,6),n-1])) # 5 fps, plus the exact last frame (without duplicates)
    folder=review/name;folder.mkdir(exist_ok=True)
    select='+'.join(f'eq(n,{offset+k})' for k in sample)
    run([FF,'-v','error','-y','-i',str(DEST),'-vf',f"select='{select}',scale=216:384",'-fps_mode','vfr',str(folder/'%03d.png')])
    pics=sorted(folder.glob('*.png'))
    assert len(pics)==len(sample),(name,len(pics),len(sample))
    cols=6;w=216;h=406
    sheet=Image.new('RGB',(cols*w,((len(pics)+cols-1)//cols)*h),'#101721');draw=ImageDraw.Draw(sheet)
    for i,(pic,k) in enumerate(zip(pics,sample)):
        x,y=i%cols*w,i//cols*h
        with Image.open(pic) as im:sheet.paste(im,(x,y+22))
        draw.text((x+5,y+5),f'{name} {k/30:.2f}s / src {first+k}',fill='white')
    location=review/(name+'.jpg');sheet.save(location,quality=92);sheets.append(str(location.relative_to(ROOT)))
    offset+=n

manifest={
 'status':'motion preview — owner judgment pending; not the revised full film',
 'file':str(DEST.relative_to(ROOT)),'bytes':DEST.stat().st_size,
 'sha256':hashlib.sha256(DEST.read_bytes()).hexdigest(),
 'width':720,'height':1280,'fps':30,'frames':frames,'video_seconds':frames/30,
 'audio_seconds':float(audio['duration']),'max_video_pts_error_seconds':error,'full_decode':'passed',
 'audio_excerpt_zero_lag_correlation':audio_correlation,'audio_by_excerpt':segment_correlations,
 'ranges':[{'name':name,'first_source_frame':a,'last_source_frame_inclusive':b,'frames':b-a+1} for name,a,b in RANGES],
 'source_film_frames':4848,'source_film_seconds':161.6,
 'audio':'Original approved voice-00 recordings and supplied InThisTownMusic.aac. Effects retimed to the revised contacts. 8 ms edge fades only at preview excerpt joins.',
 'review_sheets':sheets,
 'review_boundary':'Encoded sequential frames and contact/source checks; no agent claim of real-time playback, subjective listening or owner approval.',
 'source_hashes':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in [
  DATA/'domestic-motion.ts',DATA/'home-actions.tsx',DATA/'school-actions.tsx',DATA/'motion.ts',DATA/'world.tsx',
  DATA/'scene2.tsx',DATA/'scene6.tsx',DATA/'scene9.tsx',DATA/'timing.json',DATA/'sound.json',
  ROOT/'Topics/InThisTown/villagers.tsx',ROOT/'Topics/InThisTown/small-props.tsx',ROOT/'src/engine/props.tsx',
  ROOT/'public/audio/in-this-town-five-seconds/mix.mp3'
 ]},
}
(DATA/'motion-preview.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({k:manifest[k] for k in ['file','bytes','sha256','frames','video_seconds','max_video_pts_error_seconds','review_sheets']},indent=2))
