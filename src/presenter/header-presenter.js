import UserProfileView from '../view/user-profile-view';
import {render} from '../util/render.js';

export default class HeaderPresenter {
  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new UserProfileView, this.container);
  }
}
