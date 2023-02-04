import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { Emotion } from '../util/const.js';

const NEW_COMMENT = {
  id: '',
  author: '',
  comment: '',
  date: null,
  emotion: '',
};

function createPopupCommentNewTemplate(comment) {
  return (
    `<form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label">
        ${comment.emotion ? `<img src="images/emoji/${comment.emotion}.png" alt="emoji-smile" width="55" height="55">` : ''}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment.comment}</textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile"${comment.emotion === Emotion.SMILE ? ' checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji ="smile">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping"${comment.emotion === Emotion.SLEEPING ? ' checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji ="sleeping">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke"${comment.emotion === Emotion.PUKE ? ' checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji ="puke">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry"${comment.emotion === Emotion.ANGRY ? ' checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emoji ="angry">
        </label>
      </div>
    </form>`
  );
}

export default class PopupCommentNewView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #keysPressed = {};

  constructor({comment = NEW_COMMENT, onFormSubmit}) {
    super();
    this._setState({...comment});
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createPopupCommentNewTemplate(this._state);
  }

  reset() {
    this.updateElement({...NEW_COMMENT});
  }

  _restoreHandlers() {
    document.addEventListener('keydown', this.#formSubmitHandler);

    document.addEventListener('keyup', (evt) => {
      delete this.#keysPressed[evt.key];
    });
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#chooseEmojiHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  }

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
    });
  };

  #formSubmitHandler = (evt) => {
    // evt.preventDefault();
    this.#keysPressed[evt.key] = true;
    if (this.#keysPressed['Control'] && evt.key === 'Enter') {
      if (this._state.comment !== '' && this._state.emotion !== '') {
        this.#handleFormSubmit(PopupCommentNewView.parseStateToComment(this._state));
      }
    }
  };

  #chooseEmojiHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emotion: evt.target.dataset.emoji,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };
}
