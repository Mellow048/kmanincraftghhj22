import { Composition } from "remotion";
import { FILMS } from "./registry";
import { SCENERY } from "./scenery";

export const RemotionRoot: React.FC = () => (
  <>
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
