import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Crate, Dad, Drop, HAIR, HairFly, Hero, InHand, ME_SCALE, PLACE, STOOL, Scissors, Sparkle, Television, add, holdUp, pop, seatedPose, timing, tw, w } from "./kit";

/**
 * 3. THE DREAM. What I saw, once, on television: a barber turn a chair round, and the grown man in it cry because
 * he was happy. Then the kitchen scissors, and the only head in the house that was asleep.
 */

const TV = PLACE.tv;
const SCREEN: Vec3 = add(TV, 0.09, 1.08, 0);
const ON_SOFA: Vec3 = add(PLACE.sofa, -0.06, -0.08, 0);
const SOFA_FACE: Vec3 = add(ON_SOFA, 0, (1.575 - 0.125) * ME_SCALE, 0);
const CHAIR = PLACE.armchair;
export const DAD_SIT: Vec3 = add(CHAIR, 0, -0.13, 0.04);
export const DAD_FACE: Vec3 = add(CHAIR, 0, 1.32, 0.06);
export const BEHIND: Vec3 = add(CHAIR, 0, 0, -0.82);
export const BEHIND_FACE: Vec3 = add(BEHIND, 0, STOOL + 1.575 * ME_SCALE, 0);
const DRAWER = PLACE.drawer;
/** The three HUS of the first chant, in seconds from the start of its cue. */
const H3 = [0, 1, 2].map((i) => w("3.hus", "HUS", i));

/** A block of a television picture: it glows in its own colour. Screen space: x right, y up, z out of the glass. */
const P: React.FC<{ at: [number, number]; size: [number, number]; c: string; z?: number; rot?: number }> = ({ at, size, c, z = 0.01, rot = 0 }) => (
  <Block position={[at[0], at[1], z]} rotation={[0, 0, rot]} size={[size[0], size[1], 0.004]} color={c} emissive={c} emissiveIntensity={0.14} castShadow={false} receiveShadow={false} />
);

