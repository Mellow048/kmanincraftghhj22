"""Film-scoped authored shot list. Never touches another film. Re-run only to regenerate these 18 camera files."""
from pathlib import Path
P=Path(__file__).resolve().parent
# id, zone, camera, why. Stages share continuous global trajectories between action cuts.
scenes=[
('Five seconds, and nobody knows', 'Intro', [
('1.town','class',"push([1.15,1.35,.65],3.2,2.8,0,5,46)","Start inside the stopped classroom: chalk and a book hang still while the red-shirted teenager walks between them. Not a title card."),
('1.me','class',"push([1.2,1.4,1.1],1.9,1.65,5,3,38)","Move around his living eyes against the completely frozen teacher and classmates; the world clock, not just their legs, is held."),
('1.secret','class',"push([.6,1.2,1.5],4.4,4,165,6,52)","Widen enough to show him quietly passing the suspended book and returning beside his own seat."),
('1.friend','class',"push([-2.4,1.28,1.25],1.9,1.65,175,5,38)","His villager friend, still unaware. At precisely frame 150 the tiny idle movements return; the boy has not been seen using the power.")]),
('She closed the curtains first','MotherStory',[
('2.mother','kitchen',"push([-.05,1.25,.0],4.9,4.5,10,6,48)","Put the long-nosed white-robed mother and the red-shirted player face in one frame: their difference is immediately readable."),
('2.adopted','kitchen',"push([-1.08,1.16,-.1],2.8,2.6,15,9,44)","A memory of her folded arms supporting the same child as a small baby. No age is invented."),
('2.where','kitchen',"push([.8,1.46,.75],1.8,1.6,-35,3,38)","His question, on his face; the mother looks away in the background instead of answering."),
('2.answer','kitchen',"({from:[-1.8,1.85,2.6],to:[-1.55,1.9,2.3],target:[-.9,1.05,-.4],targetPath:[0,.25,.5,.75,1].map(k=>add(curtainsMother(cue(id).start+(cue(id).end-cue(id).start-1/30)*k).position,[0,1.05,0])),fov:49,ease:'linear' as const})","Her head leads the evasive turn, then her feet carry her to the window. Track the whole walk rather than cutting from one standing position to another."),
('2.curtains','kitchen',"({from:[-.65,2.08,1.25],to:[-.40,2.0,1.1],target:[1.85,1.5,-2.07],targetTo:[1.88,1.5,-2.07],fov:50,ease:'inOutSine' as const})","Keep sleeves, cord, rail and cloth in frame. She reaches, catches the cord, pulls decisively on closed, then releases as the top-hung panels settle and the window light dims.")]),
('A seat, a loaf, one black ear','SchoolDay',[
('3.school','kitchen',"push([-.2,1.15,-.3],4.8,4.4,10,6,48)","Breakfast first: the teenager leaves the table for the door, showing where the school-day transition begins."),
('3.class','class',"({from:[4.15,3.10,2.9],to:[3.9,2.9,2.65],target:[-.3,1.15,-.7],targetTo:[-.35,1.15,-1.5],fov:57,ease:'linear' as const})","Look diagonally toward the board with the mixed class below it. Keep the teacher and the raised chalk in frame through the backward wind-up, fast release and travel to the desk. No throw behind the camera."),
('3.seat','class',"({from:[-3.9,2.4,.25],to:[-3.6,2.24,.3],target:[-1.2,1.3,1.25],fov:52,ease:'inOutSine' as const})","Stack the two adjoining desks in depth. His green-robed friend turns toward the seat he has saved."),
('3.lunch','lunch',"push([.02,1.04,-.02],4.1,3.85,-90,22,49)","His sleeve pushes a share of the bread across the wood; the red-shirted boy leans forward to receive it. The other share stays on the friend's side."),
('3.rabbit','street',"push([1.25,.8,1.2],3.7,3.3,40,13,46)","The two friends bend to the neighbor's rabbit. See the carrot leave the boy's hand and reach the ground."),
('3.ear','street',"push([1.28,.4,1.1],1.65,1.45,135,15,42)","The rabbit's unmistakable black ear and twitching nose, then its mouth at his pale shoelace: an affectionate identification, not a disposable animal.")]),
('The first stop','GlassDiscovery',[
('4.first','kitchen',"push([.35,1,.8],3.3,2.8,-15,9,42)","The glass is still high beside his hand. See the release and the beginning of the fall, not just a floating prop."),
('4.stop','kitchen',"push([.2,.67,.97],1.65,1.4,-15,14,40)","Go down with the glass until it stops above the floor; separated water cubes hang with it."),
('4.everything','kitchen',"push([-.3,1.35,-.3],4.3,4.0,14,5,48)","Mother, clock and water in the same geography. Nothing in the background blinks, flickers or drifts during the stop."),
('4.five','kitchen',"push([.18,.46,.97],2.4,2.1,5,24,44)","Keep the glass and floor together for the last beats of the exact 150-frame stop. It resumes its fall and breaks on the tiles.")]),
('Touch it, then get out of its way','TouchDemo',[
('5.touch','kitchen',"push([.25,1.12,.65],4.0,3.65,15,8,46)","He reaches, takes the hovering book and shifts it while his hand remains in contact. The untouched mother and room remain frozen."),
('5.release','kitchen',"push([.25,.98,-.02],2.4,2.15,125,20,44)","The fingers withdraw and the book waits in the air above the table. A deliberate silent hold completes all five seconds; then it drops the final few centimeters."),
('5.chalk','class',"({from:[3.65,2.75,2.7],to:[2.95,2.4,2.2],target:[.3,1.12,-.7],targetTo:[.9,1.34,.1],fov:56,ease:'linear' as const})","Keep both ends of the throw in the same diagonal view: chalk in the raised hand, release and fast flight before the five-second stop. Move closer only after the launch is visible."),
('5.proud','class',"push([1.2,1.46,.9],1.8,1.6,170,3,36)","Proud eyes right over the frozen chalk. He never steps away: the mistake is visible before the punchline."),
('5.bonk','class',"push([1.2,1.46,.78],2.2,1.95,165,4,40)","Hold the same spatial relationship through the exact fifth second. Chalk taps his nose, powder scatters, his head recoils.")]),
('Who was she hiding me from?','MotherStory',[
('6.told','kitchen',"({from:[1.9,1.95,3.6],to:[1.65,1.9,3.4],target:[-.65,1.12,-.8],fov:49,ease:'inOutSine' as const})","The boy gestures about the glass across the kitchen; mother is actually washing the bowl before she hears him. Her head stops first, before she sets it down."),
('6.hands','kitchen',"push([-1.70,1.17,-1.25],3.35,3.18,10,12,46)","Stay on the same joined sleeves and bowl through the lowering, countertop contact, release and her turn toward him. The bowl never travels independently of its support."),
('6.rule','kitchen',"push([-1.16,1.48,-1.3],2.15,1.99,50,5,40)","She has finished setting the bowl down. Now the white-robed mother turns toward the boy and gives the warning, rather than holding a generic idle pose."),
('6.question','kitchen',"push([.8,1.46,.75],1.85,1.65,-110,3,38)","His eyes search her face. No invented explanation answers the question."),
('6.lock','kitchen',"push([-1.65,1.3,-1.8],2.9,2.55,15,5,43)","Track her last steps to the actual door; the latch slides home rather than cutting straight to an already locked door.")]),
('An inch from his nose','LockerAction',[
('7.locker','hall',"push([.15,1.08,-.4],6.4,5.8,0,8,50)","Two player bullies crowd the green-robed friend into a hollow locker. The red hero is approaching from the left of the same hallway."),
('7.book','hall',"push([-.55,.35,.28],2.65,2.3,15,20,46)","Follow his blue book down to the floor and keep the nearby shoes in frame; its pickup position is established before the rescue."),
('7.door','hall',"push([.05,1.02,-.35],4.0,3.65,24,12,50)","The blue door visibly swings from its left hinge toward the villager's nose. The bully's arm supplies the wind-up."),
('7.stop','hall',"({from:[.45,2.50,-.55],to:[.42,2.43,-.55],target:[0,1.42,-.63],fov:47,ease:'inOutSine' as const})","The blue panel stops an inch from his nose. Then the hero visibly reaches the near hinge and swings the touched door clear; the untouched bully, background children and lights stay frozen.")]),
('An empty locker','LockerAction',[
('8.clear','hall',"follow(id,t=>add(lockerMotion(t).friend,[-.1,.95,.32]),4.9,-60,10,50)","After opening and releasing the door, he grips the joined sleeves and pulls the friend forward through the opening, around the panel and into the aisle. No diagonal through the locker wall."),
('8.book','hall',"push([-1.2,.83,.48],3.65,3.35,20,18,49)","Knees bend and the hand goes down to the established blue book, then raises it into the friend's folded arms."),
('8.beside','hall',"follow(id,t=>add(lockerMotion(t).hero.position,[.35,1.1,0]),4.5,10,8,48)","The book is released and stays with the frozen friend. Show the hero actually taking his last two steps back beside him."),
('8.bang','hall',"push([-.15,1.05,-.5],5.7,5.2,8,8,50)","At frame 150 time returns: the released open door resumes its closing swing and bangs shut on an empty locker. Both rescued figures are still beside it."),
('8.friend','hall',"push([-.95,1.42,.16],2,1.8,-45,4,38)","The friend's puzzled glance moves from the blue book to the red sleeve. He has a reasonable, wrong explanation."),
('8.secret','hall',"push([-1.86,1.46,.16],2,1.8,60,3,38)","A tiny look away from the hero: he accepts the ordinary explanation instead of bragging.")]),
('He protected me, too','Lunch',[
('9.lunch','lunch',"push([.02,1.04,-.02],4.1,3.85,-90,22,49)","The same table, but a whole loaf: the friend leans into a real sleeve-led push and the boy reaches forward to meet it. No loaf floats between the actors."),
('9.why','lunch',"push([.6,1.32,-.78],2.25,2.10,-5,8,41)","He releases the loaf and straightens, then leans into his sincere wish to protect the boy too. The generosity and the hesitation belong to the same performance."),
('9.math','lunch',"({from:[-2.8,2.15,-1.55],to:[-2.5,1.86,-1.4],target:[-.61,.99,.2],targetTo:[-.43,1.26,.54],fov:44,ease:'inOutSine' as const})","The boy's hand hinges the blue cover open, revealing the actual multiplication exercise. Lift the view with his understanding and small nod, while his friend explains across the table."),
('9.help','class',"push([0,1.35,1.25],2.2,1.95,125,4,44)","Back at the recognizable middle desk, his hand rises and his face changes: he has the answer without stopping time.")]),
('The arrow left first','RescueAction',[
('10.night','street',"follow(id,t=>add(rescueMotion(t).hero.position,[0,1.3,0]),3.7,0,6,44)","Warm doorway against the blue street. He hears the shout and steps out toward the neighbor, not straight into a new danger pose."),
('10.neighbor','rescue',"push([0,.4,-.85],4.6,4.3,35,48,50)","The old villager has fallen immediately outside the open threshold; show the small real distance to safety."),
('10.mobs','rescue',"push([0,1.2,3.45],4.1,3.7,180,5,50)","The existing two zombie models come through the gate, one a little behind the other. Their full bodies advance with distance-driven feet."),
('10.bow','rescue',"push([-.12,1.15,8.25],3.6,3.35,170,5,46)","Behind them, the existing skeleton raises and draws its bow. Leave space in front of the arrowhead for the flight."),
('10.arrow','rescue',"({from:[1.4,1.9,8.0],to:[1.2,1.75,7.7],target:[0,.8,-.75],fov:44,ease:'linear' as const})","A side-long view down the lane shows the red-shirted runner and the arrow's fast travel toward the old man's chest.")]),
('Over the doorstep','RescueAction',[
('11.stop','rescue',"push([0,.72,-.95],2.35,2.1,45,28,45)","The arrow stops just above the old villager's chest; its feathers, head and small remaining gap all read in the same frame."),
('11.drag','rescue',"({from:[.45,2.3,2.35],to:[.35,1.9,1.85],target:[-.2,.65,-2.1],fov:55,ease:'inOutSine' as const})","A wide enough view to see the hand reach, collar contact and the whole villager slide continuously over the visible sill."),
('11.door','rescue',"({from:[1.5,1.8,-4.6],to:[1.3,1.65,-4.4],target:[-.2,.8,-2.6],fov:55,ease:'inOutSine' as const})","From inside the same opening: the foot catches the inward-opening door and stays on the panel all the way through its closing arc. He withdraws only when it meets the frame; released objects do not move during a stop."),
('11.hit','rescue',"({from:[-.8,.98,-1.53],to:[-.74,.94,-1.53],target:[0,.7,-1.68],fov:54,ease:'inOutSine' as const})","Outside again, still the same door. Exactly five seconds end, and the arrow completes the short remaining flight into the wood."),
('11.safe','rescue',"push([-.2,.58,-3.98],2.35,2.15,78,22,50)","Inside the protected room, the old villager breathes and the boy stays beside him. Keep the doorway behind the lens, not between us and their faces.")]),
('For the rabbit','RescueAction',[
('12.thanks','rescue',"({from:[1.95,1.8,-2.6],to:[1.75,1.7,-2.65],target:[-.15,.95,-3.1],fov:55,ease:'inOutSine' as const})","The old man rocks forward, rises from the floor and offers the carrot on his joined sleeves. The boy steps closer and reaches to receive it; neither actor resets at the cut."),
('12.rabbit','rescue',"push([-.1,1.06,-2.8],1.55,1.35,90,8,42)","The carrot passes across the gap between them, with the old neighbor's long nose in the background. The black-eared rabbit has an owner."),
('12.mother','bedroom',"push([-4.9,1.3,-3.7],2.7,2.4,0,5,48)","Home inside the lit doorway: mother leans toward the sleeve he holds out and checks him for scratches."),
('12.lie','bedroom',"({from:[-4.55,2.5,-2.25],to:[-4.5,2.4,-2.25],target:[-4.55,1.42,-3.35],fov:48,ease:'inOutSine' as const})","The boy looks away on the golem excuse as mother starts toward the window behind him. Keep her real walk visible; do not materialize a golem that did not perform this rescue."),
('12.window','bedroom',"({from:[-3.95,1.65,-.5],to:[-3.85,1.62,-.65],target:[-3.5,1.40,-2.13],fov:46,ease:'inOutSine' as const})","Her sleeves meet the lower sash handle, draw it down through the real window tracks and withdraw after the rail lands. The curtain settles; this is the same clear window he looks through later.")]),
('A man with no lantern','ChaseAction',[
('13.sound','bedroom',"({from:[-6.95,2.25,-5.15],to:[-6.65,2.05,-4.7],target:[-5.5,1.0,-4.45],targetPath:[0,.25,.5,.75,1].map(k=>add(homeHero(cue(id).start+(cue(id).end-cue(id).start-1/30)*k).position,[0,1.02,0])),fov:58,ease:'linear' as const})","From beside the bed: a crunch makes him rise and go to the window. The same bed and real doorway remain around him."),
('13.white','street',"({from:[-3.9,1.82,-2.35],to:[-3.82,1.8,-2.3],target:[1.3,1.3,1.2],fov:43,ease:'inOutSine' as const})","His actual view through the clear panes: a white-clothed player stands beside the rabbit outside. The window's timber edges frame the discovery."),
('13.beard','street',"push([1.3,1.55,1.2],2.1,1.8,-20,3,38)","A clear bearded player face, white sleeves and empty free hand. No villager nose and no lantern are substituted."),
('13.kneel','street',"push([1.45,.9,1.4],3.6,3.2,20,10,47)","Show knees bend and the man lower his hand all the way beside the rabbit's feet."),
('13.frost','street',"push([2.0,.4,1.65],2.05,1.85,25,24,46)","Ice grows outward from the lowered fingers around the rabbit's legs, never across its living face."),
('13.dinner','street',"follow(id,t=>add(v(manMotion(t).position,carriedRabbit(t),.5),[0,.65,0]),2.25,0,12,56)","Stay with the supported rabbit as his arm lifts it from the ground and he straightens. The food line lands on the beard, not on an empty yard.")]),
('I could not leave it','ChaseAction',[
('14.ear','street',"follow(id,t=>add(carriedRabbit(t),[0,.38,.15]),1.7,10,7,39)","A close look at the same black ear and twitching nose, held above the man's supporting forearm."),
('14.out','street',"push([-4.5,1.05,-1.3],5.7,5,15,9,48)","Keep the real doorway and path together: he runs across the room, through the opening and down onto the street before calling out."),
('14.saw','street',"push([2.1,1.55,1.2],1.9,1.65,-25,3,38)","The bearded man turns his eyes toward the shout. Recognition is withheld; he chooses to run."),
('14.run','street',"follow(id,t=>add(manMotion(t).position,[0,1.05,0]),3.8,65,7,46)","The rabbit stays cradled under one arm as the man plants his first step and accelerates east."),
('14.follow','street',"follow(id,t=>add(v(counterHero(t).position,manMotion(t).position,.55),[0,1,0]),6.5,60,9,50)","Both runners pass the same gateposts in one geography. Their actual traveled distance drives the strides."),
('14.secret','street',"follow(id,t=>add(counterHero(t).position,[0,1.46,0]),2.0,100,4,40)","Track beside his face while he runs. The worry is being discovered, not an invented cooldown."),
('14.stay','street',"follow(id,t=>add(carriedRabbit(t),[0,.36,.12]),1.85,80,5,40)","The small living nose under the white arm supplies his answer. Keep the chase moving behind it.")]),
('Remember the chalk','ChaseAction',[
('15.hand','street',"follow(id,t=>add(manMotion(t).position,[0,1.25,0]),3.1,125,7,44)","Side/rear three-quarter: see the free arm wind up while the other continues to support the rabbit."),
('15.blocks','street',"follow(id,t=>t<FIRST_FIRE?add(manMotion(t).position,[0,1.05,0]):t<FIRST_IMPACT?iceAt(t,0):FIRST_WALL,4.6,35,12,51)","The first ice block crosses the path at speed, with the white arm, red pursuer and stone wall all spatially connected."),
('15.wall','street',"push(FIRST_WALL,3.7,3.3,18,10,46)","Reveal the real hole punched through the wall, with stone and ice fragments still dropping. Do not merely hide the intact wall."),
('15.close','street',"follow(id,t=>add(counterHero(t).position,[.4,1.25,0]),3.2,35,13,48)","Come close to the approaching second ice block and the hero; the loose rock is already on the ground beside his route."),
('15.chalk','street',"follow(id,t=>add(counterHero(t).position,[.1,1.46,0]),1.9,65,3,40)","Match the earlier nose-and-chalk framing with ice. He remembers before acting; the second and third blocks freeze on the shared clock, not in slow motion.")]),
('Five seconds to move','ChaseAction',[
('16.stop','street',"push(add(ROCK_START,[0,.45,0]),3.6,3.3,-145,28,50)","Show him bend, make contact with the rock and lift it. The bearded man, rabbit, projectiles and drifting dust remain absolutely frozen."),
('16.front','street',"follow(id,t=>add(v(counterHero(t).position,MAN_FREEZE,.4),[0,1,0]),5.2,100,16,50)","Track the full run around the frozen man's side. The path passes outside his body; no cut substitutes for getting in front."),
('16.throw','street',"push(add(ROCK_END,[0,.46,0]),3.15,2.85,35,23,49)","Despite the historic cue name, this is the approved placement: hand lowers the rock into the path, releases it and visibly withdraws. Nothing is thrown at a face."),
('16.side','street',"push(add(MAN_FREEZE,[.6,1,0.6]),5.4,5,25,10,50)","Keep the frozen man and old projectile lane in frame while the hero takes the entire sidestep out of it.")]),
('The empty space, and the rabbit','ChaseAction',[
('17.resume','street',"push(add(HERO_FREEZE,[1.25,.95,.45]),5.8,5.3,25,14,50)","Exactly 150 frozen frames finish. Ice, breath and background dust resume together; the boy is already clear of the old lane."),
('17.ice','street',"cam.push({on:add(HERO_FREEZE,[-.2,.35,0]),onTo:add(ROCK_END,[-.4,.65,0]),dist:5.1,to:4.8,yaw:28,pitch:18,fov:53})","Move from the scattering ice to the man's checking step in one view. The shot does not sit on empty ground after the shards have settled."),
('17.hit','street',"push(add(ROCK_END,[0,.20,0]),2.1,1.85,25,20,46)","Foot, rock, contact: the next planted toe catches the placed rock. No face injury and no unexplained fall."),
('17.fall','street',"follow(id,t=>add(v(manMotion(t).position,counterHero(t).position,.2),[0,.80,0]),5.35,130,22,52)","The caught foot pitches his weight forward through two failed recovery steps. He twists half around to shield the rabbit, drops under gravity, lands shoulder/back first and skids; no upright full-circle pirouette."),
('17.rabbit','street',"follow(id,t=>add(v(counterHero(t).position,rabbitAt(t),.55),[0,.6,0]),3.7,35,23,49)","The hero walks the last step, bends and lifts the rabbit from the supporting palm into both hands. Follow the entire transfer; then he takes a real step back so the injured man has space to rise."),
('17.breathe','street',"follow(id,t=>add(rescuedRabbit(t),[0,.35,0]),1.8,100,8,40)","Its black ear and twitching nose fill the frame. Alive, supported, no ice over the face.")]),
('The prince of our village','ChaseAction',[
('18.look','street',"follow(id,t=>add(manMotion(t).position,[0,.80,0]),4.3,32,24,52)","The man rubs his head, then raises his body from his back onto one knee. Keep the whole recovery in view before the recognition close-up."),
('18.home','street',"push([-5,1.47,-1.82],2.7,2.35,65,4,41)","Mother is still in their own warm doorway, watching down the same road. Her reaction pays off the curtains and lock."),
('18.power','street',"follow(id,t=>add(manMotion(t).position,[0,1.1,0]),2.45,55,4,39)","Now kneeling toward the boy, the beard is clear as he recognizes a time-stop ability. No new magic is added."),
('18.found','street',"follow(id,t=>add(counterHero(t).position,[0,1.46,0]),2.05,-145,4,39)","The child's eyes register that he has been sought, with the rescued rabbit still in his hands."),
('18.prince','street',"follow(id,t=>add(counterHero(t).position,[0,1.37,.08]),2.25,-145,4,40)","The prince line lands on the boy's stunned face. Hold the small reaction, then hard black; no subscribe sign, sequel promise or added spoken line.")]),
]
imports='''import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";
'''
def args_of(call):
    inner=call[call.index('(')+1:-1]; out=[];level=0;start=0
    for i,ch in enumerate(inner):
        if ch in '([{':level+=1
        elif ch in ')]}':level-=1
        elif ch==',' and level==0:out.append(inner[start:i].strip());start=i+1
    out.append(inner[start:].strip());return out

