import AbstractView from '../framework/view/abstract-view';

function createUserProfileTemplate(alreadyWatched) {
  const WATCHED_FILMS_TO_BE_FAN = 11;
  const WATCHED_FILMS_TO_BE_MOVIE_BUFF = 21;

  let profileRating = '';
  if (alreadyWatched < WATCHED_FILMS_TO_BE_FAN) {
    profileRating = 'Novice';
  }
  if (alreadyWatched >= WATCHED_FILMS_TO_BE_FAN) {
    profileRating = 'Fan';
  }
  if (alreadyWatched >= WATCHED_FILMS_TO_BE_MOVIE_BUFF) {
    profileRating = 'Movie Buff';
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

export default class UserProfileView extends AbstractView {
  #alreadyWatched = null;

  constructor({alreadyWatched}) {
    super();
    this.#alreadyWatched = alreadyWatched;
  }

  get template() {
    return createUserProfileTemplate(this.#alreadyWatched);
  }
}
