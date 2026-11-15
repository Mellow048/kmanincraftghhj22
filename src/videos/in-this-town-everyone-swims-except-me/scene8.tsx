import { Glow, cam, storyScene } from "../../engine";
import {
  ArenaCrowd, Bubbles, Cast, Drops, EAST, Hang, Hero, Kid, NORTH, R, ROBE, Race, Rival, SOUTH, Splash, SubscribeSign, Swim, Towel, Under, Villager, WEST,
  WL, cueLen, fieldX, flatOut, heroX, laneZ, posed, raceS, rivalX, sine, swimPose, timing, tw, w,
  bandAt, hangBody, swimBody,
} from "./kit";

/**
 * 08 THE RACE — tenth to second in fourteen seconds, and why not first.
 *
 * Everybody's place in the water comes from one clock (`raceS`, `heroX`, `rivalX` in kit.tsx), so a wide shot
 * and the close shot after it agree. The close shots of him going past people put those people in the lanes
 * beside him, where the lens can see both.
 *
 * He is lane 5 (z = −1). The kid in black and white is lane 6 (z = +1), to the south: the side the lens is on.
 */
const HZ = laneZ(5);
const LAY_X = R(16.8, 0, 0)[0];
const RZ = laneZ(6);

/** Where he is when a line starts, and how far he goes during it. */
const at0 = (cue: string) => heroX(raceS(cue, 0));
const run = (cue: string) => heroX(raceS(cue, cueLen(cue))) - at0(cue);
/** Him, on a tracking shot: `p` is the shot's progress. */
const hx = (cue: string, p: number) => at0(cue) + run(cue) * sine(p);

/** Somebody he goes past: `lead` metres ahead of him when the shot opens, `drop` metres back by its end. */
const Passed = ({ cue, p, t, lane, who, lead, drop }: { cue: string; p: number; t: number; lane: number; who: number; lead: number; drop: number }) => (
  <Swim who={who} at={R(hx(cue, p) + lead - drop * p, WL, laneZ(lane))} heading={EAST} mode="crawl" t={t} rate={1.15} seed={lane + who} />
);

/** The winner's arm, out of the water with the band on it, held there for the slow shot. */
const glintPose = (t: number) => ({ ...swimPose("glide", t), armR: [2.0 + t * 0.22, 0, 0.12] as [number, number, number], armL: [-Math.PI + 0.2, 0, -0.1] as [number, number, number] });
const glintBody = (x: number, t: number) => swimBody(R(x, WL, RZ), EAST, "glide", t, 1, 0, 1.5, glintPose(t));
const sitDeck = (armR: [number, number, number]) =>
  posed("sit", 0, { legR: [-Math.PI / 2, 0, 0.2], legL: [-Math.PI / 2, 0, -0.2], kneeR: [0, 0, 0], kneeL: [0, 0, 0], armR, armL: [0.4, 0, -0.3] });
