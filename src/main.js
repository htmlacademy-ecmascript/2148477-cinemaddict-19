import { sortTopRated, sortMostCommented } from './util/sort-film-extra.js';

import HeaderPresenter from './presenter/header-presenter.js';
import MainBoardPresenter from './presenter/main-board-presenter.js';
import FilmExtraPresenter from './presenter/film-extra-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FooterStatisticPresenter from './presenter/footer-statistic-presenter.js';

const FILM_EXTRA_HEADER = {
  topRated: 'Top Rated',
  mostCommented: 'Most Commented',
};

const FILM_EXTRA_CARD_COUNT = {
  topRated: 2,
  mostCommented: 2,
};

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
const topRatedPresenter = new FilmExtraPresenter({
  mainBoardPresenter,
  filmsModel,
  commentsModel,
  filmExtraCardCount: FILM_EXTRA_CARD_COUNT.topRated,
  filmExtraHeader: FILM_EXTRA_HEADER.topRated,
  filmExtraSortCB: sortTopRated,
  filmCardPresenterList,
});
const mostCommentedPresenter = new FilmExtraPresenter({
  mainBoardPresenter,
  filmsModel,
  commentsModel,
  filmExtraCardCount: FILM_EXTRA_CARD_COUNT.mostCommented,
  filmExtraHeader: FILM_EXTRA_HEADER.mostCommented,
  filmExtraSortCB: sortMostCommented,
  filmCardPresenterList,
});
const footerStatisticPresenter = new FooterStatisticPresenter({
  container: pageFooterStatistics,
  filmsModel,
});

headerPresenter.init();
mainBoardPresenter.init();
topRatedPresenter.init();
mostCommentedPresenter.init();
footerStatisticPresenter.init();
