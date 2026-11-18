import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { CUT, FRAMES, sec } from "./marks";
import words from "./captions.json";

// Do not let the shared caption hold carry a HUS, ey, or almost across a cut.
const clear = [CUT.proud,CUT.door,CUT.stack,CUT.street,CUT.offer,CUT.almost,CUT.mopKitchen,CUT.retry,CUT.jobWash,CUT.crowd,CUT.watchWash,CUT.impressed,CUT.counter]
  .map(f=>({w:"",s:sec(f),e:sec(f)}));

export const film = defineFilm({
  id: "dishwasher-training-arc",
  title: "Dishwasher Training Arc",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "warm-room",
  post: { exposure: 1.06, bloom: .93 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
  captions: { words: [...words,...clear].sort((a,b)=>a.s-b.s), y: .795, size: .94 },
  audio: { src: "audio/dishwasher-training-arc/mix.mp3" },
});

if (film.durationInFrames !== FRAMES) throw new Error("Dishwasher picture and mix clocks diverged");
