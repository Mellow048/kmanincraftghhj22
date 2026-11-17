import { cam, storyScene } from "../../engine";
import {
  Bottle, Bro, Bubble, Cellar, EAST, Fill, HandLantern, KID, Life, Loaf, Lying, Me, NORTH, OurRoom, PLACE, PixelText, Puffs, SOUTH, STEP, SoundRings, Splash, TEEN, TownSet, WEST, WoodSword,
  bonk, chest, face, hop, pop, skyAt, timing, tw, w,
} from "./kit";

/** 04–05 — The knock under the floor. He was behind the bars, and he still handed me the sword handle first. I tried to fix him. */
const LAMP: [number, number, number] = [0.75, 0, 0.2];
export const LOAF: [number, number, number] = [0.2, 0.02, -0.8];
const BED_SIT: [number, number, number] = [PLACE.myBed[0], 0.5, PLACE.myBed[2] + 0.55];
const sword = <WoodSword position={[0, -0.16, 0.13]} />;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Knock. Knock.",
  shots: [
    {
      cue: "4.bed",
      ...cam.top({ on: [0, 0.4, -0.75], height: 6.2, to: 5.6, fov: 44 }),
      zone: "room",
      look: "lantern-night",
      note: "From straight above: two beds with a wall between them. The kid is in the right one, on his back, with his head turned to the wall. The left one is made and flat.",
      stage: (t) => (
        <>
          <OurRoom night />
          <Lying position={[PLACE.myBed[0], 0.62, PLACE.myBed[2] + 0.85]}>
            <Me position={[0, 0, 0]} turn={-0.9 * tw(t, 0.3, 1.0)} />
          </Lying>
          <Fill at={[0, 3.2, 0.4]} power={22} />
        </>
      ),
    },
    {
      cue: "4.heard",
      ...cam.push({ on: [0.85, 0.6, 0.2], dist: 3.5, to: 3.1, yaw: 10, pitch: 12, fov: 44 }),
      zone: "room",
      look: "lantern-night",
      note: "Low, at the level of the floor. The boards in front of his bed jump. He sits up and looks down at them.",
      stage: (t) => {
        const a = w("4.heard", "heard");
        return (
          <>
            <OurRoom night shake={bonk(t, a, 0.2)} />
            <Me position={BED_SIT} rotationY={SOUTH} sit nod={tw(t, a + 0.15, a + 0.5) * 0.5} />
            {t > a ? <SoundRings position={[0.9, 0.1, 0.95]} t={t - a} color="#ffe6b0" reach={0.9} /> : null}
            <Fill at={[0.8, 2.2, 2.6]} power={20} />
          </>
        );
      },
    },
    {
      cue: "4.two",
      ...cam.push({ on: [0.95, 0.15, 1.05], dist: 3.3, to: 2.9, yaw: -12, pitch: 46, fov: 42 }),
      zone: "room",
      look: "lantern-night",
      note: "The boards, from above, close. They jump twice, and the word KNOCK comes up off them each time.",
      stage: (t) => {
        const a = w("4.two", "Knock", 0);
        const b = w("4.two", "Knock", 1);
        return (
          <>
            <OurRoom night shake={bonk(t, a, 0.2) + bonk(t, b, 0.2)} />
            {[a, b].map((at, i) =>
              t > at ? (
                <group key={i}>
                  <PixelText text="KNOCK" position={[0.7 + i * 0.5, 0.35 + (t - at) * 0.4, 0.85 + i * 0.5]} rotation={[-0.8, -0.2, 0]} height={0.15 * pop(t, at, 0.1)} color="#ffe27a" />
                  <Puffs position={[0.9, 0.05, 0.95 + i * 0.3]} count={4} spread={0.5} size={0.1} rise={0.5} speed={1.6} color="#d8cdb8" />
                </group>
              ) : null,
            )}
            <Fill at={[0.8, 2.2, 2.6]} power={22} />
          </>
        );
      },
    },
    {
      cue: "4.his",
      ...cam.push({ on: [0, 1.0, 0.0], dist: 4.6, to: 4.2, yaw: 0, pitch: 9, fov: 44 }),
      zone: "room",
      look: "warm-room",
      note: "A memory, in warm light: the wall between the beds, edge on. On the left the big brother bumps it twice with his shoulder. On the right the kid bumps back.",
      stage: (t) => {
        const a = w("4.his", "knock");
        const k1 = bonk(t, a, 0.18) + bonk(t, a + 0.28, 0.18);
        const k2 = bonk(t, a + 0.8, 0.18) + bonk(t, a + 1.08, 0.18);
        return (
          <>
            <OurRoom />
            <Bro position={[-0.66 + k1 * 0.2, 0, 0.75]} rotationY={SOUTH + 0.3} turn={0.6} />
            <Me position={[0.6 - k2 * 0.2, 0, 0.75]} rotationY={SOUTH - 0.3} tilt={-0.15} turn={t > a + 0.5 ? -0.6 : 0} />
            {[a + 0.06, a + 0.34].map((at, i) => (t > at && t < at + 0.5 ? <SoundRings key={i} position={[0.14, 1.0, 0.55]} rotationY={EAST} t={t - at} color="#fff0c0" reach={0.6} /> : null))}
            {[a + 0.86, a + 1.14].map((at, i) => (t > at && t < at + 0.5 ? <SoundRings key={i} position={[-0.14, 0.85, 0.55]} rotationY={WEST} t={t - at} color="#ffd9a0" reach={0.6} /> : null))}
            <Fill at={[0, 1.8, 3.4]} power={36} />
          </>
        );
      },
    },
    {
      cue: "4.lantern",
      ...cam.push({ on: [-1.95, 1.45, 1.35], dist: 5.0, to: 4.5, yaw: 90, pitch: 5, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The cellar stairs from the side. The kid comes down them one step at a time with the lantern held out in front of him. Everything past the lantern is black.",
      stage: (t) => {
        const k = 4.6 - tw(t, 0.05, 1.5) * 3.6;
        const s = STEP(Math.round(k));
        return (
          <>
            <Cellar walls="nws" door={0.6} day="#3a4a7a" />
            <Me position={[s[0], s[1] + hop(t % 0.4, 0.05, 0.06, 0.2), s[2]]} rotationY={NORTH} carry={<HandLantern position={[0, 0, 0.04]} light={22} scale={0.85} />} nod={0.15} />
            <Fill at={[2.6, 2.0, 1.6]} power={18} />
          </>
        );
      },
    },
    {
      cue: "4.bars",
      ...cam.push({ on: [-0.25, 1.15, -0.7], dist: 3.7, to: 3.0, yaw: -12, pitch: 3, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Past the kid's shoulder: the bars, and somebody coming out of the dark behind them into the lantern light. It is his brother, green.",
      stage: (t) => (
        <>
          <Cellar />
          <Bro position={[PLACE.bro[0], 0, -1.9 + tw(t, 0.1, 0.9) * 0.9]} rotationY={SOUTH} green={1} bitten walk={t} arms={{ hold: sword }} />
          <Me position={[0.55, 0, 0.95]} rotationY={NORTH + 0.3} carry={<HandLantern position={[0, 0, 0.04]} light={20} scale={0.85} />} />
          <Fill at={[0.4, 2.0, 2.0]} power={8} />
        </>
      ),
    },
    {
      cue: "4.groan",
      ...cam.push({ on: face(PLACE.bro, TEEN), dist: 2.0, to: 1.7, yaw: 8, pitch: 0, fov: 38 }),
      zone: "cellar",
      look: "lantern-night",
      note: "His face between two bars, close. Red eyes. His head goes over to one side like a dog's, and he groans.",
      stage: (t) => (
        <>
          <Cellar />
          <Bro position={PLACE.bro} rotationY={SOUTH} green={1} bitten tilt={tw(t, 0.4, 0.9) * 0.3} arms={{ r: -0.5, hold: sword }} />
          <Bubble text="UUUH." position={[PLACE.bro[0] + 0.3, 1.8, -0.3]} scale={0.3 * pop(t, w("4.groan", "groaned"), 0.14)} tail={-1} dark />
          <HandLantern position={LAMP} light={18} />
          <Fill at={[0.4, 1.8, 1.4]} power={12} />
        </>
      ),
    },
    {
      cue: "4.sword",
      ...cam.push({ on: [-0.17, 1.0, -0.3], dist: 3.9, to: 3.3, yaw: 50, pitch: 4, fov: 42 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From the side, across the bars: him behind them, the kid in front. He still has the wooden sword in his hand. He lifts it and holds it out between the bars with the handle towards the kid.",
      stage: (t) => {
        const a = w("4.sword", "held");
        const up = tw(t, a - 0.1, a + 0.4);
        return (
          <>
            <Cellar walls="nws" />
            <Bro position={PLACE.bro} rotationY={SOUTH} green={1} bitten arms={{ l: -1.5, r: -0.5 - up * 1.0, hold: sword }} nod={0.2 * (1 - up)} />
            <Me position={[PLACE.me[0], 0, 0.6]} rotationY={NORTH} lookAt={[-0.17, 1.0, -0.4]} />
            <HandLantern position={[-0.95, 0, 0.3]} light={20} />
            <Fill at={[2.4, 1.8, 1.2]} power={14} />
          </>
        );
      },
    },
    {
      cue: "4.taught",
      ...cam.push({ on: [0, 0.95, 1.4], dist: 3.9, to: 3.5, yaw: 28, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "A memory, in the sun: the same big brother, not green, bending down to give a smaller kid the same sword the same way.",
      stage: (t) => (
        <>
          <TownSet />
          <Life t={t} n={3} />
          <Bro position={[-0.5, 0, 1.4]} rotationY={EAST} lean={0.3} carry={<WoodSword position={[0, 0.08, 0.22]} rotation={[-0.75 - Math.PI / 2, 0, 0]} />} />
          <Me position={[0.5, hop(t, 0.5, 0.18, 0.3), 1.4]} rotationY={WEST} scale={KID * 0.86} lookAt={[-0.1, 0.8, 1.4]} />
        </>
      ),
    },
    {
      cue: "5.fix",
      ...cam.push({ on: [-0.1, 0.95, -0.1], dist: 4.6, to: 4.1, yaw: 34, pitch: 16, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From higher up: the small kid in front of the bars with the sword back in his arms, jumping on the spot: I'LL FIX YOU. The brother's head tilts.",
      stage: (t) => (
        <>
          <Cellar />
          <Bro position={PLACE.bro} rotationY={SOUTH} green={1} out bitten tilt={-0.25} />
          <Me position={[PLACE.me[0], hop(t, 0.5, 0.25, 0.3), 0.45]} rotationY={NORTH} carry={<WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
          <Bubble text="I'LL FIX YOU." position={[0.55, 1.7, 0.6]} rotationY={0.5} scale={0.38 * pop(t, 0.45, 0.14)} tail={-1} />
          <HandLantern position={LAMP} light={20} />
          <Fill at={[0.6, 2.2, 2.0]} power={12} />
        </>
      ),
    },
    {
      cue: "5.bread",
      ...cam.push({ on: [-0.05, 0.5, -0.5], dist: 3.5, to: 3.1, yaw: 48, pitch: 16, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From the side. He pushes a loaf under the bars. The brother looks down at it, and turns his head away. The loaf stays on the floor.",
      stage: (t) => {
        const no = w("5.bread", "He");
        const k = tw(t, 0.2, 0.7);
        return (
          <>
            <Cellar walls="nws" />
            <Bro position={PLACE.bro} rotationY={SOUTH} green={1} out bitten nod={t < no ? 0.45 * k : 0.1} turn={tw(t, no, no + 0.3) * -0.9} />
            <Me position={[-0.25, 0, 0.35]} rotationY={NORTH} lean={0.4 * (1 - tw(t, 0.7, 1.0))} />
            <Loaf position={[LOAF[0], 0.02, -0.1 + (LOAF[2] + 0.1) * k]} rotation={[0, 0.3, 0]} />
            <HandLantern position={[-0.95, 0, 0.3]} light={20} />
            <Fill at={[2.4, 2.0, 1.4]} power={14} />
          </>
        );
      },
    },
    {
      cue: "5.pink",
      ...cam.push({ on: [0.3, 0.85, 0.75], dist: 2.6, to: 2.2, yaw: -30, pitch: 16, fov: 38 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The kid, close, with a round bottle of pink potion in his arms. It glows a little on his chin. The bars and his brother are behind him, out of the light.",
      stage: (t) => (
        <>
          <Cellar />
          <Bro position={PLACE.bro} rotationY={SOUTH} green={1} out bitten />
          <Loaf position={LOAF} rotation={[0, 0.3, 0]} />
          <Me position={[0.3, 0, 0.75]} rotationY={SOUTH - 0.3} carry={<Bottle pink position={[0.13, -0.2 + pop(t, 0.2, 0.2) * 0.04, 0.2]} rotation={[-0.3, 0, -0.35]} scale={0.8} />} nod={-0.05} turn={-0.25} />
          <pointLight position={[0.1, 1.3, 1.9]} color="#ffe0ee" intensity={1.0} distance={3} decay={1.6} />
          <HandLantern position={[-0.6, 0, 0.5]} light={12} />
        </>
      ),
    },
    {
      cue: "5.worse",
      ...cam.push({ on: chest(PLACE.bro, TEEN), dist: 3.1, to: 3.3, yaw: -18, pitch: 2, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The bottle breaks on him in a pink splash. He staggers back with his arms up and hits the post. Healing hurts what he is now.",
      stage: (t) => {
        const hit = 0.18;
        const back = tw(t, hit, hit + 0.35);
        return (
          <>
            <Cellar />
            <Bro position={[PLACE.bro[0] - back * 0.15, 0, PLACE.bro[2] - back * 0.55]} rotationY={SOUTH} green={1} bitten arms={{ l: -1.5 - back * 1.2, r: -1.5 - back * 1.1 }} tilt={Math.sin(t * 30) * 0.12 * back} nod={-0.3 * back} />
            {t < hit ? <Bottle pink position={[0.1 - (t / hit) * 0.25, 1.2, 0.3 - (t / hit) * 1.2]} rotation={[t * 20, 0, 0]} /> : null}
            <Splash position={[PLACE.bro[0], 0.9, -0.9]} t={t - hit} color="#ff7ac0" />
            <Loaf position={LOAF} rotation={[0, 0.3, 0]} />
            <Bubble text="RRGH!" position={[0.75, 2.0, -0.4]} scale={0.5 * pop(t, hit + 0.1, 0.12)} tail={-1} dark tilt={0.1} />
            <HandLantern position={LAMP} light={18} />
            <Fill at={[0.6, 2.2, 2.0]} power={12} />
          </>
        );
      },
    },
    {
      cue: "5.thought",
      ...cam.push({ on: face([0.17, 0, 0.15], KID), dist: 2.4, to: 2.1, yaw: 180, pitch: -2, fov: 38 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The kid through the bars, from the cell side. The empty bottle is on the floor by his feet. His head goes down.",
      stage: (t) => (
        <>
          <Cellar walls="ew" />
          <Me position={[0.17, 0, 0.15]} rotationY={NORTH} nod={tw(t, 0.2, 0.9) * 0.45} />
          <Bottle position={[0.65, 0.06, 0.25]} rotation={[0, 0, 1.4]} />
          <HandLantern position={[-0.55, 0, 0.5]} light={10} />
          <Fill at={[0.2, 1.6, -1.6]} power={10} />
        </>
      ),
    },
    {
      cue: "5.grey",
      ...cam.push({ on: [-1.25, 2.2, -2.5], dist: 3.6, to: 3.1, yaw: -8, pitch: -14, fov: 46 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The little window, high in the cell wall. The square of sky in it goes from black to grey. Under it, the brother backs away from it.",
      stage: (t) => {
        const k = tw(t, 0.2, 2.0);
        return (
          <>
            <Cellar sky={skyAt(k * 0.5)} />
            <Bro position={[-1.55 + k * 0.5, 0, -1.9]} rotationY={NORTH + 0.2} green={1} out bitten nod={-0.5} />
            <Glowing k={k} />
            <HandLantern position={LAMP} light={14} />
            <Fill at={[0.4, 2.2, 1.0]} power={10} />
          </>
        );
      },
    },
  ],
});

function Glowing({ k }: { k: number }) {
  return <pointLight position={[-1.25, 2.8, -2.2]} color="#aab4c8" intensity={k * 9} distance={4} decay={1.6} />;
}
