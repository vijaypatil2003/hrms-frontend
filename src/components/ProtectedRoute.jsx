import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
