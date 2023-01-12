import {getRandomArrayElement} from '../util/random-array-element.js';
import {POSTERS} from '../util/const.js';

const FILMS = [
  {
    id: '0',
    comments: [1],
    filmInfo: {
      title: 'title 1',
      alternativeTitle: 'alt title 1',
      totalRating: 9.1,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'director 1',
      writers: [
        'writer 1-1',
        'writer 1-2'
      ],
      actors: [
        'actor 1-1',
        'actor 1-2'
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'country 1'
      },
      duration: 131,
      genre: [
        'genre 1-1',
        'genre 1-2'
      ],
      description: 'description 1 >140 letters oo ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc ccccccccccc'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  },
  {
    id: '1',
    comments: [2, 3],
    filmInfo: {
      title: 'title 2',
      alternativeTitle: 'alt title 2',
      totalRating: 6.2,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 1,
      director: 'director 2',
      writers: [
        'writer 2-1',
        'writer 2-2'
      ],
      actors: [
        'actor 2-1',
        'actor 2-2'
      ],
      release: {
        date: '2018-05-11T00:00:00.000Z',
        releaseCountry: 'country 2'
      },
      duration: 72,
      genre: [
        'genre 2-1',
        'genre 2-2'
      ],
      description: 'description 2'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  },
  {
    id: '2',
    comments: [4, 5, 6],
    filmInfo: {
      title: 'title 3',
      alternativeTitle: 'alt title 3',
      totalRating: 5.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 2,
      director: 'director 3',
      writers: [
        'writer 3-1',
        'writer 3-2'
      ],
      actors: [
        'actor 3-1',
        'actor 3-2'
      ],
      release: {
        date: '2017-05-11T00:00:00.000Z',
        releaseCountry: 'country 3'
      },
      duration: 253,
      genre: [
        'genre 3-1',
        'genre 3-2'
      ],
      description: 'description 3'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: true
    }
  },
  {
    id: '3',
    comments: [7, 8, 9, 10],
    filmInfo: {
      title: 'title 4',
      alternativeTitle: 'alt title 4',
      totalRating: 5.4,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 3,
      director: 'director 4',
      writers: [
        'writer 4-1',
        'writer 4-2'
      ],
      actors: [
        'actor 4-1',
        'actor 4-2'
      ],
      release: {
        date: '2016-05-11T00:00:00.000Z',
        releaseCountry: 'country 4'
      },
      duration: 74,
      genre: [
        'genre 4-1',
        'genre 4-2'
      ],
      description: 'description 4'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  },
  {
    id: '4',
    comments: [11, 12, 13, 14, 15],
    filmInfo: {
      title: 'title 5',
      alternativeTitle: 'alt title 5',
      totalRating: 5.5,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 4,
      director: 'director 5',
      writers: [
        'writer 5-1',
        'writer 5-2'
      ],
      actors: [
        'actor 5-1',
        'actor 5-2'
      ],
      release: {
        date: '2015-05-11T00:00:00.000Z',
        releaseCountry: 'country 5'
      },
      duration: 75,
      genre: [
        'genre 5-1',
        'genre 5-2'
      ],
      description: 'description 5 >140 letters oo ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: true
    }
  },
  {
    id: '5',
    comments: [16, 17, 18, 19, 20, 21],
    filmInfo: {
      title: 'title 6',
      alternativeTitle: 'alt title 6',
      totalRating: 5.6,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 5,
      director: 'director 6',
      writers: [
        'writer 6-1',
        'writer 6-2'
      ],
      actors: [
        'actor 6-1',
        'actor 6-2'
      ],
      release: {
        date: '2014-05-11T00:00:00.000Z',
        releaseCountry: 'country 6'
      },
      duration: 76,
      genre: [
        'genre 6-1',
        'genre 6-2'
      ],
      description: 'description 6'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  },
  {
    id: '6',
    comments: [22, 23, 24, 25, 26, 27, 28],
    filmInfo: {
      title: 'title 7',
      alternativeTitle: 'alt title 7',
      totalRating: 5.7,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 6,
      director: 'director 7',
      writers: [
        'writer 7-1',
        'writer 7-2'
      ],
      actors: [
        'actor 7-1',
        'actor 7-2'
      ],
      release: {
        date: '2013-05-11T00:00:00.000Z',
        releaseCountry: 'country 7'
      },
      duration: 77,
      genre: [
        'genre 7-1',
        'genre 7-2'
      ],
      description: 'description 7 >140 letters oo ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc ccccccccc'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: true
    }
  }
];

function getRandomFilmData() {
  return getRandomArrayElement(FILMS);
}

export {getRandomFilmData};
