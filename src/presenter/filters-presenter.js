import FilterBarView from '../view/filter-bar-view';import { render } from '../util/render.js';

export default class FilterBarPresenter {
  constructor({container, filmsModel}) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmCards = [...this.filmsModel.getFilms()];

    this.watchlist = this.filmCards.reduce(
      (sum, film) => sum + (film.userDetails.watchlist ? 1 : 0),
      0
    );
    this.alreadyWatched = this.filmCards.reduce(
      (sum, film) => sum + (film.userDetails.alreadyWatched ? 1 : 0),
      0
    );
    this.favorite = this.filmCards.reduce(
      (sum, film) => sum + (film.userDetails.favorite ? 1 : 0),
      0
    );

    render(new FilterBarView({watchlist: this.watchlist, alreadyWatched: this.alreadyWatched, favorite: this.favorite}), this.container);
  }
}
