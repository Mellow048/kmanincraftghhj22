"""Five Seconds' sound sheet: the owner's AAC, cue-relative events, and measured action anchors.
Does NOT rebuild narration. Run sound.py build separately after picture QA.
"""
import json, math, re, subprocess
from pathlib import Path
P=Path(__file__).resolve().parent
ROOT=P.parents[2]
A=json.loads(subprocess.check_output(['node','scripts/five-seconds-action-anchors.mjs'],cwd=ROOT))
(P/'action-anchors.json').write_text(json.dumps(A,indent=2)+'\n')
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
fx('2.answer','swish','Her head leads the evasive turn before her walk.',word='I',at=-.12,gain=-13,dur=.14)
fx('2.curtains','rustle','The curtains physically meet.',word='closed',dur=.65,gain=-11)
# The curtain walk begins in 2.answer, not after the cut. Same distance/anchors as domestic-motion.ts.
walk_start=word('2.answer','asked')-.13;arrive=word('2.curtains','closed')-.3
walk_length=math.hypot(2.52+.9,-1.72+.4)
for n in range(1,7):
    fraction=(n*math.pi/5.4)/walk_length
    lo,hi=0.,1.
    for _ in range(35):
        k=(lo+hi)/2
        if k*k*(3-2*k)<fraction:lo=k
        else:hi=k
    event(walk_start+(arrive-walk_start)*(lo+hi)/2,'step_wood','A planted half-stride on the continuous walk to the curtain cord.',gain=-14,**({'trim':3} if n==4 else {}))
