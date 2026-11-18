import {defineFilm} from '../../engine';
import type {CaptionWord} from '../../engine';
import {World} from './world';
import {scene1} from './scene1';
import timing from './timing.json';
export const film = defineFilm({
  id: 'the-guy-who-never-had-a-car',
  title: 'The Guy Who Never Had a Car',
  topic: 'reel',
  look: 'overworld-night',
  audio: {src:'audio/the-guy-who-never-had-a-car/mix.mp3'},
  captions: {words:timing.words as CaptionWord[],y:.77,size:.9},
  World,
  scenes: [scene1],
});
