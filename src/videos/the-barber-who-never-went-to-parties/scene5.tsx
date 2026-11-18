import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Calendar, Comb, Crate, Dad, Drop, FadeDog, Friend1, Friend2, HAIR, HairFly, Hedge, Hero, InHand, Mannequin, MopHead, Note, PLACE, Person, Plate, STOOL, Sparkle, add, holdUp, home, hop, pop, rnd, seatedPose, timing, tw, w } from "./kit";
import { Me } from "./acts";
import { BEHIND, DAD_SIT } from "./scene3";
import { G_CRATE, G_ME_FACE, MOP } from "./scene4";

/**
 * 5. THE TRAINING. The chant comes back, on a mop this time. The line of the meme is on the wall in blocks: WHILE
 * THEY'RE OUT PARTYING BTW. A year in a garage: mops, combs, the dog, the hedge, my own fringe. Then spring, and
 * the one customer who had every reason not to sit down again.
 */

const G = PLACE.garage;
const PARTY = PLACE.party;
const CHAIR = PLACE.armchair;
const HUS = [0, 1, 2, 3, 4, 5].map((i) => w("5.hus", "HUS", i));
const MOP_TOP: Vec3 = add(MOP, 0, 1.62, 0.05);
const RACK: Vec3 = add(G, -1.45, 0, -1.1);
const STAND: Vec3 = add(G, 0, 0, 0);
const DOG: Vec3 = add(G, 0.12, 0, 0.25);
const HEDGE: Vec3 = home(2.6, 0, -3.2);
const CAL = PLACE.calendar;

