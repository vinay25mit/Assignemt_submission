import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import AuthGuard from "./auth/AuthGuard";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  </AuthProvider>
);

export default App;