/** The programme: a barber spins the chair, and the man in it has a new head. `t` from the start of the show. */
const Show: React.FC<{ t: number; smile?: boolean }> = ({ t, smile = false }) => {
  const spin = tw(t, 0.15, 0.85);
  const turn = Math.cos(spin * Math.PI * 4);
  const done = spin > 0.5;
  const cry = t > 1.0;
  return (
    <>
      <P at={[0, 0]} size={[1.5, 0.9]} c="#5a3fa8" z={0.002} />
      <P at={[0, -0.36]} size={[1.5, 0.18]} c="#2a1f4a" z={0.004} />
      {[-0.55, 0.55].map((x) => (
        <P key={x} at={[x, 0.2]} size={[0.16, 0.5]} c="#7a5fd0" z={0.004} />
      ))}
      {/* the barber, behind the chair */}
      <P at={[0.25, -0.1]} size={[0.15, 0.34]} c="#f4f4f0" z={0.006} />
      <P at={[0.25, 0.15]} size={[0.13, 0.13]} c="#e0ac7e" z={0.006} />
      <P at={[0.25, 0.225]} size={[0.14, 0.04]} c="#1f1a18" z={0.008} />
      <P at={[0.25, 0.115]} size={[0.1, 0.025]} c="#1f1a18" z={0.008} />
      <P at={[0.15, 0.02 + Math.sin(t * 9) * 0.01]} size={[0.12, 0.04]} c="#f4f4f0" z={0.008} rot={0.5} />
      {/* the chair, and the man in it: he turns with it */}
      <group scale={[Math.abs(turn) < 0.12 ? 0.12 : Math.abs(turn), 1, 1]}>
        <P at={[0, -0.2]} size={[0.3, 0.26]} c="#c8362e" z={0.01} />
        <P at={[0, -0.33]} size={[0.06, 0.1]} c="#c9d0d8" z={0.009} />
        <P at={[0, -0.14]} size={[0.26, 0.2]} c="#e9e6da" z={0.012} />
        <P at={[0, 0.04]} size={[0.2, 0.2]} c="#e2b08a" z={0.014} />
        {done ? (
          <>
            <P at={[0, 0.15]} size={[0.21, 0.06]} c="#3a2414" z={0.016} />
            <P at={[0.03, 0.185]} size={[0.14, 0.03]} c="#3a2414" z={0.016} />
          </>
        ) : (
          <>
            <P at={[0, 0.17]} size={[0.32, 0.14]} c="#3a2414" z={0.016} />
            <P at={[-0.13, 0.08]} size={[0.08, 0.2]} c="#3a2414" z={0.016} />
            <P at={[0.13, 0.06]} size={[0.07, 0.24]} c="#3a2414" z={0.016} />
            <P at={[0.05, 0.26]} size={[0.08, 0.1]} c="#3a2414" z={0.016} rot={0.4} />
          </>
        )}
        <P at={[-0.05, 0.06]} size={[0.035, 0.035]} c="#16161c" z={0.018} />
        <P at={[0.05, 0.06]} size={[0.035, 0.035]} c="#16161c" z={0.018} />
        {smile ? (
          <>
            <P at={[0, -0.02]} size={[0.1, 0.02]} c="#7a2a1e" z={0.018} />
            <P at={[-0.055, -0.005]} size={[0.02, 0.03]} c="#7a2a1e" z={0.018} />
            <P at={[0.055, -0.005]} size={[0.02, 0.03]} c="#7a2a1e" z={0.018} />
          </>
        ) : (
          <P at={[0, -0.015]} size={[0.05, cry ? 0.04 : 0.02]} c="#7a2a1e" z={0.018} />
        )}
      </group>
      {cry
        ? [-1, 1].map((s) => <Drop key={s} position={[s * 0.05, 0.035, 0.022]} t={t - 1} every={0.42} fall={-0.13} size={0.022} color="#9fe0ff" phase={s > 0 ? 0.2 : 0} />)
        : null}
      {done ? <Sparkle position={[0.13, 0.2, 0.03]} k={pop(t, 0.62, 0.2)} size={0.12} /> : null}
    </>
  );
};

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The dream",
  shots: [
    {
      cue: "3.tv",
      ...cam.push({ on: SOFA_FACE, dist: 2.2, to: 1.8, yaw: -82, pitch: 1, fov: 36 }),
      zone: "tv",
      look: "overworld-night",
      note: "My face in the light of the television: this is the moment the whole year comes from.",
      stage: (t) => (
        <>
          <Television position={TV} rotationY={Math.PI / 2}>
            <Show t={0} />
          </Television>
          <Hero position={ON_SOFA} rotationY={-Math.PI / 2} pose={seatedPose(t)} face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "3.cry",
      ...cam.push({ on: add(SCREEN, 0, -0.03, 0), dist: 2.1, to: 1.75, yaw: 90, pitch: 0, fov: 36 }),
      zone: "tv",
      look: "overworld-night",
      note: "What I saw: the barber spins the chair and the man in it has a different head.",
      stage: (t) => (
        <Television position={TV} rotationY={Math.PI / 2}>
          <Show t={t} />
        </Television>
      ),
    },
    {
      cue: "3.cry",
      cut: 1.25,
      ...cam.push({ on: add(SCREEN, 0, 0.03, 0), dist: 1.1, to: 0.9, yaw: 90, pitch: 0, fov: 36 }),
      zone: "tv",
      look: "overworld-night",
      note: "Closer on the screen: the grown man's tears, which is the thing I could not get over.",
      stage: (t) => (
        <Television position={TV} rotationY={Math.PI / 2}>
          <Show t={t + 1.25} />
        </Television>
      ),
    },
    {
      cue: "3.happy",
      ...cam.push({ on: add(SCREEN, 0, 0.03, 0), dist: 0.85, to: 0.72, yaw: 90, pitch: 0, fov: 36 }),
      zone: "tv",
      look: "overworld-night",
      note: "Closer again, and he is smiling: the tears are happy ones. That is the power I wanted.",
      stage: (t) => (
        <Television position={TV} rotationY={Math.PI / 2}>
          <Show t={t + 2.6} smile />
        </Television>
      ),
    },
    {
      cue: "3.wanted",
      ...cam.push({ on: SOFA_FACE, dist: 1.7, to: 1.35, yaw: -84, pitch: 0, fov: 36 }),
      zone: "tv",
      look: "overworld-night",
      note: "Back on me, and the wonder turns into a decision: the face changes on the word WANTED.",
      stage: (t) => (
        <>
          <Television position={TV} rotationY={Math.PI / 2}>
            <Show t={4} smile />
          </Television>
          <Hero position={ON_SOFA} rotationY={-Math.PI / 2} pose={seatedPose(t)} face={t < 0.45 ? "wow" : "brave"} gaze={0} />
        </>
      ),
    },
    {
      cue: "3.wanted",
      cut: 0.8,
      ...cam.push({ on: add(DRAWER, 0.4, 1.05, 0.35), dist: 2.9, to: 2.5, yaw: 6, pitch: 9, fov: 40 }),
      zone: "tv",
      look: "overworld-night",
      note: "No words: the drawer, and the only scissors in the house, far too big for a kid.",
      stage: (t) => {
        const out = tw(t, 0.04, 0.24);
        const lift = tw(t, 0.24, 0.5);
        return (
          <>
            <Television position={TV} rotationY={Math.PI / 2}>
              <Show t={4} smile />
            </Television>
            {/* the top drawer, coming out */}
            <Block position={add(DRAWER, 0, 0.74, 0.06 + out * 0.36)} size={[1.3, 0.2, 0.56]} color="#d8cfb8" />
            <Block position={add(DRAWER, 0, 0.74, 0.36 + out * 0.36)} size={[0.2, 0.04, 0.04]} color="#5c3f24" castShadow={false} />
            <group position={add(DRAWER, 0.3, 0.86 + lift * 0.75, 0.3 + out * 0.3)} rotation={[lift < 0.05 ? -1.45 : -1.45 + lift * 1.45, 0, 0.3 - lift * 0.3]}>
              <Scissors open={0.12} handle="#e8842a" scale={1.5} />
            </group>
            <Hero position={add(DRAWER, 1.0, 0, 0.75)} rotationY={-2.0} pose={holdUp(t, 0.25 + lift * 0.75, 0.2)} face="brave" gaze={0} />
          </>
        );
      },
    },
    {
      cue: "3.wanted",
      cut: 1.4,
      ...cam.push({ on: add(DRAWER, 1.0, 1.62, 1.0), dist: 2.6, to: 2.3, yaw: -6, pitch: -9, fov: 40 }),
      zone: "tv",
      look: "overworld-night",
      note: "Low angle, the scissors held up like a sword and a glint on them: he thinks he is ready.",
      stage: (t) => (
        <>
          <Television position={TV} rotationY={Math.PI / 2} on={false} />
          <Hero position={add(DRAWER, 1.0, 0, 1.0)} pose={holdUp(t, 1.45, 0.3)} face="brave" gaze={0} headPitch={-0.25}>
            <InHand t={t} rate={t > 0.15 ? 5 : 0} handle="#e8842a" scale={1.5} />
          </Hero>
          <Sparkle position={add(DRAWER, 0.72, 2.25, 1.25)} k={pop(t, 0.25, 0.25)} size={0.22} />
        </>
      ),
    },
    {
      cue: "3.wanted",
      cut: 1.92,
      ...cam.push({ on: add(CHAIR, 0, 1.62, -0.3), dist: 2.9, to: 2.6, yaw: -10, pitch: 3, fov: 40 }),
      zone: "tv",
      look: "overworld-night",
      note: "Dad asleep in his armchair, and me rising up behind it on a crate: the picture of the shop, the first time.",
      stage: (t) => {
        const up = tw(t, 0.1, 0.52);
        return (
          <>
            <Television position={TV} rotationY={Math.PI / 2} on={false} />
            <Dad position={DAD_SIT} pose={seatedPose(t, 1)} face="sleepy" blink={false} />
            <Crate position={BEHIND} />
            <Hero position={add(BEHIND, 0, STOOL - (1 - up) * 1.0, 0)} pose={holdUp(t, 1.2, 0.42)} face="brave" gaze={0}>
              <InHand t={t} rate={0} handle="#e8842a" scale={1.5} />
            </Hero>
          </>
        );
      },
    },
    {
      cue: "3.hus",
      ...cam.push({ on: add(DAD_FACE, 0, 0.22, 0), dist: 1.9, to: 1.6, yaw: 8, pitch: 12, fov: 38 }),
      zone: "tv",
      look: "overworld-night",
      note: "The chant, for the first time, on Dad: three snips, a strip of his hair is gone, and his eyes open.",
      stage: (t) => {
        const last = H3[2];
        const p = holdUp(t, 0, 0);
        p.armR = [-1.0 + (t < last + 0.05 ? Math.sin(t * 38) * 0.2 : 0), 0, 0.12];
        p.bodyPitch = 0.14;
        p.head = [0.4, 0, 0];
        return (
          <>
            <Dad position={DAD_SIT} top={t < last ? "hair" : "stripe"} pose={seatedPose(t, t < last + 0.22 ? 1 : 0)} face={t < last + 0.22 ? "sleepy" : "surprised"} blink={false} gaze={0} />
            <Crate position={BEHIND} />
            <Hero position={add(BEHIND, 0, STOOL, 0)} pose={p} face={t < last + 0.12 ? "brave" : "scared"} gaze={0}>
              <InHand t={t} rate={t < last + 0.05 ? 7 : 0} handle="#e8842a" scale={1.5} />
            </Hero>
            <HairFly position={add(DAD_FACE, 0, 0.3, 0.05)} t={t} at={H3} color={HAIR.dad} count={9} power={1.1} />
          </>
        );
      },
    },
  ],
});
