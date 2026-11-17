import { cam, storyScene } from "../../engine";
import {
  Bits, Bro, Bubble, Dad, Fill, HandLantern, Lying, Me, NORTH, OurRoom, PLACE, SOUTH, TEEN, TownSet, WEST, Wheat, WoodSword, Zombie, face, go, hop, pop, timing, tw, w,
} from "./kit";

/** 03 — The evening it happened. He pulled me in. It got his arm. By midnight he was green, and dad carried him out. */
const F = PLACE.field;
const DOOR: [number, number, number] = [-1.3, 0, -5.55];

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "It got his arm",
  shots: [
    {
      cue: "3.late",
      ...cam.push({ on: [F[0] - 0.3, 0.9, F[2] + 1.2], dist: 6.2, to: 5.4, yaw: -24, pitch: 9, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Sunset. The kid is alone at the edge of the wheat, fighting it with his wooden sword. Behind him the windows are already lit and the street is empty.",
      stage: (t) => (
        <>
          <TownSet lit />
          <Wheat position={F} size={[6, 5]} />
          <Me position={[F[0] - 0.4, hop(t, 0.5, 0.2, 0.3) + hop(t, 1.4, 0.2, 0.3), F[2] + 3.0]} rotationY={NORTH + 0.3} lean={Math.max(0, Math.sin(t * 7)) * 0.35} carry={<WoodSword position={[0.05, 0.1, 0.1]} rotation={[-0.75 - Math.max(0, Math.sin(t * 7)) * 1.1, 0, 0]} />} />
        </>
      ),
    },
    {
      cue: "3.wheat",
      ...cam.push({ on: [F[0] - 0.2, 1.1, F[2] + 1.4], dist: 5.6, to: 4.8, yaw: 14, pitch: 3, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Dark now. Behind the kid, a zombie rises out of the wheat, arms first. The kid has not seen it.",
      stage: (t) => (
        <>
          <TownSet lit />
          <Wheat position={F} size={[6, 5]} />
          <Me position={[F[0] - 0.4, 0, F[2] + 3.0]} rotationY={SOUTH + 0.3} turn={tw(t, 0.9, 1.2) * 1.2} carry={<WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
          <Zombie position={[F[0] + 0.3, -1.5 + tw(t, 0.15, 0.95) * 1.5, F[2] + 1.3]} rotationY={SOUTH - 0.1} armPitch={[-1.5, -1.5]} nod={0.1} />
          <Fill at={[F[0], 3, F[2] + 5]} power={22} />
        </>
      ),
    },
    {
      cue: "3.pull",
      ...cam.push({ on: [-1.0, 1.0, -4.6], dist: 6.0, to: 5.4, yaw: 62, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Our door, open, with the light coming out. The big brother stands in it and pulls the kid in off the street. The zombie is two steps behind, arms out.",
      stage: (t) => {
        const k = tw(t, 0.1, 1.2);
        const me = go([-0.9, 0, -2.9], [-1.25, 0, -5.0], k);
        return (
          <>
            <TownSet lit homeOpen />
            <Bro position={DOOR} rotationY={SOUTH} lean={0.3 * (1 - k)} />
            <Me {...me} carry={<WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
            <Zombie position={[-0.7, 0, -1.4 - k * 1.7]} rotationY={NORTH - 0.15} walk={k * 1.7} armPitch={[-1.5, -1.5]} />
            <Fill at={[2.5, 2.5, -3.5]} power={24} />
          </>
        );
      },
    },
    {
      cue: "3.arm",
      ...cam.push({ on: [-1.15, 1.05, -5.1], dist: 2.5, to: 2.1, yaw: 68, pitch: 2, fov: 40 }),
      zone: "town",
      look: "overworld-night",
      note: "Close. The zombie's hand comes down on the brother's arm. A red flash. He pushes the door shut with the other.",
      stage: (t) => {
        const hit = w("3.arm", "arm");
        return (
          <>
            <TownSet lit homeOpen />
            <Bro position={DOOR} rotationY={SOUTH} bitten={t > hit} nod={t > hit ? 0.3 : 0} />
            <Zombie position={[-1.05, 0, -4.15]} rotationY={NORTH} armPitch={[-1.5 + tw(t, hit - 0.25, hit) * 0.35, -1.5]} />
            {t > hit ? <Bits position={[-1.55, 1.0, -5.05]} t={t - hit} color="#e3261c" count={12} power={1.6} /> : null}
            <Fill at={[2.5, 2.2, -4.5]} power={22} />
          </>
        );
      },
    },
    {
      cue: "3.fine",
      ...cam.push({ on: [-0.75, 1.15, 0.9], dist: 4.2, to: 3.7, yaw: -10, pitch: 5, fov: 44 }),
      zone: "room",
      look: "warm-room",
      note: "Inside. He has taken the wooden sword off the kid and holds it against his bitten arm, and says I'M FINE. The kid looks at the arm, not at his face.",
      stage: (t) => (
        <>
          <OurRoom night />
          <Bro position={[-1.0, 0, 0.6]} rotationY={SOUTH + 0.35} bitten carry={<WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
          <Me position={[-0.15, 0, 1.25]} rotationY={WEST} lookAt={[-1.25, 0.9, 0.8]} />
          <Bubble text="I'M FINE." position={[-1.0, 2.1, 0.6]} scale={0.62 * pop(t, 0.5, 0.14)} tail={-1} />
        </>
      ),
    },
    {
      cue: "3.notfine",
      ...cam.push({ on: face([-1.0, 0, 0.6], TEEN), dist: 1.9, to: 1.6, yaw: 12, pitch: 0, fov: 36 }),
      zone: "room",
      look: "warm-room",
      note: "His face, close. It is already a little green, and his head drops.",
      stage: (t) => (
        <>
          <OurRoom night />
          <Bro position={[-1.0, 0, 0.6]} rotationY={SOUTH + 0.2} bitten green={0.25 + tw(t, 0, 0.8) * 0.3} nod={tw(t, 0.2, 0.8) * 0.3} tilt={Math.sin(t * 14) * 0.03} />
        </>
      ),
    },
    {
      cue: "3.green",
      ...cam.push({ on: [-0.9, 1.15, -0.2], dist: 4.6, to: 4.0, yaw: -22, pitch: 10, fov: 44 }),
      zone: "room",
      look: "lantern-night",
      note: "Midnight, the moon in the window. He stands by his bed, and the green goes all the way up. His arms come out of his sleeves by themselves.",
      stage: (t) => {
        const g = 0.55 + tw(t, 0.2, 1.1) * 0.45;
        return (
          <>
            <OurRoom night />
            <Bro position={[-1.05, 0, 0.7]} rotationY={SOUTH + 0.2} bitten green={g} nod={0.15} arms={g > 0.8 ? { hold: <WoodSword position={[0, -0.16, 0.13]} /> } : undefined} carry={g > 0.8 ? undefined : <WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
            <Me position={[0.55, 0, 1.5]} rotationY={WEST} lookAt={face([-1.05, 0, 0.7], TEEN)} />
            <HandLantern position={[0.2, 0, 0.6]} light={18} />
            <Fill at={[0, 2.6, 2.6]} power={16} />
          </>
        );
      },
    },
    {
      cue: "3.dad",
      ...cam.push({ on: [-0.5, 1.2, 1.5], dist: 5.0, to: 4.6, yaw: 20, pitch: 6, fov: 46 }),
      zone: "room",
      look: "lantern-night",
      note: "Dad comes in, picks him up like a sack, and carries him out across the frame. The brother's green arms hang over dad's back.",
      stage: (t) => {
        const x = 0.9 - tw(t, 0.1, 1.7) * 2.6;
        return (
          <>
            <OurRoom night />
            <Dad position={[x, 0, 1.7]} rotationY={WEST} walk={(0.9 - x) * 1.2} lean={-0.12} />
            <Lying position={[x - 0.42, 1.5, 1.7 + 0.75]} turn={0}>
              <Bro position={[0, 0, 0]} green={1} bitten arms={{ hold: <WoodSword position={[0, -0.16, 0.13]} /> }} />
            </Lying>
            <Me position={[1.5, 0, 0.5]} rotationY={WEST} lookAt={[x, 1.4, 1.7]} />
            <HandLantern position={[0.2, 0, 0.6]} light={18} />
            <Fill at={[0, 2.6, 3.0]} power={16} />
          </>
        );
      },
    },
    {
      cue: "3.look",
      ...cam.push({ on: [-1.5, 1.25, 2.2], dist: 3.6, to: 3.2, yaw: 150, pitch: 2, fov: 42 }),
      zone: "room",
      look: "lantern-night",
      note: "From behind the kid: dad's back going away with the brother's arms hanging. Dad's head does not turn.",
      stage: (t) => (
        <>
          <OurRoom night />
          <Dad position={[-1.5, 0, 2.6 + t * 0.7]} rotationY={SOUTH} walk={t * 0.8} lean={-0.12} />
          <Lying position={[-1.5, 1.5, 2.6 + t * 0.7 + 1.2]}>
            <Bro position={[0, 0, 0]} green={1} bitten arms={{ hold: <WoodSword position={[0, -0.16, 0.13]} /> }} />
          </Lying>
          <Me position={[-0.9, 0, 0.9]} rotationY={SOUTH - 0.3} lookAt={[-1.5, 1.5, 3]} />
          <HandLantern position={[0.2, 0, 0.6]} light={18} />
          <Fill at={[0, 2.6, 3.0]} power={14} />
        </>
      ),
    },
    {
      cue: "3.thought",
      ...cam.push({ on: [-0.2, 0.75, 0.5], dist: 6.6, to: 5.2, yaw: 0, pitch: 22, fov: 46 }),
      zone: "room",
      look: "lantern-night",
      note: "The whole room from high up: two beds, one wall between them, and one kid sitting on the floor with nothing in his arms. The left half is empty. A slow push in.",
      stage: (t) => (
        <>
          <OurRoom night />
          <Me position={[0.75, 0, 0.75]} rotationY={SOUTH - 0.5} sit nod={0.25 + tw(t, 1.2, 2.2) * 0.2} lookAt={t < 1.2 ? [-0.9, 0.6, -0.8] : undefined} />
          <HandLantern position={[0.2, 0, 0.6]} light={16} />
          <Fill at={[0, 2.8, 2.6]} power={14} />
        </>
      ),
    },
  ],
});
