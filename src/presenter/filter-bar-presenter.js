import FilterBarView from '../view/filter-bar-view';
import { remove, render, replace, RenderPosition } from '../framework/render.js';
import { FilterType, UpdateType } from '../util/const.js';
import { filter } from '../util/film-card-filter.js';

export default class FilterBarPresenter {
  #container = null;
  #filmsModel = null;
  #filterModel = null;

  #filterBarComponent = null;

  constructor({container, filmsModel, filterModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterBarComponent;

    this.#filterBarComponent = new FilterBarView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterBarComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#filterBarComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
