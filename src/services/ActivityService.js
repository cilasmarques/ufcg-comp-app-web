import API, { handleErrors } from ".";

import {
  API_ENDPOINT_ACTIVITY_FIND_BY_STATE,
  API_ENDPOINT_ACTIVITY_COUNT_BY_STATE,
  API_ENDPOINT_ACTIVITY_ASSIGN,
  API_ENDPOINT_ACTIVITY_VALIDATE,
  API_ENDPOINT_ACTIVITY_VOUCHER_DOWNLOAD
} from "../utils/constants";

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await API.post(`${API_ENDPOINT_ACTIVITY_FIND_BY_STATE}?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, query);
  } catch (error) {
    handleErrors(error, 'Erro ao buscar as atividades');
  }
};

export async function fetchActivitiesCount(query) {
  try {
    return await API.post(API_ENDPOINT_ACTIVITY_COUNT_BY_STATE, query);
  } catch (error) {
    handleErrors(error);
  }
};

export async function assignActivity(activityId, data) {
  try {
    return await API.put(`${API_ENDPOINT_ACTIVITY_ASSIGN}/${activityId}`, data);
  } catch (error) {
    handleErrors(error, 'Erro ao atribuir a atividade');
  }
};

export async function validateActivity(activityId, data) {
  try {
    return await API.put(`${API_ENDPOINT_ACTIVITY_VALIDATE}/${activityId}`, data);
  } catch (error) {
    handleErrors(error, 'Erro ao validada a atividade');
  }
};

export async function downloadActivityVoucher(path) {
  try {
    return await API.get(`${API_ENDPOINT_ACTIVITY_VOUCHER_DOWNLOAD}?path=${path}`, { responseType: 'blob' });
  } catch (error) {
    handleErrors(error, 'Erro ao baixar o comprovante');
  }
};
