import type React from "react";
import { Block, LightPool, cam, storyScene } from "../../engine";
import {
  Hero, Adult, Friend, Neighbour, Mum,
  DOOR, K, S, SH, P, H, chestOf, faceOf, timing, wordAt, pop, ramp, EAST, WEST, NORTH, ME,
} from "./kit";

/**
 * SCENE 1 — "The street knows me". The hook, the fridge, five jokes before 0:20, and the month he spent
 * being clever.
 *
 * Every shot is one line of narration.md. The camera never holds still, and every cut lands on the line.
 */

/** The word that opens each door. Nothing is opened before it is said. */
const OPENS = wordAt("1.if", "opened");
const FRIDGE = wordAt("2.break", "opened");
const WARDROBE = wordAt("2.neighbour", "came");
const BLUE = wordAt("2.pool", "blue");
const WALL_DAD = wordAt("2.dad", "wall");
const TALLY_AT = wordAt("3.tally", "tally");
const STUCK = wordAt("4.mum", "stuck");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The street knows me",
  shots: [
    {
      // THE HOOK. Night, two doors, and one of them already open onto a school floor that has no business
      // being there. Nothing is explained: the picture asks the question the voice asks.
      cue: "1.if",
      ...cam.push({ on: [-9.40, 1.20, -2.90], dist: 4.21, to: 3.66, yaw: 0, pitch: 5, fov: 52 }),
      zone: "street",
      look: "overworld-night",
      note: "Two front doors in one frame at night: his own, open onto a tiled school floor, and the neighbour's wardrobe standing on the pavement. The power is already working before he says a word about it.",
      stage: (t) => (
        <>
          <Hero position={S(-5.10, 0, -0.90)} rotationY={NORTH} animation="walk" animDistance={0.7} face="calm" />
          <Neighbour position={S(-9.60, 0, 1.10)} rotationY={EAST} animation="idle" face="angry" />
          <Block
            size={[1.16, 2.3, 0.06]}
            position={S(-6.4, 1.15, -3.36)}
            color="#c2baa4"
            emissive="#bfe2ff"
            emissiveIntensity={0.5 * pop(t, OPENS)}
            castShadow={false}
          />
        </>
      ),
    },
    {
      cue: "1.asked",
      // Round the corner of the frame onto the open door itself, low, so the step is a cliff edge.
      ...cam.push({ on: [-6.40, 0.95, -2.60], dist: 3.30, to: 2.10, yaw: 26, pitch: -6, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "His own front door, open, and the room behind it tiled like a school corridor. Low and close: the step is the edge of somewhere that is not his house.",
      stage: () => (
        <>
          <Hero position={S(-7.60, 0, -1.20)} rotationY={EAST} animation="idle" face="wow" gaze={1} />
          <Block size={[1.16, 2.3, 0.06]} position={S(-6.4, 1.15, -3.36)} color="#c2baa4" emissive="#bfe2ff" emissiveIntensity={0.55} castShadow={false} />
        </>
      ),
    },
    {
      cue: "1.hand",
      // Over his shoulder: him, and the door he has just come through.
      ...cam.push({ on: [-6.50, 1.15, -2.00], dist: 2.81, to: 2.26, yaw: -41, pitch: 4, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "Over his shoulder at the door he came out of, and he is looking back at it the way you look at a dog that has just talked.",
      stage: () => (
        <>
          <Hero position={S(-7.30, 0, -1.60)} rotationY={EAST} animation="idle" face="uneasy" />
          <Block size={[1.16, 2.3, 0.06]} position={S(-6.4, 1.15, -3.36)} color="#c2baa4" emissive="#bfe2ff" emissiveIntensity={0.5} castShadow={false} />
        </>
      ),
    },
    {
      cue: "1.wrote",
      // The palm, and the pencil. The thing the last line of the film comes back to.
      ...cam.push({ on: [-6.40, 1.28, -2.95], dist: 2.24, to: 1.54, yaw: 29, pitch: 3, fov: 34 }),
      zone: "street",
      look: "overworld-night",
      note: "His palm, turned up under the lamp, pencil marks on it: a number, a length, a direction. This is the map, and it is on his hand.",
      stage: (t) => (
        <>
          <Hero position={S(-6.20, 0, -1.30)} rotationY={WEST} animation="reach" face="smile" gaze={0} headPitch={0.2} />
          {Array.from({ length: 5 }, (_, i) => (
            <Block
              key={i}
              size={[0.03, 0.012, 0.1 + (i % 3) * 0.04]}
              position={S(-6.36 + (i % 2) * 0.04, 1.16, -1.64 - i * 0.02)}
              rotation={[0, 0.4 + i * 0.3, 0]}
              color="#4a443c"
              castShadow={false}
              opacity={ramp(t, 0.05 + i * 0.07, 0.3 + i * 0.07)}
              transparent
            />
          ))}
        </>
      ),
    },
    {
      cue: "1.one",
      ...cam.push({ on: [2.40, 1.60, -2.90], dist: 5.20, to: 4.65, yaw: -32, pitch: 2, fov: 50 }),
      zone: "street",
      look: "overworld-night",
      note: "Down the row: 4, 6 and, at the end of the frame, the one blue door on the street. He is small in it, and he owns it.",
      stage: () => (
        <>
          <Hero position={S(-3.20, 0, 0.10)} rotationY={EAST} animation="walk" animDistance={1.4} face="smug" />
          <Block size={[1.16, 2.3, 0.06]} position={S(12.8, 1.15, -3.36)} color="#2f5fbf" emissive="#3f6fff" emissiveIntensity={0.35} castShadow={false} />
        </>
      ),
    },
    {
      cue: "2.fridge",
      // IN THE KITCHEN, and the door of the fridge is already open: the light inside it is the only warm thing.
      ...cam.push({ on: K(2.70, 1.20, -2.30), dist: 2.09, to: 1.54, yaw: 35, pitch: 5, fov: 46 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "The fridge, open, and him with his hand on the door: the first door he uses, and it looks like a fridge until he steps in.",
      stage: () => (
        <>
          <Hero position={K(2.10, 0, -1.40)} rotationY={NORTH} animation="reach" face="grin" headYaw={0.3} />
          <Block size={[0.9, 1.9, 0.04]} position={K(2.85, 0.98, -2.14)} color="#fff6d8" emissive="#ffe9a8" emissiveIntensity={1.5} castShadow={false} />
        </>
      ),
    },
    {
      // Out of the fridge and into school: the same body, a different room, and he has not gone outside.
      cue: "2.break",
      ...cam.push({ on: [3.60, 1.25, 1.60], dist: 2.60, to: 2.05, yaw: -90, pitch: 2, fov: 46 }),
      zone: "class",
      note: "The classroom, and him standing in it in his socks: the fridge closed behind him and the room is twenty minutes early. Same shot size as the fridge, so the cut is the joke.",
      stage: (t) => (
        <>
          <Hero position={[3.30, 0, 1.60]} rotationY={WEST} animation="walk" animDistance={t * 0.9} face="wow" />
          {[0, 1, 2].map((row) => (
            <Block key={row} size={[9.4, 0.02, 0.9]} position={[0, 0.02, -0.9 + row * 1.65]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={0.12} castShadow={false} />
          ))}
        </>
      ),
    },
    {
      cue: "2.late",
      ...cam.push({ on: [0.60, 1.15, -1.20], dist: 4.89, to: 4.34, yaw: -5, pitch: 10, fov: 54 }),
      zone: "class",
      note: "The class from the front of the room: nine empty desks, the window light, and him in the middle of them, twenty minutes early and not one second of it earned.",
      stage: () => (
        <>
          {[
            [-2.4, -0.9], [0, -0.9], [2.4, -0.9], [-2.4, 0.75], [2.4, 0.75], [-2.4, 2.4], [0, 2.4], [2.4, 2.4],
          ].map(([x, z], i) => (
            <Block key={i} size={[1.5, 0.7, 0.7]} position={[x, 0.35, z]} color="#b48d52" />
          ))}
          <Hero position={[0.2, 0, 1.4]} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "2.neighbour",
      // THE WARDROBE. He comes out of it in a dressing gown, on the pavement, and he is furious about it.
      ...cam.push({ on: [-3.20, 1.30, -1.60], dist: 3.00, to: 2.20, yaw: 0, pitch: 2, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "The neighbour stepping out of his own wardrobe on the pavement in a dressing gown: the joke that tells the viewer this happens to everybody, not just him.",
      stage: (t) => (
        <>
          <Block size={[1.3, 2.2, 0.6]} position={S(-9.60, 1.1, -2.40)} color="#6a4a34" />
          <Block size={[1.16, 2.06, 0.08]} position={S(-9.60, 1.08, -2.10)} color="#2a2118" castShadow={false} />
          <Neighbour
            position={S(-9.60 - ramp(t, WARDROBE, WARDROBE + 0.9) * 0.9, 0, -1.10)}
            rotationY={0}
            animation="walk"
            animDistance={ramp(t, WARDROBE, WARDROBE + 1.2) * 1.8}
            face="angry"
          />
        </>
      ),
    },
    {
      cue: "2.shout",
      // Low, from the floor, looking up at a man shouting at a street that has no idea.
      ...cam.push({ on: [-3.30, 1.50, -1.50], dist: 3.53, to: 2.93, yaw: 12, pitch: -11, fov: 48 }),
      zone: "street",
      look: "overworld-night",
      note: "From the pavement, looking up: him shouting at the street, and behind him the row of doors that all look the same and none of which he can name.",
      stage: () => (
        <>
          <Neighbour position={S(-9.90, 0, -0.60)} rotationY={NORTH} animation="point" face="angry" headYaw={0.2} />
          <Hero position={S(-7.60, 0, 0.20)} rotationY={EAST} animation="idle" face="smile" />
        </>
      ),
    },
    {
      cue: "2.pool",
      // THE BLUE DOOR, and it is the only colour in the frame.
      ...cam.push({ on: [12.80, 1.50, -3.00], dist: 3.61, to: 2.41, yaw: 0, pitch: -5, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "The blue door, at the end of the street, and the two of them in front of it: the dare is a colour.",
      stage: (t) => (
        <>
          <Block size={[1.16, 2.3, 0.06]} position={S(12.8, 1.15, -3.36)} color="#2f5fbf" emissive="#3f6fff" emissiveIntensity={0.4} castShadow={false} />
          <Hero position={S(12.0, 0, -1.30)} rotationY={NORTH} animation="reach" face="uneasy" />
          <Friend position={S(13.7, 0, -1.10)} rotationY={NORTH} animation="point" face="grin" headYaw={-0.3} />
        </>
      ),
    },
    {
      cue: "2.wet",
      // IN THE POOL, in his shoes, and the water is at his knees.
      ...cam.push({ on: P(0, 0.25, 0), dist: 3.52, to: 2.77, yaw: 21, pitch: 14, fov: 48 }),
      zone: "pool",
      look: "overworld-night",
      note: "The deep end at night and him standing in it, shoes and all, water to the knees, lit by one floodlight: the funniest and most expensive thing he has done so far.",
      stage: () => (
        <>
          <Hero position={P(-0.30, -0.55, 0.30)} rotationY={NORTH} animation="idle" face="wow" />
          <Friend position={P(-0.90, 0, 3.30)} rotationY={NORTH} animation="laugh" face="laugh" />
        </>
      ),
    },
    {
      cue: "2.dad",
      // The back door and the wall behind it, 0.9 m apart. He walks into it, and tries again.
      ...cam.push({ on: [-25.60, 1.20, 0.40], dist: 3.51, to: 2.86, yaw: 121, pitch: 4, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "The back door, open onto a brick wall he can touch, and his dad doing exactly what the street has done to everyone: walking into it and trying again.",
      stage: (t) => (
        <>
          <Block size={[0.4, 3.2, 7.0]} position={S(-8.30, 1.6, -3.9)} color="#7a5f4a" castShadow={false} />
          <Adult
            position={S(-8.85, 0, -3.70)}
            rotationY={WEST}
            animation="walk"
            animDistance={ramp(t, 0, 1.6) * 1.1}
            face="frown"
          />
          <Block size={[0.4, 5.2, 9.0]} position={S(-9.60, 2.6, -4.6)} color="#9a7f62" castShadow={false} />
          {/* This alley is sealed by two walls and has no street lamp in it, so it needs its own light or the
              frame is black however the lens is placed. A service lamp over the back door, the same sodium
              colour as the street. */}
          <pointLight position={S(-8.60, 2.60, -3.70)} color="#ffd9a0" intensity={26} distance={11} decay={2} />
          <LightPool position={S(-8.70, 0.03, -3.60)} width={3.4} depth={3.0} color="#ffd9a0" opacity={0.18} />
        </>
      ),
    },
    {
      cue: "2.pizza",
      // The box on the step, and the door it came out of.
      ...cam.push({ on: [0, 1.40, -2.90], dist: 3.81, to: 2.61, yaw: 0, pitch: -3, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "A pizza box on number 6's step at midnight, twenty minutes late, from a door nobody ordered from: the last of the five jokes, and the first time somebody else pays.",
      stage: () => (
        <>
          <Block size={[0.46, 0.09, 0.46]} position={S(0, 0.24, -2.35)} color="#d8c49a" />
          <Block size={[0.44, 0.012, 0.44]} position={S(0, 0.30, -2.35)} color="#c2a878" castShadow={false} />
          <Block size={[0.16, 0.014, 0.16]} position={S(0.04, 0.31, -2.33)} color="#c8402f" castShadow={false} />
        </>
      ),
    },
    {
      cue: "3.map",
      // The month of being clever: him at his own door with the map on his hand, already walking.
      ...cam.push({ on: [-6.40, 1.15, -1.60], dist: 2.06, to: 1.46, yaw: 29, pitch: 4, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "Him at his own door with his palm open, checking the map before he uses it: the power has become a routine you can be good at.",
      stage: () => (
        <>
          <Hero position={S(-5.70, 0, -1.10)} rotationY={WEST} animation="reach" face="smug" gaze={0} />
        </>
      ),
    },
    {
      cue: "3.cut",
      // Two doors in two seconds, fridge then cupboard, so the rhythm says what the words say.
      ...cam.push({ on: K(2.85, 1.15, -2.30), dist: 1.65, to: 1.25, yaw: 31, pitch: 7, fov: 42 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "School through the fridge: the door swinging, the light of the fridge, nothing supernatural about it at all any more.",
      stage: (t) => (
        <>
          <Block size={[0.9, 1.9, 0.04]} position={K(2.85, 0.98, -2.14)} color="#fff6d8" emissive="#ffe9a8" emissiveIntensity={1.4} castShadow={false} />
          <Hero position={K(2.10, 0, -1.40)} rotationY={NORTH} animation="walk" animDistance={t * 1.4} face="calm" />
        </>
      ),
    },
    {
      cue: "3.cut",
      cut: 1.05,
      // The cupboard, in the same kitchen, a second later.
      ...cam.push({ on: K(-3.05, 1.10, -2.40), dist: 1.82, to: 1.42, yaw: 39, pitch: 6, fov: 42 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "The shop through the cupboard: same kitchen, other door, one second of film. The trick has become a commute.",
      stage: () => (
        <>
          <Hero position={K(-2.40, 0, -1.60)} rotationY={WEST} animation="walk" animDistance={0.8} face="calm" />
        </>
      ),
    },
    {
      cue: "3.tally",
      // HIS ROOM, the marks going up the wall, and him adding one.
      // THESE NUMBERS ARE IN THE ROOM'S OWN SPACE, AND THE ROOM IS NOT AT THE ORIGIN. `zone` only switches
      // visibility on and off; it does not move the camera. The room is built at H(0,0,5.1), so the lens and
      // the marks both need H() to land on it. Before this, the camera stood at z 2.86 -- 2 m south of the
      // room and in the middle of empty world -- and shot the dark.
      ...cam.push({ on: H(0.25, 1.10, 7.96), dist: 2.30, to: 2.00, yaw: 180, pitch: 3, fov: 54 }),
      zone: "bed",
      look: "overworld-night",
      note: "His tally on the bedroom wall, growing, and him putting the next mark on: a kid keeping score of how many doors he owns.",
      stage: (t) => (
        <>
          <TallyMarks at={H(0.25, 0, 7.96)} count={11 + (t > TALLY_AT ? 1 : 0)} />
          <Hero position={H(1.05, 0, 6.95)} rotationY={NORTH} animation="reachUp" face="smug" />
        </>
      ),
    },
    {
      cue: "3.good",
      // Best month of his life, and the room he says it in.
      // Also H(): the room is at hall z 125.1, so a lens at z -2.60 was half a street away and looking at nothing.
      ...cam.push({ on: H(-0.95, 1.15, 6.90), dist: 2.20, to: 1.45, yaw: 120, pitch: 4, fov: 62 }),
      zone: "bed",
      look: "overworld-night",
      note: "The whole room: the bed, the marks, the window, and him sitting on the bed grinning. It is a good room. That is the point of it.",
      stage: () => (
        <>
          <Hero position={H(-0.95, 0.68, 6.90)} rotationY={EAST} animation="sit" face="grin" />
        </>
      ),
    },
    {
      cue: "4.mum",
      // MUM. In the kitchen, at the door that sticks, and the door does not move.
      ...cam.push({ on: K(3.35, 1.25, -0.90), dist: 1.96, to: 1.41, yaw: -90, pitch: 4, fov: 44 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "His mum with her hand on the door that sticks, and the door not moving: the one door in the film that refuses to be a shortcut.",
      stage: (t) => (
        <>
          <Mum position={K(3.00, 0, -0.90)} rotationY={EAST} animation="press" face="calm" />
          <Block size={[0.06, 2.1, 0.94]} position={K(3.58, 1.05, -0.90)} color="#7a5a3a" castShadow={false} rotation={[0, 0, 0]} />
          <Block size={[0.1, 0.1, 2.2]} position={K(3.30, 1.05, -0.90)} color="#8a6a44" opacity={0} transparent />
        </>
      ),
    },
    {
      cue: "4.long",
      // She turns, and behind her the long way is a hallway she walks every day.
      ...cam.push({ on: K(3.00, 1.20, -0.90), dist: 3.87, to: 3.27, yaw: -43, pitch: 9, fov: 46 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "She has said it for years, so she says it the way you say the weather: her back to the stuck door and the hallway behind her.",
      stage: () => (
        <>
          <Mum position={K(3.00, 0, -0.90)} rotationY={WEST} animation="idle" face="smile" />
        </>
      ),
    },
    {
      cue: "4.didnt",
      // He is not listening. He is eating, and being clever.
      ...cam.push({ on: K(0.30, 1.05, 1.10), dist: 2.11, to: 1.51, yaw: -67, pitch: 12, fov: 42 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "Him at the table, halfway through a mouthful, not looking up: the one moment the film could stop and does not, because he is thirteen and busy.",
      stage: () => (
        <>
          <Hero position={K(0.30, 0, 1.30)} rotationY={NORTH} animation="sit" face="smile" />
          <Block size={[0.5, 0.1, 0.4]} position={K(0.30, 0.80, 0.60)} color="#d8d2c4" />
        </>
      ),
    },
  ],
});

/** The tally on his own wall: the same marks the world draws, in the same place, at a given count. */
const TallyMarks: React.FC<{ at: [number, number, number]; count: number }> = ({ at, count }) => (
  <group position={at}>
    {Array.from({ length: count }, (_, i) => {
      const g = Math.floor(i / 5);
      const k = i % 5;
      return (
        <Block
          key={i}
          size={k === 4 ? [0.024, 0.2, 0.012] : [0.014, 0.18, 0.012]}
          position={[-0.55 + g * 0.11, 1.02 + Math.floor(g / 6) * 0.28 + (i % 2) * 0.01, 0.01]}
          rotation={k === 4 ? [0, 0, 0.32] : [0, 0, -0.04 + (i % 3) * 0.03]}
          color="#3f382f"
          castShadow={false}
        />
      );
    })}
  </group>
);

void chestOf;
void faceOf;
void Adult;
void DOOR;
void SH;
void ME;
void STUCK;
