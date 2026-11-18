import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Block, Cape, Clippers, Comb, Drop, FloorHair, HairFly, Hero, InHand, PLACE, Person, PixelText, Plate, SEAT, ShopDoor, Sparkle, WindowBoard, add, go, holdUp, personOf, pop, seatedPose, timing, tw, w } from "./kit";
import { MY_FACE, Me, SIT, SIT_TOP } from "./acts";

/**
 * 6. THE JOB. The busiest shop in town needs a pair of hands, and it is a Saturday. Everything the garage was for,
 * in ten seconds: three grown barbers going under, and a kid on a crate who clicks his scissors twice.
 */

const WIDE: Vec3 = [0, 1.72, 0];
const OWNER: Vec3 = [1.45, 0, 0.45];
/** The queue stands on the pavement and runs east from the door. */
const inLine = (i: number): Vec3 => [-1.2 + i * 0.95, 0, -5.55 + (i % 2 ? 0.28 : -0.22)];

/** The nine HUS of the shop chant, in seconds from the start of its cue. */
const S9 = Array.from({ length: 9 }, (_, i) => w("6.hus", "HUS", i));

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The job",
  shots: [
    {
      cue: "6.busiest",
      ...cam.push({ on: [-1.55, 2.05, -4.8], dist: 8.6, to: 7.6, yaw: 186, pitch: -2, fov: 40 }),
      zone: "front",
      look: "overworld-day",
      note: "The busiest shop in town from the street: its name, its pole, people going in and out.",
      stage: (t) => (
        <>
          <ShopDoor open={1} />
          <Person who={2} top="bush" {...go([-2.3, 0, -8.6], [-2.3, 0, -4.4], t / 1.7)} animation="walk" />
          <Person who={5} top="bush" {...go([-0.2, 0, -9.4], [-2.2, 0, -5.6], t / 1.9)} animation="walk" />
          <Person who={0} top="cut" {...go([-2.5, 0, -5.0], [-4.6, 0, -8.5], t / 1.8)} animation="walk" face="happy" />
        </>
      ),
    },
    {
      cue: "6.sign",
      ...cam.push({ on: [0.4, 1.72, -4.7], dist: 3.6, to: 3.1, yaw: 178, pitch: 0, fov: 40 }),
      zone: "front",
      look: "overworld-day",
      note: "The sign in the window, and me in front of it turning round with a grin.",
      stage: (t) => {
        const turn = tw(t, 1.0, 1.35);
        return (
          <>
            <ShopDoor open={0} />
            <WindowBoard position={[0.4, 2.25, -4.7]} front="HELP WANTED" width={1.5} height={0.9} bg="#1f3f8a" fg="#ffffff" />
            <Hero position={[0.4, 0, -5.5]} rotationY={turn * Math.PI * 0.92} animation={turn > 0.9 ? "cheer" : "idle"} face={turn > 0.5 ? "grin" : "wow"} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "6.saturday",
      ...cam.push({ on: WIDE, dist: 3.5, to: 3.2, yaw: -12, pitch: 3, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "My first day: me on my crate behind an empty chair, and faces pressed to the window.",
      stage: (t) => (
        <>
          <Me t={t} fast={0} up={0.45} face="uneasy" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Person key={i} who={i} top="bush" position={[-0.6 + i * 0.62, i % 2 ? 0.25 : 0, -5.05 - (i % 2) * 0.5]} rotationY={0} animation="idle" face="worried" />
          ))}
        </>
      ),
    },
    {
      cue: "6.line",
      ...cam.push({ on: [3.0, 1.2, -5.55], dist: 6.0, to: 5.4, yaw: -104, pitch: 11, fov: 40 }),
      zone: "front",
      look: "overworld-day",
      note: "The queue down the pavement, every head a bush: Saturday, as one long line.",
      stage: (t) => (
        <>
          <ShopDoor open={0} />
          {Array.from({ length: 14 }, (_, i) => (
            <Person key={i} who={i} top="bush" bush={0.6 + ((i * 7) % 5) * 0.1} position={inLine(i)} rotationY={-Math.PI / 2} animation={i % 3 === 0 ? "lookAround" : "idle"} face={i % 2 ? "worried" : "neutral"} />
          ))}
        </>
      ),
    },
    {
      cue: "6.beard",
      ...cam.push({ on: [3.0, 1.2, -5.6], dist: 2.5, to: 2.2, yaw: 187, pitch: 2, fov: 38 }),
      zone: "front",
      look: "overworld-day",
      note: "The joke of the line: one man in the queue with a beard to his belt, half asleep.",
      stage: (t) => {
        const p = holdUp(t, 0, 0);
        p.armL = [-1.1, 0, 0.5];
        p.head = [0.35, 0.2, 0];
        return (
          <>
            <Person who={7} top="beard" position={[3.0, 0, -5.6]} rotationY={Math.PI} pose={p} face="sleepy" gaze={0} />
            <Person who={1} top="bush" position={[3.75, 0, -5.2]} rotationY={Math.PI} face="worried" />
            <Person who={3} top="bush" position={[2.3, 0, -5.1]} rotationY={Math.PI} face="neutral" />
          </>
        );
      },
    },
    {
      cue: "6.beard",
      cut: 1.3,
      ...cam.push({ on: [0.2, 1.45, -0.3], dist: 5.0, to: 4.5, yaw: -57, pitch: 7, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "Inside: three grown barbers sweating over three heads. The shop is losing.",
      stage: (t) => (
        <>
          {([PLACE.chairL, PLACE.chair, PLACE.chairR] as Vec3[]).map((c, i) => (
            <group key={i}>
              <Person who={i + 3} top="bush" position={add(c, 0, SEAT, 0)} pose={seatedPose(t + i)} face="worried" />
              <Cape position={c} scale={0.95} />
              <Person who={i + 5} coat position={add(c, 0, 0, -0.7)} animation={(["panic", "ache", "shrug"] as const)[i]} face="scared" />
              <Drop position={add(c, 0.2, 1.75, -0.45)} t={t + i * 0.2} every={0.45} fall={-0.4} size={0.05} />
              <Drop position={add(c, -0.2, 1.7, -0.45)} t={t + i * 0.2} every={0.45} fall={-0.4} size={0.05} phase={0.2} />
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "6.beard",
      cut: 1.95,
      ...cam.push({ on: add(MY_FACE, 0.2, 0.08, 0), dist: 2.7, to: 2.4, yaw: 5, pitch: -2, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "Two clicks of the scissors, close on my face: the sound that says he is ready.",
      stage: (t) => <Me t={t} fast={0} up={1.15} face="brave" />,
    },
    {
      cue: "6.hus",
      ...cam.push({ on: WIDE, dist: 3.4, to: 3.0, yaw: 14, pitch: 3, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "The year paying out: nine HUS and three heads, a new one in the chair for every three, each one done.",
      stage: (t) => {
        let i = 0;
        for (let g = 0; g < 3; g++) if (t >= S9[g * 3] - 0.05) i = g;
        const k = Math.min(1, Math.max(0, (t - S9[i * 3]) / (S9[i * 3 + 2] + 0.06 - S9[i * 3])));
        return (
          <>
            <Person who={i + 1} top={k < 0.95 ? "bush" : "cut"} bush={1 - k * 0.8} position={SIT} pose={seatedPose(t)} face={k < 0.95 ? "scared" : "wow"} gaze={0} />
            <Cape position={PLACE.chair} scale={0.95} color={["#2f4fa8", "#a82a2a", "#2f8a8a", "#6a3fa0"][i % 4]} />
            <Me t={t} fast={1} face="calm" />
            <HairFly position={SIT_TOP} t={t} at={S9} color={personOf(i + 1).hair} count={10} power={1.3} />
          </>
        );
      },
    },
    {
      cue: "6.hus",
      cut: S9[8] + 0.2,
      ...cam.push({ on: add(OWNER, -0.1, 0.95, 0), dist: 3.1, to: 2.8, yaw: -16, pitch: 9, fov: 40 }),
      zone: "shop",
      look: "overworld-day",
      note: "The owner standing shin deep in hair, staring: how much work that was, as a floor.",
      stage: (t) => (
        <>
          <FloorHair position={[1.2, 0, 0.6]} area={[3.4, 2.6]} amount={1} depth={0.34} seed={5} />
          <FloorHair position={[1.3, 0.1, 0.9]} area={[2.4, 1.6]} amount={1} depth={0.3} seed={9} />
          <Person who={4} coat position={OWNER} rotationY={-0.4} animation="idle" face="wow" gaze={0} />
          <Bits position={add(OWNER, -0.5, 2.2, 0.2)} t={t % 0.9} color="#3a2414" count={8} seed={4} power={0.4} toward={[0, -1, 0.2]} />
        </>
      ),
    },
    {
      cue: "6.forty",
      ...cam.push({ on: [-2.3, 1.7, -5.3], dist: 5.4, to: 5.0, yaw: 186, pitch: 2, fov: 40 }),
      zone: "front",
      look: "overworld-day",
      note: "Finished heads walking out of the door while a counter over it runs up to forty.",
      stage: (t) => {
        const n = Math.min(40, 31 + Math.floor(t * 9));
        return (
          <>
            <ShopDoor open={1} />
            {[0, 1, 2].map((i) => {
              const k = t / 1.3 + i * 0.36;
              return (
                <group key={i}>
                  <Person who={i + n} top="cut" {...go([-2.3, 0, -4.2], [-2.3 + (i % 2 ? 2.6 : -2.6), 0, -6.6], k % 1)} animation="walk" face="happy" />
                </group>
              );
            })}
            <group position={[-2.85, 2.72, -5.0]} rotation={[0, Math.PI, 0]}>
              <Block size={[1.0, 0.66, 0.04]} color="#101018" castShadow={false} />
              <PixelText text={String(n)} position={[0, 0, 0.03]} height={0.5} maxWidth={0.9} color="#ffe14a" />
            </group>
            <Sparkle position={[-2.3, 3.0, -5.06]} k={n === 40 ? pop(t, 1.0, 0.2) : 0} size={0.24} rotationY={Math.PI} />
          </>
        );
      },
    },
    {
      cue: "6.forty",
      cut: 1.15,
      ...cam.push({ on: add(OWNER, 0, 1.36, 0), dist: 2.2, to: 1.9, yaw: 8, pitch: 2, fov: 38 }),
      zone: "shop",
      look: "overworld-day",
      note: "The owner's face, and the comb slipping out of his hand: a grown barber, amazed.",
      stage: (t) => {
        const p = holdUp(t, 0.45, 0.35);
        return (
          <>
            <FloorHair position={[1.2, 0, 0.6]} area={[3.4, 2.6]} amount={1} depth={0.34} seed={5} />
            <Person who={4} coat position={OWNER} pose={p} face="wow" gaze={0} />
            <Comb position={add(OWNER, -0.3, Math.max(0.36, 1.12 - Math.max(0, t - 0.12) * Math.max(0, t - 0.12) * 6), 0.42)} rotation={[1.2 + t * 6, 0.3, 0.2]} scale={1.5} />
          </>
        );
      },
    },
    {
      cue: "6.forty",
      cut: 1.85,
      ...cam.push({ on: [-1.9, 1.3, -3.4], dist: 3.9, to: 3.5, yaw: 9, pitch: 4, fov: 40 }),
      zone: "shopx",
      look: "overworld-day",
      note: "A quiet shop and a closed door, which then bangs open: the past is about to come in.",
      stage: (t) => (
        <>
          <ShopDoor open={tw(t, 0.22, 0.32)} />
          <Hero job position={[-0.9, 0, -1.4]} rotationY={0.5} pose={holdUp(t, 0.5, 0.3)} face="calm" headYaw={t > 0.28 ? -1.2 : 0}>
            <InHand rate={0} scale={1.1} />
          </Hero>
        </>
      ),
    },
  ],
});
