"""Writes this film's sound.json. Edit HERE, never the json: running this overwrites it.
    python3 src/videos/in-this-town-the-fastest-kid-wins-part-2/sound.gen.py
    python3 scripts/sound.py build in-this-town-the-fastest-kid-wins-part-2
A race, by day. The owner's track runs under all of it; it steps back behind the tree and in the desert heat, and it
stops for ONE second: his face when first place says HEY (4.froze). The loud things are the shoes (LIGHT SPEED twice,
BOOM once)."""
import json, os
F = os.path.dirname(os.path.abspath(__file__)) + '/'
t = json.load(open(F + 'timing.json'))
dur = {c['id']: c['end'] - c['start'] for c in t['cues']}
s = json.load(open(F + 'sound.json'))
M = [("1.town", "town", 0, "The recap."), ("2.turn", "curious", -3, "Behind a tree."), ("3.idea", "playful", 0, "A plan."),
     ("4.hey", "curious", -4, "Caught."), ("4.froze", "none", 0, "No answer."), ("4.poop", "playful", -2, "The excuse."),
     ("5.later", "town", 0, "The line."), ("5.bend", "tense", -1, "They press something."), ("5.go", "tense", 1, "Go."),
     ("6.forgot", "curious", -2, "Not yet."), ("6.desert", "drone", -3, "Heat."), ("7.van", "playful", -2, "The van."),
     ("7.angry", "tense", 0, "Angry."), ("7.jog", "hope", 1, "Just right."), ("8.catch", "tense", 0, "Catching up."),
     ("8.boom", "dark", 1, "BOOM."), ("8.behind", "curious", -2, "He stays behind."), ("9.van", "playful", -1, "Ice cream."),
     ("9.later", "hope", 0, "Fourth."), ("9.drink", "curious", -3, "A drink."), ("9.walk", "dark", -2, "He walks up."), ("10.sub", "tense", 0, "Part three.")]
s['music']['sections'] = [dict({"from": a, "mood": b, "why": d}, **({"gain": g} if g and b != "none" else {})) for a, b, g, d in M]
s['beds'] = [{"from": a, "to": b, "bed": c} for a, b, c in [
    ("1.town", "1.town", "village"), ("1.witch", "1.buttons", "night"), ("1.second", "3.press", "village"), ("3.home", "3.home", "wind"),
    ("3.brush", "3.brush", "room"), ("3.why", "4.sigh", "village"), ("5.later", "5.ran", "crowd"), ("6.forgot", "6.ninth", "village"),
    ("6.desert", "9.ice", "wind"), ("9.later", "10.sub", "crowd")]]
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

