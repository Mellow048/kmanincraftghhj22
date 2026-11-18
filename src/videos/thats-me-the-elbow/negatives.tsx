/** A contact-camera sitting, rendered with the exact same engine. No captions on photographic negatives. */
import { Composition, registerRoot } from "remotion";
import { defineFilm } from "../../engine";
import type { Vec3 } from "../../engine";
import { Kid, Pal, Gran, Uncle, PartyHat, Specs, Cake, Partners, BirthdayCast, fixed, pose } from "./cast";
import { Lounge, Yard } from "./sets";
export const names = ["elbow", "ear", "brow", "four", "family", "bomb", "jun", "jul", "aug", "sep", "oct"];
function Exposure({ name: n }: { name: string }) {
  if (n === "four")
    return (
      <>
        <Lounge />
        <Pal
          n={0}
          position={[0, 0, -0.33]}
          scale={1.12}
          pose={pose({ bodyY: -0.087, armR: [-0.13, 0, -0.22], armL: [-0.13, 0, 0.22] })}
          {...fixed}
        />
        <Pal
          n={1}
          position={[0, 0, -0.83]}
          scale={1.31}
          pose={pose({ bodyY: -0.442, legR: [-0.61, 0, 0], legL: [-0.61, 0, 0], kneeR: [0.83, 0, 0], kneeL: [0.83, 0, 0] })}
          {...fixed}
        />
        <Kid position={[0, 0, 0.17]} face="grin" head={<></>} {...fixed} />
      </>
    );
  if (n === "ear" || n === "brow")
    return (
      <>
        <Lounge />
        <Kid
          position={n === "ear" ? [-1.02, 0, 0] : [0.02, 0, 0.09]}
          headRoll={n === "ear" ? -0.08 : 0}
          face={n === "brow" ? "surprised" : "brave"}
          {...fixed}
        />
      </>
    );
  if (n === "bomb")
    return (
      <>
        <Yard />
        <Partners kid />
      </>
    );
  if (n === "family")
    return (
      <>
        <Yard />
        <BirthdayCast kid />
      </>
    );
  const i = ["elbow", "jun", "jul", "aug", "sep", "oct"].indexOf(n);
  return (
    <>
      <Yard />
      <Gran
        position={[-0.16, 0, -0.22]}
        animation={i === 2 ? "cheer" : i === 3 ? "laugh" : "wave"}
        time={0.8 + i * 0.1}
        {...(i === 1 || i === 4
          ? {
              head: (
                <>
                  <Specs />
                  <PartyHat color="#dd7653" stripe="#fbd26b" />
                </>
              ),
            }
          : {})}
      />
      {(i === 2 || i === 5) && (
        <group position={[-0.08, 0.87, 0.22]}>
          <Cake />
        </group>
      )}
      {i === 3 || i === 4 ? (
        <Uncle position={[0.64, 0, -0.54]} headRoll={-0.1} animation="wave" time={i + 0.35} />
      ) : (
        <Pal
          n={i % 2}
          position={[0.57, 0, -0.46]}
          animation={i === 1 ? "wave" : "cheer"}
          time={0.74 + i * 0.75}
          {...(i === 2 ? { head: <PartyHat color="#4cafa7" stripe="#f4d78b" /> } : {})}
        />
      )}
      {i < 4 ? (
        <Kid position={[-1.92 + i * 0.016, 0, 0.2]} pose={pose({ armR: [-0.28, 0.06, 1.25] })} {...fixed} />
      ) : (
        <Pal n={i === 5 ? 0 : 1} position={[-0.89, 0, -0.3]} animation="wave" time={i} />
      )}
    </>
  );
}
function lens(n: string): [Vec3, Vec3, number] {
  if (n === "four") return [[0, 1.57, 1.85], [0, 1.55, 0], 29];
  if (n === "ear") return [[0, 1.48, 2.22], [0, 1.48, 0], 30];
  if (n === "brow") return [[0, 2.054, 1.87], [0, 2.054, 0], 34];
  if (n === "family") return [[0, 1.67, 4.52], [0, 1.27, -0.14], 34];
  if (n === "bomb") return [[0, 1.54, 3.89], [0, 1.28, 1.1], 36];
  return [[0, 1.54, 3.25], [0, 1.22, 0], 32];
}
const photos = names.map((name) => {
  const [from, target, fov] = lens(name);
  return defineFilm({
    id: "print-" + name,
    title: "Exposure: " + name,
    width: 720,
    height: 540,
    look: "overworld-day",
    post: { shaders: true },
    scenes: [
      {
        id: "shutter",
        title: "Shutter",
        duration: 1,
        shots: [{ at: 0, dur: 1, from, target, fov, note: "The exposure used on physical photo paper." }],
        Component: () => <Exposure name={name} />,
      },
    ],
  });
});
registerRoot(() => (
  <>
    {photos.map((f) => (
      <Composition key={f.id} id={f.id} component={f.Component} durationInFrames={30} fps={30} width={720} height={540} />
    ))}
  </>
));
