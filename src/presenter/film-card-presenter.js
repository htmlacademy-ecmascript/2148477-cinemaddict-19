import PopupPresenter from './popup-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../framework/render.js';

export default class FilmCardPresenter {
  #filmContainer = null;
  #popupContainer = null;

  #filmCardComponent = null;
  #popupPresenter = null;
  #commentsModel = null;

  #filmCard = null;

  constructor({filmContainer}) {
    this.#filmContainer = filmContainer;
  }

  init(popupContainer, filmCard, commentsModel) {
    this.#filmCard = filmCard;
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;

    this.#popupPresenter = new PopupPresenter({
      container: this.#popupContainer,
      filmCard: this.#filmCard,
      commentsModel: this.#commentsModel,
    });

    this.#filmCardComponent = new FilmCardView({
      filmCard,
      onClick: () => {
        this.#popupPresenter.init();
      }
    });

    render(this.#filmCardComponent, this.#filmContainer);
  }
}
