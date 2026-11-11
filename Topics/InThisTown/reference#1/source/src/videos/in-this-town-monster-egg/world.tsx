import {
  Block, ContactShadow, Dust, Glow, GodRay, LightPool, Sign,
} from "../../engine";
import { NeighborhoodMap, SchoolMap, MARKS } from "../../../Topics/InThisTown/maps";

/**
 * ONE WORLD, mounted once for the film. 1 unit = 1 metre, y=0 is the floor.
 * STREET x -2.8..2.8, z -10..3.55; hero's house x=-5.5,z=-4.5.
 * SCHOOL front opening x -1.15..1.15 at z=3.55; hall z=3.55..8.65.
 * RESTROOM doorway x=3.15,z=6.25 leads right to a complete bathroom.
 * CLASSROOM opening x -1.15..1.15 at z=8.65; room x -4.5..4.5,z=8.65..16.25.
 * The camera enters through BOTH main doorways. Nothing teleports or owns its own canvas.
 */
export const World: React.FC = () => (
  <group>
    <NeighborhoodMap />
    <SchoolMap />

    {/* Three jobs on top of the town-day sun: warm street practical, cool window rim, classroom fill. */}
    <pointLight position={[2.9, 2.55, 0.7]} color="#ffdb9f" intensity={3.0} distance={5.2} decay={2} />
    <pointLight position={[-3.9, 2.0, 11.0]} color="#a9daea" intensity={4.8} distance={6.5} decay={2} />
    <pointLight position={[2.4, 2.75, 13.8]} color="#ffe0a5" intensity={3.1} distance={5} decay={2} />

    {/* Egg-day stand on the curb: the hero's rank starts here. */}
    <Block position={[0.82, 0.52, -2.7]} size={[0.34, 1.04, 0.34]} color="#486d71" />
    <Block position={[0.82, 1.04, -2.7]} size={[0.5, 0.11, 0.5]} color="#d5b381" />
    <Sign position={[0.82, 1.39, -2.75]} rotationY={Math.PI} width={0.62} height={0.56} title="1" subtitle="RANK" bg="#f1e0bc" fg="#304a50" accent="#ce7755" lit={0.4} />
    <Glow position={[0.8, 1.35, -2.95]} size={0.7} color="#f6c48b" opacity={0.2} />
    <ContactShadow position={MARKS.egg} width={0.95} depth={0.78} opacity={0.42} />

    {/* School's real lights have visible sources in SchoolMap; these are their pools and air. */}
    <GodRay position={[-2.65, 1.72, 10.75]} rotation={[0, 0.13, -0.83]} width={1.2} height={3.6} color="#bce4e1" opacity={0.07} />
    <LightPool position={[-2.1, 0.016, 11.2]} width={2.7} depth={2.2} color="#bcebe1" opacity={0.2} />
    <LightPool position={[0, 0.016, 6.7]} width={2.6} depth={2.2} color="#ffdb9d" opacity={0.09} />
    <Glow position={[-4.2, 1.95, 10.65]} size={1.8} color="#b9e4e1" opacity={0.16} />
    <Dust position={[0, 1.67, 12.2]} area={[7.5, 2.7, 6.4]} count={95} size={0.025} color="#f7e7b7" opacity={0.28} seed={17} speed={0.38} />
    <Dust position={[0, 1.8, -1.0]} area={[6.0, 2.7, 8.0]} count={70} size={0.025} color="#f6e4bb" opacity={0.18} seed={9} speed={0.25} />
  </group>
);
