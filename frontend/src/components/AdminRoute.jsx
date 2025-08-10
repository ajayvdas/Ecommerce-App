import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // const userAuth = true;

    // return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
