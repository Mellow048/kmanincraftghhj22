import { defineFilm } from "../../engine";
import { timing, BLACK_AT } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { scene7 } from "./scene7";
import { scene8 } from "./scene8";
import { scene9 } from "./scene9";
import { scene10 } from "./scene10";
import { scene11 } from "./scene11";
import { scene12 } from "./scene12";
import { scene13 } from "./scene13";
import { scene14 } from "./scene14";
import { scene15 } from "./scene15";
import { scene16 } from "./scene16";
import { scene17 } from "./scene17";
import { scene18 } from "./scene18";

/** Owner-approved full film: same teenage hero, a secret five-second power, and a prince recognition.
 * The narration is exact Draft 2 plus the separately approved trip revision.
 * Default full-film limits, NOT cut:"short". This ending has its own scoped owner exception.
 */
export const film=defineFilm({
 id:"in-this-town-five-seconds",
 title:"In This Town, I Was the Only One Who Could Stop Time for Five Seconds",
 topic:"in-this-town",
 fps:30,width:1080,height:1920,
 look:"overworld-day",
 audio:{src:"audio/in-this-town-five-seconds/mix.mp3"},
 captions:{words:timing.words,y:.72},
 cutToBlackAt:BLACK_AT,
 World,
 scenes:[scene1,scene2,scene3,scene4,scene5,scene6,scene7,scene8,scene9,scene10,scene11,scene12,scene13,scene14,scene15,scene16,scene17,scene18],
});
