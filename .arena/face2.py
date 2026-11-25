"""A body faces the lens when its rotationY equals the camera's yaw. One rule, applied per shot."""
import re, math
BACK = {"3.dad", "9.nothing", "8.walk", "8.ran", "5.home"}   # walking away from the lens
for n in range(1, 7):
    p = f"src/videos/in-this-town-my-family-stole-things/scene{n}.tsx"
    s = open(p).read()
    parts = re.split(r'(?=\n    \{\n      cue: ")', s)
    for i, b in enumerate(parts):
        cue = re.search(r'cue: "([^"]+)"', b)
        if not cue:
            continue
        cue = cue.group(1)
        m = re.search(r'yaw: (-\d+|\d+)', b)
        if not m:
            continue
        yaw = math.radians(int(m.group(1)))
        actor = re.compile(r'<(Fox|Teller|Dad|Mum|Sister|Boy|IronGolem|DogVillager|FoxCub)\b')
        k = 0
        out = []
        for line in b.split("\n"):
            if actor.search(line) and "rotationY=" in line:
                if cue in BACK:
                    ang = -math.pi / 2
                else:
                    ang = yaw - 0.28 * k
                line = re.sub(r'rotationY=\{[^}]*\}', f'rotationY={{{ang:.3f}}}', line, count=1)
                k += 1
            out.append(line)
        parts[i] = "\n".join(out)
    open(p, "w").write("".join(parts))
print("faced to lens")
