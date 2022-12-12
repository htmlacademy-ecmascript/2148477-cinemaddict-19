import UserProfileView from './view/user-profile-view.js';
import {render} from './util/render.js';

const pageHeader = document.querySelector('.header');

render(new UserProfileView(), pageHeader);
