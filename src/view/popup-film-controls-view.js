import AbstractView from '../framework/view/abstract-view';

function createPopupFilmControlsTemplate(filmCard) {
  return (
    `<section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist${filmCard.userDetails.watchlist ? ' film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>

      <button type="button" class="film-details__control-button film-details__control-button--watched${filmCard.userDetails.alreadyWatched ? ' film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>

      <button type="button" class="film-details__control-button film-details__control-button--favorite${filmCard.userDetails.favorite ? ' film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
    </section>`
  );
}

export default class PopupFilmcontrolsView extends AbstractView {
  #filmCard = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({filmCard,onWatchlistClick, onAlreadyWatchedClick, onFavoriteClick}) {
    super();
    this.#filmCard = filmCard;

    this.#handleWatchlistClick = onWatchlistClick;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);

    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);

    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPopupFilmControlsTemplate(this.#filmCard);
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAlreadyWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
