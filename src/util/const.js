const POSTERS = [
  '"images/posters/made-for-each-other.png"',
  '"images/posters/popeye-meets-sinbad.png"',
  '"images/posters/sagebrush-trail.jpg"',
  '"images/posters/santa-claus-conquers-the-martians.jpg"',
  '"images/posters/the-dance-of-life.jpg"',
  '"images/posters/the-great-flamarion.jpg"',
  '"images/posters/the-man-with-the-golden-arm.jpg"'
];

const Emotion = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const FilterType = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

const FILM_EXTRA_HEADER = {
  topRated: 'Top Rated',
  mostCommented: 'Most Commented',
};

const FILM_EXTRA_CARD_COUNT = {
  topRated: 2,
  mostCommented: 2,
};


export {POSTERS, Emotion, FilterType, SortType, Mode, FILM_EXTRA_HEADER, FILM_EXTRA_CARD_COUNT};
