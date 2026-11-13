"""Decode and sample original-speed V2 action clips. This is sequential-frame review, not subjective playback.
Pass locker / rescue / counter-fall to analyze just one completed clip, or no arguments for all.
"""
from pathlib import Path
import json, subprocess, sys, hashlib, os
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

root=Path.cwd();out=Path(os.environ.get('CLIP_REVIEW_DIR',str(root/'out/five-seconds/full-v2/motion-clips')))
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe();probe=root/'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe'
ranges={'locker':(1798,2018),'rescue':(2634,2838),'counter-fall':(4160,4660)}
critical=[1847,1865,1881,1905,1915,1925,1951,1996,1997,2679,2698,2720,2765,2774,2782,2793,2828,2829,4171,4212,4225,4260,4277,4280,4320,4321,4330,4402,4406,4444,4472,4484,4505,4520,4550,4570,4614,4655]
for name,(first,last) in ranges.items():
 if len(sys.argv)>1 and name not in sys.argv[1:]:continue
 video=out/f'{name}.mp4';dest=out/name;dest.mkdir(parents=True,exist_ok=True)
 def run(args):return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
 info=json.loads(run([str(probe),'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(video)]).stdout)
 v=next(s for s in info['streams'] if s['codec_type']=='video');assert int(v['nb_read_frames'])==last-first+1
 assert v['r_frame_rate']=='30/1' and (v['width'],v['height'])==(540,960)
 decoded=run([ffmpeg,'-v','error','-xerror','-i',str(video),'-f','null','-']);assert not decoded.stderr.strip()
 frames=sorted(set(range(first,last+1,6))|{last}|{f for f in critical if first<=f<=last})
 def select(fs):
  if len(fs)==1:return f'eq(n,{fs[0]-first})'
  mid=len(fs)//2;return f'({select(fs[:mid])}+{select(fs[mid:])})'
 run([ffmpeg,'-v','error','-y','-i',str(video),'-an','-vf',f"select='{select(frames)}',scale=270:480",'-fps_mode','vfr','-q:v','2',str(dest/'frame-%03d.jpg')])
 files=sorted(dest.glob('frame-*.jpg'));assert len(files)==len(frames)
 for start in range(0,len(files),15):
  batch=files[start:start+15];rows=(len(batch)+4)//5
  sheet=Image.new('RGB',(1370,505*rows),(18,22,28));draw=ImageDraw.Draw(sheet)
  for j,p in enumerate(batch):
   x=(j%5)*274;y=(j//5)*505;f=frames[start+j]
   sheet.paste(Image.open(p),(x,y+24));draw.text((x+4,y+6),f'{name} | {f} | {f/30:.3f}s',font=ImageFont.load_default(),fill=(238,231,209))
  sheet.save(dest/f'sheet-{start//15+1:02}.jpg',quality=92)
 report={'clip':str(video.relative_to(root)),'sourceFramesInclusive':[first,last],'encodedFrames':int(v['nb_read_frames']),'fps':30,'speedChange':False,'width':540,'height':960,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'decodeErrors':[],'sampledSourceFrames':frames,'reviewStatus':'extracted, not yet marked viewed','reviewLimit':'Sequential sampled frames, not subjective real-time playback or listening.'}
 (dest/'analysis.json').write_text(json.dumps(report,indent=2)+'\n')
 print(name,len(frames),'frames in',(len(frames)+14)//15,'sheets; decode passed.')
