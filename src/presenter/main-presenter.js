import SortBarView from '../view/sort-bar-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButton from '../view/show-more-button-view.js';
import PopupPresenter from './popup-presenter.js';
import { render } from '../util/render.js';

export default class MainPresenter {
  #page = document.querySelector('.page');

  #filmWrapperComponent = new FilmWrapperView();

  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCards = [];


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

    render(new SortBarView(), this.#container);

    render(this.#filmWrapperComponent, this.#container);

    render(this.#filmListComponent, this.#filmWrapperComponent.element);
    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    for (let i = 0; i < this.#filmCards.length; i++) {
      this.#renderFilmCard(this.#filmCards[i], this.#commentsModel);
    }

    render(new ShowMoreButton(), this.#filmListComponent.element);
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

    render(filmCardComponent, this.#filmContainerComponent.element);
  }
}
