import { createSelector } from "reselect";

const selectPortfolioReducer = (state) => state.portfolio;

export const selectRawPortfolioItems = createSelector(
  [selectPortfolioReducer],
  (portfolio) => portfolio.portfolioItems
);

export const selectPortfolioSeries = createSelector(
  [selectRawPortfolioItems],
  (portfolioItems) => {
    const seriesArray = portfolioItems.map((item) => item.series);
    const seriesSet = new Set(seriesArray);
    return Array(...seriesSet);
  }
);

export const selectMappedPortfolioItems = createSelector(
  [selectRawPortfolioItems],
  (portfolioItems) =>
    portfolioItems.reduce((acc, cur) => {
      // check if series exists
      const existingSeries = acc.find((item) => item.series === cur.series);

      // if no series exists, make new series and put associated image into array that will be filled with subsequent images with corresponding series name.
      if (!existingSeries) {
        const itemWithImageToArray = { ...cur, image: [cur.image] };
        return [...acc, itemWithImageToArray];
      }
      // if series exists, each element (series category) in acc is checked to find corresponding series;
      if (existingSeries) {
        const updatedArray = acc.map((item) => {
          //data (title, material, etc.) is updated if left empty by earlier editions in series;
          if (item === existingSeries) {
            const titleAndYear = item.titleAndYear
              ? item.titleAndYear
              : cur.titleAndYear;
            const material = item.material ? item.material : cur.material;
            const dimensions = item.dimensions
              ? item.dimensions
              : cur.dimensions;
            const description = item.description
              ? item.description
              : cur.description;
            // new image is added to series image array;
            return {
              ...item,
              titleAndYear,
              material,
              dimensions,
              description,
              image: [...item.image, cur.image],
            };
          }
          //non-corresponding series are simply returned as is.
          return item;
        });
        // new map is returned with updated series
        return updatedArray;
      }
    }, [])
);
