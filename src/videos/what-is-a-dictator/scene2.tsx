import type React from "react";
import type { Vec3 } from "../../engine";
import {
  BAKER, BRIDGE_LEADER, BRIDGE_Z, Bread, EAST_LATER, EAST_VOTERS, FLY, FlyingHat, Folk, Gavel, HOLE, HOME, Icon, LeaderHat, NEIGHBOUR, No, ROBES, SHARED, STOPS, Tabs, Villager, VotePile, VoteStone, Wig, clock,
  counted, ease, flightScene, headTop, heldBy, hop, mixAngle, pop, ramp, strike, thrown, timing, useNow, votes, walk,
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
  say: clock.at("2.loud", "say"),
  out: clock.at("2.loud", "out"),
  loud: clock.at("2.loud", "loud"),
  every: clock.at("2.again", "every"),
  again: clock.at("2.again", "again"),
  he: clock.at("2.again", "he"),
  lose: clock.at("2.again", "lose"),
};

/** The four throws of a round come from the neighbour on the west side and the two on the east, in turn. */
const VOTERS: Vec3[] = [NEIGHBOUR, EAST_VOTERS[0], NEIGHBOUR, EAST_VOTERS[1]];
/** The first vote: eight stones, five of them for A. And the next one, years later: five of eight for B. */
const FIRST: Throw[] = votes(T.people - 0.27, 0.16, "ABAABABA", 4);
const AGAIN: Throw[] = votes(T.again - 0.76, 0.15, "BABBABAB", 4);
/** The piles of the first vote are swept away when the next one is called. */
const SWEPT = T.every - 0.1;

/** The hat comes down on A as the word 'vote' is said, and leaves him on 'he can lose'. */
const CROWNED = T.vote + 0.16;
const UNCROWNED = T.he;
const RECROWNED = T.he + 0.5;

/** The loaf: out of the baker's arms as the leader breaks the rule, and back in them when the judge has said no. */
const TAKEN = T.breaks + 0.22;
const RETURNED = T.no + 0.17;
/** The leader's walks: to his new bridge, back for the next vote, and home when he has lost it. He goes behind the baker. */
const TO_BRIDGE = T.no + 0.34;
const TO_SQUARE = T.every - 0.25;
const TO_HOUSE = T.lose + 0.35;
const ROUND_BAKER: Vec3[] = [HOME.p(-2.45, 0, -1.05), HOME.p(-3.35, 0, -1.05)];

/** Which way people face. 0 is towards the lens. */
const BAKER_FACES = 0.4;
const WITH_LOAF = -0.7;

/** A stone on its way from a voter's hands to the slot. One thrown from far off is lobbed: longer in the air, and over everybody's heads. */
export const Ballots: React.FC<{ list: Throw[]; throwers: Vec3[]; slot: Vec3; now: number }> = ({ list, throwers, slot, now }) => (
  <>
    {list.map((v, i) => {
      const from = throwers[v.by];
      const d = Math.hypot(slot[0] - from[0], slot[2] - from[2]);
      const far = d > 3.8;
      const fly = far ? FLY + 0.16 : FLY;
      const hand: Vec3 = [from[0] + ((slot[0] - from[0]) / d) * 0.35, from[1] + 1.2, from[2] + ((slot[2] - from[2]) / d) * 0.35];
      // It lands when the count says it does, however long it was in the air.
      const at = thrown(now, v.at + FLY - fly, fly, hand, slot, far ? 1.9 : 0.75);
      return at ? <VoteStone key={i} position={at} spin={(now - v.at) * 11 + i} /> : null;
    })}
  </>
);

/** How high a voter hops as each of his stones leaves his hands. `who` is his place among the throwers. */
export const throwHop = (list: Throw[], who: number, now: number): number => list.reduce((h, v) => (v.by === who ? Math.max(h, hop(now - v.at + 0.08, 0.09, 0.22)) : h), 0);

