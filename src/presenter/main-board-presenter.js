import SortBarView from '../view/sort-bar-view.js';
import NoFilmCardsView from '../view/no-film-cards-view.js';
import LoadingView from '../view/loading-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import PopupPresenter from './popup-presenter.js';
import FilterBarPresenter from './filter-bar-presenter.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmExtraPresenter from './film-extra-presenter.js';
import HeaderPresenter from './header-presenter.js';
import FooterStatisticPresenter from './footer-statistic-presenter.js';

import { remove, render, replace, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import { sortMainDate, sortMainRating, sortTopRated, sortMostCommented } from '../util/sort-film-cards.js';
import { filter } from '../util/film-card-filter.js';
import { Mode, SortType, UpdateType, UserAction, FILM_EXTRA_CARD_COUNT, FILM_EXTRA_HEADER, FilterType } from '../util/const.js';

const FILM_CARDS_COUNT_PER_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 100,
  UPPER_LIMIT: 600,
};

export default class MainBoardPresenter {
  #page = document.querySelector('.page');

  #filmWrapperComponent = new FilmWrapperView();
  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;
  #sortBarComponent = null;
  #noFilmCardsComponent = null;
  #loadingComponent = new LoadingView();

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #popupPresenter = null;
  #filterBarPresenter = null;
  #topRatedPresenter = null;
  #mostCommentedPresenter = null;
  #headerPresenter = null;
  #footerStatisticPresenter = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  #filmCardPresenterList = new Map();
  #currentSortType = SortType.DEFAULT;
  #currentFilterType = FilterType.ALL;

  #mode = Mode.DEFAULT;

  #isLoading = true;

  constructor({container, filmsModel, commentsModel, filterModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#popupPresenter = new PopupPresenter({
      container: this.#page,
      filmsModel,
      commentsModel: this.#commentsModel,
      onViewAction: this.#handleViewAction,
      onPopupRemove: this.#resetMode,
      getMode: this.#getMode,
    });
    this.#topRatedPresenter = new FilmExtraPresenter({
      container: this.#filmWrapperComponent,
      filmExtraCardCount: FILM_EXTRA_CARD_COUNT.topRated,
      filmExtraHeader: FILM_EXTRA_HEADER.topRated,
      filmExtraSortCB: sortTopRated,
      filmCardPresenterList: this.#filmCardPresenterList,
      onFilmCardChange: this.#handleViewAction,
      popupPresenter: this.#popupPresenter,
      mode: this.#setMode,
      filmsModel: this.#filmsModel,
      commentsModel: this.#commentsModel,
    });
    this.#mostCommentedPresenter = new FilmExtraPresenter({
      container: this.#filmWrapperComponent,
      filmExtraCardCount: FILM_EXTRA_CARD_COUNT.mostCommented,
      filmExtraHeader: FILM_EXTRA_HEADER.mostCommented,
      filmExtraSortCB: sortMostCommented,
      filmCardPresenterList: this.#filmCardPresenterList,
      onFilmCardChange: this.#handleViewAction,
      popupPresenter: this.#popupPresenter,
      mode: this.#setMode,
      filmsModel: this.#filmsModel,
      commentsModel: this.#commentsModel,
    });
    this.#filterBarPresenter = new FilterBarPresenter({
      container: this.#container,
      filmsModel: this.#filmsModel,
      filterModel: this.#filterModel,
    });
    this.#footerStatisticPresenter = new FooterStatisticPresenter({
      container: document.querySelector('.footer__statistics'),
    });

    this.#headerPresenter = new HeaderPresenter();

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#currentFilterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilmCards = filter[this.#currentFilterType](films);

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
  }

  #resetMode = () => {
    this.#mode = Mode.DEFAULT;
  };

  #getMode = () => this.#mode;

  #setMode = (newMode) => {
    this.#mode = newMode;
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

  #renderFilmCard(filmCard) {
    const filmCardPresenter = new FilmCardPresenter({
      onFilmCardChange: this.#handleViewAction,
      filmCardContainer: this.#filmContainerComponent.element,
      onModeChange: this.#handleModeChange,
    });

    filmCardPresenter.init({filmCard});

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
    filmCards.forEach((filmCard) => this.#renderFilmCard(filmCard));
  }

  #renderNoFilms() {
    this.#noFilmCardsComponent = new NoFilmCardsView({filterType: this.#currentFilterType});

    render(this.#noFilmCardsComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
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

    remove(this.#showMoreButtonComponent);
    remove(this.#loadingComponent);

    if (this.#noFilmCardsComponent) {
      remove(this.#noFilmCardsComponent);
    }

    if (resetRenderedFilmCardsCount) {
      this.#renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    } else {
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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const filmCards = this.films;
    const filmCardsCount = filmCards.length;

    this.#renderSortBar();
    this.#filterBarPresenter.init();
    this.#renderExtra();

    if (filmCardsCount === 0) {
      this.#renderNoFilms();
      return;
    }

    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    this.#renderFilmCards(filmCards.slice(0, Math.min(filmCardsCount, this.#renderedFilmCardsCount)));

    if (filmCardsCount > this.#renderedFilmCardsCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderExtra() {
    this.#topRatedPresenter.init({filmCards: this.#filmsModel.films});
    this.#mostCommentedPresenter.init({filmCards: this.#filmsModel.films});
  }

  #renderHeader() {
    this.#headerPresenter.init({filmsModel: this.#filmsModel});
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

  #handleModeChange = (filmCard) => {
    this.#popupPresenter.removePopup();
    this.#popupPresenter.init(filmCard);
    this.#commentsModel.init(filmCard);
    this.#mode = Mode.POPUP;
  };

  #handleViewAction = async (actionType, updateType, update, rest) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch(err) {
          if (this.#popupPresenter === rest) {
            this.#popupPresenter.setAborting(actionType);
          }
          this.#filmCardPresenterList.get(update.id).find((presenter) => presenter === rest)?.setAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          await this.#commentsModel.addComment(updateType, update);
          this.#popupPresenter.resetForm();
        } catch(err) {
          this.#popupPresenter.setAborting(actionType);
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {
          await this.#commentsModel.deleteComment(updateType, update, rest);
        } catch(err) {
          this.#popupPresenter.setAborting(actionType, update);
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmCardPresenterList.get(data.id)?.forEach(
          (presenter) => {
            presenter.init({filmCard: data});
          }
        );
        break;

      case UpdateType.MINOR:
        this.#renderHeader();

        if (this.#filterModel.filter !== FilterType.ALL) {
          this.#clearMainBoard({ resetRenderedFilmCardsCount: (this.films.length < 5) });
          this.#renderMainBoard();
          break;
        }

        this.#filmCardPresenterList.get(data.id).forEach(
          (presenter) => {
            presenter.init({filmCard: data});
          }
        );
        break;

      case UpdateType.MAJOR:
        this.#clearMainBoard({resetRenderedFilmCardsCount: true});
        this.#renderMainBoard();
        break;

      case UpdateType.INIT:
        if (this.#isLoading) {
          this.#isLoading = false;
          remove(this.#loadingComponent);
          this.#renderHeader();
          this.#renderMainBoard();
          this.#footerStatisticPresenter.init(this.#filmsModel);
          break;
        }
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
}
