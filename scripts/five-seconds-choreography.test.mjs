import test from 'node:test';
import assert from 'node:assert/strict';
import {loadFilm} from './five-seconds-pure.mjs';
const m=loadFilm('motion'),p=loadFilm('performance'),h=loadFilm('home-motion'),l=loadFilm('school-motion'),r=loadFilm('rescue-motion'),c=loadFilm('chase-motion');
const {at,cue,STOP,STOPS,worldFrame,activeStop}=loadFilm('timeline');
const near=(a,b,eps=.012)=>assert.ok(m.distance(a,b)<=eps,`${JSON.stringify(a)} vs ${JSON.stringify(b)} = ${m.distance(a,b)} > ${eps}`);
const frames=(a,b)=>Array.from({length:Math.max(0,Math.floor(b*30)-Math.ceil(a*30)+1)},(_,i)=>(Math.ceil(a*30)+i)/30);
const boundary=(fn,t,eps=.012)=>near(fn(t-1e-7),fn(t+1e-7),eps);

test('all seven exact 150-frame stops keep the global world clock fixed',()=>{
 for(const s of STOPS){assert.equal(s.end-s.start,150);const f=Array.from({length:150},(_,i)=>s.start+i);assert.equal(new Set(f.map(worldFrame)).size,1);for(const n of f)assert.equal(activeStop(n/30).id,s.id);assert.notEqual(activeStop(s.end/30)?.id,s.id);}
});
test('untouched man, rabbit, projectiles and bow retain their exact frozen states',()=>{
 const f=frames(STOP.counter.a,STOP.counter.b-1/30);
 for(const fn of [m.manMotion,c.strangerPose,c.carriedRabbit,c.motherGazeTarget,t=>c.iceAt(t,1),t=>c.iceAt(t,2)])assert.equal(new Set(f.map(t=>JSON.stringify(fn(t)))).size,1);
 const e=frames(STOP.elder.a,STOP.elder.b-1/30);for(const fn of [m.rescueArrow,r.bowState,r.zombiesAt])assert.equal(new Set(e.map(t=>JSON.stringify(fn(t)))).size,1);
});
test('glass starts in the left hand, then gravity itself freezes and resumes',()=>{
 for(const t of frames(cue('4.first').start,h.GLASS_DROP-1/30)){const q=h.glassState(t);near(q.cup,m.add(m.handWorld(h.GLASS_ROOT,h.GLASS_YAW,.95,q.pose,-1),[0,-.14,0]),1e-8);}
 boundary(t=>h.glassState(t).cup,h.GLASS_DROP);
 const f=frames(STOP.glass.a,STOP.glass.b-1/30);assert.equal(new Set(f.map(t=>JSON.stringify(h.glassState(t).cup))).size,1);
 assert.ok(!h.glassState(h.GLASS_HIT-.001).broken);assert.ok(h.glassState(h.GLASS_HIT+.001).broken);
});
test('the demonstration book waits untouched, follows the hand, then waits after release',()=>{
 boundary(t=>h.touchState(t).book,h.BOOK_TOUCH);boundary(t=>h.touchState(t).book,h.BOOK_RELEASE);
 const initial=h.touchState(STOP.touch.a).book,placed=h.touchState(h.BOOK_RELEASE).book;
 for(const t of frames(STOP.touch.a,h.BOOK_TOUCH-1/30))near(h.touchState(t).book,initial,1e-8);
 for(const t of frames(h.BOOK_TOUCH,h.BOOK_RELEASE-1/30)){const q=h.touchState(t);near(q.book,m.add(m.handWorld(q.position,0,.95,q.pose),[0,-.055,0]),1e-8);}
 for(const t of frames(h.BOOK_RELEASE,STOP.touch.b-1/30))near(h.touchState(t).book,placed,1e-8);
});
test('feeding carrot is hand-driven down to the ground, without a transfer pop',()=>{
 for(const t of frames(cue('3.rabbit').start,h.CARROT_SET-1/30)){const q=h.feeding(t);near(q.carrot,m.add(m.handWorld(h.FEED_ROOT,0,.95,q.pose),[0,-.13,0]),1e-8);}
 boundary(t=>h.feeding(t).carrot,h.CARROT_SET);near(h.feeding(cue('3.ear').end).carrot,h.CARROT_GROUND,1e-8);
});
test('actual joined sleeves follow the sash handle until the window rail lands',()=>{
 for(const t of frames(h.SASH_DOWN,h.SASH_CLOSED+.07)){const q=h.motherCheck(t);near(m.sleevePoint(q.position,q.yaw,.96,q.arm,q.offset,q.lean,0),h.windowState(t).handle,1e-7);assert.ok(Math.hypot(...q.offset)<.33,'Sleeves detached too far from the body');}
 assert.equal(h.windowState(h.SASH_DOWN-.01).open,1);assert.equal(h.windowState(h.SASH_CLOSED+.01).open,0);
});
test('locker rescue holds a real cuff contact for the entire pull, with grounded hips',()=>{
 for(const t of frames(m.LOCKER_GRAB,STOP.locker.a+1.93)){const q=l.lockerState(t);near(m.handWorld(q.hero.position,q.yaw,.95,q.pose),q.target);assert.ok(q.pose.bodyY<.025);}
 for(const t of frames(STOP.locker.a,m.LOCKER_OPEN_START))assert.equal(m.lockerMotion(t).door,m.LOCKER_HOLD);
 for(const t of frames(m.LOCKER_OPEN_END,STOP.locker.b-1/30))assert.equal(m.lockerMotion(t).door,m.LOCKER_CLEAR);
});
test('hero opens the touched door; released panel and untouched bully then wait',()=>{
 for(const t of frames(m.LOCKER_OPEN_START,m.LOCKER_OPEN_END)){const q=l.lockerState(t);near(m.handWorld(q.hero.position,q.yaw,.95,q.pose),l.lockerDoorContact(t),1e-7);}
 assert.equal(new Set(frames(STOP.locker.a,STOP.locker.b-1/30).map(t=>JSON.stringify(l.bullyState(t)))).size,1);
 // The friend exits forward before crossing the shell/door's left edge.
 for(const t of frames(m.LOCKER_GRAB,STOP.locker.a+1.93)){
  const f=m.lockerMotion(t).friend;
  if(f[0]<-.01&&f[0]>-.80)assert.ok(f[2]>=.63,'Diagonal path clips the side wall or open door');
 }
});
test('locker book contacts both the picking hand and the receiving sleeves',()=>{
 boundary(t=>l.lockerState(t).book,l.LOCKER_PICK);boundary(t=>l.lockerState(t).book,l.LOCKER_PLACE);
 for(const t of frames(l.LOCKER_PICK,l.LOCKER_PLACE-1/30)){const q=l.lockerState(t);near(q.book,m.add(m.handWorld(q.hero.position,q.yaw,.95,q.pose),[0,.055,0]),1e-8);}
 for(const t of frames(l.LOCKER_PLACE,STOP.locker.b)){const q=l.lockerState(t);near(q.book,q.bookRest,1e-8);}
});
test('elder remains under the gripping hand throughout the whole threshold drag',()=>{
 for(const t of frames(r.ELDER_GRAB,r.ELDER_RELEASE)){const q=r.rescueState(t);near(m.handWorld(q.hero.position,q.yaw,.95,q.pose),q.shoulder,1e-7);assert.ok(q.pose.bodyY<.035);}
});
test('the toe stays on the inward-opening door until it shuts during stopped time',()=>{
 for(const t of frames(m.DOOR_KICK,m.DOOR_SHUT)){const q=r.rescueState(t);near(p.footWorld(q.hero.position,q.yaw,.95,q.pose),r.doorContact(t),.012);assert.equal(activeStop(t).id,'elder');}
 for(const t of frames(m.DOOR_SHUT,STOP.elder.b))assert.equal(m.rescueMotion(t).door,0);
 near(r.bowState(m.ARROW_LAUNCH).arrow,m.rescueArrow(m.ARROW_LAUNCH),.002);
});
test('the thank-you carrot transfers from the folded sleeves into the actual palm',()=>{
 boundary(t=>r.rescueState(t).carrot,r.CARROT_PASS);
 for(const t of frames(r.CARROT_PASS,cue('12.rabbit').end)){const q=r.rescueState(t);near(q.carrot,m.add(m.handWorld(q.hero.position,q.yaw,.95,q.pose),[0,-.13,0]),1e-8);}
});
test('rock pickup, carry and ground placement have actual hand contact and no release flight',()=>{
 boundary(c.rockAt,c.PICK_ROCK);boundary(c.rockAt,c.PLACE_ROCK);
 for(const t of frames(c.PICK_ROCK,c.PLACE_ROCK-1/30)){const q=c.heroState(t);near(c.rockAt(t),m.add(m.handWorld(q.position,q.yaw,.95,q.pose),[0,-.29,0]),1e-8);}
 for(const t of frames(c.PLACE_ROCK,cue('18.prince').end))near(c.rockAt(t),m.ROCK_END,1e-8);
 assert.ok(m.distance(c.heroState(STOP.counter.b).position,m.HERO_FREEZE)>2,'Hero did not clear the original ice lane');
});
test('the caught toe intersects the placed rock before the visible stumble',()=>{
 const contacts=frames(m.HIT-.18,m.HIT+.10).map(t=>{const q=m.manMotion(t);return p.footWorld(q.position,q.yaw,1,c.strangerPose(t));});
 assert.ok(contacts.some(f=>Math.abs(f[0]-m.ROCK_END[0])<.126&&f[1]>=0&&f[1]<.25&&Math.abs(f[2]-m.ROCK_END[2])<.108));
});
test('rabbit stays supported through pickup, chase, fall and the two-handed rescue',()=>{
 boundary(c.rabbitAt,c.LIFT_START);boundary(c.rabbitAt,c.TAKE_RABBIT);
 for(const t of frames(c.LIFT_START,c.TAKE_RABBIT-1/30)){const q=m.manMotion(t);near(c.rabbitAt(t),m.add(m.handWorld(q.position,q.yaw,1,c.strangerPose(t),-1),[0,-.18,0]),1e-8);assert.ok(c.rabbitAt(t)[1]>-.005);}
 for(const t of frames(c.TAKE_RABBIT,cue('18.prince').end)){const q=c.heroState(t);near(c.rabbitAt(t),m.add(p.palmMid(q.position,q.yaw,.95,q.pose),[0,-.18,0]),1e-8);}
});
test('continuous A to B routes have ordinary speeds and finite poses at every frame',()=>{
 const routes=[['bully',t=>l.bullyState(t).position,cue('7.locker').start,cue('8.secret').end],['locker',t=>m.lockerMotion(t).hero.position,cue('7.locker').start,cue('8.secret').end],['elder',t=>m.rescueMotion(t).hero.position,cue('10.night').start,cue('12.rabbit').end],['bedroom',t=>c.homeHero(t).position,cue('13.sound').start,m.HERO_RUN],['counter',t=>c.heroState(t).position,m.HERO_RUN,cue('18.prince').end],['stranger',t=>m.manMotion(t).position,cue('13.sound').start,cue('18.prince').end]];
 for(const [name,fn,a,b] of routes)for(const t of frames(a+1/30,b))assert.ok(m.distance(fn(t),fn(t-1/30))*30<7.5,`Root teleport ${name} at ${t}`);
 for(const t of frames(cue('13.sound').start,cue('18.prince').end)){for(const pose of [c.heroState(t).pose,c.strangerPose(t)])for(const val of Object.values(pose))for(const n of (Array.isArray(val)?val:[val]))assert.ok(Number.isFinite(n));}
});

