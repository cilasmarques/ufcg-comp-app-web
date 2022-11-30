import axios from "axios";
import { handleError } from "../utils/handleErrors";

const URL = process.env.REACT_APP_API_URI;

// FIXME This query is made more than once
export async function getActivities(data) {
  try {
    return await axios.post(`${URL}/activities`, data);
  } catch (error) {
    handleError(error);
  }
}