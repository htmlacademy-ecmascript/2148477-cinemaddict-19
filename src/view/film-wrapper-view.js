import {createElement} from '../util/render.js';

function createFilmWrapperTemplate() {
  return '<section class="films"></section>';
}

export default class FilmWrapperView {
  getTemplate() {
    return createFilmWrapperTemplate();
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
