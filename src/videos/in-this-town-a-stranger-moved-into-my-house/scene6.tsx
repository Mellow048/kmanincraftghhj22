import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, Chicken, EAST, HandBanner, Life, Me, NORTH, OldMan, Pillager, Puffs, ROBE, Ravager, SOUTH, Stranger, Town, Villager, WALL, hop, pop, timing, tw, w } from "./kit";
import { NOW } from "./scene1";

/** 06 — Day thirty: he comes home with a grey cloud round his head, and a horn blows. */
export const BEAST: Vec3 = [0, 0, 20.4];
export const GANG: Array<[number, number]> = [[-2.6, 21.2], [-1.3, 20.2], [1.3, 20.2], [2.6, 21.2]];
/** The raid, standing where it stops: four with crossbows, the leader with the banner, and the beast behind. */
export const Raid: React.FC<{ t: number; dz?: number; walk?: boolean; jaw?: number; head?: number; beast?: boolean; leader?: boolean }> = ({ t, dz = 0, walk = false, jaw = 0, head = 0, beast = true, leader = true }) => (
  <>
    {GANG.map(([x, z], i) => (
      <Pillager key={i} position={[x, 0, z + dz]} rotationY={NORTH} walk={walk ? t * 1.6 + i : 0} crossbow armR={-1.2} phase={i} />
    ))}
    {leader ? (
      <Pillager position={[0.9, 0, 19.2 + dz]} rotationY={NORTH} walk={walk ? t * 1.6 : 0} chief armR={-0.4}>
        <HandBanner t={t} />
      </Pillager>
    ) : null}
    {beast ? <Ravager position={[BEAST[0] - 0.6, 0, BEAST[2] + 2.6 + dz]} rotationY={NORTH} scale={1.5} walk={walk ? t * 1.6 : 0} jaw={jaw} head={head} rider={false} /> : null}
  </>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "A horn blew",
  shots: [
    {
      cue: "6.cloud",
      ...cam.push({ on: [0.2, 1.5, 10.2], dist: 7.2, to: 5.6, yaw: 188, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He walks in through the gate, pleased with himself, carrying a grey banner with a face on it. Round his head, grey specks turn and turn. Two villagers stop and look at the specks.",
      stage: (t) => {
        const z = 14.5 - t * 1.5;
        return (
          <>
            <Town {...NOW} />
            <Stranger position={[0.2, 0, z]} rotationY={NORTH} animation="walk" face="grin" omen={1.5}>
              <HandBanner t={t} />
            </Stranger>
            <Villager position={[-1.5, 0, 8.6]} rotationY={0.9} robe={ROBE.brown} lookAt={[0.2, 2.1, z]} />
            <Villager position={[1.9, 0, 7.6]} rotationY={-0.9} robe={ROBE.farmer} lookAt={[0.2, 2.1, z]} phase={2} />
          </>
        );
      },
    },
    {
      cue: "6.horn",
      ...cam.push({ on: [0, 1.5, 6.2], dist: 5.6, to: 5.2, yaw: 0, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "A horn, from outside the wall. Every head in the square snaps round to the south at once, the stranger's last. The specks are still going round his.",
      stage: (t) => {
        const at = 0.22;
        const look: Vec3 | undefined = t > at ? [0, 2, 30] : undefined;
        return (
          <>
            <Town {...NOW} />
            <Villager position={[-1.0, hop(t, at, 0.3, 0.25), 6.6]} rotationY={NORTH - 0.6} robe={ROBE.brown} lookAt={look ?? [0.2, 1.6, 6]} />
            <Villager position={[1.15, hop(t, at + 0.04, 0.3, 0.25), 6.9]} rotationY={NORTH + 0.6} robe={ROBE.farmer} lookAt={look ?? [0.2, 1.6, 6]} phase={2} />
            <Stranger position={[0.1, 0, 5.6]} rotationY={SOUTH} face={t > at + 0.2 ? "uneasy" : "grin"} omen={1.5} headYaw={t > at + 0.2 ? 0 : 0.5} gaze={0} animation="idle">
              <HandBanner t={t} />
            </Stranger>
          </>
        );
      },
    },
    {
      cue: "6.men",
      ...cam.push({ on: [0, 1.4, 20.6], dist: 7.2, to: 6.2, yaw: 183, pitch: 5, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The edge of the woods. Grey men with crossbows walk out of the trees in a line, and one in front of them with a banner: the same banner.",
      stage: (t, { dur: len }) => <Raid t={t} dz={(1 - t / len) * 3} walk beast={false} />,
    },
    {
      cue: "6.cow",
      ...cam.push({ on: [-0.5, 2.0, 22.2], dist: 8.6, to: 7.6, yaw: 178, pitch: 2, fov: 50 }),
      zone: "town",
      look: "overworld-day",
      note: "Behind them the trees move apart, and the thing he calls a cow comes out: grey, horned, as tall as the men's heads at the shoulder and twice as wide, chewing.",
      stage: (t, { dur: len }) => <Raid t={t} dz={(1 - t / len) * 1.2} walk jaw={0.5 + 0.5 * Math.sin(t * 9)} head={Math.sin(t * 3) * 0.2} />,
    },
    {
      cue: "6.nobell",
      ...cam.push({ on: [0.1, 1.55, -4.9], dist: 6.4, to: 5.6, yaw: 8, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The old man runs to the bell as fast as a villager can, skids to a stop under it, and looks up. Two posts, a beam, an empty hook.",
      stage: (t) => {
        const stop = w("6.nobell", "There") - 0.15;
        const k = tw(t, 0, stop);
        return (
          <>
            <Town {...NOW} />
            <OldMan position={[1.1 - 1.3 * k, 0, -1.0 - 3.2 * k]} rotationY={k < 1 ? NORTH + 0.4 : NORTH} walk={k * 4} lookAt={k >= 1 ? [0, 2.3, -5.5] : undefined} lean={k < 1 ? 0.15 : -0.1} />
            {t > stop && t < stop + 0.4 ? <Puffs position={[-0.2, 0.1, -4.2]} count={5} spread={0.5} size={0.2} rise={0.4} speed={2} color="#d9c9a0" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.ding",
      ...cam.push({ on: [0.25, 1.5, -3.7], dist: 5.8, to: 5.3, yaw: -8, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He turns round and says it as loud as he can: DING. Behind him a villager is looking at a flower. A child is following a chicken. Nobody has noticed anything.",
      stage: (t) => {
        const say = w("6.ding", "ding") - 0.1;
        return (
          <>
            <Town {...NOW} />
            <OldMan position={[-0.2, 0, -4.2]} rotationY={SOUTH} hmm={t > say && t < say + 0.6 ? 1 : 0} nod={t > say ? -0.25 : 0} />
            <Bubble text="DING" position={[0.5, 2.4, -4.1]} scale={0.78 * pop(t, say, 0.14)} tail={-1} />
            <Villager position={[1.3, 0, -1.9]} rotationY={0.4} robe={ROBE.brown} nod={0.6} phase={3} />
            <Chicken position={[-0.9 + t * 0.4, 0, -2.9]} rotationY={1.57} />
            <Villager position={[-1.6 + t * 0.4, 0, -2.9]} rotationY={EAST} walk={t * 0.5} robe={ROBE.friend} kid scale={0.7} phase={4} />
          </>
        );
      },
    },
    {
      cue: "6.walked",
      ...cam.push({ on: [0.3, 1.9, 18.2], dist: 7.4, to: 6.4, yaw: 174, pitch: 3, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Through the gate posts, from behind him: the teller walking out of town on his own, straight at the beast, which is looking down at him over the heads of the men.",
      stage: (t, { dur: len }) => (
        <>
          <Town {...NOW} />
          <Raid t={t} jaw={0.3} leader={false} />
          <Pillager position={[2.2, 0, 19.4]} rotationY={NORTH} chief armR={-0.4}>
            <HandBanner t={t} />
          </Pillager>
          <Me position={[0, 0, 14.6 + (t / len) * 2.6]} rotationY={SOUTH} walk={t * 1.6} />
        </>
      ),
    },
    {
      cue: "6.hrmm",
      ...cam.push({ on: [0, 1.9, 18.3], dist: 8.6, to: 7.8, yaw: 124, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side: a very small villager and a very large head, nose to nose. He says it: HMM.",
      stage: (t) => {
        const say = w("6.hrmm", "hmm") - 0.1;
        return (
          <>
            <Town {...NOW} />
            <Ravager position={[0, 0, BEAST[2] + 1.6]} rotationY={NORTH} scale={1.5} jaw={0.2} head={-0.1} rider={false} />
            <Me position={[0, 0, 17.3]} rotationY={SOUTH} hmm={t > say ? 1 : 0} nod={-0.25} />
            <Bubble text="HMM" position={[0, 2.5, 16.9]} rotationY={2.16} scale={0.8 * pop(t, say, 0.14)} tail={1} />
          </>
        );
      },
    },
    {
      cue: "6.help",
      ...cam.push({ on: [0, 3.4, 13], dist: 10.5, to: 10, yaw: 180, pitch: -2, fov: 54 }),
      zone: "town",
      look: "overworld-day",
      note: "One flick of the head. The villager goes up in a long arc, turning over, clean over the wall and down into the town.",
      stage: (t, { dur: len }) => {
        const k = tw(t, 0.12, len);
        return (
          <>
            <Town {...NOW} />
            <Ravager position={[0, 0, BEAST[2] + 1.6]} rotationY={NORTH} scale={1.5} jaw={0.6} head={-0.9 * Math.sin(tw(t, 0.02, 0.3) * Math.PI)} rider={false} />
            <group position={[0.3 * k, 0.8 + Math.sin(k * Math.PI) * 5.2, 17.3 - k * 10.5]} rotation={[-k * 9, 0, 0]}>
              <Me position={[0, -0.8, 0]} rotationY={SOUTH} />
            </group>
          </>
        );
      },
    },
  ],
});
void Life; void WALL;
