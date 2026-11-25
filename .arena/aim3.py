"""A prop shot aims at the PROP. A character shot aims at the actor. That is the whole rule."""
import re
PROP = {"1.night","1.back","1.gift","2.why","2.worked","3.flower","4.window","4.width","4.cup",
        "9.night","9.drop","10.next","12.want","12.flower","12.second","13.berry","13.only","14.sub"}
# where the cup actually is
CUP = "[-8.78, 1.72, -4.7]"
for n in range(1, 7):
    p = f"src/videos/in-this-town-my-family-stole-things/scene{n}.tsx"
    s = open(p).read()
    parts = re.split(r'(?=\n    \{\n      cue: ")', s)
    for i, b in enumerate(parts):
        c = re.search(r'cue: "([^"]+)"', b)
        if not c or c.group(1) not in PROP:
            continue
        if "zone: \"den\"" in b:
            continue           # the den's props are aimed by hand
        b2 = re.sub(r'(cue: "[^"]+",\n      \.\.\.cam\.\w+\(\{ on: )\[[-\d., ]+\]', r'\1' + CUP, b, count=1)
        parts[i] = b2
    open(p, "w").write("".join(parts))
print("props aimed")
