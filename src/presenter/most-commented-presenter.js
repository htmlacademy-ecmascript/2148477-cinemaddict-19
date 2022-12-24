import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import { render } from '../util/render.js';

const FILM_COMMENTED_CARD_COUNT = 2;

export default class MostCommentedPresenter {
  #page = document.querySelector('.page');

  #filmListCommentedComponent = new FilmListView();
  #filmHeaderCommentedComponent = new FilmListHeaderView();
  #filmContainerCommentedComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCardsCommented = [];

  constructor({container, filmsModel, commentsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#filmCardsCommented = [...this.#filmsModel.films].sort((a, b) => b.comments.length - a.comments.length);

    this.#filmListCommentedComponent.element.classList.add('films-list--extra');
    render(this.#filmListCommentedComponent, this.#container.element);

    this.#filmHeaderCommentedComponent.element.innerHTML = 'Most commented';
    this.#filmHeaderCommentedComponent.element.classList.remove('visually-hidden');
    render(this.#filmHeaderCommentedComponent, this.#filmListCommentedComponent.element);

    render(this.#filmContainerCommentedComponent, this.#filmListCommentedComponent.element);
    for (let i = 0; i < FILM_COMMENTED_CARD_COUNT; i++) {
      this.#renderFilmCard(this.#filmCardsCommented[i], this.#commentsModel);
    }
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

    render(filmCardComponent, this.#filmContainerCommentedComponent.element);
  }
}
