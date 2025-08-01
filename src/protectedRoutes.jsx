import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import ApplicationStore from "./utils/localStorageUtil";


const ProtectedRoutes = () => {
    const userToken = ApplicationStore().getStorage('token');
    const user_type = ApplicationStore().getStorage('user_type');
    return userToken && user_type == "admin"? <Outlet /> : userToken && user_type == "salesrep"? <Outlet /> : userToken && user_type == "dealership"? <Outlet /> :  userToken && user_type == "user" ? <Outlet /> : userToken && user_type == "manager" ? <Outlet />:  <Navigate replace to="/login" />;
}

export default ProtectedRoutes;