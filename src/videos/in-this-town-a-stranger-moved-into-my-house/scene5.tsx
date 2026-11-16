import { cam, storyScene } from "../../engine";
import { Boat, Fill, Green, OldMan, Me, MyRoom, NORTH, Puffs, ROBE, SOUTH, Stranger, Torches, TORCHES, Town, Villager, WALL, Wall, EAST, hop, pop, posed, timing, tw, w } from "./kit";

/** 05 — The torches, the wall, and the boat he does not remember getting into. */
const sitLegs = { legR: [-1.5, 0, 0] as [number, number, number], legL: [-1.5, 0, 0] as [number, number, number] };
const rower = (t: number) => posed("idle", t, { ...sitLegs, armR: [-1.1 + Math.sin(t * 6) * 0.5, 0, 0], armL: [-1.1 + Math.sin(t * 6) * 0.5, 0, 0] });
/** The boat with the two of them in it: the stranger rows at the back, the villager sits bolt upright at the front. */
export const Crew: React.FC<{ t: number; position: [number, number, number]; rotationY?: number; green?: boolean; old?: boolean; still?: boolean; tilt?: number; turn?: number }> = ({ t, position, rotationY = 0, green = false, old = false, still = false, tilt = 0, turn = 0 }) => (
  <Boat position={position} rotationY={rotationY} row={still ? 0 : t} rock={still ? 0 : Math.sin(t * 6) * 0.03}>
    <Stranger position={[0, -0.42, -0.5]} face="grin" pose={rower(still ? 0 : t)} />
    {green ? <Green position={[0, -0.33, 0.35]} sit turn={turn} tilt={tilt} /> : old ? <OldMan position={[0, -0.33, 0.35]} sit /> : <Me position={[0, -0.33, 0.35]} sit cap={false} tilt={tilt} />}
  </Boat>
);
const ALL = { bell: false, hole: true, wheat: 0 };

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Clearly",
  shots: [
    {
      cue: "5.torch",
      ...cam.push({ on: [0, 2.0, -5], dist: 16.5, to: 14.5, yaw: 0, pitch: 13, fov: 50 }),
      zone: "town",
      look: "overworld-day",
      note: "The town from the square, and torches going up on it one after another: along the path, then all along the roofs, then on the well.",
      stage: (t) => {
        const roofs = w("5.torch", "roofs") - 0.1;
        const well = w("5.torch", "well") - 0.1;
        const grow = (i: number) => (i >= 11 && i <= 16 ? pop(t, roofs + (i - 11) * 0.05, 0.14) : i === 9 || i === 10 ? pop(t, well + (i - 9) * 0.08, 0.14) : pop(t, 0.15 + (i % 9) * 0.07, 0.14));
        return (
          <>
            <Town {...ALL} torches={false} wall={false} />
            <Torches grow={grow} />
            <Stranger position={[2.2 - t * 0.9, Math.abs(Math.sin(t * 7)) * 0.4, 2.4]} rotationY={-1.2} animation="run" face="grin" />
            <Villager position={[-1.5, 0, 4.4]} rotationY={NORTH} robe={ROBE.brown} lookAt={[2.2 - t * 0.9, 1.4, 2.4]} />
          </>
        );
      },
    },
    {
      cue: "5.torch",
      cut: w("5.torch", "My") - 0.06,
      ...cam.push({ on: [0, 0.75, 0.7], dist: 5.2, to: 4.6, yaw: 0, pitch: 32, fov: 46 }),
      zone: "room",
      look: "overworld-day",
      note: "His floor. There is a torch on every plank of it, and he is standing in the one gap, looking down at them.",
      stage: (t) => (
        <>
          <MyRoom door="flat" desk={1} torches={11} />
          <Me position={[0.55, 0, 0.05]} rotationY={SOUTH} nod={0.5} turn={Math.sin(t * 4) * 0.5} />
        </>
      ),
    },
    {
      cue: "5.dark",
      ...cam.push({ on: [-0.1, 1.4, 5.2], dist: 3.9, to: 3.5, yaw: 4, pitch: 3, fov: 42 }),
      zone: "town",
      look: "overworld-night",
      note: "Night. The teller, close, sure of himself again. Behind him the whole town is lit up like a birthday cake, and there is not one monster in it.",
      stage: (t) => (
        <>
          <Town {...ALL} wall={false} light />
          <Fill at={[0, 3.2, 9]} power={9} reach={9} color="#c9d0ff" />
          <Fill at={[-5, 5, -4]} power={70} reach={20} color="#ffd9a0" />
          <Fill at={[5, 5, -4]} power={70} reach={20} color="#ffd9a0" />
          <Me position={[-0.4, 0, 5.2]} rotationY={SOUTH} nod={Math.sin(tw(t, 0.5, 1.1) * Math.PI) * 0.25} />
        </>
      ),
    },
    {
      cue: "5.wall",
      ...cam.push({ on: [5.2, 1.3, WALL.south], dist: 12.5, to: 11.5, yaw: 218, pitch: 11, fov: 50 }),
      zone: "town",
      look: "overworld-day",
      note: "The south side of town. A cobble wall comes up out of the ground a length at a time, from the gate to the corner, and the stranger runs along the top of it putting the next length down.",
      stage: (t, { dur: len }) => {
        const grow = (i: number) => (i >= 4 && i <= 7 ? pop(t, 0.12 + (i - 4) * 0.22, 0.2) : i <= 3 ? 1 : pop(t, 0.5 + (i - 8) * 0.12, 0.2));
        const k = t / len;
        return (
          <>
            <Town {...ALL} wall={false} />
            <Wall grow={grow} />
            <Stranger position={[2.5 + k * 9, WALL.h + 0.25, WALL.south]} rotationY={EAST} animation="run" face="grin" />
            <Villager position={[2.6, 0, 9.4]} rotationY={0.6} robe={ROBE.blue} lookAt={[2.5 + k * 9, 3, WALL.south]} />
            <Villager position={[4.4, 0, 8.6]} rotationY={0.4} robe={ROBE.brown} lookAt={[2.5 + k * 9, 3, WALL.south]} phase={2} />
          </>
        );
      },
    },
    {
      cue: "5.keep",
      ...cam.pan({ from: [5.1, 5.3, 13.7], on: [5.0, 1.0, 10.9], onTo: [5.0, 1.15, 10.9], fov: 48, fovTo: 45 }),
      zone: "town",
      look: "overworld-day",
      note: "From on top of the wall, looking down the inside of it: three villagers at the foot of it, looking up. The child jumps, and cannot see over.",
      stage: (t) => (
        <>
          <Town {...ALL} />
          <Me position={[5.0, 0, 11.0]} rotationY={SOUTH} lookAt={[5, 5.3, 13.7]} />
          <Villager position={[4.15, 0, 10.6]} rotationY={SOUTH} robe={ROBE.brown} lookAt={[5, 5.3, 13.7]} phase={1} />
          <Villager position={[5.95, hop(t, 0.3, 0.7, 0.4) + hop(t, 1.0, 0.7, 0.4), 11.1]} rotationY={SOUTH} robe={ROBE.friend} kid scale={0.7} lookAt={[5, 5.3, 13.7]} phase={2} />
        </>
      ),
    },
    {
      cue: "5.boat",
      ...cam.push({ on: [0, 1.0, 0.2], dist: 6.4, to: 5.7, yaw: 16, pitch: 10, fov: 46 }),
      zone: "wild",
      look: "overworld-sunset",
      note: "Before any of it, somewhere else. A villager with no cap stands in the grass. A boat comes sliding over dry land behind him with the stranger rowing it, takes his feet out from under him, and he is sitting in it.",
      stage: (t) => {
        const hit = w("5.boat", "put") - 0.05;
        const z = -5 + 5 * tw(t, 0, hit) + Math.max(0, t - hit) * 1.1;
        const caught = t > hit;
        return (
          <>
            {caught ? (
              <Crew t={t} position={[0, 0, z]} />
            ) : (
              <>
                <Boat position={[0, 0, z]} row={t}>
                  <Stranger position={[0, -0.42, -0.5]} face="grin" pose={rower(t)} />
                </Boat>
                <Me position={[0, 0, 0.35]} rotationY={SOUTH} cap={false} />
              </>
            )}
            {t > hit && t < hit + 0.4 ? <Puffs position={[0, 0.2, 0.4]} count={6} spread={0.8} size={0.24} rise={0.6} speed={2} color="#d9c9a0" /> : null}
          </>
        );
      },
    },
    {
      cue: "5.week",
      ...cam.push({ on: [0, 0.95, 0], dist: 5.8, to: 5.4, yaw: 0, pitch: 8, fov: 46 }),
      zone: "wild",
      look: "overworld-sunset",
      note: "The boat going across a field, side on, with dust behind it: the stranger rowing as hard as he can, the villager sitting bolt upright in the front, looking straight ahead.",
      stage: (t) => {
        const x = -0.7 + t * 0.9;
        return (
          <>
            <Crew t={t} position={[x, 0, 0]} rotationY={EAST} />
            <Puffs position={[x - 1.5, 0.15, 0]} count={6} spread={0.7} size={0.26} rise={0.5} speed={2.2} color="#d9c9a0" />
          </>
        );
      },
    },
    {
      cue: "5.before",
      ...cam.push({ on: [0, 1.0, 0.35], dist: 3.8, to: 3.4, yaw: -12, pitch: 5, fov: 42 }),
      zone: "wild",
      look: "overworld-sunset",
      note: "The villager's face in the boat, close, with the stranger rowing behind his shoulder. He is trying to think back, and there is nothing there.",
      stage: (t) => <Crew t={t} position={[0, 0, 0]} tilt={0.22 * tw(t, 0.4, 0.9)} />,
    },
    {
      cue: "5.green",
      ...cam.push({ on: [0, 1.42, -3.4], dist: 5.6, to: 3.1, yaw: 0, pitch: 4, fov: 42 }),
      zone: "wild",
      look: "overworld-night",
      note: "Night, in front of a burnt hut. The same face, the same eyebrow, the same nose: green. He is chewing nothing. The lens goes in until the green face fills the frame, and he looks at us.",
      stage: (t) => (
        <>
          <Fill at={[0, 2.6, -0.8]} power={56} reach={12} color="#c9d0ff" />
          <Fill at={[-2.5, 2, -4.5]} power={22} reach={8} color="#ffb070" />
          <Green position={[0, 0, -3.4]} rotationY={SOUTH} hmm={t < w("5.green", "And") ? 0.8 : 0} tilt={t > w("5.green", "And") ? 0.15 : 0} lean={0.1} />
        </>
      ),
    },
  ],
});
void TORCHES;
