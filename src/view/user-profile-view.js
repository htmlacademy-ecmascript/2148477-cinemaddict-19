import {createElement} from '../util/render.js';

function createUserProfileTemplate(alreadyWatched) {
  const WATCHED_FILMS_TO_BE_FAN = 11;
  const WATCHED_FILMS_TO_BE_MOVIE_BUFF = 21;

  let profileRating = '';
  if (alreadyWatched < WATCHED_FILMS_TO_BE_FAN) {
    profileRating = 'novice';
  }
  if (alreadyWatched >= WATCHED_FILMS_TO_BE_FAN) {
    profileRating = 'fan';
  }
  if (alreadyWatched >= WATCHED_FILMS_TO_BE_MOVIE_BUFF) {
    profileRating = 'movie buff';
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar"
          src="images/bitmap@2x.png"
          alt="Avatar"
          width="35"
          height="35">
    </section>`
  );
}

export default class UserProfileView {
  #element = null;
  #alreadyWatched = null;

  constructor({alreadyWatched}) {
    this.#alreadyWatched = alreadyWatched;
  }

  get template() {
    if (this.#alreadyWatched === 0) {
      return '';
    }

    return createUserProfileTemplate(this.#alreadyWatched);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