event(arrive,'step_wood','Her last foot settles before she pulls.',gain=-15)
fx('2.curtains','swish','The joined sleeve reaches the curtain cord.',word='closed',at=-.43,dur=.2,gain=-14)
fx('2.curtains','scrape','The cord and rings move under her pull.',word='closed',dur=.38,gain=-14)
fx('2.curtains','place','The two top-hung panels meet, then settle.',word='closed',at=.38,gain=-15)
for t in [.45,1.05,1.65]:fx('3.school','step_wood','The teenager leaves the breakfast table.',at=t,gain=-13)
fx('3.class','school_bell','The classroom transition.',gain=-13)
event(A['classChalkFire'],'zip','The chalk leaves the actual throwing hand after the wind-up.',gain=-12,dur=.18)
fx('3.seat','rustle','The friend turns toward his saved seat.',word='seat',gain=-12)
fx('3.lunch','scrape','His friend pushes the share of bread along the wood with his sleeve.',word='split',dur=.47,gain=-12)
event(A['feedPlace'],'place','The carrot leaves the hand exactly at ground contact.',gain=-12)
fx('3.ear','rustle','Tiny rabbit mouth and shoelace movement.',at=.45,gain=-13,dur=.25)
fx('3.ear','blip','A fond look at the black ear.',word='black',gain=-13)
event(A['glassDrop'],'plink','The glass leaves his supporting hand.',gain=-13)
event(A['glassHit'],'break','Glass contacts the floor after time resumes.',gain=-10)
event(A['glassHit']+.07,'debris','The visible glass fragments settle.',gain=-12,dur=.45)
event(A['bookTouch'],'paper','Fingers contact the book.',gain=-12)
event(A['bookRelease'],'rustle','He withdraws his hand; the released book waits.',gain=-12,dur=.2)
event(A['bookLand'],'place','The book drops the final centimeters onto the table.',gain=-12)
event(S['chalk']-.32,'zip','The teacher sends chalk through the classroom.',gain=-12,dur=.17)
event(A['chalkHit'],'bonk','Chalk taps his nose; the future sidestep is earned.',gain=-10)
fx('6.hands','place','Bowl reaches the washing counter.',word='bowl',at=.12,gain=-12)
fx('6.rule','tick','The warning lands, a subjective accent.',word='see',gain=-13)
fx('6.question','blip','His worried glance.',word='hiding',gain=-13)
fx('6.lock','clank','The visible latch slides into place.',word='lock',at=.12,gain=-12,f=410)
fx('7.locker','thud','The bully pushes the friend backward into the open locker.',word='shoved',gain=-11)
fx('7.book','place','The blue book contacts the floor.',word='floor',gain=-11)
fx('7.door','creak','The hinge starts its visible swing.',word='swung',gain=-12,dur=.35)
a=S['locker']
for off,sfx,why in [(A['lockerOpen']-a,'creak','His hand opens the stopped door; it waits again after release.'),(.90,'step_stone','He steps into the open doorway to reach the sleeves.'),(A['lockerGrip']-a,'rustle','Sleeve contact, then the whole body is pulled.'),(1.4,'step_stone','The hero braces and steps back.'),(1.82,'step_stone','He completes the pull into the aisle.'),(2.32,'paper','Hand contacts the fallen book.'),(A['lockerPlace']-a,'place','The book reaches the folded arms.'),(3.95,'step_stone','First step back beside his friend.'),(4.4,'step_stone','Second step into the safe position.'),(5.28,'clank','The empty locker slams after time returns.')]:event(a+off,sfx,why,gain=-12)
fx('8.friend','blip','The friend looks from the book to the red sleeve.',word='thought',gain=-13)
fx('8.secret','swish','A small evasive look from the hero.',at=.18,gain=-13,dur=.14)
fx('9.lunch','scrape','The sleeve-led push keeps the whole loaf on the same tabletop.',word='pushed',dur=.65,gain=-12)
fx('9.lunch','rustle','The boy leans forward and meets the loaf.',word='pushed',at=.40,dur=.24,gain=-14)
fx('9.why','chime','His sincere wish to protect the boy too.',word='protect',gain=-13)
fx('9.math','paper','The real hand lifts and hinges the cover open.',word='Then',at=.115,dur=.60,gain=-12)
fx('9.math','place','The blue cover lands on the table beside the revealed pages.',word='math',at=-.10,gain=-14)
fx('9.help','ding','He raises his hand with the right answer.',word='answer',gain=-12,note='E5')
fx('10.night','creak','The real doorway opens onto the night.',at=.15,gain=-13)
for off in [.45,1.2,1.95]:fx('10.night','step_stone','The hero moves toward his neighbor.',at=off,gain=-13)
fx('10.neighbor','rustle','The fallen villager struggles on the threshold.',at=.4,gain=-12)
for off in [.1,.65,1.25]:fx('10.mobs','step_grass','Zombies advancing through the gate, not a golem.',at=off,gain=-13)
fx('10.bow','creak','The skeleton visibly draws its bow.',at=.45,gain=-11,dur=.45)
a=S['elder'];event(a-1.2,'zip','The arrow launches on its authored travel frame.',gain=-13.5,dur=.2)
for off,sfx,why,kw in [(A['elderGrip']-a,'rustle','Collar contact.',{}),(1.05,'scrape','Continuous drag over the real doorstep.',{'dur':1.8}),(1.7,'step_stone','Hero backs through the opening.',{}),(2.5,'step_wood','His feet reach the indoor floor.',{}),(A['doorKick']-a,'whoosh_low','The toe catches the inward-opening door and follows it closed.',{'dur':.4}),(A['doorShut']-a,'thud','Door meets the jamb before the boot releases it, still in stopped time.',{}),(5.13,'hit','Arrow tip contacts the closed wood.',{'gain':-10}),(6.65,'scrape','First zombie scratches outside, after resumption.',{'dur':.3}),(7.45,'scrape','The other claw scrapes the exterior.',{'dur':.3}),(8.25,'scrape','Another unsuccessful scrape on the same door.',{'dur':.3})]:event(a+off,sfx,why,**({'gain':-12}|kw))
fx('12.thanks','rustle','The old man rocks forward and gets off the floor.',at=.25,gain=-13)
event(A['carrotPass'],'place','The carrot transfers from the folded sleeves to the receiving palm.',gain=-12)
fx('12.rabbit','chime','The carrot connects the rescued neighbor to the rabbit.',word='rabbit',gain=-14)
fx('12.mother','rustle','Mother checks the sleeve for scratches.',word='checked',gain=-12)
fx('12.lie','swish','He looks away on the ordinary explanation.',word='golem',gain=-13,dur=.13)
event(A['windowPull'],'scrape','The sleeves pull the lower sash down its tracks.',gain=-12,dur=.44)
event(A['windowShut'],'place','The lower rail lands, then the sleeves withdraw.',gain=-13)
fx('13.sound','step_stone','The crunch leads his wake-up; the narration names the sound a moment later.',at=.08,gain=-10)
fx('13.sound','rustle','He rises from the bed.',at=.75,gain=-12)
fx('13.white','gust','Air at the actual window, very low under the voice.',at=.5,dur=.5,gain=-16)
fx('13.beard','swish','Push into the bearded player face.',word='beard',gain=-13,dur=.16)
fx('13.kneel','step_stone','His repositioning step beside the rabbit.',at=.35,gain=-13)
fx('13.kneel','rustle','Knees bend and the white sleeve reaches down.',word='knelt',gain=-12)
fx('13.frost','crackle','Small ice growth at the feet; not flame.',word='Ice',gain=-12,dur=.5)
fx('13.frost','sparkle','The frost reaches the legs.',word='legs',gain=-12,dur=.3)
event(A['rabbitLift'],'rustle','The supporting palm scoops the rabbit up continuously.',gain=-11,dur=.5)
fx('14.ear','blip','The living little nose and familiar black ear.',word='nose',gain=-13)
fx('14.out','creak','The hero opens and crosses his actual doorway.',at=.15,gain=-12)
for off in [.45,.95,1.45]:fx('14.out','step_stone','A visible running step out to the path.',at=off,gain=-13)
fx('14.saw','swish','The man turns at the shout.',word='looked',gain=-12,dur=.16)
# Actual 30 fps landing frames from the same distance/stride used by the picture.
for step in A['chaseSteps']:
    event(step['t'],'step_stone','A distance-driven half-stride of the '+step['who']+'.',gain=-16,pan=step['pan'])
