import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, PixelText, Tree, Vox, Zone } from "../../engine";
import { Hut, LampPost, Lantern, Moon, Pine, Stars, Well } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

/**
 * THE MONSTER VILLAGE, in zones.
 *
 *   village  One street, west–east (x). House fronts on the north side face south, at the camera. The square is at
 *            x = 0. The teller's house is at x = 10, Mo's at the far east end. West of x = −22 the ground steps up
 *            to a hill: that is where the players come from.
 *   day      Sun, clouds, the shade the monsters keep to.
 *   night    Stars, a moon, lit windows, lamps.
 *   class    The classroom, far off to the south-east: "class+classS+day" seen from the board, "class+classN+day" seen from the back.
 *
 * A shot's zone is "village+day" or "village+night". 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[140, 1, 90]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[64, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />

    {/* The hill in the west: five steps up to a flat top at y = 3. Same numbers as hillY() in the kit. */}
    {[0, 1, 2, 3, 4].map((i) => (
      <Vox key={i} kind="grass" position={[-22.5 - i, (i + 1) * 0.25, 2]} size={[1.02, (i + 1) * 0.5, 44]} />
    ))}
    <Vox kind="grass" position={[-37.5, 1.5, 2]} size={[21, 3, 44]} />

    {/* The ledge, in the sun, and the bush beside it. */}
    <Vox kind="cobble" position={[PLACE.ledge[0], 0.25, PLACE.ledge[2]]} size={[3.4, 0.5, 1.1]} />
    <Vox kind="leaves" position={[PLACE.bush[0], 0.45, PLACE.bush[2]]} size={[1.2, 0.9, 1.1]} />
    <Vox kind="leaves" position={[PLACE.bush[0] - 0.3, 1.0, PLACE.bush[2]]} size={[0.7, 0.5, 0.7]} />

    {/* The pond, east of the ledge: where Mo fishes. */}
    <Block position={[PLACE.pond[0], 0.03, PLACE.pond[2]]} size={[5, 0.06, 4]} color="#3f78c8" castShadow={false} />
    <Vox kind="cobble" position={[PLACE.pond[0] - 2.7, 0.15, PLACE.pond[2]]} size={[0.5, 0.3, 4.4]} />

    {/* The market hall: a dark roof on six posts. The monsters keep under it by day. */}
    {([[-8, -4.6], [-3.5, -4.6], [1, -4.6], [-8, -0.4], [1, -0.4]] as Array<[number, number]>).map(([x, z]) => [ <Vox key={`${x}${z}`} kind="log" position={[x, 1.7, z]} size={[0.3, 3.4, 0.3]} />])}
    <Vox kind="darkPlanks" position={[PLACE.shade[0], 3.5, PLACE.shade[2]]} size={[9.8, 0.2, 5]} />

    {/* North side, west to east. Fronts face south. Dark roofs: this is not the villagers' town. */}
    <Hut at={[-19, 0, -5]} w={7} wall="cobble" roof="#3a2f4a" windows={[-2, 2]} />
    <Hut at={[-9.5, 0, -6.5]} w={6} h={3.6} wall="cobble" roof="#2f4a3a" windows={[-2, 2]} />
    <Hut at={[1, 0, -8]} w={8} d={7} h={4.6} tint="#8f8a7a" roof="#4a2f2f" windows={[-2.6, 2.6]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={PLACE.mo} w={6} h={3.6} tint="#d8c49a" roof="#8a6a2a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-14, 0, 12]} w={7} wall="cobble" roof="#4a2f2f" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[-2, 0, 13]} w={6} h={3.6} wall="cobble" roof="#3a2f4a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[22, 0, 12]} w={6.5} wall="cobble" roof="#2f4a3a" windows={[-1.6]} door={1.3} turn={Math.PI} />

{/* The school: red, the last building on the street, with its name over the door. */}
    <Hut at={PLACE.school} w={8} d={7} h={4.4} tint="#b5523a" roof="#34343e" windows={[-2.7, 2.7]} />
    <Block position={[PLACE.school[0], 3.35, PLACE.school[2] + 0.16]} size={[3.5, 0.72, 0.08]} color="#f1ece0" />
    <PixelText text="SCHOOL" position={[PLACE.school[0], 3.35, PLACE.school[2] + 0.22]} height={0.46} maxWidth={3.2} color="#2a2a33" />
    <LampPost position={[26.3, 0, -3.2]} seed={7} />
    <Vox kind="path" position={[31, 0.02, -2.4]} size={[2.4, 0.06, 6.6]} />

    <Well position={[-6, 0, 7]} />

    {(
      [
        [-16, -13.5, 4],
        [6, -15.5, 4.4],
        [16, -13, 3.8],
        [39, -12, 4.6],
        [8, 17, 4.4],
        [30, 13, 4],
        [39, 5, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    {/* The tree the postman uses. */}
    <Tree position={[-12, 0, 6.5]} height={5.2} leaf="#3f7f2d" />
    {[-31, -34, -37, -33, -39].map((x, i) => (
      <Pine key={i} position={[x, 3, -9 + i * 5.5]} height={6 + (i % 2)} />
    ))}
    {/* The forest behind the hill: where the second lot come from. Nothing stands in the lane the players use. */}
    {(
      [
        [-36, -6], [-40, -3.5], [-43, -8], [-46, -4.5], [-38, -12], [-44, -14], [-41, 8.5], [-45, 7], [-37, 10.5], [-43, 12],
        [-46.5, 1.5], [-47, 16], [-35, 17], [-40, 19], [-33, -15], [-47.5, -11],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <Pine key={`f${i}`} position={[x, 3, z]} height={6.4 + (i % 3) * 0.8} />
    ))}
    <LampPost position={[-9.2, 0, -0.4]} seed={2} />
    <LampPost position={[7.4, 0, 5.0]} seed={3} />
    <LampPost position={[15.6, 0, -1.0]} seed={4} />
    <LampPost position={[-16, 0, 4.9]} seed={5} />
  </>
);

const CL = PLACE.classroom;
const SEAT_X = [-1, 0, 1];
const SEAT_Z = [0, 1.6];

/** The classroom: six desks in two rows, facing north to the board. Its two end walls are zones of their own, so a camera can stand where either one is. */
const Classroom: React.FC = () => (
  <group position={CL}>
    <Vox kind="planks" position={[0, -0.1, 0]} size={[9, 0.2, 11]} />
    <Vox kind="planks" tint="#cdb48c" position={[-4.5, 2.3, 0]} size={[0.2, 4.6, 11]} castShadow={false} />
    <Vox kind="planks" tint="#cdb48c" position={[4.5, 2.3, 0]} size={[0.2, 4.6, 11]} castShadow={false} />
    {SEAT_Z.map((z) =>
      SEAT_X.map((x) => (
        <group key={`${x}${z}`} position={[x, 0, z - 0.55]}>
          <Block position={[0, 0.6, 0]} size={[0.8, 0.07, 0.48]} color="#9a6a34" />
          <Block position={[-0.34, 0.29, 0]} size={[0.07, 0.58, 0.4]} color="#6b4a2a" />
          <Block position={[0.34, 0.29, 0]} size={[0.07, 0.58, 0.4]} color="#6b4a2a" />
          <Block position={[0.1, 0.65, 0.02]} size={[0.3, 0.03, 0.22]} color="#f1ece0" castShadow={false} />
        </group>
      )),
    )}
    <pointLight position={[0, 3.6, 0]} color="#fff0d0" intensity={24} distance={12} decay={2} />
  </group>
);
const ClassSouth: React.FC = () => (
  <group position={CL}>
    <Vox kind="planks" tint="#c8ad84" position={[0, 2.3, 4.2]} size={[9, 4.6, 0.2]} castShadow={false} />
    {[-2.4, 2.4].map((x) => (
      <group key={x} position={[x, 2.2, 4.08]}>
        <Block size={[1.7, 1.5, 0.06]} color="#5c3f24" castShadow={false} />
        <Block position={[0, 0, -0.03]} size={[1.46, 1.26, 0.06]} color="#000000" emissive="#bfe2ff" emissiveIntensity={1} castShadow={false} />
      </group>
    ))}
    <Block position={[0, 1.1, 4.08]} size={[1.1, 2.2, 0.08]} color="#7a5632" castShadow={false} />
    <Vox kind="log" position={[0, 3.5, 4.05]} size={[9, 0.3, 0.3]} />
  </group>
);
const ClassNorth: React.FC = () => (
  <group position={CL}>
    <Vox kind="planks" tint="#c8ad84" position={[0, 2.3, -3.6]} size={[9, 4.6, 0.2]} castShadow={false} />
    <Block position={[-0.7, 2.05, -3.46]} size={[4.3, 2.0, 0.08]} color="#5c3f24" castShadow={false} />
    <Block position={[-0.7, 2.05, -3.42]} size={[4.0, 1.7, 0.06]} color="#23402f" castShadow={false} />
    <PixelText text="LOOK HERE" position={[-0.7, 2.3, -3.36]} height={0.44} maxWidth={3.4} color="#f1ece0" />
    <Block position={[-0.7, 1.7, -3.37]} size={[2.6, 0.06, 0.03]} color="#f1ece0" castShadow={false} />
    <Vox kind="log" position={[0, 4.2, -3.45]} size={[9, 0.3, 0.3]} />
  </group>
);

const Day: React.FC = () => (
  <>
    <Clouds y={48} center={[0, 0, 0]} />
    <GodRay position={[2, 6.5, 4]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.07} />
    <LightPool position={[3.5, 0.07, 6.6]} width={6} depth={4} color="#fff2c8" opacity={0.2} />
    <Glow position={[3.5, 2.6, 5]} size={2.2} color="#ffe08a" opacity={0.18} />
    <Dust position={[0, 2.2, 3]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const Night: React.FC = () => (
  <>
    <Stars center={[0, 0, 0]} radius={150} count={260} seed={4} />
    <Moon position={[30, 44, -90]} radius={6} rotation={[0.3, -0.3, 0]} glow={0.5} />
    <Lantern position={[8.7, 2.9, -4.3]} light={9} reach={10} seed={2} />
    <Lantern position={[0.4, 3.2, 1.0]} chain={0.2} light={0} seed={5} />
    <GodRay position={[9, 6.5, -2]} rotation={[0, 0, -0.4]} width={5} height={12} color="#b8c8ff" opacity={0.05} />
    <LightPool position={[9.5, 0.07, -1.5]} width={9} depth={7} color="#b8c8ff" opacity={0.12} />
    <Glow position={[8.7, 2.6, -4.2]} size={1.8} color="#ffb347" opacity={0.3} />
    <Dust position={[0, 2.2, 1]} area={[36, 4, 14]} count={50} size={0.04} color="#cfd8ff" opacity={0.5} seed={7} speed={0.15} />
    {/* The moon does not reach the street: these do. One over the square where the fight is, one each way along it. */}
    <pointLight position={[-4.5, 4.2, 5.6]} color="#b4c2ff" intensity={46} distance={16} decay={2} />
    <pointLight position={[-10, 4.2, 4.6]} color="#b4c2ff" intensity={34} distance={15} decay={2} />
    <pointLight position={[2, 4.2, 5]} color="#b4c2ff" intensity={30} distance={15} decay={2} />
    <pointLight position={[10, 4.2, 1.5]} color="#b4c2ff" intensity={34} distance={15} decay={2} />
    <pointLight position={[-25, 6.5, 2]} color="#b4c2ff" intensity={40} distance={16} decay={2} />
    <pointLight position={[23, 4.2, 4]} color="#b4c2ff" intensity={34} distance={15} decay={2} />
  </>
);

export const World: React.FC = () => (
  <>
    <Zone name="village">
      <Village />
    </Zone>
    <Zone name="class">
      <Classroom />
    </Zone>
    <Zone name="classS">
      <ClassSouth />
    </Zone>
    <Zone name="classN">
      <ClassNorth />
    </Zone>
    <Zone name="day">
      <Day />
    </Zone>
    <Zone name="night">
      <Night />
    </Zone>
  </>
);
