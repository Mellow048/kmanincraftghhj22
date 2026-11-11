import {
  Block, CeilingLight, CeilingTiles, Curtains, Door, DoorFrame, Locker,
  NoticeBoard, Sign, WallClock, WindowUnit, pixelTex,
} from "../../../src/engine";
import type { Vec3 } from "../../../src/engine";

/** School desk and chair with legs, drawer and an open book; room for a walking aisle. */
export const ClassDesk: React.FC<{ position: Vec3; rotationY?: number; book?: string }> = ({
  position, rotationY = 0, book = "#e9e2c8",
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.68, 0]} size={[1.16, 0.1, 0.72]} color="#a87957" />
    {[-0.48, 0.48].flatMap((x) => [-0.25, 0.25].map((z) => (
      <Block key={`${x}-${z}`} position={[x, 0.33, z]} size={[0.07, 0.65, 0.07]} color="#5c6d70" metalness={0.2} />
    )))}
    <Block position={[0, 0.54, 0.3]} size={[0.97, 0.17, 0.05]} color="#735943" />
    <Block position={[0, 0.747, -0.03]} size={[0.36, 0.018, 0.27]} color={book} />
    <Block position={[0, 0.757, -0.03]} size={[0.018, 0.012, 0.27]} color="#7e9ca4" />
    <Block position={[0.01, 0.37, 0.72]} size={[0.8, 0.09, 0.43]} color="#536a6d" />
    <Block position={[0.01, 0.69, 0.91]} size={[0.8, 0.54, 0.08]} color="#536a6d" />
    {[-0.31, 0.33].map((x) => (
      <Block key={x} position={[x, 0.18, 0.74]} size={[0.05, 0.35, 0.05]} color="#4a5d61" />
    ))}
  </group>
);

