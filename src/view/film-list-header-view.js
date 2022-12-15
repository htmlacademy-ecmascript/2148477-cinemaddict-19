import {createElement} from '../util/render.js';

function createFilmListHeaderTemplate() {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
}

export default class FilmListHeaderView {
  getTemplate() {
    return createFilmListHeaderTemplate();
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
