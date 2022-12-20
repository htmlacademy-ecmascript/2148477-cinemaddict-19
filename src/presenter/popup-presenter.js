import PopupView from '../view/popup-view.js';
import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupCommentContainerView from '../view/popup-comment-container-view.js';
import PopupCommentHeaderView from '../view/popup-comment-header-view.js';
import PopupCommentListView from '../view/popup-comment-list-view.js';
import PopupCommentNewView from '../view/popup-comment-new-view.js';
import PopupCommentView from '../view/popup-comment-view.js';
import { render } from '../util/render.js';

export default class PopupPresenter {
  popupComponent = new PopupView();
  popupCommentContainerComponent = new PopupCommentContainerView();
  popupCommentListComponent = new PopupCommentListView();

  constructor({container, filmsModel, commentsModel}) {
    this.container = container;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;
  }

  init() {
    this.filmCard = this.filmsModel.getFilms()[3];
    this.comments = this.commentsModel.getComments().filter(
      (comment) => this.filmCard.comments.includes(+comment.id)
    );

    render(this.popupComponent, this.container);
    render(new PopupFilmDetailsView({filmCard: this.filmCard}), this.popupComponent.getElement().firstElementChild);

    render(this.popupCommentContainerComponent, this.popupComponent.getElement().firstElementChild);
    render(new PopupCommentHeaderView({filmCard: this.filmCard}), this.popupCommentContainerComponent.getElement().firstElementChild);

    render(this.popupCommentListComponent, this.popupCommentContainerComponent.getElement().firstElementChild);
    for (const comment of this.comments) {
      render(new PopupCommentView({comment}), this.popupCommentListComponent.getElement());
    }

    render(new PopupCommentNewView(), this.popupCommentContainerComponent.getElement().firstElementChild);
  }
}
