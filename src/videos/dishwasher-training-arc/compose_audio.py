#!/usr/bin/env python3
"""Build the owner's reference bed, chosen character takes, and frame-locked practical foley."""
from __future__ import annotations

import argparse
import json
import math
import re
import shutil
import subprocess as sp
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
EDIT = json.loads((HERE / "edit.json").read_text())
FPS, FRAMES = EDIT["fps"], EDIT["frames"]
SR = 48000
N = FRAMES * (SR // FPS)
CUT, REP, MARK = EDIT["cuts"], EDIT["reps"], EDIT["marks"]
RNG = np.random.default_rng(276812)


def clock(sec: float) -> np.ndarray:
    return np.arange(round(sec * SR)) / SR


def amp(db: float) -> float:
    return 10 ** (db / 20)


def frame(f: float) -> int:
    return round(f * SR / FPS)


def db(x: np.ndarray) -> float:
    return float(20 * np.log10(max(1e-8, np.sqrt(np.mean(x**2)))))


def fade(x: np.ndarray, a: float = .003, b: float = .013) -> np.ndarray:
    x = x.copy()
    for k, edge in ((min(len(x), round(a * SR)), 0), (min(len(x), round(b * SR)), 1)):
        if k:
            shape = (k,) + (1,) * (x.ndim - 1)
            ramp = np.linspace(0, 1, k).reshape(shape)
            if edge:
                x[-k:] *= ramp[::-1]
            else:
                x[:k] *= ramp
    return x


def noise(t: np.ndarray, lo: float, hi: float) -> np.ndarray:
    hz = np.maximum(1., np.fft.rfftfreq(len(t), 1/SR))
    f = 1 / np.sqrt((1 + (lo / hz)**6) * (1 + (hz / hi)**6))
    y = np.fft.irfft(np.fft.rfft(RNG.standard_normal(len(t))) * f, n=len(t))
    return y / max(1e-5, np.std(y)) * .29


def pulse(t: np.ndarray, attack: float, decay: float) -> np.ndarray:
    return np.minimum(t / attack, 1) * np.exp(-t / decay)


def tone(t: np.ndarray, f0: float, f1: float) -> np.ndarray:
    return np.sin(2 * np.pi * (t * f0 + (f1 - f0) * t*t / (2 * t[-1])))


def hit(kind: str, i: int = 0) -> np.ndarray:
    if kind in ("dish", "stack", "emerald", "bell", "door"):
        a = {"dish": 1000, "stack": 805+i*123, "emerald": 1380+i*190, "bell": 831, "door": 880+i*93}[kind]
        sec, decay = {"dish": (.15,.046), "stack": (.19,.058), "emerald": (.21,.070), "bell": (.36,.118), "door": (.30,.09)}[kind]
        t = clock(sec)
        return (.49*tone(t,a,a*.97)+.24*tone(t,a*2.25,a*2.16)+noise(t,1050,6500)*.84)*pulse(t,.0015,decay)
    if kind in ("wet", "mop", "cloth"):
        sec, lo, hi = {"wet": (.22,520,4650), "mop": (.32,150,3100), "cloth": (.185,780,5600)}[kind]
        t = clock(sec)
        return noise(t, lo+i*24, hi+i*58) * pulse(t, .022, .112) * (1 + .22*np.sin(193*t)) + .10*tone(t,430+i*11,180)*pulse(t,.036,.075)
    t = clock(.19)
    if kind == "slime":
        return (.57*tone(t,271,89)+noise(t,510,2800)*.51)*pulse(t,.007,.058)
    if kind == "snap":
        return noise(t,870,9200)*pulse(t,.001,.024)+.18*tone(t,1205,380)*pulse(t,.005,.040)
    return (.66*tone(t,159+i*7,47)+noise(t,163,3500)*.82)*pulse(t,.001,.045)


class Mix:
    def __init__(self, ff: str):
        self.ff = ff
        self.voice = np.zeros((N,2), np.float32)
        self.fx = np.zeros_like(self.voice)
        self.gain = np.full(N, EDIT["music"]["openDb"], np.float32)
        self.caption = []
        self.meter = {key: np.zeros(FRAMES, np.float32) for key in ("finn","skeleton","slime","manager")}
        self.windows = []

    def decode(self, source: Path, channels=1, duration: float | None = None) -> np.ndarray:
        args = [self.ff, "-v", "error", "-i", str(source)]
        if duration is not None:
            args += ["-t", str(duration)]
        if channels == 1:
            args += ["-af", "highpass=f=90,lowpass=f=11400"]
        args += ["-ac", str(channels), "-ar", str(SR), "-f", "f32le", "-"]
        x = np.frombuffer(sp.check_output(args), dtype="<f4")
        return x if channels == 1 else x.reshape(-1, channels)

    def rate(self, x: np.ndarray, tempo: float, pitch=0.) -> np.ndarray:
        # Independent timing and timbre. Pad so WSOLA cannot eat the final consonant.
        p = 2**(pitch/12)
        filt = f"asetrate={round(p*SR)},aresample={SR},atempo={tempo/p:.8f}" if pitch else f"atempo={tempo:.8f}"
        x = np.pad(x,(0,round(.09*SR))).astype('<f4')
        n = round((len(x) - round(.09*SR))/tempo)
        y = np.frombuffer(sp.check_output([self.ff,"-v","error","-f","f32le","-ac","1","-ar", str(SR),"-i","-",
                  "-af",filt,"-f","f32le","-"], input=x.tobytes()),dtype="<f4")
        return fade(np.pad(y[:n],(0,max(n-len(y),0))))

    @staticmethod
    def add(lane: np.ndarray, at: int, x: np.ndarray, gain: float, pan: float = 0.) -> None:
        end = min(N, at+len(x))
        if end > at:
            a = (pan+1) * math.pi/4
            lane[at:end] += fade(x[:end-at])[:,None] * np.array([math.cos(a),math.sin(a)]) * gain

    def effect(self, f, kind, gain, pan=0, i=0):
        self.add(self.fx, frame(f), hit(kind,i), gain, pan)

    def duck(self, a: int, b: int, level: float):
        # A short pre-roll avoids burying initial consonants. Release bridges clause breaks.
        start, end = max(0,a-5280), min(N,b+7200)
        knots = [start, a, b, end]
        env = np.interp(np.arange(start,end),knots,[EDIT["music"]["openDb"],level,level,EDIT["music"]["openDb"]])
        np.minimum(self.gain[start:end],env,out=self.gain[start:end])

    def record_meter(self, char: str, at: int, x: np.ndarray):
        for f in range(at // (SR//FPS), min(FRAMES,(at+len(x)) // (SR//FPS)+1)):
            a = max(0,frame(f)-at)
            b = min(len(x),frame(f+1)-at)
            if b>a:
                pk = np.sqrt(np.mean(x[a:b]**2))
                self.meter[char][f] = min(1., pk*6.9) ** .66

    def speech(self):
        raw = {v["file"]: self.decode(HERE / "recordings" / f"{v['file']}.wav") for v in EDIT["voice"]}
        for line in EDIT["voice"]:
            id = line["id"]
            char = "skeleton" if id == "hey" else "slime" if id in ("come","how") else "manager" if id in ("wash","offer","hired") else "finn"
            source = raw[line["file"]]
            at = frame(line["at"])
            for a,b in line["regions"]:
                y = self.rate(source[round(a*SR):round(b*SR)], line["tempo"], line["pitch"])
                active = np.abs(y) > max(.004, np.max(np.abs(y))*.05)
                y *= min(.78/max(.03,np.max(np.abs(y))), .224/max(.02,np.sqrt(np.mean(y[active]**2))))
                pan = {"finn": -.08,"skeleton": -.22,"slime": .21,"manager": .20}[char]
                self.add(self.voice,at,y,1,pan)
                self.record_meter(char,at,y)
                self.duck(at,at+len(y),EDIT["music"]["dialogueDb"])
                self.windows.append((id,at,at+len(y)))
                for word,s,e in line["words"]:
                    if a<=s<e<=b:
                        self.caption.append(dict(w=word,s=round(at/SR+(s-a)/line["tempo"],4),e=round(at/SR+(e-a)/line["tempo"],4)))
                at += len(y)+round(line["gap"]*SR)
            print(f"{id:<8} f{line['at']} – f{(at-round(line['gap']*SR))/(SR/FPS):.1f}")
        assert len(self.caption) == sum(len(line["words"]) for line in EDIT["voice"])

    def chant(self):
        raw = self.decode(HERE / "recordings/hus.wav")
        frames = [f for group in REP.values() for f in group]
        order = [1,0,4,2,3,5, 2,0,3,4,5,1, 0,3,5,1,2,4, 2,1,5,0,4,3, 5,3,2,0,4,1, 1,3,5]
        assert len(frames)==len(order)==33 and frames==sorted(set(frames))
        for j,(f,k) in enumerate(zip(frames,order)):
            a,b = EDIT["breathRegions"][k]
            x = raw[round(a*SR):round(b*SR)]
            # Deliberately faster than normal dialogue, pitch unchanged. Keep the initial H.
            sec = (.202, .189, .177)[j%3] if j>=30 else (.199,.201,.184)[j%3]
            y = self.rate(x,len(x)/(sec*SR))
            y *= min(.66/max(.03,np.max(np.abs(y))), .214/max(.03,np.sqrt(np.mean(y**2))))
            at = frame(f)
            self.add(self.voice,at,y,1,-.10)
            self.record_meter("finn",at,y)
            self.duck(at,at+len(y),EDIT["music"]["chantDb"])
            self.windows.append(("HUS",at,at+len(y)))
            self.caption.append(dict(w="HUS",s=round(f/FPS,4),e=round(f/FPS+sec,4)))

    def foley(self):
        for i,f in enumerate([2,16,30,45]):
            self.effect(f,"step",.230,-.26,i)
            self.effect(f+5,"slime",.150,.33,i)
            self.effect(f+2,"snap",.17,-.29,i)
        self.effect(60,"dish",.155,.07)
        self.effect(MARK["bell"],"bell",.37,.56)
        self.effect(MARK["bell"]+7,"door",.22,.56,1)
        for f in [MARK["doorOpens"],563,578,596,952,1069]:
            self.effect(f,"door" if f in (596,952,1069) else "step",.145,.15)
        self.effect(390,"slime",.085,.39)
        self.effect(MARK["plateTap"],"dish",.29,-.12)
        self.effect(MARK["mopOffer"],"step",.28,.27,3)
        for j,f in enumerate([MARK["double"],MARK["double"]+2]):
            self.effect(f,"emerald",.27,.28,j%2)
        self.effect(CUT["jobWash"],"cloth",.16,-.09)
        for k,reps in (REP|EDIT["foleyOnly"]).items():
            for j,f in enumerate(reps):
                kind = "wet" if k in ("sink","proud","stack","jobWash","watchWash") else "cloth" if k == "counter" else "mop"
                self.effect(f+.7,kind,.31 if kind=="mop" else .247,-.16 if kind=="wet" else .08,j)
                if k == "stack":
                    self.effect(f+1.1,"stack",.172+j*.020,.39,j)
        for j,f in enumerate([833,853,870,894,916,934,951,961,1071,1074,1078,1083,1085,1090,1094,1166,1175]):
            self.effect(f,"step",.11 + (j%3)*.023,(j%5-2)*.15,j%5)

    def build(self, output: Path, evidence: Path | None):
        self.speech()
        self.chant()
        self.foley()
        score = self.decode(ROOT / EDIT["music"]["track"],2,N/SR)[:N].copy()
        if len(score) != N:
            raise ValueError("Shared reference track must cover the full edit")
        score *= (10**(self.gain/20))[:,None]
        # Last word is the gag. Leave the pulse under the question, then take it out of the cloth's way.
        a,b=frame(1208),frame(1235)
        score[a:b] *= np.linspace(1,0,b-a)[:,None]
        score[b:] = 0
        # Short window reflections, not a wash of reverb. Start delay with silence.
        delay = round(.023*SR)
        room = np.zeros_like(self.voice)
        room[delay:] = self.voice[:-delay,::-1]*.069
        dry = self.voice + room
        mix = fade(dry+score+self.fx,.007,.017)
        # Compress only the hard peaks; leave the HUS/SFX start boundaries intact.
        mix = .89*np.tanh(1.42*mix/.89)
        output.parent.mkdir(exist_ok=True,parents=True)
        sp.run([self.ff,"-v","error","-y","-f","f32le","-ar",str(SR),"-ac","2","-i","-",
                "-c:a","libmp3lame","-b:a","192k",str(output)], input=mix.astype('<f4').tobytes(),check=True)
        self.caption.sort(key=lambda q:q["s"])
        assert not any(a["s"]>=b["s"] for a,b in zip(self.caption,self.caption[1:]))
        compact = lambda a: json.dumps(a,separators=(',',':'))
        (HERE / "captions.json").write_text('[\n'+',\n'.join('  '+compact(w) for w in self.caption)+'\n]\n')
        (HERE / "voice-meter.json").write_text('{\n'+',\n'.join('  '+json.dumps(k)+': '+compact([round(float(i),3) for i in v]) for k,v in self.meter.items())+'\n}\n')
        windows = {name: [] for name,_,_ in self.windows}
        for name,a,b in self.windows:
            windows[name].append(round(db(dry[a:b])-db((score+self.fx)[a:b]),2))
        report=sp.run([self.ff,"-hide_banner","-i",str(output),"-af","loudnorm=print_format=json","-f","null","-"],capture_output=True,text=True,check=True)
        loud=json.loads(re.findall(r"\{[^{}]+\}",report.stderr)[-1])
        print(f"Mix {loud['input_i']} LUFS, {loud['input_tp']} dBTP; music open {EDIT['music']['openDb']} dB; {len(self.caption)} caption hits")
        print('Voice over bed + foley (dB):',windows)
        if evidence:
            evidence.write_text(json.dumps({'loudness':loud,'voiceOverRestDb':windows},indent=2)+'\n')


if __name__ == "__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg',default=shutil.which('ffmpeg'))
    parser.add_argument('--evidence',type=Path)
    args=parser.parse_args()
    if not args.ffmpeg:
        parser.error('Provide --ffmpeg or install ffmpeg on PATH')
    Mix(args.ffmpeg).build(ROOT/'public/audio/dishwasher-training-arc/mix.mp3',args.evidence)
