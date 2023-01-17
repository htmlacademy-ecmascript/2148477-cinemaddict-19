import HeaderPresenter from './presenter/header-presenter.js';
import MainBoardPresenter from './presenter/main-board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FooterStatisticPresenter from './presenter/footer-statistic-presenter.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

const filmCardPresenterList = new Map();


const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const headerPresenter = new HeaderPresenter({
  container: pageHeader,
  filmsModel,
});
const mainBoardPresenter = new MainBoardPresenter({
  container: pageMain,
  filmsModel,
  commentsModel,
  filmCardPresenterList,
});
const footerStatisticPresenter = new FooterStatisticPresenter({
  container: pageFooterStatistics,
  filmsModel,
});

headerPresenter.init();
mainBoardPresenter.init();
footerStatisticPresenter.init();
