import { all } from "redux-saga/effects";
import actionCommune from "./saga/communeAction";
import actionDistrict from "./saga/districtAction";
import actionEmployee from "./saga/employeeActions";
import actionProvince from "./saga/provinceAction";

const allAction = [
  actionEmployee(),
  actionProvince(),
  actionDistrict(),
  actionCommune(),
];

function* rootSaga() {
  yield all(allAction);
}

export default rootSaga;