export const Exhibit2: React.FC = () => {
  const now = useNow();

  // ---- the leader: one villager, who walks
  const out = walk([HOME.spotA, ...ROUND_BAKER, BRIDGE_LEADER], now, TO_BRIDGE, 2.4);
  const back = walk([BRIDGE_LEADER, ROUND_BAKER[1], ROUND_BAKER[0], HOME.spotA], now, TO_SQUARE, 1.9);
  const off = walk([HOME.spotA, HOME.p(-2.2, 0, 0.9), HOME.p(-4.3, 0, 3.1)], now, TO_HOUSE, 1.0);
  const leg = now < TO_SQUARE ? out : now < TO_HOUSE ? back : off;
  const walked = out.walked + back.walked + off.walked;
  // Standing in the square he faces us and a little towards the box; with a loaf that is not his he is turned to
  // the baker; at the bridge he faces the hole, and you.
  const withLoaf = ease(ramp(now, T.breaks - 0.3, T.breaks + 0.05)) * (1 - ease(ramp(now, RETURNED + 0.05, RETURNED + 0.3)));
  const standing = now < TO_BRIDGE ? mixAngle(0.3, WITH_LOAF, withLoaf) : now < TO_SQUARE ? -Math.PI / 2 + 0.3 : 0.3;
  const facing = leg.going ? mixAngle(standing, leg.rot, 0.85) : standing;
  // Told no by the judge, told no by everyone at the bridge, and voted out: three times his head goes down.
  const shamed = Math.max(
    ease(ramp(now, T.no + 0.05, T.no + 0.3)) * (1 - ease(ramp(now, TO_BRIDGE + 0.1, TO_BRIDGE + 0.4))),
    ease(ramp(now, T.loud - 0.1, T.loud + 0.25)) * (1 - ease(ramp(now, TO_SQUARE, TO_SQUARE + 0.3))),
    ease(ramp(now, UNCROWNED + 0.35, UNCROWNED + 0.7)),
  );
  const hasHat = now >= CROWNED && now < UNCROWNED;
  // He steps up to his bridge as the planks go, and jumps back from it.
  const leader: Vec3 = [leg.p[0], leg.p[1] + hop(now - SHARED.planks - 0.06, 0.14, 0.26), leg.p[2]];

  // ---- the hat
  const falling = thrown(now, CROWNED - 0.3, 0.3, [HOME.spotA[0], HOME.spotA[1] + 4.4, HOME.spotA[2]], headTop(HOME.spotA), 0);
  const crossing = thrown(now, UNCROWNED, RECROWNED - UNCROWNED, headTop(HOME.spotA), headTop(HOME.spotB), 1.05);
  const bHasHat = now >= RECROWNED;
  // The one they picked next goes about her job once the camera has left: out of the way of the last scene.
  const spotB: Vec3 = now < SHARED.tidied ? HOME.spotB : HOME.p(2.75, 0, -1.0);

  // ---- the baker: he turns on the leader with everybody else at the bridge, and has his say
  const atBridge = ease(ramp(now, T.job, T.job + 0.4)) * (1 - ease(ramp(now, TO_SQUARE + 0.2, TO_SQUARE + 0.7)));
  const bakerFaces = mixAngle(BAKER_FACES, -Math.PI / 2 + 0.45, atBridge);
  const baker: Vec3 = [BAKER[0], BAKER[1] + hop(now - TAKEN - 0.1, 0.14, 0.26) + hop(now - T.out, 0.1, 0.24), BAKER[2]];

  // ---- the loaf: the baker's, then in the leader's arms, then the baker's again
  const bakers = heldBy(baker, bakerFaces);
  const leaders = heldBy(HOME.spotA, WITH_LOAF);
  const loafTo = thrown(now, TAKEN, 0.3, heldBy(BAKER, BAKER_FACES), leaders, 0.42);
  const loafBack = thrown(now, RETURNED, 0.3, leaders, heldBy(BAKER, BAKER_FACES), 0.5);
  const taken = now >= TAKEN + 0.3 && now < RETURNED;
  const loaf: Vec3 = loafTo ?? loafBack ?? (taken ? leaders : bakers);
  const loafTurn = loafTo || loafBack ? (now - TAKEN) * 7 : taken ? WITH_LOAF : bakerFaces;

  // ---- the piles
  const second = now >= SWEPT;
  const list = second ? AGAIN : FIRST;
  // When the camera is over the other village the square is tidied: at the end there is the box, and you.
  const tidy = SHARED.tidied;

  // ---- the neighbour: he votes from where he stands, and at the bridge he says it too
  const neighbourUp = throwHop(FIRST, 0, now) + throwHop(FIRST, 2, now) + throwHop(AGAIN, 0, now) + throwHop(AGAIN, 2, now) + hop(now - T.say, 0.1, 0.24);
  const toBox = Math.atan2(HOME.slot[0] - NEIGHBOUR[0], HOME.slot[2] - NEIGHBOUR[2]);

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
        position={[spotB[0], spotB[1] + hop(now - RECROWNED, 0.16, 0.3), spotB[2]]}
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
      <VotePile position={HOME.pileA} landed={counted(list, "A")} t={now} gone={second ? tidy : SWEPT - 0.2} />
      <VotePile position={HOME.pileB} landed={counted(list, "B")} t={now} gone={second ? tidy : SWEPT - 0.2} />
      {(now < tidy ? EAST_VOTERS : EAST_LATER).map((p, i) => (
        <Villager
          key={i}
          position={[p[0], p[1] + throwHop(FIRST, i * 2 + 1, now) + throwHop(AGAIN, i * 2 + 1, now), p[2]]}
          rotationY={now < tidy ? Math.atan2(HOME.slot[0] - p[0], HOME.slot[2] - p[2]) : i ? -2.2 : 0.9}
          robe={ROBES.voters[i]}
          phase={i * 1.3}
          nod={-0.08}
        />
      ))}

      {/* The judge: over everyone in the square, the leader included. One blow of the hammer, and one word. (The court is not sitting at the end: the last picture is yours.) */}
      {now < tidy ? (
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
      ) : null}
      <No position={HOME.p(-0.12, 3.62, -2.5)} rotationY={-0.3} scale={1.15 * pop(now, T.no, 0.22) * (1 - ease(ramp(now, T.job - 0.1, T.job + 0.1)))} tail={1} />

      {/* The baker, and the loaf that was taken out of his arms and put back in them. */}
      <Villager
        position={baker}
        rotationY={bakerFaces}
        robe={ROBES.baker}
        turn={0.45 * (1 - atBridge) * ease(ramp(now, TAKEN, TAKEN + 0.2))}
        phase={0.9}
        nod={now > RETURNED + 0.3 && now < T.job ? 0.12 : 0}
      />
      <Icon kind="bang" position={[BAKER[0], BAKER[1] + 2.25, BAKER[2]]} height={0.36} outline glow={0.3} scale={pop(now, TAKEN + 0.12, 0.2) * (1 - ease(ramp(now, RETURNED + 0.1, RETURNED + 0.35)))} />
      <Bread position={loaf} rotationY={loafTurn} scale={1.3} />

      {/* The neighbour, who votes with everybody else. */}
      <Villager
        position={[NEIGHBOUR[0], NEIGHBOUR[1] + neighbourUp, NEIGHBOUR[2]]}
        rotationY={mixAngle(toBox, 0.55, atBridge)}
        robe={ROBES.bridge[0]}
        phase={2.5}
        nod={-0.06}
      />

      {/* What the two of them think of the bridge: said out loud, one after the other, and nothing happens to them. (You are the first: Exhibit1.) */}
      <No position={[NEIGHBOUR[0] + 0.02, NEIGHBOUR[1] + 2.78, NEIGHBOUR[2]]} scale={0.66 * pop(now, T.say, 0.2) * (1 - ease(ramp(now, T.every + 0.4, T.every + 0.6)))} tail={-1} />
      <No position={[BAKER[0] + 0.02, BAKER[1] + 2.34, BAKER[2]]} scale={0.66 * pop(now, T.out, 0.2) * (1 - ease(ramp(now, T.every + 0.4, T.every + 0.6)))} tail={-1} />

      {/* The two planks that were never nailed down: they drop out as he steps up to show it off. */}
      {[0, 1].map((i) => {
        const fell = now - SHARED.planks - i * 0.09;
        const x = HOLE[0] - 0.21 - i * 0.415;
        const y = fell > 0 ? -4.9 * fell * fell : 0;
        if (y < -9) return null;
        const at = HOME.p(x, -0.09 + y, BRIDGE_Z);
        return (
          <mesh key={i} position={at} rotation={[fell > 0 ? fell * (2 + i) : 0, 0, fell > 0 ? fell * (i - 0.5) * 3.2 : 0]} castShadow>
            <boxGeometry args={[0.38, 0.14, 1.4]} />
            <meshStandardMaterial color={i === 1 ? "#a8824a" : "#b48d52"} roughness={1} />
          </mesh>
        );
      })}
    </>
  );
};
void T.anyone;

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
      note: "Round to the west, so that the judge at the high desk is over the leader in the frame as he is in the village. The baker's loaf hops out of his arms into the leader's; the hammer comes down, a red NO pops over the bench, and the loaf goes back.",
    },
    {
      cue: "2.loud",
      to: STOPS.loud,
      note: "Along with the leader to his new bridge, seen from the side: two planks drop out of it against the sky as he steps up. You turn on him and a NO pops over your head, then over the neighbour's and the baker's, and in the middle of them his head goes down.",
    },
    {
      cue: "2.again",
      to: STOPS.again,
      note: "Back to the box, from the other side. The old piles are swept off, the stones fly again, and this time the right pile wins: the hat lifts off his head, crosses over the box and lands on hers, and he walks home.",
    },
  ],
});
