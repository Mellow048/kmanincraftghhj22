import {film as carReel} from "./videos/the-guy-who-never-had-a-car/film";
import { Composition, Sequence } from "remotion";
import { FILMS } from "./registry";
import { SCENERY } from "./scenery";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="car-reel-sponge-review" component={()=><Sequence from={-600}><carReel.Component/></Sequence>} durationInFrames={69} fps={30} width={1080} height={1920}/>
    {[...FILMS, ...SCENERY].map((film) => (
      <Composition
        key={film.id}
        id={film.id}
        component={film.Component}
        durationInFrames={film.durationInFrames}
        fps={film.fps}
        width={film.width}
        height={film.height}
      />
    ))}
  </>
);
