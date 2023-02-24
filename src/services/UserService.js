import API, { handleErrors } from ".";
import { API_ENDPOINT_USER_REGISTER, API_ENDPOINT_USER_UPDATE_ENROLL } from "../utils/constants";

export async function userRegister(user) {
  try {
    return await API.post(API_ENDPOINT_USER_REGISTER, user);
  } catch (error) {
    if (error.response.status === 409) {
      alert("Usuário já cadastrado");
    } else {
      alert("Erro ao cadastrar usuário, por favor verifique os dados informados");
    }
    handleErrors(error);
  }
};

export async function userUpdate(user) {
  try {
    return await API.put(API_ENDPOINT_USER_UPDATE_ENROLL, user);
  } catch (error) {
    if (error.response.status === 404) {
      alert("Usuário não encontrado");
    } else {
      alert("Erro ao atualizar usuário, por favor verifique os dados informados");
    }
    handleErrors(error);
  }
};