import type React from "react";
import type { Vec3 } from "../../engine";
import {
  BAKER, BRIDGE_FOLK, BRIDGE_LEADER, BRIDGE_Z, Bread, FLY, FlyingHat, Folk, Gavel, HOLE, HOME, Icon, LeaderHat, No, ROBES, SHELF_LOAF, STOPS, Tabs, Villager, VotePile, VoteStone, Wig, clock, counted,
  ease, flightScene, headTop, heldBy, hop, mixAngle, pop, ramp, strike, thrown, timing, useNow, votes, walk,
} from "./kit";
import type { Throw } from "./kit";

/**
 * BEAT 2 — YOUR VILLAGE. Four things that are true of a leader where people vote: he is picked, a judge can stop
 * him, anyone can say he is doing it badly, and he can lose.
 *
 * This exhibit is everybody who lives in your village (except you: Exhibit1), and the one hat. The leader is ONE
 * villager and he walks from each thing to the next; the camera's flights go with him.
 */

/** Moments on the film's clock. */
const T = {
  people: clock.at("2.vote", "people"),
  vote: clock.at("2.vote", "vote"),
  breaks: clock.at("2.judge", "breaks"),
  judge: clock.at("2.judge", "judge"),
  no: clock.at("2.judge", "no"),
  job: clock.at("2.loud", "job"),
  anyone: clock.at("2.loud", "anyone"),
  can: clock.at("2.loud", "can"),
  so: clock.at("2.loud", "so"),
  loud: clock.at("2.loud", "loud"),
  every: clock.at("2.again", "every"),
  again: clock.at("2.again", "again"),
  he: clock.at("2.again", "he"),
  lose: clock.at("2.again", "lose"),
};

/** The four who vote: two on each side of the square, out of the way of the box. */
const VOTERS: Vec3[] = [HOME.p(-3.35, 0, 2.3), HOME.p(2.9, 0, 1.35), HOME.p(-3.95, 0, 1.65), HOME.p(3.5, 0, 2.05)];
/** The first vote: eight stones, five of them for A. And the next one, years later: five of eight for B. */
const FIRST: Throw[] = votes(T.people - 0.27, 0.16, "ABAABABA", 4);
const AGAIN: Throw[] = votes(T.again - 0.76, 0.15, "BABBABAB", 4);
/** The piles of the first vote are swept away when the next one is called. */
const SWEPT = T.every - 0.1;

/** The hat comes down on A as the word 'vote' is said, and leaves him on 'he can lose'. */
const CROWNED = T.vote + 0.16;
const UNCROWNED = T.he;
const RECROWNED = T.he + 0.5;

/** The leader's walks: to the bridge to hear what they think of it, back for the next vote, and home when he has lost it. */
const TO_BRIDGE = T.job - 0.25;
const TO_SQUARE = T.every - 0.3;
const TO_HOUSE = T.lose + 0.35;
/** The loaf: off the shelf as he breaks the rule, and back on it when the judge has said no. */
const TAKEN = T.breaks + 0.22;
const RETURNED = T.no + 0.28;
/** The three planks of the new bridge that were never nailed down. */
const PLANK = T.job + 0.1;

/** A stone on its way from a voter's hands to the slot. */
export const Ballots: React.FC<{ list: Throw[]; throwers: Vec3[]; slot: Vec3; now: number }> = ({ list, throwers, slot, now }) => (
  <>
    {list.map((v, i) => {
      const from = throwers[v.by];
      const d = Math.hypot(slot[0] - from[0], slot[2] - from[2]);
      const hand: Vec3 = [from[0] + ((slot[0] - from[0]) / d) * 0.35, from[1] + 1.2, from[2] + ((slot[2] - from[2]) / d) * 0.35];
      const at = thrown(now, v.at, FLY, hand, slot, 0.75);
      return at ? <VoteStone key={i} position={at} spin={(now - v.at) * 11 + i} /> : null;
    })}
  </>
);

/** How high a voter hops as each of his stones leaves his hands. */
export const throwHop = (list: Throw[], who: number, now: number): number => list.reduce((h, v) => (v.by === who ? Math.max(h, hop(now - v.at + 0.08, 0.09, 0.22)) : h), 0);

