import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';

interface RedirectProps {
  children: ReactNode;
}

const Redirect = ({ children }: RedirectProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const userRole = user?.role;

  if (!isAuthenticated) {
    return children;
  }

  if (userRole === 'landowner') {
    return <Navigate to='/landowner' replace />;
  } else if (userRole === 'developer') {
    return <Navigate to='/developer' replace />;
  }

  return <Navigate to='/' replace />;
};

export default Redirect;
