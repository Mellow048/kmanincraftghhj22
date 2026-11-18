import { Block, getPose, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Pose, Vec3 } from "../../engine";
import { Player } from "../../../Topics/Recreation";
import { Cap, PartyHat } from "../the-barber-who-never-went-to-parties/kit";
export type V = Vec3;
export const SLEEVE = "#2366d5";
export const pose = (a: Partial<Pose>, t = 0): Pose => ({ ...getPose("idle", t), ...a });
export const fixed = { blink: false, breath: 0, weightShift: 0, saccade: false, time: 0, gaze: 0 as const };
export function Ears({ skin = "#e5b48b", lobes = false }: { skin?: string; lobes?: boolean }) {
  return (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (lobes ? 0.281 : 0.252), -0.01, 0]}>
          <Block size={[lobes ? 0.159 : 0.072, 0.117, 0.145]} color={skin} />
          <Block
            position={[s * (lobes ? 0.033 : 0.015), -0.006, 0.077]}
            size={[0.04, 0.059, 0.016]}
            color={skin === "#b77e5e" ? "#905838" : "#c58b64"}
          />
        </group>
      ))}
    </>
  );
}
export function Specs() {
  return (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.111, -0.025, 0.24]}>
          {[-1, 1].map((i) => (
            <group key={i}>
              <Block position={[0, i * 0.061, 0]} size={[0.194, 0.018, 0.025]} color="#544331" />
              <Block position={[i * 0.092, 0, 0]} size={[0.014, 0.131, 0.025]} color="#544331" />
            </group>
          ))}
        </group>
      ))}
      <Block position={[0, -0.011, 0.241]} size={[0.05, 0.019, 0.023]} color="#544331" />
    </>
  );
}
export function SunHat() {
  return (
    <group position={[0, 0.22, 0]}>
      <Block size={[0.74, 0.068, 0.62]} color="#d6a44f" />
      <Block position={[0, 0.108, -0.015]} size={[0.44, 0.197, 0.4]} color="#edc977" />
      <Block position={[0, 0.058, -0.014]} size={[0.453, 0.046, 0.409]} color="#466b68" />
    </group>
  );
}
type A = Partial<MinecraftAvatarProps>;
export const Kid = (p: A) => (
  <MinecraftAvatar
    outfit="hoodie"
    skin="#e2b18a"
    hair="#533522"
    colors={{ torso: SLEEVE, arms: SLEEVE, legs: "#263d61" }}
    shoes="#ebc254"
    face="smile"
    blink
    head={<Ears />}
    {...p}
  />
);
export const Gran = (p: A) => (
  <Player
    who={5}
    scale={0.91}
    colors={{ torso: "#90558c", arms: "#90558c", legs: "#4c445b" }}
    hair="#c8bfb0"
    skin="#c99773"
    face="smile"
    head={
      <>
        <Specs />
        <Block position={[0, 0.105, -0.25]} size={[0.27, 0.26, 0.19]} color="#d3c7b6" />
      </>
    }
    {...p}
  />
);
export const Uncle = (p: A) => (
  <Player who={0} scale={1.14} colors={{ torso: "#b05c3e", arms: "skin", legs: "#554649" }} face="bearded" head={<SunHat />} {...p} />
);
export const Pal = ({ n, ...p }: A & { n: number }) => (
  <Player
    who={n ? 7 : 4}
    skin={n ? "#b77e5e" : "#efc49a"}
    hair={n ? "#462d24" : "#7e4124"}
    scale={n ? 0.95 : 1.03}
    face="grin"
    head={<Ears skin={n ? "#b77e5e" : "#efc49a"} lobes />}
    {...p}
  />
);
export const DateA = (p: A) => (
  <Player
    who={9}
    colors={{ torso: "#367f76", arms: "#367f76", legs: "#384b53" }}
    scale={1.04}
    face="smile"
    head={<Cap color="#476e65" />}
    {...p}
  />
);
export const DateB = (p: A) => (
  <Player
    who={6}
    colors={{ torso: "#c15c67", arms: "skin", legs: "#724455" }}
    face="grin"
    head={<Block position={[-0.2, 0.17, 0.195]} size={[0.113, 0.092, 0.063]} color="#ffcb56" />}
    {...p}
  />
);
export { PartyHat };
export function Cake() {
  return (
    <group>
      <Block size={[0.62, 0.055, 0.46]} color="#c4d5c0" />
      <Block position={[0, 0.12, 0]} size={[0.53, 0.217, 0.38]} color="#aa683e" />
      <Block position={[0, 0.225, 0]} size={[0.55, 0.09, 0.4]} color="#f3cabc" />
      {[-1, 0, 1].map((s) => (
        <group key={s} position={[s * 0.15, 0.3, 0.025]}>
          <Block size={[0.056, 0.16, 0.055]} color={s ? "#e78c66" : "#3ea7a3"} />
          <Block position={[0, 0.104, 0]} size={[0.038, 0.068, 0.038]} color="#ffd66d" emissive="#ffb242" emissiveIntensity={0.28} />
        </group>
      ))}
    </group>
  );
}
export function BirthdayCast({
  t = 0,
  dance = false,
  cake = true,
  kid = false,
}: {
  t?: number;
  dance?: boolean;
  cake?: boolean;
  kid?: boolean;
}) {
  const step = (i: number) => (dance ? 0.09 * Math.abs(Math.sin(t * 6 + i)) : 0);
  return (
    <>
      <Gran position={[-0.53, step(0), -0.16]} animation={dance ? "cheer" : "idle"} time={dance ? t : 0} headYaw={0.1} />
      <Uncle position={[0.53, step(1), -0.4]} animation={dance ? "wave" : "idle"} time={dance ? t + 0.27 : 0} headRoll={-0.07} />
      <Pal n={0} position={[-1.23, step(2), -0.82]} animation={dance ? "laugh" : "idle"} time={dance ? t : 0} />
      <Pal n={1} position={[1.21, step(3), -0.78]} animation={dance ? "wave" : "idle"} time={dance ? t + 0.77 : 0} />
      {cake && (
        <group position={[0.14, 0.88, 0.26]}>
          <Cake />
        </group>
      )}
      {kid && <Kid position={[0.05, 0, -0.37]} headRoll={-0.13} face="grin" time={0} />}
    </>
  );
}
/** The partners keep the same inner hands joined, even in the photograph they didn't ask for. */
export function Partners({ kid = false, t = 0, ask = false }: { kid?: boolean; t?: number; ask?: boolean }) {
  return (
    <group position={[0, 0, 1.1]}>
      <DateA
        position={[-0.6, 0, 0]}
        colors={{ torso: "#367f76", arms: "skin", legs: "#384b53" }}
        pose={pose({ armR: [-0.62, 0, 0.35] })}
        headRoll={-0.06}
        {...fixed}
      />
      <DateB
        position={[0.6, 0, 0]}
        pose={pose({ armL: [-0.66, 0, -0.34], armR: ask ? [-0.57 - 0.12 * Math.sin(t * 5), 0, 0.17] : [-0.08, 0, 0.04] })}
        headYaw={ask ? -0.16 : 0}
        headRoll={0.07}
        face={ask ? "grin" : "smile"}
        {...fixed}
      />
      {kid && (
        <Kid
          position={[0, 0, -0.32]}
          pose={pose({ armR: [-0.15, 0, 0.07], armL: [-0.13, 0, -0.07] })}
          headRoll={-0.12}
          face="grin"
          {...fixed}
        />
      )}
    </group>
  );
}
