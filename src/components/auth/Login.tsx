import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../common/Input';
import Button from '../common/Button';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import { UserType } from '../../types/user-types';
import 'react-toastify/dist/ReactToastify.css';

type LoginResponse = {
  firebase_token: string;
  message: string;
  user: UserType;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser } = useAuthStore();
  const { sendRequest } = useHttpRequest();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let checked = false;
    if (e.target instanceof HTMLInputElement && type === 'checkbox') {
      checked = e.target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { firebase_token, user } = await sendRequest<LoginResponse>(
        '/accounts/login/',
        'POST',
        {},
        formData
      );
      setUser(user);
      setToken(firebase_token);

      if (user.role === 'landowner') {
        navigate('/landowner');
      } else if (user.role === 'developer') {
        navigate('/developer');
      } else {
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (
        err.response.data.error ===
        'Please confirm your email address before logging in.'
      ) {
        setError(
          'Bitte bestätigen Sie Ihre E-Mail Adresse, bevor Sie sich anmelden.'
        );
        return;
      }
      if (err instanceof Error) {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, {
        position: 'top-center',
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <div className='bg-primary h-full flex flex-col items-center justify-center px-4'>
      <h1 className='text-[46px] font-bold mb-6 text-white'>Login</h1>
      <div className='w-full max-w-[660px] bg-white/10 border-[2px] border-[rgba(255,255,255,0.06)] rounded-[44px] p-8'>
        {error && <div className='text-red-600 mb-6'>{error}</div>}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-4 gap-6'
        >
          <div className='md:col-span-4'>
            <Input
              label='Email Adresse'
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='md:col-span-4'>
            <Input
              label='Passwort'
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className='md:col-span-4'>
            <label className='flex items-center text-white'>
              <input
                type='checkbox'
                name='rememberMe'
                checked={formData.rememberMe}
                onChange={handleChange}
                className='hidden'
              />
              <span className='w-6 h-6 border border-white rounded flex items-center justify-center mr-2'>
                {formData.rememberMe && (
                  <svg
                    className='w-4 h-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </span>
              Remember Me
            </label>
          </div>

          <div className='md:col-span-4 flex justify-center space-x-4'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => navigate('/')}
            >
              Abbrechen
            </Button>

            <Button
              type='submit'
              variant='primary'
              isLoading={loading}
              disabled={loading}
            >
              Login
            </Button>
          </div>

          <ToastContainer />

          <div className='md:col-span-4 text-center mt-6'>
            <p className='text-white'>
              Neu hier? Hier konnen sie sich registrieren und ein neues konto
              anlegen?{' '}
              <span
                className='font-bold cursor-pointer hover:underline'
                onClick={() => navigate('/new-register')}
              >
                Neues Konto Registrieren
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
