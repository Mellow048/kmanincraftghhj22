import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree } from "../../engine";
import { Bridge, BreadShelf, Island, LampPost, PLACE, Plinth, Signpost, Sun, on } from "./kit";
import { Exhibit1 } from "./scene1";

/**
 * THE WORLD OF AN EXPLAINER: a few islands in one sky, and everything that happens on them.
 *
 *   ask     the question: one person, one thing, one price
 *   cause   why
 *   …       one island for each idea. Add them in the order the film visits them (PLACE, in kit.tsx).
 *
 * Two kinds of thing are mounted here, and both are here for the WHOLE film, because the camera flies:
 * it still sees what it has left, and it sees what it is coming to.
 *   1. The sets: the islands and what is fixed on them. This file.
 *   2. The exhibits: the people and things that DO something. One `ExhibitN` in each sceneN.tsx, driven by
 *      the film's clock. Mount every one of them below.
 *
 * This is a STARTER. The parts come from the topic's pack (Topics/Explainer/PACK.md).
 * 1 unit = 1 block = 1 metre.
 */

const Sets: React.FC = () => (
  <>
    {/* ---- ask: a baker's corner ---- */}
    <Island position={PLACE.ask} size={[9, 7]} seed={1} />
    <Plinth position={on(PLACE.ask, 1.2, 0, 0.3)} height={1} />
    <BreadShelf position={on(PLACE.ask, 2.6, 0, -2.2)} rotationY={-0.25} count={6} />
    <Signpost text="BAKERY" position={on(PLACE.ask, -3.1, 0, -2.2)} rotationY={0.35} />
    <Tree position={on(PLACE.ask, -3.4, 0, 1.6)} height={3.6} />
    <LampPost position={on(PLACE.ask, 3.8, 0, 2.4)} seed={2} />

    {/* ---- cause ---- */}
    <Island position={PLACE.cause} size={[9, 7]} seed={2} />
    <Signpost text="MINT" position={on(PLACE.cause, 2.6, 0, -2.4)} rotationY={-0.4} />
    <Tree position={on(PLACE.cause, 3.4, 0, 1.8)} height={3.2} leaf="#4a8c33" />

    {/* Two ideas that are joined get a bridge. Two that are not, get sky. */}
    <Bridge from={on(PLACE.ask, 4.5, 0, -0.4)} to={on(PLACE.cause, -4.5, -1, 0.6)} />
  </>
);

export const World: React.FC = () => (
  <>
    <Sun />
    <Clouds y={-14} center={[14, 0, -6]} span={160} opacity={0.9} />
    <Clouds y={34} center={[14, 0, -30]} span={200} />
    <Sets />

    {/* Every exhibit of the film, mounted for the whole film. */}
    <Exhibit1 />

    {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust on every island the lens rests on. */}
    <GodRay position={on(PLACE.ask, -1.5, 5.5, -1)} rotation={[0, 0, 0.5]} width={4} height={11} color="#fff0c8" opacity={0.07} />
    <LightPool position={on(PLACE.ask, 0.4, 0.03, 0.4)} width={6} depth={4.6} color="#fff2c8" opacity={0.16} />
    <Glow position={on(PLACE.ask, 1.2, 1.6, 0.1)} size={1.8} color="#ffe08a" opacity={0.28} />
    <Dust position={on(PLACE.ask, 0, 2, 0)} area={[9, 4, 7]} count={40} size={0.04} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
    <LightPool position={on(PLACE.cause, -0.8, 0.03, 0.2)} width={6} depth={4.6} color="#fff2c8" opacity={0.16} />
    <Dust position={on(PLACE.cause, 0, 2, 0)} area={[9, 4, 7]} count={40} size={0.04} color="#fff7d8" opacity={0.6} seed={5} speed={0.2} />
  </>
);
