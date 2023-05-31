import { createSlice } from "@reduxjs/toolkit";

const PORTFOLIO_INITIAL_STATE = {
  portfolioItems: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: PORTFOLIO_INITIAL_STATE,
  reducers: {
    setPortfolioItems(state, action) {
      state.portfolioItems = action.payload;
    },
    addPortfolioItem(state, action) {
      state.portfolioItems = [...state.portfolioItems, action.payload];
    },
    deletePortfolioItems(state, action) {
      state.portfolioItems = action.payload;
    },
    deletePortfolioSeries(state, action) {
      state.portfolioItems = action.payload;
    },
    organisePortfolioSeries(state, action) {
      state.portfolioItems = action.payload;
    },
  },
});

export const { setPortfolioItems, addPortfolioItem } = portfolioSlice.actions;

export const portfolioReducer = portfolioSlice.reducer;
