"""Point every camera at the actor that is actually in the shot.

The staging pass aimed the lens at a hand-typed point, and the actors moved: a fox 0.7 m off the aim at 2.6 m is out of
frame. This reads the first actor's `position` out of each stage and aims at its chest, keeping the framing numbers.
"""
import re
HIGH = {"IronGolem": 1.9, "DogVillager": 1.1, "Boy": 0.9}   # chest heights, metres
default = 0.68                                              # a fox at 0.62 scale

for n in range(1, 7):
    p = f"src/videos/in-this-town-my-family-stole-things/scene{n}.tsx"
    lines = open(p).read().split("\n")
    out, cue = [], None
    for line in lines:
        m = re.search(r'cue: "([^"]+)"', line)
        if m:
            cue = m.group(1)
        if ".cam." in line and " on: [" in line and cue:
            # find the first actor position in the rest of this shot: the next lines until the camera of the next shot
            block = "\n".join(lines[lines.index(line):lines.index(line) + 40])
            am = re.search(r'<(Fox|Teller|Dad|Mum|Sister|Boy|IronGolem|DogVillager|FoxCub)\b[^>]*?position=\{\[([-\d.]+), ([-\d.]+), ([-\d.]+)\]\}', block)
            if am:
                kind, x, y, z = am.group(1), float(am.group(2)), float(am.group(3)), float(am.group(4))
                h = HIGH.get(kind, default)
                aim = f"[{x:.2f}, {y + h:.2f}, {z:.2f}]"
                line = re.sub(r' on: \[[-\d., ]+\]', f' on: {aim}', line, count=1)
        out.append(line)
    open(p, "w").write("\n".join(out))
print("aimed")
