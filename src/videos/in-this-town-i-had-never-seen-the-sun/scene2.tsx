import { cam, storyScene } from "../../engine";
import {
  Block, Blaze, Bubble, EAST, Fill, Glow, Grandpa, HelmetProp, Homes, Lying, Me, Mum, MyRoom, NORTH, Old, PLACE, PinkDawn, Puffs, SOUTH, WEST, go, hop, meFace,
  pop, timing, tw, w,
} from "./kit";

/** 02 — I ran out, and I was on fire. Then I found a hat. */
const DOOR: [number, number, number] = [0.5, 0, -1.4];
const HAT = PLACE.hat;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "On fire, and the hat",
  shots: [
    {
      cue: "3.morning",
      ...cam.push({ on: [-0.5, 0.6, -1.1], dist: 4.4, to: 3.8, yaw: 10, pitch: 30, fov: 42 }),
      zone: "room",
      look: "overworld-night",
      note: "From above: there is a lump under the blanket where he should be, and the kid himself is on tiptoe half way to the door.",
      stage: (t) => (
        <>
          <MyRoom />
          <Block position={[PLACE.bed[0], 0.62, PLACE.bed[2] + 0.1]} size={[0.5, 0.22, 1.0]} color="#c8362e" />
          <Me {...go([-0.75, 0, -0.6], DOOR, tw(t, 0.2, 1.9))} nod={0.1} turn={Math.sin(t * 3) * 0.5} />
          <Fill at={[-0.6, 2.4, 0.6]} power={7} color="#cfd8ff" reach={5} />
        </>
      ),
    },
    {
      cue: "3.wait",
      ...cam.push({ on: [0.45, 0.7, -1.6], dist: 2.9, to: 2.3, yaw: -24, pitch: 9, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "At the door, from behind him: both hands on it. The crack under the door is dark, then pink, then brighter. He looks back over his shoulder once.",
      stage: (t) => {
        const pink = w("3.wait", "sky");
        return (
          <>
            <MyRoom light={tw(t, pink - 0.25, pink + 0.5)} tint="#ff9fb0" />
            <Me position={DOOR} rotationY={NORTH} armPitch={[-1.45, -1.45]} turn={Math.sin(tw(t, 0.2, 0.9) * Math.PI) * 2.3} />
            <Fill at={[-0.4, 1.4, 0.4]} power={4} color="#cfd8ff" reach={4} />
          </>
        );
      },
    },
    {
      cue: "3.ran",
      ...cam.push({ on: [0.25, 0.85, -3.6], dist: 5.2, to: 4.2, yaw: -6, pitch: 5, fov: 44 }),
      zone: "under",
      look: "overworld-night",
      note: "The door of our house bangs open and he runs straight at us with both arms in the air, into the pink light.",
      stage: (t) => {
        const k = tw(t, 0.05, 0.95);
        return (
          <>
            <Homes open />
            <PinkDawn />
            <Me {...go([0, 0, -6.0], [0.5, 0, -1.6], k)} armPitch={[-2.8, -2.8]} mood="happy" />
            <Puffs position={[0, 0.2, -5.6]} count={6} spread={0.5} size={0.2} rise={0.6} speed={1.6} color="#e9d9d0" />
            <Fill at={[0.4, 1.6, 0.8]} power={12} color="#ffd0d0" />
          </>
        );
      },
    },
    {
      cue: "3.saw",
      ...cam.push({ on: [0, 1.7, -8], dist: 9.5, to: 8.4, yaw: 3, pitch: -3, fov: 46 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "Past the last tree, from behind him: the path, the hill, and the edge of the sun on top of it. He stops dead with his arms still up. His shadow runs back towards us.",
      stage: (t) => (
        <>
          <Me {...go([0, 0, -0.6], [0, 0, -2.6], tw(t, 0, 0.5))} armPitch={[-2.8 + tw(t, 0.5, 1.0) * 1.6, -2.8 + tw(t, 0.5, 1.0) * 1.6]} nod={-0.25} />
        </>
      ),
    },
    {
      cue: "3.fire",
      ...cam.push({ on: [0, 0.95, -2.6], dist: 3.2, to: 2.7, yaw: 188, pitch: 3, fov: 40 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "His face, from the front, with the dark wood behind him: flames all over him. His mouth is open and his arms are up.",
      stage: (t) => (
        <>
          <Me position={[0, hop(t, 0.1, 0.25, 0.3) + hop(t, 0.55, 0.25, 0.3), -2.6]} rotationY={NORTH} armPitch={[-2.6, -2.6]} mood="scared" fire turn={Math.sin(t * 9) * 0.3} />
          <Fill at={[0, 1.4, -4.6]} power={10} color="#ffcf8a" />
        </>
      ),
    },
    {
      cue: "3.mum",
      ...cam.push({ on: [0.15, 0.55, 0.0], dist: 3.8, to: 3.2, yaw: 8, pitch: 10, fov: 42 }),
      zone: "room",
      look: "overworld-night",
      note: "Indoors, the door shut again: he is flat on the floor on his front, and mum is sitting on him. The last flame goes out under her and smoke comes up round them both.",
      stage: (t) => (
        <>
          <MyRoom light={1} bed={false} />
          <Lying down position={[-0.55, 0.11, 0]} turn={-Math.PI / 2}>
            <Me rotationY={0} armPitch={[-2.9, -2.9]} nod={-1.0} mood="sad" soot={t > 0.7} />
          </Lying>
          <Mum position={[0.05, -0.47 + hop(t, 0.1, 0.12, 0.3), -0.02]} rotationY={SOUTH} arms={0} mood="angry" nod={0.3} />
          {t < 0.7 ? <Blaze position={[0.4, 0.15, 0]} size={0.4} height={0.8 * (1 - t / 0.7)} count={8} /> : null}
          <Puffs position={[-0.75, 0.2, 0.1]} count={4} rise={1.1} spread={0.16} size={0.18} speed={0.9} color="#cfcfcf" opacity={0.55} />
          <Puffs position={[0.85, 0.2, -0.1]} count={4} rise={1.1} spread={0.16} size={0.18} speed={0.9} color="#cfcfcf" opacity={0.55} seed={3} />
          <Fill at={[-0.2, 1.8, 2.0]} power={8} color="#cfd8ff" reach={5} />
        </>
      ),
    },
    {
      cue: "3.toast",
      ...cam.push({ on: [1.45, 1.1, -2.7], dist: 3.0, to: 2.5, yaw: -8, pitch: 3, fov: 40 }),
      zone: "under",
      look: "overworld-night",
      note: "Out in the street, later: the kid is a darker green than he was and a wisp of smoke still comes off his head. An old one leans down and sniffs him: TOAST?",
      stage: (t) => (
        <>
          <Homes />
          <Me position={[1.1, 0, -2.5]} rotationY={SOUTH + 0.2} soot mood="sad" nod={0.15} />
          <Puffs position={[1.1, 1.25, -2.5]} count={4} rise={0.7} spread={0.08} size={0.1} speed={1.0} color="#d8d8d8" opacity={0.6} />
          <Old position={[2.15, 0, -3.0]} rotationY={WEST + 0.7} lean={0.45} nod={0.3} lookAt={meFace([1.1, 0, -2.5])} />
          <Bubble text="TOAST?" position={[2.0, 2.2, -2.9]} scale={0.5 * pop(t, 0.35, 0.14)} tail={-1} dark />
          <Fill at={[1.0, 1.8, -0.6]} power={11} color="#dfeeff" />
        </>
      ),
    },
    {
      cue: "3.that",
      ...cam.push({ on: [-0.8, 0.6, -1.3], dist: 4.4, to: 3.9, yaw: 6, pitch: 30, fov: 54 }),
      zone: "room",
      look: "overworld-night",
      note: "His room. Two planks are nailed across the door, and he lies in bed. On \"I thought\" the line of gold comes on under the nailed door, and his head turns to it.",
      stage: (t) => {
        const th = w("3.that", "thought");
        return (
          <>
            <MyRoom boards light={tw(t, th - 0.35, th)} />
            <Lying position={[PLACE.bed[0], 0.64, PLACE.bed[2] + 0.55]}>
              <Me rotationY={0} turn={tw(t, th - 0.2, th + 0.1) * -1.0} soot />
            </Lying>
            <Fill at={[-1.2, 2.2, 0.2]} power={11} color="#cfd8ff" reach={5} />
          </>
        );
      },
    },
    {
      cue: "4.found",
      ...cam.push({ on: [0.3, 0.5, -0.5], dist: 5.0, to: 3.8, yaw: 22, pitch: 11, fov: 42 }),
      zone: "rim",
      look: "overworld-night",
      note: "Night, the last trees. Something on the path catches the moon: an iron helmet lying on its side. The kid comes out of the wood and stops over it.",
      stage: (t) => (
        <>
          <HelmetProp position={[HAT[0], 0.02, HAT[2]]} rotation={[0, 0.5, 0.25]} />
          <Glow position={[HAT[0], 0.35, HAT[2] + 0.2]} size={1.1 + Math.sin(t * 5) * 0.25} color="#dfeaff" opacity={0.6} />
          <Me {...go([-0.7, 0, 2.6], [-0.25, 0, 0.1], tw(t, 0.1, 1.9))} lookAt={[HAT[0], 0.2, HAT[2]]} lean={tw(t, 1.9, 2.4) * 0.35} />
          <Fill at={[0.6, 2.0, 1.2]} power={14} color="#dfe8ff" />
        </>
      ),
    },
    {
      cue: "4.iron",
      ...cam.push({ on: [HAT[0] - 0.1, 0.5, HAT[2]], dist: 2.1, to: 1.7, yaw: 20, pitch: 10, fov: 38 }),
      zone: "rim",
      look: "overworld-night",
      note: "Close: he holds the helmet up in both hands and turns it. On \"dent\" the dent comes round to us and glints.",
      stage: (t) => {
        const d = w("4.iron", "dent");
        const p: [number, number, number] = [HAT[0] - 0.55, 0, HAT[2] - 0.1];
        return (
          <>
            <Me position={p} rotationY={EAST - 0.75} armPitch={[-1.5, -1.5]} lookAt={[p[0] + 0.4, 0.75, p[2] + 0.25]} />
            <HelmetProp position={[p[0] + 0.34, 0.66, p[2] + 0.3]} rotation={[0, -0.9 + tw(t, 0.2, d) * 1.2, 0]} />
            <Glow position={[p[0] + 0.45, 0.92, p[2] + 0.5]} size={0.5 * pop(t, d - 0.05, 0.2)} color="#ffffff" opacity={0.8} />
            <Fill at={[0.9, 1.4, 1.0]} power={10} color="#dfe8ff" />
          </>
        );
      },
    },
    {
      cue: "4.old",
      ...cam.push({ on: [0.5, 1.25, -3.0], dist: 5.4, to: 4.5, yaw: -8, pitch: 3, fov: 44 }),
      zone: "under",
      look: "overworld-night",
      note: "Back in town he holds the hat out to the old ones. One of them raps it with a finger: A HAT KEEPS THE LIGHT OFF. Grandpa stands behind them and says nothing, and smiles.",
      stage: (t) => {
        const p: [number, number, number] = [-0.7, 0, -2.3];
        return (
          <>
            <Homes />
            <Me position={p} rotationY={EAST - 0.5} armPitch={[-1.5, -1.5]} lookAt={[0.8, 1.6, -3.0]} />
            <HelmetProp position={[p[0] + 0.36, 0.66, p[2] + 0.2]} rotation={[0, 0.9, 0]} />
            <Old position={[0.7, 0, -3.1]} rotationY={WEST + 0.6} wave={tw(t, 0.3, 0.6)} lookAt={[p[0] + 0.3, 0.8, p[2]]} />
            <Old n={1} position={[1.5, 0, -2.6]} rotationY={WEST + 0.4} lookAt={[p[0] + 0.3, 0.8, p[2]]} />
            <Grandpa position={[2.3, 0, -4.2]} rotationY={SOUTH - 0.4} mood="happy" />
            <Bubble text="A HAT KEEPS" position={[0.9, 2.75, -3.1]} scale={0.42 * pop(t, w("4.old", "hat") - 0.1, 0.14)} tail={-1} dark />
            <Bubble text="THE LIGHT OFF." position={[0.9, 2.45, -3.1]} scale={0.42 * pop(t, w("4.old", "keeps"), 0.14)} tail={-1} dark />
            <Fill at={[0.4, 2.0, -0.4]} power={13} color="#dfeeff" />
          </>
        );
      },
    },
    {
      cue: "4.long",
      ...cam.push({ on: [-0.05, 1.15, -2.6], dist: 4.4, to: 3.9, yaw: 8, pitch: 3, fov: 40 }),
      zone: "under",
      look: "overworld-night",
      note: "The kid, with the hat: HOW LONG? The old one looks at the other old one. Neither of them knows.",
      stage: (t) => {
        const p: [number, number, number] = [-0.7, 0, -2.3];
        return (
          <>
            <Homes />
            <Me position={p} rotationY={EAST - 0.5} armPitch={[-1.5, -1.5]} lookAt={[0.7, 1.6, -3.0]} />
            <HelmetProp position={[p[0] + 0.36, 0.66, p[2] + 0.2]} rotation={[0, 0.9, 0]} />
            <Old position={[0.7, 0, -3.1]} rotationY={WEST + 0.6} turn={-tw(t, 0.6, 0.9) * 1.1} tilt={0.1} />
            <Old n={1} position={[1.75, 0, -2.8]} rotationY={WEST + 0.4} turn={tw(t, 0.75, 1.05) * 0.5} tilt={-0.1} />
            <Bubble text="HOW LONG?" position={[p[0] + 0.45, 1.78, p[2]]} scale={0.4 * pop(t, 0.1, 0.14)} tail={1} dark />
            <Bubble text="?" position={[1.25, 2.4, -3.0]} scale={0.6 * pop(t, 0.95, 0.14)} tail={-1} dark />
            <Fill at={[0.2, 2.0, -0.4]} power={13} color="#dfeeff" />
          </>
        );
      },
    },
    {
      cue: "4.on",
      ...cam.push({ on: [0.35, 0.85, -1.2], dist: 3.1, to: 2.5, yaw: -14, pitch: 6, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "At his door, with the gold line under it: he lifts the hat over his head and drops it on. It is too big and sits down to his eyes. Then he turns to the door and it swings open, and the room goes gold.",
      stage: (t) => {
        const put = w("4.on", "put");
        const on = t > put + 0.12;
        const open = tw(t, put + 0.55, put + 1.1);
        return (
          <>
            <MyRoom light={1} door={open * 0.7} boards={false} />
            <Me position={[0.45, hop(t, put + 0.12, 0.08, 0.2), -1.2]} rotationY={SOUTH + 0.2 + tw(t, put + 0.4, put + 0.8) * (Math.PI - 0.5)} helmet={on} armPitch={on ? [0, 0] : [-2.9, -2.9]} mood={on ? "happy" : "calm"} />
            {on ? null : <HelmetProp position={[0.47, 1.36 - tw(t, put - 0.1, put + 0.12) * 0.3, -1.12]} rotation={[0, 0.2, 0]} />}
            <Fill at={[-0.5, 1.4, 0.6]} power={5} color="#cfd8ff" reach={4} />
          </>
        );
      },
    },
    {
      cue: "4.out",
      ...cam.push({ on: [0, 0.9, 1.3], dist: 4.6, to: 3.6, yaw: 188, pitch: 3, fov: 42 }),
      zone: "rim",
      look: "overworld-sunset",
      note: "From out in the open, looking back at the wood: he walks out of the dark between the trees into the first sun, with the hat on, and nothing happens to him.",
      stage: (t) => (
        <>
          <Me {...go([0, 0, 3.6], [0, 0, 0.4], tw(t, 0, 1.1))} helmet mood="calm" />
          <Fill at={[0.5, 1.6, -2.2]} power={16} color="#ffd9a0" />
        </>
      ),
    },
  ],
});
