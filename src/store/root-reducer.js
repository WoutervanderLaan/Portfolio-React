import { combineReducers } from "@reduxjs/toolkit";

import { aboutReducer } from "./about/about.reducer";
import { adminReducer } from "./admin/admin.reducer";
import { resumeReducer } from "./resume/resume.reducer";
import { portfolioReducer } from "./portfolio/portfolio.reducer";

export const rootReducer = combineReducers({
  resume: resumeReducer,
  portfolio: portfolioReducer,
  about: aboutReducer,
  admin: adminReducer,
});
