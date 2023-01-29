import SortBarView from '../view/sort-bar-view.js';
import NoFilmCardsView from '../view/no-film-cards-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilterBarPresenter from './filters-presenter.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmExtraPresenter from './film-extra-presenter.js';
import HeaderPresenter from './header-presenter.js';

import { remove, render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../util/common.js';
import { sortMainDate, sortMainRating, sortTopRated, sortMostCommented } from '../util/sort-film-cards.js';
import { SortType, FILM_EXTRA_CARD_COUNT, FILM_EXTRA_HEADER } from '../util/const.js';

const FILM_CARDS_COUNT_PER_STEP = 5;

export default class MainBoardPresenter {
  #page = document.querySelector('.page');

  #filmWrapperComponent = new FilmWrapperView();

  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;
  #sortBarComponent = null;
  #noFilmCardsComponent = new NoFilmCardsView();

  #filterBarPresenter = null;
  #topRatedPresenter = null;
  #mostCommentedPresenter = null;
  #headerPresenter = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCards = [];
  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  #filmCardPresenterList = new Map();
  #currentSortType = SortType.DEFAULT;
  #defaultFilmCards = [];

  constructor({container, filmsModel, commentsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#topRatedPresenter = new FilmExtraPresenter({
      container: this.#filmWrapperComponent,
      filmsModel: this.#filmsModel,
      commentsModel: this.#commentsModel,
      filmExtraCardCount: FILM_EXTRA_CARD_COUNT.topRated,
      filmExtraHeader: FILM_EXTRA_HEADER.topRated,
      filmExtraSortCB: sortTopRated,
      filmCardPresenterList: this.#filmCardPresenterList,
    });
    this.#mostCommentedPresenter = new FilmExtraPresenter({
      container: this.#filmWrapperComponent,
      filmsModel: this.#filmsModel,
      commentsModel: this.#commentsModel,
      filmExtraCardCount: FILM_EXTRA_CARD_COUNT.mostCommented,
      filmExtraHeader: FILM_EXTRA_HEADER.mostCommented,
      filmExtraSortCB: sortMostCommented,
      filmCardPresenterList: this.#filmCardPresenterList,
    });
    this.#headerPresenter = new HeaderPresenter();
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];
    this.#defaultFilmCards = [...this.#filmsModel.films];

    this.#renderMainBoard();
    this.#renderExtra();
    this.#renderHeader();
  }

  #handleShowMoreButtonClick = () => {
    this.#filmCards = [...this.#filmsModel.films];
    this.#renderFilmCards(this.#renderedFilmCardsCount, this.#renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP);

    this.#renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;

    if (this.#renderedFilmCardsCount >= this.#filmCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    updateItem(this.#filmCards, updatedFilmCard);
    updateItem(this.#defaultFilmCards, updatedFilmCard);
    this.#filmCardPresenterList.get(updatedFilmCard.newId).forEach(
      (presenter) => presenter.init({
        popupContainer: this.#page,
        filmCard: updatedFilmCard,
        commentsModel: this.#commentsModel
      })
    );
    this.#renderFilterBar();
    this.#renderHeader();
  };

  #handleModeChange = () => {
    this.#filmCardPresenterList.forEach(
      (presentersArr) => presentersArr.forEach(
        (presenter) => presenter.resetView()
      )
    );
  };

  #sortFilmCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#filmCards.sort(sortMainDate);
        break;
      case SortType.RATING:
        this.#filmCards.sort(sortMainRating);
        break;
      default:
        this.#filmCards = [...this.#defaultFilmCards];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilmCards(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
    this.#renderSortBar();
    this.#renderFilterBar();
    this.#renderExtra();
  };

  #renderSortBar() {
    if (this.#sortBarComponent !== null) {
      remove(this.#sortBarComponent);
    }

    this.#sortBarComponent = new SortBarView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortBarComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFilterBar() {
    const prevFilterBarPresenter = this.#filterBarPresenter;

    this.#filterBarPresenter = new FilterBarPresenter({container: this.#container});

    if (prevFilterBarPresenter !== null) {
      prevFilterBarPresenter.removeFilterBar();
    }

    this.#filterBarPresenter.init({filmsModel: this.#filmsModel});
  }

  #renderFilmCard(filmCard, commentsModel) {
    const filmCardPresenter = new FilmCardPresenter({
      onFilmCardChange: this.#handleFilmCardChange,
      filmCardContainer: this.#filmContainerComponent.element,
      onModeChange: this.#handleModeChange,
    });

    filmCardPresenter.init({
      popupContainer: this.#page,
      filmCard,
      commentsModel,
    });

    if ( this.#filmCardPresenterList.has(filmCard.newId) ) {
      const updatedSameCardPresenters = this.#filmCardPresenterList.get(filmCard.newId);
      updatedSameCardPresenters.push(filmCardPresenter);
      this.#filmCardPresenterList.set(
        filmCard.newId,
        updatedSameCardPresenters
      );
      return;
    }

    const sameCardPresenters = [];
    sameCardPresenters.push(filmCardPresenter);
    this.#filmCardPresenterList.set(filmCard.newId, sameCardPresenters);
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
    this.#filmCardPresenterList.forEach(
      (presentersArr) => presentersArr.forEach(
        (presenter) => presenter.destroy()
      )
    );

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
    this.#renderFilterBar();
    this.#renderFilmList();
  }

  #renderExtra() {
    this.#topRatedPresenter.init({onFilmCardChange: this.#handleFilmCardChange});
    this.#mostCommentedPresenter.init({onFilmCardChange: this.#handleFilmCardChange});
  }

  #renderHeader() {
    this.#headerPresenter.init({filmsModel: this.#filmsModel});
  }
}
