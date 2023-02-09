import PopupView from '../view/popup-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupFilmControlsView from '../view/popup-film-controls-view.js';
import PopupCommentContainerView from '../view/popup-comment-container-view.js';
import PopupCommentHeaderView from '../view/popup-comment-header-view.js';
import PopupCommentListView from '../view/popup-comment-list-view.js';
import PopupCommentNewView from '../view/popup-comment-new-view.js';
import PopupCommentView from '../view/popup-comment-view.js';
import PopupCommentLoadingView from '../view/popup-comment-loading-view.js';

import { render, remove, RenderPosition } from '../framework/render.js';
import { Mode } from '../util/const.js';
import { UserAction, UpdateType } from '../util/const.js';

export default class PopupPresenter {
  #popupComponent = new PopupView();
  #popupCommentContainerComponent = new PopupCommentContainerView();
  #popupCommentListComponent = new PopupCommentListView();

  #container = null;
  #filmCard = null;
  #commentsModel = null;
  #handleViewAction = null;
  #handlePopupRemoval = null;
  #getMode = null;

  #filmsModel = null;

  #popupFilmDetailsComponent = null;
  #popupFilmControlsComponent = null;
  #popupCommentHeaderComponent = null;
  #popupCommentNewComponent = null;
  #popupCommentLoadingComponent = null;

  #comments = [];
  #commentViews = [];

  #isLoading = true;

  constructor({filmsModel, commentsModel, container, onViewAction, onPopupRemove, getMode}) {
    this.#container = container;
    this.#handleViewAction = onViewAction;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#handlePopupRemoval = onPopupRemove;
    this.#getMode = getMode;

    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
    this.#commentsModel.addObserver(this.#filmsModel.handleCommentsModelChange);
    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
  }

  init(filmCard) {
    this.#filmCard = filmCard;

    this.#popupCommentHeaderComponent = new PopupCommentHeaderView({filmCard: this.#filmCard});

    this.#popupFilmDetailsComponent = new PopupFilmDetailsView({
      filmCard: this.#filmCard,
      onXClick: this.removePopup,
    });

    this.#popupFilmControlsComponent = new PopupFilmControlsView({
      filmCard: this.#filmCard,
      onWatchlistClick: this.#watchlistClickHandler,
      onAlreadyWatchedClick: this.#alreadyWatchedClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    if (!this.#popupCommentNewComponent) {
      this.#popupCommentNewComponent = new PopupCommentNewView({onFormSubmit: this.#handleFormSubmit});
    }

    this.#container.classList.add('hide-overflow');
    this.#container.addEventListener('keydown', this.#escKeyDownHandler);

    render(this.#popupComponent, this.#container);

    render(this.#popupFilmDetailsComponent, this.#popupComponent.element.firstElementChild);
    render(this.#popupFilmControlsComponent, this.#popupComponent.element.firstElementChild, RenderPosition.BEFOREEND);

    render(this.#popupCommentContainerComponent, this.#popupComponent.element.firstElementChild);
    render(this.#popupCommentHeaderComponent, this.#popupCommentContainerComponent.element.firstElementChild);

    if (this.#isLoading) {
      this.#renderLoading();
    } else {
      this.#comments = this.#commentsModel.comments.filter(
        (comment) => this.#filmCard.comments.includes(comment.id)
      );

      render(this.#popupCommentListComponent, this.#popupCommentContainerComponent.element.firstElementChild);
      for (const comment of this.#comments) {
        const commentView = new PopupCommentView({comment, onDeleteClick: this.#handleDeleteClick});
        render(commentView, this.#popupCommentListComponent.element);
        this.#commentViews.push(commentView);
      }
    }

    render(this.#popupCommentNewComponent, this.#popupCommentContainerComponent.element.firstElementChild);

    if (this.#getMode() === Mode.POPUP) {
      this.#popupComponent.restoreScroll();
    }
  }

  setAborting(actionType, comment) {
    if (actionType === UserAction.ADD_COMMENT) {
      this.#popupCommentNewComponent.shake(this.#popupCommentNewComponent.reset);
    } else if (actionType === UserAction.DELETE_COMMENT) {
      const shakingCommentView = this.#commentViews.find((commentView) => commentView.id === comment.id);

      const resetFormState = () => {
        shakingCommentView.updateElement({isDeleting: false,});
      };

      shakingCommentView.shake(resetFormState);
    } else if (actionType === UserAction.UPDATE_FILM_CARD) {
      this.#popupFilmControlsComponent.shake();
    }
  }

  setDisabled() {
    this.#popupCommentNewComponent.updateElement({
      isDisabled: true,
    });
  }

  setDeleting(commentComponent) {
    commentComponent.updateElement({
      isDeleting: true,
    });
  }

  earsePopup = () => {
    remove(this.#popupFilmDetailsComponent);
    remove(this.#popupFilmControlsComponent);
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
    this.#popupCommentNewComponent?.reset();

    remove(this.#popupFilmDetailsComponent);
    remove(this.#popupFilmControlsComponent);

    this.#handlePopupRemoval();
    this.#isLoading = true;
  };

  #renderLoading() {
    this.#popupCommentLoadingComponent = new PopupCommentLoadingView();
    render(this.#popupCommentLoadingComponent, this.#popupCommentContainerComponent.element.firstElementChild);
  }

  #handleCommentsModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT) {
      this.#isLoading = false;
      remove(this.#popupCommentLoadingComponent);
    }

    this.earsePopup();
    this.init( this.#filmsModel.films.find( (element) => element.id === this.#filmCard.id ) );
  };

  #handleFilmsModelEvent = () => {
    if (this.#getMode() === Mode.POPUP) {
      this.earsePopup();
      this.init( this.#filmsModel.films.find( (element) => element.id === this.#filmCard.id ) );
    }
  };

  #handleFormSubmit = (comment) => {
    this.setDisabled();

    this.#handleViewAction(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      comment,
    );
  };

  #handleDeleteClick = (comment, commentComponent) => {
    this.setDeleting(commentComponent);

    this.#handleViewAction(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      comment,
      this.#filmCard
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.code === 'Escape') {
      evt.preventDefault();
      this.removePopup();
    }
  };

  #watchlistClickHandler = () => {
    this.#handleViewAction(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          watchlist: !this.#filmCard.userDetails.watchlist
        }
      },
      this,
    );
  };

  #alreadyWatchedClickHandler = () => {
    this.#handleViewAction(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          alreadyWatched: !this.#filmCard.userDetails.alreadyWatched
        }
      },
      this,
    );
  };

  #favoriteClickHandler = () => {
    this.#handleViewAction(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          favorite: !this.#filmCard.userDetails.favorite
        }
      },
      this,
    );
  };
}
