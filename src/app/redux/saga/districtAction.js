import { put, call, takeLatest, all } from "redux-saga/effects";
import { getDistrict } from "../API/districtApi";
import { DISTRICT_ACTION_TYPE } from "../types/districtType";

function* watchGetAllDistrict() {
  try {
    const result = yield call(async () => {
      return await getDistrict();
    });
    if (result) {
      yield put({
        type: DISTRICT_ACTION_TYPE.GET_DISTRICT_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    yield put({
      type: DISTRICT_ACTION_TYPE.GET_DISTRICT_FAIL,
      payload: error.response.message,
    });
  }
}

function* actionDistrict() {
  yield all([
    yield takeLatest(
      DISTRICT_ACTION_TYPE.GET_ALL_DISTRICT,
      watchGetAllDistrict
    ),
  ]);
}

export default actionDistrict;
