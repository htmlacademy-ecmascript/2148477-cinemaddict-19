import SortBarView from '../view/sort-bar-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButton from '../view/show-more-button-view.js';
import { render } from '../util/render.js';

export default class MainPresenter {
  #filmWrapperComponent = new FilmWrapperView();

  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;

  #filmCards = [];


  constructor({container, filmsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
  }

  get filmWrapperComponent() {
    return this.#filmWrapperComponent;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    render(new SortBarView(), this.#container);

    render(this.#filmWrapperComponent, this.#container);

    render(this.#filmListComponent, this.#filmWrapperComponent.element);
    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    for (let i = 0; i < this.#filmCards.length; i++) {
      render(new FilmCardView({filmCard: this.#filmCards[i]}), this.#filmContainerComponent.element);
    }

    render(new ShowMoreButton(), this.#filmListComponent.element);
  }
}
