"""Encoded Five Seconds QA, never a subjective playback/listening claim.

Usage: python3 scripts/check-five-seconds-delivery.py path/to/film.mp4 [master|copy]
Requires numpy, Pillow, imageio-ffmpeg and the repo's Remotion ffprobe.
Outputs reports and encoded-film contact sheets into out/five-seconds/delivery-qa/.
"""
from pathlib import Path
import sys, json, subprocess, hashlib, re, math, struct, os
import numpy as np
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

ROOT=Path.cwd()
FILM='in-this-town-five-seconds'
media=Path(sys.argv[1]).resolve()
kind=sys.argv[2] if len(sys.argv)>2 else 'master'
out=Path(os.environ.get('QA_OUTPUT',str(ROOT/'out/five-seconds/delivery-qa'/kind)))
out.mkdir(parents=True,exist_ok=True)
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
ffprobe=str(ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe')
timing=json.loads((ROOT/'src/videos'/FILM/'timing.json').read_text())
frames=round(timing['duration']*timing['fps']); duration=frames/30

def run(args, **kw):
    try:
        return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,**kw)
    except subprocess.CalledProcessError as error:
        print(error.stderr.decode(errors='replace'), file=sys.stderr)
        raise


def selector(frames):
    """Balanced expression: ffmpeg's evaluator caps the depth of a long sum."""
    if len(frames) == 1:
        return f'eq(n,{frames[0]})'
    mid = len(frames) // 2
    return f'({selector(frames[:mid])}+{selector(frames[mid:])})'