/** One straight, physically connected school: front door → hall → classroom. */
export const SchoolMap: React.FC = () => (
  <group>
    {/* Exterior facade is split around a 2.3m opening; a camera can really enter. */}
    <Block position={[0, -0.12, 4.1]} size={[10.4, 0.2, 1.2]} color="#bebda7" />
    <Block position={[-3.075, 1.8, 3.55]} size={[3.85, 3.6, 0.18]} map={pixelTex("#cfbb95", [3, 3])} />
    <Block position={[3.075, 1.8, 3.55]} size={[3.85, 3.6, 0.18]} map={pixelTex("#cfbb95", [3, 3])} />
    <Block position={[0, 3.04, 3.55]} size={[2.3, 1.12, 0.18]} color="#cfbb95" />
    <Block position={[0, 3.64, 3.52]} size={[10.2, 0.19, 0.3]} color="#43636a" />
    <Block position={[-4.93, 1.8, 4.0]} size={[0.25, 3.6, 0.8]} color="#476568" />
    <Block position={[4.93, 1.8, 4.0]} size={[0.25, 3.6, 0.8]} color="#476568" />
    <DoorFrame position={[0, 0, 3.49]} rotationY={Math.PI} width={2.3} height={2.43} color="#476468" />
    <Door position={[1.15, 0, 3.47]} rotationY={Math.PI} width={2.3} height={2.43} open={Math.PI} color="#668f8b" />
    <Block position={[0, 0.035, 3.51]} size={[2.4, 0.07, 0.4]} color="#d9c69f" />
    <Sign position={[0, 3.08, 3.36]} rotationY={Math.PI} width={2.52} height={0.7} title="SCHOOL" subtitle="MONSTER DAY" bg="#ede4c6" fg="#30474a" accent="#cf755a" lit={0.3} />
    <Sign position={[-3.02, 2.12, 3.43]} rotationY={Math.PI} width={0.8} height={0.9} title="RANKS" lines={["1", "100", "10000"]} bg="#f4e7c9" fg="#315c60" accent="#d07050" />
    <Sign position={[3.02, 2.08, 3.43]} rotationY={Math.PI} width={0.8} height={0.9} title="WELCOME" subtitle="AGE 10" bg="#f4e7c9" fg="#315c60" />
    <WindowUnit position={[-3.7, 2.1, 3.41]} rotationY={Math.PI} width={1.0} height={1.1} dim={0.36} />
    <WindowUnit position={[3.7, 2.1, 3.41]} rotationY={Math.PI} width={1.0} height={1.1} dim={0.36} />
    <Block position={[-3.7, 1.45, 3.36]} size={[1.18, 0.09, 0.25]} color="#ede4c6" />
    <Block position={[3.7, 1.45, 3.36]} size={[1.18, 0.09, 0.25]} color="#ede4c6" />

    {/* Hall: ceiling and wall detail survive a physical fly-through. */}
    <Block position={[0, -0.05, 6.1]} size={[6.2, 0.1, 5.1]} map={pixelTex("#7795a0", [5, 4], { jitter: 0.06 })} />
    <Block position={[0, 3.64, 6.1]} size={[6.2, 0.12, 5.1]} color="#d8d8c8" />
    <CeilingTiles position={[0, 3.56, 6.1]} size={[6.2, 5.1]} />
    <Block position={[-3.15, 1.8, 6.1]} size={[0.12, 3.6, 5.1]} color="#c3d2c6" />
    <Block position={[3.15, 1.8, 6.1]} size={[0.12, 3.6, 5.1]} color="#c3d2c6" />
    <Block position={[-3.07, 0.52, 6.1]} size={[0.07, 1.04, 5.1]} color="#61847f" />
    <Block position={[3.07, 0.52, 6.1]} size={[0.07, 1.04, 5.1]} color="#61847f" />
    <Block position={[-3.05, 0.05, 6.1]} size={[0.08, 0.1, 5.1]} color="#426466" />
    <Block position={[3.05, 0.05, 6.1]} size={[0.08, 0.1, 5.1]} color="#426466" />
    <Block position={[0, 0.014, 6.1]} size={[0.1, 0.012, 5.0]} color="#dbd0a9" />
    {[4.25, 6.2, 8.1].map((z) => (
      <group key={z}>
        <Block position={[-3.04, 1.75, z]} size={[0.04, 2.6, 0.08]} color="#5f8078" />
        <Block position={[3.04, 1.75, z]} size={[0.04, 2.6, 0.08]} color="#5f8078" />
      </group>
    ))}
    <Locker position={[-2.72, 0, 5.05]} rotationY={Math.PI / 2} width={1.1} height={2.1} color="#739ca0" doors={2} />
    <Locker position={[2.72, 0, 6.7]} rotationY={-Math.PI / 2} width={1.1} height={2.1} color="#739ca0" doors={2} />
    <NoticeBoard position={[-3.02, 2.26, 7.5]} rotationY={Math.PI / 2} width={0.75} seed={14} />
    <Sign position={[3.02, 2.3, 4.65]} rotationY={-Math.PI / 2} width={0.6} height={0.75} title="BE KIND" subtitle="TO SMALL PETS" bg="#f4e8c7" fg="#2e5557" accent="#d66d56" />
    <WallClock position={[2.98, 2.87, 7.95]} rotationY={-Math.PI / 2} radius={0.23} />
    <CeilingLight position={[0, 3.45, 5.1]} size={[1.0, 0.22]} color="#fff3cc" lightColor="#fff2cf" intensity={4.5} distance={5} />
    <CeilingLight position={[0, 3.45, 7.5]} size={[1.0, 0.22]} color="#fff3cc" lightColor="#fff2cf" intensity={4.5} distance={5} />

    {/* Shared wall at the classroom threshold; the split leaves a real opening. */}
    <Block position={[-2.825, 1.8, 8.65]} size={[3.35, 3.6, 0.14]} color="#cbd8ca" />
    <Block position={[2.825, 1.8, 8.65]} size={[3.35, 3.6, 0.14]} color="#cbd8ca" />
    <Block position={[0, 3.04, 8.65]} size={[2.3, 1.12, 0.14]} color="#cbd8ca" />
    <DoorFrame position={[0, 0, 8.63]} width={2.3} height={2.43} color="#45666a" />
    <Door position={[-1.15, 0, 8.65]} width={2.3} height={2.43} open={Math.PI} color="#608c86" />
    <Block position={[0, 0.033, 8.65]} size={[2.35, 0.07, 0.34]} color="#e6d5ad" />
    <Sign position={[2.55, 2.8, 8.55]} rotationY={Math.PI} width={0.63} height={0.42} title="CLASS 10" bg="#eee5c8" fg="#305054" />

    {/* Classroom: rows on the sides, central aisle free for the worm's reveal. */}
    <Block position={[0, -0.05, 12.45]} size={[9, 0.1, 7.6]} map={pixelTex("#afbdad", [7, 6], { jitter: 0.04 })} />
    <Block position={[0, 3.65, 12.45]} size={[9, 0.1, 7.6]} color="#dadaca" />
    <CeilingTiles position={[0, 3.58, 12.45]} size={[9, 7.6]} />
    <Block position={[4.56, 1.8, 12.45]} size={[0.12, 3.6, 7.6]} color="#cfdbcb" />
    <Block position={[4.48, 0.54, 12.45]} size={[0.06, 1.08, 7.6]} color="#7b9d90" />
    <Block position={[4.47, 0.05, 12.45]} size={[0.07, 0.1, 7.6]} color="#43666a" />
    <Sign position={[4.43, 2.15, 11.1]} rotationY={-Math.PI / 2} width={1.04} height={0.84} title="GROW" lines={["TOGETHER", "NOT ALONE"]} bg="#f6ebd0" fg="#355d5a" accent="#ce7359" />
    <Sign position={[4.43, 2.05, 14.05]} rotationY={-Math.PI / 2} width={1.0} height={0.84} title="MONSTER" lines={["RANK  DAY"]} bg="#e5ebda" fg="#355d5a" accent="#c38954" />

    {/* Actual openings in the window wall at z=10.65 and 14.0. */}
    {[
      [9.325, 1.35], [12.325, 2.05], [15.45, 1.6],
    ].map(([z, length]) => (
      <Block key={z} position={[-4.56, 1.8, z]} size={[0.12, 3.6, length]} color="#cbdacb" />
    ))}
    {[10.65, 14.0].map((z) => (
      <group key={z}>
        <Block position={[-4.56, 0.62, z]} size={[0.12, 1.24, 1.3]} color="#cbdacb" />
        <Block position={[-4.56, 3.06, z]} size={[0.12, 1.08, 1.3]} color="#cbdacb" />
        <WindowUnit position={[-4.47, 1.95, z]} rotationY={Math.PI / 2} width={1.25} height={1.3} dim={0.55} />
        <Curtains position={[-4.34, 2.08, z]} rotationY={Math.PI / 2} width={1.7} height={1.65} color="#8ea6a4" gap={1.25} />
        <Block position={[-4.31, 1.22, z]} size={[0.24, 0.1, 1.48]} color="#f2e5c1" />
      </group>
    ))}

    <Block position={[0, 1.8, 16.31]} size={[9, 3.6, 0.14]} color="#cedccd" />
    <Block position={[0, 0.53, 16.19]} size={[9, 1.05, 0.08]} color="#7c9f91" />
    <Block position={[0, 0.06, 16.18]} size={[9, 0.12, 0.1]} color="#3f6465" />
    <Block position={[0, 2.14, 16.16]} size={[4.8, 1.77, 0.12]} color="#4a6f6c" />
    <Block position={[0, 1.31, 16.0]} size={[5.1, 0.09, 0.2]} color="#a57e5e" />
    <Sign position={[0, 2.85, 16.05]} rotationY={Math.PI} width={2.1} height={0.37} title="OUR MONSTERS" bg="#e7d8ab" fg="#304e51" accent="#b87760" lit={0.25} />
    <ClassDesk position={[-2.8, 0, 11.1]} book="#d8e6d6" />
    <ClassDesk position={[2.8, 0, 11.1]} book="#e5d5bd" />
    <ClassDesk position={[-2.8, 0, 13.35]} book="#f1d6c5" />
    <ClassDesk position={[2.8, 0, 13.35]} book="#d4e4e4" />
    <Block position={[3.55, 0.68, 15.15]} size={[1.65, 0.12, 0.77]} color="#876f55" />
    <Block position={[3.55, 0.34, 15.15]} size={[0.12, 0.68, 0.65]} color="#5e6c6c" />
    <Block position={[3.55, 0.74, 15.0]} size={[0.38, 0.05, 0.28]} color="#f6e6bd" />
    <CeilingLight position={[-1.95, 3.45, 11.25]} size={[1.2, 0.24]} color="#fff1cc" lightColor="#ffe5b0" intensity={6} distance={6} />
    <CeilingLight position={[1.95, 3.45, 13.6]} size={[1.2, 0.24]} color="#fff1cc" lightColor="#ffe5b0" intensity={6} distance={6} />
    <WallClock position={[3.2, 3.04, 16.1]} rotationY={Math.PI} radius={0.21} />
  </group>
);
