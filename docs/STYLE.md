# STYLE — Minecraft night cinema

This is the look. It is deliberately specific: deep-blue night, warm practicals, cold rim light, red carpet, green hospital corridor, pixel faces, volumetric glow. The goal is "a Zack D Films short happened inside a Minecraft world", not "a Minecraft render with a filter".

Read `AGENTS.md`, `docs/CAMERA-BIBLE.md` and `docs/SCENE-CONTRACT.md` first.

---

## 1. The visual thesis

- **Night, not black.** A night scene still has colour: navy walls, teal corridor, blue window light, warm sodium/fluorescent practicals. Pure black hides the set and the story.
- **One warm, one cold.** Every set balances a warm practical (orange, tungsten, sodium) against a cold moon/window/rim (blue, cyan, steel). The contrast is the mood.
- **Light pools, not flat fills.** Light lands somewhere: on the floor, the bed, the wall, the carpet. Use `LightPool` and `GodRay` to show the volume.
- **Silhouette first.** The audience should recognise the threat as a shape before they see a face. Rim/kicker light, back halo, fog.
- **Detail at three scales.** Big shape (architecture), medium props (bed, door, locker), micro detail (seams, vents, scuffs, cables, signs). A room with only the first two reads as a blockout.
- **Pixel faces only.** 8×8 maps, nearest filter. No realistic skin, no photo textures, no smooth gradients on the face.
- **The camera is inside the world.** No 2D cards, no HTML text, no screen-space effects. Text is a 3D sign.

---

## 2. Palette

### Hospital night (the demo look)

| Role | Hex | Use |
|---|---|---|
| Background | `#030913` | renderer background/fog base |
| Fog | `#071426` | depth falloff |
| Wall blue | `#1a2b46` | room walls |
| Wall blue-dark | `#0f1c31` | baseboards, shadow trim |
| Floor blue | `#1a2a44` | room floor |
| Corridor green | `#17362f` | hallway walls |
| Corridor dark | `#0d241f` | door frames, seams |
| Red carpet | `#7e1020` | runner, with `#3a0710` edge |
| Warm practical | `#ffb066` / `#ffdfae` | lamps, ceiling panels, spills |
| Cold key | `#a9c9ff` / `#9fc6ff` | moon, window, rim |
| Skin | `#e8b78d` | kid |
| Hair | `#4a2e1c` | kid |
| Gown stripe | `#c9dcea` / `#8fb7d8` | hospital gown |
| Shadow skin | `#171d2a` | the figure |
| Shadow cloth | `#121826` / `#0d121d` | the figure's outfit |
| Eye glow | `#eaf7ff` | eye pixels / sprites |

### Other presets

- `warm-room`: `#120b06` bg, `#2a1a0e` fog, `#ffcf9a` key, `#ff9b4a` practical.
- `forest-night`: `#020812` bg, `#061426` fog, `#9dc0ff` moon, `#77aaff` rim.
- `street-day`: `#b9d7ee` bg, `#cfe4f4` fog, `#fff3d6` sun, `#bfe0ff` sky fill.
- `void`: `#000000` for a dream/flashback; use sparingly.

Do not use a preset as an excuse to skip a practical. A preset is a base; the world adds the story lights.

---

## 3. The three-light rule

Every scene needs at least three jobs:

1. **Key** — the directional moon/window/sun. Casts the main shadow. One per film is enough.
2. **Practical** — the lamp, ceiling panel, monitor, sign or window the audience can see. It motivates the warm pool.
3. **Rim/kicker** — a cool edge behind the subject, so the silhouette separates from the wall.

Optional fourth: **bounce/fill** — a low, soft point light in front of the subject to reveal the face without flattening the room. Keep it 1–4 intensity and close.

### Light budget
- 1 directional key with shadows.
- 3–6 point lights for practicals/fills/rim.
- 1–2 `Glow` cards for lamps/eyes.
- `GodRay` cards for visible volume.
- `LightPool` cards for where light lands.
- `Dust` for the air.
- `FogCard` for depth or a dark end.

Shadows only on the key. More point lights = slower render, not better lighting.

### Exposure
`post.exposure` 1.05–1.2. If the window is a white rectangle, lower the window's `dim`/`emissiveIntensity`, not the exposure of the whole film. If the room is muddy, add a rim or a pool, not ambient.

---

## 4. Materials and textures

All textures are procedural canvas textures with `NearestFilter`:

