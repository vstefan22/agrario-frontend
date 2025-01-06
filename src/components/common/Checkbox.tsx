import React, { FC } from 'react';
import { CheckedIcon } from '../../assets/svgs/svg-icons';

type Variant = 'primary' | 'secondary';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: Variant;
  labelClassName?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  variant = 'secondary',
  labelClassName,
  ...props
}) => {
  const inputClasses =
    variant === 'primary'
      ? `
        w-4 h-4
        border border-gray-light-200
        rounded-[4px]
        appearance-none
        cursor-pointer
        checked:bg-primary
        flex justify-center items-center
      `
      : `
        w-[14px] h-[14px]
        border border-white
        rounded-sm
        appearance-none
        checked:bg-white
      `;

  return (
    <label
      className={`flex items-center w-[400px] space-x-2 cursor-pointer select-none ${labelClassName}`}
    >
      <div className='relative'>
        <input
          type='checkbox'
          {...props}
          className={`
            ${inputClasses}
            focus:outline-none
          `}
        />
        {variant === 'primary' && props.checked && (
          <div className='absolute inset-0 flex justify-center items-center pointer-events-none'>
            <CheckedIcon />
          </div>
        )}
      </div>

      <span
        className={`${
          variant === 'primary' ? 'text-black-muted' : 'text-white'
        } text-sm`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
