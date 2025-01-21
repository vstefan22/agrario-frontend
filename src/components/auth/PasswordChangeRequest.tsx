import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import Button from '../common/Button';
import useHttpRequest from '../../hooks/http-request-hook';
import { ArrowLeft } from '../../assets/svgs/svg-icons';
import { LoadingSpinner } from '../common/Loading';

type PasswordChangeProps = {
  email: string;
};

export default function PasswordChangeRequest() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<PasswordChangeProps>({
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: use actual endpoint for change email
      await sendRequest(
        '/accounts/password-reset/',
        'POST',
        {},
        { email: formData.email }
      );
      toast.success(
        'Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.'
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('500')) {
          toast.error('Ihre E-Mail wurde in der Datenbank nicht gefunden.');
        } else {
          toast.error(err.message || 'Ein Fehler ist aufgetreten.');
        }
      } else {
        toast.error('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col items-center justify-start px-4 py-8'>
      <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8'>
        <div className='flex justify-between items-center mb-6'>
          <div
            className='flex items-center justify-center rounded-full bg-primary w-[40px] h-[40px] cursor-pointer'
            onClick={handleGoBack}
          >
            <ArrowLeft />
          </div>
          <div className='flex items-center'></div>
          <div />
        </div>
        <hr className='mb-6 border-gray-medium' />
        <div className='flex items-center justify-center mb-6'>
          <h1 className='text-[32px] font-bold text-black-muted'>
            Passwort ändern
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-self-center w-[420px]'
        >
          <Input
            variant='profile'
            label='Email'
            required
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
          />

          <div className='flex justify-center'>
            <Button
              variant='bluePrimary'
              type='submit'
              className='w-[420px]'
              disabled={loading}
            >
              {loading ? 'Passwort zurücksetzen...' : 'Passwort zurücksetzen'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
