import Observable from '../framework/observable.js';
import { getRandomFilmData } from '../mock/films-data.js';

const FILMS_COUNT = 36;

export default class FilmsModel extends Observable {
  #films = Array.from({length: FILMS_COUNT}, getRandomFilmData);

  get films() {
    return this.#films;
  }
}
