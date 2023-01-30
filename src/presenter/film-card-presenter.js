import PopupPresenter from './popup-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../util/const.js';

export default class FilmCardPresenter {
  #popupContainer = null;
  #filmCardContainer = null;
  #handleFilmCardChange = null;
  #handleModeChange = null;

  #filmCardComponent = null;
  #popupPresenter = null;
  #commentsModel = null;

  #filmCard = null;

  #mode = Mode.DEFAULT;

  constructor({commentsModel, onFilmCardChange, popupContainer, filmCardContainer, onModeChange}) {
    this.#commentsModel = commentsModel;
    this.#handleFilmCardChange = onFilmCardChange;
    this.#popupContainer = popupContainer;
    this.#filmCardContainer = filmCardContainer;
    this.#handleModeChange = onModeChange;
  }

  init({filmCard}) {
    this.#filmCard = filmCard;

    const prevFilmCardComponent = this.#filmCardComponent;

    if (!this.#popupPresenter) {
      this.#popupPresenter = new PopupPresenter({
        container: this.#popupContainer,
        onWatchlistClick: this.#handleWatchlistClick,
        onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
        onFavoriteClick: this.#handleFavoriteClick,
      });
    }

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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      this.#popupPresenter.earsePopup();
      this.#popupPresenter.init({
        filmCard: this.#filmCard,
        commentsModel: this.#commentsModel,
        onPopupRemove: this.#resetMode,
        mode: this.#mode,
      });
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#popupPresenter.removePopup();
    }
  }

  #resetMode = () => {
    this.#mode = Mode.DEFAULT;
  };

  #handleWatchlistClick = () => {
    this.#handleFilmCardChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          watchlist: !this.#filmCard.userDetails.watchlist
        }
      }
    );
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleFilmCardChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          alreadyWatched: !this.#filmCard.userDetails.alreadyWatched
        }
      }
    );
  };

  #handleFavoriteClick = () => {
    this.#handleFilmCardChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          favorite: !this.#filmCard.userDetails.favorite
        }
      }
    );
  };

  #handleFilmCardClick = () => {
    this.#handleModeChange();
    this.#popupPresenter.init({
      filmCard: this.#filmCard,
      commentsModel: this.#commentsModel,
      onPopupRemove: this.#resetMode,
      mode: this.#mode});
    this.#mode = Mode.POPUP;
  };
}
