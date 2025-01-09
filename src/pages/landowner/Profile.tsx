import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbCameraPlus } from 'react-icons/tb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import IconCircleButton from '../../components/common/IconCircleButton';
// import { EyeOpenIcon, EyeClosedIcon } from '../../assets/svgs/svg-icons';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import { StoreUser } from '../../types/user-types';
import profilePlaceholder from '../../assets/images/profile-placeholder.png';

type ProfileType = Omit<StoreUser, 'id'>;

export default function Profile() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const { token, user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState<ProfileType>({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    company_name: user?.company_name || '',
    position: user?.position || '',
    address: user?.address || '',
    zipcode: user?.zipcode || '',
    city: user?.city || '',
    company_website: user?.company_website || '',
    phone_number: user?.phone_number || '',
    role: user?.role || '',
    // password: user?.password || '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [profilePreview, setProfilePreview] = useState<any>(
    user?.profile_picture || profilePlaceholder
  );
  // const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    firstname: false,
    lastname: false,
    company_name: false,
    position: false,
    address: false,
    zipcode: false,
    city: false,
    company_website: false,
    email: false,
    phone_number: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await sendRequest<StoreUser>('/accounts/profile/', 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateUser(user);
    };

    fetchUserProfile();
  }, [sendRequest, updateUser, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    let checked = false;

    if (type === 'checkbox' || type === 'radio') {
      checked = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      const previewURL = URL.createObjectURL(file);
      setProfilePreview(previewURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.company_name ||
      !formData.email
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const formDataSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataSend.append(key, value);
    });

    if (profilePic) {
      formDataSend.append('profile_picture', profilePic);
    }

    try {
      const userUpdated = await sendRequest(
        '/accounts/profile/',
        'PATCH',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        formDataSend
      );
      updateUser(userUpdated);

      if (userUpdated.profile_picture) {
        setProfilePreview(userUpdated.profile_picture);
      }

      setSuccess('Profil erfolgreich aktualisiert.');
    } catch (err: unknown) {
      console.log('error update profile: ', err);
      if (err instanceof Error) {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnPasswordChange = () => {
    navigate('/landowner/password-change');
  };

  const toggleEditMode = (field: string) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (field: string) => {
    toggleEditMode(field);
  };

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col items-center justify-start px-4 py-8 auto-fill-profile'>
      <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8'>
        {error && <div className='text-red-600 mb-6'>{error}</div>}
        {success && <div className='text-green-600 mb-6'>{success}</div>}

        <div className='flex items-center mb-6'>
          <div className='relative w-24 h-24 mr-4'>
            <div className='relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden'>
              <img
                src={profilePreview || profilePlaceholder}
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

            <input
              id='fileInput'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
          </div>
          <div>
            <h2 className='text-sm font-semibold text-gray-dim'>Ihr Profil,</h2>
            <p className='text-lg text-gray-dim'>
              {user?.firstname} {user?.lastname}
            </p>
          </div>
        </div>

        <hr className='mb-6 border-gray-medium' />

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-4 gap-6'
        >
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Vorname'
              required
              id='firstname'
              name='firstname'
              value={formData.firstname}
              onChange={handleChange}
              onEdit={() => toggleEditMode('firstname')}
              onSave={() => handleSave('firstname')}
              isEditable={editMode.firstname}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Nachname'
              required
              id='lastname'
              name='lastname'
              value={formData.lastname}
              onChange={handleChange}
              onEdit={() => toggleEditMode('lastname')}
              onSave={() => handleSave('lastname')}
              isEditable={editMode.lastname}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Name des Unternechmens'
              required
              id='company_name'
              name='company_name'
              value={formData.company_name}
              onChange={handleChange}
              onEdit={() => toggleEditMode('company_name')}
              onSave={() => handleSave('company_name')}
              isEditable={editMode.company_name}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Ihre Position i Untermehmen'
              required
              id='position'
              name='position'
              value={formData.position}
              onChange={handleChange}
              onEdit={() => toggleEditMode('position')}
              onSave={() => handleSave('position')}
              isEditable={editMode.position}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Anschrift/Straβe'
              required
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              onEdit={() => toggleEditMode('address')}
              onSave={() => handleSave('address')}
              isEditable={editMode.address}
            />
          </div>
          <div className='md:col-span-1'>
            <Input
              variant='profile'
              label='PLZ'
              required
              id='zipcode'
              name='zipcode'
              value={formData.zipcode}
              onChange={handleChange}
              onEdit={() => toggleEditMode('zipcode')}
              onSave={() => handleSave('zipcode')}
              isEditable={editMode.zipcode}
            />
          </div>
          <div className='md:col-span-1'>
            <Input
              variant='profile'
              label='Stadt'
              required
              id='city'
              value={formData.city}
              name='city'
              onEdit={() => toggleEditMode('city')}
              onSave={() => handleSave('city')}
              isEditable={editMode.city}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Website des Unternechmens'
              id='company_website'
              name='company_website'
              type='url'
              value={formData.company_website}
              onChange={handleChange}
              onEdit={() => toggleEditMode('company_website')}
              onSave={() => handleSave('company_website')}
              isEditable={editMode.company_website}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Email Adress'
              required
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              onEdit={() => toggleEditMode('email')}
              onSave={() => handleSave('email')}
              isEditable={editMode.email}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Telefonnummer'
              id='phone_number'
              name='phone_number'
              type='tel'
              value={formData.phone_number}
              onChange={handleChange}
              onEdit={() => toggleEditMode('phone_number')}
              onSave={() => handleSave('phone_number')}
              isEditable={editMode.phone_number}
            />
          </div>

          <div className='md:col-span-2 relative'>
            {/* <Input
              variant='profile'
              label='Passwort'
              required
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              disabled
            />
            <Button
              variant='blueSecondary'
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute top-[35%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none'
            >
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button> */}
            <button
              type='button'
              className='flex justify-self-end text-gray-medium font-normal leading-6
                         hover:underline cursor-pointer mt-0 text-[1rem]'
              style={{
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
              onClick={handleOnPasswordChange}
            >
              Passwort ändern
            </button>
          </div>

          <div className='md:col-span-4 flex justify-end space-x-4'>
            <Button
              variant='blueSecondary'
              type='button'
              onClick={() => navigate('..')}
            >
              Abbrechen
            </Button>

            <Button variant='bluePrimary' type='submit' disabled={loading}>
              {loading ? 'Änderungen speichern...' : 'Änderungen speichern'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
