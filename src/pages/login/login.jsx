import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../../context/authContext";
import './login.css'

export const LoginPage = () => {
  const { handleAuthSuccess, handleAuthFailure } = useAuth();
  
  return (
    <div className="container">
      <h1>COMPUTAÇÃO@UFCG</h1>
      <GoogleLogin
        onSuccess={handleAuthSuccess}
        onFailure={handleAuthFailure}
      />
    </div>
  )
}