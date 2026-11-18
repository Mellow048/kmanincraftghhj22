#!/usr/bin/env python3
"""Produce the original voice/rail Foley mix and caption sidecars from edit.json."""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
import shutil
import subprocess as sp

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
EDIT = json.loads((HERE / "edit.json").read_text())
FPS, FRAMES = EDIT["fps"], EDIT["frames"]
MARK = EDIT["marks"]
SR, BLOCK = 48000, 48000 // FPS
N = FRAMES * BLOCK
DURATION = FRAMES/FPS
RNG = np.random.default_rng(341927)


def clock(length: float):
    return np.arange(round(length*SR))/SR


def fade(x, enter=.003, exit=.017):
    y = x.copy()
    for n, tail in ((round(enter*SR), False), (round(exit*SR), True)):
        n = min(n,len(y))
        if n:
            window = np.linspace(0,1,n).reshape((n,) + (1,)*(y.ndim-1))
            if tail:
                y[-n:] *= window[::-1]
            else:
                y[:n] *= window
    return y


def band(length: float, lo: float, hi: float):
    n = round(length*SR)
    hz = np.maximum(1,np.fft.rfftfreq(n,1/SR))
    f = 1/np.sqrt((1+(lo/hz)**8)*(1+(hz/hi)**8))
    y = np.fft.irfft(np.fft.rfft(RNG.normal(size=n))*f,n=n)
    return y / max(y.std(), 1e-6)


def ping(t, hz, decay):
    return np.sin(2*np.pi*hz*t)*np.exp(-t/decay)


def transient(kind):
    if kind == "clink":
        t = clock(.40)
        return .36*ping(t,1557,.080)+.22*ping(t,2417,.066)+.18*ping(t,3282,.054)+.17*band(.40,1600,7300)*np.exp(-t/.014)
    if kind == "stand":
        t = clock(.25)
        return .31*ping(t,715,.055)+.14*ping(t,1709,.052)+.22*band(.25,170,4100)*np.exp(-t/.031)
    if kind == "hump":
        t = clock(.22)
        return .22*ping(t,145,.052)+.25*band(.22,130,1900)*np.exp(-t/.043)+.14*band(.22,890,7700)*np.exp(-t/.022)
    if kind == "rub":
        t = clock(.22)
        return .34*band(.22,540,6400)*np.sin(np.pi*t/.22)**2
    if kind == "jelly":
        t = clock(.21)
        return .34*np.sin(2*np.pi*(292*t-462*t*t))*np.exp(-t/.041)+.073*band(.21,530,3900)*np.exp(-t/.034)
    t = clock(.11)
    return .26*ping(t,393,.026)+.22*band(.11,470,7100)*np.exp(-t/.016)


def add(lane, sec, x, gain, pan=0.):
    i=round(sec*SR)
    end=min(i+len(x),N)
    if end<=i:
        return
    a=(1+pan)*math.pi/4
    lane[i:end] += fade(x[:end-i])[:,None]*gain*np.array([math.cos(a),math.sin(a)])


