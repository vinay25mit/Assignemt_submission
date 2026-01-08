import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      setError("Unable to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>User Dashboard</h2>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="dashboard-content">
          {loading && <p className="loader">Loading users...</p>}

          {error && (
            <>
              <div className="error-box">{error}</div>
              <button className="retry-btn" onClick={fetchUsers}>
                Retry
              </button>
            </>
          )}

          {!loading && !error && users.length === 0 && (
            <p className="empty-state">No users found.</p>
          )}

          <ul className="user-list">
            {!loading &&
              users.map((u) => (
                <li key={u.id}>
                  <strong>{u.name}</strong>
                  <span>{u.email}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;