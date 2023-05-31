import { createSelector } from "reselect";

const selectAdminReducer = (state) => state.admin;

export const selectIsAdminLoggedIn = createSelector(
  [selectAdminReducer],
  (adminRecuder) => adminRecuder.isAdminLoggedIn
);

export const selectAdminRef = createSelector(
  [selectAdminReducer],
  (adminReducer) => adminReducer.adminRef
);