- `pixelTex(color, repeat, { jitter })` — noisy block colour for walls/floors.
- `plankTex(color, repeat)` — floorboards.
- `carpetTex()` — red runner with a woven motif.
- `stripeTex(base, stripe, { count, horizontal })` — hospital gown.
- `posterTex(...)` / `Sign` — diegetic text.
- `windowTex()` — night window panes.

Use `Block` with `map` for large surfaces and `color` for trim. Do not use smooth `MeshStandardMaterial` on everything; the jitter is what makes it feel like a place. Keep `roughness` high (0.8–1) and `metalness` low except for metal props.

---

## 5. Detail hierarchy

### Big shape
Walls, floor, ceiling, corridor, doorway, window, bed, locker. These must be correct first. If the room reads as a box, no amount of dust will save it.

### Medium props
Bed with bedding, IV stand, monitor, nightstand, lamp, locker, chair, gurney, bin, cart, curtain, sign, clock. These tell the audience what the place is.

### Micro detail
Baseboards, wall seams, vents, door handles, hinges, thresholds, cables, scuffs, stains, notices, posters, ceiling beams, light diffusers. These are what separate "a room" from "a set".

**Rule:** every wall longer than 2m gets at least two pieces of micro detail. Every door gets a frame, a handle and a sign/threshold. Every bed gets a pillow, a sheet and a contact shadow.

---

## 6. Copy-paste recipes

### 6.1 Room shell

```tsx
const ROOM = { minX: -2.6, maxX: 2.6, minZ: -3.0, maxZ: 3.0, height: 3.0 };
const wallTex = (color: string, repeat: [number, number]) => pixelTex(color, repeat, { jitter: 0.06 });

<group>
  {/* floor */}
  <Block position={[0, -0.05, 0]} size={[5.2, 0.1, 6]} map={wallTex("#1a2a44", [4, 5])} />
  {/* ceiling */}
  <Block position={[0, 3.05, 0]} size={[5.2, 0.1, 6]} color="#0c1422" />
  {/* back wall */}
  <Block position={[0, 1.5, -3.06]} size={[5.2, 3, 0.12]} map={wallTex("#1d2f4c", [4, 2])} />
  {/* baseboards */}
  <Block position={[0, 0.09, -2.98]} size={[5.2, 0.18, 0.04]} color="#0b1526" />
  {/* left wall */}
  <Block position={[-2.66, 1.5, 0]} size={[0.12, 3, 6]} map={wallTex("#1a2b46", [4, 2])} />
  {/* right wall, split around a window opening */}
  <Block position={[2.66, 1.5, -1.7]} size={[0.12, 3, 2.6]} map={wallTex("#1a2b46", [2, 2])} />
  <Block position={[2.66, 1.5, 2.05]} size={[0.12, 3, 1.9]} map={wallTex("#1a2b46", [2, 2])} />
</group>
```

Add seams every 1.5–2m, a ceiling beam every 2–3m, and a vent/notice on a long wall. A shell with no seams is a blockout.

### 6.2 Window + moon + god rays

```tsx
<WindowUnit position={[2.58, 1.75, 0.35]} rotationY={-Math.PI / 2} width={1.5} height={1.2} dim={0.6} />
<pointLight position={[2.2, 1.95, 0.35]} color="#bcd8ff" intensity={11} distance={6} decay={2} />
<Glow position={[2.42, 1.85, 0.35]} size={2.6} color="#9fc6ff" opacity={0.42} />
<Block position={[2.5, 1.08, 0.35]} size={[0.22, 0.06, 1.7]} color="#37445c" />  {/* sill */}
<Block position={[2.5, 1.72, -0.52]} size={[0.08, 1.4, 0.42]} color="#16294a" /> {/* curtain */}
<Block position={[2.5, 1.72, 1.22]} size={[0.08, 1.4, 0.42]} color="#16294a" />
<GodRay position={[1.55, 1.35, 0.15]} rotation={[0, 0.12, -1.02]} width={0.9} height={4.6} color="#a9c9ff" opacity={0.1} />
<LightPool position={[1.5, 0.015, 0.3]} width={2.8} depth={2.2} color="#5f8fd6" opacity={0.22} />
```

- The window is a light source, not a picture. Dim the emissive until the panes are readable.
- The ray starts at the window and lands on the floor. Do not put a ray in the middle of a room with no window.
- A curtain with a gap is more interesting than a symmetrical pair.

