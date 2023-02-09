import axios from "axios";
import { handleError } from "../utils/handleErrors";

const URL = process.env.REACT_APP_API_URI;

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await axios.post(`${URL}/activities/find_by_state?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, query);
  } catch (error) {
    handleError(error);
  }
}

export async function fetchActivitiesCount(query) {
  try {
    return await axios.post(`${URL}/activities/count_by_state`, query);
  } catch (error) {
    handleError(error);
  }
}

export async function assignActivity(activityId, data) {
  try {
    return await axios.put(`${URL}/activity/assign/${activityId}`, data);
  } catch (error) {
    handleError(error);
  }
}

export async function validateActivity(activityId, data) {
  try {
    return await axios.put(`${URL}/activity/validate/${activityId}`, data);
  } catch (error) {
    handleError(error);
  }
}

export async function downloadActivityVoucher(path) {
  try {
    return await axios.get(`${URL}/activity/voucher/download?path=${path}`, { responseType: 'blob' });
  } catch (error) {
    handleError(error);
  }
}
