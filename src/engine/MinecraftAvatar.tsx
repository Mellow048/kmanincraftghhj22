import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { AnimName, GaitName, Pose } from "./anim";
import { blendPose, gaitPose, getPose } from "./anim";
import type { FaceName } from "./face";
import { blinkFaceTexture, faceTexture, headSideTexture } from "./face";
import { clamp } from "./math";
import type { Vec3 } from "./math";
import { glowTex, pixelTex, stripeTex } from "./textures";

export type OutfitName = "gown" | "pajamas" | "hoodie" | "tee" | "shadow" | "suit";

export type MinecraftAvatarProps = {
  /** Feet position on the floor. 1 unit = 1 metre. */
  position?: Vec3;
  /** Facing direction in radians. 0 faces +Z. */
  rotationY?: number;
  scale?: number;

  animation?: AnimName;
  /** Multiplier on clip speed. 1 = authored speed. */
  animSpeed?: number;
  /** Seconds of offset, so two walking characters are not in lockstep. */
  phase?: number;

  /**
   * Ground distance travelled in metres. When set, gait clips (walk/run/creep/
   * stagger) take their phase from here instead of the clock, so the feet always
   * match the ground and a character never walks in place.
   */
  animDistance?: number;

  /** Second clip to blend towards. */
  blendTo?: AnimName;
  /** 0 = the `blendTo` pose, 1 = the `animation` pose. */
  blend?: number;
  /** Clock for the `blendTo` clip. Omit to reuse `time`/the scene clock. */
  blendTime?: number;
  /** Override the animation clock (seconds). Deterministic and scene-independent. */
  time?: number;

  face?: FaceName;
  skin?: string;
  hair?: string;
  outfit?: OutfitName;

  /** Additive head aim, radians. */
  headYaw?: number;
  headPitch?: number;
  /** Extra head roll, radians. */
  headRoll?: number;
  /** World point for the head to look at. Overrides headYaw/headPitch. */
  lookAt?: Vec3;

  /** Deterministic blinking. Great for making a character feel alive in close-up. */
  blink?: boolean;
  /** Ground contact blob so the character never floats. */
  shadow?: boolean;
  shadowOpacity?: number;

  /** Make the pixel eyes emit light. 0 = off. Great for The Figure. */
  faceGlow?: number;
  /** Cheap rim silhouette for dark characters. 0 = none. */
  rim?: number;

  /** Anything parented to the right hand. */
  children?: React.ReactNode;
};

const PX = 1.8 / 32; // one Minecraft pixel in metres
const HIP = 12 * PX;

const GAITS: AnimName[] = ["walk", "run", "creep", "stagger"];

const isGait = (name: AnimName): name is GaitName => GAITS.includes(name);

const OUTFITS: Record<
  OutfitName,
  { torso: string; arms: string; legs: string; torsoTex?: THREE.Texture; armTex?: THREE.Texture; legTex?: THREE.Texture }
> = {
  gown: {
    torso: "#f3a03f",
    arms: "#f3a03f",
    legs: "#c9dcea",
    torsoTex: stripeTex("#f3a03f", "#f8eeda", { count: 4 }),
    armTex: stripeTex("#f3a03f", "#f8eeda", { count: 4 }),
    legTex: pixelTex("#e8b78d"),
  },
  pajamas: {
    torso: "#3f6fa8",
    arms: "#3f6fa8",
    legs: "#315a8c",
    torsoTex: stripeTex("#3f6fa8", "#8fb7d8", { count: 4, horizontal: true }),
    armTex: stripeTex("#3f6fa8", "#8fb7d8", { count: 4, horizontal: true }),
    legTex: pixelTex("#315a8c"),
  },
  hoodie: {
    torso: "#2f7d4f",
    arms: "#2f7d4f",
    legs: "#20293a",
    torsoTex: pixelTex("#2f7d4f", [1, 1], { jitter: 0.09 }),
    armTex: pixelTex("#2b7048", [1, 1], { jitter: 0.09 }),
    legTex: pixelTex("#20293a"),
  },
  tee: {
    torso: "#d9cdb4",
    arms: "",
    legs: "#3c5878",
    torsoTex: pixelTex("#d9cdb4", [1, 1], { jitter: 0.05 }),
    legTex: pixelTex("#3c5878"),
  },
  shadow: {
    torso: "#121826",
    arms: "#101522",
    legs: "#0d121d",
    torsoTex: pixelTex("#141b2a", [1, 1], { jitter: 0.16 }),
    armTex: pixelTex("#111726", [1, 1], { jitter: 0.16 }),
    legTex: pixelTex("#0e131f", [1, 1], { jitter: 0.14 }),
  },
  suit: {
    torso: "#20242e",
    arms: "#20242e",
    legs: "#161a22",
    torsoTex: pixelTex("#20242e", [1, 1], { jitter: 0.07 }),
    armTex: pixelTex("#1b1f28", [1, 1], { jitter: 0.07 }),
    legTex: pixelTex("#161a22"),
  },
};

