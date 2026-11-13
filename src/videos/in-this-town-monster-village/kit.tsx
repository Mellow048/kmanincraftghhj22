import type React from "react";
import { Block, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Creeper, Enderman, KID, MONSTER, Skeleton, Slime, Spider, StrawHat, Zombie, wordClock } from "../../../Topics/InThisTown";
import type { MonsterProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places. The monsters come from the pack (Topics/InThisTown/monsters.tsx); what is here
 * is who they are in this story, the teller, Mo (a man painted green), and the few props the story needs.
 */

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, ease, jolt, pop, ramp,
  Player, Bits, Bubble, FireLight, Lantern, Puffs, Smoke, SubscribeSign, StrawHat,
  Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Zombie, monsterFace,
} from "../../../Topics/InThisTown";
export { DustRing, Streaks, tossed, lerp3, stride, hop, flat } from "../in-this-town-superpower-at-18-part-2/kit";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.bell", "bell")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

export const DAY = "overworld-day";
export const NIGHT = "overworld-night";
/** Sunset: purple air and a low warm sun from the west. */
export const DUSK = "overworld-storm";
export const ZONE = { day: "village+day", dusk: "village+day", night: "village+night" };

// ----------------------------------------------------------------------------- places

/** The street runs west–east (x). House fronts on the north side face south, at the camera. */
export const PLACE = {
  square: [0, 0, 2] as Vec3,
  /** The teller's house: middle of its front wall. Door at x − 1.3, window at x + 1.5. */
  home: [10, 0, -5] as Vec3,
  door: [8.7, 0, -4.6] as Vec3,
  window: [11.5, 0, -4.7] as Vec3,
  /** Mo's house, at the end of the street. */
  mo: [21, 0, -5] as Vec3,
  /** The low stone ledge they sit on, in the sun. 3.4 wide, 0.5 high, 1.1 deep. */
  ledge: [3.5, 0, 6.2] as Vec3,
  bush: [1.2, 0, 6.3] as Vec3,
  /** The market hall: a roof on posts, x −8…1, z −4.6…−0.4. The monsters keep under it by day. */
  shade: [-3.5, 0, -2.5] as Vec3,
  /** Where the slime bus stops. */
  stop: [-9, 0, 2.4] as Vec3,
  pond: [13, 0, 8] as Vec3,
  room: [0, 0, 80] as Vec3,
};
/** Where each of them sits on the ledge, facing south. The kid is lifted so his seat meets the stone. */
export const ME_SIT: Vec3 = [2.85, 0.06, 6.45];
export const MO_SIT: Vec3 = [3.75, -0.05, 6.45];
/** The hill the players come over: flat top at y = 3 west of x = −28, six steps down to the street at x = −22. */
export const hillY = (x: number): number => Math.max(0, Math.min(3, Math.ceil(-22 - x) * 0.5));
/** The ring they stand in round his house every night, west to east. Each faces OUT: its rotationY is its angle. */
const RING_C: Vec3 = [10, 0, -4.5];
export const ringAt = (deg: number, r = 3.8): { position: Vec3; rotationY: number } => {
  const a = (deg * Math.PI) / 180;
  return { position: [RING_C[0] + r * Math.sin(a), 0, RING_C[2] + r * Math.cos(a)], rotationY: a };
};
/** Where he stands at his window (on his bed), and where he lands under it. */
export const AT_WINDOW: Vec3 = [11.5, 1.0, -4.95];
export const UNDER_WINDOW: Vec3 = [11.5, 0, -3.9];
export const SPY: Vec3 = [10.3, 0, -2.9];

/** The last stand: mum on her back (her feet here, her head to the east), the teller in front of her, the big player in front of him. */
export const MUM_DOWN: Vec3 = [-3.3, 0, 2.4];
export const STAND: Vec3 = [-4.3, 0, 2.4];
export const BIG: Vec3 = [-6.1, 0, 2.4];
export const BIG_SCALE = 1.12;
/** Where Mo's open hand meets the blade, and where he has to stand (facing west) for his raised right hand to be there. */
export const CATCH: Vec3 = [-4.95, 1.9, 2.02];
export const MO_CATCH: Vec3 = [CATCH[0] - 0.32, 0, CATCH[2] + 0.34];

/** Seconds a cue lasts. */
export const dur = (cue: string): number => {
  const c = timing.cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 1;
};

/** Where a player's right hand is, for a straight arm at `a` radians (0 hangs, −π/2 points ahead, −π is straight up). */
export const handOf = (p: Vec3, rotY: number, a: number, scale = 1): Vec3 => {
  const L = 0.62 * scale;
  const fwd = -L * Math.sin(a);
  const side = 0.34 * scale;
  return [p[0] + Math.cos(rotY) * side + Math.sin(rotY) * fwd, p[1] + 1.35 * scale - L * Math.cos(a), p[2] - Math.sin(rotY) * side + Math.cos(rotY) * fwd];
};

