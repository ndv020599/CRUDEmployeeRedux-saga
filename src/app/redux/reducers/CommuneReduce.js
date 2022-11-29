import { COMMNUNE_ACTION_TYPE } from "../types/communeType";

const INITIAL_STATE = {
  communes: [],
  isError: false,
};

export const communeReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMNUNE_ACTION_TYPE.GET_COMMUNE_SUCCESS:
      return {
        ...state,
        communes: action.payload,
      };
    case COMMNUNE_ACTION_TYPE.GET_COMMUNE_FAIL:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
