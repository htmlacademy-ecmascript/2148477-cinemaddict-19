import SortBarView from '../view/sort-bar-view.js';
import NoFilmCardsView from '../view/no-film-cards-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilmCardPresenter from './film-card-presenter.js';

import { remove, render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../util/common.js';

const FILM_CARDS_COUNT_PER_STEP = 5;

export default class MainBoardPresenter {
  #page = document.querySelector('.page');

  #filmWrapperComponent = new FilmWrapperView();

  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;
  #sortBarComponent = new SortBarView();
  #noFilmCardsComponent = new NoFilmCardsView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCards = [];
  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  #filmCardPresenterList = new Map();

  constructor({container, filmsModel, commentsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  get filmWrapperComponent() {
    return this.#filmWrapperComponent;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#renderMainBoard();
  }

  #handleShowMoreButtonClick = () => {
    this.#renderFilmCards(this.#renderedFilmCardsCount, this.#renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP);

    this.#renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;

    if (this.#renderedFilmCardsCount >= this.#filmCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    this.#filmCards = updateItem(this.#filmCards, updatedFilmCard);
    this.#filmCardPresenterList.get(updatedFilmCard.newId).init(this.#page, updatedFilmCard, this.#commentsModel);
  };

  #renderSortBar() {
    render(this.#sortBarComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFilmCard(filmCard, commentsModel) {
    const filmCardPresenter = new FilmCardPresenter({
      filmContainer: this.#filmContainerComponent.element,
      onFilmCardChange: this.#handleFilmCardChange,
    });

    filmCardPresenter.init(this.#page, filmCard, commentsModel);
    this.#filmCardPresenterList.set(filmCard.newId, filmCardPresenter);
  }

  #renderFilmCards(from, to) {
    this.#filmCards
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));
  }

  #renderNoFilms() {
    render(this.#noFilmCardsComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
  }

  #renderFilmList() {
    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    this.#renderFilmCards(0, Math.min(this.#filmCards.length, FILM_CARDS_COUNT_PER_STEP));

    if (this.#filmCards.length > FILM_CARDS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #clearFilmList() {
    this.#filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterList.clear();
    this.#renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderMainBoard() {
    render(this.#filmWrapperComponent, this.#container);
    render(this.#filmListComponent, this.#filmWrapperComponent.element);

    if (this.#filmCards.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSortBar();
    this.#renderFilmList();
  }
}