test('school extensions do not overlap shared surfaces and every classroom seat has one actor',()=>{
 const {SCHOOL_EXTENSIONS:e,CLASSROOM_EXTRAS:extras}=loadFilm('school-layout');
 const nearEdge=(box)=>box.position[2]-box.size[2]/2;
 assert.equal(nearEdge(e.classFloor),4);assert.equal(nearEdge(e.classCeiling),4);
 assert.equal(nearEdge(e.hallFloor),2);assert.ok(Math.abs(nearEdge(e.hallCeiling)-2.2)<1e-10);
 const occupied=extras.map(x=>`${x.col}-${x.row}`);occupied.push('0-1','1-1');assert.equal(occupied.length,9);assert.equal(new Set(occupied).size,9);
});
test('teacher visibly holds the chalk, releases it from the palm, and its flight is continuous and frozen',()=>{
 for(const [fn,fire,start] of [[l.classChalkState,l.CLASS_CHALK_FIRE,cue('3.class').start],[l.chalkState,l.CHALK_FIRE,cue('5.chalk').start]]){
  for(const t of frames(Math.max(start,fire-.5),fire-1/30)){const q=fn(t);near(q.position,m.handWorld(l.TEACHER_ROOT,q.yaw,1,q.teacher),1e-8);}
  boundary(t=>fn(t).position,fire,1e-5);
  assert.ok(m.distance(fn(fire-.55).position,fn(fire-.17).position)>.5,'No visible throwing wind-up');
 }
 const frozen=frames(STOP.chalk.a,STOP.chalk.b-1/30);
 assert.equal(new Set(frozen.map(t=>JSON.stringify(l.chalkState(t).position))).size,1);
 boundary(t=>l.chalkState(t).position,STOP.chalk.b,.0001);
});
test('trip catches the same rock, carries momentum into a half-turn and grounded back landing',()=>{
 for(const t of frames(m.HIT-.03,m.HIT+.16)){const q=m.manMotion(t);near(p.footWorld(q.position,q.yaw,1,c.strangerPose(t)),m.add(m.ROCK_END,[0,.07,0]),.012);}
 const early=m.manMotion(m.HIT+.3).position,late=m.manMotion(m.SPIN_END).position;assert.ok(late[0]-early[0]>1.2);
 assert.ok(Math.abs(m.manMotion(m.SPIN_END).yaw-m.manMotion(m.SPIN_START).yaw-Math.PI)<.001);
 for(const t of frames(m.HIT,m.LAND+.2)){const q=m.manMotion(t),pose=c.strangerPose(t);for(const side of [1,-1])for(const tip of [.065,-.065])assert.ok(p.footWorld(q.position,q.yaw,1,pose,side,tip)[1]>=.02,`Foot below road at ${t}`);}
 assert.ok(c.strangerPose(m.LAND).bodyPitch<-1.4,'Back landing not reached');
});

test('pursuer goes through the gate opening rather than through the fence or posts',()=>{
 for(const t of frames(m.HERO_RUN,STOP.counter.a)){const p=m.counterHero(t).position;if(Math.abs(p[0]-2.7)<.5)assert.ok(p[2]>.65&&p[2]<1.8,`Fence overlap at ${t}: ${p}`);}
});

test('brief monochrome camera pulse fires on every stop without altering its five-second clock',()=>{
 const {stopColor}=loadFilm('stop-color');for(const s of STOPS){assert.equal(stopColor(s.start),1);assert.equal(stopColor(s.start+8),1);assert.ok(stopColor(s.start+15)>0&&stopColor(s.start+15)<1);assert.equal(stopColor(s.start+24),0);if(s.start>0)assert.equal(stopColor(s.start-1),0);assert.equal(s.end-s.start,150);}
});
