import re, math
YAW = {
 "1.town":8,"2.why":2,"2.carry":-18,"2.worked":-6,"1.night":8,"1.back":-26,"1.gift":40,"3.dad":-24,"3.me":32,"3.flower":10,
 "4.night":58,"4.one":26,"4.window":-14,"4.width":-22,"4.cup":12,"5.climb":26,"5.easy":-8,"5.thought":-34,"5.home":62,
 "6.hedge":4,"6.boy":-10,"6.cried":22,"6.golem":34,"6.gave":40,"7.sister":12,"7.said":-22,"7.day":-34,
 "8.walk":74,"8.dogs":-18,"8.turn":46,"8.ran":82,"9.night":4,"9.drop":-12,"9.ate":16,"9.nothing":30,
 "10.next":6,"10.told":-30,"11.corner":-22,"11.count":24,"11.every":8,"11.gift":10,"11.given":-14,
 "12.none":-20,"12.trade":16,"12.want":-6,"12.flower":10,"12.second":0,"13.berry":14,"13.bad":20,
 "13.sister":40,"13.only":6,"14.sub":-10,
}
# shots where somebody is walking away: face along their own direction, back to the lens
BACK = {"3.dad": True, "9.nothing": True, "8.walk": True, "8.ran": True, "5.home": True}
ACTOR = re.compile(r'<(Fox|Teller|Dad|Mum|Sister|Boy|IronGolem|DogVillager|FoxCub)\b')

for n in range(1, 7):
    p = f"src/videos/in-this-town-my-family-stole-things/scene{n}.tsx"
    s = open(p).read()
    out = []
    cue = None
    for line in s.split("\n"):
        m = re.search(r'cue: "([^"]+)"', line)
        if m:
            cue = m.group(1)
        if cue in YAW and ACTOR.search(line) and "rotationY=" in line:
            yaw = math.radians(YAW[cue])
            if BACK.get(cue):
                # walking left across the lens: face -X
                face = -math.pi / 2
            else:
                face = yaw - 0.35
            line = re.sub(r'rotationY=\{[^}]*\}', f'rotationY={{{face:.3f}}}', line, count=1)
        out.append(line)
    open(p, "w").write("\n".join(out))
print("faced")
