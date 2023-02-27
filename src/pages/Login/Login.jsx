import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

// CONTEXT
import { useAuth } from "../../context/AuthContext";

// SERVICES
import { authReviewerCoordinator } from "../../services/AuthService";

// STYLES
import {
  LoginContainer,
  LoginTitle,
} from './style.login';

export const LoginPage = () => {
  const { handleAuthSuccess, handleAuthFailure } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (googleData) => {
    setIsLoading(true);
    const response = await authReviewerCoordinator(googleData.credential);
    if (response?.status === 200) {
      const userData = response.data.user;
      handleAuthSuccess(googleData, userData);
    } else {
      window.alert("Falha ao realizar login", "Verifique suas credenciais e tente novamente.");
      handleAuthFailure();
    }
    setIsLoading(false);
  }

  return (
    <LoginContainer>
      <LoginTitle>COMPUTAÇÃO@UFCG</LoginTitle>
      {isLoading ?
        <CircularProgress /> :
        <GoogleLogin
          theme="filled_blue"
          onSuccess={handleSuccess}
          onFailure={handleAuthFailure}
        />
      }
    </LoginContainer>
  )
}