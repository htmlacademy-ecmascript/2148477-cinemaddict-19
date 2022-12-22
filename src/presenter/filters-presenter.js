import FilterBarView from '../view/filter-bar-view';import { render } from '../util/render.js';

export default class FilterBarPresenter {
  #container = null;
  #filmsModel = null;

  #filmCards = [];

  #watchlist = 0;
  #alreadyWatched = 0;
  #favorite = 0;


  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#watchlist = this.#filmCards.filter( (film) => film.userDetails.watchlist).length;
    this.#alreadyWatched = this.#filmCards.filter( (film) => film.userDetails.alreadyWatched).length;
    this.#favorite = this.#filmCards.filter( (film) => film.userDetails.favorite).length;

    render(new FilterBarView({watchlist: this.#watchlist, alreadyWatched: this.#alreadyWatched, favorite: this.#favorite}), this.#container);
  }
}
