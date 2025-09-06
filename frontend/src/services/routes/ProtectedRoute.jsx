import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const isLoggedIn = useSelector((state) => state.authState.loggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace/>
}

export default ProtectedRoute