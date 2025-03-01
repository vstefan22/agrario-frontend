import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TbCameraPlus } from 'react-icons/tb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import IconCircleButton from '../../components/common/IconCircleButton';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import { StoreUser } from '../../types/user-types';
import profilePlaceholder from '../../assets/images/profile-placeholder.png';
import { LoadingSpinner } from '../../components/common/Loading';
// import { EyeOpenIcon, EyeClosedIcon } from '../../assets/svgs/svg-icons';

type ProfileType = Omit<StoreUser, 'id'>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Profile() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const { token, user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState<ProfileType>({
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    position: '',
    address: '',
    zipcode: '',
    city: '',
    company_website: '',
    phone_number: '',
    role: '',
    // password: user?.password || '',
  });

  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [profilePreview, setProfilePreview] = useState<any>(
    user?.profile_picture || profilePlaceholder
  );
  // const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    first_name: false,
    last_name: false,
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
      setLoading(true);
      const user = await sendRequest<StoreUser>('/accounts/profile/', 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateUser(user);
      setLoading(false);
    };

    fetchUserProfile();
  }, [sendRequest, updateUser, token]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        company_name: user?.company_name || '',
        position: user?.position || '',
        address: user?.address || '',
        zipcode: user?.zipcode || '',
        city: user?.city || '',
        company_website: user?.company_website || '',
        phone_number: user?.phone_number || '',
        role: user?.role || '',
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    let checked = false;

    if (type === 'checkbox') {
      checked = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.address ||
      !formData.zipcode ||
      !formData.city ||
      !formData.phone_number
    ) {
      toast.error('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }

    if (formData.zipcode.length !== 5 || !/^\d+$/.test(formData.zipcode)) {
      toast.error('Die Postleitzahl muss genau 5 Ziffern enthalten.');
      return;
    }

    if (formData.zipcode.length !== 5 || !/^\d+$/.test(formData.zipcode)) {
      toast.error('Die Postleitzahl muss genau 5 Ziffern enthalten.');
      return;
    }

    const formDataSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        formDataSend.append(key, value ? 'true' : 'false');
      } else {
        formDataSend.append(key, value.toString());
      }
    });

    if (profilePic) {
      formDataSend.append('profile_picture', profilePic);
    }

    try {
      setLoading(true);
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

      toast.success('Profil erfolgreich aktualisiert.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        toast.error('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnPasswordChange = async () => {
    navigate('../password-change');
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

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col items-center justify-start px-4 py-8 auto-fill-profile'>
      <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8'>
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
              {user?.first_name} {user?.last_name}
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
              id='first_name'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              onEdit={() => toggleEditMode('first_name')}
              onSave={() => handleSave('first_name')}
              isEditable={editMode.first_name}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Nachname'
              required
              id='last_name'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              onEdit={() => toggleEditMode('last_name')}
              onSave={() => handleSave('last_name')}
              isEditable={editMode.last_name}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Name des Unternehmens'
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
              label='Ihre Position im Unternehmen'
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
              onChange={handleChange}
              name='city'
              onEdit={() => toggleEditMode('city')}
              onSave={() => handleSave('city')}
              isEditable={editMode.city}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Website des Unternehmens'
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
              label='Email Adresse'
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
              required
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
