import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import { render } from '../util/render.js';

const FILM_RATED_CARD_COUNT = 2;

export default class TopRatedPresenter {
  #filmListRatedComponent = new FilmListView();
  #filmHeaderRatedComponent = new FilmListHeaderView();
  #filmContainerRatedComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;

  #filmCardsRated = [];

  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#filmCardsRated = [...this.#filmsModel.films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);

    this.#filmListRatedComponent.element.classList.add('films-list--extra');
    render(this.#filmListRatedComponent, this.#container.element);
    this.#filmHeaderRatedComponent.element.innerHTML = 'Top rated';
    this.#filmHeaderRatedComponent.element.classList.remove('visually-hidden');
    render(this.#filmHeaderRatedComponent, this.#filmListRatedComponent.element);
    render(this.#filmContainerRatedComponent, this.#filmListRatedComponent.element);
    for (let i = 0; i < FILM_RATED_CARD_COUNT; i++) {
      render(new FilmCardView({filmCard: this.#filmCardsRated[i]}), this.#filmContainerRatedComponent.element);
    }
  }
}
