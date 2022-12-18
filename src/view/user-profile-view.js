import {createElement} from '../util/render.js';

function createUserProfileTemplate(alreadyWatched) {
  if (alreadyWatched === 0) {
    return '';
  } else {
    let profileRating = 'novice';
    if (alreadyWatched >= 11 && alreadyWatched <= 20) {
      profileRating = 'fan';
    } else if (alreadyWatched >= 21) {
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
}

export default class UserProfileView {
  constructor({alreadyWatched}) {
    this.alreadyWatched = alreadyWatched;
  }

  getTemplate() {
    return createUserProfileTemplate(this.alreadyWatched);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
