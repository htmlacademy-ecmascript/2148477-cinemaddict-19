import FilterBarView from '../view/filter-bar-view';
import { render } from '../framework/render.js';
import { getFilterNameCount } from '../mock/filters-data';

export default class FilterBarPresenter {
  #container = null;
  #filmsModel = null;

  #filterNameCount = [];

  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#filterNameCount = getFilterNameCount(this.#filmsModel.films);

    render(new FilterBarView({filters: this.#filterNameCount}), this.#container);
  }
}
