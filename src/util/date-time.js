import dayjs from 'dayjs';

const DATE_FORMAT_YEAR = 'YYYY';
const DATE_FORMAT_FULL = 'DD MMMM YYYY';
const DATE_FORMAT_WITH_HOURS = 'YYYY/MM/DD HH:mm';

function getReleaseYear(releaseDate) {
  return dayjs(releaseDate).format(DATE_FORMAT_YEAR);
}

function getReleaseDate(releaseDate) {
  return dayjs(releaseDate).format(DATE_FORMAT_FULL);
}

function getCommentDate(commentDate) {
  return dayjs(commentDate).format(DATE_FORMAT_WITH_HOURS);
}

function getHoursMinutes(minutes) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export {getReleaseYear, getHoursMinutes, getReleaseDate, getCommentDate};