export const Exhibit2: React.FC = () => {
  const now = useNow();

  // ---- the leader: one villager, who walks
  const out = walk([HOME.spotA, BRIDGE_LEADER], now, TO_BRIDGE, 1.15);
  const back = walk([BRIDGE_LEADER, HOME.spotA], now, TO_SQUARE, 1.3);
  const off = walk([HOME.spotA, HOME.p(-3.2, 0, 1.3), HOME.p(-5.2, 0, 2.9)], now, TO_HOUSE, 1.0);
  const leg = now < TO_SQUARE ? out : now < TO_HOUSE ? back : off;
  const walked = out.walked + back.walked + off.walked;
  // Standing, he faces us and a little towards the box; with a loaf that is not his, he is turned to the shelf.
  const atShelf = ease(ramp(now, T.breaks - 0.35, T.breaks + 0.05)) * (1 - ease(ramp(now, RETURNED + 0.3, RETURNED + 0.7)));
  const standing = now < TO_BRIDGE ? mixAngle(0.3, -0.7, atShelf) : now < TO_SQUARE ? -Math.PI / 2 + 0.35 : 0.3;
  const facing = leg.going ? mixAngle(standing, leg.rot, 0.85) : standing;
  // Told no by the judge, told no by everyone at the bridge, and voted out: three times his head goes down.
  const shamed = Math.max(ease(ramp(now, T.no + 0.05, T.no + 0.35)) * (1 - ease(ramp(now, TO_BRIDGE - 0.3, TO_BRIDGE))), ease(ramp(now, T.loud - 0.1, T.loud + 0.25)) * (1 - ease(ramp(now, TO_SQUARE, TO_SQUARE + 0.3))), ease(ramp(now, UNCROWNED + 0.35, UNCROWNED + 0.7)));
  const hasHat = now >= CROWNED && now < UNCROWNED;
  const leader: Vec3 = leg.p;

  // ---- the hat
  const falling = thrown(now, CROWNED - 0.3, 0.3, [HOME.spotA[0], HOME.spotA[1] + 4.4, HOME.spotA[2]], headTop(HOME.spotA), 0);
  const crossing = thrown(now, UNCROWNED, RECROWNED - UNCROWNED, headTop(HOME.spotA), headTop(HOME.spotB), 1.05);
  const bHasHat = now >= RECROWNED;

  // ---- the loaf
  const inArms = heldBy(HOME.spotA, -0.7);
  const loafTo = thrown(now, TAKEN, 0.32, SHELF_LOAF, inArms, 0.45);
  const loafBack = thrown(now, RETURNED, 0.32, inArms, SHELF_LOAF, 0.5);
  const loaf: Vec3 = loafTo ?? loafBack ?? (now > TAKEN && now < RETURNED ? inArms : SHELF_LOAF);

  // ---- the piles
  const second = now >= SWEPT;
  const list = second ? AGAIN : FIRST;

  return (
    <>
      {/* The two who are voted on. A is picked first; years later B is. */}
      <Folk
        position={leader}
        rotationY={facing}
        robe={ROBES.leaderA}
        walk={walked}
        nod={0.42 * shamed}
        lookAt={now > UNCROWNED && now < UNCROWNED + 0.4 ? headTop(HOME.spotB) : undefined}
        phase={0.3}
        head={hasHat ? <LeaderHat /> : undefined}
      />
      <Folk
        position={[HOME.spotB[0], HOME.spotB[1] + hop(now - RECROWNED, 0.16, 0.3), HOME.spotB[2]]}
        rotationY={-0.3}
        robe={ROBES.leaderB}
        nod={-0.12 * ease(ramp(now, RECROWNED, RECROWNED + 0.3))}
        phase={1.7}
        head={bHasHat ? <LeaderHat /> : undefined}
      />
      {falling ? <FlyingHat at={falling} /> : null}
      {crossing ? <FlyingHat at={crossing} spin={(now - UNCROWNED) * 7} tilt={0.25} /> : null}

      {/* The vote: stones in the air, and the two piles they are counted on. */}
      <Ballots list={FIRST} throwers={VOTERS} slot={HOME.slot} now={now} />
      <Ballots list={AGAIN} throwers={VOTERS} slot={HOME.slot} now={now} />
      <VotePile position={HOME.pileA} landed={counted(list, "A")} t={now} gone={second ? undefined : SWEPT - 0.2} />
      <VotePile position={HOME.pileB} landed={counted(list, "B")} t={now} gone={second ? undefined : SWEPT - 0.2} />
      {VOTERS.map((p, i) => (
        <Villager
          key={i}
          position={[p[0], p[1] + throwHop(FIRST, i, now) + throwHop(AGAIN, i, now), p[2]]}
          rotationY={Math.atan2(HOME.slot[0] - p[0], HOME.slot[2] - p[2])}
          robe={ROBES.voters[i]}
          phase={i * 1.3}
          nod={-0.08}
        />
      ))}

      {/* The judge: over everyone in the square, the leader included. One blow of the hammer, and one word. */}
      <Folk
        position={HOME.judge}
        robe={ROBES.judge}
        turn={-0.6 * ease(ramp(now, T.breaks + 0.3, T.judge - 0.1)) * (1 - ease(ramp(now, T.job - 0.3, T.job)))}
        nod={0.24 * ease(ramp(now, T.breaks + 0.3, T.judge - 0.1)) * (1 - ease(ramp(now, T.job - 0.3, T.job)))}
        phase={2.2}
        head={<Wig />}
        body={<Tabs />}
        hands={<Gavel swing={strike(now, T.judge + 0.04)} />}
      />
      <No position={HOME.over} rotationY={-0.12} scale={1.25 * pop(now, T.no, 0.22) * (1 - ease(ramp(now, T.anyone - 0.2, T.anyone)))} tail={-1} />

      {/* The baker, and the loaf that was taken and put back. */}
      <Villager position={[BAKER[0], BAKER[1] + hop(now - TAKEN - 0.1, 0.12, 0.26), BAKER[2]]} rotationY={0.75} robe={ROBES.baker} turn={0.35} phase={0.9} nod={now > RETURNED + 0.3 ? 0.12 : 0} />
      <Icon kind="bang" position={[BAKER[0], BAKER[1] + 2.25, BAKER[2]]} height={0.34} outline glow={0.3} scale={pop(now, TAKEN + 0.12, 0.2) * (1 - ease(ramp(now, RETURNED + 0.2, RETURNED + 0.45)))} />
      <Bread position={loaf} rotationY={0.2} scale={1.05} />

      {/* The three at the bridge behind you. Each says it too, one after the other, and nothing happens to them. */}
      {BRIDGE_FOLK.map((p, i) => {
        const said = now - [T.can, T.so, T.loud][i];
        return (
          <group key={i}>
            <Villager position={[p[0], p[1] + hop(said, 0.1, 0.24), p[2]]} rotationY={-Math.PI / 2 + 0.3 + i * 0.12} robe={ROBES.bridge[i]} phase={i * 2.1 + 0.4} nod={-0.06} />
            <No position={[p[0] + 0.05, p[1] + 2.32, p[2]]} scale={0.62 * pop(said, 0, 0.2) * (1 - ease(ramp(now, T.every + 0.5, T.every + 0.7)))} tail={i === 1 ? 1 : -1} />
          </group>
        );
      })}

      {/* The planks that were never nailed down: they drop out as the camera gets there. */}
      {[0, 1, 2].map((i) => {
        const fell = now - PLANK - i * 0.09;
        const x = HOLE[0] - 0.21 - i * 0.415;
        const y = fell > 0 ? -4.9 * fell * fell : 0;
        if (y < -9) return null;
        const at = HOME.p(x, -0.09 + y, BRIDGE_Z);
        return (
          <mesh key={i} position={at} rotation={[fell > 0 ? fell * (2 + i) : 0, 0, fell > 0 ? fell * (i - 1) * 1.6 : 0]} castShadow>
            <boxGeometry args={[0.38, 0.14, 1.4]} />
            <meshStandardMaterial color={i === 1 ? "#a8824a" : "#b48d52"} roughness={1} />
          </mesh>
        );
      })}
    </>
  );
};

export const scene2 = flightScene(timing, {
  id: "scene2",
  title: "Your village",
  from: STOPS.you,
  shots: [
    {
      cue: "2.vote",
      to: STOPS.vote,
      note: "Up off the statue and over the gap to the square at home. Stones fly in from both sides and drop through the slot of the box; each one is counted on one of two piles, and when the left pile is the taller the purple hat comes down on the head beside it.",
    },
    {
      cue: "2.judge",
      to: STOPS.judge,
      note: "Round to the left, so that the judge at the high desk is over the leader in the frame as he is in the village. A loaf leaves the baker's shelf for the leader's arms; the hammer comes down, a red NO pops over the bench, and the loaf goes back.",
    },
    {
      cue: "2.loud",
      to: STOPS.loud,
      note: "Along to the edge of the island and the new bridge, seen from the side: three planks drop out of it against the sky. You point, a NO pops over your head, then over each villager behind you, and the leader, who has walked over, hangs his head.",
    },
    {
      cue: "2.again",
      to: STOPS.again,
      note: "Back to the box from the other side. The old piles are swept off, the stones fly again, and this time the right pile wins: the hat lifts off his head, crosses over the box and lands on hers, and he walks home.",
    },
  ],
});
