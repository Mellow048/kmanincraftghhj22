import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * In This Town, Everyone Runs Away From Me
 *
 * A town of creepers and one cat. His creeper mum and dad found him in a box and love him from the other side of
 * the room, because a creeper cannot help running from a cat. He wants one hug. He tries a costume, walking
 * backwards and sitting still. Then six players come at night for gunpowder, the town backs into the square and
 * starts to hiss, and when one creeper blows up they all do. So he does the one thing he is very good at: he
 * walks up behind his whole town and says hello. They run straight through the players, and nobody blows up,
 * because you cannot hiss and run at the same time. In the morning his mum leans on him for one whole second.
 *
 * Built on the Monster Village recipe (Topics/InThisTown/reference/monster-village/README.md): famous mobs in
 * frame one, "the only one" in line one, players as the danger, and true Minecraft facts as the jokes. A whole
 * story in one film: no cliffhanger, no part two. An "In This Town" film: the recorded narration is the clock.
 */
export const film = defineFilm({
  id: "in-this-town-everyone-runs-away-from-me",
  title: "In This Town, Everyone Runs Away From Me",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-everyone-runs-away-from-me/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
