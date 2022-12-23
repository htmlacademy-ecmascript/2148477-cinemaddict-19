import FooterStatisticView from './view/footer-statistic-view.js';
import { render } from './util/render.js';

import HeaderPresenter from './presenter/header-presenter.js';
import FilterBarPresenter from './presenter/filters-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import TopRatedPresenter from './presenter/top-raterd-presenter.js';
import TopCommentedPresenter from './presenter/top-commented-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

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
  commentsModel,
});
const topRatedPresenter = new TopRatedPresenter({
  container: mainPresenter.filmWrapperComponent,
  filmsModel,
  commentsModel,
});
const topCommentedPresenter = new TopCommentedPresenter({
  container: mainPresenter.filmWrapperComponent,
  filmsModel,
});

render(new FooterStatisticView(), pageFooterStatistics);

headerPresenter.init();
filterBarPresenter.init();
mainPresenter.init();
topRatedPresenter.init();
topCommentedPresenter.init();
