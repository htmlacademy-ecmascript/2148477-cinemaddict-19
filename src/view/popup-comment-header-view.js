import AbstractView from '../framework/view/abstract-view';

function createPopupCommentHeaderTemplate(filmCard) {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>`;
}

export default class PopupCommentHeaderView extends AbstractView {
  #filmCard = null;

  constructor({filmCard}) {
    super();
    this.#filmCard = filmCard;
  }

  get template() {
    return createPopupCommentHeaderTemplate(this.#filmCard);
  }
}
