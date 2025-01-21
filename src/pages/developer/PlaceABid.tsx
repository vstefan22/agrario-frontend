import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Checkbox from '../../components/common/Checkbox';
import Button from '../../components/common/Button';
import TenderCriteria from '../../components/developer/TenderCriteria';
import ActiveAuctionsItem from '../../components/developer/my-plots/ActiveAuctionsItem';
import { landOptions, bidOptions } from '../../constants/select-options';
import useAuctionOffers from '../../hooks/auctions-offer-hook';
import useAuctionOfferstore from '../../store/auctions-store';
import { auctionOptionsMap } from '../../constants/select-options';
import { validateAuctionDetailForm } from '../../utils/helper-functions';
import { LoadingSpinner } from '../../components/common/Loading';

const initialFormData = {
  utilization: '',
  staggered_lease: '',
  share_of_income: '',
  shares_project_company: '',
  sale_amount: null,
  contracted_term_month: null,
  lease_amount_yearly_lease_year_one: null,
  message_to_landowner: '',
  message_to_platform: '',
  accept_privacy_policy: false,
  accept_terms: false,
  other: false,
};

const PlaceABid = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { addAuctionOffer } = useAuctionOffers();
  const { auctionOffer, updateAuctionOffer } = useAuctionOfferstore();
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, checked, value } = e.target as HTMLInputElement;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { errors, isFormValidate } = validateAuctionDetailForm(formData);

      if (isFormValidate) {
        const formDataSend = new FormData();
        if (formData.utilization) {
          formDataSend.append(
            'utilization',
            auctionOptionsMap[formData.utilization] || ''
          );
        }
        if (formData.staggered_lease) {
          formDataSend.append(
            'staggered_lease',
            auctionOptionsMap[formData.staggered_lease] || ''
          );
        }
        if (formData.share_of_income) {
          formDataSend.append(
            'share_of_income',
            auctionOptionsMap[formData.share_of_income] || ''
          );
        }
        if (formData.shares_project_company) {
          formDataSend.append(
            'shares_project_company',
            auctionOptionsMap[formData.shares_project_company] || ''
          );
        }

        if (isNaN(Number(formData.sale_amount))) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            sale_amount: 'Eine gültige Zahl ist erforderlich.',
          }));
          return;
        }

        if (isNaN(Number(formData.lease_amount_yearly_lease_year_one))) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            lease_amount_yearly_lease_year_one:
              'Eine gültige Zahl ist erforderlich.',
          }));
          return;
        }

        if (isNaN(Number(formData.contracted_term_month))) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            contracted_term_month: 'Eine gültige Zahl ist erforderlich.',
          }));
          return;
        }

        formDataSend.append('sale_amount', formData.sale_amount || '');
        formDataSend.append(
          'lease_amount_yearly_lease_year_one',
          formData.lease_amount_yearly_lease_year_one || ''
        );
        formDataSend.append(
          'message_to_landowner',
          formData.message_to_landowner || ''
        );
        formDataSend.append(
          'message_to_platform',
          formData.message_to_platform || ''
        );

        formDataSend.append(
          'accept_privacy_policy',
          formData.accept_privacy_policy.toString()
        );
        formDataSend.append('accept_terms', formData.accept_terms.toString());
        formDataSend.append('other', formData.other.toString());

        setLoading(true);
        const offerUpdated = await addAuctionOffer(
          auctionOffer!.identifier,
          formDataSend
        );
        updateAuctionOffer(auctionOffer!.identifier, offerUpdated);
        setLoading(false);
        navigate('/developer/active-auctions/thanks');
      } else {
        setLoading(false);
        setErrors(errors);
      }
    } catch (err) {
      setLoading(false);
      console.error('Error: ', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4 auto-fill-profile'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Gebot abgeben {auctionOffer?.offer_number}
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2 mb-6'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>

      <ActiveAuctionsItem data={auctionOffer} isDetails />

      <div className='flex gap-8 my-8'>
        <form className='w-1/2'>
          <div className='bg-white border-[1px] border-[#D9D9D9] p-6 rounded-2xl'>
            <h1 className='text-[32px] font-bold text-black-muted mb-6'>
              Gebot abgeben {auctionOffer?.identifier}
            </h1>
            <Select
              variant='default'
              label='Welche Optionen der Grundstücksnutzung kommen für Sie in Betracht'
              labelClassName='text-gray-medium max-2xl:mb-8'
              divClassName={`${errors.utilization ? 'mb-4' : ''}`}
              required
              name='utilization'
              value={formData.utilization}
              onChange={handleSelectChange}
              options={landOptions}
            />
            {errors.utilization && (
              <span className='text-red-500 text-sm'>{errors.utilization}</span>
            )}
            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Im Falle von Kauf-Angeboten
            </h1>
            <Input
              label='Was ist Ihr Kaufpreisangebot'
              placeholder='Nummer hinzufügen'
              variant='profile'
              className={`mt-2 ${errors.sale_amount ? 'mb-0' : 'mb-4'}`}
              name='sale_amount'
              value={formData.sale_amount || ''}
              onChange={handleInputChange}
            />
            {errors.sale_amount && (
              <span className='text-red-500 text-sm'>{errors.sale_amount}</span>
            )}
            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Im Falle von Pachtangeboten
            </h1>
            <Input
              label='Angebotene Vertragslaufzeit'
              placeholder='Nummer hinzufügen'
              variant='profile'
              className={`mt-2 ${errors.contracted_term_month ? '' : 'mb-4'}`}
              required
              name='contracted_term_month'
              value={formData.contracted_term_month || ''}
              onChange={handleInputChange}
            />
            {errors.contracted_term_month && (
              <span className='text-red-500 text-sm mb-4 inline-block'>
                {errors.contracted_term_month}
              </span>
            )}
            <Input
              label='Jährliche Pachtzahlung in Jahr 1'
              placeholder='0 €'
              variant='profile'
              className='mt-2'
              required
              name='lease_amount_yearly_lease_year_one'
              value={formData.lease_amount_yearly_lease_year_one || ''}
              onChange={handleInputChange}
            />
            {errors.lease_amount_yearly_lease_year_one && (
              <span className='text-red-500 text-sm'>
                {errors.lease_amount_yearly_lease_year_one}
              </span>
            )}
            <Select
              variant='default'
              label='Staffelung der Pacht möglich'
              labelClassName='text-gray-medium'
              required
              name='staggered_lease'
              value={formData.staggered_lease}
              onChange={handleSelectChange}
              options={bidOptions}
              placeholder='Ja/Nein/Keine Angabe'
              divClassName={`${errors.staggered_lease ? 'mt-8 mb-4' : 'my-8'}`}
            />
            {errors.staggered_lease && (
              <span className='text-red-500 text-sm'>
                {errors.staggered_lease}
              </span>
            )}
            <Select
              variant='default'
              label='Beteiliung an laufenden Erlösen möglich?'
              labelClassName='text-gray-medium'
              required
              name='share_of_income'
              value={formData.share_of_income}
              onChange={handleSelectChange}
              options={bidOptions}
              placeholder='Ja/Nein/Keine Angabe'
              divClassName={`${errors.share_of_income ? 'mt-8 mb-4' : 'my-8'}`}
            />
            {errors.share_of_income && (
              <span className='text-red-500 text-sm'>
                {errors.share_of_income}
              </span>
            )}
            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Im Falle von Gründung einer Projektgesellschaft
            </h1>
            <Select
              variant='default'
              label='Beteiligung an Projektgesellschaft möglich?'
              labelClassName='text-gray-medium'
              required
              name='shares_project_company'
              value={formData.shares_project_company}
              onChange={handleSelectChange}
              options={bidOptions}
              placeholder='Ja/Nein/Keine Angabe'
              divClassName={`${
                errors.shares_project_company ? 'mt-8 mb-4' : 'my-8'
              }`}
            />
            {errors.shares_project_company && (
              <span className='text-red-500 text-sm'>
                {errors.shares_project_company}
              </span>
            )}
            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Sonstige Informationen für den Eigentümer
            </h1>
            <TextArea
              placeholder='500 Zeichen'
              onChange={handleChange}
              label=''
              id='message_to_landowner'
              name='message_to_landowner'
              value={formData.message_to_landowner}
            />
            {errors.message_to_landowner && (
              <span className='text-red-500 text-sm'>
                {errors.message_to_landowner}
              </span>
            )}
            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Sonstige Informationen für Agrario Energy bzgl. ihres Angebotes
            </h1>
            <TextArea
              placeholder='500 Zeichen'
              onChange={handleChange}
              label=''
              id='message_to_platform'
              name='message_to_platform'
              value={formData.message_to_platform}
            />
            {errors.message_to_platform && (
              <span className='text-red-500 text-sm'>
                {errors.message_to_platform}
              </span>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4 my-6'>
            <Checkbox
              label='Hiermit bestätige ich.......'
              variant='primary'
              name='accept_privacy_policy'
              onChange={handleChange}
              checked={formData.accept_privacy_policy}
            />
            <Checkbox
              label='Hiermit bestätige ich.......'
              variant='primary'
              name='accept_terms'
              onChange={handleChange}
              checked={formData.accept_terms}
            />
            <Checkbox
              label='Hiermit bestätige ich.......'
              variant='primary'
              name='other'
              onChange={handleChange}
              checked={formData.other}
            />
          </div>
          {(errors.accept_privacy_policy ||
            errors.accept_terms ||
            errors.other) && (
            <div className='flex flex-col mb-4 gap-2'>
              {errors.accept_privacy_policy && (
                <span className='text-red-500 text-sm nowrap'>
                  {errors.accept_privacy_policy}
                </span>
              )}
              {errors.accept_terms && (
                <span className='text-red-500 text-sm'>
                  {errors.accept_terms}
                </span>
              )}
              {errors.other && (
                <span className='text-red-500 text-sm'>{errors.other}</span>
              )}
            </div>
          )}
          <p className='text-gray-dark-100 mb-6'>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
          <div className='flex justify-end gap-6'>
            <Button
              variant='blueSecondary'
              onClick={() => navigate('../active-auctions/')}
            >
              Abbrechen
            </Button>
            <Button variant='bluePrimary' onClick={handleSubmit}>
              Gebot abgeben
            </Button>
          </div>
        </form>
        <div className='w-1/2 space-y-8'>
          <TenderCriteria />
          <TenderCriteria />
        </div>
      </div>
    </div>
  );
};

export default PlaceABid;
