"""Framing by SUBJECT: a 1.4 m fox needs ~3 m, a 0.2 m flower needs ~2.8 m at a wide lens, a hoard needs 5 m."""
import re

# cue: (dist, distTo, fov, pitch) — 'C' = a character, 'P' = a prop on the sill, 'W' = a wide
KIND = {
 "1.town": ("W",), "1.night": ("P",), "1.back": ("P",), "1.gift": ("C",),
 "2.why": ("P",), "2.carry": ("C",), "2.worked": ("P",),
 "3.dad": ("C",), "3.me": ("C",), "3.flower": ("P",),
 "4.night": ("C",), "4.one": ("C",), "4.window": ("P",), "4.width": ("P",), "4.cup": ("P",),
 "5.climb": ("C",), "5.easy": ("C",), "5.thought": ("C",), "5.home": ("C",),
 "6.hedge": ("C",), "6.boy": ("C",), "6.cried": ("C",), "6.golem": ("W",), "6.gave": ("P",),
 "7.sister": ("C",), "7.said": ("C",), "7.day": ("C",),
 "8.walk": ("C",), "8.dogs": ("C",), "8.turn": ("W",), "8.ran": ("C",),
 "9.night": ("P",), "9.drop": ("P",), "9.ate": ("C",), "9.nothing": ("C",),
 "10.next": ("P",), "10.told": ("C",),
 "11.corner": ("W",), "11.count": ("P",), "11.every": ("P",), "11.gift": ("C",), "11.given": ("C",),
 "12.none": ("W",), "12.trade": ("W",), "12.want": ("P",), "12.flower": ("P",), "12.second": ("P",),
 "13.berry": ("P",), "13.bad": ("C",), "13.sister": ("C",), "13.only": ("P",), "14.sub": ("P",),
}
SIZE = {"C": (3.1, 2.85, 40, 0), "P": (2.9, 2.6, 38, 4), "W": (5.6, 4.8, 46, 10)}

for n in range(1, 7):
    p = f"src/videos/in-this-town-my-family-stole-things/scene{n}.tsx"
    s = open(p).read()
    def sub(m):
        cue = m.group(1)
        k = KIND.get(cue, ("C",))[0]
        d, dto, fov, pitch = SIZE[k]
        body = m.group(2)
        body = re.sub(r'dist: [-\d.]+', f'dist: {d}', body)
        body = re.sub(r'to: [-\d.]+', f'to: {dto}', body)
        body = re.sub(r'fov: [-\d.]+', f'fov: {fov}', body)
        body = re.sub(r'pitch: [-\d.]+', f'pitch: {pitch}', body)
        return f'cue: "{cue}",\n' + body
    s = re.sub(r'cue: "([^"]+)",\n(      \.\.\.cam\.\w+\(\{[^}]*?\}\),\n)', sub, s)
    open(p, "w").write(s)
print("framed")
