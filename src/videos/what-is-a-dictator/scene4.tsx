import type React from "react";
import type { Vec3 } from "../../engine";
import {
  Banner, Bits, Cage, DESK_TOP, FASCIA, FLY, Folk, GATE_X, GREY, Gavel, Helmet, No, NoBits, Puffs, ROBES, SHARED, STOPS, Spear, Tabs, Villager, VoteBox, VotePile, VoteStone, Voxels, Wig, clock, counted,
  dropped, ease,
  flightScene, hop, mixAngle, ramp, textRows, thrown, timing, useNow, votes, walk,
} from "./kit";
import type { Throw } from "./kit";
import { Ballots, throwHop } from "./scene2";

/**
 * BEAT 4 — HOW IT IS DONE. Two ways in, three things he does once he is in, and then the name for it.
 *
 * This exhibit is everybody in the other village except the man himself (Exhibit3): the people, the soldiers, the
 * judge, the woman who ran against him, their vote and what becomes of it, and the word cut into the balcony.
 */

/** Moments on the film's clock. */
const T = {
  no3: clock.at("3.hates", "no"),
  army: clock.at("4.army"),
  won: clock.at("4.won"),
  first: clock.at("4.won", "first"),
  locks: clock.at("4.jail", "locks"),
  wrong: clock.at("4.jail", "wrong"),
  next: clock.at("4.vote", "next"),
  vote: clock.at("4.vote", "vote"),
  never: clock.at("4.vote", "never"),
  dictator: clock.at("4.name", "dictator"),
  noVote: clock.at("4.name", "vote"),
  make: clock.at("4.name", "make"),
};

// ---- the people of the square

/** Five of them stand under the balcony for the first line; when the soldiers come they back away to both sides. */
export const CROWD_UNDER: Vec3[] = [GREY.p(-5.6, 0, 1.0), GREY.p(-4.9, 0, 0.5), GREY.p(-4.2, 0, 1.1), GREY.p(-3.6, 0, 0.6), GREY.p(-5.2, 0, 1.7)];
export const CROWD_APART: Vec3[] = [GREY.p(-6.8, 0, 0.95), GREY.p(-6.55, 0, 0.05), GREY.p(-2.75, 0, 1.4), GREY.p(-2.95, 0, 0.45), GREY.p(-7.05, 0, 1.8)];
const PARTS = T.army + 0.05;
/** The four who vote here: two of the crowd, on the left of the square, and two more on its right. */
const VOTERS: Vec3[] = [CROWD_APART[2], GREY.p(3.6, 0, 0.2), CROWD_APART[3], GREY.p(4.3, 0, 0.9)];
/** Where the stone that bounces off the locked box comes to rest: in front of it, in the picture. */
const BOUNCED: Vec3 = GREY.p(0.6, 0.13, 1.1);
/** The fair vote: six stones, four of them for him. */
const FAIR: Throw[] = votes(T.won + 0.3, 0.13, "ABAABA", 4);
/** The next vote: three stones go in, and each one comes out as three on his pile. */
const FIXED = [T.vote, T.vote + 0.22, T.vote + 0.44];
const FIXED_BY = [1, 0, 3];
const HIS_PILE = [...counted(FAIR, "A"), ...FIXED.flatMap((at) => [at + FLY, at + FLY + 0.07, at + FLY + 0.14])];
/** And then it never comes: the lock drops on the box, and the stone thrown after it bounces off. */
const LOCKED = T.never - 0.02;
const BOUNCER = T.never + 0.06;

// ---- the soldiers

/** Six march in through the gate, two by two. `MARCH` is when the front rank starts, far inside; they halt in front of the gate. */
const MARCH = T.army - 0.97;
const MARCH_SPEED = 2.2;
const HALT_Z = -0.9;
const RANK = 1.1;
/** Two more come out of the door behind the bench, for the judge. */
const FETCH_1 = T.first + 0.15;
const FETCH_2 = T.first + 0.45;
const TAKE = T.first + 1.15;
const JUDGE_GOES = T.first + 1.3;
const BEHIND_GOES = T.first + 1.05;

// ---- the woman who ran against him

/** She says it; the cage comes down; the NO is under it. */
const SHE_SAYS = T.locks - 0.2;
const CAGE_FALLS = T.locks + 0.18;
const CAGE_DOWN = CAGE_FALLS + 0.3;

// ---- the word

