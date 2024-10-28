import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../slice/UserSlice";

const RequireAuth = ({ children }) => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  if (!isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
