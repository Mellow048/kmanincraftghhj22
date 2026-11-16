import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Bubble, Friend, HER_TABLE, Her, Janitor, Kid, Me, P, Shadow, Tray, faceOf, timing } from "./kit";

const SEAT_ME: Vec3 = P("cafe", -4.6, 0.46, 0.6 - 0.86);
const HER_SEAT: Vec3 = [HER_TABLE[0], 0.46, HER_TABLE[2] + 0.86];
const JAN: Vec3 = P("cafe", 0.4, 0, 4.4);

/**
 * THE TEASE, AND THE RULE. He practises on a bread roll; the shadow does it for real and she laughs; the janitor
 * says the rule without a reason, which is the only kind of rule that ever matters in this town.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The janitor's rule",
  shots: [
    {
      cue: "6.prac",
      ...cam.push({ on: [75.45, 1.20, -0.26], dist: 2.51, to: 2.21, yaw: -36.4, pitch: 19.8, fov: 40 }),
      zone: "cafe",
      look: "town-day",
      note: "'So I practised on a bread roll': on him at the end of the table, holding a roll up like it is her face, saying it under his breath.",
      stage: () => (
        <>
          <Me position={SEAT_ME} rotationY={0.2} animation="talk" arms="reach" face="worried" />
          <Block position={[SEAT_ME[0] + 0.02, 1.02, SEAT_ME[2] + 0.56]} size={[0.16, 0.11, 0.14]} color="#c98a3a" />
          <Tray position={[SEAT_ME[0] + 0.5, 0.8, SEAT_ME[2] + 0.5]} rotationY={0.3} />
        </>
      ),
    },
    {
      cue: "6.quote",
      ...cam.push({ on: [75.45, 1.35, -0.26], dist: 1.39, to: 1.19, yaw: 21.0, pitch: 2.1, fov: 30 }),
      zone: "cafe",
      look: "town-day",
      note: "'Do you want to—': right in on his mouth, open, and the rest of the sentence not coming.",
      stage: () => (
        <>
          <Me position={SEAT_ME} rotationY={0.2} animation="talk" arms="reach" face="scared" />
          <Block position={[SEAT_ME[0] + 0.02, 1.02, SEAT_ME[2] + 0.56]} size={[0.16, 0.11, 0.14]} color="#c98a3a" />
        </>
      ),
    },
    {
      cue: "6.walk",
      ...cam.push({ on: [80.90, 1.00, 1.20], dist: 4.94, to: 4.44, yaw: 13.4, pitch: 29.1, fov: 48 }),
      zone: "cafe",
      look: "town-day",
      note: "'Stood up and walked to her table without me': the whole lunch room. The silhouette gets up off the floor and walks across it, in the open, in front of everybody. He is under the table.",
      stage: (t, { p }) => (
        <>
          <Shadow
            position={[P("cafe", -3.4, 0, 1.0)[0] + 6.6 * p, 0, 1.0]}
            rotationY={Math.PI / 2}
            pose="walk"
            lift={0}
            scale={0.82}
            t={t}
            swing={1}
          />
          <Block position={[P("cafe", -4.6, 0.06, 0.4)[0], 0.06, 0.4]} size={[0.2, 0.1, 0.34]} color="#f2f2f2" />
          <Her position={HER_SEAT} rotationY={Math.PI} animation="idle" face="neutral" />
          {[
            [-1.2, 3.6],
            [2.2, 3.6],
          ].map(([x, z], i) => (
            <Kid key={i} n={i + 2} position={[P("cafe", x, 0.46, z)[0], 0.46, z]} rotationY={Math.PI} animation="idle" />
          ))}
        </>
      ),
    },
    {
      cue: "6.laugh",
      ...cam.push({ on: [84.60, 0.70, 1.36], dist: 1.71, to: 1.46, yaw: 20.6, pitch: -1.7, fov: 40 }),
      zone: "cafe",
      look: "town-day",
      note: "'She laughed. I was under the table': from the floor, her shoes and the hem of the tablecloth, and a black hand resting on the table edge where his should be.",
      stage: (t, { p }) => (
        <>
          <Her position={HER_SEAT} rotationY={Math.PI} animation="laugh" face="happy" />
          <Block position={[HER_TABLE[0] + 0.1, 0.79, HER_TABLE[2] + 0.3]} size={[0.7, 0.03, 0.14]} color="#0a0d16" castShadow={false} />
          <Bubble text="HA" position={[HER_TABLE[0] - 0.55, 1.5, HER_TABLE[2] + 0.5]} rotationY={0.2} scale={0.3 * Math.min(1, p * 2.5)} tail={-1} />
          <Me position={[HER_TABLE[0] - 1.3, 0, HER_TABLE[2] + 1.5]} rotationY={0.1} animation="cower" face="sad" gaze={-1} />
        </>
      ),
    },
    {
      cue: "7.jan",
      ...cam.push({ on: [80.40, 1.10, 4.20], dist: 2.14, to: 1.74, yaw: 161.6, pitch: 27.8, fov: 46 }),
      zone: "cafe",
      look: "town-day",
      note: "'The old janitor had seen it before': the doorway at the back of the lunch room, and the janitor standing in it with his mop, looking at the boy on the floor.",
      stage: () => (
        <>
          <Janitor position={JAN} rotationY={Math.PI} animation="idle" face="neutral" />
          <Block position={[JAN[0] + 0.34, 0.72, JAN[2] - 0.1]} size={[0.06, 1.5, 0.06]} color="#a8875a" />
          <Block position={[JAN[0] + 0.34, 0.06, JAN[2] - 0.1]} size={[0.42, 0.12, 0.3]} color="#cfd3d8" />
          <Me position={[P("cafe", -0.6, 0, 2.6)[0], 0, 2.6]} rotationY={2.6} animation="cower" face="worried" />
          <Shadow position={[P("cafe", -0.6, 0, 2.9)[0], 0, 2.9]} rotationY={2.2} pose="cower" scale={0.8} lift={0.5} />
        </>
      ),
    },
    {
      cue: "7.why",
      ...cam.push({ on: [80.20, 1.00, 3.70], dist: 2.66, to: 2.36, yaw: 51.3, pitch: 15.3, fov: 42 }),
      zone: "cafe",
      look: "town-day",
      note: "'Why does mine never stay where I put it?': from the floor beside them, up at the two of them. The kid is half the janitor's height, and the mop is taller than both.",
      stage: () => (
        <>
          <Janitor position={JAN} rotationY={Math.PI * 0.85} animation="idle" face="neutral" />
          <Block position={[JAN[0] + 0.34, 0.72, JAN[2] - 0.1]} size={[0.06, 1.5, 0.06]} color="#a8875a" />
          <Me position={[P("cafe", -0.75, 0, 3.6)[0], 0, 3.6]} rotationY={0.5} animation="talk" face="worried" gaze={-1} />
        </>
      ),
    },
    {
      cue: "7.ans",
      ...cam.push({ on: [80.40, 1.55, 4.40], dist: 1.75, to: 1.55, yaw: 166.8, pitch: 1.6, fov: 33 }),
      zone: "cafe",
      look: "town-day",
      note: "'Because you keep letting it do the brave parts': tight on the janitor. He does not look at the boy while he says it, which is worse.",
      stage: () => (
        <>
          <Janitor position={JAN} rotationY={Math.PI * 0.9} animation="talk" face="neutral" />
        </>
      ),
    },
    {
      cue: "7.mop",
      ...cam.truck({ on: [78.80, 1.05, 4.40], dist: 2.74, yaw: 166.5, pitch: 20.3, by: [-4.6, 0, 0], fov: 44 }),
      zone: "cafe",
      look: "town-day",
      note: "'Then he walked off': behind him as he goes, mop dragging, back through the door he came in by. The boy is left standing in the middle of it.",
      stage: (t, { p }) => (
        <>
          <Janitor
            position={[JAN[0] - 3.4 * p, 0, JAN[2] + 0.3 * p]}
            rotationY={Math.PI * 1.06}
            animation="walk"
            animDistance={3.8 * p}
            face="neutral"
          />
          <Me position={[P("cafe", -1.2, 0, 3.2)[0], 0, 3.2]} rotationY={Math.PI * 0.9} animation="idle" face="sad" />
          <Friend position={[P("cafe", -2.6, 0, 3.9)[0], 0, 3.9]} rotationY={-0.4} animation="idle" face="sad" />
        </>
      ),
    },
  ],
});

void Block;
void Friend;
