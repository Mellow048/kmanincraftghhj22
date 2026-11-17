import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Barb, Bubble, Count, DEG, Farm, Gary, Kevin, Me, PLACE, Puffs, SOUTH, Shake, Under, pop, timing, tw, w } from "./kit";
import { Others } from "./scene1";

/** 03 — The problem: two years is a long time to look at one face. */
const ME = PLACE.me;
const KEV = PLACE.kevin;
const eyes: Vec3 = [KEV[0], 1.3, KEV[2]];
const mine: Vec3 = [0, 1.6, 0.25];
/** The game on the glass, as it fills: his X, Kevin's O. X always wins. */
const GAME = ["         ", "    x    ", "o   x    ", "o x x    ", "o x x o  ", "o x xxo  ", "o xoxxo  ", "o xoxxx  "];

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Kevin waved",
  shots: [
    {
      cue: "3.problem",
      ...cam.push({ on: [0, 1.45, 0.3], dist: 3.2, to: 2.9, yaw: 18, pitch: 3, fov: 42 }),
      zone: "farm",
      look: "overworld-day",
      note: "The teller, close. He looks down, and then at us.",
      stage: (t) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH + 0.25} nod={t < 0.45 ? 0.4 : 0} />
          <Kevin tag={false} />
        </>
      ),
    },
    {
      cue: "3.long",
      ...cam.push({ on: [0.1, 1.35, 1.15], dist: 6.4, to: 5.6, yaw: 56, pitch: 6, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "The two of them from the side, a pane of glass between: the villager in his room, the zombie in his boat, looking at each other. Over the glass the days run up to 730.",
      stage: (t, { p }) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH} lookAt={eyes} />
          <Kevin tagTurn={56 * DEG} lookAt={mine} />
          <Count position={[0.3, 3.1, 1.15]} rotationY={56 * DEG} text={`DAY ${Math.round(1 + 729 * tw(p, 0.05, 0.8))}`} scale={0.7} />
          <Others t={t} />
        </>
      ),
    },
    {
      cue: "3.wave",
      ...cam.push({ on: [0, 1.35, KEV[2]], dist: 2.9, to: 2.5, yaw: 152, pitch: 4, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "Kevin, close, from inside the room. One green arm comes up, and he waves.",
      stage: (t) => (
        <>
          <Farm />
          <Kevin tagTurn={152 * DEG} lookAt={[0.9, 1.5, 0.3]} wave={tw(t, 0.25, 0.55)} mood="happy" />
        </>
      ),
    },
    {
      cue: "3.back",
      ...cam.push({ on: [0, 1.45, 0.4], dist: 4.4, to: 4.0, yaw: 22, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "Over Kevin's shoulder. The villager has no hands to wave with. He strains at his sleeves, gives up, and waves with his whole body, side to side.",
      stage: (t) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH} lookAt={t < 0.3 ? eyes : undefined} strain={t < 0.5 ? tw(t, 0.05, 0.3) : 0} tilt={t > 0.5 ? Math.sin((t - 0.5) * 11) * 0.35 : 0} />
          <Kevin tagTurn={0.35} wave={1} />
        </>
      ),
    },
    {
      cue: "3.game",
      ...cam.push({ on: [0.42, 1.25, 0.95], dist: 3.2, to: 2.7, yaw: 27, pitch: 4, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "The glass, close. A grid is scratched on it, and it fills while we watch: an X from inside, an O from outside, an X, an O. The villager watches the board through it.",
      stage: (t, { dur }) => {
        const n = Math.min(GAME.length - 1, Math.floor((t / dur) * (GAME.length + 0.5)));
        return (
          <>
            <Farm game={GAME[n]} />
            <Me position={[-0.25, 0, 0.3]} rotationY={SOUTH + 0.3} lookAt={[0.42, 1.2, 0.95]} />
            <Kevin tagTurn={0.45} armPitch={[n % 2 ? 0 : -1.5, 0]} />
          </>
        );
      },
    },
    {
      cue: "3.lost",
      ...cam.push({ on: [0, 1.35, KEV[2]], dist: 2.9, to: 2.6, yaw: 150, pitch: 4, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "Kevin through the finished board: three X in a row, and he has lost again. He looks at it, and then he is delighted anyway.",
      stage: (t) => {
        const ok = w("3.lost", "He") - 0.1;
        return (
          <>
            <Farm game={GAME[7]} />
            <Kevin tagTurn={150 * DEG} lookAt={t < ok ? [0.42, 1.2, 0.95] : [0.9, 1.5, 0.3]} mood={t < ok ? "sad" : "happy"} wave={t > ok ? 1 : 0} />
          </>
        );
      },
    },
    {
      cue: "3.urr",
      ...cam.push({ on: [0.1, 1.35, 1.15], dist: 5.6, to: 5.0, yaw: 56, pitch: 6, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "The two of them from the side. Kevin says it: URR. The villager nods back, good morning.",
      stage: (t) => {
        const say = w("3.urr", "urr") - 0.1;
        const nod = w("3.urr", "good") - 0.1;
        return (
          <>
            <Farm game={GAME[7]} />
            <Me position={ME} rotationY={SOUTH} lookAt={t > nod ? undefined : eyes} nod={t > nod ? Math.sin(tw(t, nod, nod + 0.5) * Math.PI) * 0.4 : 0} />
            <Kevin tagTurn={56 * DEG} lookAt={mine} nod={t > say && t < say + 0.4 ? -0.2 : 0} />
            <Bubble text="URR" position={[0.25, 2.55, KEV[2] + 0.15]} rotationY={56 * DEG} scale={0.6 * pop(t, say, 0.14)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "3.nothing",
      ...cam.push({ on: [0, 1.5, 0.4], dist: 4.2, to: 3.8, yaw: 22, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "Over Kevin's shoulder again. The villager looks at him, takes the big breath, throws his head back: and nothing. A very small bubble with three dots in it.",
      stage: (t) => {
        const open = w("3.nothing", "opened") - 0.1;
        const none = w("3.nothing", "nothing") - 0.1;
        return (
          <>
            <Farm game={GAME[7]} />
            <Me position={ME} rotationY={SOUTH} lookAt={t < open ? eyes : undefined} nod={t > open ? -0.45 : 0} lean={t > open && t < none ? -0.08 : 0} />
            <Bubble text="..." position={[0.5, 2.3, 1.15]} rotationY={0.35} scale={0.42 * pop(t, none, 0.14)} tail={-1} />
            <Kevin tagTurn={0.35} wave={t > none ? 1 : 0} />
          </>
        );
      },
    },
    {
      cue: "3.noiron",
      ...cam.push({ on: [0, 1.5, -2.6], dist: 9.0, to: 8.4, yaw: 180, pitch: 9, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The stone where the iron men appear. Nothing on it. One small puff of dust.",
      stage: (t) => (
        <>
          <Farm game={GAME[7]} />
          <Me position={ME} rotationY={SOUTH} />
          <Others t={t} />
          <Kevin wave={1} />
          {t > 0.5 ? <Puffs position={[0, 0.2, PLACE.spawn[2]]} count={3} spread={0.5} size={0.2} rise={0.3} speed={0.8} color="#d9d9d9" /> : null}
        </>
      ),
    },
    {
      cue: "3.noiron",
      cut: w("3.noiron", "No", 0, 2) - 0.06,
      ...cam.push({ on: [0, 1.0, -0.6], dist: 4.4, to: 4.0, yaw: 10, pitch: 24, fov: 44 }),
      zone: "under",
      look: "overworld-day",
      note: "The chest, from above, open. Empty.",
      stage: () => <Under open={1} iron={0} />,
    },
    {
      cue: "3.gary",
      ...cam.push({ on: [-2.3, 1.5, 0.3], dist: 4.8, to: 4.2, yaw: -10, pitch: 5, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "Gary, wide awake for once, screaming for two: jumping, shaking, a big bubble. Then the bubble shrinks to a squeak, and he looks at us, hoarse.",
      stage: (t) => {
        const lost = w("3.gary", "lost") - 0.15;
        const k = t < lost ? 1 : 0;
        return (
          <>
            <Farm />
            <Shake t={t} k={k}>
              <Gary position={PLACE.gary} rotationY={SOUTH} nod={k ? -0.4 : 0.1} hmm={k} />
            </Shake>
            <Bubble text={k ? "AAAH!" : "eh"} position={[-2.35, 2.5, 1.15]} scale={k ? 0.58 + Math.sin(t * 30) * 0.03 : 0.4} tail={-1} tilt={k ? Math.sin(t * 36) * 0.04 : 0} />
            <Me position={ME} rotationY={SOUTH} />
          </>
        );
      },
    },
    {
      cue: "3.barb",
      ...cam.push({ on: [2.3, 1.8, 0.3], dist: 4.8, to: 4.3, yaw: 8, pitch: 5, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "Barb. The number over her head has not moved: 911. She looks up at it, and down, and the number goes dim.",
      stage: (t) => (
        <>
          <Farm />
          <Barb position={PLACE.barb} rotationY={SOUTH} nod={t < 0.5 ? -0.5 : 0.35} />
          <Count position={[2.3, 3.0, 1.1]} text="911" scale={0.75} color={t > 0.6 ? "#6f6650" : "#ffe27a"} />
        </>
      ),
    },
  ],
});
