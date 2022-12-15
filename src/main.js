import FooterStatisticView from './view/footer-statistic-view.js';
import {render} from './util/render.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';

const page = document.querySelector('.page');
const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

const headerPresenter = new HeaderPresenter({container: pageHeader});
const mainPresenter = new MainPresenter({container: pageMain});
const popupPresenter = new PopupPresenter({container: page});
render(new FooterStatisticView(), pageFooterStatistics);

headerPresenter.init();
mainPresenter.init();
popupPresenter.init();
