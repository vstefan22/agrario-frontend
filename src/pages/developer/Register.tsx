import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import useHttpRequest from '../../hooks/http-request-hook';

export default function Register() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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

  const [error, setError] = useState('');
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

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.company_name ||
      !formData.position ||
      !formData.address ||
      !formData.zipcode ||
      !formData.city ||
      !formData.phone_number ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }
    if (
      !formData.privacy_accepted ||
      !formData.terms_accepted ||
      !formData.iAccept
    ) {
      setError('Bitte akzeptieren Sie die Datenschutzbedingungen und AGB.');
      return;
    }

    if (
      !formData.battery &&
      !formData.electromobility &&
      !formData.ground_mounted_solar &&
      !formData.hydrogen &&
      !formData.wind &&
      !formData.heat &&
      !formData.ecological_upgrading &&
      formData.other.trim() === ''
    ) {
      setError(
        'Bitte wählen Sie mindestens eine Option oder geben Sie einen Text in das Feld "Sonstige" ein.'
      );
      return;
    }

    setError('');
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
        err.response.data.email[0] === 'user with this email already exists.'
      ) {
        setError('Ein Konto mit dieser E-Mail-Adresse existiert bereits.');
        return;
      }
      if (
        err.response.data.phone_number ===
        'The phone number entered is not valid.'
      ) {
        setError('Die eingegebene Telefonnummer ist ungültig.');
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

  return (
    <div className='bg-primary flex flex-col items-center justify-center px-4 min-h-screen p-12'>
      <h1 className='text-[46px] font-bold mb-3 text-white'>
        Neue Registrierung
      </h1>
      <p className='text-white mb-6'>Daten zum Unternehmen</p>
      <div className='w-full max-w-[960px] bg-white/10 border-[3px] border-[rgba(255,255,255,0.06)] rounded-[44px] p-8'>
        {error && <div className='text-red-600 mb-6'>{error}</div>}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'
        >
          <Input
            label='Vorname'
            placeholder='Text hinzufügen'
            name='firstname'
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <Input
            label='Nachname'
            placeholder='Text hinzufügen'
            name='lastname'
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <Input
            label='Name des Unternehmens'
            placeholder='Text hinzufügen'
            name='company_name'
            value={formData.company_name}
            onChange={handleChange}
            required
          />
          <Input
            label='Ihre Position im Unternehmen'
            placeholder='Text hinzufügen'
            name='position'
            value={formData.position}
            onChange={handleChange}
          />
          <Input
            label='Anschrift/Strasse'
            placeholder='Text hinzufügen'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
            className='md:col-span-1'
          />
          <div className='grid grid-cols-2 gap-4 md:col-span-1'>
            <Input
              label='PLZ'
              placeholder='66651'
              name='zipcode'
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
            <Input
              label='Stadt'
              placeholder='Text hinzufügen'
              name='city'
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label='Website des Unternehmens'
            placeholder='https://'
            name='company_website'
            value={formData.company_website}
            onChange={handleChange}
          />
          <Input
            label='Telefonnummer'
            placeholder='+49 ...'
            name='phone_number'
            type='tel'
            value={formData.phone_number}
            onChange={handleChange}
          />

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
                  <Input
                    label='Sonstige'
                    placeholder='Beispiel'
                    name='other'
                    type='profile'
                    value={formData.other}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className='col-span-2 text-white text-[24px]'>
            Ihre Zugangsdaten
          </h1>
          <Input
            label='Email Adresse'
            placeholder='max@musteradresse.de'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label='Passwort'
            placeholder='asdasd'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label='Passwort bestätigen'
            placeholder='asdasd'
            name='confirm_password'
            type='password'
            value={formData.confirm_password}
            onChange={handleChange}
            required
            className='md:col-span-1'
          />
          <div className='md:col-span-2 grid gap-y-4 mb-12'>
            <div className='col-span-2'>
              <Checkbox
                label='Ich aktzeptiere die Datenschutzbedingungen'
                name='privacy_accepted'
                checked={formData.privacy_accepted}
                onChange={handleChange}
              />
            </div>
            <Checkbox
              label='Ich aktzeptiere...'
              name='iAccept'
              checked={formData.iAccept}
              onChange={handleChange}
            />
            <Checkbox
              label='Ich aktzeptiere die Allgemeinen Geschäftsbedingungen'
              name='terms_accepted'
              checked={formData.terms_accepted}
              onChange={handleChange}
            />
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
