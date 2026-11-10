# CAMERA BIBLE — Zack D grammar for 9:16 Minecraft

This is the camera half of the framework. It assumes one continuous 3D world, one film, one camera that never teleports. The goal is not "cool drone shots". The goal is a 20-second story that a phone viewer cannot scroll past.

Read this with `AGENTS.md`, `docs/STYLE.md` and `docs/SCENE-CONTRACT.md`.

---

## 1. The promise

The camera is a character. It has a body, a height, a reason to move and a thing it wants to see. If the camera moves because the timeline needed movement, the audience feels it. If it moves because the character heard something, the audience leans in.

Zack D grammar in one sentence:

> Put the camera in the room, make it move for a reason, reveal the thing the hook promised, and end before the thing reaches us.

---

## 2. The 20-second beat map

| Time | Beat | Camera job | Typical move |
|---|---|---|---|
| 0.0–1.5 | Hook | Prove something is wrong | Already close, already moving; unusual angle |
| 1.5–5.0 | Context | Show the normal world and its exits | Slow push or pull; establish geography |
| 5.0–9.0 | Turn | Show the detail that changes the meaning | Insert, reaction, or a small pan |
| 9.0–16.0 | Reveal | Deliver the threat the hook promised | Continuous fly-through or long push |
| 16.0–20.0 | Button | Make the threat personal | Close-up, tiny push, shake, cut to black |

Do not spend 8 seconds establishing. Do not reveal the monster at 19 seconds. Do not explain the ending.

---

## 3. The six shots

### 3.1 Establish
**Job:** geography, loneliness, the exit.
**Duration:** 2.5–4.5s.
**FOV:** 45–60.
**Move:** slow push from the door corner, or slow pull to reveal the empty half of the room.
**Composition:** subject small enough to feel the room, large enough to read. Put a doorway or window in the background so the audience knows where the story can go.
**Minecraft translation:** the blocky room needs depth. Put a foreground object (curtain, door frame, IV stand) at the edge of frame and let the camera move past it.

### 3.2 Insert
**Job:** the object the narration is talking about.
**Duration:** 1.2–2.5s.
**FOV:** 30–42.
**Move:** push or lateral track; almost macro.
**Composition:** the object fills 40–70% of frame; one piece of context stays visible.
**Minecraft translation:** signs, clocks, monitors, charts and door handles are your close-up actors. A `Sign` with readable pixel text is better than a caption.

### 3.3 Reaction
**Job:** the face decides.
**Duration:** 1.5–3.0s.
**FOV:** 32–40.
**Move:** barely move; let the head turn or the eyes shift.
**Composition:** 9:16 loves a face in the upper third with negative space below. Do not centre the eyes on the horizontal midline.
**Minecraft translation:** the 8×8 face is the performance. Use `worried` → `scared`, a head yaw, a blink, a breath. Do not cut to a new face for every emotion.

### 3.4 Follow
**Job:** the character crosses a threshold.
**Duration:** 2.5–4.5s.
**FOV:** 38–50.
**Move:** track behind or beside; keep the subject in the lower third and the destination in the upper third.
**Composition:** the doorway is a frame inside the frame. The audience should want the camera to go through it.
**Minecraft translation:** the camera must physically pass through the opening. Do not cut from one side of a wall to the other unless the cut is the point.

### 3.5 Reveal / fly-through
**Job:** the signature move. The camera crosses space and finds what was always there.
**Duration:** 5–7s (the one exception to the 5s rule).
**FOV:** 38–46.
**Move:** multi-point `path` + `targetPath`, ease in/out, no cuts.
**Composition:** start on the character or the threshold; end on the threat. The path should pass a foreground occluder so the reveal has a beat of concealment.
**Minecraft translation:** one continuous world is the whole trick. The hallway must be the same hallway behind the door. If the geometry cheats, the reveal dies.

### 3.6 Button
**Job:** the last image that recontextualises the film.
**Duration:** 2–3.5s.
**FOV:** 30–38.
**Move:** a tiny push, a slow drift, or a shake on the final beat. Never a new location.
**Composition:** close enough to feel unsafe; leave room at the edge for something to enter, or don't — the threat is already in frame.
**Minecraft translation:** glowing eyes in a dark face, a hand on the door, a light dying. End on the image, not on an explanation.

