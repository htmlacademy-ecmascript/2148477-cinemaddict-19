import {createElement} from '../util/render.js';
import {getReleaseYear, getHoursMinutes} from '../util/date-time.js';
import {getPreviewFilmDescription} from '../util/film-description.js';

function createFilmCardTemplate(filmCard) {
  const {filmInfo, comments} = filmCard;

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
        <p class="film-card__description">${getPreviewFilmDescription(filmInfo.description)}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
}

export default class FilmCardView {
  #element = null;
  #filmCard = null;

  constructor({filmCard}) {
    this.#filmCard = filmCard;
  }

  get template() {
    return createFilmCardTemplate(this.#filmCard);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
