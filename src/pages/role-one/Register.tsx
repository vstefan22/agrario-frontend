import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import useAuthStore from '../../store/auth-store';

export default function Register() {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    street: '',
    postalCode: '',
    city: '',
    website: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    privacyAccepted: false,
    termsAccepted: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.company ||
      !formData.email ||
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
    if (!formData.privacyAccepted || !formData.termsAccepted) {
      setError('Bitte akzeptieren Sie die Datenschutzbedingungen und AGB.');
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        position: formData.position || null,
        street: formData.street,
        postalCode: formData.postalCode,
        city: formData.city,
        website: formData.website || null,
        email: formData.email,
        mobile: formData.mobile || null,
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
    <div className='bg-primary flex flex-col items-center justify-center px-4 min-h-screen p-12'>
      <h1 className='text-[46px] font-bold mb-6 text-white'>Registrierung</h1>
      <div className='w-full max-w-[960px] bg-white/10 border-[3px] border-[rgba(255,255,255,0.06)] rounded-[44px] p-8'>
        {error && <div className='text-red-600 mb-6'>{error}</div>}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'
        >
          <Input
            label='Vorname'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label='Nachname'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label='Name des Unternehmens'
            name='company'
            value={formData.company}
            onChange={handleChange}
            required
          />
          <Input
            label='Ihre Position im Unternehmen'
            name='position'
            value={formData.position}
            onChange={handleChange}
          />
          <Input
            label='Anschrift/Strasse'
            name='street'
            value={formData.street}
            onChange={handleChange}
            required
            className='md:col-span-1'
          />
          <div className='grid grid-cols-2 gap-4 md:col-span-1'>
            <Input
              label='PLZ'
              name='postalCode'
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            <Input
              label='Stadt'
              name='city'
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label='Website des Unternehmens'
            name='website'
            value={formData.website}
            onChange={handleChange}
          />
          <Input
            label='Email Adresse'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label='Telefonnummer'
            name='mobile'
            type='tel'
            value={formData.mobile}
            onChange={handleChange}
          />
          <Input
            label='Passwort'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label='Passwort bestätigen'
            name='confirmPassword'
            type='password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className='md:col-span-1'
          />
          <div className='md:col-span-2 flex justify-between items-center'>
            <Checkbox
              label='Ich aktzeptiere die Datenschutzbedingungen'
              name='privacyAccepted'
              checked={formData.privacyAccepted}
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
