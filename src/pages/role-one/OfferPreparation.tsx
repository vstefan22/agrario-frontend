import { useState } from 'react';
import OfferItem from '../../components/maine-flurstucke/OfferItem';
import Button from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import { defaultOptions } from '../../types/select-options';
import { offerItemData } from '../../../mockData';

const initialFormData = {
  availableDate: null as Date | null,
  select1: null as string | null,
  select2: null as string | null,
  select3: null as string | null,
  noUsageRestriction: false,
  windEnergyRestriction: false,
  solarEnergyRestriction: false,
  energyStorageRestriction: false,
  ecoEnhancementsRestriction: false,
  message: '',
  files: [] as File[],
  isOwnerOrAuthorized: false,
  acceptPrivacyPolicy: false,
  acceptTermsAndConditions: false,
  other: false,
};

export default function MyOffer() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      availableDate: date,
    }));
    if (errors.availableDate) {
      setErrors((prev) => ({
        ...prev,
        availableDate: '',
      }));
    }
  };

  const handleSelectChange = (name: string, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFilesChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      files,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.availableDate) {
      newErrors.availableDate = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.select1) {
      newErrors.select1 = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.select2) {
      newErrors.select2 = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.select3) {
      newErrors.select3 = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.isOwnerOrAuthorized) {
      newErrors.isOwnerOrAuthorized =
        'Bitte bestätigen Sie, dass Sie berechtigt sind.';
    }
    if (!formData.acceptPrivacyPolicy) {
      newErrors.acceptPrivacyPolicy =
        'Bitte akzeptieren Sie die Datenschutzbedingungen.';
    }
    if (!formData.acceptTermsAndConditions) {
      newErrors.acceptTermsAndConditions = 'Bitte akzeptieren Sie die AGBs.';
    }
    if (!formData.other) {
      newErrors.other = 'Bitte bestätigen Sie dieses Feld.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted with:', formData);
    }
  };

  const handleClearFields = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  // Opcioni "live" approach (ako želiš):
  //  - provera nakon svake promene formData,
  //    ALI ne treba ponovo raditi setErrors ako su iste,
  //    jer bi to dovelo do re-rendera.
  //
  // useEffect(() => {
  //   // Samo ako hoćeš "live" validaciju svih polja:
  //   // const isValid = validateForm(); // paznja! moze opet okinuti setErrors
  //   // Ne preporučuje se u svakom Projectu,
  //   // radije validiraj polje po polje onChange / onBlur
  // }, [formData]);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Vorbereitung des Angebotes
      </h1>

      <div className='flex mt-6 flex-col gap-6'>
        <OfferItem data={offerItemData} />
      </div>

      <div>
        <h1 className='text-[32px] font-bold text-black-muted mt-4'>
          Ihre Kriterien
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col mt-4 gap-6'>
          <div className='flex gap-8'>
            <div className='flex flex-col'>
              <DatePicker
                label='Grundstück verfügbar ab'
                value={formData.availableDate}
                onChange={handleDateChange}
                placeholder='DD/MM/YY'
                required
              />
              {errors.availableDate && (
                <span className='text-red-500 text-sm'>
                  {errors.availableDate}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <Select
                name='select1'
                label='Sind Sie offen für Verpachtung oder für Verkauf'
                options={defaultOptions}
                value={formData.select1}
                onChange={handleSelectChange}
                required
              />
              {errors.select1 && (
                <span className='text-red-500 text-sm'>{errors.select1}</span>
              )}
            </div>
          </div>

          <div className='flex gap-8'>
            <div className='flex flex-col'>
              <Select
                name='select2'
                label='Regionalität des Projektentwicklers'
                options={defaultOptions}
                value={formData.select2}
                onChange={handleSelectChange}
                required
              />
              {errors.select2 && (
                <span className='text-red-500 text-sm'>{errors.select2}</span>
              )}
            </div>

            <div className='flex flex-col'>
              <Select
                name='select3'
                label='Welche zusätzlichen Formen der Beteiligung sind Ihnen wichtig'
                options={defaultOptions}
                value={formData.select3}
                onChange={handleSelectChange}
                required
              />
              {errors.select3 && (
                <span className='text-red-500 text-sm'>{errors.select3}</span>
              )}
            </div>
          </div>

          <p className='text-[16px] font-400 text-primary mt-4'>
            Wollen Sie einzelne Nutzungsmöglichkeiten für Ihr Grundstück
            ausschließen?
          </p>

          <div className='flex gap-8 w-[800px] justify-between'>
            <Checkbox
              label='Keine Auschluss von Nutzungsmöglichkeiten'
              name='noUsageRestriction'
              variant='primary'
              checked={formData.noUsageRestriction}
              onChange={handleChange}
            />
            <Checkbox
              label='Keine Nutzung von Windenergie'
              name='windEnergyRestriction'
              variant='primary'
              checked={formData.windEnergyRestriction}
              onChange={handleChange}
            />
          </div>

          <TextArea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            label=''
            placeholder='Ihre Nachricht an uns'
          />

          <UploadFile onFilesChange={handleFilesChange} />

          <div className='flex flex-col w-full gap-8'>
            {/* isOwnerOrAuthorized */}
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich bestätige Eigentümer des Grundstückes oder von den Eigentümern beauftragt oder mandatiert zu sein .'
                name='isOwnerOrAuthorized'
                variant='primary'
                checked={formData.isOwnerOrAuthorized}
                onChange={handleChange}
              />
              {errors.isOwnerOrAuthorized && (
                <span className='text-red-500 text-sm'>
                  {errors.isOwnerOrAuthorized}
                </span>
              )}
            </div>

            {/* acceptPrivacyPolicy */}
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich akzeptiere die Datenschutzbedingungen'
                name='acceptPrivacyPolicy'
                variant='primary'
                checked={formData.acceptPrivacyPolicy}
                onChange={handleChange}
              />
              {errors.acceptPrivacyPolicy && (
                <span className='text-red-500 text-sm'>
                  {errors.acceptPrivacyPolicy}
                </span>
              )}
            </div>

            {/* acceptTermsAndConditions */}
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich akzeptiere die AGBs'
                name='acceptTermsAndConditions'
                variant='primary'
                checked={formData.acceptTermsAndConditions}
                onChange={handleChange}
              />
              {errors.acceptTermsAndConditions && (
                <span className='text-red-500 text-sm'>
                  {errors.acceptTermsAndConditions}
                </span>
              )}
            </div>

            {/* other */}
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich...'
                name='other'
                variant='primary'
                checked={formData.other}
                onChange={handleChange}
              />
              {errors.other && (
                <span className='text-red-500 text-sm'>{errors.other}</span>
              )}
            </div>
          </div>

          <div className='md:col-span-4 flex justify-end space-x-4'>
            <Button
              variant='blueSecondary'
              type='button'
              onClick={handleClearFields}
            >
              Abbrechen
            </Button>
            <Button
              variant='bluePrimary'
              type='submit'
              className='w-[320px] mb-8'
            >
              Vermarktungsanfrage absenden
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