### 6.3 Hospital bed + bedside

```tsx
<Bed position={[-1.8, 0, -1.75]} length={2.2} width={1.15} sheet="#c3d7e8" blanket="#24629e" />
<Block position={[-1.8, 0.596, -0.78]} size={[1.21, 0.022, 0.22]} color="#e6eef6" /> {/* folded sheet */}
<Block position={[-1.8, 0.585, -1.02]} size={[1.19, 0.02, 0.06]} color="#8fb4d2" />  {/* fold shadow */}

<Block position={[-0.55, 0.3, -2.55]} size={[0.55, 0.6, 0.45]} color="#2b3548" /> {/* nightstand */}
<Block position={[-0.55, 0.58, -2.55]} size={[0.6, 0.05, 0.5]} color="#3a4761" />
<Block position={[-0.55, 0.72, -2.55]} size={[0.06, 0.24, 0.06]} color="#1c2431" />
<Block position={[-0.55, 0.86, -2.55]} size={[0.26, 0.14, 0.26]} color="#ffcf9a" emissive="#ffb066" emissiveIntensity={0.9} />
<Glow position={[-0.55, 0.88, -2.5]} size={1.0} color="#ffb066" opacity={0.4} />

<Monitor position={[-0.28, 0, -2.32]} rotationY={0.25} />
<Glow position={[-0.26, 0.53, -2.19]} size={0.9} color="#54e08a" opacity={0.4} />

{/* IV stand */}
<Block position={[-0.55, 0.8, -2.05]} size={[0.035, 1.6, 0.035]} color="#8b97a8" metalness={0.5} roughness={0.4} />
<Block position={[-0.42, 1.55, -2.05]} size={[0.3, 0.03, 0.03]} color="#8b97a8" metalness={0.5} roughness={0.4} />
<Block position={[-0.28, 1.4, -2.05]} size={[0.16, 0.24, 0.05]} color="#dce9f5" emissive="#9fd8ff" emissiveIntensity={0.18} />
<Block position={[-0.55, 0.02, -2.05]} size={[0.34, 0.04, 0.34]} color="#6f7b8c" />
<ContactShadow position={[-1.8, 0.014, -1.75]} width={1.4} depth={2.4} opacity={0.45} />
```

The bed is a character. The empty half is the story. Give it a folded sheet, a pillow indent, a rail, a chart, a monitor and a contact shadow.

### 6.4 Doorway

```tsx
<DoorFrame position={[1.65, 0, 3.03]} width={1.0} height={2.15} color="#2c374c" />
<Door position={[1.15, 0, 3.03]} width={1.0} height={2.18} open={-1.35} color="#22352d" />
<Block position={[1.65, 0.03, 2.98]} size={[1.08, 0.06, 0.24]} color="#0b1526" /> {/* threshold */}
<Sign position={[2.55, 1.7, 2.98]} rotationY={0} width={0.5} height={0.34} title="WARD 9" bg="#ded8c4" fg="#1a2230" lit={0.3} />
<pointLight position={[1.55, 2.6, 2.45]} color="#ffdfae" intensity={4} distance={5} decay={2} />
<LightPool position={[1.55, 0.02, 2.35]} width={1.5} depth={1.6} color="#ff9a45" opacity={0.16} />
```

The doorway is the most important prop in a corridor film. It needs a frame, a door, a threshold, a sign, a light above and a spill on the floor. The camera will pass through it; the audience must believe the thickness.

### 6.5 Hallway

