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
  #filmCard = null;
  #commentsModel = null;
  #popupFilmDetailsComponent = null;
  #popupCommentHeaderComponent = null;
  #popupCommentNewComponent = null;

  #comments = [];

  constructor({container, filmCard, commentsModel}) {
    this.#container = container;
    this.#filmCard = filmCard;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#popupFilmDetailsComponent = new PopupFilmDetailsView({filmCard: this.#filmCard});
    this.#popupCommentHeaderComponent = new PopupCommentHeaderView({filmCard: this.#filmCard});
    this.#popupCommentNewComponent = new PopupCommentNewView();

    const removePopup = () => {
      this.#container.classList.remove('hide-overflow');
      this.#container.removeEventListener('keydown', escKeyDownHandler);

      this.#container.removeChild(this.#popupComponent.element);

      this.#popupComponent.removeElement();
      this.#popupFilmDetailsComponent.removeElement();
      this.#popupCommentContainerComponent.removeElement();
      this.#popupCommentHeaderComponent.removeElement();
      this.#popupCommentListComponent.removeElement();
      this.#popupCommentNewComponent.removeElement();
    };

    function escKeyDownHandler (evt) {
      if (evt.code === 'Escape') {
        evt.preventDefault();
        removePopup();
      }
    }

    this.#container.classList.add('hide-overflow');
    this.#container.addEventListener('keydown', escKeyDownHandler);

    this.#comments = this.#commentsModel.comments.filter(
      (comment) => this.#filmCard.comments.includes(+comment.id)
    );

    render(this.#popupComponent, this.#container);

    render(this.#popupFilmDetailsComponent, this.#popupComponent.element.firstElementChild);
    this.#popupFilmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      removePopup();
    });

    render(this.#popupCommentContainerComponent, this.#popupComponent.element.firstElementChild);
    render(this.#popupCommentHeaderComponent, this.#popupCommentContainerComponent.element.firstElementChild);

    render(this.#popupCommentListComponent, this.#popupCommentContainerComponent.element.firstElementChild);
    for (const comment of this.#comments) {
      render(new PopupCommentView({comment}), this.#popupCommentListComponent.element);
    }

    render(this.#popupCommentNewComponent, this.#popupCommentContainerComponent.element.firstElementChild);
  }
}
