import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import { render } from '../util/render.js';

const FILM_COMMENTED_CARD_COUNT = 2;

export default class TopCommentedPresenter {
  filmListCommentedComponent = new FilmListView();
  filmHeaderCommentedComponent = new FilmListHeaderView();
  filmContainerCommentedComponent = new FilmContainerView();

  constructor({container, filmsModel}) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmCardsCommented = [...this.filmsModel.getFilms()].sort((a, b) => b.comments.length - a.comments.length);

    this.filmListCommentedComponent.getElement().classList.add('films-list--extra');
    render(this.filmListCommentedComponent, this.container.getElement());
    this.filmHeaderCommentedComponent.getElement().innerHTML = 'Most commented';
    this.filmHeaderCommentedComponent.getElement().classList.remove('visually-hidden');
    render(this.filmHeaderCommentedComponent, this.filmListCommentedComponent.getElement());
    render(this.filmContainerCommentedComponent, this.filmListCommentedComponent.getElement());
    for (let i = 0; i < FILM_COMMENTED_CARD_COUNT; i++) {
      render(new FilmCardView({filmCard: this.filmCardsCommented[i]}), this.filmContainerCommentedComponent.getElement());
    }
  }
}