def explicit_camera(camera):
    if camera.startswith('push('):
        args=args_of(camera);args+=['0','6','40'][max(0,len(args)-3):]
        on,dist,to,yaw,pitch,fov=args[:6]
        return f'cam.push({{on:{on},dist:{dist},to:{to},yaw:{yaw},pitch:{pitch},fov:{fov}}})'
    if camera.startswith('follow('):
        args=args_of(camera);_,fn,dist,yaw,pitch,fov=args
        return f'cam.push({{on:({fn})(cue(id).start),onTo:({fn})(cue(id).end-1/30),dist:{dist},to:({dist})-.08,yaw:{yaw},pitch:{pitch},fov:{fov}}}), ...{camera}'
    if camera.startswith('({'):
        return camera.replace('from:','\n    from:').replace('target:','\n    target:').replace('to:','\n    to:')
    return camera

for n,(title,default,shots) in enumerate(scenes,1):
    items=[]
    for ident,zone,camera,note in shots:
        stage=default
        if ident=='3.school':stage='MotherStory'
        if ident=='3.lunch':stage='Lunch'
        if ident in ('3.rabbit','3.ear'):stage='FeedRabbit'
        if ident in ('5.chalk','5.proud','5.bonk'):stage='ChalkLesson'
        if ident=='9.help':stage='SchoolDay'
        if ident in ('12.mother','12.lie','12.window'):stage='MotherChecks'
        prop=' id={id}' if stage in ('MotherStory','SchoolDay','Lunch','FeedRabbit','MotherChecks','ChaseAction') else ''
        if ident in ('12.thanks','12.rabbit'):prop+=' thanks'
        import json
        look='overworld-night' if n>=10 else 'overworld-day'
        energy=''
        if ident in ('14.run','14.follow','14.secret','15.blocks'):energy='handheld:.009, '
        if ident=='17.fall':energy="impacts:[{at:LAND-cue(id).start,amp:.055,dur:.20}], "
        item=f'''  (()=>{{const id={json.dumps(ident)};return {{cue:{json.dumps(ident)},zone:{json.dumps(zone)},look:{json.dumps(look)} as const,
    ...{explicit_camera(camera)},
    {energy}note:{json.dumps(note)},
    stage:(local:number)=><{stage} t={{Math.round((cue(id).start+local)*30)/30}}{prop}/>,
  }};}})(),'''
        items.append(item)
    (P/f'scene{n}.tsx').write_text(imports+('import { curtainsMother } from "./domestic-motion";\n' if n==2 else '')+f'\n/** Beat {n}: {title}. Camera cuts do not reset the underlying performance. */\nexport const scene{n}=storyScene(timing,{{\n id:"scene{n}",title:{json.dumps(title)},shots:[\n'+'\n'.join(items)+'\n]});\n')
