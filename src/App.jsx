import { MainRouter } from "./routes/mainRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/authContext";
import { ActivitiesProvider } from "./context/activitiesContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ActivitiesProvider>
          <MainRouter />
        </ActivitiesProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
