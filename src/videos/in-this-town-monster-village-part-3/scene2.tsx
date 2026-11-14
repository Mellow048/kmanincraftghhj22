import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, Arm, Bits, Bubble, DAY, Dad, DustRing, EAST, FARM, Glint, MudDoor, Puffs, Streaks, Village, WARM, WEST, Z3, dadHand, dadSocket, ease, h, heldAt, hop, jolt,
  mix, monsterFace, pop, ramp, timing, toward, wordAt,
} from "./kit";

const [FX, , FZ] = FARM;
/** Where the arm comes down the ladder into the room, and where dad is. */
const LAND: Vec3 = h(3, 0, 2.6);
const D = AT.dad;
const DFACE = monsterFace("skeleton", D);
const D_ROT = 0.25;
/** Dad with his arm in his good hand, held up to look at. Scenes 2 and 3 use it. */
export const DadAndArm: React.FC<{ t: number; talk?: boolean; finger?: number; turn?: number; raise?: number; mood?: "calm" | "happy" | "scared" | "sad" | "angry"; headDrop?: number; nod?: number; lookAt?: Vec3; y?: number; yaw?: number }> = ({
  t, talk = false, finger = 0, turn = 0, raise = 1, mood = "calm", headDrop = 0, nod, lookAt, y = 0, yaw = D_ROT,
}) => {
  const p: Vec3 = [D[0], y, D[2]];
  const hand = dadHand(p, yaw, raise);
  return (
    <>
      <Dad position={p} rotationY={yaw} noArm raise={raise} mood={mood} headDrop={headDrop} nod={nod} lookAt={lookAt} />
      <Arm position={heldAt([hand[0], hand[1] - 0.1, hand[2]], yaw + Math.PI)} rotationY={yaw + Math.PI} rear={1} talk={talk ? t : 0} finger={finger} turn={turn} />
    </>
  );
};

