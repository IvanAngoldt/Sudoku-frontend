import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const RequireAuth = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
