import React, { FC } from 'react';
import EditButton from './EditButton';

type InputVariant = 'default' | 'profile';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  required?: boolean;
  variant?: InputVariant;
  onEdit?: () => void;
};

const Input: FC<InputProps> = ({
  label,
  required,
  variant = 'default',
  className = '',
  onEdit,
  ...props
}) => {
  let inputClasses = '';
  switch (variant) {
    case 'profile':
      inputClasses =
        'bg-gray-medium/10 text-gray-light-200 ' +
        'rounded-md h-[44px] p-0 px-3 w-full ' +
        'focus:outline-none focus:ring-2 focus:ring-gray-medium';
      break;
    default:
      inputClasses =
        'border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.08)] ' +
        'text-white rounded-md h-[44px] p-0 px-3 w-full ' +
        'focus:outline-none focus:ring-2 focus:ring-[rgba(255,255,255,0.2)]';
      break;
  }

  return (
    <div className='mb-4'>
      {variant === 'profile' ? (
        <div className='flex items-center justify-between mb-0'>
          <label
            htmlFor={props.id || props.name}
            className='block text-gray-dim font-thin'
          >
            {label}
            {required && '*'}
          </label>
          {onEdit && <EditButton onClick={onEdit} />}
        </div>
      ) : (
        label && (
          <label
            htmlFor={props.id || props.name}
            className='block text-white font-thin mb-2'
          >
            {label}
            {required && '*'}
          </label>
        )
      )}
      <input {...props} className={`${inputClasses} ${className}`} />
    </div>
  );
};

export default Input;