```tsx
const HALL = { minX: -2.2, maxX: 2.2, minZ: 3.0, maxZ: 13.0, height: 3.0 };

<Block position={[0, -0.05, 8]} size={[4.4, 0.1, 10]} map={plankTex("#2a2230", [4, 9])} />
<Block position={[0, 3.05, 8]} size={[4.4, 0.1, 10]} color="#0a0f14" />
<Block position={[-2.26, 1.5, 8]} size={[0.12, 3, 10]} map={wallTex("#17362f", [6, 2])} />
<Block position={[2.26, 1.5, 8]} size={[0.12, 3, 10]} map={wallTex("#17362f", [6, 2])} />
<Block position={[-2.19, 0.45, 8]} size={[0.06, 0.9, 10]} map={wallTex("#0f2620", [6, 1])} />
<Block position={[2.19, 0.45, 8]} size={[0.06, 0.9, 10]} map={wallTex("#0f2620", [6, 1])} />
<Carpet position={[0, 0.012, 8]} width={1.65} length={9.6} />

{/* seams every 2.2m, both sides */}
{[4.0, 6.2, 8.4, 10.6, 12.4].map((z) => (
  <group key={z}>
    <Block position={[-2.18, 1.55, z]} size={[0.03, 1.9, 0.05]} color="#0c211c" />
    <Block position={[2.18, 1.55, z]} size={[0.03, 1.9, 0.05]} color="#0c211c" />
  </group>
))}

{/* handrail */}
<Block position={[0, 1.02, 8]} size={[0.02, 0.05, 9.6]} color="#0c211c" />

{/* vents */}
<Block position={[-2.18, 2.25, 6.0]} size={[0.04, 0.5, 0.72]} color="#0b1d19" />
{[0, 1, 2, 3].map((i) => (
  <Block key={i} position={[-2.155, 2.06 + i * 0.12, 6.0]} size={[0.03, 0.03, 0.62]} color="#1d3a33" />
))}

{/* side doors */}
<DoorFrame position={[2.19, 0, 5.5]} rotationY={-Math.PI / 2} color="#0d241f" />
<Door position={[2.17, 0, 5.5]} rotationY={-Math.PI / 2} width={1.0} height={2.15} open={-0.12} color="#1b3730" />
<LightPool position={[0, 0.02, 8.6]} width={2.4} depth={2.6} color="#ff5b3a" opacity={0.07} />
```

Add posters, a gurney, a bin, a cart, a wall clock, a notice board, a fire extinguisher. A corridor is a story engine: every door is a possible threat, every pool of light is a possible reveal.

### 6.6 The figure reveal

```tsx
{/* dark charcoal albedo + rim so the body is not a black hole */}
<MinecraftAvatar
  position={[0.1, 0, 9.4]}
  rotationY={Math.PI}
  scale={1.12}
  animation="idle"
  face="hollow"
  skin="#171d2a"
  hair="#0a0e16"
  outfit="shadow"
  faceGlow={0.85}
  rim={0.5}
  headPitch={0.12}
/>

{/* back halo: separates the head from the wall */}
<Glow position={[0.1, 1.66, 9.54]} size={1.45} color="#a9c9ff" opacity={0.34} />
<Glow position={[0.1, 1.66, 9.58]} size={0.62} color="#d6e8ff" opacity={0.22} />

{/* eye glints: tight, not headlamps */}
<Glow position={[-0.005, 1.74, 9.08]} size={0.075} color="#eaf7ff" opacity={0.75} />
<Glow position={[0.205, 1.74, 9.08]} size={0.075} color="#eaf7ff" opacity={0.75} />

{/* contact + fog */}
<ContactShadow position={[0.1, 0.013, 9.4]} width={1.5} depth={0.75} opacity={0.55} />
<FogCard position={[-0.1, 1.4, 8.55]} width={4.4} height={3.2} color="#0a1826" opacity={0.2} />
```

The reveal needs a 3/4 angle, not a flat-on mask. A dark figure with no rim reads as a rectangle. The halo and the fog are not decoration; they are how the audience sees the shape.

### 6.7 Foreground occlusion

Put something at the edge of the lens:

```tsx
{/* a door frame in the near foreground */}
<Block position={[-2.1, 1.5, 4.2]} size={[0.12, 3, 0.18]} color="#0d241f" />

{/* a curtain / gurney / IV stand at the bottom of frame */}
<Bed position={[-1.25, 0, 11.4]} rotationY={Math.PI / 2} width={0.95} length={1.95} sheet="#d8e2ec" blanket="#dfe7ef" />
```

Foreground occlusion creates parallax. The camera moves, the foreground slides, the background stays. That is 3D depth; no 2D blur can fake it.

### 6.8 Desk / bedroom variant

```tsx
{/* desk top + legs + drawers */}
<Block position={[1.55, 0.72, -2.2]} size={[1.3, 0.08, 0.6]} color="#3a2a22" />
<Block position={[0.95, 0.36, -2.2]} size={[0.08, 0.72, 0.5]} color="#2b1e18" />
<Block position={[2.15, 0.36, -2.2]} size={[0.08, 0.72, 0.5]} color="#2b1e18" />
<Block position={[1.45, 0.36, -2.2]} size={[0.5, 0.5, 0.5]} color="#33241d" />
<Block position={[1.45, 0.55, -1.93]} size={[0.08, 0.04, 0.04]} color="#b08a4a" /> {/* handle */}
<Block position={[1.55, 0.85, -2.2]} size={[0.3, 0.25, 0.2]} color="#ffcf9a" emissive="#ffb066" emissiveIntensity={0.8} /> {/* lamp */}
```

