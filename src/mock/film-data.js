import {getRandomArrayElement} from '../util/random-array-element.js';
import {POSTERS} from '../const.js';

const films = [
  {
    'id': '0',
    'comments': [1],
    'film_info': {
      'title': 'title 1',
      'alternative_title': 'alt title 1',
      'total_rating': 5.1,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 0,
      'director': 'director 1',
      'writers': [
        'writer 1-1',
        'writer 1-2'
      ],
      'actors': [
        'actor 1-1',
        'actor 1-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 1'
      },
      'duration': 71,
      'genre': [
        'genre 1-1',
        'genre 1-2'
      ],
      'description': 'description 1'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': '1',
    'comments': [2, 3],
    'film_info': {
      'title': 'title 2',
      'alternative_title': 'alt title 2',
      'total_rating': 5.2,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 1,
      'director': 'director 2',
      'writers': [
        'writer 2-1',
        'writer 2-2'
      ],
      'actors': [
        'actor 2-1',
        'actor 2-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 2'
      },
      'duration': 71,
      'genre': [
        'genre 2-1',
        'genre 2-2'
      ],
      'description': 'description 1'
    },
    'user_details': {
      'watchlist': true,
      'already_watched': false,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': '2',
    'comments': [4, 5, 6],
    'film_info': {
      'title': 'title 3',
      'alternative_title': 'alt title 3',
      'total_rating': 5.3,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 2,
      'director': 'director 3',
      'writers': [
        'writer 3-1',
        'writer 3-2'
      ],
      'actors': [
        'actor 3-1',
        'actor 3-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 3'
      },
      'duration': 73,
      'genre': [
        'genre 3-1',
        'genre 3-2'
      ],
      'description': 'description 3'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': false,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': '3',
    'comments': [7, 8, 9, 10],
    'film_info': {
      'title': 'title 4',
      'alternative_title': 'alt title 4',
      'total_rating': 5.4,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 3,
      'director': 'director 4',
      'writers': [
        'writer 4-1',
        'writer 4-2'
      ],
      'actors': [
        'actor 4-1',
        'actor 4-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 4'
      },
      'duration': 74,
      'genre': [
        'genre 4-1',
        'genre 4-2'
      ],
      'description': 'description 1'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': false,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': '4',
    'comments': [11, 12, 13, 14, 15],
    'film_info': {
      'title': 'title 5',
      'alternative_title': 'alt title 5',
      'total_rating': 5.5,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 4,
      'director': 'director 5',
      'writers': [
        'writer 5-1',
        'writer 5-2'
      ],
      'actors': [
        'actor 5-1',
        'actor 5-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 5'
      },
      'duration': 75,
      'genre': [
        'genre 5-1',
        'genre 5-2'
      ],
      'description': 'description 5'
    },
    'user_details': {
      'watchlist': true,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': '5',
    'comments': [16, 17, 18, 19, 20, 21],
    'film_info': {
      'title': 'title 6',
      'alternative_title': 'alt title 6',
      'total_rating': 5.6,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 5,
      'director': 'director 6',
      'writers': [
        'writer 6-1',
        'writer 6-2'
      ],
      'actors': [
        'actor 6-1',
        'actor 6-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 6'
      },
      'duration': 76,
      'genre': [
        'genre 6-1',
        'genre 6-2'
      ],
      'description': 'description 6'
    },
    'user_details': {
      'watchlist': true,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': '6',
    'comments': [22, 23, 24, 25, 26, 27, 28],
    'film_info': {
      'title': 'title 7',
      'alternative_title': 'alt title 7',
      'total_rating': 5.7,
      'poster': getRandomArrayElement(POSTERS),
      'age_rating': 6,
      'director': 'director 7',
      'writers': [
        'writer 7-1',
        'writer 7-2'
      ],
      'actors': [
        'actor 7-1',
        'actor 7-2'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'country 7'
      },
      'duration': 77,
      'genre': [
        'genre 7-1',
        'genre 7-2'
      ],
      'description': 'description 7'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
];

function getRandomFilmData() {
  return getRandomArrayElement(films);
}

export {getRandomFilmData};
