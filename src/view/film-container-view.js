import AbstractView from '../framework/view/abstract-view.js';

function createFilmContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmContainerView extends AbstractView {
  get template() {
    return createFilmContainerTemplate();
  }
}
