import SortBarView from '../view/sort-bar-view.js';
import NoFilmCardsView from '../view/no-film-cards-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilterBarPresenter from './filter-bar-presenter.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmExtraPresenter from './film-extra-presenter.js';
import HeaderPresenter from './header-presenter.js';

import { remove, render, replace, RenderPosition } from '../framework/render.js';
import { sortMainDate, sortMainRating, sortTopRated, sortMostCommented } from '../util/sort-film-cards.js';
import { filter } from '../util/film-card-filter.js';
import { SortType, UpdateType, UserAction, FILM_EXTRA_CARD_COUNT, FILM_EXTRA_HEADER, FilterType } from '../util/const.js';

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
  #filterModel = null;

  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  #filmCardPresenterList = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor({container, filmsModel, commentsModel, filterModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#topRatedPresenter = new FilmExtraPresenter({
      container: this.#filmWrapperComponent,
      commentsModel: this.#commentsModel,
      filmExtraCardCount: FILM_EXTRA_CARD_COUNT.topRated,
      filmExtraHeader: FILM_EXTRA_HEADER.topRated,
      filmExtraSortCB: sortTopRated,
      filmCardPresenterList: this.#filmCardPresenterList,
      onFilmCardChange: this.#handleViewAction,
    });
    this.#mostCommentedPresenter = new FilmExtraPresenter({
      container: this.#filmWrapperComponent,
      commentsModel: this.#commentsModel,
      filmExtraCardCount: FILM_EXTRA_CARD_COUNT.mostCommented,
      filmExtraHeader: FILM_EXTRA_HEADER.mostCommented,
      filmExtraSortCB: sortMostCommented,
      filmCardPresenterList: this.#filmCardPresenterList,
      onFilmCardChange: this.#handleViewAction,
    });
    this.#filterBarPresenter = new FilterBarPresenter({
      container: this.#container,
      filmsModel: this.#filmsModel,
      filterModel: this.#filterModel,
    });
    this.#headerPresenter = new HeaderPresenter();

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilmCards = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilmCards.sort(sortMainDate);
      case SortType.RATING:
        return filteredFilmCards.sort(sortMainRating);
    }

    return filteredFilmCards;
  }

  init() {
    this.#renderMainBoard();
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
        // this.#commentsModel - добавить изменение второй модели
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        // this.#commentsModel - добавить изменение второй модели
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить карточку и экстра презентер при необходимости
        break;
      case UpdateType.MINOR:
        // - обновить карточку, хедэр и филтер-бар
        this.#renderHeader();

        this.#filmCardPresenterList.get(data.id).forEach(
          (presenter) => {
            presenter.init({filmCard: data});
            // if (presenter.isMainBoard && !data.userDetails[this.#filterModel.filter]) {
            //   presenter.destroy();
            // }
          }
        );
        // this.#clearMainBoard();
        // this.#renderMainBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearMainBoard();
        this.#renderMainBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#clearMainBoard({resetRenderedFilmCardsCount: true, resetSortType: true});
    this.#currentSortType = sortType;
    this.#renderMainBoard();
  };

  #renderSortBar() {
    const prevSortBarComponent = this.#sortBarComponent;

    this.#sortBarComponent = new SortBarView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    if (prevSortBarComponent === null) {
      render(this.#sortBarComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#sortBarComponent, prevSortBarComponent);
    remove(prevSortBarComponent);
  }

  #renderFilmCard(filmCard, commentsModel) {
    const filmCardPresenter = new FilmCardPresenter({
      commentsModel,
      onFilmCardChange: this.#handleViewAction,
      popupContainer: this.#page,
      filmCardContainer: this.#filmContainerComponent.element,
      onModeChange: this.#handleModeChange,
      isMainBoard: true,
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
  }

  #renderNoFilms() {
    render(this.#noFilmCardsComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
  }

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
    if (!this.#container.contains(this.#filmWrapperComponent.element)) {
      render(this.#filmWrapperComponent, this.#container);
    }

    if (!this.#filmWrapperComponent.element.contains(this.#filmListComponent.element)) {
      render(this.#filmListComponent, this.#filmWrapperComponent.element);
    }

    const filmCards = this.films;
    const filmCardsCount = filmCards.length;

    if (filmCardsCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSortBar();
    this.#filterBarPresenter.init();

    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    this.#renderFilmCards(filmCards.slice(0, Math.min(filmCardsCount, this.#renderedFilmCardsCount)));

    if (filmCardsCount > this.#renderedFilmCardsCount) {
      this.#renderShowMoreButton();
    }

    this.#renderExtra();
  }

  #renderExtra() {
    this.#topRatedPresenter.init({filmCards: [...this.#filmsModel.films]});
    this.#mostCommentedPresenter.init({filmCards: [...this.#filmsModel.films]});
  }

  #renderHeader() {
    this.#headerPresenter.init({films: this.films});
  }
}
