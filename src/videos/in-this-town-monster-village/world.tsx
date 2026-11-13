import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
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
    {[-8, -3.5, 1].map((x) => [-4.6, -0.4].map((z) => <Vox key={`${x}${z}`} kind="log" position={[x, 1.7, z]} size={[0.3, 3.4, 0.3]} />))}
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

    <Well position={[-6, 0, 7]} />

    {(
      [
        [-16, -13.5, 4],
        [6, -15.5, 4.4],
        [16, -13, 3.8],
        [28, -11, 4.6],
        [8, 17, 4.4],
        [30, 13, 4],
        [33, 3, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    {/* The tree the postman uses. */}
    <Tree position={[-12, 0, 6.5]} height={5.2} leaf="#3f7f2d" />
    {[-31, -34, -37, -33, -39].map((x, i) => (
      <Pine key={i} position={[x, 3, -9 + i * 5.5]} height={6 + (i % 2)} />
    ))}
    <LampPost position={[-9.2, 0, -0.4]} seed={2} />
    <LampPost position={[7.4, 0, 5.0]} seed={3} />
    <LampPost position={[15.6, 0, -1.0]} seed={4} />
    <LampPost position={[-16, 0, 4.9]} seed={5} />
  </>
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
    <pointLight position={[-4, 3.5, 6]} color="#9fb4ff" intensity={14} distance={18} decay={2} />
    <pointLight position={[9, 3.5, 2]} color="#9fb4ff" intensity={12} distance={16} decay={2} />
  </>
);

export const World: React.FC = () => (
  <>
    <Zone name="village">
      <Village />
    </Zone>
    <Zone name="day">
      <Day />
    </Zone>
    <Zone name="night">
      <Night />
    </Zone>
  </>
);
