import {createElement} from '../util/render.js';

function createPopupCommentHeaderTemplate(filmCard) {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>`;
}

export default class PopupCommentHeaderView {
  constructor({filmCard}) {
    this.filmCard = filmCard;
  }

  getTemplate() {
    return createPopupCommentHeaderTemplate(this.filmCard);
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
