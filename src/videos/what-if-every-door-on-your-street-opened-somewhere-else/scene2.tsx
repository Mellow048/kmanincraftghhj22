import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import { Hero, Adult, Woman, Friend, K, S, SH, H, EAST, NORTH, WEST, DOOR, timing, wordAt, pop, ramp } from "./kit";

/**
 * SCENE 2 — "The door that will not". The one door he cannot get right, the woman in the queue, and the
 * hallway with his own handwriting on the wall.
 */

const SHOP_DOOR = wordAt("7.went", "shop");
const WRITING = wordAt("8.wall", "writing");
const HIGH = wordAt("8.higher", "higher");
const OLDER = wordAt("8.older", "older");
const COPIED = wordAt("8.copied", "height");
const NOTYET = wordAt("8.wait", "line");
const HANDON = wordAt("10.hand", "hand");
const MINE = wordAt("10.mine", "measurement");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The door that will not",
  shots: [
    {
      // The stuck door: the fourth door on the row, the only one that opens onto the same place twice.
      cue: "5.one",
      ...cam.push({ on: [3.20, 1.35, -3.00], dist: 4.10, to: 3.30, yaw: 0, pitch: -1, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "Number 6's door standing open on a hallway that is not a school and not a shop: the one door he cannot get right, and the only one he has never been inside.",
      stage: () => (
        <>
          <Block size={[1.16, 2.3, 0.06]} position={S(0, 1.15, -3.36)} color="#5a5048" emissive="#3a2f28" emissiveIntensity={0.2} castShadow={false} />
          <Hero position={S(-1.10, 0, -1.40)} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "5.stuck",
      // Inside it: a hallway 1.4 m wide with no windows, and the lens at the near end.
      ...cam.push({ on: H(0, 1.20, 4.00), dist: 3.65, to: 2.95, yaw: 180, pitch: 2, fov: 40 }),
      zone: "hall",
      look: "overworld-night",
      note: "The hallway behind the stuck door: 1.4 m wide, one bulb, a wall on the right, and no way of telling which street it belongs to.",
      stage: () => (
        <>
          <Hero position={H(0, 0, 0.70)} rotationY={NORTH} animation="walk" animDistance={1.2} face="calm" />
        </>
      ),
    },
    {
      cue: "5.same",
      // The same hallway, a beat later, and he has stopped walking: this is where he always ends up.
      ...cam.push({ on: H(0, 1.10, 3.80), dist: 3.60, to: 2.80, yaw: 180, pitch: 1, fov: 36 }),
      zone: "hall",
      look: "overworld-night",
      note: "Not a different place, the same hallway every time: the shot is the sentence, one point of view, one wall, nothing changing.",
      stage: () => (
        <>
          <Hero position={H(0, 0, 1.80)} rotationY={NORTH} animation="lookAround" face="frown" headYaw={0.3} />
        </>
      ),
    },
    {
      cue: "5.never",
      // Closer, and the wall beside him is plain: whatever is on it, he has never read it.
      ...cam.push({ on: H(-0.20, 1.25, 2.60), dist: 1.82, to: 1.32, yaw: 159, pitch: 3, fov: 44 }),
      zone: "hall",
      look: "overworld-night",
      note: "Close on him in the corridor, the wall dark beside his face: it is the only place in the film he is not the expert in.",
      stage: () => (
        <>
          <Hero position={H(0, 0, 3.00)} rotationY={NORTH} animation="idle" face="uneasy" gaze={1} />
        </>
      ),
    },
    {
      cue: "6.only",
      // The street, wide, all six doors, and him in the middle of it thinking he is the only one.
      ...cam.push({ on: [-2.40, 1.35, -2.50], dist: 8.97, to: 8.42, yaw: 39, pitch: 1, fov: 54 }),
      zone: "street",
      look: "overworld-night",
      note: "Down the whole street from the road: six doors, one kid, and the smugness of believing you are the only one who has worked it out.",
      stage: () => (
        <>
          <Hero position={S(-2.40, 0, 0.40)} rotationY={WEST} animation="idle" face="smug" />
        </>
      ),
    },
    {
      cue: "7.one",
      // THE SHOP AT NINE. The queue, the light, and one woman letting everybody through.
      ...cam.push({ on: [59.40, 1.35, 4.60], dist: 5.01, to: 4.46, yaw: 2, pitch: 2, fov: 48 }),
      zone: "shop",
      look: "overworld-night",
      note: "The shop at nine at night, its door lit, and the one woman at the front of the queue letting everybody go ahead of her.",
      stage: () => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={NORTH} animation="idle" face="smile" />
          <Adult position={SH(1.30, 0, 5.30)} rotationY={WEST} animation="walk" animDistance={0.6} face="calm" />
          <Adult position={SH(1.80, 0, 6.40)} rotationY={WEST} animation="idle" face="calm" />
          <Hero position={SH(2.60, 0, 8.20)} rotationY={NORTH} animation="walk" animDistance={1.4} face="calm" />
        </>
      ),
    },
    {
      cue: "7.queue",
      // Her, from the side, at the front of it.
      ...cam.push({ on: [59.70, 1.30, 4.60], dist: 3.09, to: 2.39, yaw: -25, pitch: 2, fov: 44 }),
      zone: "shop",
      look: "overworld-night",
      note: "Her, at the front of the queue, not going in: the woman everybody walks past, and the one person in the film who is not in a hurry.",
      stage: () => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={NORTH} animation="idle" face="smile" gaze={0} />
          <Adult position={SH(0.90, 0, 5.60)} rotationY={WEST} animation="walk" animDistance={0.5} face="calm" />
        </>
      ),
    },
    {
      cue: "7.let",
      // Over her shoulder: him going in first, and her looking at him a bit too long.
      ...cam.push({ on: [60.30, 1.32, 7.00], dist: 3.00, to: 2.45, yaw: -6, pitch: 3, fov: 46 }),
      zone: "shop",
      look: "overworld-night",
      note: "Her hand out, letting him go first, and her face while she does it: she knows exactly who he is and he does not notice.",
      stage: (t) => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={WEST} animation="point" face="smile" headYaw={0} />
          <Hero position={SH(1.10, 0, 4.90)} rotationY={WEST} animation="walk" animDistance={t * 0.9} face="smile" />
        </>
      ),
    },
    {
      cue: "7.went",
      // He uses the shop door to go home. The lens stays outside and watches him do it.
      ...cam.push({ on: [60.00, 1.30, 4.00], dist: 2.40, to: 1.80, yaw: 180, pitch: 0, fov: 46 }),
      zone: "shop",
      look: "overworld-night",
      note: "He goes in through the shop door and is not in the shop: the lens stays on the pavement, so the trick happens to somebody else's back.",
      stage: (t) => (
        <>
          <Hero position={SH(0.10, 0, 4.20 - ramp(t, SHOP_DOOR, SHOP_DOOR + 0.8) * 0.5)} rotationY={NORTH} animation="walk" animDistance={t * 1.1} face="calm" />
        </>
      ),
    },
    {
      cue: "8.wall",
      // THE HALLWAY, with the writing revealed: the lens finds it, and so does he.
      ...cam.push({ on: H(0.72, 1.45, 2.30), dist: 1.59, to: 1.04, yaw: -46, pitch: -4, fov: 46 }),
      zone: "hall",
      look: "overworld-night",
      note: "The wall of the hallway, and it is covered in pencil: the same cramped numbers he writes on his palm, in rows.",
      stage: (t) => (
        <>
          <Writing at={H(0.74, 1.30, 2.30)} t={t} from={WRITING} />
          <Hero position={H(-0.35, 0, 3.10)} rotationY={WEST} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "8.same",
      // The same hand: a close-up of two lines, so the viewer can check.
      ...cam.push({ on: H(0.72, 1.36, 2.40), dist: 1.18, to: 0.68, yaw: -65, pitch: 2, fov: 36 }),
      zone: "hall",
      look: "overworld-night",
      note: "Two lines of the writing, close: the number four, then the same number again, drawn the same way twice. It is his hand.",
      stage: () => <Writing at={H(0.74, 1.30, 2.40)} t={3} from={0} />,
    },
    {
      cue: "8.higher",
      // Up: the writing goes above his head, and he has to stand on the floor to reach it.
      ...cam.push({ on: H(0.20, 1.74, 2.55), dist: 2.10, to: 1.75, yaw: 0, pitch: 0, fov: 44 }),
      zone: "hall",
      look: "overworld-night",
      note: "Tilted up: the writing carries on above the height of a kid, so it was not written by one standing on the floor.",
      stage: (t) => (
        <>
          <Writing at={H(0.74, 1.30, 2.50)} t={t} from={0} high />
          <Hero position={H(-0.40, 0, 2.60)} rotationY={WEST} animation="reachUp" face="fear" />
        </>
      ),
    },
    {
      cue: "8.older",
      // Older: the dust, the fading, and the same shapes.
      ...cam.push({ on: H(0.72, 1.60, 2.70), dist: 1.03, to: 0.58, yaw: -96, pitch: -6, fov: 38 }),
      zone: "hall",
      look: "overworld-night",
      note: "Grazed so close that the pencil is grey in the grain of the paint: the same handwriting, and the wall has been waiting.",
      stage: () => <Writing at={H(0.74, 1.45, 2.70)} t={2} from={0} />,
    },
    {
      cue: "8.copied",
      // Mum's height: the row that is out of reach, and it is hers.
      ...cam.push({ on: H(0.70, 1.60, 2.50), dist: 2.18, to: 1.48, yaw: -34, pitch: -7, fov: 46 }),
      zone: "hall",
      look: "overworld-night",
      note: "The top row of numbers, at his mother's height: she copied his map so she would know which door he was going to take.",
      stage: (t) => (
        <>
          <Writing at={H(0.74, 1.30, 2.50)} t={t} from={0} high />
          <Hero position={H(-0.30, 0, 3.40)} rotationY={WEST} animation="idle" face="fear" />
        </>
      ),
    },
    {
      cue: "8.wait",
      // The line under it, and nobody has written it yet.
      ...cam.push({ on: H(0.73, 1.10, 2.60), dist: 1.13, to: 0.63, yaw: -90, pitch: 5, fov: 40 }),
      zone: "hall",
      look: "overworld-night",
      note: "Under every other line, one long pencil stroke that stops: a line he has not written yet, and the room has already answered it.",
      stage: (t) => (
        <>
          <Block size={[0.014, 0.03, 0.62]} position={H(0.745, 1.12, 2.40)} color="#3a342c" castShadow={false} opacity={pop(t, NOTYET)} />
        </>
      ),
    },
    {
      cue: "9.back",
      // Back to the shop, six the next evening: the same queue, wider.
      ...cam.push({ on: [59.60, 1.40, 4.60], dist: 6.02, to: 5.27, yaw: 15, pitch: 0, fov: 50 }),
      zone: "shop",
      look: "overworld-day",
      note: "The shop again, in daylight, and the queue is in the same place: the pavement has not been empty since nine last night.",
      stage: () => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={NORTH} animation="idle" face="calm" />
          <Adult position={SH(0.90, 0, 5.40)} rotationY={WEST} animation="idle" face="calm" />
          <Adult position={SH(1.60, 0, 6.40)} rotationY={WEST} animation="idle" face="uneasy" />
          <Hero position={SH(3.20, 0, 7.60)} rotationY={WEST} animation="walk" animDistance={1.0} face="uneasy" />
        </>
      ),
    },
    {
      cue: "9.still",
      // The queue, from the side, not moving.
      ...cam.push({ on: [59.60, 1.30, 4.70], dist: 3.86, to: 2.86, yaw: -31, pitch: 1, fov: 48 }),
      zone: "shop",
      look: "overworld-day",
      note: "The same queue in daylight, the same order, the same woman at the front: time has passed and the queue has not.",
      stage: () => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={NORTH} animation="idle" face="calm" />
          <Adult position={SH(1.00, 0, 5.60)} rotationY={WEST} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "9.same",
      // Her, same coat, same place, and she is the one who has been letting people past all day.
      ...cam.push({ on: [59.90, 1.25, 4.60], dist: 1.89, to: 1.19, yaw: 32, pitch: 2, fov: 44 }),
      zone: "shop",
      look: "overworld-day",
      note: "Her at the front, in the same coat, in the same light: the one person who has paid for every door he took, all day.",
      stage: () => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={WEST} animation="idle" face="smile" gaze={0} />
        </>
      ),
    },
    {
      cue: "9.all",
      // The whole pavement, from across the road: the queue, and him walking past it.
      ...cam.push({ on: [59.40, 1.30, 4.50], dist: 4.86, to: 4.11, yaw: 32, pitch: 2, fov: 48 }),
      zone: "shop",
      look: "overworld-day",
      note: "Across the road: the queue on the pavement, and him walking past it the way you walk past a thing you have not understood.",
      stage: () => (
        <>
          <Woman position={SH(-0.20, 0, 4.50)} rotationY={NORTH} animation="idle" face="calm" />
          <Adult position={SH(1.00, 0, 5.60)} rotationY={WEST} animation="idle" face="calm" />
          <Hero position={SH(2.20, 0, 7.20)} rotationY={WEST} animation="walk" animDistance={1.2} face="uneasy" />
        </>
      ),
    },
    {
      cue: "10.hand",
      // His hand, next to the writing, at the same height, and it fits.
      ...cam.push({ on: H(0.74, 1.42, 2.35), dist: 1.15, to: 0.65, yaw: -83, pitch: -1, fov: 40 }),
      zone: "hall",
      look: "overworld-night",
      note: "His palm against the wall, under the writing, at the same height and in the same hand: the film's one proof.",
      stage: (t) => (
        <>
          <Writing at={H(0.74, 1.30, 2.35)} t={2} from={0} />
          <Hero position={H(-0.30, 0, 2.35)} rotationY={WEST} animation="reach" face="uneasy" />
          <Block size={[0.02, 0.34, 0.22]} position={H(0.70, 1.28, 2.35)} color="#dba47c" opacity={pop(t, HANDON)} />
        </>
      ),
    },
    {
      cue: "10.mine",
      // The numbers, exactly as he writes them, so the camera has to be close enough to read them.
      ...cam.push({ on: H(0.74, 1.45, 2.50), dist: 1.11, to: 0.61, yaw: -100, pitch: 0, fov: 38 }),
      zone: "hall",
      look: "overworld-night",
      note: "The numbers themselves: 2.4, then a line, then 9, drawn the way he draws a nine. Close enough to compare.",
      stage: (t) => (
        <>
          <Writing at={H(0.74, 1.30, 2.50)} t={t} from={0} />
          <Block size={[0.02, 0.02, 0.44]} position={H(0.705, 1.44, 2.50)} color="#dba47c" opacity={MINE > 0 ? 1 : 0} />
        </>
      ),
    },
  ],
});

