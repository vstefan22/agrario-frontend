import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import useHttpRequest from '../../hooks/http-request-hook';
import { LoadingSpinner } from '../../components/common/Loading';

export default function Register() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    position: '',
    address: '',
    zipcode: '',
    city: '',
    company_website: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    role: 'landowner',
    privacy_accepted: false,
    terms_accepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.first_name)
      newErrors.first_name = 'Vorname ist erforderlich.';
    if (!formData.last_name) newErrors.last_name = 'Nachname ist erforderlich.';
    if (!formData.address) newErrors.address = 'Anschrift ist erforderlich.';
    if (!formData.zipcode) newErrors.zipcode = 'PLZ ist erforderlich.';
    if (formData.zipcode.length !== 5 || !/^\d+$/.test(formData.zipcode)) {
      newErrors.zipcode = 'Die Postleitzahl muss genau 5 Ziffern enthalten.';
    }
    if (!formData.city) newErrors.city = 'Stadt ist erforderlich.';
    if (!formData.phone_number)
      newErrors.phone_number = 'Telefonnummer ist erforderlich.';
    if (!formData.email) newErrors.email = 'E-Mail-Adresse ist erforderlich.';
    if (!formData.password) newErrors.password = 'Passwort ist erforderlich.';
    if (!formData.confirm_password) {
      newErrors.confirm_password =
        'Bestätigung des Passworts ist erforderlich.';
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwörter stimmen nicht überein.';
    }
    if (!formData.privacy_accepted) {
      newErrors.privacy_accepted =
        'Bitte akzeptieren Sie die Datenschutzbedingungen.';
    }
    if (!formData.terms_accepted) {
      newErrors.terms_accepted = 'Bitte akzeptieren Sie die AGB.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    setLoading(true);

    try {
      await sendRequest('/accounts/users/', 'POST', {}, formData);
      navigate('/', {
        state: {
          message:
            'Bestätigungslink wurde an Ihre E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihr Konto.',
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (
        err.response?.data?.email?.[0] &&
        err.response.data.email[0] === 'The email address is already in use.'
      ) {
        toast.error('Ein Konto mit dieser E-Mail-Adresse existiert bereits.');
        return;
      }

      if (
        err.response?.data?.phone_number &&
        err.response.data.phone_number ===
          'The phone number entered is not valid.'
      ) {
        toast.error('Die eingegebene Telefonnummer ist ungültig.');
        return;
      }

      if (
        err.response?.data?.company_website?.[0] &&
        err.response.data.company_website[0] ===
          "URL must start with 'http://', 'https://' or 'www.'."
      ) {
        toast.error('Geben Sie eine gültige URL ein.');
        return;
      }

      if (
        err.response?.data?.password?.[0] &&
        err.response.data.password[0] === 'This password is too common.'
      ) {
        toast.error('Dieses Passwort ist zu häufig.');
        return;
      }

      if (
        err.response?.data?.password?.[0] &&
        err.response.data.password[0] === 'This password is entirely numeric.'
      ) {
        toast.error('Dieses Passwort besteht nur aus Zahlen.');
        return;
      }

      if (
        err.response?.data?.password?.[0] &&
        err.response.data.password[0] ===
          'This password is too short. It must contain at least 8 characters.'
      ) {
        toast.error(
          'Dieses Passwort ist zu kurz. Es muss mindestens 8 Zeichen enthalten.'
        );
        return;
      }

      if (err instanceof Error) {
        toast.error(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        toast.error('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-primary flex flex-col items-center justify-center px-4 min-h-screen p-12'>
      <h1 className='text-[46px] font-bold mb-6 text-white'>Registrierung</h1>
      <div className='w-full max-w-[960px] bg-white/10 border-[3px] border-[rgba(255,255,255,0.06)] rounded-[44px] p-8'>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'
        >
          <div>
            <Input
              label='Vorname'
              name='first_name'
              placeholder='Text hinzufügen'
              value={formData.first_name}
              onChange={handleChange}
              required
              className={`border ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.first_name && (
              <p className='text-red-500 text-sm'>{errors.first_name}</p>
            )}
          </div>

          <div>
            <Input
              label='Nachname'
              name='last_name'
              placeholder='Text hinzufügen'
              value={formData.last_name}
              onChange={handleChange}
              required
              className={`border ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.last_name && (
              <p className='text-red-500 text-sm'>{errors.last_name}</p>
            )}
          </div>

          <Input
            label='Name des Unternehmens'
            name='company_name'
            placeholder='Text hinzufügen'
            value={formData.company_name}
            onChange={handleChange}
          />
          <Input
            label='Ihre Position im Unternehmen'
            name='position'
            placeholder='Text hinzufügen'
            value={formData.position}
            onChange={handleChange}
          />

          <div>
            <Input
              label='Anschrift/Strasse'
              name='address'
              placeholder='Text hinzufügen'
              value={formData.address}
              onChange={handleChange}
              required
              className={`md:col-span-1 border ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className='text-red-500 text-sm'>{errors.address}</p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4 md:col-span-1'>
            <div>
              <Input
                label='PLZ'
                name='zipcode'
                placeholder='66651'
                value={formData.zipcode}
                onChange={handleChange}
                required
                className={`md:col-span-1 border ${
                  errors.zipcode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.zipcode && (
                <p className='text-red-500 text-sm'>{errors.zipcode}</p>
              )}
            </div>
            <div>
              <Input
                label='Stadt'
                name='city'
                placeholder='Text hinzufügen'
                value={formData.city}
                onChange={handleChange}
                required
                className={`md:col-span-1 border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && (
                <p className='text-red-500 text-sm'>{errors.city}</p>
              )}
            </div>
          </div>
          <Input
            label='Website des Unternehmens'
            name='company_website'
            placeholder='https://'
            value={formData.company_website}
            onChange={handleChange}
          />
          <div>
            <Input
              label='Email Adresse'
              name='email'
              type='email'
              placeholder='max@musteradresse.de'
              value={formData.email}
              onChange={handleChange}
              required
              className={`md:col-span-1 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label='Telefonnummer'
              name='phone_number'
              type='tel'
              placeholder='+49 ...'
              value={formData.phone_number}
              onChange={handleChange}
              required
              className={`md:col-span-1 border ${
                errors.phone_number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone_number && (
              <p className='text-red-500 text-sm'>{errors.phone_number}</p>
            )}
          </div>
          <div className='relative'>
            <div>
              <Input
                label='Passwort'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='******'
                value={formData.password}
                onChange={handleChange}
                required
                className={`md:col-span-1 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>
            <Button
              variant='bluePrimary'
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-[47%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none bg-transparent hover:bg-transparent ${
                errors.password ? 'top-[38%]' : ''
              }`}
            >
              {showPassword ? (
                <TbEye color='white' size={24} />
              ) : (
                <TbEyeOff color='white' size={24} />
              )}
            </Button>
          </div>
          <div className='relative'>
            <div>
              <Input
                label='Passwort bestätigen'
                name='confirm_password'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='******'
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className={`md:col-span-1 border ${
                  errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirm_password && (
                <p className='text-red-500 text-sm'>
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <Button
              variant='bluePrimary'
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute top-[47%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none bg-transparent hover:bg-transparent ${
                errors.confirm_password ? 'top-[38%]' : ''
              }`}
            >
              {showConfirmPassword ? (
                <TbEye color='white' size={24} />
              ) : (
                <TbEyeOff color='white' size={24} />
              )}
            </Button>
          </div>
          <div className='md:col-span-2 flex justify-between items-center'>
            <div>
              <Checkbox
                label='Ich aktzeptiere die Datenschutzbedingungen'
                name='privacy_accepted'
                checked={formData.privacy_accepted}
                onChange={handleChange}
              />
              {errors.privacy_accepted && (
                <p className='text-red-500 text-sm'>
                  {errors.privacy_accepted}
                </p>
              )}
            </div>
            <div>
              <Checkbox
                label='Ich aktzeptiere die Allgemeinen Geschäftsbedingungen'
                name='terms_accepted'
                checked={formData.terms_accepted}
                onChange={handleChange}
                labelClassName='whitespace-nowrap max-md:whitespace-normal'
              />
              {errors.terms_accepted && (
                <p className='text-red-500 text-sm'>{errors.terms_accepted}</p>
              )}
            </div>
          </div>

          <div className='md:col-span-2 flex justify-center space-x-4'>
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
              Weiter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
