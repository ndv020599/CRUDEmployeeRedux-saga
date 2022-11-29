import { call, put, all, takeLatest } from "redux-saga/effects";
import { getAllCommune } from "../API/CommuneApi";
import { COMMNUNE_ACTION_TYPE } from "../types/communeType";

function* watchGetAllCommune() {
  try {
    const result = yield call(async () => {
      return await getAllCommune();
    });
    if (result) {
      yield put({
        type: COMMNUNE_ACTION_TYPE.GET_COMMUNE_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    yield put({
      type: COMMNUNE_ACTION_TYPE.GET_COMMUNE_FAIL,
      payload: error.response.message,
    });
  }
}

function* actionCommune() {
  yield all([
    yield takeLatest(COMMNUNE_ACTION_TYPE.GET_ALL_COMMUNE, watchGetAllCommune),
  ]);
}

export default actionCommune;
