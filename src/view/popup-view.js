import { createElement } from '../util/render.js';

function createPopupViewTemplate() {
  return `<section class="film-details">
            <div class="film-details__inner">
            </div>
          </section>`;
}

export default class PopupView {
  #element = null;

  get template() {
    return createPopupViewTemplate();
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
