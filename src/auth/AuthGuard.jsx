import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  // Allow access to login page without authentication
  if (location.pathname === "/login") {
    return children;
  }

  // Redirect unauthenticated users to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;