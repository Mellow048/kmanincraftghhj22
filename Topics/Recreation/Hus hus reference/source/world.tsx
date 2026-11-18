import { useActiveShot, useFilmTime, Dust, GodRay, LightPool, Glow, Zone } from "../../engine";
import { Yard, Lounge, Kitchen } from "./sets";
/** Reuse one set per zone (including its lights); keep the others unmounted. */
export function World() {
  const shot = useActiveShot()?.shot;
  const t = useFilmTime();
  return (
    <>
      {shot?.zone === "yard" && (
        <Zone name="yard">
          <Yard />
          <Dust position={[0, 1.75, -0.4]} area={[6, 3, 3]} size={0.014} count={19} opacity={0.28} seed={14} />
          <GodRay position={[-3, 3.8, -1.2]} rotation={[0.1, 0, 0.57]} width={1.35} height={7} opacity={0.036} color="#ffe0ad" />
        </Zone>
      )}
      {shot?.zone === "room" && (
        <Zone name="room">
          <Lounge t={t} taped={shot.cue !== "3.tape"} />
        </Zone>
      )}
      {shot?.zone === "kitchen" && (
        <Zone name="kitchen">
          <Kitchen />
          <LightPool position={[-0.3, 0.014, -0.28]} width={2.8} depth={1.55} color="#fff1c8" opacity={0.09} />
          <Glow position={[1.9, 2.35, -1.5]} size={0.44} color="#ffe3ba" opacity={0.09} />
        </Zone>
      )}
    </>
  );
}
