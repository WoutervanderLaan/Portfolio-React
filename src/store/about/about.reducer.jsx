import { createContext, useReducer, useEffect, Fragment } from "react";

import { getAboutDoc } from "../../utils/firebase/firebase.utils";

export const AboutContext = createContext(null);

export const ABOUT_ACTION_TYPES = {
  SET_ABOUT_TEXT: "SET_ABOUT_TEXT",
};

const INITIAL_STATE = {
  aboutText: "",
};

const aboutReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ABOUT_ACTION_TYPES.SET_ABOUT_TEXT: {
      return {
        ...state,
        aboutText: payload,
      };
    }
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const formatAboutText = (text) => {
  if (!text) return "";
  const formattedText = text.split(" <br> ").map((paragraph, index) => {
    return (
      <Fragment key={index}>
        <p>{paragraph}</p>
        <br />
      </Fragment>
    );
  });

  return formattedText;
};

export const AboutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(aboutReducer, INITIAL_STATE);

  const { aboutText } = state;
  const setAboutText = (text) => {
    dispatch({ type: ABOUT_ACTION_TYPES.SET_ABOUT_TEXT, payload: text });
  };

  useEffect(() => {
    const getText = async () => {
      try {
        const [{ text }] = await getAboutDoc();
        setAboutText(text);
      } catch (error) {
        console.log(error);
      }
    };
    getText();
  }, []);

  const selectFormattedText = formatAboutText(aboutText);

  const value = {
    aboutText,
    setAboutText,
    selectFormattedText,
  };

  return (
    <AboutContext.Provider value={value}>{children}</AboutContext.Provider>
  );
};
