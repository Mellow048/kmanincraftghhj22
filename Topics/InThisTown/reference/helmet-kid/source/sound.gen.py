"""Writes this film's sound.json. Edit HERE, never the json: running this overwrites it.
    python3 src/videos/in-this-town-the-new-kid-never-took-off-his-helmet/sound.gen.py
    python3 scripts/sound.py build in-this-town-the-new-kid-never-took-off-his-helmet
A horror short: fewer jokes in the sound than the other films, two silences on purpose (the helmet coming off, and
the clearing afterwards), and the stick is the loudest thing in it."""
import json, os
F = os.path.dirname(os.path.abspath(__file__)) + '/'
t = json.load(open(F + 'timing.json'))
dur = {c['id']: c['end'] - c['start'] for c in t['cues']}
s = json.load(open(F + 'sound.json'))
M = [("1.town", "curious", "A kid in a helmet."), ("1.teacher", "playful", "He just shook his head."), ("1.back", "curious", "He never said a word."),
     ("2.first", "sad", "An empty desk."), ("2.more", "tense", "Two more."), ("2.noticed", "sneak", "He notices."), ("2.mom", "sad", "Nobody listens."),
     ("3.watch", "sneak", "Watching him."), ("3.wet", "curious", "The helmet is wet."), ("3.follow", "tense", "Following him at night."),
     ("4.lamp", "dark", "Under the lamp."), ("4.held", "drone", "He is scared, but not of them."), ("4.off", "none", "The helmet comes off: a held breath."),
     ("4.noface", "drone", "No face: a low note under the silence."), ("4.tent", "dark", "What comes out."), ("5.quiet", "none", "Then it was quiet."), ("5.step", "drone", "One step back."),
     ("5.turn", "tense", "It turns round."), ("5.closer", "drone", "It touches the bark."), ("9.sub", "dark", "Part two.")]
s['music']['sections'] = [{"from": a, "mood": b, "why": c} for a, b, c in M]
s['beds'] = [{"from": a, "to": b, "bed": c} for a, b, c in [
    ("1.town", "1.teacher", "classroom"), ("1.face", "1.face", "village"), ("1.back", "2.desk", "classroom"), ("2.ran", "2.ran", "village"),
    ("2.more", "2.more", "classroom"), ("2.posters", "2.posters", "wind"), ("2.noticed", "2.mean", "classroom"), ("2.three", "2.mom", "village"),
    ("2.sit", "2.sit", "classroom"), ("3.watch", "3.know", "village"), ("3.follow", "9.sub", "night")]]
X = []
def e(cue, sfx, why, word=None, at=None, trim=None, repeat=None, every=None, nth=None):
    d = {"cue": cue, "sfx": sfx}
    if word: d["word"] = word
    if nth: d["nth"] = nth
    if at is not None: d["at"] = at
    if repeat: d["repeat"] = repeat; d["every"] = every
    if trim is not None: d["trim"] = trim
    d["why"] = why; X.append(d)
def steps(cue, why, kind="step_grass", every=0.4, start=0.05, end=None, trim=None):
    n = int(((end if end else dur[cue]) - start) / every)
    if n > 0: e(cue, kind, why, at=start, repeat=n, every=every, trim=trim)