def build(ff: str, output: Path, evidence: Path | None):
    def decode(path, channels=1, start=None, end=None, tempo=1.):
        args=[ff,"-v","error","-i",str(path)]
        filters=[]
        if start is not None and end is not None:
            filters += [f"atrim=start={start}:end={end}", "asetpts=PTS-STARTPTS"]
        if channels==1:
            filters += ["highpass=f=90", "lowpass=f=11000"]
        if tempo!=1:
            filters += [f"apad=pad_dur=0.08",f"atempo={tempo:.8f}"]
        if filters:
            args += ["-af",','.join(filters)]
        data=np.frombuffer(sp.check_output(args+["-ar",str(SR),"-ac",str(channels),"-f","f32le","-"]),'<f4')
        return data.copy() if channels==1 else data.reshape(-1,channels).copy()

    def normalize(x, target_rms, max_peak):
        peak=np.max(np.abs(x))
        audible=x[np.abs(x)>max(.003,.055*peak)]
        return x * min(max_peak/max(1e-6,peak),target_rms/max(1e-6,np.sqrt(np.mean(audible**2))))

    dialogue=np.zeros((N,2),np.float32)
    cart=np.zeros_like(dialogue)
    foley=np.zeros_like(dialogue)
    voice=EDIT['voice']
    spoken=normalize(decode(HERE/'recordings/one-cake.wav',start=voice['trim'][0],end=voice['trim'][1]),.205,.73)
    a=voice['at']/FPS
    add(dialogue,a,spoken,1,-.05)
    words=[]
    spans=[]
    for word,start,end in voice['words']:
        s=round(a+start-voice['trim'][0],4)
        e=round(a+end-voice['trim'][0],4)
        words.append(dict(w=word,s=s,e=e))
    words.append(dict(w="",s=words[-1]['e']+.055,e=words[-1]['e']+.055))
    spans.append(('line',a,a+len(spoken)/SR))
    v=np.zeros(N)
    v[round(a*SR):round(a*SR)+len(spoken)] = spoken
    rms=np.sqrt(np.mean(v.reshape(-1,BLOCK)**2,axis=1))
    shape=np.convolve(np.minimum(1,5.55*rms)**.64,[1,2,3,4,5,4,3,2,1],mode='same')/25
    apertures=np.clip((shape-.055)/.79,0,1)

    breaths=ROOT/'src/videos/dishwasher-training-arc/recordings/hus.wav'
    for mark,(start,end,dur) in zip(('catch','steady','reach'),EDIT['breaths'],strict=True):
        y=decode(breaths,start=start,end=end,tempo=(end-start)/dur)[:round(dur*SR)]
        assert len(y)==round(dur*SR)
        y=normalize(y,.187,.61)
        s=MARK[mark]/FPS
        add(dialogue,s,y,1,-.075)
        words.append(dict(w='HUS',s=s,e=round(s+dur,4)))
        words.append(dict(w='',s=round(s+dur+.048,4),e=round(s+dur+.048,4)))
        spans.append((mark,s,s+dur))
        add(foley,s-.021,transient('rub'),.102,0.)
        add(foley,s+.040,transient('metal'),.094,-.12)

    t=clock(DURATION)
    route=EDIT['route']
    z=route['start']+route['speed']*t+.5*route['acceleration']*t*t
    def time_at(z):
        v=route['speed']; g=route['acceleration']
        return (math.sqrt(v*v+2*g*(z-route['start']))-v)/g
    phase=2*np.pi*(z-route['start'])/.48
    # Moving bed: roll speed comes from rail distance, not metronome tempo.
    roll=(.027*band(DURATION,65,950)+.015*band(DURATION,390,3700))*(.88+.16*np.sin(phase))
    roll+=.008*np.sin(2*np.pi*(27*t+.73*t*t))
    roll*=.94-.51*np.clip((t-(MARK['clink']/FPS+.078))/.48,0,1)
    add(cart,0,roll,1.0)
    for k,p in enumerate(np.arange(-17.7,z[-1]+.16,.96)):
        for axle in [-.259,.328]:
            hit=time_at(p-axle)
            if 0<hit<DURATION:
                vol=(.073+.026*k/max(1,(z[-1]+18)/.96))*(.75+.18*(k%4)/3)
                add(cart,hit,transient('metal'),vol,-.23+.36*math.sin(k*.17))

    for f,kind,vol,pan in [
        (5,'hump',.24,-.16), (73,'rub',.19,-.28), (169,'hump',.29,-.28), (190,'hump',.43,-.09), (202,'hump',.33,.03),
        (373,'jelly',.18,.29), (451,'jelly',.22,.28), (495,'rub',.14,-.11), (MARK['land'],'stand',.58,.34),
        (531,'jelly',.22,.29), (MARK['drop'],'rub',.074,.32), (MARK['clink'],'clink',.71,.07),
    ]:
        add(foley,f/FPS,transient(kind),vol,pan)

    # Use a different passage of the channel's bed. Clear it *before* the tray
    # reaches the stand, leaving both contacts and the final wheel tail dry.
    bed=decode(ROOT/'Topics/InThisTown/InThisTownMusic.aac',channels=2,start=8.54,end=8.54+DURATION)[:N]
    assert len(bed)==N
    base=-2.8
    gains=np.full(N,base)
    for label,s,e in spans:
        j,k=max(0,round((s-.065)*SR)),min(N,round((e+.18)*SR))
        duck=-15.8 if label=='line' else -15.3
        ctr=np.interp(t[j:k],[s-.065,s,e,e+.18],[base,duck,duck,base])
        gains[j:k]=np.minimum(gains[j:k],ctr)
    bed*=(10**(gains/20)*np.interp(t,[0,.040,16.62,MARK['land']/FPS-.07,DURATION],[.6,1,1,0,0]))[:,None]
    mix=fade(.89*np.tanh(1.32*(dialogue+cart+foley+bed)/.89),.005,.032)
    output.parent.mkdir(parents=True,exist_ok=True)
    sp.run([ff,'-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','-','-c:a','libmp3lame','-b:a','192k',str(output)],input=mix.astype('<f4').tobytes(),check=True)
    (HERE/'captions.json').write_text('[\n'+',\n'.join('  '+json.dumps(w,separators=(',',':')) for w in words)+'\n]\n')
    (HERE/'mouth.json').write_text(json.dumps(np.round(apertures,3).tolist(),separators=(',',':'))+'\n')
    rms_db=lambda x: float(20*np.log10(max(1e-7,np.sqrt(np.mean(x*x)))))
    evidence_data={}
    for name,s,e in spans:
        sl=slice(round(s*SR),round(e*SR))
        level=rms_db(dialogue[sl])-rms_db((bed+cart+foley)[sl])
        evidence_data[name]=round(level,2)
    print('Voice above bed and practicals:',evidence_data)
    if evidence:
        evidence.write_text(json.dumps(evidence_data,indent=2)+'\n')


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg',default=shutil.which('ffmpeg'))
    parser.add_argument('--evidence',type=Path)
    args=parser.parse_args()
    if not args.ffmpeg:
        parser.error('Install ffmpeg or pass its location.')
    build(args.ffmpeg,ROOT/'public/audio/one-cake-no-brakes/mix.mp3',args.evidence)
