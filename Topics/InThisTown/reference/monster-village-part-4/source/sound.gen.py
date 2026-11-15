"""Writes this film's sound.json. Edit HERE, never the json: running this overwrites it.
    python3 src/videos/in-this-town-monster-village-part-4/sound.gen.py
    python3 scripts/sound.py build in-this-town-monster-village-part-4
A night raid. The owner's track runs under all of it, stepped back for the quiet night at the start, and it stops
for ONE joke: "4 minutes earlier" (6.earlier) has no voice and no track, only a march made of effects, in step with
the enderman's feet. The golem's steps, the TNT and the ravager are the loud things."""
import json, os
F = os.path.dirname(os.path.abspath(__file__)) + '/'
t = json.load(open(F + 'timing.json'))
dur = {c['id']: c['end'] - c['start'] for c in t['cues']}
s = json.load(open(F + 'sound.json'))
M = [("1.town", "curious", -3, "Night. A boy in a cage."), ("2.guard", "sneak", -4, "One guard cannot sleep: the track steps back."),
     ("3.bam", "playful", 0, "Dad."), ("4.tower", "sneak", -3, "The lookout, asleep."), ("4.pill", "tense", 0, "Hundreds of them."),
     ("5.boom", "dark", 1, "The wall."), ("6.pop", "curious", -2, "A key."), ("6.earlier", "none", 0, "The joke: no track, a march of effects."),
     ("7.hole", "hope", 1, "My friends. All of them."), ("8.mo", "sad", -3, "Mo."), ("8.out", "tense", 0, "He jumps out."),
     ("9.slam", "tense", 1, "The run."), ("10.hall", "dark", -3, "The hallway."), ("11.sub", "tense", 0, "Part five.")]
s['music']['sections'] = [dict({"from": a, "mood": b, "why": d}, **({"gain": g} if g and b != "none" else {})) for a, b, g, d in M]
s['beds'] = [{"from": a, "to": b, "bed": c} for a, b, c in [
    ("1.town", "1.asleep", "night"), ("2.guard", "2.sheep", "room"), ("2.air", "5.fell", "night"), ("5.boom", "6.ask", "fire"),
    ("6.earlier", "6.earlier", "night"), ("7.hole", "9.door", "crowd"), ("10.hall", "11.sub", "room")]]
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

