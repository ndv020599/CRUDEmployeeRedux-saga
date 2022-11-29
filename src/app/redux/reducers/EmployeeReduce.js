import { EMPLOYEE_ACTION_TYPE } from "../types/EmployeeType";
import { toast } from "react-toastify";
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});
const INITIAL_STATE = {
  isError: false,
  employee: [],
  addSuccess: "",
  deleteSuccess: "",
  resCode: {},
  resMess: null,
};
export const employeeReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload,
        resCode: {},
      };
    case EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_FAIL:
      return {
        ...state,
        isError: true,
      };
    case EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_SUCCESS:
      if (action.payload.code === 200) {
        toast.success(`Thêm ${action.payload.message}`);
      } else {
        toast.warning(action.payload.message);
      }
      return {
        ...state,
        addSuccess: action.payload,
        resCode: action.payload,
        resMess: action.payload.message,
      };
    case EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_FAIL:
      return {
        ...state,
        isError: true,
      };
    case EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_SUCCESS:
      if (action.payload.code === 200) {
        toast.success(`Xóa ${action.payload.message}`);
      } else {
        toast.warning(action.payload.message);
      }
      return {
        ...state,
        deleteSuccess: action.payload,
      };
    case EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_FAIL:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
    case EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_SUCCESS:
      if (action.payload.code === 200) {
        toast.success(`Sửa ${action.payload.message}`);
      } else {
        toast.warning(action.payload.message);
      }
      return {
        ...state,
        addSuccess: action.payload,
        resCode: action.payload,
      };
    case EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        isError: true,
      };
  }
};
