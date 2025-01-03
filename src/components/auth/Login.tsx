import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import Input from '../common/Input';
import Button from '../common/Button';
import useAuthStore from '../../store/auth-store';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

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
      await setPersistence(
        auth,
        formData.rememberMe
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const accessToken = await user.getIdToken();

      setUser({ email: user.email, id: user.uid });
      setToken(accessToken);

      // TODO: use actual role from user object
      // if (user.role === 'landowner') {
      //   navigate('/landowner');
      // } else if (user.role === 'developer') {
      //   navigate('/developer');
      // } else {
      //   navigate('/');
      // }
      navigate('/landowner');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setLoading(false);
    }
  };

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
