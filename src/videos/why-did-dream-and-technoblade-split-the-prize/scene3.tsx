import type React from "react";
import { Block, Dream, Glow, PLACE, STOPS, Technoblade, VoxelSword, clock, flightScene, timing } from "./kit";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const hit = (t: number, start: number, span: number) => {
  const p = (t - start) / span;
  return p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p);
};

/** A playable duel beat: both fighters close, exchange sword strikes, recoil, and counter. */
export const Exhibit3: React.FC = () => {
  const approach = clock.useSince("3.advantage");
  const lead = clock.useSince("3.lead");
  const t = Math.max(0, lead);
  const technoSwing = lead >= 0 ? Math.max(hit(t, 0.15, 0.5), hit(t, 2.15, 0.42)) : 0;
  const dreamSwing = lead >= 0 ? Math.max(hit(t, 0.95, 0.5), hit(t, 3.05, 0.42)) : 0;
  const technoHit = lead >= 0 ? Math.max(hit(t, 0.62, 0.34), hit(t, 2.58, 0.34)) : 0;
  const dreamHit = lead >= 0 ? Math.max(hit(t, 1.43, 0.34), hit(t, 3.48, 0.34)) : 0;
  const clash = Math.max(technoSwing * dreamHit, dreamSwing * technoHit, technoSwing * 0.35, dreamSwing * 0.35);
  const close = clamp01(Math.max(0, approach) / 1.15);
  const dreamX = PLACE.versions[0] - 2.05 + close * 0.56 - technoHit * 0.32 + dreamSwing * 0.38;
  const technoX = PLACE.versions[0] + 2.05 - close * 0.56 + technoSwing * 0.38 - dreamHit * 0.32;
  const dreamZ = PLACE.versions[2] + 1.45 + technoHit * 0.22;
  const technoZ = PLACE.versions[2] + 1.45 + dreamHit * 0.22;
  const show = clamp01((approach + 0.18) / 0.42);

  return (
    <group scale={show}>
      {/* A ringed combat court distinct from the coin-toss display in the previous shot. */}
      <Block position={[PLACE.versions[0], PLACE.versions[1] + 0.12, PLACE.versions[2] + 1.35]} size={[7.3, 0.22, 3.8]} color="#334d5a" />
      <Block position={[PLACE.versions[0] - 3.2, PLACE.versions[1] + 0.26, PLACE.versions[2] + 1.35]} size={[0.26, 0.12, 3.8]} color={lead < 0 ? "#8798a4" : "#d3ad50"} emissive={lead >= 0 ? "#b7892f" : undefined} emissiveIntensity={0.15} />
      <Block position={[PLACE.versions[0], PLACE.versions[1] + 0.25, PLACE.versions[2] - 0.58]} size={[7.3, 0.11, 0.12]} color="#7f4ca0" emissive="#633583" emissiveIntensity={0.2} />

      <Technoblade
        position={[technoX, PLACE.versions[1] + 0.24, technoZ]}
        rotationY={-0.42}
        animation={lead < 0 ? (approach < 1.15 ? "run" : "talk") : technoSwing > 0.2 ? "reach" : dreamHit > 0.18 ? "stagger" : "walk"}
        animDistance={lead < 0 ? close * 1.25 : Math.max(0, t) * 0.23}
        plantFeet={lead < 0}
        face={dreamHit > 0.18 ? "hurt" : "brave"}
        lookAt={[dreamX, PLACE.versions[1] + 1.4, dreamZ]}
        time={Math.max(0, approach, lead)}
        children={<VoxelSword blade="#d6e3e9" grip="#7f2635" />}
      />
      <Dream
        position={[dreamX, PLACE.versions[1] + 0.24, dreamZ]}
        rotationY={0.42}
        animation={lead < 0 ? (approach < 1.15 ? "run" : "point") : dreamSwing > 0.2 ? "reach" : technoHit > 0.18 ? "stagger" : "walk"}
        animDistance={lead < 0 ? close * 1.25 : Math.max(0, t) * 0.23}
        plantFeet={lead < 0}
        face={technoHit > 0.18 ? "hurt" : "brave"}
        lookAt={[technoX, PLACE.versions[1] + 1.4, technoZ]}
        time={Math.max(0, approach, lead)}
        children={<VoxelSword blade="#d9e6ee" grip="#249847" />}
      />

      {/* Brief crossed blades and an impact flash mark contact; the fighters reset and counter. */}
      {clash > 0.02 && (
        <group position={[PLACE.versions[0], PLACE.versions[1] + 1.65, PLACE.versions[2] + 1.45]} rotation-y={lead * 2.2} scale={clash}>
          <Block position={[0, 0, 0]} size={[1.05, 0.09, 0.09]} rotation={[0, 0, 0.72]} color="#fff0a7" emissive="#ffd35c" emissiveIntensity={0.85} />
          <Block position={[0, 0, 0]} size={[1.05, 0.09, 0.09]} rotation={[0, 0, -0.72]} color="#eaf7ff" emissive="#91d9ff" emissiveIntensity={0.75} />
          <Glow size={0.95} color="#ffe58a" opacity={0.85} />
        </group>
      )}
    </group>
  );
};

export const scene3 = flightScene(timing, {
  id: "scene3",
  title: "The matchup and the edge",
  from: STOPS.versions,
  shots: [
    { cue: "3.advantage", to: STOPS.advantage, note: "The fighters run from the version gates into the duel ring; Techno's 1.8 specialty is an edge, not a guaranteed win." },
    { cue: "3.lead", to: STOPS.lead, note: "They exchange sword strikes and counterattacks as the next version change keeps either lead uncertain." },
  ],
});
