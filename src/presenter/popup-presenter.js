import PopupView from '../view/popup-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupCommentContainerView from '../view/popup-comment-container-view.js';
import PopupCommentHeaderView from '../view/popup-comment-header-view.js';
import PopupCommentListView from '../view/popup-comment-list-view.js';
import PopupCommentNewView from '../view/popup-comment-new-view.js';
import PopupCommentView from '../view/popup-comment-view.js';
import { render, remove } from '../framework/render.js';
import { Mode } from '../util/const.js';

export default class PopupPresenter {
  #popupComponent = new PopupView();
  #popupCommentContainerComponent = new PopupCommentContainerView();
  #popupCommentListComponent = new PopupCommentListView();
  #popupCommentNewComponent = new PopupCommentNewView({onFormSubmit: null});


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

  #comments = [];
  #commentViews = [];

  constructor({container, onWatchlistClick, onAlreadyWatchedClick, onFavoriteClick}) {
    this.#container = container;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
  }

  init({filmCard, commentsModel, onPopupRemove, mode}) {
    this.#filmCard = filmCard;
    this.#commentsModel = commentsModel;
    this.#handlePopupRemoval = onPopupRemove;
    this.#mode = mode;

    this.#popupCommentHeaderComponent = new PopupCommentHeaderView({filmCard: this.#filmCard});

    this.#popupFilmDetailsComponent = new PopupFilmDetailsView({
      filmCard: this.#filmCard,
      onXClick: this.removePopup,
      onWatchlistClick: this.#watchlistClickHandler,
      onAlreadyWatchedClick: this.#alreadyWatchedClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    // render popup block

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
      const commentView = new PopupCommentView({comment});
      render(commentView, this.#popupCommentListComponent.element);
      this.#commentViews.push(commentView);
    }

    render(this.#popupCommentNewComponent, this.#popupCommentContainerComponent.element.firstElementChild);

    // render popup block

    if (this.#mode === Mode.POPUP) {
      this.#popupComponent.restoreScroll();
    }
  }

  earsePopup = () => {
    remove(this.#popupFilmDetailsComponent);
    remove(this.#popupCommentHeaderComponent);
    this.#commentViews.forEach((commentView) => remove(commentView));

    this.#popupComponent.element.remove();
  };

  removePopup = () => {
    this.#container.classList.remove('hide-overflow');
    this.#container.removeEventListener('keydown', this.#escKeyDownHandler);

    remove(this.#popupComponent);
    this.#popupComponent.reset();

    remove(this.#popupCommentContainerComponent);
    remove(this.#popupCommentHeaderComponent);
    remove(this.#popupCommentListComponent);
    this.#commentViews.forEach((commentView) => remove(commentView));

    remove(this.#popupCommentNewComponent);
    this.#popupCommentNewComponent.reset();

    remove(this.#popupFilmDetailsComponent);

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
