import { FC } from 'react';
import ReactDatePicker from 'react-datepicker';
import EditButton from './EditButton';

import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  label?: string;
  value: Date | null | undefined;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  isEditable?: boolean;
  divClassName?: string;
};

const DatePicker: FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'DD/MM/YY',
  required = false,
  onEdit,
  onSave,
  isEditable,
  divClassName,
}) => {
  return (
    <div className={`flex flex-col ${divClassName}`}>
      {label && (
        <div className='flex w-[420px] justify-between'>
          <label className='text-gray-dark-200 text-[16px] h-[24px] font-[400] leading-[24px] mb-2'>
            {label}
            {required ? '*' : ''}
          </label>
          {onEdit && (
            <div className='mt-auto mb-2'>
              <EditButton
                onClick={isEditable ? onSave : onEdit}
                mode={isEditable ? 'Save' : 'Edit'}
              />
            </div>
          )}
        </div>
      )}

      <ReactDatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        dateFormat='dd/MM/yy'
        placeholderText={placeholder}
        className='w-[420px] h-[44px] px-3 py-2 border border-gray-medium/60 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
        popperPlacement='bottom'
        portalId='date-picker-portal'
        disabled={!isEditable && Boolean(onEdit)}
      />
    </div>
  );
};

export default DatePicker;
