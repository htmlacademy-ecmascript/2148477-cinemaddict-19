import Observable from '../framework/observable.js';
import { COMMENTS } from '../mock/comments-data.js';

export default class CommentsModel extends Observable {
  #comments = COMMENTS;

  get comments() {
    return this.#comments;
  }
}
