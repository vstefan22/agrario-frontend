import { FC } from 'react';
import EditButton from './EditButton';
import SaveButton from './SaveButton';

interface TextAreaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  editBtn?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  placeholder = '',
  required = false,
  editBtn = false,
}) => {
  return (
    <div className='flex flex-col mt-6'>
      {label && (
        <label
          htmlFor={id}
          className='text-gray-dark-200 text-[16px] font-[400] leading-[24px] mb-2'
        >
          {label}
          {required && '*'}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className='w-full h-[240px] p-4 border border-gray-medium/60 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-400'
        placeholder={placeholder}
      />

      {editBtn && (
        <div className='ml-auto mt-3'>
          <div className='flex gap-3'>
            <SaveButton />
            <EditButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextArea;
