import type React from "react";
import { Block, PixelText } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BAKERY, Balloon, CREEP, Figure, LATER, LOAF, Loaf, MINT, NoteBundle, NoteFall, Oven, PLACE, PRESS, PRESS_SCALE, PriceRoll, PriceTag, Printer, RACE_LINE, RACKS, ROBE,
  TOTEM, TOTEM_HIGH, Villager, Wheelbarrow, NoteHeap, clock, ease, flightScene, on, pop, ramp, timing,
} from "./kit";

/**
 * BEAT 5 — THE PART YOU DID NOT KNOW. The real world does what the village did, only slowly; and once, in one
 * country, it did it fast.
 *
 * Two places. On `real`, a printer and an oven stand side by side with what they make stacked on their roofs:
 * the stack of money pulls ahead, and in front of them a price tag creeps up under a balloon that has the word
 * for it written on it. On `old`, a hundred years down, the printer is as big as a house.
 */

/** From `a` to `b` in a hop, `k` 0 → 1. */
const hop = (a: Vec3, b: Vec3, k: number, lift = 0.7): Vec3 => {
  const e = ease(k);
  return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e + Math.sin(e * Math.PI) * lift, a[2] + (b[2] - a[2]) * e];
};

const BUNDLE = 0.15;
const SLICE = 0.24;

export const Exhibit5: React.FC = () => {
  const film = clock.useSince("1.ask");
  const real = clock.useSince("5.real");
  const faster = clock.useSince("5.faster");
  const name = clock.useSince("5.name");
  const year1 = clock.useSince("5.name", "year");
  const year2 = clock.useSince("5.name", "year", 1);
  const up = clock.useSince("5.name", "up");
  const inflation = clock.useSince("5.name", "inflation");
  const hundred = clock.useSince("5.germany", "hundred");
  const end = clock.useSince("5.billion", "end");
  const cost = clock.useSince("5.billion", "cost");
  const two = clock.useSince("5.billion", "two");
  const hundred2 = clock.useSince("5.billion", "hundred");
  const billion = clock.useSince("5.billion", "billion");

  // ---- the race. How many bundles of notes and how many loaves have been made so far. Slowly at first
  // ("only slowly"), then both faster, the money a little faster than the bread.
  const money = 4 + 2 * ramp(real, 0.8, 2.6) + 9 * ramp(faster, 0.05, 2.35) + 3 * ramp(name, 0.3, 3.9);
  const bread = 3 + 1 * ramp(real, 1.0, 2.6) + 4 * ramp(faster, 0.05, 2.35) + 1 * ramp(name, 0.5, 3.9);
  const bundleAt = (k: number): Vec3 => [MINT[0] + (((k * 37) % 5) - 2) * 0.012, RACE_LINE + k * BUNDLE, MINT[2] + (((k * 53) % 5) - 2) * 0.012];
  const sliceAt = (k: number): Vec3 => [BAKERY[0] - 0.3 + (((k * 29) % 5) - 2) * 0.012, RACE_LINE + k * SLICE, BAKERY[2] - 0.05];
  const tray: Vec3 = [MINT[0], MINT[1] + 0.42, MINT[2] + 0.8];
  const mouth: Vec3 = [BAKERY[0], BAKERY[1] + 0.55, BAKERY[2] + 0.82];

  // ---- the price that creeps up: three small steps, one for each 'year' and one for 'up', and one last pump on the word.
  const steps = ease(ramp(year1, 0, 0.3)) + ease(ramp(year2, 0, 0.3)) + ease(ramp(up, -0.2, 0.15));
  const pump = ease(ramp(inflation, -0.05, 0.32));
  // The loaf, its tag and its balloon are not there until the line that is about them.
  const here = pop(name, 0.1, 0.26);
  const size = (0.42 + 0.16 * steps + 0.17 * pump + (inflation > 0 ? Math.sin(inflation * 7) * 0.02 * Math.exp(-inflation * 1.5) : 0)) * here;
  // The tag hangs close over the loaf, so loaf, price and balloon are one tall thing in the upper two thirds of the frame.
  const knot: Vec3 = [CREEP[0], PLACE.real[1] + 2.5 + 0.15 * steps + 0.04 * pump + Math.sin(film * 1.4) * 0.015, CREEP[2] + 0.05];
  const cardBottom = knot[1] - 0.97;
  const loafTop = CREEP[1] + 0.39;

  // ---- Germany, 1923: the price unrolls. One row on 'cost', and one more on each of 'two', 'hundred', 'billion'.
  const rows = ease(ramp(cost, -0.12, 0.12)) + ease(ramp(two, -0.05, 0.14)) + ease(ramp(hundred2, -0.04, 0.14)) + ease(ramp(billion, -0.02, 0.22));

  return (
    <>
      {/* ================= the real world ================= */}
      <group position={MINT}>
        <Printer out={(film * 3) % 22} tray={22} />
      </group>
      <Oven position={BAKERY} fire={0.8 + 0.25 * Math.sin(film * 3)} chimney={0.45} />
      {Array.from({ length: Math.ceil(money) }, (_, k) => {
        const f = Math.min(1, money - k);
        const at = f >= 1 ? bundleAt(k) : hop(tray, bundleAt(k), f, 0.9);
        return <NoteBundle key={`m${k}`} position={at} rotationY={((k * 31) % 7) * 0.05 - 0.15} scale={f >= 1 ? 1 : 0.4 + 0.6 * ease(f * 3)} />;
      })}
      {Array.from({ length: Math.ceil(bread) }, (_, k) => {
        const f = Math.min(1, bread - k);
        const at = f >= 1 ? sliceAt(k) : hop(mouth, sliceAt(k), f, 0.8);
        return <Loaf key={`b${k}`} position={at} rotationY={((k * 23) % 7) * 0.04 - 0.12} scale={f >= 1 ? 1 : 0.4 + 0.6 * ease(f * 3)} />;
      })}

      {/* The loaf in front of the stage, and its price on the end of a balloon. */}
      <Loaf position={CREEP} rotationY={-0.2} scale={LOAF * here} />
      {here > 0.9 ? <Block position={[CREEP[0], (loafTop + cardBottom) / 2, CREEP[2] + 0.05]} size={[0.014, Math.max(0.02, cardBottom - loafTop), 0.014]} color="#5c4630" castShadow={false} /> : null}
      <PriceTag text={String(2 + Math.floor(steps + 0.5))} position={knot} scale={1.6 * here} swing={Math.sin(film * 2.1) * 0.03} />
      <Balloon position={knot} size={size} />
      <PixelText text="INFLATION" position={[knot[0], knot[1] + 0.07 + size * 0.14 + size * 0.5, knot[2] + size * 0.5 + 0.012]} height={0.34 * pop(inflation, 0, 0.28)} maxWidth={size * 0.9} color="#fff6e0" />

      {/* Two who live here, one outside each house. They watch the race. */}
      <Villager position={on(PLACE.real, -3.3, 0, 1.4)} rotationY={0.7} robe={ROBE.blue} nod={-0.12 - 0.1 * ramp(faster, 0.4, 2.2)} phase={1} />
      <Villager position={on(PLACE.real, 3.35, 0, 1.2)} rotationY={-0.7} robe={ROBE.farmer} hat="straw" nod={-0.1 - 0.06 * ramp(faster, 0.4, 2.2)} phase={3} />

      {/* ================= Germany, 1923 ================= */}
      <group position={PRESS} scale={PRESS_SCALE}>
        <Printer out={(film * 16) % 24} tray={24} sign="M" />
      </group>
      <NoteFall from={[PRESS[0], PRESS[1] + 1.3, PRESS[2] + 2.75]} push={[0.4, 0.2, 3.6]} drop={17} count={84} t={film} speed={0.3} spread={1.5} scale={2.3} seed={3} />
      <Figure text="1923" position={[PRESS[0], PRESS[1] + 4.45, PRESS[2] + 0.2]} height={0.95} depth={0.8} color="#f4efe0" outline scale={pop(hundred, -0.35, 0.3)} />
      <Villager position={[PRESS[0] - 2.85, PRESS[1], PRESS[2] + 0.6]} rotationY={0.5} robe={ROBE.smith} nod={0.25 + Math.sin(film * 2.2) * 0.12} phase={2} />

      {/* One loaf, and what it cost by the end. */}
      <Loaf position={[TOTEM[0], TOTEM[1] + TOTEM_HIGH, TOTEM[2]]} rotationY={-0.15} scale={LOAF * (1 + 0.1 * pop(end, 0.4, 0.3) * (1 - ease(ramp(end, 0.75, 1.1))))} />
      <PriceRoll position={[TOTEM[0], TOTEM[1] + TOTEM_HIGH - 0.1, TOTEM[2] + 0.52]} rows={["200", ",000", ",000", ",000"]} shown={rows} width={1.22} rowHeight={0.56} />
      {/* The man who has come to buy it, with what he brought to pay. He looks up the price; on 'billion' he lets the barrow go. */}
      <Villager position={[TOTEM[0] + 1.35, TOTEM[1], TOTEM[2] + 0.75]} rotationY={-0.75} robe={ROBE.brown} nod={-0.5 + 0.95 * ease(ramp(billion, 0.1, 0.6))} lean={0.12 * ease(ramp(billion, 0.2, 0.7))} phase={5} />
      <Wheelbarrow position={[TOTEM[0] + 1.25, TOTEM[1], TOTEM[2] + 1.9]} rotationY={Math.PI - 0.35} tip={0}>
        <NoteHeap count={10} spread={[0.5, 0.7]} seed={2} />
      </Wheelbarrow>
    </>
  );
};

