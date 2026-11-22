import { Block, cam, storyScene } from "../../engine";
import { Granny, Hero, HungBell, NORTH, PLACE, Rope, SOUTH, ThingBelow, ease, ramp, timing, wordAt } from "./kit";
import { BELOW, TOWER } from "./marks";

const HER = PLACE.grannyAt;
const ASKED = wordAt("7.ask", "told");
const EVERY = wordAt("7.for", "every");
const UNDER = wordAt("7.below", "under");
const STOPS = wordAt("7.wake", "stops");

const GAP: [number, number, number] = [PLACE.tower[0], TOWER.floorTop + 0.03, PLACE.tower[2]];

/**
 * THE RULE, OUT LOUD. He asks the obvious question; she answers it while she rings the bell; and the answer is a
 * thing under the town that hears. Every picture here is the sound going DOWN — through the floor, into the dark.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "For the thing below",
  shots: [
    {
      cue: "7.ask",
      ...cam.push({ on: [HER[0] + 0.1, PLACE.towerIn + 1.25, HER[2] + 1.2], dist: 5.0, to: 4.0, yaw: 22, pitch: 2, fov: 42 }),
      zone: "tower",
      look: "overworld-night",
      note: "Two-shot: he has come up the last step with his mouth already open, and she is standing in the pull of the rope. On 'told' he points at the bell behind her.",
      stage: (t) => {
        const point = ease(ramp(t, ASKED - 0.4, ASKED + 0.2));
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={0.03 * Math.sin(t * 1.4)} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35} />
            <Granny position={[HER[0] + 0.2, PLACE.towerIn, HER[2] + 0.2]} rotationY={SOUTH - 0.5} nod={0.06} turn={0.1} />
            <Hero position={[PLACE.tower[0] - 1.3, PLACE.towerIn, PLACE.tower[2] + 1.3]} rotationY={NORTH + 0.5} animation="talk" arms={point > 0.4 ? "point" : "idle"} time={t} face="wow" headPitch={-0.08} />
          </>
        );
      },
    },
    {
      cue: "7.for",
      ...cam.push({ on: [HER[0], PLACE.towerIn + 1.35, HER[2] + 0.4], dist: 3.6, to: 2.8, yaw: -26, pitch: -16, fov: 40 }),
      zone: "tower",
      look: "overworld-night",
      note: "From the floor, low, looking up at her: on 'every' she hauls the rope and the bell goes over her head. She says it the way you say what you do every night of your life.",
      stage: (t) => {
        const pull = ease(ramp(t, EVERY - 0.3, EVERY + 0.2)) * (1 - ease(ramp(t, EVERY + 1.2, EVERY + 1.8)));
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={(0.1 + 0.26 * pull) * Math.sin(t * 8)} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35 + pull * 0.45} pull={pull * 0.35} />
            <Granny position={[HER[0] + 0.2, PLACE.towerIn, HER[2] + 0.2]} rotationY={NORTH - 0.5} nod={0.18 * pull} lean={0.14 * pull} strain={0.5 + 0.4 * pull} />
            <Hero position={[PLACE.tower[0] - 1.5, PLACE.towerIn, PLACE.tower[2] + 1.1]} rotationY={NORTH + 0.9} animation="idle" time={t} face="uneasy" headPitch={-0.16} />
          </>
        );
      },
    },
    {
      cue: "7.below",
      ...cam.push({ on: GAP, dist: 2.2, to: 1.5, yaw: 12, pitch: 34, fov: 40 }),
      zone: "tower",
      look: "overworld-night",
      note: "The gap in the floorboards: on 'under' a low teal light comes up through it onto the wool dust. We see no face, only that there is something that can be lit.",
      stage: (t) => {
        const glow = ease(ramp(t, UNDER - 0.4, UNDER + 0.5));
        return (
          <>
            <Block position={[GAP[0] - 1.2, GAP[1], GAP[2] - 1.2]} size={[1.5, 0.04, 1.2]} color="#0b0b0e" />
            <Block position={[GAP[0] - 1.2, GAP[1] - 0.06, GAP[2] - 1.2]} size={[1.4, 0.04, 1.1]} color="#8ef2de" emissive="#4fd8c0" emissiveIntensity={2.4 * glow} opacity={0.35 + glow * 0.6} transparent />
            <Block position={[GAP[0] - 0.4, GAP[1] + 0.02, GAP[2] - 0.9]} size={[0.16, 0.03, 0.16]} color="#d6cdb7" />
            <Block position={[GAP[0] - 1.9, GAP[1] + 0.02, GAP[2] - 1.7]} size={[0.12, 0.03, 0.14]} color="#cdc4ae" />
            <Hero position={[GAP[0] + 0.5, PLACE.towerIn, GAP[2] + 0.2]} rotationY={SOUTH + 0.3} animation="idle" time={t} face="uneasy" headPitch={0.4} />
          </>
        );
      },
    },
    {
      cue: "7.wake",
      ...cam.push({ on: [BELOW.at[0], 2.4, BELOW.at[2]], dist: 17.5, to: 14.5, yaw: 4, pitch: 12, fov: 44 }),
      zone: "below",
      look: "overworld-night",
      note: "The whole dark room under the town, from high up: the mass on the floor, the wool hanging from the ceiling, and one light in its face that is almost shut. On 'stops' it does not open.",
      stage: (t) => {
        const stir = ease(ramp(t, STOPS - 0.6, STOPS + 0.7));
        return <ThingBelow at={BELOW.at} awake={0.18 + stir * 0.12} t={t} />;
      },
    },
  ],
});
