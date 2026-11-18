import { Block, cam } from "../../engine";
import { Friend, Him, Kid, Phone, Speaker, Turntable, stagedScene } from "./kit";

const SETUP: [number, number, number] = [-2.2, 0, 1.4];

/**
 * BEAT 5 — THE EGG. The cousin's birthday, evening.
 *
 * He plays two bars, the needle skips, he grabs the wrong cable, and the yard covers its ears. Then
 * a kid says the worst possible sentence — "Put on my phone." — and the party restarts, better,
 * without him. That is the egg on the floor: the mess is that everyone else's party works.
 */
export const scene5 = stagedScene("scene5", [
  {
    id: "5.yard",
    ...cam.push({ on: [0, 1.15, -0.2], dist: 5.6, to: 4.4, fov: 48, pitch: 8 }),
    zone: "yard",
    look: "overworld-sunset",
    note: "The party he was invited to play: the cake, the chairs, the fairy lights, and his borrowed setup in the corner.",
    stage: () => (
      <>
        <Him position={SETUP} rotationY={Math.PI} animation="wave" face="happy" headphones="neck" />
        <Friend v={0} position={[0.55, 0, -0.15]} rotationY={0.6} animation="idle" face="laugh" />
        <Friend v={1} position={[1.5, 0, 0.35]} rotationY={-0.4} animation="laugh" face="laugh" />
        <Kid position={[1.85, 0, -0.9]} rotationY={-0.7} animation="idle" face="neutral" />
        <Turntable position={[-2.2, 0.78, 0.6]} spin={3.4} arm={0} lit={1} />
      </>
    ),
  },
  {
    id: "5.needle",
    ...cam.push({ on: [-2.2, 0.83, 0.6], dist: 2.1, to: 1.7, fov: 36, pitch: 20, yaw: 16 }),
    zone: "yard",
    look: "overworld-sunset",
    note: "The needle goes down on the record: his whole year, one and a half seconds long.",
    stage: (t) => (
      <>
        <Turntable position={[-2.2, 0.78, 0.6]} spin={5 - t * 1.2} arm={Math.min(1, t * 1.4)} lit={1} />
      </>
    ),
  },
  {
    id: "5.skip",
    ...cam.push({ on: [-2.2, 1.32, 1.4], dist: 2.9, to: 2.4, fov: 40, yaw: 172, pitch: 4 }),
    zone: "yard",
    look: "overworld-sunset",
    note: "The skip, on his face: the warm yard behind him, and the exact second he stops being the DJ.",
    stage: () => (
      <>
        <Him position={SETUP} rotationY={Math.PI} animation="panic" face="surprised" headphones="neck" />
        <Turntable position={[-2.2, 0.78, 0.6]} spin={0} arm={1} lit={0.2} />
      </>
    ),
  },
  {
    id: "5.feed",
    ...cam.push({ on: [0.1, 1.05, 0.3], dist: 5.2, to: 4.5, fov: 52, yaw: 26, pitch: 12 }),
    zone: "yard",
    look: "overworld-sunset",
    note: "The whole yard with its hands over its ears: the failure is social, so we have to see all of them at once.",
    stage: () => (
      <>
        <Him position={[-2.05, 0, 1.5]} rotationY={Math.PI} animation="panic" face="scared" headphones="neck" />
        <Friend v={0} position={[0.55, 0, -0.15]} rotationY={0.6} animation="scared" face="uneasy" />
        <Friend v={1} position={[1.4, 0, 0.4]} rotationY={-0.4} animation="scared" face="angry" />
        <Friend v={2} position={[2.15, 0, -0.5]} rotationY={-0.9} animation="scared" face="ouch" />
        <Kid position={[1.8, 0, -1.0]} rotationY={-0.7} animation="idle" face="blank" />
        <Turntable position={[-2.2, 0.78, 0.6]} spin={0} arm={1} lit={0.15} />
        <Block position={[-1.75, 0.02, 0.05]} size={[0.9, 0.04, 0.06]} color="#1a1c21" rotation={[0, 0.6, 0]} />
      </>
    ),
  },
  {
    id: "5.silence",
    ...cam.push({ on: [1.82, 0.95, -0.9], dist: 2.9, to: 2.4, fov: 40, yaw: -12, pitch: -3 }),
    zone: "yard",
    look: "overworld-sunset",
    note: "The kid, bored, holding up a phone: the sentence that ends him is four words long and not even meant badly.",
    stage: () => (
      <>
        <Kid position={[1.82, 0, -0.9]} rotationY={0.15} animation="idle" face="blank" />
        <Phone position={[1.78, 1.0, -0.55]} rotationY={0.2} glow={1.1} />
        <Him position={[-2.2, 0, 1.4]} rotationY={Math.PI} animation="idle" face="hurt" headphones="neck" />
      </>
    ),
  },
  {
    id: "5.alone",
    ...cam.push({ on: [-2.0, 0.95, 1.35], dist: 3.3, to: 2.6, fov: 42, yaw: 54, pitch: 8 }),
    zone: "yard",
    look: "overworld-sunset",
    note: "He coils the cable in the corner while the yard dances to a phone behind him: nobody is helping and nobody is watching.",
    stage: (t) => (
      <>
        <Him position={[-2.05, 0, 1.45]} rotationY={Math.PI * 0.85} animation="crouch" face="sad" headphones="neck" />
        <Block position={[-2.15, 0.1, 1.15]} size={[0.42, 0.12, 0.42]} color="#1a1c21" rotation={[0, t * 1.4, 0]} />
        <Friend v={0} position={[0.6, 0, -0.1]} rotationY={0.9} animation="cheer" face="laugh" />
        <Friend v={1} position={[1.45, 0, 0.4]} rotationY={-0.5} animation="cheer" face="laugh" />
        <Kid position={[1.85, 0, -0.85]} rotationY={-0.6} animation="cheer" face="grin" />
        <Speaker position={[-1.3, 0.47, 0.75]} rotationY={0.9} tall={0.7} wide={0.5} pulse={0.9} />
      </>
    ),
  },
]);
