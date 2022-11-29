import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/authContext";

import {
  LoginContainer,
  LoginTitle,
} from './styles.component.js';

export const LoginPage = () => {
  const { handleAuthSuccess, handleAuthFailure } = useAuth();

  return (
    <LoginContainer>
      <LoginTitle>COMPUTAÇÃO@UFCG</LoginTitle>
      <GoogleLogin
        theme="filled_blue"        
        onSuccess={handleAuthSuccess}
        onFailure={handleAuthFailure}
      />
    </LoginContainer>
  )
}