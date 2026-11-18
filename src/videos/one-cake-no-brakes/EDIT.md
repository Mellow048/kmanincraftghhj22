# One Cake, No Brakes

Finn treats delivering Slime’s birthday cake like a serious job. The shortcut is a minecart that won’t stop. He gets the cake to the table; his friends tip him on the way past.

**20-second standalone comedy**, approved pitch. No backstory, training montage, or outro. Transfer the opening principle from Monster Village Part 1’s f4–73 (a held frame grows from the boy to a crowd): let the cake slip within the first moving composition, then let the view open to the track. Transfer the planted payoff, not its plot: the party has an empty stand and a Skeleton with one emerald before Finn gets there.

| Opening tried on the board | Picture, line, and question |
| --- | --- |
| **Wobbling cake — selected** | Low three-quarter moving view, cake sliding toward the cart’s edge while Finn says “One cake. Easy.” Does he catch it? The joke and the threat share the first frame. |
| Over the rail | Look down on a sharp turn and a white cake almost as big as the cart. “One cake. Easy.” The route is clear, but the face and the hand contact would be small. |
| At the party | Empty cake stand, tiny cart on the hill. “One cake. Easy.” Will he make it? This makes the audience wait to see the problem. |

| Time / frames (end exclusive) | Action and camera | Spoken / sound |
| --- | --- | --- |
| 0–4.00 / 0–120 | Bakery slope. Already in the cart, Finn catches the rim of the tray as the cart swings round the first bend. Start with the cake moving toward the lens; pull along the rail to show wheels and slip. | Finn: “One cake. Easy.” Rail rumble, one HUS on the grip. |
| 4.00–7.50 / 120–225 | Alongside the cart down the trestle. Wheels climb the hump, tray lifts and tips, Finn presses it level with both hands. Keep the wheels and the cake in the same image. | One HUS at the press; two axle sounds on the hump. |
| 7.50–12.50 / 225–375 | The camera rises and follows the rails past a birthday flag to the waiting stand. Slime is looking this way. The view explains why Finn can’t just hold on. | Steady wheel rhythm and quick plucked score. No new line. |
| 12.50–17.50 / 375–525 | Ease back to cart height from the party side. Finn shifts his feet, turns with the tray, and reaches over the rail. Let the stand and moving tray meet in the same shot. | One HUS at the third reach, ceramic/wood contact, score clears. |
| 17.50–19.20 / 525–576 | Cut down the same rails to see the part of the platform Finn will pass next. Skeleton holds out the emerald without hurrying. It falls into the moving cart and Finn rolls past. | Metal/emerald clink, short wheel tail. No victory line or bumper. |

The only speech is the same picked Finn voice as Dishwasher. Three HUS exhales from his existing take, not extra dialogue. Show the cake, his fingers at the tray rim and the coin in front of the cart wall, not just reactions. Keep Finn’s look held across his line; speech affects only the mouth. Skeleton and Slime do not speak.

**World:** one bakery loading deck, terraced track and birthday platform. Pack village cottages, lanterns and the two friends. Local steel minecart, tray/cake, track and party table. No changes to shared engine, other films or voices.

## Rebuild

`edit.json` is the frame/source-trim clock. `compose_audio.py` writes the stereo mix, actual word spans and mouth meter. Passing `--ffmpeg /path/to/ffmpeg` is optional when FFmpeg is on PATH. Run `npm run typecheck` and `npm run check`. Lock the opening, both saves, handoff and tip before the 1080p GitHub render (composition `one-cake-no-brakes`).