---

## 4. Camera-move vocabulary

| Move | Use it for | Avoid it when |
|---|---|---|
| Push in | realisation, pressure, intimacy | the subject has nothing to reveal |
| Pull out | loneliness, scale, "look what is behind you" | the background is empty |
| Lateral track | parallax, scanning a room, following a glance | the set has no layers |
| Arc/orbit | circling a threat, showing a face in 3/4 | the room is too tight or the subject is flat-on |
| Crane up/down | power shift, reveal a body on the floor | the ceiling is a naked plane |
| Fly-through | threshold crossing, hallway reveal | there is no second room to reveal |
| Handheld | panic, impact, the last step | the whole film becomes shaky |
| Locked-off | a 1–1.5s insert, a dead thing | anything longer than 2s |

### Move rules

- One move per shot. A push and a pan and a roll is a music video, not a story.
- Ease in and out. Linear moves feel like a security camera.
- Start and end on a composition, not mid-move.
- A cut should land on a new composition, not on the same frame with a different lens.
- A camera move should reveal new information. If the frame looks the same at the end, the move is decoration.

---

## 5. 9:16 framing

### FOV
- 30–36: claustrophobia, face, object, threat.
- 38–46: the house lens. Most shots.
- 48–60: establish, panic, tiny room.
- 60+: only for a deliberate fish-eye / dream / fall.

### Subject placement
- Eyes in the upper third, not the centre. Leave the lower third for the bed, the floor, the thing approaching.
- Put a vertical line (door frame, wall seam, window edge) off-centre. Vertical video punishes symmetrical flatness.
- Use the full height: ceiling/light at the top, floor/reflection at the bottom. Do not frame a horizontal movie inside a vertical phone.
- Foreground at the bottom edge, midground subject, background threat. Three layers minimum in the hero frame.

### Camera height
- 1.2–1.7m: human POV. The default.
- 0.4–0.8m: low, threatening, worm's-eye. Use for the figure or a fall.
- 2.4m+: high, vulnerable, god's-eye. Use for the kid alone in bed.

### Headroom
Minecraft heads are cubes. A centred cube reads as a box. Put the head slightly above centre, tilt the camera a few degrees off-axis, and let a doorway or light frame it.

### Roll and shake
- Roll: 0–3° maximum. A tiny tilt makes a corridor feel wrong.
- Shake: 0.005–0.03 world units. Use on impact or the final step, not on every shot.
- Never shake a dialogue/insert shot. Never shake the whole film.

---

## 6. Cut logic

### Cut when
- a new object must be read (insert);
- a reaction changes the meaning;
- a threshold is crossed;
- the audience has just understood something and needs to see the consequence.

### Do not cut when
- the camera is mid-move and the move is the point;
- you are bored of the shot (move the camera instead);
- the narration changes line (the image does not have to change);
- you need to hide a set seam (light it, frame it, or move the path).

### Cut style
- Hard cut on action or breath. No dissolve except the final fade.
- Match the subject's screen position across the cut so the eye does not hunt.
- A cut from a wide to a close-up should be motivated by a look, a sound or a line.
- No cut to black mid-film. Fade only in/out at the edges.

### Cut budget
A 20-second film: 3–5 shots. A 30-second film: 5–7. If you have 12 shots, you have a montage, not a story.

---

## 7. Continuity

The camera state is a contract:

- `from` = previous scene's last `to` (or last `path` point).
- `target` = previous scene's last `targetTo` (or last `targetPath` point).
- `fov` = previous scene's last `fovTo`.
- No hidden teleport between files. Copy the numbers.

If you intentionally cut between scenes, write a `note` that says so and make the cut motivated. The check script cannot see this. The audience can.

---

## 8. Minecraft-specific direction

### Blocky geometry needs camera depth
A flat-on wall is a flat-on wall. Move 15–30° off-axis. Put a door frame, a curtain, a gurney or a character in the foreground. Let the camera pass it.

### Scale is the joke and the threat
A 1.8m Minecraft person in a 3m room feels huge. Use low angles to make the figure monstrous and high angles to make the kid small. A door that is 2.15m tall is a real door; a 1m opening is a crawlspace.

