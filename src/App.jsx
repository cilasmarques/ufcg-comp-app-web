import { MainRouter } from "./routes/mainRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
