"""Assemble the four original-speed visual proof excerpts with the current authored mix.
This is a preview, not the full film. Re-render clips whenever their source picture changes.
"""
import json, subprocess
from pathlib import Path
import imageio_ffmpeg
root=Path.cwd();base=root/'out/five-seconds/v3';plan=json.loads((root/'src/videos/in-this-town-five-seconds/v3-preview-plan.json').read_text())
clips=[base/'proof/classroom-throw.mp4',base/'proof/chalk-stop.mp4',base/'final/chase.mp4',base/'final/trip-recovery.mp4']
output=root/'renders/previews/five-seconds-corrections-v3.mp4';output.parent.mkdir(parents=True,exist_ok=True)
args=[imageio_ffmpeg.get_ffmpeg_exe(),'-y','-v','error']
for clip in clips:args+=['-i',str(clip)]
args+=['-i',str(root/'public/audio/in-this-town-five-seconds/mix.mp3')]
parts=[]
for i,r in enumerate(plan['ranges']):
 duration=(r['last']-r['first']+1)/30;start=r['first']/30
 parts.append(f'[{i}:v]setpts=PTS-STARTPTS[v{i}]')
 parts.append(f'[4:a]atrim=start={start:.9f}:duration={duration:.9f},asetpts=PTS-STARTPTS[a{i}]')
parts.append(''.join(f'[v{i}][a{i}]' for i in range(len(clips)))+f'concat=n={len(clips)}:v=1:a=1[v][a]')
args+=['-filter_complex',';'.join(parts),'-map','[v]','-map','[a]','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','192k','-movflags','+faststart',str(output)]
subprocess.run(args,check=True)
print('Wrote',output)
