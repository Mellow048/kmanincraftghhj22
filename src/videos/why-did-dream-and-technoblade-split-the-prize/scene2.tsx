import type React from "react";
import { Block, Coin, Dream, PLACE, ScoreText, STOPS, Technoblade, clock, flightScene, timing } from "./kit";

export const Exhibit2: React.FC = () => {
  const show = Math.max(0, Math.min(1, (clock.useSince("2.styles") + 0.2) / 0.45));
  const home = clock.useSince("3.home");
  const flip = clock.useSince("3.versions");
  const switchBeat = clock.useSince("3.advantage");
  const players = switchBeat < 0;
  const crossing = Math.max(0, Math.min(1, home / 1.25));
  const dreamX = PLACE.versions[0] + (-2.5 + 5 * crossing);
  const technoX = PLACE.versions[0] + (2.5 - 5 * crossing);
  const dreamZ = PLACE.versions[2] + 2.7 + (home >= 0 ? Math.sin(Math.min(1, home / 1.25) * Math.PI) * 0.5 : 0);
  const technoZ = PLACE.versions[2] + 2.1 - (home >= 0 ? Math.sin(Math.min(1, home / 1.25) * Math.PI) * 0.5 : 0);
  const coinY = flip < 0 ? PLACE.versions[1] + 1.05 : PLACE.versions[1] + 1.05 + Math.abs(Math.sin(flip * 8)) * 0.9;
  const turned = flip < 0 ? 0 : flip * 10;
  const firstVersion = switchBeat < 0 || Math.floor(Math.max(0, switchBeat) * 2) % 2 === 0;
  return (
    <>
      {switchBeat < 0 && <group scale={show}>
        {/* Two distinct combat-version gates replace the bare pair of blocks. */}
        {[-1, 1].map((side) => {
          const x = PLACE.versions[0] + side * 3.25;
          const hue = side < 0 ? "#516b9b" : "#8c557f";
          return (
            <group key={side} position={[x, PLACE.versions[1], PLACE.versions[2] - 1.15]}>
              <Block position={[0, 1.38, 0]} size={[1.15, 2.45, 0.07]} color={hue} emissive={hue} emissiveIntensity={0.55} opacity={0.58} />
              <Block position={[-0.78, 1.4, 0]} size={[0.22, 2.9, 0.35]} color={side < 0 ? "#415b82" : "#725071"} />
              <Block position={[0.78, 1.4, 0]} size={[0.22, 2.9, 0.35]} color={side < 0 ? "#415b82" : "#725071"} />
              <Block position={[0, 2.82, 0]} size={[1.78, 0.22, 0.35]} color="#d2a94c" />
              <Block position={[0, 0.08, 0]} size={[1.78, 0.16, 0.35]} color="#65523a" />
              <Block position={[0, 1.4, 0.23]} size={[0.1, 2.35, 0.1]} color={side < 0 ? "#91b8ed" : "#d49ce0"} emissive={side < 0 ? "#91b8ed" : "#d49ce0"} emissiveIntensity={0.7} />
            </group>
          );
        })}
        <Block position={[PLACE.versions[0] - 1.8, PLACE.versions[1] + 0.42, PLACE.versions[2] - 0.1]} size={[1.6, 0.84, 1.6]} color={firstVersion ? "#485e7d" : "#6b553c"} />
        <Block position={[PLACE.versions[0] + 1.8, PLACE.versions[1] + 0.42, PLACE.versions[2] - 0.1]} size={[1.6, 0.84, 1.6]} color={firstVersion ? "#6b553c" : "#485e7d"} />
        <ScoreText at={[PLACE.versions[0] - 1.8, PLACE.versions[1] + 1.5, PLACE.versions[2] + 0.5]} text="1.8" color={firstVersion ? "#ffe49c" : "#b8c4d2"} height={0.48} />
        <ScoreText at={[PLACE.versions[0] + 1.8, PLACE.versions[1] + 1.5, PLACE.versions[2] + 0.5]} text="1.16" color={firstVersion ? "#b8c4d2" : "#ffe49c"} height={0.48} />
        <Block position={[PLACE.versions[0], PLACE.versions[1] + 0.04, PLACE.versions[2] + 3.1]} size={[8.5, 0.08, 0.15]} color="#d4aa46" emissive="#b8892e" emissiveIntensity={0.13} />
        <Coin position={[PLACE.versions[0], coinY, PLACE.versions[2] + 0.6]} size={0.82} kind="gold" spin={turned} glow={0.45} scale={flip < 0 ? 0.85 : 1} />
        <ScoreText at={[PLACE.versions[0], PLACE.versions[1] + 2.7, PLACE.versions[2] + 0.55]} text="ROUND 1" height={0.26} color="#fff1c1" />
        {players && (
          <group>
          <Dream
            position={[dreamX, PLACE.versions[1], dreamZ]}
            scale={0.68}
            animation={flip >= 0 ? (flip < 0.7 ? "reachUp" : "lookAround") : home >= 0 && home < 1.15 ? "walk" : "talk"}
            animDistance={home >= 0 && home < 1.25 ? home * 2.4 : undefined}
            rotationY={home >= 0 && home > 0.65 ? -0.42 : 0.42}
            lookAt={flip >= 0 ? [PLACE.versions[0], coinY, PLACE.versions[2] + 0.6] : [technoX, PLACE.versions[1] + 1.4, technoZ]}
            face="calm"
            time={Math.max(0, home, flip)}
          />
          <Technoblade
            position={[technoX, PLACE.versions[1], technoZ]}
            scale={0.68}
            animation={flip >= 0 ? (flip < 0.7 ? "reachUp" : "lookAround") : home >= 0 && home < 1.15 ? "walk" : "talk"}
            animDistance={home >= 0 && home < 1.25 ? home * 2.4 : undefined}
            rotationY={home >= 0 && home > 0.65 ? 0.42 : -0.42}
            lookAt={flip >= 0 ? [PLACE.versions[0], coinY, PLACE.versions[2] + 0.6] : [dreamX, PLACE.versions[1] + 1.4, dreamZ]}
            face="brave"
            time={Math.max(0, home, flip)}
          />
          </group>
        )}
      </group>}
    </>
  );
};

export const scene2 = flightScene(timing, {
  id: "scene2",
  title: "Different combat versions",
  from: STOPS.event,
  shots: [
    { cue: "2.styles", to: STOPS.styles, note: "Two physical version pedestals put Dream's newer-combat comfort beside Techno's known 1.8 specialty." },
    { cue: "3.home", to: STOPS.home, note: "The raised seam divides the two halves; neither player owns a permanent home side in this format." },
    { cue: "3.versions", to: STOPS.versions, note: "The coin rises above round one as the two version plaques trade places, showing the format's changing ground." },
  ],
});
