import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";

function ProtectedRoute({ children }) {
  const { profile, loading } = useContext(ProfileContext);

  const location = useLocation();

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!profile.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
