import AbstractView from '../framework/view/abstract-view.js';

function createFilmListHeaderTemplate() {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
}

export default class FilmListHeaderView extends AbstractView {
  get template() {
    return createFilmListHeaderTemplate();
  }
}
