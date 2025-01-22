import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DetailsItem from '../../components/landowner/my-plots/DetailsItem';
import DatePicker from '../../components/common/DatePicker';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import Button from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/Loading';
import useOfferStore from '../../store/offer-store';
import useOffers from '../../hooks/offer-hook';
import {
  preferredRegionality,
  shareholderModel,
  utilization,
  optionsMap,
  optionsMapReverse,
} from '../../constants/select-options';
import { validateOfferDetailForm } from '../../utils/helper-functions';
import { OfferPreparationType } from '../../types/offer-types';

const OfferDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { patchOffer, deleteOffer } = useOffers();
  const { offer, updateOffer, updateOfferToList } = useOfferStore();

  const [formData, setFormData] = useState<OfferPreparationType>({
    available_from: offer?.available_from
      ? new Date(offer.available_from)
      : null,
    utilization: optionsMapReverse[offer?.utilization || ''],
    preferred_regionality:
      optionsMapReverse[offer?.preferred_regionality || ''],
    shareholder_model: optionsMapReverse[offer?.shareholder_model || ''],
    no_usage_restriction: offer?.criteria?.no_usage_restriction || false,
    wind_energy_restriction: offer?.criteria?.wind_energy_restriction || false,
    solar_energy_restriction:
      offer?.criteria?.solar_energy_restriction || false,
    energy_storage_restriction:
      offer?.criteria?.energy_storage_restriction || false,
    eco_enhancements_restriction:
      offer?.criteria?.eco_enhancements_restriction || false,
    important_remarks: offer?.important_remarks,
    hide_from_search: false,
    documented_offers: [] as File[],
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
  const offerId = offer?.identifier;

  useEffect(() => {
    if (!offer || !offer.documented_offers) return;

    const fetchFiles = async () => {
      const files = await Promise.all(
        // eslint-disable-next-line
        (offer.documented_offers || []).map(async (doc: any) => {
          const response = await fetch(doc.document_url);
          const blob = await response.blob();
          const fileName =
            doc.document_url.split('?')[0].split('/').pop() || 'Unnamed';

          return new File([blob], fileName, {
            type: blob.type,
          });
        })
      );

      setFormData((prev) => ({
        ...prev,
        documented_offers: files,
      }));
    };

    fetchFiles().catch((error) =>
      console.error('Failed to fetch files:', error)
    );
  }, [offer]);

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

  const handleFilesChange = (documented_offers: File[]) => {
    setFormData((prev) => ({
      ...prev,
      documented_offers,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { errors, isFormValidate } = validateOfferDetailForm(formData);

    if (isFormValidate) {
      setErrors({});
      const formDataSend = new FormData();
      formDataSend.append(
        'available_from',
        formData.available_from
          ? formData.available_from.toISOString().split('T')[0]
          : ''
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
      if (formData.documented_offers.length > 0) {
        formData.documented_offers.forEach((file) => {
          formDataSend.append('documented_offers', file);
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
      formDataSend.append('status', 'A');

      setLoading(true);
      const offerUpdated = await patchOffer(offerId!, formDataSend);
      updateOffer(offerId!, offerUpdated);
      updateOfferToList(offerId!, offerUpdated);
      setLoading(false);
      toast.success('Das Angebot wurde erfolgreich aktualisiert.');
    } else {
      setErrors(errors);
      setLoading(false);
      toast.error(
        'Ein Fehler ist aufgetreten, die Aktualisierung des Angebots war nicht erfolgreich.'
      );
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
    if (!offerId) {
      toast.error("Couldn't find the offer to delete!");
      return;
    }
    try {
      setLoading(true);
      // const formDataSend = new FormData();
      // formDataSend.append("status", "I");
      // const offerDeactivated = await patchOffer(offerId!, formDataSend);
      // updateOffer(offerId!, offerDeactivated);
      // updateOfferToList(offerId!, offerDeactivated);
      deleteOffer(offerId);
      setLoading(false);
      navigate('/landowner/my-offers');
      toast.success('Das Angebot wurde erfolgreich deaktiviert.');
    } catch (err) {
      toast.error(
        'Es ist ein Fehler bei der Deaktivierung des Angebots aufgetreten.'
      );
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col px-7 p-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-4'>
        Detailansicht Angebot
      </h1>
      <DetailsItem key={offer?.identifier} data={offer!} />

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

          <UploadFile
            onFilesChange={handleFilesChange}
            initialFiles={formData.documented_offers}
          />

          <Checkbox
            label='Ja, ich bestätige Eigentümer des Grundstückes oder von den Eigentümern beauftragt oder mandatiert zu sein .'
            variant='primary'
            labelClassName='w-full'
            name='is_owner_or_authorized'
            checked={formData.is_owner_or_authorized}
            onChange={handleChange}
          />
          {errors.is_owner_or_authorized && (
            <span className='text-red-500 text-sm'>
              {errors.is_owner_or_authorized}
            </span>
          )}
          <Checkbox
            label='Ja, ich akzeptiere die Datenschutzbedingungen'
            variant='primary'
            name='accept_privacy_policy'
            checked={formData.accept_privacy_policy}
            onChange={handleChange}
          />
          {errors.accept_privacy_policy && (
            <span className='text-red-500 text-sm'>
              {errors.accept_privacy_policy}
            </span>
          )}
          <Checkbox
            label='Ja, ich akzeptiere die AGBs'
            variant='primary'
            name='accept_terms'
            checked={formData.accept_terms}
            onChange={handleChange}
          />
          {errors.accept_terms && (
            <span className='text-red-500 text-sm'>{errors.accept_terms}</span>
          )}
          <Checkbox
            label='Ja, ich.......'
            variant='primary'
            name='other'
            checked={formData.other}
            onChange={handleChange}
          />
          {errors.other && (
            <span className='text-red-500 text-sm'>{errors.other}</span>
          )}
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
            Anzeige zurückziehen
          </Button>
          <Button variant='bluePrimary' type='submit' className='w-[306px]'>
            Änderungen speichern
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfferDetails;
