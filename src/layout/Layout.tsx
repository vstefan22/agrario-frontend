import { useLocation } from 'react-router-dom';
import NavBar from '../components/navigation/NavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isNewRegister = location.pathname.startsWith('/new-register');
  return (
    <div className='h-screen'>
      {!isNewRegister && <NavBar />}
      {children}
    </div>
  );
};

export default Layout;
