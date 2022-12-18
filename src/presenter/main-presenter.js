import SortBarView from '../view/sort-bar-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButton from '../view/show-more-button-view.js';
import {render} from '../util/render.js';

export default class MainPresenter {
  filmWrapperComponent = new FilmWrapperView();

  filmListComponent = new FilmListView();
  filmHeaderComponent = new FilmListHeaderView();
  filmContainerComponent = new FilmContainerView();

  constructor({container, filmsModel}) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmCards = [...this.filmsModel.getFilms()];

    render(new SortBarView(), this.container);

    render(this.filmWrapperComponent, this.container);

    render(this.filmListComponent, this.filmWrapperComponent.getElement());
    render(this.filmHeaderComponent, this.filmListComponent.getElement());

    render(this.filmContainerComponent, this.filmListComponent.getElement());
    for (let i = 0; i < this.filmCards.length; i++) {
      render(new FilmCardView({filmCard: this.filmCards[i]}), this.filmContainerComponent.getElement());
    }

    render(new ShowMoreButton(), this.filmListComponent.getElement());
  }
}
