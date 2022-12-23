import {createElement} from '../util/render.js';

function createPopupCommentContainerTemplate() {
  return (
    `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      </section>
    </div>`
  );
}

export default class PopupCommentContainerView {
  #element = null;

  get template() {
    return createPopupCommentContainerTemplate();
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
