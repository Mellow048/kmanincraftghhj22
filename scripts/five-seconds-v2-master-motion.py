"""Extract temporal motion samples directly from the separate full V2 master.

Usage: python3 scripts/five-seconds-v2-master-motion.py renders/in-this-town-five-seconds-v2.mp4
No re-render, video re-encode, speed change, or claim of real-time playback/listening.
QA_OUTPUT optionally selects the extraction directory. Reports remain unreviewed until
all the generated sheets have actually been inspected.
"""
from pathlib import Path
import hashlib, json, math, os, subprocess, sys
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

root = Path.cwd()
media = Path(sys.argv[1]).resolve()
assert media == root / 'renders/in-this-town-five-seconds-v2.mp4'
out = Path(os.environ.get('QA_OUTPUT', str(root / 'out/five-seconds/full-v2/master-motion')))
out.mkdir(parents=True, exist_ok=True)
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
ffprobe = root / 'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe'

def run(args):
    return subprocess.run(args, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def selector(frames):
    if len(frames) == 1:
        return f'eq(n,{frames[0]})'
    middle = len(frames) // 2
    return f'({selector(frames[:middle])}+{selector(frames[middle:])})'

info = json.loads(run([str(ffprobe), '-v', 'error', '-count_frames', '-show_streams', '-of', 'json', str(media)]).stdout)
v = next(s for s in info['streams'] if s['codec_type'] == 'video')
assert int(v['nb_read_frames']) == 4848
assert v['r_frame_rate'] == v['avg_frame_rate'] == '30/1'
assert (v['width'], v['height']) == (1080, 1920)
# Match the pre-render clips' temporal sampling, plus the corrected bully's resume/recoil.
ranges = {'locker': (1798, 2018), 'rescue': (2634, 2838), 'counter-fall': (4160, 4660)}
critical = [1847,1865,1881,1905,1915,1925,1951,1996,1997,2002,2005,2008,2012,
            2679,2698,2720,2765,2774,2782,2793,2828,2829,
            4171,4212,4225,4260,4277,4280,4320,4321,4330,4402,4406,4444,
            4472,4484,4505,4520,4550,4570,4614,4655]
cases = {name: sorted(set(range(first, last + 1, 6)) | {last} |
                       {f for f in critical if first <= f <= last})
         for name, (first, last) in ranges.items()}
all_frames = sorted({f for frames in cases.values() for f in frames})
frame_dir = out / 'frames'
frame_dir.mkdir(exist_ok=True)
run([ffmpeg, '-v', 'error', '-y', '-i', str(media), '-an', '-vf',
     f"select='{selector(all_frames)}',scale=270:480", '-fps_mode', 'vfr',
     '-q:v', '2', str(frame_dir / 'frame-%03d.jpg')])
files = sorted(frame_dir.glob('frame-*.jpg'))
assert len(files) == len(all_frames)
by_frame = dict(zip(all_frames, files))
report = {'file': str(media.relative_to(root)),
          'sha256': hashlib.sha256(media.read_bytes()).hexdigest(),
          'decoded_master_frames': int(v['nb_read_frames']), 'fps': 30,
          'source_width': v['width'], 'source_height': v['height'],
          'temporal_sample_interval_frames': 6, 'additional_contact_boundary_samples': True,
          'sample_count': len(all_frames), 'groups': [],
          'review_status': 'extracted; sheets not yet marked viewed',
          'review_limit': 'Sequential samples extracted from the final encoded master, not real-time playback or subjective listening.'}
for name, frames in cases.items():
    sheets = []
    for first in range(0, len(frames), 15):
        batch = frames[first:first + 15]
        sheet = Image.new('RGB', (1370, 505 * math.ceil(len(batch) / 5)), (18, 22, 28))
        draw = ImageDraw.Draw(sheet)
        for i, frame in enumerate(batch):
            x, y = i % 5 * 274, i // 5 * 505
            with Image.open(by_frame[frame]) as image:
                sheet.paste(image, (x, y + 24))
            draw.text((x + 4, y + 6), f'{name} | {frame} | {frame / 30:.3f}s',
                      font=ImageFont.load_default(), fill=(238, 231, 209))
        filename = f'{name}-{first // 15 + 1:02}.jpg'
        sheet.save(out / filename, quality=92)
        sheets.append(filename)
    report['groups'].append({'name': name, 'source_frames_inclusive': list(ranges[name]),
                             'sampled_frames': frames, 'sheets': sheets})
(out / 'report.json').write_text(json.dumps(report, indent=2) + '\n')
print(f"Extracted {len(all_frames)} temporal samples in {sum(len(g['sheets']) for g in report['groups'])} sheets directly from the full V2 master. Review still required.")
