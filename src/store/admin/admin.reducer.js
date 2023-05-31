// import { createContext, useReducer } from "react";

import { createSlice } from "@reduxjs/toolkit";

const ADMIN_INITIAL_STATE = {
  isAdminLoggedIn: false,
  adminRef: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: ADMIN_INITIAL_STATE,
  reducers: {
    logInAdmin(state, action) {
      state.isAdminLoggedIn = true;
      state.adminRef = action.payload;
    },
    logOutAdmin(state) {
      state.isAdminLoggedIn = false;
      state.adminRef = null;
    },
  },
});

export const { logInAdmin, logOutAdmin } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
