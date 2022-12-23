import { COMMENTS } from '../mock/comments-data.js';

export default class CommentsModel {
  #comments = COMMENTS;

  get comments() {
    return this.#comments;
  }
}
