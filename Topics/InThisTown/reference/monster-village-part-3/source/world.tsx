import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Vox, Zone } from "../../engine";
import { DarkOakForest, Hut, Mansion, MansionHall, Moon, Stars } from "../../../Topics/InThisTown";
import { World as PartTwo } from "../in-this-town-monster-village-part-2/world";
import { CAGE_X, CASTLE, Cage, MANSION, MHALL } from "./kit";

/**
 * PART THREE'S WORLD: everything parts one and two had (the village, the farm, the hideout), and three new places.
 *
 *   castle   The village the players keep their prisoners in: a few houses, a row of five cages, and a castle wall
 *            with towers all the way round it. Day. No south wall: that is where the camera lives.
 *   mansion  The pillagers' mansion from outside, in a dark oak forest, at night: the pack's `Mansion` and
 *            `DarkOakForest` (Topics/InThisTown/mansion.tsx), with this film's moon and fill light.
 *   mhall    Its hall: the pack's `MansionHall`.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const STONE = "#8d8d8d";

/** A length of castle wall with teeth on top. `along` "x" runs east–west. */
const Wall: React.FC<{ at: [number, number]; length: number; along: "x" | "z"; height?: number }> = ({ at, length, along, height = 6 }) => {
  const n = Math.floor(length / 2);
  return (
    <group position={[at[0], 0, at[1]]} rotation={[0, along === "z" ? Math.PI / 2 : 0, 0]}>
      <Vox kind="stoneBrick" position={[0, height / 2, 0]} size={[length, height, 1.6]} />
      <Block position={[0, height + 0.05, 0]} size={[length, 0.1, 2.0]} color="#77777a" castShadow={false} />
      {Array.from({ length: n }, (_, i) => (
        <Vox key={i} kind="stoneBrick" position={[-length / 2 + 1 + i * 2, height + 0.5, 0.6]} size={[1, 0.9, 0.5]} />
      ))}
    </group>
  );
};

/** A tower: square, taller than the wall, teeth round the top, slits for windows. */
const Tower: React.FC<{ at: [number, number]; height?: number; size?: number; gate?: boolean }> = ({ at, height = 10, size = 4.4, gate = false }) => (
  <group position={[at[0], 0, at[1]]}>
    <Vox kind="stoneBrick" position={[0, height / 2, 0]} size={[size, height, size]} />
    <Block position={[0, height + 0.06, 0]} size={[size + 0.6, 0.12, size + 0.6]} color="#77777a" />
    {[-1, 1].map((sx) =>
      [-1, 1].map((sz) => <Vox key={`${sx}${sz}`} kind="stoneBrick" position={[sx * (size / 2 + 0.05), height + 0.55, sz * (size / 2 + 0.05)]} size={[1, 1, 1]} />),
    )}
    {[-1, 1].map((s) => (
      <Vox key={s} kind="stoneBrick" position={[0, height + 0.55, s * (size / 2 + 0.05)]} size={[1, 1, 0.5]} />
    ))}
    <Block position={[0, height * 0.62, size / 2 + 0.01]} size={[0.4, 1.3, 0.04]} color="#15151a" castShadow={false} />
    {gate ? (
      <>
        <Block position={[0, 1.7, size / 2 + 0.02]} size={[2.6, 3.4, 0.06]} color="#1a1410" castShadow={false} />
        {[-1, -0.5, 0, 0.5, 1].map((x) => (
          <Block key={x} position={[x, 1.7, size / 2 + 0.07]} size={[0.1, 3.4, 0.06]} color="#3a3d44" castShadow={false} />
        ))}
        {[0.9, 1.9, 2.9].map((y) => (
          <Block key={y} position={[0, y, size / 2 + 0.07]} size={[2.6, 0.1, 0.06]} color="#3a3d44" castShadow={false} />
        ))}
      </>
    ) : null}
    {/* A flag. */}
    <Block position={[0, height + 2.1, 0]} size={[0.1, 3, 0.1]} color="#5c3f24" />
    <Block position={[0.55, height + 3.1, 0]} size={[1, 0.7, 0.05]} color="#b0302a" castShadow={false} />
  </group>
);

