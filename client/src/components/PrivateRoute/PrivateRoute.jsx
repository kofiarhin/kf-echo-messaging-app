import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// private route
const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return <div> {user ? <Outlet /> : <Navigate to="/login" />} </div>;
};

export default PrivateRoute;
