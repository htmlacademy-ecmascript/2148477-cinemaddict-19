import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../util/const';

function createFilterBarTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>`
  );
}

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, name, count} = filter;

  return (
    `<a
      href="#${name.toLowerCase()}"
      class="main-navigation__item${type === currentFilterType ? ' main-navigation__item--active' : ''}"
      data-filter="${type}"
    >
      ${type === FilterType.ALL ? name : `${name} <span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
}

export default class FilterBarView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterBarTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filter);
  };
}
