import API, { handleErrors } from ".";
import { API_ENDPOINT_USER_REGISTER, API_ENDPOINT_USER_UPDATE_ENROLL, API_ENDPOINT_USER_FIND_BY_ROLE } from "../utils/constants";

export async function userRegister(user) {
  try {
    return await API.post(API_ENDPOINT_USER_REGISTER, user);
  } catch (error) {
    handleErrors(error, 'Erro ao cadastrar o usuário');
  }
};

export async function userUpdate(user) {
  try {
    return await API.put(API_ENDPOINT_USER_UPDATE_ENROLL, user);
  } catch (error) {
    handleErrors(error, 'Erro ao atualizar o usuário');
  }
};

export async function userFindByRole(role) {
  try {
    return await API.get(`${API_ENDPOINT_USER_FIND_BY_ROLE}/${role}`);
  } catch (error) {
    handleErrors(error, 'Erro ao buscar os usuários');
  }
}