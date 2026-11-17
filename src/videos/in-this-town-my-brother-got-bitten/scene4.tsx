import { cam, storyScene } from "../../engine";
import {
  Bits, Block, Bottle, Bro, Bubble, Cellar, Dad, Fill, GoldenApple, HandLantern, KID, Loaf, Me, NORTH, PLACE, Price, Priest, ROBE, RedSwirl, SOUTH, Splash, TEEN, TownSet, Villager,
  WEST, EAST, chest, face, jolt, pop, skyAt, timing, tw, w,
} from "./kit";
import { LOAF } from "./scene3";

/** 06–07 — What the room was for. Then dad came down the stairs with the apple, and the sun came after him. */
const LAMP: [number, number, number] = [0.75, 0, 0.2];
const loaf = <Loaf position={LOAF} rotation={[0, 0.3, 0]} />;
const S = PLACE.stall;
const DAD: [number, number, number] = [0.55, 0, 0.45];
const lamp = <HandLantern position={[0, 0, 0.04]} light={16} scale={0.85} />;
/** He shakes: a small fast sideways rattle. */
const rattle = (t: number, k = 1): [number, number, number] => [PLACE.bro[0] + Math.sin(t * 46) * 0.025 * k, 0, PLACE.bro[2] + Math.sin(t * 37) * 0.012 * k];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A room for this",
  shots: [
    {
      cue: "6.sat",
      ...cam.push({ on: [-1.75, 1.75, 1.08], dist: 3.9, to: 3.5, yaw: 150, pitch: 2, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From inside the cell, through the bars: the kid sitting on the third stair with the lantern beside him, small, looking in at the room.",
      stage: () => (
        <>
          <Cellar walls="ews" sky={skyAt(0.3)} />
          <Bro position={[1.35, 0, -1.5]} rotationY={SOUTH - 0.6} green={1} out bitten />
          {loaf}
          <Me position={[-1.75, 0.9 - 0.5 * KID, 1.25]} rotationY={NORTH + 0.5} sit />
          <HandLantern position={[-2.1, 0.6, 0.74]} light={20} scale={0.9} />
          <Fill at={[-0.6, 2.4, 0.4]} power={12} />
        </>
      ),
    },
    {
      cue: "6.bars",
      ...cam.push({ on: [0.9, 1.35, -0.5], dist: 1.9, to: 1.6, yaw: 38, pitch: 0, fov: 40 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The bars, close and at an angle, running away down the frame.",
      stage: () => (
        <>
          <Cellar sky={skyAt(0.3)} />
          <HandLantern position={[1.2, 0, 0.3]} light={22} />
        </>
      ),
    },
    {
      cue: "6.bed",
      ...cam.push({ on: [1.15, 0.45, -2.0], dist: 2.7, to: 2.4, yaw: -22, pitch: 24, fov: 42 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The bed in the cell, from above: a made bed with a pillow.",
      stage: () => (
        <>
          <Cellar walls="new" sky={skyAt(0.3)} />
          <pointLight position={[0.6, 1.6, -1.2]} color="#ffc27a" intensity={14} distance={5} decay={1.6} />
        </>
      ),
    },
    {
      cue: "6.apple",
      ...cam.push({ on: [S[0] + 0.85, 1.45, S[2] + 0.1], dist: 3.0, to: 2.1, yaw: 10, pitch: 6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The priest's stall by day. A push in on the golden apple under its glass, with a sign over it: NOT FOR SALE.",
      stage: (t) => (
        <>
          <TownSet sign />
          <Priest position={[S[0] - 0.5, 0, S[2] - 0.85]} rotationY={SOUTH} turn={-0.5 + tw(t, 0.8, 1.4) * 1.0} />
        </>
      ),
    },
    {
      cue: "6.half",
      ...cam.push({ on: [S[0] + 0.2, 1.3, S[2] + 1.35], dist: 4.0, to: 3.5, yaw: 164, pitch: 10, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "From behind the counter, past the apple under its glass: one family in front, a mother with a loaf and a small kid. One emerald comes up over their heads.",
      stage: (t) => (
        <>
          <TownSet />
          <Villager position={[S[0] - 0.1, 0, S[2] + 1.35]} rotationY={NORTH} robe={ROBE.blue} phase={2} carry={<Loaf scale={0.7} />} nod={tw(t, 0.7, 1.1) * 0.25} />
          <Villager position={[S[0] + 0.6, 0, S[2] + 1.6]} rotationY={NORTH - 0.1} robe={ROBE.friend} kid scale={KID} phase={3} />
          <Price position={[S[0] + 0.2, 2.25, S[2] + 1.45]} n={1} scale={0.8 * pop(t, 0.2, 0.16)} rotationY={Math.PI} />
        </>
      ),
    },
    {
      cue: "6.not",
      ...cam.push({ on: [0.75, 0.75, -1.3], dist: 4.0, to: 3.5, yaw: 186, pitch: 16, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From the back of the cell: the bed, a bucket and a bowl of water in front, then the bars, and the kid's face on the other side of them. The thought over his head has a line through it.",
      stage: (t) => (
        <>
          <Cellar walls="ew" sky={skyAt(0.35)} />
          <Bro position={[-1.3, 0, -1.4]} rotationY={SOUTH + 0.5} green={1} out bitten />
          {loaf}
          <Me position={[0.75, 0, 0.1]} rotationY={NORTH} />
          <group position={[0.75, 1.72, 0.2]} rotation={[0, Math.PI, 0]}>
            <Bubble text="BAD KIDS?" position={[0, 0, 0]} scale={0.42} tail={1} />
            <Block position={[0, 0, 0.05]} size={[1.0 * tw(t, 0.4, 0.8), 0.05, 0.02]} color="#e3261c" castShadow={false} />
          </group>
          <HandLantern position={[0.1, 0, 0.3]} light={22} />
          <Fill at={[0.6, 2.2, -3.0]} power={16} />
        </>
      ),
    },
    {
      cue: "6.built",
      ...cam.top({ on: [0, 0, 0.2], height: 11.6, to: 10.4, fov: 50 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The whole cellar from straight above with the ceiling off, like a plan: the stairs, the bars from wall to wall, the bed, the water, the post, and two small figures, one on each side of the bars.",
      stage: () => (
        <>
          <Cellar walls="news" roof={false} sky={skyAt(0.4)} />
          <Bro position={PLACE.bro} rotationY={SOUTH} green={1} out bitten />
          {loaf}
          <Me position={PLACE.me} rotationY={NORTH} />
          <HandLantern position={LAMP} light={26} />
          <Fill at={[0, 5, 0.2]} power={60} reach={14} />
        </>
      ),
    },
    {
      cue: "7.door",
      ...cam.push({ on: [-1.9, 2.5, 2.8], dist: 3.6, to: 3.2, yaw: 148, pitch: -14, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Looking up the stairs from the floor. The door at the top swings open and grey light falls in. A tall shape stands in it: dad.",
      stage: (t) => {
        const o = tw(t, w("7.door", "door"), w("7.door", "opened") + 0.2);
        return (
          <>
            <Cellar walls="ews" door={o} day="#b8c0d0" sky={skyAt(0.45)} />
            {o > 0.5 ? <Dad position={[PLACE.cellarDoor[0], 1.8, 2.75]} rotationY={NORTH + 0.2} nod={0.12} /> : null}
            <Me position={[-1.15, 0, 0.9]} rotationY={SOUTH - 0.4} lookAt={[-1.95, 3.2, 2.9]} />
            <HandLantern position={[-0.6, 0, 0.6]} light={16} />
          </>
        );
      },
    },
    {
      cue: "7.night",
      ...cam.push({ on: [0, 1.25, -3.5], dist: 6.4, to: 5.6, yaw: 10, pitch: 3, fov: 44 }),
      zone: "woods",
      look: "forest-night",
      note: "Before: the road through the woods at night. Dad walking towards the lens with a lantern, and far behind him one purple window.",
      stage: (t) => (
        <>
          <Dad position={[0, 0, -6.5 + t * 1.6]} rotationY={SOUTH} walk={t * 1.6} carry={<HandLantern position={[0.3, -0.22, 0.1]} light={12} scale={0.7} />} />
          <Fill at={[0, 3, 2]} power={22} />
        </>
      ),
    },
    {
      cue: "7.had",
      ...cam.push({ on: [DAD[0], 1.2, DAD[2]], dist: 3.0, to: 2.4, yaw: 14, pitch: -3, fov: 40 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Dad at the foot of the stairs. In his arms: the golden apple from the priest's window, shining, and then beside it a round grey bottle with a cork.",
      stage: (t) => (
        <>
          <Cellar door={1} day="#b8c0d0" sky={skyAt(0.45)} />
          <Dad
            position={DAD}
            rotationY={SOUTH - 0.15}
            carry={
              <group rotation={[-0.75, 0, 0]}>
                <GoldenApple position={[-0.13, -0.16, 0.2]} scale={0.55 * pop(t, 0.15, 0.16)} glow={0.3} />
                <Bottle position={[0.14, -0.16, 0.2]} scale={0.6 * pop(t, w("7.had", "bottle") - 0.15, 0.16)} />
              </group>
            }
          />
          <pointLight position={[0.7, 1.4, 1.8]} color="#ffd98a" intensity={5} distance={4} decay={1.6} />
          <HandLantern position={[-0.5, 0, 0.4]} light={12} />
        </>
      ),
    },
    {
      cue: "7.said",
      ...cam.push({ on: [0.2, 0.95, 1.05], dist: 4.2, to: 3.8, yaw: 90, pitch: 5, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From the side: dad bends down and puts the lantern in the kid's arms. Then his head turns up to the open door behind them, where it is getting light.",
      stage: (t) => {
        const give = w("7.said", "lantern");
        const sun = w("7.said", "sun");
        return (
          <>
            <Cellar walls="nws" door={1} day="#d8d0c0" sky={skyAt(0.5)} sun={0.09} />
            <Dad position={[0.2, 0, 0.5]} rotationY={SOUTH} lean={0.35 * (1 - tw(t, sun - 0.2, sun + 0.2))} carry={t < give ? lamp : undefined} lookAt={t > sun - 0.1 ? [-1.95, 3.0, 3.0] : undefined} />
            <Me position={[0.2, 0, 1.55]} rotationY={NORTH} carry={t >= give ? lamp : undefined} lookAt={t > sun ? [-1.95, 3.0, 3.0] : [0.2, 1.6, 0.5]} />
            <Bubble text="KEEP THE SUN" position={[0.6, 2.1, 1.25]} rotationY={Math.PI / 2} scale={0.34 * pop(t, sun - 0.5, 0.14)} tail={1} />
            <Bubble text="OFF HIM." position={[0.6, 1.88, 1.25]} rotationY={Math.PI / 2} scale={0.34 * pop(t, sun - 0.35, 0.14)} tail={1} />
            <Fill at={[2.4, 1.8, 1.2]} power={12} />
          </>
        );
      },
    },
    {
      cue: "7.threw",
      ...cam.push({ on: [-0.15, 1.15, -0.2], dist: 4.3, to: 3.9, yaw: 54, pitch: 8, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From the side. Dad throws. The bottle goes between the bars and breaks on the brother in a grey cloud.",
      stage: (t) => {
        const hit = 0.42;
        const k = Math.min(1, t / hit);
        return (
          <>
            <Cellar walls="nws" door={1} day="#d8d0c0" sky={skyAt(0.5)} sun={0.09} />
            <Bro position={PLACE.bro} rotationY={SOUTH} green={1} out bitten nod={t > hit ? -0.25 : 0} />
            {loaf}
            <Dad position={[0.4, 0, 0.8]} rotationY={NORTH + 0.35} lean={jolt(t, 0.1, 0.5)} />
            {t < hit ? <Bottle position={[0.3 - k * 0.47, 1.2 + Math.sin(k * Math.PI) * 0.35, 0.45 - k * 1.35]} rotation={[t * 22, 0, 0]} /> : null}
            <Splash position={[PLACE.bro[0], 1.0, -0.9]} t={t - hit} color="#b9bfd4" />
            <Me position={[-1.2, 0, 0.55]} rotationY={NORTH + 0.2} carry={lamp} />
            <Fill at={[2.4, 2.2, 1.6]} power={14} />
          </>
        );
      },
    },
    {
      cue: "7.ate",
      ...cam.push({ on: [-0.17, 1.15, -0.45], dist: 3.2, to: 2.7, yaw: 56, pitch: 3, fov: 40 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Close on the bars from the side. Dad holds the golden apple out between them. The brother looks at it, leans, and it is gone in a spray of gold crumbs.",
      stage: (t) => {
        const eat = w("7.ate", "ate");
        return (
          <>
            <Cellar walls="nws" door={1} day="#d8d0c0" sky={skyAt(0.55)} sun={0.09} />
            <Bro position={PLACE.bro} rotationY={SOUTH} green={1} bitten arms={{ l: -0.4, r: -0.4 }} lean={tw(t, eat - 0.4, eat) * 0.35} nod={0.2} />
            <Dad position={[-0.17, 0, 0.42]} rotationY={NORTH} lean={0.3} carry={t < eat ? <GoldenApple position={[0, 0.02, 0.2]} scale={1.1} glow={0.7} /> : undefined} />
            {t > eat ? <Bits position={[-0.17, 1.25, -0.55]} t={t - eat} color="#ffd24a" count={12} power={1.3} /> : null}
            <HandLantern position={[-0.9, 0, 0.3]} light={18} />
            <Fill at={[2.4, 1.8, 0]} power={12} />
          </>
        );
      },
    },
    {
      cue: "7.shake",
      ...cam.push({ on: chest(PLACE.bro, TEEN), dist: 2.9, to: 2.5, yaw: -10, pitch: 3, fov: 42 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Through the bars, from the front. He starts to shake all over, and red sparks begin to turn round him.",
      stage: (t) => {
        const k = tw(t, 0.3, 1.0);
        return (
          <>
            <Cellar door={1} day="#d8d0c0" sky={skyAt(0.6)} sun={0.09} />
            <Bro position={rattle(t, k)} rotationY={SOUTH} green={1} out bitten tilt={Math.sin(t * 41) * 0.05 * k} />
            <RedSwirl position={PLACE.bro} t={t} k={k} />
            {loaf}
            <Fill at={[0.6, 2.2, 2.0]} power={14} />
          </>
        );
      },
    },
    {
      cue: "7.long",
      ...cam.push({ on: [0, 0.7, -0.15], dist: 6.2, to: 5.8, yaw: 0, pitch: 34, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From high up: dad and the kid sitting on the floor side by side with the lantern between them, watching. Behind the bars he shakes in the red. The little window goes from grey towards gold.",
      stage: (t) => (
        <>
          <Cellar roof={false} door={1} day="#e8d8b0" sky={skyAt(0.6 + tw(t, 0, 1.3) * 0.3)} sun={0.09} />
          <Bro position={rattle(t)} rotationY={SOUTH} green={0.95} out bitten tilt={Math.sin(t * 41) * 0.05} />
          <RedSwirl position={PLACE.bro} t={t + 3} />
          {loaf}
          <Dad position={[0.55, -0.5, 1.1]} rotationY={NORTH} sit />
          <Me position={[-0.6, -0.5 * KID, 1.1]} rotationY={NORTH} sit />
          <HandLantern position={[0, 0, 1.0]} light={20} />
          <Fill at={[0, 3.4, 2.4]} power={22} />
        </>
      ),
    },
    {
      cue: "7.sun",
      ...cam.push({ on: [-1.9, 1.35, 1.75], dist: 3.5, to: 3.2, yaw: 126, pitch: 4, fov: 52 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The stairs, looking up them to the open door. Gold light from it lies on the top step. It drops to the next one, and the next, on the words. The kid stands at the bottom and watches it come.",
      stage: (t) => {
        const a = w("7.sun", "One");
        const b = w("7.sun", "Then");
        const sun = 0.09 + (t > 0.5 ? 0.08 : 0) + (t > a ? 0.085 : 0) + (t > b ? 0.085 : 0) + (t > b + 0.4 ? 0.08 : 0);
        return (
          <>
            <Cellar walls="ws" door={1} day="#ffd27a" sky={skyAt(0.95)} sun={sun} />
            <Me position={[-1.0, 0, 0.15]} rotationY={SOUTH - 0.5} carry={lamp} lookAt={[-1.95, 2.4, 2.6]} />
            <Fill at={[0.4, 2.2, 0.2]} power={18} />
          </>
        );
      },
    },
    {
      cue: "7.stood",
      ...cam.push({ on: [-0.5, 0.9, 0.3], dist: 4.2, to: 3.8, yaw: 216, pitch: 5, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From the back corner of the cell, past the brother shaking in the red: the gold light is across the floor now, coming for the bars. The kid walks into the middle of it and stops, facing us, with the bright door behind him.",
      stage: (t) => {
        const k = tw(t, 0.05, 0.7);
        return (
          <>
            <Cellar walls="es" door={1} day="#ffd27a" sky={skyAt(1)} sun={0.82} />
            <Bro position={rattle(t)} rotationY={SOUTH} green={0.9} out bitten />
            <RedSwirl position={PLACE.bro} t={t + 6} />
            <Me position={[-1.2 + k * 0.85, 0, 0.75 - k * 0.35]} rotationY={NORTH - 0.2} walk={k} />
            <Fill at={[-1.6, 2.0, -2.2]} power={18} />
          </>
        );
      },
    },
    {
      cue: "7.shadow",
      ...cam.push({ on: [-0.2, 0.4, -0.4], dist: 5.8, to: 5.2, yaw: 26, pitch: 50, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From high up with the ceiling off: gold on the floor all the way into the cell, and one strip of shade across it, from the kid's feet, through the bars, over his brother.",
      stage: (t) => (
        <>
          <Cellar walls="nw" roof={false} door={1} day="#ffd27a" sky={skyAt(1)} sun={1} shadow />
          <Bro position={rattle(t)} rotationY={SOUTH} green={0.85} out bitten />
          <RedSwirl position={PLACE.bro} t={t + 8} />
          <Me position={[PLACE.bro[0], 0, 0.3]} rotationY={NORTH} />
          <Dad position={[1.3, 0, 0.2]} rotationY={NORTH - 0.6} />
          <Fill at={[0, 5, 1]} power={50} reach={12} />
        </>
      ),
    },
  ],
});
