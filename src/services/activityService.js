import axios from "axios";
import { handleError } from "../utils/handleErrors";

const URL = process.env.REACT_APP_API_URI;

// FIXME This query is made more than once
export async function getActivities(data, page, rowsPerPage, sort, order) {
  try {
    return await axios.post(`${URL}/activities?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, data);
  } catch (error) {
    handleError(error);
  }
}

export async function getActivitiesCount() {
  try {
    return await axios.get(`${URL}/activities/count`);
  } catch (error) {
    handleError(error);
  }
}

// export async function assignActivity(data) {
//   try {
//     return await axios.post(`${URL}/activities/assign`, data);
//   } catch (error) {
//     handleError(error);
//   }
// }

export async function updateActivity(activityId, data) {
  try {
    return await axios.put(`${URL}/activity/update/${activityId}`, data);
  } catch (error) {
    handleError(error);
  }
}

