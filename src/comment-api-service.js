import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {
  async getComments(filmId) {
    const response = await this._load({ url: `comments/${filmId}` });
    return ApiService.parseResponse(response);
  }

  async addComment(comment, filmId) {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteComment(comment) {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(comment) {
    const adaptedComment = {
      ...comment,
    };

    delete adaptedComment.id;
    delete adaptedComment.author;
    delete adaptedComment.date;

    return adaptedComment;
  }
}
