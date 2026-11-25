"""Aim each camera at the actor inside ITS OWN shot block (the first pass read too far ahead)."""
import re
HIGH = {"IronGolem": 1.9, "DogVillager": 1.1, "Boy": 0.9}
for n in range(1, 7):
    p = f"src/videos/in-this-town-my-family-stole-things/scene{n}.tsx"
    s = open(p).read()
    # split into shot blocks at 4-space indentation
    parts = re.split(r'(?=\n    \{\n      cue: ")', s)
    for i, b in enumerate(parts):
        cm = re.search(r'\.\.\.cam\.\w+\(\{[^}]*? on: \[[-\d., ]+\][^}]*?\}\)', b)
        am = re.search(r'<(Fox|Teller|Dad|Mum|Sister|Boy|IronGolem|DogVillager|FoxCub)\b[^>]*?position=\{\[([-\d.]+), ([-\d.]+), ([-\d.]+)\]\}', b)
        if am:
            x, y, z = float(am.group(2)), float(am.group(3)), float(am.group(4))
        else:
            # a den coordinate: den(x, y, z) is [x, y, 60 + z]
            am = re.search(r'<(Fox|Teller|Dad|Mum|Sister|Boy|FoxCub)\b[^>]*?position=\{den\(([-\d.]+), ([-\d.]+), ([-\d.]+)\)\}', b)
            if not am:
                continue
            x, y, z = float(am.group(2)), float(am.group(3)), 60 + float(am.group(4))
        if not cm:
            continue
        kind = am.group(1)
        h = HIGH.get(kind, 0.68)
        # a fox at 0.58–0.62 scale: its head is at ~1.02–1.12 m, so the chest is ~0.68
        aim = f"[{x:.2f}, {y + h:.2f}, {z:.2f}]"
        cam = re.sub(r' on: \[[-\d., ]+\]', f' on: {aim}', cm.group(0), count=1)
        parts[i] = b.replace(cm.group(0), cam)
    open(p, "w").write("".join(parts))
print("aimed per block")
