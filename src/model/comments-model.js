import { getCommentsArr } from '../mock/comments-data.js';

export default class CommentsModel {
  comments = getCommentsArr();

  getComments() {
    return this.comments;
  }
}
