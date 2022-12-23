import {createElement} from '../util/render.js';

function createPopupCommentHeaderTemplate(filmCard) {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>`;
}

export default class PopupCommentHeaderView {
  #element = null;
  #filmCard = null;

  constructor({filmCard}) {
    this.#filmCard = filmCard;
  }

  get template() {
    return createPopupCommentHeaderTemplate(this.#filmCard);
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
