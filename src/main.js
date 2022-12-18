import FooterStatisticView from './view/footer-statistic-view.js';
import {render} from './util/render.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterBarPresenter from './presenter/filters-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import FilmsModel from './model/films-model.js';

const page = document.querySelector('.page');
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();

const headerPresenter = new HeaderPresenter({
  container: pageHeader,
  filmsModel,
});
const filterBarPresenter = new FilterBarPresenter({
  container: pageMain,
  filmsModel,
});
const mainPresenter = new MainPresenter({
  container: pageMain,
  filmsModel,
});
const topRatedPresenter = new TopRatedPresenter({
  container: pageMain,
  filmsModel,
});
// const topCommentedPresenter = new MainPresenter({
//   container: pageMain,
//   filmsModel,
// });
// const popupPresenter = new PopupPresenter({container: page});

// render(new FooterStatisticView(), pageFooterStatistics);

headerPresenter.init();
filterBarPresenter.init();
mainPresenter.init();
topRatedPresenter.init();
// topCommentedPresenter.init();
// popupPresenter.init();
