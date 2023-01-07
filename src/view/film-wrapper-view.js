import AbstractView from '../framework/view/abstract-view.js';

function createFilmWrapperTemplate() {
  return '<section class="films"></section>';
}

export default class FilmWrapperView extends AbstractView {
  get template() {
    return createFilmWrapperTemplate();
  }
}
