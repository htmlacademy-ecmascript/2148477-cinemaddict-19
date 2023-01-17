import FilterBarView from '../view/filter-bar-view';
import { remove, render, RenderPosition } from '../framework/render.js';
import { getFilterNameCount } from '../mock/filters-data';

export default class FilterBarPresenter {
  #container = null;
  #filmsModel = null;

  #filterBarComponent = null;

  #filterNameCount = [];

  constructor({container}) {
    this.#container = container;
  }

  init({filmsModel}) {
    this.#filmsModel = filmsModel;
    this.#filterNameCount = getFilterNameCount(this.#filmsModel.films);

    this.#filterBarComponent = new FilterBarView({filters: this.#filterNameCount});

    render(this.#filterBarComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  removeFilterBar = () => {
    remove(this.#filterBarComponent);
  };
}
