import API, { handleErrors } from ".";

import {
  API_ENDPOINT_PROCESS_VERIFY
} from "../utils/constants";

export async function verifyProcess(formData) {
  try {
    return await API.post(API_ENDPOINT_PROCESS_VERIFY, formData);
  } catch (error) {
    handleErrors(error, 'Erro na verifição o processo');
  }
};