/** The picture of a word with only its first `k` (0–1) of columns cut: letters appear from the left, as if carved. */
const carved = (rows: string[], k: number): string[] => {
  const width = Math.max(...rows.map((r) => r.length));
  const shown = Math.round(width * Math.min(1, Math.max(0, k)));
  return rows.map((r) => r.slice(0, shown) + ".".repeat(Math.max(0, width - shown)));
};
const WORD = textRows("DICTATOR");
/** Two votes thrown at it afterwards. They bounce off. */
const STONES: Array<{ at: number; from: Vec3; hit: Vec3; fall: Vec3 }> = [
  { at: T.noVote - 0.05, from: [CROWD_APART[3][0], CROWD_APART[3][1] + 1.9, CROWD_APART[3][2]], hit: [FASCIA[0] + 1.05, FASCIA[1] + 0.05, FASCIA[2] + 0.2], fall: GREY.p(-3.3, 0.14, 1.0) },
  { at: T.make - 0.1, from: [CROWD_APART[0][0], CROWD_APART[0][1] + 1.9, CROWD_APART[0][2]], hit: [FASCIA[0] - 0.95, FASCIA[1] - 0.05, FASCIA[2] + 0.2], fall: GREY.p(-6.1, 0.14, 0.7) },
];

export const Exhibit4: React.FC = () => {
  const now = useNow();
  const cowed = ease(ramp(now, T.wrong - 0.25, T.wrong + 0.05));

  // ---- the judge and the two who come for him
  const fetch1Out = walk([GREY.p(-1.25, 1, -4.1), GREY.p(-1.25, 1, -2.95), GREY.p(-0.7, 1, -2.75)], now, FETCH_1, 2.3);
  const fetch1Back = walk([GREY.p(-0.7, 1, -2.75), GREY.p(-1.25, 1, -2.95), GREY.p(-1.25, 1, -4.6)], now, TAKE, 2.0);
  const fetch2Out = walk([GREY.p(-1.25, 1, -4.5), GREY.p(-1.25, 1, -3.32)], now, FETCH_2, 2.3);
  const fetch2Back = walk([GREY.p(-1.25, 1, -3.32), GREY.p(-1.25, 1, -4.9)], now, BEHIND_GOES, 2.0);
  const judgeGoes = walk([GREY.judge, GREY.p(-0.7, 1, -2.75), GREY.p(-1.25, 1, -2.95), GREY.p(-1.25, 1, -4.3)], now, JUDGE_GOES, 2.0);
  const fetch1 = now < TAKE ? fetch1Out : fetch1Back;
  const fetch2 = now < BEHIND_GOES ? fetch2Out : fetch2Back;
  const pointed = ease(ramp(now, fetch1Out.end - 0.1, fetch1Out.end + 0.1)) * (1 - ease(ramp(now, TAKE - 0.05, TAKE + 0.15)));

  // ---- her
  const sheSaid = now - SHE_SAYS;
  const cageUp = now < CAGE_FALLS ? 6.5 : dropped(now - CAGE_FALLS, 6.5, 0.3);
  const caged = now - CAGE_DOWN;

  // ---- the box
  const lock = now < LOCKED - 0.25 ? undefined : dropped(now - (LOCKED - 0.25), 2.2, 0.25);
  const bounceIn = thrown(now, BOUNCER, FLY, [VOTERS[1][0] - 0.3, VOTERS[1][1] + 1.2, VOTERS[1][2] - 0.15], [GREY.slot[0], GREY.slot[1] + 0.08, GREY.slot[2]], 0.75);
  const bounceOff = thrown(now, BOUNCER + FLY, 0.42, [GREY.slot[0], GREY.slot[1] + 0.08, GREY.slot[2]], BOUNCED, 0.55);
  const lying = now >= BOUNCER + FLY + 0.42;

  return (
    <>
      {/* The people. They look up at the balcony; they back away from the soldiers; they vote; and after the cage they look at the ground. */}
      {CROWD_UNDER.map((from, i) => {
        const move = walk([from, CROWD_APART[i]], now, PARTS + i * 0.05, 1.9);
        const p = move.p;
        const votesHere = i === 2 ? 0 : i === 3 ? 2 : -1;
        const toBox = Math.atan2(GREY.slot[0] - p[0], GREY.slot[2] - p[2]);
        const toGate = Math.atan2(GREY.p(GATE_X, 0, -1.2)[0] - p[0], GREY.p(GATE_X, 0, -1.2)[2] - p[2]);
        const facing = !move.done ? mixAngle(Math.PI, toGate, ease(ramp(now, PARTS, PARTS + 0.5))) : votesHere >= 0 ? mixAngle(toGate, toBox, ease(ramp(now, T.won - 0.3, T.won + 0.1))) : toGate;
        const up = votesHere >= 0 ? throwHop(FAIR, votesHere, now) + hop(now - FIXED[FIXED_BY.indexOf(votesHere)] + 0.08, 0.09, 0.22) : 0;
        const flinch = hop(now - T.no3 - 0.12, 0.08, 0.22);
        return (
          <Villager
            key={i}
            position={[p[0], p[1] + up + flinch, p[2]]}
            rotationY={facing}
            robe={ROBES.crowd[i]}
            walk={move.walked}
            nod={now < PARTS ? (now > T.no3 + 0.15 ? 0.3 : -0.42) : 0.1 + 0.4 * cowed}
            phase={i * 1.9}
          />
        );
      })}
      {[1, 3].map((who) => {
        const p = VOTERS[who];
        const fixedAt = FIXED[FIXED_BY.indexOf(who)];
        const up = throwHop(FAIR, who, now) + hop(now - fixedAt + 0.08, 0.09, 0.22) + (who === 1 ? hop(now - BOUNCER + 0.08, 0.09, 0.22) : 0);
        return <Villager key={who} position={[p[0], p[1] + up, p[2]]} rotationY={Math.atan2(GREY.slot[0] - p[0], GREY.slot[2] - p[2])} robe={ROBES.crowd[who === 1 ? 4 : 1]} nod={0.05 + 0.42 * cowed} phase={who * 0.8} />;
      })}

      {/* The soldiers who march in. */}
      {[0, 1, 2].flatMap((rank) =>
        [-1, 1].map((file) => {
          const z0 = -6.6 - rank * RANK;
          const z = Math.min(HALT_Z - rank * RANK, z0 + Math.max(0, now - MARCH) * MARCH_SPEED);
          return (
            <Folk key={`${rank}${file}`} position={GREY.p(GATE_X + file * 0.47, 0, z)} robe={ROBES.soldier} walk={z - z0} phase={rank + file} head={<Helmet />} hands={<Spear side={file} />} />
          );
        }),
      )}

      {/* The judge, until two soldiers come out of the door behind him. */}
      {judgeGoes.done ? null : (
        <Folk
          position={[judgeGoes.p[0], judgeGoes.p[1] + hop(now - fetch1Out.end, 0.13, 0.24), judgeGoes.p[2]]}
          rotationY={judgeGoes.going ? judgeGoes.rot : mixAngle(0, -0.9, ease(ramp(now, fetch1Out.end - 0.2, fetch1Out.end + 0.1)))}
          robe={ROBES.judge}
          walk={judgeGoes.walked}
          nod={judgeGoes.going ? 0.35 : 0}
          phase={2.2}
          head={<Wig />}
          body={<Tabs />}
          hands={now < SHARED.judgeTaken ? <Gavel /> : undefined}
        />
      )}
      {/* His hammer: it drops out of his arms when the spear comes down, and lies on the desk until the man picks it up. */}
      {now >= SHARED.judgeTaken && now < SHARED.hammerTaken ? (
        <group position={GREY.p(0.3, DESK_TOP + 0.1 + dropped(now - SHARED.judgeTaken, 0.55, 0.16), -1.84)} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
          <Gavel swing={0} />
        </group>
      ) : null}
      {now > FETCH_1 && !fetch1Back.done ? (
        <Folk position={fetch1.p} rotationY={fetch1.going ? fetch1.rot : 1.45} robe={ROBES.soldier} walk={fetch1Out.walked + fetch1Back.walked} phase={0.4} head={<Helmet />} hands={<Spear jab={1.25 * pointed} />} />
      ) : null}
      {now > FETCH_2 && !fetch2Back.done ? (
        <Folk position={fetch2.p} rotationY={fetch2.going ? fetch2.rot : 0.5} robe={ROBES.soldier} walk={fetch2Out.walked + fetch2Back.walked} phase={1.4} head={<Helmet />} hands={<Spear side={-1} />} />
      ) : null}

      {/* The woman who ran against him: the one bright robe here. She says it, and the cage comes down. */}
      <Folk position={GREY.spotB} rotationY={-0.3} robe={ROBES.her} strain={caged > 0.15 ? 1 : 0} nod={caged > 0 ? 0.1 : sheSaid > 0 ? -0.2 : now > T.first ? 0.25 : 0} turn={sheSaid > 0 && caged < 0 ? -0.5 : 0} phase={1.1} />
      {now < CAGE_DOWN + 0.04 ? <No position={[GREY.spotB[0] + 0.05, GREY.spotB[1] + 2.42, GREY.spotB[2]]} scale={0.8 * (sheSaid > 0 ? 1 - Math.max(0, 1 - sheSaid / 0.2) ** 3 : 0)} /> : null}
      <NoBits position={[GREY.spotB[0] + 0.05, GREY.spotB[1] + 2.3, GREY.spotB[2]]} t={now - CAGE_DOWN - 0.04} seed={7} toward={[0.3, 0.2, 1.3]} power={1.4} />
      <Cage position={[GREY.spotB[0], GREY.spotB[1] + cageUp, GREY.spotB[2]]} rattle={caged > 0 && caged < 0.5 ? Math.sin(caged * 40) * 0.03 * (1 - caged / 0.5) : 0} />
      {caged > 0 && caged < 0.7 ? <Puffs position={[GREY.spotB[0], GREY.spotB[1] + 0.05, GREY.spotB[2] + 0.5]} color="#cfcfd2" count={6} rise={0.5} spread={0.7} size={0.2} speed={1.5} opacity={0.5 * (1 - caged / 0.7)} seed={4} /> : null}

      {/* The vote, and what becomes of it. */}
      <VoteBox position={GREY.box} lock={lock} shake={lying ? 0 : now > BOUNCER + FLY ? Math.sin((now - BOUNCER - FLY) * 50) * 0.02 : 0} />
      <Ballots list={FAIR} throwers={VOTERS} slot={GREY.slot} now={now} />
      <Ballots list={FIXED.map((at, i) => ({ at, by: FIXED_BY[i], to: "A" as const }))} throwers={VOTERS} slot={GREY.slot} now={now} />
      <VotePile position={GREY.pileA} landed={HIS_PILE} t={now} />
      <VotePile position={GREY.pileB} landed={counted(FAIR, "B")} t={now} gone={CAGE_DOWN} />
      <Bits position={[GREY.pileB[0], GREY.pileB[1] + 0.4, GREY.pileB[2]]} t={now - CAGE_DOWN} color="#8b8b8b" count={7} seed={9} power={0.9} toward={[-0.4, 0, 0.9]} />
      {bounceIn ? <VoteStone position={bounceIn} spin={(now - BOUNCER) * 11} /> : bounceOff ? <VoteStone position={bounceOff} spin={(now - BOUNCER) * 14} /> : lying ? <VoteStone position={BOUNCED} spin={0.6} /> : null}

      {/* His face, let down over the judge's chair when the vote is his. */}
      <Banner position={GREY.p(0, 4.02, -3.03)} width={1.06} length={2.12} shown={ease(ramp(now, T.next - 0.05, T.next + 0.45))} face />

      {/* THE WORD: cut into the front of the balcony as it is said, and what a vote does to it afterwards. */}
      <Voxels rows={carved(WORD, ramp(now, T.dictator - 0.06, T.dictator + 0.5))} position={[FASCIA[0], FASCIA[1], FASCIA[2] + 0.1]} height={0.5} maxWidth={2.72} depth={0.7} color="#f1ede2" glow={0.12} />
      {STONES.map((s, i) => {
        const up = thrown(now, s.at, 0.42, s.from, s.hit, 0.5);
        const down = thrown(now, s.at + 0.42, 0.6, s.hit, s.fall, 0.25);
        const since = now - s.at - 0.42;
        return (
          <group key={i}>
            {up ? <VoteStone position={up} spin={(now - s.at) * 10} /> : down ? <VoteStone position={down} spin={(now - s.at) * 13} /> : since > 0 ? <VoteStone position={s.fall} spin={i + 0.4} /> : null}
            <Bits position={s.hit} t={since} color="#d8d4c8" count={5} seed={12 + i} power={0.6} toward={[0, 0, 1]} />
          </group>
        );
      })}
    </>
  );
};

