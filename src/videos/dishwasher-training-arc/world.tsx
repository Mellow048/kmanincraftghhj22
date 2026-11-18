import { memo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { BasicShadowMap } from "three";
import {
  Bed, Block, ContactShadow, Curtains, Door, DoorFrame, Dust, Glow, GodRay, LightPool,
  Sign, Tree, Vox, WallClock, WetFloorSign, WindowUnit, Zone, pixelTex, useFilmTime,
} from "../../engine";
import type { Vec3 } from "../../engine";
import { Hut, LanternLine } from "../../../Topics/InThisTown/places";
import { Lantern } from "../../../Topics/InThisTown/things";
import { KitchenShelf, KitchenStove } from "../../../Topics/InThisTown/endertown";
import { CUT, HOME, MARK, PASS, SHOP, rise, window, FPS } from "./marks";
import { Bench, Cubes, PALETTE as P, SinkFittings } from "./props";
import type { Cube } from "./props";

// y=0 is the floor on each set. Home: camera side +Z. Sink at z=.70;
// front door at x=1.14,z=-1.91. Kitchen connects left to hall x=-2.65…-5.65,
// then bed/lounge x=-5.65…-9.6. Shop: entry +Z, pass z=1.38, sink z=-.50.
// Street is an exterior zone, with the shop at (2.10,0,-3.44). The two doors
// face the lane. Shots of the street, the hall and the shop hide unused sets.
const STOREFRONT = 2.09;
const DOOR_X = 1.02;
const FRONT = 4.50;
const HOUSE_DOOR = 1.02;

const Tile = memo(({ center, cols, rows, step = .36, warm = false }: { center: Vec3; cols: number; rows: number; step?: number; warm?: boolean }) => {
  const parts: Cube[] = [];
  const colors = warm ? ["#96816b", "#a7937a", "#84796d", "#b09a79"] : ["#7a9994", "#b5c1aa", "#68807f", "#a3b59b"];
  for (let row=0;row<rows;row++) for (let col=0;col<cols;col++) {
    const p: Vec3 = [center[0]+(col-(cols-1)/2)*step,center[1]-.021,center[2]+(row-(rows-1)/2)*step];
    parts.push({p,s:[step-.016,.038,step-.016],c:colors[(col+row)%2 + ((row*3+col*5)%7<2?2:0)]});
  }
  return <><Block position={[center[0],center[1]-.042,center[2]]} size={[cols*step,.079,rows*step]} color="#334647" castShadow={false} /><Cubes parts={parts} /></>;
});

const Trim = ({ x, z, w, base = P.teal, above = P.sage }: { x:number; z:number; w:number; base?:string; above?:string }) => <group position={[x,0,z]}>
  <Block position={[0,1.646,0]} size={[w,3.34,.138]} map={pixelTex(above,[5,3],{jitter:.055})} />
  <Vox kind="planks" tint={base} position={[0,.523,.078]} size={[w,1.05,.041]} />
  <Vox kind="log" tint="#3d4236" position={[0,.086,.103]} size={[w,.118,.068]} />
  <Vox kind="log" tint="#6b4b37" position={[0,1.071,.112]} size={[w,.073,.081]} />
  <Vox kind="log" tint="#755840" position={[0,3.127,.132]} size={[w,.183,.21]} />
</group>;

const Contact = ({ at, w, d }: { at: Vec3; w:number; d:number }) => <ContactShadow position={at} width={w} depth={d} opacity={.32} />;

const TrimWindow = ({ p, w = 1.27, curtains = "#a46048", dim = .75 }: { p: Vec3; w?: number; curtains?: string; dim?:number }) => <group position={p}>
  <WindowUnit width={w} height={1.06} dim={dim} />
  <Vox kind="planks" tint={P.oak} position={[0,-.656,.112]} size={[w+.37,.117,.245]} />
  <Block position={[0,.025,.106]} size={[.050,1.034,.060]} color="#e2c5a1" />
  <Block position={[0,-.043,.109]} size={[w,.043,.060]} color="#d8b690" />
  <Curtains position={[0,.51,.14]} height={1.07} width={w+.24} color={curtains} gap={w-.17} />
</group>;

const Pendant = ({ at, shade = P.red, intensity = 10 }: { at: Vec3; shade?: string; intensity?: number }) => <group position={at}>
  <Block position={[0,.365,0]} size={[.043,.612,.043]} color="#4a382e" />
  <Block position={[0,.054,0]} size={[.496,.154,.438]} color={shade} />
  <Block position={[0,-.033,0]} size={[.438,.058,.375]} color="#ffd095" emissive="#ffa13e" emissiveIntensity={.61} />
  <pointLight position={[0,-.133,0]} color="#ffd0a0" intensity={intensity} distance={4.5} decay={2} />
  <Glow position={[0,-.080,0]} color="#ffbc76" size={.68} opacity={.24} />
</group>;

function DoorSet({ at, width, open, facing = 0, paint = P.teal, light = "#ffd29e", height = 2.26 }: {
  at:Vec3; width:number; open: number; facing?:number; paint?: string; light?:string; height?:number;
}) {
  return <group position={at} rotation-y={facing}>
    <DoorFrame width={width} height={height} color="#573a2a" />
    <Door width={width} height={height} position={[-width/2,0,0]} open={open} color={paint} />
    <Vox kind="stone" tint="#788078" size={[width+.29,.057,.44]} position={[0,.012,.102]} />
    <LightPool position={[0,.049,.43]} width={width+.72} depth={1.9} opacity={.15*Math.abs(open)} color={light} />
  </group>;
}

const HouseShell = memo(() => <>
  <Vox kind="planks" tint="#8c654d" position={[0,-.103,.66]} size={[5.58,.202,5.34]} />
  <Tile center={[-.42,.002,1.89]} cols={10} rows={6} />
  <Trim x={-1.25} w={2.97} z={-1.97} />
  <Trim x={2.34} w={.86} z={-1.97} />
  <Vox kind="log" tint="#765840" position={[1.07,2.81,-1.97]} size={[1.73,1.04,.15]} />
  <group position={[2.73,0,.35]} rotation-y={-Math.PI/2}><Trim x={0} z={0} w={4.70} /></group>
  <group position={[-2.735,0,-.60]} rotation-y={Math.PI/2}><Trim x={0} z={0} w={2.70} /></group>
  <Vox kind="log" tint="#4a3c2e" position={[-2.70,2.72,1.18]} size={[.19,.88,1.37]} />
  <Vox kind="log" tint="#654831" position={[0,3.25,.16]} size={[5.50,.125,4.32]} />
  {[-2.62,-1.66,.18,1.90,2.56].map((x) => <Vox key={x} kind="log" tint="#664a36" position={[x,1.55,-1.866]} size={[.101,3.08,.14]} />)}
  <TrimWindow p={[-.855,2.103,-1.849]} curtains="#a97045" />
  <Sign title="HELP WANTED" subtitle="THE BLOCK BOWL" lines={["DISHWASHER"]} position={[-2.049,1.867,-1.757]} width={.93} height={.67} bg="#243d35" fg="#ffdf9e" accent="#ce794c" lit={.24} />
  <WallClock position={[2.321,2.37,-1.83]} radius={.185} />
  <Bench x={-.346} z={.736} width={3.49} surface={HOME.surface} chest={.695} />
  <SinkFittings x={HOME.plate[0]} y={HOME.surface} z={HOME.plate[2]} />
  <KitchenStove position={[-2.03,0,-1.08]} lit={false} />
  <KitchenShelf position={[-1.90,1.18,-1.72]} />
  <Vox kind="planks" tint="#683e38" position={[2.265,.328,.062]} size={[.55,.57,.512]} />
  <Vox kind="wool" tint="#a4634e" position={[2.265,.635,.062]} size={[.57,.11,.53]} />
  <Contact at={[2.26,.014,.068]} w={.73} d={.63} />
</>);

const Porch = memo(() => <>
  <Vox kind="grass" tint="#435a49" position={[.14,-.18,-4.28]} size={[7,.30,5.62]} />
  <Vox kind="cobble" tint="#556978" position={[.68,-.043,-3.35]} size={[3.48,.078,3.34]} />
  <Hut at={[.27,-.039,-6.74]} w={3.85} h={2.6} d={2.72} tint="#a46b50" roof="#51405c" windows={[.92,-1.01]} lit />
  <Tree position={[3.64,-.09,-4.85]} height={3.04} leaf="#344953" />
  <Lantern position={[2.61,2.19,-3.55]} scale={.73} light={4.6} color="#ffbd6c" />
  <pointLight position={[1.21,1.54,-2.92]} color="#a4c6ff" intensity={10.2} distance={4.1} decay={2} />
</>);

const Hall = memo(() => <>
  <Tile center={[-4.24,.002,1.22]} cols={9} rows={8} step={.355} warm />
  <Trim x={-4.22} z={-.23} w={3.32} base="#886342" above="#c3a277" />
  {[-5.62,-2.71].map(x=><Vox key={x} kind="log" tint="#4c4137" position={[x,1.48,.04]} size={[.13,2.98,.23]} />)}
  <DoorFrame position={[-5.64,0,1.06]} rotationY={Math.PI/2} width={1.61} color="#634531" />
  <DoorFrame position={[-2.71,0,1.17]} rotationY={Math.PI/2} width={1.56} color="#634531" />
  <Block position={[-4.48,1.32,-.081]} size={[1.59,.14,.061]} color="#6b4d36" />
  {[-4.96,-4.65,-4.34,-4.03].map((x,i)=><Block key={x} position={[x,1.33,-.020]} size={[.045,.045,.08]} color={i===0?"#839e8a":"#c49655"} />)}
  <Vox kind="wool" tint="#586d87" position={[-4.93,1.033,-.011]} size={[.28,.52,.10]} rotation={[0,0,.12]} />
  <Vox kind="wool" tint="#b76046" position={[-4.60,.996,-.007]} size={[.27,.57,.08]} rotation={[0,0,-.14]} />
  <Sign title="HOME" position={[-3.57,1.75,-.137]} width={.64} height={.33} bg="#45362a" fg="#ffd79f" />
  <Vox kind="planks" tint="#684735" position={[-5.46,.251,.34]} size={[.35,.48,.53]} />
  <Vox kind="wool" tint="#9c553c" position={[-5.44,.511,.34]} size={[.43,.097,.57]} />
  <Pendant at={[-4.54,2.65,.71]} intensity={9} shade="#7f694b" />
  <pointLight position={[-3.07,1.91,2.03]} color="#aff0ff" intensity={6.3} distance={5} decay={2} />
  <LightPool position={[-3.88,.01,1.56]} width={1.8} depth={1.6} color="#ffb672" opacity={.24} />
</>);

const Bedroom = memo(() => <>
  <Vox kind="planks" tint="#9b7255" position={[-7.683,-.105,1.26]} size={[4.07,.205,4.55]} />
  <Trim x={-7.69} z={-.92} w={4.10} base="#62495b" above="#aa7c6c" />
  <group position={[-9.65,0,1.05]} rotation-y={Math.PI/2}><Trim x={0} z={0} w={3.95} base="#62495b" above="#a57f72" /></group>
  <TrimWindow p={[-7.84,2.11,-.805]} w={1.52} curtains="#715779" dim={.79} />
  <DoorFrame position={[-5.65,0,1.06]} rotationY={-Math.PI/2} width={1.61} color="#634531" />
  <Bed position={[-8.773,.038,.379]} rotationY={-.02} blanket="#8b586d" sheet="#cbbda1" frame="#614939" />
  <Contact at={[-8.78,.009,.47]} w={1.45} d={2.39} />
  <Vox kind="wool" tint="#ca9976" position={[-8.30,.017,2.363]} size={[1.31,.024,.64]} />
  <Vox kind="wool" tint="#8f5e6f" position={[-8.30,.033,2.363]} size={[1.12,.016,.47]} />
  <Bench x={-6.42} z={-.406} width={1.11} chest={.57} surface={.781} front="#84634e" />
  <Block position={[-6.524,.839,-.419]} size={[.35,.11,.251]} color="#994d41" />
  <Block position={[-6.538,.909,-.425]} size={[.38,.039,.247]} color="#ebcb8a" />
  <Pendant at={[-7.21,2.76,1.54]} shade="#ac7752" intensity={10.3} />
  <pointLight position={[-8.17,1.96,-.55]} color="#a7ddff" intensity={12} distance={4.7} decay={2} />
  <GodRay position={[-7.84,1.07,.124]} rotation={[.24,0,.39]} width={1.03} height={2.09} color="#aeedfa" opacity={.134} />
  <LightPool position={[-7.28,.008,1.44]} width={2.43} depth={1.93} color="#fbcfa1" opacity={.17} />
</>);

const TownBase = memo(() => <>
  <Vox kind="grass" tint="#415950" position={[.10,-.26,-1.25]} size={[25,.45,16]} />
  <Vox kind="cobble" tint="#6c7884" position={[-.08,-.042,-.72]} size={[9.4,.078,9.51]} />
  <Vox kind="stone" tint="#777478" position={[-.28,-.011,.065]} size={[3.80,.025,2.72]} tile={.58} />
  <Vox kind="planks" tint="#784e55" position={[-.28,.011,.073]} size={[2.423,.018,1.641]} />
  <Hut at={[-3.92,-.035,-3.90]} w={4.02} h={2.91} d={3.11} tint="#9d7862" roof="#654456" windows={[-1.18,.98]} lit />
  <Hut at={[6.37,-.035,-4.91]} w={3.43} h={2.67} d={3.04} tint="#6f8f80" roof="#524564" windows={[-.78,1.03]} lit />
  <Tree position={[-2.97,-.02,-2.30]} height={3.22} leaf="#304f4a" />
  <Tree position={[4.57,0,-2.20]} height={4.11} leaf="#375b56" />
  <Tree position={[-5.78,0,-.67]} height={3.49} leaf="#375552" />
  {[-2.61,.984].map((x,i)=><Vox key={x} kind="log" tint="#3f332e" position={[x,1.575,-1.17-i*.17]} size={[.147,3.15,.151]} />)}
  <LanternLine from={[-2.61,3.22,-1.16]} to={[.984,3.25,-1.34]} count={6} sag={.58} lit={[1,5]} light={8.1} seed={27} />
  <LanternLine from={[-3.53,3.55,-3.72]} to={[4.14,3.46,-3.46]} count={6} sag={.44} lit={[]} seed={11} />
  {[-1.68,1.42].map((x,i)=><group key={x} position={[x,0,-.99]}>
    <Vox kind="darkPlanks" tint="#1e2a45" position={[0,.31,0]} size={[.43,.62,.43]} />
    <Block position={[0,.316,.228]} size={[.325,.489,.035]} color="#523c6d" />
    <Block position={[0,.30,.25]} size={[.249,.266,.035]} color="#29243b" />
    <Block position={[0,.302,.268]} size={[.133,.147,.034]} color={i ? "#b7619e":"#679e9c"} emissive={i ? "#f281c8":"#63bdba"} emissiveIntensity={.28} />
  </group>)}
  <pointLight position={[-1.98,1.04,.39]} color="#ffa5c1" intensity={13.4} distance={5.8} decay={2} />
  <pointLight position={[1.86,2.14,-.75]} color="#75dbfb" intensity={13.8} distance={6.9} decay={2} />
  <LightPool position={[-.72,.032,.55]} width={2.22} depth={2.04} color="#f772c4" opacity={.30} />
  <LightPool position={[.88,.031,-.11]} width={2.98} depth={2.32} color="#67c8f7" opacity={.36} />
  <Dust position={[0,1.82,-1.236]} area={[7.1,2.52,3.95]} count={32} color="#ffd9a4" size={.025} seed={51} opacity={.45} />
</>);

const Facade = memo(() => <group position={[STOREFRONT,0,-3.44]}>
  <Vox kind="cobble" tint="#6a716d" position={[-1.47,1.14,-.12]} size={[1.32,2.25,.25]} />
  <Vox kind="cobble" tint="#6a716d" position={[1.47,1.14,-.12]} size={[1.32,2.25,.25]} />
  <Vox kind="planks" tint="#6a4a3c" position={[0,2.818,-.25]} size={[4.27,1.112,.62]} />
  <Vox kind="darkPlanks" tint="#7d443e" position={[0,3.47,-.77]} size={[4.68,.36,2.12]} />
  <Vox kind="darkPlanks" tint="#70433f" position={[0,3.81,-.99]} size={[4.14,.33,1.66]} />
  <Sign position={[0,2.78,.075]} title="RESTAURANT" subtitle="BLOCK BOWL" width={2.16} height={.622} bg="#502f39" fg="#ffe6ad" accent="#d2a76b" lit={.67} />
  {[-1.5,1.5].map((x,i)=><group key={x} position={[x,0,.04]}>
    <WindowUnit position={[0,1.35,0]} width={.88} height={.96} warm dim={.87} />
    <Vox kind="log" tint="#54402b" position={[0,2.46,.21]} size={[.09,.11,.48]} />
    <Lantern position={[0,2.1,.46]} chain={.18} scale={.75} light={8} seed={i+29} />
  </group>)}
  <Vox kind="planks" tint="#9d6349" position={[0,-.079,-1.1]} size={[3.5,.177,2.59]} />
  <Block position={[0,1.25,-2.02]} size={[3.6,2.49,.14]} map={pixelTex("#bd9c7b",[4,3])} />
  <Vox kind="planks" tint="#974d39" position={[0,.027,-.363]} size={[1.56,.050,.65]} />
  <pointLight position={[0,1.57,-.719]} color="#ffd095" intensity={14.2} distance={5} decay={2} />
</group>);

const Table = ({ at, yaw = 0 }: { at: Vec3; yaw?:number }) => <group position={at} rotation-y={yaw}>
  <Contact at={[0,.011,0]} w={1.88} d={1.29} />
  <Vox kind="log" tint="#553d33" position={[0,.347,0]} size={[.16,.694,.22]} />
  <Vox kind="planks" tint="#bf885b" position={[0,.719,0]} size={[1.00,.124,.96]} />
  <Vox kind="wool" tint="#9b4846" position={[.02,.794,0]} size={[.377,.032,.899]} />
  <Block position={[.02,.837,0]} size={[.107,.063,.101]} color="#dbc185" />
  <Block position={[.02,.906,0]} size={[.022,.10,.024]} color="#729453" />
  <Block position={[.02,.967,0]} size={[.078,.052,.069]} color="#eeab62" />
  {[-.85,.85].map((x)=><group key={x} position={[x,0,0]} rotation-y={x>0?Math.PI/2:-Math.PI/2}>
    <Vox kind="planks" tint="#754a39" position={[0,.36,0]} size={[.375,.092,.374]} />
    <Vox kind="planks" tint="#7b4f49" position={[0,.593,.185]} size={[.375,.414,.068]} />
    <Block position={[0,.169,0]} size={[.235,.337,.228]} color="#503a34" />
  </group>)}
</group>;

const ShopShell = memo(() => <>
  <Tile center={[.028,.003,.999]} cols={19} rows={20} step={.353} warm />
  <Trim x={0} z={-2.38} w={6.67} base="#486163" above="#c2b4a0" />
  <group position={[3.29,0,1.02]} rotation-y={-Math.PI/2}><Trim x={0} z={0} w={6.90} base="#863f3c" above="#b77b62" /></group>
  <group position={[-3.31,0,-.38]} rotation-y={Math.PI/2}><Trim x={0} z={0} w={4.11} base="#4f6967" above="#aca798" /></group>
  <group rotation-y={Math.PI} position={[-1.56,0,FRONT]}><Trim x={0} z={0} w={3.38} base="#873e39" above="#b98e73" /></group>
  <group rotation-y={Math.PI} position={[2.979,0,FRONT]}><Trim x={0} z={0} w={1.88} base="#873e39" above="#b98e73" /></group>
  <Vox kind="log" tint="#64422e" position={[DOOR_X,2.909,FRONT]} size={[1.84,1.22,.17]} />
  {[-2.72,-1.17,.96,2.78].map(x=><Vox key={x} kind="log" tint="#44372c" position={[x,1.55,-2.25]} size={[.12,3.09,.21]} />)}
  <TrimWindow p={[-.58,2.03,-2.247]} curtains="#a05348" w={1.43} />
  <Sign position={[-3.216,1.839,.263]} rotationY={Math.PI/2} title="TODAY" lines={["STEW", "BREAD"]} width={.852} height={.66} bg="#423934" fg="#f3d698" lit={.27} />
  <KitchenShelf position={[1.85,1.435,-2.038]} />
  <KitchenStove position={[2.18,0,-1.857]} lit />
  <Sign title="THE BLOCK BOWL" subtitle="KITCHEN" position={[-2.189,1.93,-2.17]} width={1.30} height={.51} bg="#533439" fg="#ffe2aa" lit={.34} />
  <Sign title="ORDER HERE" position={[.79,1.91,-2.18]} width={.91} height={.50} bg="#e0b689" fg="#422f28" />
  <Bench x={-1.22} z={-.448} width={3.14} surface={SHOP.surface} chest={.68} front="#445d60" wood="#8b9d9f" steel />
  <SinkFittings x={SHOP.plate[0]} y={SHOP.surface} z={SHOP.plate[2]} />
  <Bench x={-1.166} z={PASS.z} width={2.98} surface={PASS.surface} chest={.681} front="#672c33" wood="#a77351" />
  <Vox kind="log" tint="#be8b59" position={[-1.169,.962,PASS.z+.342]} size={[2.99,.052,.069]} />
  <Sign title="PICK UP" position={[-1.44,.67,PASS.z+.367]} width={.86} height={.28} bg="#5e3737" fg="#ffdd9c" />
  <Table at={[2.44,.015,2.781]} yaw={.62} />
  <Table at={[-2.52,.015,3.59]} yaw={2.1} />
  <WindowUnit position={[2.73,1.91,4.386]} rotationY={Math.PI} width={1.08} dim={.74} />
  <Vox kind="grass" tint="#4c5d50" position={[.99,-.126,6.89]} size={[8,.24,4.69]} />
  <Vox kind="cobble" tint="#5f7585" position={[1.03,-.025,6.91]} size={[3.42,.034,4.64]} />
  <Hut at={[.88,-.018,8.72]} turn={Math.PI} w={4.1} d={3.1} h={2.73} tint="#935f46" roof="#534259" lit windows={[-1.22,1.13]} />
  <LanternLine from={[-1.19,3.02,6.50]} to={[2.85,3.05,7.02]} count={4} sag={.38} lit={[1]} light={4} seed={83} />
  <Pendant at={[-.84,2.81,.009]} shade="#a1643f" intensity={14.3} />
  <Pendant at={[.96,2.77,3.11]} shade="#8a4849" intensity={12.6} />
  <hemisphereLight color="#d6e7e9" groundColor="#59474e" intensity={.56} />
  <pointLight position={[-1.36,2.42,-1.77]} color="#adddff" intensity={12.6} distance={5.2} decay={2} />
  <pointLight position={[-.86,1.26,2.97]} color="#ffd398" intensity={4.60} distance={4.3} decay={2} />
  <pointLight position={[1.85,2.49,5.7]} color="#a2caff" intensity={9.4} distance={4.6} decay={2} />
  <GodRay position={[-.62,1.425,-1.18]} rotation={[.20,0,-.42]} width={1.01} height={2.17} color="#bfeaf5" opacity={.082} />
  <Dust position={[.14,1.49,.87]} area={[4.9,2.55,5.23]} count={38} seed={13} color="#f7ddaa" opacity={.32} size={.016} />
</>);

export const World = () => {
  const gl=useThree(s=>s.gl);
  useEffect(()=>{
    const previous = gl.shadowMap.type;
    gl.shadowMap.type=BasicShadowMap;
    gl.shadowMap.needsUpdate=true;
    return ()=>{gl.shadowMap.type=previous;gl.shadowMap.needsUpdate=true;};
  },[gl]);
  const f=Math.round(useFilmTime()*FPS);
  const door=window(f,MARK.doorOpens,364,490,504);
  return <>
    <Zone name="town">
      <TownBase /><Facade />
      <DoorSet at={[STOREFRONT,0,-3.365]} width={1.63} open={1.73*rise(f,573,589)} height={2.24} paint={P.red} />
    </Zone>
    <Zone name="home">
      <HouseShell />
      <DoorSet at={[HOUSE_DOOR,0,-1.88]} width={1.64} open={-1.6*door} />
      <Block position={[1.966,1.134,-1.838]} size={[.109,.158,.051]} color="#6a4c38" />
      <Block position={[1.966,1.134,-1.799]} size={[.053,.053,.031]} color={f>=MARK.bell&&f<MARK.bell+10?"#f7d773":"#b09564"} />
      <Pendant at={[.38,2.76,.175]} intensity={13.4} shade="#64847c" />
      <hemisphereLight color="#e4f1ed" groundColor="#554956" intensity={.75} />
      <pointLight position={[-.57,2.42,-1.12]} color="#b0e1ff" intensity={13} distance={5.7} decay={2} />
      <pointLight position={[-1.77,1.47,2.11]} color="#ffd0a7" intensity={5.7} distance={4.5} decay={2} />
      <GodRay position={[-.83,1.43,-1.05]} rotation={[.12,0,-.41]} width={1.15} height={2.44} color="#bfe7ed" opacity={.123} />
      <LightPool position={[-.86,.013,-.249]} color="#a0d4ee" width={2.69} depth={1.46} opacity={.19} />
      <Dust position={[-.36,1.62,-.26]} area={[5.09,2.4,3.12]} count={31} seed={41} color="#ffe7d1" opacity={.42} size={.018} />
    </Zone>
    <Zone name="porch"><Porch /></Zone>
    <Zone name="reverse">
      <group position={[1.01,0,3.19]} rotation-y={Math.PI}>
        <Trim x={0} z={0} w={3.42} />
        <Sign position={[-.21,1.97,.11]} title="HOME" subtitle="SWEET HOME" width={.78} height={.42} bg="#654837" fg="#f9d799" />
        <Vox kind="planks" tint="#976b44" position={[-.29,.972,.18]} size={[1.21,.089,.36]} />
        <Block position={[-.56,1.048,.21]} size={[.166,.194,.152]} color="#a85e45" />
        <Vox kind="leaves" tint="#82a56c" position={[-.55,1.186,.224]} size={[.228,.234,.210]} />
      </group>
    </Zone>
    <Zone name="hall"><Hall /></Zone>
    <Zone name="bedroom"><Bedroom /></Zone>
    <Zone name="shop">
      <ShopShell />
      <DoorSet at={[DOOR_X,0,FRONT-.07]} facing={Math.PI} width={1.72} open={f>=CUT.crowd ? -1.59 : -1.59*window(f,944,961,1008,1024)} paint={P.red} />
      {f>=CUT.jobMop &&<WetFloorSign position={[1.91,.014,.722]} rotationY={.31} />}
    </Zone>
  </>;
};