e("1.town", "sparkle", "The trophy.", at=0.5, trim=-2); e("1.town", "zip", "The baby goes past.", word="slowest", at=-0.3); steps("1.town", "Small fast feet.", "tick", 0.09, 2.2, trim=1); e("1.town", "slide_down", "Slowest.", word="slowest", trim=-2)
e("1.witch", "whoosh", "The forest."); e("1.witch", "chime", "A gift.", word="gave", trim=-2); e("1.witch", "sparkle", "They glow.", word="shoes")
e("1.buttons", "swish", "The shoe, close."); e("1.buttons", "blip", "One.", at=0.05); e("1.buttons", "blip", "Two.", word="too", at=-0.1); e("1.buttons", "ding", "Three: just right.", word="just", at=-0.1, trim=-3)
e("1.second", "whoosh", "The log."); e("1.second", "pop", "2nd.", at=0.15); e("1.second", "pop", "1st.", word="first"); e("1.second", "sting", "The same shoes.", word="same", trim=-3)
e("2.turn", "zip", "Gone.", at=0.02, trim=2); e("2.turn", "gust", "Dust.", at=0.15); e("2.turn", "swish", "He looks left.", word="gone", at=0.2); e("2.turn", "swish", "Right.", word="gone", at=0.6); e("2.turn", "pop", "?", word="confused", at=-0.1)
e("2.tree", "swish", "Behind a tree."); e("2.tree", "heartbeat", "His chest.", at=0.2, trim=2); e("2.tree", "heartbeat", "Again.", at=0.9, trim=2); e("2.tree", "sparkle", "His own shoes.", word="same", trim=-2)
e("2.three", "whoosh", "The line."); steps("2.three", "They come in.", "step_grass", 0.2, 0.2, trim=1); e("2.three", "pop", "3rd.", word="third"); e("2.three", "pop", "4th.", word="fourth"); e("2.three", "pop", "5th.", word="fifth")
e("2.baby", "swish", "The baby."); e("2.baby", "boing", "A strut.", at=0.3, repeat=4, every=0.52, trim=-2)
e("2.friends", "swish", "Two more."); steps("2.friends", "They run in.", "step_grass", 0.2, 0.1, 1.5, trim=1); e("2.friends", "bonk", "Fists.", word="friends", at=0.1); e("2.friends", "blip", "Friends.", word="friends", at=0.3)
e("2.too", "sparkle", "Six red shoes.", at=0.2); e("2.too", "tick", "One, two, three.", at=0.2, repeat=3, every=0.22, trim=3)
e("2.hide", "swish", "He peeks."); e("2.hide", "zip", "Back in.", at=0.35); e("2.hide", "scrape", "Down the bark.", word="peek", at=-0.5, trim=2); e("2.hide", "thud", "On the ground.", word="peek", trim=-2)
e("3.idea", "ding", "An idea.", at=0.45); e("3.idea", "pop", "The light.", at=0.45, trim=-2)
e("3.press", "swish", "The shoe."); e("3.press", "tick", "The button.", word="first", trim=4); e("3.press", "power_up", "Light speed.", word="first", at=0.05)
e("3.home", "whoosh", "Light speed.", at=0.05, trim=3); e("3.home", "zip", "Through the town.", at=0.4, trim=2); e("3.home", "gust", "Nothing else moves.", at=1.0); e("3.home", "creak", "His door.", at=1.9, trim=2)
e("3.brush", "swish", "His room."); e("3.brush", "rustle", "The brush.", at=0.1, repeat=12, every=0.18, trim=1); e("3.brush", "plink", "Drops.", at=0.4, repeat=3, every=0.45, trim=1); e("3.brush", "splash", "Blue.", word="blue", trim=-6)
e("3.why", "whoosh", "What he is thinking."); e("3.why", "buzz", "OUT.", word="found", trim=-2); e("3.why", "tick", "The drone.", at=0.2, repeat=5, every=0.2); e("3.why", "sparkle", "Not mine.", word="mine", trim=-2)
e("3.back", "whoosh", "Back.", at=0.3, trim=3); e("3.back", "thud", "He lands.", at=0.55); e("3.back", "gust", "Dust.", at=0.6); e("3.back", "tick", "The third button.", word="third", trim=4); e("3.back", "power_down", "Just right.", word="third", at=0.1, trim=-2)
steps("4.hey", "He comes round the tree.", "step_grass", 0.35, 0.1, 0.9, trim=2); e("4.hey", "pop", "HEY.", word="hey"); e("4.hey", "boing", "He jumps.", word="hey", at=0.05); e("4.hey", "sting", "Caught.", word="hey", at=0.1, trim=-4)
e("4.froze", "heartbeat", "Nothing.", at=0.2, trim=3); e("4.froze", "heartbeat", "Nothing.", at=1.0, trim=3); e("4.froze", "plink", "A drop of sweat.", at=1.5, trim=3)
e("4.poop", "pop", "POOPING.", at=0.25); e("4.poop", "slide_down", "That was it.", at=0.5, trim=-1)
e("4.wow", "bonk", "Great excuse.", at=0.2); e("4.wow", "blink", "He shuts his eyes.", at=0.9, trim=3)
e("4.river", "pop", "IN THE RIVER?", at=0.2); e("4.river", "splash", "The river.", at=0.5, trim=-6); e("4.river", "blip", "He nods.", word="nodded", at=-0.2, repeat=4, every=0.28)
e("4.weird", "swish", "First place."); e("4.weird", "rustle", "He scratches his head.", at=0.5, trim=3); e("4.weird", "pop", "1st.", word="first"); e("4.weird", "chime", "He is first.", word="first", at=0.1, trim=-3)
e("4.blue", "swish", "Down to the shoes."); e("4.blue", "heartbeat", "He looks.", at=0.3, trim=2); e("4.blue", "sparkle", "Blue.", word="blue", trim=-3); steps("4.blue", "He walks off.", "step_grass", 0.42, 1.8, trim=2)
e("4.sigh", "gust", "All his breath.", at=0.4, trim=3); e("4.sigh", "slide_down", "Phew.", at=0.2, trim=-3)
e("5.later", "whoosh", "Ten minutes later."); steps("5.later", "They line up.", "step_grass", 0.22, 0.2, trim=1); e("5.later", "pop", "The card.", at=0.1)
e("5.water", "swish", "The water table."); e("5.water", "plink", "Gulp.", at=0.1, repeat=4, every=0.22, trim=4); e("5.water", "place", "The fifth cup.", word="ready", at=-0.3, trim=3); e("5.water", "ding", "Ready.", word="ready", trim=-3)
e("5.bend", "swish", "The front row."); e("5.bend", "rustle", "They bend down.", word="bend", trim=4); e("5.bend", "tick", "Click.", word="pressed", trim=4); e("5.bend", "tick", "Click.", word="pressed", at=0.12, trim=4); e("5.bend", "tick", "Click.", word="pressed", at=0.24, trim=4); e("5.bend", "power_up", "Three green lights.", word="pressed", at=0.3, trim=-2)
e("5.nervous", "heartbeat", "Nervous.", at=0.05, trim=3)
e("5.go", "tick", "Three.", word="three", trim=5); e("5.go", "tick", "Two.", word="two", trim=5); e("5.go", "tick", "One.", word="one", trim=5); e("5.go", "bell", "GO.", word="go"); e("5.go", "zip", "The three are gone.", word="go", at=0.05, trim=3); e("5.go", "cheer", "The camp.", word="go", at=0.1, trim=-2)
steps("5.ran", "Twenty runners.", "step_grass", 0.12, 0.05, trim=1); e("5.ran", "whoosh", "The lead.", word="lead", trim=-2)
e("6.forgot", "swish", "His shoes."); steps("6.forgot", "His feet.", "step_grass", 0.19, 0.1, trim=3); e("6.forgot", "blip", "The third button.", word="third")
steps("6.notyet", "He runs.", "step_grass", 0.19, 0.05, trim=1); e("6.notyet", "buzz", "Not yet.", word="yet", trim=-5); e("6.notyet", "tick", "The drone, on them.", word="caught", repeat=4, every=0.15, trim=2)
steps("6.ninth", "The bunch.", "step_grass", 0.13, 0.05); e("6.ninth", "pop", "9th.", word="ninth")
e("6.desert", "whoosh", "The desert."); steps("6.desert", "Sand.", "dig", 0.2, 0.1, trim=-5); e("6.desert", "gust", "Hot.", word="hot", trim=3)
steps("6.tired", "Dragging feet.", "scrape", 0.6, 0.1, trim=-1); e("6.tired", "slide_down", "Exhausted.", word="exhausted", trim=-2); e("6.tired", "pop", "A cup.", word="water"); e("6.tired", "bonk", "Empty.", word="gone", trim=-1)
e("6.lead", "swish", "Far in front."); steps("6.lead", "Still dragging.", "scrape", 0.6, 0.3, trim=-2); e("6.lead", "tick", "The drone.", at=0.5, repeat=5, every=0.3); e("6.lead", "sting", "Still in the lead.", word="lead", at=-0.4, trim=-9)
e("7.van", "whoosh_low", "A van.", at=0.4); e("7.van", "creak", "It slows down.", word="next", trim=-2); e("7.van", "pop", "WANT TO QUIT?", word="you")
e("7.angry", "swish", "His face."); e("7.angry", "riser", "Angry.", word="angry", trim=-2); e("7.angry", "pop", "SLOWEST.", word="years"); e("7.angry", "sting", "All those years.", word="slowest", trim=-4)
e("7.no", "stamp", "No.", at=0.1); e("7.no", "swish", "He shakes his head.", at=0.3, repeat=2, every=0.24)
e("7.press", "swish", "In the crowd."); e("7.press", "rustle", "He bends down.", word="bent", trim=4); e("7.press", "tick", "The drone goes past.", at=0.9, repeat=6, every=0.2); e("7.press", "tick", "Click.", word="pressed", trim=5); e("7.press", "power_up", "The second button.", word="pressed", at=0.05)
e("7.jog", "zip", "Too fast.", at=0.35, trim=3); e("7.jog", "whoosh", "Out of the front.", word="fast", at=-0.3, trim=2); e("7.jog", "scrape", "Heels in the sand.", word="slowed", at=-0.2, trim=4); e("7.jog", "ding", "Just right.", word="right", trim=-2); steps("7.jog", "A jog.", "dig", 0.24, 3.0, trim=-3)
steps("7.run", "He runs.", "dig", 0.14, 0.05, trim=0); e("7.run", "whoosh", "Past the window.", at=0.9, trim=2); e("7.run", "crack", "His jaw.", word="mouth", trim=-1); e("7.run", "bonk", "Open.", word="open", trim=-1)
e("8.catch", "swish", "From in front."); steps("8.catch", "Coming.", "dig", 0.15, 0.2, trim=1); e("8.catch", "swish", "Three heads turn.", word="looked", trim=3); e("8.catch", "pop", "!", word="shocked"); e("8.catch", "sting", "Shocked.", word="shocked", trim=-5)
e("8.feet", "swish", "His feet."); steps("8.feet", "Blue shoes, running.", "dig", 0.17, 0.1, 1.6, trim=-3); e("8.feet", "sparkle", "Blue.", word="blue", trim=-2); e("8.feet", "blip", "They shrug.", word="friends", at=0.2)
e("8.maybe", "swish", "First place."); e("8.maybe", "heartbeat", "He looks down.", at=0.1, trim=2); e("8.maybe", "pop", "HE PAINTED THEM.", word="maybe"); e("8.maybe", "sting", "He knows.", word="blue", trim=-4)
e("8.boom", "riser", "He gets mad.", word="boom", trim=-1); e("8.boom", "tick", "His button.", word="pressed", trim=5); e("8.boom", "boom", "BOOM.", word="boom", trim=2); e("8.boom", "whoosh", "Gone.", word="boom", at=0.1, trim=4); e("8.boom", "debris", "Sand.", word="boom", at=0.4, trim=4)
steps("8.behind", "The friends.", "dig", 0.17, 0.05, trim=-1); e("8.behind", "slide_down", "They fall behind.", word="behind", trim=-3); e("8.behind", "buzz", "He does not.", word="copy", trim=-6); e("8.behind", "blip", "He blends in.", word="blended")
e("9.van", "whoosh_low", "The van again.", at=0.1, trim=2); e("9.van", "boing", "The baby.", word="baby", trim=-1); e("9.van", "pop", "QUIT!", word="quit"); e("9.van", "slide_down", "He had quit.", word="quit", at=0.1, trim=-3)
e("9.ice", "swish", "Close."); e("9.ice", "sparkle", "An ice cream.", word="ice", trim=-1); e("9.ice", "plink", "Lick.", at=0.4, repeat=3, every=0.4, trim=3); e("9.ice", "slide_down", "Jealous.", word="jealous", trim=-3)
e("9.later", "whoosh", "Seven minutes later."); steps("9.later", "Over the line.", "dig", 0.17, 0.05, 1.2, trim=-3); e("9.later", "pop", "4th.", word="fourth"); e("9.later", "cheer", "The camp.", word="fourth", at=0.1, trim=-4)
e("9.places", "swish", "The rest camp."); e("9.places", "pop", "2nd.", word="second"); e("9.places", "pop", "3rd.", word="third"); e("9.places", "pop", "1st.", word="still"); e("9.places", "chime", "Still first.", word="still", at=0.1, trim=-3)
e("9.drink", "swish", "The water."); steps("9.drink", "Legs that hardly work.", "scrape", 0.45, 0.1, 1.4, trim=-1); e("9.drink", "thud", "The table.", at=1.4, trim=-3); e("9.drink", "place", "A cup.", word="drink", trim=3)
e("9.walk", "plink", "Gulp.", at=0.1, repeat=5, every=0.25, trim=4); steps("9.walk", "He walks up.", "step_stone", 0.5, 0.5, dur["9.walk"] - 0.6, trim=0); e("9.walk", "heartbeat", "Right behind him.", at=dur["9.walk"] - 0.6, trim=3); e("9.walk", "sting", "First place.", at=dur["9.walk"] - 0.15, trim=-5)
e("10.sub", "pop", "The sign.", at=0.1); e("10.sub", "ding", "Subscribe.", word="subscribe", trim=-2); e("10.sub", "boom", "Out.", at=dur["10.sub"] - 0.2, trim=-2)
s['sfx'] = X
json.dump(s, open(F + 'sound.json', 'w'), indent=2)
print(len(X))
