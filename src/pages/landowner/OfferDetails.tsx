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
import { OfferType } from '../../types/offer-types';

const OfferDetails = () => {
  const [formData, setFormData] = useState<OfferType>({
    available_from: new Date('2024-08-11'),
    criteria1: 'Option 1',
    criteria2: 'Option 2',
    criteria3: 'Option 3',
    no_usage_restriction: false,
    wind_energy_restriction: true,
    solar_energy_restriction: true,
    energy_storage_restriction: false,
    eco_enhancements_restriction: true,
    message: 'This is message from user...',
    files: [] as File[],
    is_owner_or_authorized: true,
    accept_privacy_policy: true,
    accept_terms: true,
    other: true,
  });

  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    datePicker: false,
    criteria1: false,
    criteria2: false,
    criteria3: false,
  });

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
      available_from: date,
    }));
    if (errors.available_from) {
      setErrors((prev) => ({
        ...prev,
        available_from: '',
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

    if (!formData.available_from) {
      newErrors.available_from = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.criteria1) {
      newErrors.criteria1 = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.criteria2) {
      newErrors.criteria2 = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.criteria3) {
      newErrors.criteria3 = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.is_owner_or_authorized) {
      newErrors.is_owner_or_authorized =
        'Bitte bestätigen Sie, dass Sie berechtigt sind.';
    }
    if (!formData.accept_privacy_policy) {
      newErrors.accept_privacy_policy =
        'Bitte akzeptieren Sie die Datenschutzbedingungen.';
    }
    if (!formData.accept_terms) {
      newErrors.accept_terms = 'Bitte akzeptieren Sie die AGBs.';
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

  const toggleEditMode = (field: string) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (field: string) => {
    toggleEditMode(field);
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
            value={formData.available_from}
            onChange={handleDateChange}
            placeholder='DD/MM/YY'
            onEdit={() => toggleEditMode('datePicker')}
            onSave={() => handleSave('datePicker')}
            isEditable={editMode.datePicker}
            divClassName='mt-auto'
          />
          {errors.available_from && (
            <span className='text-red-500 text-sm'>
              {errors.available_from}
            </span>
          )}
          <Select
            name='criteria1'
            label='Sind Sie offen für Verpachtung oder für Verkauf'
            required
            onEdit={() => toggleEditMode('criteria1')}
            onSave={() => handleSave('criteria1')}
            isEditable={editMode.criteria1}
            onChange={handleSelectChange}
            options={defaultOptions}
            value={formData.criteria1}
            divClassName='mt-auto'
            labelClassName='mb-7'
            divWidthClass='w-[420px]'
          />
          {errors.criteria1 && (
            <span className='text-red-500 text-sm'>{errors.criteria1}</span>
          )}
          <Select
            name='criteria2'
            label='Regionalität des Projektentwicklers'
            required
            onEdit={() => toggleEditMode('criteria2')}
            onSave={() => handleSave('criteria2')}
            isEditable={editMode.criteria2}
            onChange={handleSelectChange}
            options={defaultOptions}
            value={formData.criteria2}
            divClassName='mt-auto'
            divWidthClass='w-[420px]'
          />
          {errors.criteria2 && (
            <span className='text-red-500 text-sm'>{errors.criteria2}</span>
          )}
          <Select
            name='criteria3'
            label='Sind Sie offen für Verpachtung oder für Verkauf'
            required
            onEdit={() => toggleEditMode('criteria3')}
            onSave={() => handleSave('criteria3')}
            isEditable={editMode.criteria3}
            onChange={handleSelectChange}
            options={defaultOptions}
            value={formData.criteria3}
            divClassName='mt-auto'
            labelClassName='mb-7'
            divWidthClass='w-[420px]'
          />
          {errors.criteria3 && (
            <span className='text-red-500 text-sm'>{errors.criteria2}</span>
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
              name='no_usage_restriction'
              onChange={handleChange}
              checked={formData.no_usage_restriction}
            />
            <Checkbox
              label='Keine Nutzung von Windenergie'
              variant='primary'
              name='wind_energy_restriction'
              onChange={handleChange}
              checked={formData.wind_energy_restriction}
            />
            <Checkbox
              label='Keine Nutzung von Solarenergie'
              variant='primary'
              name='solar_energy_restriction'
              onChange={handleChange}
              checked={formData.solar_energy_restriction}
            />
            <Checkbox
              label='Keine Nutzung von Energiespeicher'
              variant='primary'
              name='energy_storage_restriction'
              onChange={handleChange}
              checked={formData.energy_storage_restriction}
            />
            <Checkbox
              label='Keine Nutzung für ökologische Aufwertungen'
              variant='primary'
              name='eco_enhancements_restriction'
              onChange={handleChange}
              checked={formData.eco_enhancements_restriction}
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
            name='is_owner_or_authorized'
            checked={formData.is_owner_or_authorized}
            onChange={handleChange}
          />
          <Checkbox
            label='Ja, ich akzeptiere die Datenschutzbedingungen'
            variant='primary'
            name='accept_privacy_policy'
            checked={formData.accept_privacy_policy}
            onChange={handleChange}
          />
          <Checkbox
            label='Ja, ich akzeptiere die AGBs'
            variant='primary'
            name='accept_terms'
            checked={formData.accept_terms}
            onChange={handleChange}
          />
          <Checkbox
            label='Ja, ich.......'
            variant='primary'
            name='other'
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
