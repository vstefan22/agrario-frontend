import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericList from '../../components/common/GenericList';
import DetailsItem from '../../components/landowner/my-plots/DetailsItem';
import DatePicker from '../../components/common/DatePicker';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import Button from '../../components/common/Button';
import { defaultOptions } from '../../types/select-options';
import { detailsData } from '../../../mockData';
import { myOfferDetailsData } from '../../../mockData';

const OfferDetails = () => {
  const [formData, setFormData] = useState<{
    availableDate: Date | null;
    select1: string;
    select2: string;
    select3: string;
    noUsageRestriction: boolean;
    windEnergyRestriction: boolean;
    solarEnergyRestriction: boolean;
    energyStorageRestriction: boolean;
    ecoEnhancementsRestriction: boolean;
    message: string;
    files: File[];
    isOwnerOrAuthorized: boolean;
    acceptPrivacyPolicy: boolean;
    acceptTermsAndConditions: boolean;
    other: boolean;
  }>(myOfferDetailsData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

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

  const handleOnEdit = () => {
    console.log('edit clicked.');
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

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col px-7 p-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-4'>
        Detailansicht Angebot
      </h1>
      <GenericList
        data={detailsData}
        renderItem={(warenkorb) => (
          <DetailsItem key={warenkorb.id} data={warenkorb} />
        )}
      />

      <h1 className='text-black-muted text-[32px] mt-8'>Ihre Kriterien</h1>
      <p className='text-gray-dark-100 w-[40%]'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
      <form onSubmit={handleSubmit}>
        <div className='mt-8 grid grid-cols-2 gap-y-12 w-[70%]'>
          <DatePicker
            label='Grundstück verfügbarab'
            required
            value={formData.availableDate}
            onChange={handleDateChange}
            placeholder='DD/MM/YY'
            onEdit={handleOnEdit}
            divClassName='mt-auto'
          />
          {errors.availableDate && (
            <span className='text-red-500 text-sm'>{errors.availableDate}</span>
          )}
          <Select
            name='select1'
            label='Sind Sie offen für Verpachtung oder für Verkauf'
            required
            onEdit={handleOnEdit}
            onChange={handleSelectChange}
            options={defaultOptions}
            value={formData.select1}
            divClassName='mt-auto'
            labelClassName='mb-7'
            divWidthClass='w-[420px]'
          />
          {errors.select1 && (
            <span className='text-red-500 text-sm'>{errors.select1}</span>
          )}
          <Select
            name='select2'
            label='Regionalität des Projektentwicklers'
            required
            onEdit={handleOnEdit}
            onChange={handleSelectChange}
            options={defaultOptions}
            value={formData.select2}
            divClassName='mt-auto'
            divWidthClass='w-[420px]'
          />
          {errors.select2 && (
            <span className='text-red-500 text-sm'>{errors.select2}</span>
          )}
          <Select
            name='select3'
            label='Sind Sie offen für Verpachtung oder für Verkauf'
            required
            onEdit={handleOnEdit}
            onChange={handleSelectChange}
            options={defaultOptions}
            value={formData.select3}
            divClassName='mt-auto'
            labelClassName='mb-7'
            divWidthClass='w-[420px]'
          />
          {errors.select3 && (
            <span className='text-red-500 text-sm'>{errors.select2}</span>
          )}
        </div>

        <div className='mt-8 text-primary text-[16px] space-y-6'>
          <p>
            Wollen Sie einzelne Nutzungsmöglichkeiten für Ihr Grundstück
            ausschließen?
          </p>
          <div className='grid grid-cols-2 gap-y-4 w-[60%]'>
            <Checkbox
              label='Keine Auschluss von Nutzungsmöglichkeiten'
              variant='primary'
              onChange={handleChange}
              checked={formData.noUsageRestriction}
            />
            <Checkbox
              label='Keine Nutzung von Windenergie'
              variant='primary'
              onChange={handleChange}
              checked={formData.windEnergyRestriction}
            />
            <Checkbox
              label='Keine Nutzung von Solarenergie'
              variant='primary'
              onChange={handleChange}
              checked={formData.solarEnergyRestriction}
            />
            <Checkbox
              label='Keine Nutzung von Energiespeicher'
              variant='primary'
              onChange={handleChange}
              checked={formData.energyStorageRestriction}
            />
            <Checkbox
              label='Keine Nutzung für ökologische Aufwertungen'
              variant='primary'
              onChange={handleChange}
              checked={formData.ecoEnhancementsRestriction}
            />
          </div>
        </div>

        <div className='mt-8 space-y-6'>
          <p className='text-black-muted text-[16px] w-[524px]'>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
          <TextArea
            placeholder='Ihre Nachricht an uns'
            onChange={handleChange}
            label=''
            id='message'
            name='message'
            value={formData.message}
          />

          <UploadFile onFilesChange={handleFilesChange} />

          <Checkbox
            label='Ja, ich bestätige Eigentümer des Grundstückes oder von den Eigentümern beauftragt oder mandatiert zu sein .'
            variant='primary'
            labelClassName='w-full'
            checked={formData.isOwnerOrAuthorized}
            onChange={handleChange}
          />
          <Checkbox
            label='Ja, ich akzeptiere die Datenschutzbedingungen'
            variant='primary'
            checked={formData.acceptPrivacyPolicy}
            onChange={handleChange}
          />
          <Checkbox
            label='Ja, ich akzeptiere die AGBs'
            variant='primary'
            checked={formData.acceptTermsAndConditions}
            onChange={handleChange}
          />
          <Checkbox
            label='Ja, ich.......'
            variant='primary'
            checked={formData.other}
            onChange={handleChange}
          />
        </div>

        <div className='flex gap-x-6 mt-8 justify-end'>
          <Button
            variant='blueSecondary'
            type='button'
            onClick={() => navigate('..', { relative: 'path' })}
          >
            Abbrechen
          </Button>
          <Button variant='blueSecondary' type='button' className='w-[306px]'>
            Vermarktungsanfrage zurückziehen
          </Button>
          <Button variant='bluePrimary' type='submit' className='w-[306px]'>
            Vermarktungsanfrage absenden
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfferDetails;
