import { DISTRICT_ACTION_TYPE } from "../types/districtType";

let INITIAL_STATE = {
  isError: false,
  district: [],
};

export const districtReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISTRICT_ACTION_TYPE.GET_DISTRICT_SUCCESS:
      return {
        ...state,
        district: action.payload,
      };
    case DISTRICT_ACTION_TYPE.GET_DISTRICT_FAIL:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
