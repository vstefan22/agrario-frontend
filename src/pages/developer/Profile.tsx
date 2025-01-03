import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbCameraPlus } from 'react-icons/tb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import IconCircleButton from '../../components/common/IconCircleButton';
import { EyeOpenIcon, EyeClosedIcon } from '../../assets/svgs/svg-icons';
// import useAuthStore from '../../store/auth-store';
import CompanyLogo from '../../assets/images/company-logo.png';
import Select from '../../components/common/Select';
import { profileOptions } from '../../types/select-options';
import Checkbox from '../../components/common/Checkbox';
import SlideCheckbox from '../../components/common/SlideCheckbox';
import PackageCard from '../../components/profile/PackageCard';
import { PACKAGE_FEATURES } from '../../types/package-types';

interface UserData {
  companyName: string;
  companyWebsite: string;
  street: string;
  postalCode: string;
  city: string;
  companyFoundingYear: number;
  installedMWCapacity: number;
  employeesNumber: string;
  vorname: string;
  nachname: string;
  unternehmen: string;
  position: string;
  website: string;
  email: string;
  telefon: string;
  password: string;
  confirmPassword: string;
  windEnergy: boolean;
  solarEnergy: boolean;
  batteryStorage: boolean;
  heatStorage: boolean;
  hydrogen: boolean;
  chargingInfrastructure: boolean;
  ecological: boolean;
  additionalText: string;
}

