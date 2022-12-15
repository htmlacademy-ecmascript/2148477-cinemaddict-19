import {createElement} from '../util/render.js';

function createPopupFilmDetailsCommentTemplate() {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
      </span>
      <div>
        <p class="film-details__comment-text">Almost two hours? Seriously?</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">John Doe</span>
          <span class="film-details__comment-day">Today</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
}

export default class PopupFilmDetailsCommentView {
  getTemplate() {
    return createPopupFilmDetailsCommentTemplate();
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
