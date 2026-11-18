import { useMemo, useLayoutEffect } from "react";
import { BoxGeometry, Color, InstancedMesh, MeshStandardMaterial } from "three";
import { acting } from "./action";
import type { Cube } from "./blocks";
// Recreation: custom articulated hands and kernels are needed here, rather than swapping a held prop between shots.
export function Batch({ parts }: { parts: Cube[] }) {
  const mesh = useMemo(
    () =>
      new InstancedMesh(
        new BoxGeometry(),
        new MeshStandardMaterial({ roughness: 0.82 }),
        6000,
      ),
    [],
  );
  useLayoutEffect(() => {
    if (parts.length > mesh.instanceMatrix.count)
      throw Error("Instanced set too large");
    mesh.count = parts.length;
    const c = new Color();
    parts.forEach((part, i) => {
      mesh.setMatrixAt(i, part.matrix);
      mesh.setColorAt(
        i,
        c.setHex(part.rgb).multiplyScalar(1 + part.glow * 1.2),
      );
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [mesh, parts]);
  return (
    <primitive object={mesh} frustumCulled={false} castShadow receiveShadow />
  );
}
export function Action({ cue, t }: { cue: string; t: number }) {
  const parts = useMemo(() => acting(cue, t), [cue, t]);
  return <Batch parts={parts} />;
}
