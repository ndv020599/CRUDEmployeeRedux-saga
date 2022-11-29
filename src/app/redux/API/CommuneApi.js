import { API_ENPOINT } from "app/appConfig";
import axios from "axios";

export function getAllCommune() {
  return axios
    .post(API_ENPOINT + "/communes/search", {})
    .then((res) => res.data.data);
}
