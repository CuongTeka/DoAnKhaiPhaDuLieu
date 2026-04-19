import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import LoadingPage from "./components/Loading";

const protectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default protectedRoute;
