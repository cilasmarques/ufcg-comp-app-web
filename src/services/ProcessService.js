import axios from "axios";
import { handleError } from "../utils/handleErrors";

const URL = process.env.REACT_APP_API_URI;

export async function verifyProcess(formData) {
  try {
    return await axios.post(`${URL}/process/check`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    handleError(error);
  }
}
