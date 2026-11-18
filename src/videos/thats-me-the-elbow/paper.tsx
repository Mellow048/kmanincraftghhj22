import { useLoader } from "@react-three/fiber";
import { TextureLoader, SRGBColorSpace } from "three";
import { staticFile } from "remotion";
import { Block, PixelText } from "../../engine";
import type { Vec3 } from "../../engine";
import { DOOR } from "./sets";
import { go, vMix } from "./kit";
export type Negative = "elbow" | "ear" | "brow" | "four" | "family" | "bomb" | "jun" | "jul" | "aug" | "sep" | "oct";
/** Actual exposures from negatives.tsx. ThreeCanvas holds the frame for useLoader's Suspense boundary. */
export function Print({
  name,
  position = [0, 0, 0],
  width = 1,
  roll = 0,
  turn = 0,
  label = "",
  magnet = false,
}: {
  name: Negative;
  position?: Vec3;
  width?: number;
  roll?: number;
  turn?: number;
  label?: string;
  magnet?: boolean;
}) {
  const map = useLoader(TextureLoader, staticFile("prints/thats-me-the-elbow/" + name + ".jpg"));
  map.colorSpace = SRGBColorSpace;
  map.anisotropy = 4;
  return (
    <group position={position} scale={width} rotation={[0, turn, roll]}>
      <Block size={[1, 0.865, 0.015]} color="#f6eed9" castShadow={false} />
      <mesh position={[0, 0.043, 0.009]}>
        <planeGeometry args={[0.934, 0.7005]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {label && <PixelText text={label} position={[0, -0.363, 0.012]} height={0.064} maxWidth={0.86} color="#897c68" />}
      {magnet && (
        <>
          <Block position={[-0.012, 0.39, 0.027]} size={[0.1, 0.069, 0.035]} color="#a75242" />
          <Block position={[-0.017, 0.405, 0.051]} size={[0.082, 0.072, 0.034]} color="#eb9c60" />
        </>
      )}
    </group>
  );
}
export const BIG: Vec3 = [-0.1, 1.487, -0.871];
export function DoorPhotos({
  main = "elbow",
  lift = 0,
  reveal = 1,
  magnet = true,
}: {
  main?: "elbow" | "family" | "blank";
  lift?: number;
  reveal?: number;
  magnet?: boolean;
}) {
  const small: Array<[Negative, number, number, number, string]> = [
    ["jun", -0.54, 1.952, -0.09, "2019"],
    ["sep", 0.009, 1.95, 0.051, "2020"],
    ["jul", 0.51, 1.95, -0.085, "2021"],
    ["oct", 0.51, 1.464, 0.055, "2022"],
    ["aug", -0.51, 0.961, -0.062, "2023"],
  ];
  return (
    <>
      {small.map(([n, x, y, a, d]) => (
        <Print key={n} name={n} width={0.426} roll={a} position={[x, y, DOOR[2] - 0.018]} magnet label={d} />
      ))}
      {main !== "blank" && (
        <Print
          name={main}
          width={0.75}
          position={main === "elbow" ? vMix(BIG, [-0.98, 0.75, -0.25], lift) : vMix([-0.77, 0.99, -0.23], BIG, reveal)}
          roll={main === "elbow" ? -0.039 - 0.21 * lift : 0.157 * (1 - reveal) - 0.018}
          magnet={magnet}
          label={main === "family" ? "GRAN'S BIRTHDAY" : "LAST BIRTHDAY"}
        />
      )}
    </>
  );
}
export const PIC: Vec3 = [0, 1.54, 0.6];
export function LiftPrint({
  name,
  t,
  label = "",
  roll = -0.055,
  width = 1.28,
}: {
  name: Negative;
  t: number;
  label?: string;
  roll?: number;
  width?: number;
}) {
  const lift = go(t, -0.05, 0.29);
  return (
    <group
      position={[PIC[0] + 0.038 * (1 - lift), PIC[1] - 0.135 * (1 - lift), PIC[2]]}
      rotation={[0, 0, roll + (1 - lift) * 0.107]}
      scale={width}
    >
      <Print name={name} label={label} />
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.455, -0.381, -0.045]} rotation={[0.25, 0, s * 0.25]}>
          <Block
            position={[0, -0.205, 0]}
            size={[0.144, 0.41, 0.15]}
            color={name === "bomb" ? (s < 0 ? "#367f76" : "#c15c67") : name === "elbow" || name === "family" ? "#90558c" : "#2366d5"}
          />
          <Block
            position={[-s * 0.019, 0.003, 0.061]}
            size={[0.089, 0.122, 0.083]}
            color={name === "bomb" && s < 0 ? "#815938" : "#dfac83"}
          />
        </group>
      ))}
    </group>
  );
}
