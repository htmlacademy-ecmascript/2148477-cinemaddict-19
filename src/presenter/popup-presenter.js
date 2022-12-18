import PopupFilmDetailsView from '../view/popup-film-details-view.js';
import PopupFilmDetailsCommentView from '../view/popup-film-details-comment-view.js';
import {render} from '../util/render.js';

const COMMENT_COUNT = 5;

export default class PopupPresenter {
  popupFilmDetailsComponent = new PopupFilmDetailsView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.popupFilmDetailsComponent, this.container);
    // renderElementMultipleCount(COMMENT_COUNT, PopupFilmDetailsCommentView, this.popupFilmDetailsComponent.getElement());
  }
}
