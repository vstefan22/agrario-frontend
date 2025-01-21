import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import Button from '../common/Button';
import useHttpRequest from '../../hooks/http-request-hook';
import { ArrowLeft } from '../../assets/svgs/svg-icons';
import { LoadingSpinner } from '../common/Loading';
import axios from 'axios';

type PasswordChangeProps = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

export default function PasswordChange() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<PasswordChangeProps>({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
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
      await sendRequest(
        '/accounts/users/change-password/',
        'POST',
        {},
        {
          old_password: formData.old_password,
          new_password: formData.new_password,
          confirm_new_password: formData.confirm_new_password,
        }
      );
      toast.success('Ihr Passwort wurde erfolgreich geändert.');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data;
        if (responseData.error === 'Old password is incorrect.') {
          toast.error('Das alte Passwort ist falsch.');
          return;
        }
        if (responseData.error === 'New passwords do not match.') {
          toast.error('Die neuen Passwörter stimmen nicht überein.');
          return;
        }
        if (responseData.error === 'All fields are required.') {
          toast.error('Alle Felder sind erforderlich.');
          return;
        }
        if (!responseData.error) {
          toast.error(err.message || 'Ein Fehler ist aufgetreten.');
          return;
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
            label='Old Password'
            required
            id='old_password'
            name='old_password'
            type='password'
            value={formData.old_password}
            onChange={handleChange}
          />
          <Input
            variant='profile'
            label='New Password'
            required
            id='new_password'
            name='new_password'
            type='password'
            value={formData.new_password}
            onChange={handleChange}
          />
          <Input
            variant='profile'
            label='Confirm New Password'
            required
            id='confirm_new_password'
            name='confirm_new_password'
            type='password'
            value={formData.confirm_new_password}
            onChange={handleChange}
          />

          <div className='flex justify-center'>
            <Button
              variant='bluePrimary'
              type='submit'
              className='w-[420px]'
              disabled={loading}
            >
              {loading ? 'Änderungen speichern...' : 'Änderungen speichern'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
