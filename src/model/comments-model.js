import { COMMENTS } from '../mock/comments-data.js';

export default class CommentsModel {
  comments = COMMENTS;

  getComments() {
    return this.comments;
  }
}
