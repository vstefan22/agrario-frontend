import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useAuthStore from '../store/auth-store';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center justify-center'>
      <main className='flex-1 flex flex-col items-center justify-center p-4'>
        {!isAuthenticated && (
          <div className='flex gap-4'>
            <Button variant='bluePrimary' onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button
              variant='blueSecondary'
              onClick={() => navigate('/new-register')}
            >
              Register
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
