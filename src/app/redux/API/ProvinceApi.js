import { API_ENPOINT } from "app/appConfig";
import axios from "axios";

export function getProvince() {
  return axios
    .post(API_ENPOINT + "/provinces/search", {})
    .then((res) => res.data.data);
}
