function sortTopRated (a, b) {
  return b.filmInfo?.totalRating - a.filmInfo?.totalRating;
}

function sortMostCommented (a, b) {
  return b.comments?.length - a.comments?.length;
}

export {sortTopRated, sortMostCommented};
