import FooterStatisticView from '../view/footer-statistic-view.js';
import { render } from '../framework/render.js';

export default class FooterStatisticPresenter {
  #container = null;
  #filmCardsCount = 0;

  constructor({container}) {
    this.#container = container;
  }

  init(filmsModel) {
    this.#filmCardsCount = filmsModel.films.length;

    render(new FooterStatisticView({filmsCount: this.#filmCardsCount}), this.#container);
  }
}
