import { all, call, put, takeLatest } from "redux-saga/effects";
import { EMPLOYEE_ACTION_TYPE } from "../types/EmployeeType";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
} from "../API/EmployeeApi";

function* watchGetAllEmployee() {
  try {
    const result = yield call(async () => {
      return await getAllEmployee();
    });
    // console.log("aaaaaaaaaaaaa", result);

    if (result) {
      yield put({
        type: EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    yield put({
      type: EMPLOYEE_ACTION_TYPE.GET_EMPLOYEE_FAIL,
      payload: error.response.message,
    });
  }
}

function* watchEditorEmployee(action) {
  if (!action.data.id) {
    try {
      const result = yield call(async () => {
        return await addEmployee(action.data);
      });
      // console.log("âcsvsdvsdv", result);
      // console.log("âcsvsdvsdv", result.code);

      if (result) {
        yield put({
          type: EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_SUCCESS,
          payload: result,
        });
        yield put({
          type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
        });
      }
    } catch (error) {
      yield put({
        type: EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE_FAIL,
        payload: error.response.message,
      });
    }
  } else {
    try {
      const result = yield call(async () => {
        return await updateEmployee(action.data, action.id);
      });
      if (result) {
        yield put({
          type: EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_SUCCESS,
          payload: result,
        });
      }
      yield put({
        type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
      });
    } catch (error) {
      yield put({
        type: EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE_FAIL,
        payload: error.response.message,
      });
    }
  }
}

function* watchDeleteEmployee(action) {
  try {
    const result = yield call(async () => {
      return await deleteEmployee(action.id);
    });
    if (result) {
      yield put({
        type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_SUCCESS,
        payload: result,
      });
      yield put({
        type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
      });
    }
  } catch (error) {
    yield put({
      type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE_FAIL,
      payload: error.response.message,
    });
  }
}

function* actionEmployee() {
  yield all([
    yield takeLatest(
      EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE,
      watchGetAllEmployee
    ),
    yield takeLatest(EMPLOYEE_ACTION_TYPE.EDITOR_EMPLOYEE, watchEditorEmployee),
    yield takeLatest(EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE, watchDeleteEmployee),
  ]);
}

export default actionEmployee;
