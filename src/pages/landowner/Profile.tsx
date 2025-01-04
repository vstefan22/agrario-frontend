import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbCameraPlus } from 'react-icons/tb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import IconCircleButton from '../../components/common/IconCircleButton';
import { EyeOpenIcon, EyeClosedIcon } from '../../assets/svgs/svg-icons';
// import useAuthStore from '../../store/auth-store';

interface UserData {
  vorname: string;
  nachname: string;
  unternehmen: string;
  position: string;
  strasse: string;
  plz: string;
  stadt: string;
  website: string;
  email: string;
  telefon: string;
  password: string;
  confirmPassword: string;
}

export default function Profile() {
  const navigate = useNavigate();
  // const { user } = useAuthStore();

  // TODO: use actual user data here
  const [formData, setFormData] = useState<UserData>({
    vorname: 'Max',
    nachname: 'Mustermann',
    unternehmen: 'Musterfirma GmbH',
    position: 'Softwareentwickler',
    strasse: 'Musterstraße 123',
    plz: '12345',
    stadt: 'Musterstadt',
    website: 'https://www.musterfirma.de',
    email: 'max.mustermann@example.com',
    telefon: '+49 123 456 7890',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(
    'https://s3-alpha-sig.figma.com/img/01cc/5d61/f928befeeece4a5c1e2f09ab88eac5cc?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IZe3UOdo59zO4aHKULYUvDhMUIHSDdU7ikD3n3c2CVQZMVYmnmhRDWPKGCoJoP7sbSY6wmm5eQ8aKphj8xU8ymJaj0zkI90mpfr0ki4MiUcz5xBOKFsN3iPumxdxH~LU6dAFKKPUS6NFzW~ywx-RICjvhYBDoeaG3UqgtdAzr747DxDqzTM4JzktYyChDO-3d5e0fDatlraLgZTCsIWzTImROLt8cKyz1glTQoXg4IXF778SNN-lNSuzDut2nYCxTgq3uam8RwMOEWjitxUT0h0-9A0JYvPaXTflAYgIfE4AnCPIJvgp3w1Y~buDyMA~Vd3jJTXVUMp8FaDoYrOG6Q__'
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setUserName('Max Mustermann');
    // TODO: check if this is still needed
  }, [navigate]);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProfilePic(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.vorname ||
      !formData.nachname ||
      !formData.unternehmen ||
      !formData.email
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      setSuccess('');
      return;
    }

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
      // TODO: create update request for user
      // const data = await sendRequest(
      //   '/user-update/',
      //   'POST',
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      //   formData
      // );
      setSuccess('Profil erfolgreich aktualisiert.');
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

  const handleOnEdit = () => {
    console.log('edit clicked.');
  };

  const handleOnPasswordChange = () => {
    navigate('/landowner/password-change');
  };

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col items-center justify-start px-4 py-8'>
      <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8'>
        {error && <div className='text-red-600 mb-6'>{error}</div>}
        {success && <div className='text-green-600 mb-6'>{success}</div>}

        <div className='flex items-center mb-6'>
          <div className='relative w-24 h-24 mr-4'>
            <div className='relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden'>
              <img
                src={profilePic}
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
            <p className='text-lg text-gray-dim'>{userName}</p>
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
              id='vorname'
              name='vorname'
              value={formData.vorname}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Nachname'
              required
              id='nachname'
              name='nachname'
              value={formData.nachname}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Name des Unternehmens'
              required
              id='unternehmen'
              name='unternehmen'
              value={formData.unternehmen}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Ihre Position im Unternehmen'
              required
              id='position'
              name='position'
              value={formData.position}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Anschrift/Strasse'
              required
              id='strasse'
              name='strasse'
              value={formData.strasse}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-1'>
            <Input
              variant='profile'
              label='PLZ'
              required
              id='plz'
              name='plz'
              value={formData.plz}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-1'>
            <Input
              variant='profile'
              label='Stadt'
              required
              id='stadt'
              name='stadt'
              value={formData.stadt}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Website des Unternehmens'
              id='website'
              name='website'
              type='url'
              value={formData.website}
              onChange={handleChange}
              onEdit={handleOnEdit}
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
              onEdit={handleOnEdit}
            />
          </div>
          <div className='md:col-span-2'>
            <Input
              variant='profile'
              label='Telefonnummer'
              id='telefon'
              name='telefon'
              type='tel'
              value={formData.telefon}
              onChange={handleChange}
              onEdit={handleOnEdit}
            />
          </div>

          <div className='md:col-span-2 relative'>
            <Input
              variant='profile'
              label='Passwort'
              required
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              variant='blueSecondary'
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute top-[40%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none'
            >
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button>
            <button
              type='button'
              className='flex justify-self-end text-gray-medium text-base font-normal leading-6
                         hover:underline cursor-pointer mt-2'
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
