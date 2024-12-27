import PublicLayout from './PublicLayout';
import PrivateLayout from './PrivateLayout';
import useAuthStore from '../store/auth-store';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <PublicLayout />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
};

export default ProtectedLayout;
