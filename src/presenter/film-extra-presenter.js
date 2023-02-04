import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';

import FilmCardPresenter from './film-card-presenter.js';

import { render, remove } from '../framework/render.js';
import { Mode } from '../util/const.js';

export default class FilmExtraPresenter {
  #filmExtraListComponent = new FilmListView();
  #filmExtraHeaderComponent = new FilmListHeaderView();
  #filmExtraContainerComponent = new FilmContainerView();

  #container = null;

  #filmExtraHeader = '';
  #filmExtraCardCount = 0;
  #filmExtraSortCB = null;

  #filmCards = [];
  #filmExtraCards = [];

  #filmCardPresenterList = null;
  #popupPresenter = null;
  #filmsModel = null;

  #handleFilmCardChange = null;

  constructor({container, filmExtraCardCount, filmExtraHeader, filmExtraSortCB, filmCardPresenterList, onFilmCardChange, popupPresenter, mode, filmsModel}) {
    this.#container = container;
    this.#filmExtraCardCount = filmExtraCardCount;
    this.#filmExtraHeader = filmExtraHeader;
    this.#filmExtraSortCB = filmExtraSortCB;
    this.#filmCardPresenterList = filmCardPresenterList;
    this.#handleFilmCardChange = onFilmCardChange;
    this.#popupPresenter = popupPresenter;
    this.mode = mode;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init({filmCards}) {
    this.#filmCards = filmCards;

    this.#renderFilmExtra();
  }

  #handleModelEvent = () => {
    remove(this.#filmExtraListComponent);
    remove(this.#filmExtraContainerComponent);
    this.#filmExtraListComponent = new FilmListView();
    this.#filmExtraContainerComponent = new FilmContainerView();
    this.init({filmCards: this.#filmsModel.films});
  };

  #handleModeChange = (filmCard) => {
    this.#popupPresenter.removePopup();
    this.#popupPresenter.init(filmCard);
    this.mode(Mode.POPUP);
  };

  #renderFilmCard(filmCard) {
    const filmCardPresenter = new FilmCardPresenter({
      onFilmCardChange: this.#handleFilmCardChange,
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
    this.#filmExtraCards
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard));
  }

  #renderFilmList() {
    this.#renderFilmCards(0, Math.min(this.#filmExtraCards.length, this.#filmExtraCardCount));
  }

  #renderFilmContainer() {
    this.#filmExtraListComponent.element.classList.add('films-list--extra');
    render(this.#filmExtraListComponent, this.#container.element);

    this.#filmExtraHeaderComponent.element.innerHTML = this.#filmExtraHeader;
    this.#filmExtraHeaderComponent.element.classList.remove('visually-hidden');
    render(this.#filmExtraHeaderComponent, this.#filmExtraListComponent.element);

    render(this.#filmExtraContainerComponent, this.#filmExtraListComponent.element);
  }

  #renderFilmExtra() {
    if (!this.#container.element.contains(this.#filmExtraListComponent.element)) {
      this.#renderFilmContainer();
    }

    if (this.#filmCards.length > 0) {
      this.#filmExtraCards = [...this.#filmCards].sort(this.#filmExtraSortCB);

      this.#renderFilmList();
    }
  }
}
