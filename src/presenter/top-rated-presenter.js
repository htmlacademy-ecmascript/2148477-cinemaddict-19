import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import { render } from '../util/render.js';

const FILM_RATED_CARD_COUNT = 2;

export default class TopRatedPresenter {
  #page = document.querySelector('.page');

  #filmListRatedComponent = new FilmListView();
  #filmHeaderRatedComponent = new FilmListHeaderView();
  #filmContainerRatedComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCards = [];
  #filmCardsRated = [];

  constructor({container, filmsModel, commentsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#renderTopRated();
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

    render(filmCardComponent, this.#filmContainerRatedComponent.element);
  }

  #renderTopRated() {
    if (this.#filmCards.length > 0) {
      this.#filmCardsRated = this.#filmCards.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

      this.#filmListRatedComponent.element.classList.add('films-list--extra');
      render(this.#filmListRatedComponent, this.#container.element);

      this.#filmHeaderRatedComponent.element.innerHTML = 'Top rated';
      this.#filmHeaderRatedComponent.element.classList.remove('visually-hidden');
      render(this.#filmHeaderRatedComponent, this.#filmListRatedComponent.element);

      render(this.#filmContainerRatedComponent, this.#filmListRatedComponent.element);
      for (let i = 0; i < Math.min(this.#filmCardsRated.length, FILM_RATED_CARD_COUNT); i++) {
        this.#renderFilmCard(this.#filmCardsRated[i], this.#commentsModel);
      }
    }
  }
}
