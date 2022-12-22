import {createElement} from '../util/render.js';

function createFilmWrapperTemplate() {
  return '<section class="films"></section>';
}

export default class FilmWrapperView {
  #element = null;

  get template() {
    return createFilmWrapperTemplate();
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
