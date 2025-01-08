import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { TbCameraPlus } from 'react-icons/tb';
import IconCircleButton from '../../components/common/IconCircleButton';
import { ArrowLeft } from '../../assets/svgs/svg-icons';
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';
// import useHttpRequest from '../../hooks/http-request-hook';

type PasswordChangeProps = {
  password: string;
  confirmPassword: string;
};

export default function PasswordChange() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  //   const { sendRequest } = useHttpRequest();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // TODO: remove hardcoded data after actual user data is used
  const userName = 'Max Mustermann';
  const profilePic =
    'https://s3-alpha-sig.figma.com/img/01cc/5d61/f928befeeece4a5c1e2f09ab88eac5cc?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IZe3UOdo59zO4aHKULYUvDhMUIHSDdU7ikD3n3c2CVQZMVYmnmhRDWPKGCoJoP7sbSY6wmm5eQ8aKphj8xU8ymJaj0zkI90mpfr0ki4MiUcz5xBOKFsN3iPumxdxH~LU6dAFKKPUS6NFzW~ywx-RICjvhYBDoeaG3UqgtdAzr747DxDqzTM4JzktYyChDO-3d5e0fDatlraLgZTCsIWzTImROLt8cKyz1glTQoXg4IXF778SNN-lNSuzDut2nYCxTgq3uam8RwMOEWjitxUT0h0-9A0JYvPaXTflAYgIfE4AnCPIJvgp3w1Y~buDyMA~Vd3jJTXVUMp8FaDoYrOG6Q__';

  const [formData, setFormData] = useState<PasswordChangeProps>({
    password: '',
    confirmPassword: '',
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

    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setError('Die Passwörter stimmen nicht überein.');
        setSuccess('');
        return;
      }
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // TODO: use actual endpoint for change password
      // const data = await sendRequest(
      //   '/password-change/',
      //   'POST',
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      //   formData
      // );
      console.log('token: ', token);
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col items-center justify-start px-4 py-8'>
      <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8'>
        {error && <div className='text-red-600 mb-6'>{error}</div>}
        {success && <div className='text-green-600 mb-6'>{success}</div>}
        <div className='flex justify-between items-center mb-6'>
          <div
            className='flex items-center justify-center rounded-full bg-primary w-[40px] h-[40px] cursor-pointer'
            onClick={handleGoBack}
          >
            <ArrowLeft />
          </div>
          <div className='flex items-center'>
            <div className='relative w-24 h-24 mr-4'>
              <div className='relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden'>
                <img
                  src={
                    user?.profile_picture ? user.profile_picture : profilePic
                  }
                  alt='Profilbild'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>

              <IconCircleButton
                onClick={() => document.getElementById('fileInput')?.click()}
                icon={<TbCameraPlus />}
                ariaLabel='Profilbild ändern'
                className='absolute top-0 right-0'
              />
            </div>
            <div>
              <h2 className='text-sm font-semibold text-gray-dim'>
                Ihr Profil,
              </h2>
              <p className='text-lg text-gray-dim'>
                {user && user.firstname && user.lastname
                  ? `${user.firstname} ${user.lastname}`
                  : userName}
              </p>
            </div>
          </div>
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
            label='Passwort bestätigen'
            name='confirmPassword'
            type='password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Input
            variant='profile'
            label='Passwort'
            required
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
          />

          <div className='flex justify-center'>
            <Button
              variant='bluePrimary'
              type='submit'
              className='w-[420px]'
              disabled={
                formData.password !== formData.confirmPassword || loading
              }
            >
              {loading ? 'Änderungen speichern...' : 'Änderungen speichern'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
