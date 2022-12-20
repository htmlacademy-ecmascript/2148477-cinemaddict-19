import FilterBarView from '../view/filter-bar-view';import { render } from '../util/render.js';

export default class FilterBarPresenter {
  constructor({container, filmsModel}) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmCards = [...this.filmsModel.getFilms()];

    this.watchlist = this.filmCards.filter( (film) => film.userDetails.watchlist).length;
    this.alreadyWatched = this.filmCards.filter( (film) => film.userDetails.alreadyWatched).length;
    this.favorite = this.filmCards.filter( (film) => film.userDetails.favorite).length;

    render(new FilterBarView({watchlist: this.watchlist, alreadyWatched: this.alreadyWatched, favorite: this.favorite}), this.container);
  }
}