export const scene4 = flightScene(timing, {
  id: "scene4",
  title: "How it is done",
  from: STOPS.hates,
  shots: [
    {
      cue: "4.army",
      to: STOPS.army,
      note: "Down from the balcony to the gate under it. Soldiers in iron helmets come out of the dark two by two, straight at the lens, and the people who stood there back away to both sides.",
    },
    {
      cue: "4.won",
      to: STOPS.won,
      note: "Along to his square, framed exactly as yours was: the same box, the same two piles, the same stones flying. His pile is the taller, fairly, and the same hat comes down on him.",
    },
    {
      cue: "4.judge",
      to: STOPS.bench,
      note: "Up to the bench. Two soldiers come out of the door behind it, one lowers his spear at the judge, and they walk him in through it. The man comes up the steps as the judge goes, stands where he stood, and takes the hammer.",
    },
    {
      cue: "4.jail",
      to: STOPS.jail,
      note: "Round to the woman who ran against him, the one bright robe in the grey. A NO is over her head; his hammer comes down behind her, and a cage of iron bars drops round her and breaks it. Her pile of votes goes with it, and the others look at the ground.",
    },
    {
      cue: "4.vote",
      to: STOPS.fixed,
      note: "Back to the box. His face rolls down over the judge's chair; three stones go in and nine come out, all on his pile, until it stands higher than the bench. On 'never comes' a chain and padlock drop on the box, and the next stone bounces off the lid.",
    },
    {
      cue: "4.name",
      to: STOPS.name,
      note: "Back and up, to all of it at once: the gate, his banners, his soldiers, and the man out on the balcony again with the judge's hammer. The word is cut into the stone under his feet as it is said. Two votes are thrown up at it, and bounce off.",
    },
  ],
});
