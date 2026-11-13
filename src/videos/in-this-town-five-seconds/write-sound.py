"""Five Seconds' sound sheet: the owner's AAC, cue-relative events, and measured action anchors.
Does NOT rebuild narration. Run sound.py build separately after picture QA.
"""
import json, math, re
from pathlib import Path
P=Path(__file__).resolve().parent
T=json.loads((P/'timing.json').read_text());C={c['id']:c for c in T['cues']}
def word(cue,word):
    return next(w['s'] for w in T['words'] if C[cue]['start']-.05<=w['s']<C[cue]['end'] and re.sub("[^a-z']",'',w['w'].lower())==word.lower())
def quant(t):return math.floor(t*30+.5)/30
S={'teaser':0,'glass':quant(word('4.five','smashed')-.13-5),'touch':quant(C['5.touch']['start']+.1),'chalk':quant(word('5.bonk','hit')-.07-5),'locker':quant(word('8.bang','returned')+.17-5),'elder':quant(word('11.hit','returned')+.08-5),'counter':quant(word('17.resume','time')-5)}
def anchor(t):
    c=next((c for c in reversed(T['cues']) if c['start']<=t),T['cues'][0]);return {'cue':c['id'],'at':round(t-c['start'],6)}
FX=[]
def fx(cue,sfx,why,**kw):FX.append({'cue':cue,'sfx':sfx,'why':why,**kw})
def event(t,sfx,why,**kw):FX.append({**anchor(t),'sfx':sfx,'why':why,**kw})
# Section labels describe the drama; with music.track they change gain ONLY, never synthesize a replacement.
sections=[('1.town','wonder',-1,'A hidden power in an ordinary school.'),('2.mother','curious',-3,'The unanswered origin question.'),('3.school','town',0,'School, friendship and the rabbit.'),('4.first','wonder',-3,'The first frozen glass.'),('5.chalk','playful',-2,'The chalk mistake plants the sidestep.'),('6.told','curious',-3,'Mother already knows.'),('7.locker','tense',0,'The closing locker.'),('8.bang','hope',-2,'His friend is safe.'),('9.lunch','town',-1,'Friendship is reciprocal.'),('10.night','tense',-1,'A neighbor outside after dark.'),('11.stop','drone',-4,'The suspended arrow.'),('11.hit','tense',-1,'Safety behind the door.'),('12.thanks','hope',-2,'The carrot identifies the owner.'),('13.sound','drone',-2,'Something outside the window.'),('13.dinner','tense',-1,'The rabbit is being taken.'),('14.out','tense',0,'The chase starts.'),('15.hand','dark',1,'Ice down the lane.'),('16.stop','none',0,'A short subjective hush for the deliberate counter.'),('17.resume','tense',0,'The ice misses and the foot catches.'),('17.rabbit','hope',-3,'The rabbit is visibly alive and supported.'),('18.look','curious',-3,'The man recovers and recognizes him.'),('18.power','dark',-2,'Recognition, not a triumphant new power.'),('18.prince','dark',-5,'Prince, reaction, black. No CTA sting.')]
beds=[]
for first,last,bed in [('1.town','1.friend','classroom'),('2.mother','3.school','room'),('3.class','3.seat','classroom'),('3.lunch','3.lunch','crowd'),('3.rabbit','3.ear','village'),('4.first','5.release','room'),('5.chalk','5.bonk','classroom'),('6.told','6.lock','room'),('7.locker','8.secret','classroom'),('9.lunch','9.math','crowd'),('9.help','9.help','classroom'),('10.night','18.prince','night'),('12.mother','13.sound','room')]:beds.append({'from':first,'to':last,'bed':bed,'trim':-1})
# A light cut accent only at story/space changes, not on every word.
for n in [2,3,4,6,7,9,10,12,13,14,15,18]:
    c=next(c for c in T['cues'] if c['id'].startswith(str(n)+'.'))
    fx(c['id'],'whoosh','Change of place, time or dramatic focus; not a diegetic moving object.',gain=-14,dur=.18)
for name,a in S.items():
    event(a,'power_down','The shared five-second world clock stops: '+name,gain=-12,dur=.25)
    event(a+5,'power_up','The SAME stop ends after exactly 150 frames: '+name,gain=-13,dur=.2)
