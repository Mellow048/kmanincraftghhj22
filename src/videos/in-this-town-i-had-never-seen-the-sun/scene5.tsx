import { cam, storyScene } from "../../engine";
import {
  Board, Bone, Bubble, DayTown, EAST, Fill, Grandpa, Log, Me, NORTH, Old, PLACE, Pal, PalDad, Puffs, ROBE, Rain, SOUTH, SubscribeSign, Villager, Vox, WEST, go, hop,
  meFace, palFace, pop, timing, tw, w,
} from "./kit";

/** 05 — He had never seen the stars. The same rule, the other way round. And where we meet. */
const ME: [number, number, number] = [-0.5, 0, 0.3];
const PAL: [number, number, number] = [0.55, 0, 0.3];
/** On the log, facing north: his legs hang in front of it, the villager kid's stick straight out. */
const SEAT_ME: [number, number, number] = [PLACE.seatMe[0], 0.05, PLACE.seatMe[2] - 0.2];
const SEAT_PAL: [number, number, number] = [PLACE.seatPal[0], 0.03, PLACE.seatPal[2] - 0.05];
const DOORS: Array<[number, number, number]> = [[-7.2, 0, -5.3], [0, 0, -5.9], [7.2, 0, -5.3]];

const Sitters = ({ t, bone = true, meProps = {}, palProps = {} }: { t: number; bone?: boolean; meProps?: Record<string, unknown>; palProps?: Record<string, unknown> }) => (
  <>
    <Log />
    <Me position={SEAT_ME} rotationY={NORTH} nod={Math.sin(t * 1.1) * 0.03} {...meProps} />
    <Pal position={SEAT_PAL} rotationY={NORTH} sit carry={bone ? <Bone position={[0, 0.05, 0.14]} rotation={[0, 0, 0.2]} scale={1.1} /> : undefined} {...palProps} />
  </>
);

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The same rule",
  shots: [
    {
      cue: "8.edge",
      ...cam.push({ on: [0, 0.95, -2.4], dist: 6.0, to: 4.6, yaw: 5, pitch: 5, fov: 44 }),
      zone: "rim",
      look: "overworld-day",
      note: "After the rain, from just inside the trees: the two of them walk down the path towards us side by side, with the wet field and the hill behind them. One has no hat now.",
      stage: (t) => (
        <>
          <Me {...go([-0.5, 0, -6.4], [-0.5, 0, -1.6], 0.1 + t * 0.4)} lookAt={palFace([0.55, 0, -4 + t])} mood="happy" />
          <Pal {...go([0.55, 0, -6.2], [0.55, 0, -1.4], 0.1 + t * 0.4)} carry={<Bone position={[0, 0.05, 0.14]} rotation={[0, 0, 0.2]} scale={1.1} />} />
        </>
      ),
    },
    {
      cue: "8.said",
      ...cam.push({ on: [0.02, 1.1, 0.3], dist: 4.3, to: 3.7, yaw: -4, pitch: 3, fov: 42 }),
      zone: "rim",
      look: "overworld-day",
      note: "At the first trees, face to face. COME BACK TONIGHT. Then his arm goes straight up at the sky: STARS!",
      stage: (t) => {
        const st = w("8.said", "stars");
        return (
          <>
            <Me position={ME} rotationY={EAST - 0.25} armPitch={[0, -tw(t, st - 0.35, st) * 2.75]} mood="happy" />
            <Pal position={PAL} rotationY={WEST + 0.25} nod={-tw(t, st, st + 0.3) * 0.4} carry={<Bone position={[0, 0.05, 0.14]} rotation={[0, 0, 0.2]} scale={1.1} />} />
            <Bubble text="COME BACK" position={[-0.12, 2.05, ME[2]]} scale={0.4 * pop(t, w("8.said", "Come") - 0.1, 0.14) * (t < st - 0.3 ? 1 : 0)} tail={-1} dark />
            <Bubble text="TONIGHT." position={[-0.12, 1.78, ME[2]]} scale={0.4 * pop(t, w("8.said", "tonight") - 0.1, 0.14) * (t < st - 0.3 ? 1 : 0)} tail={-1} dark />
            <Bubble text="STARS!" position={[-0.1, 1.95, ME[2]]} scale={0.55 * pop(t, st - 0.15, 0.14)} tail={-1} dark />
          </>
        );
      },
    },
    {
      cue: "8.what",
      ...cam.push({ on: palFace(PAL), dist: 2.3, to: 1.9, yaw: -16, pitch: 2, fov: 38 }),
      zone: "rim",
      look: "overworld-day",
      note: "The villager kid, close, head on one side: STARS?",
      stage: (t) => (
        <>
          <Pal position={PAL} rotationY={SOUTH - 0.3} tilt={tw(t, 0.1, 0.4) * 0.28} carry={<Bone position={[0, 0.05, 0.14]} rotation={[0, 0, 0.2]} scale={1.1} />} />
          <Bubble text="STARS?" position={[PAL[0] - 0.02, 1.7, PAL[2]]} scale={0.4 * pop(t, 0.3, 0.14)} tail={-1} dark />
        </>
      ),
    },
    {
      cue: "8.never",
      ...cam.push({ on: meFace(ME), dist: 2.1, to: 1.7, yaw: 14, pitch: 2, fov: 38 }),
      zone: "rim",
      look: "overworld-day",
      note: "The zombie kid's face: his mouth drops open and his arm comes slowly down.",
      stage: (t) => (
        <>
          <Me position={[ME[0], hop(t, 0.05, 0.06, 0.2), ME[2]]} rotationY={SOUTH + 0.3} armPitch={[0, -2.75 + tw(t, 0.1, 0.8) * 2.75]} mood="scared" />
        </>
      ),
    },
    {
      cue: "8.his",
      ...cam.push({ on: [0, 1.7, -3.4], dist: 10.5, to: 8.6, yaw: -7, pitch: 3, fov: 46 }),
      zone: "daytown",
      look: "overworld-sunset",
      note: "His town, with the sun going down behind the roofs: every villager on the street is walking in at a door. The kid in red is the last, and his dad waits for him in the doorway.",
      stage: (t) => (
        <>
          <DayTown />
          {([[-3.5, -1.6, 0, ROBE.brown], [3.6, -1.2, 2, ROBE.farmer], [-9.4, -2.2, 0, ROBE.white], [9.6, -2.4, 2, ROBE.red]] as Array<[number, number, number, string]>).map(([x, z, d, robe], i) => {
            const k = tw(t, 0.1 + i * 0.2, 1.5 + i * 0.25);
            return k < 0.99 ? <Villager key={i} {...go([x, 0, z], DOORS[d], k)} robe={robe} phase={i * 1.4} /> : null;
          })}
          <PalDad position={[0.25, 0, -5.5]} rotationY={SOUTH} lookAt={[2.4, 1, -1]} />
          <Pal {...go([2.8, 0, 0.6], [0, 0, -5.2], tw(t, 0.2, 2.6))} turn={1.5} />
        </>
      ),
    },
    {
      cue: "8.door",
      ...cam.push({ on: [0, 1.6, -5.2], dist: 8.6, to: 7.4, yaw: 6, pitch: 3, fov: 46 }),
      zone: "daytown",
      look: "overworld-night",
      note: "Night, the same street, nobody on it. On \"shut\" the three doors bang shut one after another. On \"did not look\" the lit windows go dark, one after another.",
      stage: (t) => {
        const shut = w("8.door", "shut");
        const dark = w("8.door", "look");
        return (
          <>
            <DayTown night open={t < shut} lit={t < dark} />
            {t > shut ? DOORS.map((d, i) => (t > shut + i * 0.1 ? <Puffs key={i} position={[d[0], 0.3, d[2] + 0.4]} count={5} spread={0.5} size={0.2} rise={0.6} speed={1.7} color="#e9e2d0" /> : null)) : null}
            <Fill at={[0, 3, 1]} power={26} color="#bcd0ff" reach={16} />
          </>
        );
      },
    },
    {
      cue: "8.dark",
      ...cam.push({ on: [-2.9, 1.2, -3.2], dist: 6.2, to: 5.4, yaw: 8, pitch: 4, fov: 42 }),
      zone: "daytown",
      look: "overworld-night",
      note: "The picture we saw in the zombie town, the other way round: a notice board with a white moon on it, a red cross slamming over the moon, a grown-up beside it, and a kid looking up.",
      stage: (t) => (
        <>
          <DayTown night />
          <Board position={[-3, 0, -3.6]} kind="moon" cross={pop(t, w("8.dark", "bad") - 0.1, 0.12)} />
          <PalDad position={[-1.95, 0, -2.9]} rotationY={SOUTH - 0.5} nod={0.2 + Math.sin(t * 7) * 0.1} />
          <Pal position={[-3.5, 0, -2.2]} rotationY={EAST + 0.7} lookAt={[-3, 1.4, -3.6]} />
          <Fill at={[-3, 2.0, -1.0]} power={12} color="#ffe6c0" />
        </>
      ),
    },
    {
      cue: "8.same",
      ...cam.push({ on: [0, 1.3, -1.0], dist: 7.4, to: 6.4, yaw: 0, pitch: 3, fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "One board in the dark with a zombie on one side of it and a villager on the other, both wagging at us. It shows the crossed-out sun. On \"other way round\" the board spins, and its other face is the crossed-out moon.",
      stage: (t) => {
        const o = w("8.same", "other");
        const a = tw(t, o - 0.1, o + 0.35) * Math.PI;
        return (
          <>
            <Vox kind="darkPlanks" position={[0, -0.05, -1]} size={[7, 0.1, 5]} />
            <Board position={[0, 0, -1]} kind="sun" rotationY={a} />
            <Board position={[0, 0, -1]} kind="moon" rotationY={a + Math.PI} />
            <Old position={[-1.12, 0, -0.75]} rotationY={SOUTH + 0.2} wave={1} mood="angry" />
            <PalDad position={[1.12, 0, -0.75]} rotationY={SOUTH - 0.2} nod={0.15 + Math.sin(t * 7) * 0.1} />
            <Fill at={[-1.2, 2.4, 1.8]} power={14} color="#bfe0ff" />
            <Fill at={[1.2, 2.4, 1.8]} power={14} color="#ffe0b0" />
          </>
        );
      },
    },
    {
      cue: "9.meet",
      ...cam.push({ on: [0, 0.95, -2.4], dist: 4.8, to: 3.8, yaw: 166, pitch: 4, fov: 42 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "The log at the edge of the trees, in pink light, from the front: the two of them sit on it side by side with the dark wood behind them. The villager kid has the bone on his sleeves. They look at each other, and then out at the sky.",
      stage: (t) => (
        <>
          <Sitters t={t} meProps={{ mood: "happy", turn: -Math.sin(tw(t, 0.3, 1.6) * Math.PI) * 0.8 }} palProps={{ turn: Math.sin(tw(t, 0.5, 1.8) * Math.PI) * 0.8 }} />
          <Fill at={[0, 1.8, -5]} power={22} color="#ffb890" reach={9} />
        </>
      ),
    },
    {
      cue: "9.sun",
      ...cam.push({ on: [-0.58, 1.37, -7.12], dist: 10, to: 9.4, yaw: 8, pitch: -5, fov: 44 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "From behind them: two small backs on a log, and the sun going down over the hill in front of them.",
      stage: (t) => (
        <>
          <Sitters t={t} bone={false} palProps={{ tilt: Math.sin(t * 2) * 0.05 }} />
        </>
      ),
    },
    {
      cue: "9.moon",
      ...cam.push({ on: [0.47, 2.24, -7.02], dist: 10, to: 9.4, yaw: -4.5, pitch: -10, fov: 44 }),
      zone: "rim",
      look: "overworld-night",
      note: "The same two backs on the same log, and now it is blue: the moon is up over the hill with the stars round it, and the zombie kid's arm points straight at it.",
      stage: (t) => (
        <>
          <Sitters t={t} bone={false} meProps={{ armPitch: [0, -2.5], nod: -0.4 }} palProps={{ nod: -0.5 }} />
          <Fill at={[0, 1.6, 0.6]} power={14} color="#bcd0ff" reach={7} />
        </>
      ),
    },
    {
      cue: "9.grandpa",
      ...cam.push({ on: [0, 1.2, -2.3], dist: 5.2, to: 4.3, yaw: 190, pitch: 2, fov: 44 }),
      zone: "rim",
      look: "overworld-rain",
      note: "Rain, by day, from the front: the two kids on the log, and standing between them with both arms up and his beard wet, grandpa.",
      stage: (t) => (
        <>
          <Sitters t={t} meProps={{ mood: "happy", lookAt: [0.05, 1.7, -1.6] }} palProps={{ lookAt: [0.05, 1.7, -1.6] }} />
          <Grandpa position={[0.05, 0, -1.55]} rotationY={NORTH} armPitch={[-2.7, -2.7]} nod={-0.35} mood="happy" lean={0} />
          <Rain center={[0, 0, -0.6]} t={t} area={[9, 6]} count={170} />
        </>
      ),
    },
    {
      cue: "9.dad",
      ...cam.push({ on: [0.15, 1.3, -1.6], dist: 8.2, to: 7.4, yaw: 6, pitch: 3, fov: 44 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "From in among the trees: the back of a tall villager in a dark robe fills one side of the frame. Past him, small, are the two kids on the log in the pink light. They have not seen him.",
      stage: (t) => (
        <>
          <Sitters t={t} bone={false} />
          <PalDad position={[1.02, 0, 4.15 - tw(t, 0, 1.2) * 0.3]} rotationY={NORTH} walk={tw(t, 0, 1.2) * 0.3} lean={0.1} />
        </>
      ),
    },
    {
      cue: "9.sub",
      ...cam.push({ on: [0.15, 1.3, -1.7], dist: 5.6, to: 4.9, yaw: 172, pitch: 2, fov: 44 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "From the front again: the two kids laughing on the log, and behind them, between two trunks, his dad, looking at the zombie. The sign.",
      stage: (t) => (
        <>
          <Sitters t={t} meProps={{ mood: "happy", turn: -0.6 }} palProps={{ turn: 0.6 }} />
          <Vox kind="log" position={[2.05, 3, 1.0]} size={[0.8, 6, 0.8]} />
          <PalDad position={[1.35, 0, 0.9]} rotationY={NORTH} lookAt={meFace(SEAT_ME)} nod={0.2} />
          <Fill at={[1.2, 1.9, -1.2]} power={8} color="#ffb890" reach={5} />
          <Fill at={[0, 1.8, -5]} power={22} color="#ffb890" reach={9} />
          <SubscribeSign position={[0.25, 2.45, -2.3]} rotationY={Math.PI} scale={0.62 * pop(t, 0.5, 0.18)} />
        </>
      ),
    },
  ],
});
