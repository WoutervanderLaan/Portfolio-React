import { createSlice } from "@reduxjs/toolkit";

const ABOUT_INITIAL_STATE = {
  aboutText: "",
};

export const aboutSlice = createSlice({
  name: "about",
  initialState: ABOUT_INITIAL_STATE,
  reducers: {
    setAboutText(state, action) {
      state.aboutText = action.payload;
    },
  },
});

export const { setAboutText } = aboutSlice.actions;

export const aboutReducer = aboutSlice.reducer;