# The inner count is non-diegetic, not the frozen wall clock ticking.
for name in ['glass','counter']:
    for k in range(1,5):event(S[name]+k,'tick','The boy counts the held seconds internally; background ambience remains muted.',gain=-14)
for t in [1.52,3.15,3.92]:event(t,'step_wood','The only moving student takes a visible step.',gain=-13)
fx('1.friend','rustle','His glance to the friend, not movement from the frozen friend.',at=.3,gain=-14)
fx('2.adopted','rustle','Mother supports the small child in the memory.',word='adopted',gain=-12)
fx('2.where','blip','A question on his face.',word='where',gain=-13)
fx('2.answer','swish','Her evasive turn away.',word='changed',gain=-13,dur=.14)
fx('2.curtains','rustle','The curtains physically meet.',word='closed',dur=.65,gain=-11)
for t in [.25,.65]:fx('2.curtains','step_wood','Her walk to the window.',at=t,gain=-14)
for t in [.45,1.05,1.65]:fx('3.school','step_wood','The teenager leaves the breakfast table.',at=t,gain=-13)
fx('3.class','school_bell','The classroom transition.',gain=-13)
fx('3.class','zip','The teacher releases the first chalk demonstration.',word='threw',at=.05,gain=-12,dur=.18)
fx('3.seat','rustle','The friend turns toward his saved seat.',word='seat',gain=-12)
fx('3.lunch','scrape','The half loaf crosses the tabletop.',at=.25,dur=.65,gain=-12)
fx('3.rabbit','place','Carrot reaches the ground beside the rabbit.',word='rabbit',gain=-12)
fx('3.ear','rustle','Tiny rabbit mouth and shoelace movement.',at=.45,gain=-13,dur=.25)
fx('3.ear','blip','A fond look at the black ear.',word='black',gain=-13)
event(S['glass']-.43,'plink','The glass leaves his supporting hand.',gain=-13)
event(S['glass']+5.13,'break','Glass contacts the floor after time resumes.',gain=-10)
event(S['glass']+5.2,'debris','The visible glass fragments settle.',gain=-12,dur=.45)
event(S['touch']+.35,'paper','Fingers contact the book.',gain=-12)
event(S['touch']+2.7,'rustle','He withdraws his hand; the released book waits.',gain=-12,dur=.2)
event(S['touch']+5.15,'place','The book drops the final centimeters onto the table.',gain=-12)
event(S['chalk']-.32,'zip','The teacher sends chalk through the classroom.',gain=-12,dur=.17)
event(S['chalk']+5.08,'bonk','Chalk taps his nose; the future sidestep is earned.',gain=-10)
fx('6.hands','place','Bowl reaches the washing counter.',word='bowl',at=.12,gain=-12)
fx('6.rule','tick','The warning lands, a subjective accent.',word='see',gain=-13)
fx('6.question','blip','His worried glance.',word='hiding',gain=-13)
fx('6.lock','clank','The visible latch slides into place.',word='lock',at=.12,gain=-12,f=410)
fx('7.locker','thud','The bully pushes the friend backward into the open locker.',word='shoved',gain=-11)
fx('7.book','place','The blue book contacts the floor.',word='floor',gain=-11)
fx('7.door','creak','The hinge starts its visible swing.',word='swung',gain=-12,dur=.35)
a=S['locker']
for off,sfx,why in [(.22,'rustle','Hand reaches the sleeve.'),(1.12,'rustle','Sleeve contact, then the whole body is pulled.'),(1.4,'step_stone','The hero braces and steps back.'),(1.82,'step_stone','He completes the pull into the aisle.'),(2.32,'paper','Hand contacts the fallen book.'),(3.5,'place','The book reaches the folded arms.'),(3.95,'step_stone','First step back beside his friend.'),(4.4,'step_stone','Second step into the safe position.'),(5.18,'clank','The empty locker slams after time returns.')]:event(a+off,sfx,why,gain=-12)
fx('8.friend','blip','The friend looks from the book to the red sleeve.',word='thought',gain=-13)
fx('8.secret','swish','A small evasive look from the hero.',at=.18,gain=-13,dur=.14)
fx('9.lunch','scrape','The whole loaf crosses the same table.',at=.25,dur=.65,gain=-12)
fx('9.why','chime','His sincere wish to protect the boy too.',word='protect',gain=-13)
fx('9.math','paper','Open book and the lesson he actually understands.',word='math',gain=-12)
fx('9.help','ding','He raises his hand with the right answer.',word='answer',gain=-12,note='E5')
fx('10.night','creak','The real doorway opens onto the night.',at=.15,gain=-13)
for off in [.45,1.2,1.95]:fx('10.night','step_stone','The hero moves toward his neighbor.',at=off,gain=-13)
fx('10.neighbor','rustle','The fallen villager struggles on the threshold.',at=.4,gain=-12)
for off in [.1,.65,1.25]:fx('10.mobs','step_grass','Zombies advancing through the gate, not a golem.',at=off,gain=-13)
fx('10.bow','creak','The skeleton visibly draws its bow.',at=.45,gain=-11,dur=.45)
a=S['elder'];event(a-1.2,'zip','The arrow launches on its authored travel frame.',gain=-13.5,dur=.2)
for off,sfx,why,kw in [(.55,'rustle','Collar contact.',{}),(1.05,'scrape','Continuous drag over the real doorstep.',{'dur':2.0}),(1.7,'step_stone','Hero backs through the opening.',{}),(2.5,'step_wood','His feet reach the indoor floor.',{}),(3.25,'whoosh_low','The boot pushes the door toward the jamb.',{'dur':.25}),(4.15,'thud','Door meets the jamb before time returns.',{}),(5.13,'hit','Arrow tip contacts the closed wood.',{'gain':-10}),(6.65,'scrape','First zombie scratches outside, after resumption.',{'dur':.3}),(7.45,'scrape','The other claw scrapes the exterior.',{'dur':.3}),(8.25,'scrape','Another unsuccessful scrape on the same door.',{'dur':.3})]:event(a+off,sfx,why,**({'gain':-12}|kw))
fx('12.thanks','rustle','The old man raises himself to sit.',at=.25,gain=-13)
fx('12.thanks','place','The carrot passes between their hands.',word='carrot',at=.12,gain=-12)
fx('12.rabbit','chime','The carrot connects the rescued neighbor to the rabbit.',word='rabbit',gain=-14)
fx('12.mother','rustle','Mother checks the sleeve for scratches.',word='checked',gain=-12)
fx('12.lie','swish','He looks away on the ordinary explanation.',word='golem',gain=-13,dur=.13)
fx('12.window','creak','The window and curtain close.',word='shut',gain=-12,dur=.45)
fx('13.sound','step_stone','The approved crunch outside that wakes him.',word='crunch',gain=-10)
fx('13.sound','rustle','He rises from the bed.',at=.75,gain=-12)
fx('13.white','gust','Air at the actual window, very low under the voice.',at=.5,dur=.5,gain=-16)
fx('13.beard','swish','Push into the bearded player face.',word='beard',gain=-13,dur=.16)
fx('13.kneel','step_stone','His repositioning step beside the rabbit.',at=.35,gain=-13)
fx('13.kneel','rustle','Knees bend and the white sleeve reaches down.',word='knelt',gain=-12)
fx('13.frost','crackle','Small ice growth at the feet; not flame.',word='Ice',gain=-12,dur=.5)
fx('13.frost','sparkle','The frost reaches the legs.',word='legs',gain=-12,dur=.3)
fx('13.dinner','rustle','Supporting arm lifts the rabbit continuously.',word='picked',gain=-11,dur=.5)
fx('14.ear','blip','The living little nose and familiar black ear.',word='nose',gain=-13)
fx('14.out','creak','The hero opens and crosses his actual doorway.',at=.15,gain=-12)
for off in [.45,.95,1.45]:fx('14.out','step_stone','A visible running step out to the path.',at=off,gain=-13)
fx('14.saw','swish','The man turns at the shout.',word='looked',gain=-12,dur=.16)
# Distance-derived footfalls: both runners at normal running speed, none for the frozen stranger.
run=word('14.run','ran')-.2;hero=word('14.follow','chased')-.6;end=S['counter'];manDistance=3*(end-run);heroDistance=2.1+manDistance-2.05-(-3.75);heroSpeed=heroDistance/(end-hero)
for start,speed,who,pan in [(run,3,'white-clothed runner',.2),(hero,heroSpeed,'red-shirted pursuer',-.2)]:
    n=1
    while start+n*1.05/speed<end:
        event(start+n*1.05/speed,'step_stone','Half-stride ground contact from the distance-driven '+who+'.',gain=-15,pan=pan);n+=1
