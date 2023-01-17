import dayjs from 'dayjs';

function sortTopRated (a, b) {
  return b.filmInfo?.totalRating - a.filmInfo?.totalRating;
}

function sortMostCommented (a, b) {
  return b.comments?.length - a.comments?.length;
}

function getWeightForNullData(dataA, dataB) {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
}

function sortMainDate(filmCardA, filmCardB) {
  const weight = getWeightForNullData(filmCardA.filmInfo.release.date, filmCardB.filmInfo.release.date);

  return weight ?? dayjs(filmCardA.filmInfo.release.date).diff(dayjs(filmCardB.filmInfo.release.date));
}

function sortMainRating(filmCardA, filmCardB) {
  const weight = getWeightForNullData(filmCardA.filmInfo.totalRating, filmCardB.filmInfo.totalRating);

  return weight ?? (filmCardB.filmInfo.totalRating - filmCardA.filmInfo.totalRating);
}

export {sortTopRated, sortMostCommented, sortMainDate, sortMainRating};
