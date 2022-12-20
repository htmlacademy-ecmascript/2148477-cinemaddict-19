import { createElement } from '../util/render.js';

function createPopupViewTemplate() {
  return `<section class="film-details">
            <div class="film-details__inner">
            </div>
          </section>`;
}

export default class PopupView {
  getTemplate() {
    return createPopupViewTemplate();
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
