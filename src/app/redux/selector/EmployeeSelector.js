import { createSelector } from "reselect";

export const selectorState = (state) => state;
export const selectorEmployee = createSelector(
  [selectorState],
  (state) => state.employee.employee
);

export const selectorRescode = createSelector(
  [selectorState],
  (state) => state.employee.resCode
);
