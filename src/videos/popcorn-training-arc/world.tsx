import { memo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { BasicShadowMap } from "three";
import { Block, ContactShadow, Dust, Glow, GodRay, LightPool, PixelText, Sign, Vox, pixelTex, useFilmTime, woodTexture } from "../../engine";
import { CUT, DESK, FPS, SINK, SURFACE } from "./marks";

// Floor y=0; counter ends x=-3.3/+3.12, z=.43..1.24; performance lane z=-.60..+.30.
// Desk → sink → catch pad is one real bench. The camera's lane is entirely in front of it.
const OAK = "#c79a67";
const TEAL = "#386261";
const TRIM = "#243b39";
const CHALK = "#e3dcbe";
const WALL = "#709587";

const Architecture = memo(() => <>
  <Vox kind="planks" tint="#8b654b" position={[0, -0.13, 0.94]} size={[8.8, 0.25, 7.1]} />
  <Block position={[0, 1.66, -2.10]} size={[8.7, 3.42, 0.20]} map={pixelTex(WALL, [8, 3], { jitter: 0.05 })} />
  <Block position={[-4.24, 1.66, -0.37]} size={[0.21, 3.42, 3.53]} map={pixelTex("#657c67", [3, 3], { jitter: 0.06 })} />
  <Block position={[4.20, 1.66, -0.37]} size={[0.20, 3.42, 3.53]} map={pixelTex("#799080", [3, 3], { jitter: 0.07 })} />
  <Vox kind="planks" tint={TEAL} position={[0, 0.55, -1.964]} size={[8.65, 1.12, 0.075]} />
  <Vox kind="planks" tint={TRIM} position={[0, 1.12, -1.914]} size={[8.65, 0.077, 0.16]} />
  <Vox kind="planks" tint={TRIM} position={[0, 0.065, -1.906]} size={[8.65, 0.13, 0.16]} />
  {[-3.46, -1.26, 0.38, 2.89].map((x) => <Vox key={x} kind="log" tint="#785b41" position={[x, 1.68, -1.909]} size={[0.15, 3.32, 0.18]} />)}
  <Vox kind="log" tint="#604532" position={[0, 3.14, -1.82]} size={[8.71, 0.18, 0.26]} />
  <Block position={[0, 3.43, 0.54]} size={[8.64, 0.17, 5.42]} map={woodTexture("#594739", [8, 6])} castShadow={false} />
  <Vox kind="wool" tint="#84667b" position={[1.02, 0.016, -0.88]} size={[3.78, 0.035, 1.87]} />
  <Vox kind="wool" tint="#264d50" position={[-1.6, 0.016, 0.01]} size={[2.94, 0.034, 0.71]} />

  {/* Peach sky and blocky ridge inside the real sill, not a glowing white rectangle. */}
  <group position={[-0.47, 2.05, -1.927]}>
    <Block size={[1.42, 1.26, 0.11]} color="#b98b59" />
    <Block position={[0, 0, 0.068]} size={[1.26, 1.12, 0.038]} color="#b3dddf" emissive="#7ebdd7" emissiveIntensity={0.4} />
    <Block position={[0, -0.409, 0.094]} size={[1.24, 0.30, 0.019]} color="#719786" emissive="#6c967d" emissiveIntensity={0.23} />
    <Block position={[0.36, 0.277, 0.095]} size={[0.21, 0.225, 0.015]} color="#ffdf9e" emissive="#ffcb82" emissiveIntensity={0.48} castShadow={false} />
    {[-0.52, -0.23, 0.55].map((x, i) => <Block key={x} position={[x, -0.35 + 0.046 * i, 0.11]} size={[0.19, 0.31 + i * 0.09, 0.018]} color={i % 2 ? "#4f7b77" : "#5f8e7c"} castShadow={false} />)}
    <Block position={[0, 0, 0.15]} size={[0.058, 1.16, 0.12]} color="#edd3a4" />
    <Block position={[0, -0.043, 0.146]} size={[1.33, 0.055, 0.14]} color="#edd3a4" />
    <Vox kind="planks" tint={OAK} position={[0, -0.63, 0.20]} size={[1.66, 0.095, 0.36]} />
  </group>

  <Sign position={[-2.37, 2.12, -1.91]} width={1.54} height={0.77} title="MOVIE NIGHT" subtitle="THREE CATCHES" bg="#243e46" fg="#ffdb8a" accent="#d9694c" lit={0.26} />
  <Sign position={[3.39, 1.96, -1.92]} width={0.61} height={0.77} title="SNACKS" subtitle="NO REFUNDS" bg="#e2bc84" fg="#673d31" accent="#ae5346" lit={0.16} />
  <ContactShadow position={[1.19, 0.025, -1.32]} width={2.9} depth={1.24} opacity={0.36} />
  <group position={[1.30, 0, -1.45]}>
    <Vox kind="planks" tint="#563d32" position={[0, 0.14, 0]} size={[2.03, 0.22, 0.83]} />
    <Vox kind="wool" tint="#567d83" position={[0, 0.43, -0.30]} size={[2.14, 0.73, 0.27]} />
    {[-1, 1].map((s) => <group key={s}>
      <Vox kind="wool" tint="#487981" position={[s * 0.97, 0.39, 0.024]} size={[0.23, 0.49, 0.78]} />
      <Vox kind="wool" tint="#609399" position={[s * 0.43, 0.30, 0.048]} size={[0.81, 0.21, 0.64]} />
      <Vox kind="wool" tint={s < 0 ? "#cb804b" : "#d6b975"} position={[s * 0.66, 0.59, -0.125]} size={[0.33, 0.31, 0.16]} rotation={[0.12, 0, s * 0.20]} />
    </group>)}
  </group>
  <Vox kind="planks" tint={OAK} position={[2.75, 1.38, -1.42]} size={[0.72, 0.07, 0.54]} />
  {[0, 1, 2].map((i) => <Vox key={i} kind="wool" tint={["#a2664e", "#675c75", "#d3ad66"][i]} position={[2.54 + i * 0.13, 1.59 - i * .018, -1.41]} size={[.105, .32 - i * .035, .29]} rotation={[0, 0, .07 * i]} />)}
</>);

const Workbench = memo(() => <>
  <Vox kind="planks" tint={OAK} position={[-0.09, SURFACE - 0.056, .835]} size={[6.42, .112, .806]} />
  <Block position={[-0.09, SURFACE - .128, 1.227]} size={[6.42, .038, .044]} color="#794c37" />
  <Vox kind="planks" tint={TRIM} position={[-0.09, .063, .93]} size={[6.24, .125, .52]} />
  {[-2.94, -2.12, -1.299, -.479, .341, 1.161, 1.981, 2.801].map((x, i) => <group key={x}>
    <Block position={[x, .42, .925]} size={[.804, .65, .559]} color={i === 7 ? "#71453a" : "#315a55"} />
    <Vox kind="planks" tint={i === 7 ? "#a2634c" : "#528471"} position={[x, .438, 1.214]} size={[.712, .518, .038]} />
    <Block position={[x, .61, 1.25]} size={[.207, .041, .060]} color="#d7ad6e" metalness={0.24} />
    <Block position={[x, .238, 1.239]} size={[.572, .022, .014]} color="#294a45" castShadow={false} />
  </group>)}

  {/* Desk. Chunky shell, stand, vent and screen; the player's mouse is in the performance. */}
  <group position={[DESK - 0.377, SURFACE, 0.916]} rotation-y={1.17}>
    <Block position={[0, .031, 0]} size={[.465, .062, .343]} color="#37464b" />
    <Block position={[0, .115, -.036]} size={[.164, .161, .153]} color="#c4bd9c" />
    <Block position={[0, .325, -.038]} size={[.56, .383, .338]} color="#d2c49d" />
    <Block position={[0, .334, .145]} size={[.492, .306, .048]} color="#374d54" />
    <Block position={[0, .355, .173]} size={[.441, .238, .016]} color="#35676b" emissive="#2d9c91" emissiveIntensity={.48} />
    <PixelText text="PLAY" position={[0, .374, .185]} height={.113} color="#bdf5d4" />
    {[-.148, -.101, -.054, -.007].map((x) => <Block key={x} position={[x, .225, .175]} size={[.022, .012, .01]} color="#81a4a1" castShadow={false} />)}
    <Block position={[.196, .229, .18]} size={[.032, .022, .015]} color="#9dffa8" emissive="#83f4a3" emissiveIntensity={.7} />
  </group>
  <group position={[DESK - .371, SURFACE, 1.115]} rotation-y={.09}>
    <Block position={[0, .024, 0]} size={[.443, .044, .157]} color="#656f69" />
    {[0, 1].map((row) => Array.from({length: 7}, (_, key) => <Block key={`${row}-${key}`} position={[.056 * (key - 3), .051, .056 * (row - .5)]} size={[.046, .017, .046]} color={key === 6 ? "#83b4a2" : "#e3d5b2"} castShadow={false} />))}
  </group>
  <Vox kind="wool" tint="#344852" position={[DESK + .305, SURFACE + .012, .72]} size={[.679, .026, .533]} />
  <Block position={[DESK + .305, SURFACE + .026, .979]} size={[.641, .006, .023]} color="#6b9c94" castShadow={false} />

  {/* Enamel sink, tiled drip tray and two handled taps. */}
  <group position={[SINK - 0.34, SURFACE, .821]}>
    <Block position={[0, .026, 0]} size={[.511, .051, .545]} color="#839ba7" metalness={.19} />
    <Block position={[0, .057, 0]} size={[.405, .018, .426]} color="#365465" />
    <Block position={[0, .067, 0]} size={[.355, .009, .362]} color="#629caa" metalness={.14} roughness={.48} />
    <Block position={[0, .075, -.024]} size={[.105, .009, .105]} color="#3f6970" />
    {[0, .019, -.019].map((x) => <Block key={x} position={[x, .081, -.025]} size={[.009, .004, .076]} color="#a7b6b6" castShadow={false} />)}
    <Block position={[0, .130, .272]} size={[.094, .219, .073]} color="#b6c6c1" metalness={.26} />
    <Block position={[0, .241, .156]} size={[.094, .058, .247]} color="#c9dcce" metalness={.28} />
    <Block position={[0, .207, .051]} size={[.080, .086, .066]} color="#bdccc5" metalness={.27} />
    {[-1, 1].map((s) => <group key={s} position={[s * .175, .047, .275]}>
      <Block position={[0, .046, 0]} size={[.074, .107, .072]} color="#aebfb9" />
      <Block position={[0, .105, 0]} size={[.142, .037, .053]} color={s < 0 ? "#a75b4b" : "#517ea1"} />
    </group>)}
  </group>
  <Block position={[SINK + .27, SURFACE + .011, .641]} size={[.55, .024, .401]} color="#687d82" />
  {[0, 1, 2, 3, 4].map((i) => <Block key={i} position={[SINK + .068 + i * .107, SURFACE + .026, .639]} size={[.026, .01, .363]} color="#829899" castShadow={false} />)}
  <Block position={[SINK + .05, SURFACE + .104, 1.056]} size={[.095, .188, .110]} color="#5f9c8c" />
  <Block position={[SINK + .05, SURFACE + .206, 1.057]} size={[.073, .028, .096]} color={CHALK} />
  <Vox kind="wool" tint="#af7b5c" position={[1.642, SURFACE + .017, .878]} size={[1.02, .033, .612]} />
  <Block position={[1.642, SURFACE + .036, 1.170]} size={[.984, .012, .023]} color="#e3bb82" castShadow={false} />
</>);

export const World = () => {
  // Use sharp, voxel-style shadow edges in this room. Scope the choice to
  // this canvas; the shared renderer and other films keep their presets.
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const previous = gl.shadowMap.type;
    gl.shadowMap.type = BasicShadowMap;
    gl.shadowMap.needsUpdate = true;
    return () => { gl.shadowMap.type = previous; gl.shadowMap.needsUpdate = true; };
  }, [gl]);
  const t = useFilmTime();
  const lamp = t >= CUT.drills / FPS;
  return <>
    <Architecture />
    <Workbench />
    <hemisphereLight color="#e6f3f4" groundColor="#534d63" intensity={0.94} />
    <pointLight position={[0.15, 2.52, -0.93]} color="#9cdeff" intensity={17} distance={6.7} decay={2} />
    <pointLight position={[1.98, 2.72, 0.96]} color={lamp ? "#ffcb83" : "#e3faff"} intensity={lamp ? 13.6 : 9.7} distance={5.9} decay={2} />
    <pointLight position={[-2.01, 2.02, 1.36]} color="#f9dfad" intensity={7.7} distance={5} decay={2} />
    {[-2.32, 1.02].map((x, i) => <group key={x} position={[x, 2.84, -0.44]}>
      <Block position={[0, .259, 0]} size={[.053, .405, .063]} color="#283c3c" />
      <Block position={[0, .050, 0]} size={[.518, .155, .479]} color={i ? "#a35649" : "#46626a"} />
      <Block position={[0, -.039, 0]} size={[.410, .034, .361]} color="#ffecbf" emissive="#ffc276" emissiveIntensity={i && lamp ? .96 : .39} />
      <Glow position={[0, -.095, 0]} color="#ffc77c" size={.74} opacity={.21} />
    </group>)}
    <GodRay position={[-.851, 1.48, -.969]} rotation={[.15, 0, -.55]} width={1.14} height={2.57} color="#bbdded" opacity={.10} />
    <LightPool position={[-.53, .039, -.445]} width={3.0} depth={1.85} color="#90bed2" opacity={.18} />
    <LightPool position={[1.20, .041, .029]} width={2.1} depth={1.43} color="#ffae64" opacity={lamp ? .28 : .11} />
    <Dust position={[.28, 1.89, -.29]} area={[6.5, 1.8, 2.7]} count={37} size={.018} color="#ffedd3" opacity={.29} seed={54} />
  </>;
};
