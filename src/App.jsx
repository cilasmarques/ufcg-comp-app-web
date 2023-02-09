import { GoogleOAuthProvider } from "@react-oauth/google";

// ROUTES
import { MainRouter } from "./routes/MainRouter";

// CONTEXT
import { AuthProvider } from "./context/AuthContext";
import { ActivitiesProvider } from "./context/ActivitiesContext";

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
