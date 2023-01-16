import AbstractView from '../framework/view/abstract-view.js';

function createNoFilmCardsTemplate() {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
}

export default class NoFilmCardsView extends AbstractView {
  get template() {
    return createNoFilmCardsTemplate();
  }
}
