import AbstractView from '../framework/view/abstract-view.js';

function createNoFilmCardsTemplate() {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
  );
}

export default class NoFilmCardsView extends AbstractView {
  get template() {
    return createNoFilmCardsTemplate();
  }
}