### Doorways are your best composition tool
A doorway is a frame, a threshold, a light spill and a promise. Build it with `DoorFrame` + `Door`. Put a sign beside it. Put a light above it. Let the camera go through it.

### Do not show the world edge
Use fog, a `FogCard`, a dark end wall, or a window to terminate the hallway. Never let the camera see the end of a wall that stops in space.

### Faces are 8×8
Do not use realistic face textures. The pixel map is the style. At close-up, a 1px eye is a square; that is correct. Separate the head from the background with a rim/kicker and a back halo, not with a realistic face.

### Motion is the material
Minecraft is stiff. Compensate with camera moves, head turns, breathing, flicker, dust, curtains and light. A static Minecraft room looks like a blockout. A moving one looks alive.

---

## 9. Pacing and narration sync

- The camera move starts on the line that motivates it, not before.
- The reveal lands on the word that names it, or one beat after.
- Do not move on every word. Let a line sit on a still-ish frame for 1 second.
- Silence is a shot. Use it before the button.
- If the narration says "behind you", the camera should already be turning, or the line should land on the turn.
- If the narration asks "what was that?", the next shot is the answer — or the fake answer.

---

## 10. Shot-list template

```ts
shots: [
  {
    at: 0,
    dur: 3.6,
    from: [1.62, 1.98, 2.48],
    to: [0.86, 1.62, 1.78],
    target: [-1.72, 1.24, -0.88],
    targetTo: [-1.8, 1.38, -0.72],
    fov: 52,
    fovTo: 44,
    ease: "inOutSine",
    note: "Push in on the boy so the empty half of the bed becomes the second character.",
  },
  {
    at: 3.6,
    dur: 2.0,
    from: [0.86, 1.62, 1.78],
    to: [0.6, 1.56, 1.52],
    target: [1.15, 1.7, 3.0],
    fov: 44,
    fovTo: 40,
    ease: "inOutCubic",
    note: "His glance pulls the camera to the open door. The reveal is the darkness, not the door.",
  },
]
```

Every shot has a `note`. If the note is "push in", rewrite it until it names the story reason.

---

## 11. Worked example — THE SCHEDULE

| Time | Shot | Why it exists |
|---|---|---|
| 0–4.0 | Slow push from door corner to bed | Establish room; isolate the boy; the empty bed half is the second character |
| 4.0–5.9 | Push on the timetable | The normal-world lie: a schedule for tomorrow |
| 5.9–7.6 | Cut to his face | He is not looking at it; pressure closes in |
| 7.6–9.7 | Hold close-up, head turn | The sound arrives before the camera does |
| 9.7–11.0 | Pan across room to the doorway | His glance motivates the move; the exit becomes the threat |
| 11.0–17.0 | One continuous fly-through | Cross the threshold, follow the hall, reveal the figure; no cut |
| 17.0–20.2 | Push on the eyes, one step | The figure is already there; end before it reaches us |

The film has 4 cuts in 20 seconds. The longest shot is the fly-through because it is the signature move and it keeps revealing new space. Every other shot is under 5 seconds.

---

## 12. Common failures

| Failure | Symptom | Fix |
|---|---|---|
| Blockout camera | Wide, flat, centred, nothing in foreground | Move 20° off-axis; add foreground; lower the camera |
| Teleport cut | The room changes between scenes | Match `from`/`target`/`fov` exactly |
| Cut spam | 10 shots in 20s, no tension | Merge shots; use one fly-through |
| Static insert | A sign on screen for 4s | Push or track; cut on the line |
| Empty reveal | The monster is a black rectangle | Rim/kicker, back halo, fog, eye glints, 3/4 angle |
| Overlit night | Everything is blue-grey and flat | Kill ambient; key through window; warm practical; cool rim |
| Blown window | White rectangle with no falloff | Dim the emissive, add a pool, let the wall fall off |
| Face too realistic | The pixel style breaks | Use the 8×8 maps and nearest-filter textures |
| Camera through wall | A flash of backface or void | Walk the path; move the path or the wall |
| No button | The film just stops | End on the eyes, the step, the line, the dark |

---

## 13. The one-question test

Before you lock a shot, ask:

> "What does the audience know at the end of this shot that they did not know at the start?"

If the answer is "nothing", the shot is decoration. Cut it, merge it, or give the camera a reason.
