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

  #state = {};
  #scrollTop = null;

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

    if (this.#mode === Mode.DEFAULT) {
      this.#resetState();
    }

    this.#popupCommentHeaderComponent = new PopupCommentHeaderView({filmCard: this.#filmCard});
    this.#popupCommentNewComponent = new PopupCommentNewView({comment: this.#state, onStateCange: this.#onStateChange});

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
      render(new PopupCommentView({comment}), this.#popupCommentListComponent.element);
    }

    render(this.#popupCommentNewComponent, this.#popupCommentContainerComponent.element.firstElementChild);

    // render popup block

    if (this.#mode === Mode.POPUP) {
      this.#popupComponent.element.scrollTop = this.#scrollTop;
    }
  }

  // popup state block

  #onStateChange = (newState) => {
    this.#state = newState;
  };

  #resetState = () => {
    this.#state = {
      id: '',
      author: '',
      comment: '',
      date: null,
      emotion: '',
    };
  };

  get popupScroll() {
    return this.#scrollTop;
  }

  set popupScroll(value) {
    this.#scrollTop = value;
  }

  // popup state block

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
    this.popupScroll = this.#popupComponent.element.scrollTop;
    this.#handleWatchlistClick();
  };

  #alreadyWatchedClickHandler = () => {
    this.popupScroll = this.#popupComponent.element.scrollTop;
    this.#handleAlreadyWatchedClick();
  };

  #favoriteClickHandler = () => {
    this.popupScroll = this.#popupComponent.element.scrollTop;
    this.#handleFavoriteClick();
  };
}
