import type { Vec3 } from "../../engine";
import { clamp01, storyScene, lerp, smoothstep, useTime } from "../../engine";
import { Boy, HandLantern, Spider } from "./actors";
import { win, timing } from "./shared";

const Actors5: React.FC<{ T: number }> = ({ T }) => {
  const t = T;
    const cross = smoothstep(clamp01((t - 2.2) / 6.6));
    const lift = Math.sin(t * 3.1) * 0.12;
    const mumAt: Vec3 = [
      lerp(-3.5, 1.4, cross),
      Math.sin(clamp01((t - 2.2) / 6.6) * Math.PI) * 1.5,
      lerp(18.3, 21.6, cross),
    ];
    const onRoof = win(t, 14.6, 16.2);
    return (
      <group>
        <Boy position={[-0.15, 0, 21.6]} rotationY={Math.PI * 0.98} face="blank" headYaw={0.1 * Math.sin(t)} />
        {t < 12.6 ? <Spider position={mumAt} rotationY={Math.PI / 2 + cross * 1.6} apron legLift={lift} /> : null}
        {onRoof > 0.01 ? (
          <group position={[-5.6, 4.9, 18.4]} scale={[1, 1, 1]}>
            <Spider position={[0, 0, 0]} rotationY={-1.2} apron scale={1.1} />
          </group>
        ) : null}
        <HandLantern at={[-0.45, 0.16, 22.4]} lit={false} />
      </group>
    );
};

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The Dark",
  shots: [
    {
      cue: "5.still",
      stage: (t) => <Actors5 T={0.0 + t} />,
      from: [0.15, 1.3, 19.2],
      to: [0.05, 1.28, 19.9],
      target: [-0.5, 0.95, 21.4],
      fov: 45,
      ease: "inOutSine",
      handheld: 0.004,
      look: "overworld-night",
      note: "I stood still. Everything in the frame is at rest; the only movement is the camera creeping, which makes the stillness feel like a decision.",
    },
    {
      cue: "5.door",
      stage: (t) => <Actors5 T={1.8 + t} />,
      from: [-2.25, 0.62, 18.95],
      to: [-2.55, 0.68, 18.7],
      target: [-3.66, 0.9, 18.35],
      fov: 42,
      ease: "inOutCubic",
      handheld: 0.005,
      look: "overworld-night",
      note: "She came out of the door. Legs crossing the threshold one at a time, low to the ground: the thing the whole film was told she would not do.",
    },
    {
      cue: "5.eight",
      stage: (t) => <Actors5 T={4.033 + t} />,
      from: [1.7, 3.3, 20.3],
      to: [1.4, 3.6, 20.6],
      target: [-0.9, 0.7, 21.3],
      fov: 48,
      ease: "inOutSine",
      handheld: 0.006,
      look: "overworld-night",
      note: "Eight legs, two wings, then feathers. From above: her body spanning the street over him, and he is a small pale shape underneath that does not move.",
    },
    {
      cue: "5.wind",
      stage: (t) => <Actors5 T={5.733 + t} />,
      from: [-0.35, 0.33, 20.9],
      to: [-0.15, 0.4, 21.3],
      target: [0.1, 1.45, 22.0],
      targetTo: [0.4, 1.6, 22.2],
      fov: 50,
      ease: "linear",
      handheld: 0.008,
      look: "overworld-night",
      note: "I felt the wind of her, twice. Camera on the cobbles looking up: legs pass over the lens like weather.",
    },
    {
      cue: "5.gone",
      stage: (t) => <Actors5 T={8.533 + t} />,
      from: [0, 1.4, 17.8],
      to: [0, 1.4, 18.5],
      target: [0.1, 0.65, 22.0],
      fov: 46,
      ease: "linear",
      handheld: 0.005,
      look: "overworld-night",
      note: "And she was gone. The street, the one dead lantern on the ground, nothing else: the emptiness has to be held long enough to be a relief.",
    },
    {
      cue: "5.quiet",
      stage: (t) => <Actors5 T={9.533 + t} />,
      from: [0, 1.6, 13.6],
      to: [0, 1.62, 14.4],
      target: [0, 4.2, 20.0],
      fov: 50,
      ease: "inOutSine",
      handheld: 0.005,
      look: "overworld-night",
      note: "The sky went quiet. Up over the roofs where they were: an empty sky is a different shot from a dark one, and the film needs the difference.",
    },
    {
      cue: "5.roof",
      stage: (t) => <Actors5 T={10.5 + t} />,
      from: [0, 1.45, 16.4],
      to: [-0.2, 1.5, 16.8],
      target: [-6.2, 5.2, 18.0],
      fov: 42,
      ease: "inOutCubic",
      handheld: 0.004,
      look: "overworld-night",
      note: "She was on the roof. Her silhouette on the ridge line, apron gone pale in the starlight: she is looking down the street, not at him.",
    },
  ],
});
