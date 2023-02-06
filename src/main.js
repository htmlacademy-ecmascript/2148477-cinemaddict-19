import MainBoardPresenter from './presenter/main-board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './film-api-service.js';
import CommentsApiService from './comment-api-service.js';

const AUTHORIZATION = 'Basic KAHUKYJlbl';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict/';

const filmsModel = new FilmsModel({filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)});
const commentsModel = new CommentsModel({commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();

const mainBoardPresenter = new MainBoardPresenter({
  container: document.querySelector('.main'),
  filmsModel,
  commentsModel,
  filterModel,
});

mainBoardPresenter.init();
filmsModel.init();
