import {createElement} from '../util/render.js';

function createFooterStatisticTemplate() {
  return '<p>130 291 movies inside</p>';
}

export default class FooterStatisticView {
  getTemplate() {
    return createFooterStatisticTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
