import AbstractView from '../framework/view/abstract-view';
import {getCommentDate} from '../util/date-time.js';

function createPopupCommentTemplate(comment) {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
}

export default class PopupCommentView extends AbstractView {
  #comment = null;

  constructor({comment}) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createPopupCommentTemplate(this.#comment);
  }
}