/** Deterministic blink envelope: closed for ~0.13s every 2.6–4.8s. */
function blinkAmount(time: number, phase: number): number {
  const period = 2.6 + (Math.abs(phase) % 1.6);
  const local = ((time + phase) % period + period) % period;
  if (local > 0.13) return 0;
  return Math.sin((local / 0.13) * Math.PI);
}

export const MinecraftAvatar: React.FC<MinecraftAvatarProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  animation = "idle",
  animSpeed = 1,
  phase = 0,
  animDistance,
  blendTo,
  blend = 1,
  blendTime,
  time,
  face = "neutral",
  skin = "#e8b78d",
  hair = "#4a2e1c",
  outfit = "gown",
  headYaw = 0,
  headPitch = 0,
  headRoll = 0,
  lookAt,
  blink = false,
  shadow = false,
  shadowOpacity = 0.5,
  faceGlow = 0,
  rim = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clock = time !== undefined ? time : (frame / fps) * animSpeed + phase;

  const kit = OUTFITS[outfit];

  const materials = useMemo(() => {
    const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.95, metalness: 0 });
    const hairMat = new THREE.MeshStandardMaterial({ color: hair, roughness: 1, metalness: 0 });
    const sideMat = new THREE.MeshStandardMaterial({ map: headSideTexture(skin, hair), roughness: 1, metalness: 0 });
    const faceMat = new THREE.MeshStandardMaterial({
      map: faceTexture(face, { skin, hair }),
      roughness: 1,
      metalness: 0,
      emissive: faceGlow > 0 ? new THREE.Color("#ffffff") : new THREE.Color("#000000"),
      emissiveIntensity: faceGlow,
      emissiveMap: faceGlow > 0 ? faceTexture(face, { skin, hair }) : null,
    });
    const torsoMat = new THREE.MeshStandardMaterial({ color: "#ffffff", map: kit.torsoTex ?? null, roughness: 1 });
    const armMat = new THREE.MeshStandardMaterial({ color: "#ffffff", map: kit.armTex ?? null, roughness: 1 });
    const legMat = new THREE.MeshStandardMaterial({ color: "#ffffff", map: kit.legTex ?? null, roughness: 1 });
    if (outfit === "tee") {
      torsoMat.color = new THREE.Color(kit.torso);
      armMat.color = new THREE.Color(skin);
    }
    if (outfit === "shadow") {
      torsoMat.color = new THREE.Color(kit.torso);
      armMat.color = new THREE.Color(kit.arms);
      legMat.color = new THREE.Color(kit.legs);
    }
    if (rim > 0) {
      for (const m of [skinMat, hairMat, sideMat, torsoMat, armMat, legMat]) {
        m.emissive = new THREE.Color("#12233f");
        m.emissiveIntensity = rim;
      }
    }
    return { skinMat, hairMat, sideMat, faceMat, torsoMat, armMat, legMat };
  }, [skin, hair, face, faceGlow, outfit, rim, kit]);

  // Blink swaps the face map. Mutating the map keeps the material (and its shader)
  // alive; three only recompiles when the map goes null ↔ non-null.
  const blinkClosed = blink && blinkAmount(clock, phase) > 0.35;
  useEffect(() => {
    const tex = blinkClosed ? blinkFaceTexture(face, { skin, hair }) : faceTexture(face, { skin, hair });
    materials.faceMat.map = tex;
    materials.faceMat.emissiveMap = faceGlow > 0 ? tex : null;
    materials.faceMat.needsUpdate = true;
  }, [materials, blinkClosed, face, skin, hair, faceGlow]);

  // Pose
  let pose: Pose;
  if (animDistance !== undefined && isGait(animation)) {
    pose = gaitPose(animation, animDistance);
  } else {
    pose = getPose(animation, clock);
  }
  if (blendTo) {
    const otherClock = blendTime !== undefined ? blendTime : clock;
    const other =
      animDistance !== undefined && isGait(blendTo) ? gaitPose(blendTo, animDistance) : getPose(blendTo, otherClock);
    pose = blendPose(other, pose, blend);
  }

  // Head aim
  let yaw = headYaw;
  let pitch = headPitch;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 1.55 * scale);
    const worldYaw = Math.atan2(dx, dz);
    let rel = worldYaw - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = clamp(rel, -1.25, 1.25);
    pitch = clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.7, 0.65);
  }

  const shadowTex = glowTex();

  return (
    <group position={position} rotation-y={rotationY} scale={scale}>
      {shadow && (
        <mesh position={[0, 0.014, 0]} rotation-x={-Math.PI / 2} renderOrder={1}>
          <planeGeometry args={[0.95, 0.6]} />
          <meshBasicMaterial map={shadowTex} color="#000000" transparent opacity={shadowOpacity} depthWrite={false} />
        </mesh>
      )}

      <group
        position={[0, HIP + pose.bodyY, 0]}
        rotation={[pose.bodyPitch, pose.bodyYaw, pose.bodyRoll]}
      >
        {/* torso */}
        <group rotation={pose.torso}>
          <mesh castShadow receiveShadow position={[0, 6 * PX, 0]} material={materials.torsoMat}>
            <boxGeometry args={[8 * PX, 12 * PX, 4 * PX]} />
          </mesh>
        </group>

        {/* head */}
        <group position={[0, 12 * PX, 0]} rotation={[pose.head[0] + pitch, pose.head[1] + yaw, pose.head[2] + headRoll]}>
          <mesh castShadow receiveShadow position={[0, 4 * PX, 0]} material={[
            materials.sideMat,
            materials.sideMat,
            materials.hairMat,
            materials.skinMat,
            materials.faceMat,
            materials.hairMat,
          ]}>
            <boxGeometry args={[8 * PX, 8 * PX, 8 * PX]} />
          </mesh>
        </group>

        {/* right arm (+X) */}
        <group position={[6 * PX, 12 * PX, 0]} rotation={pose.armR}>
          <mesh castShadow receiveShadow position={[0, -6 * PX, 0]} material={materials.armMat}>
            <boxGeometry args={[4 * PX, 12 * PX, 4 * PX]} />
          </mesh>
          <group position={[0, -11 * PX, 0]}>{children}</group>
        </group>

        {/* left arm (-X) */}
        <group position={[-6 * PX, 12 * PX, 0]} rotation={pose.armL}>
          <mesh castShadow receiveShadow position={[0, -6 * PX, 0]} material={materials.armMat}>
            <boxGeometry args={[4 * PX, 12 * PX, 4 * PX]} />
          </mesh>
        </group>

        {/* right leg (+X) — thigh + knee + shin, so sitting is not a plank */}
        <group position={[2 * PX, 0, 0]} rotation={pose.legR}>
          <mesh castShadow receiveShadow position={[0, -3 * PX, 0]} material={materials.legMat}>
            <boxGeometry args={[4 * PX, 6 * PX, 4 * PX]} />
          </mesh>
          <group position={[0, -6 * PX, 0]} rotation={pose.kneeR}>
            <mesh castShadow receiveShadow position={[0, -3 * PX, 0]} material={materials.legMat}>
              <boxGeometry args={[4 * PX, 6 * PX, 4 * PX]} />
            </mesh>
          </group>
        </group>

        {/* left leg (-X) */}
        <group position={[-2 * PX, 0, 0]} rotation={pose.legL}>
          <mesh castShadow receiveShadow position={[0, -3 * PX, 0]} material={materials.legMat}>
            <boxGeometry args={[4 * PX, 6 * PX, 4 * PX]} />
          </mesh>
          <group position={[0, -6 * PX, 0]} rotation={pose.kneeL}>
            <mesh castShadow receiveShadow position={[0, -3 * PX, 0]} material={materials.legMat}>
              <boxGeometry args={[4 * PX, 6 * PX, 4 * PX]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
