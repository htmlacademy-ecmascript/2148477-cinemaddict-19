import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view';
import FilmCardView from '../view/film-card-view';
import {render} from '../util/render.js';

export default class HeaderPresenter {
  constructor({container, filmsModel}) {
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.alreadyWatched = [...this.filmsModel.getFilms()].reduce(
      (sum, film) => sum + (film.userDetails.alreadyWatched ? 1 : 0),
      0
    );

    render(new UserProfileView({alreadyWatched: this.alreadyWatched}), this.container);
  }
}
