import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import HttpService from "app/services/HttpService";
import rootSaga from "./rootSaga";

const initialState = {};

//const middlewares = [thunk];
const sagaMiddle = createSagaMiddleware();
const middlewares = [
  thunk,
  //routerMiddleware(browserHistory),
  axiosMiddleware(HttpService.getAxiosClient()),
];
export const Store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
    applyMiddleware(sagaMiddle)
  )
);
sagaMiddle.run(rootSaga);
export default Store;
