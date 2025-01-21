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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    role: 'developer',
    privacy_accepted: false,
    terms_accepted: false,
    iAccept: false,
    wind: false,
    ground_mounted_solar: false,
    battery: false,
    heat: false,
    hydrogen: false,
    electromobility: false,
    ecological_upgrading: false,
    other: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.first_name)
      newErrors.first_name = 'Vorname ist erforderlich.';
    if (!formData.last_name) newErrors.last_name = 'Nachname ist erforderlich.';
    if (!formData.company_name)
      newErrors.company_name = 'Name des Unternehmens ist erforderlich.';
    if (!formData.position)
      newErrors.position = 'Ihre Position im Unternehmen ist erforderlich.';
    if (!formData.address) newErrors.address = 'Anschrift ist erforderlich.';
    if (!formData.zipcode) newErrors.zipcode = 'PLZ ist erforderlich.';
    else if (formData.zipcode.length !== 5 || !/^\d+$/.test(formData.zipcode)) {
      newErrors.zipcode = 'Die Postleitzahl muss genau 5 Ziffern enthalten.';
    }
    if (!formData.city) newErrors.city = 'Stadt ist erforderlich.';
    if (!formData.company_website)
      newErrors.company_website = 'Website des Unternehmens ist erforderlich.';
    if (!formData.email) newErrors.email = 'E-Mail-Adresse ist erforderlich.';
    if (!formData.phone_number) {
      newErrors.phone_number = 'Telefonnummer ist erforderlich.';
    }

    // wind: false,
    // ground_mounted_solar: false,
    // battery: false,
    // heat: false,
    // hydrogen: false,
    // electromobility: false,
    // ecological_upgrading: false,

    if (
      !formData.other.trim() &&
      !(
        formData.wind ||
        formData.ground_mounted_solar ||
        formData.battery ||
        formData.heat ||
        formData.hydrogen ||
        formData.electromobility ||
        formData.ecological_upgrading
      )
    )
      newErrors.other =
        'Sie müssen mindestens ein Feld auswählen oder einen Text im Feld "Sonstige" eingeben.';

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

    if (!formData.iAccept) {
      newErrors.iAccept = 'Dieses Feld ist erforderlich.';
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
      console.log(err);
      if (
        err.response?.data?.error &&
        err.response.data.error === 'The email address is already in use.'
      ) {
        toast.error('Ein Konto mit dieser E-Mail-Adresse existiert bereits.');
        return;
      }
      if (
        err.response?.data?.email?.[0] &&
        err.response.data.email[0] === 'user with this email already exists.'
      ) {
        toast.error('Ein Konto mit dieser E-Mail-Adresse existiert bereits.');
        return;
      }

      if (
        err.response?.data?.phone_number[0] &&
        err.response.data.phone_number[0] ===
          'The phone number entered is not valid.'
      ) {
        toast.error('Die eingegebene Telefonnummer ist ungültig.');
        return;
      }
      if (
        err.response?.data?.phone_number[0] &&
        err.response.data.phone_number[0] === 'Invalid phone number format.'
      ) {
        toast.error('Ungültiges Telefonnummernformat.');
        return;
      }
      if (
        err.response?.data?.phone_number[0] &&
        err.response.data.phone_number[0] ===
          'Invalid phone number format. Use local or international format.'
      ) {
        toast.error(
          'Ungültiges Telefonnummernformat. Verwenden Sie das lokale oder internationale Format.'
        );
        return;
      }

      if (
        err.response?.data?.company_website?.[0] &&
        err.response.data.company_website[0] ===
          "URL must start with 'http://', 'https:// or 'www.'."
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
      <h1 className='text-[46px] font-bold mb-3 text-white'>
        Neue Registrierung
      </h1>
      <p className='text-white mb-6'>Daten zum Unternehmen</p>
      <div className='w-full max-w-[960px] bg-white/10 border-[3px] border-[rgba(255,255,255,0.06)] rounded-[44px] p-8'>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'
        >
          <div>
            <Input
              label='Vorname'
              placeholder='Text hinzufügen'
              name='first_name'
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
              placeholder='Text hinzufügen'
              name='last_name'
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

          <div>
            <Input
              label='Name des Unternehmens'
              placeholder='Text hinzufügen'
              name='company_name'
              value={formData.company_name}
              onChange={handleChange}
              required
              className={`border ${
                errors.company_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.company_name && (
              <p className='text-red-500 text-sm'>{errors.company_name}</p>
            )}
          </div>

          <div>
            <Input
              label='Ihre Position im Unternehmen'
              placeholder='Text hinzufügen'
              name='position'
              value={formData.position}
              onChange={handleChange}
              required
              className={`border ${
                errors.position ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.position && (
              <p className='text-red-500 text-sm'>{errors.position}</p>
            )}
          </div>

          <div>
            <Input
              label='Anschrift/Strasse'
              placeholder='Text hinzufügen'
              name='address'
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
                placeholder='66651'
                name='zipcode'
                value={formData.zipcode}
                onChange={handleChange}
                required
                className={`border ${
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
                placeholder='Text hinzufügen'
                name='city'
                value={formData.city}
                onChange={handleChange}
                required
                className={`border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && (
                <p className='text-red-500 text-sm'>{errors.city}</p>
              )}
            </div>
          </div>
          <div>
            <Input
              label='Website des Unternehmens'
              placeholder='https://'
              name='company_website'
              value={formData.company_website}
              onChange={handleChange}
              required
              className={`border ${
                errors.company_website ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.company_website && (
              <p className='text-red-500 text-sm'>{errors.company_website}</p>
            )}
          </div>

          <div>
            <Input
              label='Telefonnummer'
              placeholder='+49 ...'
              name='phone_number'
              type='tel'
              value={formData.phone_number}
              onChange={handleChange}
              required
              className={`border ${
                errors.phone_number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone_number && (
              <p className='text-red-500 text-sm'>{errors.phone_number}</p>
            )}
          </div>

          <div className='col-span-2 text-white w-[72%] mt-8'>
            <h1 className='text-[24px]'>Ihr Suchprofii</h1>
            <p className='text-[12px] mb-8 w-[70%]'>
              Unser Unternehmen interessiert sich für Grundstücke die für
              folgende Anwendungen geeignet sind
            </p>
            <div className='grid grid-cols-2 gap-y-6 mb-8'>
              <Checkbox
                label='Windenergie (On-Shore)'
                name='wind'
                checked={formData.wind}
                onChange={handleChange}
              />
              <Checkbox
                label='Freiflächen-Solarenergie'
                name='ground_mounted_solar'
                checked={formData.ground_mounted_solar}
                onChange={handleChange}
              />
              <Checkbox
                label='Batteriespeicher'
                name='battery'
                checked={formData.battery}
                onChange={handleChange}
              />
              <Checkbox
                label='Wärmespeicher'
                name='heat'
                checked={formData.heat}
                onChange={handleChange}
              />
              <Checkbox
                label='Wasserstoff'
                name='hydrogen'
                checked={formData.hydrogen}
                onChange={handleChange}
              />
              <Checkbox
                label='Elektromobilität-Ladeinfrastruktur'
                name='electromobility'
                checked={formData.electromobility}
                onChange={handleChange}
              />
              <div className='col-span-2 space-y-10'>
                <Checkbox
                  label='Ökologische Aufwertungsmaßnahmen (z.B. Ökopunkte)'
                  name='ecological_upgrading'
                  checked={formData.ecological_upgrading}
                  onChange={handleChange}
                />
                <div className='w-[433px]'>
                  <div>
                    <Input
                      label='Sonstige'
                      placeholder='Beispiel'
                      name='other'
                      type='profile'
                      value={formData.other}
                      onChange={handleChange}
                    />
                    {errors.other && (
                      <p className='text-red-500 text-sm'>{errors.other}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className='col-span-2 text-white text-[24px]'>
            Ihre Zugangsdaten
          </h1>

          <div>
            <Input
              label='Email Adresse'
              placeholder='max@musteradresse.de'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
              className={`border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email}</p>
            )}
          </div>
          <div className='relative'>
            <div>
              <Input
                label='Passwort'
                placeholder='******'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className={`border ${
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
                placeholder='******'
                name='confirm_password'
                type={showConfirmPassword ? 'text' : 'password'}
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
              className={`${
                errors.confirm_password ? 'top-[38%]' : ''
              } absolute top-[47%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none bg-transparent hover:bg-transparent`}
            >
              {showConfirmPassword ? (
                <TbEye color='white' size={24} />
              ) : (
                <TbEyeOff color='white' size={24} />
              )}
            </Button>
          </div>
          <div className='md:col-span-2 grid gap-y-4 mb-12'>
            <div className='col-span-2'>
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
            </div>
            <div>
              <Checkbox
                label='Ich aktzeptiere...'
                name='iAccept'
                checked={formData.iAccept}
                onChange={handleChange}
              />
              {errors.iAccept && (
                <p className='text-red-500 text-sm'>{errors.iAccept}</p>
              )}
            </div>
            <div>
              <Checkbox
                label='Ich aktzeptiere die Allgemeinen Geschäftsbedingungen'
                name='terms_accepted'
                checked={formData.terms_accepted}
                onChange={handleChange}
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
