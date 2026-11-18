# Historical review — the earlier 108-second cut

The current remaster is documented in [REMASTER.md](./REMASTER.md). The timings and limitations below describe the superseded cut.

# Replacement build — production and review log

**Title:** The Guy Who Never Had a Car.
**Premise:** A man without a car treats washing other people's cars as an elite athletic calling.

## Scope
The approved script remains in `Topics/Reel/outlines/the-guy-who-never-had-a-car.md`.
The rejected PIL/FFmpeg slideshow is not the source for this composition. This replacement uses
`defineFilm`, `storyScene`, `cam`, `MinecraftAvatar`, `Vox`, engine lighting and engine captions.
No engine changes and no edits to any previously approved film.

## Hook choice
1. **Chosen:** extreme, fast scrubbing on an ordinary car, HUS chant, dead-serious face.
2. Friends cruising while he holds a sponge — readable but gives away the contrast too early.
3. A pristine dealership — weaker because the absurd behaviour is not visible immediately.

## Spine and storyboard
The complete shot-by-shot camera/staging/caption-card plan is `scene1.tsx` (41 shots).
`timing.json` records each shot's start/end and the spoken caption track.

| Time | Beat | Visual action | Camera | Audio |
|---|---|---|---|---|
| 0–6.8 | Hook | Rapid scrubbing; future mirror-finish payoff | Contact insert, face insert, clean-car reveal | Voice-20 chant, 1.65x, phonk |
| 6.8–14 | Setup | Rewind, friends in a moving car, invitation | Street wide into interaction | Invitation take, beat |
| 14–26.5 | Contrast | Friends cruise; he has a sponge, not a car | Street, sponge insert, solitary driveway | Town take |
| 26.5–32 | Objective | He admires the finish, not ownership | Showroom three-quarter and detail | Dream take |
| 32–36.5 | Failure | Bad paint streak, foam, reaction | Result then face | Almost take |
| 36.5–63 | Escalation | Wash, dry, toothbrush, meal, retired sponges, calendar, repeat | Alternating contact, wheel, overhead inserts and medium shots | Grind take, water/wipe sounds, instrumental |
| 63–76 | Development | Glove callback, walk into Diamond Auto, first shift | Hands, bay wide, medium | Months/hired takes |
| 76–86 | Reunion | Muddy wreck, cone, friends' shock, flat reply | Group then close reaction | Reunion and training takes |
| 86–90 | Pause | Pigeon lands, worker doesn't react | Car-roof insert | Music drops out |
| 90–98 | Payoff | Fast work and final wipe strip the dirt | Fast action inserts, clean reveal | Sped-up chant, beat returns |
| 98–108 | Resolution | Three people reflected in the finish; worker leaves | Actual planar reflection then bay wide | Instrumental fade, final card |

## Assets
- Existing MinecraftAvatar rig, procedural face/skin textures and animation poses.
- Consistent teal hoodie, dark trousers, yellow gloves and sponge.
- New 3D car model: four wheels, seats, windscreen, side glass, layered panels, grille, lamps, bumpers.
- Same car with procedural dirt, foam and roof cone for the reunion.
- Existing Minecraft blocks, oak/cobble houses, trees and torches for the driveway/street.
- Dealership bay, tool chest, ceiling strips, floor lighting, dust, shafts and adjacent inventory cars.
- Bucket, toothbrush, cloth, chicken/rice, sponge pile, calendar and pigeon.
- Three.js Reflector for real scene reflections in the final panel.
- Pixel-font mesh title cards positioned safely within the film camera's frustum.

## Audio and captions
`public/audio/the-guy-who-never-had-a-car/mix.mp3` preserves the chosen voice-20 mix,
original phonk-style instrumental, sprays/wipes and impacts. Both chant sections use
pitch-preserving `atempo=1.65`. No new narrator audition or replacement take.

**Known limitation:** the take start times and lengths are measured, but individual words were
spaced approximately within each take, not forced-aligned. The caption track must not be described
as perfectly word-synchronised. Motivational title cards are intentionally not spoken captions.

## Review performed
- TypeScript: PASS.
- Repository mechanical contract: PASS (41 shots, 108 seconds, portrait 30 fps).
- First diagnostic render: 14 actual frames from GitHub Actions, reviewed as a contact sheet.
- Rejected problems: dark back-facing worker, duplicated worker in sponge insert, cropped title
  typography, standing car passengers, foreground actor blocking the mirror.
- Corrections: facial fill lights and staging, only one hero per shot, camera-safe 3D typography,
  seated passengers, reflection subjects behind the camera facing the reflective panel.
- Second diagnostic render: five frames reviewed; lit face/contact shot and mirror operation confirmed.
- Final refinements after second review: larger title lettering, three reflected actors grouped together,
  and response-card timing matched to the short spoken reply.

## Remaining weaknesses
The assets are procedural Minecraft models, not imported mod assets. The word timings are approximate.
Word-level captions remain approximate; I have not performed a real-time listening review.
Still-frame inspection does not establish subjective pacing or audible mix quality.


## Final export verification
- Full framework render: GitHub Actions run `44249688509` — success.
- Examined twelve frames extracted from the actual full MP4, not just the diagnostic still render.
- Found and corrected the sponge insert framing; re-rendered its exact 69 frames (600–668) with
  the same framework using Actions run `44251967207`, then spliced that excerpt into the master.
- Final assembly used FFmpeg only for the edit/encode; all replacement imagery comes from the 3D framework.
- Checked the corrected insert in the assembled file.
- Final file: `renders/the-guy-who-never-had-a-car.mp4`.
- Verified: 3,240 video frames, 30 fps, 1080×1920, 108 seconds, H.264 + AAC, 41,554,254 bytes.
- The final assembly copied the original audio stream; voice-20 and both 1.65× chants are unchanged.
- Removed the rejected slideshow MP4, temporary diagnostic frames and excerpt composition from the branch.