const Castle: React.FC = () => (
  <group position={CASTLE}>
    <Vox kind="grass" position={[0, -0.25, -2]} size={[60, 0.5, 52]} />
    <Vox kind="path" position={[0, 0.02, -5.2]} size={[3.2, 0.06, 13.5]} />
    <Vox kind="path" position={[0, 0.021, 1.2]} size={[16, 0.06, 5.4]} />
    <Wall at={[0, -14]} length={36} along="x" />
    <Wall at={[-17.5, -4]} length={22} along="z" />
    <Wall at={[17.5, -4]} length={22} along="z" />
    <Tower at={[-17.5, -14]} />
    <Tower at={[17.5, -14]} />
    <Tower at={[0, -14.4]} height={11.5} size={5.4} gate />
    <Tower at={[-17.5, 7]} height={9} />
    <Tower at={[17.5, 7]} height={9} />
    <Hut at={[-9.5, 0, -6]} w={6} h={3.6} tint="#caa268" roof="#8a3b2a" windows={[-1.7]} door={1.2} />
    <Hut at={[9.5, 0, -6.5]} w={6.5} wall="cobble" roof="#3f6b3a" windows={[1.8]} door={-1.2} />
    <Hut at={[-11.5, 0, 3]} w={5} d={5} h={3.4} tint="#d8c49a" roof="#8a6a2a" door={0} turn={Math.PI / 2} />
    <Hut at={[12, 0, 3]} w={5} d={5} h={3.4} wall="cobble" roof="#4a2f2f" door={0} turn={-Math.PI / 2} />
    {CAGE_X.map((x) => (
      <Cage key={x} position={[x, 0, 0]} />
    ))}
    {/* Hay in his cage and Mo's, a bucket, a few crates: somebody lives here now. */}
    <Vox kind="hay" position={[CAGE_X[0] - 0.55, 0.2, -0.6]} size={[0.9, 0.3, 0.8]} />
    <Vox kind="hay" position={[CAGE_X[4] + 0.5, 0.2, -0.6]} size={[0.9, 0.3, 0.8]} />
    <Vox kind="planks" position={[7.6, 0.4, 1.6]} size={[0.8, 0.8, 0.8]} />
    <Vox kind="planks" position={[8.3, 0.3, 2.3]} size={[0.6, 0.6, 0.6]} />
    <Clouds y={46} center={[0, 0, 0]} />
    <GodRay position={[-3, 6.5, 1]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.08, 1]} width={14} depth={5} color="#fff2c8" opacity={0.14} />
    <Glow position={[-3, 3, 1]} size={3} color="#ffe08a" opacity={0.14} />
    <Dust position={[0, 2.2, 0]} area={[30, 4, 14]} count={60} size={0.045} color="#fff7d8" opacity={0.5} seed={9} speed={0.2} />
  </group>
);

const MansionOutside: React.FC = () => (
  <>
    <DarkOakForest at={MANSION} />
    <Mansion at={MANSION} />
    <group position={MANSION}>
      <Stars center={[0, 0, 0]} radius={150} count={240} seed={11} />
      <Moon position={[-34, 40, -80]} radius={6} rotation={[0.3, 0.3, 0]} glow={0.5} />
      <pointLight position={[0, 6, 9]} color="#b4c2ff" intensity={70} distance={26} decay={2} />
      <pointLight position={[-10, 8, 6]} color="#b4c2ff" intensity={60} distance={24} decay={2} />
      <pointLight position={[10, 8, 6]} color="#b4c2ff" intensity={60} distance={24} decay={2} />
      <pointLight position={[0, 14, 4]} color="#b4c2ff" intensity={60} distance={26} decay={2} />
      <pointLight position={[0, 5, 22]} color="#b4c2ff" intensity={50} distance={24} decay={2} />
      <Dust position={[0, 3, 8]} area={[30, 5, 20]} count={50} size={0.04} color="#cfd8ff" opacity={0.5} seed={12} speed={0.15} />
    </group>
  </>
);

export const World: React.FC = () => (
  <>
    <PartTwo />
    <Zone name="castle">
      <Castle />
    </Zone>
    <Zone name="mansion">
      <MansionOutside />
    </Zone>
    <Zone name="mhall">
      <MansionHall at={MHALL} />
    </Zone>
  </>
);
