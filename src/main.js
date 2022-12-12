import UserProfileView from './view/user-profile-view.js';
import FilterBarView from './view/filters-bar-view.js';
import FilmWrapperView from './view/film-wrapper-view.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import {render} from './util/render.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

render(new UserProfileView(), pageHeader);
render(new FilterBarView(), pageMain);
render(new FilmWrapperView(), pageMain);
render(new FooterStatisticView(), pageFooterStatistics);
