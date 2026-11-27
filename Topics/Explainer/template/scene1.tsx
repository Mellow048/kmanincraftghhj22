import {
  Balance,
  CitizenLead,
  CommandBoard,
  EliteLead,
  EmeraldFountain,
  FloatingItemPyramid,
  Official,
  PLACE,
  Pickaxe,
  ShopStall,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/**
 * EXPLAINER STARTER SCENE (Remaster v3.5) — Physical 3D visual metaphors + seamless Frame-0 loop:
 *   - Shot 1 (`1.hook`) & Shot 4 (`4.loop`) share exact CLIMAX_CAM & ShopStall -> infinite loop!
 *   - Shot 2 (`2.problem`) stages CitizenLead ("Miles") with FloatingItemPyramid + tipping Balance scale.
 *   - Shot 3 (`3.leader`) stages EliteLead ("Sterling") + CommandBoard typewriter + EmeraldFountain explosion!
 */

const CLIMAX_CAM = cam.push({
  on: on(PLACE.hall, 0, 1.45, -2.0),
  dist: 5.2,
  to: 4.4,
  yaw: 12,
  pitch: 7,
  fov: 44,
});

const ClimaxMarket: React.FC<{ t: number }> = ({ t }) => (
  <>
    <ShopStall price={t > 0.7 ? 20 : 10} position={on(PLACE.hall, 0.6, 0, -2.3)} t={t} />
    <CitizenLead
      nameTag="Miles"
      position={on(PLACE.hall, -0.95, 0, -1.8)}
      rotationY={0.35}
      animation={t > 0.7 ? "scared" : "point"}
      face={t > 0.7 ? "wow" : "smile"}
      lookAt={on(PLACE.hall, 0.6, 1.8, -2.3)}
      time={t}
    />
    <EmeraldFountain position={on(PLACE.hall, 0.6, 1.6, -2.3)} t={Math.max(0, t - 0.15)} count={18} />
  </>
);

const problemLook = wordAt("2.problem", "empty");
const crownWord = wordAt("3.leader", "crowns");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Cold Climax & Visual Metaphor Hook",
  shots: [
    {
      cue: "1.hook",
      ...CLIMAX_CAM,
      zone: "hall",
      note: "Frame-0 cold climax hook: ShopStall price flips 10->20 while Miles reacts and emeralds burst upward.",
      stage: (t) => <ClimaxMarket t={t} />,
    },
    {
      cue: "2.problem",
      ...cam.twoShot({
        a: on(PLACE.square, -0.9, 0, 0.6),
        b: on(PLACE.square, 1.0, 0, 0.3),
        facing: 0,
        dist: 5.4,
        to: 4.6,
        side: -12,
        pitch: 9,
        fov: 46,
      }),
      zone: "square",
      note: "Front 9:16 two-shot: Miles builds a FloatingItemPyramid while the Balance scale tips against him.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.65));
        const tip = ease(ramp(t, Math.max(0.2, problemLook - 0.1), problemLook + 0.5));
        return (
          <>
            <FloatingItemPyramid count={Math.max(1, Math.round(ramp(t, 0, 0.8) * 10))} position={on(PLACE.square, -0.9, 2.25, 0.6)} t={t} />
            <Balance
              position={on(PLACE.square, 1.0, 0, 0.3)}
              tilt={-0.38 * tip}
              right={<Pickaxe scale={0.65} />}
            />
            <CitizenLead
              nameTag="Miles"
              position={on(PLACE.square, -1.35 + walk * 0.45, 0, 0.9 - walk * 0.3)}
              rotationY={0.45}
              animation={walk < 0.95 ? "walk" : "shrug"}
              animDistance={walk * 0.55}
              face={tip > 0.4 ? "wow" : "frown"}
              lookAt={on(PLACE.square, 1.0, 1.2, 0.3)}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "3.leader",
      ...cam.twoShot({
        a: on(PLACE.hall, -0.9, 0, 1.2),
        b: on(PLACE.hall, 0.9, 0, 1.2),
        facing: 0,
        dist: 5.8,
        to: 4.9,
        side: 10,
        pitch: 8,
        fov: 46,
      }),
      zone: "hall",
      note: "Front 9:16 two-shot: Sterling and Official type on CommandBoard and trigger an EmeraldFountain explosion.",
      stage: (t) => {
        const burst = Math.max(0, t - Math.max(0.35, crownWord));
        return (
          <>
            <CommandBoard
              lines={["> type a command", "/give @mods emerald 1000"]}
              progress={ramp(t, 0.05, Math.max(0.4, crownWord))}
              position={on(PLACE.hall, 0, 0, -0.2)}
            />
            <EmeraldFountain position={on(PLACE.hall, 0, 1.5, 0.6)} t={burst} count={28} />
            <EliteLead
              variant="pres"
              nameTag="Sterling"
              crown={t >= crownWord}
              position={on(PLACE.hall, -0.9, 0, 1.2)}
              rotationY={0.2}
              animation={burst > 0 ? "cheer" : "point"}
              face="smile"
              time={t}
            />
            <Official
              role="mod"
              position={on(PLACE.hall, 0.9, 0, 1.2)}
              rotationY={-0.25}
              animation={burst > 0 ? "cheer" : "press"}
              face="grin"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.loop",
      ...CLIMAX_CAM,
      zone: "hall",
      note: "Seamless loop payoff returning to the exact Frame-0 ShopStall composition mid-clause.",
      stage: (t) => <ClimaxMarket t={t} />,
    },
  ],
});