// ----------------------------------------------------------------------------- the teller

type A = Partial<MinecraftAvatarProps>;
const SKIN = "#dba47c";

/** The teller: a boy in YELLOW. Faces for a kid: smile grin laugh frown uneasy brave fear wow ouch calm. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin={SKIN} hair="#3a2415" colors={{ torso: "#f2b705", arms: "#f2b705", legs: "#3b3fa0" }} blink {...p} />
);
export const faceOf = (p: Vec3): Vec3 => [p[0], p[1] + 1.53 * KID, p[2]];
export const chestOf = (p: Vec3): Vec3 => [p[0], p[1] + 1.12 * KID, p[2]];
/** A grown player's face, and Mo's. */
export const manFace = (p: Vec3): Vec3 => [p[0], p[1] + 1.56, p[2]];

// ----------------------------------------------------------------------------- Mo

/**
 * Mo: "a zombie with a straw hat and a scarf up to his nose". He is a man painted green, so he is an avatar and
 * not the pack's Zombie: he can sit, fish, laugh and catch a sword. `scarf` 1 is up over his nose, 0 is pulled
 * down round his neck. `wiped` 0–1 is how much green has come off his cheek.
 */
export const Mo: React.FC<A & { scarf?: number; wiped?: number; hat?: boolean; sleeve?: number }> = ({ scarf = 1, wiped = 0, hat = true, sleeve, children, ...p }) => (
  <MinecraftAvatar
    outfit="tee"
    skin={MONSTER.zombieSkin}
    hair="#4c7f3e"
    colors={{ torso: MONSTER.zombieShirt, arms: MONSTER.zombieShirt, legs: MONSTER.zombieLegs }}
    blink
    phase={2.3}
    head={
      <>
        {hat ? <StrawHat position={[0, 0.225, 0]} width={0.92} /> : null}
        <Block position={[0, -0.12 - (1 - scarf) * 0.17, 0]} size={[0.5 + (1 - scarf) * 0.04, 0.2 - (1 - scarf) * 0.08, 0.5 + (1 - scarf) * 0.04]} color={MONSTER.scarfRed} />
        <Block position={[0.14, -0.34, 0.26]} size={[0.11, 0.24, 0.05]} color="#9c2c22" />
        {sleeve === undefined ? null : <Block position={[-0.3 + 0.36 * sleeve, 0.0, 0.31]} size={[0.14, 0.22, 0.14]} color={MONSTER.zombieShirt} />}
        {wiped > 0 ? (
          <>
            <Block position={[-0.225 + 0.1 * wiped, -0.01, 0.228]} size={[0.2 * wiped, 0.2, 0.012]} color={SKIN} castShadow={false} />
            <Block position={[-0.228, -0.01, 0.225 - 0.07 * wiped]} size={[0.012, 0.2, 0.14 * wiped]} color={SKIN} castShadow={false} />
          </>
        ) : null}
      </>
    }
    {...p}
  >
    {children}
  </MinecraftAvatar>
);

// ----------------------------------------------------------------------------- the village

type M = MonsterProps;
/** Mum: a zombie with a pink scarf and a bow. */
export const Mum: React.FC<M & { arms?: number; wave?: number }> = (p) => <Zombie scarf={MONSTER.scarfPink} hat="bow" phase={0.7} {...p} />;
/** Dad: a skeleton with a blue scarf. */
export const Dad: React.FC<M & { wave?: number; rattle?: number }> = (p) => <Skeleton scarf={MONSTER.scarfBlue} phase={1.9} {...p} />;
/** Hiss, the creeper next door. He loves hugs. */
export const Hiss: React.FC<M & { fuse?: number }> = (p) => <Creeper phase={3.1} {...p} />;
/** The postman: an enderman with a yellow scarf. */
export const Postman: React.FC<M & { jaw?: number; carry?: number; shake?: number; children?: React.ReactNode }> = (p) => <Enderman scarf={MONSTER.scarfYellow} phase={0.4} {...p} />;
/** The school bus. */
export const Bus: React.FC<M & { squash?: number; size?: number }> = (p) => <Slime size={1.9} phase={1.2} {...p} />;
export const Gran: React.FC<M & { rear?: number }> = (p) => <Spider hat="bow" phase={2.2} {...p} />;

