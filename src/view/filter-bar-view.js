import {createElement} from '../util/render.js';

function createFilterBarTemplate(watchlist, alreadyWatched, favorite) {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </nav>`
  );
}

export default class FilterBarView {
  #element = null;
  #watchlist = null;
  #alreadyWatched = null;
  #favorite = null;


  constructor({watchlist, alreadyWatched, favorite}) {
    this.#watchlist = watchlist;
    this.#alreadyWatched = alreadyWatched;
    this.#favorite = favorite;
  }

  get template() {
    return createFilterBarTemplate(this.#watchlist, this.#alreadyWatched, this.#favorite);
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
