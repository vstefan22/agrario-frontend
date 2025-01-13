import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbCameraPlus } from 'react-icons/tb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import IconCircleButton from '../../components/common/IconCircleButton';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import SlideCheckbox from '../../components/common/SlideCheckbox';
import PackageCard from '../../components/profile/PackageCard';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import { profileOptions } from '../../constants/select-options';
import { PACKAGE_FEATURES } from '../../constants/package';
import { StoreUser } from '../../types/user-types';
import profilePlaceholder from '../../assets/images/profile-placeholder.png';
import usePayments from '../../hooks/payment-hook';

type ProfileType = Omit<StoreUser, 'id'>;

export default function Profile() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const { token, user, updateUser } = useAuthStore();
  const { createPackagePayment } = usePayments();

  const [formData, setFormData] = useState<ProfileType>({
    company_name: '',
    company_website: '',
    address: '',
    founding_year: 0,
    mw_capacity: 0,
    employees: 0,
    firstname: '',
    lastname: '',
    position: '',
    zipcode: '',
    city: '',
    email: '',
    phone_number: '',
    wind: false,
    ground_mounted_solar: false,
    battery: false,
    heat: false,
    hydrogen: false,
    electromobility: false,
    ecological_upgrading: false,
    other: '',
    role: '',
    // current_plan: user?.current_plan || 'Free',
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [profilePreview, setProfilePreview] = useState<any>(
    user?.profile_picture || profilePlaceholder
  );
  const [companyPic, setCompanyPic] = useState<any>(null);
  const [companyPreview, setCompanyPreview] = useState<any>(
    user?.company_logo || profilePlaceholder
  );
  // const [showPassword, setShowPassword] = useState(false);
  // const [filters, setFilters] = useState<Record<string, string | null>>({
  //   profileOptions: null,
  // });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    company_name: false,
    company_website: false,
    address: false,
    founding_year: false,
    mw_capacity: false,
    employees: false,
    firstname: false,
    lastname: false,
    position: false,
    zipcode: false,
    city: false,
    email: false,
    phone_number: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await sendRequest('/accounts/profile/', 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateUser(user);
    };

    fetchUserProfile();
  }, [sendRequest, updateUser, token]);

  useEffect(() => {
    if (user) {
      setFormData({
        company_name: user?.company_name || '',
        company_website: user?.company_website || '',
        address: user?.address || '',
        founding_year: user?.founding_year || 2000,
        mw_capacity: user?.mw_capacity || 0,
        employees: user?.employees || 1,
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        position: user?.position || '',
        zipcode: user?.zipcode || '',
        city: user?.city || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        wind: user?.wind || false,
        ground_mounted_solar: user?.ground_mounted_solar || false,
        battery: user?.battery || false,
        heat: user?.heat || false,
        hydrogen: user?.hydrogen || false,
        electromobility: user?.electromobility || false,
        ecological_upgrading: user?.ecological_upgrading || false,
        other: user?.other || '',
        role: user?.role || '',
      });
    }
  }, [user]);

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
      setProfilePic(file);
      const previewURL = URL.createObjectURL(file);
      setProfilePreview(previewURL);
    }
  };

  const handleCompanyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyPic(file);
      const previewURL = URL.createObjectURL(file);
      setCompanyPreview(previewURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.company_name ||
      !formData.company_website ||
      !formData.address ||
      !formData.zipcode ||
      !formData.city ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.email
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      setSuccess('');
      return;
    }

    // if (formData.password || formData.confirm_password) {
    //   if (formData.password !== formData.confirm_password) {
    //     setError('Die Passwörter stimmen nicht überein.');
    //     setSuccess('');
    //     return;
    //   }
    // }

    setError('');
    setSuccess('');
    setLoading(true);

    const formDataSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataSend.append(key, value.toString());
    });

    if (profilePic) {
      formDataSend.append('profile_picture', profilePic);
    }

    if (companyPic) {
      formDataSend.append('company_logo', companyPic);
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

      if (userUpdated.company_logo) {
        setCompanyPreview(userUpdated.company_logo);
      }

      setSuccess('Profil erfolgreich aktualisiert.');
    } catch (err: any) {
      if (
        err.response?.data?.founding_year[0] &&
        err.response.data.founding_year[0] ===
          'Ensure this value is less than or equal to 2025.'
      ) {
        setError('Bitte geben Sie ein gültiges Jahr ein.');
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

  const toggleEditMode = (field: string) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (field: string) => {
    toggleEditMode(field);
  };

  const handleSelectChange = (name: string, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleOnPasswordChange = () => {
    navigate('/developer/password-change');
  };

  const handleMonthlyPremiumPackage = async () => {
    // TODO: Use actual data here
    const body = {
      plan_id: '2',
      payment_method: 'card',
      currency: 'usd',
    };

    try {
      await createPackagePayment(body);
      // TODO: Add Stripe Checkout and after purchase navigate to ThankYouSubscribe page
    } catch (err) {
      console.error('Error during plan purchase: ', err);
    }
  };

  const handleYearlyPremiumPackage = async () => {
    // TODO: Use actual data here
    const body = {
      plan_id: '3',
      payment_method: 'card',
      currency: 'usd',
    };

    try {
      await createPackagePayment(body);
      // TODO: Add Stripe Checkout and after purchase navigate to ThankYouSubscribe page
    } catch (err) {
      console.error('Error during plan purchase: ', err);
    }
  };

  const handlePriceOnRequest = () => {
    // use actual agrario email here and custom message
    const email = 'agrarioenergy@gmail.com';
    const subject = encodeURIComponent('Price on Request');
    const body = encodeURIComponent(
      'Hello,\n\nI am interested in the Enterprise Package. Could you please provide more details?\n\nThank you!'
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col justify-start items-center px-4 py-8 auto-fill-profile'>
      <div className='w-[962px]'>
        <h1 className='text-[32px] font-bold text-black-muted mb-4'>
          Ihr Profil, Firma GmbH
        </h1>
        <div className='w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8 pt-0'>
          {error && <div className='text-red-600 mb-6'>{error}</div>}
          {success && <div className='text-green-600 mb-6'>{success}</div>}

          <div className='flex flex-col mb-6 h-40'>
            <div className='flex items-center justify-around px-16'>
              <div className='relative w-24 h-24 pt-1'>
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

              <div className='h-40 border-l-[1px] border-gray-light-125 mx-0'></div>

              <div className='relative w-24 h-24 pt-1'>
                <div className='relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center'>
                  <img
                    src={companyPreview || profilePlaceholder}
                    alt='Profilbild'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>

                <IconCircleButton
                  onClick={() =>
                    document.getElementById('companyFileInput')?.click()
                  }
                  icon={<TbCameraPlus />}
                  ariaLabel='Profilbild ändern'
                  className='absolute top-0 right-0'
                />

                <input
                  id='companyFileInput'
                  type='file'
                  accept='image/*'
                  onChange={handleCompanyImageChange}
                  className='hidden'
                />
              </div>
            </div>
            <div className='relative w-full'>
              <hr className='border-t-[1px] border-gray-light-125 w-full' />
            </div>
          </div>

          <div>
            <div>
              <h1 className='text-[32px] font-bold text-black-muted mb-4'>
                Unternehmensdaten
              </h1>
              <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6'
              >
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Name des Unternehmens'
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
                    label='Website des Unternehmens'
                    required
                    id='company_website'
                    name='company_website'
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
                    label='Anschrift/Straße'
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
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    onEdit={() => toggleEditMode('city')}
                    onSave={() => handleSave('city')}
                    isEditable={editMode.city}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Gründungsjahr Ihres Unternehmens'
                    required
                    id='founding_year'
                    name='founding_year'
                    value={formData.founding_year}
                    onChange={handleChange}
                    onEdit={() => toggleEditMode('founding_year')}
                    onSave={() => handleSave('founding_year')}
                    isEditable={editMode.founding_year}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Input
                    variant='profile'
                    label='Installierte Kapazität in MW seit Gründung'
                    required
                    id='mw_capacity'
                    name='mw_capacity'
                    value={formData.mw_capacity}
                    onChange={handleChange}
                    onEdit={() => toggleEditMode('mw_capacity')}
                    onSave={() => handleSave('mw_capacity')}
                    isEditable={editMode.mw_capacity}
                  />
                </div>
                <div className='md:col-span-2'>
                  <Select
                    variant='default'
                    label='Anzahl Mitarbeiter im Unternehmen'
                    required
                    name='employees'
                    value={formData.employees}
                    onChange={handleSelectChange}
                    options={profileOptions}
                    onEdit={() => toggleEditMode('employees')}
                    onSave={() => handleSave('employees')}
                    isEditable={editMode.employees}
                  />
                </div>
              </form>
            </div>

            <div className='flex mt-4 justify-end'>
              <Button variant='bluePrimary' onClick={handleSubmit}>
                {loading ? 'Zugangsdaten ändern...' : 'Zugangsdaten ändern'}
              </Button>
            </div>

            <div className='mt-4'>
              <h1 className='text-[32px] font-bold text-black-muted mb-4'>
                Mein Suchprofil
              </h1>
              <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6'
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
                    label='Ihre Position im Unternehmen'
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
                    className='flex justify-self-end text-gray-medium text-base font-normal leading-6
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
              </form>

              <div className='mt-4'>
                <h1 className='text-[32px] font-bold text-black-muted mb-4'>
                  Mein Suchprofil
                </h1>
                <p className='text-primary text-[16px] w-[606px] mb-4'>
                  Unser Unternehmen interessiert sich für Grundstücke die für
                  folgende Anwendungen geeignet sind
                </p>
                <form
                  onSubmit={handleSubmit}
                  className='grid grid-cols-1 w-[70%]'
                >
                  <div className='grid grid-cols-2 gap-y-6 mb-4'>
                    <Checkbox
                      label='Windenergie (On-Shore)'
                      name='wind'
                      checked={formData.wind}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Freiflächen-Solarenergie'
                      name='ground_mounted_solar'
                      checked={formData.ground_mounted_solar}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Batteriespeicher'
                      name='battery'
                      checked={formData.battery}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <Checkbox
                      label='Wärmespeicher'
                      name='heat'
                      checked={formData.heat}
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
                      name='electromobility'
                      checked={formData.electromobility}
                      onChange={handleChange}
                      variant='primary'
                    />
                    <div className='col-span-2 space-y-10'>
                      <Checkbox
                        label='Ökologische Aufwertungsmaßnahmen (z.B. Ökopunkte)'
                        name='ecological_upgrading'
                        checked={formData.ecological_upgrading}
                        onChange={handleChange}
                        variant='primary'
                        labelClassName='w-full'
                      />
                      <div className='w-[416px] !mt-6'>
                        <Input
                          label='Sonstige'
                          placeholder='Beispiel'
                          name='other'
                          type='profile'
                          variant='profile'
                          value={formData.other}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <Button variant='bluePrimary' onClick={handleSubmit}>
                  {loading ? 'Suchprofil ändern...' : 'Suchprofil ändern'}
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center mt-10'>
            <h1 className='text-[32px] font-bold text-black-muted mb-4'>
              Mein Abo
            </h1>
            <SlideCheckbox
              option1='Yearly'
              option2='Monthly'
              checked={isChecked}
              onChange={handleToggleChange}
            />
            <div className='flex gap-6 mt-8'>
              {isChecked ? (
                <>
                  <PackageCard
                    title='Paket Free'
                    price={0}
                    plan='/ monthly'
                    description='All the basic features to boost your freelance career'
                    features={PACKAGE_FEATURES.free}
                    buttonText='Status aktiv'
                    onClick={() => {
                      navigate('/developer/profile/subscribe');
                    }}
                    activePlan
                  />
                  <PackageCard
                    title='Paket Premium'
                    price={59}
                    plan='/ monthly'
                    description='All the basic features to boost your freelance career'
                    features={PACKAGE_FEATURES.premium}
                    buttonText='Paket buchen'
                    isActive
                    onClick={handleMonthlyPremiumPackage}
                  />
                  <PackageCard
                    title='Paket Enterprise'
                    price='Preis auf Anfrage'
                    features={PACKAGE_FEATURES.onRequest}
                    buttonText='Sales kontaktierten'
                    onClick={handlePriceOnRequest}
                  />
                </>
              ) : (
                <>
                  <PackageCard
                    title='Paket Free'
                    price={0}
                    plan='/ yearly'
                    description='All the basic features to boost your freelance career'
                    features={PACKAGE_FEATURES.free}
                    buttonText='Status aktiv'
                    onClick={() => {}}
                    activePlan
                  />
                  <PackageCard
                    title='Paket Premium'
                    price={599}
                    plan='/ yearly'
                    description='All the basic features to boost your freelance career'
                    features={PACKAGE_FEATURES.premium}
                    buttonText='Paket buchen'
                    isActive
                    onClick={handleYearlyPremiumPackage}
                  />
                  <PackageCard
                    title='Paket Enterprise'
                    price='Preis auf Anfrage'
                    features={PACKAGE_FEATURES.onRequest}
                    buttonText='Sales kontaktierten'
                    onClick={handlePriceOnRequest}
                  />
                </>
              )}
            </div>

            <div className='flex gap-6 mt-5'>
              <Button
                type='button'
                variant='blueSecondary'
                className='mt-6'
                onClick={() => navigate('..')}
              >
                Abbrechen
              </Button>
              <Button
                type='submit'
                disabled={loading}
                variant='bluePrimary'
                className='mt-6'
                onClick={handleSubmit}
              >
                {loading ? 'Suchprofil ändern...' : 'Suchprofil ändern'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
