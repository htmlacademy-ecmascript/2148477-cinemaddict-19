import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../util/const.js';

export default class FilmCardPresenter {
  #filmCardContainer = null;

  #handleFilmCardChange = null;
  #handleModeChange = null;

  #filmCardComponent = null;

  #filmCard = null;

  constructor({onFilmCardChange, filmCardContainer, onModeChange}) {
    this.#handleFilmCardChange = onFilmCardChange;
    this.#filmCardContainer = filmCardContainer;
    this.#handleModeChange = onModeChange;
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

  setAborting() {
    this.#filmCardComponent.shake();
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
      },
      this,
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
      },
      this,
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
      },
      this,
    );
  };

  #handleFilmCardClick = () => {
    this.#handleModeChange(this.#filmCard);
  };
}
