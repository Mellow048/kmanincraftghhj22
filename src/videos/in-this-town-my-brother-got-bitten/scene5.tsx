import { cam, storyScene } from "../../engine";
import {
  Block, Bro, Bubble, Cellar, Dad, Fill, HandLantern, KID, Lady, Loaf, Lying, Me, NORTH, OurRoom, PLACE, PixelText, Price, Priest, Puffs, ROBE, RedSwirl, SOUTH, SoundRings, SubscribeSign,
  TEEN, TownSet, Villager, WEST, EAST, bonk, chest, face, go, hop, pop, skinAt, skyAt, timing, tw, w,
} from "./kit";
import { LOAF } from "./scene3";

/** 08–09 — How dad knew. Half the town had knocked on that floor. Then he opened his eyes; and that night something else knocked. */
const loaf = <Loaf position={LOAF} rotation={[0, 0.3, 0]} />;
const DAD: [number, number, number] = [0.75, 0, 0.55];
const KIDP: [number, number, number] = [PLACE.bro[0], 0, 0.3];
const L = PLACE.lady;
const GOLD = "#ffd27a";

/** The old bite on a folded sleeve: the sleeve pushed back, bare skin, and a row of pale green marks. */
const SleeveBite = ({ k }: { k: number }) =>
  k <= 0.02 ? null : (
    <group position={[-0.3375, -0.2215, -0.04]} rotation={[-0.75, 0, 0]}>
      {/* the lower half of the sleeve, pushed back: it grows up from the cuff */}
      <Block position={[0, -0.1125 + 0.115 * k, 0]} size={[0.236, 0.23 * k, 0.236]} color={skinAt(0)} castShadow={false} />
      <Block position={[0, -0.1125 + 0.23 * k + 0.02, 0]} size={[0.25, 0.05, 0.25]} color="#3b332d" castShadow={false} />
      {k > 0.7
        ? [-1, 1].map((r) =>
            [-1, 0, 1].map((i) => (
              <group key={`${r}${i}`}>
                <Block position={[i * 0.05, r * 0.04, 0.12]} size={[0.026, 0.04, 0.012]} color="#5f8a4e" castShadow={false} />
                <Block position={[-0.12, r * 0.04, i * 0.05]} size={[0.012, 0.04, 0.026]} color="#5f8a4e" castShadow={false} />
              </group>
            )),
          )
        : null}
    </group>
  );