const SAT: [number, number, number] = [LAY_X, -0.3, -1.1];
const TOUCH = 14.2 - raceS("8.lose", 0);
const RINGW = w("8.glint", "on");
const TWO = w("8.sub", "two");
/** Where he lies afterwards: on the deck past the finish wall. Hips here, head to the north. */
const LAY = R(16.8, 0.06, -0.9);
const WINNER = R(17.6, 0.06, 0.55);
const WBAND = bandAt({ position: WINNER, rotationY: EAST, pose: posed("idle", 0, {}) }, undefined, -0.529, 0.1);

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The race",
  shots: [
    {
      cue: "8.water",
      ...cam.push({ on: R(-12, 0, -0.5), dist: 14, to: 11.5, yaw: 60, pitch: 21, fov: 58 }),
      zone: "arena",
      look: "overworld-day",
      note: "From over the finish, the whole width: ten white explosions in a row along the start, both stands on their feet, and ten wakes starting down the pool toward us.",
      stage: (t) => {
        const s = raceS("8.water", t);
        return (
          <>
            <ArenaCrowd t={t} cheer={1} south />
            <Race s={s} t={t} />
            {Array.from({ length: 10 }, (_, i) => (
              <Splash key={i} at={R(i + 1 === 5 ? -13.6 : -12.2, WL, laneZ(i + 1))} k={(t + 0.12) / 0.8} size={i + 1 === 5 ? 2.6 : 1.8} n={18} seed={i + 1} />
            ))}
          </>
        );
      },
    },
    {
      cue: "8.tenth",
      ...cam.truck({ on: R(at0("8.tenth") + 3.6, 0, HZ), dist: 9.6, yaw: -90, pitch: 27, fov: 54, by: [run("8.tenth"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "From behind and above him: his own feet at the bottom of the frame, and in front of him nothing but other people's white water, in every lane.",
      stage: (t) => <Race s={raceS("8.tenth", t)} t={t} only={[3, 4, 5, 6, 7]} heroRate={1.6} />,
    },
    {
      cue: "8.eighth",
      ...cam.truck({ on: R(at0("8.eighth") + 0.3, 0.05, HZ - 0.9), dist: 4.6, yaw: 14, pitch: 13, fov: 40, by: [run("8.eighth"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Side on, at the water: the kid in the next lane slides backwards through the frame behind him as if somebody were reeling him in.",
      stage: (t, { p }) => (
        <>
          <ArenaCrowd t={t} cheer={1} />
          <Swim at={R(hx("8.eighth", p), WL, HZ)} heading={EAST} mode="crawl" t={t} rate={2} ring={3} face="brave" />
          <Passed cue="8.eighth" p={p} t={t} lane={4} who={1} lead={0.9} drop={2.3} />
          <Passed cue="8.eighth" p={p} t={t} lane={3} who={2} lead={0.2} drop={2.6} />
        </>
      ),
    },
    {
      cue: "8.seventh",
      ...cam.truck({ on: R(at0("8.seventh") + 0.5, 0.1, HZ - 0.7), dist: 4.8, yaw: 76, pitch: 16, fov: 42, by: [run("8.seventh"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Head on, backing away in front of him: his face coming up for air, and over his shoulder another kid getting smaller.",
      stage: (t, { p }) => (
        <>
          <Swim at={R(hx("8.seventh", p), WL, HZ)} heading={EAST} mode="crawl" t={t} rate={2} ring={3} face="brave" />
          <Passed cue="8.seventh" p={p} t={t} lane={4} who={4} lead={0.3} drop={2.6} />
          <Passed cue="8.seventh" p={p} t={t} lane={3} who={1} lead={-2.2} drop={1.8} />
        </>
      ),
    },
    {
      cue: "8.fourth",
      ...cam.truck({ on: R(at0("8.fourth") + 0.4, 0, HZ - 1.6), dist: 12.5, yaw: -90, pitch: 76, fov: 50, by: [run("8.fourth"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Straight down on four lanes: three wakes going at one speed, and a red one going through them at another, like a train past cows.",
      stage: (t, { p }) => (
        <>
          <Swim at={R(hx("8.fourth", p), WL, HZ)} heading={EAST} mode="crawl" t={t} rate={2.1} ring={3} foam={1.4} />
          <Passed cue="8.fourth" p={p} t={t} lane={4} who={6} lead={0.7} drop={2.8} />
          <Passed cue="8.fourth" p={p} t={t} lane={3} who={7} lead={1.6} drop={2.8} />
          <Passed cue="8.fourth" p={p} t={t} lane={2} who={8} lead={2.4} drop={2.8} />
        </>
      ),
    },
    {
      cue: "8.feel",
      ...cam.truck({ on: R(at0("8.feel") + 0.35, -0.3, HZ), dist: 2.7, yaw: 158, pitch: -9, fov: 44, by: [run("8.feel"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Under him, travelling: the arm with the band on it comes down through the water with the green button alight, and takes hold, and the whole pool goes backwards.",
      stage: (t, { p }) => {
        const x = hx("8.feel", p);
        return (
          <>
            <Under on={R(x, 0, HZ)} yaw={158} dist={2.7} />
            <Swim at={R(x, WL, HZ)} heading={EAST} mode="crawl" t={t} rate={1.5} ring={3} foam={0} />
            <Glow position={bandAt(swimBody(R(x, WL, HZ), EAST, "crawl", t, 1.5))} size={0.7 + Math.sin(t * 12) * 0.1} color="#9ff0c0" opacity={0.4} />
            <Bubbles at={R(x - 0.9, -0.5, HZ)} t={t} n={14} rise={0.5} spread={0.5} />
          </>
        );
      },
    },
    {
      cue: "8.saw",
      ...cam.truck({ on: R(at0("8.saw") + 0.55, 0.08, HZ + 0.1), dist: 2.0, yaw: 36, pitch: 9, fov: 38, by: [run("8.saw"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "His face, close, as it turns out of the water for a breath — and does not go back in. He has seen something in the next lane.",
      stage: (t, { p }) => (
        <Swim at={R(hx("8.saw", p), WL, HZ)} heading={EAST} mode="crawl" t={t} rate={0.9} ring={3} face={t < 0.4 ? "brave" : "surprised"} headYaw={-0.9 * tw(t, 0.2, 0.5)} foam={0.8} />
      ),
    },
    {
      cue: "8.glint",
      ...cam.push({ on: bandAt(glintBody(at0("8.glint") + 1.75, 0.5)), dist: 2.3, to: 1.5, yaw: 200, pitch: 14, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "What he saw, slowed right down: a black sleeve coming over out of the water in the lane ahead, and round the wrist of it, shedding drops, a gold band.",
      stage: (t) => {
        const x = at0("8.glint") + 1.7 + t * 0.1;
        const band = bandAt(glintBody(x, t));
        return (
          <>
            <ArenaCrowd t={t} cheer={1} north={false} south />
            <Swim who="rival" ring at={R(x, WL, RZ)} heading={EAST} mode="glide" t={t} seed={1.5} pose={glintPose(t)} foam={0.9} />
            <Glow position={band} size={0.55 + Math.sin(t * 9) * 0.15} color="#ffe28a" opacity={0.45} />
            <Drops top={[band[0], band[1] - 0.05, band[2]]} t={t * 0.4} height={0.5} spread={0.18} n={8} />
          </>
        );
      },
    },
    {
      cue: "8.glint",
      cut: Math.max(0.6, RINGW - 0.05),
      ...cam.push({ on: R(at0("8.glint") + 1.3, 0.1, 0.1), dist: 5.2, to: 4.3, yaw: -112, pitch: 25, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Both of them from behind: his red back, and one lane over and one body ahead, a black and white one, with the same gold on the same wrist.",
      stage: (t) => {
        const x = at0("8.glint") + 0.3 + t * 0.6;
        return (
          <>
            <Swim at={R(x, WL, HZ)} heading={EAST} mode="crawl" t={t} rate={0.6} ring={3} face="surprised" headYaw={-0.7} />
            <Swim who="rival" ring at={R(x + 1.6, WL, RZ)} heading={EAST} mode="crawl" t={t} rate={0.6} seed={1.5} />
            <Glow position={R(x + 2.1, 0.25, RZ + 0.2)} size={0.7 + Math.sin(t * 9) * 0.15} color="#ffe28a" opacity={0.45} />
            <Glow position={R(x + 0.5, 0.25, HZ + 0.2)} size={0.5} color="#9ff0c0" opacity={0.35} />
          </>
        );
      },
    },
    {
      cue: "8.panic",
      ...cam.truck({ on: R(at0("8.panic") + 0.5, 0.12, HZ), dist: 2.8, yaw: 84, pitch: 10, fov: 42, by: [run("8.panic"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Head on and low: he puts his face down and goes at it, twice the arms, twice the water, coming straight down the lens.",
      stage: (t, { p }) => {
        const x = hx("8.panic", p);
        return (
          <>
            <Swim at={R(x, WL, HZ)} heading={EAST} mode="crawl" t={t} rate={2.8} ring={3} face="angry" foam={1.7} />
            {[0, 1].map((i) => (
              <Splash key={i} at={R(x - 0.2 + i * 0.5, WL, HZ + (i ? 0.3 : -0.3))} k={(t * 2.6 + i * 0.5) % 1} size={0.8} seed={i + 2} />
            ))}
          </>
        );
      },
    },
    {
      cue: "8.third",
      ...cam.truck({ on: R(at0("8.third") + 0.3, 0.05, HZ - 0.8), dist: 4.8, yaw: 168, pitch: 14, fov: 40, by: [run("8.third"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "From the other side now: a kid in the near lane, swimming hard, going backwards. The red shirt behind him going forwards. The far stand going mad.",
      stage: (t, { p }) => (
        <>
          <ArenaCrowd t={t} cheer={1} north={false} south />
          <Swim at={R(hx("8.third", p), WL, HZ)} heading={EAST} mode="crawl" t={t} rate={2.4} ring={3} face="brave" foam={1.3} />
          <Passed cue="8.third" p={p} t={t} lane={4} who={9} lead={0.9} drop={2.2} />
        </>
      ),
    },
    {
      cue: "8.second",
      ...cam.truck({ on: R(at0("8.second") + 3.2, 0, 0), dist: 8.4, yaw: -90, pitch: 25, fov: 50, by: [run("8.second"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "From behind and above again — and now there is one wake in front of his, one lane over, and past it the finish wall and the board that says so.",
      stage: (t, { p }) => {
        const s = raceS("8.second", t);
        return (
          <>
            <ArenaCrowd t={t} cheer={1} south rows={3} />
            <Race s={s} t={t} only={[5, 6]} heroRate={2.4} />
            <Swim who={0} at={R(heroX(s) - 0.4 - p * 1.6, WL, laneZ(7))} heading={EAST} mode="crawl" t={t} rate={1.2} seed={7} />
            <Swim who={9} at={R(heroX(s) - 2.4 - p, WL, laneZ(4))} heading={EAST} mode="crawl" t={t} rate={1.2} seed={4} />
          </>
        );
      },
    },
    {
      cue: "8.catch",
      ...cam.truck({ on: R(at0("8.catch") + 0.75, 0.05, 0.2), dist: 5.6, yaw: -10, pitch: 13, fov: 42, by: [run("8.catch"), 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Side on, both in frame: black and white in front, red a body behind, both arms going as fast as arms go. The gap between them does not change by a hand.",
      stage: (t) => {
        const s = raceS("8.catch", t);
        return (
          <>
            <ArenaCrowd t={t} cheer={1} />
            <Race s={s} t={t} only={[5, 6]} heroRate={2.6} rivalRate={2.6} heroFace="angry" />
          </>
        );
      },
    },
    {
      cue: "8.dare",
      ...cam.push({ on: R(at0("8.dare") + 0.75, 0.0, HZ), dist: 1.9, to: 1.35, yaw: 138, pitch: 36, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "Under, slowed down: both his arms out in front, the band between them, his left hand an inch from the red button — and staying an inch from it. He has met that button.",
      stage: (t) => {
        const x = at0("8.dare") + t * 0.3;
        const reach = 0.5 + Math.sin(t * 5) * 0.5;
        const pose = swimPose("glide", t);
        pose.armR = [-Math.PI + 0.25, 0, 0.1];
        pose.armL = [-Math.PI + 0.3, 0, 0.42 + reach * 0.12 + Math.sin(t * 22) * 0.03];
        pose.head = [-0.85, 0, 0];
        const band = bandAt(swimBody(R(x, WL, HZ), EAST, "glide", t, 1, -0.14, 1, pose));
        return (
          <>
            <Swim at={R(x, WL, HZ)} heading={EAST} mode="glide" t={t} depth={-0.14} ring={3} pose={pose} face="fear" foam={0.5} />
            <Glow position={band} size={0.3} color="#ff9a8a" opacity={0.2 + reach * 0.25} />
            <Swim who="rival" ring at={R(x + 2.0, WL, RZ)} heading={EAST} mode="crawl" t={t} rate={0.5} seed={1.5} />
          </>
        );
      },
    },
    {
      cue: "8.lose",
      ...cam.push({ on: R(14.4, 0, 0), dist: 5.4, to: 4.4, yaw: 90, pitch: 42, fov: 46 }),
      zone: "arena",
      look: "overworld-day",
      note: "Down on the finish wall from the deck: a black and white hand slaps the tiles in lane six. Then, one breath later, a red one in lane five.",
      stage: (t) => {
        const s = raceS("8.lose", t);
        return (
          <>
            <Race s={s} t={t} only={[4, 5, 6, 7]} heroRate={2.6} rivalRate={2.6} heroFace="angry" />
            <Splash at={R(14.8, WL, RZ)} k={(t - TOUCH) / 0.6} size={1.4} n={18} seed={3} />
            <Splash at={R(14.8, WL, HZ)} k={(t - TOUCH - 0.65) / 0.6} size={1.2} n={16} seed={4} />
            <Kid n={3} scale={0.7} position={R(16.1, 0.04, 2.4)} rotationY={WEST} animation="cheer" face="laugh" />
            <Villager position={R(16.2, 0.04, -2.6)} rotationY={WEST} robe={ROBE.brown} hmm={1} lookAt={R(14.8, 0, RZ)} />
          </>
        );
      },
    },
    {
      cue: "8.secondplace",
      ...cam.push({ on: R(14.7, 0.3, -0.4), dist: 5.6, to: 4.8, yaw: 90, pitch: 24, fov: 46 }),
      zone: "arena",
      look: "overworld-day",
      note: "From the cup on its table, down and across to the water: his head at the wall in lane five, looking up at it. In lane six, both arms in the air, the kid who gets it.",
      stage: (t) => (
        <>
          <ArenaCrowd t={t} cheer={1} />
          <Hang wall={R(15, 0, HZ)} heading={EAST} k={0.7} t={t} kick={0.06} ring={3} face="frown" headPitch={-0.5} headYaw={0.3} />
          <Swim who="rival" ring at={R(14.4, WL, RZ)} heading={EAST + 0.4} mode="tread" t={t} pose={posed("cheer", t, {})} face="laugh" />
          <Glow position={R(18.6, 2.1, -3)} size={1.4} color="#ffe28a" opacity={0.35} />
        </>
      ),
    },
    {
      cue: "8.tiles",
      ...cam.top({ on: [LAY[0], 0.1, LAY[2]], height: 3.2, to: 5.3, spin: [0, 32], fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Straight down, rising and turning: flat on his back on the white deck in a puddle the shape of himself, chest going up and down. A pair of black and white legs walks past his head.",
      stage: (t) => (
        <>
          <Hero position={LAY} rotationY={SOUTH} pose={flatOut(t * 2)} ring={3} face="sleepy" />
          <Towel position={[LAY[0], 0.045, LAY[2]]} color="#cfc6b0" size={[1.9, 0.02, 2.3]} />
          <Rival ring position={R(17.9, 0.06, -3.4 + t * 1.5)} rotationY={SOUTH} animation="walk" animDistance={t * 1.5} face="smug" />
          <Drops top={R(17.9, 0.9, -3.4 + t * 1.5)} t={t} height={0.8} spread={0.2} n={6} />
        </>
      ),
    },
    {
      cue: "8.atleast",
      ...cam.top({ on: [LAY[0], 0.1, LAY[2] - 0.45], height: 2.7, to: 2.1, spin: [30, 22], fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "'Well, at least I'm second': still flat on the tiles, but grinning at the sky now, and one tired fist goes up. He has never been second at anything.",
      stage: (t) => {
        const up = tw(t, 0.25, 0.7) * (1 - 0.25 * tw(t, 1.5, 2.1));
        return (
          <>
            <ArenaCrowd t={t} cheer={0.5} north={false} south rows={3} />
            <Hero position={LAY} rotationY={SOUTH} pose={{ ...flatOut(t * 1.4), armR: [-1.35 * up, 0, 0.25 * up + 0.5 * (1 - up)] }} ring={3} face={t < 0.2 ? "sleepy" : "laugh"} />
            <Towel position={[LAY[0], 0.045, LAY[2]]} color="#cfc6b0" size={[1.9, 0.02, 2.3]} />
          </>
        );
      },
    },
    {
      cue: "8.hand",
      ...cam.push({ on: WBAND, dist: 1.7, to: 1.05, yaw: 168, pitch: -6, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "From where his head is, on the tiles: the winner's hand hanging by the winner's leg, dripping, and on the wrist the band. Yellow button lit. Medium.",
      stage: (t) => (
        <>
          <Rival ring position={WINNER} rotationY={EAST} animation="idle" face="smug" />
          <Glow position={WBAND} size={0.4 + Math.sin(t * 10) * 0.08} color="#ffe28a" opacity={0.4} />
          <Drops top={[WBAND[0], WBAND[1] - 0.12, WBAND[2]]} t={t} height={0.5} spread={0.06} n={4} speed={1.4} />
        </>
      ),
    },
    {
      cue: "8.problem",
      ...cam.push({ on: R(17.2, 0.85, -0.25), dist: 3.9, to: 3.2, yaw: 58, pitch: 4, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "Over his wet shoulder, up at the winner: who turns his head, looks down at the band on HIS wrist, and smiles a small smile that is not a friendly one.",
      stage: (t) => {
        const up = tw(t, 0.2, 0.7);
        const armR: [number, number, number] = [-1.9 * up, 0, 0.3 * up];
        const band = bandAt({ position: WINNER, rotationY: NORTH + 0.9, pose: posed("idle", 0, { armR }) });
        return (
          <>
            <ArenaCrowd t={t} cheer={0.6} north={false} south rows={3} />
            <Hero position={SAT} rotationY={0.3} pose={sitDeck([0.5, 0, 0.3])} ring={3} face="uneasy" headPitch={-0.4} />
            <Rival ring position={WINNER} rotationY={NORTH + 0.9} pose={posed("idle", t, { armR })} face={t < 0.6 ? "neutral" : "smug"} headPitch={up * 0.4} headYaw={-0.3 * up} />
            <Glow position={band} size={0.45} color="#ffe28a" opacity={0.4} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      ...cam.push({ on: R(16.8, 0.95, -1.1), dist: 3.7, to: 3.05, yaw: 88, pitch: 4, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "'Like and subscribe for part two': a breath after the bad news, he sits on the deck under the red sign, looking at the stripe on his arm, then up at us.",
      stage: (t) => {
        const said = t > TWO;
        const armR: [number, number, number] = [-1.5, 0, -0.5];
        const band = bandAt({ position: SAT, rotationY: EAST, pose: sitDeck(armR) });
        return (
          <>
            <ArenaCrowd t={t} cheer={0.4} north={false} south rows={3} />
            <Hero position={SAT} rotationY={EAST} pose={sitDeck(armR)} ring={3} face={said ? "uneasy" : "frown"} headPitch={said ? 0.05 : 0.4} headYaw={said ? 0 : 0.45} />
            <SubscribeSign position={R(16.25, 1.5, -1.1)} rotationY={EAST} scale={0.5} tilt={0.04 + Math.sin(t * 15) * 0.01} />
            <Glow position={band} size={0.4} color="#9ff0c0" opacity={0.4} />
            <Towel position={[LAY[0], 0.045, LAY[2]]} color="#cfc6b0" size={[1.9, 0.02, 2.3]} />
          </>
        );
      },
    },
  ],
});
