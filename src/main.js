import MainBoardPresenter from './presenter/main-board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FooterStatisticPresenter from './presenter/footer-statistic-presenter.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const mainBoardPresenter = new MainBoardPresenter({
  container: document.querySelector('.main'),
  filmsModel,
  commentsModel,
});
const footerStatisticPresenter = new FooterStatisticPresenter({
  container: document.querySelector('.footer__statistics'),
  filmsModel,
});

mainBoardPresenter.init();
footerStatisticPresenter.init();
