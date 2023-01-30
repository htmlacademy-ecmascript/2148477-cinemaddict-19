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
// import { updateItem } from '../util/common.js';
import { sortMainDate, sortMainRating, sortTopRated, sortMostCommented } from '../util/sort-film-cards.js';
import { SortType, UpdateType, UserAction, FILM_EXTRA_CARD_COUNT, FILM_EXTRA_HEADER } from '../util/const.js';

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

  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  #filmCardPresenterList = new Map();
  #currentSortType = SortType.DEFAULT;

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

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortMainDate);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortMainRating);
    }

    return this.#filmsModel.films;
  }

  init() {
    // this.#filmCards = [...this.#filmsModel.films];
    // this.#defaultFilmCards = [...this.#filmsModel.films];

    this.#renderMainBoard();
    this.#renderExtra();
    this.#renderHeader();
  }

  #handleShowMoreButtonClick = () => {
    const filmCardsCount = this.films.length;
    const newRenderedFilmCardsCount = Math.min(filmCardsCount, this.#renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP);
    const filmCards = this.films.slice(this.#renderedFilmCardsCount, newRenderedFilmCardsCount);

    this.#renderFilmCards(filmCards);

    this.#renderedFilmCardsCount = newRenderedFilmCardsCount;

    if (this.#renderedFilmCardsCount >= filmCardsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#filmCardPresenterList.forEach(
      (presentersArr) => presentersArr.forEach(
        (presenter) => presenter.resetView()
      )
    );
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        // this.#commentsModel
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        // this.#commentsModel
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить карточку и экстра презентер при необходимости
        break;
      case UpdateType.MINOR:
        // - обновить карточку, хедэр и филтер-бар
        this.#filmCardPresenterList.get(data.id).forEach(
          (presenter) => presenter.init({
            filmCard: data,
          })
        );

        this.#renderFilterBar();
        this.#renderHeader();

        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearMainBoard();
        this.#renderMainBoard();
        break;
    }
  };

  // #sortFilmCards(sortType) {
  //   switch (sortType) {
  //     case SortType.DATE:
  //       this.#filmCards.sort(sortMainDate);
  //       break;
  //     case SortType.RATING:
  //       this.#filmCards.sort(sortMainRating);
  //       break;
  //     default:
  //       this.#filmCards = [...this.#defaultFilmCards];
  //   }

  //   this.#currentSortType = sortType;
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    // this.#clearFilmList();
    // this.#renderFilmList();
    this.#clearMainBoard({resetRenderedFilmCardsCount: true});
    this.#renderMainBoard();
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
      commentsModel,
      onFilmCardChange: this.#handleViewAction,
      popupContainer: this.#page,
      filmCardContainer: this.#filmContainerComponent.element,
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
        updatedSameCardPresenters
      );
      return;
    }

    const sameCardPresenters = [];
    sameCardPresenters.push(filmCardPresenter);
    this.#filmCardPresenterList.set(filmCard.id, sameCardPresenters);
  }

  #renderFilmCards(filmCards) {
    filmCards.forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));
    // this.#filmCards
    //   .slice(from, to)
    //   .forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));
  }

  #renderNoFilms() {
    render(this.#noFilmCardsComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
  }

  // #renderFilmList() {
  //   const filmCardsCount = this.films.length;
  //   const filmCards = this.films.slice(0, Math.min(filmCardsCount, FILM_CARDS_COUNT_PER_STEP));

  //   render(this.#filmHeaderComponent, this.#filmListComponent.element);

  //   render(this.#filmContainerComponent, this.#filmListComponent.element);
  //   this.#renderFilmCards(filmCards);

  //   if (filmCardsCount > FILM_CARDS_COUNT_PER_STEP) {
  //     this.#renderShowMoreButton();
  //   }
  // }

  #clearMainBoard({resetRenderedFilmCardsCount = false, resetSortType = false} = {}) {
    const filmCardsCount = this.films.length;

    this.#filmCardPresenterList.forEach(
      (presentersArr) => presentersArr.forEach(
        (presenter) => presenter.destroy()
      )
    );
    this.#filmCardPresenterList.clear();

    remove(this.#noFilmCardsComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCardsCount) {
      this.#renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества фильмов (например, выпадение карточки из отфильтрованного списка)
      // нужно скорректировать число показанных задач
      this.#renderedFilmCardsCount = Math.min(filmCardsCount, this.#renderedFilmCardsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderMainBoard() {
    render(this.#filmWrapperComponent, this.#container);
    render(this.#filmListComponent, this.#filmWrapperComponent.element);

    const filmCards = this.films;
    const filmCardsCount = filmCards.length;

    if (filmCardsCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSortBar();
    this.#renderFilterBar();

    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    this.#renderFilmCards(filmCards.slice(0, Math.min(filmCardsCount, this.#renderedFilmCardsCount)));

    if (filmCardsCount > this.#renderedFilmCardsCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderExtra() {
    this.#topRatedPresenter.init({onFilmCardChange: this.#handleViewAction});
    this.#mostCommentedPresenter.init({onFilmCardChange: this.#handleViewAction});
  }

  #renderHeader() {
    this.#headerPresenter.init({films: this.films});
  }
}
