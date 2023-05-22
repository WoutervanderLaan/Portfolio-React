import { createContext, useEffect, useReducer } from "react";

import { getResumeDocs } from "../../utils/firebase/firebase.utils";

export const ResumeContext = createContext(null);

const INITIAL_STATE = [];

const RESUME_ACTION_TYPES = {
  SET_RESUME_ITEMS: "SET_RESUME_ITEMS",
  ADD_RESUME_ITEM: "ADD_RESUME_ITEM",
  DELETE_RESUME_ITEM: "DELETE_RESUME_ITEM",
};

const resumeReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESUME_ACTION_TYPES.SET_RESUME_ITEMS: {
      return payload;
    }
    case RESUME_ACTION_TYPES.ADD_RESUME_ITEM: {
      return payload;
    }
    case RESUME_ACTION_TYPES.DELETE_RESUME_ITEM: {
      return payload;
    }
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const updateResumeState = async () => {
  try {
    const data = await getResumeDocs();
    if (data) return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const ResumeProvider = ({ children }) => {
  const [resumeItems, dispatch] = useReducer(resumeReducer, INITIAL_STATE);

  const setResumeItems = (items) => {
    dispatch({
      type: RESUME_ACTION_TYPES.SET_RESUME_ITEMS,
      payload: items,
    });
  };

  const addResumeItem = async () => {
    const data = await updateResumeState();
    dispatch({
      type: RESUME_ACTION_TYPES.ADD_RESUME_ITEM,
      payload: data,
    });
  };
  const removeResumeItems = async () => {
    const data = await updateResumeState();
    dispatch({
      type: RESUME_ACTION_TYPES.DELETE_RESUME_ITEM,
      payload: data,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await updateResumeState();
      setResumeItems(response);
    };
    fetchData();
  }, []);

  const selectMappedResumeItems = () => {
    const resumeMap = resumeItems.reduce((acc, cur) => {
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
    }, []);
    return resumeMap;
  };

  const value = {
    resumeItems,
    addResumeItem,
    removeResumeItems,
    selectMappedResumeItems,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