A desk is not a box. It has a top, legs, a drawer, a handle, a lamp, a cable, a book, a cup. Use `Block` for each, and it will read.

---

## 7. Atmosphere placement

| Element | Put it | Opacity / intensity |
|---|---|---|
| `GodRay` | from a window/door into the room, along the light direction | 0.06–0.14 |
| `LightPool` | on the floor where the window/lamp lands | 0.12–0.3 |
| `Glow` | at a lamp, monitor, sign or eye | 0.2–0.5 (lamp), 0.7–0.9 (eye) |
| `Dust` | the volume the ray passes through | 0.2–0.35, 100–250 particles |
| `FogCard` | at a dark end or between camera and threat | 0.15–0.3 |
| `ContactShadow` | under every character/bed/prop | 0.4–0.6 |

Do not put a `GodRay` in the middle of a room with no source. Do not put `Glow` on every prop. Atmosphere should point to the light.

---

## 8. Composition

- **Three layers** in the hero frame: foreground (door frame, curtain, gurney), midground (kid, bed), background (window, hallway, figure).
- **Vertical leading lines**: door frames, wall seams, corridor edges, IV stand. Use them to pull the eye up/down the frame.
- **Subject in the upper third** for 9:16. Leave the lower third for the bed/floor/threat.
- **Off-axis**: 15–30° off flat-on. A cube flat-on is a square; a cube at an angle is a character.
- **Negative space**: the empty half of the bed, the dark doorway, the hall beyond. Negative space is where the audience puts the fear.
- **Frame inside a frame**: doorway, window, locker opening, curtain gap.
- **No naked centre**: if the subject is centred, give the frame a strong foreground or a threatening background.

---

## 9. Faces

- 8×8 pixel maps only. `neutral`, `worried`, `scared`, `surprised`, `happy`, `angry`, `sad`, `sleepy`, `blank`, `smug`, `crying`, `hollow`.
- Use `hollow` for the figure: hairline, near-black face, two 1px glowing eyes. Do not draw a realistic mouth on it.
- The kid's face is the reaction shot. Change `worried` → `scared` on the turn, not every frame.
- At close-up, the eye is a square. That is the style. Use a tight `Glow` sprite for the bloom, not a bigger eye.
- Add a `rim`/kicker and a back halo so the head does not merge with the wall.

---

## 10. Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Flat ambient room | No shape, no mood, looks like a blockout | Key + practical + rim; shadows; pools |
| Pure black figure | Reads as a rectangle, not a person | Charcoal albedo, rim/kicker, halo, 3/4 angle |
| Overbright window | White rectangle, no depth | Lower `dim`, add falloff/pool, keep panes |
| Empty walls | The set feels unfinished | Seams, vents, signs, posters, scuffs |
| Box door/bed | The audience cannot identify it | Engine props + hardware + bedding |
| Centred flat-on camera | A cube looks like a square | 15–30° off-axis, foreground, low/high angle |
| Cut every second | No tension, no geography | 3–5 shots, one fly-through |
| 2D text overlay | Breaks the 3D illusion | 3D `Sign` in the set |
| Realistic face | Breaks the Minecraft style | 8×8 map, nearest filter |
| Too many glows | Foggy, gamey, slow | One glow per source; pool where it lands |

---

## 11. Performance

- Keep `Dust` under ~250 particles per volume.
- Keep point lights to 4–7. Shadows only on the key.
- Reuse materials/textures (the engine caches canvas textures).
- Avoid transparent full-screen planes; `FogCard` is a small card, not a full-screen quad.
- No `@react-three/postprocessing`; it produced black frames under software WebGL.
- Test at 1080×1920, 30fps. If a still takes minutes on the user's machine, stop and ask before rendering.

---

## 12. The quality bar

A frame is ready when:

- the silhouette reads without colour;
- the light tells you where it comes from;
- the set tells you what the place is;
- the face tells you what the character feels;
- the composition tells you where to look;
- and there is one detail you did not need but are glad is there.

If it looks like a blockout with a blue filter, it is not ready.
