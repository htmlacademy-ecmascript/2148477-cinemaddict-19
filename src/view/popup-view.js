import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const NULL_SCROLL = {
  scroll: 0,
};

function createPopupViewTemplate() {
  return `<section class="film-details">
            <div class="film-details__inner">
            </div>
          </section>`;
}

export default class PopupView extends AbstractStatefulView {
  constructor() {
    super();
    this._setState(PopupView.parseScrollToState(NULL_SCROLL));

    this._restoreHandlers();
  }

  get template() {
    return createPopupViewTemplate();
  }

  reset() {
    this.updateElement(
      PopupView.parseScrollToState(NULL_SCROLL),
    );
  }

  _restoreHandlers() {
    this.element.addEventListener('scroll', this.#scrollChangeHandler);
  }

  restoreScroll() {
    this.element.scrollTop = PopupView.parseStateToScroll(this._state).scroll;
  }

  #scrollChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      scroll: this.element.scrollTop,
    });
  };

  static parseScrollToState(scroll) {
    return {...scroll};
  }

  static parseStateToScroll(state) {
    const scroll = {...state};

    return scroll;
  }
}
