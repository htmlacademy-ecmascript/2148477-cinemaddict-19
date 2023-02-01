import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../util/const.js';

export default class FilmCardPresenter {
  #filmCardContainer = null;

  #handleFilmCardChange = null;
  #handleModeChange = null;

  #filmCardComponent = null;

  #filmCard = null;

  constructor({onFilmCardChange, filmCardContainer, onModeChange, isMainBoard = false}) {
    this.#handleFilmCardChange = onFilmCardChange;
    this.#filmCardContainer = filmCardContainer;
    this.#handleModeChange = onModeChange;
    this.isMainBoard = isMainBoard;
  }

  init({filmCard}) {
    this.#filmCard = filmCard;

    const prevFilmCardComponent = this.#filmCardComponent;

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

    replace(this.#filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

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
    this.#handleModeChange(this.#filmCard);
  };
}
