import FooterStatisticView from './view/footer-statistic-view.js';
import { render } from './util/render.js';
import { sortTopRated, sortMostCommented } from './util/sort-film-extra.js';

import HeaderPresenter from './presenter/header-presenter.js';
import FilterBarPresenter from './presenter/filters-presenter.js';
import MainBoardPresenter from './presenter/main-board-presenter.js';
import FilmExtraPresenter from './presenter/film-extra-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

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
const mainPresenter = new MainBoardPresenter({
  container: pageMain,
  filmsModel,
  commentsModel,
});
const topRatedPresenter = new FilmExtraPresenter({
  container: mainPresenter.filmWrapperComponent,
  filmsModel,
  commentsModel,
  filmExtraCardCount: FILM_EXTRA_CARD_COUNT.topRated,
  filmExtraHeader: FILM_EXTRA_HEADER.topRated,
  filmExtraSortCB: sortTopRated,
});
const mostCommentedPresenter = new FilmExtraPresenter({
  container: mainPresenter.filmWrapperComponent,
  filmsModel,
  commentsModel,
  filmExtraCardCount: FILM_EXTRA_CARD_COUNT.mostCommented,
  filmExtraHeader: FILM_EXTRA_HEADER.mostCommented,
  filmExtraSortCB: sortMostCommented,
});

render(new FooterStatisticView(), pageFooterStatistics);

headerPresenter.init();
filterBarPresenter.init();
mainPresenter.init();
topRatedPresenter.init();
mostCommentedPresenter.init();
