import PopupView from '../view/popup-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupCommentContainerView from '../view/popup-comment-container-view.js';
import PopupCommentHeaderView from '../view/popup-comment-header-view.js';
import PopupCommentListView from '../view/popup-comment-list-view.js';
import PopupCommentNewView from '../view/popup-comment-new-view.js';
import PopupCommentView from '../view/popup-comment-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PopupPresenter {
  #popupComponent = new PopupView();
  #popupCommentContainerComponent = new PopupCommentContainerView();
  #popupCommentListComponent = new PopupCommentListView();

  #container = null;
  #filmCard = null;
  #commentsModel = null;
  #handleWatchlistClick = null;
  #handleAlreadyWatchedClick = null;
  #handleFavoriteClick = null;
  #handlePopupRemoval = null;
  #mode = null;

  #popupFilmDetailsComponent = null;
  #popupCommentHeaderComponent = null;
  #popupCommentNewComponent = null;

  #comments = [];

  constructor({container, commentsModel, onWatchlistClick, onAlreadyWatchedClick, onFavoriteClick}) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
  }

  init({filmCard, onPopupRemove, mode}) {
    this.#filmCard = filmCard;
    this.#handlePopupRemoval = onPopupRemove;
    this.#mode = mode;

    this.#popupCommentHeaderComponent = new PopupCommentHeaderView({filmCard: this.#filmCard});
    this.#popupCommentNewComponent = new PopupCommentNewView();

    this.#popupFilmDetailsComponent = new PopupFilmDetailsView({
      filmCard: this.#filmCard,
      onXClick: this.removePopup,
      onWatchlistClick: this.#watchlistClickHandler,
      onAlreadyWatchedClick: this.#alreadyWatchedClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    // когда мы открываем попап во второй раз,
    // элемент не будет null.
    // надо привязываться к Mode

    if (this.#mode === 'DEFAULT') {
      this.#container.classList.add('hide-overflow');
      this.#container.addEventListener('keydown', this.#escKeyDownHandler);

      this.#comments = this.#commentsModel.comments.filter(
        (comment) => this.#filmCard.comments.includes(+comment.id)
      );

      render(this.#popupComponent, this.#container);

      render(this.#popupFilmDetailsComponent, this.#popupComponent.element.firstElementChild);

      render(this.#popupCommentContainerComponent, this.#popupComponent.element.firstElementChild);
      render(this.#popupCommentHeaderComponent, this.#popupCommentContainerComponent.element.firstElementChild);

      render(this.#popupCommentListComponent, this.#popupCommentContainerComponent.element.firstElementChild);
      for (const comment of this.#comments) {
        render(new PopupCommentView({comment}), this.#popupCommentListComponent.element);
      }

      render(this.#popupCommentNewComponent, this.#popupCommentContainerComponent.element.firstElementChild);
      // return;
    }

    // if (this.#mode === 'POPUP') {
    //   replace(this.#popupFilmDetailsComponent, this.#previousPopup.filmDetailsComponent);
    // }

    // remove(this.#previousPopup.filmDetailsComponent);
  }

  removePopup = () => {
    this.#container.classList.remove('hide-overflow');
    this.#container.removeEventListener('keydown', this.#escKeyDownHandler);

    remove(this.#popupCommentNewComponent);
    remove(this.#popupCommentListComponent);
    remove(this.#popupCommentHeaderComponent);
    remove(this.#popupCommentContainerComponent);
    remove(this.#popupFilmDetailsComponent);
    remove(this.#popupComponent);

    this.#handlePopupRemoval();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.code === 'Escape') {
      evt.preventDefault();
      this.removePopup();
    }
  };

  #watchlistClickHandler = () => {
    this.#handleWatchlistClick();
  };

  #alreadyWatchedClickHandler = () => {
    this.#handleAlreadyWatchedClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
