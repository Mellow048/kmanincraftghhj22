import { useMemo } from "react";
import {
  Dust,
  Glow,
  GodRay,
  LightPool,
  useActiveShot,
  Zone,
} from "../../engine";
import { Blocks } from "./blocks";
import { rooms, lampMarks, Room } from "./sets";
import { Batch } from "./kit";
export function World() {
  const a = useActiveShot();
  const zone = (a?.shot.zone ?? "cinema") as Room;
  const parts = useMemo(() => {
    const b = new Blocks();
    rooms[zone](b);
    return b.parts;
  }, [zone]);
  return (
    <Zone name={zone}>
      <Batch parts={parts} />
      <hemisphereLight args={["#ffe4bd", "#7985b4", 1.0]} />
      <pointLight
        position={[-1.6, 3.5, 2.2]}
        color="#ffd49c"
        intensity={5.2}
        distance={10}
      />
      {lampMarks[zone].map((p, i) => (
        <Glow key={i} position={p} size={0.89} opacity={0.25} color="#ffb773" />
      ))}
      <GodRay
        position={[1.2, 2, -3]}
        rotation={[0, 0, -0.65]}
        width={0.6}
        height={4.1}
        opacity={0.04}
        color="#abc6ef"
      />
      <LightPool
        position={[0, 0.017, 0.28]}
        width={2.8}
        depth={1.8}
        opacity={0.1}
        color="#ffc77d"
      />
      <Dust
        position={[0, 1.7, -0.8]}
        area={[4, 2.9, 4]}
        count={34}
        size={0.012}
        opacity={0.22}
      />
    </Zone>
  );
}
