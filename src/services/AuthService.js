import API, { handleErrors } from ".";
import { API_ENDPOINT_AUTH_REVIEWER_COORDINATOR } from "../utils/constants";

export async function authReviewerCoordinator(token) {
  try {
    API.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    return await API.post(API_ENDPOINT_AUTH_REVIEWER_COORDINATOR);
  } catch (error) {
    handleErrors(error);
  }
};
