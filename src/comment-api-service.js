import ApiService from './framework/api-service.js';

// const Method = {
//   GET: 'GET',
//   POST: 'POST',
//   DELETE: 'DELETE',
// };

export default class CommentsApiService extends ApiService {
  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(ApiService.parseResponse);
  }

  // async updateFilm(film) {
  //   const response = await this._load({
  //     url: `movies/${film.id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(this.#adaptToServer(film)),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });

  //   const parsedResponse = await ApiService.parseResponse(response);

  //   return parsedResponse;
  // }

  #adaptToServer(comment) {
    const adaptedComment = {
      ...comment,
      // 'film_info': {
      //   ...film.filmInfo,
      //   'alternative_title': film.filmInfo.alternativeTitle,
      //   'total_rating': film.filmInfo.totalRating,
      //   'age_rating': film.filmInfo.ageRating,
      //   release: {
      //     date: film.filmInfo.release.date !== null ? film.filmInfo.release.date.toISOString() : null,
      //     'release_country': film.filmInfo.release.releaseCountry,
      //   },
      // },
      // 'user_details': {
      //   ...film.userDetails,
      //   'already_watched': film.userDetails.alreadyWatched,
      //   'watching_date': film.userDetails.watchingDate !== null ? film.userDetails.watchingDate.toISOString() : null,
      // },
    };

    // Ненужные ключи мы удаляем
    // delete adaptedFilm.filmInfo;
    // delete adaptedFilm['film_info'].alternativeTitle;
    // delete adaptedFilm['film_info'].totalRating;
    // delete adaptedFilm['film_info'].ageRating;
    // delete adaptedFilm['film_info'].release.releaseCountry;
    // delete adaptedFilm.userDetails;
    // delete adaptedFilm['user_details'].alreadyWatched;
    // delete adaptedFilm['user_details'].watchingDate;

    return adaptedComment;
  }
}
