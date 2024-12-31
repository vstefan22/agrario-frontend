import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import useAuthStore from '../../store/auth-store';

export default function Register2() {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    unternehmen: '',
    position: '',
    strasse: '',
    plz: '',
    stadt: '',
    website: '',
    email: '',
    telefon: '',
    password: '',
    confirmPassword: '',
    privacyAccepted: false,
    termsAccepted: false,
    iAccept: false,


    windenergie: false,
    solarenergie: false,
    batteriespeicher: false,
    warmespeicher: false,
    wasserstoff: false,
    ladeinfrastruktur: false,
    okologische: false,
    sonstigeText: '',
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

    if (name === 'telefon') {
      const regex = /^\+?[0-9]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.vorname ||
      !formData.nachname ||
      !formData.unternehmen ||
      !formData.email ||
      !formData.telefon ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }
    if (!formData.privacyAccepted || !formData.termsAccepted || !formData.iAccept) {
      setError('Bitte akzeptieren Sie die Datenschutzbedingungen und AGB.');
      return;
    }


    if (!/^\+?[0-9]*$/.test(formData.telefon)) {
      setError('Bitte geben Sie eine gültige Telefonnummer ein (z.B. +5316326236).');
      return;
    }

    if (!formData.batteriespeicher &&
      !formData.ladeinfrastruktur &&
      !formData.solarenergie &&
      !formData.wasserstoff &&
      !formData.windenergie &&
      !formData.warmespeicher &&
      !formData.okologische &&
      formData.sonstigeText.trim() === ""
    ) {
      setError('Bitte wählen Sie mindestens eine Option oder geben Sie einen Text in das Feld "Sonstige" ein.');
      return;
    }


    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const accessToken = await user.getIdToken();
      setToken(accessToken);
      setUser({ email: user.email, id: user.uid });

      const userData = {
        vorname: formData.vorname,
        nachname: formData.nachname,
        unternehmen: formData.unternehmen,
        position: formData.position || null,
        strasse: formData.strasse,
        plz: formData.plz,
        stadt: formData.stadt,
        website: formData.website || null,
        email: formData.email,
        telefon: formData.telefon || null,
        createdAt: new Date().toISOString(),
      };
      // TODO: poziv ka bekendu
      console.log('user data: ', userData);
      navigate('/login');
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
    // removed h-full -> added min-h-screen + p-12
    <div className='bg-primary flex flex-col items-center justify-center px-4 min-h-screen p-12'>
      <h1 className='text-[46px] font-bold mb-3 text-white'>Neue Registrierung</h1>
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
            name='vorname'
            value={formData.vorname}
            onChange={handleChange}
            required
          />
          <Input
            label='Nachname'
            placeholder='Text hinzufügen'
            name='nachname'
            value={formData.nachname}
            onChange={handleChange}
            required
          />
          <Input
            label='Name des Unternehmens'
            placeholder='Text hinzufügen'
            name='unternehmen'
            value={formData.unternehmen}
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
            name='strasse'
            value={formData.strasse}
            onChange={handleChange}
            required
            className='md:col-span-1'
          />
          <div className='grid grid-cols-2 gap-4 md:col-span-1'>
            <Input
              label='PLZ'
              placeholder='66651'
              name='plz'
              value={formData.plz}
              onChange={handleChange}
              required
            />
            <Input
              label='Stadt'
              placeholder='Text hinzufügen'
              name='stadt'
              value={formData.stadt}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label='Website des Unternehmens'
            placeholder='https://'
            name='website'
            value={formData.website}
            onChange={handleChange}
          />
          <Input
            label='Telefonnummer'
            placeholder='0167498753'
            name='telefon'
            type='tel'
            value={formData.telefon}
            onChange={handleChange}
            required
            pattern='^\+?[0-9]*$'
          />

          <div className='col-span-2 text-white w-[72%] mt-8'>
            <h1 className='text-[24px]'>Ihr Suchprofii</h1>
            <p className='text-[12px] mb-8 w-[70%]'>Unser Unternehmen interessiert sich für Grundstücke die für folgende Anwendungen geeignet sind</p>
            <div className='grid grid-cols-2 gap-y-6 mb-8'>
              <Checkbox
                label='Windenergie (On-Shore)'
                name='windenergie'
                checked={formData.windenergie}
                onChange={handleChange}
              />
              <Checkbox
                label='Freiflächen-Solarenergie'
                name='solarenergie'
                checked={formData.solarenergie}
                onChange={handleChange}
              />
              <Checkbox
                label='Batteriespeicher'
                name='batteriespeicher'
                checked={formData.batteriespeicher}
                onChange={handleChange}
              />
              <Checkbox
                label='Wärmespeicher'
                name='warmespeicher'
                checked={formData.warmespeicher}
                onChange={handleChange}
              />
              <Checkbox
                label='Wasserstoff'
                name='wasserstoff'
                checked={formData.wasserstoff}
                onChange={handleChange}
              />
              <Checkbox
                label='Elektromobilität-Ladeinfrastruktur'
                name='ladeinfrastruktur'
                checked={formData.ladeinfrastruktur}
                onChange={handleChange}
              />
              <div className='col-span-2 space-y-10'>
                <Checkbox
                  label='Ökologische Aufwertungsmaßnahmen (z.B. Ökopunkte)'
                  name='okologische'
                  checked={formData.okologische}
                  onChange={handleChange}
                />
                <div className='w-[433px]'>

                  {/* TODO UBACITI FUNKCIONALNOST */}
                  <Input
                    label='Sonstige'
                    placeholder='Beispiel'
                    name='sonstigeText'
                    type='profile'
                    value={formData.sonstigeText}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>


          <h1 className='col-span-2 text-white text-[24px]'>Ihre Zugangsdaten</h1>
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
            name='confirmPassword'
            type='password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className='md:col-span-1'
          />
          <div className='md:col-span-2 grid gap-y-4 mb-12'>
            <div className='col-span-2'>
              <Checkbox
                label='Ich aktzeptiere die Datenschutzbedingungen'
                name='privacyAccepted'
                checked={formData.privacyAccepted}
                onChange={handleChange}
              />
            </div>
            <Checkbox
              label='Ich aktzeptiere..............'
              name='iAccept'
              checked={formData.iAccept}
              onChange={handleChange}
            />
            <Checkbox
              label='Ich aktzeptiere die Allgemeinen Geschäftsbedingungen'
              name='termsAccepted'
              checked={formData.termsAccepted}
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
