import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Crate, Dad, Drop, Hero, InHand, MopHead, PLACE, Plate2, STOOL, add, holdUp, seatedPose, timing, tw } from "./kit";
import { BEHIND, BEHIND_FACE, DAD_FACE, DAD_SIT } from "./scene3";
import { CRATE as SHOP_CRATE } from "./acts";

/**
 * 4. THE FIRST FAILURE. The first head I ever cut was my dad's, and it was one snip. "THAT'S FIXABLE!" is what I
 * said, and it was not: he wore a woolly hat to dinner until spring. The line comes back twice.
 */

const CHAIR = PLACE.armchair;
const TABLE = PLACE.table;
const DAD_TABLE: Vec3 = add(TABLE, 0, -0.07, -0.72);
const ME_TABLE: Vec3 = add(TABLE, 1.3, 0, 0.1);
const G = PLACE.garage;
/** In the garage the mop stands where a head would be, and my crate behind it: the same picture as the shop. */
export const MOP: Vec3 = add(G, 0, 0, 0);
export const G_CRATE: Vec3 = add(G, SHOP_CRATE[0], 0, SHOP_CRATE[2]);
export const G_ME_FACE: Vec3 = add(G_CRATE, 0, STOOL + 1.575 * 0.88, 0);

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The first failure",
  shots: [
    {
      cue: "4.okay",
      ...cam.push({ on: add(CHAIR, 0, 1.62, -0.3), dist: 2.9, to: 2.55, yaw: -10, pitch: 3, fov: 40 }),
      zone: "tv",
      look: "overworld-night",
      note: "The damage, and both faces stacked: the stripe down Dad's head and my panic above it.",
      stage: (t) => (
        <>
          <Dad position={DAD_SIT} top="stripe" pose={seatedPose(t)} face="surprised" gaze={0} />
          <Crate position={BEHIND} />
          <Hero position={add(BEHIND, 0, STOOL, 0)} animation="panic" face="scared" gaze={0}>
            <InHand rate={0} handle="#e8842a" scale={1.5} />
          </Hero>
        </>
      ),
    },
    {
      cue: "4.fixable",
      ...cam.push({ on: BEHIND_FACE, dist: 1.75, to: 1.45, yaw: 6, pitch: -2, fov: 36 }),
      zone: "tv",
      look: "overworld-night",
      note: "My face as I say the line the film keeps: a grin that believes none of it.",
      stage: (t) => (
        <>
          <Dad position={DAD_SIT} top="stripe" pose={seatedPose(t)} face="surprised" />
          <Crate position={BEHIND} />
          <Hero position={add(BEHIND, 0, STOOL, 0)} pose={holdUp(t, 0.2, 0.3)} face="grin" gaze={0} />
          <Drop position={add(BEHIND_FACE, 0.2, 0.12, 0.24)} t={t} every={0.6} fall={-0.3} size={0.04} />
        </>
      ),
    },
    {
      cue: "4.fixable",
      cut: 0.9,
      ...cam.push({ on: add(CHAIR, 0, 1.55, -0.2), dist: 2.6, to: 2.35, yaw: 12, pitch: 3, fov: 40 }),
      zone: "tv",
      look: "overworld-night",
      note: "Dad's hand goes to the top of his head while I hide the scissors behind my back.",
      stage: (t) => {
        const p = seatedPose(t);
        const up = tw(t, 0.05, 0.45);
        p.armR = [-2.75 * up, 0, 0.32 * up];
        const me = holdUp(t, 0, 0);
        me.armR = [0.7, 0, 0.2];
        return (
          <>
            <Dad position={DAD_SIT} top="stripe" pose={p} face={t < 0.6 ? "worried" : "scared"} gaze={0} />
            <Crate position={BEHIND} />
            <Hero position={add(BEHIND, 0, STOOL, 0)} pose={me} face="uneasy" gaze={0} />
          </>
        );
      },
    },
    {
      cue: "4.fixable",
      cut: 2.1,
      ...cam.push({ on: add(DAD_FACE, 0, 0.12, 0), dist: 2.0, to: 1.7, yaw: -8, pitch: 2, fov: 38 }),
      zone: "tv",
      look: "overworld-night",
      note: "He turns his head, slowly, and I sink out of sight behind the chair.",
      stage: (t) => (
        <>
          <Dad position={DAD_SIT} top="stripe" pose={seatedPose(t)} face="angry" gaze={0} headYaw={tw(t, 0.15, 0.95) * 0.9} />
          <Crate position={BEHIND} />
          <Hero position={add(BEHIND, 0, STOOL - tw(t, 0.5, 1.1) * 0.95, 0)} face="scared" gaze={0} />
        </>
      ),
    },
    {
      cue: "4.not",
      ...cam.push({ on: add(DAD_FACE, 0, 0.1, 0), dist: 1.9, to: 1.6, yaw: 0, pitch: 38, fov: 38 }),
      zone: "tv",
      look: "overworld-night",
      note: "From above, the stripe itself: the plainest proof that it was not fixable.",
      stage: (t) => <Dad position={DAD_SIT} top="stripe" pose={seatedPose(t)} face="blank" gaze={0} headPitch={-0.3} />,
    },
    {
      cue: "4.hat",
      ...cam.push({ on: add(TABLE, 0, 1.22, -0.5), dist: 2.8, to: 2.45, yaw: 6, pitch: 7, fov: 40 }),
      zone: "dinner",
      look: "overworld-night",
      note: "Dad eating dinner in a woolly hat, indoors: the cost of the first try, as a joke.",
      stage: (t) => {
        const p = seatedPose(t);
        p.armR = [-1.0 + Math.sin(t * 5) * 0.2, 0, 0.1];
        return (
          <>
            <Dad position={DAD_TABLE} top="hat" pose={p} face="frown" gaze={0} />
            <Plate2 position={add(TABLE, 0, 0.8, -0.2)} />
            <Plate2 position={add(TABLE, 0.7, 0.8, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "4.hat",
      cut: 1.2,
      ...cam.push({ on: add(ME_TABLE, 0, 1.36, 0), dist: 1.9, to: 1.65, yaw: 30, pitch: 2, fov: 38 }),
      zone: "dinner",
      look: "overworld-night",
      note: "My face at the end of the table, looking anywhere else: I know whose fault the hat is.",
      stage: (t) => (
        <>
          <Dad position={DAD_TABLE} top="hat" pose={seatedPose(t)} face="frown" headYaw={0.7} />
          <Plate2 position={add(TABLE, 0, 0.8, -0.2)} />
          <Plate2 position={add(TABLE, 0.7, 0.8, 0.1)} />
          <Hero position={ME_TABLE} rotationY={-0.5} face="uneasy" gaze={t < 0.6 ? 1 : -1} />
        </>
      ),
    },
    {
      cue: "4.hat",
      cut: 2.4,
      ...cam.push({ on: add(CHAIR, 0, 1.25, 0), dist: 2.8, to: 2.5, yaw: -12, pitch: 5, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "The hat again, in the armchair with the paper: until spring means every single day.",
      stage: (t) => {
        const p = seatedPose(t);
        p.armR = [-1.25, 0, -0.25];
        p.armL = [-1.25, 0, 0.25];
        return (
          <>
            <Dad position={DAD_SIT} top="hat" pose={p} face="frown" gaze={0} />
            <Block position={add(CHAIR, 0, 1.0, 0.52)} rotation={[-0.35, 0, 0]} size={[0.62, 0.42, 0.015]} color="#e9e6da" />
            <Block position={add(CHAIR, 0, 1.06, 0.535)} rotation={[-0.35, 0, 0]} size={[0.5, 0.06, 0.012]} color="#2a2c33" castShadow={false} />
          </>
        );
      },
    },
    {
      cue: "4.hat",
      cut: 3.5,
      ...cam.push({ on: add(G, 0, 1.45, 0), dist: 3.7, to: 3.3, yaw: 12, pitch: 4, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "The garage: a mop in a bucket with a face on it. A head nobody has to wear to dinner.",
      stage: (t) => (
        <>
          <MopHead position={MOP} face="dots" />
          <Crate position={G_CRATE} />
          <Hero {...(t < 0.7 ? { position: add(G_CRATE, 1.6 - tw(t, 0, 0.7) * 1.0, 0, 0.1), rotationY: -Math.PI / 2, animation: "walk" as const, animDistance: t * 1.4 } : { position: add(G_CRATE, 0, STOOL, 0) })} face="brave">
            <InHand rate={0} handle="#e8842a" scale={1.5} />
          </Hero>
        </>
      ),
    },
    {
      cue: "4.hat",
      cut: 4.6,
      ...cam.push({ on: add(G, 0, 1.72, 0), dist: 2.7, to: 2.4, yaw: -8, pitch: 2, fov: 40 }),
      zone: "garage",
      look: "overworld-night",
      note: "The mop's worried face under mine, and two clicks of the scissors: the training starts.",
      stage: (t) => (
        <>
          <MopHead position={MOP} face="worried" />
          <Crate position={G_CRATE} />
          <Hero position={add(G_CRATE, 0, STOOL, 0)} pose={holdUp(t, 1.15, 0.42)} face="brave" gaze={0}>
            <InHand t={t} rate={t > 0.3 && t < 1.0 ? 3 : 0} handle="#e8842a" scale={1.5} />
          </Hero>
        </>
      ),
    },
  ],
});