e("1.town", "clank", "Iron: the helmet, in the first second.", at=0.05); e("1.town", "whoosh_low", "The lens goes in on the slit.", at=0.4); e("1.town", "sting", "Never took it off.", word="helmet", trim=-4)
e("1.not", "scrape", "Not in class: a pencil.", at=0.1, trim=-2); e("1.not", "swish", "Lunch.", word="lunch", at=-0.42); e("1.not", "bonk", "The roll hits the iron.", word="lunch")
e("1.not", "splash", "The pool.", word="even", at=-0.25); e("1.not", "splash", "They splash; he stands.", word="pool", trim=-3)
e("1.teacher", "step_wood", "The teacher comes down the aisle.", at=0.05, repeat=2, every=0.3); e("1.teacher", "blip", "He asks.", word="asked")
e("1.teacher", "creak", "The helmet turns: no.", word="shook", at=-0.2); e("1.teacher", "creak", "And back.", word="shook", at=0.2); e("1.teacher", "clank", "Iron on iron.", word="head", trim=-4)
e("1.face", "whoosh", "Outside, after school."); steps("1.face", "He walks off alone.", "step_stone", 0.42); e("1.face", "pop", "A question over their heads.", word="where", at=-0.1)
e("1.back", "swish", "Behind the back row."); e("1.back", "scrape", "Chalk on the board.", at=0.5, trim=-3); e("1.back", "tick", "The clock. He says nothing.", word="never", repeat=3, every=0.3)
e("1.shy", "rustle", "A shrug.", at=0.2); e("1.shy", "blip", "Just shy.", word="shy")
e("2.first", "whoosh_low", "An empty desk."); e("2.first", "slide_down", "Missing.", word="missing", trim=-2)
e("2.desk", "swish", "Down to the floor."); e("2.desk", "rustle", "His bag, still there.", word="bag"); e("2.desk", "sting", "A kid who runs away takes his bag.", word="under", trim=-4)
e("2.ran", "whoosh", "The school step."); e("2.ran", "blip", "The grown-ups shrug it off.", word="said"); e("2.ran", "blip", "And again.", word="ran", trim=-2)
e("2.more", "thud", "Another empty desk.", word="another", trim=-2); e("2.more", "tick", "The clock in a quiet room.", at=0.3, repeat=3, every=0.35)
e("2.more", "swish", "The next column.", word="friday", at=-0.3); e("2.more", "thud", "Two more.", word="two"); e("2.more", "thud", "Two.", word="more", trim=-2)
e("2.posters", "paper", "A poster.", at=0.2); e("2.posters", "paper", "Another.", at=0.8); e("2.posters", "paper", "Another.", at=1.4); e("2.posters", "paper", "Another.", at=2.0); e("2.posters", "gust", "An empty yard.", word="nobody", trim=-2)
e("2.noticed", "swish", "His eyes go sideways."); e("2.noticed", "ding", "He notices.", word="noticed", trim=-4)
e("2.mean", "whoosh_low", "The lens goes in on the helmet."); e("2.mean", "heartbeat", "Every one of them.", word="every"); e("2.mean", "heartbeat", "Had been mean to him.", word="mean")
e("2.three", "swish", "A memory."); e("2.three", "whoosh", "He throws the roll.", word="threw"); e("2.three", "cheer", "They laugh.", word="lunch", trim=-2)
e("2.three", "swish", "Another.", word="knocked", at=-0.32); e("2.three", "bonk", "Tok.", word="knocked"); e("2.three", "bonk", "Tok.", word="knocked", at=0.25); e("2.three", "clank", "Iron.", word="helmet", trim=-3)
e("2.three", "swish", "Another.", word="tried", at=-0.32); e("2.three", "creak", "He pulls.", word="pull"); e("2.three", "scrape", "The helmet moves, a finger's width.", word="off", trim=-2)
e("2.mom", "whoosh", "Home."); e("2.mom", "blip", "He tells her.", word="told"); e("2.mom", "buzz", "Do not blame the new kid.", word="blame", trim=-6)
e("2.sit", "whoosh", "The classroom."); e("2.sit", "blip", "He tells the teacher.", word="told"); e("2.sit", "stamp", "Sit down.", word="sit", trim=-3); e("2.sit", "creak", "He sits.", word="down", at=0.2)
e("3.watch", "rustle", "Round a tree trunk."); e("3.watch", "tick", "Watching.", word="watched")
e("3.woods", "whoosh_low", "The wall of pines."); steps("3.woods", "He walks into the woods.", "step_grass", 0.4, trim=2); e("3.woods", "gust", "Alone.", word="alone")
e("3.wet", "swish", "Morning."); steps("3.wet", "Out of the trees, at the lens.", "step_grass", 0.42, trim=2); e("3.wet", "plink", "Water off the helmet.", word="wet", at=-0.6, repeat=5, every=0.25); e("3.wet", "sting", "Wet.", word="wet", trim=-5)
e("3.know", "heartbeat", "He had to know.", at=0.2); e("3.know", "gust", "The woods breathe.", word="woods")
e("3.follow", "whoosh_low", "Night."); steps("3.follow", "Two pairs of feet, far apart.", "step_grass", 0.36, trim=1)
steps("3.far", "The helmet walks at us.", "step_grass", 0.42, trim=2); e("3.far", "rustle", "From pine to pine.", word="back"); e("3.far", "creak", "He never turned around.", word="never", trim=-3)
steps("3.hid", "He runs to the tree, bent low.", "step_grass", 0.2, 0.05, 1.2, trim=2); e("3.hid", "rustle", "Against the bark.", word="hid"); e("3.hid", "heartbeat", "One eye round the trunk.", word="tree")
e("4.lamp", "crackle", "The old lamp.", at=0.2); e("4.lamp", "creak", "It hangs crooked.", at=0.9, trim=-3); steps("4.lamp", "Three more walk into the light.", "step_grass", 0.3, dur["4.lamp"] - 1.3, trim=2); e("4.lamp", "sting", "Not alone.", word="alone", trim=-4)
e("4.circle", "whoosh_low", "Round them, low."); e("4.circle", "cheer", "They are laughing.", word="circle", trim=-9); e("4.circle", "stomp", "The last three bullies in town.", word="bullies", trim=-4)
e("4.push", "hit", "A shove in the chest.", word="pushed"); e("4.push", "step_grass", "He goes back a step.", word="pushed", at=0.2, repeat=2, every=0.18, trim=3); e("4.push", "slide_down", "He did not push back.", word="back", trim=-3)
e("4.take", "swish", "The big one's face."); e("4.take", "stamp", "Take it off.", word="off", trim=-3); e("4.take", "blip", "Show us your face.", word="face", trim=-2)
e("4.held", "clank", "Both hands on the iron.", word="held"); e("4.held", "tick", "The helmet rattles: he is shaking.", word="shaking", at=-0.6, repeat=8, every=0.09, trim=4)
e("4.scared", "whoosh_low", "The slit."); e("4.scared", "heartbeat", "Scared.", word="scared"); e("4.scared", "heartbeat", "Not of them.", word="them"); e("4.scared", "riser", "Something behind the slit lights up.", word="them", at=-0.9, trim=-6)
e("4.pull", "rustle", "The other arm.", word="arms", at=0.25, trim=0); e("4.pull", "creak", "The third one pulls.", word="third"); e("4.pull", "scrape", "Iron starts to move.", word="pulled", trim=2)
e("4.off", "clank", "The helmet comes off.", at=0.05, trim=3); e("4.off", "whoosh", "It goes up past the lamp.", at=0.2); e("4.off", "clank", "It lands in the dirt.", at=1.35, trim=4); e("4.off", "thud", "It bounces once.", at=1.77); e("4.off", "scrape", "It rocks until it is still.", at=1.95, trim=-2)
e("4.noface", "sting", "There was no face.", at=0.05); e("4.noface", "rustle", "One lets go of his arm.", at=1.1, trim=2); e("4.noface", "rustle", "The other lets go.", at=1.5, trim=2); e("4.noface", "heartbeat", "They step away.", at=1.2, repeat=2, every=0.55)
e("4.hole", "whoosh_low", "His head comes up."); e("4.hole", "heartbeat", "A hole.", word="hole", repeat=3, every=0.55)
e("4.moved", "rustle", "Something wet moves in it.", word="moved", at=-0.4, trim=3); e("4.moved", "creak", "It comes up over the rim.", word="moved"); e("4.moved", "heartbeat", "It crosses the gap.", at=1.75, repeat=3, every=0.5, trim=2); e("4.moved", "slide_up", "It touches his face.", at=2.7, trim=-2); e("4.moved", "whoosh", "And it is gone back in.", at=3.1)
e("4.tent", "slide_up", "One.", word="one", at=-0.1); e("4.tent", "whoosh", "Five.", word="five", at=-0.15); e("4.tent", "riser", "Too many to count.", word="many", at=-0.5); e("4.tent", "boom", "A crown of them.", word="count", trim=-2)
e("4.thick", "stomp", "Thick as trees.", word="thick"); e("4.thick", "whoosh", "Round the first.", word="wrapped", at=-0.2); e("4.thick", "whoosh", "The second.", word="wrapped", at=0.0); e("4.thick", "whoosh", "The third.", word="wrapped", at=0.15); e("4.thick", "creak", "Lifted off their feet.", word="three", trim=2)
e("4.scream", "heartbeat", "The teller, not blinking.", at=0.1); e("4.scream", "heartbeat", "No sound.", word="sound"); e("4.scream", "gust", "No time.", word="time")
e("4.swallow", "slide_down", "The first goes in.", word="in", at=-0.25); e("4.swallow", "thud", "Gone.", word="in", at=0.25, trim=-2); e("4.swallow", "slide_down", "The second.", word="all", at=-0.1); e("4.swallow", "thud", "Gone.", word="all", at=0.4, trim=-2)
e("4.swallow", "slide_down", "The third.", word="three", at=-0.05); e("4.swallow", "thud", "Gone.", word="three", at=0.45, trim=-2); e("4.swallow", "whoosh_low", "The arms go back in.", word="gone", at=-0.35); e("4.swallow", "boom", "And then they were gone.", word="gone", trim=-4)
e("5.quiet", "crackle", "Only the lamp.", at=0.1, trim=3)
steps("5.pick", "He walks to the helmet.", "step_grass", 0.3, 0.05, 0.75, trim=3); e("5.pick", "clank", "He lifts it.", word="helmet", trim=2); e("5.pick", "tick", "It rattles in his hands.", word="shaking", at=-0.6, repeat=7, every=0.09)
e("5.step", "rustle", "One foot goes back.", word="step", at=-0.3, trim=3); e("5.step", "step_grass", "One step.", word="step", trim=3)
e("5.stick", "crack", "The stick. The loudest thing in the film.", word="snapped", trim=6); e("5.stick", "debris", "Bits of it.", word="snapped", at=0.15)
e("5.stop", "sting", "He stopped.", at=0.05, trim=-3)
e("5.turn", "creak", "One arm comes up out of him.", at=0.15, trim=2); e("5.turn", "slide_up", "One tentacle.", word="tentacle", trim=-2); e("5.turn", "scrape", "It swings round, slowly.", word="slowly", trim=2); e("5.turn", "sting", "It points at his tree.", word="tree", trim=-3)
e("5.breath", "heartbeat", "His heart.", at=0.1, repeat=3, every=0.6, trim=3)
e("5.closer", "rustle", "It comes round the trunk.", at=0.2, trim=3); e("5.closer", "scrape", "Feeling along the bark.", word="closer", trim=2); e("5.closer", "heartbeat", "His heart.", at=1.0, repeat=4, every=0.55, trim=3); e("5.closer", "place", "It lays itself on the wood.", word="bark", trim=4)
e("9.sub", "creak", "It turns to his face.", at=0.1, trim=2); e("9.sub", "ding", "Subscribe.", word="subscribe", trim=-2); e("9.sub", "boom", "Black.", at=dur["9.sub"] - 0.2, trim=-2)
s['sfx'] = X
json.dump(s, open(F + 'sound.json', 'w'), indent=2)
print(len(X))
