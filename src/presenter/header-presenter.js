import UserProfileView from '../view/user-profile-view';
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
