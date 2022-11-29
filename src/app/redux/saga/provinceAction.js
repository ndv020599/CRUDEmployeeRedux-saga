import { all, call, put, takeLatest } from "redux-saga/effects";
import { getProvince } from "../API/ProvinceApi";
import { PROVINCES_ACTIONS_TYPE } from "../types/provinceType";

function* watchGetAllProvinces() {
  try {
    const result = yield call(async () => {
      return await getProvince();
    });
    if (result) {
      yield put({
        type: PROVINCES_ACTIONS_TYPE.GET_PROVINCES_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    yield put({
      type: PROVINCES_ACTIONS_TYPE.GET_PROVINCES_FAIL,
      payload: error.response.message,
    });
  }
}

function* actionProvince() {
  yield all([
    yield takeLatest(
      PROVINCES_ACTIONS_TYPE.GET_ALL_PROVINCES,
      watchGetAllProvinces
    ),
  ]);
}

export default actionProvince;
