import Observable from '../framework/observable.js';
import { UpdateType } from '../util/const.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];
  #data = null;

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  async init(updateType = UpdateType.INIT) {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(updateType, this.#data);
  }

  async updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  handleCommentsModelChange = (updateType, data) => {
    if (updateType !== UpdateType.INIT) {
      this.#data = data.filmInfo ? data : this.#adaptToClient(data);
      this.init(updateType);
    }
  };

  #adaptToClient(film) {
    const filmInfoProp = film['film_info'];
    const releaseProp = filmInfoProp['release'];
    const userDetailsProp = film['user_details'];

    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...filmInfoProp,
        alternativeTitle: filmInfoProp['alternative_title'],
        totalRating: filmInfoProp['total_rating'],
        ageRating: filmInfoProp['age_rating'],
        release: {
          date: releaseProp['date'] !== null ? new Date(releaseProp['date']) : null,
          releaseCountry: releaseProp['release_country'],
        },
      },
      userDetails: {
        ...userDetailsProp,
        alreadyWatched: userDetailsProp['already_watched'],
        watchingDate: userDetailsProp['watching_date'] !== null ? new Date(userDetailsProp['watching_date']) : null,
      },
    };

    // Ненужные ключи мы удаляем
    delete adaptedFilm['film_info'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo.release['release_country'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];

    return adaptedFilm;
  }
}
