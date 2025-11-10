import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
