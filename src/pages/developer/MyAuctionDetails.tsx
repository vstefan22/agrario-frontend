import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Checkbox from '../../components/common/Checkbox';
import Button from '../../components/common/Button';
import TenderCriteria from '../../components/developer/TenderCriteria';
import GenericList from '../../components/common/GenericList';
import ActiveAuctionsItem from '../../components/developer/my-plots/ActiveAuctionsItem';
import { activeAuctionsData } from '../../../mockData';
import { defaultOptions, bidOptions } from '../../types/select-options';
import { placeABidData } from '../../../mockData';

const userFormData = placeABidData;

const MyAuctionDetails = () => {
  const [formData, setFormData] = useState(userFormData);
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
        Gebot abgeben AN-561345
        {/* Replace AN-561345 with original ID */}
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2 mb-6'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>

      <GenericList
        data={activeAuctionsData.slice(0, 1)}
        renderItem={(plot) => (
          <ActiveAuctionsItem key={plot.id} data={plot} isDetails />
        )}
      />

      <div className='flex gap-8 my-8'>
        <div className='w-1/2'>
          <div className='bg-white border-[1px] border-[#D9D9D9] p-6 rounded-2xl'>
            <h1 className='text-[32px] font-bold text-black-muted mb-6'>
              Gebot abgeben AN-561345
            </h1>
            <Select
              variant='default'
              label='Welche Optionen der Grundstücksnutzung kommen für Sie in Betracht'
              labelClassName='text-gray-medium max-2xl:mb-8'
              required
              name='select1'
              value={formData.select1}
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
              name='input1'
              value={formData.input1 || ''}
              onChange={handleInputChange}
            />
            <Input
              label='Was ist Ihr Kaufpreisangebot'
              placeholder='Text hinzufügen'
              variant='profile'
              className='mt-2'
              name='input2'
              value={formData.input2 || ''}
              onChange={handleInputChange}
            />

            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Im Falle von Pachtangeboten
            </h1>

            <Input
              label='Angebotene Vertragslaufzeit'
              placeholder='Text hinzufügen'
              variant='profile'
              className='mt-2 mb-4'
              required
              name='input3'
              value={formData.input3 || ''}
              onChange={handleInputChange}
            />
            <Input
              label='Jährliche Pachtzahlung in Jahr 1'
              placeholder='0 €'
              variant='profile'
              className='mt-2'
              required
              name='input4'
              value={formData.input4 || ''}
              onChange={handleInputChange}
            />

            <Select
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
            />
            <Select
              variant='default'
              label='Staffelung der Pacht möglich'
              labelClassName='text-gray-medium'
              required
              name='select3'
              value={formData.select3}
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
              name='select4'
              value={formData.select4}
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
              name='select5'
              value={formData.select5}
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
              id='textArea1'
              name='textArea1'
              value={formData.textArea1}
              editBtn
            />

            <h1 className='text-[24px] font-bold text-black-muted my-6'>
              Sonstige Informationen für Agrario Energy bzgl. ihres Angebotes
            </h1>
            <TextArea
              placeholder='500 Zeichen'
              onChange={handleChange}
              label=''
              id='textArea2'
              name='textArea2'
              value={formData.textArea2}
              editBtn
            />
          </div>
          <div className='grid grid-cols-2 gap-4 my-6'>
            <Checkbox
              label='Hiermit bestätige ich.......'
              variant='primary'
              name='checkbox1'
              onChange={handleChange}
              checked={formData.checkbox1}
            />
            <Checkbox
              label='Hiermit bestätige ich.......'
              variant='primary'
              name='checkbox2'
              onChange={handleChange}
              checked={formData.checkbox2}
            />
            <Checkbox
              label='Hiermit bestätige ich.......'
              variant='primary'
              name='checkbox3'
              onChange={handleChange}
              checked={formData.checkbox3}
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