fx('14.secret','blip','His worry is exposure, not a cooldown.',word='see',gain=-14)
fx('14.stay','rustle','The supported rabbit remains in the white arm.',word='rabbit',gain=-13)
fx('15.hand','whoosh','The free-arm wind-up.',word='threw',gain=-12,dur=.22)
fire=word('15.blocks','shot');event(fire,'zip','The first ice block leaves the throwing hand.',gain=-10,dur=.16)
event(fire+.36,'break','The first block contacts and opens the stone wall.',gain=-10)
event(fire+.42,'debris','Visible stone and ice fragments fall from the hole.',gain=-12,dur=.65)
event(S['counter']-.13,'zip','Second ice projectile travels toward his face.',gain=-11,dur=.09)
event(S['counter']-.067,'zip','Third ice projectile follows, then both stop.',gain=-12,dur=.06)
fx('15.chalk','blip','The chalk lesson is remembered before the counter.',word='remembered',gain=-13)
a=S['counter']
for off,sfx,why in [(.78,'scrape','Hand contacts the grounded rock.'),(1.49,'step_stone','First running footfall past the frozen man.'),(2.17,'step_stone','Second footfall to get in front.'),(3.56,'place','The rock is set down in the path, not thrown.'),(4.15,'step_stone','The deliberate sidestep starts.'),(4.55,'step_stone','The hero clears the old ice lane.'),(5.23,'break','Second ice block hits the old position.'),(5.32,'debris','Third ice block breaks and shards settle.')]:event(a+off,sfx,why,gain=-11 if sfx=='break' else -13)
hit=word('17.hit','caught');land=word('17.fall','back')-.04
for t,sfx,why in [(hit-.1,'bonk','The planted toe catches the visible rock, no face hit.'),(hit+.35,'rustle','The stumble starts.'),(hit+1.0,'swish','He tries to turn and recover.'),(land,'thud','The supported back landing.'),(land+.12,'debris','A little ground dust from the landing.'),(word('17.rabbit','lifted')+.12,'rustle','Both hands lift the supported living rabbit.'),(word('17.rabbit','lifted')+1.05,'chime','The transfer is complete and the nose still twitches.')]:event(t,sfx,why,gain=-11 if sfx=='thud' else -13)
fx('17.breathe','blip','A small relief accent on the living nose.',word='twitching',gain=-14)
fx('18.look','rustle','He rubs his head and gets onto one knee.',word='rubbed',gain=-12,dur=.35)
fx('18.look','step_stone','His knee meets the path during the continuous rise.',word='knee',gain=-13)
fx('18.home','swish','Mother watching from the established doorway.',word='mother',gain=-13,dur=.16)
fx('18.power','sting','Recognition of the power, not another attack.',word='ability',gain=-14)
fx('18.found','riser','A short rise into the prince recognition.',at=C['18.found']['end']-C['18.found']['start'],dur=.7,gain=-13)
fx('18.prince','boom','The one final reveal: prince. No subscribe cue or sequel promise.',word='prince',gain=-7)
# Phone-band measurements from mix pass one: raise only buried footfalls, not the entire chase bus.
foot_trims={127.57:3,128.62:2,130.18:6,132.05:2,132.12:3,133.30:4,135.17:6,135.27:2,136.32:3.5,138.60:2}
for entry in FX:
    if entry['sfx']=='step_stone' and 'at' in entry:
        t=round(C[entry['cue']]['start']+entry['at'],2)
        if t in foot_trims:entry['trim']=foot_trims[t]
sheet={'film':'in-this-town-five-seconds','README':'Exact approved voice-00 narration, supplied InThisTownMusic.aac, measured action contacts. Regenerate with write-sound.py only after timing/animation changes. No procedural music fallback.','music':{'track':'Topics/InThisTown/InThisTownMusic.aac','trackFrom':0,'gain':-17,'duck':2,'sections':[{'from':c,'mood':m,'gain':g,'why':why} for c,m,g,why in sections]},'beds':beds,'bedMutes':[{**anchor(a),'dur':5,'why':f'{name}: the outside world is silent for the same 150 frames as its motion.'} for name,a in S.items()],'sfx':FX}
(P/'sound.json').write_text(json.dumps(sheet,indent=2)+'\n');print(f'{len(sections)} recorded-track level sections; {len(beds)} beds; {len(FX)} action effects; 7 five-second ambience mutes.')
