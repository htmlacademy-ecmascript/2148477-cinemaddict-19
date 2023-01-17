import UserProfileView from '../view/user-profile-view';
import { remove, render } from '../framework/render.js';

export default class HeaderPresenter {
  #container = null;
  #filmsModel = null;

  #userProfileComponent = null;

  #alreadyWatched = 0;

  constructor() {
    this.#container = document.querySelector('.header');
  }

  init({filmsModel}) {
    this.#filmsModel = filmsModel;

    if (this.#userProfileComponent !== null) {
      remove(this.#userProfileComponent);
    }

    this.#alreadyWatched = [...this.#filmsModel.films].filter( (film) => film.userDetails.alreadyWatched).length;
    this.#userProfileComponent = new UserProfileView({alreadyWatched: this.#alreadyWatched});

    if (this.#alreadyWatched > 0) {
      render(this.#userProfileComponent, this.#container);
    }
  }
}
