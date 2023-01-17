import MainBoardPresenter from './presenter/main-board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FooterStatisticPresenter from './presenter/footer-statistic-presenter.js';

const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const mainBoardPresenter = new MainBoardPresenter({
  container: pageMain,
  filmsModel,
  commentsModel,
});
const footerStatisticPresenter = new FooterStatisticPresenter({
  container: pageFooterStatistics,
  filmsModel,
});

mainBoardPresenter.init();
footerStatisticPresenter.init();
