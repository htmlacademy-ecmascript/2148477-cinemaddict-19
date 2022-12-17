import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY';

function getReleaseYear(releaseDate) {
  return releaseDate ? dayjs(releaseDate).format(DATE_FORMAT) : '';
}

function getHoursMinutes(minutes) {
  return minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : '';
}

export {getReleaseYear, getHoursMinutes};
