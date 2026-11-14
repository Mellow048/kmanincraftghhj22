import json
F='/home/user/kmanincraftghhj22/src/videos/in-this-town-the-fastest-kid-wins/'
t=json.load(open(F+'timing.json'))
dur={c['id']:c['end']-c['start'] for c in t['cues']}
s=json.load(open(F+'sound.json'))
M=[("1.town","town","The cup, and the whole town running for it."),("1.slow","playful","The slowest kid, and the baby."),("1.want","hope","Ten years old, on his toes."),("1.now","sad","The empty shelf."),
("2.train","playful","Training, badly."),("2.week","tense","One week."),("3.night","sneak","Awake, then the forest."),("3.witch","curious","A hat behind a tree."),("3.yes","sad","Mum, dad, the shelf."),
("4.shoes","wonder","The shoes."),("4.hmm","curious","That should have worried me."),("4.stump","wonder","He puts them on."),("5.run","none","The world stops."),("5.real","wonder","The speed of light."),
("5.cheat","sad","It is cheating."),("6.off","curious","Three buttons."),("6.two","playful","Through a bush."),("6.right","hope","Just right."),("7.week","town","The start line."),
("7.count","tense","Three, two, one."),("8.fifteen","tense","The race."),("8.two","hope","Second, and the cup."),("8.one","dark","One runner in front."),("9.sub","town","Part two.")]
s['music']['sections']=[{"from":a,"mood":b,"why":c} for a,b,c in M]
s['beds']=[{"from":"1.town","to":"1.want","bed":"village"},{"from":"1.now","to":"1.now","bed":"room"},{"from":"2.train","to":"2.week","bed":"village"},{"from":"3.night","to":"3.night","bed":"room"},
{"from":"3.forest","to":"6.right","bed":"night"},{"from":"7.week","to":"7.count","bed":"crowd"},{"from":"8.fifteen","to":"8.fifteen","bed":"village"},{"from":"8.eleven","to":"8.eleven","bed":"wind"},
{"from":"8.six","to":"8.six","bed":"village"},{"from":"8.two","to":"9.sub","bed":"crowd"}]
X=[]
def e(cue,sfx,why,word=None,offset=None,trim=None,repeat=None,every=None,nth=None):
    d={"cue":cue,"sfx":sfx}
    if word: d["word"]=word
    if nth: d["nth"]=nth
    if offset is not None: d["at"]=offset
    if repeat: d["repeat"]=repeat; d["every"]=every
    if trim is not None: d["trim"]=trim
    d["why"]=why; X.append(d)
def steps(cue,why,kind="step_grass",every=0.22,start=0.05,end=None,trim=None):
    n=int(((end if end else dur[cue])-start)/every)
    if n>0: e(cue,kind,why,offset=start,repeat=n,every=every,trim=trim)
