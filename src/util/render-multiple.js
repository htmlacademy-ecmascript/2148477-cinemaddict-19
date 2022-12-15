import {render} from './render';

export const renderElementMultipleCount = (count, element, container) => {
  for (let i = 0; i < count; i++) {
    render(new element, container);
  }
};
