import { Block, Vox, Tree, Glow, LightPool, PixelText, Dust } from "../../engine";
import { Fence } from "../../../Topics/Recreation";
import { Hut } from "../../../Topics/InThisTown/places";
import { Sofa, ROOM } from "../the-barber-who-never-went-to-parties/kit";
import { LivingShell } from "../the-barber-who-never-went-to-parties/world";
import { Specs, SunHat } from "./cast";
import type { V } from "./cast";
export function Bunting() {
  const colors = ["#e96765", "#ebbb50", "#61b4af", "#a28cc0"];
  return (
    <group position={[0, 0, -1.72]}>
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" position={[s * 2.65, 1.74, 0]} size={[0.14, 3.48, 0.14]} />
      ))}
      {Array.from({ length: 19 }, (_, i) => {
        const x = (i - 9) * 0.286,
          y = 2.78 + 0.42 * (x / 2.65) ** 2;
        return (
          <group key={i} position={[x, y, 0]}>
            <Block size={[0.3, 0.025, 0.033]} color="#635345" rotation={[0, 0, x * 0.13]} />
            {i % 2 === 0 ? (
              <>
                <Block position={[0, -0.106, 0]} size={[0.22, 0.19, 0.04]} color={colors[(i / 2) % 4]} />
                <Block position={[0, -0.227, 0]} size={[0.13, 0.057, 0.041]} color={colors[(i / 2) % 4]} />
              </>
            ) : (
              <Block position={[0, -0.06, 0]} size={[0.07, 0.1, 0.065]} color="#ffcf7a" emissive="#ffd988" emissiveIntensity={0.32} />
            )}
          </group>
        );
      })}
    </group>
  );
}
export function Yard() {
  return (
    <>
      <Vox kind="grass" position={[0, -0.145, -3]} size={[56, 0.28, 43]} />
      <Vox kind="path" position={[0, -0.025, 0.25]} size={[8, 0.058, 4.9]} />
      <Fence from={[-5, 0, -2.55]} to={[5, 0, -2.55]} gap={1.45} />
      <Bunting />
      <Hut at={[-4.1, 0, -4.5]} w={5.2} d={5} h={2.85} tint="#e5bb85" roof="#824d48" windows={[-1.65, 1.2]} />
      <Hut at={[2.36, 0, -5.2]} w={5.6} d={5} h={3.25} tint="#ded1a3" roof="#557879" door={1.5} windows={[-1.13]} />
      <Tree position={[-3.6, 0, -1.5]} height={2.9} />
      <Tree position={[4.2, 0, -4]} height={4} leaf="#729847" />
      <Tree position={[-0.78, 0, -7.2]} height={4} />
      <Vox kind="planks" tint="#b58b69" position={[0, 0.77, -0.09]} size={[2.05, 0.12, 0.63]} />
      {[-0.84, 0.84].map((x) => (
        <Vox key={x} kind="log" position={[x, 0.365, -0.09]} size={[0.13, 0.73, 0.37]} />
      ))}
      <Block position={[0, 0.837, -0.06]} size={[1.53, 0.028, 0.51]} color="#e4ac8e" />
      <pointLight position={[-1.8, 2.4, 2.4]} color="#ffe4b6" intensity={3.7} distance={9} />
      <Glow position={[2.6, 3, -1.7]} size={0.53} color="#ffc685" opacity={0.16} />
      <LightPool position={[0.2, 0.008, -0.4]} width={4.2} depth={2.1} color="#f9ba75" opacity={0.09} />
    </>
  );
}
export const BOX: V = [-0.73, 1.04, 0.38];
export const MARK: V = [0.7, 0.057, -0.54];
export function CameraBox({
  position = BOX,
  push = 0,
  lamp = false,
  turn = 0,
  scale = 1,
}: {
  position?: V;
  push?: number;
  lamp?: boolean;
  turn?: number;
  scale?: number;
}) {
  return (
    <group position={position} rotation={[0, turn, 0]} scale={scale}>
      <Block size={[0.48, 0.34, 0.21]} color="#ad5c46" />
      <Block position={[0, 0.015, -0.106]} size={[0.44, 0.24, 0.035]} color="#ded3af" />
      <Block position={[0, -0.09, 0.11]} size={[0.47, 0.092, 0.032]} color="#665a4e" />
      <Block position={[0, 0.05, 0.13]} size={[0.2, 0.2, 0.08]} color="#403d42" />
      <Block position={[0, 0.05, 0.181]} size={[0.14, 0.14, 0.039]} color="#829c9e" />
      <Block position={[0, 0.05, 0.206]} size={[0.097, 0.097, 0.013]} color="#283b49" />
      <Block
        position={[0.136, 0.104, 0.121]}
        size={[0.056, 0.047, 0.028]}
        color={lamp ? "#ff453a" : "#71382e"}
        emissive="#ff3626"
        emissiveIntensity={lamp ? 0.65 : 0}
      />
      <Block position={[-0.135, 0.119, 0.12]} size={[0.085, 0.041, 0.02]} color="#efe0c4" />
      <Block position={[0.133, 0.2 - 0.029 * push, 0.015]} size={[0.105, 0.055, 0.098]} color={push > 0.55 ? "#de7744" : "#e7bc60"} />
      <Block
        position={[-0.15, 0.073, -0.13]}
        size={[0.06, 0.055, 0.012]}
        color={lamp ? "#ff4936" : "#8e5143"}
        emissive="#ff582c"
        emissiveIntensity={lamp ? 0.4 : 0}
      />
      <Block position={[0, -0.103, -0.133]} size={[0.32, 0.024, 0.018]} color="#353338" />
    </group>
  );
}
export function Stand({ at = BOX }: { at?: V }) {
  return (
    <group position={[at[0], 0, at[2]]}>
      <Vox kind="planks" position={[0, 0.835, 0]} size={[0.62, 0.056, 0.38]} />
      <Block position={[0, 0.43, 0]} size={[0.07, 0.82, 0.07]} color="#726b60" />
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.12, 0.16, 0]} rotation={[0, 0, -s * 0.54]} size={[0.06, 0.39, 0.12]} color="#6b6256" />
      ))}
    </group>
  );
}
export const MARK_WIDTH = 0.64;
export function Tape({ pos = MARK, width = MARK_WIDTH, color = "#ffbc43" }: { pos?: V; width?: number; color?: string }) {
  return (
    <group position={pos}>
      {[-1, 1].map((s) => (
        <Block key={s} rotation={[0, s * 0.78, 0]} size={[width, 0.012, 0.056]} color={color} />
      ))}
    </group>
  );
}
export function Lounge({ t = 0, taped = true }: { t?: number; taped?: boolean }) {
  return (
    <>
      <group position={[-ROOM[0], -ROOM[1], -ROOM[2]]}>
        <LivingShell t={t} party={false} />
      </group>
      <Sofa position={[-0.99, 0.019, -0.35]} width={1.58} color="#788765" />
      <Stand />
      {taped && <Tape />}
      <group position={[1.95, 2.0, -2.55]}>
        <Block size={[1.46, 0.62, 0.06]} color="#684c38" />
        <Block position={[0, 0, 0.04]} size={[1.37, 0.53, 0.024]} color="#638886" />
        <PixelText text="CAMERA CLUB" position={[0, 0.085, 0.058]} maxWidth={1.24} height={0.14} />
        <PixelText text="3 SEC" position={[0, -0.115, 0.061]} maxWidth={0.79} height={0.14} color="#ffe098" />
      </group>
    </>
  );
}
export function DressChair({
  position,
  hat = "none",
  turn = 0,
  wear = 1,
}: {
  position: V;
  hat?: "specs" | "hat" | "none";
  turn?: number;
  wear?: number;
}) {
  return (
    <group position={position} rotation={[0, turn, 0]}>
      <Vox kind="planks" tint="#9b7554" position={[0, 0.48, 0]} size={[0.55, 0.09, 0.53]} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[s * 0.217, 0.24, 0.195]} size={[0.065, 0.48, 0.066]} color="#84634c" />
          <Block position={[s * 0.217, 0.57, -0.218]} size={[0.069, 1.15, 0.071]} color="#84634c" />
        </group>
      ))}
      <Block position={[0, 1.02, -0.218]} size={[0.5, 0.22, 0.068]} color="#976f4c" />
      {hat !== "none" && (
        <>
          <Block position={[0, 1.0, -0.18]} size={[0.6, 0.62, 0.15]} color={hat === "hat" ? "#ad6142" : "#935c87"} />
          <Block
            position={[0.22, 0.76, 0.012]}
            size={[0.17, 0.54, 0.15]}
            rotation={[0.17, 0, -0.16]}
            color={hat === "hat" ? "#a35438" : "#85537d"}
          />
          <Vox kind="planks" position={[0, 1.43, -0.18]} size={[0.35, 0.3, 0.3]} />
          <group position={[0.08 * (1 - wear), 1.47 + 0.37 * (1 - wear), -0.18 + 0.11 * (1 - wear)]} rotation={[0, 0, 0.18 * (1 - wear)]}>
            {hat === "hat" ? <SunHat /> : <Specs />}
          </group>
        </>
      )}
    </group>
  );
}
export const DOOR: V = [0, 0, -0.86];
export function Kitchen() {
  return (
    <>
      <Vox kind="planks" tint="#b7aa91" position={[0, -0.1, 0]} size={[9, 0.2, 8]} />
      <Block position={[0, 2.65, -2.1]} size={[10, 5.3, 0.16]} color="#b8c6b7" />
      <Vox kind="planks" tint="#aec3ad" position={[2.39, 0.49, -1.5]} size={[2.2, 0.98, 1.0]} />
      <Block position={[2.39, 1.01, -1.52]} size={[2.3, 0.085, 1.05]} color="#d9c79c" />
      <group position={DOOR}>
        <Block position={[0, 1.12, -0.52]} size={[1.84, 2.24, 0.84]} color="#688c83" />
        <Block position={[0, 1.52, -0.072]} size={[1.8, 1.36, 0.078]} color="#c4d5bd" />
        <Block position={[0, 0.435, -0.072]} size={[1.8, 0.78, 0.082]} color="#b7cbaf" />
        <Block position={[0.786, 1.3, 0]} size={[0.056, 0.46, 0.104]} color="#8b8069" />
      </group>
      <pointLight position={[-1.15, 2.68, 1.78]} color="#ffe4c6" intensity={4.0} distance={8} />
      <Dust position={[0, 1.65, 0.1]} area={[3, 2, 2]} count={15} size={0.014} opacity={0.23} />
    </>
  );
}