/** A mannequin head on a post, where the mop stood. */
const OnStand = ({ style }: { style: number }) => (
  <>
    <Block position={add(STAND, 0, 0.5, 0)} size={[0.12, 1.0, 0.12]} color="#8a919c" />
    <Block position={add(STAND, 0, 0.03, 0)} size={[0.44, 0.06, 0.44]} color="#2a2c33" />
    <Mannequin position={add(STAND, 0, 1.0, 0)} style={style} />
  </>
);

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The training",
  shots: [
    {
      cue: "5.hus",
      ...cam.push({ on: add(G, 0, 1.66, 0), dist: 3.4, to: 3.0, yaw: 13, pitch: 3, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "The frame of the hook, a year early and in a garage: the same chant, on a mop.",
      stage: (t) => (
        <>
          <MopHead position={MOP} face="worried" hair={1 - tw(t, 0, HUS[5] + 0.1) * 0.78} />
          <Me t={t} fast={1} at={G_CRATE} job={false} kitchen face="brave" />
          <HairFly position={MOP_TOP} t={t} at={HUS} color="#f6f1e2" count={9} power={1.2} />
        </>
      ),
    },
    {
      cue: "5.hus",
      cut: HUS[5] + 0.18,
      ...cam.push({ on: add(G, 0, 1.6, 0), dist: 2.5, to: 2.25, yaw: -9, pitch: 2, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "What the chant did then: a mop with four strings left. The skill is not there yet.",
      stage: (t) => (
        <>
          <MopHead position={MOP} face="worried" hair={0.22} lean={tw(t, 0.3, 0.6) * 0.1} />
          <Me t={t} fast={0} up={0.4} at={G_CRATE} job={false} kitchen face={t < 0.35 ? "brave" : "uneasy"} />
        </>
      ),
    },
    {
      cue: "5.hus",
      cut: 2.1,
      ...cam.push({ on: add(RACK, 0, 1.25, 0), dist: 4.2, to: 3.8, yaw: 16, pitch: 2, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "A rack of mannequin heads stacked worst to best: the year, as one tall picture.",
      stage: (t) => (
        <>
          <Block position={add(RACK, -0.34, 1.25, 0)} size={[0.06, 2.5, 0.4]} color="#5c3f24" />
          <Block position={add(RACK, 0.34, 1.25, 0)} size={[0.06, 2.5, 0.4]} color="#5c3f24" />
          {[0, 1, 2, 3].map((i) => (
            <group key={i}>
              <Block position={add(RACK, 0, 0.04 + i * 0.62, 0)} size={[0.74, 0.05, 0.44]} color="#7a5536" />
              <Mannequin position={add(RACK, 0, 0.07 + i * 0.62, 0.02)} style={i} rotationY={0.25} />
            </group>
          ))}
          <Sparkle position={add(RACK, 0.2, 2.5, 0.3)} k={pop(t, 0.5, 0.2) * 0.7} size={0.2} />
        </>
      ),
    },
    {
      cue: "5.hus",
      cut: 3.05,
      ...cam.push({ on: add(G, 0, 1.92, 0), dist: 3.6, to: 3.3, yaw: -10, pitch: 2, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "The meme's own line in blocks over the garage, with the party flashing in the window.",
      stage: (t) => (
        <>
          <OnStand style={3} />
          <Me t={t} fast={0.5} at={G_CRATE} job={false} kitchen face="brave" lines={false} />
          <Plate lines={["WHILE THEY'RE", "OUT PARTYING BTW"]} position={add(G, 0, 2.62, 0.3)} width={1.05} k={Math.min(1, pop(t, 0.05, 0.18) + (t > 0.23 ? 1 : 0))} />
        </>
      ),
    },
    {
      cue: "5.while",
      ...cam.push({ on: [PARTY[0], 1.35, PARTY[2] + 1.6], dist: 3.5, to: 3.1, yaw: -8, pitch: -2, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "The two friends dancing on the lawn across the road: what I was missing, and it looks fun.",
      stage: (t) => (
        <>
          <Friend1 position={[PARTY[0] - 0.36, 0.02 + hop(t % 0.5, 0.02, 0.2, 0.3), PARTY[2] + 1.75]} rotationY={Math.sin(t * 5) * 0.5} animation="cheer" face="laugh" gaze={0} />
          <Friend2 position={[PARTY[0] + 0.42, 0.02 + hop(t % 0.5, 0.2, 0.2, 0.28), PARTY[2] + 1.3]} rotationY={-Math.sin(t * 5) * 0.5} hat animation="cheer" face="laugh" gaze={0} />
          {[0, 1, 2].map((i) => (
            <Person key={i} who={i + 2} top="party" position={[PARTY[0] - 1.2 + i * 1.2, 0.02 + hop(t % 0.5, 0.1 * i, 0.2, 0.3), PARTY[2] + 0.5]} animation="cheer" face="laugh" />
          ))}
          {[0, 1, 2].map((i) => (
            <Note key={i} position={[PARTY[0] - 0.5 + i * 0.5, 1.9 + i * 0.25, PARTY[2] + 1.0]} t={t} phase={i * 0.33} color={["#ff3fa0", "#3fb8ff", "#ffe14a"][i]} size={0.9} />
          ))}
        </>
      ),
    },
    {
      cue: "5.cutting",
      ...cam.push({ on: add(G_ME_FACE, 0, -0.1, 0), dist: 1.9, to: 1.6, yaw: 7, pitch: -1, fov: 36 }),
      zone: "garage",
      look: "overworld-night",
      note: "My face under the garage bulb, cutting: the other half of the same night.",
      stage: (t) => (
        <>
          <OnStand style={3} />
          <Me t={t} fast={0.35} at={G_CRATE} job={false} kitchen face="brave" lines={false} />
        </>
      ),
    },
    {
      cue: "5.mops",
      ...cam.push({ on: add(G, 0.1, 1.05, -0.3), dist: 3.6, to: 3.1, yaw: -22, pitch: 9, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "Bald mops standing in a row down the garage, each with a face: the count, as a queue.",
      stage: (t) => (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <MopHead key={i} position={add(G, -0.75 + i * 0.36, 0, 1.0 - i * 0.62)} hair={[0.15, 0.3, 0.07, 0.22, 0, 0.36][i]} face={(["worried", "dots", "worried", "happy", "worried", "dots"] as const)[i]} rotationY={0.25} lean={i === 0 ? tw(t, 0.7, 1.1) * 0.5 : (rnd(i, 3) - 0.5) * 0.14} />
          ))}
        </>
      ),
    },
    {
      cue: "5.combs",
      ...cam.push({ on: add(G, 0, 0.22, 0.5), dist: 1.9, to: 1.6, yaw: 12, pitch: 30, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "A heap of snapped combs and one more landing on it: the count, as a pile.",
      stage: (t) => (
        <>
          {Array.from({ length: 34 }, (_, i) => {
            const a = rnd(i, 1) * 6.28;
            const r = Math.sqrt(rnd(i, 2)) * 0.5;
            return <Comb key={i} position={add(G, Math.cos(a) * r, 0.02 + (0.5 - r) * 0.55 * rnd(i, 5) + 0.01 * (i % 5), 0.5 + Math.sin(a) * r)} rotation={[rnd(i, 6) * 0.5, rnd(i, 7) * 6, rnd(i, 8) * 0.5]} broken color={["#1c1c22", "#c8362e", "#3f6fd0", "#e8c44a", "#f4f4f0"][i % 5]} scale={1.5} />;
          })}
          <Comb position={add(G, 0.05, 0.42 + Math.max(0, 0.45 - t) * 2.2, 0.5)} rotation={[0, 0.4, 0]} broken={t > 0.45} color="#2f8a8a" scale={1.7} />
        </>
      ),
    },
    {
      cue: "5.dog",
      ...cam.push({ on: add(DOG, -0.05, 0.85, -0.2), dist: 3.0, to: 2.6, yaw: 10, pitch: 7, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "The dog sits and looks round at the scissors behind him: he knows, and he stays.",
      stage: (t) => (
        <>
          <FadeDog position={DOG} rotationY={0.35} cut={false} headYaw={t < 0.7 ? 0 : -0.5} headTilt={t < 0.7 ? 0 : 0.2} />
          <Hero position={add(DOG, -0.25, 0, -0.95)} pose={holdUp(t, 0.8, 0.42)} face="smug" gaze={0}>
            <InHand t={t} rate={2.5} handle="#e8842a" scale={1.5} />
          </Hero>
        </>
      ),
    },
    {
      cue: "5.dog",
      cut: 1.36,
      ...cam.push({ on: add(HEDGE, 0, 1.0, -0.2), dist: 3.6, to: 3.2, yaw: -12, pitch: 5, fov: 40 }),
      zone: "home",
      look: "overworld-day",
      note: "Proof I cut anything that held still: the garden hedge with a side parting.",
      stage: (t) => (
        <>
          <group position={HEDGE} scale={0.62}>
            <Hedge position={[0, 0, 0]} />
          </group>
          <Hero position={add(HEDGE, 0.1, 0.2, -0.75)} pose={holdUp(t, 1.1, 0.42)} face="smug" gaze={0}>
            <InHand t={t} rate={2} handle="#e8842a" scale={1.5} />
          </Hero>
          <Block position={add(HEDGE, 0.1, 0.1, -0.75)} size={[0.5, 0.2, 0.4]} color="#b48d52" />
        </>
      ),
    },
    {
      cue: "5.dog",
      cut: 2.26,
      ...cam.push({ on: add(DOG, 0.05, 0.62, 0.1), dist: 2.0, to: 1.7, yaw: 4, pitch: 6, fov: 38 }),
      zone: "garage",
      look: "overworld-night",
      note: "The dog afterwards, with a flat top, looking at the lens: patient is the word.",
      stage: (t) => <FadeDog position={DOG} rotationY={0.3} headYaw={-0.3} headTilt={tw(t, 0.25, 0.5) * 0.3} />,
    },
    {
      cue: "5.dog",
      cut: 3.16,
      ...cam.push({ on: G_ME_FACE, dist: 1.75, to: 1.5, yaw: -5, pitch: -1, fov: 36 }),
      zone: "garage",
      look: "overworld-night",
      note: "My own fringe, cut far too short, and the hair still falling: nobody was spared.",
      stage: (t) => (
        <>
          <Me t={t} fast={0} up={1.05} at={G_CRATE} job={false} kitchen look="short" face="scared" />
          <HairFly position={add(G_ME_FACE, 0, 0.2, 0.25)} t={t} at={[0.02]} color={HAIR.me} count={10} power={0.8} />
        </>
      ),
    },
    {
      cue: "5.fixable",
      ...cam.push({ on: G_ME_FACE, dist: 1.6, to: 1.35, yaw: 6, pitch: -1, fov: 36 }),
      zone: "garage",
      look: "overworld-night",
      note: "The line again, to myself this time, with the same grin: the second time it is said.",
      stage: (t) => (
        <>
          <Me t={t} fast={0} up={0.3} at={G_CRATE} job={false} kitchen look="short" face="grin" />
          <Drop position={add(G_ME_FACE, 0.2, 0.1, 0.24)} t={t} every={0.6} fall={-0.3} size={0.04} />
        </>
      ),
    },
    {
      cue: "5.fixable",
      cut: 0.86,
      ...cam.push({ on: G_ME_FACE, dist: 1.5, to: 1.4, yaw: -4, pitch: -1, fov: 36 }),
      zone: "garage",
      look: "overworld-night",
      note: "The answer to my own fringe: a cap, and a blank face. Dad's hat, in small.",
      stage: (t) => <Me t={t} fast={0} up={0.2} at={G_CRATE} job={false} kitchen look="cap" face="blank" />,
    },
    {
      cue: "5.fixable",
      cut: 1.66,
      ...cam.push({ on: add(CAL, 0, -0.02, 0), dist: 1.7, to: 1.45, yaw: 5, pitch: 0, fov: 38 }),
      zone: "spring",
      look: "overworld-night",
      note: "The calendar turning from October to March: until spring, as one move.",
      stage: (t) => <Calendar position={CAL} page={Math.min(4.999, tw(t, 0.1, 1.45) * 5)} />,
    },
    {
      cue: "5.spring",
      ...cam.push({ on: add(HEDGE, -0.1, 0.95, 0), dist: 3.4, to: 3.1, yaw: -12, pitch: 5, fov: 46 }),
      zone: "home",
      look: "overworld-day",
      note: "Spring outside: blossom falling on the hedge I cut, and the dog still with his haircut.",
      stage: (t) => (
        <>
          <group position={HEDGE} scale={0.62}>
            <Hedge position={[0, 0, 0]} />
          </group>
          {Array.from({ length: 9 }, (_, i) => (
            <Block key={i} position={add(HEDGE, -0.6 + rnd(i, 2) * 1.2, 0.35 + rnd(i, 3) * 0.5, 0.26)} size={[0.07, 0.07, 0.03]} color={i % 2 ? "#ff8fc0" : "#ffffff"} castShadow={false} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <Drop key={i} position={add(HEDGE, -1.4 + i * 0.45, 2.6, 0.5 - (i % 3) * 0.5)} t={t} every={1.6} fall={-2.4} drift={0.5} size={0.045} color="#ff9fc8" phase={i * 0.23} />
          ))}
          <FadeDog position={add(HEDGE, -0.5, 0, 0.8)} rotationY={0.3} headTilt={0.1} />
        </>
      ),
    },
    {
      cue: "5.sat",
      ...cam.push({ on: add(CHAIR, 0, 1.5, -0.2), dist: 3.2, to: 2.8, yaw: -10, pitch: 4, fov: 40 }),
      zone: "spring",
      look: "overworld-day",
      note: "Dad takes the hat off and sits down in the chair on purpose: the trust comes back.",
      stage: (t) => {
        const sit = tw(t, 0.75, 1.15);
        return (
          <>
            <Calendar position={CAL} page={5} />
            <Dad position={add(DAD_SIT, 0, 0.13 * (1 - sit), 0.5 * (1 - sit))} top={t < 0.4 ? "hat" : "hair"} pose={sit > 0.5 ? seatedPose(t) : undefined} face="neutral" gaze={0} />
            {t >= 0.4 ? <Block position={add(CHAIR, 0.62, Math.max(0.5, 1.5 - (t - 0.4) * 3), 0.5)} size={[0.3, 0.2, 0.3]} color="#c8362e" /> : null}
            <Crate position={BEHIND} />
            <Hero position={add(BEHIND, 0, STOOL, 0)} pose={holdUp(t, 0.5, 0.42)} face={t < 0.5 ? "uneasy" : "wow"} gaze={0}>
              <InHand rate={0} handle="#e8842a" scale={1.5} />
            </Hero>
          </>
        );
      },
    },
    {
      cue: "5.sat",
      cut: 1.4,
      ...cam.push({ on: add(CHAIR, 0, 1.6, -0.3), dist: 2.5, to: 2.25, yaw: 9, pitch: 2, fov: 38 }),
      zone: "spring",
      look: "overworld-day",
      note: "He shuts his eyes and I lift the scissors over him: the first try, about to be redone.",
      stage: (t) => (
        <>
          <Calendar position={CAL} page={5} />
          <Dad position={DAD_SIT} top="hair" pose={seatedPose(t)} face="sleepy" blink={false} />
          <Crate position={BEHIND} />
          <Hero position={add(BEHIND, 0, STOOL, 0)} pose={holdUp(t, 1.1, 0.42)} face="brave" gaze={0}>
            <InHand t={t} rate={t > 0.4 ? 2.5 : 0} handle="#e8842a" scale={1.5} />
          </Hero>
        </>
      ),
    },
    {
      cue: "5.sat",
      cut: 2.3,
      ...cam.push({ on: add(CHAIR, 0, 1.6, -0.3), dist: 2.7, to: 2.4, yaw: -8, pitch: 2, fov: 40 }),
      zone: "spring",
      look: "overworld-day",
      note: "This time the hair falls right, a sparkle, and Dad smiles: the hat is paid off.",
      stage: (t) => (
        <>
          <Calendar position={CAL} page={5} />
          <Dad position={DAD_SIT} top={t < 0.42 ? "hair" : "cut"} pose={seatedPose(t)} face={t < 0.5 ? "sleepy" : "happy"} blink={t > 0.5} gaze={0} />
          <Me t={t} fast={t < 0.45 ? 0.9 : 0} up={1.1} at={BEHIND} job={false} kitchen face={t < 0.5 ? "brave" : "happy"} lines={false} />
          <HairFly position={add(CHAIR, 0, 1.6, 0.1)} t={t} at={[0.05, 0.2, 0.35]} color={HAIR.dad} count={8} power={1.0} />
          <Sparkle position={add(CHAIR, 0.3, 1.42, 0.4)} k={pop(t, 0.5, 0.2)} size={0.28} />
        </>
      ),
    },
  ],
});
