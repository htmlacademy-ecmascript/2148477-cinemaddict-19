import UserProfileView from '../view/user-profile-view';
import { render } from '../framework/render.js';

export default class HeaderPresenter {
  #container = null;
  #filmsModel = null;

  #filmCards = [];

  #alreadyWatched = 0;

  constructor({container, filmCards}) {
    this.#container = container;
    this.#filmCards = filmCards;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#alreadyWatched = this.#filmCards.filter( (film) => film.userDetails.alreadyWatched).length;
    if (this.#alreadyWatched > 0) {
      render(new UserProfileView({alreadyWatched: this.#alreadyWatched}), this.#container);
    }
  }
}
