import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const userAuth = true; // TODO: WILL CHANGE LATER
  return userAuth ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute