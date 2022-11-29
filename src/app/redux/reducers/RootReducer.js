import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import { employeeReduce } from "./EmployeeReduce";
import { provinceReduce } from "./ProvinceReduce";
import { districtReduce } from "./DistrictReduce";
import { communeReduce } from "./CommuneReduce";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  employee: employeeReduce,
  province: provinceReduce,
  districtReduce,
  communeReduce,
});

export default RootReducer;
