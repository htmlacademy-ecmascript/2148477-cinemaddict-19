import Observable from '../framework/observable.js';
import { UpdateType } from '../util/const.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];
  #filmCard = null;

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  async init(film) {
    this.#filmCard = film;

    try {
      const comments = await this.#commentsApiService.getComments(film.id);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  }

  async addComment(updateType, update) {
    try {
      const response = await this.#commentsApiService.addComment(update, this.#filmCard.id);
      this.#comments = response.comments.map((comment) => this.#adaptToClient(comment));
      this._notify(updateType, response.movie);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update, filmCard) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType, filmCard);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }

  #adaptToClient(comment) {
    const adaptedComment = {
      ...comment,
      date: comment.date !== null ? new Date(comment.date) : null,
    };
    return adaptedComment;
  }
}