fx('14.secret','blip','His worry is exposure, not a cooldown.',word='see',gain=-14)
fx('14.stay','rustle','The supported rabbit remains in the white arm.',word='rabbit',gain=-13)
fx('15.hand','whoosh','The free-arm wind-up.',word='threw',gain=-12,dur=.22)
fire=word('15.blocks','shot');event(fire,'zip','The first ice block leaves the throwing hand.',gain=-10,dur=.16)
event(fire+.36,'break','The first block contacts and opens the stone wall.',gain=-10)
event(fire+.42,'debris','Visible stone and ice fragments fall from the hole; tucked under the spoken line.',gain=-14,dur=.65)
event(S['counter']-.13,'zip','Second ice projectile travels toward his face.',gain=-11,dur=.09)
event(S['counter']-.067,'zip','Third ice projectile follows, then both stop.',gain=-12,dur=.06)
fx('15.chalk','blip','The chalk lesson is remembered before the counter.',word='remembered',gain=-13)
a=S['counter']
event(A['rockPickup'],'scrape','The palm grips the loose rock; it starts moving only under contact.',gain=-13)
event(A['rockPlace'],'place','The rock reaches the ground and is released, not thrown.',gain=-13)
for step in A['counterSteps']:
    event(step['t'],'step_stone','Ground contact during '+step['who']+'.',gain=-14)
event(a+5.23,'break','Second ice block hits the old position.',gain=-11)
event(a+5.32,'debris','Third ice block breaks and shards settle.',gain=-13)
hit=word('17.hit','caught');land=word('17.fall','back')-.04
for t,sfx,why in [(hit-.1,'bonk','The planted toe catches the visible rock, no face hit.'),(hit+.35,'rustle','The stumble starts.'),(A['spinStart'],'swish','He spins in the failed recovery attempt.'),(land,'thud','The supported back landing.'),(land+.12,'debris','A little ground dust from the landing.'),(A['rabbitTake'],'rustle','Both hands lift the supported living rabbit.'),(word('17.rabbit','lifted')+1.05,'chime','The transfer is complete and the nose still twitches.')]:event(t,sfx,why,gain=-11 if sfx=='thud' else -13)
event(word('17.rabbit','lifted')+1.53,'step_stone','He takes a real backwards step with the supported rabbit, giving the man room to rise.',gain=-14)
fx('17.breathe','blip','A small relief accent on the living nose.',word='twitching',gain=-14)
fx('18.look','rustle','He rubs his head and gets onto one knee.',word='rubbed',gain=-12,dur=.35)
fx('18.look','step_stone','His knee meets the path during the continuous rise.',word='knee',gain=-13)
fx('18.home','swish','Mother watching from the established doorway.',word='mother',gain=-13,dur=.16)
fx('18.power','sting','Recognition of the power, not another attack.',word='ability',gain=-14)
fx('18.found','riser','A short rise into the prince recognition.',at=C['18.found']['end']-C['18.found']['start'],dur=.7,gain=-13)
fx('18.prince','boom','The one final reveal: prince. No subscribe cue or sequel promise.',word='prince',gain=-7)
# V2 phone-band measurements, AFTER retiming: lift only masked steps, never the whole effects bus.
foot_trims={127.13: 5.5, 127.53: 5.0, 127.93: 1.5, 128.6: 2.5, 128.7: 2.0, 128.83: 1.5, 130.13: 4.5, 130.23: 5.5, 131.0: 2.0, 132.07: 4.0, 132.1: 4.5, 132.53: 4.5, 132.57: 4.5, 133.33: 3.5, 133.6: 1.5, 134.07: 4.5, 135.17: 7.0, 135.93: 3.5, 136.27: 3.5, 137.13: 2.0, 137.47: 2.0, 138.23: 3.0}
for entry in FX:
    if entry['sfx']=='step_stone' and 'at' in entry:
        t=round(C[entry['cue']]['start']+entry['at'],2)
        if t in foot_trims:entry['trim']=foot_trims[t]
sheet={'film':'in-this-town-five-seconds','README':'Exact approved voice-00 narration, supplied InThisTownMusic.aac, measured action contacts. Regenerate with write-sound.py only after timing/animation changes. No procedural music fallback.','music':{'track':'Topics/InThisTown/InThisTownMusic.aac','trackFrom':0,'gain':-17,'duck':2,'sections':[{'from':c,'mood':m,'gain':g,'why':why} for c,m,g,why in sections]},'beds':beds,'bedMutes':[{**anchor(a),'dur':5,'why':f'{name}: the outside world is silent for the same 150 frames as its motion.'} for name,a in S.items()],'sfx':FX}
(P/'sound.json').write_text(json.dumps(sheet,indent=2)+'\n');print(f'{len(sections)} recorded-track level sections; {len(beds)} beds; {len(FX)} action effects; 7 five-second ambience mutes.')
