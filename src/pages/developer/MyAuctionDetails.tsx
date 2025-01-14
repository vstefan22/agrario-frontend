import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Checkbox from '../../components/common/Checkbox';
import Button from '../../components/common/Button';
import TenderCriteria from '../../components/developer/TenderCriteria';
import ActiveAuctionsItem from '../../components/developer/my-plots/ActiveAuctionsItem';
import { defaultOptions, bidOptions } from '../../constants/select-options';
// import { placeABidData } from '../../../mockData';
// import useAuctionOffers from '../../hooks/auctions-offer-hook';
import useAuctionOfferstore from '../../store/auctions-store';

const MyAuctionDetails = () => {
  const { auctionOffer } = useAuctionOfferstore();

  const [formData, setFormData] = useState({
    utilitization: auctionOffer?.offer_confirmation?.utilitization,
    staggered_lease: '',
    // select3: null as string | null,
    share_of_income: '',
    shares_project_company: '',
    sale_amount: null,
    // input2: null as string | null,
    contracted_term_month: null,
    lease_amount_yearly_lease_year_one: null,
    message_to_landowner: '',
    message_to_platform: '',
    accept_privacy_policy: false,
    accept_terms: false,
    other: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

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

  const handleUpdateBid = () => {
    console.log('update bid');
  };

  const handleWithdrawBid = () => {
    console.log('withdraw bid');
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Gebot abgeben {auctionOffer?.identifier}
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2 mb-6'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>

      <ActiveAuctionsItem data={auctionOffer} isDetails />

      <div className='flex gap-8 my-8'>
        <div className='w-1/2'>
          <div className='bg-white border-[1px] border-[#D9D9D9] p-6 rounded-2xl'>
            <h1 className='text-[32px] font-bold text-black-muted mb-6'>
              Ihr angebot
            </h1>
            <Select
              variant='default'
              label='Welche Optionen der Grundstücksnutzung kommen für Sie in Betracht'
              labelClassName='text-gray-medium max-2xl:mb-8'
              required
              name='utilitization'
              value={formData.utilitization}
              onChange={handleSelectChange}
              options={defaultOptions}
            />

            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Im Falle von Kauf-Angeboten
            </h1>

            <Input
              label='Was ist Ihr Kaufpreisangebot'
              placeholder='Text hinzufügen'
              variant='profile'
              className='mt-2 mb-4'
              name='sale_amount'
              value={formData.sale_amount || ''}
              onChange={handleInputChange}
            />
            {/* <Input
              label='Was ist Ihr Kaufpreisangebot'
              placeholder='Text hinzufügen'
              variant='profile'
              className='mt-2'
              name='input2'
              value={formData.input2 || ''}
              onChange={handleInputChange}
            /> */}

            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Im Falle von Pachtangeboten
            </h1>

            <Input
              label='Angebotene Vertragslaufzeit'
              placeholder='Text hinzufügen'
              variant='profile'
              className='mt-2 mb-4'
              required
              name='contracted_term_month'
              value={formData.contracted_term_month || ''}
              onChange={handleInputChange}
            />
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

            {/* <Select
              variant='default'
              label='Staffelung der Pacht möglich'
              labelClassName='text-gray-medium'
              required
              name='select2'
              value={formData.select2}
              onChange={handleSelectChange}
              options={bidOptions}
              placeholder='Ja/Nein/Keine Angabe'
              divClassName='my-8'
            /> */}
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
              divClassName='my-8'
            />
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
              divClassName='my-8'
            />

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
              divClassName='my-8'
            />

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
              editBtn
            />

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
              editBtn
            />
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

          <p className='text-gray-dark-100 mb-6'>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>

          <div className='flex justify-end gap-6'>
            <Button
              variant='blueSecondary'
              onClick={() => navigate('../my-auctions/')}
            >
              Abbrechen
            </Button>
            <Button variant='blueSecondary' onClick={handleUpdateBid}>
              Gebot aktualisieren
            </Button>
            <Button variant='bluePrimary' onClick={handleWithdrawBid}>
              Gebot zurückziehen
            </Button>
          </div>
        </div>
        <div className='w-1/2 space-y-8'>
          <TenderCriteria />
          <TenderCriteria />
        </div>
      </div>
    </div>
  );
};

export default MyAuctionDetails;