film='''import { defineFilm } from "../../engine";
import { timing, BLACK_AT } from "./kit";
import { World } from "./world";
'''+''.join(f'import {{ scene{i} }} from "./scene{i}";\n' for i in range(1,19))+'''
/** Owner-approved STORY: same teenage hero, a secret five-second power, and a prince recognition.
 * The owner approved the short V2 motion/background proof and authorized this full revision.
 * Approval of the finished full-length picture remains a separate owner judgment.
 * The narration is exact Draft 2 plus the separately approved trip revision.
 * Default full-film limits, NOT cut:"short". This ending has its own scoped owner exception.
 */
export const film=defineFilm({
 id:"in-this-town-five-seconds",
 title:"In This Town, I Was the Only One Who Could Stop Time for Five Seconds",
 topic:"in-this-town",
 fps:30,width:1080,height:1920,
 look:"overworld-day",
 audio:{src:"audio/in-this-town-five-seconds/mix.mp3"},
 captions:{words:timing.words,y:.72},
 cutToBlackAt:BLACK_AT,
 World,
 scenes:['''+','.join(f'scene{i}' for i in range(1,19))+'''],
});
'''
(P/'film.tsx').write_text(film)
print('Wrote 18 scenes, 91 authored shots, full-film configuration. Authored mix wired in.')