export const scene5 = flightScene(timing, {
  id: "scene5",
  title: "The real world, and Germany",
  from: RACKS.nobody,
  shots: [
    {
      cue: "5.real",
      to: LATER.real,
      lift: 3.2,
      note: "Up and out to the west, from a model to the real thing: a bigger island, a mint and a bakery side by side on one stage. Both are running, slowly, and what they make is stacked on their roofs.",
    },
    {
      cue: "5.faster",
      to: LATER.race,
      note: "In to the two machines. Bundles hop from the printer's tray on to its roof, loaves hop from the oven's mouth on to its top: two stacks that start level, and the money pulls ahead while you watch.",
    },
    {
      cue: "5.name",
      to: LATER.creep,
      note: "Down to the loaf in front of the stage. Its price hangs under a small red balloon: a step up on each 'year', the number going 2, 3, 4, 5, and on the last word the balloon swells with its name on it. INFLATION is something being blown up.",
    },
    {
      cue: "5.germany",
      to: LATER.old,
      travel: 1.55,
      lift: 4,
      note: "A hundred years is a long way down: off the real world, past the village, and far below the two stalls, to a grey island where the press is as big as a house and the notes pour off the edge into the clouds.",
    },
    {
      cue: "5.billion",
      to: LATER.totem,
      note: "Along the edge to one loaf on a tall plinth. Its price is too long for a tag: it unrolls down the plinth a row at a time, 200 and then three more rows of zeros, taller than the man who came with a barrow of notes to pay it.",
    },
  ],
});
