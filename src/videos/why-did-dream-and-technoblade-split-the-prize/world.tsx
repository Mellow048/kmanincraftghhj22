import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool } from "../../engine";
import { Block, Bridge, Island, PLACE, Sun, on } from "./kit";
import { Exhibit1 } from "./scene1";
import { Exhibit2 } from "./scene2";
import { Exhibit3 } from "./scene3";
import { Exhibit4 } from "./scene4";
import { Exhibit5 } from "./scene5";
import { Exhibit6 } from "./scene6";
import { Exhibit7 } from "./scene7";

const Backdrop: React.FC = () => (
  <>
    {/* Distant floating land and blocky tree silhouettes give every island a real horizon. */}
    {[PLACE.arena, PLACE.versions, PLACE.score, PLACE.prize].map((place, i) => (
      <group key={i}>
        <Island position={[place[0] - 2, place[1] - 3.2, -48]} size={[14, 9]} layers={3} top="stone" under="stone" tint={i % 2 ? "#68747f" : "#737b76"} seed={40 + i} />
        <Island position={[place[0] + 6, place[1] - 4.5, -68]} size={[10, 7]} layers={2} top="stone" under="stone" tint="#87909a" seed={50 + i} />
        {[-7, 3].map((dx, j) => (
          <group key={j} position={[place[0] + dx, place[1] - 0.6, -48 + (j ? -1.5 : 1.5)]}>
            <Block position={[0, 0, 0]} size={[0.48, 5.2, 0.48]} color="#584632" castShadow={false} />
            <Block position={[0, 1.2, 0]} size={[2.5, 1.5, 2.5]} color="#365d43" castShadow={false} />
            <Block position={[0, 2.2, 0]} size={[1.9, 1.4, 1.9]} color="#3d7049" castShadow={false} />
            <Block position={[0, 3.05, 0]} size={[1.2, 1.1, 1.2]} color="#4a8050" castShadow={false} />
          </group>
        ))}
      </group>
    ))}
  </>
);

const Landmarks: React.FC = () => (
  <>
    {/* Tournament pennants frame the opening without covering its board or players. */}
    {[-1, 1].map((side) => (
      <group key={side} position={[PLACE.arena[0] + side * 5.1, PLACE.arena[1], PLACE.arena[2] - 1.4]}>
        <Block position={[0, 1.65, 0]} size={[0.14, 3.3, 0.14]} color="#58422d" />
        <Block position={[0, 2.55, 0.12]} size={[0.92, 1.05, 0.12]} color={side < 0 ? "#25a74b" : "#b8323d"} emissive={side < 0 ? "#14622c" : "#711c24"} emissiveIntensity={0.08} />
        <Block position={[0, 3.12, 0.12]} size={[0.92, 0.12, 0.14]} color="#e8bf58" />
      </group>
    ))}
    {/* The score island gets stadium lamps; the final island turns into a small gold prize vault. */}
    {[-1, 1].map((side) => (
      <group key={side} position={[PLACE.score[0] + side * 3.9, PLACE.score[1], PLACE.score[2] - 0.6]}>
        <Block position={[0, 1.5, 0]} size={[0.22, 3, 0.22]} color="#49535e" />
        <Block position={[0, 3.1, 0]} size={[0.82, 0.28, 0.62]} color="#f1d17a" emissive="#ffcf59" emissiveIntensity={0.65} />
        <Block position={[0, 3.36, 0]} size={[0.5, 0.1, 0.4]} color="#fff1c2" emissive="#fff1c2" emissiveIntensity={0.8} />
      </group>
    ))}
    {[-1, 1].map((side) => (
      <Block key={side} position={[PLACE.prize[0] + side * 2.75, PLACE.prize[1] + 2.35, PLACE.prize[2] - 1.25]} size={[0.34, 4.7, 0.34]} color="#c99435" emissive="#7a5319" emissiveIntensity={0.1} />
    ))}
    <Block position={[PLACE.prize[0], PLACE.prize[1] + 4.62, PLACE.prize[2] - 1.25]} size={[5.8, 0.36, 0.38]} color="#e6b944" emissive="#9f6f21" emissiveIntensity={0.12} />
  </>
);

const Sets: React.FC = () => (
  <>
    <Island position={PLACE.arena} size={[12, 11]} layers={3} seed={7} />
    <Island position={PLACE.versions} size={[10, 9]} layers={3} top="stone" under="stoneBrick" seed={8} />
    <Island position={PLACE.score} size={[10, 9]} layers={3} top="stoneBrick" under="stone" seed={9} />
    <Island position={PLACE.prize} size={[10, 9]} layers={3} top="stoneBrick" under="stone" seed={10} />
    <Bridge from={on(PLACE.arena, 6, -0.15, 0)} to={on(PLACE.versions, -5, -0.15, 0)} />
    <Bridge from={on(PLACE.versions, 5, -0.15, 0)} to={on(PLACE.score, -5, -0.15, 0)} />
    <Bridge from={on(PLACE.score, 5, -0.15, 0)} to={on(PLACE.prize, -5, -0.15, 0)} />
  </>
);

export const World: React.FC = () => (
  <>
    <Sun position={[35, 30, -55]} size={8} />
    <Clouds y={-11} center={[25, 0, -8]} span={190} opacity={0.86} />
    <Clouds y={29} center={[25, 0, -28]} span={220} opacity={0.6} />
    <Backdrop />
    <Sets />
    <Landmarks />
    <Exhibit1 /><Exhibit2 /><Exhibit3 /><Exhibit4 /><Exhibit5 /><Exhibit6 /><Exhibit7 />
    <GodRay position={on(PLACE.arena, -2, 7, -3)} rotation={[0, 0, 0.42]} width={4} height={13} color="#fff0c8" opacity={0.075} />
    <LightPool position={on(PLACE.arena, 0, 0.03, 0)} width={8} depth={7} color="#fff0c8" opacity={0.16} />
    <Glow position={on(PLACE.arena, 0, 2, -1)} size={2.2} color="#f3c868" opacity={0.25} />
    <Dust position={on(PLACE.arena, 0, 2, 0)} area={[11, 4, 9]} count={45} size={0.04} color="#fff5d8" opacity={0.56} seed={17} speed={0.2} />
    <LightPool position={on(PLACE.versions, 0, 0.03, 0)} width={7} depth={6} color="#d5e4f4" opacity={0.14} />
    <Glow position={on(PLACE.versions, 0, 2, 0)} size={1.8} color="#e5c878" opacity={0.2} />
    <Dust position={on(PLACE.versions, 0, 2, 0)} area={[9, 4, 8]} count={35} size={0.04} color="#eaf1f5" opacity={0.52} seed={21} speed={0.18} />
    <LightPool position={on(PLACE.score, 0, 0.03, 0)} width={7} depth={6} color="#ffe3a3" opacity={0.17} />
    <Glow position={on(PLACE.score, 0, 2, 0)} size={1.9} color="#eac46e" opacity={0.2} />
    <Dust position={on(PLACE.score, 0, 2, 0)} area={[9, 4, 8]} count={35} size={0.04} color="#fff4d4" opacity={0.5} seed={27} speed={0.18} />
    <LightPool position={on(PLACE.prize, 0, 0.03, 0)} width={7} depth={6} color="#ffe4a2" opacity={0.18} />
    <Glow position={on(PLACE.prize, 0, 1.8, 0)} size={2.2} color="#ffdb72" opacity={0.24} />
    <Dust position={on(PLACE.prize, 0, 2, 0)} area={[9, 4, 8]} count={38} size={0.04} color="#fff3cf" opacity={0.52} seed={33} speed={0.18} />
  </>
);
