import {
  FounderCrest,
  HandTorch,
  PLACE,
  Teller,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;
const C = PLACE.cave;

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The Founder's Cave & 100 Years of Fear",
  shots: [
    {
      cue: "5.dusk",
      ...cam.front({ actor: at(V, 0, 0, -9.2), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "village",
      look: "overworld-sunset",
      note: "At golden dusk, Teller lights an oak torch and faces the dark cave entrance alone.",
      stage: (t) => (
        <Teller position={at(V, 0, 0, -9.2)} rotationY={0} animation="point" face="brave" time={t}>
          <HandTorch position={[0, 0.02, 0.24]} scale={1.1} />
        </Teller>
      ),
    },
    {
      cue: "5.step",
      ...cam.sweep({ on: at(V, 0, 1.1, -10.5), dist: 5.0, fromYaw: -35, toYaw: -65, pitch: 12, fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "OTS: Nobody stands ahead of him—Teller takes the brave first step straight into the cave mouth.",
      stage: (t) => {
        const w = moveBetween(at(V, 0, 0, -9.2), at(V, 0, 0, -12.0), t, 0, 1.4);
        return (
          <Teller position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="brave" time={t}>
            <HandTorch position={[0, 0.02, 0.24]} scale={1.1} />
          </Teller>
        );
      },
    },
    {
      cue: "5.dark",
      ...cam.sweep({ on: at(C, 0, 1.2, 1.5), dist: 3.4, fromYaw: -18, toYaw: 18, pitch: 8, fov: 44 }),
      zone: "cave",
      look: "lantern-night",
      note: "OTS inside the echoing stone tunnel, orange torchlight flickers along the damp walls.",
      stage: (t) => {
        const w = moveBetween(at(C, 0, 0, 4.5), at(C, 0, 0, -1.5), t, 0, 1.5);
        return (
          <Teller position={w.position} rotationY={w.rotationY} animation={w.moving ? "creep" : "idle"} animDistance={w.animDistance} face="worried" time={t}>
            <HandTorch position={[0, 0.04, 0.26]} scale={1.1} />
          </Teller>
        );
      },
    },
    {
      cue: "5.deep",
      ...cam.sweep({ on: at(C, 0, 1.1, -4.8), dist: 3.4, fromYaw: -16, toYaw: 16, pitch: 8, fov: 42 }),
      zone: "cave",
      look: "lantern-night",
      note: "OTS: Deep inside the chamber, Teller freezes as his boot bumps against old bones.",
      stage: (t) => (
        <Teller position={at(C, 0, 0, -4.6)} rotationY={Math.PI} animation="scared" face="surprised" time={t}>
          <HandTorch position={[0, 0.04, 0.26]} scale={1.1} />
        </Teller>
      ),
    },
    {
      cue: "5.skel",
      ...cam.sweep({ on: at(C, 0, 0.9, -7.2), dist: 4.0, fromYaw: -20, toYaw: 20, pitch: 8, fov: 40 }),
      zone: "cave",
      look: "lantern-night",
      note: "OTS picture-first reveal: the dusty seated skeleton of the founder slumped beside a rusted pickaxe.",
      stage: (t) => (
        <Teller position={at(C, -1.4, 0, -5.2)} rotationY={Math.PI + 0.4} animation="idle" face="surprised" time={t}>
          <HandTorch position={[0, 0.04, 0.26]} scale={1.1} />
        </Teller>
      ),
    },
    {
      cue: "5.carve",
      ...cam.sweep({ on: at(C, 0, 2.2, -8.3), dist: 3.6, fromYaw: 18, toYaw: -18, pitch: 4, fov: 38 }),
      zone: "cave",
      look: "lantern-night",
      hud: { banner: { text: "DON'T GO FIRST", color: "#ffdd57" } },
      note: "Carved deep into the back stone wall above the skeleton: DON'T GO FIRST.",
      stage: (t) => (
        <Teller position={at(C, -1.2, 0, -5.8)} rotationY={Math.PI + 0.25} animation="point" face="worried" time={t} />
      ),
    },
    {
      cue: "5.banner",
      ...cam.front({ actor: at(C, 0, 0, -6.4), dist: 3.4, fov: 38, screenOffset: [0, 0.06] }),
      zone: "cave",
      look: "lantern-night",
      note: "Teller lifts the faded golden Founder Crest gleaming in the torchlight.",
      stage: (t) => (
        <Teller position={at(C, 0, 0, -5.8)} rotationY={0} animation="reach" face="surprised" time={t}>
          <FounderCrest position={[0, 0.04, 0.26]} scale={1.2} />
        </Teller>
      ),
    },
    {
      cue: "5.truth",
      ...cam.sweep({ on: at(C, 0, 1.1, -6.8), dist: 4.4, fromYaw: -18, toYaw: 18, pitch: 10, fov: 42 }),
      zone: "cave",
      look: "lantern-night",
      hud: { filter: "sepia", banner: { text: "100 YEARS AGO", color: "#ffdd57" } },
      note: "OTS sepia flashback: the town's founder had walked into this cave first a century ago.",
      stage: (t) => (
        <Teller position={at(C, -1.2, 0, -5.4)} rotationY={Math.PI + 0.3} animation="point" face="sad" time={t} />
      ),
    },
    {
      cue: "5.never",
      ...cam.heroLow({ on: at(C, 0, 1.2, -7.2), dist: 4.2, yaw: 14, fov: 42 }),
      zone: "cave",
      look: "lantern-night",
      hud: { filter: "sepia" },
      note: "OTS: Collapsed boulders trapped the founder inside so he never returned to the village.",
      stage: (t) => (
        <Teller position={at(C, 1.2, 0, -5.2)} rotationY={Math.PI - 0.3} animation="ache" face="sad" time={t} />
      ),
    },
    {
      cue: "5.fear",
      ...cam.front({ actor: at(C, 0, 0, -5.4), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cave",
      look: "lantern-night",
      hud: { counter: { label: "PASSED DOWN", from: 1, to: 100, suffix: " YEARS", startAt: 0.08, dur: 1.25, color: "#ffdd57" } },
      note: "The rule was never a law—just a hundred years of grief and fear passed down.",
      stage: (t) => (
        <Teller position={at(C, 0, 0, -5.4)} rotationY={0} animation="reachUp" face="brave" time={t}>
          <FounderCrest position={[0, 0.04, 0.26]} scale={1.15} />
        </Teller>
      ),
    },
  ],
});
