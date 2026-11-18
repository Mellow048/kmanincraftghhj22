import { cam } from "../../engine";
import type { Vec3 } from "../../engine";
import { Friend, Him, Speaker, stagedScene } from "./kit";

const DOOR: Vec3 = [0, 0, -4.0];

/**
 * BEAT 1 — HUSH. 0:00.
 *
 * Three friends in a lit doorway, heads together, whispering about a party in front of a boy who
 * is not going to it. No context, no title, no establishing shot: the first sound in the film is
 * three hushes and the first picture is people who already know something he does not.
 */
export const scene1 = stagedScene("scene1", [
  {
    id: "1.hush",
    ...cam.push({ on: [0, 1.42, -3.1], dist: 5.8, to: 5.0, fov: 48, pitch: 3 }),
    zone: "street",
    look: "overworld-night",
    note: "Three heads together in the one lit doorway in the town, so the first picture is a secret being kept from somebody off-screen.",
    stage: (t) => (
      <>
        <Friend v={0} position={[-0.62, 0, -3.05]} rotationY={0.2} animation="talk" face="grin" headPitch={-0.12} />
        <Friend v={1} position={[0.2, 0, -3.42]} rotationY={-0.1} animation="talk" face="smug" headPitch={-0.1} />
        <Friend v={2} position={[0.86, 0, -2.96]} rotationY={-0.35} animation="idle" face="grin" headPitch={-0.08} />
        {/* He is in the foreground, back to us, holding a borrowed speaker. The one they are not telling. */}
        <Him position={[-0.35, 0, 1.5]} rotationY={Math.PI} animation="idle" face="calm" headphones="neck" night />
        <Speaker position={[-0.35, 0.62, 0.92]} rotationY={Math.PI} tall={0.86} />
        {t >= 0 ? null : null}
      </>
    ),
  },
  {
    id: "1.eyes",
    ...cam.push({ on: [0.15, 1.5, -3.15], dist: 5.4, to: 4.6, fov: 46, yaw: 14, pitch: 4 }),
    zone: "street",
    look: "overworld-night",
    note: "Close on the three faces: one of them glances at him, which is the whole hook — he is being discussed.",
    stage: () => (
      <>
        <Friend v={0} position={[-0.62, 0, -3.05]} rotationY={0.35} animation="talk" face="grin" headPitch={-0.14} />
        <Friend v={1} position={[0.2, 0, -3.42]} rotationY={-0.2} animation="talk" face="smug" headPitch={-0.1} />
        <Friend v={2} position={[0.86, 0, -2.96]} rotationY={-0.5} animation="idle" face="blank" headPitch={0.02} />
      </>
    ),
  },
  {
    id: "1.back",
    ...cam.push({ on: [0, 1.25, 0.4], dist: 4.1, to: 2.9, fov: 46, pitch: 2 }),
    zone: "street",
    look: "overworld-night",
    note: "Him from behind, speaker in his arms, the one lit door in front of him: the film's whole situation in one frame.",
    stage: () => (
      <>
        <Him position={[-0.35, 0, 1.5]} rotationY={Math.PI} animation="idle" face="calm" headphones="neck" night />
        <Speaker position={[-0.35, 0.62, 0.92]} rotationY={Math.PI} tall={0.86} />
        <Friend v={0} position={[-0.62, 0, -3.05]} rotationY={0.15} animation="talk" face="grin" headPitch={-0.12} />
        <Friend v={1} position={[0.2, 0, -3.42]} rotationY={-0.15} animation="talk" face="smug" headPitch={-0.1} />
        <Friend v={2} position={[0.86, 0, -2.96]} rotationY={-0.3} animation="idle" face="grin" headPitch={0} />
      </>
    ),
  },
]);

void DOOR;
