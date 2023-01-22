import { getRandomArrayElement } from '../util/common';
import { EMOTIONS } from '../util/const.js';

const COMMENTS = [
  {
    id: '1',
    author: 'author 1',
    comment: 'comment 1',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '2',
    author: 'author 2',
    comment: 'comment 2',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '3',
    author: 'author 3',
    comment: 'comment 3',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '4',
    author: 'author 4',
    comment: 'comment 4',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '5',
    author: 'author 5',
    comment: 'comment 5',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '6',
    author: 'author 6',
    comment: 'comment 6',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '7',
    author: 'author 7',
    comment: 'comment 7',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '8',
    author: 'author 8',
    comment: 'comment 8',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '9',
    author: 'author 9',
    comment: 'comment 9',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '10',
    author: 'author 10',
    comment: 'comment 10',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '11',
    author: 'author 11',
    comment: 'comment 11',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '12',
    author: 'author 12',
    comment: 'comment 12',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '13',
    author: 'author 13',
    comment: 'comment 13',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '14',
    author: 'author 14',
    comment: 'comment 14',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '15',
    author: 'author 15',
    comment: 'comment 15',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '16',
    author: 'author 16',
    comment: 'comment 16',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '17',
    author: 'author 17',
    comment: 'comment 17',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '18',
    author: 'author 18',
    comment: 'comment 18',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '19',
    author: 'author 19',
    comment: 'comment 19',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '20',
    author: 'author 20',
    comment: 'comment 20',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '21',
    author: 'author 21',
    comment: 'comment 21',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '22',
    author: 'author 22',
    comment: 'comment 22',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '23',
    author: 'author 23',
    comment: 'comment 23',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '24',
    author: 'author 24',
    comment: 'comment 24',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '25',
    author: 'author 25',
    comment: 'comment 25',
    date: '2022-12-23T12:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '26',
    author: 'author 26',
    comment: 'comment 26',
    date: '2022-12-23T15:25:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '27',
    author: 'author 27',
    comment: 'comment 27',
    date: '2022-05-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  },
  {
    id: '28',
    author: 'author 28',
    comment: 'comment 28',
    date: '2022-12-11T16:12:32.554Z',
    emotion: getRandomEmotion(EMOTIONS),
  }
];

function getRandomEmotion(emotionsList) {
  return emotionsList[getRandomArrayElement( Object.keys(emotionsList) )];
}

function getCommentById(id) {
  return COMMENTS.find( (comment) => (comment[id] === id) );
}

export {getCommentById, COMMENTS};
