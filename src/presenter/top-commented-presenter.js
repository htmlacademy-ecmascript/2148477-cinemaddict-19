import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import { render } from '../util/render.js';

const FILM_COMMENTED_CARD_COUNT = 2;

export default class TopCommentedPresenter {
  #filmListCommentedComponent = new FilmListView();
  #filmHeaderCommentedComponent = new FilmListHeaderView();
  #filmContainerCommentedComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;

  #filmCardsCommented = [];

  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
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
      render(new FilmCardView({filmCard: this.#filmCardsCommented[i]}), this.#filmContainerCommentedComponent.element);
    }
  }
}
