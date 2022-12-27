import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import { render } from '../util/render.js';

export default class FilmExtraPresenter {
  #page = document.querySelector('.page');

  #filmExtraListComponent = new FilmListView();
  #filmExtraHeaderComponent = new FilmListHeaderView();
  #filmExtraContainerComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmExtraHeader = '';
  #filmExtraCardCount = 0;
  #filmExtraSortCB = null;

  #filmCards = [];
  #filmExtraCards = [];

  constructor({container, filmsModel, commentsModel, filmExtraCardCount, filmExtraHeader, filmExtraSortCB}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmExtraCardCount = filmExtraCardCount;
    this.#filmExtraHeader = filmExtraHeader;
    this.#filmExtraSortCB = filmExtraSortCB;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#renderFilmExtra();
  }

  #renderFilmCard(filmCard, commentsModel) {
    const filmCardComponent = new FilmCardView({filmCard});
    const popupPresenter = new PopupPresenter({
      container: this.#page,
      filmCard,
      commentsModel
    });

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      popupPresenter.init();
    });

    render(filmCardComponent, this.#filmExtraContainerComponent.element);
  }

  #renderFilmExtra() {
    if (this.#filmCards.length > 0) {
      this.#filmExtraCards = this.#filmCards.sort(this.#filmExtraSortCB);

      this.#filmExtraListComponent.element.classList.add('films-list--extra');
      render(this.#filmExtraListComponent, this.#container.element);

      this.#filmExtraHeaderComponent.element.innerHTML = this.#filmExtraHeader;
      this.#filmExtraHeaderComponent.element.classList.remove('visually-hidden');
      render(this.#filmExtraHeaderComponent, this.#filmExtraListComponent.element);

      render(this.#filmExtraContainerComponent, this.#filmExtraListComponent.element);
      for (let i = 0; i < Math.min(this.#filmExtraCards.length, this.#filmExtraCardCount); i++) {
        this.#renderFilmCard(this.#filmExtraCards[i], this.#commentsModel);
      }
    }
  }
}
