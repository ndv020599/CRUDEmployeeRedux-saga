import { PROVINCES_ACTIONS_TYPE } from "../types/provinceType";

const INITIAL_STATE = {
  province: [],
  isError: false,
};
export const provinceReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROVINCES_ACTIONS_TYPE.GET_PROVINCES_SUCCESS:
      return {
        ...state,
        province: action.payload,
      };
    case PROVINCES_ACTIONS_TYPE.GET_PROVINCES_FAIL:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
