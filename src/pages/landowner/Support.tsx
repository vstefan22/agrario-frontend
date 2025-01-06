import Select from '../../components/common/Select';
import { defaultOptions } from '../../types/select-options';
import { useState } from 'react';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import Button from '../../components/common/Button';
import MessageHistoryCard from '../../components/landowner/messages/MessageHistoryCard';

const initialFormData = {
  select1: defaultOptions[0],
  select2: null as string | null,
  select3: null as string | null,
  message: '',
  files: [] as File[],
};

const Support = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSelectChange = (name: string, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
  };

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
  };

  const handleFilesChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      files,
    }));
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 py-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Meine Nachrichten - Neue Unterhaltung/Meine
      </h1>

      <div className='flex flex-col bg-white rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] px-8 py-6 border-[1px] border-gray-medium/60 '>
        <h1 className='text-[32px] text-black-muted mb-4'>
          Neue Nachricht an Agrario Support
        </h1>
        <Select
          name='select1'
          options={defaultOptions}
          value={formData.select1}
          onChange={handleSelectChange}
          required
          buttonClass='w-[144px]'
        />

        <TextArea
          placeholder='Ihre Nachricht an uns'
          onChange={handleChange}
          id='message'
          name='message'
          value={formData.message}
        />

        <div className='mt-4 flex justify-between items-end'>
          <UploadFile onFilesChange={handleFilesChange} />

          <div className='flex gap-x-6'>
            <Button variant='blueSecondary' type='button'>
              Abbrechen
            </Button>
            <Button variant='bluePrimary' type='button'>
              Nachricht absenden
            </Button>
          </div>
        </div>
      </div>

      <h1 className='text-[32px] text-black-muted mt-10 mb-4'>Verlauf</h1>

      <MessageHistoryCard user='Chris' message='Hello Alex,' />
      <MessageHistoryCard user='Chris' message='Hello Alex,' />
    </div>
  );
};

export default Support;
