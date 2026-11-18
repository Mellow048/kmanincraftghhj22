#!/usr/bin/env python3
"""Check the delivered portrait master against the frame and mix clock."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
EDIT = json.loads((HERE / 'edit.json').read_text())
FPS, FRAMES = EDIT['fps'], EDIT['frames']
MARK = EDIT['marks']


def verify_clock():
    order = ['catch', 'steady', 'reach', 'land', 'drop', 'clink']
    marks = [MARK[k] for k in order]
    assert marks == sorted(set(marks)) and 0 < marks[0] < marks[-1] < FRAMES
    assert EDIT['cuts'] == sorted(set(EDIT['cuts'])) and EDIT['cuts'][0] == 0
    assert EDIT['cuts'][3] < MARK['land'] < EDIT['cuts'][-1] < MARK['drop']
    words = [q for q in json.loads((HERE / 'captions.json').read_text()) if q['w']]
    assert [w['w'] for w in words] == ['One', 'cake', 'Easy', 'HUS', 'HUS', 'HUS']
    assert [round(w['s']*FPS) for w in words[-3:]] == marks[:3]
    assert words[2]['e'] < words[3]['s'] and all(.17<w['e']-w['s']<.21 for w in words[-3:])
    print(f'Clock: {FRAMES} frames, three landed HUS cues, tray f{MARK["land"]}, tip f{MARK["clink"]}.')


def check(path: Path, ff: str, probe: str, sheets: Path | None):
    def decode(*args):
        return subprocess.run([ff,'-nostdin','-hide_banner',*args], check=True, capture_output=True)

    v,a=json.loads(subprocess.check_output([probe,'-v','error','-show_streams','-of','json',path]))['streams']
    assert (v['width'],v['height'],v['codec_name'],v['nb_frames'])==(1080,1920,'h264',str(FRAMES)),v
    assert v['pix_fmt'] in ('yuv420p','yuvj420p')
    assert abs(float(v['duration'])-FRAMES/FPS)<.004 and abs(float(a['duration'])-FRAMES/FPS)<.04
    assert v['start_pts']==a['start_pts']==0
    assert (a['codec_name'],a['channels'],a['sample_rate'])==('aac',2,'48000')
    print(f'{FRAMES/FPS:.2f}s H.264, {v["width"]}×{v["height"]}, {v["pix_fmt"]}, stereo AAC 48 kHz.')
    packets=json.loads(subprocess.check_output([probe,'-v','error','-select_streams','v:0','-show_packets','-show_entries',
                                                'packet=pts_time','-of','json',path]))['packets']
    pts=np.sort(np.array([float(p['pts_time']) for p in packets]))
    limit=np.abs(pts-np.arange(FRAMES)/FPS).max()
    assert limit<.004, limit
    print(f'Largest picture timestamp error: {limit*1000:.3f} ms.')
    data=decode('-v','error','-xerror','-threads','2','-i',path,'-an','-vf','scale=108:192:flags=area',
                '-threads','1','-pix_fmt','gray','-f','rawvideo','-').stdout
    image=np.frombuffer(data,np.uint8).reshape(-1,192,108).astype(np.int16)
    bright=image.mean(axis=(1,2))
    delta=np.abs(np.diff(image,axis=0)).mean(axis=(1,2))
    assert len(image)==FRAMES and bright.min()>32 and delta.min()>.001,(bright.min(),delta.min())
    cut=EDIT['cuts'][-1]
    assert delta[cut-1]>np.median(delta[max(0,cut-10):cut-1])*2
    print(f'All {len(image)} frames decode, no dark or repeated adjacent frames; f{cut} angle cut Δ{delta[cut-1]:.1f} luma.')

    def pcm(source):
        buf=decode('-v','error','-i',source,'-vn','-ac','1','-ar','8000','-f','f32le','-').stdout
        return np.frombuffer(buf,'<f4').astype(np.float64)

    reference=pcm(ROOT/'public/audio/one-cake-no-brakes/mix.mp3')
    sound=pcm(path)
    for name,start,end in [('line',.08,1.47),('catch',2.65,3.25),('bump',6.22,7.19),('reach',16.82,17.62),('tip',18.26,19.189)]:
        lo,hi=round(start*8000),round(end*8000)
        inset=min(lo,len(sound)-hi,160)
        assert inset>=0
        signal=reference[lo:hi]
        signal=signal-signal.mean()
        bank=sound[lo-inset:hi+inset]
        c=np.r_[0.,np.cumsum(bank)]
        ss=np.r_[0.,np.cumsum(bank**2)]
        n=len(signal)
        bnorm=np.sqrt(np.maximum(1e-10,ss[n:]-ss[:-n]-(c[n:]-c[:-n])**2/n))
        correlation=np.correlate(bank,signal,'valid')/(np.linalg.norm(signal)*bnorm)
        ms=(int(correlation.argmax())-inset)/8
        assert abs(ms)<5 and correlation.max()>.96,(name,ms,correlation.max())
        print(f'Audio {name:5s}: lag {ms:+.3f} ms, correlation {correlation.max():.5f}.')
    stats=decode('-nostats','-i',path,'-vn','-af','ebur128=peak=true','-f','null','-').stderr.decode(errors='replace').split('Summary:')[-1]
    lufs=float(re.search(r'\bI:\s*([-\d.]+) LUFS',stats)[1]); peak=float(re.search(r'\bPeak:\s*([-\d.]+) dBFS',stats)[1])
    assert -22<lufs<-14 and peak<-.8, (lufs,peak)
    with path.open('rb') as fp:
        sha=hashlib.file_digest(fp,'sha256').hexdigest()
    print(f'{lufs:.1f} LUFS / {peak:.1f} dBTP. {path.stat().st_size} bytes. SHA-256: {sha}')

    if sheets:
        from PIL import Image, ImageDraw
        samples={
            'opening': [0,5,12,30,39,42,78,86,91,116],
            'ride': [120,175,190,198,219,253,284,350,375,450],
            'delivery': [490,505,509,513,515,518,520,522,524,525],
            'tip': [530,541,545,548,551,555,558,562,569,575],
        }
        sheets.mkdir(parents=True,exist_ok=True)
        all_frames=[f for group in samples.values() for f in group]
        filt='select='+'+'.join(f'eq(n\\,{f})' for f in all_frames)+',scale=216:384:flags=lanczos'
        data=decode('-v','error','-threads','2','-i',path,'-an','-vf',filt,'-fps_mode','vfr',
                    '-threads','1','-pix_fmt','rgb24','-f','rawvideo','-').stdout
        pics=dict(zip(all_frames,np.frombuffer(data,np.uint8).reshape(-1,384,216,3),strict=True))
        for label,frames in samples.items():
            sheet=Image.new('RGB',(5*226+10,2*410+9),'#1a2430'); draw=ImageDraw.Draw(sheet)
            for i,f in enumerate(frames):
                x,y=10+i%5*226,9+i//5*410
                sheet.paste(Image.fromarray(pics[f]),(x,y)); draw.text((x+3,y+389),f'{f/FPS:.2f} s  /  f{f}',fill='#edf2e9')
            sheet.save(sheets/f'{label}.jpg',quality=93)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--video',type=Path,default=ROOT/'renders/one-cake-no-brakes.mp4')
    parser.add_argument('--ffmpeg',default=shutil.which('ffmpeg'))
    parser.add_argument('--ffprobe',default=shutil.which('ffprobe'))
    parser.add_argument('--sheets',type=Path)
    parser.add_argument('--clock-only',action='store_true')
    args=parser.parse_args()
    verify_clock()
    if not args.clock_only:
        if not args.ffmpeg or not args.ffprobe:
            parser.error('Install ffmpeg/ffprobe or pass their paths.')
        check(args.video,args.ffmpeg,args.ffprobe,args.sheets)
