import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Cape, Crate, Friend1, Friend2, HAIR, HairFly, Hero, InHand, MopHead, PLACE, Plate, ShopDoor, Sparkle, WindowBoard, cuttingPose, faceOf, go, holdUp, pop, seatedPose, timing, tw, w, F1_SCALE, F2_SCALE } from "./kit";
import { CRATE, MY, MY_FACE, Me, SIT, SIT_TOP } from "./acts";

/**
 * 7. THE REUNION. The door bangs open and it is the two who knocked on mine every night for a year: one of them has
 * cut his own hair for the party. It is the head of frame one, and now we know whose it is and who is behind it.
 * "BRO. HOW?!" is answered this time, in one word. Then they ask what they always asked.
 */

const WIDE: Vec3 = [0, 1.72, 0];
/** Where the two of them stop, just inside the door. */
const F1_IN: Vec3 = [-1.55, 0, -3.1];
const F2_IN: Vec3 = [-2.25, 0, -3.5];
/** Where I am when they fall in: at the middle chair, my back to the door, looking in the mirror. */
const ME_FLOOR: Vec3 = [0.72, 0, 0.1];
const HUS = [0, 1, 2, 3, 4, 5].map((i) => w("7.hus", "HUS", i));
const SNIPS = [0, 1, 2, 3, 4, 5].map((i) => w("7.hus1", "HUS", i));
const END = [0, 1, 2, 3, 4, 5].map((i) => w("7.end", "HUS", i));

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The reunion",
  shots: [
    {
      cue: "7.help",
      ...cam.push({ on: [-1.9, 1.3, -3.4], dist: 3.5, to: 3.0, yaw: 9, pitch: 4, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The two friends fall in through the door, one of them hiding his head: they need help.",
      stage: (t) => (
        <>
          <ShopDoor open={tw(t, 0, 0.14)} />
          <Friend1 {...go([-2.3, 0, -4.9], F1_IN, tw(t, 0, 0.55))} animation={t < 0.55 ? "run" : "panic"} face="scared" />
          <Friend2 {...go([-2.3, 0, -5.9], F2_IN, tw(t, 0.1, 0.8))} hair="bush" animation={t < 0.8 ? "run" : "ache"} face="crying" />
        </>
      ),
    },
    {
      cue: "7.look",
      ...cam.push({ on: [F2_IN[0], 1.66, F2_IN[2]], dist: 2.5, to: 2.25, yaw: -6, pitch: 2, fov: 38 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The hair of frame one, and now we know whose it is: the hook is this scene, seen early.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend2 position={F2_IN} hair="bush" animation="ache" face="crying" gaze={0} />
        </>
      ),
    },
    {
      cue: "7.please",
      ...cam.push({ on: [F2_IN[0], 1.56, F2_IN[2]], dist: 1.9, to: 1.6, yaw: 8, pitch: 0, fov: 36 }),
      zone: "shopx",
      look: "overworld-day",
      note: "He says FIXABLE: my word, from the worst night of my year, now asked of me.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend2 position={F2_IN} hair="bush" animation="talk" face={t < w("7.please", "IS") ? "crying" : "worried"} gaze={0} headPitch={0.1} />
        </>
      ),
    },
    {
      cue: "7.please",
      cut: 1.2,
      ...cam.push({ on: faceOf(ME_FLOOR), dist: 1.75, to: 1.45, yaw: 5, pitch: 0, fov: 36 }),
      zone: "shopx",
      look: "overworld-day",
      note: "My face in the mirror as I hear the voice I heard at my door every night.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Hero job position={ME_FLOOR} pose={holdUp(t, 0.5, -0.3)} face={t < 0.25 ? "calm" : "smug"} gaze={t < 0.25 ? 0 : -1} headYaw={-tw(t, 0.2, 0.5) * 0.35}>
            <InHand rate={0} scale={1.1} />
          </Hero>
        </>
      ),
    },
    {
      cue: "7.wait",
      ...cam.push({ on: faceOf(F1_IN, F1_SCALE), dist: 1.7, to: 1.5, yaw: -8, pitch: 0, fov: 36 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The loud friend's face as he works out who the barber is.",
      stage: () => (
        <>
          <ShopDoor open={1} />
          <Friend1 position={F1_IN} animation="idle" face="surprised" gaze={0} />
          <Friend2 position={F2_IN} hair="bush" animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "7.weirdone",
      ...cam.push({ on: [-1.9, 1.55, -3.3], dist: 2.6, to: 2.3, yaw: 4, pitch: 2, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "Both of them staring and pointing: the name they gave me, said with respect this time.",
      stage: () => (
        <>
          <ShopDoor open={1} />
          <Friend1 position={F1_IN} animation="point" face="wow" gaze={0} />
          <Friend2 position={F2_IN} hair="bush" animation="idle" face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "7.weirdone",
      cut: 0.66,
      ...cam.push({ on: [0.5, 1.2, 0.1], dist: 3.6, to: 3.3, yaw: 192, pitch: 5, fov: 40 }),
      zone: "front",
      look: "overworld-day",
      note: "No words: I pat the back of the chair. The calm of somebody who has done this before.",
      stage: (t) => {
        const p = holdUp(t, 0.1, 0.3);
        p.armL = [-1.25 + Math.abs(Math.sin(t * 9)) * 0.3, 0, 0];
        return (
          <>
            <ShopDoor open={1} />
            <Hero job position={[0.5, 0, 0.3]} rotationY={-2.36} pose={p} face="smug" gaze={0}>
              <InHand rate={0} scale={1.1} />
            </Hero>
            <Crate position={CRATE} />
          </>
        );
      },
    },
    {
      cue: "7.hus1",
      ...cam.push({ on: WIDE, dist: 3.45, to: 3.05, yaw: 14, pitch: 3, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The picture of frame one again, in order this time, chant and all: six HUS and the bush is gone.",
      stage: (t) => {
        const end = SNIPS[5];
        const bush = 1 - tw(t, SNIPS[0], end + 0.12);
        const off = tw(t, end + 0.25, end + 0.55);
        return (
          <>
            <ShopDoor open={1} />
            <Friend2 position={SIT} hair={bush > 0.02 ? "bush" : "cut"} bush={bush} pose={seatedPose(t)} face={t < end + 0.25 ? "scared" : "wow"} gaze={0} />
            <Cape position={PLACE.chair} scale={0.96} off={off} />
            <Me t={t} fast={t < end + 0.15 ? 1 : 0} up={1.15} face={t < end + 0.2 ? "calm" : "smug"} />
            <HairFly position={SIT_TOP} t={t} at={SNIPS} color={HAIR.f2} count={10} power={1.25} />
            <Sparkle position={[0.3, 1.56, 0.35]} k={pop(t, end + 0.42, 0.2)} size={0.2} />
          </>
        );
      },
    },
    {
      cue: "7.bro",
      ...cam.push({ on: [0, 1.66, 0], dist: 2.2, to: 1.9, yaw: 13, pitch: 0, fov: 38 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The same face and the same question as the start, so the viewer feels the loop close.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend2 position={SIT} hair="cut" pose={seatedPose(t)} face={t < w("7.bro", "HOW") ? "surprised" : "wow"} gaze={0} headYaw={Math.sin(t * 9) * 0.14} />
          <Me t={t} fast={0} up={0.3} face="smug" />
        </>
      ),
    },
    {
      cue: "7.bro",
      cut: 1.18,
      ...cam.push({ on: MY_FACE, dist: 1.7, to: 1.4, yaw: 4, pitch: -2, fov: 36 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The same breath in as at the start: this time the film lets me answer.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend2 position={SIT} hair="cut" pose={seatedPose(t)} face="wow" />
          <Me t={t} fast={0} up={tw(t, 0.05, 0.3) * 1.2} face={t < 0.3 ? "smug" : "happy"} />
        </>
      ),
    },
    {
      cue: "7.training",
      ...cam.push({ on: MY_FACE, dist: 1.6, to: 1.2, yaw: 0, pitch: -1, fov: 34 }),
      zone: "shopx",
      look: "overworld-day",
      note: "My face, close, for the one word that answers the film: nothing else in the picture.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Me t={t} fast={0} up={0.2} face="calm" lines={false} />
        </>
      ),
    },
    {
      cue: "7.training",
      cut: 0.52,
      ...cam.push({ on: [-0.31, 1.42, -0.1], dist: 3.3, to: 3.2, yaw: 10, pitch: 0, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "Two blank faces and no sound at all: the word lands on them, and on the viewer.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend2 position={SIT} hair="cut" pose={seatedPose(0)} face="blank" gaze={0} blink={false} />
          <Friend1 position={[-0.62, 0, -0.25]} animation="idle" face="blank" gaze={0} blink={false} phase={0} />
        </>
      ),
    },
    {
      cue: "7.hus",
      ...cam.push({ on: WIDE, dist: 3.3, to: 3.0, yaw: -12, pitch: 3, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The chant again, on the loud friend now, with green hair flying: he wanted one too.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend1 position={SIT} hat={false} cut={t > HUS[3]} pose={seatedPose(t)} face="scared" gaze={0} />
          <Cape position={PLACE.chair} scale={F1_SCALE} />
          <Me t={t} fast={1} face="calm" />
          <HairFly position={SIT_TOP} t={t} at={HUS} color={HAIR.f1} count={10} power={1.25} />
        </>
      ),
    },
    {
      cue: "7.hus",
      cut: HUS[5] + 0.16,
      ...cam.push({ on: [0, 1.7, 0], dist: 2.75, to: 2.5, yaw: 10, pitch: 2, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "The cape comes off the second friend: both of them are ready for the party.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend1 position={SIT} cut pose={seatedPose(t)} face="wow" gaze={0} />
          <Cape position={PLACE.chair} scale={F1_SCALE} off={tw(t, 0.02, 0.3)} side={-1} />
          <Me t={t} fast={0} up={1.15} face="smug" />
          <Sparkle position={[0.3, 1.45, 0.35]} k={pop(t, 0.25, 0.2)} size={0.2} />
        </>
      ),
    },
    {
      cue: "7.coming",
      ...cam.push({ on: [-2.15, 1.3, -4.0], dist: 3.3, to: 3.0, yaw: 7, pitch: 3, fov: 40 }),
      zone: "shopx",
      look: "overworld-sunset",
      note: "At the door, hats on, waving me over: the question they asked every night for a year.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend1 position={[-2.05, 0, -3.9]} cut animation="wave" face="grin" gaze={0} />
          <Friend2 position={[-2.55, 0, -4.75]} hair="cut" hat animation="cheer" face="laugh" gaze={0} />
        </>
      ),
    },
    {
      cue: "7.no",
      ...cam.push({ on: faceOf(ME_FLOOR), dist: 1.8, to: 1.5, yaw: -5, pitch: 0, fov: 36 }),
      zone: "shopx",
      look: "overworld-sunset",
      note: "My face, and one word: no. Not sorry, not angry. The answer of every night, said out loud at last.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Hero job position={ME_FLOOR} pose={holdUp(t, 0.75, -0.3)} face="calm" gaze={0} headYaw={t > 0.3 ? Math.sin((t - 0.3) * 16) * 0.16 * Math.max(0, 1 - (t - 0.3) * 3) : 0}>
            <InHand rate={0} scale={1.1} />
          </Hero>
        </>
      ),
    },
    {
      cue: "7.no",
      cut: 0.5,
      ...cam.push({ on: [-2.15, 1.3, -4.0], dist: 3.2, to: 3.0, yaw: 7, pitch: 3, fov: 40 }),
      zone: "shopx",
      look: "overworld-sunset",
      note: "The two of them at the door, the waving stopped dead: two blank faces, then a look at each other.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Friend1 position={[-2.05, 0, -3.9]} cut animation={t > 0.3 ? "shrug" : "idle"} face="blank" gaze={0} blink={false} headYaw={t > 0.3 ? -0.8 : 0} />
          <Friend2 position={[-2.55, 0, -4.75]} hair="cut" hat animation="idle" face="blank" gaze={0} blink={false} headYaw={t > 0.36 ? 0.8 : 0} />
        </>
      ),
    },
    {
      cue: "7.no",
      cut: 1.08,
      ...cam.push({ on: WIDE, dist: 3.5, to: 3.2, yaw: 14, pitch: 3, fov: 40 }),
      zone: "shop",
      look: "overworld-sunset",
      note: "They are gone, and the mop is in the chair in a cape: the scissors go up. This is my party.",
      stage: (t) => (
        <>
          <MopHead position={[0, 0.2, 0.02]} bucket={false} face="worried" />
          <Cape position={PLACE.chair} scale={0.96} />
          <Me t={t} fast={0} up={tw(t, 0.05, 0.4) * 1.2} face="smug" />
        </>
      ),
    },
    {
      cue: "7.end",
      ...cam.push({ on: [0, 1.7, 0], dist: 2.6, to: 2.3, yaw: -13, pitch: 1, fov: 40 }),
      zone: "shop",
      look: "overworld-sunset",
      note: "The first sound of the film is its last: the chant on the mop, four HUS and then two at once.",
      stage: (t) => (
        <>
          <MopHead position={[0, 0.2, 0.02]} bucket={false} face="worried" hair={1 - tw(t, END[0], END[5] + 0.1) * 0.72} />
          <Cape position={PLACE.chair} scale={0.96} />
          <Me t={t} fast={1} face="happy" />
          <HairFly position={SIT_TOP} t={t} at={END} color="#f6f1e2" count={10} power={1.25} />
        </>
      ),
    },
    {
      cue: "7.end",
      cut: END[5] + 0.16,
      ...cam.push({ on: WIDE, dist: 3.45, to: 3.15, yaw: -9, pitch: 3, fov: 40 }),
      zone: "shop",
      look: "overworld-sunset",
      note: "The last picture is held: the mop, done; me, content; the meme's line over us; and two clicks of the scissors.",
      stage: (t) => (
        <>
          <MopHead position={[0, 0.2, 0.02]} bucket={false} face="happy" hair={0.28} />
          <Cape position={PLACE.chair} scale={0.96} />
          <Me t={t} fast={0} up={1.15} face="smug" />
          <Sparkle position={[0.3, 1.6, 0.35]} k={pop(t, 0.08, 0.2)} size={0.3} />
          <Plate lines={["WHILE THEY'RE", "OUT PARTYING BTW"]} position={[-0.03, 2.44, 0.3]} width={0.84} k={Math.min(1, pop(t, 0.3, 0.18) + (t > 0.48 ? 1 : 0))} />
        </>
      ),
    },
  ],
});

void cuttingPose;
void MY;
void F2_SCALE;
