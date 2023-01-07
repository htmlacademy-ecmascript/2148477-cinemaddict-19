import SortBarView from '../view/sort-bar-view.js';
import NoFilmCardsView from '../view/no-film-cards-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupPresenter from './popup-presenter.js';
import { render } from '../framework/render.js';

const FILM_CARDS_COUNT_PER_STEP = 5;

export default class MainBoardPresenter {
  #page = document.querySelector('.page');

  #filmWrapperComponent = new FilmWrapperView();

  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCards = [];
  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;

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
    this.#filmCards
      .slice(this.#renderedFilmCardsCount, this.#renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP)
      .forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));

    this.#renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;

    if (this.#renderedFilmCardsCount >= this.#filmCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilmCard(filmCard, commentsModel) {
    const popupPresenter = new PopupPresenter({
      container: this.#page,
      filmCard,
      commentsModel
    });
    const filmCardComponent = new FilmCardView({
      filmCard,
      onClick: () => {
        popupPresenter.init();
      }
    });

    render(filmCardComponent, this.#filmContainerComponent.element);
  }

  #renderMainBoard() {
    if (this.#filmCards.length === 0) {
      render(new NoFilmCardsView(), this.#container);
      return;
    }

    render(new SortBarView(), this.#container);

    render(this.#filmWrapperComponent, this.#container);

    render(this.#filmListComponent, this.#filmWrapperComponent.element);
    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    for (let i = 0; i < Math.min(this.#filmCards.length, FILM_CARDS_COUNT_PER_STEP); i++) {
      this.#renderFilmCard(this.#filmCards[i], this.#commentsModel);
    }

    if (this.#filmCards.length > FILM_CARDS_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
      render(this.#showMoreButtonComponent, this.#filmListComponent.element);
    }
  }
}