/** THE ARM GOES HOME, and tells dad. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "It is a fast arm",
  shots: [
    {
      cue: "3.crawl",
      ...cam.truck({ on: [FX - 22, 0.25, FZ - 1.5], dist: 2.4, yaw: -108, pitch: 6, fov: 58, by: [13, 0, 1] }),
      zone: Z3.farm,
      look: DAY,
      note: "Chasing it from behind, an inch off the road, wide lens: the arm flat out on four fingers down the east road, dust coming off it, the farm fence growing ahead.",
      stage: (t) => {
        const x = FX - 21 + 13 * ease(ramp(t, 0, 2.57)) + 0.6;
        return (
          <>
            <Arm position={[x, 0, FZ - 1.4]} rotationY={EAST} crawl={t * 3} scale={1.3} />
            <Streaks position={[x, 0.3, FZ - 1.4]} yaw={WEST} t={t} n={10} spread={1} speed={16} />
            <Puffs position={[x - 0.8, 0.05, FZ - 1.4]} color="#b9a98a" count={6} rise={0.35} spread={0.3} size={0.09} speed={2} opacity={0.6} />
          </>
        );
      },
    },
    {
      cue: "3.four",
      ...cam.push({ on: [FX - 0.6, 0.4, FZ], dist: 11, to: 8.5, yaw: 24, pitch: 30, fov: 46 }),
      zone: Z3.farm,
      look: DAY,
      note: "The whole pig farm from above the fence, pigs and all. A white streak comes in from the west, skids to a stop on the mud, stands up on its elbow and shows a muscle it has not got.",
      stage: (t) => {
        const four = wordAt("3.four", "four");
        const fast = wordAt("3.four", "fast");
        const k = ease(ramp(t, 0, 0.7));
        const at: Vec3 = [FX - 6.5 + 5.6 * k, 0, FZ - 0.3];
        return (
          <>
            <MudDoor />
            <Arm position={at} rotationY={EAST} crawl={k * 6} rear={ease(ramp(t, fast - 0.15, fast + 0.1))} finger={0} scale={1.7} />
            <DustRing position={[FX - 0.9, 0.06, FZ - 0.3]} t={t - 0.7} size={1.5} color="#5b4331" />
            <Bits position={[FX - 0.9, 0.2, FZ - 0.3]} t={t - 0.7} color="#5b4331" count={10} power={2} />
            <Bubble text="4 MIN" position={[FX - 0.6, 1.6, FZ]} rotationY={0.4} scale={0.5 * pop(t, four - 0.05)} tail={0} />
            <Glint position={[FX - 0.9, 1.0, FZ - 0.3]} t={t - fast} size={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.mud",
      ...cam.top({ on: [FX, 0, FZ], height: 3.6, to: 2.6, spin: [10, -4], fov: 44 }),
      zone: Z3.farm,
      look: DAY,
      note: "Straight down on the mud: the hand knocks three times, the mud lifts on a hinge with lamplight under it, and the arm drops through.",
      stage: (t) => {
        const down = wordAt("3.mud", "down");
        const k = ease(ramp(t, down - 0.15, down + 0.25));
        const drop = ease(ramp(t, down + 0.2, down + 0.5));
        return (
          <>
            <MudDoor k={1.2 * k} glow={10 * k} />
            {drop < 1 ? <Arm position={[FX - 0.9 + 0.9 * drop, -0.8 * drop + 0.1 * Math.abs(Math.sin(t * 16)) * (t < down - 0.15 ? 1 : 0), FZ + 0.1]} rotationY={EAST} crawl={drop * 2} scale={1.4 * (1 - 0.5 * drop)} /> : null}
          </>
        );
      },
    },
    {
      cue: "3.mud",
      cut: wordAt("3.mud", "across") - 0.1,
      ...cam.truck({ on: [LAND[0] - 0.4, 0.15, LAND[2]], dist: 1.6, yaw: 12, pitch: 3, fov: 56, by: [D[0] + 0.9 - LAND[0], 0, D[2] + 0.2 - LAND[2]] }),
      zone: Z3.hide,
      look: WARM,
      note: "The hideout from floor level: the arm lands on the planks and runs across them between a great many monster feet, the lens running with it, to a pair of thin white shins.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 1.1));
        const at = mix(LAND, [D[0] + 0.7, 0, D[2] + 0.3], k);
        return (
          <>
            <Village t={t} />
            <Dad position={D} rotationY={D_ROT} noArm mood="sad" nod={0.3} />
            <Arm position={[at[0], hop(t, 0, 0.3, 0.12), at[2]]} rotationY={toward(LAND, D)} crawl={k * 5} scale={1.15} />
            <DustRing position={[LAND[0], 0.05, LAND[2]]} t={t - 0.1} size={0.6} color="#b8894e" />
          </>
        );
      },
    },
    {
      cue: "4.dad",
      ...cam.push({ on: [D[0], 1.15, D[2]], dist: 4.4, to: 3.6, yaw: 16, pitch: 4, fov: 42 }),
      zone: Z3.hide,
      look: WARM,
      note: "Dad, whole, with one sleeve empty. He sees it at his feet, jumps clean off the floor, and the arm jumps too: into his good hand, where it stands up.",
      stage: (t) => {
        const happy = wordAt("4.dad", "happy");
        const took = wordAt("4.dad", "took");
        const k = ease(ramp(t, took - 0.2, took + 0.1));
        const y = hop(t, happy - 0.1, 0.4, 0.35) + hop(t, 0.25, 0.2, 0.25);
        const from: Vec3 = [D[0] + 0.7, 0, D[2] + 0.3];
        const hand = dadHand([D[0], y, D[2]], D_ROT, k);
        return (
          <>
            <Village t={t} look={DFACE} mood="happy" />
            {k < 1 ? (
              <>
                <Dad position={[D[0], y, D[2]]} rotationY={D_ROT} noArm raise={k} mood="happy" lookAt={[from[0], 0.3, from[2]]} />
                <Arm position={mix(from, heldAt([hand[0], hand[1] - 0.1, hand[2]], D_ROT + Math.PI), k)} rotationY={D_ROT + Math.PI} rear={Math.max(k, ease(ramp(t, 0.2, 0.5)))} talk={t} />
              </>
            ) : (
              <DadAndArm t={t} talk mood="happy" y={y} />
            )}
            <Bubble text="MY ARM!" position={[D[0] + 0.9, DFACE[1] + 0.75, D[2] + 0.2]} rotationY={0.2} scale={0.34 * pop(t, 0.1) * (t < happy ? 1 : 0)} tail={-1} />
            <Glint position={hand} t={t - took} size={1.2} />
          </>
        );
      },
    },
    {
      cue: "4.look",
      ...cam.push({ on: [D[0] + 0.12, DFACE[1] - 0.1, D[2] + 0.2], dist: 2.0, to: 1.7, yaw: 52, pitch: -4, fov: 36 }),
      zone: Z3.hide,
      look: WARM,
      note: "Skull and hand, nose to knuckle, from the side. The fingers go like a mouth. The skull listens, and then it simply drops off the neck.",
      stage: (t) => {
        const fell = wordAt("4.look", "fell");
        return (
          <>
            <Village t={t} look={DFACE} />
            <DadAndArm t={t} talk={t < fell} headDrop={0.62 * ease(ramp(t, fell - 0.05, fell + 0.12))} mood={t > fell - 0.3 ? "scared" : "calm"} />
          </>
        );
      },
    },
    {
      cue: "4.look",
      cut: wordAt("4.look", "fell") + 0.25,
      ...cam.push({ on: [D[0], 0.75, D[2]], dist: 2.6, to: 2.3, yaw: -14, pitch: -18, fov: 46 }),
      zone: Z3.hide,
      look: WARM,
      note: "From the floor looking up: a skeleton with its skull sitting on its ribs, and one hand that reaches up, finds it and screws it back on.",
      stage: (t) => {
        const back = wordAt("4.look", "back") - wordAt("4.look", "fell") - 0.25;
        const k = ease(ramp(t, back - 0.5, back - 0.1));
        return (
          <>
            <Village t={t} look={DFACE} mood="scared" />
            <DadAndArm t={t} headDrop={0.62 * (1 - k)} raise={1 - 0.5 * Math.sin(k * Math.PI)} mood="scared" />
            <Glint position={DFACE} t={t - back + 0.1} size={1.0} />
          </>
        );
      },
    },
    {
      cue: "4.shout",
      ...cam.push({ on: [D[0], 1.3, D[2] + 0.1], dist: 4.6, to: 3.2, yaw: 6, pitch: 62, fov: 44 }),
      zone: Z3.hide,
      look: WARM,
      note: "From the roof beams, dropping at him: dad throws his head back and shouts it straight up into the lens, and every monster in the room looks at him.",
      stage: (t) => {
        const taken = wordAt("4.shout", "taken");
        return (
          <>
            <Village t={t} look={DFACE} />
            <DadAndArm t={t} mood="scared" nod={-1.0} y={hop(t, 0.1, 0.25, 0.3)} turn={jolt(t, 0.2, 0.6)} />
            <Bubble text="MY SON?!" position={[D[0] + 1.0, 1.9, D[2] + 0.9]} rotationY={0} tilt={0.1} scale={0.36 * pop(t, 0.15) + jolt(t, taken, 0.05)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "4.nobody",
      ...cam.truck({ on: [AT.bus[0] + 0.6, 1.25, AT.bus[2] + 0.3], dist: 3.3, yaw: -6, pitch: 3, fov: 40, by: [AT.teacher[0] - AT.bus[0] - 0.8, 0.15, 0] }),
      zone: Z3.hide,
      look: WARM,
      note: "The lens goes slowly along the row of them at eye height: the slime, mum, the creeper, the postman, the teacher. Calm. One of them is looking at the ceiling. Dad, behind, is waving his one arm about.",
      stage: (t) => {
        const hurt = wordAt("4.nobody", "hurt");
        return (
          <>
            <Village t={t} look={h(8 * Math.sin(t * 0.9), 3.5, 8)} />
            <DadAndArm t={t} mood="scared" turn={0.8 * Math.sin(t * 9)} y={0.08 * Math.abs(Math.sin(t * 8))} lookAt={h(6 * Math.sin(t * 5), 1.5, 3)} />
            <Bubble text="..." position={[AT.post[0] + 0.3, 3.3, AT.post[2] + 0.2]} scale={0.4 * pop(t, hurt - 0.1)} tail={0} />
          </>
        );
      },
    },
  ],
});
void dadSocket;