const RAIDERS = [
  { skin: "#c68e62", hair: "#1c1410", torso: "#5a1f1f", legs: "#22222a" },
  { skin: "#e3b48c", hair: "#c9a13c", torso: "#2f5fb0", legs: "#2c2c44" },
  { skin: "#8d5a3b", hair: "#15110f", torso: "#3f7f3a", legs: "#4a3a2a" },
  { skin: "#f0c8a4", hair: "#7a3d1c", torso: "#7a4fb0", legs: "#2a2a33" },
  { skin: "#d8a47c", hair: "#2a2a2a", torso: "#b0b6c0", legs: "#3a4252" },
  { skin: "#b97a56", hair: "#4a2c14", torso: "#c8641e", legs: "#33302c" },
];
/**
 * A player who has come to clear the village: a grown-up in his own colours, with an iron sword in his right hand.
 * `who` 0 is the big one, in dark red. `torch` gives him a torch instead of a sword.
 */
export const Raider: React.FC<A & { who: number; sword?: boolean; torch?: boolean }> = ({ who, sword = true, torch = false, ...p }) => {
  const c = RAIDERS[who % RAIDERS.length];
  return (
    <MinecraftAvatar outfit="tee" skin={c.skin} hair={c.hair} colors={{ torso: c.torso, arms: c.torso, legs: c.legs }} blink phase={who * 1.3 + 0.4} scale={who === 0 ? BIG_SCALE : 1} {...p}>
      {torch ? (
        <>
          <Block position={[0, 0.12, 0.08]} size={[0.07, 0.5, 0.07]} color="#6b4a2a" />
          <Block position={[0, 0.42, 0.08]} size={[0.11, 0.13, 0.11]} color="#000000" emissive="#ffb030" emissiveIntensity={1} castShadow={false} />
          <pointLight position={[0, 0.5, 0.1]} color="#ffa040" intensity={who % 2 ? 0 : 14} distance={8} decay={2} />
        </>
      ) : sword ? (
        <Sword />
      ) : null}
    </MinecraftAvatar>
  );
};

/** A monster knocked flat on its back: `k` 0 is standing, 1 is down. `position` is where the feet are. */
export const Fallen: React.FC<{ position: Vec3; rotationY: number; k: number; children: React.ReactNode }> = ({ position, rotationY, k, children }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group rotation={[-1.5 * k, 0, 0]} position={[0, 0.14 * k, 0]}>
      {children}
    </group>
  </group>
);

/** A soft light on the camera's side of a face at night: `on` is the face, `yaw` the camera's yaw in degrees. */
export const Fill: React.FC<{ on: Vec3; yaw: number; power?: number; d?: number }> = ({ on, yaw, power = 5, d = 1.7 }) => (
  <pointLight position={[on[0] + d * Math.sin((yaw * Math.PI) / 180), on[1] + 0.35, on[2] + d * Math.cos((yaw * Math.PI) / 180)]} color="#e6ecff" intensity={power} distance={6} decay={2} />
);

/** A sword in the world, not in a hand: `position` is the grip, `yaw` the way it points, `pitch` radians above flat. */
export const AimSword: React.FC<{ position: Vec3; yaw: number; pitch: number; scale?: number }> = ({ position, yaw, pitch, scale = 1 }) => (
  <group position={position} rotation={[0, yaw, 0]}>
    <group rotation={[-pitch, 0, 0]}>
      <Sword scale={scale} />
    </group>
  </group>
);

/** The whole ring, facing out. `look` is where their heads point (the hill, once they have seen the torches). */
export const Ring: React.FC<{ t?: number; look?: Vec3; mood?: "calm" | "angry" | "scared"; mo?: boolean }> = ({ look, mood = "calm", mo = true }) => (
  <>
    <Bus {...ringAt(-80)} mood={mood} />
    <Hiss {...ringAt(-52)} mood={mood} lookAt={look} />
    <Dad {...ringAt(-26)} mood={mood} lookAt={look} />
    <Mum {...ringAt(0)} mood={mood} lookAt={look} />
    {mo ? <Mo {...ringAt(26)} animation="idle" face="neutral" lookAt={look} gaze={0} /> : null}
    <Postman {...ringAt(52)} mood={mood} lookAt={look} />
    <Gran {...ringAt(78)} scale={0.8} mood={mood} />
  </>
);

/** His window, open: the dark of the room where the pane was, and a shutter swung out to the side. */
export const OpenWindow: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <>
    <Block position={[11.5, 2.15, -4.9]} size={[1.04, 1.04, 0.1]} color="#140f0c" castShadow={false} />
    <group position={[12.02, 2.15, -4.84]} rotation={[0, 2.2 * k, 0]}>
      <Block position={[-0.26, 0, 0]} size={[0.52, 1.04, 0.05]} color="#7a5632" />
    </group>
    <group position={[10.98, 2.15, -4.84]} rotation={[0, -2.2 * k, 0]}>
      <Block position={[0.26, 0, 0]} size={[0.52, 1.04, 0.05]} color="#7a5632" />
    </group>
  </>
);

// ----------------------------------------------------------------------------- props

