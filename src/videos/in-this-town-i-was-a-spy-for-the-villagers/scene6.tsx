import { cam, storyScene } from "../../engine";
import { Bearer, Column, M, cueLen, pathAt, timing, tw, w } from "./kit";

/** 06 — The march, the light in the window, and the idea: left, left, left, left. */
const V = 1.5;
const EASTWARD: Array<[number, number]> = [[-60, 0], [40, 0]];
/** The road he made: east, then left, left, left, left. */
const SQUARE: Array<[number, number]> = [[-40, 0], [0, 0], [0, -9], [-9, -9], [-9, 0], [-1.5, 0], [-1.5, -7.5], [-40, -7.5]];
const FORTY = w("10.march", "Forty") - 0.1;
const MUM = w("10.lights", "my", 0, 1) - 0.1;
const AGAIN1 = w("11.again", "And", 0, 0) - 0.08;
const AGAIN2 = w("11.again", "And", 0, 1) - 0.08;
const fill = (x: number, z: number, k = 1) => (
  <>
    <pointLight position={M(x + 2, 3.5, z + 4)} color="#b4c8ff" intensity={26 * k} distance={16} decay={1.4} />
    <pointLight position={M(x - 5, 4, z + 3)} color="#b4c8ff" intensity={20 * k} distance={18} decay={1.4} />
  </>
);
const Head = ({ pts, s, t, face = "uneasy", ash = 1 }: { pts: Array<[number, number]>; s: number; t: number; face?: string; ash?: number }) => {
  const [x, z, h] = pathAt(pts, s);
  return <Bearer at={M(x, 0, z)} h={h} t={t} walk={s} face={face} ash={ash} />;
};

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Left",
  shots: [
    {
      cue: "10.march",
      ...cam.truck({ on: M(-3.5, 0.45, 0), dist: 3.4, yaw: 20, pitch: -3, fov: 44, by: [V * (FORTY - 0), 0, 0] }),
      zone: "march",
      look: "overworld-night",
      note: "In the grass, at boot height, travelling: his two small boots in front, and a great many big ones behind, all in step.",
      stage: (t) => {
        const s = 56.5 + t * V;
        return (
          <>
            <Head pts={EASTWARD} s={s} t={t} />
            <Column origin={M} pts={EASTWARD} s={s} t={t} n={14} />
            {fill(-5 + t * V, 0)}
          </>
        );
      },
    },
    {
      cue: "10.march",
      cut: FORTY,
      ...cam.truck({ on: M(-7, 1.5, 0), dist: 14, yaw: 54, pitch: 20, fov: 44, by: [V * 2.4, 0, 0] }),
      zone: "march",
      look: "overworld-night",
      note: "The whole raid from up on a rise, in moonlight: a long double line across the field, the beast in the middle of it, the banner at its head.",
      stage: (t) => {
        const s = 57 + t * V;
        return (
          <>
            <Head pts={EASTWARD} s={s} t={t} />
            <Column origin={M} pts={EASTWARD} s={s} t={t} n={38} />
            {fill(-3 + t * V, 0, 1.6)}
            {fill(-14 + t * V, 0, 1.6)}
            {fill(-26 + t * V, 0, 1.6)}
          </>
        );
      },
    },
    {
      cue: "10.lights",
      ...cam.push({ on: M(40, 1.75, 0.3), dist: 37.5, to: 36.6, yaw: -86, pitch: 0, fov: 30 }),
      zone: "march",
      look: "overworld-night",
      note: "Over his shoulder and past the pole: far across the dark, the roofs of the town, a few windows, and one that is brighter than the rest.",
      stage: (t) => (
        <>
          <Bearer at={M(5.3, 0, 2.5)} h={Math.PI / 2} t={t} walk={t * 0.4} face="uneasy" />
          {Array.from({ length: 11 }, (_, i) => (
            <mesh key={i} position={M(74.6, 1.6 + (i % 3) * 0.7, -9 + i * 1.9)}>
              <boxGeometry args={[0.1, i === 5 ? 2.2 : 1.2, i === 5 ? 2.2 : 1.2]} />
              <meshBasicMaterial color={i === 5 ? "#fff0b0" : "#d9a04a"} fog={false} />
            </mesh>
          ))}
          {fill(3, 0, 0.6)}
          <pointLight position={M(73.6, 1.6, 0.4)} color="#ffd98a" intensity={60} distance={12} decay={1.5} />
        </>
      ),
    },
    {
      cue: "10.lights",
      cut: MUM,
      ...cam.truck({ on: M(6.15, 1.28, 0), dist: 1.9, yaw: 66, pitch: -2, fov: 38, by: [V * (cueLen("10.lights") - MUM), 0, 0] }),
      zone: "march",
      look: "overworld-night",
      note: "His face from the front, walking, a small warm light on it from far away. He nearly smiles. Behind him, forty grey faces.",
      stage: (t) => {
        const s = 66 + t * V;
        return (
          <>
            <Head pts={EASTWARD} s={s} t={t} face="grin" />
            <Column origin={M} pts={EASTWARD} s={s} t={t} n={10} />
            <pointLight position={M(8.5 + t * V, 1.5, 0.6)} color="#ffd98a" intensity={7} distance={5} decay={1.5} />
            {fill(4 + t * V, 0)}
          </>
        );
      },
    },
    {
      cue: "10.idea",
      ...cam.orbit({ on: M(-1.0, 1.45, 0), onTo: M(0.5, 1.45, 0), dist: 3.4, distTo: 2.8, yaw: 56, yawTo: 82, pitch: 4, fov: 40 }),
      zone: "march",
      look: "overworld-night",
      note: "He looks back at them, up at the banner, back at them. He grins. Then the grin goes, because he has thought about it a bit more.",
      stage: (t) => {
        const s = 38.6 + t * 0.9;
        const [x, z, h] = pathAt(SQUARE, s);
        const good = t < w("10.idea", "It") - 0.1;
        return (
          <>
            <Bearer at={M(x, 0, z)} h={h} t={t} walk={s} face={good ? "grin" : "worried"} headYaw={good ? (t < 0.7 ? 1.3 : 0) : 0} headPitch={good && t >= 0.7 ? -0.5 : 0} />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={12} />
            {fill(-1, 0)}
          </>
        );
      },
    },
    {
      cue: "11.left",
      ...cam.push({ on: M(-0.2, 0.9, -0.8), dist: 8.6, to: 7.4, yaw: 150, pitch: 48, fov: 44 }),
      zone: "march",
      look: "overworld-night",
      note: "From high in front: the banner at the head of the line comes on, stops being straight, and turns a square corner to the left.",
      stage: (t) => {
        const s = 39.2 + t * 2.2;
        return (
          <>
            <Head pts={SQUARE} s={s} t={t} />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={12} />
            {fill(0, 0, 1.5)}
          </>
        );
      },
    },
    {
      cue: "11.follow",
      ...cam.orbit({ on: M(-1, 0.8, -2), dist: 15, distTo: 13.5, yaw: -40, yawTo: -22, pitch: 34, fov: 44 }),
      zone: "march",
      look: "overworld-night",
      note: "From higher and to one side: pair after pair come to the same spot and turn the same corner, like a rope going round a post. The beast too.",
      stage: (t) => {
        const s = 46 + t * 2.4;
        return (
          <>
            <Head pts={SQUARE} s={s} t={t} />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={22} />
            {fill(0, -2, 1.6)}
            {fill(-8, 0, 1.6)}
          </>
        );
      },
    },
    {
      cue: "11.again",
      ...cam.push({ on: M(-0.5, 1.3, -9), dist: 4.6, to: 3.8, yaw: -128, pitch: 5, fov: 42 }),
      zone: "march",
      look: "overworld-night",
      note: "At his level, at the next corner: he comes at the camera, swings the banner left, and the captain behind him swings left without blinking.",
      stage: (t) => {
        const s = 47.6 + t * 2.0;
        return (
          <>
            <Head pts={SQUARE} s={s} t={t} face="smug" />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={12} />
            {fill(-1, -8, 1.2)}
          </>
        );
      },
    },
    {
      cue: "11.again",
      cut: AGAIN1,
      ...cam.top({ on: M(-4.5, 0.2, -4.5), height: 21, to: 23, spin: [0, 6], fov: 46 }),
      zone: "march",
      look: "overworld-night",
      note: "'And again': from high above, the line is now three sides of a box in the grass, and the banner turns the third corner.",
      stage: (t) => {
        const s = 56.6 + t * 2.4;
        return (
          <>
            <Head pts={SQUARE} s={s} t={t} />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={26} />
            {fill(-4, -4, 3)}
            {fill(-8, -8, 3)}
          </>
        );
      },
    },
    {
      cue: "11.again",
      cut: AGAIN2,
      ...cam.top({ on: M(-4.5, 0.2, -4.5), height: 23, to: 26, spin: [6, 14], fov: 46 }),
      zone: "march",
      look: "overworld-night",
      note: "'And again': higher still. The head of the line comes round and meets its own tail. Forty pillagers are walking in a box.",
      stage: (t) => {
        const s = 65.6 + t * 2.4;
        return (
          <>
            <Head pts={SQUARE} s={s} t={t} />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={40} beast={9} />
            {fill(-4, -4, 4)}
            {fill(-8, -2, 4)}
            {fill(-2, -8, 4)}
          </>
        );
      },
    },
    {
      cue: "11.night",
      ...cam.truck({ on: M(-15, 1.3, -7.5), dist: 4.8, yaw: -110, pitch: 3, fov: 42, by: [-0.9 * cueLen("11.night"), 0, 0] }),
      zone: "march",
      look: "overworld-night",
      note: "Much later. From in front of him, backing away: his eyes half shut, and every head behind him hanging, the beast's lowest of all.",
      stage: (t) => {
        const s = 95 + t * 0.9;
        return (
          <>
            <Head pts={SQUARE} s={s} t={t} face="worried" />
            <Column origin={M} pts={SQUARE} s={s} t={t} n={16} tired={1} />
            {fill(-15, -7.5, 1.2)}
            <pointLight position={M(-19, 2, -10)} color="#b4c8ff" intensity={20} distance={12} decay={1.4} />
          </>
        );
      },
    },
  ],
});
