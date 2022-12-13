import axios from "axios";
import { handleError } from "../utils/handleErrors";

const URL = process.env.REACT_APP_API_URI;

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await axios.post(`${URL}/activities?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, query);
  } catch (error) {
    handleError(error);
  }
}

export async function fetchActivitiesCount(query) {
  try {
    return await axios.post(`${URL}/activities/count`, query);
  } catch (error) {
    handleError(error);
  }
}

export async function assignActivity(data) {
  try {
    return await axios.put(`${URL}/activity/assign`, data);
  } catch (error) {
    handleError(error);
  }
}

export async function updateActivity(activityId, data) {
  try {
    return await axios.put(`${URL}/activity/update/${activityId}`, data);
  } catch (error) {
    handleError(error);
  }
}

export async function downloadActivity(path) {
  try {
    return await axios.get(`${URL}/activity/doc/download?path=${path}`, { responseType: 'blob' });
  } catch (error) {
    handleError(error);
  }
}



