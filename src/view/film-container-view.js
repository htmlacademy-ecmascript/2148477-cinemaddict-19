import {createElement} from '../util/render.js';

function createFilmContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmContainerView {
  #element = null;

  get template() {
    return createFilmContainerTemplate();
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
