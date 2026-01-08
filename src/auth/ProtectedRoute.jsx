import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // redirect after 2 seconds
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h3>Access Denied</h3>
          <p>You must be logged in to access the dashboard.</p>
          <p style={styles.small}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return children;
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },
  small: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#6b7280",
  },
};

export default ProtectedRoute;