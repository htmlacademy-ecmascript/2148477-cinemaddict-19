import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';

import FilmCardPresenter from './film-card-presenter.js';

import { render } from '../framework/render.js';
import { updateItem } from '../util/common.js';

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

  #filmCardPresenterList = null;

  constructor({container, filmsModel, commentsModel, filmExtraCardCount, filmExtraHeader, filmExtraSortCB, filmCardPresenterList}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmExtraCardCount = filmExtraCardCount;
    this.#filmExtraHeader = filmExtraHeader;
    this.#filmExtraSortCB = filmExtraSortCB;
    this.#filmCardPresenterList = filmCardPresenterList;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#renderFilmExtra();
  }

  #handleFilmCardChange = (updatedFilmCard) => {
    updateItem(this.#filmCards, updatedFilmCard);
    this.#filmCardPresenterList.get(updatedFilmCard.newId).forEach(
      (presenter) => presenter.init({
        popupContainer: this.#page,
        filmCard: updatedFilmCard,
        commentsModel: this.#commentsModel
      })
    );
  };


  #renderFilmCard(filmCard, commentsModel) {
    const filmCardPresenter = new FilmCardPresenter({
      onFilmCardChange: this.#handleFilmCardChange,
      filmCardContainer: this.#filmExtraContainerComponent.element,
    });

    filmCardPresenter.init({
      popupContainer: this.#page,
      filmCard,
      commentsModel,
    });

    if ( this.#filmCardPresenterList.has(filmCard.newId) ) {
      const sameCardPresentersArrToUpdate = this.#filmCardPresenterList.get(filmCard.newId);
      sameCardPresentersArrToUpdate.push(filmCardPresenter);
      this.#filmCardPresenterList.set(
        filmCard.newId,
        sameCardPresentersArrToUpdate,
      );
      return;
    }

    const sameCardPresentersArr = [];
    sameCardPresentersArr.push(filmCardPresenter);
    this.#filmCardPresenterList.set(filmCard.newId, sameCardPresentersArr);

  }

  #renderFilmCards(from, to) {
    this.#filmCards
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));
  }

  #renderFilmList() {
    this.#filmExtraListComponent.element.classList.add('films-list--extra');
    render(this.#filmExtraListComponent, this.#container.element);

    this.#filmExtraHeaderComponent.element.innerHTML = this.#filmExtraHeader;
    this.#filmExtraHeaderComponent.element.classList.remove('visually-hidden');
    render(this.#filmExtraHeaderComponent, this.#filmExtraListComponent.element);

    render(this.#filmExtraContainerComponent, this.#filmExtraListComponent.element);
    this.#renderFilmCards(0, Math.min(this.#filmExtraCards.length, this.#filmExtraCardCount));
  }

  #clearFilmList() {
    this.#filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterList.clear();
  }


  #renderFilmExtra() {
    if (this.#filmCards.length > 0) {
      this.#filmExtraCards = this.#filmCards.sort(this.#filmExtraSortCB);

      this.#renderFilmList();
    }
  }
}
