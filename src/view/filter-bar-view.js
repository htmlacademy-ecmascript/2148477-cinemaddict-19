import AbstractView from '../framework/view/abstract-view';

function createFilterBarTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>`
  );
}

function createFilterItemTemplate(filter, isChecked) {
  const {name, count} = filter;

  return (
    `<a
      href="#${name.toLowerCase()}"
      class="main-navigation__item${isChecked ? '' : ' main-navigation__item--active'}"
    >
      ${name === 'All' ? `${name} movies` : `${name} <span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
}

export default class FilterBarView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterBarTemplate(this.#filters);
  }
}
