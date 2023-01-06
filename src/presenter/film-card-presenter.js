import PopupPresenter from './popup-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';

export default class FilmCardPresenter {
  #mainContainer = null;
  #topRatedContainer = null;
  #mostCommentedContainer = null;
  #popupContainer = null;
  #handleFilmCardChange = null;

  #filmCardComponent = null;
  #popupPresenter = null;
  #commentsModel = null;

  #filmCard = null;

  constructor({onFilmCardChange}) {
    this.#handleFilmCardChange = onFilmCardChange;
  }

  init({mainContainer, topRatedContainer, mostCommentedContainer, popupContainer, filmCard, commentsModel}) {
    this.#filmCard = filmCard;
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
    this.#mainContainer = mainContainer || this.#mainContainer;
    this.#topRatedContainer = topRatedContainer || this.#topRatedContainer;
    this.#mostCommentedContainer = mostCommentedContainer || this.#mostCommentedContainer;

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

    if (mainContainer) {
      render(this.#filmCardComponent, this.#mainContainer);
      return;
    }

    if (topRatedContainer) {
      render(this.#filmCardComponent, this.#topRatedContainer);
      return;
    }

    if (mostCommentedContainer) {
      render(this.#filmCardComponent, this.#mostCommentedContainer);
      return;
    }

    if (this.#mainContainer && this.#mainContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#topRatedContainer && this.#topRatedContainer.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mostCommentedContainer && this.#mostCommentedContainer.contains(prevFilmCardComponent.element)) {
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
