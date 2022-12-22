import PopupView from '../view/popup-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupCommentContainerView from '../view/popup-comment-container-view.js';
import PopupCommentHeaderView from '../view/popup-comment-header-view.js';
import PopupCommentListView from '../view/popup-comment-list-view.js';
import PopupCommentNewView from '../view/popup-comment-new-view.js';
import PopupCommentView from '../view/popup-comment-view.js';
import { render } from '../util/render.js';

export default class PopupPresenter {
  #popupComponent = new PopupView();
  #popupCommentContainerComponent = new PopupCommentContainerView();
  #popupCommentListComponent = new PopupCommentListView();

  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmCard = null;

  #comments = [];

  constructor({container, filmsModel, commentsModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#filmCard = this.#filmsModel.films[3];
    this.#comments = this.#commentsModel.comments.filter(
      (comment) => this.#filmCard.comments.includes(+comment.id)
    );

    render(this.#popupComponent, this.#container);
    render(new PopupFilmDetailsView({filmCard: this.#filmCard}), this.#popupComponent.element.firstElementChild);

    render(this.#popupCommentContainerComponent, this.#popupComponent.element.firstElementChild);
    render(new PopupCommentHeaderView({filmCard: this.#filmCard}), this.#popupCommentContainerComponent.element.firstElementChild);

    render(this.#popupCommentListComponent, this.#popupCommentContainerComponent.element.firstElementChild);
    for (const comment of this.#comments) {
      render(new PopupCommentView({comment}), this.#popupCommentListComponent.element);
    }

    render(new PopupCommentNewView(), this.#popupCommentContainerComponent.element.firstElementChild);
  }
}
