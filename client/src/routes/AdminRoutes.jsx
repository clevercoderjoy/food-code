import { useSelector } from "react-redux";
import { selectCurrentUser } from "../slice/UserSlice";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser?.role === "admin") {
    return element;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
