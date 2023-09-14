import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