/**
 * The writing on the wall: rows of pencil numbers in a cramped kid's hand. `from` is the word at which it
 * starts to appear, `high` adds the row at his mother's height.
 */
const Writing: React.FC<{ at: [number, number, number]; t: number; from: number; high?: boolean }> = ({ at, t, from, high = false }) => (
  <group position={at}>
    {Array.from({ length: 26 }, (_, i) => {
      const row = Math.floor(i / 6);
      const col = i % 6;
      return (
        <Block
          key={i}
          size={[0.014, 0.05, 0.028 + (i % 4) * 0.012]}
          position={[0.006, -0.3 + row * 0.17 + (i % 2) * 0.01, -0.52 + col * 0.19]}
          color="#4a443c"
          castShadow={false}
          opacity={ramp(t, from + i * 0.012, from + 0.16 + i * 0.012)}
          transparent
        />
      );
    })}
    {high
      ? Array.from({ length: 7 }, (_, i) => (
          <Block
            key={`h${i}`}
            size={[0.014, 0.055, 0.03 + (i % 3) * 0.014]}
            position={[0.006, 0.52, -0.60 + i * 0.19]}
            color="#5a534a"
            castShadow={false}
            opacity={ramp(t, 0.05 + i * 0.03, 0.3 + i * 0.03)}
            transparent
          />
        ))
      : null}
  </group>
);

void OLDER;
void COPIED;
void DOOR;
void K;
void EAST;
void Friend;