export default function Profile() {
  const navigate = useNavigate();
  // const { user } = useAuthStore();

  // TODO: use actual user data here
  const [formData, setFormData] = useState<UserData>({
    companyName: 'Text hinzufügen',
    companyWebsite: "https://",
    street: "Text hinzufügen",
    companyFoundingYear: 2012,
    installedMWCapacity: 2020,
    employeesNumber: "1",
    vorname: 'Max',
    nachname: 'Mustermann',
    unternehmen: 'Musterfirma GmbH',
    position: 'Softwareentwickler',
    postalCode: '66651',
    city: 'Text hinzufügen',
    website: 'https://www.musterfirma.de',
    email: 'max.mustermann@example.com',
    telefon: '+49 123 456 7890',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    windEnergy: true,
    solarEnergy: false,
    batteryStorage: true,
    heatStorage: true,
    hydrogen: false,
    chargingInfrastructure: false,
    ecological: false,
    additionalText: "Text hinzufügen"
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  // const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(
    'https://s3-alpha-sig.figma.com/img/01cc/5d61/f928befeeece4a5c1e2f09ab88eac5cc?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IZe3UOdo59zO4aHKULYUvDhMUIHSDdU7ikD3n3c2CVQZMVYmnmhRDWPKGCoJoP7sbSY6wmm5eQ8aKphj8xU8ymJaj0zkI90mpfr0ki4MiUcz5xBOKFsN3iPumxdxH~LU6dAFKKPUS6NFzW~ywx-RICjvhYBDoeaG3UqgtdAzr747DxDqzTM4JzktYyChDO-3d5e0fDatlraLgZTCsIWzTImROLt8cKyz1glTQoXg4IXF778SNN-lNSuzDut2nYCxTgq3uam8RwMOEWjitxUT0h0-9A0JYvPaXTflAYgIfE4AnCPIJvgp3w1Y~buDyMA~Vd3jJTXVUMp8FaDoYrOG6Q__'
  );
  const [companyProfilePic, setCompanyProfilePic] = useState(CompanyLogo);
  const [showPassword, setShowPassword] = useState(false);
  // const [filters, setFilters] = useState<Record<string, string | null>>({
  //   profileOptions: null,
  // });

  // useEffect(() => {
  //   setUserName('Max Mustermann');
  //   // TODO: check if this is still needed
  // }, [navigate]);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggleChange = (checked: boolean) => {
    setIsChecked(checked);
  };

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

  const handleCompanyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setCompanyProfilePic(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.companyWebsite ||
      !formData.street ||
      !formData.postalCode ||
      !formData.city ||
      !formData.companyFoundingYear ||
      !formData.installedMWCapacity ||

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

  const handleSelectChange = (name: string, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
  };

  const saveChanges = () => {
    console.log("Save changes");
  }

  const editSearchProfile = () => {
    console.log("edit search profile");
  }

  const handleOnPasswordChange = () => {
    navigate('../../role-one/password-change'); // NEED TO ADD - navigate to role two pass change page
  };

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col justify-start items-center px-4 py-8'>
      <div className='w-[962px]'>
        <h1 className='text-[32px] font-bold text-black-muted mb-4'>Ihr Profil, Firma GmbH</h1>
        <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8 pt-0'>
          {error && <div className='text-red-600 mb-6'>{error}</div>}
          {success && <div className='text-green-600 mb-6'>{success}</div>}

          <div className='flex flex-col mb-6 h-40'>
            <div className='flex items-center justify-around px-16'>
              <div className='relative w-24 h-24 pt-1'>
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

              <div className='h-40 border-l-[1px] border-[#D9D9D9] mx-0'></div>

              <div className='relative w-24 h-24 pt-1'>
                <div className='relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center'>
                  <img
                    src={companyProfilePic}
                    alt='Profilbild'
                    // className='w-full h-full object-cover rounded-full'
                    className='w-[40%] h-[40%] object-cover rounded-full' // ovaj deo ne pokazuje full sliku, koristiti kod iznad
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
                  onChange={handleCompanyImageChange}
                  className='hidden'
                />
              </div>
            </div>
            <div className='relative w-full'>
              <hr className='border-t-[1px] border-[#D9D9D9] w-full' />
            </div>
          </div>

          <div>
            <div>
              <h1 className='text-[32px] font-bold text-black-muted mb-4'>Unternehmensdaten</h1>
              <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6'
              >
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Name des Unternehmens'
                    required
                    id='companyName'
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Website des Unternehmens'
                    required
                    id='companyWebsite'
                    name='companyWebsite'
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Anschrift/Straße'
                    required
                    id='street'
                    name='street'
                    value={formData.street}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-1'>
                  <Input
                    variant='profile'
                    label='PLZ'
                    required
                    id='postalCode'
                    name='postalCode'
                    value={formData.postalCode}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-1'>
                  <Input
                    variant='profile'
                    label='Stadt'
                    required
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Gründungsjahr Ihres Unternehmens'
                    required
                    id='companyFoundingYear'
                    name='companyFoundingYear'
                    value={formData.companyFoundingYear}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Installierte Kapazität in MW seit Gründung'
                    required
                    id='installedMWCapacity'
                    name='installedMWCapacity'
                    value={formData.installedMWCapacity}
                    onChange={handleChange}
                    onEdit={handleOnEdit}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Select
                    variant='default'
                    label='Anzahl Mitarbeiter im Unternehmen'
                    required
                    name='employeesNumber'
                    value={formData.employeesNumber}
                    onChange={handleSelectChange}
                    options={profileOptions}
                    onEdit={handleOnEdit}
                  />
                </div>
              </form>
            </div>

            <div className='flex mt-4 justify-end'>
              <Button variant='bluePrimary'
                onClick={saveChanges}>Zugangsdaten ändern</Button>
            </div>

            <div className='mt-4'>
              <h1 className='text-[32px] font-bold text-black-muted mb-4'>Mein Suchprofil</h1>
              <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6'
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
                    onEdit={handleOnPasswordChange}
                  />
                  <Button
                    variant='blueSecondary'
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-[45%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none'
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </div>
              </form>

              <div className='mt-4'>
                <h1 className='text-[32px] font-bold text-black-muted mb-4'>Mein Suchprofil</h1>
                <p className='text-primary text-[16px] w-[606px] mb-4'>Unser Unternehmen interessiert sich für Grundstücke die für folgende Anwendungen geeignet sind</p>
                <form
                  onSubmit={handleSubmit}
                  className='grid grid-cols-1 w-[70%]'
                >
                  <div className='grid grid-cols-2 gap-y-6 mb-4'>
                    <Checkbox
                      label='Windenergie (On-Shore)'
                      name='windEnergy'
                      checked={formData.windEnergy}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Freiflächen-Solarenergie'
                      name='solarEnergy'
                      checked={formData.solarEnergy}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Batteriespeicher'
                      name='batteryStorage'
                      checked={formData.batteryStorage}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Wärmespeicher'
                      name='heatStorage'
                      checked={formData.heatStorage}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Wasserstoff'
                      name='hydrogen'
                      checked={formData.hydrogen}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Elektromobilität-Ladeinfrastruktur'
                      name='chargingInfrastructure'
                      checked={formData.chargingInfrastructure}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <div className='col-span-2 space-y-10'>
                      <Checkbox
                        label='Ökologische Aufwertungsmaßnahmen (z.B. Ökopunkte)'
                        name='ecological'
                        checked={formData.ecological}
                        onChange={handleChange}
                        variant='primary'
                        labelClassName='w-full'
                      />
                      <div className='w-[416px] !mt-6'>
                        <Input
                          label='Sonstige'
                          placeholder='Beispiel'
                          name='additionalText'
                          type='profile'
                          variant='profile'
                          value={formData.additionalText}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <Button variant='bluePrimary'
                  onClick={editSearchProfile}>Suchprofil ändern</Button>

              </div>
            </div>
          </div>

          <div className='flex flex-col items-center mt-10'>
            <h1 className='text-[32px] font-bold text-black-muted mb-4'>Mein Abo</h1>
            <SlideCheckbox option1='Yearly' option2='Monthly' checked={isChecked} onChange={handleToggleChange} />
            <div className='flex gap-6 mt-8'>
              {isChecked ? (
                <>
                  <PackageCard
                    title="Paket Free"
                    price={0}
                    plan="/ monthly"
                    description="All the basic features to boost your freelance career"
                    features={PACKAGE_FEATURES.free}
                    buttonText="Status aktiv"
                    onClick={() => { navigate("/developer/profile/subscribe") }}
                  />
                  <PackageCard
                    title="Paket Premium"
                    price={59}
                    plan="/ monthly"
                    description="All the basic features to boost your freelance career"
                    features={PACKAGE_FEATURES.premium}
                    buttonText="Paket buchen"
                    isActive
                    onClick={() => { navigate("/developer/profile/subscribe") }}
                  />
                  <PackageCard
                    title="Paket Enterprise"
                    price="Preis auf Anfrage"
                    features={PACKAGE_FEATURES.onRequest}
                    buttonText="Sales kontaktierten"
                    onClick={() => { navigate("/developer/profile/subscribe") }}
                  />
                </>
              ) : (
                <>
                  <PackageCard
                    title="Paket Free"
                    price={0}
                    plan="/ yearly"
                    description="All the basic features to boost your freelance career"
                    features={PACKAGE_FEATURES.free}
                    buttonText="Status aktiv"
                    onClick={() => { navigate("/developer/profile/subscribe") }}
                  />
                  <PackageCard
                    title="Paket Premium"
                    price={599}
                    plan="/ yearly"
                    description="All the basic features to boost your freelance career"
                    features={PACKAGE_FEATURES.premium}
                    buttonText="Paket buchen"
                    isActive
                    onClick={() => { navigate("/developer/profile/subscribe") }}
                  />
                  <PackageCard
                    title="Paket Enterprise"
                    price="Preis auf Anfrage"
                    features={PACKAGE_FEATURES.onRequest}
                    buttonText="Sales kontaktierten"
                    onClick={() => { navigate("/developer/profile/subscribe") }}
                  />
                </>
              )}
            </div>

            <div className='flex gap-6 mt-5'>
              <Button type='button' variant='blueSecondary' className='mt-6' onClick={() => navigate("/developer")}>Abbrechen</Button>
              <Button type='submit' disabled={loading} variant='bluePrimary' className='mt-6'>{loading ? 'Suchprofil ändern...' : 'Suchprofil ändern'}</Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}