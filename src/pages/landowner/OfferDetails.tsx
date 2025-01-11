import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericList from '../../components/common/GenericList';
import DetailsItem from '../../components/landowner/my-plots/DetailsItem';
import DatePicker from '../../components/common/DatePicker';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import Button from '../../components/common/Button';
import useOfferStore from '../../store/offer-store';
import useOffers from '../../hooks/offer-hook';
import {
  preferredRegionality,
  shareholderModel,
  utilization,
  optionsMap,
} from '../../constants/select-options';
import { OfferType } from '../../types/offer-types';
import { detailsData } from '../../../mockData';

const OfferDetails = () => {
  const navigate = useNavigate();
  const { patchOffer, deactivateOffer } = useOffers();
  const {
    offer,
    offerId,
    updateOffer,
    updateOfferToList,
    removeOffer,
    removeOfferFromList,
  } = useOfferStore();
  const [formData, setFormData] = useState<OfferType>({
    available_from: offer?.available_from,
    utilization: offer?.utilization,
    preferred_regionality: offer?.preferred_regionality,
    shareholder_model: offer?.shareholder_model,
    no_usage_restriction: offer?.no_usage_restriction,
    wind_energy_restriction: offer?.wind_energy_restriction,
    solar_energy_restriction: offer?.solar_energy_restriction,
    energy_storage_restriction: offer?.energy_storage_restriction,
    eco_enhancements_restriction: offer?.eco_enhancements_restriction,
    important_remarks: offer?.important_remarks,
    hide_from_search: false,
    documents: [] as File[],
    is_owner_or_authorized: true,
    accept_privacy_policy: true,
    accept_terms: true,
    other: true,
  });
  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    datePicker: false,
    utilization: false,
    preferred_regionality: false,
    shareholder_model: false,
  });
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

  const handleFilesChange = (documents: File[]) => {
    setFormData((prev) => ({
      ...prev,
      documents,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.available_from) {
      newErrors.available_from = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.utilization) {
      newErrors.utilization = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.preferred_regionality) {
      newErrors.preferred_regionality = 'Dieses Feld ist erforderlich.';
    }
    if (!formData.shareholder_model) {
      newErrors.shareholder_model = 'Dieses Feld ist erforderlich.';
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
      const formDataSend = new FormData();
      formDataSend.append(
        'available_from',
        formData.available_from ? formData.available_from.toISOString() : ''
      );
      if (formData.utilization)
        formDataSend.append(
          'utilization',
          optionsMap[formData.utilization] || ''
        );
      if (formData.preferred_regionality)
        formDataSend.append(
          'preferred_regionality',
          optionsMap[formData.preferred_regionality] || ''
        );
      if (formData.shareholder_model)
        formDataSend.append(
          'shareholder_model',
          optionsMap[formData.shareholder_model] || ''
        );
      formDataSend.append(
        'important_remarks',
        formData.important_remarks || ''
      );
      const criteria = {
        no_usage_restriction: formData.no_usage_restriction,
        wind_energy_restriction: formData.wind_energy_restriction,
        solar_energy_restriction: formData.solar_energy_restriction,
        energy_storage_restriction: formData.energy_storage_restriction,
        eco_enhancements_restriction: formData.eco_enhancements_restriction,
      };
      formDataSend.append('criteria', JSON.stringify(criteria));
      if (formData.hide_from_search)
        formDataSend.append(
          'hide_from_search',
          formData.hide_from_search.toString()
        );
      if (formData.documents.length > 0) {
        formData.documents.forEach((file) => {
          formDataSend.append('documents', file);
        });
      }
      formDataSend.append(
        'is_owner_or_authorized',
        formData.is_owner_or_authorized.toString()
      );
      formDataSend.append(
        'accept_privacy_policy',
        formData.accept_privacy_policy.toString()
      );
      formDataSend.append('accept_terms', formData.accept_terms.toString());
      formDataSend.append('other', formData.other.toString());

      patchOffer(offerId!, formDataSend);
      updateOffer(offerId!, formData);
      updateOfferToList(offerId!, formData);
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

  const handleDeactivateOffer = async () => {
    try {
      await deactivateOffer(offerId!);
      removeOffer(offerId!);
      removeOfferFromList(offerId!);
      toast.success('Das Angebot wurde erfolgreich deaktiviert.');
    } catch (err) {
      toast.error(
        'Es ist ein Fehler bei der Deaktivierung des Angebots aufgetreten.'
      );
      console.error(err);
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
            name='utilization'
            label='Sind Sie offen für Verpachtung oder für Verkauf'
            required
            onEdit={() => toggleEditMode('utilization')}
            onSave={() => handleSave('utilization')}
            isEditable={editMode.utilization}
            onChange={handleSelectChange}
            options={utilization}
            value={formData.utilization}
            divClassName='mt-auto'
            labelClassName='mb-7'
            divWidthClass='w-[420px]'
          />
          {errors.utilization && (
            <span className='text-red-500 text-sm'>{errors.utilization}</span>
          )}
          <Select
            name='preferred_regionality'
            label='Regionalität des Projektentwicklers'
            required
            onEdit={() => toggleEditMode('preferred_regionality')}
            onSave={() => handleSave('preferred_regionality')}
            isEditable={editMode.preferred_regionality}
            onChange={handleSelectChange}
            options={preferredRegionality}
            value={formData.preferred_regionality}
            divClassName='mt-auto'
            divWidthClass='w-[420px]'
          />
          {errors.preferred_regionality && (
            <span className='text-red-500 text-sm'>
              {errors.preferred_regionality}
            </span>
          )}
          <Select
            name='shareholder_model'
            label='Sind Sie offen für Verpachtung oder für Verkauf'
            required
            onEdit={() => toggleEditMode('shareholder_model')}
            onSave={() => handleSave('shareholder_model')}
            isEditable={editMode.shareholder_model}
            onChange={handleSelectChange}
            options={shareholderModel}
            value={formData.shareholder_model}
            divClassName='mt-auto'
            labelClassName='mb-7'
            divWidthClass='w-[420px]'
          />
          {errors.shareholder_model && (
            <span className='text-red-500 text-sm'>
              {errors.preferred_regionality}
            </span>
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
            id='important_remarks'
            name='important_remarks'
            value={formData.important_remarks}
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
          <Button
            variant='blueSecondary'
            type='button'
            className='w-[306px]'
            onClick={handleDeactivateOffer}
          >
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
