import dayjs from 'dayjs';

const DATE_FORMAT_YEAR = 'YYYY';
const DATE_FORMAT_FULL = 'DD MMMM YYYY';
const MILLISECONDS = new Map ([
  [[0, 300000], 'now'],
  [[300000, 3600000], 'few minutes ago'],
  [[3600000, 86400000], 'today'],
  [[86400000, 604800000], 'this week'],
  [[604800000, 2628002880], 'this month'],
  [[2628002880, 31536034560], 'this year'],
]);

function getReleaseYear(releaseDate) {
  return dayjs(releaseDate).format(DATE_FORMAT_YEAR);
}

function getReleaseDate(releaseDate) {
  return dayjs(releaseDate).format(DATE_FORMAT_FULL);
}

function getCommentDate(commentDate) {
  const commentDateMS = Date.now() - Date.parse(commentDate);
  let humanizedCommentDate = 'long time ago ...';

  MILLISECONDS.forEach((value, key) => {
    if (commentDateMS > key[0] && commentDateMS <= key[1]) {
      humanizedCommentDate = value;
    }
  });
  return humanizedCommentDate;
}

function getHoursMinutes(minutes) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export {getReleaseYear, getHoursMinutes, getReleaseDate, getCommentDate};
