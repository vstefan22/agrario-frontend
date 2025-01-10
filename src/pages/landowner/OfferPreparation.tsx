import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferPreparationItem from '../../components/landowner/my-plots/OfferPreparationItem';
import Button from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import useOffers from '../../hooks/offer-hook';
import { defaultOptions } from '../../types/select-options';
import { OfferType } from '../../types/offer-types';
import { offerItemData } from '../../../mockData';

const initialFormData = {
  available_from: null as Date | null,
  criteria1: null as string | null,
  criteria2: null as string | null,
  criteria3: null as string | null,
  no_usage_restriction: false,
  wind_energy_restriction: false,
  solar_energy_restriction: false,
  energy_storage_restriction: false,
  eco_enhancements_restriction: false,
  message: '',
  files: [] as File[],
  is_owner_or_authorized: false,
  accept_privacy_policy: false,
  accept_terms: false,
  other: false,
};

export default function MyOffer() {
  const navigate = useNavigate();
  const { addOffer } = useOffers();
  const [formData, setFormData] = useState<OfferType>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleCriteriaChange = (name: string, option: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const formDataSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (typeof value === 'string' || typeof value === 'boolean') {
            formDataSend.append(key, value.toString());
          }
        });

        if (formData.files.length > 0) {
          formData.files.forEach((file) => {
            formDataSend.append('files', file);
          });
        }
        console.log('Form submitted with:', formData);
        await addOffer(formDataSend);
      }
      navigate('/landowner/my-plots/thank-you-marketing-request');
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const handleClearFields = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Vorbereitung des Angebotes
      </h1>

      <div className='flex mt-6 flex-col gap-6'>
        <OfferPreparationItem data={offerItemData} />
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
                value={formData.available_from}
                onChange={handleDateChange}
                placeholder='DD/MM/YY'
                required
              />
              {errors.available_from && (
                <span className='text-red-500 text-sm'>
                  {errors.available_from}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <Select
                name='criteria1'
                label='Sind Sie offen für Verpachtung oder für Verkauf'
                options={defaultOptions}
                value={formData.criteria1}
                onChange={handleCriteriaChange}
                required
              />
              {errors.criteria1 && (
                <span className='text-red-500 text-sm'>{errors.criteria1}</span>
              )}
            </div>
          </div>

          <div className='flex gap-8'>
            <div className='flex flex-col'>
              <Select
                name='criteria2'
                label='Regionalität des Projektentwicklers'
                options={defaultOptions}
                value={formData.criteria2}
                onChange={handleCriteriaChange}
                required
              />
              {errors.criteria2 && (
                <span className='text-red-500 text-sm'>{errors.criteria2}</span>
              )}
            </div>

            <div className='flex flex-col'>
              <Select
                name='criteria3'
                label='Welche zusätzlichen Formen der Beteiligung sind Ihnen wichtig'
                options={defaultOptions}
                value={formData.criteria3}
                onChange={handleCriteriaChange}
                required
              />
              {errors.criteria3 && (
                <span className='text-red-500 text-sm'>{errors.criteria3}</span>
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
              name='no_usage_restriction'
              variant='primary'
              checked={formData.no_usage_restriction}
              onChange={handleChange}
            />
            <Checkbox
              label='Keine Nutzung von Windenergie'
              name='wind_energy_restriction'
              variant='primary'
              checked={formData.wind_energy_restriction}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-8 w-[800px] justify-between'>
            <Checkbox
              label='Keine Nutzung von Solarenergie'
              name='solar_energy_restriction'
              variant='primary'
              checked={formData.solar_energy_restriction}
              onChange={handleChange}
            />
            <Checkbox
              label='Keine Nutzung von Energiespeicher'
              name='energy_storage_restriction'
              variant='primary'
              checked={formData.energy_storage_restriction}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-8'>
            <Checkbox
              label='Keine Nutzung für ökologische Aufwertungen'
              name='eco_enhancements_restriction'
              variant='primary'
              checked={formData.eco_enhancements_restriction}
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
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich bestätige Eigentümer des Grundstückes oder von den Eigentümern beauftragt oder mandatiert zu sein .'
                name='is_owner_or_authorized'
                variant='primary'
                checked={formData.is_owner_or_authorized}
                onChange={handleChange}
              />
              {errors.is_owner_or_authorized && (
                <span className='text-red-500 text-sm'>
                  {errors.is_owner_or_authorized}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich akzeptiere die Datenschutzbedingungen'
                name='accept_privacy_policy'
                variant='primary'
                checked={formData.accept_privacy_policy}
                onChange={handleChange}
              />
              {errors.accept_privacy_policy && (
                <span className='text-red-500 text-sm'>
                  {errors.accept_privacy_policy}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <Checkbox
                label='Ja, ich akzeptiere die AGBs'
                name='accept_terms'
                variant='primary'
                checked={formData.accept_terms}
                onChange={handleChange}
              />
              {errors.accept_terms && (
                <span className='text-red-500 text-sm'>
                  {errors.accept_terms}
                </span>
              )}
            </div>
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
