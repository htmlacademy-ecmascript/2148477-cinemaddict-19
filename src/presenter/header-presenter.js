import UserProfileView from '../view/user-profile-view';
import { remove, render } from '../framework/render.js';

export default class HeaderPresenter {
  #container = null;
  #films = null;

  #userProfileComponent = null;

  #alreadyWatchedCount = 0;

  constructor() {
    this.#container = document.querySelector('.header');
  }

  init({filmsModel}) {
    this.#films = filmsModel.films;

    if (this.#userProfileComponent !== null) {
      remove(this.#userProfileComponent);
    }

    this.#alreadyWatchedCount = this.#films.filter( (film) => film.userDetails.alreadyWatched).length;

    if (this.#alreadyWatchedCount > 0) {
      this.#userProfileComponent = new UserProfileView({alreadyWatched: this.#alreadyWatchedCount});
      render(this.#userProfileComponent, this.#container);
    }
  }
}
