import { Block, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps } from "../../engine";
import { MARKS } from "../../../Topics/InThisTown/maps";

/** The two leads contrast in want, rank, silhouette, palette and posture. */
export const Hero: React.FC<MinecraftAvatarProps> = (props) => (
  <MinecraftAvatar
    {...props}
    position={props.position ?? MARKS.heroHome}
    rotationY={props.rotationY ?? Math.PI}
    face={props.face ?? "worried"}
    animation={props.animation ?? "idle"}
    scale={0.91}
    skin="#b88761"
    hair="#362d2b"
    outfit="tee"
    blink={props.blink ?? true}
    shadow={props.shadow ?? true}
  />
);

/** Best friend: bigger, confident, high status. Wants to be admired; later chooses the hero. */
export const Friend: React.FC<MinecraftAvatarProps> = (props) => (
  <MinecraftAvatar
    {...props}
    position={props.position ?? MARKS.friendGate}
    rotationY={props.rotationY ?? Math.PI}
    face={props.face ?? "smug"}
    animation={props.animation ?? "idle"}
    scale={1.06}
    skin="#c68e66"
    hair="#202b32"
    outfit="hoodie"
    blink={props.blink ?? true}
    shadow={props.shadow ?? true}
  />
);

/** Supporting silhouette: the sister and her phoenix, not a third narrator. */
export const Sister: React.FC<MinecraftAvatarProps> = (props) => (
  <group>
    <MinecraftAvatar
      {...props}
      position={props.position ?? MARKS.sisterGate}
      rotationY={props.rotationY ?? Math.PI}
      face={props.face ?? "surprised"}
      animation={props.animation ?? "idle"}
      scale={0.96}
      skin="#d8a27e"
      hair="#583a32"
      outfit="pajamas"
      blink={props.blink ?? true}
      shadow={props.shadow ?? true}
    />
    {/* Simple hair clip/side braid reads as a different kid even in a distant shot. */}
    <group position={props.position ?? MARKS.sisterGate} rotation-y={props.rotationY ?? Math.PI} scale={0.96}>
      <Block position={[0.22, 1.75, 0.15]} size={[0.2, 0.08, 0.12]} color="#e89979" />
      <Block position={[0.3, 1.67, -0.05]} size={[0.12, 0.36, 0.15]} color="#583a32" />
      <Block position={[0.3, 1.42, -0.05]} size={[0.1, 0.2, 0.13]} color="#4c3532" />
    </group>
  </group>
);
