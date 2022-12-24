import {createElement} from '../util/render.js';

function createNoFilmCardsTemplate() {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
  );
}

export default class NoFilmCardsView {
  #element = null;

  get template() {
    return createNoFilmCardsTemplate();
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
