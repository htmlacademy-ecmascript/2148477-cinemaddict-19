import SortBarView from '../view/sort-bar-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreButton from '../view/show-more-button-view.js';
import {render} from '../util/render.js';

const FILM_RATED_CARD_COUNT = 2;
const FILM_COMMENTED_CARD_COUNT = 2;

export default class MainPresenter {
  filmWrapperComponent = new FilmWrapperView();

  filmListComponent = new FilmListView();
  filmHeaderComponent = new FilmListHeaderView();
  filmContainerComponent = new FilmContainerView();

  filmListRatedComponent = new FilmListView();
  filmHeaderRatedComponent = new FilmListHeaderView();
  filmContainerRatedComponent = new FilmContainerView();

  filmListCommentedComponent = new FilmListView();
  filmHeaderCommentedComponent = new FilmListHeaderView();
  filmContainerCommentedComponent = new FilmContainerView();

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

    // // Top rated section
    // this.filmListRatedComponent.getElement().classList.add('films-list--extra');
    // render(this.filmListRatedComponent, this.filmWrapperComponent.getElement());
    // this.filmHeaderRatedComponent.getElement().innerHTML = 'Top rated';
    // this.filmHeaderRatedComponent.getElement().classList.remove('visually-hidden');
    // render(this.filmHeaderRatedComponent, this.filmListRatedComponent.getElement());
    // render(this.filmContainerRatedComponent, this.filmListRatedComponent.getElement());
    // renderElementMultipleCount(FILM_RATED_CARD_COUNT, FilmCardView, this.filmContainerRatedComponent.getElement());

    // // Most commented section
    // this.filmListCommentedComponent.getElement().classList.add('films-list--extra');
    // render(this.filmListCommentedComponent, this.filmWrapperComponent.getElement());
    // this.filmHeaderCommentedComponent.getElement().innerHTML = 'Most commented';
    // this.filmHeaderCommentedComponent.getElement().classList.remove('visually-hidden');
    // render(this.filmHeaderCommentedComponent, this.filmListCommentedComponent.getElement());
    // render(this.filmContainerCommentedComponent, this.filmListCommentedComponent.getElement());
    // renderElementMultipleCount(FILM_COMMENTED_CARD_COUNT, FilmCardView, this.filmContainerCommentedComponent.getElement());
  }
}