e("1.town","sparkle","The cup shines.",offset=0.02,trim=-3); e("1.town","swish","The town tears past.",offset=0.75,trim=-2); e("1.town","whoosh","More of them.",offset=1.5,trim=-3)
steps("1.town","Their feet.","step_stone",0.16,1.0,1.9,trim=-1); e("1.town","cheer","Every single year.",word="Every",trim=-3); steps("1.town","His own feet, last.","step_stone",0.4,2.0)
e("1.slow","swish","His face."); steps("1.slow","Slow feet.","step_stone",0.42); e("1.slow","slide_down","The slowest.",word="slowest")
steps("1.baby","He runs flat out.","step_stone",0.3); e("1.baby","boing","The baby goes by.",word="beat"); e("1.baby","blip","One did.",word="One"); e("1.baby","zip","Twice.",word="Twice"); e("1.baby","bonk","Lapped.",word="Twice",offset=0.25)
e("1.want","whoosh","Ten years old."); e("1.want","chime","The cup over his head.",word="trophy"); e("1.want","boing","On his toes.",offset=0.5,trim=-2); e("1.want","boing","Again.",offset=1.2,trim=-2)
e("1.now","whoosh_low","His room."); e("1.now","rustle","He wipes the shelf.",word="shelf"); e("1.now","slide_down","Empty.",word="empty")
e("2.train","whoosh","Training."); steps("2.train","Running, from above.","step_stone",0.2,trim=2)
steps("2.hill","Up the hill.","step_grass",0.2,0.05,0.9); e("2.hill","slide_up","Up.",offset=0.2); e("2.hill","swish","The pond.",word="round",offset=-0.25); steps("2.hill","Round the pond.","step_grass",0.18,1.0)
e("2.push","creak","One push up, shaking.",offset=0.2); e("2.push","thud","Flat.",word="one",trim=3); e("2.push","bonk","One.",word="one",offset=0.15)
steps("2.sweat","Through the chickens.","step_grass",0.2); e("2.sweat","plink","Sweat.",offset=0.2,repeat=5,every=0.3); e("2.sweat","boing","Chickens jump.",word="chickens",offset=-0.3); e("2.sweat","rustle","Wings.",word="chickens"); e("2.sweat","zip","They clear out.",word="moved")
steps("2.fail","Down the street.","step_stone",0.3,0.05,1.2); e("2.fail","boing","The baby hops over the line.",word="lost"); e("2.fail","thud","He falls over it.",word="lost",offset=1.0); e("2.fail","buzz","Lost.",word="lost",offset=0.15,trim=-3); e("2.fail","swish","The baby, close.",word="To",offset=-0.1); e("2.fail","blip","It tilts its head.",word="same")
e("2.week","pop","The board."); e("2.week","tick","One week.",word="week",repeat=4,every=0.25); e("2.week","heartbeat","Get fast.",word="fast"); e("2.week","swish","He turns to us.",word="quickly",offset=-0.35); e("2.week","sting","No plan.",word="quickly",trim=-5)
e("3.night","whoosh_low","Night."); e("3.night","tick","Awake.",offset=0.3,repeat=5,every=0.3); e("3.night","rustle","He turns over.",word="sleep")
e("3.forest","whoosh","The forest."); steps("3.forest","Running in the dark.","step_grass",0.21); e("3.forest","gust","Night air.",word="dark")
steps("3.tired","Staggering.","step_grass",0.3,0.05,1.2,trim=2); e("3.tired","slide_down","His legs give up.",word="gave"); e("3.tired","thud","Down.",word="gave",offset=0.8); e("3.tired","rustle","Leaves.",word="leaves")
e("3.witch","swish","The lens swings."); e("3.witch","creak","Behind the tree.",word="her",offset=-0.3); e("3.witch","sparkle","A witch.",word="witch"); e("3.witch","rustle","Waving.",word="waving"); e("3.witch","blip","Hello.",word="waving",offset=0.25)
e("3.win","whoosh_low","She leans in."); e("3.win","sting","The question.",word="win",trim=-5)
e("3.yes","heartbeat","Thinking.",offset=0.3); e("3.yes","heartbeat","Thinking.",offset=1.3); e("3.yes","whoosh","The shelf.",word="that",offset=-0.15); e("3.yes","swish","Back.",word="Yes",offset=-0.2); e("3.yes","ding","Yes.",word="Yes",trim=-2)
e("4.shoes","rustle","Out of her robe."); e("4.shoes","power_up","The shoes.",offset=0.3); e("4.shoes","sparkle","They shine.",word="shoes")
e("4.money","swish","Him."); e("4.money","rustle","Empty pockets.",offset=0.3); e("4.money","slide_down","No money.",word="money")
e("4.free","whoosh_low","She pushes them at him.",offset=0.3); e("4.free","place","Into his hands.",word="rid"); e("4.free","chime","His.",word="rid",offset=0.2); e("4.free","swish","She looks behind her.",word="them")
e("4.hmm","swish","Past his shoulder."); steps("4.hmm","She backs away.","step_grass",0.35,0.3); e("4.hmm","blip","Left, right.",word="worried"); e("4.hmm","bonk","It did not.",word="not")
e("4.stump","creak","He sits on the stump.",offset=0.15); e("4.stump","rustle","Pulling them on.",word="put",offset=-0.3); e("4.stump","power_up","On.",word="put"); e("4.stump","sparkle","Red light.",word="on")
e("4.gone","swish","The lens swings.",trim=4); e("4.gone","zip","Gone.",word="gone",offset=-0.5); e("4.gone","pop","Smoke.",word="gone"); e("4.gone","place","Her hat lands.",word="gone",offset=0.35)
e("4.love","swish","Round his feet."); e("4.love","boing","He jumps.",word="loved"); e("4.love","thud","Lands.",word="loved",offset=0.45,trim=-2); e("4.love","chime","New shoes.",word="shoes"); e("4.love","boing","Again.",word="loved",offset=0.5,trim=-2)
e("5.run","riser","He pushes off.",offset=0.45); e("5.run","zip","Gone.",offset=0.5)
e("5.slow","power_down","The world slows.",offset=0.05); e("5.slow","drop","Everything stops.",word="slowed")
e("5.leaf","tick","One leaf, hanging.",offset=0.2); e("5.leaf","plink","In front of his nose.",word="nose"); e("5.leaf","heartbeat","His own heart, slow.",word="air")
e("5.bird","whoosh_low","Looking up."); e("5.bird","blip","A bird, stuck.",word="bird"); e("5.bird","creak","Wings open.",word="wings")
e("5.real","glitch","The world was not slow.",word="not"); e("5.real","power_up","He was fast.",word="fast",offset=-0.2); e("5.real","zip","Across.",word="fast",offset=0.2,repeat=5,every=0.4); e("5.real","whoosh","And back.",word="running"); e("5.real","whoosh","And across.",word="speed"); e("5.real","boom","The speed of light.",word="light",trim=-2); e("5.real","rustle","Leaves blown off.",word="was",nth=2)
e("5.pond","whoosh","Over the pond."); e("5.pond","splash","On top of the water.",offset=0.3,trim=-2); e("5.pond","splash","Spray.",word="top",trim=-3); e("5.pond","zip","Across.",word="pond")
e("5.cheat","scrape","He skids.",word="stopped",offset=-0.3); e("5.cheat","thud","Stopped.",word="stopped",trim=-2); e("5.cheat","slide_down","Cheating.",word="cheating"); e("5.cheat","sting","Everybody would know.",word="everybody",trim=-5)
e("6.off","rustle","He pulls them off.",offset=0.2); e("6.off","place","One on the ground.",word="off"); e("6.off","swish","The side of the shoe.",word="side",offset=-0.3); e("6.off","blip","One.",word="three"); e("6.off","blip","Two.",word="three",offset=0.15); e("6.off","blip","Three buttons.",word="buttons")
e("6.one","swish","Closer."); e("6.one","ding","The first one is on.",word="on",trim=-3); e("6.one","pop","Its label.",word="light",offset=-0.25); e("6.one","sparkle","Light speed.",word="speed")
e("6.two","tick","Click.",word="pressed"); e("6.two","blip","The second one lights.",word="pressed",offset=0.1); e("6.two","whoosh","He runs.",word="ran",offset=-0.3); e("6.two","zip","Like a thrown stone.",word="ran"); e("6.two","scrape","He cannot stop.",word="fast"); e("6.two","crack","Through the bush.",word="bush",offset=-0.35); e("6.two","debris","Leaves everywhere.",word="bush"); e("6.two","boing","A chicken jumps.",word="bush",offset=0.1,trim=-2)
e("6.three","swish","The shoe again."); e("6.three","tick","Click.",word="pressed"); e("6.three","blip","The third one lights.",word="pressed",offset=0.1); steps("6.three","He sets off.","step_grass",0.22,1.5)
steps("6.right","A real run.","step_grass",0.2,0.05,2.0,trim=3); e("6.right","whoosh","Trunks going past.",offset=0.4); e("6.right","chime","Perfect.",word="perfect"); e("6.right","swish","He looks at us.",word="Nobody",offset=-0.15); e("6.right","ding","A secret.",word="suspect",trim=-3)
e("7.week","whoosh","One week later."); e("7.week","rustle","Feet on the line.",offset=0.4); e("7.week","sparkle","The red shoes.",word="line")
e("7.long","whoosh_low","Up over the start."); e("7.long","cheer","The crowd.",offset=0.5,trim=-3); e("7.long","whoosh","The rivers.",word="over",offset=-0.25); e("7.long","splash","Water.",word="rivers",trim=-4)
e("7.far","gust","The desert."); e("7.far","whoosh","The dark oak forest.",word="through",offset=-0.2); e("7.far","creak","Old trees.",word="forest"); e("7.far","whoosh","The last village.",word="into",offset=-0.2); e("7.far","chime","The cup.",word="village",nth=None)
e("7.twenty","swish","Along the row."); e("7.twenty","blip","Players.",word="Players"); e("7.twenty","blip","Villagers.",word="villagers"); e("7.twenty","swish","That baby.",word="that",offset=-0.2); e("7.twenty","boing","Bouncing.",word="baby"); e("7.twenty","sting","It looks at him.",word="baby",offset=0.2,trim=-6)
e("7.sign","cheer","Mum and dad.",trim=-2); e("7.sign","pop","The sign.",word="sign"); e("7.sign","bonk","Please not last.",word="sign",offset=0.3)
e("7.count","tick","Three.",word="Three"); e("7.count","tick","Two.",word="Two"); e("7.count","tick","One.",word="One"); e("7.count","school_bell","Go!",word="Go",trim=-3); e("7.count","whoosh","They come at the lens.",word="Go",offset=0.15); e("7.count","cheer","The crowd.",word="Go",offset=0.1)
steps("7.count","Ready.","step_stone",0.5,0.1,1.2,trim=-2)
e("8.fifteen","whoosh","The rivers."); steps("8.fifteen","Over the bridge.","step_wood",0.14,trim=3); e("8.fifteen","splash","Water under them.",offset=0.6,trim=-4); e("8.fifteen","pop","15th.",offset=0.1)
e("8.eleven","gust","The desert."); steps("8.eleven","On sand.","step_grass",0.16,trim=-0.5); e("8.eleven","pop","11th.",word="eleventh",offset=-0.2); e("8.eleven","swish","The other side.",word="Then",offset=-0.15); e("8.eleven","zip","Two more behind him.",word="Then",trim=-4); e("8.eleven","pop","9th.",word="ninth")
e("8.six","whoosh","The dark oak forest."); steps("8.six","On the forest floor.","step_grass",0.13,0.05,1.4); e("8.six","pop","6th.",word="sixth"); e("8.six","swish","The baby.",word="past",offset=-0.4); e("8.six","zip","Past it.",word="past"); e("8.six","boing","The baby sees.",word="baby"); e("8.six","swish","He waves.",word="waved",offset=-0.35); e("8.six","blip","Bye.",word="waved"); e("8.six","rustle","His hand.",word="waved",offset=0.2)
e("8.two","pop","2nd.",offset=0.08); e("8.two","slide_up","Second!",word="second"); steps("8.two","Open ground.","step_stone",0.14,0.3,1.2); e("8.two","whoosh","The last village.",word="last",offset=-0.5); e("8.two","cheer","They can hear it.",word="village",trim=-3); e("8.two","swish","The cup.",word="trophy",offset=-0.55); e("8.two","sparkle","Gold.",word="trophy"); e("8.two","chime","Close enough to touch.",word="trophy",offset=0.2)
e("8.one","whoosh_low","One back in front."); steps("8.one","Two runners.","step_stone",0.13); e("8.one","heartbeat","Only one.",word="one")
e("8.look","swish","His face."); e("8.look","heartbeat","He looks down.",word="down"); e("8.look","tick","At his feet.",word="feet")
e("8.same","riser","The feet in front.",word="same"); steps("8.same","Red shoes on the road.","step_stone",0.14,0.05,1.2); e("8.same","boom","The same shoes.",word="same",trim=-3); e("8.same","sting","Not his.",word="shoes")
e("9.sub","swish","He looks back."); e("9.sub","pop","The sign.",offset=0.25); e("9.sub","ding","Subscribe.",word="subscribe")
for d in X:
    if d.get("nth") is None and "nth" in d: del d["nth"]
s['sfx']=X
json.dump(s,open(F+'sound.json','w'),indent=1)
print(len(X))
