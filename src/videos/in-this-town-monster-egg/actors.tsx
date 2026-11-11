import { MinecraftAvatar } from "../../engine";
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
);
