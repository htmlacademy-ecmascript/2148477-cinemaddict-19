import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';

import FilmCardPresenter from './film-card-presenter.js';

import { render } from '../framework/render.js';

export default class FilmExtraPresenter {
  #page = document.querySelector('.page');

  #filmExtraListComponent = new FilmListView();
  #filmExtraHeaderComponent = new FilmListHeaderView();
  #filmExtraContainerComponent = new FilmContainerView();

  #container = null;
  #commentsModel = null;

  #filmExtraHeader = '';
  #filmExtraCardCount = 0;
  #filmExtraSortCB = null;

  #filmCards = [];
  #filmExtraCards = [];

  #filmCardPresenterList = null;

  #handleFilmCardChange = null;

  constructor({container, commentsModel, filmExtraCardCount, filmExtraHeader, filmExtraSortCB, filmCardPresenterList, onFilmCardChange}) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#filmExtraCardCount = filmExtraCardCount;
    this.#filmExtraHeader = filmExtraHeader;
    this.#filmExtraSortCB = filmExtraSortCB;
    this.#filmCardPresenterList = filmCardPresenterList;
    this.#handleFilmCardChange = onFilmCardChange;
  }

  init({filmCards}) {
    this.#filmCards = filmCards;

    this.#renderFilmExtra();
  }

  #handleModeChange = () => {
    this.#filmCardPresenterList.forEach(
      (presentersArr) => presentersArr.forEach(
        (presenter) => presenter.resetView()
      )
    );
  };

  #renderFilmCard(filmCard, commentsModel) {
    const filmCardPresenter = new FilmCardPresenter({
      commentsModel,
      onFilmCardChange: this.#handleFilmCardChange,
      popupContainer: this.#page,
      filmCardContainer: this.#filmExtraContainerComponent.element,
      onModeChange: this.#handleModeChange,
    });

    filmCardPresenter.init({
      filmCard,
    });

    if ( this.#filmCardPresenterList.has(filmCard.id) ) {
      const updatedSameCardPresenters = this.#filmCardPresenterList.get(filmCard.id);
      updatedSameCardPresenters.push(filmCardPresenter);
      this.#filmCardPresenterList.set(
        filmCard.id,
        updatedSameCardPresenters,
      );
      return;
    }

    const sameCardPresenters = [];
    sameCardPresenters.push(filmCardPresenter);
    this.#filmCardPresenterList.set(filmCard.id, sameCardPresenters);

  }

  #renderFilmCards(from, to) {
    this.#filmCards
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));
  }

  #renderFilmContainer() {
    this.#filmExtraListComponent.element.classList.add('films-list--extra');
    render(this.#filmExtraListComponent, this.#container.element);

    this.#filmExtraHeaderComponent.element.innerHTML = this.#filmExtraHeader;
    this.#filmExtraHeaderComponent.element.classList.remove('visually-hidden');
    render(this.#filmExtraHeaderComponent, this.#filmExtraListComponent.element);

    render(this.#filmExtraContainerComponent, this.#filmExtraListComponent.element);
  }

  #renderFilmList() {
    this.#renderFilmCards(0, Math.min(this.#filmExtraCards.length, this.#filmExtraCardCount));
  }

  #renderFilmExtra() {
    if (!this.#container.element.contains(this.#filmExtraListComponent.element)) {
      this.#renderFilmContainer();
    }

    if (this.#filmCards.length > 0) {
      this.#filmExtraCards = this.#filmCards.sort(this.#filmExtraSortCB);

      this.#renderFilmList();
    }
  }
}
