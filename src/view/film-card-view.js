import AbstractView from '../framework/view/abstract-view.js';
import {getReleaseYear, getHoursMinutes} from '../util/date-time.js';
import {getPreviewFilmDescription} from '../util/film-description.js';

function createFilmCardTemplate(filmCard) {
  const {filmInfo, comments, userDetails, newId} = filmCard;
  // getPreviewFilmDescription(filmInfo.description)
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getReleaseYear(filmInfo.release.date)}</span>
          <span class="film-card__duration">${getHoursMinutes(filmInfo.duration)}</span>
          <span class="film-card__genre">${filmInfo.genre[0]}</span>
        </p>
        <img src=${filmInfo.poster} alt="" class="film-card__poster">
        <p class="film-card__description">${newId}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist${userDetails.watchlist ? ' film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched${userDetails.alreadyWatched ? ' film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite${userDetails.favorite ? ' film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
}

export default class FilmCardView extends AbstractView {
  #handleFilmCardClick = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({filmCard, onFilmCardClick, onWatchlistClick, onAlreadyWatchedClick, onFavoriteClick}) {
    super();

    this._filmCard = filmCard;

    this.#handleFilmCardClick = onFilmCardClick;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);

    this.#handleWatchlistClick = onWatchlistClick;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);

    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);

    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this._filmCard);
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilmCardClick();
  };

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
