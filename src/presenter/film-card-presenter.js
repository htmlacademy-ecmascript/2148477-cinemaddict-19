import PopupPresenter from './popup-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';

export default class FilmCardPresenter {
  #popupContainer = null;
  #filmCardContainer = null;
  #handleFilmCardChange = null;

  #filmCardComponent = null;
  #popupPresenter = null;
  #commentsModel = null;

  #filmCard = null;

  constructor({onFilmCardChange, filmCardContainer}) {
    this.#handleFilmCardChange = onFilmCardChange;
    this.#filmCardContainer = filmCardContainer;
  }

  init({popupContainer, filmCard, commentsModel}) {
    this.#filmCard = filmCard;
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#popupPresenter = new PopupPresenter({
      container: this.#popupContainer,
      filmCard: this.#filmCard,
      commentsModel: this.#commentsModel,
    });

    this.#filmCardComponent = new FilmCardView({
      filmCard: this.#filmCard,
      onFilmCardClick: this.#handleFilmCardClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmCardContainer);
      return;
    }

    if (this.#filmCardContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  #handleWatchlistClick = () => {
    this.#handleFilmCardChange({...this.#filmCard, userDetails: {...this.#filmCard.userDetails, watchlist: !this.#filmCard.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    // TODO wathcing date
    this.#handleFilmCardChange({...this.#filmCard, userDetails: {...this.#filmCard.userDetails, alreadyWatched: !this.#filmCard.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleFilmCardChange({...this.#filmCard, userDetails: {...this.#filmCard.userDetails, favorite: !this.#filmCard.userDetails.favorite}});
  };

  #handleFilmCardClick = () => {
    this.#popupPresenter.init();
  };
}
