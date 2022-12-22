import {createElement} from '../util/render.js';
import {getReleaseDate, getHoursMinutes} from '../util/date-time.js';

function createPopupFilmDetailsTemplate(filmCard) {

  const {filmInfo, userDetails} = filmCard;

  function getGenresList (genres) {
    let genresTemplate = '';

    for (const genre of genres) {
      genresTemplate += `<span class="film-details__genre">${genre}</span>`;
    }

    return genresTemplate;
  }

  return (
    `<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${filmInfo.poster} alt="">

          <p class="film-details__age">${filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getReleaseDate(filmInfo.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${getHoursMinutes(filmInfo.duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre${filmInfo.genre.length > 1 ? 's' : ''}</td>
              <td class="film-details__cell">${getGenresList(filmInfo.genre)}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${filmInfo.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist${userDetails.watchlist ? ' film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>

        <button type="button" class="film-details__control-button film-details__control-button--watched${userDetails.alreadyWatched ? ' film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>

        <button type="button" class="film-details__control-button film-details__control-button--favorite${userDetails.favorite ? ' film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>`
  );
}

export default class PopupFilmDetailsView {
  #element = null;
  #filmCard = null;

  constructor({filmCard}) {
    this.#filmCard = filmCard;
  }

  get template() {
    return createPopupFilmDetailsTemplate(this.#filmCard);
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
