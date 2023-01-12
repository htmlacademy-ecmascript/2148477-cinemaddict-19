import AbstractView from '../framework/view/abstract-view.js';

function createFooterStatisticTemplate(filmsCount) {
  return `<p>${filmsCount} movies inside</p>`;
}

export default class FooterStatisticView extends AbstractView {
  #filmsCount = 0;

  constructor({filmsCount}) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createFooterStatisticTemplate(this.#filmsCount);
  }
}
