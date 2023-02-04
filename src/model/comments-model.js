import Observable from '../framework/observable.js';
import { COMMENTS } from '../mock/comments-data.js';

export default class CommentsModel extends Observable {
  #comments = COMMENTS;

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments.push(update);

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
