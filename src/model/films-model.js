import { getRandomFilmData } from '../mock/films-data.js';

const FILMS_COUNT = 5;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, getRandomFilmData);

  get films() {
    return this.#films;
  }
}
