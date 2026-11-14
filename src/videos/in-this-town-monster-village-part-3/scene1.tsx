import { Block, cam, storyScene } from "../../engine";
import { AimSword, ArmTree, BLADE, DUSK, HELM, Hero, IronHelmet, SPOT, Z3, timing } from "./kit";

/** THE STREET: what Mo left, and what was behind the boy. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "What was behind me",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [SPOT[0] + 0.6, 1.0, SPOT[2]], dist: 9.5, to: 7.6, yaw: 22, pitch: 12, fov: 46 }),
      zone: Z3.street,
      look: DUSK,
      note: "Where part two stopped: the grey morning, the empty monster street, and one small boy in yellow standing over a sword and a helmet, looking round for anybody at all.",
      stage: () => (
        <>
          <ArmTree />
          <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
          <IronHelmet position={HELM} rotation={[0.2, 0.5, 1.35]} />
          <Block position={[SPOT[0], 0.045, SPOT[2]]} size={[2.4, 0.03, 1.5]} color="#3d3a36" castShadow={false} />
          <Hero position={[SPOT[0] + 1.7, 0, SPOT[2] - 0.3]} rotationY={-0.6} animation="lookAround" face="fear" />
        </>
      ),
    },
  ],
});
