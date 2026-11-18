import { cam, storyScene } from "../../engine";
import {
  Bits, Blindfold, Board, Bubble, EAST, Fill, Glow, Grandpa, Homes, Lying, Me, Mum, MyRoom, Old, PLACE, PinkDawn, Puddle, Puffs, Rain, SOUTH, WEST, bigFace, go, hop,
  pop, timing, tw, w,
} from "./kit";

/** 01 — I had never seen the sun. Nobody had. The town under the trees, its rule, and grandpa's good weather. */
const AT: [number, number, number] = [-0.16, 0, -1.1];
const FINGER: [number, number, number] = [0.22, 0.72, -0.84];
const G = PLACE.grandpa;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "I had never seen the sun",
  shots: [
    {
      cue: "1.sun",
      ...cam.push({ on: [0.02, 0.72, -1.0], dist: 3.3, to: 2.7, yaw: -8, pitch: 11, fov: 42 }),
      zone: "room",
      look: "overworld-night",
      note: "The hook, inside the first second: a dark room, a door open a hand's width, a blade of gold daylight across the floor, and a zombie kid who puts one finger in it. It smokes. He snatches it back.",
      stage: (t) => {
        // Rule A: the kid, the light and what it does to him are all there by 0.5 s.
        const reach = tw(t, 0.0, 0.32);
        const back = tw(t, 1.2, 1.36);
        const arm = -1.4 * reach * (1 - back);
        const burning = t > 0.34 && t < 1.3;
        return (
          <>
            <MyRoom door={0.16} light={1} />
            <Me position={[AT[0], hop(t, 1.2, 0.12, 0.25), AT[2]]} rotationY={0.5} armPitch={[0, arm]} mood={t > 1.2 ? "scared" : "calm"} turn={back > 0.5 ? -0.45 : 0.3} nod={back > 0.5 ? 0 : 0.22} />
            <Fill at={[-0.9, 1.5, 0.6]} power={5} color="#cfd8ff" reach={4} />
            {burning ? (
              <>
                <Puffs position={FINGER} count={6} rise={0.7} spread={0.08} size={0.1} speed={1.5} color="#e8e8e8" opacity={0.75} />
                <Glow position={[FINGER[0], FINGER[1], FINGER[2] + 0.1]} size={0.5} color="#ff9a3a" opacity={0.8} />
              </>
            ) : null}
            {t > 1.3 ? <Puffs position={[AT[0] + 0.3, 0.75, AT[2] + 0.25]} count={4} rise={0.5} spread={0.06} size={0.08} speed={1.3} color="#e8e8e8" opacity={0.6} /> : null}
            <Bubble text="OW!" position={[AT[0] + 0.12, 1.62, AT[2] + 0.2]} scale={0.38 * pop(t, 1.25, 0.14)} tail={1} tilt={-0.1} dark />
          </>
        );
      },
    },
    {
      cue: "1.nobody",
      ...cam.push({ on: [0, 1.45, -2.6], dist: 5.2, to: 4.6, yaw: 6, pitch: 3, fov: 44 }),
      zone: "under",
      look: "overworld-night",
      note: "The town, out of doors as the first pink light comes in under the trees: three grown-ups feel their way home with blindfolds on and their arms out. The old one at the back has pushed his up. He is the only one who peeks.",
      stage: (t) => (
        <>
          <Homes />
          <PinkDawn />
          <Mum position={[-0.8, 0, -2.2 + t * 0.2]} rotationY={SOUTH} arms={1} walk={t * 0.4} headwear={<Blindfold />} />
          <Old position={[0.85, 0, -2.6 + t * 0.2]} rotationY={SOUTH} arms={1} walk={t * 0.4 + 1} headwear={<Blindfold />} />
          <Grandpa position={[0.05, 0, -3.9]} rotationY={SOUTH} blind={tw(t, 0.2, 0.45)} mood="happy" turn={tw(t, 0.45, 0.8) * 0.5} />
          <Fill at={[0, 2.2, 0.5]} power={14} color="#ffd0d0" />
        </>
      ),
    },
    {
      cue: "1.bed",
      ...cam.push({ on: [-0.8, 0.4, -1.3], dist: 4.4, to: 4.0, yaw: 4, pitch: 36, fov: 54 }),
      zone: "room",
      look: "overworld-night",
      note: "From above: the kid in bed with the blanket up, wide awake. A line of gold comes on under the shut door, and his eyes go to it.",
      stage: (t) => (
        <>
          <MyRoom light={tw(t, 0.15, 0.8)} />
          <Lying position={[PLACE.bed[0], 0.64, PLACE.bed[2] + 0.55]}>
            <Me rotationY={0} turn={tw(t, 0.5, 0.9) * -0.9} />
          </Lying>
          <Fill at={[-1.2, 2.2, 0.2]} power={11} color="#cfd8ff" reach={5} />
        </>
      ),
    },
    {
      cue: "1.once",
      ...cam.push({ on: [0.24, 1.02, -0.55], dist: 2.1, to: 1.6, yaw: 16, pitch: 2, fov: 36 }),
      zone: "room",
      look: "overworld-night",
      note: "His face, close, standing right in the blade of light from the door: gold down one side of it, blue down the other. He is smiling.",
      stage: (t) => (
        <>
          <MyRoom door={0.16} light={1} />
          <Me position={[0.0, 0, -0.6]} rotationY={0.25} mood="happy" turn={Math.sin(t * 1.5) * 0.06 + 0.2} nod={-0.08} />
          <Fill at={[-0.9, 1.2, 0.4]} power={3} color="#9fb4ff" reach={3} />
        </>
      ),
    },
    {
      cue: "2.trees",
      ...cam.push({ on: [0, 2.6, -4], dist: 16, to: 12.5, yaw: 10, pitch: 5, fov: 50 }),
      zone: "under",
      look: "overworld-night",
      note: "The whole town from the street: trunks as thick as houses, a roof of leaves, blue lamps, and zombies going about their night. No sky anywhere.",
      stage: (t) => (
        <>
          <Homes />
          <Mum {...go([-4, 0, -2.2], [3, 0, -2.6], 0.2 + t * 0.12)} />
          <Me {...go([-4.8, 0, -1.6], [2.2, 0, -2.0], 0.2 + t * 0.12)} />
          <Old {...go([6, 0, -3.2], [-1, 0, -3.4], 0.1 + t * 0.1)} />
          <Old n={1} position={[-6.2, 0, -4.2]} rotationY={SOUTH + 0.4} />
          <Grandpa position={G} rotationY={SOUTH - 0.3} />
        </>
      ),
    },
    {
      cue: "2.bad",
      ...cam.push({ on: [-6.2, 1.25, -3.4], dist: 4.4, to: 3.7, yaw: -10, pitch: 4, fov: 42 }),
      zone: "under",
      look: "overworld-night",
      note: "A notice board with a yellow sun drawn on it. A red cross slams over the sun on \"bad\". An old one beside it wags a finger at the kid, who looks up at the picture.",
      stage: (t) => (
        <>
          <Homes />
          <Board position={PLACE.board} kind="sun" cross={pop(t, w("2.bad", "bad") - 0.1, 0.12)} />
          <Old position={[-7.6, 0, -3.3]} rotationY={SOUTH + 0.5} wave={1} mood="angry" />
          <Me position={[-5.25, 0, -2.7]} rotationY={WEST - 0.5} lookAt={[PLACE.board[0], 1.4, PLACE.board[2]]} />
          <Fill at={[-6, 2.0, -1.2]} power={12} color="#dfeeff" />
        </>
      ),
    },
    {
      cue: "2.rule",
      ...cam.push({ on: [0, 1.4, -5.2], dist: 9.5, to: 7.6, yaw: -9, pitch: 4, fov: 46 }),
      zone: "under",
      look: "overworld-night",
      note: "The light under the trees turns pink. Mum walks in at our open door; the kid goes in after her, looking back over his shoulder. On \"shut\" the door shuts with a puff, and so does the one next door.",
      stage: (t) => {
        const shut = w("2.rule", "shut");
        const km = tw(t, 0.1, shut - 0.75);
        const kk = tw(t, 0.45, shut - 0.15);
        return (
          <>
            <Homes open={t < shut} grandpaOpen={t < shut + 0.18} />
            <PinkDawn k={tw(t, 0.0, 0.7)} />
            {km < 0.99 ? <Mum {...go([-3.2, 0, -2.4], [0, 0, -6.3], km)} /> : null}
            {kk < 0.99 ? <Me {...go([2.6, 0, -2.0], [0, 0, -6.2], kk)} turn={2.2} nod={-0.1} /> : null}
            {t < shut + 0.1 ? <Old {...go([4.4, 0, -3.0], [6.3, 0, -6.2], tw(t, 0.2, shut))} /> : null}
            {t > shut ? <Puffs position={[0, 0.3, -5.8]} count={6} spread={0.6} size={0.22} rise={0.7} speed={1.6} color="#e9d9d0" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.look",
      ...cam.push({ on: [0.6, 1.04, -0.9], dist: 2.3, to: 1.9, yaw: -6, pitch: 3, fov: 38 }),
      zone: "room",
      look: "overworld-night",
      note: "Inside, with the pink line under the door behind him: the kid with both hands over his eyes. Then one hand comes down a little.",
      stage: (t) => (
        <>
          <MyRoom light={0.9} tint="#ff9fb0" />
          <Me position={[0.6, 0, -0.9]} rotationY={SOUTH} armPitch={[-2.2, -2.2 + tw(t, 0.55, 0.8) * 0.75]} />
          <Fill at={[0.4, 1.4, 1.0]} power={4} color="#bfd0ff" reach={5} />
        </>
      ),
    },
    {
      cue: "2.line",
      ...cam.push({ on: [0.12, 0.6, -1.5], dist: 3.9, to: 3.3, yaw: 26, pitch: 10, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "Low, by the floor: the shut door, and the line of gold coming in under it, getting brighter and spilling onto the boards. The kid stands by his bed and stares at it.",
      stage: (t) => (
        <>
          <MyRoom light={0.25 + tw(t, 0.3, 1.6) * 0.75} />
          <Me position={[-0.2, 0, -1.3]} rotationY={EAST - 0.3} lookAt={[0.6, 0, -2.0]} />
          <Fill at={[0.6, 1.6, 0.6]} power={3} color="#9fb4ff" reach={4} />
        </>
      ),
    },
    {
      cue: "2.floor",
      ...cam.push({ on: [0.55, 0.22, -1.0], dist: 2.5, to: 2.1, yaw: 64, pitch: 9, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "From the side: he lies flat on his front with his chin up and his arms out towards the door, his face a hand from the line of gold. It lights his face from below.",
      stage: (t) => (
        <>
          <MyRoom light={1} bed={false} />
          <Lying down position={[0.6, 0.11, -0.25]}>
            <Me rotationY={0} armPitch={[-2.9, -2.9]} nod={-1.15 + Math.sin(t * 2) * 0.05} mood="happy" />
          </Lying>
          <Fill at={[0.6, 0.2, -1.75]} power={3} color="#ffd257" reach={2.5} />
        </>
      ),
    },
    {
      cue: "2.grandpa",
      ...cam.push({ on: bigFace(G), dist: 3.6, to: 2.6, yaw: -12, pitch: 2, fov: 40 }),
      zone: "under",
      look: "overworld-night",
      note: "Grandpa, in front of his house: stooped, paler than the rest, with a white beard and white brows. He looks straight at us.",
      stage: (t) => (
        <>
          <Homes />
          <Grandpa position={G} rotationY={SOUTH} nod={Math.sin(t * 1.3) * 0.04} />
          <Fill at={[G[0] - 0.8, 2.0, G[2] + 2.2]} power={11} color="#cfe8ff" />
        </>
      ),
    },
    {
      cue: "2.rain",
      ...cam.push({ on: [G[0], 1.45, G[2]], dist: 5.6, to: 4.5, yaw: 12, pitch: -3, fov: 44 }),
      zone: "under",
      look: "overworld-night",
      note: "Rain comes down through the leaves. Everybody else is under the eaves. Grandpa stands out in it with both arms up and his face turned up, and says AH. THE GOOD WEATHER.",
      stage: (t) => {
        const up = tw(t, 0.25, 0.8);
        return (
          <>
            <Homes />
            <Rain center={[G[0], 0, G[2] + 0.5]} t={t} area={[9, 8]} count={150} />
            <Puddle position={[G[0] - 0.3, 0, G[2] + 0.9]} />
            <Grandpa position={G} rotationY={SOUTH} armPitch={[-2.7 * up, -2.7 * up]} nod={-0.5 * up} mood="happy" lean={0.14 - up * 0.2} />
            <Mum position={[7.4, 0, -5.5]} rotationY={SOUTH - 0.6} lookAt={bigFace(G)} />
            <Old position={[8.5, 0, -5.4]} rotationY={SOUTH - 0.7} lookAt={bigFace(G)} />
            <Bubble text="AH." position={[G[0] - 0.45, 2.5, G[2]]} scale={0.55 * pop(t, w("2.rain", "Ah") - 0.05, 0.14) * (t < w("2.rain", "good") - 0.1 ? 1 : 0)} tail={1} dark />
            <Bubble text="THE GOOD" position={[G[0], 2.85, G[2]]} scale={0.52 * pop(t, w("2.rain", "good") - 0.1, 0.14)} tail={1} dark />
            <Bubble text="WEATHER." position={[G[0], 2.5, G[2]]} scale={0.52 * pop(t, w("2.rain", "good") + 0.05, 0.14)} tail={1} dark />
            <Fill at={[G[0] - 1, 2.2, G[2] + 2.4]} power={12} color="#cfe8ff" />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.push({ on: [7.0, 1.5, -5.3], dist: 3.6, to: 3.2, yaw: -8, pitch: 2, fov: 40 }),
      zone: "under",
      look: "overworld-night",
      note: "Close, under the eave, out of the rain: mum and an old one look at each other. A question mark over the two of them.",
      stage: (t) => (
        <>
          <Homes />
          <Mum position={[6.45, 0, -5.4]} rotationY={SOUTH + 0.5} turn={0.4} tilt={0.12} />
          <Old position={[7.6, 0, -5.4]} rotationY={SOUTH - 0.5} turn={-0.4} tilt={-0.12} />
          <Bubble text="?" position={[7.0, 2.35, -5.3]} scale={0.7 * pop(t, 0.12, 0.14)} tail={-1} dark />
          <Fill at={[6.9, 2.0, -2.1]} power={13} color="#cfe8ff" />
        </>
      ),
    },
    {
      cue: "2.puddles",
      ...cam.push({ on: [G[0] - 0.4, 0.75, G[2] + 0.5], dist: 4.0, to: 3.5, yaw: -18, pitch: 8, fov: 42 }),
      zone: "under",
      look: "overworld-night",
      note: "Low: grandpa jumps in a puddle, twice, and water flies. The kid stands by, watching him do it, and grins.",
      stage: (t) => {
        const j = hop(t, 0.12, 0.3, 0.34) + hop(t, 0.72, 0.3, 0.34);
        const P: [number, number, number] = [G[0] - 0.3, 0, G[2] + 0.9];
        return (
          <>
            <Homes />
            <Rain center={[G[0], 0, G[2] + 0.5]} t={t + 6} area={[9, 8]} count={150} />
            <Puddle position={P} />
            <Grandpa position={[P[0], j, P[2]]} rotationY={SOUTH - 0.2} armPitch={[-1.2, -1.2]} mood="happy" lean={0} />
            <Bits position={[P[0], 0.1, P[2]]} t={t - 0.44} color="#7fbcf2" count={10} power={1.3} />
            <Bits position={[P[0], 0.1, P[2]]} t={t - 1.04} color="#7fbcf2" count={10} power={1.3} seed={3} />
            <Me position={[P[0] - 0.95, 0, P[2] + 0.35]} rotationY={EAST - 0.5} lookAt={[P[0], 0.9, P[2]]} mood="happy" />
            <Fill at={[P[0] - 0.6, 1.6, P[2] + 2.2]} power={10} color="#cfe8ff" />
          </>
        );
      },
    },
  ],
});
