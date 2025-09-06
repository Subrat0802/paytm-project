import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const OpenRoute = () => {

  const isLoggedIn = useSelector((state) => state.authState.loggedIn);

  return isLoggedIn ? <Navigate to={"/user"} replace/> : <Outlet /> 
}

export default OpenRoute