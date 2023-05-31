import { createSelector } from "reselect";

const selectResumeReducer = (state) => state.resume;

export const selectRawResumeData = createSelector(
  [selectResumeReducer],
  (resumeItems) => resumeItems.resumeItems
);

export const selectMappedResumeItems = createSelector(
  [selectRawResumeData],
  (resumeItems) =>
    resumeItems.reduce((acc, cur) => {
      const checkExistingCategory = acc.find(
        (category) => category.category === cur.category
      );
      if (!checkExistingCategory) {
        const formattedCurObject = {
          category: cur.category,
          items: [
            {
              startDate: cur.startDate,
              endDate: cur.endDate,
              name: cur.name,
              id: cur.id,
            },
          ],
        };
        return [...acc, formattedCurObject];
      }
      if (checkExistingCategory) {
        const formattedCurObject = {
          startDate: cur.startDate,
          endDate: cur.endDate,
          name: cur.name,
          id: cur.id,
        };
        const updatedCategoryItem = {
          ...checkExistingCategory,
          items: [...checkExistingCategory.items, formattedCurObject],
        };
        const updatedArray = acc.map((category) => {
          if (category.category === updatedCategoryItem.category)
            return updatedCategoryItem;
          return category;
        });
        return updatedArray;
      }
    }, [])
);

export const selectOrderedResumeItemsMap = createSelector(
  [selectMappedResumeItems],
  (resumeItems) =>
    resumeItems.map((item) => {
      switch (item.category) {
        case "Education & Residencies":
          return {
            ...item,
            position: 1,
          };
        case "Exhibitions":
          return {
            ...item,
            position: 2,
          };
        case "Prizes, Grants & Nominations":
          return {
            ...item,
            position: 3,
          };
        case "Publications":
          return {
            ...item,
            position: 4,
          };
        case "Other":
          return {
            ...item,
            position: 5,
          };
        default:
          return item;
      }
    })
);
