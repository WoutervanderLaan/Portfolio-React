import { createSelector } from "reselect";

import { formatText } from "../../utils/formatting.utils";

const selectAboutReducer = (state) => state.about;

export const selectRawAboutText = createSelector(
  [selectAboutReducer],
  (aboutReducer) => aboutReducer.aboutText
);

export const selectFormattedText = createSelector(
  [selectRawAboutText],
  (aboutText) => formatText(aboutText)
);