const day = { door: 1, day: GOLD, sky: skyAt(1), sun: 1, shadow: true } as const;

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Half the town",
  shots: [
    {
      cue: "8.how",
      ...cam.push({ on: [0.2, 1.0, 0.4], dist: 3.3, to: 2.9, yaw: 158, pitch: 0, fov: 42 }),
      zone: "cellar",
      look: "warm-room",
      note: "From inside the cell. The kid is still standing in the light with the bright door behind him, and he turns his head up to dad beside him: with a ? over his head.",
      stage: (t) => (
        <>
          <Cellar walls="ew" {...day} />
          <Bro position={PLACE.bro} rotationY={SOUTH} green={0.8} out bitten tilt={Math.sin(t * 41) * 0.04} />
          <RedSwirl position={PLACE.bro} t={t + 2} />
          <Me position={KIDP} rotationY={NORTH} lookAt={t > 0.25 ? face(DAD, 1) : undefined} />
          <Dad position={DAD} rotationY={NORTH - 0.4} lookAt={t > 0.6 ? face(KIDP, KID) : undefined} />
          <Bubble text="?" position={[0.1, 1.42, -0.1]} rotationY={Math.PI - 0.3} scale={0.4 * pop(t, 0.5, 0.14)} tail={1} />
          <Fill at={[0.8, 1.8, -1.8]} power={26} />
        </>
      ),
    },
    {
      cue: "8.sleeve",
      ...cam.push({ on: [DAD[0] - 0.12, 1.12, DAD[2] + 0.2], dist: 2.6, to: 2.2, yaw: -24, pitch: 4, fov: 38 }),
      zone: "cellar",
      look: "warm-room",
      note: "Dad's folded arms, close. He pushes one sleeve back with the other.",
      stage: (t) => (
        <>
          <Cellar {...day} />
          <Dad position={DAD} rotationY={SOUTH - 0.1} carry={<SleeveBite k={tw(t, 0.25, 0.8)} />} nod={0.35} turn={-0.4} />
          <Fill at={[0.6, 2.0, 2.4]} power={14} />
        </>
      ),
    },
    {
      cue: "8.bite",
      ...cam.push({ on: [DAD[0] - 0.32, 1.0, DAD[2] + 0.2], dist: 1.7, to: 1.3, yaw: -48, pitch: 10, fov: 36 }),
      zone: "cellar",
      look: "warm-room",
      note: "Closer, from the other side: on the bare arm, two rows of small pale green marks. Old ones. The same shape as the tear in the brother's sleeve.",
      stage: () => (
        <>
          <Cellar {...day} />
          <Dad position={DAD} rotationY={SOUTH - 0.1} carry={<SleeveBite k={1} />} nod={0.35} turn={-0.4} />
          <Fill at={[0.2, 1.6, 2.0]} power={14} />
        </>
      ),
    },
    {
      cue: "8.lady",
      ...cam.push({ on: [L[0] - 0.35, 1.7, L[2] + 1.3], dist: 2.9, to: 2.4, yaw: -16, pitch: 24, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The old lady next door, from above. She tips the big purple hat back, and the marks are on top of her head.",
      stage: (t) => (
        <>
          <TownSet />
          <Lady position={[L[0] - 0.35, 0, L[2] + 1.3]} rotationY={SOUTH + 0.1} lift={tw(t, w("8.lady", "Under") - 0.5, w("8.lady", "Under") + 0.1)} nod={0.25} />
        </>
      ),
    },
    {
      cue: "8.priest",
      ...cam.push({ on: [0.25, 1.0, -0.35], dist: 4.6, to: 4.0, yaw: 30, pitch: 11, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Years ago, the same kind of room: the priest behind the bars, green, arms out, red sparks round him. A family sits on the floor in front with a lantern and stays. One emerald comes up over them.",
      stage: (t) => (
        <>
          <Cellar sky={skyAt(0.1)} />
          <Priest position={[0.52, 0, -1.0]} rotationY={SOUTH} green={1} arms={{ l: -1.5 + Math.sin(t * 2) * 0.05, r: -1.5 - Math.sin(t * 2) * 0.05 }} />
          <RedSwirl position={[0.52, 0, -1.0]} t={t} k={0.8} />
          <Villager position={[0.6, -0.5, 0.75]} rotationY={NORTH} robe={ROBE.blue} sit phase={2} />
          <Villager position={[-0.15, -0.47, 0.35]} rotationY={NORTH + 0.3} robe={ROBE.brown} sit scale={0.94} phase={1} />
          <Villager position={[0.15, -0.35, 1.15]} rotationY={NORTH + 0.2} robe={ROBE.friend} kid scale={KID} sit phase={3} />
          <HandLantern position={[0.75, 0, 0.1]} light={20} />
          <Price position={[0.3, 1.6, 0.8]} n={1} scale={0.7 * pop(t, w("8.priest", "half") - 0.1, 0.16)} rotationY={0.5} />
          <Fill at={[1.4, 2.2, 2.2]} power={12} />
        </>
      ),
    },
    {
      cue: "8.town",
      ...cam.push({ on: [0, 1.15, 0.2], dist: 7.0, to: 6.2, yaw: 0, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The square in the sun, six townsfolk facing the lens. One after another, three of them go green for a moment, with their arms out, and back.",
      stage: (t) => {
        const folk: Array<[number, number, string, number]> = [
          [-1.5, 1.8, ROBE.brown, 0.94],
          [0.1, 2.2, ROBE.farmer, 0.94],
          [1.5, 1.7, ROBE.red, 0.9],
          [-0.9, 0.2, ROBE.white, 0.94],
          [0.9, 0.0, ROBE.smith, 0.96],
          [0, -1.4, ROBE.blue, 0.94],
        ];
        const order = [0, 4, 2];
        return (
          <>
            <TownSet />
            {folk.map(([x, z, robe, scale], i) => {
              const n = order.indexOf(i);
              const g = n < 0 ? 0 : Math.sin(tw(t, 0.25 + n * 0.4, 0.8 + n * 0.4) * Math.PI);
              return <Villager key={i} position={[x, 0, z]} rotationY={SOUTH} robe={robe} scale={scale} phase={i * 1.3} skin={skinAt(g)} eyes={g > 0.5 ? "#d82a1e" : undefined} arms={g > 0.5 ? { l: -1.5, r: -1.5 } : undefined} />;
            })}
          </>
        );
      },
    },
    {
      cue: "8.rule",
      ...cam.push({ on: [0, 1.5, 12.6], dist: 7.6, to: 7.0, yaw: 0, pitch: 3, fov: 48 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The gate again, from outside this time, at sunset. Two kids run in through it, and the doors swing shut behind them.",
      stage: (t) => (
        <>
          <TownSet lit gate={1 - tw(t, 1.0, 1.9)} />
          {[-0.5, 0.5].map((x, i) => (
            <Villager key={i} position={[x, 0, 15.5 - t * 3.2 - i * 0.8]} rotationY={NORTH} walk={t * 3.2} robe={i ? ROBE.friend : ROBE.red} kid scale={KID} phase={i * 2} />
          ))}
        </>
      ),
    },
    {
      cue: "8.home",
      ...cam.push({ on: [-0.7, 1.0, -3.2], dist: 6.6, to: 5.8, yaw: 58, pitch: 7, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Our street at sunset, every window lit. Our door is open with the light coming out, and two brothers run for it: the big one behind, pushing the small one ahead.",
      stage: (t) => {
        const k = tw(t, 0, 1.6);
        return (
          <>
            <TownSet lit homeOpen />
            <Me {...go([0.4, 0, 0.2], [-1.2, 0, -4.4], k)} />
            <Bro {...go([0.9, 0, 1.3], [-1.0, 0, -3.3], k)} />
          </>
        );
      },
    },
    {
      cue: "9.stop",
      ...cam.push({ on: chest(PLACE.bro, TEEN), dist: 3.0, to: 2.6, yaw: 16, pitch: 4, fov: 42 }),
      zone: "cellar",
      look: "warm-room",
      note: "Through the bars. The red sparks thin out and are gone. He stands still, with his head down and his arms dropping.",
      stage: (t) => {
        const k = 1 - tw(t, 0.15, 0.8);
        return (
          <>
            <Cellar {...day} />
            <Bro position={[PLACE.bro[0] + Math.sin(t * 46) * 0.02 * k, 0, PLACE.bro[2]]} rotationY={SOUTH} green={0.8 - (1 - k) * 0.25} bitten arms={{ l: -1.5 * k - 0.1, r: -1.5 * k - 0.1 }} nod={0.5 * (1 - k)} />
            <RedSwirl position={PLACE.bro} t={t + 4} k={k} />
            {loaf}
            <Fill at={[0.6, 1.8, 1.6]} power={30} />
          </>
        );
      },
    },
    {
      cue: "9.eyes",
      ...cam.push({ on: face(PLACE.bro, TEEN), dist: 1.9, to: 1.5, yaw: -8, pitch: 0, fov: 36 }),
      zone: "cellar",
      look: "warm-room",
      note: "His face between the bars, close. His head comes up. The green drains out of it and his eyes are his own colour again.",
      stage: (t) => {
        const k = tw(t, 0.2, 0.95);
        return (
          <>
            <Cellar {...day} />
            <Bro position={PLACE.bro} rotationY={SOUTH} green={0.55 * (1 - k)} bitten nod={0.5 * (1 - tw(t, 0.1, 0.6))} />
            <Fill at={[0.4, 1.8, 1.6]} power={14} />
          </>
        );
      },
    },
    {
      cue: "9.hands",
      ...cam.push({ on: [-0.17, 1.0, -0.3], dist: 3.9, to: 3.4, yaw: 50, pitch: 4, fov: 42 }),
      zone: "cellar",
      look: "warm-room",
      note: "From the side, across the bars, the same place he held out the sword. His arms are folded back into his sleeves, like anybody's. He looks down at them, then up at the kid on the other side.",
      stage: (t) => {
        const up = w("9.hands", "He", 1);
        return (
          <>
            <Cellar walls="nws" {...day} />
            <Bro position={PLACE.bro} rotationY={SOUTH} bitten nod={t < up ? 0.5 : 0.05} lookAt={t > up ? face([KIDP[0], 0, 0.6], KID) : undefined} />
            <Me position={[KIDP[0], hop(t, up + 0.1, 0.14, 0.25), 0.6]} rotationY={NORTH} lookAt={face(PLACE.bro, TEEN)} />
            {loaf}
            <Fill at={[2.4, 1.8, 1.2]} power={18} />
          </>
        );
      },
    },
    {
      cue: "9.said",
      ...cam.push({ on: [0.0, 0.95, -0.45], dist: 3.8, to: 3.4, yaw: 46, pitch: 9, fov: 42 }),
      zone: "cellar",
      look: "warm-room",
      note: "ANY BREAD? The loaf he would not look at is still on the floor of the cell. He looks down at it. The kid jumps.",
      stage: (t) => (
        <>
          <Cellar walls="nws" {...day} />
          <Bro position={PLACE.bro} rotationY={SOUTH} bitten nod={tw(t, 0.9, 1.2) * 0.5} turn={tw(t, 0.9, 1.2) * 0.35} />
          <Me position={[KIDP[0] - 0.1, hop(t, 0.7, 0.22, 0.3) + hop(t, 1.1, 0.22, 0.3), 0.55]} rotationY={NORTH} />
          <Dad position={[-1.15, 0, 0.75]} rotationY={NORTH + 0.5} nod={Math.max(0, Math.sin(t * 9)) * 0.2 * tw(t, 0.8, 1.0)} />
          {loaf}
          <Bubble text="ANY BREAD?" position={[-0.1, 1.82, -0.3]} rotationY={0.8} scale={0.32 * pop(t, 0.3, 0.14)} tail={1} />
          <Fill at={[2.4, 2.0, 1.4]} power={18} />
        </>
      ),
    },
    {
      cue: "9.wall",
      ...cam.push({ on: [-0.45, 1.0, 0.75], dist: 3.2, to: 2.8, yaw: -16, pitch: 5, fov: 44 }),
      zone: "room",
      look: "lantern-night",
      note: "That night, his side of the wall. He is back, in his blue robe, the sleeve still torn. He looks at the wall and bumps it twice with his shoulder.",
      stage: (t) => {
        const a = w("9.wall", "Twice");
        const k = bonk(t, a - 0.5, 0.18) + bonk(t, a - 0.2, 0.18);
        return (
          <>
            <OurRoom night />
            <Bro position={[-0.68 + k * 0.22, 0, 0.75]} rotationY={SOUTH + 0.25} bitten turn={t < a - 0.6 ? 0.7 : 0.3} />
            {[a - 0.44, a - 0.14].map((at, i) => (t > at && t < at + 0.5 ? <SoundRings key={i} position={[-0.12, 1.0, 0.6]} rotationY={WEST} t={t - at} color="#fff0c0" reach={0.6} /> : null))}
            <HandLantern position={[-1.7, 0, 1.0]} light={18} />
            <Fill at={[-1.2, 2.2, 3.2]} power={22} />
          </>
        );
      },
    },
    {
      cue: "9.back",
      ...cam.push({ on: [0.45, 0.85, 0.75], dist: 2.7, to: 2.4, yaw: 18, pitch: 4, fov: 42 }),
      zone: "room",
      look: "lantern-night",
      note: "The kid's side. He bumps it back, twice, with his whole body, and he is grinning at the wall.",
      stage: (t) => {
        const k = bonk(t, 0.25, 0.16) + bonk(t, 0.5, 0.16);
        return (
          <>
            <OurRoom night />
            <Me position={[0.62 - k * 0.22, hop(t, 0.2, 0.06, 0.2), 0.75]} rotationY={SOUTH - 0.25} turn={t > 0.7 ? -0.7 : 0} />
            {[0.3, 0.55].map((at, i) => (t > at && t < at + 0.4 ? <SoundRings key={i} position={[0.12, 0.8, 0.6]} rotationY={EAST} t={t - at} color="#ffd9a0" reach={0.5} /> : null))}
            <Fill at={[1.2, 2.2, 3.2]} power={24} />
          </>
        );
      },
    },
    {
      cue: "9.floor",
      ...cam.push({ on: [0.1, 0.6, 0.5], dist: 5.6, to: 5.0, yaw: 4, pitch: 14, fov: 46 }),
      zone: "room",
      look: "lantern-night",
      note: "The whole room: both of them at the wall, one each side. Then the boards in front of the kid's bed jump, twice. Both heads turn down to the floor.",
      stage: (t) => {
        const a = w("9.floor", "knocked");
        const s = bonk(t, a - 0.35, 0.2) + bonk(t, a - 0.05, 0.2);
        const seen = t > a - 0.3;
        return (
          <>
            <OurRoom night shake={s} />
            <Bro position={[-0.68, 0, 0.75]} rotationY={SOUTH + 0.25} bitten turn={seen ? 0.5 : 0.7} nod={seen ? 0.5 : 0} />
            <Me position={[0.62, 0, 0.6]} rotationY={SOUTH - 0.25} turn={seen ? 0.2 : -0.7} nod={seen ? 0.6 : 0} />
            {[a - 0.35, a - 0.05].map((at, i) =>
              t > at ? (
                <group key={i}>
                  <PixelText text="KNOCK" position={[0.5 - i * 0.8, 0.4 + (t - at) * 0.5, 1.5 + i * 0.25]} height={0.2 * pop(t, at, 0.1)} color="#ffe27a" />
                  <Puffs position={[0.9, 0.05, 0.95]} count={4} spread={0.5} size={0.1} rise={0.5} speed={1.6} color="#d8cdb8" />
                </group>
              ) : null,
            )}
            <HandLantern position={[-1.6, 0, 0.9]} light={14} />
            <Fill at={[0, 2.6, 3.0]} power={16} />
          </>
        );
      },
    },
    {
      cue: "9.sub",
      ...cam.push({ on: [0.1, 1.3, -0.5], dist: 4.4, to: 3.6, yaw: 6, pitch: 2, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The cellar, dark, with nobody holding a lantern. Behind the bars, at head height, two red eyes open. The subscribe sign comes up in front.",
      stage: (t) => (
        <>
          <Cellar sky={skyAt(0)} />
          {loaf}
          {t > 0.25 ? (
            <>
              {[-1, 1].map((s) => (
                <Block key={s} position={[0.5 + s * 0.12, 1.5, -1.7]} size={[0.13, 0.09 * pop(t, 0.25, 0.12), 0.02]} color="#ff3020" emissive="#ff3020" emissiveIntensity={3} castShadow={false} />
              ))}
              <pointLight position={[0.5, 1.5, -1.5]} color="#ff3020" intensity={1.2} distance={2} decay={1.6} />
            </>
          ) : null}
          <SubscribeSign position={[0.12, 1.13, 0.9]} scale={0.5 * pop(t, 0.6, 0.18)} />
          {t > 0.7 ? <Block position={[0.12, 0.28, 0.89]} size={[0.05, 0.56, 0.04]} color="#5c3f24" /> : null}
          <Fill at={[0.4, 2.2, 2.2]} power={10} />
        </>
      ),
    },
  ],
});