e("1.town", "hit", "The hook: the golem's fist on the ravager's skull.", at=0.42, trim=3); e("1.town", "boom", "The ground.", at=0.45); steps("1.town", "The ravager comes again.", "stomp", 0.28, 1.3, 2.4, trim=-1); e("1.town", "clank", "And I was in a cage: his hands on the bars.", word="cage", at=-0.25)
e("1.night", "whoosh", "Up over the castle."); e("1.night", "gust", "Night air.", at=0.6)
e("1.shift", "swish", "Down to the yard."); steps("1.shift", "The night shift plods past.", "step_stone", 0.45)
e("1.asleep", "swish", "Down through the bars."); e("1.asleep", "slide_down", "A snore.", at=0.5, trim=-3); e("1.asleep", "slide_down", "Another.", at=1.9, trim=-3)
e("2.guard", "whoosh", "A room."); e("2.guard", "creak", "The bed.", word="woke"); e("2.guard", "rustle", "He sits up.", at=0.6)
e("2.sheep", "swish", "Down on his face."); e("2.sheep", "boing", "A sheep.", at=0.5, trim=-3); e("2.sheep", "boing", "A sheep.", at=1.0, trim=-3); e("2.sheep", "boing", "A sheep.", at=1.5, trim=-3); e("2.sheep", "buzz", "It did not work.", word="work", trim=-5)
e("2.air", "creak", "A door in the wall."); steps("2.air", "He walks out.", "step_grass", 0.42, 0.3)
e("2.stars", "swish", "Up at the stars."); e("2.stars", "sparkle", "Stars.", word="stars", trim=-2); e("2.stars", "gust", "A big breath.", word="breath", at=-0.3)
e("3.bush", "rustle", "The bush.", at=0.15, trim=3); e("3.bush", "rustle", "Again.", at=0.5, trim=3)
e("3.who", "pop", "Who is there?", at=0.05); e("3.who", "tick", "The bush did not say.", word="bush", repeat=3, every=0.25)
e("3.sword", "scrape", "The sword comes out.", word="pulled", trim=2); e("3.sword", "clank", "Steel.", word="sword", trim=-2); steps("3.sword", "On tiptoe.", "step_grass", 0.5, 1.2, trim=1)
e("3.slow", "heartbeat", "Slowly.", at=0.05); e("3.slow", "heartbeat", "Very slowly.", at=0.8)
e("3.bam", "hit", "BAM.", at=0.08); e("3.bam", "rustle", "Leaves.", at=0.25, trim=2); e("3.bam", "crack", "His jaw drops.", word="jaw", trim=-2); e("3.bam", "bonk", "Wide open.", word="open", trim=-2)
e("3.scream", "slide_up", "A very long scream.", at=0.05, trim=2); e("3.scream", "slide_up", "Still going.", at=0.7, trim=2); e("3.scream", "slide_up", "Still going.", word="long", trim=2); e("3.scream", "clank", "The sword in the grass.", at=0.4, trim=-3)
e("3.sorry", "thud", "He faints.", at=0.1); e("3.sorry", "crack", "The jaw goes back.", word="back", trim=-2); e("3.sorry", "blip", "Sorry.", word="sorry")
e("3.lights", "whoosh", "The castle."); e("3.lights", "tick", "A window. And another.", at=0.5, repeat=8, every=0.2, trim=2); e("3.lights", "bell", "Everybody is up.", word="window", trim=-4)
e("4.tower", "whoosh", "Up the tower."); e("4.tower", "slide_down", "Asleep on the job.", word="asleep", trim=-3)
e("4.glass", "blip", "He wakes.", at=0.15); e("4.glass", "zip", "The spyglass opens.", word="spyglass"); e("4.glass", "tick", "It clicks out.", word="spyglass", at=0.25)
e("4.trees", "swish", "Trees.", at=0.02); e("4.trees", "swish", "Trees.", at=0.7); e("4.trees", "swish", "Trees.", at=1.4); e("4.trees", "sting", "The trees moved.", word="moved", trim=-3)
e("4.pill", "drop", "Pillagers.", at=0.05); steps("4.pill", "Marching.", "step_stone", 0.22, 0.3, trim=1)
e("4.gers", "whoosh_low", "Down among them."); e("4.gers", "clank", "An axe.", word="vindicators", trim=-2); e("4.gers", "sparkle", "Magic.", word="evokers", trim=-2); e("4.gers", "pop", "A witch.", word="witches"); e("4.gers", "boing", "Whatever that is.", word="name", trim=-2); steps("4.gers", "They keep coming.", "step_stone", 0.3, 0.3, trim=-2)
e("4.vex", "riser", "It gets bigger.", word="vex", trim=-2); e("4.vex", "zip", "Small and blue.", word="blue"); e("4.vex", "sting", "A vex.", word="vex", trim=-3)
e("4.face", "hit", "In the face.", at=0.25, trim=-3); e("4.face", "bonk", "The spyglass.", at=0.45); steps("4.face", "Backwards.", "step_stone", 0.2, 0.4)
e("5.woke", "blip", "He wakes.", at=0.1); e("5.woke", "rustle", "He sits up.", at=0.3, trim=2)
e("5.fell", "slide_down", "Somebody fell off a tower.", word="fell", at=-0.4, trim=3); e("5.fell", "thud", "And landed.", word="fell", at=0.7, trim=2); e("5.fell", "debris", "Dust.", word="fell", at=0.9, trim=3)
e("5.boom", "riser", "The wall.", word="boom", at=-0.2, trim=-2); e("5.boom", "boom", "BOOM.", word="boom", at=-0.2, trim=2); e("5.boom", "break", "Stone.", word="boom", at=0.1, trim=3); e("5.boom", "debris", "It comes down.", word="boom", at=0.6, trim=4); e("5.boom", "fire_whoosh", "TNT.", word="tnt", trim=-2)
steps("5.ran", "The villagers run.", "step_stone", 0.16, 0.1, 2.4, trim=1); e("5.ran", "clank", "The big gate.", word="gate", trim=2); e("5.ran", "creak", "They let it out.", word="let", trim=3); e("5.ran", "sting", "Two red eyes.", word="out", trim=-3)
e("5.golem", "stomp", "The iron golem.", at=0.3); e("5.golem", "stomp", "As tall as a house.", at=1.2); e("5.golem", "clank", "Iron.", word="golem", trim=-3)
e("5.steps", "stomp", "A step.", at=0.35, trim=2); e("5.steps", "stomp", "A step.", at=0.95, trim=2); e("5.steps", "stomp", "A step.", at=1.55, trim=2); e("5.steps", "stomp", "A step.", at=2.1, trim=2); e("5.steps", "clank", "The cage rattles.", at=0.45, repeat=4, every=0.58, trim=1)
e("5.angry", "whoosh", "The hole.", trim=2); steps("5.angry", "They step apart.", "step_stone", 0.2, 2.0, trim=1); e("5.angry", "creak", "A gate of their own.", word="gate", trim=2)
e("5.ravager", "stomp", "A ravager.", at=0.4); e("5.ravager", "stomp", "It comes.", at=1.3); e("5.ravager", "whoosh_low", "Its jaw.", word="ravager", at=0.3)
steps("5.clash", "They run at each other.", "stomp", 0.3, 0.1, 1.1, trim=1); e("5.clash", "hit", "The fist.", word="fist", trim=3); e("5.clash", "crack", "The jaw.", word="jaw", trim=3); e("5.clash", "boom", "The ground shook.", word="ground", trim=-2); e("5.clash", "debris", "Dust.", word="shook", trim=3)
e("5.again", "scrape", "Ten steps back.", at=0.1, trim=4); e("5.again", "rustle", "It shakes its head.", at=1.1, trim=3); steps("5.again", "Then it came again.", "stomp", 0.2, 1.6, trim=-2)
e("6.pop", "pop", "Pop.", word="pop", trim=4); e("6.pop", "sparkle", "Purple sparks.", word="pop", at=0.1); e("6.pop", "blip", "The teacher.", word="teacher")
e("6.key", "swish", "The lock."); e("6.key", "tick", "The key will not hold still.", at=0.3, repeat=12, every=0.2, trim=3); e("6.key", "coin", "A key.", word="key", trim=1)
e("6.where", "pop", "Where?", at=0.05)
e("6.ask", "pop", "Do not ask.", at=0.05); e("6.ask", "bonk", "Do not.", word="ask", trim=-2)
# THE JOKE: no voice, no track. A march in four, on the enderman's feet (he steps twice a second).
e("6.earlier", "glitch", "Back in time.", at=0.0, trim=2)
e("6.earlier", "thud", "Oom.", at=0.3, repeat=11, every=0.5, trim=3)
e("6.earlier", "bonk", "Pah.", at=0.55, repeat=10, every=0.5, trim=3)
e("6.earlier", "plink", "A whistled tune, of a sort.", at=3.1, repeat=10, every=0.25, trim=5)
e("6.earlier", "slide_down", "He folds himself in half.", at=0.5, trim=5); e("6.earlier", "coin", "He has the key off the belt.", at=1.75, trim=5); e("6.earlier", "sparkle", "Gold.", at=1.8, trim=2); e("6.earlier", "slide_up", "And up he comes.", at=2.2, trim=5)
e("6.earlier", "slide_up", "He is pleased with himself.", at=3.6, trim=5); e("6.earlier", "slide_down", "Very.", at=4.5, trim=5); e("6.earlier", "coin", "The key.", at=5.3, trim=4)
e("7.hole", "whoosh", "The hole in the wall."); steps("7.hole", "They come through at a run.", "step_stone", 0.11, 0.2, 2.0, trim=2); e("7.hole", "whoosh_low", "A whole village, running.", at=0.2, trim=1); e("7.hole", "cheer", "My friends. All of them!", word="friends", trim=3)
e("7.all", "swish", "Mum.", word="mum", at=-0.2); e("7.all", "swish", "Dad.", word="dad", at=-0.2); e("7.all", "swish", "Hiss.", word="hiss", at=-0.2); e("7.all", "swish", "Zombies.", word="zombies", at=-0.2); e("7.all", "swish", "Skeletons.", word="skeletons", at=-0.2); e("7.all", "swish", "Spiders.", word="spiders", at=-0.2)
e("7.all", "tick", "Bones.", word="skeletons", repeat=3, every=0.1, trim=3)
e("7.armour", "whoosh", "The other side."); e("7.armour", "clank", "A helmet.", at=0.68, repeat=5, every=0.42, trim=2); e("7.armour", "clank", "And another.", at=2.68, repeat=2, every=0.3, trim=2)
e("7.help", "hit", "They hit the row.", at=0.42, trim=4); e("7.help", "clank", "Seven helmets in the air.", at=0.5, repeat=2, every=0.12, trim=2)
e("7.zombie", "whoosh", "The sword comes down.", at=0.2, trim=2); e("7.zombie", "clank", "Caught, in one hand.", word="sword", at=-0.25, trim=5); e("7.zombie", "creak", "And bent it.", word="bent", at=-0.3, trim=5); e("7.zombie", "boing", "Bent.", word="bent", at=0.05, trim=2); e("7.zombie", "hit", "He gets it back, in the chest.", word="bent", at=0.3, trim=3)
e("7.skel", "creak", "The string comes back.", at=0.3, trim=2); e("7.skel", "zip", "An arrow.", word="off", at=-0.12, trim=4); e("7.skel", "clank", "A helmet off.", word="off", trim=5); e("7.skel", "zip", "Another.", word="under", at=-0.22, trim=4); e("7.skel", "clank", "The one under it.", word="under", at=-0.1, trim=5); e("7.skel", "bonk", "A bare head.", word="it", trim=-2)
e("7.spider", "whoosh", "Round and round.", at=0.1); e("7.spider", "tick", "Eight legs.", at=0.1, repeat=14, every=0.11, trim=1); e("7.spider", "zip", "Web.", word="tied"); e("7.spider", "boing", "It jumps on top.", at=1.05, trim=1); e("7.spider", "thud", "The parcel goes over.", at=1.58, trim=5)
e("7.mum", "swish", "Mum."); steps("7.mum", "She walks through all of them.", "step_stone", 0.5, 0.3, trim=1); e("7.mum", "clank", "The fight, round her.", at=0.6, repeat=3, every=0.9, trim=-1); e("7.mum", "blip", "Nobody stopped her.", word="nobody")
steps("7.hiss", "Hiss walks at them.", "step_stone", 0.3, 0.1, 1.3, trim=1); e("7.hiss", "clank", "Four swords in the grass.", word="ran", at=-0.4, trim=1); steps("7.hiss", "They ran.", "step_stone", 0.11, 1.5, trim=1)
e("8.bus", "slide_down", "It came over the wall.", word="wall", at=-0.5, trim=3); e("8.bus", "whoosh_low", "The bus.", at=1.0); e("8.bus", "splash", "Splat.", word="splat", trim=5); e("8.bus", "boing", "And back up.", word="splat", at=0.3)
e("8.click", "tick", "Click.", word="click", trim=5); e("8.click", "creak", "The door swings.", word="cage", at=-0.2, trim=3); e("8.click", "chime", "Open.", word="open", trim=0)
e("8.in", "pop", "Get in!", at=0.05); steps("8.in", "He runs.", "step_stone", 0.15, 1.0, 1.5); e("8.in", "splash", "Into the bus.", word="bus", trim=3); e("8.in", "plink", "Wet.", word="wet", repeat=3, every=0.2, trim=2)
e("8.mo", "swish", "Through the slime."); e("8.mo", "scrape", "He wipes it.", at=0.5, trim=-2); e("8.mo", "sting", "Mo.", word="mo", trim=-2)
e("8.down", "drop", "Down on the ground.", at=0.05); e("8.down", "heartbeat", "Not moving.", word="moving", at=-0.3)
e("8.drag", "scrape", "They drag him.", at=0.1, trim=4); e("8.drag", "scrape", "Away.", word="dragging", trim=4); steps("8.drag", "Two guards.", "step_grass", 0.4, 0.2, trim=1)
e("8.out", "splash", "Out of the bus.", at=0.05, trim=3); e("8.out", "zip", "In the air.", at=0.2); e("8.out", "thud", "He lands.", at=0.75)
e("8.look", "swish", "Everybody turns.", at=0.1); e("8.look", "blip", "Mum.", word="mum"); e("8.look", "blip", "Dad.", word="dad"); e("8.look", "sting", "Nobody is pleased.", word="all", trim=-3)
e("8.nobody", "stomp", "The golem.", at=0.5, trim=2); e("8.nobody", "stomp", "Nobody is looking.", at=1.1, trim=2); e("8.nobody", "sting", "The golem.", word="golem", trim=-3)
steps("9.flick", "It ran right at the bus.", "stomp", 0.28, 0.1, 1.1); e("9.flick", "whoosh_low", "One arm.", word="flick", at=-0.2); e("9.flick", "hit", "One flick.", word="flick", trim=2); e("9.flick", "boing", "The bus leaves.", word="flick", at=0.12)
e("9.forest", "slide_up", "Over the wall.", at=0.1, trim=3); e("9.forest", "slide_down", "And down.", word="forest", at=-0.5, trim=3); e("9.forest", "rustle", "Into the trees.", word="forest", at=0.25, trim=4)
e("9.fist", "stomp", "It turns.", at=0.5); e("9.fist", "creak", "Its head comes round.", word="turned", trim=2); e("9.fist", "riser", "The fist goes up.", at=dur["9.fist"], trim=2); e("9.fist", "heartbeat", "Me.", word="me", trim=3)
e("9.slam", "boom", "SLAM.", at=0.3, trim=2); e("9.slam", "hit", "In the ribs.", at=0.3, trim=3); e("9.slam", "break", "Through a house.", at=1.0, trim=5); e("9.slam", "debris", "The house.", at=1.3, trim=5); e("9.slam", "crack", "Timber.", at=1.1, trim=3)
steps("9.ran", "I ran.", "step_stone", 0.17, 0.05, 1.0, trim=1); e("9.ran", "tick", "Small feet.", word="feet", at=0.15, repeat=5, every=0.09, trim=1); e("9.ran", "blip", "Hiss.", word="hiss", trim=2)
e("9.stay", "pop", "Stay back!", at=0.05, trim=2); e("9.stay", "pop", "Both of you!", word="both", trim=2)
e("9.never", "swish", "Hiss."); e("9.never", "tick", "Four short legs, flat out.", at=0.1, repeat=28, every=0.09, trim=3)
e("9.door", "whoosh_low", "The keep."); steps("9.door", "He runs at the door.", "step_stone", 0.17, 0.05, 1.5); e("9.door", "drop", "I went in.", word="in", trim=1)
e("10.hall", "whoosh_low", "A hallway.", at=0.05); e("10.hall", "crackle", "Torches.", at=0.5, trim=3); e("10.hall", "step_stone", "He stops.", at=1.0, trim=2); e("10.hall", "scrape", "Fingers on both walls.", word="touch", trim=3); e("10.hall", "sting", "Thin.", word="thin", trim=-4)
e("10.mo", "scrape", "They are still dragging him.", at=0.2, trim=3); e("10.mo", "heartbeat", "Two guards.", word="guards"); e("10.mo", "heartbeat", "And Mo.", word="mo"); e("10.mo", "swish", "Two heads turn.", word="between", trim=2); e("10.mo", "sting", "Between them.", word="them", trim=-2)
steps("10.run", "I ran at them.", "step_stone", 0.15, 0.05, trim=2); e("10.run", "riser", "At them.", at=dur["10.run"], trim=-2)
steps("11.sub", "Still running.", "step_stone", 0.15, 0.05, 1.2); e("11.sub", "pop", "The sign.", at=0.1); e("11.sub", "ding", "Subscribe.", word="subscribe", trim=-2); e("11.sub", "boom", "Out.", at=dur["11.sub"] - 0.2, trim=-2)
s['sfx'] = X
json.dump(s, open(F + 'sound.json', 'w'), indent=2)
print(len(X))