/** An iron sword, held: it lies along the hand's forward axis. */
export const Sword: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.0]} size={[0.06, 0.07, 0.22]} color="#5a3d22" />
    <Block position={[0, 0, 0.13]} size={[0.26, 0.07, 0.06]} color="#3c3c44" />
    <Block position={[0, 0, 0.55]} size={[0.09, 0.035, 0.8]} color="#dfe6ee" metalness={0.2} roughness={0.4} />
    <Block position={[0, 0, 0.98]} size={[0.05, 0.03, 0.08]} color="#f4f8fb" />
  </group>
);

/** The basket he came in: wicker, a white cloth. `position` is the middle of its bottom. */
export const Basket: React.FC<{ position: Vec3; rotationY?: number; baby?: boolean; scale?: number }> = ({ position, rotationY = 0, baby = false, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.14, 0]} size={[0.62, 0.28, 0.42]} color="#a8773c" />
    <Block position={[0, 0.29, 0]} size={[0.66, 0.05, 0.46]} color="#8a5f2c" />
    <Block position={[0, 0.3, 0]} size={[0.52, 0.06, 0.34]} color="#f1ece0" castShadow={false} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.3, 0.42, 0]} size={[0.04, 0.3, 0.05]} color="#8a5f2c" />
    ))}
    <Block position={[0, 0.58, 0]} size={[0.64, 0.04, 0.05]} color="#8a5f2c" />
    {baby ? (
      <>
        <Block position={[0.12, 0.4, 0]} size={[0.2, 0.2, 0.2]} color={SKIN} />
        <Block position={[0.12, 0.49, 0]} size={[0.21, 0.05, 0.21]} color="#3a2415" castShadow={false} />
        <Block position={[-0.1, 0.36, 0]} size={[0.28, 0.12, 0.26]} color="#f2b705" />
      </>
    ) : null}
  </group>
);

/** A loaf of bread. `half` −1 / 1 is one half of it, broken. */
export const Bread: React.FC<{ position?: Vec3; rotation?: Vec3; half?: number; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], half = 0, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[half * 0.07, 0, 0]} size={[half === 0 ? 0.3 : 0.15, 0.12, 0.13]} color="#c98a3c" />
    <Block position={[half * 0.07, 0.065, 0]} size={[half === 0 ? 0.26 : 0.13, 0.02, 0.1]} color="#e0b060" castShadow={false} />
    {half !== 0 ? <Block position={[half * -0.005, 0, 0]} size={[0.012, 0.1, 0.11]} color="#f3e2b8" castShadow={false} /> : null}
  </group>
);

/** A bowl of grey stew. It steams a little, greenly. */
export const Stew: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.04, 0]} size={[0.2, 0.08, 0.2]} color="#6b4a2a" />
    <Block position={[0, 0.085, 0]} size={[0.16, 0.02, 0.16]} color="#7d8478" castShadow={false} />
    <Block position={[0.03, 0.1, -0.02]} size={[0.04, 0.03, 0.04]} color="#59614f" castShadow={false} />
  </group>
);

/** A parcel, tied with string. */
export const Parcel: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.5, 0.4, 0.5]} color="#b98b52" />
    <Block position={[0, 0, 0]} size={[0.52, 0.42, 0.07]} color="#e8e0cc" castShadow={false} />
    <Block position={[0, 0, 0]} size={[0.07, 0.42, 0.52]} color="#e8e0cc" castShadow={false} />
  </group>
);

/** A fishing rod, held: it goes up and forward from the hand, with a line down to a float. */
export const Rod: React.FC<{ bob?: number }> = ({ bob = 0 }) => (
  <group rotation={[-0.9, 0, 0]}>
    <Block position={[0, 0, 0.9]} size={[0.04, 0.04, 1.9]} color="#7a5632" />
    <group position={[0, 0, 1.85]} rotation={[0.9, 0, 0]}>
      <Block position={[0, -0.75, 0]} size={[0.012, 1.5, 0.012]} color="#f2f2f2" castShadow={false} />
      <Block position={[0, -1.5 + bob, 0]} size={[0.09, 0.09, 0.09]} color="#e23a2e" />
    </group>
  </group>
);

/** Drops of red from a cut hand. `t` is seconds since it started. */
export const Drops: React.FC<{ position: Vec3; t: number }> = ({ position, t }) =>
  t <= 0 ? null : (
    <>
      {[0, 1, 2, 3].map((i) => {
        const k = (t * 1.3 + i * 0.25) % 1;
        return <Block key={i} position={[position[0] + (i - 1.5) * 0.03, position[1] - k * k * 0.9, position[2]]} size={[0.045, 0.07, 0.045]} color="#000000" emissive="#d8141c" emissiveIntensity={1} castShadow={false} />;
      })}
    </>
  );
