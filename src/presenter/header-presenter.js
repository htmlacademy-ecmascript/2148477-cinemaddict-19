import UserProfileView from '../view/user-profile-view';
import { render } from '../util/render.js';

export default class HeaderPresenter {
  #container = null;
  #filmsModel = null;

  #filmCards = [];

  #alreadyWatched = 0;

  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#alreadyWatched = this.#filmCards.filter( (film) => film.userDetails.alreadyWatched).length;

    render(new UserProfileView({alreadyWatched: this.#alreadyWatched}), this.#container);
  }
}
