import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY';

function getReleaseYear(releaseDate) {
  return dayjs(releaseDate).format(DATE_FORMAT);
}

function getHoursMinutes(minutes) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export {getReleaseYear, getHoursMinutes};
