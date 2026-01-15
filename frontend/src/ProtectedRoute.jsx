import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // use your login token/key

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
