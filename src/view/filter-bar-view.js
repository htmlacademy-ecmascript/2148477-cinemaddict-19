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
  constructor({watchlist, alreadyWatched, favorite}) {
    this.watchlist = watchlist;
    this.alreadyWatched = alreadyWatched;
    this.favorite = favorite;
  }

  getTemplate() {
    return createFilterBarTemplate(this.watchlist, this.alreadyWatched, this.favorite);
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
