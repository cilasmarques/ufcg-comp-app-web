import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: localStorage.getItem("@token") ?
    {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer " + localStorage.getItem("@token")
    } :
    {
      "Content-Type": "multipart/form-data",
    }
})

export const handleErrors = error => {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.headers);
    console.info(error.response.status + " " + error.response.data.message);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
};

export default API;
