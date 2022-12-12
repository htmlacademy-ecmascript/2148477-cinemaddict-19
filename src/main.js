import UserProfileView from './view/user-profile-view.js';
import FilterBarView from './view/filters-bar-view.js';
import {render} from './util/render.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');

render(new UserProfileView(), pageHeader);
render(new FilterBarView(), pageMain);
