import { createSlice } from "@reduxjs/toolkit";

const RESUME_INITIAL_STATE = {
  resumeItems: [],
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState: RESUME_INITIAL_STATE,
  reducers: {
    setResumeItems(state, action) {
      state.resumeItems = action.payload;
    },
  },
});

export const { setResumeItems } = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;
