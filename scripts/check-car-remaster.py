"""Check the remaster's audio clock and caption provenance; no guessed word timing.
Run with the same numpy/imageio-ffmpeg environment as narration.py.
Optional MP4 argument checks the encoded delivery against the committed mix too.
"""
import json, sys
from pathlib import Path
import numpy as np
import narration as nar
ROOT=Path(__file__).resolve().parents[1]
FILM=ROOT/'src/videos/the-guy-who-never-had-a-car'
AUDIO=ROOT/'public/audio/the-guy-who-never-had-a-car'
edit=json.loads((FILM/'remaster-edit.json').read_text())
timing=json.loads((FILM/'timing.json').read_text())
alignment=json.loads((FILM/'alignment.json').read_text())
sr=16000
mix=nar.decode(str(AUDIO/'mix.mp3'),sr)

def best_offset(signal,reference,expected,pad=.12):
    # FFT matched filtering of the actual dry take against the final mixed waveform.
    # Four kHz is sufficient to detect a one-frame error and keeps the test cheap.
    signal=signal[::4];reference=reference[::4];rate=sr//4
    at=round(expected*rate);margin=round(pad*rate)
    start=max(0,at-margin);end=min(len(signal),at+len(reference)+margin)
    region=signal[start:end];m=len(reference)
    size=1<<(len(region)+m-2).bit_length()
    corr=np.fft.irfft(np.fft.rfft(region,size)*np.fft.rfft(reference[::-1],size),size)
    valid=corr[m-1:len(region)]
    best=start+int(np.argmax(valid))
    return best/rate-expected

assert timing['duration']==edit['frames']/30
assert len(timing['cues'])==len(edit['shots'])
assert not timing['estimated']
assert timing['duration']<65
assert len(timing['words'])>140
for left,right in zip(timing['words'],timing['words'][1:]):assert left['s']<=right['s']
assert all(w['s']<w['e'] for w in timing['words'])
assert all(s['end']>s['start'] for s in edit['shots'])
assert edit['shots'][2]['end']==204 # the approved hook remains 6.8 seconds
report=[]
for take in edit['takes']:
    info=alignment[take['name']]
    assert len(info['spans'])==len(info['words'])
    assert all(a<b for a,b in info['spans'])
    a,b=info['trim']
    dry=nar.decode(str(AUDIO/'raw'/f"{take['name']}.mp3"),sr,take['tempo'],a,b)
    offset=best_offset(mix,dry,take['at'])
    print(f"{take['name']}: measured mix offset {offset*1000:+.1f} ms; tempo {take['tempo']}x")
    assert abs(offset)<1/30, (take['name'],offset)
    report.append(dict(take=take['name'],tempo=take['tempo'],mixOffsetMs=round(offset*1000,2)))
if len(sys.argv)>1:
    encoded=nar.decode(str(ROOT/sys.argv[1]),sr)
    # Check a long mid-film section to detect any mux/encoder offset or speed mismatch.
    for at in (8.,20.,35.,49.):
        ref=mix[round(at*sr):round((at+3)*sr)]
        delta=best_offset(encoded,ref,at)
        print(f"Encoded MP4 at {at:.0f}s: mix offset {delta*1000:+.1f} ms")
        assert abs(delta)<1/30, (at,delta)
        report.append(dict(encodedAt=at,mixOffsetMs=round(delta*1000,2)))
(ROOT/'out/car-remaster').mkdir(parents=True,exist_ok=True)
(ROOT/'out/car-remaster/audio-clock-check.json').write_text(json.dumps(report,indent=2)+'\n')
print('PASS: measured audio clock; no one-frame-or-larger take/mux drift detected.')
