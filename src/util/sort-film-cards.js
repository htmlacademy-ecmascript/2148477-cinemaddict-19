import dayjs from 'dayjs';

function sortTopRated (a, b) {
  return b.filmInfo.totalRating - a.filmInfo.totalRating;
}

function sortMostCommented (a, b) {
  return b.comments.length - a.comments.length;
}

function sortMainDate(filmCardA, filmCardB) {
  return dayjs(filmCardA.filmInfo.release.date).diff(dayjs(filmCardB.filmInfo.release.date));
}

function sortMainRating(filmCardA, filmCardB) {
  return filmCardB.filmInfo.totalRating - filmCardA.filmInfo.totalRating;
}

export {sortTopRated, sortMostCommented, sortMainDate, sortMainRating};
