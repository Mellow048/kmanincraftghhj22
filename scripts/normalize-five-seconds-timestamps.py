"""Lossless, film-scoped normalization of chunk-join timestamp rounding.
Usage: python3 scripts/normalize-five-seconds-timestamps.py original.mp4 renders/in-this-town-five-seconds-v2.mp4
Never overwrites V1, the approved proof, or Freeze Bell. Requires FFmpeg's prescale-capable setts filter.
"""
from pathlib import Path
import hashlib, json, shutil, subprocess, sys
import imageio_ffmpeg

root=Path.cwd();src=Path(sys.argv[1]).resolve();dst=Path(sys.argv[2]).resolve()
assert src!=dst
assert dst in {root/'renders/in-this-town-five-seconds-v2.mp4',root/'renders/in-this-town-five-seconds-v3.mp4'},'Only separate revision masters are allowed'
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe();ffprobe=root/'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe'
out=root/('out/five-seconds/v3' if dst.name.endswith('-v3.mp4') else 'out/five-seconds/full-v2');out.mkdir(parents=True,exist_ok=True)
def run(args):return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
def sha(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def packets(p):
 data=json.loads(run([str(ffprobe),'-v','error','-show_packets','-show_data_hash','sha256','-show_entries','packet=stream_index,pts_time,data_hash','-of','json',str(p)]).stdout)['packets']
 streams={}
 for q in data:streams.setdefault(q['stream_index'],[]).append(q)
 return streams
before=packets(src);assert len(before[0])==4848 and len(before)==2
before_pts=sorted(float(p['pts_time']) for p in before[0])
original_error=max(abs(t-i/30) for i,t in enumerate(before_pts))
filter_used=None
dst.parent.mkdir(parents=True,exist_ok=True)
if original_error<2e-6:
 shutil.copy2(src,dst)
else:
 help_text=run([ffmpeg,'-hide_banner','-h','bsf=setts']).stdout.decode()
 assert 'prescale' in help_text,'This version-specific expression requires setts prescale support'
 filter_used='setts=prescale=1:time_base=1/30000:pts=round(PTS*TB*30)*1000:dts=round(DTS*TB*30)*1000:duration=1000'
 run([ffmpeg,'-v','error','-y','-i',str(src),'-map','0','-c','copy','-bsf:v',filter_used,'-video_track_timescale','30000','-movflags','+faststart',str(dst)])
after=packets(dst);counts={}
for stream,old in before.items():
 assert [p['data_hash'] for p in old]==[p['data_hash'] for p in after[stream]],f'Stream {stream} payload changed'
 counts[str(stream)]=len(old)
pts=sorted(float(p['pts_time']) for p in after[0]);error=max(abs(t-i/30) for i,t in enumerate(pts));assert error<2e-6
report={'status':'passed','input':str(src.relative_to(root)),'output':str(dst.relative_to(root)),'input_sha256':sha(src),'output_sha256':sha(dst),'original_max_pts_error_seconds':original_error,'final_max_pts_error_seconds':error,'lossless':True,'payload_identical_packets_by_stream':counts,'filter':filter_used,'note':'Only container timestamps normalized when necessary; H.264 and AAC packet payloads are unchanged. Full decoded delivery QA is still required.'}
(out/'timestamp-normalization.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