probe=json.loads(run([ffprobe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(media)]).stdout)
(out/'probe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=[x for x in probe['streams'] if x['codec_type']=='video']
a=[x for x in probe['streams'] if x['codec_type']=='audio']
assert len(v)==len(a)==1, 'Expected one video and one audio track'
v,a=v[0],a[0]
assert v['codec_name']=='h264' and a['codec_name']=='aac'
assert int(v['nb_read_frames'])==frames==4848
assert v['r_frame_rate']=='30/1' and v['avg_frame_rate']=='30/1'
assert v['width']*16==v['height']*9
assert (v['width']==1080 if kind=='master' else v['width'] in [720,1080])
assert v['pix_fmt']=='yuv420p'
assert a['channels']==2
assert a['sample_rate']=='48000'
assert abs(float(v['duration'])-duration)<0.001
assert abs(float(a['duration'])-duration)<0.1
assert abs(float(probe['format']['duration'])-duration)<0.15

# Verify every decoded presentation time, not just a container frame count.
pts_data=json.loads(run([ffprobe,'-v','error','-select_streams','v:0','-show_frames',
    '-show_entries','frame=best_effort_timestamp_time','-of','json',str(media)]).stdout)
pts=np.array([float(f['best_effort_timestamp_time']) for f in pts_data['frames']])
assert len(pts)==frames
pts_error=float(np.max(np.abs(pts-np.arange(frames)/30)))
assert pts_error<2e-6, f'Nonuniform or shifted video timestamps: {pts_error}'
encoded_stops=[]
model_file=Path(os.environ.get('MODEL_AUDIT',str(ROOT/'src/videos'/FILM/'model-audit.json')))
for stop in json.loads(model_file.read_text())['stops']:
    first_frozen, first_resumed = stop['start'], stop['end']
    held_seconds = float(pts[first_resumed] - pts[first_frozen])
    assert first_resumed-first_frozen == 150 and abs(held_seconds-5) < 1e-6
    encoded_stops.append({'id':stop['id'],'start_frame':first_frozen,'resume_frame':first_resumed,'frames':first_resumed-first_frozen,'encoded_seconds':held_seconds})

atoms=[]
with media.open('rb') as f:
    end=media.stat().st_size
    while f.tell()+8<=end:
        at=f.tell(); header=f.read(8); size,tag=struct.unpack('>I4s',header)
        if size==1: size=struct.unpack('>Q',f.read(8))[0]
        if size==0: size=end-at
        assert size>=8
        atoms.append({'type':tag.decode('ascii','replace'),'at':at,'bytes':size})
        f.seek(at+size)
positions={x['type']:x['at'] for x in atoms}
assert positions['moov']<positions['mdat'], 'MP4 is not fast-start'

# Decode every packet, including the AAC stream, and fail on a decoding error.
decoded=run([ffmpeg,'-v','error','-xerror','-i',str(media),'-map','0:v:0','-map','0:a:0','-f','null','-'])
(out/'decode-errors.txt').write_bytes(decoded.stderr)
assert not decoded.stderr.strip(), decoded.stderr.decode(errors='replace')

# A small analysis image is enough for accidental black/frozen segments.
analysis=run([ffmpeg,'-hide_banner','-i',str(media),'-an','-vf',
              'scale=180:320,blackdetect=d=0.1:pix_th=0.07:pic_th=0.98,freezedetect=n=-60dB:d=0.8',
              '-f','null','-'])
log=analysis.stderr.decode(errors='replace')
(out/'black-freeze-detection.log').write_text(log)
black=[line for line in log.splitlines() if 'black_start:' in line]
frozen=[line for line in log.splitlines() if 'lavfi.freezedetect.freeze_start' in line]

# Inspect all decoded frames at reduced resolution for a complete, exact black tail.
# This is a whole-frame check, not the intentionally frozen actors against a moving camera.
low=run([ffmpeg,'-v','error','-i',str(media),'-an','-vf','scale=54:96:flags=area',
    '-pix_fmt','gray','-f','rawvideo','-']).stdout
low=np.frombuffer(low,dtype=np.uint8).reshape(frames,96,54)
black_frames=np.where(low.max(axis=(1,2))<8)[0].tolist()
expected_black=math.ceil(timing['words'][-1]['e']*30)+15
assert expected_black==4833
assert black_frames==list(range(expected_black,frames)), f'Unexpected black frames: {black_frames}'

# Compare the actual encoded soundtrack against the committed mix. This catches
# a voice-only / wrong-film render, a missing chunk, and discontinuities at joins.
SR=12000

def pcm(p):
    b=run([ffmpeg,'-v','error','-i',str(p),'-vn','-ac','1','-ar',str(SR),'-f','f32le','-']).stdout
    return np.frombuffer(b,dtype='<f4').astype(np.float64)

source=pcm(ROOT/'public/audio'/FILM/'mix.mp3')
encoded=pcm(media)
x,y=source[::12],encoded[::12]
nfft=1 << (len(x)+len(y)-1).bit_length()
cross=np.fft.irfft(np.fft.rfft(y,nfft)*np.conj(np.fft.rfft(x,nfft)),nfft)
lags=np.arange(-100,101)
coarse=int(lags[np.argmax(cross[lags % nfft])])*12

def aligned(lag):
    # Positive lag means the MP4 audio is later than the source mix.
    xx=source[max(0,-lag):]
    yy=encoded[max(0,lag):]
    n=min(len(xx),len(yy))
    return xx[:n],yy[:n]

def correlation(x,y):
    x=x-x.mean();y=y-y.mean()
    return float(np.dot(x,y)/(np.linalg.norm(x)*np.linalg.norm(y)))

scores=[]
for lag in range(coarse-15,coarse+16):
    xx,yy=aligned(lag); n=min(len(xx),SR*45)
    scores.append((correlation(xx[:n],yy[:n]),lag))
_,lag=max(scores)
xx,yy=aligned(lag)
windows=[]
for i in range(0,len(xx),SR*5):
    stop=min(len(xx),i+SR*5)
    windows.append({'at':round(i/SR,3),'seconds':round((stop-i)/SR,3),
                    'correlation':round(correlation(xx[i:stop],yy[i:stop]),6)})
chunks=min(20,math.ceil(frames/270))
joins=[]
for i in range(1,chunks):
    frame=math.floor(i*frames/chunks); t=frame/30
    start=max(0,round((t-0.5)*SR));stop=min(len(xx),round((t+0.5)*SR))
    joins.append({'frame':frame,'at':round(t,6),'correlation':round(correlation(xx[start:stop],yy[start:stop]),6)})

loud=run([ffmpeg,'-hide_banner','-i',str(media),'-vn','-af',
          'loudnorm=I=-14.5:TP=-0.3:LRA=11:print_format=json','-f','null','-'])
loudtext=loud.stderr.decode(errors='replace')
(out/'encoded-loudness.log').write_text(loudtext)
loudness=json.loads(re.findall(r'\{\s*"input_i"[\s\S]*?\}',loudtext)[-1])

# One picture per cue, extracted from the encoded video (not re-rendered).
jobs=[]
for i,c in enumerate(timing['cues']):
    first=math.floor(c['start']*30+0.5);last=max(first,math.floor(c['end']*30+0.5)-1)
    frame=(first+last+1)//2
    jobs.append({'frame':frame,'name':f'{i+1:02}-{c["id"]}'})
selected=selector([j['frame'] for j in jobs])
run([ffmpeg,'-v','error','-y','-i',str(media),'-an','-vf',f"select='{selected}',scale=270:480",'-fps_mode','vfr','-q:v','2',str(out/'frame-%03d.jpg')])
fs=sorted(out.glob('frame-*.jpg'));assert len(fs)==91
for i in range(0,len(fs),20):
    batch=fs[i:i+20];rows=(len(batch)+4)//5
    sheet=Image.new('RGB',(1370,505*rows),(18,21,26));draw=ImageDraw.Draw(sheet)
    for j,f in enumerate(batch):
        x=(j%5)*274;y=(j//5)*505
        sheet.paste(Image.open(f),(x,y+24))
        draw.text((x+5,y+6),jobs[i+j]['name'],font=ImageFont.load_default(),fill=(242,229,191))
    sheet.save(out/f'sheet-{i//20+1:02}.jpg',quality=92)

report={
    'file':str(media.relative_to(ROOT)), 'kind':kind,
    'sha256':hashlib.sha256(media.read_bytes()).hexdigest(),
    'bytes':media.stat().st_size,'width':v['width'],'height':v['height'],
    'fps':v['r_frame_rate'],'decoded_frames':int(v['nb_read_frames']),
    'video_duration':float(v['duration']),'audio_duration':float(a['duration']),
    'container_duration':float(probe['format']['duration']),
    'video_codec':v['codec_name'],'pixel_format':v['pix_fmt'],
    'audio_codec':a['codec_name'],'channels':a['channels'],'sample_rate':a['sample_rate'],
    'fast_start':True,'full_decode_errors':0,
    'max_video_timestamp_error_seconds':pts_error,'intentional_black_frames':black_frames,
    'encoded_stop_intervals':encoded_stops,
    'black_segments':black,'freeze_segments_over_0_8s':frozen,
    'audio_lag_ms':round(lag/SR*1000,4),
    'source_mix_correlation':round(correlation(xx,yy),6),
    'worst_5s_audio_correlation':min(w['correlation'] for w in windows),
    'join_windows':joins,'audio_windows':windows,
    'encoded_loudness_input':{k:v for k,v in loudness.items() if k.startswith('input_')},
    'midpoint_images':len(fs),
    'review_limit':'Numerical checks and extracted encoded frames. This does not constitute real-time playback or subjective listening.',
}
(out/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['audio_windows','join_windows']},indent=2),flush=True)
assert abs(report['audio_lag_ms'])<1000/30,'Encoded audio is more than a frame away from source'
assert report['source_mix_correlation']>0.95,'Encoded soundtrack does not match the authored mix'
assert report['worst_5s_audio_correlation']>0.90,'An audio window is different from the source mix'
assert min(j['correlation'] for j in joins)>0.90,'Audio discontinuity around a chunk join'
assert -16.5<=float(loudness['input_i'])<=-13
assert float(loudness['input_tp'])<=-0.3
assert all(abs(float(re.search(r'black_start:([0-9.]+)',line).group(1))-expected_black/30)<1/30 for line in black),'Unexpected black interval'
assert not frozen,'Review the unexpectedly frozen segments before delivery'
# Additional preparation/travel/contact/recovery samples from the encoded master.
cases=json.loads(Path(os.environ.get('ACTION_FRAMES',str(ROOT/'src/videos'/FILM/'action-review-frames.json'))).read_text())
action_dir=out/'actions';action_dir.mkdir(exist_ok=True)
action_frames=sorted({f for group in cases.values() for f in group})
selected=selector(action_frames)
run([ffmpeg,'-v','error','-y','-i',str(media),'-an','-vf',f"select='{selected}',scale=270:480",'-fps_mode','vfr','-q:v','2',str(action_dir/'frame-%03d.jpg')])
action_files=sorted(action_dir.glob('frame-*.jpg'))
assert len(action_files)==len(action_frames)
by_frame=dict(zip(action_frames,action_files))
for group, selected_frames in cases.items():
    cols=min(5,len(selected_frames));rows=math.ceil(len(selected_frames)/cols)
    sheet=Image.new('RGB',(274*cols,505*rows),(18,21,26));draw=ImageDraw.Draw(sheet)
    for i,f in enumerate(selected_frames):
        x=i%cols*274;y=i//cols*505
        sheet.paste(Image.open(by_frame[f]),(x,y+24))
        draw.text((x+5,y+6),f'{group} / {f} / {f/30:.3f}s',fill=(242,229,191))
    sheet.save(out/f'action-{group}.jpg',quality=92)
report['action_images']=len(action_frames)
report['action_sheets']=len(cases)
report['status']='passed'
(out/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print('PASS: encoded video, all frames/timestamps, fast start, exact black tail, audio identity/alignment/joins and loudness. View the extracted sheets; this is NOT a listening review.',flush=True)
