import Observable from '../framework/observable.js';
import { getRandomFilmData } from '../mock/films-data.js';

const FILMS_COUNT = 36;

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = Array.from({length: FILMS_COUNT}, getRandomFilmData);

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then((tasks) => {
      console.log(tasks);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get films() {
    return this.#films;
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
