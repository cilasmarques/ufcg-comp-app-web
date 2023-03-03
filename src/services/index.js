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

export const handleErrors = (error, customMessage, ignoreAlert) => {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.headers);
    console.info(error.response.status + " " + error.response.data.message);
    if (!ignoreAlert && error.response.data.message)
      alert(error.response.data.message);
    else if (!ignoreAlert &&  customMessage)
      alert(customMessage);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
};

export default API;
