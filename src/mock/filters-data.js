import { filter } from '../util/film-card-filter.js';

function getFilterNameCount(films) {
  return Object.entries(filter).map(
    ([filterName, filterTasks]) => ({
      name: filterName,
      count: filterTasks(films).length,
    }),
  );
}

export {getFilterNameCount};
