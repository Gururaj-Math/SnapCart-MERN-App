import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

function PrivateRoute() {
  const { currentUser } = useSelector((state: any) => state.user);

  return currentUser ? (
    <Sidebar>
      <Outlet />
    </Sidebar>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default PrivateRoute;
