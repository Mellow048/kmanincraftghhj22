import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Zone, useActiveShot, useFilmTime } from "../../engine";
import { Gym, LANTERN, PLACE, wordAt } from "./kit";

/** Rain is deterministic and only exists in the two storm passages. */
const Storm: React.FC<{ active: boolean }> = ({ active }) => {
  const t = useFilmTime();
  if (!active) return null;
  const flash = Math.pow(Math.max(0, Math.sin(t * 8.7 + 0.6)), 34);
  return (
    <group>
      {/* Wide, low voxel clouds: enough to change the sky without hiding the school gate. */}
      {[-6, -1, 4, 8].map((x, i) => (
        <Block key={`cloud-${i}`} position={[x + Math.sin(t * 0.16 + i) * 0.3, 7.3 + (i % 2) * 0.35, 25.5 + (i - 1) * 0.8]} size={[5.8, 0.42, 2.5]} color="#343248" opacity={0.88} transparent castShadow={false} receiveShadow={false} />
      ))}
      {Array.from({ length: 46 }, (_, i) => {
        const phase = (t * 3.8 + i * 0.6180339) % 1;
        const x = ((i * 37) % 19) - 9 + Math.sin(t * 1.2 + i) * 0.16;
        const z = 20 + ((i * 23) % 15) - 7 + phase * 1.6;
        const y = 0.55 + phase * 6.2;
        return (
          <Block key={`rain-${i}`} position={[x, y, z]} rotation={[0, 0, -0.18]} size={[0.022, 0.48, 0.022]} color="#b4c6ec" emissive="#8da9e6" emissiveIntensity={0.32} opacity={0.68} transparent castShadow={false} receiveShadow={false} />
        );
      })}
      <pointLight position={[0, 6.7, 25]} color="#f0eeff" intensity={flash * 30} distance={38} decay={2} />
    </group>
  );
};

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const cue = active?.shot.cue ?? "";
  const beat = Number(cue.split(".")[0] ?? 0);
  const night = look !== "overworld-day";
  const storm = look === "overworld-storm";
  const shotTime = active?.t ?? 0;
  let lanternBroken = beat === 1 || (beat >= 7 && beat <= 12);
  if (beat === 6) lanternBroken = cue !== "6.accident" || shotTime >= wordAt("6.accident", "snapped");
  if (beat === 13 && cue === "13.repair") lanternBroken = shotTime < wordAt("13.repair", "switch");
  const lightColor = lanternBroken ? "#f04536" : "#ffbd62";

  return (
    <Zone name="parade">
      {/* The pack's gym opens directly onto the path, gate and school street: our parade route. */}
      <Gym at={PLACE.parade} night={night} dance={false} />
      {/* Air, a ground pool and a warm edge keep the new outdoor place dimensional in every shot. */}
      <GodRay position={[-4.8, 3.2, 21.0]} rotation={[0, 0, -0.35]} width={3.0} height={6.5} color={night ? "#93a9ff" : "#fff0c8"} opacity={night ? 0.075 : 0.12} />
      <LightPool position={[0, 0.018, 26.8]} width={8.5} depth={6.5} color={lanternBroken ? "#9e4348" : "#ffca70"} opacity={night ? 0.26 : 0.16} />
      <Glow position={[LANTERN[0], LANTERN[1] + 1.35, LANTERN[2]]} size={4.2} color={lightColor} opacity={lanternBroken ? 0.12 : 0.24} />
      <Dust position={[0, 1.8, 25.5]} area={[12, 3.5, 12]} count={54} size={0.035} color={night ? "#b9c8e8" : "#fff1cf"} opacity={0.36} seed={47} speed={0.2} />
      <pointLight position={[LANTERN[0], LANTERN[1] + 1.2, LANTERN[2] + 0.15]} color={lightColor} intensity={lanternBroken ? 3 : night ? 28 : 8} distance={10} decay={2} />
      <Storm active={storm} />
    </Zone>
  );
};
