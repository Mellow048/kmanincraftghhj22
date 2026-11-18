import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BellOnly, Block, EAST, HandBanner, IronGolem, Lying, Me, MiniBed, NORTH, PLACE, Pillager, Puffs, ROBE, Ravager, SOUTH, SoundRings, Stranger, Town, Villager, WALL, posed, timing, tw, w } from "./kit";
import { NOW } from "./scene1";
import { Raid } from "./scene6";

/** 07 — Somebody rings a bell: the stranger, in the gate. The wall holds, the iron man comes, the leader finds the hole. */
const RAIDED = { ...NOW, arrows: true };
const GATE: Vec3 = [-0.55, 0, 12.6];
const HOLE = PLACE.hole;
const STAND: Vec3 = [-0.95, 0, 0.1];
const ring = (t: number) => Math.sin(t * 16) * 0.5;
/** The bell in his raised right hand (he faces south, so that hand is to the east). */
const Raised: React.FC<{ at: Vec3; t: number }> = ({ at, t }) => <BellOnly position={[at[0] + 0.36, 2.52, at[2] + 0.05]} swing={ring(t)} scale={0.9} />;
const UP = (t: number) => posed("idle", t, { armR: [-2.95 + Math.sin(t * 16) * 0.12, 0, -0.12] });

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "A real one",
  shots: [
    {
      cue: "7.rang",
      ...cam.push({ on: [1.6, 0.3, 5.0], dist: 5.6, to: 4.8, yaw: 0, pitch: 52, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The teller flat on his back in the square where he came down, in a ring of dust, with small stars going round his head. Then a bell: real, loud, from the gate. His head comes up.",
      stage: (t) => {
        const rang = w("7.rang", "rang") - 0.1;
        return (
          <>
            <Town {...NOW} />
            <Lying position={[1.6, 0.16, 5.9]}>
              <Me position={[0, 0, 0]} nod={t > rang ? 0.45 : -0.1} />
            </Lying>
            {t < 0.5 ? <Puffs position={[1.6, 0.15, 5.0]} count={8} spread={1.2} size={0.3} rise={0.5} speed={2} color="#d9c9a0" /> : null}
            {t < rang
              ? [0, 1, 2].map((i) => (
                  <Block key={i} position={[1.6 + Math.sin(t * 6 + i * 2.1) * 0.4, 0.75, 4.25 + Math.cos(t * 6 + i * 2.1) * 0.3]} size={[0.1, 0.1, 0.1]} color="#ffe27a" emissive="#ffe27a" emissiveIntensity={1} castShadow={false} />
                ))
              : null}
            <SoundRings position={[1.2, 0.6, 7.6]} t={t > rang ? t - rang : -1} color="#ffe27a" reach={1.6} />
            <SoundRings position={[1.2, 0.6, 7.6]} t={t > rang + 0.4 ? t - rang - 0.4 : -1} color="#ffe27a" reach={1.6} />
          </>
        );
      },
    },
    {
      cue: "7.him",
      ...cam.push({ on: [GATE[0] + 0.25, 1.75, GATE[2]], dist: 6.4, to: 5.6, yaw: 0, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The gate, from outside. The stranger stands in the middle of it, alone, facing the whole raid, holding the town bell over his head and ringing it.",
      stage: (t) => (
        <>
          <Town {...NOW} />
          <Stranger position={GATE} rotationY={SOUTH} face="brave" pose={UP(t)} />
          <Raised at={GATE} t={t} />
          <SoundRings position={[GATE[0] + 0.36, 2.2, GATE[2] + 0.2]} t={t} color="#ffe27a" reach={1.5} />
        </>
      ),
    },
    {
      cue: "7.pocket",
      ...cam.push({ on: [GATE[0] + 0.15, 2.0, GATE[2]], onTo: [GATE[0] - 0.2, 1.05, GATE[2]], dist: 3.9, to: 3.0, yaw: -10, pitch: 3, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "Close: the bell in his fist. The lens comes down him to his pocket, and there, sticking out of it and turning slowly, is a very small bed.",
      stage: (t) => (
        <>
          <Town {...NOW} />
          <Stranger position={GATE} rotationY={SOUTH} face="brave" pose={UP(t)} />
          <Raised at={GATE} t={t} />
          <MiniBed position={[GATE[0] - 0.36, 0.92, GATE[2] + 0.12]} spin={t * 2.2} scale={1.05} />
          {([[-3, 6, -5.5, -9.2], [2.5, 4, 6.7, -9.2], [0.5, 8, 0.6, -11.2]] as Array<[number, number, number, number]>).map(([x, z, tx, tz], i) => {
            const k = tw(t, 0.1, 2.0);
            return <Villager key={i} position={[x + (tx - x) * k, 0, z + (tz - z) * k]} rotationY={Math.atan2(tx - x, tz - z)} walk={k * 12} robe={[ROBE.brown, ROBE.blue, ROBE.farmer][i]} phase={i} />;
          })}
        </>
      ),
    },
    {
      cue: "7.wall",
      ...cam.push({ on: [5.2, 1.2, 14.4], dist: 9.4, to: 8.4, yaw: 34, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Outside the wall. Three grey men run at it as hard as they can, hit it, and go over on their backs in a row. The wall has arrows in it. It has not moved.",
      stage: (t) => {
        const hit = w("7.wall", "wall") + 0.05;
        return (
          <>
            <Town {...RAIDED} />
            {[3.6, 5.2, 6.8].map((x, i) => {
              const at = hit + i * 0.1;
              const k = tw(t, 0, at);
              const fall = tw(t, at, at + 0.3);
              const z = 18.5 - 4.5 * k + fall * 1.3;
              return (
                <group key={i} position={[x, 0.1 * fall, z]} rotation={[fall * 1.5, 0, 0]}>
                  <Pillager position={[0, 0, 0]} rotationY={NORTH} walk={k * 6} crossbow armR={-1.2} phase={i} />
                </group>
              );
            })}
            {[0, 1, 2].map((i) => {
              const at = hit + i * 0.1;
              return t > at && t < at + 0.35 ? <Puffs key={i} position={[3.6 + i * 1.6, 1.2, WALL.south + 0.6]} count={5} spread={0.5} size={0.22} rise={0.5} speed={2.4} color="#e9e6dc" /> : null;
            })}
          </>
        );
      },
    },
    {
      cue: "7.golem",
      ...cam.push({ on: [0.15, 1.75, GATE[2]], dist: 7.4, to: 6.6, yaw: 0, pitch: 4, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The gate again. The iron man walks up and stands beside the stranger, twice his height. He looks down at him sideways, for a long time. The stranger gives him a very small wave.",
      stage: (t) => {
        const k = tw(t, 0, 0.9);
        const not = w("7.golem", "not") - 0.1;
        return (
          <>
            <Town {...RAIDED} />
            <Stranger position={GATE} rotationY={SOUTH} face={t > not ? "uneasy" : "brave"} headYaw={t > 0.9 ? 0.7 : 0} headPitch={t > 0.9 ? -0.4 : 0} gaze={0} pose={t > not ? posed("idle", t, { armL: [-1.9, 0, 0.5 + Math.sin(t * 14) * 0.25] }) : posed("idle", t, {})} />
            <IronGolem position={[0.95, 0, 9.5 + 3.0 * k]} rotationY={SOUTH} walk={k * 3} headYaw={t > 0.9 ? -0.75 : 0} headPitch={t > 0.9 ? 0.45 : 0} />
          </>
        );
      },
    },
    {
      cue: "7.leader",
      ...cam.push({ on: [0, 1.3, 4.2], dist: 7.6, to: 6.8, yaw: 186, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "From the middle of the square, looking at the gate. The stranger has backed off to the far side of his own hole. The leader comes through the gate with the banner and runs straight down the path at him, looking at him and at nothing else.",
      stage: (t, { dur }) => (
        <>
          <Town {...RAIDED} />
          <Stranger position={STAND} rotationY={SOUTH + 0.2} face="smug" pose={posed("idle", t, { armR: [-2.2, 0, -0.3 + Math.sin(t * 12) * 0.3] })} />
          <Pillager position={[0, 0, 12 - (t / dur) * 8.4]} rotationY={NORTH} walk={t * 4} chief armR={-0.6}>
            <HandBanner t={t} />
          </Pillager>
        </>
      ),
    },
    {
      cue: "7.hole",
      ...cam.push({ on: [HOLE[0] - 0.45, 0.4, HOLE[2] + 0.3], dist: 6.6, to: 5.6, yaw: 180, pitch: 46, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From over the stranger's shoulder, looking down. The leader arrives at the hole at a run and is gone into it, feet first; the banner stands on the edge for a moment and follows him. The stranger leans over and looks down.",
      stage: (t) => {
        const fell = w("7.hole", "fell") - 0.05;
        const k = tw(t, 0, fell);
        const down = tw(t, fell, fell + 0.35);
        return (
          <>
            <Town {...RAIDED} />
            <Stranger position={STAND} rotationY={SOUTH + 0.5} face={t > fell ? "smug" : "grin"} headPitch={t > fell ? 0.6 : 0.1} animation="idle" />
            {down < 1 ? (
              <Pillager position={[HOLE[0], -3 * down, HOLE[2] + 2.4 * (1 - k)]} rotationY={NORTH} walk={k * 4} chief armR={-0.6 - down * 2}>
                <HandBanner t={t} />
              </Pillager>
            ) : null}
            {t > fell && t < fell + 0.5 ? <Puffs position={[HOLE[0], 0.15, HOLE[2]]} count={6} spread={0.6} size={0.22} rise={0.6} speed={2} color="#d9c9a0" /> : null}
          </>
        );
      },
    },
    {
      cue: "7.quiet",
      ...cam.push({ on: [0.4, 1.4, 19.5], dist: 8.4, to: 7.8, yaw: 180, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Outside the gate. Nobody. Crossbows lying in the grass. Far down the road the beast is running for the trees, and the iron man is walking after it, not fast.",
      stage: (t) => (
        <>
          <Town {...RAIDED} />
          {([[-1.4, 17.2, 0.4], [1.2, 18.4, 1.9], [0.2, 20.2, 2.8], [-0.9, 19.3, 1.1]] as Array<[number, number, number]>).map(([x, z, r], i) => (
            <group key={i} position={[x, 0.06, z]} rotation={[0, r, 0]}>
              <Block size={[0.5, 0.06, 0.1]} color="#5c3f24" castShadow={false} />
              <Block position={[0, 0, 0.12]} size={[0.1, 0.06, 0.4]} color="#7a5632" castShadow={false} />
            </group>
          ))}
          <Ravager position={[0.8, 0, 26.5 + t * 3]} rotationY={SOUTH} scale={1.5} walk={t * 5} rider={false} />
          <IronGolem position={[-0.6, 0, 22 + t * 1.2]} rotationY={SOUTH} walk={t * 1.2} />
        </>
      ),
    },
  ],
});
void EAST; void Raid;
