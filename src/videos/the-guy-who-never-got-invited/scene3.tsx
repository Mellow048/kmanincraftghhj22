import { cam } from "../../engine";
import { Block } from "../../engine";
import { Friend, Him, Speaker, stagedScene } from "./kit";

/**
 * BEAT 3 — THE PARTY HE IS NOT AT. Four years ago, night.
 *
 * The window full of people, then him at the step with the speaker, then the cheerful refusal —
 * "Yo. We're full, bro." — which is not cruel, which is worse. He turns and walks, and we hold on the
 * lit window he is walking away from.
 */
export const scene3 = stagedScene("scene3", [
  {
    id: "3.window",
    ...cam.push({ on: [2.6, 1.66, -3.95], dist: 3.4, to: 2.8, fov: 44, pitch: 1 }),
    zone: "street",
    look: "overworld-night",
    note: "The window from the pavement: warm, loud, full of people, and none of them are him.",
    stage: () => (
      <>
        {/* Extra bodies inside, so the window reads as a crowd and not a lamp. */}
        {[
          [2.2, -4.5],
          [3.0, -4.52],
          [2.55, -4.45],
        ].map(([x, z], i) => (
          <group key={i} position={[x, 1.2, z]}>
            <Block size={[0.3, 0.6, 0.2]} color="#331a0c" />
            <Block position={[0, 0.42, 0]} size={[0.24, 0.24, 0.22]} color="#331a0c" />
          </group>
        ))}
      </>
    ),
  },
  {
    id: "3.hope",
    ...cam.push({ on: [0.25, 1.35, -2.7], dist: 3.4, to: 2.5, fov: 42, yaw: -18, pitch: 3 }),
    zone: "street",
    look: "overworld-night",
    note: "He is at the step with the speaker, hopeful, lit from the front by the party he has not been let into.",
    stage: () => (
      <>
        <Him position={[0.35, 0, -1.0]} rotationY={Math.PI} animation="idle" face="smile" headphones="neck" night />
        <Speaker position={[0.35, 0.62, -1.58]} rotationY={Math.PI} tall={0.86} />
        <Friend v={0} position={[-0.55, 0, -3.0]} rotationY={0.1} animation="idle" face="grin" />
      </>
    ),
  },
  {
    id: "3.door",
    ...cam.push({ on: [0.4, 1.5, -2.95], dist: 3.2, to: 2.7, fov: 40, yaw: -26, pitch: 2 }),
    zone: "street",
    look: "overworld-night",
    note: "The friend leans out of the door and says it in one breath, smiling: the refusal is social, not cruel.",
    stage: () => (
      <>
        <Friend v={0} position={[0.2, 0, -3.42]} rotationY={-0.15} animation="talk" face="grin" headPitch={0.06} />
        {/* Him, over the friend's shoulder, small and out of the way. */}
        <Him position={[0.55, 0, -1.05]} rotationY={Math.PI} animation="idle" face="uneasy" headphones="neck" night />
      </>
    ),
  },
  {
    id: "3.leave",
    ...cam.push({ on: [0.4, 1.2, 4.3], dist: 6.6, to: 5.2, fov: 40, yaw: 180, pitch: 2 }),
    zone: "street",
    look: "overworld-night",
    note: "He walks away from the lit door with the speaker, and the camera stays behind him the whole way: he does not look back once.",
    stage: (t) => {
      const walked = Math.min(5.0, t * 1.9);
      return (
        <>
          <Him position={[-0.2, 0, -0.8 + walked]} rotationY={0} animation="walk" arms="hold" face="sad" headphones="neck" night />
          <Speaker position={[-0.2, 0.62, -0.8 + walked - 0.58]} rotationY={0} tall={0.86} />
          <Friend v={0} position={[-0.62, 0, -3.05]} rotationY={0.25} animation="idle" face="laugh" />
          <Friend v={1} position={[0.2, 0, -3.42]} rotationY={-0.15} animation="talk" face="laugh" />
        </>
      );
    },
  },
]);
