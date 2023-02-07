import PopupView from '../view/popup-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupCommentContainerView from '../view/popup-comment-container-view.js';
import PopupCommentHeaderView from '../view/popup-comment-header-view.js';
import PopupCommentListView from '../view/popup-comment-list-view.js';
import PopupCommentNewView from '../view/popup-comment-new-view.js';
import PopupCommentView from '../view/popup-comment-view.js';
import PopupCommentLoadingView from '../view/popup-comment-loading-view.js';

import { render, remove } from '../framework/render.js';
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
  #mode = null;

  #filmsModel = null;

  #popupFilmDetailsComponent = null;
  #popupCommentHeaderComponent = null;
  #popupCommentNewComponent = null;
  #popupCommentLoadingComponent = null;

  #comments = [];
  #commentViews = [];

  #isLoading = true;

  constructor({filmsModel, commentsModel, container, onViewAction, onPopupRemove, mode}) {
    this.#container = container;
    this.#handleViewAction = onViewAction;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#handlePopupRemoval = onPopupRemove;
    this.#mode = mode;

    this.#popupCommentNewComponent = new PopupCommentNewView({onFormSubmit: this.#handleFormSubmit});

    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
    this.#commentsModel.addObserver(this.#filmsModel.handleCommentsModelChange);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init(filmCard) {
    this.#filmCard = filmCard;

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

    render(this.#popupComponent, this.#container);

    render(this.#popupFilmDetailsComponent, this.#popupComponent.element.firstElementChild);

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

    // render popup block

    if (this.#mode() === Mode.POPUP) {
      this.#popupComponent.restoreScroll();
    }
  }

  #renderLoading() {
    this.#popupCommentLoadingComponent = new PopupCommentLoadingView();
    render(this.#popupCommentLoadingComponent, this.#popupCommentContainerComponent.element.firstElementChild);
  }

  #handleFormSubmit = (comment) => {
    // const newCommentId = Math.round( Math.random() * 1000 );

    this.#handleViewAction(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      comment,
    );

    // this.#handleViewAction(
    //   UserAction.UPDATE_FILM_CARD,
    //   UpdateType.PATCH,
    //   {
    //     ...this.#filmCard,
    //     comments: [...this.#filmCard.comments, newCommentId],
    //   }
    // );
  };

  #handleDeleteClick = (comment) => {
    this.#handleViewAction(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      comment,
      this.#filmCard
    );

    // const index = this.#comments.findIndex((comm) => comm.id === comment.id);

    // this.#handleViewAction(
    //   UserAction.UPDATE_FILM_CARD,
    //   UpdateType.PATCH,
    //   {
    //     ...this.#filmCard,
    //     comments: [
    //       ...this.#filmCard.comments.slice(0, index),
    //       ...this.#filmCard.comments.slice(index + 1),
    //     ]
    //   }
    // );
  };

  #handleCommentsModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT) {
      this.#isLoading = false;
      remove(this.#popupCommentLoadingComponent);
    }

    this.earsePopup();
    this.init( this.#filmsModel.films.find( (element) => element.id === this.#filmCard.id ) );
  };

  #handleModelEvent = () => {
    if (this.#mode() === Mode.POPUP) {
      this.earsePopup();
      this.init( this.#filmsModel.films.find( (element) => element.id === this.#filmCard.id ) );
    }
  };

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
    this.#isLoading = true;
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
      }
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
      }
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
      }
    );
  };
}
